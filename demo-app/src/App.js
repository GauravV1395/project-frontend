import React from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom"
import Employees from './components/empoyee_list';
import Drivers from './components/driver_list';
import Add from './components/add_employee';
import ShowOne from './components/showOne';
import {Switch} from 'react-router-dom';
import Edit from './components/update_employee';


const Home = () => <h2>Home</h2>

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <Link to='/'> Home</Link>
        <button><Link to='/employees'>Employee</Link></button>
        <button><Link to='/drivers'>Drivers</Link></button>
        
      </nav>
      <Switch>
      <Route path="/" exact component ={Home} />
      <Route path='/employees' exact component ={Employees}/>
      <Route path='/drivers' exact component ={Drivers}/>
      <Route path='/employees/new' exact component ={Add}/>
      <Route path='/employees/:id' exact component ={ShowOne}/>
      <Route path='/employees/edit/:id' exact component ={Edit}/>
      </Switch>
     
    </div>
  </Router>
);

export default AppRouter;

 

