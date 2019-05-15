import React from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios';
import {updateUser} from '../../../ducks/reducer'

const Nav = (props) => {
    const {passedProps} = props
    const logout = () => {
        Axios.get('/logout').then(res => {
            props.updateUser({})
            passedProps.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(props)
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/dashboard/projects'>Projects</Link>
                </li>
                <li>
                    <Link to='/dashboard/profile'>Profile</Link>
                </li>
                <li>
                    <button onClick={() => {logout()}}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}
  
export default connect(null, {updateUser})(Nav)