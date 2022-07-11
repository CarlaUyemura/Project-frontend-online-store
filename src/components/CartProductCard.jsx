import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProductCard extends Component {
  render() {
    const { title, price, quantity, thumbnail } = this.props;
    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <h4>
          {`R$ ${price}`}
        </h4>
        <h5 data-testid="shopping-cart-product-quantity">
          {`Quantidade de itens no carrinho: ${quantity}`}
        </h5>
      </div>
    );
  }
}

CartProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default CartProductCard;
