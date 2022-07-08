/* Victor */

import React, { Component } from 'react';
import CartProductCard from './CartProductCard';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartProducts: [],
    };
  }

  render() {
    const { cartProducts } = this.state;
    const noProductsMessage = (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
    return (
      <div>
        { cartProducts.length > 0
          ? cartProducts.map((product/* , { id, title, price } */) => (
            <CartProductCard
              key={ product.id }
              title={ product.title }
              price={ product.price }
              quantity={ product.sold_quantity }
            />
          ))
          : noProductsMessage }
      </div>
    );
  }
}

export default Cart;
