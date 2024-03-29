
import { configureStore } from "@reduxjs/toolkit";
import reducers from './authSlice'

reducers

const store =configureStore({
	reducer:reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
		  serializableCheck: false,
		}),
});

export default store;