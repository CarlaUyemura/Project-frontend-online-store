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
      quantity: 1,
    };
  }

  componentDidUpdate() {
    this.turnNaNIntoZero();
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({ [name]: parseInt(value, 10) });
  }

  turnNaNIntoZero = () => {
    const { quantity } = this.state;
    if (Number.isNaN(quantity)) { this.setState({ quantity: 1 }); }
  }

  onClickAddProductToCartFromDetail = async ({ target: { id } }) => {
    const addedProduct = await getProductById(id);
    const { quantity } = this.state;
    addedProduct.quantity = quantity;

    this.setState((prevState) => ({
      productsAddedToCart: [...prevState.productsAddedToCart, addedProduct],
    }));
  }

  render() {
    const { quantity, productsAddedToCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Search
              { ...props }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
            />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
              quantity={ quantity }
              onInputChange={ this.onInputChange }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              cartProducts={ productsAddedToCart }
              itemsQuantity={ quantity }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
