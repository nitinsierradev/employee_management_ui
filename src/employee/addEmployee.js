import 'bootstrap/dist/css/bootstrap.css';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Card } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

const QUERY_PROJECT = gql`
  query {
    allProject{
      id
      name 
    }
}
`;

const AddEmployee = () =>{
    let { id } = useParams();
    
    const { loading,data }  = useQuery(QUERY_PROJECT);
  
    if (loading) return <div>Loading....</div>
    return (<Card><div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">FirstName</label>
    <div class="col-sm-4">
      <input type="text"  class="form-control" id="staticEmail" value=""/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="lastname" class="col-sm-2 col-form-label">LastName</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="inputPassword" />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="inputPassword" />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="passwoerd" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="inputPassword" />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="mobile" class="col-sm-2 col-form-label">Mobile No</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" id="inputPassword" />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="dob" class="col-sm-2 col-form-label">Dob</label>
    <div class="col-sm-4">
      <input type="password" class="form-control" id="dob" />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Project</label>
    <div class="col-sm-4">
      <select>
      {data.allProject.map((project) => (
          <option value="{project.id}">{project.name}</option>
      ))}
      </select>
    </div>
  </div>
  </Card>
  )
}
export default AddEmployee