import { Route , Switch,BrowserRouter, Router} from 'react-router-dom'
import UserInfo from './employee'
import Nav from './navbar';
import AddEmployee from './employee/addEmployee';
const App=()=>{
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <UserInfo />
        </Route>
        <Route path="/project">
          <AddEmployee />
        </Route>
        <Route exact path="/addEmployee">
         <AddEmployee />
        </Route>
        <Route path="/addEmployee/:id">
          <AddEmployee  />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
