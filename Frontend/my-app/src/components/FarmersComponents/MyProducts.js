import React from "react";
import axios from "axios";
import auth from "../auth";
import NewProduct from "./NewProduct";
import Back from "../backButton";

class MyProducts extends React.Component {
  state = {
    myProducts: [],
    display: false,
    isAddProduct: false,
    newProduct: {},
    f_id: "",
    editProduct: false,
    productToUpdate: {},
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
    axios
      .put(
        "/farmers/delete-product/" + this.state.f_id + "/" + id,
        null,
        auth()
      )
      .then((res) => {
        let copy = { ...this.state };
        copy.myProducts = res.data[0].products;
        this.setState(copy);
      });
  }
  editProduct(id) {
    console.log(id);

    let found = this.state.myProducts.find((prod) => prod.p_id == id);
    console.log(found);
    this.setState({
      editProduct: !this.state.editProduct,
      productToUpdate: found,
    });
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
        copy.isAddProduct = false;
        this.setState(copy);
      });
  }

  updateProductInfo = (event) => {
    let copy = { ...this.state.productToUpdate };
    copy[event.target.name] = event.target.value;
    console.log(copy);

    this.setState({ productToUpdate: copy });
  };

  updateProductDone = (id) => {
    console.log(id, this.state.productToUpdate);
    axios
      .put("/farmers/update-product/" + id, this.state.productToUpdate, auth())
      .then((prod) => {
        let copy = { ...this.state };
        console.log(prod.data[0].products);
        copy.myProducts = prod.data[0].products;
        this.setState(copy);
      });
  };

  backclicked = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="head">
          <Back backClicked={this.backclicked} />
          <h1 className="title">My Products</h1>
        </div>

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
              done={() => this.addProductDone(this.state.f_id)}
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
            {this.state.editProduct ? (
              <div>
                <h2 className="title">Editing ... </h2>
                <NewProduct
                  pName={this.state.productToUpdate.productName}
                  price={this.state.productToUpdate.price}
                  amount={this.state.productToUpdate.numberOfProducts}
                  catagory={this.state.productToUpdate.catagory}
                  nameChanged={(event) => this.updateProductInfo(event)}
                  priceChanged={(event) => this.updateProductInfo(event)}
                  catagoryChanged={(event) => this.updateProductInfo(event)}
                  amountChanged={(event) => this.updateProductInfo(event)}
                  done={() => this.updateProductDone(this.state.f_id)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default MyProducts;
