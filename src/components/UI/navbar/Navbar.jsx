import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context'

const Navbar = () => {
  const{isAuth,setIsAuth} = useContext(AuthContext)
  const logOut = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className='navbar'>
    <div className='navbar__links'>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/posts">Posts</Link>
    </div>
    <div className='logBtn'> 
      <Link to="/login">Log In</Link>
      <button className='logOut' onClick = {logOut}>
      Log Out
      </button>
      </div>
  </div>
  )
}

export default Navbar