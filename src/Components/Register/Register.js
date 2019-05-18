import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './register.scss'
import Axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/reducer'

const Register = (props) => {
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passField, setPassField] = useState('');

    useEffect(() => {
        if(props.user.id){
            props.history.push('/dashboard/projects')
        }
        Axios.get('/getuser').then(res => {
            props.updateUser(res.data)
            props.history.push('/dashboard/projects')
        })
    }, [])

    const register = (name, email, password) =>{
        const fieldErr = document.getElementById('field-err')
        fieldErr.innerText = ''
        if(nameField === '' || emailField ==='' || passField === ''){
            return fieldErr.innerText='Please fill out all fields'
        }
        const signup = {
            name,
            email,
            password
        }
        Axios.post('/register', signup).then(res => {
            props.updateUser(res.data)
            setNameField('')
            setEmailField('')
            setPassField('')
            props.history.push('/dashboard/projects')
        }).catch(err => {
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
                <span className='email-err' id='field-err'></span>
                <br/>
                <button onClick={() => register(nameField, emailField, passField)}>Register</button>
            <p>Already have an account? Login <Link to='/'>here</Link></p>
        </div>
    )
}
const mapToProps = reduxState => {
    const {user} = reduxState
  
    return {
        user
    }
  }
export default connect(mapToProps , {updateUser})(Register)