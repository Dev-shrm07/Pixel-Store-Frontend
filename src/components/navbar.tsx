import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import * as API from "../networks/postapi"
import logo from "../assets/logo.png"
import { LinearProgress } from "@mui/material";

const Navbar = () => {
  const {user} = React.useContext(GContext) as ContextType
  const [float, setFloat] = useState<boolean>(false);
  const[loading,setLoading] = useState<boolean>(false)
  const Navigate = useNavigate();
  const Myposts = () => {
    Navigate('/my');
  };
  const upload = () => {
    Navigate("/upload");
  };
  const Saved = ()=>{
    Navigate(`/saved/${user}`)
  }
  const Home = ()=>{
    Navigate(`/`)
  }
  async function logout() {
    try {
      setLoading(true)
      await API.Logout()
    } catch (error) {
      console.error(error)
    }
  }
  const Logout = ()=>{
    setLoading(true)
     logout()
     setTimeout(() => {
      Navigate("/");
      window.location.reload();
    }, 10);
    setLoading(false)
  }

  const ProfileEdit = ()=>{
    Navigate("/editName")
  }
  const z = (<div className="navbar-nl x">
    <span className="nav-heading">
      <h1 className="navheading" onClick={ProfileEdit}>{user?.username} 🖊</h1>
      {/* <img src={logo} className="nav-logo"/> */}
    </span>

    
    <AiOutlineMenu className="menu-icon" onClick={() => setFloat(true)} />

    <div className="nav-btns res" id="res">
    <button className="opt-btn btn" onClick={Home}>
        Home
      </button>
      <button className="opt-btn btn" onClick={Saved}>
        Saved
      </button>
      <button className="opt-btn btn" onClick={Myposts}>
        My Posts
      </button>
      <button className="opt-btn btn" onClick={upload}>
        Upload
      </button>
      <button className="-opt-btn btn" onClick={Logout}>
        Logout
      </button>
    </div>
    {float && (
      <div className="floating-navbar">
        <ImCross className="cross" onClick={() => setFloat(false)} />
        <button className="nav-btn btn btnx" onClick={Home}>
        Home
      </button>
        <button className="nav-btn btn btnx" onClick={Saved}>
        Saved
      </button>
      <button className="nav-btn btn btnx" onClick={Myposts}>
        My Posts
      </button>
      <button className="btnx nav-btn btn btn1" onClick={upload}>
        Upload
      </button>
      <button className="nav-btn btn btn1" onClick={Logout}>
        Logout
      </button>
      </div>
    )}
  </div>)
  return (
    <>{loading ? <LinearProgress/> : z}</>
  );
};

export default Navbar;
