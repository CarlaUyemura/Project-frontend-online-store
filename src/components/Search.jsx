import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      setSearch: false,
      table: '',
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ table: value });
  }

  onHandleClick = async () => {
    const { table } = this.state;
    const data = await getProductsFromCategoryAndQuery(table);
    this.setState({ products: data, setSearch: true });
  }

   handleCartButton = () => {
     const { history } = this.props;
     history.push('/cart');
   }

   render() {
     const { products, table, setSearch } = this.state;
     const flagResult = setSearch
       ? <div>Nenhum produto foi encontrado</div>
       : (
         <div
           data-testid="home-initial-message"
         >
           Digite algum termo de pesquisa ou escolha uma categoria.
         </div>);
     return (
       <div>
         <input
           type="text"
           data-testid="query-input"
           onChange={ this.onInputChange }
           value={ table }
         />
         <button
           type="button"
           data-testid="query-button"
           onClick={ this.onHandleClick }
         >
           Search
         </button>
         {products.length === 0
           ? (flagResult)
           : (
             <div>
               {products.map(({ id, title, price, thumbnail }) => (
                 <ProductCard
                   key={ id }
                   title={ title }
                   price={ price }
                   thumbnail={ thumbnail }
                 />))}
             </div>
           )}
       </div>
     );
   }
}

export default Search;

Search.propTypes = {
  history: PropTypes.string.isRequired,
};
