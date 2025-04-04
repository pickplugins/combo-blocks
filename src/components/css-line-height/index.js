const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	SelectControl,
	ColorPalette,
	PanelRow,
} from "@wordpress/components";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		normal: { label: "Normal", value: "normal" },
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
	};
	if (typeof props.val == "object") {
		var valZ = props.val.val + props.val.unit;
	} else {
		var valZ =
			props.val == null || props.val == undefined || props.val.length == 0
				? "0px"
				: props.val;
	}
	const [valArgs, setValArgs] = useState(valZ.split(" "));
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	var widthValX =
		valArgs[0] == undefined || valArgs[0].match(/-?\d+/g) == null
			? 0
			: valArgs[0].match(/-?\d+/g)[0];
	var widthUnitX =
		valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null
			? "px"
			: valArgs[0].match(/[a-zA-Z%]+/g)[0];
	const [widthVal, setwidthVal] = useState(widthValX);
	const [widthUnit, setwidthUnit] = useState(widthUnitX);
	return (
		<>
			{(widthUnit != "max-content" ||
				widthUnit != "min-content" ||
				widthUnit != "inherit" ||
				widthUnit != "initial" ||
				widthUnit != "revert" ||
				widthUnit != "revert-layer" ||
				widthUnit != "unset") && (
					<div className="flex justify-between items-center">
						{widthUnit != "normal" && (
							<InputControl
								value={widthVal}
								type="number"
								disabled={
									widthUnit == "normal" ||
										widthUnit == "max-content" ||
										widthUnit == "min-content" ||
										widthUnit == "inherit" ||
										widthUnit == "initial" ||
										widthUnit == "revert" ||
										widthUnit == "revert-layer" ||
										widthUnit == "unset"
										? true
										: false
								}
								onChange={(newVal) => {
									setwidthVal(newVal);
									if (widthUnit == "normal") {
										// props.onChange(widthUnit, 'lineHeight');
										if (isImportant) {
											props.onChange(widthUnit + " !important", "lineHeight");
										} else {
											props.onChange(widthUnit, "lineHeight");
										}
									} else {
										//props.onChange(newVal + widthUnit, 'lineHeight');
										if (isImportant) {
											props.onChange(
												newVal + widthUnit + " !important",
												"lineHeight"
											);
										} else {
											props.onChange(newVal + widthUnit, "lineHeight");
										}
									}
								}}
							/>
						)}
						<div>
							<Dropdown
								position="bottom left"
								renderToggle={({ isOpen, onToggle }) => (
									<Button title="" onClick={onToggle} aria-expanded={isOpen}>
										<div className=" ">
											{unitArgs[widthUnit] == undefined
												? "Select..."
												: unitArgs[widthUnit].label}
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
														if (x.value == "normal") {
															if (isImportant) {
																props.onChange(
																	x.value + " !important",
																	"lineHeight"
																);
															} else {
																props.onChange(x.value, "lineHeight");
															}
														} else {
															if (isImportant) {
																props.onChange(
																	widthVal + x.value + " !important",
																	"lineHeight"
																);
															} else {
																props.onChange(widthVal + x.value, "lineHeight");
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
									if (widthUnit == "normal") {
										props.onChange(widthUnit, "lineHeight");
									} else {
										props.onChange(widthVal + widthUnit, "lineHeight");
									}
								} else {
									if (widthUnit == "normal") {
										props.onChange(widthUnit + " !important", "lineHeight");
									} else {
										props.onChange(
											widthVal + widthUnit + " !important",
											"lineHeight"
										);
									}
								}
							}}
						/>
					</div>
				)}
			<div>
				<PanelRow>
					<label htmlFor="">{__("Global Value", "combo-blocks")} </label>
					<SelectControl
						label=""
						value={widthUnit}
						options={[
							{ label: "Choose", value: "px" },
							{ label: "normal", value: "normal" },
							{ label: "Inherit", value: "inherit" },
							{ label: "Initial", value: "initial" },
							{ label: "Revert", value: "revert" },
							{ label: "Revert-layer", value: "revert-layer" },
							{ label: "Unset", value: "unset" },
						]}
						onChange={(newVal) => {
							setwidthUnit(newVal);
							if (
								newVal == "normal" ||
								newVal == "max-content" ||
								newVal == "min-content" ||
								newVal == "inherit" ||
								newVal == "initial" ||
								newVal == "revert" ||
								newVal == "revert-layer" ||
								newVal == "unset"
							) {
								if (isImportant) {
									props.onChange(newVal + " !important", "lineHeight");
								} else {
									props.onChange(newVal, "lineHeight");
								}
							} else {
								if (isImportant) {
									props.onChange(
										widthVal + newVal + " !important",
										"lineHeight"
									);
								} else {
									props.onChange(widthVal + newVal, "lineHeight");
								}
							}
						}}
					/>
				</PanelRow>
			</div>
		</>
	);
}
class PGcssLineHeight extends Component {
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
export default PGcssLineHeight;
