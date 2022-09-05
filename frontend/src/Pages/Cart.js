import React, { Component } from 'react'
import CartProductAttributes from '../Components/CartProductAttributes';
import "./Cart.css";

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartTextClass: "cart-text",
      productContainer: "product-container",
      itemContainer: "item-container",
      cartAttributesContainer: "cart-attributes-container",
      quantityBtnsContainer: "quantity-btns-container",
      increaseBtn: "increase-btn",
      quantityText: "quantity-text",
      decreaseBtn: "decrease-btn",
      quantityText: "quantity-text",
      calcContainer: "calc-container",
      itemQuantity: 0,
      tax: "",
      quantity: "",
      total: "",
      orderBtnText: "order",
      cartItems: [],
      leftArrow: "<",
      rightArrow: ">",
      selectedImageIdx: 0
    }
    this.increaseIdx = this.increaseIdx.bind(this);
    this.deacreaseIdx = this.decreaseIdx.bind(this);
  }

  componentDidMount() {
    if(this.props.cartItems) {
      this.setState({cartItems: this.props.cartItems});
    }
  }

  increaseIdx(e) {
    this.setState(e => {
      return {selectedImageIdx: e.selectedImageIdx + 1};
    });
  }

  decreaseIdx(e) {
    this.setState(e => {
      return {selectedImageIdx: e.selectedImageIdx - 1};
    });
  }

  render(){
    
    return (
      <div>
        <div className={this.state.cartTextClass}>cart</div>
        <div className={this.state.productContainer}>
          {this.state.cartItems ? this.state.cartItems.map((item, i) => {
            return  (<div key={item.id} className={this.state.itemContainer}>
                  <div className={this.state.cartAttributesContainer}>
                    <div className='brand'>{item.brand}</div>
                    <div className='name'>{item.name}</div>
                    <div className='price'>{this.props.productcurrency}</div>
                    <CartProductAttributes attributes={item.attributes.length? item.attributes : ""}/>
                  </div>
                <div className='quantityImageContainer'>
                  <div className={this.state.quantityBtnsContainer}>
                    <button className={this.state.increaseBtn}>+</button>
                    <span className={this.state.quantityText}>{this.state.itemQuantity}</span>
                    <button className={this.state.decreaseBtn}>-</button>
                  </div>
                  <div className='image-container'>
                    <img className='selectedImage' src={item.gallery[this.state.selectedImageIdx]}/>
                    <div className='arrowBtnsContainer' key={i}>
                      <button className='leftArrow' onClick={(e) => this.decreaseIdx(e)}>{this.state.leftArrow}</button><button className='rightArrow' onClick={(e) => this.increaseIdx(e)}>{this.state.rightArrow}</button>
                    </div>
                  </div>
                </div>
              </div>);
          }):""}
        </div>
        <div className={this.state.calcContainer}>
          <div className='calc-txts'>
            <p>Tax 21%:</p>{this.state.tax}<p>Quantity:</p>{this.state.quantity}<p>Total:</p>{this.state.total}
          </div>
          <button className='order-btn'>{this.state.orderBtnText}</button>
        </div>
      </div>
    )
  }
}
export default Cart;