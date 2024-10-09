

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
        type="text"
        size={props.size}
        name={props.name}
        placeholder={props.placeholder}
        minlength={props.minlength}
        maxlength={props.maxlength}
        required={props.required}
        disabled={props.disabled}

        onChange={(newVal) => {
          props.onChange(newVal);

        }}
      />


    </div>




  )

}


class PGinputText extends Component {

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
      placeholder,
      className,
      id,
      name,
      size,
      minlength,
      maxlength,
      required,
      disabled,
      onChange,


    } = this.props;







    return (


      <Html val={value} name={name} id={id} size={size} placeholder={placeholder} className={className} minlength={minlength} maxlength={maxlength} required={required} disabled={disabled} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputText;