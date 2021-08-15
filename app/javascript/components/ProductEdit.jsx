import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

class ProductEdit extends Component {
  constructor() {
    super();
    this.state = { name: '', price: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    fetch(`api/v1/products/${this.props.match.params.id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState(data);
      })
      .catch(error => console.log('error', error));
  }

  onImageChange = event => { 
    this.setState({ image_product: event.target.files[0] });
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('image_product', this.state.image_product);
    console.log(this.state)

    fetch(`api/v1/products/${this.props.match.params.id}`, {
        method: 'PATCH',        
        body: formData
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    { console.log('Para atras')} 
    this.props.history.push(`api/v1//products/${this.state.id}`);
  }



  render() {
    let imagen;

    { console.log("state")}
    { console.log(this.state)}
    { console.log("prod")}
    { console.log(this.state.price)}

    const prod = (JSON.parse(JSON.stringify(this.state)))

    { console.log("paso")}


    if (prod.id !== undefined )
    {
    }

    return (


      
      <div>
        { console.log('Estamos en el edit')} 
        { console.log(this)} 
        <h1>Edit {this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <textarea name="price" rows="5" value={this.state.price} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
          {imagen} <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
          </div>

          <div className="btn-group">
            <button type="submit" onChange={this.handleSubmit} className="btn btn-dark">Modificar</button>
            <Link to={`/products/${this.state.id}`} className="btn btn-outline-dark">Cancel</Link> 
            
          </div>
        </form>
      </div>
    );
  }
}

export default ProductEdit;