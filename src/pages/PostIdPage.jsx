import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const respone = await PostService.getById(id);
    setPost(respone.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data)
  });
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id)
  }, []);
  return (
    <div>
      <h1>Post id:{params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h3>Comments</h3>
      {isComLoading ? (
        <Loader /> 
      ) : (
        <div>
            {comments.map((com)=>(
                <div key={com.id} style={{marginTop:"15px"}}>
                    <h4>{com.email}</h4>
                    <div>{comments.name}</div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
