import React from "react";
import axios from "axios";

import auth from "../auth";

class FarmersProfile extends React.Component {
  state = { farmer: [], display: true };

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

  editProfile = () => {
    this.props.history.push(
      "/farmer/profile/" + this.props.match.params.id + "/edit"
    );
  };

  render() {
    return (
      <div>
        <h1 className="title"> Profile</h1>
        {this.state.display ? (
          <div>
            <p>
              First Name: <b>{this.state.farmer.firstName}</b>
            </p>
            <p>
              Last Name: <b>{this.state.farmer.lastName}</b>
            </p>
            <p>
              Email: <b>{this.state.farmer.email}</b>
            </p>
            <p>
              Role: <b>{this.state.farmer.role}</b>
            </p>
            <p>
              Status: <b>{this.state.farmer.status}</b>
            </p>
            <button
              className="btn btn-outline-dark general-margin"
              onClick={this.editProfile}
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FarmersProfile;
