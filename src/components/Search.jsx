import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProductsFromCategoryAndQuery,
  getCategories,
  getProductsQuery } from '../services/api';
import CategoryCard from './CategoryCard';
import Header from './Header';

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

  onRadioChange = async ({ target }) => {
    const { products } = this.state;
    const objResponse = await getProductsFromCategoryAndQuery(target.id, target.value);
    this.setState({
      products: objResponse.results,
    }, () => console.log(products));
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ table: value });
  }

  onHandleClick = async () => {
    const { table } = this.state;
    const data = await getProductsQuery(table);
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
     const { onClickAddProductToCartFromDetail } = this.props;
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
         <Header />
         <br />
         <input
           className="Input"
           type="text"
           data-testid="query-input"
           onChange={ this.onInputChange }
           value={ table }
         />
         <button
           className="Button"
           type="button"
           data-testid="query-button"
           onClick={ this.onHandleClick }
         >
           Search
         </button>
         <br />
         <br />
         {products.length === 0
           ? (flagResult)
           : (
             <div>
               {products.map(({ id, title, price, thumbnail }) => (
                 <section key={ id }>
                   <Link
                     data-testid="product-detail-link"
                     to={ `/product/${id}` }
                   >
                     <ProductCard
                       title={ title }
                       price={ price }
                       thumbnail={ thumbnail }
                     />
                   </Link>
                   <button
                     type="button"
                     data-testid="product-add-to-cart"
                     onClick={ onClickAddProductToCartFromDetail }
                     id={ id }
                   >
                     Adicionar ao carrinho
                   </button>
                 </section>
               ))}
             </div>
           )}
         <aside>
           {
             categories.map(({ id, name }) => (
               <CategoryCard
                 key={ id }
                 id={ id }
                 name={ name }
                 onRadioChange={ this.onRadioChange }
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
  onClickAddProductToCartFromDetail: PropTypes.func,
}.isRequired;

export default Search;
