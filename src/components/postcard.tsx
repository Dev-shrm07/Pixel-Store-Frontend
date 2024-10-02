import React from "react";
import { Post } from "../models/post";
interface PostProps{
    post:Post,
    onclick?: React.MouseEventHandler<HTMLDivElement>
    
}

const Card = ({post,onclick}:PostProps)=>{
    return(
        <>
        <div className="card" onClick={onclick} style={{border:"2px solid #444444"}}>
            <img src={post.image_watermark} alt="" className="cardimg"/>
            <div className="text-card">
                <div className="post-title">{post.title}</div>
                <div className="post-cat">{post.category}</div>
            </div>
            <div className="text-card">
                <h3>₹ {post.price}</h3>
            </div>
        </div>
        </>
    )


}

export default Card