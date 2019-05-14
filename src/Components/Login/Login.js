import React from 'react';
import {Link} from 'react-router-dom'
import './login.scss'

const Login = () => {
  return (
    <div className='login-container'>
      <h1>Enter your email and password</h1>
      <div className='input-container'>
        <div className='email-input'>
            <h4>Email</h4>
            <input type='email'/>
        </div>
        <br/>
        <div className='password-input'>
            <h4>Password</h4>
            <input type='password'/>
        </div>
      </div>
      <br/>
      <button>Login</button>
      <p>Don't have an account? Sign up <Link to='/register'>here</Link></p>
    </div>
  );
}

export default Login;