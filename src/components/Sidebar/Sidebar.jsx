import React, { useCallback, useEffect, useState } from 'react'
import { Search,Refresh,Menu, NewspaperSharp } from '@mui/icons-material'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import Rooms from './Rooms';
import db from '../../firebase'
import { collection, getDocs,doc, addDoc  } from "firebase/firestore";
import { Link } from 'react-router-dom';
function Sidebar() {

	const [rooms, setRooms] =useState([]);
	
	const getRoomsDetails =()=>{
		
		getDocs(collection(db, "Rooms")).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
			  const newRoom = {
				id: doc.id,
				name: doc.data().name,
				image: doc.data().image
			  };
		  
			  // Check if the room with the same id already exists in state
			  if (!rooms.some(room => room.id === newRoom.id)) {
				setRooms((prev) => [...prev, newRoom]);
			  }
			});
		  });
	}
	const handleSubmit= useCallback(() => {
	const newRoom= prompt("Enter server Name");

		if(newRoom){
			addDoc(collection(db, "Rooms"),{name:newRoom, images:''}).
			then((response) =>(
				getRoomsDetails()
			)).
			catch((error) => console.log(error))
		}
	},[]);

	console.log('rooms= ',rooms);
	useEffect(()=>{	
		console.log('useEffect called');
		getRoomsDetails();
	},[])
  return (
	<div className="flex flex-col">
		<div className="flex items-center justify-between w-full bg-red-500 border-b-2 border-white h-12">
		<div className="topIcons">
		<IconButton>
		<Avatar/>	
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
		<div onClick={handleSubmit} className='cursor-pointer w-full flex justify-center border-b-2 bg-white font-mono font-bold hover:bg-red-500 hover:text-white shadow-lg '>
				<button onClick={handleSubmit}>Add Server</button>
			</div>
		{rooms && rooms.map((item)=>
		<Link to={`/Rooms/${item.id}`}>
			<div key={item.id}>
			<Rooms id={item.id} name={item.name} image={item.image}/>
			</div>
		</Link>
		)}
		

		


	</div>
  )
}

export default Sidebar