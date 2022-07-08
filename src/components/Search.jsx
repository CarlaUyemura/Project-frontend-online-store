import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import CategoryCard from './CategoryCard';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      setSearch: false,
      table: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoryNames();
  }

  getCategoryNames = async () => {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ table: value });
  }

  onHandleClick = async () => {
    const { table } = this.state;
    const data = await getProductsFromCategoryAndQuery(table);
    const resultData = data.results;
    console.log(resultData);
    this.setState({ products: resultData, setSearch: true });
  }

   handleCartButton = () => {
     const { history } = this.props;
     history.push('/cart');
   }

   render() {
     const { products, table, setSearch, categories } = this.state;
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

         <button
           data-testid="shopping-cart-button"
           type="button"
           onClick={ this.handleCartButton }
         >
           Ver carrinho de compras
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
         <aside>
           {
             categories.map(({ id, name }) => (
               <CategoryCard
                 key={ id }
                 id={ id }
                 name={ name }
               />
             ))
           }
         </aside>
       </div>
     );
   }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Search;
