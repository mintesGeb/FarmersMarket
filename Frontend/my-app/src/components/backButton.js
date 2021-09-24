function Back(props) {
  return (
    <div>
      <input
        className="btn btn-outline-dark"
        type="button"
        value="/"
        onClick={props.backClicked}
      />
    </div>
  );
}
export default Back;
