

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
        type="password"
        name={props.name}
        placeholder={props.placeholder}
        inputmode={props.inputmode}
        minlength={props.minlength}
        maxlength={props.maxlength}
        autocomplete={props.autocomplete}
        pattern={props.pattern}
        required={props.required}
        disabled={props.disabled}

        onChange={(newVal) => {
          props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputPassword extends Component {

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
      inputmode,
      minlength,
      maxlength,
      autocomplete,
      pattern,
      required,
      disabled,
      onChange,


    } = this.props;







    return (


      <Html placeholder={placeholder} className={className} id={id} name={name} inputmode={inputmode} minlength={minlength} maxlength={maxlength} autocomplete={autocomplete} pattern={pattern} required={required} disabled={disabled} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputPassword;