

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, ToggleControl } from '@wordpress/components';




function Html(props) {
  if (!props.warn) {
    return null;
  }



  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? 'underline #000000 wavy 1px !important' : props.val;


  var valParts = (valZ != undefined || valZ != null) ? valZ.split(" ") : ['underline', '#000000', 'wavy', '1px', '!important'];


  if (valParts.length == 5) {
    var lineVal = [valParts[0]];
    var colorVal = valParts[1];
    var styleVal = valParts[2];
    var thicknessVal = valParts[3];
  }

  if (valParts.length == 6) {
    var lineVal = [valParts[0], valParts[1]];
    var colorVal = valParts[2];
    var styleVal = valParts[3];
    var thicknessVal = valParts[4];
  }


  if (valParts.length == 7) {
    var lineVal = [valParts[0], valParts[1], valParts[2]];
    var colorVal = valParts[3];
    var styleVal = valParts[4];
    var thicknessVal = valParts[5];
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

  var thicknessValX = thicknessVal != undefined ? thicknessVal.match(/-?\d+/g)[0] : 1;
  var thicknessUnitX = thicknessVal != undefined ? thicknessVal.match(/[a-zA-Z%]+/g)[0] : 'px';


  var [thicknessValY, setthicknessVal] = useState(thicknessValX);
  var [thicknessUnitY, setthicknessUnit] = useState(thicknessUnitX);



  var [outlinelineVal, setoutlinelineVal] = useState(lineVal);
  var [outlineColorVal, setoutlineColorVal] = useState(colorVal);
  var [outlineStyleVal, setoutlineStyleVal] = useState(styleVal);
  var [outlineThicknessVal, setoutlineThicknessVal] = useState(thicknessValY + thicknessUnitY);

  var [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);


  var [textDecoration, setTextDecoration] = useState({
    "line": ['underline'],
    "style": 'double',
    "color": "#000000",
    "thicknessVal": "1",
    "thicknessUnit": "px"
  });


  var lineArgs = {
    none: { "label": "None", "value": "none" },
    overline: { "label": "Overline", "value": "overline" },
    underline: { "label": "Underline", "value": "underline" },
    'line-through': { "label": "Line Through", "value": "line-through" },
  };

  var styleArgs = {
    none: { "label": "None", "value": "none" },
    solid: { "label": "Solid", "value": "solid" },
    double: { "label": "Double", "value": "double" },
    wavy: { "label": "wavy", "value": "wavy" },
    dotted: { "label": "Dotted", "value": "dotted" },
    dashed: { "label": "Dashed", "value": "dashed" },
    groove: { "label": "Groove", "value": "groove" },
    ridge: { "label": "Ridge", "value": "ridge" },
    inset: { "label": "Inset", "value": "inset" },
    outset: { "label": "Outset", "value": "outset" },
  };








  useEffect(() => {




  }, [textDecoration]);


  useEffect(() => {

    //

    var valParts = (props.val != undefined) ? props.val.split(" ") : ['underline', '#000000', 'wavy', '1px'];


  }, [props.val]);








  return (

    <div>


      <div className='my-2'>
        <label htmlFor="">Line</label>

        <div className='my-3'>

          {Object.entries(lineArgs).map(arg => {

            var i = arg[0];
            var x = arg[1];


            return (

              <span
                className={(outlinelineVal != undefined && outlinelineVal.indexOf(x.value) !== -1) ? '!bg-indigo-300 hover:bg-indigo-500 text-white px-2 inline-block m-1 py-1 cursor-pointer' : 'px-2 inline-block m-1 py-1 bg-gray-300 cursor-pointer'}
                onClick={ev => {


                  if (outlinelineVal.indexOf(x.value) < 0) {

                    if (x.value == 'none') {
                      outlinelineVal = ['none'];
                    } else {
                      outlinelineVal.push(x.value);
                    }
                    setoutlinelineVal(outlinelineVal)
                    setTextDecoration({ ...textDecoration, line: outlinelineVal });


                    if (isImportant) {
                      props.onChange(outlinelineVal.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal + ' ' + '!important', 'textDecoration');
                    } else {
                      props.onChange(outlinelineVal.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');
                    }




                  } else {
                    var arr = outlinelineVal.filter(item => item !== x.value)

                    setTextDecoration({ ...textDecoration, line: arr });
                    setoutlinelineVal(arr)

                    if (isImportant) {
                      props.onChange(arr.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal + ' ' + '!important', 'textDecoration');
                    } else {
                      props.onChange(arr.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');
                    }

                  }



                }}>{x.label}</span>

            )

          })}

        </div>
      </div>


      <div className='my-2'>
        <label htmlFor="">Color</label>

        <ColorPalette
          value={outlineColorVal}
          colors={colorsPresets}
          enableAlpha
          onChange={(newVal) => {


            setoutlineColorVal(newVal);
            setTextDecoration({ ...textDecoration, color: newVal });



            if (isImportant) {
              props.onChange(textDecoration.line.join(' ') + ' ' + newVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal + ' ' + '!important', 'textDecoration');

            } else {
              props.onChange(textDecoration.line.join(' ') + ' ' + newVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');

            }


          }}
        />
      </div>


      <div className='my-2 flex justify-between items-center pg-setting-css-components'>


        <label htmlFor="">Style</label>
        <Dropdown
          position="bottom right"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title="Clear"

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{outlineStyleVal ? styleArgs[outlineStyleVal].label : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32 pg-font'>

            {Object.entries(styleArgs).map((arg) => {

              var index = arg[0]
              var x = arg[1]
              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  setoutlineStyleVal(x.value);

                  setTextDecoration({ ...textDecoration, style: x.value });


                  if (isImportant) {
                    props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + x.value + ' ' + outlineThicknessVal + ' ' + '!important', 'textDecoration');

                  } else {
                    props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + x.value + ' ' + outlineThicknessVal, 'textDecoration');

                  }


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
      <div className='my-2'>
        <label htmlFor="">Thickness</label>
        <div className='flex justify-between items-center pg-setting-css-components'>


          <InputControl
            value={thicknessValY}
            type="number"
            onChange={(newVal) => {
              setthicknessVal(newVal)
              setoutlineThicknessVal(newVal + thicknessUnitY)

              setTextDecoration({ ...textDecoration, thicknessVal: newVal });

              if (isImportant) {
                props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + newVal + thicknessUnitY + ' ' + '!important', 'textDecoration');
              } else {
                props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + newVal + thicknessUnitY, 'textDecoration');

              }


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
                  <div className=" ">{(thicknessUnitY != undefined) ? unitArgs[thicknessUnitY].label : 'Select...'}</div>


                </Button>
              )}
              renderContent={() => <div className='w-32 pg-font'>

                {Object.entries(unitArgs).map((y) => {

                  var index = y[0]
                  var x = y[1]
                  return (

                    <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                      setthicknessUnit(x.value);
                      setoutlineThicknessVal(thicknessValY + x.value)


                      if (isImportant) {
                        props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + thicknessValY + x.value + ' ' + '!important', 'textDecoration');

                      } else {
                        props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + thicknessValY + x.value, 'textDecoration');

                      }

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
            props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal, 'textDecoration');
          } else {
            props.onChange(textDecoration.line.join(' ') + ' ' + outlineColorVal + ' ' + outlineStyleVal + ' ' + outlineThicknessVal + ' ' + '!important', 'textDecoration');
          }
        }}
      />
    </div>

  )


}



class PGcssTextDecoration extends Component {

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


export default PGcssTextDecoration;