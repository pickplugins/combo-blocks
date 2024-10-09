

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';


import PGColorPicker from '../../components/input-color-picker'



function Html(props) {

  if (!props.warn) {
    return null;
  }



  var valParts = (props.val != undefined) ? props.val.split(" ") : ['0px', 'solid', '#000000'];

  var widthVal = (valParts[0] != undefined) ? valParts[0] : '0px';
  var styleVal = (valParts[1] != undefined) ? valParts[1] : 'solid';
  var colorVal = (valParts[2] != undefined) ? valParts[2] : '#000000';




  var outlineStyleArgs = {
    none: { "label": "None", "value": "none" },
    hidden: { "label": "Hidden", "value": "hidden" },
    dotted: { "label": "Dotted", "value": "dotted" },
    dashed: { "label": "Dashed", "value": "dashed" },
    solid: { "label": "Solid", "value": "solid" },
    double: { "label": "Double", "value": "double" },
    groove: { "label": "Groove", "value": "groove" },
    ridge: { "label": "Ridge", "value": "ridge" },
    inset: { "label": "Inset", "value": "inset" },
    outset: { "label": "Outset", "value": "outset" },
  };




  var unitArgs = {


    px: { "label": "PX", "value": "px" },
    em: { "label": "EM", "value": "em" },
    rem: { "label": "REM", "value": "rem" },
    // "%": { "label": "%", "value": "%" },

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

    // none: { "label": "none", "value": "none" },
    // inherit: { "label": "inherit", "value": "inherit" },
    // initial: { "label": "initial", "value": "initial" },
    // revert: { "label": "revert", "value": "revert" },
    // unset: { "label": "unset", "value": "unset" },



  }



  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '0px' : props.val;


  var widthValX = (widthVal.match(/-?\d+/g) != null) ? widthVal.match(/-?\d+/g)[0] : 1;
  var widthUnitX = (widthVal.match(/[a-zA-Z%]+/g) != null) ? widthVal.match(/[a-zA-Z%]+/g)[0] : 'px';


  const [widthValY, setwidthVal] = useState(widthValX);
  const [widthUnitY, setwidthUnit] = useState(widthUnitX);

  const [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);



  const [outlineWidthVal, setoutlineWidthVal] = useState(widthVal);
  const [outlineStyleVal, setoutlineStyleVal] = useState(styleVal);
  const [outlineColorVal, setoutlineColorVal] = useState(colorVal);



  return (

    <div>
      <div className='my-2'>
        <label htmlFor="">Border Width</label>
        <div className='flex justify-between items-center'>


          <InputControl
            value={widthValY}
            type="number"
            onChange={(newVal) => {

              setwidthVal(newVal);
              props.onChange(newVal + widthUnitY + ' ' + styleVal + ' ' + colorVal, 'borderLeft');


            }}
          />
          <div>

            <Dropdown
              position="bottom right"
              renderToggle={({ isOpen, onToggle }) => (
                <Button
                  title=""

                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <div className=" ">{(widthUnitY != undefined) ? unitArgs[widthUnitY].label : 'Select...'}</div>


                </Button>
              )}
              renderContent={() => <div className='w-32'>

                {Object.entries(unitArgs).map((y) => {

                  var index = y[0]
                  var x = y[1]
                  return (

                    <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                      setwidthUnit(x.value);
                      props.onChange(widthValY + x.value + ' ' + styleVal + ' ' + colorVal, 'borderLeft');


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

      </div>

      <div className='my-2 flex justify-between items-center'>


        <label htmlFor="">Border Style</label>



        <Dropdown
          position="bottom right"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Clear"

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{outlineStyleVal ? outlineStyleArgs[outlineStyleVal].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {Object.entries(outlineStyleArgs).map((arg) => {

              var index = arg[0]
              var x = arg[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  props.onChange(widthVal + ' ' + x.value + ' ' + colorVal, 'borderLeft');
                  setoutlineStyleVal(x.value)

                }}>

                  {!x.value && (

                    <div>Reset</div>

                  )}

                  {x.value && (

                    <>{x.label}</>

                  )}

                </div>

              )

            })}
          </div>}
        />
      </div>

      <label htmlFor="">Border Color</label>

      <PGColorPicker value={outlineColorVal}
        colors={colorsPresets}
        enableAlpha
        onChange={(newVal) => {

          props.onChange(widthVal + ' ' + styleVal + ' ' + newVal, 'borderLeft');
          setoutlineColorVal(newVal)

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
            props.onChange(outlineWidthVal + ' ' + outlineStyleVal + ' ' + outlineColorVal, 'borderLeft');

          } else {
            props.onChange(outlineWidthVal + ' ' + outlineStyleVal + ' ' + outlineColorVal + ' !important', 'borderLeft');

          }


        }}
      />



    </div>

  )


}



class PGcssBorderLeft extends Component {


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


    const {
      val,
      onChange,



    } = this.props;





    return (
      <div>

        <Html val={val} onChange={onChange} warn={this.state.showWarning} />
      </div>

    )
  }
}


export default PGcssBorderLeft;