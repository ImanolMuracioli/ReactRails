import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch('api/v1/products')
      .then(response => response.json())
      .then(data => {
        this.setState({products: data});
      })
      .catch(error => console.log('error', error));
  }



  render() {

    return (
      
      <div>

        
        {this.state.products.map((product) => {
          return(
            <div key={product.id}>
              { console.log('console')} 
              { console.log(`api/v1/products/${product.id}`)} 

              <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
              {product.content}
              <hr/>
            </div>
          )
        })}
        <Link to="/products/new" className="btn btn-outline-primary">Create Product</Link> 
      </div>
    );
  }
}

export default ProductList;