import React, { Component } from "react";

export default class Product extends Component {
  render() {
    const { _id, productName, price } = { ...this.props.product };
    return (
      <div className="product general-margin">
        <h4>{productName}</h4> <p> $ {price}</p>
        <button className="btn btn-outline-dark" onClick={this.props.addToCart}>
          AddToCart
        </button>
      </div>
    );
  }
}
