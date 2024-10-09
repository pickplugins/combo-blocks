

const { Component } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'
import { useState } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px' : props.val;
  var widthValX = (valZ == undefined || valZ.match(/-?\d+/g) == null) ? 0 : valZ.match(/-?\d+/g)[0];

  const [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);

  const [widthVal, setwidthVal] = useState(valZ);


  return (

    <div className="flex justify-between items-center">


      <InputControl
        value={widthVal}
        type="number"
        onChange={(newVal) => {

          setwidthVal(newVal);
          // props.onChange(newVal, 'gridColumnStart');
          if (isImportant) {
            props.onChange(newVal + ' !important', 'gridColumnStart');
          } else {
            props.onChange(newVal, 'gridColumnStart');
          }


        }}
      />

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
            props.onChange(widthVal, 'gridColumnStart');
          } else {
            props.onChange(widthVal + ' !important', 'gridColumnStart');

          }



        }}
      />

    </div>




  )

}

class PGcssGridColumnStart extends Component {

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


export default PGcssGridColumnStart;