import React, { useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	ToggleControl,
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSMinWidth = ({ val, onChange, breakPoint, sudoSrc }) => {
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
	if (typeof val == "object") {
		var valZ = val.val + val.unit;
	} else {
		var valZ = val == null || val == undefined || val.length == 0 ? "0px" : val;
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
	const [widthGlobal, setwidthGlobal] = useState("");
	useEffect(() => {
		if (typeof val == "object") {
			valZ = val.val + val.unit;
		} else {
			valZ = val == null || val == undefined || val.length == 0 ? "0px" : val;
		}
		setValArgs(valZ.split(" "));
		if (
			val === "auto" ||
			val === "max-content" ||
			val === "min-content" ||
			val === "inherit" ||
			val === "initial" ||
			val === "revert" ||
			val === "revert-layer" ||
			val === "unset"
		) {
			setwidthGlobal(val);
		} else {
			setwidthGlobal("");
		}
	}, [val, breakPoint, sudoSrc]);

	useEffect(() => {
		widthValX =
			valArgs[0] == undefined || valArgs[0].match(/-?\d+/g) == null
				? 0
				: valArgs[0].match(/-?\d+/g)[0];
		widthUnitX =
			valArgs[0] == undefined || valArgs[0].match(/[a-zA-Z%]+/g) == null
				? "px"
				: valArgs[0].match(/[a-zA-Z%]+/g)[0];
		setwidthVal(widthValX);
		setwidthUnit(widthUnitX);
		setImportant(valArgs[1] == undefined ? false : true);
	}, [valArgs]);
	return (
		<div className="w-full">
			<div className="flex items-start justify-between">
				<label htmlFor="min-width">Min Width</label>
			</div>
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
									widthVal.length == 0 || isNaN(widthVal) || val.includes("calc")
										? "text"
										: "number"
								}
								disabled={
									widthGlobal === "auto" ||
										widthGlobal === "max-content" ||
										widthGlobal === "min-content" ||
										widthGlobal === "inherit" ||
										widthGlobal === "initial" ||
										widthGlobal === "revert" ||
										widthGlobal === "revert-layer" ||
										widthGlobal === "unset"
										? true
										: false
								}
								onChange={(newVal) => {
									if (newVal.includes("calc")) {
										// onChange(newVal, "minWidth", );
										if (isImportant) {
											onChange(newVal + " !important", "minWidth");
										} else {
											onChange(newVal, "minWidth");
										}
										return;
									}
									setwidthVal(newVal);
									if (widthUnit == "auto") {
										// onChange(widthUnit, 'width');
										if (isImportant) {
											onChange(widthUnit + " !important", "minWidth");
										} else {
											onChange(widthUnit, "minWidth");
										}
									} else {
										//onChange(newVal + widthUnit, 'width');
										if (isImportant) {
											onChange(newVal + widthUnit + " !important", "minWidth");
										} else {
											onChange(newVal + widthUnit, "minWidth");
										}
									}
								}}
							/>
						)}
						<div className={`${val.includes("calc") ? "hidden" : ""}`}>
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
																onChange(x.value + " !important", "minWidth");
															} else {
																onChange(x.value, "minWidth");
															}
														} else {
															if (isImportant) {
																onChange(
																	widthVal + x.value + " !important",
																	"minWidth"
																);
															} else {
																onChange(widthVal + x.value, "minWidth");
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
								if (val.includes("calc")) {
									// var valX  = val.replaceAll(" !important", "")
									// onChange(newVal, "minWidth", );
									if (isImportant) {
										var valX = val.replaceAll(" !important", "");
										onChange(valX, "minWidth");
										// onChange(val + " !important", "minWidth", );
									} else {
										// var valX = val.replaceAll(" !important", "");
										// onChange(valX, "minWidth", );
										onChange(val + " !important", "minWidth");
									}
									return;
								}
								if (isImportant) {
									if (widthUnit == "auto") {
										onChange(widthUnit, "minWidth");
									} else {
										onChange(widthVal + widthUnit, "minWidth");
									}
								} else {
									if (widthUnit == "auto") {
										onChange(widthUnit + " !important", "minWidth");
									} else {
										onChange(widthVal + widthUnit + " !important", "minWidth");
									}
								}
							}}
						/>
					</div>
				)}
			<div className={`${val.includes("calc") ? "hidden" : ""}`}>
				<PanelRow>
					<label htmlFor="" className="!font-normal">
						{__("Global Value", "combo-blocks")}
					</label>
					<SelectControl
						label=""
						value={widthGlobal}
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
							setwidthGlobal(newVal);
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
									onChange(newVal + " !important", "minWidth");
								} else {
									onChange(newVal, "minWidth");
								}
							} else {
								if (isImportant) {
									onChange(widthVal + newVal + " !important", "minWidth");
								} else {
									onChange(widthVal + newVal, "minWidth");
								}
							}
						}}
					/>
				</PanelRow>
			</div>
		</div>
	);
};

export default PgCSSMinWidth;
