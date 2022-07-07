import React from 'react';

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
      </div>
    );
  }
}

export default Search;
