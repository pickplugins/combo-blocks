const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import colorsPresets from "../../colors-presets";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
import PGColorPicker from "../../components/input-color-picker";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var valParts =
		props.val.length == 0 || props.val == undefined
			? ["0px", "solid", "#000000", ""]
			: props.val.split(" ");
	var widthVal = valParts[0] != undefined ? valParts[0] : "0px";
	var styleVal = valParts[1] != undefined ? valParts[1] : "solid";
	var colorVal = valParts[2] != undefined ? valParts[2] : "#000000";
	var importantVal = valParts[3] != undefined ? valParts[3] : "";
	var outlineStyleArgs = {
		none: { label: "None", value: "none" },
		hidden: { label: "Hidden", value: "hidden" },
		dotted: { label: "Dotted", value: "dotted" },
		dashed: { label: "Dashed", value: "dashed" },
		solid: { label: "Solid", value: "solid" },
		double: { label: "Double", value: "double" },
		groove: { label: "Groove", value: "groove" },
		ridge: { label: "Ridge", value: "ridge" },
		inset: { label: "Inset", value: "inset" },
		outset: { label: "Outset", value: "outset" },
	};
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
	var widthValX =
		widthVal.match(/-?\d+/g) != null ? widthVal.match(/-?\d+/g)[0] : 1;
	var widthUnitX =
		widthVal.match(/[a-zA-Z%]+/g) != null
			? widthVal.match(/[a-zA-Z%]+/g)[0]
			: "px";
	const [widthValY, setwidthVal] = useState(widthValX);
	const [widthUnitY, setwidthUnit] = useState(widthUnitX);
	const [outlineimportantVal, setoutlineimportantVal] = useState(
		importantVal.includes(" !important") ? true : false
	);
	return (
		<div>
			<div className="my-2">
				<label htmlFor="">{__("Width", "combo-blocks")}</label>
				<div className="flex justify-between items-center">
					<InputControl
						value={widthValY}
						type="number"
						onChange={(newVal) => {
							setwidthVal(newVal);
							if (outlineimportantVal) {
								props.onChange(
									newVal +
									widthUnitY +
									" " +
									styleVal +
									" " +
									colorVal +
									" " +
									"!important",
									"columnRule"
								);
							} else {
								props.onChange(
									newVal + widthUnitY + " " + styleVal + " " + colorVal,
									"columnRule"
								);
							}
						}}
					/>
					<div>
						<Dropdown
							position="bottom right"
							renderToggle={({ isOpen, onToggle }) => (
								<Button title="" onClick={onToggle} aria-expanded={isOpen}>
									<div className=" ">
										{unitArgs[widthUnitY] == undefined
											? "Select..."
											: unitArgs[widthUnitY].label}
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
													if (outlineimportantVal) {
														props.onChange(
															widthValY +
															x.value +
															" " +
															styleVal +
															" " +
															colorVal +
															" " +
															"!important",
															"columnRule"
														);
													} else {
														props.onChange(
															widthValY +
															x.value +
															" " +
															styleVal +
															" " +
															colorVal,
															"columnRule"
														);
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
				</div>
			</div>
			<div className="my-2 flex justify-between items-center">
				<label htmlFor="">{__("Style", "combo-blocks")}</label>
				<Dropdown
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							title={__("Clear", "combo-blocks")}
							onClick={onToggle}
							aria-expanded={isOpen}>
							<div className=" ">
								{outlineStyleArgs[styleVal] == undefined
									? "Select..."
									: outlineStyleArgs[styleVal].label}
							</div>
						</Button>
					)}
					renderContent={() => (
						<div className="w-32">
							{Object.entries(outlineStyleArgs).map((arg) => {
								var index = arg[0];
								var x = arg[1];
								return (
									<div
										className={
											"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
										}
										onClick={(ev) => {
											if (outlineimportantVal) {
												props.onChange(
													widthVal +
													" " +
													x.value +
													" " +
													colorVal +
													" " +
													"!important",
													"columnRule"
												);
											} else {
												props.onChange(
													widthVal + " " + x.value + " " + colorVal,
													"columnRule"
												);
											}
										}}>
										{!x.value && <div>{__("Reset", "combo-blocks")}</div>}
										{x.value && <>{x.label}</>}
									</div>
								);
							})}
						</div>
					)}
				/>
			</div>
			<label htmlFor="">{__("Color", "combo-blocks")}</label>
			<PGColorPicker
				value={colorVal}
				colors={colorsPresets}
				enableAlpha
				onChange={(newVal) => {
					if (outlineimportantVal) {
						props.onChange(
							widthVal + " " + styleVal + " " + newVal + " " + "!important",
							"columnRule"
						);
					} else {
						props.onChange(
							widthVal + " " + styleVal + " " + newVal,
							"columnRule"
						);
					}
				}}
			/>
			<ToggleControl
				help={
					outlineimportantVal
						? __("Important Enabled", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={outlineimportantVal}
				onChange={(arg) => {
					setoutlineimportantVal((outlineimportantVal) => !outlineimportantVal);
					if (outlineimportantVal) {
						props.onChange(
							widthVal + " " + styleVal + " " + colorVal,
							"columnRule"
						);
					} else {
						props.onChange(
							widthVal + " " + styleVal + " " + colorVal + " " + "!important",
							"columnRule"
						);
					}
				}}
			/>
		</div>
	);
}
class PGcssColumnRule extends Component {
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
		const { val, onChange } = this.props;
		return (
			<div>
				<Html val={val} onChange={onChange} warn={this.state.showWarning} />
			</div>
		);
	}
}
export default PGcssColumnRule;
