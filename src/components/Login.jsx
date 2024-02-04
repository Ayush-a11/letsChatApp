import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { provider,auth } from '../firebase';
import { useDispatch } from 'react-redux';
import {logIn} from './Redux/authSlice'

function Login() {
  const dispatch= useDispatch();

  const handleLogin =()=>{
    signInWithPopup(auth,provider).
    then((result)=>
      dispatch(logIn(result))
    ).
    catch(err=>console.log(err));
  }
  return (
	<div>

        <button onClick={handleLogin}>SignIn With Google</button>
  </div>
  )
}

export default Login