const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { Icon, close } from '@wordpress/icons';
import PGColorPicker from '../../components/input-color-picker'
function Html(props) {
  if (!props.warn) {
    return null;
  }
  //var valParts = ['1fr', '1fr', '1fr'];
  var valParts = (props.val == undefined || props.val == null || props.val.length == 0) ? ['1fr'] : props.val.split(" ");
  var unitArgs = {
    fr: { "label": "FR", "value": "fr" },
    px: { "label": "PX", "value": "px" },
    em: { "label": "EM", "value": "em" },
    rem: { "label": "REM", "value": "rem" },
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
    // none: { "label": "none", "value": "none" },
    // inherit: { "label": "inherit", "value": "inherit" },
    // initial: { "label": "initial", "value": "initial" },
    // revert: { "label": "revert", "value": "revert" },
    // unset: { "label": "unset", "value": "unset" },
  }
  const [valArgs, setvalArgs] = useState(valParts);
  useEffect(() => {
  }, [props.val]);
  return (
    <div>
      <div className='bg-green-600 hover:bg-green-500 rounded-sm inline-block cursor-pointer text-white px-3 py-1 my-4' onClick={ev => {
        var valArgsX = valArgs.concat('1fr');
        setvalArgs(valArgsX);
        props.onChange(valArgsX.join(' '), 'gridTemplateColumns');
      }}>{__("Add", "combo-blocks")}</div>
      {valArgs.map((part, index) => {
        var valNumber = (part.match(/-?\d+/g) != null) ? part.match(/-?\d+/g)[0] : 1;
        var valUnit = (part.match(/[a-zA-Z%]+/g) != null) ? part.match(/[a-zA-Z%]+/g)[0] : 'fr';
        // var valNumber = (valArgs[0] == undefined || valArgs[0].match(/-?\d+/g) == null) ? 0 : valArgs[0].match(/-?\d+/g)[0];
        //   var valUnit = (valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[0].match(/[a-zA-Z%]+/g)[0];
        return (
          <div className='my-2'>
            <div className='flex justify-between items-center'>
              <span className='bg-red-500  inline-block hover:bg-red-400 mx-3 p-1 cursor-pointer' onClick={ev => {
                valArgs.splice(index, 1);
                setvalArgs(valArgs);
                props.onChange(valArgs.join(' '), 'gridTemplateColumns');
              }}><Icon fill="#fff" icon={close} /></span>
              <InputControl
                value={valNumber}
                type="number"
                onChange={(newVal) => {
                  var valIndex = newVal + valUnit;
                  valArgs[index] = valIndex;
                  setvalArgs(valArgs);
                  props.onChange(valArgs.join(' '), 'gridTemplateColumns');
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
                      <div className=" ">{(valUnit != undefined) ? unitArgs[valUnit].label : 'Select...'}</div>
                    </Button>
                  )}
                  renderContent={() => <div className='w-32'>
                    {Object.entries(unitArgs).map((y) => {
                      var j = y[0]
                      var x = y[1]
                      return (
                        <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {
                          //props.onChange(valNumber + x.value, 'border');
                          var valIndex = valNumber + x.value;
                          valArgs[index] = valIndex;
                          setvalArgs(valArgs);
                          props.onChange(valArgs.join(' '), 'gridTemplateColumns');
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
        )
      })}
    </div >
  )
}
class PGcssGridTemplateColumns extends Component {
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
export default PGcssGridTemplateColumns;