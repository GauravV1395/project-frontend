import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';


class AddTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShift: ``,
            selectedPick: ``,
            selectedRoute: ``,
            selectedEmployees: [],
            selectedDriver: ``,
            shifts : ['9:30-18:30', '18:30-1:30','13:30-22:30','21:30-6:30'],
            Pick_up: ['18:45', '1:45', '22:45', '6:45'],
            routes: ['Route1', 'Route2', 'Route3', 'Route4', 'Route5'],
            employees: [],
            drivers: [],
            redirect: false
            
        }   
        this.handleChange = this.handleChange.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleRoute = this.handleRoute.bind(this);
        this.handleSelectedDriver = this.handleSelectedDriver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            selectedShift: e.target.value
        }, () => {
            console.log(this.state.selectedShift);
            axios.get(`http://localhost:3001/employees/shifts/${this.state.selectedShift}`).then((res) => {
                console.log(res.data);
                this.setState({
                    employees: res.data
                })
            })
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/drivers`).then((response) => {
            console.log(response.data);
            this.setState({drivers: response.data});
        })
    }

    handleSelectedDriver(e) {
        e.preventDefault();
       this.setState({selectedDriver: e.target.value}, () => {
           console.log(this.state.selectedDriver);
           return this.state.selectedDriver;
       })
    }

    handlePick(e) {
        e.preventDefault();
        this.setState({selectedPick : e.target.value}, () => {
            console.log(this.state.selectedPick);
        });
    }

    AddEmployee(employee) {
        this.state.selectedEmployees.push(employee._id);
        console.log(this.state.selectedEmployees);
    }

    handleRoute(e) {
        e.preventDefault();
        this.setState({selectedRoute: e.target.value}, () => {
            console.log(this.state.selectedRoute);
            axios.get(`http://localhost:3001/employees/route/${this.state.selectedRoute}`).then((response) => {
                this.setState({employees: response.data});
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let submitValue = {
            employees: this.state.selectedEmployees,
            driver: this.state.selectedDriver,
            shift: this.state.selectedShift,
            route: this.state.selectedRoute,
            pick_up: this.state.selectedPick
        }
        console.log(submitValue);
        axios.post(`http://localhost:3001/trips`, submitValue).then((response) => {
            console.log(response);
            this.setState({redirect: true});
        });
    }
   
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/drivers" exact />
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
                    <form onSubmit = {this.handleSubmit}>
                    <label>Shifts</label>
                    <select onChange={this.handleChange}>
                        {this.state.shifts.map((shift, index) => {
                            return (<option key={index} value={shift}>{shift}</option>)
                        })}
                    </select><br/>

                    <label>Pick_up</label>
                <select onChange={this.handlePick}>
                    {this.state.Pick_up.map((pick_up, index) => {
                        return (<option key={index} value={pick_up}>{pick_up}</option>)
                    })}
                </select><br />
                    
                <label>Route</label>
                <select onChange={this.handleRoute}>
                        {this.state.routes.map((route, index) => {
                            return (<option key = {index} value = {route}>{route}</option>)
                        })}
                    </select><br />

                <label>Driver</label>
                <select onChange = {this.handleSelectedDriver}>
                    {this.state.drivers.map((driver, index) => (
                        <option value = {driver._id} key={index}>{driver.name}</option>
                    ))}
                </select><br/>

                <ReactTable columns={columns} data={this.state.employees} filterable defaultPageSize={5}>

                </ReactTable><br/>
                <input type = "submit" value = "submit"/>
                </form>
                <button><Link to='/trips'>Back</Link></button>
                </div>
            )
    }
}

export default AddTrip
