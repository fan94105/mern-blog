require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user-model");
const Post = require("./models/post-model");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// multer 檔案上傳
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const fs = require("fs");

const PORT = process.env.PORT || 4000;
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("connecting mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cors());

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const usernameExixt = await User.findOne({ username }).exec();
  if (usernameExixt) {
    return res.status(400).send("帳號已被註冊。。。");
  }
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    return res.status(400).json(e);
  }
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username }).exec();
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      return res.json({ msg: "ok", token, id: userDoc._id });
    });
  } else {
    return res.status(400).json("帳號或密碼錯誤。。。");
  }
});
app.post("/api/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { title, summary, content, id } = req.body;
  try {
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: id,
    });
    return res.json(postDoc);
  } catch (e) {
    return res.json(e.message);
  }
});
app.get("/api/post", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
    return res.json(posts);
  } catch (e) {
    return res.json(e.message);
  }
});
app.get("/api/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id)
      .populate("author", ["username"])
      .exec();
    return res.json(postDoc);
  } catch (e) {
    return res.status(500).json("something error...");
  }
});
app.put("/api/post/:id", uploadMiddleware.single("file"), async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;

  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }
  const postDoc = await Post.findById(id);
  await postDoc.updateOne({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

  return res.json(postDoc);
});

app.listen(PORT, () => {
  console.log(`port ${PORT}...`);
});
