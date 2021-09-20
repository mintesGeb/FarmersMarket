import React, { Component } from 'react';
import axios from "axios";
import auth from '../auth';

export default class ProductDetail extends Component {

    state={farmer:[], display:false }



    componentDidMount() {
        axios.get("/farmers/"+this.props.match.params.id, auth()).then((response) => {
            let copy = { ...this.state };
            copy.farmer = response.data.farmer;
           copy.display=true;
            this.setState(copy);
          });
    }
    
    render() {
        console.log(this.state.farmer)
        return (
            <div>
                {this.state.display && this.state.farmer[0].products.map((prod) => {
        return (
        <div>
          Product:<p>{prod.productName}</p>
          Price: <p>{prod.price}</p>
          Available amount: <p>{prod.numberOfProducts}</p><br/>
        </div>)
      })}
            </div>
        )
    }
}
