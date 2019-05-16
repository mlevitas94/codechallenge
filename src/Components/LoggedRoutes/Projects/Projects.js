import React, {useState, useEffect} from 'react'
import './projects.scss'
import Axios from 'axios';
import {connect} from 'react-redux'

const Projects = (props) => {
    const [projNameField, setProjNameField] = useState('')
    console.log(props)
    useEffect(() => {
        if(!props.user.id){
           return props.history.push('/')
        }
    }, [])
    const newProject = () => {
        Axios.post('/newproject', {name: projNameField}).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const openProjectSubmition = () => {
        const input = document.getElementsByClassName('project-submition')[0]
        const slider = document.getElementsByClassName('tooltip')[0]
        input.classList.toggle('submition-on')
        slider.classList.toggle('tool-tip-gone')
    }
    console.log(props)
    return (
        <div className='projects-container'>
            <div className='projects-header'>
                <h1>Project List</h1>
            </div>
            <div className='project-details'>
                <ul>
                    <li>Projects : <span>0</span></li>
                    <li>tasks : <span>0</span></li>
                </ul>
            </div>
            <div className='list-container'>
                <div className='add-button'><span className='plus' onClick={() => {openProjectSubmition()}}>+</span>
                <span className='tooltip'>Create New Project</span>
                </div>
                <span className='project-submition'>
                    <input type='text' value={projNameField} onChange={(e) => {setProjNameField(e.target.value)}} maxLength={50} placeholder='Project Name...'/> 
                    <button className='submit-project' onClick={() => {newProject()}}>Create</button>
                </span>
                {props.user.projects.length < 1 ? <div className='no-projects'>You have no Projects set up!</div>: 'something else'}
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
  
export default connect(mapToProps)(Projects)