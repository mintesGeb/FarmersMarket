function Order(props) {
  return (
    <div>
      {/* <p>Customer: {props.cust}</p> */}
      {/* <p>Product: {props.prod}</p> */}
      <p>
        Order Id: <b>{props.order_id}</b>
      </p>
      <p>
        Date: <b>{props.date}</b>
      </p>
      <p>
        Status: <b>{props.status}</b>
      </p>
    </div>
  );
}
export default Order;
