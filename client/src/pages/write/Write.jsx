import React, { useContext, useState } from 'react';
import axios from "axios";
import "./write.css";
import { Context } from '../../context/Context';

export default function Write() {
  const {user} = useContext(Context);
  const [title,setTitle] = useState();
  const [desc,setDesc] = useState();

  const handlePublish = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("/posts/",{
        username: user.username,
        title: title,
        desc: desc
      })

      window.location.replace("/post/"+res.data._id);
    }catch(err){
    }
  }

  return (
    <div className="write">
       <form className='writeFromGroup' onSubmit={handlePublish}>
          <input
             type="text"
             placeholder='Title'
             className='writeInput'
             onChange={(e)=>setTitle(e.target.value)}          
          />
          <textarea
            placeholder='Tell your Story'
            type="text"
            className="writeInput writeText"
            onChange={(e)=>setDesc(e.target.value)}          
          />
          <button type='submit' className='writePublishButton'>Publish</button>
       </form>
    </div>
  )
}
