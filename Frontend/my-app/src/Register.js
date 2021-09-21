import React from "react";
import axios from "axios";

class Register extends React.Component {
  state = {
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    isRegistered: false,
    message: "",
  };

  registerInfoChanged = (event) => {
    let copy = { ...this.state.newUser };
    copy[event.target.name] = event.target.value;
    this.setState({ newUser: copy });
  };

  registerInfoSubmitted = (profile) => {
    if (
      profile.lastName.length < 3 ||
      profile.firstName.length < 2 ||
      profile.role === "" ||
      profile.email.length <= 5 ||
      profile.password.length <= 4
    ) {
      alert("Please enter Correct values");
    } else {
      axios.post("/register/" + profile.role, profile).then((response) => {
        console.log(response.data.status);
        if (response.data.status === "exists") {
          this.setState({
            message:
              "This email is already registered please continue to Login",
          });
        } else if (response.data.status === "created") {
          this.setState({
            isRegistered: true,
            message: "You are successfully registered, continue to Login",
          });
        }
      });
    }
  };

  login = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1 className="title">Register</h1>

        {this.state.isRegistered === false ? (
          <div>
            <form className="general-margin">
              First Name:{" "}
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={(event) => this.registerInfoChanged(event)}
              />
              <br />
              Last Name:{" "}
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={(event) => {
                  this.registerInfoChanged(event);
                }}
              />
              <br />
              Email:{" "}
              <input
                name="email"
                value={this.state.email}
                onChange={(event) => {
                  this.registerInfoChanged(event);
                }}
              />
              <br />
              Password:{" "}
              <input
                name="password"
                value={this.state.password}
                onChange={(event) => {
                  this.registerInfoChanged(event);
                }}
              />
              <br />
              <select
                name="role"
                id="role"
                onChange={(event) => this.registerInfoChanged(event)}
              >
                <option>Select a role</option>
                <option value="farmer">Farmer</option>
                <option value="customer">Customer</option>
              </select>
              <br />
              <input
                className="btn btn-dark general-margin"
                type="button"
                value="Register"
                onClick={() => this.registerInfoSubmitted(this.state.newUser)}
              />
              <br />
            </form>
          </div>
        ) : (
          <input
            className="btn btn-dark general-margin"
            type="button"
            value="Login"
            onClick={this.login}
          />
        )}
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Register;
