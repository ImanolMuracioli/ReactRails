import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductInfo extends Component {
  constructor() {
    super();
    this.state = { product: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch(`api/v1/products/${this.props.match.params.id}`)
      .then(response => response.json())  
      .then(data => {
          this.setState({product: data});
      })
      .catch(error => console.log('error', error));
  }

  handleDelete() {
    fetch(`api/v1/products/${this.props.match.params.id}`, {method: 'DELETE'})
      .then(() => {
        this.props.history.push("/products")
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        { console.log('Estamos en el show')} 
        <h2>{this.state.product.id}: {this.state.product.name}</h2>
        <p>{this.state.product.price}</p>
        <p>
          <Link to={`/products/${this.state.product.id}/edit`} className="btn btn-outline-dark">Edit</Link> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to="/products" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}

export default ProductInfo;