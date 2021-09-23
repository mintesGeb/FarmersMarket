import React from "react";
import axios from "axios";

import auth from "../auth";

class Profile extends React.Component {
  state = { customer: [], display: false };

  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        let copy = { ...this.state };
        copy.customer = res.data.customer;
        copy.display = true;
        this.setState(copy);
      });
  }

  editProfile = () => {
    this.props.history.push(
      "/customers/profile/" + this.props.match.params.id + "/edit"
    );
  };

  changeStatus = () => {
    if (this.state.customer[0].status === "active") {
      axios.put('/customers/deactivate/'+this.state.customer[0]._id,null,auth())
      .then((res)=>{
     this.setState(()=>{
       return {customer:[...res.data]}
     })
      })
    } else {
      axios.put('/customers/activate/'+this.state.customer[0]._id,null,auth())
      .then((res)=>{
        this.setState(()=>{
          return {customer:[...res.data]}
        })
      })
    }
  }

  render() {
    return (
      <div>
        <h1 className="title"> Profile</h1>
        {this.state.display ? (
          <div>
            <p>
              First Name: <b>{this.state.customer[0].firstName}</b>
            </p>
            <p>
              Last Name: <b>{this.state.customer[0].lastName}</b>
            </p>
            <p>
              Email: <b>{this.state.customer[0].email}</b>
            </p>
            <p>
              Role: <b>{this.state.customer[0].role}</b>
            </p>
            <p>
              Status: <b>{this.state.customer[0].status}</b>
            </p>
            <button
              className="btn btn-outline-dark general-margin"
              onClick={this.editProfile}
            >
              Edit
            </button>
            {localStorage.getItem("role")==="superuser"? <div>{this.state.customer[0].status === "active" ? <button
              className="btn btn-outline-dark general-margin"
              onClick={() => this.changeStatus()}
            >Deactivate User</button> : <button
              className="btn btn-outline-dark general-margin"
              onClick={() => this.changeStatus()}
            >Activate User</button>}</div>: null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
