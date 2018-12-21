import React from 'react';
import {Link} from 'react-router-dom';

class ShowOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: this.props.location.state.employee_details
        }
    }

    render() {
        return (
            <div>
                <table border='2'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>mobile_number</th>
                            <th>address</th>
                            <th>shift</th>
                            <th>Route</th>
                            <th>blood group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            <tr>
                                <td>{this.state.employee._id}</td>
                                <td>{this.state.employee.name}</td>
                                <td>{this.state.employee.email}</td>
                                <td>{this.state.employee.mobile_number}</td>
                                <td>{this.state.employee.address}</td>
                                <td>{this.state.employee.shift}</td>
                                <td>{this.state.employee.route}</td>
                                <td>{this.state.employee.blood_group}</td>
                            </tr>
                        }

                    </tbody>
                </table><br/>
                <Link to='/employees'>back</Link>
            </div>
        )
    }
}

export default ShowOne;