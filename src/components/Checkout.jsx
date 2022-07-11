import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Header from './Header';

export default class Checkout extends Component {
  render() {
    const {
      inputFullName,
      inputCEP,
      inputCPF,
      inputEmail,
      inputEndereco,
      inputPhone,
      onInputChangeForm,
    } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="inputFullName">
            <input
              type="text"
              data-testid="checkout-fullname"
              name="inputFullName"
              id="inputFullName"
              value={ inputFullName }
              onChange={ onInputChangeForm }
            />
          </label>

          <label htmlFor="email">
            <input
              type="email"
              data-testid="checkout-email"
              name="inputEmail"
              id="email"
              value={ inputEmail }
              onChange={ onInputChangeForm }
            />
          </label>

          <label htmlFor="cpf">
            <input
              type="number"
              data-testid="checkout-cpf"
              name="inputCPF"
              id="cpf"
              value={ inputCPF }
              onChange={ onInputChangeForm }
            />
          </label>

          <label htmlFor="telefone">
            <input
              type="number"
              data-testid="checkout-phone"
              name="inputPhone"
              id="telefone"
              value={ inputPhone }
              onChange={ onInputChangeForm }
            />
          </label>

          <label htmlFor="cep">
            <input
              type="number"
              data-testid="checkout-cep"
              name="inputCEP"
              id="cep"
              value={ inputCEP }
              onChange={ onInputChangeForm }
            />
          </label>

          <label htmlFor="endereco">
            <input
              type="text"
              data-testid="checkout-address"
              name="inputEndereco"
              id="endereco"
              value={ inputEndereco }
              onChange={ onInputChangeForm }
            />
          </label>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  inputFullName: PropTypes.string.isRequired,
  inputCEP: PropTypes.number.isRequired,
  inputCPF: PropTypes.number.isRequired,
  inputEmail: PropTypes.string.isRequired,
  inputEndereco: PropTypes.string.isRequired,
  inputPhone: PropTypes.number.isRequired,
  onInputChangeForm: PropTypes.func.isRequired,
};
