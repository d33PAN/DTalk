import React, { useEffect } from 'react'
import Chat from './Chat'
import "./home.css";
import Sidebar from './Sidebar';

function Home() {
  useEffect(()=>{
    document.title = "Home | JTalk"
  },[]);
  
  return (
    <>
    <div className="home">
        <div className="homeContainer">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
    </>
  )
}

export default Home