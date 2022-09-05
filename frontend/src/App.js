import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from, gql} from "@apollo/client";
import HeaderDesktop from './Components/HeaderDesktop';
import ProductsListingPage from "./Pages/ProductsListingPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Cart from "./Pages/Cart";


const link = from([
  new HttpLink({
      uri: 'http://localhost:4000/graphql',
  })
]);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
        data: undefined,
        categoryTitle: "all",
        currency: "USD",
        productDetails: undefined,
        selectedProductDetails: undefined,
        cartProductDetails: undefined,
        cartProductBrand: undefined,
        cartProductName: undefined,
        cartProductSymbol: undefined,
        cartProductAmount: undefined,
        cartItems: []
    }
    
    this.setCategoryName = this.setCategoryName.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.setProductDetails = this.setProductDetails.bind(this);
    this.sendToCart = this.sendToCart.bind(this);
    this.onAdd = this.onAdd.bind(this);
}

componentDidMount() {
  client
  .query({ query: gql`
    {
  	categories{
      name
      products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
    }   
  }

  `
}).then((result) => {
      if(result) {
          this.setState({data: result.data.categories});
      }
  });
}

setCategoryName(n) {
  this.setState({categoryTitle: n});
}

setCurrency(c) {
  this.setState({currency: c});
}

setProductDetails(p) {
  this.setState({productDetails: p});
}

sendToCart(pbrand, pname, psymbol, pamount) {
  this.setState({cartProductBrand: pbrand});
  this.setState({cartProductName: pname});
  this.setState({cartProductSymbol: psymbol});
  this.setState({cartProductAmount: pamount});
}

onAdd(product) {
  const exist = this.state.cartItems.find(x => x.id === product.id);
  if(exist) {
    this.state.cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1} : x);
  } else {
    //[...this.state.cartItems, {...product, qty: 1}];
    this.state.cartItems.push(product);
  }
}

  render() {
  
    var selectedproductlist = [];
    var categoryname = this.state.categoryTitle;
    var productcurrency = this.state.currency;
    
    if(this.state.data && this.state.categoryTitle) {
      var selectedproductname = this.state.data.find(data => data["name"] === this.state.categoryTitle);
      for(let i=0; i<selectedproductname.products.length; i++) {
        selectedproductlist.push(selectedproductname.products[i]);
      }
    }

    return (
      <Router>
        <ApolloProvider client={client}>
          <HeaderDesktop setCategoryName={this.setCategoryName} setCurrency={this.setCurrency} cartProductDetails={this.state.cartProductDetails} cartProductPrice={this.state.cartProductPrice} productcurrency={productcurrency}/>
          <Routes>
            <Route exact path='/' element={<ProductsListingPage categoryname={categoryname} productcurrency={productcurrency} products={selectedproductlist} setProductDetails={this.setProductDetails}/>}/>
            <Route path='productdetails' element={<ProductDetailsPage productDetails={this.state.productDetails} productcurrency={productcurrency} sendToCart={this.sendToCart} onAdd={this.onAdd}/>}/>
            <Route path='cart' element={<Cart productcurrency={productcurrency} cartItems={this.state.cartItems}/>}/>
          </Routes>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App;
