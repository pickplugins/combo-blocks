const { Component } = wp.element;
import { __ } from "@wordpress/i18n";

import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
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
		auto: { label: "AUTO", value: "auto" },
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
					<div className="flex justify-between items-center pg-font">
						{widthUnit != "auto" && (
							<InputControl
								value={widthVal}
								type={
									widthVal.length == 0 ||
										isNaN(widthVal) ||
										props.val.includes("calc")
										? "text"
										: "number"
								}
								disabled={
									widthUnit == "auto" ||
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
									if (newVal.includes("calc")) {
										// props.onChange(newVal, "width");
										if (isImportant) {
											props.onChange(newVal + " !important", "width");
										} else {
											props.onChange(newVal, "width");
										}
										return;
									}
									setwidthVal(newVal);
									if (widthUnit == "auto") {
										// props.onChange(widthUnit, 'width');
										if (isImportant) {
											props.onChange(widthUnit + " !important", "width");
										} else {
											props.onChange(widthUnit, "width");
										}
									} else {
										//props.onChange(newVal + widthUnit, 'width');
										if (isImportant) {
											props.onChange(newVal + widthUnit + " !important", "width");
										} else {
											props.onChange(newVal + widthUnit, "width");
										}
									}
								}}
							/>
						)}
						<div className={`${props.val.includes("calc") ? "hidden" : ""}`}>
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
									<div className="w-32 pg-font">
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
																props.onChange(x.value + " !important", "width");
															} else {
																props.onChange(x.value, "width");
															}
														} else {
															if (isImportant) {
																props.onChange(
																	widthVal + x.value + " !important",
																	"width"
																);
															} else {
																props.onChange(widthVal + x.value, "width");
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
								if (props.val.includes("calc")) {
									// var valX  = props.val.replaceAll(" !important", "")
									// props.onChange(newVal, "width");
									if (isImportant) {
										var valX = props.val.replaceAll(" !important", "");
										props.onChange(valX, "width");
										// props.onChange(props.val + " !important", "width");
									} else {
										// var valX = props.val.replaceAll(" !important", "");
										// props.onChange(valX, "width");
										props.onChange(props.val + " !important", "width");
									}
									return;
								}
								if (isImportant) {
									if (widthUnit == "auto") {
										props.onChange(widthUnit, "width");
									} else {
										props.onChange(widthVal + widthUnit, "width");
									}
								} else {
									if (widthUnit == "auto") {
										props.onChange(widthUnit + " !important", "width");
									} else {
										props.onChange(widthVal + widthUnit + " !important", "width");
									}
								}
							}}
						/>
					</div>
				)}
			<div className={`${props.val.includes("calc") ? "hidden" : ""}`}>
				<PanelRow>
					<label htmlFor="">{__("Global Value", "combo-blocks")}</label>
					<SelectControl
						label=""
						value={widthUnit}
						options={[
							{ label: __("Choose", "combo-blocks"), value: "px" },
							{ label: "auto", value: "auto" },
							{ label: "max-content", value: "max-content" },
							{ label: "min-content", value: "min-content" },
							{ label: "Inherit", value: "inherit" },
							{ label: "Initial", value: "initial" },
							{ label: "Revert", value: "revert" },
							{ label: "Revert-layer", value: "revert-layer" },
							{ label: "Unset", value: "unset" },
						]}
						onChange={(newVal) => {
							setwidthUnit(newVal);
							if (
								newVal == "auto" ||
								newVal == "max-content" ||
								newVal == "min-content" ||
								newVal == "inherit" ||
								newVal == "initial" ||
								newVal == "revert" ||
								newVal == "revert-layer" ||
								newVal == "unset"
							) {
								if (isImportant) {
									props.onChange(newVal + " !important", "width");
								} else {
									props.onChange(newVal, "width");
								}
							} else {
								if (isImportant) {
									props.onChange(widthVal + newVal + " !important", "width");
								} else {
									props.onChange(widthVal + newVal, "width");
								}
							}
						}}
					/>
				</PanelRow>
			</div>
		</>
	);
}
class PGcssWidth extends Component {
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
export default PGcssWidth;
