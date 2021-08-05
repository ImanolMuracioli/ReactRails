import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Cardproduct from './Cardproduct';


const useStyles = makeStyles((theme) => ({
  gridstylee:{
    paddingTop: '20px',
    paddingRight: '50px',
    paddingLeft: '50px'
  }
}));

const section = {
  height: "100%",
  paddingTop: 5,
  backgroundColor: "#fff"
};


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
        <br/>
        
    
        <Link to="/products/new" className="btn btn-outline-primary">Create Product</Link> 

        <br/>
        <br/>
        <br/>

        <Grid container
        direction="row"
        alignContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={1} >
            {this.state.products.map((product) => {
              return(
                
                <div key={product.id} > 
                  {/* { console.log('console')} 
                  { console.log(`api/v1/products/${product.id}`)}  */} 

                      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'white' }} >
                        <Grid item xs={12} sm={12} style={{height: "300px",width: "250px", }}  >
                        {console.log('URL:')}
                            {console.log(product)}
                            
                            <Cardproduct name= {product.name} price={product.price} image ={product.image_product.url} />
                        </Grid>      
                      </Link>  

                
                </div>
               
              )
            })}
             </Grid>
            
      </div>
    );
  }
}

export default ProductList;