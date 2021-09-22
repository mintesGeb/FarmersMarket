import React from "react";
import axios from "axios";
import auth from "../auth";
// const {ObjectId}  = require('../../../../../Backend/my-App/utils/database').ObjectId

class Cart extends React.Component {
  state = { customer: [], farmers: [], display: false };
  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        let copy = { ...this.state };
        copy.customer = res.data.customer;
        copy.display = true;
        this.setState(copy);
      });
    axios
      .get("/farmers", auth())
      .then((res) => {
        console.log(res.data)
        let copy = { ...this.state };
        copy.farmers = res.data.farmers;
        this.setState(copy);
      });
  }



  changeAmount = (e, item) => {
    const copy = { ...this.state }
    copy.customer[0].cart.map((prod) => {
      if (item.p_id === prod.p_id) {
        if (e.target.value === "Add Amount") {
          copy.farmers = copy.farmers.map((farmer) => {
            if (item.f_id === farmer._id) {
              farmer.products.map((product) => {
                if (product.p_id === item.p_id && product.numberOfProducts > 1) {
                  product.numberOfProducts = parseInt(product.numberOfProducts) - 1;
                  prod.price = prod.price / (parseInt(prod.numberOfProducts))
                  prod.numberOfProducts = parseInt(prod.numberOfProducts) + 1
                  prod.price = prod.price * prod.numberOfProducts;
                }
                return product
              })
            }
            return farmer;
          })
        } else if (e.target.value === "Decrease Amount" && prod.numberOfProducts > 1) {
          copy.farmers.map((farmer) => {
            if (item.f_id === farmer._id) {
              farmer.products.map((product) => {
                if (product.p_id === item.p_id) {
                  product.numberOfProducts = parseInt(product.numberOfProducts) + 1;
                }
                return product
              })
            }
            return farmer;
          })
          prod.price = prod.price / (parseInt(prod.numberOfProducts))
          prod.numberOfProducts = parseInt(prod.numberOfProducts) - 1
          prod.price = prod.price * prod.numberOfProducts
        }
      }
      return prod;
    })
    this.setState(copy);
  }

  buyProducts = (purchase) => {
    const copy = {...purchase};
    const order = [...copy.customer[0].cart];
    // order.o_id= ////
    order[0].date = new Date();
    order[0].status = "pending";
    console.log(order)
    
    this.state.customer[0].cart.map((item) => {
      axios.delete('customers/removeProduct/' + this.state.customer[0]._id + '/' + item.p_id, auth())
        .then((res) => {
          console.log(res.data)
        })
    })
    
    axios.put("/customers/add-order/"+copy.customer[0]._id,order,auth())
    .then((res)=>{
      console.log(res.data)
    })
    axios.put("/farmers/add-order/"+copy.customer[0].cart.f_id,order,auth())
    .then((res)=>{
      console.log(res.data);
    })
    copy.customer[0].order=order.splice()
    copy.customer[0].cart=[]
    // console.log(copy.farmers[1].products)
    // console.log(copy.customer[0].order)
    this.setState(copy);
    
  }

  removeFromCart = (id) => {
    axios.delete('customers/removeProduct/' + this.state.customer[0]._id + '/' + id, auth())
      .then((res) => {
        console.log(res.data)
      })
    let copy = { ...this.state }
    const newCart = this.state.customer[0].cart.filter((item) => item.p_id !== id)
    copy.customer[0].cart = newCart.splice()
    this.setState({ copy })
    console.log(this.state.customer[0]);
  }

  render() {
    return (
      <div>
        <h1 className="title"> Cart</h1>
        {this.state.display ? (
          <div>
            {this.state.customer[0].cart.map((item) => {
              return (
                <div>
                  Product Name: <p>{item.productName}</p>
                  Price: <p>{item.price}</p>
                  Catagory: <p>{item.catagory}</p>
                  Amount: <p>{item.numberOfProducts}</p>
                  <input
                    type="button"
                    value="Add Amount"
                    onClick={(e) => this.changeAmount(e, item)} />
                  <input
                    type="button"
                    value="Decrease Amount"
                    onClick={(e) => this.changeAmount(e, item)} />
                  <input
                    type="button"
                    value="Remove"
                    onClick={() => this.removeFromCart(item.p_id)} />
                </div>
              );
            })}
            {this.state.customer[0].cart.length && <div><hr /><input
              type="button"
              value="Buy"
              onClick={() => this.buyProducts(this.state)} /></div>}
            <p>{this.state.customer[0].firstName}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Cart;
