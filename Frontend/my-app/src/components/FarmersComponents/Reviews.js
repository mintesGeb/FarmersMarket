import axios from "axios";
import React from "react";
import auth from "../auth";
import Review from "./Review";

class Reviews extends React.Component {
  state = { showButton: false, reviews: [], farmer: {} };
  componentDidMount() {
    axios
      .get("/farmers/" + this.props.match.params.id, auth())
      .then((response) => {
        // console.log(response.data.farmer[0].review);
        let copy = { ...this.state };
        copy.farmer = { ...response.data.farmer[0] }
        copy.reviews = response.data.farmer[0].review;
        console.log(copy)
        this.setState(copy);
      });
  }

  showReview = () => {
    const email = localStorage.getItem("email")
    let see = false
    axios.get("/customers/email/" + email, auth())
      .then((res) => {
        res.data.result[0].order.map((orde) => {
          if (orde.f_id === this.state.farmer._id) {
            see = true;
          }
        })
        if (see) {
          this.setState({ showButton: true })
        } else {
          alert("You cant give review to this farmer, Since You don't have any order with them")
        }
      })
  }


  onChange = (e) => {
    this.setState(() => {
      return { [e.target.name]: e.target.value }
    })
  }


  onClick = (rating, title, desc) => {
    const obj = { rating: rating, title: title, description: desc }
    const copy ={...this.state.farmer}
    copy.review.push(obj)
    this.setState(()=>{
        return {farmer:copy}
      })
    axios.put("/farmers/add-review/" + this.state.farmer._id, obj, auth())
      .then((res) => {
        console.log(res.data[0])
        this.setState(()=>{
          return {farmer:{...res.data[0]}}
        })
      })
    if (parseInt(rating) === 1) {
      axios.put("/farmers/deduct-reputation/"+ this.state.farmer._id,null,auth())
      .then((res)=>{
        this.setState(()=>{
          return {farmer:{...res.data[0]}}
        })
      })
    } else if (parseInt(rating) === 3) {
      axios.put("/farmers/add-reputation/"+ this.state.farmer._id,null,auth())
      .then((res)=>{
        this.setState(()=>{
          return {farmer:{...res.data[0]}}
        })
      })
    }
    this.setState({ showButton: false })
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
        {localStorage.getItem("role")==="customer" && <div> <input
          type="button"
          name="show"
          value="Add Review"
          onClick={() => this.showReview()} /><br /><br /></div> }
        {this.state.showButton && <div>
          <h2 className="title">Add Review</h2>
          <div>
            Rating: <input
              type="radio"
              id="3"
              name="rating"
              value="3"
              onChange={(e) => this.onChange(e)}
            />
            <label htmlFor="3">⭐⭐⭐</label>
            <input
              type="radio"
              id="2"
              name="rating"
              value="2"
              onChange={(e) => this.onChange(e)}
            />
            <label htmlFor="2">⭐⭐</label>
            <input
              type="radio"
              id="1"
              name="rating"
              value="1"
              onChange={(e) => this.onChange(e)}
            />
            <label htmlFor="1">⭐</label>
          </div>
          Title: <input
            type="text"
            name="title"
            defaultValue=""
            onChange={(e) => this.onChange(e)} />
          Description: <input
            type="text"
            name="description"
            defaultValue=""
            onChange={(e) => this.onChange(e)} />
          <input
            type="button"
            name="description"
            value="Add"
            onClick={() => this.onClick(this.state.rating, this.state.title, this.state.description)} />
        </div>}
      </div>
    );
  }
}

export default Reviews;
