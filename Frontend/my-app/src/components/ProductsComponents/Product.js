import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";

export default class Product extends Component {
  render() {
    const { _id, productName, price } = { ...this.props.product };
    return (
      <div className="product general-margin">
        {/* <Card>
          <Card.Img></Card.Img>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Img></Card.Img>
          <Button>Add To Cart</Button>
        </Card> */}
        <h4>{productName}</h4> <p> $ {price}</p>
        <button className="btn btn-outline-dark" onClick={this.props.addToCart}>
          AddToCart
        </button>
      </div>
    );
  }
}
