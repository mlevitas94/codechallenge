import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './Nav/Nav'
import Projects from './Projects/Projects';
import Profile from './Profile/Profile';
import './dashboard.scss'

const Dashboard = (props) => {
    useEffect(() => {
        if(!props.user.id){
           return props.history.push('/')
        }
    }, [])
    return (
        <div className='dashboard-container'>
            <Nav passedProps={props}/>
            <Switch>
                <Route path='/dashboard/projects' component={Projects}/>} />
                <Route path='/dashboard/profile' component={Profile}/>
            </Switch> 
        </div>    
    )
}
const mapToProps = reduxState => {
    const {user} = reduxState
  
    return {
        user
    }
  }
  
export default connect(mapToProps)(Dashboard)