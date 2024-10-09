

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'

import { useState } from '@wordpress/element'

function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    auto: { "label": "auto", "value": "auto" },
    pointer: { "label": "pointer", "value": "pointer" },
    progress: { "label": "progress", "value": "progress" },
    alias: { "label": "alias", "value": "alias" },
    cell: { "label": "cell", "value": "cell" },
    copy: { "label": "copy", "value": "copy" },
    crosshair: { "label": "crosshair", "value": "crosshair" },
    default: { "label": "default", "value": "default" },
    grab: { "label": "grab", "value": "grab" },
    grabbing: { "label": "grabbing", "value": "grabbing" },
    help: { "label": "help", "value": "help" },
    move: { "label": "move", "value": "move" },
    'col-resize': { "label": "col-resize", "value": "col-resize" },
    'context-menu': { "label": "context-menu", "value": "context-menu" },
    'e-resize': { "label": "e-resize", "value": "e-resize" },
    'ew-resize': { "label": "ew-resize", "value": "ew-resize" },
    'n-resize': { "label": "n-resize", "value": "n-resize" },
    'ne-resize': { "label": "ne-resize", "value": "ne-resize" },
    'nesw-resize': { "label": "nesw-resize", "value": "nesw-resize" },
    'ns-resize': { "label": "ns-resize", "value": "ns-resize" },
    'nw-resize': { "label": "nw-resize", "value": "nw-resize" },
    'nwse-resize': { "label": "nwse-resize", "value": "nwse-resize" },
    'no-drop': { "label": "no-drop", "value": "no-drop" },
    'none': { "label": "none", "value": "none" },
    'not-allowed': { "label": "not-allowed", "value": "not-allowed" },
    'row-resize': { "label": "row-resize", "value": "row-resize" },
    's-resize;': { "label": "s-resize;", "value": "s-resize;" },
    'se-resize': { "label": "se-resize", "value": "se-resize" },
    'sw-resize': { "label": "sw-resize", "value": "sw-resize" },
    'text': { "label": "text", "value": "text" },
    'w-resize': { "label": "w-resize", "value": "w-resize" },
    'wait': { "label": "wait", "value": "wait" },
    'zoom-in': { "label": "zoom-in", "value": "zoom-in" },
    'zoom-out': { "label": "zoom-out", "value": "zoom-out" },

  };

  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);

  return (
    <div  className="flex justify-between items-center">

      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title=""

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {/* <div className=" ">{args[val] != undefined ? args[val].label : 'Select...'}</div> */}
            <div className=" ">{args[align] == undefined ? 'Select...' : args[align].label}</div>



          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                // onChange(x.value, 'cursor');
                setalign(x.value)

                if (isImportant) {
                  props.onChange(x.value + ' !important', 'cursor');
                } else {
                  props.onChange(x.value, 'cursor');
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
            props.onChange(align, 'cursor');
          } else {
            props.onChange(align + ' !important', 'cursor');
          }


        }}
      />

    </div>

  )

}

class PGcssCursor extends Component {
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


export default PGcssCursor;