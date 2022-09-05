import React, { Component } from 'react';
import Attribute from './Attribute';

class ProductAttributes extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        var viewAttributes = [];

        if(this.props.attributes) {
            for(let i=0; i<this.props.attributes.length; i++) {
                viewAttributes.push(<Attribute key={i} attributeName={this.props.attributes[i].name} attributeType={this.props.attributes[i].type} attributeValue={this.props.attributes[i].items}/>);
            }
        }

        return (
            <div>
                {viewAttributes}
            </div>
        );
    }
}

export default ProductAttributes;