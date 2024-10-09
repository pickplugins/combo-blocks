

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
        type="number"
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        step={props.step}
        min={props.min}
        max={props.max}
        required={props.required}
        disabled={props.disabled}

        onChange={(newVal) => {
          props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputNumber extends Component {

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
      placeholder,
      id,
      className,
      name,
      value,
      step,
      min,
      max,
      required,
      disabled,
      onChange,


    } = this.props;







    return (


      <Html placeholder={placeholder} className={className} id={id} name={name} value={value} step={step} min={min} max={max} required={required} disabled={disabled} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputNumber;