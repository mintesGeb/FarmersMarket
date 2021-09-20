import Farmer from "./Farmer";

import React from "react";
import axios from "axios";

import auth from "../auth";

class Farmers extends React.Component {
  state = { farmers: [] };

  componentDidMount() {
    axios.get("/farmers", auth()).then((response) => {
    //   console.log(response.data.farmers);
      let copy = { ...this.state };
      copy.farmers = response.data.farmers;
      this.setState(copy);
    });
  }

  displayProducts = (id) => {
    this.props.history.push(`/farmer/product/${id}`);
  };

  displayReviews=(id)=>{
      this.props.history.push("/farmer/reviews/"+id)
  }

  render() {
    return (
      <div>
        <h1 className="title">Farmers</h1>
        {this.state.farmers.map((far) => {
        //   console.log(far);
          return (
            <Farmer
              key={far._id}
              farmer={far}
              displayProducts={() => this.displayProducts(far._id)}
              displayReviews={()=>this.displayReviews(far._id)}
            />
          );
        })}
      </div>
    );
  }
}

export default Farmers;
