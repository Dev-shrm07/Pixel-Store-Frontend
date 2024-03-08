import React, { useEffect, useState } from "react";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import Navbar from "../components/navbar";
import * as API from "../networks/postapi";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const RAS = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  async function getStatus() {
    try {
      setLoading(true);
      const acc = await API.getStatus();
      setAccount(acc);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  const [account, setAccount] = useState<API.AccountConnect | null>(null);
  const CheckStatus = () => {
    getStatus();
  };
  const Again = () => {
    Navigate("/register");
  };
  const x = (
    <>
      <h3 className="h4-general">
        {account?.registered
          ? "Reg successfull, return to home"
          : "Try to register again if there was some problem during it or wait, as it generally takes 2-3 days for verification"}
      </h3>
      <div className="ras-center">
        {!account?.registered && (
          <button className="btn change-btn" onClick={CheckStatus}>
            Check Status
          </button>
        )}
        {!account?.registered && (
          <button className="btn change-btn" onClick={Again}>
            Try again
          </button>
        )}
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

export default RAS;
