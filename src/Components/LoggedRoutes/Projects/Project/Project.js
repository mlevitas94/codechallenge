import React from 'react'
import './project.scss'
import Task from './Task/Task';

const Project = (props) => {
    const taskList = props.tasks.map(task => {
        return (
            <Task
            name={task.name}
            completed={task.completed}
            task_id={task.task_id}

            />
        )
    })
    return(
        <div className='project'>
            <div className='project-name'>{props.name}</div>
            <div className='task-list'>{taskList}</div>
        </div>
    )
}
export default Project