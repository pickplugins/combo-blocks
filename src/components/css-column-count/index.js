

const { Component } = wp.element;
import { Button, Dropdown, ToggleControl} from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {


  if (!props.warn) {
    return null;
  }

  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);


  return (

    <div className='mt-4'>


      <InputControl
        value={align}
        type="number"
        onChange={(newVal) => {

          //setwidthVal(newVal);
          setalign(newVal)

          if (isImportant) {
            props.onChange(newVal + ' !important', 'columnCount');
          } else {
            props.onChange(newVal, 'columnCount');
          }


        }}
      />

<ToggleControl
        help={
          isImportant
            ? 'Important (Enabled)'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {
          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(align, 'columnCount');
          } else {
            props.onChange(align + ' !important', 'columnCount');
          }


        }}
      />
    </div>




  )

}


class PGcssColumnCount extends Component {

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


export default PGcssColumnCount;