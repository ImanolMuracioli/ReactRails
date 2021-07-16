import React, { Component } from 'react'

class PruebaNuevo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          post: {
            title: '',
            body: '',
          },
          redirect: null,
          errors: []
        }
    
        this.handleSubmit = this.handleSubmit.bind(this)
      }

      handleSubmit(event) {
        console.log("entro")

      }


render() {
  return (
    <form onSubmit={this.handleSubmit}>
    <div className="form-group">
    <label>Nombre</label>
    <input type="text" name="name" value={this.state.name} className="form-control" />
    </div>
    <div className="form-group">
    <label>Precio</label>
    <textarea name="price" rows="5" value={this.state.price} className="form-control" />
    </div>
    <button type='submit' color="success">Submit</button>
    </form>
  )
}
}
export default PruebaNuevo