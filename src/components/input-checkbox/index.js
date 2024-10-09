

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
        type="checkbox"
        name={props.name}
        required={props.required}
        checked={props.checked}
        disabled={props.disabled}

        onChange={(newVal) => {
          props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputCheckbox extends Component {

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
      name,
      required,
      checked,
      disabled,
      onChange,


    } = this.props;







    return (


      <Html val={value} id={id} className={className} name={name} required={required} checked={checked} disabled={disabled} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputCheckbox;