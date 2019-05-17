import React from 'react'

const Status = (props) => {
   

    return (
        <div className='status'>
            <div className='status-name'>{props.proj.name}</div>
            <div className='percent-container'>
                {props.calculatedPercent} %
            </div>
        </div>
    )
}
export default Status