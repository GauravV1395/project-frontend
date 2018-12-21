import React from 'react';
import axios from 'axios';
import EmployeeTable from './employee_table';
import { Link } from 'react-router-dom';

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/employees').then((response) => {
      this.setState({ employees: response.data })
    });
  }

  render() {
    
    return (
      <div>
        <EmployeeTable employee_details={this.state.employees}/><br/>
        <button><Link to='/employees/new'>Add</Link></button>
      </div>
    )
  }
}

export default Employees