import React from 'react'
import {Link} from "react-router-dom"
import "./post.css"

export default function Post({post}) {
  return (
    <div  className="post">
       <div className='postInfo'>
          <div className="postInfoTopBar">
            <Link to={`/post/${post._id}`} className='link'>
              <span className='postTitle'>{post.title}</span>
            </Link>
            <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
          </div>
          <div className="postDesc">
            {post.desc}
          </div>
       </div>
    </div>
  )
}
