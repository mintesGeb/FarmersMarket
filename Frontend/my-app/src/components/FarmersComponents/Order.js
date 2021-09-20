function Order (props){
    return (
        <div>
            <p>Customer: {props.cust}</p>
            <p>Product: {props.prod}</p>
            <p>Status: {props.status}</p>
        </div>
    )
}
export default Order;