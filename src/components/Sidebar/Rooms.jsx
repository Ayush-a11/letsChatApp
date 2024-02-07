import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../../firebase';


function Rooms({id,name,image}) {
	const src= name.split('');
	const [colors,setColors]= useState('red');
	console.log('src',colors,'id',id)
	const [lastMsg, setLastMsg] = useState();
	useState(()=>{
		const colors= ['red','blue','Violet','Pink','Orange','Yellow']

		const index= Math.floor(Math.random()*colors.length +1);
		console.log(index)
		setColors(colors[index])
	},[]);
 
	useEffect(()=>{
		if(id){
			const q =query(collection(db,"Rooms",id,"Messages"),orderBy('timestamp','desc'),limit(1))
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const updatedMessages =[];
                querySnapshot.forEach((doc) => {
                    updatedMessages.push(doc.data().message);
                });
                setLastMsg(updatedMessages[0]);
            });
            return unsubscribe;
		}
	},[]) 

	console.log(lastMsg)
  return (
	<Link to={`/Rooms/${id}/${colors}`}>	
	<div className="servers">
			
			<div className={`flex p-10 shadow-2xl shadow-red-500 border-red-500  font-mono font-bold hover:bg-red-500 hover:text-white`}>
			<Avatar sx={{bgcolor:colors}}>{src[0]}</Avatar>
				<div className='flex flex-col pl-4'>
				<h1 className='text-2xls'>{name}</h1>
				<div className='flex'>
				<p className='text-sm'><b>last message..</b></p>
				<p className='text-gray-500'> {lastMsg?.substring(0, 20)}..	</p>
				</div>
				</div>
			</div>
		</div>
	</Link>		

  )
}

export default Rooms