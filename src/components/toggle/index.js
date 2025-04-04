const { Component, RawHTML, useState } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from '@wordpress/components'
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';
function Html(props) {
  if (!props.warn) {
    return null;
  }
  var title = props.title;
  var opened = props.opened;
  var initialOpen = props.initialOpen;
  var beforeTitle = props.beforeTitle;
  var children = props.children;
  const [isOpen, setIsOpen] = useState(initialOpen);
  var icon = '';
  // useEffect(() => {
  // }, [keyword]);
  return (
    <div className={`${props.className} pg-setting-input-text`}>
      <div
        className={`${isOpen ? "bg-gray-500" : "bg-gray-700"}	hover:bg-gray-500 border-0	border-b border-solid border-gray-500 px-2 py-2 items-center cursor-pointer flex justify-between `}
        onClick={(ev) => {
          if (opened == undefined || opened == null) {
            setIsOpen(!isOpen);
          }
        }}>
        <div className="flex cursor-pointer w-full ">
          {beforeTitle}
          <span className=" flex items-center	text-white">{title}</span>
        </div>
        <div>
          {isOpen ? <Icon icon={chevronDown} /> : <Icon icon={chevronUp} />}
        </div>
      </div>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
}
class PGtoggle extends Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }
  render() {
    const {
      title,
      opened,
      initialOpen,
      beforeTitle,
      className,
      children
    } = this.props;
    return (
      <div>
        <Html
          title={title}
          opened={opened}
          initialOpen={initialOpen}
          beforeTitle={beforeTitle}
          className={className}
          children={children}
          warn={this.state.showWarning}
        />
      </div>
    );
  }
}
export default PGtoggle;