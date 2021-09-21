import React from "react";
import axios from "axios";
import auth from "../auth";
import NewProduct from "./NewProduct";

class MyProducts extends React.Component {
  state = {
    myProducts: [],
    display: false,
    isAddProduct: false,
    newProduct: {},
    f_id: "",
  };

  componentDidMount() {
    axios
      .get("farmers/email/" + localStorage.getItem("email"), auth())
      .then((response) => {
        console.log(response.data.result[0].products);
        let copy = { ...this.state };
        copy.myProducts = response.data.result[0].products;
        copy.display = true;
        copy.f_id = response.data.result[0]._id;
        this.setState(copy);
      });
  }

  addProductToggle() {
    // console.log(this.state);
    let copy = { ...this.state };
    copy.isAddProduct = !this.state.isAddProduct;

    this.setState(copy);
  }

  deleteProduct(id) {
    console.log(id);
    console.log(this.state);
  }
  editProduct(id) {
    console.log(id);
  }

  newProductInfoChange = (event) => {
    let copy = { ...this.state.newProduct };
    copy[event.target.name] = event.target.value;
    this.setState({ newProduct: copy });
  };
  
  addProductDone(id) {
    axios
      .put("/farmers/add-product/" + id, this.state.newProduct, auth())
      .then((res) => {
        console.log(res.data);
        let copy = { ...this.state };
        copy.myProducts = res.data;
        this.setState(copy);
      });
  }

  render() {
    return (
      <div>
        <h1 className="title">My Products</h1>

        <input
          value="Add Product"
          type="button"
          className="btn btn-outline-dark  general-margin"
          onClick={() => this.addProductToggle()}
        />

        {this.state.isAddProduct ? (
          <div>
            <NewProduct
              nameChanged={(event) => this.newProductInfoChange(event)}
              priceChanged={(event) => this.newProductInfoChange(event)}
              catagoryChanged={(event) => this.newProductInfoChange(event)}
              amountChanged={(event) => this.newProductInfoChange(event)}
              addProductDone={() => this.addProductDone(this.state.f_id)}
            ></NewProduct>
          </div>
        ) : null}
        <hr />

        {this.state.display ? (
          <div>
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
        ) : null}
      </div>
    );
  }
}

export default MyProducts;
