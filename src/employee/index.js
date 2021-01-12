// React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import "@blueprintjs/table/lib/css/table.css";
import { useState } from 'react';
import { Dialog, Classes, Button, Card } from "@blueprintjs/core";

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
        id
        name
      }
    }
    allProject{
      id
      name 
    }
}
`;

export const MUTATION_ADD_USER = gql`
mutation createEmployee($dob:String!, $email: String!,$empId: String!,$firstName: String!,$lastName: String!,$mobileNo: String!,$project: String!, $password: String!) {
  createEmployee(dob: $dob, email: $email,empId: $empId,firstName:$firstName,lastName: $lastName,mobileNo: $mobileNo,project: $project, password: $password){
    employee{
      id
      firstName
      lastName
      email
      empId
      dob
      mobileNo
      project{
        id
        name
      }
    }
    }
}
`;


export const MUTATION_UPDATE_USER = gql`
    mutation updateEmployee($id:ID!, $dob:String, $email: String!,$empId: String!,$firstName: String!,$lastName: String!,$mobileNo: String!,$project: String!) {
      updateEmployee(id:$id, dob: $dob, email: $email,empId: $empId,firstName:$firstName,lastName: $lastName,mobileNo: $mobileNo,project: $project){
        allEmployee{
          id
          firstName
          lastName
          email
          empId
          dob
          mobileNo
          project{
            id
            name
          }
        }
        }
    }
    `;
const UserInfo = () => {
  const initialVal = {
    isOpen: false,
    data: {},
    action: "read",
    title: "Add Employee"
  }
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const [objData, updateObjectData] = useState(initialVal)
  //const { loading,data }  = useQuery(QUERY_PROJECT);
  const { loading, data } = useQuery(QUERY_USERS);
  const [createUser, userData] = useMutation(MUTATION_ADD_USER);
  const [updateUser, updateUserData] = useMutation(MUTATION_UPDATE_USER);

  const saveUser = e => {
    e.preventDefault();
    let item = objData.data;
    let reqData = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        empId: item.empId,
        dob: item.dob,
        mobileNo: item.mobileNo,
        project: item.project
    }
    if (!item.id) {
      reqData["password"] = item.password;
      createUser({ variables: reqData }).then(response => {
        setDialog(false, 'read', {});
      })
        .catch(err => {
          //handle error
        });

    } else if (item.id) {
      reqData["id"] = item.id;
      updateUser({ variables: reqData }).then(response => {
        setDialog(false, 'read', {});
        
      })
        .catch(err => {
          //handle error
        });

    }
  }

  const onChangeUser = e => {
    let data = { ...objData.data };
    data[e.target.name] = e.target.value;
    updateObjectData(prevState => {
      return { ...prevState, data: data }
    });

  }

  const setDialog = (isOpen, action, item) => {
    let title = action == "edit" ? "Edit User" : "Add User";
    let updatedObj = {
        isOpen: isOpen,
        data: { ...item },
        action: action,
        title: title
    }
    if(updatedObj.data.estimatedDate){
        updatedObj.data.estimatedDate = new Date(updatedObj.data.estimatedDate);
    }
    updateObjectData(updatedObj);
    // setAction(action);
}



  if (loading) return (<div>Loading......</div>);
  return <Card>
    <div align="right"><Button intent="primary" text="Add Employee" onClick={() => setDialog(true, 'add', {})} /></div>
    <table align='center' className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped .modifier">
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
            <td><Button intent="success" text="Edit" onClick={()=>setDialog(true, 'edit', user)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
    <Dialog
      style={{ width: "auto", height: "auto" }}
      icon="application"
      onClose={() => setDialog(false, 'read', {})}
      title={objData.title}
      isOpen={objData.isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <label for="staticEmail" className="col-sm-2 col-form-label">FirstName</label>
            </div>
            <div className="col-md-8">
              <input type="text" name="firstName" className="form-control" id="staticEmail" value={objData.data.firstName} onChange={onChangeUser} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label for="lastname" className="col-sm-2 col-form-label">LastName</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.lastName} onChange={onChangeUser} type="text" name="lastName" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label for="email" className="col-sm-2 col-form-label">Email</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.email} onChange={onChangeUser} type="text" name="email" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label for="empId" className="col-sm-2 col-form-label">Emp Id</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.empId} onChange={onChangeUser} type="text" name="empId" className="form-control" id="empId" />
            </div>
          </div>
          {!objData.data.id ?
            <div className="row">
            <div className="col-md-4">
              <label for="passwoerd" className="col-sm-2 col-form-label">Password</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.password} onChange={onChangeUser} type="text" name="password" className="form-control" id="inputPassword" />
            </div>
          </div>: ""
          }
          
          <div className="row">
            <div className="col-md-4">
              <label for="mobile" className="col-sm-2 col-form-label">Mobile</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.mobileNo} onChange={onChangeUser} type="text" name="mobileNo" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label for="dob" className="col-sm-2 col-form-label">Dob</label>
            </div>
            <div className="col-md-8">
              <input value={objData.data.dob} onChange={onChangeUser} type="date" name="dob" className="form-control" id="dob" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label for="inputPassword" className="col-sm-2 col-form-label">Project</label>
            </div>
            <div className="col-md-8">
              <select name="project" value={objData.data.project} onChange={onChangeUser}>
                {data.allProject.map((project) => (
                  <option value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>
          <Button text="Save" intent="primary" onClick={saveUser} />
        </div>
      </div>
    </Dialog>
  </Card>
}
export default UserInfo