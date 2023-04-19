import React from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";

const Post = (props) => {
  const { _id, title, summary, createdAt, cover, author } = props.post;
  const formatTime = dayjs(createdAt).format("MMM DD, YYYY HH:mm");
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{formatTime}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
