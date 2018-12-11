import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

let submitValue = {};
let selectedDriver;
let shift;
let Pick_up;
let route;

class EditTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            drivers: [],
            selectedEmployees: [],
            redirect:false
        }
        this.handleShift = this.handleShift.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleRoute = this.handleRoute.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleShift(e) {
        e.preventDefault();
         shift = e.target.value
        axios.get(`http://localhost:3001/employees/shifts/${shift}`).then((employees) => {
            console.log(employees.data);
            this.setState({ employees: employees.data })
        });
    }
         
    handleRoute(e) {
        e.preventDefault();
         route = e.target.value
        axios.get(`http://localhost:3001/employees/route/${route}`).then((employees) => {
            console.log(employees.data);
            this.setState({ employees: employees.data });
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/drivers`).then((drivers) => {
            console.log(drivers.data);
            this.setState({ drivers: drivers.data });
        })
    }

    handleSelected(e) {
         selectedDriver = e.target.value;
        //this.setState({selectedDriver: e.target.value});

        console.log(selectedDriver);
    }

    handlePick(e) {
        e.preventDefault();
        Pick_up = e.target.value
        console.log(Pick_up)
    }

    AddEmployee(employee) {
        this.state.selectedEmployees.push(employee._id);
        console.log(this.state.selectedEmployees);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        submitValue.driver = selectedDriver;
        submitValue.pick_up = Pick_up;
        submitValue.employees = this.state.selectedEmployees;
        submitValue.route = route;
        submitValue.shift = this.state.shift;
        console.log(submitValue);
        axios.post(`http://localhost:3001/trips`, submitValue).then((response) => {
            console.log(response);
        })
        this.setState({
            redirect: true
        })
    }

    render() {
        console.log(this.props.location.state.trip_details.employees);
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/trips" exact />
        }
        const columns = [
            {
                Header: "Id",
                accessor: "_id",
                style: {
                    textAlign: "right"
                },
                width: 250,
                maxWidth: 250,
                minWidth: 250
            },
            {
                Header: "Name",
                accessor: "name",
                style: {
                    textAlign: "right"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            },
            {
                Header: "Email",
                accessor: "email",
                style: {
                    textAlign: "right"
                }
            },
            {
                Header: "Mobile Number",
                accessor: "mobile_number",
                style: {
                    textAlign: "right"
                },
                width: 200,
                maxWidth: 200,
                minWidth: 200
            },
            {
                Header: "Address",
                accessor: "address",
                style: {
                    textAlign: "right"
                }
            },
            {
                Header: "Route",
                accessor: "route",
                style: {
                    textAlign: "right"
                }
            },
            {
                Header: "Shift",
                accessor: "shift",
                sortable: false,
                filterable: false,
                style: {
                    textAlign: "right"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            },
            {
                Header: "Blood Group",
                accessor: "blood_group",
                sortable: false,
                filterable: false,
                style: {
                    textAlign: "right"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <button style={{ backgroundColor: "blue", color: "#fefefe" }} onClick={(e) => {
                            e.preventDefault();
                            this.AddEmployee(props.original);
                        }}>Add</button>
                    )
                },
                sortable: false,
                filterable: false,
                style: {
                    textAlign: "right"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
            }
        ]
        return (  
            <div>
                <form onSubmit={this.handleSubmit}>
                <p>Sort By</p> <br />
                <label>Shifts</label>
                <select onChange={this.handleShift} value={this.state.shift}>
                    <option value='select'>Select</option>
                    <option value='9:30-18:30'>9:30-18:30</option>
                    <option value='13:30-22:30'>13:30-22:30</option>
                    <option value='18:30-1:30'>18:30-1:30</option>
                    <option value='21:30-6:30'>21:30-6:30</option>
                </select><br />

                <label>Pick_up</label>
                <select onChange={this.handlePick} value={this.state.pick}>
                    <option value="select">Select</option>
                    <option value='18:45'>18:45</option>
                    <option value='22:45'>22:45</option>
                    <option value='1:45'>1:45</option>
                    <option value='6:45'>6:45</option>
                </select><br />
                <label>Route
                <select ref = {(input)=> this.menu = input} onChange={this.handleRoute} value={this.state.route}>
                        <option value="select">Select</option>
                        <option value='Route1'>Route1</option>
                        <option value='Route2'>Route2</option>
                        <option value='Route3'>Route3</option>
                        <option value='Route4'>Route4</option>
                        <option value='Route5'>Route5</option>
                    </select><br />
                </label><br />
                <label>Driver
                <select onChange = {this.handleSelected} value={this.state.drivers}>
                <option>Select</option>
                    {this.state.drivers.map((driver, index) => (
                        <option value = {driver._id} key={index}>{driver.name}</option>
                    ))}
                </select></label><br/>

                <ReactTable columns={columns} data={this.state.employees} filterable defaultPageSize={5} noDataText={"Please Wait..."}>

                </ReactTable><br/>
                <input type="submit" value='add trip' />
                </form>
                <button><Link to='/trips'>Back</Link></button>
            </div>
        )
    }
}

export default EditTrip