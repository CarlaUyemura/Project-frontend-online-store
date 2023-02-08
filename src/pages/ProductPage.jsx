import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Header from '../components/Header';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      ship: false,
      email: '',
      rating: '',
      message: '',
      evaluations: [],
    };
  }

  componentDidMount() {
    this.fetchProductInfo();
    this.getEvaluations();
  }

  fetchProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      product: response,
      ship: response.shipping.free_shipping,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  saveEvaluation = () => {
    const { email, rating, message } = this.state;
    const newEvaluation = { email, rating, message };
    // const evaluationTotal = JSON.parse(localStorage.getItem('evaluation'))
    // const finalData = [...evaluationTotal, newEvaluation]
    localStorage.setItem('evaluation', JSON.stringify(newEvaluation));
    this.setState({
      evaluations: [newEvaluation],
      email: '',
      rating: '',
      message: '',
    });
  }

  getEvaluations = () => {
    const evaluationList = JSON.parse(localStorage.getItem('evaluation'));
    if (evaluationList !== null) {
      this.setState((prevState) => ({
        evaluations: [...prevState.evaluations, evaluationList],
      }));
    }
  }

  render() {
    const { product: { id, title, thumbnail, price, warranty },
      ship,
      email,
      message,
      evaluations } = this.state;
    const { onClickAddProductToCartFromDetail, quantity, onInputChange } = this.props;
    const num3 = 3;
    const num4 = 4;
    const num5 = 5;
    const rating = [1, 2, num3, num4, num5];
    return (
      <div>
        <Header />
        <p>Product Page</p>
        <Link
          className="Button"
          to="/"
        >
          Voltar
        </Link>
        <p data-testid="product-detail-name">{title}</p>
        <p>{`R$ ${price}`}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{warranty}</p>
        {ship ? <p data-testid="free-shipping">Frete Grátis</p> : ''}
        <button
          className="Button"
          data-testid="product-detail-add-to-cart"
          type="button"
          id={ id }
          onClick={ onClickAddProductToCartFromDetail }
        >
          Adicionar ao carrinho
        </button>
        <input
          className="Input"
          type="number"
          min={ 1 }
          placeholder="Quantidade desejada de itens"
          name="quantity"
          value={ quantity }
          onChange={ onInputChange }
        />

        <h3>Avaliações</h3>

        <input
          data-testid="product-detail-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        { rating.map((element) => (
          <label htmlFor={ element } key={ element }>
            Nota:
            {' '}
            {element}
            <input
              data-testid={ `${element}-rating` }
              type="radio"
              id={ element }
              name="rating"
              value={ element }
              onChange={ this.handleChange }
            />
          </label>
        ))}
        <br />
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
          cols="80"
          rows="8"
          name="message"
          value={ message }
          onChange={ this.handleChange }
        />
        <br />
        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ this.saveEvaluation }
        >
          Avaliar
        </button>

        { evaluations ? evaluations.map((evaluation) => (
          <div key={ evaluation.email }>
            <p>{evaluation.email}</p>
            <p>{evaluation.rating}</p>
            <p>{evaluation.message}</p>
          </div>
        )) : <p>Não há comentarios</p>}

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
