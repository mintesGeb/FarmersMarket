import Farmer from "./Farmer";

import React from "react";
import axios from "axios";

import auth from "../auth";

class Farmers extends React.Component {
  state = { farmers: [] };

  componentDidMount() {
    axios.get("/farmers", auth()).then((response) => {
      console.log(response.data.farmers);
      let copy = { ...this.state };
      copy.farmers = response.data.farmers;
      this.setState(copy);
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Farmers</h1>
        {this.state.farmers.map((far) => {
          return <Farmer name={far.firstName} />;
        })}
      </div>
    );
  }
}

export default Farmers;
