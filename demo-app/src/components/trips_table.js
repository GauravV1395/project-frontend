import React from 'react';
import { Link } from "react-router-dom";
import strftime from 'strftime';

// class Date extends React.Component  {
//     constructor(props) {
//         super(props);
//         this.state = {
//             date: ''
//         }
//         this.setState({
//             date: strftime('%B %d, %Y %H:%M:%S', props.trip_details.date)
//         })
//     }  
// }

const TripTable = (props) => (
    <table border = '2'>
        <thead>
            <tr>
                <th>date</th>
                <th>id</th>
                <th>employees</th>
                <th>driver</th>
                <th>shift</th>
                <th>route</th>
                <th>pickup time</th>
            </tr>
        </thead>
        <thead>
            {
                props.trips_details.map((trip, index) => (
                    <tr key={index}>
                        <td>{strftime('%F %T', new Date(trip.date))}</td>
                        <td>{trip._id}</td>
                        <td>{trip.employees.map((employee, index) => (<ul key = {index}><li>{employee.name}</li></ul>))}</td>
                        <td>{trip.driver.name}</td>
                        <td>{trip.shift}</td>
                        <td>{trip.route}</td>
                        <td>{trip.pick_up}</td>
                        <td><Link to= {{pathname: `trips/${trip._id}`, state: {trip_details: trip}}}>View</Link></td>
                        <td><Link to={{pathname: `trips/edit/${trip._id}`, state: {trip_details: trip}}}>Edit</Link></td>
                    </tr>
                ))
            }
        </thead>
    </table>
)

export default TripTable;