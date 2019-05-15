import React, {useState} from 'react'
import './projects.scss'

const Projects = (props) => {
    const [projNameField, setProjNameField] = useState('')

    const newProject = () => {

    }

    const openProjectSubmition = () => {
        const input = document.getElementsByClassName('project-submition')[0]
        const slider = document.getElementsByClassName('tooltip')[0]
        input.classList.toggle('submition-on')
        slider.classList.toggle('tool-tip-gone')
    }
    console.log(projNameField)
    return (
        <div className='projects-container'>
            <div className='projects-header'>
                <h1>Welcome back 'namehere'</h1>
            </div>
            <div className='project-details'>
                <ul>
                    <li>Projects : <span>0</span></li>
                    <li>tasks : <span>0</span></li>
                </ul>
            </div>
            <div className='list-container'>
                <div className='add-button'><span onClick={() => {openProjectSubmition()}}>+</span>
                <span className='tooltip'>Create New Project</span>
                </div>
                <span className='project-submition'>
                    <input type='text' value={projNameField} onChange={(e) => {setProjNameField(e.target.value)}} maxLength={50} placeholder='Project Name...'/> 
                    <button className='submit-project'>Submit</button>
                </span>
                <p>Where projects will go</p>
            </div>
        </div>
    )
}
export default Projects