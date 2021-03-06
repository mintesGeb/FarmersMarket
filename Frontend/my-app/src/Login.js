import React, { useCallback } from "react";
import axios from "axios";
import { LoginContext } from "./App.js";

class Login extends React.Component {
  state = {
    user: { role: "", email: "super@user", password: "superuser" },
    display: true,
  };

  loginInfoChanged = (event) => {
    let copy = { ...this.state.user };
    copy[event.target.name] = event.target.value;
    this.setState({ user: copy });
  };

  loginInfoSubmitted = (callback) => {
    if (
      this.state.user.role === "" ||
      this.state.user.email === "" ||
      this.state.user.password === ""
    ) {
      alert("Please enter valid email, password and role.");
    } else {
      // console.log(this.state.user);
      axios.post("/login", this.state.user).then((response) => {
        if (response.data.token) {
          
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", this.state.user.email);
          localStorage.setItem("role", this.state.user.role);
          this.setState({ display: false });
          callback();
          console.log(this.props);
        }else alert("Please enter Valid email, password and role.");
      });
    }
  };

  render() {
    return (
      <div>
        {!localStorage.getItem("token") ? (
          <div>
            <h2 className="title">Login</h2>
            <form className="general-margin">
              <select
                name="role"
                id="role"
                onChange={(event) => this.loginInfoChanged(event)}
              >
                <option>Select a role</option>
                <option value="farmer">Farmer</option>
                <option value="customer">Customer</option>
                <option value="superuser">Superuser</option>
              </select>
              <br />
            </form>

            <input
              type="email"
              placeholder="email"
              name="email"
              value={this.state.user.email}
              onChange={(event) => this.loginInfoChanged(event)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={this.state.user.password}
              name="password"
              onChange={(event) => this.loginInfoChanged(event)}
            />
            <br />
            <LoginContext.Consumer>
              {(value) => {
                return (
                  <input
                    className="btn btn-dark general-margin"
                    type="button"
                    value="Submit"
                    onClick={() => this.loginInfoSubmitted(value.setToTrue)}
                  />
                );
              }}
            </LoginContext.Consumer>
          </div>
        ) : (
          <div>
            <h1> Let the Fun Begin ! </h1>
            <img src="https://cdntaco-americantownscom.netdna-ssl.com/content-img/lexe-farmers-market-7.jpg" />
          </div>
        )}
      </div>
    );
  }
}

export default Login;
