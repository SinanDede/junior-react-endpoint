import React, { Component } from 'react';
import "./ProductDetailsPage.css";
import ProductAttributes from '../Components/ProductAttributes';

class ProductDetailsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productDetailsContainer: "product-details-container",
            attributesContainer: "attributes-container",
            thumbnailsContainer: "thumbnails-container",
            selectedImageContainer: "selected-image-container",
            thumnailStyle: "thumbnail-style",
            currentImage: "current-Image",
            selectedImage: 0,
            productBrand: "product-brand",
            productName: "product-name",
            productPriceName: "product-price-name",
            productPrice: "product-price",
            addToCartBtn: "add-to-cart-btn",
            addToCartBtnText: "add to cart",
            productDescription: "product-description",
        }

        this.changeImage = this.changeImage.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    changeImage(i) {
        this.setState({selectedImage: i});
    }

    // addToCart(pbrand, pname, psymbol, pamount) {
    //     this.props.sendToCart(pbrand, pname, psymbol, pamount);
    // }

    addToCart(product) {
        this.props.onAdd(product);
    }

    render() {
        
        if (this.props.productDetails) {
            var productDetails = this.props.productDetails;
            var productprice = productDetails.prices.filter(price => price.currency.label === this.props.productcurrency);
        }

        const regex = /(<([^>]+)>)/ig;

        return (
            <div>
                <div className={this.state.thumbnailsContainer}>
                    {productDetails.gallery.map((thumbnail, i) => {
                        return (<img key={i} className={this.state.thumnailStyle} src={thumbnail} onClick={() => this.changeImage(i)}></img>)
                    })}
                </div>
                <div className={this.state.selectedImageContainer}>
                    <img className={this.state.currentImage} src={productDetails.gallery[this.state.selectedImage]}></img>
                </div>
                <div className={this.state.attributesContainer}>
                    <p className={this.state.productBrand}>{productDetails.brand}</p>
                    <p className={this.state.productName}>{productDetails.name}</p>
                    <ProductAttributes attributes={productDetails.attributes.length? productDetails.attributes : ""}/>
                    <p className={this.state.productPriceName}>{productprice[0].__typename}:</p>
                    <p className={this.state.productPrice}>{productprice[0].currency.symbol}{productprice[0].amount}</p>
                    <button className={this.state.addToCartBtn} onClick={() => this.addToCart(productDetails)}>{this.state.addToCartBtnText}</button>
                    <div className={this.state.productDescription}><p>{productDetails.description.replace(regex, "")}</p></div>
                </div>
            </div>
        );
    }
}

export default ProductDetailsPage;