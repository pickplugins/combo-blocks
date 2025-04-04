const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, } from '@wordpress/components'
import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';
import { memo, useMemo, useState } from '@wordpress/element'
function Html(props) {
  if (!props.warn) {
    return null;
  }
  const [isResizing, setisResizing] = useState(false);
  const [lastDownX, setlastDownX] = useState(0);
  const onMouseClickDrag = (e) => {
  }
  const onMouseDownDrag = (e) => {
    setisResizing(true);
    setlastDownX(e.clientY);
  };
  const onMouseUpDrag = (e) => {
    setisResizing(false);
  };
  document.addEventListener("mousemove", (e) => {
    if (!isResizing)
      return;
    const container = document.getElementById("container");
    const top = document.getElementById("top-panel");
    const bottom = document.getElementById("bottom-panel");
    const handle = document.getElementById("drag");
    var offsetRight = container.offsetHeight - (e.clientY - container.offsetTop);
    top.style.bottom = offsetRight;
    bottom.style.height = offsetRight;
  });
  return (
    <div id="container">
      <div id="top-panel" className='bg-amber-200  cursor-row-resize'> {("This is the top side's content!", "combo-blocks")} </div>
      <div id="bottom-panel" className='bg-amber-100  cursor-row-resize'>
        <div id="drag" onMouseDown={onMouseDownDrag} onMouseUp={onMouseUpDrag}>{__("Bottom content!", "combo-blocks")}</div>
      </div>
    </div>
  )
}
class PGDivider extends Component {
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
export default PGDivider;