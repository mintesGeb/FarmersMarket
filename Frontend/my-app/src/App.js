import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import React from "react";
import axios from "axios";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Farmers from "./components/FarmersComponents/Farmers";
import Customers from "./components/CustomersComponents/Customers";
export const LoginContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      setToTrue: this.setToTrue,
      setToFalse: this.setToFalse,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setToTrue();
    } else {
      this.setToFalse();
    }
  }

  setToTrue = () => {
    this.setState({ isLoggedIn: true });
  };
  setToFalse = () => {
    this.setState({ isLoggedIn: false });
  };
  loggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.setToFalse();
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.isLoggedIn === true ? null : (
            <div>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          )}
          {this.state.isLoggedIn === false ? null : (
            <div>
              <ul>
                <li>
                  <Link to="/farmers">Farmers</Link>
                </li>
                                <li>
                  <Link to="/customers">Customers</Link>
                </li>
                <li>
                  <Link to="/logout" onClick={this.loggedOut}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <hr />

          <Route path="/login" component={Login}>
            <LoginContext.Provider value={this.state}>
              <Login></Login>
            </LoginContext.Provider>
          </Route>
          <Route path="/register" component={Register} />

          <Route path="/logout" component={Logout} />
          <Route path="/farmers" component={Farmers} />
          <Route path="/customers" component={Customers} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
