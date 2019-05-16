import React, {useState, useEffect} from 'react'
import './projects.scss'
import Axios from 'axios';
import {connect} from 'react-redux'
import Project from './Project/Project'
import {updateUser} from '../../../ducks/reducer'

const Projects = (props) => {
    const [projNameField, setProjNameField] = useState('')
    useEffect(() => {
        if(!props.user.id){
           return props.history.push('/')
        }
    }, [])
    const newProject = () => {
        Axios.post('/newproject', {name: projNameField}).then(res => {
            console.log(res.data)
            props.updateUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const openProjectSubmition = () => {
        const input = document.getElementsByClassName('project-submition')[0]
        input.classList.toggle('submition-on')
    }
    
    const projects = props.user.projects.map((proj, i) => {
        return (
            <Project
                key={i}
                name={proj.name}
                tasks={proj.tasks}
            />
        )
    })

    return (
        <div className='projects-container'>
            <div className='projects-header'>
                <h1>Project List</h1>
            </div>
            <div className='project-details'>
                <ul>
                    <li>Projects : <span>{props.user.projects.length}</span></li>
                    <li>tasks : <span>{props.user.taskLength}</span></li>
                </ul>
            </div>
            <div className='list-container'>
                <div className='add-button'>
                    <span className='plus' onClick={() => {openProjectSubmition()}}>+</span>
                </div>
                <div className='project-submition'>
                    <input type='text' value={projNameField} onChange={(e) => {setProjNameField(e.target.value)}} maxLength={30} placeholder='Project Name...'/> 
                    <button className='submit-project' onClick={() => {newProject()}}>Create</button>
                </div>
                <div className='conditional-container'>
                {props.user.projects.length < 1 ? 
                    <div className='no-projects'>You have no Projects set up!</div>
                     :
                    <div className='all-projects'>{projects}</div>}
                </div>
            </div>
        </div>
    )
}
const mapToProps = reduxState => {
    const {user} = reduxState
  
    return {
        user
    }
  }
  
export default connect(mapToProps, {updateUser})(Projects)