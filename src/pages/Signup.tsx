import React, { useState } from "react";
import * as POSTAPI from "../networks/postapi"
import { signupcred } from "../networks/postapi";
import {User} from "../models/user"
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const Navigate = useNavigate()
    
    const[formData, setFormData] = useState<signupcred>({
        email:"",
        username:"",
        password:""
    }) 
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const onRegister= (user:User)=>{
        setFormData({
            username:"",
            email:"",
            password:""
        })
        Navigate("/")
    }
    async function submitData(data:signupcred){
        try {
            const user = await POSTAPI.Signup(data)
            onRegister(user)
        } catch (error) {
            console.error(error)
            alert(error)
        }

    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        if(!formData.username?.trim() || !formData.email?.trim() || !formData.password.trim() ){
            alert("Please enter complete Parameters")
            
        }
        else{
            submitData(formData)
        }
        
    }
    return(
        <div className="login-page">
            <h1 className="login-page-heading">Sign Up</h1>
            <div className="loginpage-container">
                <form id="signup-form" className="login-form" onSubmit={handleSubmit}>
                    <input type="text" name="username" id="1" placeholder="username" className="inp login-inp" value={formData.username} onChange={handleInputChange}/>
                    <input type="email" name="email" id="2" placeholder="email"className="inp login-inp" value={formData.email} onChange={handleInputChange}/>
                    <input type="password" name="password" id="3" placeholder="password" className="inp login-inp" value={formData.password} onChange={handleInputChange}/>
                </form>
                <div className="form-container"></div>
                <div className="sign-up-text"><a href="/login">already registered? login</a></div>
                <button type="submit" form="signup-form" className="btn submit-btn submit-btn-for-login">Register</button>
            </div>
        </div>
    )
}

export default Login