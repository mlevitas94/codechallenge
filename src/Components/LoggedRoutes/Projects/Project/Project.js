import React, {useState} from 'react'
import './project.scss'
import Task from './Task/Task';
import Axios from 'axios';
import {updateUser} from '../../../../ducks/reducer'
import {connect} from 'react-redux'

const Project = (props) => {
    const[taskInput, setTaskInput] = useState('')

    const taskList = props.tasks.map((task, i) => {
        return (
            <Task
            key={i}
            name={task.name}
            completed={task.completed}
            task_id={task.task_id}
            />
        )
    })
    const submitTask = () => {
        if(taskInput == ''){
            return alert('please input a value')
        }
        const taskData = {
            id: props.id,
            name: taskInput
        }
        Axios.post('/newtask', taskData).then(res => {
            setTaskInput('')
            props.updateUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        <div className='project'>
            <div className='project-name'>{props.name}</div>

            <input placeholder='Add new task...' maxLength={30}
             onChange={(e) => {setTaskInput(e.target.value)}}/>

            <button title='Add task' onClick={() => {submitTask()}}>Add</button>
        
            {props.tasks.length === 0 ? 
                <div className='no-tasks'>You have not created any tasks yet!</div>
                : <div className='task-list-container'>{taskList}</div>}
        </div>
    )
}
const mapToProps = reduxState => {
    const {user} = reduxState
  
    return {
        user
    }
  }
  
export default connect(mapToProps, {updateUser})(Project)
