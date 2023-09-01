import React, { useEffect, useState } from 'react'
import axios from "axios"
;import "./home.css";
import Header from '../../components/header/Header';
import Posts from "../../components/posts/Posts";
import { useLocation } from 'react-router-dom';

export default function Home() {

  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts/"+search)
      setPosts(res.data);
    }
    fetchPosts(); 
  },[search]);



  return (
    <div className="home">
      <Header/>
      <div className="home">
         <Posts posts={posts}/>
      </div>
    </div>
  )
}
