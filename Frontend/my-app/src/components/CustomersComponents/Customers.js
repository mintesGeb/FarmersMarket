import React from "react";
import axios from "axios";
import CustomerData from "./Customer";
import auth from "../auth";

class Customers extends React.Component {
  state = { customers: [] };

  componentDidMount() {
    axios.get("http://localhost:1234/customers", auth()).then((response) => {
      //console.log(response.data.customer[0].status);
      let copy = { ...this.state };
      copy.customers = response.data.customer;
      this.setState(copy);
    });
  }
  //   deactivateUserStatus = () => {
  //     if (this.state.customers[0].status === "active") {
  //       //console.log(this.state.customers[0].status);
  //       let copy = { ...this.state };
  //       copy.customers[0].status = "in active";
  //       this.setState(copy);
  //     }

  //console.log('clicked')
  // let copy = {...this.state};
  // // if(copy.customers.status === 'active')
  // //     {console.log(copy.customers.status)}
  // //     this.setState(copy);
  // //this.setState(copy)
  //     console.log(this.customers.status)
  //   };

  showProfile = (id) => {
    this.props.history.push("/customers/profile/" + id);
  };
  showCart = (id) => {
    this.props.history.push("/customers/cart/" + id);
  };
  showOrders = (id) => {
    this.props.history.push("/customers/orders/" + id);
  };

  render() {
    return (
      <div>
        <h1 className="title"> Customers</h1>
        {this.state.customers.map((item) => {
          return (
            <div>
              <CustomerData
                firstName={item.firstName}
                lastName={item.lastName}
                status={item.status}
                showProfile={() => this.showProfile(item._id)}
                showCart={() => this.showCart(item._id)}
                showOrders={() => this.showOrders(item._id)}
              />
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Customers;
