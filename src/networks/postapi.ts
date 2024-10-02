
import { unescapeLeadingUnderscores } from "typescript";
import { Post } from "../models/post";
import {User} from "../models/user"

const url = "https://pixel-store-backend.onrender.com";
//const url = "http://localhost:8000"
export interface uploadPost {
  image: string;
  image_watermark: string;
  title: string;
  price: number;
  description?: string;
  category: string;
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if(response.status===304){
    alert(304)
  }
  if (response.ok) {
    return response;
  } else {
    const errorbody = await response.json();
    const err = errorbody.error;
    throw Error(err);
  }
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetchData(url+"/welcome/", {
    method: "GET",
    cache:'no-store',
    credentials: "include",
  });
  return response.json();
}

export async function setSeller(): Promise<User>{
  const response = await fetchData(url+'/api/user/setseller',{
    method:"PATCH",
    cache:'no-store',
    credentials:"include"
  })
  return response.json()
}

export async function createPost(post: uploadPost): Promise<Post> {
  const response = await fetchData(url+"/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache:'no-store',
    credentials: "include",
    body: JSON.stringify(post),
  });
  return response.json();
}


export interface LoginCred{
  username?:string,
  email?:string,
  password:string
}
export async function Login(user: LoginCred):Promise<User>{
  const response = await fetchData(url+"/api/user/login",{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type": "application/json"
    },
    cache:'no-store',
    body:JSON.stringify(user)
  })
  return response.json()

}

export interface signupcred{
  email:string,
  password:string,
  username:string
}

export async function Signup(user: signupcred):Promise<User>{
  
    const response = await fetchData(url+"/api/user/signup",{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      cache:'no-store',
      body:JSON.stringify(user)
    })
    return response.json()
  
}

export async function getAuthUser ():Promise<User>{
  const response = await fetchData(url+"/api/user/", {
    method:"GET",
    credentials:"include",
    cache:'no-store'
  })
  return response.json()
}


export async function getPostsWelcome(): Promise<Post[]> {
  const response = await fetchData(url+"/welcome/", {
    method: "GET",
    cache:'no-store',
    credentials: "include",
  });
  return response.json();
}

const Url :string = url+'/api/posts/'
const UrlSave:string = url+'/api/posts/save/'
export async function getPostByid(id:string):Promise<Post[]>{
  const response = await fetchData(`${Url}${id}`,{
    method:"GET",
    cache:"no-store",
    credentials:"include"
  })
  return response.json()
}

export async function savePost(id:string|null){
  const response = await fetchData(`${UrlSave}${id}`,{
    method:"POST",
    cache:"no-store",
     credentials:"include"
  })
  return response.json()
}

export async function getSavedPosts():Promise<Post[]>{
  const response = await fetchData(`${Url}${"saved"}`,{
    method:"GET",
    cache:"no-store",
    credentials:"include"
  })
  return response.json()
}

export interface updatePostBody {
  _id?:string,
  image?: string;
  image_watermark?: string;
  title?: string;
  likes?: number;
  price?: number;
  description?: string;
  category?: string;
}

export async function updatePost(post:updatePostBody):Promise<Post[]>{
  const res = await fetchData(`${Url}${post._id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    cache:"no-store",
    credentials:"include",
    body:JSON.stringify(post)
  })
  return res.json()

}

export async function Logout(){
  await fetchData(url+"/api/user/logout",{
    method:"POST",
    cache:"no-store",
    credentials:"include"
  })
  
}

export async function getMyPosts(): Promise<Post[]> {
  const response = await fetchData(url+"/api/posts/mycollection/", {
    method: "GET",
    cache:'no-store',
    credentials: "include",
  });
  return response.json();
}

export async function deletePost(postid:string){
  await fetchData(url+"/api/posts/"+postid, {method:"DELETE"})
}


export async function setAsseller():Promise<User>{
    const res = await fetchData(url+'/api/user/setseller',{
      method:"PATCH",
      cache:"no-store",
      credentials:"include"
    })
    return res.json()
}


export interface EditUserType{
  username:string,
}
export async function EditUser(user: EditUserType):Promise<User>{
  const response = await fetchData(url+"/api/user/editusername",{
    method:"PATCH",
    credentials:"include", 
    headers:{
      "Content-Type": "application/json"
    },
    cache:'no-store',
    body:JSON.stringify(user)
  })
  return response.json()

}


export async function RegUser(){
  const res = await fetchData(url+"/api/payments/register",{
    method:"POST",
    cache:"no-store",
    credentials:"include"
  })
  return res.json()
}

export interface AccountConnect{
  user?:string,
  id?:string,
  completed?:boolean,
  registered?:boolean

}

export async function getStatus():Promise<AccountConnect>{
  const res = await fetchData(url+"/api/payments/status",{
    method:"GET",
    credentials:"include",
    cache:"no-store"
  })
  return res.json()
}

export async function createSession(postid:string){
  const res = await fetchData(url+"/api/payments/session/"+postid,{
    method:"GET",
    credentials:"include",
    cache:"no-store"
  })
  return res.json()
}

export interface SessionStatus{
  image?:string,
  success?:boolean,
  completed?:boolean
}

export async function chechSessionStatus(postid:string):Promise<SessionStatus>{
  const res = await fetchData(url+"/api/payments/session/status/"+postid,{
    method:"GET",
    credentials:"include",
    cache:"no-store"
  })
  return res.json()
}

export interface EditPass{
  password:string,
}
export async function EditPassword(user: EditPass):Promise<User>{
  const response = await fetchData(url+"/api/user/password/edit",{
    method:"PATCH",
    credentials:"include", 
    headers:{
      "Content-Type": "application/json"
    },
    cache:'no-store',
    body:JSON.stringify(user)
  })
  return response.json()

}
