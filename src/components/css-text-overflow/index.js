

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, PanelRow, __experimentalInputControl as InputControl, ToggleControl } from '@wordpress/components'

import { useState } from '@wordpress/element'

function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    clip: { "label": "Clip", "value": "clip" },
    ellipsis: { "label": "Ellipsis", "value": "ellipsis" },
    string: { "label": "String", "value": "string" },
    initial: { "label": "initial", "value": "initial" },
    inherit: { "label": "inherit", "value": "inherit" },
  };


  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [align, setalign] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);


  return (
    <div className="flex justify-between items-center pg-setting-css-components">


      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title=""

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {/* <div className=" ">{(args[val] != undefined) ? args[val].label : 'Select...'}</div> */}
            <div className=" ">{args[align] == undefined ? 'Select...' : args[align].label}</div>



          </Button>
        )}
        renderContent={() => <div className='w-32 pg-font'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                // onChange(x.value, 'textOverflow');
                setalign(x.value)


                if (isImportant) {
                  props.onChange(x.value + ' !important', 'textOverflow');
                } else {
                  props.onChange(x.value, 'textOverflow');
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
            props.onChange(align, 'textOverflow');
          } else {
            props.onChange(align + ' !important', 'textOverflow');
          }


        }}
      />



      {/* {(val != 'clip' || val != 'ellipsis' || val != 'initial' || val != 'inherit') && (

        <PanelRow>
          <label htmlFor="">
            Custom String
          </label>
          <InputControl
            className='mr-2'
            value={val}
            onChange={(newVal) => {

              var string = '"' + newVal + '"'
              onChange(string, 'textOverflow');
            }}
          />
        </PanelRow>



      )} */}




    </div>

  )

}


class PGcssTextOverflow extends Component {

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


export default PGcssTextOverflow;