

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'

import { useState, } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    normal: { "label": "Normal", "value": "normal" },
    multiply: { "label": "Multiply", "value": "multiply" },
    screen: { "label": "Screen", "value": "screen" },
    overlay: { "label": "Overlay", "value": "overlay" },
    darken: { "label": "Darken", "value": "darken" },
    lighten: { "label": "Lighten", "value": "lighten" },
    'color-dodge': { "label": "Color dodge", "value": "color-dodge" },
    saturation: { "label": "Saturation", "value": "saturation" },
    color: { "label": "Color", "value": "color" },
    luminosity: { "label": "Luminosity", "value": "luminosity" },
    exclusion: { "label": "exclusion", "value": "exclusion" },
    hue: { "label": "hue", "value": "hue" },


    'color-burn': { "label": "color-burn", "value": "color-burn" },
    'difference': { "label": "difference", "value": "difference" },
    'hard-light': { "label": "hard-light", "value": "hard-light" },
    'soft-light': { "label": "soft-light", "value": "soft-light" },
    inherit: { "label": "inherit", "value": "inherit" },
    initial: { "label": "initial", "value": "initial" },
    revert: { "label": "revert", "value": "revert" },
    unset: { "label": "unset", "value": "unset" },
  };


  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);


  return (
    <div className="flex justify-between items-center">

      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title="Background Blend Mode"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {/* <div className=" ">{val ? args[val].label : 'Select...'}</div> */}
            <div className=" ">{args[align] == undefined ? 'Select...' : args[align].label}</div>

          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                // onChange(x.value, 'backgroundBlendMode');
                setalign(x.value)

                if (isImportant) {
                  props.onChange(x.value + ' !important', 'backgroundBlendMode');
                } else {
                  props.onChange(x.value, 'backgroundBlendMode');
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
            props.onChange(align, 'backgroundBlendMode');
          } else {
            props.onChange(align + ' !important', 'backgroundBlendMode');
          }


        }}
      />
    </div>

  )


}



class PGcssBackgroundBlendMode extends Component {
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
      <Html val={val} onChange={onChange} warn={this.state.showWarning} />
    )
  }
}


export default PGcssBackgroundBlendMode;