import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.location.state.employee_details.name,
            nameError: '',
            Email: this.props.location.state.employee_details.email,
            emailError: '',
            Address: this.props.location.state.employee_details.address, 
            addressError: '',
            Mobile: this.props.location.state.employee_details.mobile_number,
            mobileError: '',
            Shift: ['9:30-18:30', '18:30-1:30','13:30-22:30','21:30-6:30'],
            Selectedshift: this.props.location.state.employee_details.shift,
            shiftError: '',
            Route: ['Route1', 'Route2', 'Route3', 'Route4', 'Route5'],
            Selectedroute: this.props.location.state.employee_details.route,
            routeError: '',
            Selectedgroup: this.props.location.state.employee_details.blood_group,
            Blood_group: ['O+', 'O-', 'AB+', 'AB-', 'B+', 'B-', 'A+', 'A-'],
            blood_groupError: '',
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleMobile = this.handleMobile.bind(this);
        this.handleShift = this.handleShift.bind(this);
        this.handleGroup = this.handleGroup.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.handleRoute = this.handleRoute.bind(this);
    }

    handleName(e) {
        e.preventDefault();
        this.setState({
            Name: e.target.value
        })
    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({
            Email: e.target.value
        })
    }

    handleAddress(e) {
        e.preventDefault();
        this.setState({
            Address: e.target.value
        })
    }

    handleMobile(e) {
        e.preventDefault()
        this.setState({
            Mobile: e.target.value
        })
    }

    handleShift(e) {
        e.preventDefault()
        this.setState({
            Selectedshift: e.target.value
        })
    }

    handleGroup(e) {
        e.preventDefault()
        this.setState({
            Selectedgroup: e.target.value
        })
    }

    handleRoute(e) {
        e.preventDefault();
        this.setState({
            Selectedroute: e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            emailError: '',
            addressError: '',
            mobileError: '',
            shiftError: '',
            routeError: '',
            blood_groupError: ''
        };
        //console.log(errors);
        if (this.state.Name.length < 5) {
            isError = true;
            errors.nameError = 'Username must atleast be 5 characters long.'
        }

        if (!this.state.Email.includes('@')) {
            isError = true;
            errors.emailError = 'Enter a valid email address.'
        }

        if (this.state.Address.length < 10) {
            isError = true;
            errors.addressError = "enter a valid address."
        }

        if (this.state.Mobile.length >= 15) {
            isError = true;
            errors.mobileError = "Enter a valid mobile number";
        }

        if (this.state.Selectedshift === '') {
            isError = true;
            errors.shiftError = "Please select valid shift timings.";
        }

        if (this.state.SelectedShift === '') {
            isError = true;
            errors.blood_groupError = "Please select the blood group of the employee."
        }

        if (this.state.Selectedroute === '') {
            isError = true;
            errors.routeError = "Please select the route for the employee."
        }

        
        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    handleSubmit(e) {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            this.setState({
                nameError: '',
                emailError: '',
                addressError: '',
                mobileError: '',
                shiftError: '',
                routeError: '',
                blood_groupError: ''
            });

            let submitValue = {
                name: this.state.Name,
                email: this.state.Email,
                address: this.state.Address,
                mobile_number: this.state.Mobile,
                shift: this.state.Selectedshift,
                blood_group: this.state.Selectedgroup,
                route: this.state.Selectedroute
            }

            axios.put(`http://localhost:3001/employees/${this.props.match.params.id}`, submitValue).then((response) => {
                console.log(response.data);
                this.setState({ employee: response.data })
                this.setState({
                    redirect: true
                })
            });
        }
    }

    deleteHandle(e) {
        e.preventDefault();
        axios.delete(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
            this.setState({ redirect: true });
        })
    }



    render() {
        console.log(this.props.location);
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/employees" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name
                <input type='text' onChange={this.handleName} value={this.state.Name} errortext={this.state.nameError} />
                    </label>
                    <span>{this.state.nameError}</span>
                    <br />
                    <label>Email
                <input type='text' onChange={this.handleEmail} value={this.state.Email} errortext={this.state.emailError} />
                    </label><span>{this.state.emailError}</span><br />
                    <label>Address
                <input type='textArea' onChange={this.handleAddress} value={this.state.Address} errortext={this.state.addressError} />
                    </label><span>{this.state.addressError}</span><br />
                    <label>Mobile
            <input type='text' onChange={this.handleMobile} value={this.state.Mobile} errortext={this.state.mobileError} />
                    </label><span>{this.state.mobileError}</span><br />
                    <label>Shift
            <select defaultValue = {this.state.Selectedshift} onChange={this.handleShift} errortext={this.state.shiftError}>
                            {this.state.Shift.map((shift, index) => {
                            return (<option key={index} value={shift}>{shift}</option>)
                        })}
                        </select>
                    </label><span>{this.state.shiftError}</span><br />
                    <label>Route
                    <select defaultValue = {this.state.Selectedroute} onChange={this.handleRoute} errortext={this.state.routeError}>
                            {this.state.Route.map((route, index) => {
                                return (<option key = {index} value={route}>{route}</option>)
                            })}
                        </select>
                    </label> <span>{this.state.routeError}</span><br />
                    <label>
                        Blood_group
            <select defaultValue = {this.state.Selectedgroup} onChange={this.handleGroup} errortext={this.state.blood_groupError}>
                                {this.state.Blood_group.map((blood, index) => {
                                return (<option key = {index} value = {blood}>{blood}</option>)
                            })}
                        </select>
                    </label><span>{this.state.blood_groupError}</span><br />
                    <input type='submit' value='edit user' />
                </form>
                <button><Link to='/employees'>back</Link></button>
                <button><Link to={`employees/delete/${this.props.match.params.id}`} onClick={this.deleteHandle}>Delete</Link></button>
            </div>
        )
    }
}

export default Edit;