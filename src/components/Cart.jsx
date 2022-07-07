/* Victor */

import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      selectedItems: [],
    };
  }

  getItems

  render() {
    const { selectedItems } = this.state;
    const emptyCartMessage = (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>);
    return (
      <div>
        { selectedItems.length > 0
          ? cartItems.map((item) => item.something) // it'll show all the items according to the requisite 1 API
          : emptyCartMessage }
      </div>
    );
  }
}

export default Cart;
