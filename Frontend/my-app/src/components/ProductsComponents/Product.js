import React, { Component } from 'react';


export default class Product extends Component {
    render() {
        const {_id,productName,price} = {...this.props.product};
        return (
            <div>
                product Name:<p>{productName}</p>
                Price: <p>{price}</p>
            </div>
        )
    }
}
