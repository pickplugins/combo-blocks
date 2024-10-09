

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { Icon, close } from '@wordpress/icons';



function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = {
    row: { "label": "row", "value": "row" },
    "row-reverse": { "label": "row-reverse", "value": "row-reverse" },
    column: { "label": "column", "value": "column" },
    "column-reverse": { "label": "column-reverse", "value": "column-reverse" },
    nowrap: { "label": "nowrap", "value": "nowrap" },
    wrap: { "label": "wrap", "value": "wrap" },
    "wrap-reverse": { "label": "wrap-reverse", "value": "wrap-reverse" },
    inherit: { "label": "inherit", "value": "inherit" },
    initial: { "label": "initial", "value": "initial" },
    revert: { "label": "revert", "value": "revert" },
    "revert-layer": { "label": "revert-layer", "value": "revert-layer" },
    unset: { "label": "unset", "value": "unset" },




  };


  var valZ = (props.val == null || props.val == undefined || props.val.length == 0) ? '' : props.val;
  const [valArgs, setValArgs] = useState(valZ.split(" "));




  return (

    <div className='mt-4'>


      <Dropdown
        position="bottom"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            title="Clear"

            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <div className=" ">{'Select...'}</div>


          </Button>
        )}
        renderContent={() => <div className='w-32'>

          {Object.entries(args).map((args) => {

            var index = args[0]
            var x = args[1]
            return (

              <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                valArgs.push(x.value);
                setValArgs(valArgs);

                props.onChange(valArgs.join(' '), 'flexFlow');


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


      {valArgs.map((x, i) => {

        return (

          <div className='flex items-center my-1 border hover:bg-gray-400 cursor-pointer'> <span className='bg-red-500 mr-2 p-1' onClick={ev => {

            valArgs.splice(i, 1);
            setValArgs(valArgs);

            props.onChange(valArgs.join(' '), 'flexFlow');
          }}> <Icon fill={'#fff'} icon={close} /> </span> {x}</div>

        )

      })}



    </div>




  )

}

class PGcssFlexFlow extends Component {

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

    var {
      val,
      onChange,


    } = this.props;








    return (


      <Html val={val} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssFlexFlow;