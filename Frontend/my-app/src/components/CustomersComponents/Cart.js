import React from "react";
import axios from "axios";
import auth from "../auth";

class Cart extends React.Component {
  state = { customer: [], display: false };
  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        console.log(res.data.customer);
        let copy = { ...this.state };
        copy.customer = res.data.customer;
        copy.display = true;
        this.setState(copy);
      });
  }
  render() {
    return (
      <div>
        <h1 className="title"> Cart</h1>
        {this.state.display ? (
          <div>
            {this.state.customer[0].order.map((item) => {
              return (
                <div>
                  <p>{item.id}</p>
                  <p>{item.total}</p>
                  <p>{Date.now()}</p>
                  <p>{item.status}</p>
                </div>
              );
            })}
            <p>{this.state.customer[0].firstName}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Cart;
