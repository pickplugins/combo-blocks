

const { Component, RawHTML } = wp.element;
import colorsPresets from '../../colors-presets'
import { __experimentalInputControl as InputControl, ColorPalette, PanelRow, RangeControl, Popover, Dropdown, Button, ToggleControl } from '@wordpress/components';
import PGColorPicker from '../../components/input-color-picker'
import PGDropdown from '../../components/dropdown'

import { useState } from '@wordpress/element'



function Html(props) {

  if (!props.warn) {
    return null;
  }


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '10px solid #50547d4f' : props.val;



  var blur = (valZ != undefined) ? parseInt(valZ.split(" ")[0].match(/-?\d+/g)[0]) : 2;
  var style = (valZ != undefined) ? valZ.split(" ")[1] : 'solid';
  var color = (valZ != undefined) ? valZ.split(" ")[2] : '#dddddd';



  var styleArgs = {
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

  const [isImportant, setImportant] = useState(valZ.includes(" !important") ? true : false);



  return (

    <div>

      <PanelRow>
        <label htmlFor="">Width</label>

      </PanelRow>
      <RangeControl
        min="0"
        max="100"
        step="1"
        value={blur}
        onChange={(newVal) => {



          props.onChange(+ newVal + 'px ' + style + ' ' + color, 'outline');
        }}
      />
      <PanelRow>
        <label htmlFor="">Style</label>
        <PGDropdown position="bottom right" variant="secondary" options={styleArgs} buttonTitle={(styleArgs[style] == undefined) ? 'Choose' : styleArgs[style].label} onChange={(option, index) => {
          props.onChange(blur + 'px ' + option.value + ' ' + color, 'outline');


        }} values=""></PGDropdown>
      </PanelRow>



      <div for="">Color</div>

      <PGColorPicker value={color}
        colors={colorsPresets}
        enableAlpha
        onChange={(newVal) => {

          props.onChange(blur + 'px ' + style + ' ' + newVal, 'outline');

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
            props.onChange(blur + 'px' + ' ' + style + ' ' + color, 'outline');

          } else {
            props.onChange(blur + 'px' + ' ' + style + ' ' + color + ' !important', 'outline');

          }


        }}
      />



    </div>

  )


}
class PGcssoutline extends Component {

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


export default PGcssoutline;