import React from "react";
import axios from "axios";
import auth from "../auth";
import Order from "./Order";

class Orders extends React.Component {
  state = { orders: [] };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        // console.log(response.data.farmer[0].review);
        let copy = { ...this.state };
        copy.orders = response.data.farmer[0].orders;
        this.setState(copy);
      });
  }

  makeReady = (index) => {
    let copy = { ...this.state };
    console.log(copy.orders[index].status);
    copy.orders[index].status = "Ready";
    this.setState(copy);
  };
  makeComplete = (index) => {
    let copy = { ...this.state };
    console.log(copy.orders[index].status);
    copy.orders[index].status = "Complete";
    this.setState(copy);
  };

  render() {
    return (
      <div>
        <h1 className="title">Orders</h1>
        {this.state.orders.map((order, index) => {
          return (
            <div>
              <Order
                cust={order.c_id}
                prod={order.p_id}
                status={order.status}
              />
              {order.status === "pending" ? (
                <button
                  className="btn btn-outline-dark general-margin"
                  onClick={() => this.makeReady(index)}
                >
                  Ready
                </button>
              ) : order.status === "ready" ? (
                <button
                  className="btn btn-outline-dark general-margin"
                  onClick={() => this.makeComplete(index)}
                >
                  Complete
                </button>
              ) : order.status === "complete" ? (
                <button className="btn btn-outline-dark general-margin">
                  ✔
                </button>
              ) : null}
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Orders;
