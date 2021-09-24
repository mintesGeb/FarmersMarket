import { useHistory } from "react-router-dom";

function Back(props) {
  let history = useHistory();
  return (
    <div>
      <input
        className="btn btn-outline-light"
        type="button"
        value="<"
        onClick={history.goBack}
      />
    </div>
  );
}
export default Back;
