import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductAdd extends Component {
  constructor() {
    

    super();
    this.state = { name: '', price: '', image_product: null};
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
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" style={{height: "50px",width: "200px", }}> 
            <label>Nombre</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group" style={{height: "50px",width: "200px", }}>
            <label>Precio</label>
            <textarea name="price" rows="5" value={this.state.price} onChange={this.handleChange} className="form-control" />
          </div>
          <br/><br/><br/>
          <br/>
          <br/>

          <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />

          <div className="btn-group" style={{height: "30px",width: "200px", }}>
            <button type="submit" className="btn btn-dark">Create</button>
            <Link to={`/products`} className="btn btn-outline-dark">Cancel</Link> 
          </div>
        </form>
    );
  }
}

export default ProductAdd;