import React from "react";
import axios from "axios";

import auth from "../auth";

class ProfileEdit extends React.Component {
  state = { customer: {}, display: false };
  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        console.log(res.data.customer);
        let copy = { ...this.state };
        copy.customer = res.data.customer[0];
        copy.display = true;
        this.setState(copy);
      });
  }
  infoChanged = (event) => {
    let copy = { ...this.state };
    copy.customer[event.target.name] = event.target.value;
    console.log(copy.customer[event.target.name]);
    this.setState(copy);
  };
  editInfoSubmitted = () => {
    console.log(this.state.customer, this.state.customer._id);

    this.props.history.push("/customers/profile/" + this.state.customer._id);
  };
  render() {
    return (
      <div>
        <h1 className="title">Profile Edit</h1>
        {this.state.display ? (
          <div>
            <input
              name="firstName"
              type="text"
              value={this.state.customer.firstName}
              onChange={(event) => this.infoChanged(event)}
            />
            <input
              name="lastName"
              type="text"
              value={this.state.customer.lastName}
              onChange={(event) => this.infoChanged(event)}
            />
            {/* <input
              name="status"
              type="text"
              value={this.state.customer.status}
              onChange={(event) => this.infoChanged(event)}
            /> */}
            {/* <input
              name="email"
              type="text"
              value={this.state.customer.email}
              onChange={(event) => this.infoChanged(event)}
            /> */}
            <input
              name="password"
              type="text"
              value={this.state.customer.password}
              onChange={(event) => this.infoChanged(event)}
            />
            {/* <input
              name="role"
              type="text"
              value={this.state.customer.role}
              onChange={(event) => this.infoChanged(event)}
            /> */}
            <input
              className="btn btn-outline-dark general-margin"
              type="button"
              value="Submit"
              onClick={this.editInfoSubmitted}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProfileEdit;
