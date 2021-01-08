import { Route , Switch,BrowserRouter} from 'react-router-dom'
import UserInfo from './employee'
import Nav from './navbar'
const App=()=>{
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/">
          <UserInfo />
        </Route>
        <Route path="/project">
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
