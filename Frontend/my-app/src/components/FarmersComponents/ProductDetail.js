import React, { Component } from "react";
import axios from "axios";
import auth from "../auth";

export default class ProductDetail extends Component {
  state = {
    farmer: [],
    c_id: "",
    display: false,
  };

  componentDidMount() {
    let copy = { ...this.state };
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        axios
          .get("/customers/email/" + localStorage.getItem("email"), auth())
          .then((res) => {
            // console.log("the customer", res.data.result[0]._id);
            copy.farmer = response.data.farmer;
            copy.display = true;
            copy.c_id = res.data.result[0]._id;
            this.setState(copy);
          });
      });
  }

  addToCart = (prod) => {
    let copy = { ...prod };
    copy.f_id = this.state.farmer[0]._id;
    console.log(copy.numberOfProducts);
    copy.c_id=this.state.c_id;
    if (copy.numberOfProducts > 0) {
      axios
        .post("/customers/addtocart/" + this.state.c_id, copy, auth())
        .then((res) => {
          console.log(res.data);
          let copy2 = { ...this.state };
          copy2.farmer = res.data;
          this.setState(copy);
        });
    } else {
      console.log("Out of Stock");
    }
  };

  render() {
    return (
      <div>
        <h1 className="title">Product Detail</h1>
        {this.state.display &&
          this.state.farmer[0].products.map((prod) => {
            return (
              <div key={prod.p_id}>
                Product:
                <p>
                  <b>{prod.productName}</b>
                </p>
                {prod.numberOfProducts > 0 ? (
                  <div>
                    Available amount:{" "}
                    <p>
                      <b>{prod.numberOfProducts}</b>
                    </p>
                  </div>
                ) : null}
                Price:{" "}
                <p>
                  <b>{prod.price}</b>
                </p>
                {prod.numberOfProducts > 0 ? (
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                      this.addToCart(prod);
                    }}
                  >
                    AddToCart
                  </button>
                ) : (
                  <button className="btn btn-outline-dark">Out Of Stock</button>
                )}
                <hr />
                <br />
              </div>
            );
          })}
      </div>
    );
  }
}
