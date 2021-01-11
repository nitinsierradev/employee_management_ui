// React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import "@blueprintjs/table/lib/css/table.css";
import { Button, Card } from "@blueprintjs/core";
import { Link, useParams } from "react-router-dom";
import { useState } from 'react';
const QUERY_USERS = gql`
  query {
    allEmployee{
      id
      firstName
      lastName
      email
      empId
      dob
      mobileNo
      project{
          name
      }
    }
}
`;
const UserInfo = () => {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { loading,data }  = useQuery(QUERY_USERS);
if (loading) return (<div>Loading......</div>);
return <Card>
  <div align="right"><Button intent="primary" text="Add Employee"   /></div>
  <table align='center' class="bp3-html-table bp3-html-table-bordered bp3-html-table-striped .modifier">
<thead>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>EmpId</th>
    <th>DOB</th>
    <th>Mobile No</th>
    <th>Project Name</th>
    <th>Action</th>
  </tr>
</thead>
  <tbody>
    
    {data.allEmployee.map((user) => (
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.empId}</td>
        <td>{user.dob}</td>
        <td>{user.mobileNo}</td>
        <td>{user.project.name}</td>
        <td><Button intent="success" text="Edit" /></td>
        </tr>
      ))}
  </tbody>
</table>
</Card>
}
export default UserInfo