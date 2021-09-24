import React from "react";
import axios from "axios";
import auth from "../auth";
import Farmer from "./Farmer";

class FarmerView extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">Orders and Review</h1>
        <Farmer />
      </div>
    );
  }
}

export default FarmerView;
