import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.inputNode1.value)
        console.log(this.inputNode2.value)
        
        var formData =  new FormData()
        formData.append("username",this.inputNode1.value)
        formData.append("password",this.inputNode2.value)

        fetch("http://127.0.0.1:3000/api/v1/tokens",
        {method: 'POST', body: formData})
        .then(res => res.json()).then(res => (console.log(res.jwt),window.localStorage.setItem('jwt',res.jwt)))
        .catch(function(error){console.log('Error en la autenticación: ' + error.message)})
        .then(() => {
            this.props.history.replace('',null) 
            this.props.history.replace(`/products`)
        })
    }

    

    render(){
        return (

            <div>
                <form onSubmit= {this.handleSubmit}>
                    <label htmlFor='username'>Nombre de usuario</label> <br/>
                    <input type='username' id='username' name='username' ref={node => {this.inputNode1 = node}} />

                    <label htmlFor='username'>Contraseña</label> <br/>
                    <input type='username' id='username' name='username' ref={node => {this.inputNode2 = node}}/>

                    <input type='submit' value='Sign In'/>

                </form>


            </div>
        )
    }
}

export default SignIn