import React,{useEffect, useState} from 'react';
import "./styles.css";
import addAvatar from "../../assets/addAvatar.svg";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../../firebase.js";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase.js';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useNavigate,Link } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [error,setError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    displayName:"",
    email:"",
    password:"",
    imageUrl:""
  })

  useEffect(()=>{
    document.title = "Register | JTalk"
  },[]);
  
  function handleChange(e){
    setUserDetails(prev=>{
      return {...prev,[e.target.name]:e.target.name !== "imageUrl"?e.target.value:e.target.files[0]}
    })
  }
async function handleSubmit(e){
  e.preventDefault();
  const displayName = userDetails.displayName;
  try {

    const res =await createUserWithEmailAndPassword(auth,userDetails.email,userDetails.password);

    console.log(res)

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, userDetails.imageUrl);


uploadTask.on(
 (error) => {
  setError(true)
  if(error){
    console.log("error due to 40")
  }
  }, 
 () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL
      })

      await setDoc(doc(db, "users", res.user.uid), {
        uid:res.user.uid,
        displayName:displayName,
        email:userDetails.email,
        photoURL: downloadURL
      });
      await setDoc(doc(db,"userChats",res.user.uid), {});
      navigate("/")
    });
  }
);
  } catch (error) {
    setError(true);
    console.log(error)
  }
}
  return (
    <div className='register'>
        <div className="formWrapper">
          <span className='logo'>JayChat</span>
          <span className='title'>Register</span>
          <form onSubmit={handleSubmit} >
            <input type="text" name="displayName"  placeholder='display name' 
            onChange={handleChange}/>
            <input type="email" name="email" placeholder='email'
            onChange={handleChange}/>
            <input type="password" name="password"placeholder='password' 
            onChange={handleChange}/>
            <input type="file" name="imageUrl" id="inputFile" style={{display:"none"}}  accept='image/*'
            onChange={handleChange}/>
            <label htmlFor="inputFile">
              <img src={addAvatar} alt="" width="24px" />
              <span>Add an avatar</span>
            </label>
            <button type='submit'>Sign up</button>
            {error? <span style={{fontSize:"16px",color:"red",textAlign:"center"}}>Something went wrong.<br/> please try again!</span>:<span></span>}
          </form>
    
          <p>Already have an account?<Link to = "/login"> Login</Link></p>
        </div>
    </div>
  )
}

export default Register