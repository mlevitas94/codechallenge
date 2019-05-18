import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './login.scss'
import Axios from 'axios'
import {updateUser} from '../../ducks/reducer'

const Login = (props) => {

  const [emailField, setEmailField] = useState('');
  const [passField, setPassField] = useState('');
  useEffect(() => {
    if(props.user.id){
        return props.history.push('/dashboard/projects')
    }

    Axios.get('/getuser').then(res => {
      props.updateUser(res.data)
      return props.history.push('/dashboard/projects')
    }).catch(err => {

    })
}, [])
  const login = (email, password) => {
    const errMsg = document.getElementById('login-err')
    errMsg.innerText = ''

    if(emailField === '' || passField === ''){
      return errMsg.innerText='Please fill out all fields'
    }
    const loginInfo = {
      email,
      password
    }
    Axios.post('/login', loginInfo).then(res => {
      props.updateUser(res.data)
      setEmailField('')
      setPassField('')
      props.history.push('/dashboard/projects')

      
    }).catch(err => {
      const errMsg = document.getElementById('login-err')
      errMsg.innerText = 'Invalid username or password'
      
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
        <div className='login-err' id='login-err'></div>
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