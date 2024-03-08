import * as React from 'react';
import { User } from './models/user';
import { Post } from './models/post';

export interface ContextType  {
    user:User|null,
    post:string|null,
    setUser: (user:User)=>void,
    setPost: (post: string)=>void
}

export interface props{
    children:React.ReactNode
}
export  const GContext = React.createContext<ContextType | null>(null);
 

const GProvider: React.FC<props> = ({ children }) => {
  const[user,saveUser] = React.useState<User|null>(null);
  const[post,savePost] = React.useState<string|null>(null);

  const setPost = (post:string) => {
    savePost(post)
  };
  const setUser = (user:User) => {
    saveUser(user)
  };
  return (
    <GContext.Provider value={{user,post,setPost,setUser}}>{children}</GContext.Provider>
    
  )
};

export default GProvider;