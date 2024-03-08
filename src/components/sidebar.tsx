import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [float, setFloat] = useState<boolean>(false);
  const Navigate = useNavigate();
  const login = () => {
    Navigate("/login");
  };
  const signup = () => {
    Navigate("/signup");
  };

  return (
    <div className="navbar-nl">
      <span className="nav-heading">
        <h1 className="navheading">Welcome to Pixel Store</h1>
      </span>

      <AiOutlineMenu className="menu-icon" onClick={() => setFloat(true)} />

      <div className="nav-btns res" id="res">
        <button className="nav-btn btn" onClick={signup}>
          Signup
        </button>
        <button className="nav-btn btn" onClick={login}>
          Login
        </button>
      </div>
      {float && (
        <div className="floating-navbar">
          <ImCross className="cross" onClick={() => setFloat(false)} />
          <button className="btn" onClick={signup}>
            Signup
          </button>
          <button className="btn" onClick={login}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
