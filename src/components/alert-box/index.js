

const { Component, RawHTML, useState, useEffect } = wp.element;
import { Button, Dropdown, Popover } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';





class PGalertBox extends Component {
  render() {


    const {
      active,
      title,

      children



    } = this.props;


    function Html() {




      return (



        <>
          Hello ###############
          <Popover position="bottom right">
            <div className='PGalertBox my-5'>
              <div className='PGalertBox-title' >
                {title}
              </div>

              <div className='alertBoxInner  bg-amber-100 p-2'>


                {children}

              </div>





            </div>
          </Popover>


        </>


      )




    }


    return (
      <div>
        <Html />
      </div>

    )
  }
}


export default PGalertBox;