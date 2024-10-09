

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'


class PGcssDisplay extends Component {
  render() {


    const {
      val,
      onChange,



    } = this.props;


    var args = [
      { "label": "Select..", "value": "" },
      { "label": "None", "value": "none" },
      { "label": "Inline", "value": "inline" },
      { "label": "Inline Block", "value": "inline-block" },

    ];



    return (
      <div>

        <Dropdown
          position="bottom"
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              title=""

              onClick={onToggle}
              aria-expanded={isOpen}
            >
              <div className=" ">{val ? val : 'Select...'}</div>


            </Button>
          )}
          renderContent={() => <div className='w-32'>

            {args.map((x) => {


              return (

                <div className={'px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer'} onClick={(ev) => {

                  onChange(x.value)

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
      </div>

    )
  }
}


export default PGcssDisplay;