import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user:null
}

const authSlice=createSlice({
		name:'Auth',
		initialState,
		reducers:{
			logIn(state,action){
				state.user =action.payload;
			}
		}
	});

const reducers =authSlice.reducer;
export default reducers;
export const {logIn} = authSlice.actions;