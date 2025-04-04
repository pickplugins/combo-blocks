const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, PanelRow, PanelBody, RangeControl } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import PGDropdown from '../../components/dropdown'
import { Icon, close } from '@wordpress/icons';
function Html(props) {
  if (!props.warn) {
    return null;
  }
  var valParts = (props.val != undefined) ? props.val.split(" ") : [];
  const [valArgs, setvalArgs] = useState([]);
  function addFilter(option, index) {
    var isExist = valArgs.find(x => x.id === option.value);
    if (isExist == undefined) {
      var obj = {}
      obj['id'] = option.value;
      obj['val'] = option.val;
      obj['unit'] = option.unit;
      valArgs.push(obj);
      var str = '';
      valArgs.map(x => {
        str += x.id + '(' + x.val + x.unit + ') ';
      })
      props.onChange(str, 'backdropFilter');
    }
  }
  useEffect(() => {
    var filtered = valParts.filter(Boolean)
    var res = filtered.map(x => {
      if (x.length != 0) {
        var argVal = x != undefined ? x.match(/-?\d+/g)[0] : 1;
        var argUnit = x != undefined ? x.match(/-?\d+(px|deg|%)/g)[0] : "px";
        var argId = x != undefined ? x.match(/[a-zA-Z]+/g)[0] : '';
        return { id: argId, val: argVal, unit: argUnit };
      }
    })
    setvalArgs(res);
  }, [props.val]);
  useEffect(() => {
    //onChange('contrast(200%) brightness(150%) blur(10%)', 'filter');
  }, [valArgs]);
  const [filterArgs, setfilterArgs] = useState({
    blur: { label: "Blur", value: "blur", val: "1", unit: "px" },
    brightness: {
      label: "Brightness",
      value: "brightness",
      val: "10",
      unit: "%",
    },
    contrast: { label: "Contrast", value: "contrast", val: "10", unit: "%" },
    grayscale: { label: "Grayscale", value: "grayscale", val: "10", unit: "%" },
    "hue-rotate": {
      label: "Hue-rotate",
      value: "hue-rotate",
      val: "10",
      unit: "deg",
    },
    invert: { label: "Invert", value: "invert", val: "10", unit: "%" },
    opacity: { label: "Opacity", value: "opacity", val: "10", unit: "%" },
    saturate: { label: "Saturate", value: "saturate", val: "10", unit: "%" },
    sepia: { label: "Sepia", value: "sepia", val: "10", unit: "%" },
  });
  return (
    <div className='mt-4'>
      <div className='flex'>
        <PGDropdown position="bottom right" variant="secondary" options={filterArgs} buttonTitle={__("Add Filter", "combo-blocks")} onChange={addFilter} values=""></PGDropdown>
      </div>
      {
        valArgs != undefined && (
          valArgs.map((arg, i) => {
            console.log(valArgs)
            return (
              <div className='flex my-3 items-center justify-between'>
                <label htmlFor="">{filterArgs[arg.id]?.label}</label>
                <div className='flex'>
                  <InputControl
                    value={arg.val}
                    type="number"
                    {...(valArgs[i].id !== "blur" && {
                      min: 0,
                      max: 100
                    })}
                    onChange={(newVal) => {
                      valArgs[i].val = newVal;
                      // setvalArgs(valArgs);
                      var str = '';
                      valArgs.map((x, i) => {
                        if (x.id == "blur") {
                          x.unit = "px";
                        }
                        if (x.id == "hue-rotate") {
                          x.unit = "deg";
                        }
                        if (
                          x.id == "brightness" ||
                          x.id == "contrast" ||
                          x.id == "grayscale" ||
                          x.id == "invert" ||
                          x.id == "opacity" ||
                          x.id == "saturate" ||
                          x.id == "sepia"
                        ) {
                          x.unit = "%";
                        }
                        str += x.id + '(' + x.val + x.unit + ') ';
                      })
                      props.onChange(str, 'backdropFilter');
                    }}
                  />
                  <span className="hover:bg-red-500 bg-red-400 text-white ml-1 inline-block p-1 cursor-pointer" onClick={ev => {
                    valArgs.splice(i, 1);
                    setvalArgs(valArgs);
                  }}><span className="dashicons dashicons-no-alt"></span></span>
                </div>
              </div>
            )
          }))
      }
    </div >
  )
}
class PGcssBackdropFilter extends Component {
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
export default PGcssBackdropFilter;