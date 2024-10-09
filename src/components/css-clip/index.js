

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import colorsPresets from '../../colors-presets'



function Html(props) {
  if (!props.warn) {
    return null;
  }

  var valZ = props.val;

  if (typeof props.val == 'object') {

    var topX = props.val.top;
    var rightX = props.val.right;
    var bottomX = props.val.bottom;
    var leftX = props.val.left;

  } else {

    var valParts = (props.val != undefined) ? props.val.split(" ") : ['5px', '5px', '5px', '5px'];

    var topX = valParts[0];
    var rightX = valParts[1];
    var bottomX = valParts[2];
    var leftX = valParts[3];
  }




  const [valX, setvalX] = useState({ top: topX, right: rightX, bottom: bottomX, left: leftX });


  return (

    <div>

      <BoxControl
        label=""
        values={valX}
        onChange={(nextValues) => {



          setvalX({ top: nextValues.top, right: nextValues.right, bottom: nextValues.bottom, left: nextValues.left })
          //nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left

          props.onChange(nextValues.top + ' ' + nextValues.right + ' ' + nextValues.bottom + ' ' + nextValues.left, 'clip');
        }}
      />


    </div>




  )

}

class PGcssClip extends Component {

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
      val,
      onChange,


    } = this.props;







    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssClip;