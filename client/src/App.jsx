import React, { useContext, useEffect } from 'react'
import Register from './components/login&register/Register';
import Login from './components/login&register/Login';
import Home from './components/home/Home';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { AuthenticationContext } from './context/AuthenticationContext';

function App() {
  const  currentUser = useContext(AuthenticationContext);
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return(<Navigate to="/login" />);
    }
    return children;
  }
useEffect(()=>{
},[currentUser]);

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route exact path='/login' element = {<Login/>}/>
    <Route exact path='/register' element = {<Register/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App