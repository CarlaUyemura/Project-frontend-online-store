import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ProductPage from './Pages/ProductPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path='/product/:id' component={ ProductPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
