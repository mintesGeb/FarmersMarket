import React, { Component } from "react";
import axios from "axios";
import auth from "../auth";

export default class ProductDetail extends Component {
  state = { farmer: [], display: false, detailProductPrice: "..." };

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

  showPrice = (id) => {
    console.log(id);
    axios.get("/products/" + id, auth()).then((response) => {
      console.log(response.data.product[0].price);
      let copy = { ...this.state.detailProductPrice };
      copy = response.data.product[0].price;
      this.setState({ detailProductPrice: copy });
    });
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
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    this.showPrice(prod.p_id);
                  }}
                >
                  Show Current Price
                </button>
                <h4 className="general-margin">
                  $ {this.state.detailProductPrice}
                </h4>
                <br />
              </div>
            );
          })}
      </div>
    );
  }
}
