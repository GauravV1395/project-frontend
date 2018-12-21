import React from 'react';
import {Link} from 'react-router-dom';
    
const EmployeeTable = (props) => (
    <table border='2'>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>mobile_number</th>
                <th>address</th>
                <th>route</th>
                <th>shift</th>
                <th>blood group</th>
            </tr>
        </thead>
        <tbody>
            {
                props.employee_details.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee._id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile_number}</td>
                        <td>{employee.address}</td>
                        <td>{employee.route}</td>
                        <td>{employee.shift}</td>
                        <td>{employee.blood_group}</td>
                        {/* <td><Link to={`employees/${employee._id}`}>View</Link></td> */}
                        <td><Link to= {{pathname: `employees/${employee._id}`, state: {employee_details: employee}}}>View</Link></td>
                        {/* <td><Link to={{}`employees/edit/${employee._id}`}>Edit</Link></td> */}
                        <td><Link to={{pathname: `employees/edit/${employee._id}`, state: {employee_details: employee}}}>Edit</Link></td>
                    </tr> 
                    
                ))
            }
        </tbody>
    </table>
)

export default EmployeeTable