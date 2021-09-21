import React from "react";
import axios from "axios";

import auth from "../auth";

class FarmerProfileEdit extends React.Component {
  state = { farmer: {}, display: false };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((res) => {
        let copy = { ...this.state };
        copy.farmer = res.data.farmer[0];
        copy.display = true;
        this.setState(copy);
      });
  }
  infoChanged = (event) => {
    let copy = { ...this.state };
    copy.farmer[event.target.name] = event.target.value;
    console.log(copy.farmer[event.target.name]);
    //this.setState(copy);
  };
  editInfoSubmitted = () => {
    //console.log(this.state.farmer, this.state.farmer._id);

    this.props.history.push("/farmers/profile/" + this.state.farmer._id);
  };
  render() {
    return (
      <div>
        <h1 className="title">Profile Edit</h1>
        {this.state.display ? (
          <div>
            First Name: <input
              name="firstName"
              type="text"
              defaultValue={this.state.farmer.firstName}
              onChange={(event) => this.infoChanged(event)}
            />
            Last Name<input
              name="lastName"
              type="text"
              defaultValue={this.state.farmer.lastName}
              onChange={(event) => this.infoChanged(event)}
            />
            {/* <input
              name="status"
              type="text"
              value={this.state.farmer.status}
              onChange={(event) => this.infoChanged(event)}
            /> */}
            {/* <input
              name="email"
              type="text"
              value={this.state.farmer.email}
              onChange={(event) => this.infoChanged(event)}
            /> */}
            Password: <input
              name="password"
              type="text"
              defaultValue={this.state.farmer.password}
              onChange={(event) => this.infoChanged(event)}
            />
            {/* <input
              name="role"
              type="text"
              value={this.state.farmer.role}
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

export default FarmerProfileEdit;
