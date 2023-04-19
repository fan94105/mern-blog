const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title 不可空白!"],
    },
    summary: {
      type: String,
      required: [true, "summary 不可空白!"],
    },
    content: {
      type: String,
      required: [true, "content 不可空白!"],
    },
    cover: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
