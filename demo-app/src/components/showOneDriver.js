import React from 'react';
import {Link} from 'react-router-dom';

class ShowOneDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: this.props.location.state.driver_details
        }
    }

    render() {
        return (
            <div>
                <table border= '2'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>mobile number</th>
                            <th>address</th>
                            <th>car type</th>
                            <th>Registration Number</th>
                            <th>aadhar number</th>
                            <th>driving license</th>
                            <th>blood group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{this.state.driver._id}</td>
                                <td>{this.state.driver.name}</td>
                                <td>{this.state.driver.email}</td>
                                <td>{this.state.driver.mobile_number}</td>
                                <td>{this.state.driver.address}</td>
                                <td>{this.state.driver.car_type}</td>
                                <td>{this.state.driver.reg_num}</td>
                                <td>{this.state.driver.aadhar_number}</td>
                                <td>{this.state.driver.driving_license}</td>
                                <td>{this.state.driver.blood_group}</td>
                            </tr>
                        }
                    </tbody>
                </table><br/>
                <Link to='/drivers'>back</Link>
            </div>
        )
    }
}

export default ShowOneDriver;