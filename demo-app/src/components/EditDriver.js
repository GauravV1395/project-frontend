import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class EditDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.location.state.driver_details.name,
            nameError: '',
            Email: this.props.location.state.driver_details.email,
            emailError: '',
            Mobile: this.props.location.state.driver_details.mobile_number,
            mobileError: '',
            Address: this.props.location.state.driver_details.address,
            addressError: '',
            Car: ['sedan', 'hatchback','electric','tt', 'shuttle'],
            selectedCar: this.props.location.state.driver_details.car_type,
            carError: '',
            Reg_Num: this.props.location.state.driver_details.reg_num,
            reg_numError: '',
            Aadhar: this.props.location.state.driver_details.aadhar_number,
            aadharError: '',
            License: this.props.location.state.driver_details.driving_license,
            licenseError: '',
            Blood_group: ['O+', 'O-', 'AB+', 'AB-', 'B+', 'B-', 'A+', 'A-'], 
            selectedGroup: this.props.location.state.driver_details.blood_group,
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
        this.deleteHandle = this.deleteHandle.bind(this);
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
            aadhar_num: this.state.Aadhar,
            driving_license: this.state.License,
            reg_num: this.state.Reg_Num,
            blood_group: this.state.selectedGroup,
            car_type: this.state.selectedCar
        }
        axios.put(`http://localhost:3001/drivers/${this.props.match.params.id}`, submitValue).then((response) => {
            this.setState({drivers: response.data})
            this.setState({
                redirect: true
            })
        })
    }
}

    deleteHandle(e) {
        e.preventDefault();

        axios.delete(`http://localhost:3001/drivers/${this.props.match.params.id}`).then((response) => {
        console.log(response);    
        this.setState({redirect: true});
        })
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
                    </label><span>{this.state.licenseError}</span><br />

                    <label>Car Type
                    <select onChange={this.handleCar} defaultValue={this.state.selectedCar} errortext={this.state.carError}>
                    {this.state.Car.map((car, index) => {
                                return (<option key = {index} value={car}>{car}</option>)
                            })}
                        </select>
                    </label><span>{this.state.carError}</span><br />

                    <label>Blood_group
                    <select onChange={this.handleBlood_group} value={this.state.selectedGroup} errortext={this.state.blood_groupError}>
                    {this.state.Blood_group.map((blood, index) => {
                                return (<option key = {index} value = {blood}>{blood}</option>)
                            })}
                        </select>
                    </label><span>{this.state.blood_groupError}</span><br />
                    <input type="submit" value='Edit driver' />
                </form>
                <button><Link to= {`drivers/delete/${this.props.match.params.id}`} onClick = {this.deleteHandle}>Delete</Link></button>
                <Link to="/drivers">back</Link>
            </div>
        )
    }
}

export default EditDriver;