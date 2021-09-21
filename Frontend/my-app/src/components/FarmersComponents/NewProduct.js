function NewProduct(props) {
  return (
    <div>
      <input
        name="productName"
        type="text"
        placeholder="Name"
        onChange={props.nameChanged}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={props.priceChanged}
      />
      <input
        name="catagory"
        type="text"
        placeholder="Catagory"
        onChange={props.catagoryChanged}
      />
      <input
        name="numberOfProducts"
        type="text"
        placeholder="Amount"
        onChange={props.amountChanged}
      />
      <br />

      <input
        value="Done"
        type="button"
        className="btn btn-outline-dark  general-margin"
        onClick={props.addProductDone}
      />
    </div>
  );
}

export default NewProduct;
