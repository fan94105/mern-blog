import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useGetAllPostsQuery } from "../store/api/authApi";

const IndexPage = () => {
  const [postData, setPostData] = useState([]);

  const { data: posts, isSuccess: getAllPostsSuccess } = useGetAllPostsQuery();
  useEffect(() => {
    setPostData(posts);
  }, [getAllPostsSuccess]);

  return (
    <>
      {postData &&
        postData.length > 0 &&
        postData.map((post) => <Post key={post._id} post={post} />)}
    </>
  );
};

export default IndexPage;
