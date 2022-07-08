import React from "react";
import {Link } from "react-router-dom";

class ProductPage extends React.Component {
  render() {
    return (
      <div>
        <p>Product Page</p>
        <Link to='/'>Voltar</Link>

      </div>
    )
  }
}

export default ProductPage