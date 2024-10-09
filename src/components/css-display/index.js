

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'

import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    none: { "label": "None", "value": "none" },
    block: { "label": "Block", "value": "block" },
    inline: { "label": "Inline", "value": "inline" },
    'inline-block': { "label": "Inline Block", "value": "inline-block" },
    grid: { "label": "Grid", "value": "grid" },
    flex: { "label": "Flex", "value": "flex" },
    contents: { "label": "contents", "value": "contents" },
    'inline-flex': { "label": "inline-flex", "value": "inline-flex" },
    'inline-grid': { "label": "inline-grid", "value": "inline-grid" },
    'inline-table': { "label": "inline-table", "value": "inline-table" },
    'list-item': { "label": "list-item", "value": "list-item" },
    // 'run-in': { "label": "run-in", "value": "run-in" },
    table: { "label": "table", "value": "table" },
    'table-caption': { "label": "table-caption", "value": "table-caption" },
    'table-column-group': { "label": "table-column-group", "value": "table-column-group" },
    'table-header-group': { "label": "table-header-group", "value": "table-header-group" },
    'table-footer-group': { "label": "table-footer-group", "value": "table-footer-group" },
    'table-row-group': { "label": "table-row-group", "value": "table-row-group" },
    'table-cell': { "label": "table-cell", "value": "table-cell" },
    'table-column': { "label": "table-column", "value": "table-column" },
    'table-row': { "label": "table-row", "value": "table-row" },
    'flow-root': { "label": "flow-root", "value": "flow-root" },
    'inline-grid': { "label": "inline-grid", "value": "inline-grid" },

    initial: { "label": "initial", "value": "initial" },
    inherit: { "label": "inherit", "value": "inherit" },
    revert: { "label": "revert", "value": "revert" },
    unset: { "label": "unset", "value": "unset" },

  }

  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);

  return (
    <div className="flex justify-between items-center">

      <Dropdown
        position="bottom left"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title=""

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

                // onChange(x.value, 'display');
                setalign(x.value)


                if (isImportant) {
                  props.onChange(x.value + ' !important', 'display');
                } else {
                  props.onChange(x.value, 'display');
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
            props.onChange(align, 'display');
          } else {
            props.onChange(align + ' !important', 'display');
          }


        }}
      />
    </div>

  )

}


class PGcssDisplay extends Component {

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


export default PGcssDisplay;