import React from "react";
import axios from "axios";

import auth from "../auth";

class Orders extends React.Component {
  state = { orders: [] };

  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        console.log(res.data.customer[0].order)
        this.setState({ orders: [...res.data.customer[0].order] });
      });
  }

  render() {
    let disp = this.state.orders.length
    return (
      <div>
        <h1 className="title"> Orders</h1>
        {disp && (this.state.orders.map((order)=>{
          return (
            <div>
              Product Name: <p> {order.productName}</p>
              Price/product: <p> {parseInt(order.price)/parseInt(order.numberOfProducts)}</p>
              Amount Purchased: <p>{order.numberOfProducts}</p>
              Total Price: <p> {order.price}</p>
              Date Purchased: <p>{order.date}</p>
              Status: <p>{order.status}</p>
            </div>
          )
        }))}
      </div>
    );
  }
}

export default Orders;
