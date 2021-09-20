import React from "react";
import axios from "axios";

import auth from "../auth";

class Orders extends React.Component {
  state = { orders: [] };

  componentDidMount() {
    axios
      .get("/customers/" + this.props.match.params.id, auth())
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <h1 className="title"> Orders</h1>
      </div>
    );
  }
}

export default Orders;
