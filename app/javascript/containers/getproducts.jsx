import react, {Component} from 'react'

import Cardproduct from '../components/cardproduct';
import axios from 'axios'
import Gridlist from '../components/Gridlist';


const api_url='http://[::1]:3000/api/v1/products'

class Getproducts extends Component {

    constructor(props){
        super(props)
        
        this.state={
            items: []
        }
    }


    componentDidMount(){
        this.getProduct();
        console.log('producto')
        console.log(this.state.items)
        }

        getProduct(){
            fetch(api_url)
            .then(response=> response.json())
            .then(response_items=>{
                this.setState({
                    items: response_items
                })


            })
        }

    


    render(){
        console.log(this.state.items)

        const productData =this.state.items;

        console.log(productData)
        
        return(<Gridlist productdata={productData}/>)
    }
} 

export default Getproducts;