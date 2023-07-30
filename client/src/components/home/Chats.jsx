import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { onSnapshot,doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';

function Chats() {
  const  currentUser = useContext(AuthenticationContext);
  const {dispatch}= useContext(ChatContext);
  const [chats,setChats] = useState([]);
  useEffect(()=>{
    function getChats(){
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      doc.data() && setChats(doc.data())
      });
      return ()=>{
        unsub();
      }
    }
    currentUser.uid && getChats();
    },[currentUser.uid]);

    const handleSelect = (user)=>{
      dispatch({type:"ChangeUser", payload:user})
    }
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
        return(
      <div className="userChat" key={chat[0]}
      onClick={()=>{handleSelect(chat[1].userInfo)}}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>

        )
      })}
    </div>

  )
}

export default Chats