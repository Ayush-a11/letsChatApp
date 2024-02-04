import Sidebar from "./components/Sidebar/Sidebar"
import "./App.css"
import ChatBox from "./components/ChatBox/ChatBox"
import { useEffect, useState } from "react"
import { Label } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import { useSelector } from "react-redux";
function App() {
  const [room, setRoom] =useState();
  const selector= useSelector((state)=>(state.user))
  const [user, setUser] =useState(selector);

  return (
    <>
      <h1> Welcome to lets chat app</h1>
      <div className="  flex  w-full h-screen bg-gray-600 shadow-xl">
        {user? 
        <>
        <div className="sidebar ">
        <Sidebar/>
        </div>
        <div className="hidden absolute w-96 h-auto p-10 flex flex-col justify-between items-center bg-red-500 rounded-lg shadow-2xl  justify-self-center self-center ">
          <h1 className="font-mono font-bold -mt-8 text-3xl">Enter Room Details</h1>
          <form className="flex flex-col w-full items-center">
            <Avatar src="./"><input type="file" className=""/></Avatar>
           <label className="font-bold font-mono mb-4">Room Avatar</label>
            
            <div className=" flex space-x-2 mb-4">
            <label className="font-bold font-mono ">Room Name</label>
            <input className="rounded-lg border-0 text-center" type="text" value={room} onChange={(e)=>setRoom(e.target.value)}/>
            </div>
            <button className="bg-black text-red-500 border-2 border-red-500 font-mono font-bold
            hover:bg-red-500 hover:border-black hover:text-black p-1 shadow-xl rounded-xl  ">Add Room</button>
          </form>

        </div>
        <div className="chatbox ">
          <Outlet/>
        </div>
        </>
        :<Login/>}
       
      </div>
    </>
  )
}

export default App
