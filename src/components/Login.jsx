import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { provider,auth } from '../firebase';
import { useDispatch } from 'react-redux';
import {logIn} from './Redux/authSlice'
import { Button } from '@mui/material';
import { Chat, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const handleLogin =()=>{
    signInWithPopup(auth,provider).
    then((result)=>
      dispatch(logIn(result.user)))
      .then(()=> navigate('/')).
    catch(err=>console.log(err));
  }
  return (
	<div className="flex justify-center items-center bg-red-500 w-full ">
      <div className="flex flex-col w-1/2 h-auto p-10 items-center bg-red-100 bg-opacity-100 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl text-mono mb-10 font-bold  shadow-sm" >Login To Let's Chat <Chat/></h1>
        <img className="w-1/2 h-60 mb-4 mix-blend-multiply" src="https://img.freepik.com/free-vector/happy-man-online-dating-via-laptop_74855-7495.jpg?size=626&ext=jpg&ga=GA1.1.1643605257.1703922404&semt=sph"/>
        <button className='bg-red-500 text-white rounded-xl p-2 font-bold font-mono border-2
        hover:bg-white hover:text-red-500 hover:border-red-500 text-xl' onClick={handleLogin}>SignIn With <Google/>oogle</button>
      </div>
  </div>
  )
}

export default Login