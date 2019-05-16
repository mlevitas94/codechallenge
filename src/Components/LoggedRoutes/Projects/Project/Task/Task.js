import React from 'react'
import './task.scss'

const Task = (props) => {
    return (
        <div className='tasks'>
            {props.name}
        </div>
    )
}
export default Task