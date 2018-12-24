import React from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom"
import Employees from './components/empoyee_list';
import Drivers from './components/driver_list';
import Add from './components/add_employee';
import ShowOne from './components/showOne';
import {Switch} from 'react-router-dom';
import Edit from './components/update_employee';
import AddDriver from './components/AddDriver';
import ShowOneDriver from './components/showOneDriver';
import EditDriver from './components/EditDriver';
import Trips from './components/trips_list';
import ListOne from './components/showOneTrip';
import AddTrip from './components/add_trip';
import EditTrip from './components/edit_trip';
import Chat from './components/chat';


const Home = () => <Chat />

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <Link to='/'> Home</Link>
        <button><Link to='/employees'>Employee</Link></button>
        <button><Link to='/drivers'>Drivers</Link></button>
        <button><Link to='/trips'>Trips</Link></button>
        
      </nav>
      <Switch>
      <Route path="/" exact component ={Home} />
      <Route path='/employees' exact component ={Employees}/>
      <Route path='/drivers' exact component ={Drivers}/>
      <Route path='/employees/new' exact component ={Add}/>
      <Route path='/employees/:id' exact component ={ShowOne}/>
      <Route path='/employees/edit/:id' exact component ={Edit}/>
      <Route path= '/drivers/new' exact component = {AddDriver}/>
      <Route path= '/drivers/:id' exact component = {ShowOneDriver}/>
      <Route path= '/drivers/edit/:id' exact component = {EditDriver}/>
      <Route path= '/trips' exact component ={Trips}/>
      <Route path= '/trips/add' exact component ={AddTrip}/>
      <Route path= '/trips/:id' exact component = {ListOne}/>
      <Route path= '/trips/edit/:id' exact component = {EditTrip}/>
      </Switch>
     
    </div>
  </Router>
);

export default AppRouter;

 

