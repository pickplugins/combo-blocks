

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import IconToggle from '../../components/icon-toggle'
import breakPoints from '../../breakpoints'
import { useState, useEffect } from '@wordpress/element'

var myStore = wp.data.select('postgrid-shop');



class BreakpointToggle extends Component {




  state = {
    breakPointX: myStore.getBreakPoint()
  }


  setBreakPoint = (x) => {

    var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)


    this.setState({

      breakPointX: x.value
    })

  }

  render() {
    var that = this;


    const {
      position,
      variant,
      iconList, //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      activeIcon,
      value,


    } = this.props;



    function onChangeX(x) {


    }


    var breakPointList = [];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }




    return (
      <div>


        {this.state.breakPointX}
        <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChange} activeIcon={breakPoints[this.state.breakPointX].icon} value={value} />
      </div>

    )
  }
}


export default BreakpointToggle;