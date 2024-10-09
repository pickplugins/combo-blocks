const { Component } = wp.element;
import {
	Button,
	Dropdown,
	RangeControl,
	ToggleControl,
} from "@wordpress/components";
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
			? "0"
			: props.val.toString();

	const [widthVal, setwidthVal] = useState(valZ);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);

	return (
		<div className="flex mt-4">
			<InputControl
				value={widthVal}
				type="number"
				min="0"
				max="1"
				step="0.01"
				onChange={(newVal) => {
					setwidthVal(newVal);
					if (isImportant) {
						props.onChange(newVal + " !important", "opacity");
					} else {
						props.onChange(newVal, "opacity");
					}
				}}
			/>

			{/* <RangeControl
				value={props.val}
				min="0"
				max="1"
				step="0.01"
				onChange={(newVal) => {
					setwidthVal(newVal);
					if (isImportant) {
						props.onChange(newVal + " !important", "opacity");
					} else {
						props.onChange(newVal, "opacity");
					}
				}}
			/> */}

			<ToggleControl
				help={isImportant ? "Important (Enabled)" : "Important?"}
				checked={isImportant}
				onChange={(arg) => {

					setImportant((isImportant) => !isImportant);

					if (isImportant) {
						props.onChange(widthVal, "opacity");
					} else {
						props.onChange(widthVal + " !important", "opacity");
					}
				}}
			/>
		</div>
	);
}

class PGcssOpacity extends Component {
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

export default PGcssOpacity;




