

const { Component, RawHTML } = wp.element;
import { Button, Dropdown, ToggleControl, __experimentalInputControl as InputControl } from '@wordpress/components'

import { useState, } from '@wordpress/element'

function Html(props) {
  if (!props.warn) {
    return null;
  }

  var args = [
    { label: 'left top', value: 'left top' },
    { label: 'left center', value: 'left center' },
    { label: 'left bottom', value: 'left bottom' },
    { label: 'right top', value: 'right top' },
    { label: 'right center', value: 'right center' },
    { label: 'right bottom', value: 'right bottom' },
    { label: 'center top', value: 'center top' },
    { label: 'center center', value: 'center center' },
    { label: 'center bottom', value: 'center bottom' },
    { label: "inherit", value: "inherit" },
    { label: "initial", value: "initial" },
    { label: "revert", value: "revert" },
    { label: "unset", value: "unset" },
  ];




  const [isCustom, setisCustom] = useState(props.val.match(/-?\d+/g) == null ? false : true);
  const [valArgs, setValArgs] = useState(props.val.split(" "));
  const [position, setposition] = useState(props.val);
  const [isImportant, setImportant] = useState(props.val.includes("!important") ? true : false);
  const [ValX, setValX] = useState((valArgs[0] == undefined || valArgs[0].match(/-?\d+/g) == null) ? 0 : valArgs[0].match(/-?\d+/g)[0]);
  const [valUnitX, setvalUnitX] = useState((valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[0].match(/[a-zA-Z%]+/g)[0]);
  const [ValY, setValY] = useState((valArgs[1] == undefined || valArgs[1].match(/-?\d+/g) == null) ? 0 : valArgs[1].match(/-?\d+/g)[0]);
  const [valUnitY, setvalUnitY] = useState((valArgs[1] == undefined || valArgs[1].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[1].match(/[a-zA-Z%]+/g)[0]);


  // var ValX = (valArgs[0] == undefined || valArgs[0].match(/-?\d+/g) == null) ? 0 : valArgs[0].match(/-?\d+/g)[0];
  // var valUnitX = (valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[0].match(/[a-zA-Z%]+/g)[0];

  // var ValY = (valArgs[1] == undefined || valArgs[1].match(/-?\d+/g) == null) ? 0 : valArgs[1].match(/-?\d+/g)[0];
  // var valUnitY = (valArgs[1] == undefined || valArgs[1].match(/[a-zA-Z%]+/g) == null) ? 'px' : valArgs[1].match(/[a-zA-Z%]+/g)[0];



  return (
    <div className="">


      <ToggleControl
        label={
          isCustom
            ? 'Custom Value enabled?'
            : 'Custom Value?'
        }

        checked={isCustom}
        onChange={(arg) => {


          setisCustom(isCustom => !isCustom)


        }}
      />


      <div className="flex justify-between items-center my-3">




        {!isCustom && (

          <Dropdown
            position="bottom"
            renderToggle={({ isOpen, onToggle }) => (
              <Button
                title=""

                onClick={onToggle}
                aria-expanded={isOpen}
              >
                {/* <div className=" ">{val ? val : 'Select...'}</div> */}
                <div className=" ">{position.length == 0 ? 'Select...' : position}</div>



              </Button>
            )}
            renderContent={() => <div className='w-32'>

              {args.map((x) => {


                return (

                  <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {
                    setisCustom(false);

                    setposition(x.value)


                    if (isImportant) {
                      props.onChange(x.value + ' !important', 'maskPosition');
                    } else {
                      props.onChange(x.value, 'maskPosition');
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


        )}




      </div>


      {isCustom && (

        <div className='flex mt-4'>
          <div>
            <InputControl
              value={ValX}
              type="number"
              onChange={(newVal) => {

                setValX(newVal)

                if (isImportant) {
                  props.onChange(newVal + valUnitX + ' ' + ValY + valUnitY + ' ' + '!important', 'maskPosition');
                } else {
                  props.onChange(newVal + valUnitX + ' ' + ValY + valUnitY, 'maskPosition');
                }

              }}
            />
          </div>

          <span className='mx-2'> / </span>

          <div>
            <InputControl
              value={ValY}
              type="number"
              onChange={(newVal) => {

                setValY(newVal)


                if (isImportant) {
                  props.onChange(ValX + valUnitX + ' ' + newVal + valUnitY + ' ' + '!important', 'maskPosition');
                } else {
                  props.onChange(ValX + valUnitX + ' ' + newVal + valUnitY, 'maskPosition');
                }


              }}
            />
          </div>
        </div>

      )}


      <ToggleControl
        label={
          isImportant
            ? 'Important (Enabled)'
            : 'Important?'
        }

        checked={isImportant}
        onChange={(arg) => {
          setImportant(isImportant => !isImportant)

          if (isImportant) {

            if (isCustom) {
              props.onChange(ValX + valUnitX + ' ' + ValY + valUnitY, 'maskPosition');
            } else {
              props.onChange(position, 'maskPosition');
            }
          } else {
            if (isCustom) {
              props.onChange(ValX + valUnitX + ' ' + ValY + valUnitY + ' ' + '!important', 'maskPosition');
            } else {
              props.onChange(position + ' !important', 'maskPosition');
            }
          }


        }}
      />

    </div>

  )
}


class PGcssMaskPosition extends Component {

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


export default PGcssMaskPosition;