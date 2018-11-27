import React from 'react';

const DriverTable = (props) => (
    <table border = '2'>
          <thead>
              <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>mobile number</th>
                  <th>address</th>
                  <th>car type</th>
                  <th>registration number</th>
                  <th>aadhar number</th>
                  <th>driving license</th>
                  <th>blood group</th>
              </tr>
          </thead>
          <tbody>
              {
                  props.driver_details.map((driver, index) => (
                      <tr key = {index}>
                      <td>{driver._id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.email}</td>
                      <td>{driver.mobile_number}</td>
                      <td>{driver.address}</td>
                      <td>{driver.car_type}</td>
                      <td>{driver.reg_num}</td>
                      <td>{driver.aadhar_number}</td>
                      <td>{driver.driving_license}</td>
                      <td>{driver.blood_group}</td>
                      </tr>
                  ))
              }
          </tbody>
          </table>
)

export default DriverTable