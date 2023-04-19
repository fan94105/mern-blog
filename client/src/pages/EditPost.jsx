import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import {
  useEditPostByIdMutation,
  useGetPostByIdQuery,
} from "../store/api/authApi";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const { id } = useParams();
  const { data: post, isSuccess: getPostSuccess } = useGetPostByIdQuery(id);

  const [editPost, { isSuccess: editPostSuccess }] = useEditPostByIdMutation();

  const navigate = useNavigate();

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    editPost({
      id,
      data,
    });
  };

  useEffect(() => {
    if (getPostSuccess) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
    }
    if (editPostSuccess) {
      navigate(`/post/${id}`, { replace: true });
    }
  }, [getPostSuccess, editPostSuccess]);

  return (
    <form onSubmit={handleUpdatePost} encType="multipart/form-data">
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
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
};

export default EditPost;
