import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../store/api/authApi";
import { useSelector } from "react-redux";
import Editor from "../components/Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [post, {}] = useCreatePostMutation();

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const handleCreatePost = (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("id", auth.id);
    e.preventDefault();
    post(data)
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((e) => {
        alert("something error...");
      });
  };

  return (
    <form onSubmit={handleCreatePost} encType="multipart/form-data">
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
};

export default CreatePost;
