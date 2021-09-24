import axios from 'axios';
import React, { Component } from 'react';
import auth from '../auth';

export default class Review extends Component {
    state = { showButton: false, title:"", description:"",rating:2 }

    showReview=()=>{
        this.props.history.push(
            "/customers/profile/" + this.props.match.params.id + "/edit"
          );
    }

    showReview=()=>{
        const email=localStorage.getItem("email")
        let see = false
        axios.get("/customers/email/"+email,auth())
        .then((res)=>{
            res.data.result[0].order.map((orde)=>{
                if(orde.f_id===this.props.farmerId){
                    see = true;
                }
            })
            if(see){
                this.setState({showButton:!this.state.showButton})
            }else{
                alert("You cant Give Review to this customer Since You don't have any order with Them")
            }
        })
    }

    onChange=(e)=>{
        this.setState(()=>{
            return {[e.target.name]:e.target.value}
        })
    }

    onClick=(rating,title,desc)=>{
        const obj = {rating:rating,title:title,description:desc}
        if(parseInt(rating)===2){
           axios.put()
        }else if(parseInt(rating)===1){
            axios.put()
        }else if(parseInt(rating)===3){
            axios.put()
        }
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
                    onClick={()=>this.showReview()}/><br/><br/>

                    {this.state.showButton && <div>
                        Rating: <input 
                        type="star"
                        name="rating"
                        defaultValue="2"
                        onChange={(e)=>this.onChange(e)}/>
                        Title: <input 
                        type="text"
                        name="title"
                        defaultValue=""
                        onChange={(e)=>this.onChange(e)}/>
                        Description: <input 
                        type="text"
                        name="description"
                        defaultValue=""
                        onChange={(e)=>this.onChange(e)}/>
                        <input 
                        type="button"
                        name="description"
                        value="Add"
                        onClick={()=>this.onClick(this.state.rating,this.state.title, this.state.description)}/>
                        </div>}
            </div>
        )
    }
}
