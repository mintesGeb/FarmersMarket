import Farmer from "./Farmer";
import Orders from "./Orders";

import React from "react";
import axios from "axios";

import auth from "../auth";

class Farmers extends React.Component {
  state = { farmers: [] };

  componentDidMount() {
    axios.get("/farmers", auth()).then((response) => {
      let copy = { ...this.state };
      copy.farmers = response.data.farmers;
      this.setState(copy);
    });
  }

  showProfile = (id) => {
    console.log(id);
    this.props.history.push("/farmer/profile/" + id);
  };

  displayProducts = (id) => {
    this.props.history.push(`/farmer/product/${id}`);
  };

  displayReviews = (id) => {
    this.props.history.push("/farmer/reviews/" + id);
  };
  showOrders = (id) => {
    this.props.history.push("/farmer/orders/" + id);
  };

  render() {
    return (
      <div>
        <h1 className="title">Farmers</h1>
        {this.state.farmers.map((far) => {
          return (
            <div>
              <Farmer
                key={far._id}
                farmer={far}
                displayProducts={() => this.displayProducts(far._id)}
                displayReviews={() => this.displayReviews(far._id)}
                showProfile={() => this.showProfile(far._id)}
              />

              {localStorage.getItem("role") === "farmer" ||
                localStorage.getItem("role") === "superuser" ? (
                <button
                  className="btn btn-outline-dark "
                  onClick={() => this.showOrders(far._id)}
                >
                  Orders
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

export default Farmers;
