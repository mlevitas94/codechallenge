import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './register.scss'
import Axios from 'axios';

const Register = () => {
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passField, setPassField] = useState('');

    const register = (name, email, password) =>{
        const signup = {
            name,
            email,
            password
        }
        Axios.post('/register', signup).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        <div className='register-container'>
            <h1>Please fill out the information below to get started!</h1>
                <div className='signup-name'>
                    <h4>Full name</h4>
                    <input type='text' maxLength='50' value={nameField} onChange={(e) => setNameField(e.target.value)}/>
                </div>
                <br/>
                <div className='signup-email'>
                    <h4>Email</h4>
                    <input type='email' maxLength='50' value={emailField} onChange={(e) => setEmailField(e.target.value)}/>
                </div>
                <br/>
                <div className='signup-password'>
                    <h4>Password</h4>
                    <input type='password' maxLength='50' value={passField} onChange={(e) => setPassField(e.target.value)}/>
                </div>
                <br/>
                <button onClick={() => register(nameField, emailField, passField)}>Register</button>
            <p>Already have an account? Login <Link to='/'>here</Link></p>
        </div>
    )
}
export default Register