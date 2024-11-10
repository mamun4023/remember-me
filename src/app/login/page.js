"use client"

import axios from "axios";

import { useState, useEffect } from "react";


export default function Login() {

  const [credentials, setCrediencials] = useState({
    email : "",
    password : ""
  })
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const changeHandler = (e)=>{
    const {name, value} = e.target;

    setCrediencials(()=> ({
      ...credentials,
      [name] : value
    }))
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    setLoading(true)
    axios.post("http://localhost:4000/login", credentials)
    .then(res =>{
      const {message, access_token, refresh_token} = res?.data
      if(remember){
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
      }else{
        sessionStorage.setItem("access_token", access_token)
        sessionStorage.setItem("refresh_token", refresh_token)
      }
      
      window.location.replace('/')
    }).catch(err=>{
      setLoading(false)
    })
  }

 const hasLogin =()=>{
   if(localStorage.getItem('token') || sessionStorage.getItem('token'))
    return true
  
   return false
 }



  useEffect(()=>{
   if(hasLogin()){
      window.location.replace('/')
   } 
  },[hasLogin])

  return (
    <div className="border-b-gray-300 h-screen flex justify-center items-center">

      <div className="p-3 shadow-lg">
        <form onSubmit = {submitHandler}> 
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name = "email"
            placeholder="email"
            className=" bg-gray-100 p-2 border-[1px] border-gray-900 rounded-lg"
            onChange = {changeHandler}
            value = {credentials.name}
          />

          <input
            type="text"
            name = "password"
            value = {credentials.password}
            onChange = {changeHandler}
            placeholder="password"
            className=" bg-gray-100 p-2 border-[1px] border-gray-900 rounded-lg"
          />

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              value = {remember}
              onChange = {()=> setRemember(prev=> !prev)}
            />
            <p className="text-sm"> Remember Me </p>
          </div>

          <button className="w-full bg-orange-900 text-white p-1 rounded-xl">
            {loading? "Loading..." : "Login"}
          </button>
        </div>

        </form>

        <div>
            <h3> {errorMsg} </h3>
        </div>
      </div>
     
    </div>
  );
}
