import React from "react";
import axios from "axios";
import auth from "../auth";
import Order from "./Order";

class Orders extends React.Component {
  state = { f_id: "", orders: [], customerEmail: "", display: false };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        console.log(response.data);
        let copy = { ...this.state };
        if (response.data.farmer[0].orders) {
          if (response.data.farmer[0].orders[0]) {
            console.log(response.data.farmer[0].orders[0].data[0].c_id);
            copy.orders = response.data.farmer[0].orders;
            copy.c_id = response.data.farmer[0].orders[0].data[0].c_id;
            copy.f_id = response.data.farmer[0]._id;
            copy.display = true;
          }
        }
        this.setState(() => copy);
      });
  }

  makeReady = (f_id, o_id, c_id) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    axios.get("/customers/" + c_id, auth()).then((res) => {
      this.setState(() => {
        return { customerEmail: res.data.customer[0].email };
      });
    });
    axios
      .put("/farmers/make-ready/" + f_id + "/" + o_id, null, auth())
      .then((response) => {
        let copy = { ...this.state };
        copy.orders = [...response.data];
        this.setState(copy);
      });

    axios
      .put("/customers/make-ready/" + c_id + "/" + o_id, null, auth())
      .then((response) => {
        console.log(response);
      });

    axios
      .post("/farmers/send-email/" + this.state.customerEmail, tomorrow, auth())
      .then((res) => console.log(res));
  };

  makeComplete = (f_id, o_id, c_id) => {
    axios
      .put("/farmers/make-complete/" + f_id + "/" + o_id, null, auth())
      .then((response) => {
        let copy = { ...this.state };
        copy.orders = [...response.data];
        this.setState(copy);
      });
    axios
      .put("/customers/make-complete/" + c_id + "/" + o_id, null, auth())
      .then((response) => {
        console.log("email", response);
      });
  };

  render() {
    console.log(this.state.orders);
    return (
      <div>
        <h1 className="title">Orders</h1>
        {this.state.display &&
          this.state.orders.map((order) => {
            return (
              <div>
                <Order
                  // cust={order.data.c_id}
                  // prod={order.data[0].p_id}
                  order_id={order.o_id}
                  status={order.status}
                  date={order.date}
                />
                {order.status === "pending" ? (
                  <button
                    className="btn btn-outline-dark general-margin"
                    onClick={() =>
                      this.makeReady(
                        this.state.f_id,
                        order.o_id,
                        this.state.c_id
                      )
                    }
                  >
                    Ready
                  </button>
                ) : order.status === "ready" ? (
                  <button
                    className="btn btn-outline-dark general-margin"
                    onClick={() =>
                      this.makeComplete(
                        this.state.f_id,
                        order.o_id,
                        this.state.c_id
                      )
                    }
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
