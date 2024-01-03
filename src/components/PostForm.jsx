import React, {useState} from 'react'
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {
  const [post,setPost] = useState({title: '',body: ''})
  const addNewPost = (e) => {
    e.preventDefault()//default gorcoxutyuny anjatum enq vor ejy buttonin sexmeluc chtarmana
    const newPost = {
      ...post,
      id: Date.now(),
    }
    // console.log(newPost)
    // setPosts([...posts,{...post,id:Date.now()}])
    create(newPost)
    setPost({title: "",body: ""})
  }
  return (
    <form>
      <MyInput value = {post.title} type ='text' placeholder = 'Post name...'
      onChange = {(e) => setPost({...post,title: e.target.value})}></MyInput>
      <MyInput value = {post.body} type = 'text' placeholder = 'post description...'
      onChange = {(e) => setPost({...post,body: e.target.value})}></MyInput>
      <MyButton onClick = {addNewPost}>Add</MyButton>
      </form>
  )
}

export default PostForm