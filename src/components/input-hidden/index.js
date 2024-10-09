

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }




  return (

    <div >

      <input
        id={props.id}
        type="hidden"
        value={props.value}
        name={props.name}
      />






    </div>




  )

}


class PGinputHidden extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }


  render() {

    var {
      id,
      name,
      value,


    } = this.props;







    return (


      <Html id={id} name={name} value={value} warn={this.state.showWarning} />


    )
  }
}


export default PGinputHidden;