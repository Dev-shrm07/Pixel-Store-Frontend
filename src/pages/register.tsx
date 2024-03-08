import React, { useState } from "react";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import Navbar from "../components/navbar";
import * as API from "../networks/postapi";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Register = () => {
  const { setUser, user } = React.useContext(GContext) as ContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const Navigate = useNavigate();
  const [accnt, setAccount] = useState<API.AccountConnect | null>(null);
  async function regUser() {
    try {
      setLoading(true);
      const res = await API.RegUser();
      window.location.href = res.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function status() {
    try {
      setLoading(true);
      const res = await API.getStatus();
      setAccount(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const Registeruser = () => {
    status();
    if (accnt?.completed) {
      Navigate(`/getStatus/${accnt.user}`);
    } else {
      regUser();
    }
  };
  const x = (
    <>
      <h1 className="h1-general">Welcome {user?.username}</h1>
      <div className="ras-center">
        <button className="btn change-btn" onClick={Registeruser}>
          Regitser as a Seller
        </button>
      </div>
    </>
  );
  return (
    <>
      <Navbar />
      {loading ? <LinearProgress /> : x}
    </>
  );
};

export default Register;
