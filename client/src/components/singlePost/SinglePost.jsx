import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios';
import "./singlePost.css";
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});
    const {user} = useContext(Context);
    const [updateTitle,setUpdateTitle] = useState();
    const [updateDesc,setUpdateDesc] = useState();
    const [updateMode,setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setUpdateTitle(res.data.title);
            setUpdateDesc(res.data.desc);
        }
        getPost();
    },[path]);

    const handleDelete = async ()=>{
        try{
            await axios.delete("/posts/"+post._id,{
                data:{
                    username: user.username
                }
            })
            window.location.replace("/");
        }catch(err){ 
        }
    }

    const handleUpdate = async ()=>{
        try{
            await axios.put("/posts/"+post._id,{
               username: user.username,
               title: updateTitle,
               desc: updateDesc
            })
            window.location.reload(); 
        }catch(err){
        }
    }



  return (
    <div className='singlePost'>
        <div className='singlePostDetail'>
            <div className="singlePostTop">
                <div className="singlePostTopLeft">
                    {updateMode ?
                        <input value={updateTitle} className="updateSinglePostTitle" spellcheck="false" onChange={(e)=>setUpdateTitle(e.target.value)}></input> :
                        <p className="singlePostTitle">{post.title}</p>
                    }
                    <Link to={`/?user=${post.username}`} className="link">
                        <p className="author">Author: {post.username}</p>
                    </Link>
                </div>
                <div className="singlePostTopRight  ">
                {
                    user && user.username === post.username &&
                    <div className="icon">
                        <i class="editIcon fa-regular fa-pen-to-square" onClick={()=>{setUpdateMode(true)}}></i>
                        <i class="editIcon fa-solid fa-trash" onClick={handleDelete}></i>
                    </div> 
                }
                <div className='singlePostTime'>{new Date(post.createdAt).toDateString()}</div>
                </div>
            </div>

            {updateMode ?
                <textarea value={updateDesc} className="updateSinglePostDesc"spellcheck="false" onChange={(e)=>setUpdateDesc(e.target.value)}></textarea> :
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            }

            {updateMode && <button className='singlePageUpdateButton' onClick={handleUpdate}>Update</button>}
        </div>
    </div>
  )
}
