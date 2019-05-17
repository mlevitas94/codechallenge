import React from 'react'
import './task.scss'

const Task = (props) => {
    return (
        <div className='task'>
            <div className='complete-button'>+</div>
            <div className='task-name'>{props.name}</div>
        </div>
    )
}
export default Task