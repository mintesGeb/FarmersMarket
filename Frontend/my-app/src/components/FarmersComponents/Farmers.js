import Farmer from "./Farmer";

import React from "react";
import axios from "axios";

import auth from "../auth";

class Farmers extends React.Component {
  state = { farmers: [] };

  componentDidMount() {
    axios.get("/farmers", auth()).then((response) => {
      let copy = { ...this.state };
      copy.farmers = response.data.farmers;
      this.setState(copy);
    });
  }

  displayProducts=(id)=>{
    this.props.history.push(`/farmer/product/${id}`)
  }

  render() {
    return (
      <div>
        <h1 className="title">Farmers</h1>
        {this.state.farmers.map((far) => {
          return <Farmer key={far._id} farmer={far} 
          showproducts={this.state.showproducts} displayProducts={()=>this.displayProducts(far._id)}/>;
        })}
      </div>
    );
  }
}

export default Farmers;
