import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import "./setting.css"
import { Context } from '../../context/Context'

export default function Setting() {
  const {user,dispatch} = useContext(Context);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState(false); 

  useEffect(()=>{
    setEmail(user.email);
    setUsername(user.username);
    setPassword("");
    setError(user.error);
  },[user])

  const handleUpdate = async (e)=>{
    e.preventDefault();
    if(password.length === 0 || username.length === 0 || username.length === 0){
      setError(true);
      return;
    }

    dispatch({type: "UPDATE_START"});
    try{
      const res = await axios.put("/users/"+user._id,{
        userId:user._id,
        username,
        email,
        password
      })
      dispatch({type:"UPDATE_SUCESS",payload:res.data});
      alert("SUCCESS");
    }catch(err){
      console.log(err);
      dispatch({type:"UPDATE_FAILURE"});
    }
  }

  const handleUserAccount = async()=>{
    try{
        await axios.delete("/users/"+user._id,{
        data:{
          userId: user._id
        }
      })
      dispatch({type:"LOGOUT"});
      window.location.replace("/");
    }catch(err){
    }
  }

  return (
    <div className="setting">
        <div className="settingWrapper">
            <div className='settingTitle'>
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle" onClick={handleUserAccount}>Delete Account</span>
            </div>
            <form className='settingsForm'>
                <label>Username</label>
                <input type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input className="settingInputPassword" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="settingsSubmit" disabled={user.isFetching} onClick={handleUpdate}>Update</button>
                {error && <p style={{"color":"red"}}>something went Wrong</p>}
            </form>
        </div>
    </div>
  )
}
