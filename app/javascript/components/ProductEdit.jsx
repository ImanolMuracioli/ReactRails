import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

window.bandera_imagen = false

class ProductEdit extends Component {
  constructor() {
    super();
    this.state = { name: '', price: '',image_product: null};
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
    if (bandera_imagen == true) {
      {console.log("Con imagen2")}
      formData.append('image_product', this.state.image_product);
      bandera_imagen = false
    } else
    {console.log("Sin imagen")}
    
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

    let theme = createTheme();
    theme = responsiveFontSizes(theme);


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
        <br/>
        <h1>Editar {this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group" style={{paddingTop: '10px', height: "50px",width: "300px", }}>
            <label>Nombre</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
        <div className="form-group" style={{paddingTop: '20px', height: "50px",width: "200px"}}>
          <label>Precio</label>
          <input type="text" name="price"  value={this.state.price} onChange={this.handleChange} className="form-control" />
        </div>

          <div style={{paddingTop: '20px', height: "50px",width: "200px" }}>
          {imagen} <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
          </div>

          <br/><br/><br/><br/><br/>
          <div className="btn-group" style={{paddingTop: '100px', height: "150px",width: "200px" }}>
            <Button type="submit" onChange={this.handleSubmit} variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
              Editar
            </Button>
            <Button component={Link} to={`/products/${this.state.id}`} variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductEdit;