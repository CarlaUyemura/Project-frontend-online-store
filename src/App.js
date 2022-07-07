import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import Cart from './components/Cart';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
group-1/req-3
          <Route
            path="/cart"
            component={ Cart }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
