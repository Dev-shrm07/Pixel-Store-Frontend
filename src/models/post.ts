import mongoose from "mongoose"
export interface Post{
    _id: string,
    title: string,
    description?: string,
    category: string,
    likes: number,
    price: number,
    image_watermark: string,
    creator?: string
}