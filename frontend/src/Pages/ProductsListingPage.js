import React, { Component } from 'react';
import "./ProductsListingPage.css";
import { Link } from 'react-router-dom';

class Allproductslist extends Component {
    constructor(props){
        super(props)
        this.state={
            productTitle: "product-title",
            productCartContainer: "cart-container",
            productCart: "product-cart",
            productGallery: "product-galery",
            productCartAvailable: "product-cart-available",
            cartImageAvailable: "cart-image-available",
            addToCartBtnAvailable: "add-to-cart-btn-available",
            stockText: "OUT OF STOCK",
            stockTextAvailable: "stock-text-available",
            productNameAvailable: "product-name-available",
            productPriceAvailable: "product-price-available",
            productCartNotAvailable: "product-cart-not-available",
            cartImageNotAvailable: "cart-image-not-available",
            addToCartBtnNotAvailable: "add-to-cart-btn-not-available",
            stockTextNotAvailable: "stock-text-not-available",
            productNameNotAvailable: "product-name-not-available",
            productPriceNotAvailable: "product-price-not-available",
        }
        
        this.viewDetails = this.viewDetails.bind(this);
    }

    viewDetails(product){
        var p = product;
        this.props.setProductDetails(p);
    }

    render() {
        if(this.props.products) {
            var productslist = this.props.products;
            var productslistname = this.props.categoryname;
        }
        
        return( 
            <div>
                <div className={this.state.productTitle}>
                    <h2>{productslistname}</h2>
                </div>
                <div className={this.state.productCartContainer}>
                    {productslist.map((product) => {
                        return (<div key={product.id} className={product.inStock? this.state.productCartAvailable : this.state.productCartNotAvailable}>
                                    <div className={this.state.productGallery}>
                                        <img className={product.inStock? this.state.cartImageAvailable : this.state.cartImageNotAvailable} src={product.gallery[0]}></img>
                                        <Link to={"/productdetails"}>
                                            <div className={product.inStock? this.state.addToCartBtnAvailable : this.state.addToCartBtnNotAvailable} onClick={() => {this.viewDetails(product)}} ></div>
                                        </Link>
                                        <p className={product.inStock? this.state.stockTextAvailable : this.state.stockTextNotAvailable}>{this.state.stockText}</p>
                                    </div>
                                    <div className={product.inStock? this.state.productNameAvailable : this.state.productNameNotAvailable}>{product.brand} {product.name}</div>
                                    <div className={product.inStock? this.state.productPriceAvailable : this.state.productPriceNotAvailable}>
                                        {product.prices.filter(price => price.currency.label === this.props.productcurrency)
                                            .map((price, i) => {
                                                return (<p key={i}>{price.currency.symbol}{price.amount}</p>)
                                            })
                                        }
                                    </div>
                            </div>)
                        })}
                </div>
            </div>
        );
    }
}


export default Allproductslist;