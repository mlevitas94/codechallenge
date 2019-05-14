import React from 'react'
import './nav.scss'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/dashboard/projects'>Projects</Link>
                </li>
                <li>
                    <Link to='/dashboard/profile'>Profile</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Nav