import React, { useState } from 'react'
import axios from "axios";
import "./register.css"
import { Link } from 'react-router-dom';

export default function Register() {
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("/auth/register",{
        username,
        email,
        password
      });
      res.data && window.location.replace("/login")
    }catch(err){
       setError(true);
    }
  }

  return (
    <div className="register">
        <span className='registerTitle'>Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            
            <label>Username</label>
            <input type="text" placeholder='Enter Your username...' onChange={(e)=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" placeholder='Enter Your email...' onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="text" placeholder='Enter Your password...' onChange={(e)=>setPassword(e.target.value)}/>
            <button className="registerButton">Register</button>
            {error && <span style={{"margin":"auto", "marginTop":"10px", "color":"red"}}>Something Went Wrong</span>}
        </form>
        <button className='registerLoginButton' type='submit'><Link className='link' to="/login">LOGIN</Link></button>
    </div>
  )
}