import React from 'react';
import "./header.css";

export default function Header() {
  return (
    <div className="header">
       <div className="headerTitles">
            <span className="headerTitleSm">Bloging</span>
       </div>
       <img
            className="headerImg"
            src="https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg"
            alt=""
       />
    </div>
  )
}    