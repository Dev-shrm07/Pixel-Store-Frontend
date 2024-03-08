import React, { useEffect, useState } from "react";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import Navbar from "../components/navbar";
import * as API from "../networks/postapi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const RAS = () => {
  const Navigate = useNavigate();
  const { postid } = useParams();
  const [status, setStatus] = useState<API.SessionStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  async function checksessionStatus() {
    try {
      setLoading(true);
      const statusz = await API.chechSessionStatus(postid!);
      console.log(statusz)
      setStatus(statusz);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checksessionStatus();
  }, []);
  const handleDownlaod = (url?: string) => {
    if (!url) {
      console.error("bad request");
    }
    const link = document.createElement("a");
    link.href = url!;
    link.download = "PixelStore_image";
    link.click();
  };
  const CheckStatus = () => {
    checksessionStatus();
  };
  const Again = () => {
    Navigate("/detail/" + postid!);
  };
  const y = (
    <div className="image-succes-box">
      <img
        src={status?.image}
        alt="Your Image"
        style={{ width: "300px", height: "300px", margin: "1em" }}
      />
      <button
        className="btn change-btn"
        onClick={() => handleDownlaod(status?.image)}
      >
        Download
      </button>
    </div>
  );
  const x = (
    <>
      <h3 className="h4-general">
        {status?.completed ? "CHeck Your Status" : "Please Try again"}
      </h3>

      <div className="ras-center">
        {status?.completed ? (
          <button className="btn change-btn" onClick={CheckStatus}>
            Check Status
          </button>
        ) : (
          <button className="btn change-btn" onClick={Again}>
            Try again
          </button>
        )}
      </div>
    </>
  );
  const z = <>{status?.image ? y : x}</>;
  return (
    <>
      <Navbar />
      {loading ? <LinearProgress /> : z}
    </>
  );
};

export default RAS;
