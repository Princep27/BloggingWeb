import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from "./components/topbar/TopBar"
import Home from "./pages/home/Home";
import SinglePost from "./components/singlePost/SinglePost";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);

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
