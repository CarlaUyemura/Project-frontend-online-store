/* Victor */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

class Cart extends Component {
  render() {
    const { cartProducts } = this.props;
    const noProductsMessage = (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
    return (
      <div>
        <Link to="/">Menu principal</Link>
        <br />
        { cartProducts.length > 0
          ? cartProducts.map(({ id, price, title, thumbnail, quantity }) => (
            <CartProductCard
              key={ id }
              quantity={ quantity }
              price={ price }
              thumbnail={ thumbnail }
              title={ title }
            />
          ))
          : noProductsMessage }
      </div>
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.func.isRequired,
      map: PropTypes.func.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Cart;
