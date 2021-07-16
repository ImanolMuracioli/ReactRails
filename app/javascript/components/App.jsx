
import React, { Component } from 'react';
import Home from './Home';
import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
import ProductInfo from './ProductInfo';
import ProductEdit from './ProductEdit';
import PruebaNuevo from './PruebaNuevo';

import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation />
            <Main />
          </div>
        </Router>
      </div>
    );
  }
}

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/products">Products</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/prueba">Prueba</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/products/new" component={ProductAdd} />
    <Route exact path="/products/:id" component={ProductInfo} />
    <Route exact path="/products/:id/edit" component={ProductEdit} />
    <Route exact path="/prueba" component={PruebaNuevo} />
  </Switch>
);

export default App;