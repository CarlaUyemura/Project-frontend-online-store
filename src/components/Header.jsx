import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">Menu principal</Link>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          Carrinho de compras
        </Link>
      </div>
    );
  }
}

export default Header;
