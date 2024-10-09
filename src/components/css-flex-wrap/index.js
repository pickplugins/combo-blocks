

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl, PanelRow } from '@wordpress/components'
import { useState } from '@wordpress/element'


function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    nowrap: { "label": "nowrap", "value": "nowrap" },
    wrap: { "label": "wrap", "value": "wrap" },
    'wrap-reverse': { "label": "wrap-reverse", "value": "wrap-reverse" },

  };

  var valX = (props.val == undefined || props.val == null || props.val.length == 0) ? 'wrap' : props.val;



  const [valArgs, setValArgs] = useState(valX.split(" "));

  const [value, setValue] = useState(valArgs[0]);
  const [isImportant, setImportant] = useState((valArgs[1] == undefined) ? false : true);



  return (
    <div className='flex justify-between items-center'>


      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title="Clear"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <div className=" ">{(args[value] == undefined) ? 'Select...' : args[value].label}</div>


          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                setValue(x.value)

                if (isImportant) {
                  props.onChange(x.value + ' !important', 'flexWrap');

                } else {
                  props.onChange(x.value, 'flexWrap');

                }



              }}>

                {x.value && (

                  <>{x.label}</>

                )}

              </div>

            )

          })}
        </div>}
      />

      <ToggleControl
        label={
          isImportant
            ? 'Important Enabled'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {

          setImportant(isImportant => !isImportant)

          if (isImportant) {
            props.onChange(value, 'flexWrap');

          } else {
            props.onChange(value + ' !important', 'flexWrap');

          }


        }}
      />

    </div>
  )


}


class PGcssFlexWrap extends Component {

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


export default PGcssFlexWrap;