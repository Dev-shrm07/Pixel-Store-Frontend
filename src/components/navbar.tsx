import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import * as API from "../networks/postapi"

const Navbar = () => {
  const {user} = React.useContext(GContext) as ContextType
  const [float, setFloat] = useState<boolean>(false);
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
      await API.Logout()
    } catch (error) {
      console.error(error)
    }
  }
  const Logout = ()=>{
     logout()
     Navigate("/")
     window.location.reload()
  }

  const ProfileEdit = ()=>{
    Navigate("/editName")
  }

  return (
    <div className="navbar-nl x">
      <span className="nav-heading">
        <h1 className="navheading" onClick={ProfileEdit}>Pixel Store</h1>
      </span>

      <AiOutlineMenu className="menu-icon" onClick={() => setFloat(true)} />

      <div className="nav-btns res" id="res">
      <button className="opt-btn btn" onClick={Home}>
          Home
        </button>
        <button className="-opt-btn btn" onClick={Saved}>
          Saved
        </button>
        <button className="opt-btn btn" onClick={Myposts}>
          My Posts
        </button>
        <button className="opt-btn btn" onClick={upload}>
          upload
        </button>
        <button className="opt-btn btn" onClick={Logout}>
          Logout
        </button>
      </div>
      {float && (
        <div className="floating-navbar">
          <ImCross className="cross" onClick={() => setFloat(false)} />
          <button className="nav-btn btn" onClick={Home}>
          Home
        </button>
          <button className="nav-btn btn" onClick={Saved}>
          Saved
        </button>
        <button className="nav-btn btn" onClick={Myposts}>
          My Posts
        </button>
        <button className="nav-btn btn" onClick={upload}>
          upload
        </button>
        <button className="opt-btn btn" onClick={Logout}>
          Logout
        </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
