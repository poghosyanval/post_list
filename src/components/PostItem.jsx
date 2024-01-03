import React from 'react'
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom'

const PostItem = (props) => {
  const navigate = useNavigate()
  const dynamicNavigation = (id) =>{
  navigate(`/posts/${id}`)
  }
  return (
        <div className="post">
        <div className="post_content">
          <strong>{props.post.id}. {props.post.title}</strong>
          <p>{props.post.body}</p>
        </div>
        <MyButton onClick={()=> props.remove(props.post)}>Delete</MyButton>
        <MyButton onClick={()=> dynamicNavigation(props.post.id)}>Open</MyButton>
      </div>
  )
}

export default PostItem