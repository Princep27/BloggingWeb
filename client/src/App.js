import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from "./components/topbar/TopBar"
import Home from "./pages/home/Home";
import SinglePost from "./components/singlePost/SinglePost";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context } from "./context/Context";
import axios from "axios";

function App() {
  const {user,dispatch} = useContext(Context);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('/users/getme', {
          withCredentials: true,
        });
        if(response.data.success) dispatch({type:"LOGIN_SUCESS",payload:response.data.user});
      }catch(e){
        console.log(e);
      }
    }

    fetchData();
  },[]);

  return (
    <Router>
       <TopBar/>
       <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/register" Component={user ? Home : Register}/>
          <Route path="/login" Component={user ? Home : Login}/>
          <Route path="/write" Component={user ? Write : Register}/>
          <Route path="/setting" Component={user ? Setting : Register}/>
          <Route path="/post/:postId" Component={SinglePost}/>
       </Routes>
    </Router>
  );

}

export default App;
