import React from "react";
function Customer(props) {
  return (
    <div>
      <p>
        {props.firstName} {props.lastName}
      </p>
      {/* <p> Status:{props.status}</p> */}
      {/* <input className="btn btn-outline-dark general-margin" type="button" value="Change Status " /> */}

      <input
        className="btn btn-outline-dark "
        type="button"
        value="Profile"
        onClick={props.showProfile}
      />
      <input
        className="btn btn-outline-dark general-margin"
        type="button"
        value="Cart"
        onClick={props.showCart}
      />
      <input
        className="btn btn-outline-dark "
        type="button"
        value="Orders"
        onClick={props.showOrders}
      />
    </div>
  );
}

export default Customer;
