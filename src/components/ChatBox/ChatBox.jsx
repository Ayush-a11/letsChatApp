import { EmojiEmotions, Mic, Search, Send, Settings } from '@mui/icons-material'
import { Avatar, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase';

function ChatBox() {
	const [textmsg, setTextMsg] = useState();
	const roomid =useParams('roomid');

	const [roomInfo, setRoomInfo] = useState({});
	const handleSubmit =(e) => {
		e.preventDefault();


		setTextMsg('')
	}
	useEffect(() => {
		if (roomid){

			const docRef = doc(db,'Rooms',roomid.roomid)
			getDoc(docRef).then((doc) =>
			setRoomInfo(doc.data())
			).catch(err => 
			// docSnap.data() will be undefined in this case
			console.log("No such document!",err));
			
		}

	},[roomid]);
  return (
	<div className="flex h-full flex-col justify-between bg-white border-l-2 border-gray-300">
		<div className="flex justify-between items-center bg-red-500 pl-4 ">
			<Avatar/>
			<div className="flex flex-col">
			<h1 className="text-white font-mono font-bold text-xl">{roomInfo.name}</h1>
			<p className="text-gray-300">last message at..</p> 
			</div>
			<div>
				<Search className='text-black'/>
				<Settings className='text-black'/>
			</div>
		</div>
		<div className="flex flex-col">

			<div className={`${true ?'bg-red-500 self-end ':'bg-gray-500 self-start'} text-white max-w-fit p-1 rounded-lg ml-2 mr-2 `}>
				<h3 className="-mt-4 text-xs font-mono font-bold text-black" >User</h3>
				<h1>Hello Bro</h1>
				<h3 className="text-xs font-mono font-bold">~10:24PM</h3>
			</div>
		</div>
		<div className='flex justify-between items-center bg-red-500 pl-4 h-12'>
			<EmojiEmotions/>
			<form className='flex-1'>
				<input className='ml-2 w-10/12 pl-4 rounded-lg m' type="text" value={textmsg} onChange={(e)=>setTextMsg(e.target.value)}
					placeholder='Enter your message' />
				<button className="w-1/12 rounded-lg bg-white ml-2 font-mono font-bold text-sm border-2 border-red-500  hover:bg-black
				hover:text-red-500 hover:border-2 hover:border-white"onClick={handleSubmit} >Send <Send/></button>
			</form>
			<Mic className='mr-4'/>
		</div>
	</div>
  )
}

export default ChatBox