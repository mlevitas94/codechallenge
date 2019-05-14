import React from 'react';
import Nav from './Nav/Nav';
import {Switch, Route} from 'react-router-dom';

const Dashboard = () => {
    return(
        <div className='dashboard-container'>
            <Nav/>
            <Switch>
                <Route exact path='/dashboard' />

            </Switch>
        </div>
    )
}
export default Dashboard