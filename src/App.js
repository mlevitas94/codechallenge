import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import {Switch, Route} from 'react-router-dom'
import Dashboard from './Components/LoggedRoutes/Dashboard';
import './app.scss'

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/register' component={Register}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route exact path='/' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
