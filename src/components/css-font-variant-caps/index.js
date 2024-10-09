

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl} from '@wordpress/components'

import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {

    'normal': { "label": "normal", "value": "normal" },
    'small-caps': { "label": "small-caps", "value": "small-caps" },
    'all-small-caps': { "label": "all-small-caps", "value": "all-small-caps" },
    'petite-caps': { "label": "petite-caps", "value": "petite-caps" },
    'all-petite-caps': { "label": "all-petite-caps", "value": "all-petite-caps" },
    'unicase': { "label": "unicase", "value": "unicase" },
    'titling-caps': { "label": "titling-caps", "value": "titling-caps" },
    'initial': { "label": "initial", "value": "initial" },
    'inherit': { "label": "inherit", "value": "inherit" },
    'unset': { "label": "unset", "value": "unset" },


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

                // onChange(x.value, 'fontVariantCaps');
                setalign(x.value)
                
                if (isImportant) {
                  props.onChange(x.value + ' !important', 'fontVariantCaps');
                } else {
                  props.onChange(x.value, 'fontVariantCaps');
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
            props.onChange(align, 'fontVariantCaps');
          } else {
            props.onChange(align + ' !important', 'fontVariantCaps');
          }


        }}
      />
    </div>

  )

}


class PGcssFontVariantCaps extends Component {

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


export default PGcssFontVariantCaps;