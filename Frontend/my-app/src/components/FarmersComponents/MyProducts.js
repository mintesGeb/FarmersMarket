import React from "react";
import axios from "axios";
import auth from "../auth";

class MyProducts extends React.Component {
  state = { myProducts: [] };
  componentDidMount() {
    axios
      .get("farmers/email/" + localStorage.getItem("email"), auth())
      .then((response) => {
        console.log(response.data.result[0].products);
        let copy = { ...this.state };
        copy.myProducts = response.data.result[0].products;
        this.setState(copy);
      });
  }
  addProduct() {}
  deleteProduct(id) {
    console.log(id);
  }
  editProduct(id) {
    console.log(id);
  }
  render() {
    return (
      <div>
        <h1 className="title">My Products</h1>
        <input
          value="Add Product"
          type="button"
          className="btn btn-outline-dark  general-margin"
          onClick={this.addProduct()}
        />
        <hr />
        {this.state.myProducts.map((prod) => {
          return (
            <div key={prod.p_id}>
              <p>
                Caragory: <b>{prod.catagory}</b>
              </p>
              <p>
                Name: <b>{prod.productName}</b>
              </p>
              <p>
                Price: <b>{prod.price}</b>
              </p>
              <p>
                Amount in Stock: <b>{prod.numberOfProducts}</b>
              </p>
              <input
                value="Delete"
                type="button"
                className="btn btn-outline-dark general-margin"
                onClick={() => this.deleteProduct(prod.p_id)}
              />
              <input
                value="Edit"
                type="button"
                className="btn btn-outline-dark general-margin"
                onClick={() => this.editProduct(prod.p_id)}
              />

              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MyProducts;
