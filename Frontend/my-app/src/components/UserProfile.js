import React from "react";
import axios from "axios";
import auth from "./auth";

class UserProfile extends React.Component {
  state = { user: [] };

  // componentDidMount(){
  //     let req;
  //     if(localStorage.getItem("role")==="farmer"){
  //         req = axios.get("/farmers/email"+localStorage.getItem("email"), auth())

  //     }else if (localStorage.getItem("role")==="farmer"){
  //         req = axios.get("/customers/email"+localStorage.getItem("email"), auth())
  //     }
  //     req.then(res=>{
  //         console.log(res);
  //     })

  // }
  render() {
    return (
      <div>
        <h1 class="title">User Profile</h1>
      </div>
    );
  }
}

export default UserProfile;
