import Sidebar from "./components/Sidebar/Sidebar"
import "./App.css"
import ChatBox from "./components/ChatBox/ChatBox"
function App() {

  return (
    <>
      <h1> Welcome to lets chat app</h1>
      <div className=" flex w-full h-screen bg-gray-600 shadow-xl">
        <div className="sidebar">
        <Sidebar/>
        </div>
        <div className="chatbox">
        <ChatBox/>
        </div>
      </div>
    </>
  )
}

export default App
