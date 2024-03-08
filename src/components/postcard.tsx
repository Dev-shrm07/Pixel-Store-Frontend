import React from "react";
import { Post } from "../models/post";
interface PostProps{
    post:Post,
    onclick?: React.MouseEventHandler<HTMLDivElement>
    
}

const Card = ({post,onclick}:PostProps)=>{
    return(
        <>
        <div className="card" onClick={onclick}>
            <img src={post.image_watermark} alt="" className="cardimg"/>
            <div className="text-card">
                <h1 className="post-title">{post.title}</h1>
                <h4>{post.category}</h4>
            </div>
            <div className="text-card">
                <h3>₹ {post.price}</h3>
            </div>
        </div>
        </>
    )


}

export default Card