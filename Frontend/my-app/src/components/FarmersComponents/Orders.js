import React from "react";
import axios from "axios";
import auth from "../auth";
import Order from "./Order";

class Orders extends React.Component {
  state = { f_id:'',orders: [] };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        // console.log(response.data.farmer[0].review);
        let copy = { ...this.state };
        copy.orders = response.data.farmer[0].orders;
        copy.f_id = response.data.farmer[0]._id;
        this.setState(copy);
      });
  }

  makeReady = (f_id,o_id) => {
    axios.put("/farmers/make-ready/"+f_id+"/"+o_id,null ,auth())
    .then((response)=>{
      let copy = {...this.state}
      copy.orders=[...response.data]
      this.setState(copy);
    })
  };


  makeComplete = (f_id,o_id) => {
    axios.put("/farmers/make-complete/"+f_id+"/"+o_id, null, auth())
    .then((response)=>{
      let copy = {...this.state}
      copy.orders=[...response.data]
      this.setState(copy);
    })
  };

  render() {
    return (
      <div>
        <h1 className="title">Orders</h1>
        {this.state.orders.map((order) => {
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
                  onClick={() => this.makeReady(this.state.f_id,order.o_id)}
                >
                  Ready
                </button>
              ) : order.status === "ready" ? (
                <button
                  className="btn btn-outline-dark general-margin"
                  onClick={() => this.makeComplete(this.state.f_id,order.o_id)}
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
