import React from 'react';
import { Link } from 'react-router-dom';
import strftime from 'strftime';


class ListOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: this.props.location.state.trip_details
        }
    }

    render() {

        return (
            <div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>id</th>
                            <th>employees</th>
                            <td>driver</td>
                            <td>shift</td>
                            <td>route</td>
                            <td>pickup time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{strftime('%F %T', new Date(this.state.trip.date))}</td>
                                <td>{this.state.trip._id}</td>
                                <td>{this.state.trip.employees.map((employee, index) => (<ul key={index}><li>{employee.name}</li></ul>))}</td>
                                <td>{this.state.trip.driver.name}</td>
                                <td>{this.state.trip.shift}</td>
                                <td>{this.state.trip.route}</td>
                                <td>{this.state.trip.pick_up}</td>
                            </tr>
                        }
                    </tbody>
                </table><br />
                <button><Link to='/trips'>Back</Link></button>
            </div>
        )
    }
}

export default ListOne;