import React from 'react';
import axios from 'axios';
import EmployeeTable from './employee_table';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    // const columns = [
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Name",
    //     accessor: "name",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Email",
    //     accessor: "email",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Mobile_number",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   },
    //   {
    //     Header: "Employee Id",
    //     accessor: "_id",
    //     style: {
    //       textAlign: "right"
    //     }
    //   }
    // ]
    return (
      <div>
        {/* <ReactTable columns={columns} data={this.state.employees} filterable defaultPageSize={5}>

        </ReactTable> */}
        <button><Link to='/employees/new'>Add</Link></button>
      </div>
    )
  }
}

export default Employees