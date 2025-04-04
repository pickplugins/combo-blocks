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
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		"%": { label: "%", value: "%" },
		cm: { label: "CM", value: "cm" },
		mm: { label: "MM", value: "mm" },
		in: { label: "IN", value: "in" },
		pt: { label: "PT", value: "pt" },
		pc: { label: "PC", value: "pc" },
		ex: { label: "EX", value: "ex" },
		ch: { label: "CH", value: "ch" },
		vw: { label: "VW", value: "vw" },
		vh: { label: "VH", value: "vh" },
		vmin: { label: "VMIN", value: "vmin" },
		vmax: { label: "VMAX", value: "vmax" },
		// large: { "label": "large", "value": "large" },
		// larger: { "label": "larger", "value": "larger" },
		// medium: { "label": "medium", "value": "medium" },
		// small: { "label": "small", "value": "small" },
		// smaller: { "label": "smaller", "value": "smaller" },
		// "x-large": { "label": "x-large", "value": "x-large" },
		// "x-small": { "label": "x-small", "value": "x-small" },
		// "xx-large": { "label": "xx-large", "value": "xx-large" },
		// "xx-small": { "label": "xx-small", "value": "xx-small" },
		// "xxx-large": { "label": "xxx-large", "value": "xxx-large" },
		// revert: { "label": "revert", "value": "revert" },
		// unset: { "label": "unset", "value": "unset" },
		// initial: { "label": "initial", "value": "initial" },
		// inherit: { "label": "inherit", "value": "inherit" },
	};
	var valZ =
		props.val == null || props.val == undefined || props.val.length == 0
			? "0px"
			: props.val;
	valZ =
		typeof valZ == "object"
			? (valZ.val == undefined ? "px" : valZ.val) +
			(valZ.unit == undefined ? "px" : valZ.unit)
			: valZ;
	var widthValX =
		valZ == undefined || valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g) == null
			? 0
			: valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g)[0];
	var widthUnitX =
		valZ == undefined || valZ.match(/[a-zA-Z%]+/g) == null
			? "px"
			: valZ.match(/[a-zA-Z%]+/g)[0];
	const [widthVal, setwidthVal] = useState(widthValX);
	const [widthUnit, setwidthUnit] = useState(widthUnitX);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	return (
		<div className="flex justify-between">
			{widthUnit != "auto" && (
				<InputControl
					value={widthVal}
					type="number"
					step="0.01"
					disabled={widthUnit == "auto" ? true : false}
					onChange={(newVal) => {
						setwidthVal(newVal);
						if (widthUnit == "auto") {
							// props.onChange(widthUnit, 'width');
							if (isImportant) {
								props.onChange(widthUnit + " !important", "fontSize");
							} else {
								props.onChange(widthUnit, "fontSize");
							}
						} else {
							//props.onChange(newVal + widthUnit, 'width');
							if (isImportant) {
								props.onChange(newVal + widthUnit + " !important", "fontSize");
							} else {
								props.onChange(newVal + widthUnit, "fontSize");
							}
						}
					}}
				/>
			)}
			<div>
				<Dropdown
					position="bottom"
					renderToggle={({ isOpen, onToggle }) => (
						<Button title="" onClick={onToggle} aria-expanded={isOpen}>
							<div className=" ">
								{valZ
									? unitArgs[widthUnit].label
									: __("Select...", "combo-blocks")}
							</div>
						</Button>
					)}
					renderContent={() => (
						<div className="w-32">
							{Object.entries(unitArgs).map((y) => {
								var index = y[0];
								var x = y[1];
								return (
									<div
										className={
											"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
										}
										onClick={(ev) => {
											setwidthUnit(x.value);
											if (x.value == "auto") {
												if (isImportant) {
													props.onChange(x.value + " !important", "fontSize");
												} else {
													props.onChange(x.value, "fontSize");
												}
											} else {
												if (isImportant) {
													props.onChange(
														widthVal + x.value + " !important",
														"fontSize"
													);
												} else {
													props.onChange(widthVal + x.value, "fontSize");
												}
											}
										}}>
										{x.value && <>{x.label}</>}
									</div>
								);
							})}
						</div>
					)}
				/>
			</div>
			<ToggleControl
				help={
					isImportant
						? __("Important Enabled", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						if (widthUnit == "auto") {
							props.onChange(widthUnit, "fontSize");
						} else {
							props.onChange(widthVal + widthUnit, "fontSize");
						}
					} else {
						if (widthUnit == "auto") {
							props.onChange(widthUnit + " !important", "fontSize");
						} else {
							props.onChange(widthVal + widthUnit + " !important", "fontSize");
						}
					}
				}}
			/>
		</div>
	);
}
class PGcssFontSize extends Component {
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
export default PGcssFontSize;
