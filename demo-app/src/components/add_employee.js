import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            nameError: '',
            Email: '',
            emailError: '',
            Address: '',
            addressError: '',
            Mobile: '',
            mobileError: '',
            Shift: '',
            shiftError: '',
            Blood_group: '',
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
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            emailError: '',
            addressError: '',
            mobileError: '',
            shiftError: '',
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

        if (this.state.Mobile.length !== 10) {
            isError = true;
            errors.mobileError = "Enter a valid mobile number";
        }

        if (this.state.Shift === '' || this.state.Shift === 'select') {
            isError = true;
            errors.shiftError = "Please select valid shift timings.";
        }

        if (this.state.Blood_group === '' || this.state.Blood_group === 'select') {
            isError = true;
            errors.blood_groupError = "Please select the blood group of the employee."
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
            // clear errors
            this.setState({
            nameError: '',
            emailError: '',
            addressError: '',
            mobileError: '',
            shiftError: '',
            blood_groupError: ''
            });

            let submitValue = {
                name: this.state.Name,
                email: this.state.Email,
                address: this.state.Address,
                mobile_number: this.state.Mobile,
                shift: this.state.Shift,
                blood_group: this.state.Blood_group
            }
            axios.post('http://localhost:3001/employees/', submitValue).then((response) => {
                console.log(response.data.employee);
                this.setState({
                    redirect: true
                })

            })
        }

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
        e.preventDefault();
        this.setState({
            Mobile: e.target.value
        })
    }


    handleShift(e) {
        e.preventDefault();
        this.setState({
            Shift: e.target.value
        })
    }


    handleGroup(e) {
        e.preventDefault();
        this.setState({
            Blood_group: e.target.value
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/employees" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name
                <input type='text' onChange={this.handleName} value={this.state.Name} errortext={this.state.nameError} />
                    </label> <span>{this.state.nameError}</span><br />
                    <label>Email
                    <input type='text' onChange={this.handleEmail} value={this.state.Email} errortext={this.state.emailError} />
                    </label> <span>{this.state.emailError}</span><br />
                    <label>Address
                    <input type='textArea' onChange={this.handleAddress} value={this.state.Address} errortext={this.state.addressError} />
                    </label> <span>{this.state.addressError}</span><br />
                    <label>Mobile
                    <input type='text' onChange={this.handleMobile} value={this.state.Mobile} errortext={this.mobileError} />
                    </label> <span>{this.state.mobileError}</span><br />
                    <label>Shift
                    <select onChange={this.handleShift} value={this.state.Shift} errortext={this.state.shiftError}>
                            <option value='select'>Select</option>
                            <option value="9:30-18:30">9:30-18:30</option>
                            <option value='13:30-22:30'>13:30-22:30</option>
                            <option value='18:30-1:30'>18:30-1:30</option>
                            <option value='21:30-6:30'>21:30-6:30</option>
                        </select>
                    </label> <span>{this.state.shiftError}</span><br />
                    <label>
                        Blood_group
                    <select onChange={this.handleGroup} value={this.state.Blood_group} errortext={this.state.blood_groupError}>
                            <option value='select'>Select</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                        </select>
                    </label> <span>{this.state.blood_groupError}</span><br />
                    <input type="submit" value='add user' />
                </form>
                <Link to="/employees">back</Link>
            </div>
        )
    }
}
export default Add;
