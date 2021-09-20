import React, { Component } from "react";
import axios from "axios";
import auth from "../auth";
import Product from "./Product";
import { Container, col, Row } from "react-bootstrap";

export default class Products extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get("/products", auth()).then((res) => {
      this.setState({ ...res.data });
    });
  }

  addToCart = (id) => {
    console.log(id);
  };

  render() {
    return (
      <div>
        <h1 className="title">Products</h1>
        {this.state.products.map((item) => {
          return (
            <Product
              key={item._id}
              product={item}
              addToCart={() => this.addToCart(item._id)}
            />
          );
        })}
      </div>
    );
  }
}
