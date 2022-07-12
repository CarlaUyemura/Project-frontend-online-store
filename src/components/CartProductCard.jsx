import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProductCard extends Component {
  constructor() {
    super();
    this.state = {
      result: 1,
    };
  }

  componentDidMount() {
    this.capturaQuantity();
  }

  capturaQuantity = () => {
    const { quantity } = this.props;
    if (quantity) {
      this.setState({
        result: quantity,
      });
    } else {
      this.setState({
        result: 1,
      });
    }
  }

  increaseQuantity = () => {
    this.setState((prevQuantity) => ({
      result: prevQuantity.result + 1,
    }));
  }

  decreaseQuantity = () => {
    this.setState((prevQuantity) => ({
      result: prevQuantity.result === 1 ? 1 : prevQuantity.result - 1,
    }));
  }

  render() {
    const {
      title,
      price,
      thumbnail,
    } = this.props;

    const { result } = this.state;

    return (
      <div>
        <div className="CartProductCardClass">
          <img src={ thumbnail } alt={ title } />
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <h4>
            {`R$ ${price}`}
          </h4>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ this.decreaseQuantity }
          >
            -
          </button>
          <h5 data-testid="shopping-cart-product-quantity" className="quantity">
            {result}
          </h5>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ this.increaseQuantity }
          >
            +

          </button>
        </div>
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
