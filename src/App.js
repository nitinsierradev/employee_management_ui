import { Route , Switch,BrowserRouter} from 'react-router-dom'
import UserInfo from './employee';
import ProductList from "./components/products/productsList";
import Nav from './navbar'
const App=()=>{
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        
        <Route path="/project">
          <ProductList />
        </Route>
        <Route path="/">
          <UserInfo />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
