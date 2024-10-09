

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
        src={props.src}
        type="image"
        width={props.width}
        height={props.height}
        alt={props.alt}
        disabled={props.disabled}

        onClick={(newVal) => {
        //   props.onChange(newVal);

        }}
      />






    </div>




  )

}


class PGinputImage extends Component {

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
      className,
      id,
      src,
      width,
      height,
      alt,
      disabled,
      onClick,


    } = this.props;







    return (


      <Html id={id} className={className} src={src} width={width} height={height} alt={alt} disabled={disabled} onClick={onClick} warn={this.state.showWarning} />


    )
  }
}


export default PGinputImage;