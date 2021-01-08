import React from 'react';
import { Link } from "react-router-dom";
//import { BrowserRouter as Router,Switch,Route } from react-router-dom;
const Nav=() => {
        return <nav class="bp3-navbar bp3-dark">
        <div>
          <div class="bp3-navbar-group bp3-align-left">
            <div class="bp3-navbar-heading">Home</div>
          </div>
          <div class="bp3-navbar-group bp3-align-left">
            <button class="bp3-button bp3-minimal"><Link to="/">Employee</Link></button>
            <button class="bp3-button bp3-minimal "><Link to="/project">Project</Link></button>
            <span class="bp3-navbar-divider"></span>
            
          </div>
        </div>
      </nav>
}
export default Nav