

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'




class PGinputSelect extends Component {


  render() {

    var {
      val,
      options,
      multiple,

      onChange,


    } = this.props;




    function Html() {



      return (

        <div className='w-full'>

          {multiple == true && (<>
            <select className='w-full'
              multiple
              onChange={(event) => {

                var options = event.target.options;

                var selected = [];

                for (var i = 0, l = options.length; i < l; i++) {
                  if (options[i].selected) {
                    selected.push(options[i].value);

                  }
                }

                onChange(selected);
              }}
            >
              {options.map(x => {

                var isSelected = val.includes(x.value)

                return (
                  <option value={x.value}

                    selected={isSelected}

                  >{x.label}</option>
                )
              })}
            </select>
          </>)}


          {multiple == false && (<>
            <select

              onChange={(event) => {
                var currentVal = options[event.target.options.selectedIndex].value;
                onChange(currentVal);
              }}
            >
              {options.map(x => {
                var selected = val.includes(x.value)

                return (
                  <option value={x.value} selected={selected}
                  >{x.label}</option>
                )
              })}
            </select>
          </>)}




        </div>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGinputSelect;