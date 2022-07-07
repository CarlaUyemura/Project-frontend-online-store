import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCartButton = () => {
    const { history } = this.props;
    history.push('/cart');
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <input
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
        />
        { search.length === 0 && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) }

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

Search.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Search;
