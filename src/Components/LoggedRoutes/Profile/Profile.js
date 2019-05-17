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
    return (
        <div className='profile-container'>
            <div className='inside-profile-container'>
                <div className='user-info'>
                    <div>Name</div>
                    <div>Email</div>
                </div>
                <div className='info-container'>
                    <div className='status-container'>
                        {statusList}
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