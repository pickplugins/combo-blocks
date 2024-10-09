

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
        className={props.className}
        id={props.id}
        value={props.value}
        type="button"
        accesskey={props.accesskey}
        disabled={props.disabled}

        onSubmit={(newVal) => {
        //   props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputButton extends Component {

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
      value,
      className,
      id,
      accesskey,
      disabled,
      onSubmit,


    } = this.props;







    return (


      <Html val={value} id={id} className={className} accesskey={accesskey} disabled={disabled} onSubmit={onSubmit} warn={this.state.showWarning} />


    )
  }
}


export default PGinputButton;