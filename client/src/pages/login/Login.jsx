import "./login.css"
import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCESS",payload: res.data});  
    }catch(err){
      dispatch({type: "LOGIN_FAILURE"});
    }
  }

  return (
    <div className="login">
        <span className='loginTitle'>Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            
            <label>Username</label>
            <input type="text" placeholder='Enter Your username...' ref={userRef}/>
            <label>Password</label>
            <input type="text" placeholder='Enter Your password...' ref={passwordRef}/>
            <button className="loginButton" disabled={isFetching} >Login</button>
        </form>
        <button className='loginRegisterButton' type='submit'>
          <Link className='link' to="/register">REGISTER</Link>
        </button>
    </div>
  )
}
