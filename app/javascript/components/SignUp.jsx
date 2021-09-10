import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {

    handleSubmit = event => {
        event.preventDefault();
        
        var formData =  new FormData()
        formData.append("username",this.inputNode1.value)
        formData.append("password",this.inputNode2.value)
        formData.append("email",this.inputNode3.value)

        fetch("http://127.0.0.1:3000/api/v1/users",
        {method: 'POST', body: formData})
        .then(res => res.json())
        .then(() => {

            console.log('Redireccionar')
            console.log(formData)
            this.props.history.replace('',null) 
            this.props.history.replace(`/signin`)
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

                    <label htmlFor='username'>Correo electrónico</label> <br/>
                    <input type='username' id='username' name='username' ref={node => {this.inputNode3 = node}}/>

                    <input type='submit' value='Sign In'/>

                </form>


            </div>
        )
    }
}

export default SignUp