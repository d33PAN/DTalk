import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import "./home.css";
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';


function Messages() {
  

  const {data} = useContext(ChatContext);
  const [messages,setMessages] = useState([]);

 useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId),doc=>{
      setMessages(doc.data().message)
    });
    return()=>{
    unsub()
    }
  },[data.chatId])

 
  return (
    <div className='messages'>
      {messages?.map(message=>{
        return(

          <Message  message = {message} key = {message.id}/>
        )
      })}
    </div>
  )
}

export default Messages