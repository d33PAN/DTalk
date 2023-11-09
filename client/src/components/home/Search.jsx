import React, { useContext, useState, useEffect } from 'react';
import "./home.css";
import { collection, query, where,getDoc,getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {AuthenticationContext} from "../../context/AuthenticationContext"
import { db } from '../../firebase';
function Search() {
const currentUser = useContext(AuthenticationContext);
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  const {error,setError} = useState(false);

async function handleSelect(){

  const combinedId =
   currentUser.uid > user.uid? 
   currentUser.uid + user.uid:
   user.uid + currentUser.uid

   try {

    const res = await getDoc(doc(db,"chats",combinedId));

    if(!res.exists()){
      await setDoc(doc(db,"chats",combinedId),{message:[]});

      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId+".userInfo"]:{
          uid : user.uid,
          displayName : user.displayName,
          photoURL : user.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });

      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedId+".userInfo"]:{
          uid : currentUser.uid,
          displayName : currentUser.displayName,
          photoURL : currentUser.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });

    }
  } catch (error) {
    setError(true)
  }
  setUsername("");
  setUser(null);
  }
  async function handleSearch(){
    const q = query(
      collection(db,"users"),
      where("displayName", "==", username)
    );
    try {
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {  
        setUser(doc.data());
      });

    } catch (error) {
      setError(true);
    } 
  }

  function handleKey(e){
    e.code === "Enter" && handleSearch()
  }
  useEffect(() => {
    let subs = true;
    subs && handleSearch();
  
    return () => {
      subs = false;
    }
  }, [username]);
  
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='find user' value={username} onChange={(e)=>{setUsername(e.target.value);}}
        onKeyDown={handleKey} />
      </div>
      {error && <span style={{color:"red"}}>Something went wrong!</span>}

      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
        <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search