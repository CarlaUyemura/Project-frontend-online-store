/* Victor */

import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartProducts: [],
    };
  }

  noProductsMessage = () => {
    const { cartProducts } = this.state;

    if (cartProducts.length === 0) {
      return (
        <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
      );
    }
  }

  render() {
    return (
      <div>
        { this.noProductsMessage() }
      </div>
    );
  }
}

export default Cart;
