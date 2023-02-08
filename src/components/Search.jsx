import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getCategories } from '../services/api';
import CategoryCard from './CategoryCard';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
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

   handleCartButton = () => {
     const { history } = this.props;
     history.push('/cart');
   }

   render() {
     const { table, setSearch, categories } = this.state;
     const { onClickAddProductToCartFromDetail,
       onHandleClick, onRadioChange, products } = this.props;
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
         <main>

           <aside>
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
               onClick={ onHandleClick }
             >
               Search
             </button>
             <br />
             <br />
             {
               categories.map(({ id, name }) => (
                 <CategoryCard
                   key={ id }
                   id={ id }
                   name={ name }
                   onRadioChange={ onRadioChange }
                 />
               ))
             }
           </aside>
           {products.length === 0
             ? (flagResult)
             : (
               <div className="container-product">
                 {products.map(({ id, title, price, thumbnail, shipping }) => (
                   <section key={ id } className="product-card">
                     <Link
                       data-testid="product-detail-link"
                       to={ `/product/${id}` }
                     >
                       <ProductCard
                         title={ title }
                         price={ price }
                         thumbnail={ thumbnail }
                         shipping={ shipping.free_shipping }
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
         </main>
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
