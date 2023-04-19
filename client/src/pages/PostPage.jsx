import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../store/api/authApi";
import * as dayjs from "dayjs";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isSuccess: getPostSuccess } = useGetPostByIdQuery(id);

  const auth = useSelector((state) => state.auth);

  const formatTime = (createdTime) => {
    return dayjs(createdTime).format("MMM DD, YYYY HH:mm");
  };
  return (
    <div className="post-page">
      {getPostSuccess && (
        <>
          <h1>{post.title}</h1>
          <div className="author">@{post.author.username}</div>
          <time>{formatTime(post.createdAt)}</time>
          {auth.id === post.author._id && (
            <div className="edit-row">
              <Link to={`/edit/${post._id}`} className="edit-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit this post
              </Link>
            </div>
          )}
          <div className="image">
            <img src={`http://localhost:4000/${post.cover}`} alt="" />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      )}
    </div>
  );
};

export default PostPage;
