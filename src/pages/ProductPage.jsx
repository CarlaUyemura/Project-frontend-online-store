import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  fetchProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  }

  handleCartButton = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    const { product: { id, title, thumbnail, price, warranty } } = this.state;
    const { onClickAddProductToCartFromDetail, quantity, onInputChange } = this.props;
    return (
      <div>
        <p>Product Page</p>
        <Link to="/">Voltar</Link>
        <p data-testid="product-detail-name">{title}</p>
        <p>{`R$ ${price}`}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{warranty}</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          id={ id }
          onClick={ onClickAddProductToCartFromDetail }
        >
          Adicionar ao carrinho
        </button>
        <input
          type="number"
          min={ 1 }
          placeholder="Quantidade desejada de itens"
          name="quantity"
          value={ quantity }
          onChange={ onInputChange }
        />
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleCartButton }
        >
          Ver carrinho de compras
        </button>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onClickAddProductToCartFromDetail: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProductPage;
