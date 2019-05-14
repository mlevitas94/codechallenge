import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Nav from './Nav/Nav'
import Projects from './Projects/Projects';
import Profile from './Profile/Profile';
import './dashboard.scss'

const Dashboard = () => {
    //force a route pick here upon log in or attempt to view
    return (
        <div className='dashboard-container'>
            <Nav/>
            <Switch>
                <Route path='/dashboard/projects' component={Projects}/>
                <Route path='/dashboard/profile' component={Profile}/>
            </Switch> 
        </div>    
    )
}
export default Dashboard