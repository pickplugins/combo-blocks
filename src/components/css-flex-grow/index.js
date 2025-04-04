const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var valZ =
		props.val == null || props.val == undefined || props.val.length == 0
			? "0px"
			: props.val;
	var widthValX =
		valZ == undefined || valZ.match(/-?\d+/g) == null
			? 0
			: valZ.match(/-?\d+/g)[0];
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	const [widthVal, setwidthVal] = useState(valZ);
	return (
		<div className="flex mt-4 justify-between items-center">
			<InputControl
				value={widthVal}
				type="number"
				onChange={(newVal) => {
					setwidthVal(newVal);
					props.onChange(newVal, "flexGrow");
				}}
			/>
			<ToggleControl
				help={
					isImportant
						? __("Important (Enabled)", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						props.onChange(widthValX, "flexGrow");
					} else {
						props.onChange(widthValX + " !important", "flexGrow");
					}
				}}
			/>
		</div>
	);
}
class PGcssFlexGrow extends Component {
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
		var { val, onChange } = this.props;
		return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
	}
}
export default PGcssFlexGrow;
