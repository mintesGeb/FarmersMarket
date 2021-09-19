import React, { Component } from 'react';
import axios from 'axios';
import auth from '../auth';
import Farmer from './Farmer';

export default class FarmProducts extends Component {

    state = {
        products: []
    }


    componentDidMount() {
        axios.get('http://localhost:1234/products', auth())
            .then((res) => {
                this.setState({ products: [...res.data.products] })
            })
    }



    render() {
        return (
            <div>
                {/* {this.state.products.map((item)=>{
               return <Farmer key={item._id} product={item}/> */}
            {/* })} */}
            </div>
        )
    }
}
