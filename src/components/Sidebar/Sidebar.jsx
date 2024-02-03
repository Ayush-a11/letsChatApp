import React from 'react'
import { Search,Refresh,Menu } from '@mui/icons-material'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import Rooms from './Rooms';
function Sidebar() {
	const handleSubmit=() => {

		const room= prompt("Enter server Name");

		if(room){

		}
	}
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
		<Rooms/>

		<Rooms/>

		<Rooms/>


	</div>
  )
}

export default Sidebar