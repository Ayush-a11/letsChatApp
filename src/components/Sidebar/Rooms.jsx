import React from 'react'
import { Avatar, IconButton } from '@mui/material';


function Rooms() {
	
  return (

	<div className="servers">
			
			<div className='flex p-10 border-b-4 hover:bg-gray-500'>
			<Avatar/>
				<div className='flex flex-col pl-4'>
				<h1>Room Name</h1>
				<p>last message...</p>
				</div>
			</div>
			
			
			


		</div>
  )
}

export default Rooms