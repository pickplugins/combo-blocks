

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';




class PGcssBottom extends Component {


  render() {

    var {
      val,
      onChange,


    } = this.props;






    function Html() {


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

      var widthValX = val != undefined ? val.match(/-?\d+/g)[0] : 10;
      var widthUnitX = val != undefined ? val.match(/[a-zA-Z%]+/g)[0] : 'px';


      const [widthVal, setwidthVal] = useState(widthValX);
      const [widthUnit, setwidthUnit] = useState(widthUnitX);

      return (

        <div className='flex mt-4'>


          <InputControl
            value={widthVal}
            type="number"
            onChange={(newVal) => {

              setwidthVal(newVal);
              onChange(newVal + widthUnit, 'bottom');


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
                  <div className=" ">{val ? unitArgs[widthUnit].label : 'Select...'}</div>


                </Button>
              )}
              renderContent={() => <div className='w-32'>

                {Object.entries(unitArgs).map((y) => {

                  var index = y[0]
                  var x = y[1]
                  return (

                    <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                      setwidthUnit(x.value);
                      onChange(widthVal + x.value, 'bottom');


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


    return (


      <Html />


    )
  }
}


export default PGcssBottom;