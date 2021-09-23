import React from "react";
import axios from "axios";
import auth from "./auth";

class UserProfile extends React.Component {
  state = {
    user: [],
    isEditing: false,
    editedUser: { firstName: "", lastName: "" },
  };

  componentDidMount() {
    axios
      .get(
        "/" +
          localStorage.getItem("role") +
          "s/email/" +
          localStorage.getItem("email"),
        auth()
      )
      .then((res) => {
        console.log(res.data.result[0]);
        let copy = { ...this.state };
        copy.user = res.data.result[0];
        this.setState(copy);
      });
  }

  editProfile() {
    let copy = { ...this.state.user };
    this.setState({ editedUser: copy, isEditing: !this.state.isEditing });
  }
  infoChanged = (event) => {
    // console.log(this.state.editedUser);

    let copy = { ...this.state.editedUser };
    copy[event.target.name] = event.target.value;

    this.setState({ editedUser: copy });
  };
  editInfoSubmitted = () => {
    console.log(this.state.editedUser);
  };

  render() {
    return (
      <div>
        <h1 className="title">User Profile</h1>
        <div>
          <p>
            First Name: <b>{this.state.user.firstName}</b>
          </p>
          <p>
            Last Name: <b>{this.state.user.lastName}</b>
          </p>
          <p>
            Email: <b>{this.state.user.email}</b>
          </p>
          <p>
            Role: <b>{this.state.user.role}</b>
          </p>
          <p>
            Status: <b>{this.state.user.status}</b>
          </p>
          <button
            className="btn btn-outline-dark general-margin"
            onClick={() => this.editProfile()}
          >
            Edit
          </button>
        </div>
        {this.state.isEditing ? (
          <div>
            First Name:{" "}
            <input
              name="firstName"
              type="text"
              value={this.state.editedUser.firstName}
              onChange={(event) => this.infoChanged(event)}
            />
            <br />
            Last Name:{" "}
            <input
              name="lastName"
              type="text"
              value={this.state.editedUser.lastName}
              onChange={(event) => this.infoChanged(event)}
            />
            <br />
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

export default UserProfile;
