import { Collections, CopyAll, EmojiEmotions, Mic, Search, Send, Settings } from '@mui/icons-material'
import { Avatar, Menu } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {useParams} from 'react-router-dom'
import { addDoc, doc, getDoc, onSnapshot, where } from "firebase/firestore";
import { collection, getDocs,orderBy,query,Timestamp 	  } from "firebase/firestore";

import db from '../../firebase';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

function ChatBox() {
	const [textmsg, setTextMsg] = useState();
	const {roomid,colors} =useParams('roomid');
	const [message,setMessages] =useState([]);
	const [roomInfo, setRoomInfo] = useState({});
	const selector =useSelector((state)=>state.user);
	const divRef = useRef(null);


	console.log(roomid,colors);
	console.log('message',message);
	useEffect(() => {
        setMessages([]);
        if (roomid) {
            const q = query(collection(db, 'Rooms', roomid, 'Messages'), orderBy('timestamp', 'asc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const updatedMessages = [];
                querySnapshot.forEach((doc) => {
                    updatedMessages.push(doc.data());
                });
                setMessages(updatedMessages);
            });
            return unsubscribe;
        }
    }, [roomid]);

	const handleSubmit =(e) => {
		e.preventDefault();
        
		addDoc(collection(db,"Rooms",roomid,"Messages"),{
			message: textmsg,
			username: selector.displayName,
			timestamp: Timestamp.fromDate(new Date())
		}).then((id)=> console.log('added')
					// getDoc(doc(db,"Rooms",roomid,"Messages",id.id))
					// .then((res)=>setMessages((prev)=>[...prev,res.data()])))
					// .catch(error=> console.log('error',error)
					);
		
		setTextMsg('')
	}

	useEffect(() => {
		if (divRef.current) {
		console.log(divRef)
		  divRef.current.scrollTop = divRef.current.scrollHeight;
		}
	  }, [message]);

	useEffect(() => {
		if (roomid){
			const docRef = doc(db,'Rooms',roomid)
			getDoc(docRef).then((doc) =>
			setRoomInfo(doc.data())
			).catch(err => 
			// docSnap.data() will be undefined in this case
			console.log("No such document!",err));
			
		}

	},[roomid]);
  return (
<div
  className="flex h-full flex-col justify-between border-l-2 border-gray-300">
	<div className="flex justify-between items-center bg-red-500 pl-4 ">
			<Avatar  sx={{bgcolor:colors, color:'black', border:'2px solid white'}} ><b>{roomInfo?.name?.substring(0,1)}</b></Avatar>
			<div className="flex flex-col">
			<h1 className="text-white font-mono font-bold text-xl">{roomInfo.name}</h1>
			<p className="text-gray-300">last message at.. { message[message.length -1]?.timestamp.seconds||' '}</p> 
			</div>
			<div>
				<Search className='text-black'/>
				<Settings className='text-black'/>
			</div> 
		</div>
		<div ref={divRef} className="w-full h-full flex flex-col overflow-y-scroll bg-[url('https://img.freepik.com/free-vector/hand-drawn-doodle-icons-set_1308-90706.jpg?w=740&t=st=1707148625~exp=1707149225~hmac=c440157e62ff2026c425c36a4df58678a16c853093aa32b8a32574e77199561b')]"
		>	
			{message && message.map((message) =>
			<div  key={message.message} className={`${selector.displayName==message.username ?'bg-red-500 self-end ml-40 ':'bg-gray-500 self-start mr-40'}  mb-8 mt-8 text-white max-w-fit p-1 rounded-lg ml-2 mr-2 `}>
				<div className="flex items-center justify-between text-xs w-full rounded-xl font-mono font-bold text-white pr-2">
				<div className="flex items-center text-xs max-w-fit rounded-xl font-mono font-bold text-white bg-black pr-2">
				<Avatar   sx={{ width: 24, height: 24 }}/>
				<h3 className="pl-2" >
					{message.username}</h3>
				</div>
				<div className='flex pr-2	 max-w-fit rounded-lg font-mono font-bold text-white bg-black ml-2'>
					<button title="Copy" className=" pl-2 hover:scale-110 transition-transform duration-300"
						onClick={(e)=>window.navigator.clipboard.writeText(message.message)}
					><CopyAll/></button>
				</div>
				</div>
				
				<h1 className='text-xl text-mono'>{message.message}</h1>
				<h3 className="text-xs font-mono font-bold">{message.timestamp.seconds}</h3>
			</div>
			)}
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