import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './login.scss'
import Axios from 'axios'
import {updateUser} from '../../ducks/reducer'

const Login = () => {
  const [emailField, setEmailField] = useState('');
  const [passField, setPassField] = useState('');
  //check session on component mount

  const login = (email, password) => {
    const loginInfo = {
      email,
      password
    }
    Axios.post('/login', loginInfo).then(res => {
      console.log(res.data)
      //update the user here
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='login-container'>
      <h1>Enter your email and password</h1>
      <div className='input-container'>
        <div className='email-input'>
            <h4>Email</h4>
            <input type='email' maxLength='50' value={emailField} onChange={(e) => setEmailField(e.target.value)}/>
        </div>
        <br/>
        <div className='password-input'>
            <h4>Password</h4>
            <input type='password' maxLength='50' value={passField} onChange={(e) => setPassField(e.target.value)}/>
        </div>
      </div>
      <br/>
      <button onClick={() => {login(emailField, passField)}}>Login</button>
      <p>Don't have an account? Sign up <Link to='/register'>here</Link></p>
    </div>
  );
}

const mapToProps = reduxState => {
  const {user} = reduxState

  return {
      user
  }
}

export default connect(mapToProps , {updateUser})(Login)