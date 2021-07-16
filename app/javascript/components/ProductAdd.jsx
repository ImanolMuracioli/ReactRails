import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductAdd extends Component {
  constructor() {
    

    super();
    this.state = { name: '', price: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    
  }

  handleSubmit(event) {
    console.log(JSON.stringify(this.state))
    event.preventDefault();
    const { name, price} = this.state;

  if (name.length == 0 || price.length == 0)
  return;

  const body = {
    name,
    price
  };

    fetch('api/v1/products', {
        method: 'POST',
        body: JSON.stringify(body),     
        headers: {'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push("/products");
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <textarea name="price" rows="5" value={this.state.price} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Create</button>
            <Link to={`/products`} className="btn btn-outline-dark">Cancel</Link> 
          </div>
        </form>
    );
  }
}

export default ProductAdd;