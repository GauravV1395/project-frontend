import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.location.state.employee_details.name,
            Email: this.props.location.state.employee_details.email,
            Address: this.props.location.state.employee_details.address,
            Mobile: this.props.location.state.employee_details.mobile_number,
            Shift: this.props.location.state.employee_details.shift,
            Blood_group: this.props.location.state.employee_details.blood_group,
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
            Shift: e.target.value
        })
    }

    handleGroup(e) {
        e.preventDefault()
        this.setState({
            Blood_group: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        let submitValue = {
            name: this.state.Name,
            email: this.state.Email,
            address: this.state.Address,
            mobile_number: this.state.Mobile,
            shift: this.state.Shift,
            blood_group: this.state.Blood_group
        }

        
        axios.put(`http://localhost:3001/employees/${this.props.match.params.id}`, submitValue).then((response) => {
            console.log(response.data);
            this.setState({ employee: response.data })
            this.setState({
                redirect: true
            })
        });
    }

    deleteHandle(e) {
        e.preventDefault();

        axios.delete(`http://localhost:3001/employees/${this.props.match.params.id}`).then((response) => {
            this.setState({redirect: true});
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
                <input type='text' onChange={this.handleName} value={this.state.Name} />
                </label>
                <br />
                <label>Email
                <input type='text' onChange={this.handleEmail} value={this.state.Email} />
                </label><br />
                <label>Address
                <input type='textArea' onChange={this.handleAddress} value={this.state.Address} />
                </label><br />
                <label>Mobile
            <input type='text' onChange={this.handleMobile} value={this.state.Mobile} /></label><br />
                <label>Shift
            <select onChange={this.handleShift} value={this.state.Shift}>
                        <option value="9:30-18:30">9:30-18:30</option>
                        <option value='13:30-22:30'>13:30-22:30</option>
                        <option value='18:30-1:30'>18:30-1:30</option>
                        <option value='21:30-6:30'>21:30-6:30</option>
                    </select>
                </label><br />
                <label>
                    Blood_group
            <select onChange={this.handleGroup} value={this.state.Blood_group}>
                        <option value='O+'>O+</option>
                        <option value='O-'>O-</option>
                        <option value='AB+'>AB+</option>
                        <option value='AB-'>AB-</option>
                        <option value='B+'>B+</option>
                        <option value='B-'>B-</option>
                        <option value='A+'>A+</option>
                        <option value='A-'>A-</option>
                    </select>
                </label><br />
                <input type='submit' value='edit user' />
            </form>
            <button><Link to='/employees'>back</Link></button>
            <button><Link to={`employees/delete/${this.props.match.params.id}`} onClick = {this.deleteHandle}>Delete</Link></button>
            </div>
        )
    }
}

export default Edit;