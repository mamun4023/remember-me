"use client"


import Userlist from "@/components/UserData"

export default function Home() {

const logout = ()=>{
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('refresh_token')
  window.location.replace('/login')
}





return (
  <div className="border-b-gray-300 h-screen ">
    <div className="flex justify-end p-3 shadow-lg">
      <button className = "bg-slate-300 p-2 rounded-full" onClick = {logout}>Logout</button>
    </div>


     <Userlist />

  </div>
)}
