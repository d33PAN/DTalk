import React, { useContext } from 'react'
import "./home.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthenticationContext } from '../../context/AuthenticationContext';
function Navbar() {
  const currentUser = useContext(AuthenticationContext);
  return (
    <div className='navbar'>
      {window.innerWidth <="700px" && <span className="navbarLogo">JTalk</span>}
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>{signOut(auth)}}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar