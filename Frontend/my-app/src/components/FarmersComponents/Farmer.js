
function Farmer(props) {
  const { _id, firstName, lastName } = { ...props.farmer }
  return (
    <div>
      Farmer Name: <p>{firstName} {lastName}</p>
      <button onClick={props.displayProducts}>Display products</button><hr />
    </div>
  );
}
export default Farmer;
