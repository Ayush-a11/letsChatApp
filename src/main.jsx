import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,createRoutesFromElements,RouterProvider, BrowserRouter,Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import ChatBox from './components/ChatBox/ChatBox.jsx'
import { Provider } from 'react-redux'
import store from './components/Redux/Store.js'

const app=  createBrowserRouter(createRoutesFromElements(
  
    <Route path='/' element={<App/>}>
      <Route path='Rooms/:roomid' element={<ChatBox/>}/>
    </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={app}/>
  </Provider>
  // </React.StrictMode>,
)
