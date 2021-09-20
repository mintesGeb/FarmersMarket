import React, { Component } from "react";
import axios from "axios";
import auth from "../auth";

export default class ProductDetail extends Component {
  state = {
    farmer: [],
    display: false,
  };

  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        let copy = { ...this.state };
        copy.farmer = response.data.farmer;
        copy.display = true;
        this.setState(copy);
      });
  }



  addToCart = (id) => {
    console.log(id);
  };

  render() {
    return (
      <div>
        <h1 className="title">Product Detail</h1>
        {this.state.display &&
          this.state.farmer[0].products.map((prod) => {
            return (
              <div key={prod._id}>
                Product:<p>{prod.productName}</p>
                Available amount: <p>{prod.numberOfProducts}</p>
                Price: <p>{prod.price}</p>
                {/* {
                  localStorage.getItem("role")==="superuser" || localStorage.getItem("role")==="customer"?

                } */}
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    this.addToCart(prod.p_id);
                  }}
                >
                  AddToCart
                </button>
                
                <br />
              </div>
            );
          })}
      </div>
    );
  }
}
