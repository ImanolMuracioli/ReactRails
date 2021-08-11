import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import xtype from 'xtypejs';

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
    let imagen;
    { console.log("prod")} 
    const prod = (JSON.parse(JSON.stringify(this.state.product)))
    const url_image = ''
    

    if (prod.id !== undefined )
    {
      
       {/*imagen = <img src={JSON.stringify(prod.image_product.url)} alt={prod.name} > </img>  */}     
      const url_image = JSON.stringify(prod.image_product.url)

      imagen = "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f24ce01385eb070514fe1bcf226b7ea4c92de05/Lavarropa.jpg" 

      {/*
       imagen = <CardMedia
      image= "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f24ce01385eb070514fe1bcf226b7ea4c92de05/Lavarropa.jpg"
      title={this.state.product.name}
      />
      */} 

      { console.log(imagen)} 
    } else {
      { console.log("URL vacía")} 
      imagen = ""
    }
   
    return (
      <div>
        
        { console.log('Estamos en el show')} 
        {console.log((JSON.parse(JSON.stringify(this.state.product))))}
        
        <h2> {this.state.product.name}</h2>
        <p>{this.state.product.price}</p>
        
       
       {/*Esto debe ir sin el cierre </img>, porque arroja un puto error. Solo se cierra usando />*/} 
        <img src={imagen} alt={this.state.product.name} />
       

        {/* <img src={this.state.product.image_product.url} alt={this.state.product.name} > </img> */}
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