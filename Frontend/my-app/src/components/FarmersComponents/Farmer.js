function Farmer(props) {
  const { _id, firstName, lastName, reputation } = { ...props.farmer };
  return (
    <div>
      <h3>
        {firstName} {lastName} [ {reputation} ]
      </h3>
      <button className="btn btn-outline-dark" onClick={props.displayProducts}>
        Products
      </button>
      <button
        className="btn btn-outline-dark general-margin"
        onClick={props.displayReviews}
      >
        Reviews
      </button>
      <button className="btn btn-outline-dark" onClick={props.showProfile}>
        Profile 
      </button>
    </div>
  );
}
export default Farmer;
