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
import jwtDecode from 'jwt-decode';


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
    this.state = { 
    busqueda:'',  
    products: [],  /*Almaceno la informacion de todos los productos*/
    products_search: []}; /*Almacena la inormación de todos los productos, pero se usa en la busqueda. Por lo tanto se va sobreescribiendo en la busqueda. Sino al borrar queda en la lista solo aquellos que conincidieron en la busqueda anterior*/
  }
  

  componentDidMount() {
    let jwt=window.localStorage.getItem('jwt')
    try {
    let result = jwtDecode(jwt)
    console.log(result)  
    } catch (error) {
      console.log('Error de autenticación, por favor iniciar sesión')  
      this.props.history.push('/signin')
    }
    fetch('api/v1/products')    
      .then(response => response.json())
      .then(data => {
        this.setState({products: data});
        this.setState({products_search: data})
      })
      .catch(error => console.log('error', error));

    
      
  }


  onChange=async e=>{
    e.persist()
    
    await this.setState({busqueda: e.target.value})
   
    this.filtrarElementos()
  }

  filtrarElementos=()=>{
    var search = this.state.products_search.filter(item=>{

      if (this.state.busqueda == ''){
        return item
      }else{

        if(item.name.toString().includes(this.state.busqueda)){
          return item
        }
      }
    }
    )

    console.log("search")
    console.log(search)
    this.setState({products: search})
  }




  render() {

    return (

      
      
      <div>
        <br/>

        <div>
          <input type='text' placeholder='Buscar' className='textField' name='busqueda' value={this.state.busqueda} onChange={this.onChange} />
        </div>



        
        <div style={{ display: "flex" }} > 
          <Link style={{ marginLeft: "auto" }} to="/products/new" className="btn btn-outline-primary">Crear producto</Link> 
        </div>


        <Grid container
        direction="row"
        alignContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={1} >
            {this.state.products.map((product) => {
              return(
                
                <div key={product.id} style={{paddingTop: "10px"}}> 
                  {/* { console.log('console')} 
                  { console.log(`api/v1/products/${product.id}`)}  */} 

                      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'white' }} >
                        <Grid item xs={12}   sm={12} style={{height: "300px",width: "250px", paddingTop:"20px"}}  >
                     
                            
                            <Cardproduct name= {product.name} price={product.price} image ={product.image_product.url} offer={product.offer} />
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