import React, { useEffect, useState } from "react";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import Navbar from "../components/navbar";
import * as API from "../networks/postapi";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const RAS = () => {
  const { setUser, user } = React.useContext(GContext) as ContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const Userx = await API.getAuthUser();
        setUser(Userx);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  let y;
  if (!user) y = "abc";
  else y = user.username;

  const [x, setX] = useState(y);
  const [p1, setP1] = useState<string>("");
  const [p2, setP2] = useState<string>("");

  const reqbody: API.EditUserType = {
    username: x,
  };
  const pbody: API.EditPass = {
    password: p1,
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setX(e.target.value);
  };
  const handleInputChange_p = (e: React.ChangeEvent<HTMLInputElement>) => {
    setP1(e.target.value);
  };
  const handleInputChange_p_ = (e: React.ChangeEvent<HTMLInputElement>) => {
    setP2(e.target.value);
  };
  async function editUsername(z: API.EditUserType) {
    try {
      setLoading(true);
      const res = await API.EditUser(z);
      setX(res.username);
      setUser({
        username: x,
        reg_seller: res.reg_seller,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editP(z: API.EditPass) {
    try {
      setLoading(true);
      const res = await API.EditPassword(z);
      setX(res.username);
      setUser({
        username: x,
        reg_seller: res.reg_seller,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setP1("");
      setP2("");
    }
  }

  const EditUser = () => {
    editUsername(reqbody);
  };

  const EditPassword = () => {
    if (p1 == p2) {
      editP(pbody);
    } else {
      alert("Passwords don't macth");
    }
  };

  const content = (
    <>
      <h1 className="h1-general">Welcome {user?.username}</h1>
      <div className="ras-center">
        <h3 className="h4-general">Edit Username: </h3>
        <input
          className="abc"
          value={x}
          type="text"
          name="username"
          id="1"
          onChange={handleInputChange}
        />

        <button className="btn change-btn" onClick={EditUser}>
          Change Username
        </button>

        <h3 className="h4-general">Edit Password: </h3>
        <h5>New Password</h5>
        <input
          className="abc"
          value={p1}
          type="password"
          name="password"
          id="2"
          onChange={handleInputChange_p}
        />
        <h5>Confirm Password</h5>
        <input
          className="abc"
          value={p2}
          type="password"
          name="password_"
          id="3"
          onChange={handleInputChange_p_}
        />

        <button className="btn change-btn" onClick={EditPassword}>
          Change Password
        </button>
        <button
          className="btn change-btn"
          onClick={() => Navigate("/register")}
        >
          Regitser as a Seller
        </button>
      </div>
    </>
  );
  return (
    <>
      <Navbar />
      {loading ? <LinearProgress/> : content}
    </>
  );
};

export default RAS;
