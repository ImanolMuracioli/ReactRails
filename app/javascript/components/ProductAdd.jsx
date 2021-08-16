import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

class ProductAdd extends Component {
  constructor() {
    

    super();
    this.state = { name: '', price: '', offer: '', image_product: null};
    this.onImageChange = this.onImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    
  }

/*
  uploadFile = (file,product) => {
    const upload = new DirectUpload(file,'http://127.0.0.1:3000/rails/active_storage/direct_uploads')
    upload.create((error,blob) => {
      if (error) {
        console.log(error)
      }else{
        console.log('correcto..')
      }
   })
  
  }
  */


  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('offer', this.state.offer);
    formData.append('image_product', this.state.image_product);
    console.log(this.state.image_product)
    fetch('api/v1/products', {
      method: 'POST',
      body: formData
    })
    .catch(error=>console.log(error));
  }

  /*




  handleSubmit(event) {
    console.log(JSON.stringify(this.state))
    event.preventDefault();
    const { name, price, image_product} = this.state;

 

  if (name.length == 0 || price.length == 0)
  return;

  const body = {
    name,
    price,
    image_product
  };

    fetch('api/v1/products', {
        method: 'POST',
        body: JSON.stringify(body),     
        headers: {'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          {console.log(response.json())}
          return response.json();
        }
      })
      .catch(error => console.log('error', error));
  }
  */

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  
  handleCancel() {
    this.props.history.push("/products");
  }

  /*
  handleOnChange = e => { 
    console.log(e.target.files[0])
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }
  */

  onImageChange = event => { 
    this.setState({ image_product: event.target.files[0] });
  };

  render() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" style={{paddingTop: '10px', height: "50px",width: "300px", }}> 
            <label>Nombre</label>
            <input type="text" name="name" placeholder="Ingrese el nombre" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group" style={{paddingTop: '20px', height: "50px",width: "200px", }}>
            <label>Precio</label>
            <input type="text" name="price" placeholder="Ingrese el precio"   value={this.state.price} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group" style={{paddingTop: '30px', height: "50px",width: "200px", }}>
            <label>Oferta</label>
            <input type="text" name="offer"  placeholder="Ingrese de descuento"  value={this.state.offer} onChange={this.handleChange} className="form-control" />
          </div>
          <br/>

          <div style={{paddingTop: '20px'}}>
          <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
          </div>
          <div className="btn-group" style={{height: "50px",width: "200px", }}>

            <Button type="submit" variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
              Crear
            </Button>

          <Button component={Link} to="/products" variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
            Atrás
          </Button>

          </div>
        </form>
    );
  }
}

export default ProductAdd;