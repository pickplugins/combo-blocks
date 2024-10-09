

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl } from '@wordpress/components'

import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    separate: { "label": "Separate", "value": "separate" },
    collapse: { "label": "Collapse", "value": "collapse" },
    // 'flex-start': { "label": "flex start	", "value": "flex-start" },
    // 'flex-end': { "label": "flex end	", "value": "flex-end" },
    // 'space-between': { "label": "space between", "value": "space-between" },
    // 'space-around': { "label": "space around", "value": "space-around" },
    // 'space-evenly': { "label": "space evenly", "value": "space-evenly" },

    // start: { "label": "start", "value": "start" },
    // end: { "label": "end", "value": "end" },
    // normal: { "label": "normal", "value": "normal" },
    // start: { "label": "start", "value": "start" },
    // baseline: { "label": "baseline", "value": "baseline" },
    // revert: { "label": "revert", "value": "revert" },
    // unset: { "label": "unset", "value": "unset" },

    inherit: { "label": "inherit", "value": "inherit" },
    initial: { "label": "initial", "value": "initial" },



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
            title="Empty Cells"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {/* <div className=" ">{props.val ? args[props.val].label : 'Select...'}</div> */}
            <div className=" ">{args[align] == undefined ? 'Select...' : args[align].label}</div>


            {/* <div className=" ">{val ? val : 'Select...'}</div> */}


          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

          var index = args[0]
          var x = args[1]
          return (

            <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

              // props.onChange(x.value, 'borderCollapse');
              setalign(x.value)


              if (isImportant) {
                props.onChange(x.value + ' !important', 'borderCollapse');
              } else {
                props.onChange(x.value, 'borderCollapse');
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
            props.onChange(align, 'borderCollapse');
          } else {
            props.onChange(align + ' !important', 'borderCollapse');
          }


        }}
      />

    </div>

  )


}

class PGcssBorderCollapse extends Component {

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


export default PGcssBorderCollapse;