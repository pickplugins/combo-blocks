

const { Component, RawHTML, useState } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';


class PGtab extends Component {
  render() {


    const {

      children


    } = this.props;


    function MyFunction() {


      //const [selected, setSelected] = useState(activeTab);


      // useEffect(() => {
      // }, [keyword]);


      return (

        <div className='tabContent py-3'>

          {children}

        </div>

      )
    }



    return (
      <div>
        <MyFunction />


      </div>

    )
  }
}


export default PGtab;