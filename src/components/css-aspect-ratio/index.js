

const { Component } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }




  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? 'auto' : props.val;

  var valX = (valZ != 'auto') ? valZ.split("/")[0] : 1;
  var valY = (valZ != 'auto') ? valZ.split("/")[1] : 1;

  const [isAuto, setisAuto] = useState(valZ.includes("auto") ? true : false);


  return (

    <div className='mt-4'>



      <ToggleControl
        help={
          isAuto
            ? 'Auto'
            : 'Auto?'
        }

        checked={isAuto}
        onChange={(arg) => {
          setisAuto(isAuto => !isAuto)
          props.onChange('auto', 'aspectRatio');




        }}
      />

      {!isAuto && (

        <div className='flex mt-4'>
          <InputControl
            value={valX}
            type="number"
            onChange={(newVal) => {

              props.onChange(newVal + '/' + valY, 'aspectRatio');


            }}
          />

          <span className='mx-2'> / </span>

          <InputControl
            value={valY}
            type="number"
            onChange={(newVal) => {

              props.onChange(valX + '/' + newVal, 'aspectRatio');


            }}
          />
        </div>
      )}






    </div>




  )

}

class PGcssAspectRatio extends Component {

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


export default PGcssAspectRatio;