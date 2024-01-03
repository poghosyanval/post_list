import React, { useEffect,useRef, useState } from "react";
import Postlist from "../components/Postlist";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import useObserver from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  const lastElement = useRef()
  
  useObserver(lastElement,page < totalPages,
    isPostLoading,() =>{
      setPage(page + 1)
    })

  useEffect(() => {
    fetchPosts(limit,page)
  },[page,limit])

  const changePage = (page) => {
    setPage(page);
  };
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  // const [title,setTitle] = useState("default value for test")
  // const [body,setBody] = useState('')

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Coast post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect value={limit} onChange={value => setLimit(value)}
      defaultValue={"Post's list"}
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Show all" },
        ]} />
      {postError && <h1>Something went wrong {postError}</h1>}
      <Postlist
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Posts about programming"}
        />
      <div ref={lastElement} style={{height:20,background:'#212'}}></div>
      {isPostLoading && 
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}><Loader /></div>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages} 
      />
      </div>
  )}
export default Posts;
