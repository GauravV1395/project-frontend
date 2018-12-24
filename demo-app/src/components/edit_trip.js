import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


class EditTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShift: this.props.location.state.trip_details.shift,
            selectedPick: this.props.location.state.trip_details.pick_up,
            selectedRoute: this.props.location.state.trip_details.route,
            selectedEmployees: this.props.location.state.trip_details.employees,
            selectedDriver: this.props.location.state.trip_details.driver,
            shifts : ['9:30-18:30', '18:30-1:30','13:30-22:30','21:30-6:30'],
            Pick_up: ['18:45', '1:45', '22:45', '6:45'],
            routes: ['Route1', 'Route2', 'Route3', 'Route4', 'Route5'],
            employees: [],
            drivers: [],
            employeeToBeRemoved: [],
            employeeAdded: [],
            selectedOption: [],
            shiftError: '',
            pickError: '',
            routeError: '',
            selectedEmployeesError: '',
            selectedOptionError: '',
            redirect: false,
            
        }   
        this.handleChange = this.handleChange.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleRoute = this.handleRoute.bind(this);
        this.handleSelectedDriver = this.handleSelectedDriver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            shiftError: ``,
            pickError: ``,
            routeError: ``,
            selectedEmployeesError: ``,
            selectedDriverError: ``,
        }

        if (this.state.selectedShift === '') {
            isError = true;
            errors.shiftError = 'Please select the shift.'
        }

        if (this.state.selectedPick === '') {
            isError = true;
            errors.pickError = 'Please select the pickup time.'
        }

        if (this.state.selectedRoute === '') {
            isError = true;
            errors.routeError = 'Please select the route.'
        }

        if (this.state.selectedEmployees.length <= 0) {
            isError = true;
            errors.selectedEmployeesError = 'Please add the employees to the trip.'
        }

        if (this.state.selectedDriver === '') {
            isError = true;
            errors.selectedDriverError = 'Please select the driver to the trip.'
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
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
            this.setState({drivers: response.data});
        })
        axios.get(`http://localhost:3001/employees`).then((response) => {
            this.setState({employees: response.data});
        })
        let selected = [];
        this.props.location.state.trip_details.employees.forEach(function(n) {selected.push({value: n._id, label: n.name})})
        this.setState({selectedOption: selected});
    }


    handleSelectedDriver(e) {
        e.preventDefault();
       this.setState({selectedDriver : e.target.value}, () => {
           return this.state.selectedDriver;
       });
    }

    handlePick(e) {
        e.preventDefault();
        this.setState({selectedPick : e.target.value}, () => {
            console.log(this.state.selectedPick);
        });
    }

    deleteHandle(e) {
        e.preventDefault();
        axios.delete(`http://localhost:3001/trips/${this.props.match.params.id}`).then((response) => {
            console.log(response);    
            this.setState({redirect: true});
        })
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

    onChangeHandle(selectedOption, deselectoption) {
        this.setState({selectedOption: selectedOption}, () => {
            console.log(deselectoption);
            if (deselectoption.action === "remove-value") {
                this.state.employeeToBeRemoved.push(deselectoption.removedValue.value);
                console.log(this.state.employeeToBeRemoved);
            } else if (deselectoption.action === "select-option") {
                this.state.employeeAdded.push(deselectoption.option.value);
                console.log(this.state.employeeAdded);
                console.log(this.state.selectedOption);
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const err = this.validate();
        let selectedEmployees = [];
        this.state.selectedOption.map((option) => {
           return selectedEmployees.push(option.value);
        })
        if (!err) {
            this.setState({
                shiftError: '',
                routeError: '',
                pickError: '',
                selectedDriverError: '',
                selectedEmployeesError: ''
            });
        let submitValue = {
            removedEmployee: this.state.employeeToBeRemoved,
            employees: selectedEmployees,
            driver: this.state.selectedDriver,
            shift: this.state.selectedShift,
            route: this.state.selectedRoute,
            pick_up: this.state.selectedPick
        }
        console.log(submitValue);
        axios.put(`http://localhost:3001/trips/${this.props.match.params.id}`, submitValue).then((response) => {
            console.log(response);
             this.setState({redirect: true});
       });
    }
}
   
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/trips" exact />
        }
        const options = [];
        this.state.employees.forEach(function(employee) {
            options.push({value: employee._id, label: employee.name});
        })
       
            return (
                <div>
                    <form onSubmit = {this.handleSubmit}>
                    <label>Shifts</label>
                    <select onChange={this.handleChange} value={this.state.selectedShift} errortext = {this.state.shiftError}>
                        {this.state.shifts.map((shift, index) => {
                            return (<option key={index} value={shift}>{shift}</option>)
                        })}
                    </select><span>{this.state.shiftError}</span><br/>

                    <label>Pick_up</label>
                <select onChange={this.handlePick} value={this.state.selectedPick} errortext = {this.state.pickError}>
                    {this.state.Pick_up.map((pick_up, index) => {
                        return (<option key={index} value={pick_up}>{pick_up}</option>)
                    })}
                </select><span>{this.state.pickError}</span><br />
                    
                <label>Route</label>
                <select onChange={this.handleRoute} value={this.state.selectedRoute} errortext = {this.state.routeError}>
                        {this.state.routes.map((route, index) => {
                            return (<option key = {index} value = {route}>{route}</option>)
                        })}
                    </select><span>{this.state.routeError}</span><br />

                <label>Driver</label>
                <select onChange = {this.handleSelectedDriver} value={this.state.selectedDriver} errortext = {this.state.selectedDriverError}>
                    {this.state.drivers.map((driver, index) => (
                        <option value = {driver._id} key={index}>{driver.name}</option>
                    ))}
                </select><span>{this.state.selectedDriverError}</span><br/>
                <Select isSearchable value = {this.state.selectedOption} isMulti onChange = {this.onChangeHandle} options = {options} errortext = {this.state.selectedOptionError}/>
                <span>{this.state.selectedOptionError}</span><br/>
                <input type = "submit" value = "submit"/>
                </form>
                <button><Link to= {`trips/delete/${this.props.match.params.id}`} onClick = {this.deleteHandle}>Delete</Link></button>
                <button><Link to='/trips'>Back</Link></button>
                </div>
            )
    }
}

export default EditTrip
