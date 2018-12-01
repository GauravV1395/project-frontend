import React from 'react';
import axios from 'axios';
import DriverTable from './driver_table';
import { Link } from 'react-router-dom';

class Drivers extends React.Component {
    constructor(props) {
      super(props); 
        this.state = {
          drivers: []
      }
    }
  
    componentDidMount() {
      axios.get('http://localhost:3001/drivers').then((response) => {
        this.setState({drivers: response.data});
      });
    }
  
    render() {
      return (
        <div>
          <DriverTable driver_details={this.state.drivers}/><br/>
          <button><Link to='/drivers/new'>Add</Link></button>
        </div>
      )
    }
  } 

  export default Drivers