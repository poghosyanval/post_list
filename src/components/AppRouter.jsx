import React,{useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import Posts from '../pages/Posts';
import About from '../pages/About';
import Home from '../pages/Home';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login'
import { AuthContext } from '../context';

const AppRouter = () => {
  const {isAuth,setIsAuth} = useContext(AuthContext)
  console.log(isAuth);
  return isAuth ? (
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostIdPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        ) : (
          <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          </Routes>
        );
}
      export default AppRouter