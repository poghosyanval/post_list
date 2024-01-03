import React,{useContext} from 'react'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import { AuthContext } from '../context'
const Login = () => {
  const {isAuth,setIsAuth} = useContext(AuthContext)
  const log_in = (evt) => {
    evt.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth','true')
  }
  return (
    <div>
        <h1>Login pages</h1>
        <form onSubmit={log_in}>
            <MyInput type="text" placeholder="login..."/>
            <MyInput type="password" placeholder="password..."/>
            <MyButton>Log in</MyButton>
        </form>
    </div>
  )
}

export default Login