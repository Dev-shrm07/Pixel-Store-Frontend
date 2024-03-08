import React, { useEffect, useState } from "react";
import { User } from "./models/user";

import * as POSTAPI from "./networks/postapi";
import BroswerPage from "./pages/browsePageNotLoggedin";
import BrowserPageUser from "./pages/browsePageLoggedin";
import "./App.css";
import {GContext} from "./globalcontext"
import {ContextType} from "./globalcontext"

function App() {
  const{setUser} = React.useContext(GContext) as ContextType
  const [user, setUser_log] = useState<User | null>(null);
  const [Name, setName] = useState<string>("")
  useEffect(() => {
    async function fetchUser() {
      try {
        const Userx = await POSTAPI.getAuthUser();
        setUser_log(Userx);
        setUser(Userx)
        setName(Userx.username)

      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);
 
  
  return (
    <div>{user===null ? <BroswerPage/> : <BrowserPageUser name={Name}/>}</div>
  );
}

export default App;
