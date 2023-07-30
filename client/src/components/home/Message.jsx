import React, { useContext, useEffect, useRef } from 'react'
import { AuthenticationContext } from '../../context/AuthenticationContext'
import { ChatContext } from '../../context/ChatContext';

function Message({message}) {
  const ref = useRef()
  const currentUser = useContext(AuthenticationContext);
  const {data} = useContext(ChatContext);
useEffect(()=>{
  ref.current?.scrollIntoView({behavior:"smooth"})
},[message])
  return (
    <div className={message.senderId === currentUser.uid?"owner":"message"} ref={ref}>
        <div className="messageInfo">
          <img src={message.senderId === currentUser.uid? currentUser.photoURL:data.user.photoURL} alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
      {message.text &&<p>{message.text}</p>}
     { message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message