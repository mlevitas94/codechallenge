import React from 'react'
import './task.scss'

const Task = (props) => {
    return (
        <div className='task'>
            <div className='task-name'>{props.name} <span>+</span></div>
        </div>
    )
}
export default Task