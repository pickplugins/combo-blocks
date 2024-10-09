

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl} from '@wordpress/components'

import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {

    'normal': { "label": "normal", "value": "normal" },
    'bold': { "label": "bold", "value": "bold" },
    'bolder': { "label": "bolder", "value": "bolder" },
    'lighter': { "label": "lighter", "value": "lighter" },
    '100': { "label": "100", "value": "100" },
    '200': { "label": "200", "value": "200" },
    '300': { "label": "300", "value": "300" },
    '400': { "label": "400", "value": "400" },
    '500': { "label": "500", "value": "500" },
    '600': { "label": "600", "value": "600" },
    '700': { "label": "700", "value": "700" },
    '800': { "label": "800", "value": "800" },
    '900': { "label": "900", "value": "900" },

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
            title="Clear"

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

                // onChange(x.value, 'fontWeight');
                setalign(x.value)


                if (isImportant) {
                  props.onChange(x.value + ' !important', 'fontWeight');
                } else {
                  props.onChange(x.value, 'fontWeight');
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
            props.onChange(align, 'fontWeight');
          } else {
            props.onChange(align + ' !important', 'fontWeight');
          }


        }}
      />
    </div>

  )
}


class PGcssFontWeight extends Component {

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


export default PGcssFontWeight;