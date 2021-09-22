function NewProduct(props) {
  return (
    <div>
      <input
        name="productName"
        type="text"
        placeholder="Name"
        value={props.pName}
        onChange={props.nameChanged}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={props.price}
        onChange={props.priceChanged}
      />
      <input
        name="catagory"
        type="text"
        value={props.catagory}
        placeholder="Catagory"
        onChange={props.catagoryChanged}
      />
      <input
        name="numberOfProducts"
        type="text"
        value={props.amount}
        placeholder="Amount"
        onChange={props.amountChanged}
      />
      <br />

      <input
        value="Done"
        type="button"
        className="btn btn-outline-dark  general-margin"
        onClick={props.done}
      />
    </div>
  );
}

export default NewProduct;
