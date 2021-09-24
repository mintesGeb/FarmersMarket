import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import React from "react";
import axios from "axios";
import auth from "./components/auth";

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
import ProfileEdit from "./components/CustomersComponents/ProfileEdit.js";
import UserProfile from "./components/UserProfile";
import FarmersProfile from "./components/FarmersComponents/FarmersProfile";
import FarmerProfileEdit from "./components/FarmersComponents/FarmerProfileEdit";
import MyProducts from "./components/FarmersComponents/MyProducts";
import Home from "./components/Home";

export const LoginContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      setToTrue: this.setToTrue,
      setToFalse: this.setToFalse,
      id: ""
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
    if(localStorage.getItem("role")==="customer")
    {axios.get('/customers/email/' + localStorage.getItem("email"), auth())
      .then((res) => {
        this.setState(() => {
          return {id:res.data.result[0]._id}
        })
      })}
    this.setState({ isLoggedIn: true });

  };
  setToFalse = () => {
    this.setState({ isLoggedIn: false });
  };
  loggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    this.setToFalse();
  };

  showCart = () => {

  }

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
                {localStorage.getItem("role") === "farmer" ? null : (
                  <li>
                    <Link to="/farmers">Farmers</Link>
                  </li>
                )}
                {localStorage.getItem("role") === "farmer" ? (
                  <li>
                    <Link to="/my-products">My Products</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                )}
                {localStorage.getItem("role") === "superuser" ? (
                  <li>
                    <Link to="/customers">Customers</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                )}
                {localStorage.getItem("role") === "customer" ? (
                  <li>
                  <Link to={"/customers/cart/"+this.state.id}>
                    Cart
                  </Link>
                </li>) : null}


                <li>
                  <Link to="/logout" onClick={this.loggedOut}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <hr />
          {/* <Switch> */}
          <Route path="/login" component={Login}>
            <LoginContext.Provider value={this.state}>
              <Login></Login>
            </LoginContext.Provider>
          </Route>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register} />
          <Route path="/products" component={Products} />
          <Route path="/my-products" component={MyProducts} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/farmers" component={Farmers} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/farmer/product/:id" component={ProductDetail} />
          <Route path="/farmer/reviews/:id" component={Reviews} />
          <Route path="/farmer/orders/:id" component={Orders} />
          {/* </Switch> */}
          <Route path="/customers/cart/:id" component={Cart} />
          <Route path="/customers/profile/:id" component={Profile} />
          <Route path="/customers/profile/:id/edit" component={ProfileEdit} />
          <Route path="/customers/orders/:id" component={CustOrders} />
          <Route path="/farmer/profile/:id" component={FarmersProfile} />
          <Route
            path="/farmer/profile/:id/edit"
            component={FarmerProfileEdit}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
