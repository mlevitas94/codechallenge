import React from 'react'
import './task.scss'
import Axios from 'axios';
import {connect} from 'react-redux'
import {updateUser} from '../../../../../ducks/reducer'

const Task = (props) => {
    const updateTask = () => {
        const task = {
            id : props.task_id,
            completed : props.completed
        }

        Axios.post('/updatetask', task).then(res => {
            props.updateUser(res.data)

        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='task'>
            {props.completed === false ?
                <div className='complete-button-false' onClick={() => {updateTask()}}><i className="fas fa-times"></i></div>
                 :<div className='complete-button-true' onClick={() => {updateTask()}}><i className="fas fa-check"></i></div>}
            <div className='task-name'>{props.name}</div>
        </div>
    )
}
export default connect(null, {updateUser})(Task)