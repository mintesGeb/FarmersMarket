import React, { Component } from 'react'

export default class Review extends Component {
    state = { showButton: false }

    showReview=()=>{

    }


    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
                <input
                    type="button"
                    name="show"
                    value="Add Review"
                    onClick={()=>this.showReview()}/>
                    
            </div>
        )
    }
}
