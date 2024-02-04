
import { configureStore } from "@reduxjs/toolkit";
import reducers from './authSlice'

reducers

const store =configureStore({
	reducer:reducers
});

export default store;