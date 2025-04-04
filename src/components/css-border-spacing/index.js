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
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var valZ =
		props.val == null || props.val == undefined || props.val.length == 0
			? "1px 1px #000000"
			: props.val;
	var valParts =
		valZ != undefined ? valZ.split(" ") : ["1px", "1px", "#000000"];
	var horizontalVal = valParts[0];
	var vericalVal = valParts[1];
	var colorVal = valParts[2];
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		// auto: { "label": "AUTO", "value": "auto" },
		// "%": { "label": "%", "value": "%" },
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
		initial: { label: "initial", value: "initial" },
		inherit: { label: "inherit", value: "inherit" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
	};
	var horizontalValX =
		horizontalVal != undefined ? horizontalVal.match(/-?\d+/g)[0] : 1;
	var horizontalUnitX =
		horizontalVal != undefined ? horizontalVal.match(/[a-zA-Z%]+/g)[0] : "px";
	var vericalValX = vericalVal != undefined ? vericalVal.match(/-?\d+/g)[0] : 1;
	var vericalUnitX =
		vericalVal != undefined ? vericalVal.match(/[a-zA-Z%]+/g)[0] : "px";
	const [horizontalValY, sethorizontalVal] = useState(horizontalValX);
	const [horizontalUnitY, sethorizontalUnit] = useState(horizontalUnitX);
	const [vericalValY, setvericalVal] = useState(vericalValX);
	const [vericalUnitY, setvericalUnit] = useState(vericalUnitX);
	const [outlinehorizontalVal, setoutlinehorizontalVal] =
		useState(horizontalVal);
	const [outlinevericalVal, setoutlinevericalVal] = useState(vericalVal);
	const [outlineColorVal, setoutlineColorVal] = useState(colorVal);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	return (
		<div>
			<div className="grid grid-cols-2 gap-2">
				<div className="my-2">
					<label htmlFor="">{__("Horizontal", "combo-blocks")}</label>
					<div className="flex justify-between items-center">
						<InputControl
							value={horizontalValY}
							type="number"
							onChange={(newVal) => {
								sethorizontalVal(newVal);
								props.onChange(
									newVal + horizontalUnitY + " " + outlinevericalVal,
									"borderSpacing"
								);
							}}
						/>
						<div>
							<Dropdown
								position="bottom right"
								renderToggle={({ isOpen, onToggle }) => (
									<Button title="" onClick={onToggle} aria-expanded={isOpen}>
										<div className=" ">
											{horizontalUnitY != undefined
												? unitArgs[horizontalUnitY].label
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
														sethorizontalUnit(x.value);
														props.onChange(
															horizontalValY +
															x.value +
															" " +
															outlinevericalVal,
															"borderSpacing"
														);
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
				<div className="my-2">
					<label htmlFor="">{__("Verical", "combo-blocks")}</label>
					<div className="flex justify-between items-center">
						<InputControl
							value={vericalValY}
							type="number"
							onChange={(newVal) => {
								setvericalVal(newVal);
								props.onChange(
									outlinehorizontalVal + " " + newVal + vericalUnitY,
									"borderSpacing"
								);
							}}
						/>
						<div>
							<Dropdown
								position="bottom right"
								renderToggle={({ isOpen, onToggle }) => (
									<Button title="" onClick={onToggle} aria-expanded={isOpen}>
										<div className=" ">
											{vericalUnitY != undefined
												? unitArgs[vericalUnitY].label
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
														setvericalUnit(x.value);
														props.onChange(
															outlinehorizontalVal +
															" " +
															vericalValY +
															x.value,
															"borderSpacing"
														);
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
						props.onChange(
							horizontalVal + " " + vericalVal + " ",
							"borderSpacing"
						);
					} else {
						props.onChange(
							horizontalVal + " " + vericalVal + " " + " !important",
							"borderSpacing"
						);
					}
				}}
			/>
		</div>
	);
}
class PGcssBorderSpacing extends Component {
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
		var args = {
			fill: { label: "fill", value: "fill" },
			contain: { label: "contain", value: "contain" },
			cover: { label: "cover", value: "cover" },
			"scale-down": { label: "scale-down", value: "scale-down" },
			none: { label: "none", value: "none" },
		};
		return (
			<div>
				<Html val={val} onChange={onChange} warn={this.state.showWarning} />
			</div>
		);
	}
}
export default PGcssBorderSpacing;
