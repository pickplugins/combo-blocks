

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }


  var unitArgs = {
    px: { "label": "PX", "value": "px" },
    em: { "label": "EM", "value": "em" },
    rem: { "label": "REM", "value": "rem" },
    auto: { "label": "AUTO", "value": "auto" },
    "%": { "label": "%", "value": "%" },
    cm: { "label": "CM", "value": "cm" },
    mm: { "label": "MM", "value": "mm" },
    in: { "label": "IN", "value": "in" },
    pt: { "label": "PT", "value": "pt" },
    pc: { "label": "PC", "value": "pc" },
    ex: { "label": "EX", "value": "ex" },
    ch: { "label": "CH", "value": "ch" },
    vw: { "label": "VW", "value": "vw" },
    vh: { "label": "VH", "value": "vh" },
    vmin: { "label": "VMIN", "value": "vmin" },
    vmax: { "label": "VMAX", "value": "vmax" },
  }

  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px' : props.val;


  var widthValX = (valZ == undefined || valZ.match(/-?\d+/g) == null) ? 0 : valZ.match(/-?\d+/g)[0];
  var widthUnitX = (valZ == undefined || valZ.match(/[a-zA-Z%]+/g) == null) ? 'px' : valZ.match(/[a-zA-Z%]+/g)[0];


  const [widthVal, setwidthVal] = useState(widthValX);
  const [widthUnit, setwidthUnit] = useState(widthUnitX);

  return (

    <div className='flex mt-4'>


      <InputControl
        value={widthVal}
        type="number"
        onChange={(newVal) => {

          setwidthVal(newVal);
          props.onChange(newVal + widthUnit, 'outlineOffset');


        }}
      />
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title=""

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{props.val ? unitArgs[widthUnit].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {Object.entries(unitArgs).map((y) => {

              var index = y[0]
              var x = y[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  setwidthUnit(x.value);
                  props.onChange(widthVal + x.value, 'outlineOffset');


                }}>

                  {x.value && (

                    <>{x.label}</>

                  )}

                </div>

              )

            })}
          </div>}
        />
      </div>


    </div>




  )

}


class PGcssOutlineOffset extends Component {

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


export default PGcssOutlineOffset;