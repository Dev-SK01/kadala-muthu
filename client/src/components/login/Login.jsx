import React from 'react'
import {Button} from '@mui/material';
import logo from '../../assets/logo.jpeg'
import './login.css'
const Login = () => {
  const googleIcon = 'https://cdn.iconscout.com/icon/free/png-512/free-google-152-189813.png?f=webp&w=256'
  return (
      <div className="login-container">
        <h1>Welcome to Kadala Muthu</h1>
        <img 
        src={logo} 
        alt="Kadala Muthu" />

        <div className='sign-in'>
          <Button 
          variant="contained"
          >
            Sign in With Google
           <img 
           src={googleIcon} 
           alt="google-Icon" 
           className="google"
           />
          </Button> 
        </div>
      </div>
  )
}

export default Login