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
import Products from "./components/ProductsComponents/Products";
import ProductDetail from "./components/FarmersComponents/ProductDetail";
import Reviews from "./components/FarmersComponents/Reviews";
import Orders from "./components/FarmersComponents/Orders";
import Cart from "./components/CustomersComponents/Cart";
import Profile from "./components/CustomersComponents/Profile";
import CustOrders from "./components/CustomersComponents/Orders";

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
                  <Link to="/products">Products</Link>
                </li>

                <li>
                  <Link to="/customers">Customers</Link>
                </li>

                {/* <li>
                  <Link to="/cart">Cart</Link>
                </li> */}

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
          <Route path="/products" component={Products} />
          <Route path="/logout" component={Logout} />
          <Route path="/farmers" component={Farmers} />
          <Route path="/customers" component={Customers} />
          <Route path="/farmer/product/:id" component={ProductDetail} />
          <Route path="/farmer/reviews/:id" component={Reviews} />
          <Route path="/farmer/orders/:id" component={Orders} />
          <Route path="/customers/cart/:id" component={Cart} />
          <Route path="/customers/profile/:id" component={Profile} />
          <Route path="/customers/orders/:id" component={CustOrders} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
