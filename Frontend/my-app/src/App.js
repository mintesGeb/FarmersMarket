import logo from "./logo.svg";
import "./App.css";
import {
  useHistory,
  Route,
  BrowserRouter,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
// import { ReactRouter } from "react-router";
import React from "react";
import axios from "axios";
import auth from "./components/auth";
import { Nav, Navbar, Container } from "react-bootstrap";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Farmers from "./components/FarmersComponents/Farmers";
import FarmerView from "./components/FarmersComponents/FarmerView";
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
import Back from "./components/backButton";
import NotFound from "./components/NotFound";

export const LoginContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      setToTrue: this.setToTrue,
      setToFalse: this.setToFalse,
      id: "",
      cartItems: "",
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
    if (localStorage.getItem("role") === "customer") {
      axios
        .get("/customers/email/" + localStorage.getItem("email"), auth())
        .then((res) => {
          // console.log(res.data.result[0].cart.length)
          this.setState(() => {
            return {
              id: res.data.result[0]._id,
              cartItems: res.data.result[0].cart.length,
            };
          });
        });
    }
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

  showCart = () => {};

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Farmers Market</Navbar.Brand>
              <Nav className="me-auto">
                {this.state.isLoggedIn === true ? null : (
                  <div>
                    <Nav.Link href="/login">Login</Nav.Link>

                    <Nav.Link href="/register">Register</Nav.Link>
                  </div>
                )}
                {this.state.isLoggedIn === false ? null : (
                  <div>
                    {localStorage.getItem("role") === "superuser" ? (
                      <Nav.Link href="/customers">Customers</Nav.Link>
                    ) : (
                      <Nav.Link href="/profile">Profile</Nav.Link>
                    )}
                    {localStorage.getItem("role") === "farmer" ? (
                      <div>
                        <Nav.Link href="/my-products">My Products</Nav.Link>
                        <Nav.Link href="/farmers">Orders & Review</Nav.Link>
                      </div>
                    ) : (
                      <div>
                        <Nav.Link href="/farmers">Farmers</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                      </div>
                    )}
                    {localStorage.getItem("role") === "customer" ? (
                      <div>
                        <Nav.Link href={"/customers/cart/" + this.state.id}>
                          <b>Cart</b>

                          <span className="cartItems">
                            {this.state.cartItems}
                          </span>
                        </Nav.Link>
                        <Nav.Link href={"/customers/orders/" + this.state.id}>
                          <b>Orders</b>
                        </Nav.Link>
                      </div>
                    ) : null}

                    <Nav.Link
                      href="/logout"
                      onClick={this.loggedOut}
                      className="rightSide"
                    >
                      Logout
                    </Nav.Link>
                    <br />
                    <Back />
                  </div>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>

        <div className="App">
          {/* <Switch> */}
          <Route path="/login" component={Login}>
            <LoginContext.Provider value={this.state}>
              <Login></Login>
            </LoginContext.Provider>
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/products" component={Products} />
          <Route path="/my-products" component={MyProducts} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/farmers" component={Farmers} />
          <Route path="/farmer" exact component={FarmerView} />

          <Route path="/customers" exact component={Customers} />
          <Route path="/farmer/product/:id" component={ProductDetail} />
          <Route path="/farmer/reviews/:id" component={Reviews} />
          <Route path="/farmer/orders/:id" component={Orders} />
          <Route path="/customers/cart/:id" component={Cart} />
          <Route path="/customers/profile/:id" component={Profile} />
          <Route path="/customers/profile/:id/edit" component={ProfileEdit} />
          <Route path="/customers/orders/:id" component={CustOrders} />
          <Route path="/farmer/profile/:id" component={FarmersProfile} />
          <Route
            path="/farmer/profile/:id/edit"
            component={FarmerProfileEdit}
          />
          {/* <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch> */}
        </div>
        <div className="footer"></div>
      </BrowserRouter>
    );
  }
}

export default App;
