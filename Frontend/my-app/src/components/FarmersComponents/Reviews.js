import axios from "axios";
import React from "react";
import auth from "../auth";
import Review from "./Review";

class Reviews extends React.Component {
  state = { reviews: [] };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        // console.log(response.data.farmer[0].review);
        let copy = { ...this.state };
        copy.reviews = response.data.farmer[0].review;
        this.setState(copy);
      });
  }
  render() {
    return (
      <div>
        <h1 className="title">Reviews</h1>
        {this.state.reviews.map((rev) => {
          return (
            <div key={rev._id}>
              {rev.rating == 3 ? (
                <p>⭐⭐⭐</p>
              ) : rev.rating == 2 ? (
                <p>⭐⭐</p>
              ) : (
                <p>⭐</p>
              )}
              <Review title={rev.title} description={rev.description} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Reviews;
