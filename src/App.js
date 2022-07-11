import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import { getProductById } from './services/api';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productsAddedToCart: [],
    };
  }

  onClickAddProductToCartFromDetail = async ({ target: { id } }) => {
    const addedProduct = await getProductById(id);

    this.setState((prevState) => ({
      productsAddedToCart: [...prevState.productsAddedToCart, addedProduct],
    }));
    console.log(id);
  }

  render() {
    const { productsAddedToCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              cartProducts={ productsAddedToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
