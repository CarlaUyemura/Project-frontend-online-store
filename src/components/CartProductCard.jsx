import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProductCard extends Component {
  render() {
    const { title, price, quantity } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <h4>
          Somente R$
          {price}
          !
        </h4>
        <h5 data-testid="shopping-cart-product-quantity">{quantity}</h5>
      </div>
    );
  }
}

CartProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProductCard;
