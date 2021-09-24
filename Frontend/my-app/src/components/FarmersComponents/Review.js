import axios from 'axios';
import React, { Component } from 'react';
import auth from '../auth';

export default class Review extends Component {
    state = { title:"", description:"",rating:2 }

    showReview=()=>{
        this.props.history.push(
            "/customers/profile/" + this.props.match.params.id + "/edit"
          );
    }

    

    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
            </div>
        )
    }
}
