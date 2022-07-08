import React from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api'

class ProductPage extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
  }

  componentDidMount() {
    this.fetchProductInfo()
  }

  fetchProductInfo = async () => {
    const { match: { params: { id }} } = this.props
    const response = await getProductById(id)
    this.setState({
      product: response
    })
  }

  render() {
    const { product: {title, thumbnail, price, warranty } } = this.state
    return (
      <div>
        <p>Product Page</p>
        <Link to="/">Voltar</Link>
        <p data-testid="product-detail-name">{title}</p>
        <p>{`R$ ${price}`}</p>
        <img src={thumbnail} />
        <p>{warranty}</p>
      </div>
    );
  }
}

export default ProductPage;
