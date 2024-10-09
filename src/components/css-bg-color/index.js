

const { Component } = wp.element;
import { Button, Dropdown, ColorPalette, PanelRow, __experimentalInputControl as InputControl, Popover } from '@wordpress/components'

import colorsPresets from '../../colors-presets'


import { memo, useMemo, useState, useRef, useEffect, useCallback } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div >


      <Popover position="bottom right">
        <div className='p-2'>



          <ColorPalette
            value={props.value}
            colors={colorsPresets}

            enableAlpha
            onChange={(newVal) => {
              props.onChange(newVal, 'bgColor');
            }}
          />
        </div>
      </Popover>


    </div>
  );
}


class PGcssBgColor extends Component {


  constructor(props) {
    super(props);
    this.state = { showWarning: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {

    var {
      val,
      enableAlpha,
      onChange,
      label,


    } = this.props;

    var placeholderStyle = {
      backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
      backgroundPosition: '0 0,25px 25px',
      backgroundSize: '50px 50px',
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',

      cursor: 'pointer',

    };

    var defaultbtnStyle = {
      backgroundImage: 'repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)',
      backgroundPosition: '0 0,25px 25px',
      backgroundSize: '50px 50px',
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',

      cursor: 'pointer',

    };

    var btnStyle = {
      backgroundColor: val,
      boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 20%)',

      cursor: 'pointer',
    };


    return (
      <div>
        <div className='my-4'>

          <p className='text-sm'>This css property is depricated, please use <strong>Background Color</strong> instead</p>

          <div className='relative h-10' style={placeholderStyle}>
            <div className='absolute w-full  h-full top-0 left-0 text-center' style={btnStyle} onClick={this.handleToggleClick}>

              <span className='w-full text-center left-0 top-1/2 -translate-y-1/2	 absolute'>{(val == undefined) ? 'Set Color' : val}</span>

            </div>
          </div>


        </div>
        <Html enableAlpha={enableAlpha} value={val} onChange={onChange} warn={this.state.showWarning} />



      </div>
    );
  }

}


export default PGcssBgColor;