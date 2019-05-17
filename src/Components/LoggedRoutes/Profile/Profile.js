import React from 'react'
import './profile.scss'
import {connect} from 'react-redux'
import Status from './Status/Status';

const Profile = (props) => {
    const statusList = props.user.projects.map((proj, i) => {
        const calculatedPercent = () => {
            const tasks = proj.tasks.length
            if(tasks === 0){
                return 0
            }
            let completed = 0
            for(let i = 0; i < proj.tasks.length; i++){
                if(proj.tasks[i].completed === true){
                    completed++
                }
            }
            let result = completed*100/tasks
            return result.toFixed(2)
        }
        return (
         <Status key={i}
            proj={proj}
            calculatedPercent={calculatedPercent()}
            
         />
        )
    })
    console.log(props.user.projects.length)
    return (
        <div className='profile-container'>
            <div className='inside-profile-container'>
                <div className='user-info'>
                    <div>{props.user.name}</div>
                    <div>{props.user.email}</div>
                </div>
                <div className='info-container'>
                    <div className='inside-info-container'>
                        <div className='title-container'>
                            <div>Project Name</div>
                            <div>Completion Percentage</div>
                        </div>
                        <div className='status-container'>
                            {props.user.projects.length === 0 ?
                                <div className='non-setup'>You do not have any projects set up</div>
                                : <div>{statusList}</div>
                            }
                        </div>
                    </div>
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
  
export default connect(mapToProps)(Profile)