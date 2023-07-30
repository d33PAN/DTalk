import React,{useEffect, useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';



function Login() {
  const navigate = useNavigate();
  const [error,setError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email:"",
    password:"",
  })
  
  useEffect(()=>{
    document.title = "Login | JTalk"
  },[]);

  function handleChange(e){
    setUserDetails(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
async function handleSubmit(e){
  e.preventDefault();
  console.log(userDetails);
  try {
   await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
   navigate("/")
    
  } catch (error) {
    setError(true);
  }
}

  return (
    <>
    <div className='login'>
        <div className="formWrapper">
          <span className='logo'>JayChat</span>
          <span className='title'>Login</span>
          <form onSubmit={handleSubmit} >
            <input type="email" name="email" placeholder='email'
            onChange={handleChange}/>
            <input type="password" name="password"placeholder='password' 
            onChange={handleChange}/>
            <button>Sign in</button>
            {error? <span style={{fontSize:"16px",color:"red",textAlign:"center"}}>Something went wrong.<br/> please try again!</span>:<span></span>}

          </form>
          <p>New to JTalk? <Link to="/register"> Register</Link></p>
        </div>
    </div>
    </>
  )
}

export default Login