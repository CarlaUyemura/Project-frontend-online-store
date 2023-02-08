import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ProductPage from './pages/ProductPage';
import Cart from './components/Cart';
import { getProductsFromCategoryAndQuery, getProductsQuery } from './services/api';
import Checkout from './components/Checkout';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      productsAddedToCart: [],
      quantity: 1,
      products: [],
      setSearch: false,
      inputFullName: '',
      inputCEP: 0,
      inputCPF: 0,
      inputEmail: '',
      inputEndereco: '',
      inputPhone: 0,
    };
  }

  componentDidUpdate() {
    this.turnNaNIntoZero();
  }

  onRadioChange = async ({ target }) => {
    const objResponse = await getProductsFromCategoryAndQuery(target.id, target.value);
    this.setState({
      products: objResponse.results,
    });
  }

  onHandleClick = async () => {
    const { table } = this.state;
    const data = await getProductsQuery(table);
    const resultData = data.results;
    console.log(resultData);
    this.setState({ products: resultData, setSearch: true });
  }

  onInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({ [name]: parseInt(value, 10) });
  }

  onInputChangeForm = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  turnNaNIntoZero = () => {
    const { quantity } = this.state;
    if (Number.isNaN(quantity)) { this.setState({ quantity: 1 }); }
  }

  onClickAddProductToCartFromDetail = async ({ target: { id } }) => {
    const { quantity, productsAddedToCart, products } = this.state;
    const teste = productsAddedToCart.some((item) => item.id === id);
    const addedProduct = products.find((item) => id === item.id);
    addedProduct.quantity = quantity;
    if (!teste) {
      this.setState((prevState) => ({
        productsAddedToCart: [...prevState.productsAddedToCart, addedProduct],
      }));
    }
  }

  render() {
    const {
      quantity,
      productsAddedToCart,
      inputFullName,
      inputCEP,
      inputCPF,
      inputEmail,
      inputEndereco,
      inputPhone, products, setSearch } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Search
              { ...props }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
              products={ products }
              onHandleClick={ this.onHandleClick }
              onInputChange={ this.onInputChange }
              onRadioChange={ this.onRadioChange }
              setSearch={ setSearch }
            />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductPage
              { ...props }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
              quantity={ quantity }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              cartProducts={ productsAddedToCart }
              itemsQuantity={ quantity }
              decreaseQuantity={ this.decreaseQuantity }
              increaseQuantity={ this.increaseQuantity }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              onInputChangeForm={ this.onInputChangeForm }
              inputFullName={ inputFullName }
              inputCEP={ inputCEP }
              inputCPF={ inputCPF }
              inputEmail={ inputEmail }
              inputPhone={ inputPhone }
              inputEndereco={ inputEndereco }
              onClickAddProductToCartFromDetail={ this.onClickAddProductToCartFromDetail }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
