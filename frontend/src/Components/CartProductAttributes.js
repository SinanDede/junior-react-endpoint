import React, { Component } from 'react';
import CartAttribute from './CartAttribute';


class CartProductAttributes extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        var viewAttributes = [];

        if(this.props.attributes) {
            for(let i=0; i<this.props.attributes.length; i++) {
                viewAttributes.push(<CartAttribute key={i} attributeName={this.props.attributes[i].name} attributeType={this.props.attributes[i].type} attributeValue={this.props.attributes[i].items}/>);
            }
        }

        return (
            <div>
                {viewAttributes}
            </div>
        );
    }
}

export default CartProductAttributes;