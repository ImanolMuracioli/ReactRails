import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

window.bandera_imagen = false

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
    bandera_imagen = true
    this.setState({ image_product: event.target.files[0] });
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);    
    formData.append('image_product', this.state.image_product);
    console.log("formData")

    console.log(this.state)
    console.log(bandera_imagen)
    console.log(this.state.image_product)
    

    console.log("fin edit")

    fetch(`api/v1/products/${this.props.match.params.id}`, {
        method: 'PATCH',        
        body: formData
        
      })
      .then(() => {

        this.props.history.replace('',null)
        this.props.history.replace(`products/${this.props.match.params.id}`)
        
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {    
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push(`api/v1//products/${this.state.id}`);
  }



  render() {
    let imagen;
    let imagen_anterior;

    imagen_anterior = this.state.image


    const prod = (JSON.parse(JSON.stringify(this.state)))

    if (prod.id !== undefined && bandera_imagen == false)
    {     
      
      
      const url_image = JSON.stringify(prod.image_product.url)
      
      imagen = <CardMedia style={{height: '200px',width: '200px' }}
      image= {url_image.replace(/"/g,"")} /* Se hace un replace para quitar las comillas dobles */
      title={this.state.name}
      />
      

    }
    else
    {imagen = ''}

    return (


      
      <div>
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