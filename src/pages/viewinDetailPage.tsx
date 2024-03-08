import React, { useEffect, useState } from "react";
import { ContextType } from "../globalcontext";
import { GContext } from "../globalcontext";
import { Post } from "../models/post";
import Navbar from "../components/navbar";
import * as C from "../networks/postapi";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const Navigate = useNavigate()
  const { post } = React.useContext(GContext) as ContextType;
  const [postDisplay, setPostDisplay] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status,setStatus] = useState<C.SessionStatus|null>(null)
  async function CheckBuy(){
    try {
      setLoading(true)
      const user = await C.chechSessionStatus(post!)
     
      setStatus(user)
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    async function Fetch(id: string) {
      try {
        setLoading(true);
        const res = await C.getPostByid(id);
        setPostDisplay(res[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    Fetch(post!);
    CheckBuy()
    if(status?.completed || status?.success){
      Navigate('/payment/success/'+post!)
    }
  }, []);
  async function savex(){
   try {
      setLoading(true)
      const res = await C.savePost(post)
      if(res){
         console.log(true)
      }
   } catch (error) {
      console.error(error)
   }finally{
    setLoading(false)
   }
  }
  
  const savePost = ()=>{
      if(!post){
         alert("Please enter a valid post id")
      }else{
         savex()
      }
  }
  async function session(){
    try {
      setLoading(true)
      const session = await C.createSession(post!)
      window.location.href=session.url
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }
  const Buy = ()=>{
   
      session()
    
    
  }
  
  const content = (
    <div className="post-container-detail">
      <div className="image-cont">
        <img src={postDisplay?.image_watermark} alt="" className="im-wm" />
      </div>
      <div className="text-cont">
       

        <div className="title-price-cont">
        <h1 className="post-titlex">{postDisplay?.title}</h1>
          <h3>{`${postDisplay?.price}₹`}</h3>
        </div>
        <div className="other-content">
          <h4>{postDisplay?.category}</h4>
          <p>{postDisplay?.description}</p>
        </div>
        <button className="btn" onClick={savePost}>Save</button>
         <button className="btn" onClick={Buy}>Buy</button> 
      </div>
    </div>
  );
  const z = (
   <div>Not a valid request</div>
  )
  const x = (
   <>
   {post? content : z}
   </>
   
  )
  return <><Navbar/>{loading ? <LinearProgress /> : x}</>;
};

export default DetailPage;
