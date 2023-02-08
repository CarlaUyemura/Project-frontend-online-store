import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductCard extends Component {
  render() {
    const { title, price, thumbnail, shipping } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{title}</h3>
        <h4>{price}</h4>
        {shipping ? <h5 data-testid="free-shipping">Frete Grátis</h5> : ''}
      </div>
    );
  }
}

ProductCard.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shipping: PropTypes.bool.isRequired,
};
