import React, { useCallback, useEffect, useState } from 'react'
import { Search,Refresh,Menu, NewspaperSharp } from '@mui/icons-material'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import Rooms from './Rooms';
import db from '../../firebase'
import { collection, getDocs,doc, addDoc, getDoc  } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Sidebar() {

	const [rooms, setRooms] =useState([]);
	const selector= useSelector((state)=>state.user)
	


	const handleSubmit= useCallback(() => {
	const newRoom= prompt("Enter server Name");

		if(newRoom){
			addDoc(collection(db, "Rooms"),{name:newRoom, images:''}).
			then((response) =>(
				getDoc(doc(db,"Rooms",response.id))
					.then((res)=>setRooms((prev)=>[...prev,{id:res.id,...res.data()}])))
					.catch(error=> console.log('error',error)
			)).
			catch((error) => console.log(error))
		}
	},[]);
	
	console.log('rooms= ',rooms);
	useEffect(()=>{	
		setRooms([])
		console.log('useEffect called');
		getDocs(collection(db, "Rooms")).then((querySnapshot) => {
			querySnapshot.forEach((doc) => 
			  
				setRooms((prev) => [...prev,{id: doc.id,...doc.data()}]))
			
			});
	},[])
  return (
	<div className="flex flex-col">
		<div className="flex items-center justify-between w-full bg-red-500 border-b-2 border-white h-12">
		<div className="topIcons">
		<IconButton>
		<Avatar src={selector.photoURL}/>	
		</IconButton>
		</div>
		<div className="searchRoom">
		<IconButton><Search className='text-black'/></IconButton>
			<input className="w-full rounded-xl pl-4 border-none border-white " type="text" placeholder="Search Your Server"/>
		</div>
		<div className="pr-4">
		<IconButton>	
		<Refresh className='text-black'/>
		</IconButton>
		<IconButton>
		<Menu className='text-black'/>
		</IconButton>
		</div>
		</div>
		<div onClick={handleSubmit} className='cursor-pointer w-full flex justify-center border-b-1 bg-white border-b-2 border-red-500 font-mono font-bold hover:bg-red-500 hover:text-white shadow-lg '>
				<button  onClick={handleSubmit}>Add Server</button>
			</div>
		{rooms && rooms.map((item)=>
		
			<div key={item.id}>
			<Rooms id={item.id} name={item.name} image={item.image}/>
			</div>
		)}
		

		


	</div>
  )
}

export default Sidebar