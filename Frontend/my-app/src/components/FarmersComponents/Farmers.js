import Farmer from "./Farmer";
import Orders from "./Orders";

import React from "react";
import axios from "axios";

import auth from "../auth";

class Farmers extends React.Component {
  state = { farmers: [] };

  componentDidMount() {
    let req;
    if (localStorage.getItem("role") === "farmer") {
      req = axios
        .get("/farmers/email/" + localStorage.getItem("email"), auth())
        .then((response) => {
          console.log(response.data.result);
          let copy = { ...this.state };
          copy.farmers = response.data.result;
          this.setState(copy);
        });
    } else {
      req = axios.get("/farmers", auth()).then((response) => {
        console.log(response.data.result);
        let copy = { ...this.state };
        copy.farmers = response.data.farmers;
        this.setState(copy);
      });
    }
  }

  showProfile = (id) => {
    localStorage.getItem("role") === "farmer"
      ? this.props.history.push("/profile")
      : this.props.history.push("/farmer/profile/" + id);
  };

  displayProducts = (id) => {
    localStorage.getItem("role") === "farmer"
      ? this.props.history.push(`/my-products`)
      : this.props.history.push(`/farmer/product/${id}`);
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
        {localStorage.getItem("role") === "farmer" ? (
          <h1 className="title">Orders & Reviews</h1>
        ) : (
          <h1 className="title">Farmers</h1>
        )}
        {this.state.farmers.sort((a, b) => b.reputation - a.reputation).map((far) => {
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
