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
                <div title='Check to complete' className='complete-button-false' onClick={() => {updateTask()}}><i class="fas fa-minus"></i></div>
                 :<div title='Uncheck' className='complete-button-true' onClick={() => {updateTask()}}><i className="fas fa-check"></i></div>}
            <div className='task-name'>{props.name}</div>
        </div>
    )
}
export default connect(null, {updateUser})(Task)