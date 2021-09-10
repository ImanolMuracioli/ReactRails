import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import xtype from 'xtypejs';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';

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

      console.log(this.state)


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

    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    

    if (prod.id !== undefined )
    {
      
      const url_image = JSON.stringify(prod.image_product.url)
      
      imagen = <CardMedia style={{height: '200px',width: '200px' }}
      image= {url_image.replace(/"/g,"")} /* Se hace un replace para quitar las comillas dobles */
      title={this.state.product.name}
      />
      
      
    } else {
      { console.log("URL vacía")} 
      imagen = ""
    }
   
    return (
      <div width = '100px'>
        <br/>
        <br/>
        { console.log('Estamos en el show')} 
        {console.log((JSON.parse(JSON.stringify(this.state.product))))}
        
        <ThemeProvider theme={theme}>
          <Typography variant="h5">{this.state.product.name}</Typography>
          <Typography variant="h6">

          <NumberFormat displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} value={this.state.product.price} />  
          </Typography>
        </ThemeProvider>
       
       {/*Esto debe ir sin el cierre </img>, porque arroja un puto error. Solo se cierra usando />*/} 
       {/*<img src={imagen} alt={this.state.product.name} width='400px' />*/}

       <br/>
       <br/>

       {imagen}

       <br/>
       <br/>
       
        <p>

        <Button component={Link} to={`/products/${this.state.product.id}/edit`} variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
          Editar
        </Button>

        <Button onClick={this.handleDelete} variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
          Eliminar
        </Button>

        <Button component={Link} to="/products" variant="contained" size="small" color="primary" style={{margin: theme.spacing(1)}}>
          Atrás
        </Button>


        </p>
        <hr/>
      </div>
    )
  }
}

export default ProductInfo;