import React, { useContext } from 'react';
import "./topbar.css";
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function TopBar() {
  const {dispatch,user} = useContext(Context);
  const handleLogout = ()=>{
    dispatch({type: "LOGOUT"})
  };
  
  return (
    <div className="top">
        <div className="topLeft"></div>
        <div className="topMid">
            <ul className="topList">
                <li className="topListItem"><Link className='link' to="/">HOME</Link></li>
                <li className="topListItem"><Link className='link' to="/">ABOUT</Link></li>
                <li className="topListItem"><Link className='link' to="/">CONTACT</Link></li>
                <li className="topListItem"><Link className='link' to="/write">WRITE</Link></li>
                <li className="topListItem">
                {user && <Link className='link' to="/" onClick={handleLogout}>LOGOUT</Link>}
                </li> 
            </ul>
        </div>
        <div className="topRight">
        {
            user ? (
            <Link to="/setting">
                <img 
                    className="topImg"
                    src="https://images.pexels.com/photos/6485032/pexels-photo-6485032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt=""
                />
            </Link> ) :(
                <ul className="topList">
                    <li className="topListItem">
                    <Link className='link' to="/login">LOGIN</Link>
                    </li>
                    <li className="topListItem">
                    <Link className='link' to="/register">REGISTER</Link>
                    </li>
                </ul>
            )

        }
        </div>
    </div>
  )
}
