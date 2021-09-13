
import React, { Component,useEffect } from 'react';
import Home from './Home';
import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
import ProductInfo from './ProductInfo';
import ProductEdit from './ProductEdit';
import PruebaNuevo from './PruebaNuevo';
import BarraNavegacion from './BarraNavegacion';
import SignIn from './SignIn';
import SignUp from './SignUp';

import jwtDecode from 'jwt-decode';

console.log('Se renderiza App')

import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
let jwt=window.localStorage.getItem('jwt')
let visibility_log = false


try {
let result = jwtDecode(jwt)
  visibility_log = true
} catch (error) {
}



class App extends Component {
  

  
  

  render() {
   
    
    
    return (
      <div className="App">
        <Router>
          <div className="container">
            <BarraNavegacion path_signin= '/signin' path_signup= '/signup' path={this.props}/>
            <Main />
          </div>
        </Router>
      </div>
    );
  }
}


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/products/new" component={ProductAdd} />
    <Route exact path="/products/:id" component={ProductInfo} />
    <Route exact path="/products/:id/edit" component={ProductEdit} />
    <Route exact path="/prueba" component={PruebaNuevo} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default App;