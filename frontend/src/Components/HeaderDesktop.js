import { React, Component } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import "./HeaderDesktop.css";

const link = from([
    new HttpLink({
        uri: 'http://localhost:4000/graphql',
    })
]);


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

class HeaderDesktop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnActive: undefined,
            activeBtn: "active-btn",
            normalBtn: "normal-btn",
            miniCartShow: "mini-cart-show",
            miniCartHide: "mini-cart-hide",
            cartDisplay: false,
            cartItems: [],
            currencies: [],
            categories: []
        }

        this.updatebtn = this.updatebtn.bind(this);
        this.selectCurrency = this.selectCurrency.bind(this);
        this.showHideList = this.showHideList.bind(this);
    }

    componentDidMount() {
        client
            .query({
                query: gql`
        {
            currencies{
                label
                symbol
              }
        }

    `
            }).then((result) => {
                if (result) {
                    this.setState({ currencies: result.data.currencies });
                }
            });

        client
            .query({
                query: gql`
        {
            categories{
                name
            }
        }

    `
            }).then((result) => {
                if (result) {
                    this.setState({ categories: result.data.categories }, () => {
                        if (this.state.categories[0]) {
                            const activeButton = this.state.categories[0];
                            this.setState({ btnActive: activeButton });
                            if (this.state.btnActive) {
                                const activeButtonName = this.state.btnActive.name;
                                this.props.setCategoryName(activeButtonName);
                            }
                        }
                    });
                }
            });
    }

    updatebtn(c) {
        this.setState({ btnActive: c });
        this.props.setCategoryName(c.name);
    }

    selectCurrency = (event) => {
        var currencysymbol = event.target.value;
        this.props.setCurrency(currencysymbol);
    }

    showHideList() {
        this.setState(prev => ({ cartDisplay: !prev.cartDisplay }));
    }

    render() {

        var quantity;
        var miniCartProductList = [];

        if (this.props.cartPorductDetails && this.props.cartProductPrice && this.props.productcurrency) {
            miniCartProductList.push((this.props.cartPorductDetails,this.props.cartProductPrice, this.props.productcurrency));
            console.log(this.props.cartPorductDetails);
        }

        return (
            <div className="Header-Desktop">
                <Link to={"cart"}>
                   <button className="a-logo"></button>
                </Link>
                <div className="Navigation">
                    <div className="header_navigation">
                        <Link to={"/"}>
                            {this.state.categories.map((category) => {
                                return (<button key={category.name} className={this.state.btnActive === category ? this.state.activeBtn : this.state.normalBtn} onClick={() => this.updatebtn(category)}>{category.name}</button>);
                            })}
                        </Link>
                    </div>
                </div>
                <div className="Actions">
                    <div className="mini-cartdiv">
                        <button className="cart-btn" onClick={this.showHideList}></button>
                    </div>
                    <div className={this.state.cartDisplay ? this.state.miniCartShow : this.state.miniCartHide}>
                        <p className="item-count-text">My Bag <span>{quantity}</span> items</p>
                        <MiniCart />
                    </div>
                    <select onChange={this.selectCurrency} className="currency-selection">
                        {this.state.currencies.map((currency) => {
                            return <option className='select-option' key={currency.symbol} value={currency.label}>{currency.symbol}{currency.label}</option>
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

export default HeaderDesktop;