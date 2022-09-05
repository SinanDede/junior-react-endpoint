import React, { Component } from 'react';
import "./CartAttribute.css";

class CartAttribute extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attributeName: "attribute-name",
            attributeColor: "attribute-color",
            attributeColorActive: "attribute-color-active",
            attributeValue: "attribute-value",
            attributeValueActive: "attribute-value-active",
            activeValueBtn: undefined
        }

        this.getValue = this.getValue.bind(this);
    }

    getValue(item, idx) {
        this.setState({activeValueBtn: item});
    }

    render() {
        return (
            <div>
                <p className={this.state.attributeName}>{this.props.attributeName}:</p>
                {this.props.attributeValue.map((item, index) => {
                    if(this.props.attributeType === "swatch") {
                        var itemcolor = item.value;
                        return (<button key={itemcolor} className={this.state.activeValueBtn === item? this.state.attributeColorActive : this.state.attributeColor} style={{background: itemcolor}} onClick={() => this.getValue(item, index)}></button>);
                    } 
                    else if (this.props.attributeName === "Size") {
                        return (<button key={item.value} className={this.state.activeValueBtn === item? this.state.attributeValueActive : this.state.attributeValue} onClick={() => this.getValue(item, index)}>{item.value}</button>);
                    }
                    else {
                        return (<button key={index} className={this.state.activeValueBtn === item? this.state.attributeValueActive : this.state.attributeValue} onClick={() => this.getValue(item, index)}>{item.displayValue}</button>);
                    }
                })}
            </div>
        );
    }
}

export default CartAttribute;