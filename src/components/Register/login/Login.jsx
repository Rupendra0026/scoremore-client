import React, { useState } from 'react'
import './Login.css'
import {useNavigate} from "react-router-dom"
import { FaDoorOpen } from 'react-icons/fa'

const Login = () => {
  const navigate=useNavigate()
  const[user,setUser]=useState({
    gmail:"",
    password:""
  })
  const loginUser=async()=>{
    console.log(user)
    const request=await fetch('/login',{
      method:"POST",
      headers:{
        "Content-Type": "application/json" 
      },
      body:JSON.stringify({
        data:user
      })
    }).then(async(res)=>{
      let response= await res.json()
      if(response.status==200){
        console.log(response.data)
        localStorage.setItem("data",JSON.stringify(response.data))
        navigate(`/${response.data.category}/home`)
      }
      else{
        alert(response.msg)
        console.log(response.msg)
      }
    })
  }

  return (
   <>
   <div className="login">
   <div className="login-form" >
    <div className="login-heading">
      <h1>Login</h1>
    </div>
    <div className="form">
    <input type="text" placeholder='enter gmail' onChange={(e)=>setUser({...user,gmail:e.target.value})}/>
   <input type="password" placeholder='enter password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
   <button onClick={loginUser}>Login</button>
    </div>
   </div>
   </div>
   </>
  )
}

export default Login