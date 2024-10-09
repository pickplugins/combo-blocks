

const { Component } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'



function Html(props) {
  if (!props.warn) {
    return null;
  }


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px' : props.val;
  var widthValX = (valZ == undefined || valZ.match(/-?\d+/g) == null) ? 0 : valZ.match(/-?\d+/g)[0];

  const [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);


  return (

    <div className='flex mt-4'>


      <InputControl
        value={widthValX}
        type="number"
        onChange={(newVal) => {

          if (isImportant) {
            props.onChange(newVal + ' !important', 'zIndex');
          } else {
            props.onChange(newVal, 'zIndex');
          }



        }}
      />

      <div>

      </div>
      <ToggleControl
        help={
          isImportant
            ? 'Important Enabled'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {


          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(widthValX, 'zIndex');
          } else {
            props.onChange(widthValX + ' !important', 'zIndex');

          }



        }}
      />

    </div>




  )

}


class PGcssZIndex extends Component {

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


export default PGcssZIndex;