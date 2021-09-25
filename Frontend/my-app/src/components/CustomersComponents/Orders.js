import React from "react";
import axios from "axios";

import auth from "../auth";

class Orders extends React.Component {
  state = { orders: [] };

  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        console.log(res.data.customer[0].orders);
        this.setState({ orders: [...res.data.customer[0].orders] });
      });
  }

  render() {
    let disp = this.state.orders.length;
    return (
      <div>
        <h1 className="title"> Orders</h1>
        {disp &&
          this.state.orders.map((order) => {
            return (
              <div>
                Order ID:{" "}
                <p>
                  <b> {order.o_id}</b>
                </p>
                Date:{" "}
                <p>
                  <b> {order.date}</b>
                </p>
                Status:{" "}
                <p>
                  <b> {order.status}</b>
                </p>
                {/* {order.data.length > 0 ? (
                  <div>
                    {order.data.map((p) => {
                      return <p>{p.productName}</p>;
                    })}
                  </div>
                ) : null} */}
                <hr />
                {/* Price/product:{" "}
                <p>
                  {" "}
                  {parseInt(order.price) / parseInt(order.numberOfProducts)}
                </p>
                Amount Purchased: <p>{order.numberOfProducts}</p>
                Total Price: <p> {order.price}</p>
                Date Purchased: <p>{order.date}</p>
                Status: <p>{order.status}</p> */}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Orders;
