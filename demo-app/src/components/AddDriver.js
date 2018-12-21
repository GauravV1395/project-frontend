import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class AddDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            nameError: '',
            Email: '',
            emailError: '',
            Mobile: '',
            mobileError: '',
            Address: '',
            addressError: '',
            Car: ['sedan', 'hatchback','electric','tt', 'shuttle'],
            selectedCar: 'sedan',
            carError: '',
            Reg_Num: '',
            reg_numError: '',
            Aadhar: '',
            aadharError: '',
            License: '',
            licenseError: '',
            Blood_group: ['O+', 'O-', 'AB+', 'AB-', 'B+', 'B-', 'A+', 'A-'],
            selectedGroup: 'O+',
            blood_groupError: '',
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleMobile = this.handleMobile.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleCar = this.handleCar.bind(this);
        this.handleReg_Num = this.handleReg_Num.bind(this);
        this.handleAadhar = this.handleAadhar.bind(this);
        this.handleLicense = this.handleLicense.bind(this);
        this.handleBlood_group = this.handleBlood_group.bind(this);
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

    handleReg_Num(e) {
        e.preventDefault();
        this.setState({
            Reg_Num: e.target.value
        })
    }

    handleAadhar(e) {
        e.preventDefault();
        this.setState({
            Aadhar: e.target.value
        })
    }

    handleLicense(e) {
        e.preventDefault();
        this.setState({
            License: e.target.value
        })
    }

    handleCar(e) {
        e.preventDefault();
        this.setState({
            selectedCar: e.target.value
        })
        console.log(this.state.Car);
    }

    handleBlood_group(e) {
        e.preventDefault();
        this.setState({
            selectedGroup: e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            emailError: '',
            addressError: '',
            mobileError: '',
            reg_numError: '',
            blood_groupError: '',
            aadharError: '',
            licenseError: '',
            carError: ''
        };
        console.log(errors);
        if (this.state.Name.length < 5) {
            isError = true;
            errors.nameError = 'Username must atleast be more than five characters.'
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

        if (this.state.selectedGroup === '' ) {
            isError = true;
            errors.blood_groupError = "Please select the blood group of the driver."
        }

        if (this.state.selectedCar === '' ) {
            isError = true;
            errors.carError = "Please select the type of car."
        }

        if (this.state.Aadhar.length !== 12) {
            isError = true;
            errors.aadharError = "Please enter valid Aadhar details."
        }

        if (this.state.Reg_Num.length === 0) {
            isError = true;
            errors.reg_numError = "Please enter the vehicle registration number."
        }

        if (this.state.License === 0) {
            isError = true;
            errors.licenseError = "Enter valid License Number";
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
                reg_numError: '',
                blood_groupError: '',
                aadharError: '',
                licenseError: '',
                carError: ''
            });
        
        let submitValue = {
            name: this.state.Name,
            email: this.state.Email,
            address: this.state.Address,
            mobile_number: this.state.Mobile,
            aadhar_number: this.state.Aadhar,
            driving_license: this.state.License,
            reg_num: this.state.Reg_Num,
            blood_group: this.state.selectedGroup,
            car_type: this.state.selectedCar
        }
        axios.post('http://localhost:3001/drivers/', submitValue).then((response) => {
            console.log(response.data);
            this.setState({
                redirect: true
            })
        })
    }
}
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/drivers" exact />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name
                    <input type='text' onChange={this.handleName} value={this.state.Name} errortext={this.state.nameError} />
                    </label><span>{this.state.nameError}</span><br />

                    <label>Email
                    <input type="text" onChange={this.handleEmail} value={this.state.Email} errortext={this.state.emailError} />
                    </label><span>{this.state.emailError}</span><br />

                    <label>Address
                    <input type="textArea" onChange={this.handleAddress} value={this.state.Address} errortext={this.state.addressError} />
                    </label><span>{this.state.addressError}</span><br />

                    <label>Mobile
                    <input type='text' onChange={this.handleMobile} value={this.state.Mobile} errortext={this.state.mobileError} />
                    </label><span>{this.state.mobileError}</span><br />

                    <label>Registration_Number
                    <input type='text' onChange={this.handleReg_Num} value={this.state.Reg_Num} errortext={this.state.reg_numError} />
                    </label><span>{this.state.reg_numError}</span><br />

                    <label>Aadhar_Number
                    <input type='text' onChange={this.handleAadhar} value={this.state.Aadhar} errortext={this.state.aadharError} />
                    </label><span>{this.state.aadharError}</span><br />

                    <label>Driving_License
                    <input type='text' onChange={this.handleLicense} value={this.state.License} errortext={this.state.licenseError} />
                    </label><span>{this.state.driving_license}</span><br />

                    <label>Car Type
                    <select onChange={this.handleCar} errortext={this.state.carError}>
                           {this.state.Car.map((car,index) => {
                               return (<option value = {car} key = {index}>{car}</option>)
                           })}
                        </select>
                    </label><span>{this.state.carError}</span><br />

                    <label>Blood_group
                    <select onChange={this.handleBlood_group} errortext={this.state.blood_groupError}>
                           {this.state.Blood_group.map((blood, index) => {
                               return (<option value = {blood} key = {index}>{blood}</option>)
                           })}
                        </select>
                    </label><span>{this.state.blood_groupError}</span><br />
                    <input type="submit" value='add driver' />
                </form>
                <Link to="/drivers">back</Link>
            </div>
        )
    }
}

export default AddDriver;