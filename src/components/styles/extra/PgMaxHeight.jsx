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

const PgCSSMaxHeight = ({ val, onChange, breakPoint, sudoSrc }) => {
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
			val === "none" ||
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
				<label htmlFor="max-height">Max Height</label>
			</div>
			{(widthUnit != "max-content" ||
				widthUnit != "min-content" ||
				widthUnit != "none" ||
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
										widthGlobal === "none" ||
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
										// onChange(newVal, "maxHeight", );
										if (isImportant) {
											onChange(newVal + " !important", "maxHeight");
										} else {
											onChange(newVal, "maxHeight");
										}
										return;
									}
									setwidthVal(newVal);
									if (widthUnit == "auto") {
										// onChange(widthUnit, 'width');
										if (isImportant) {
											onChange(widthUnit + " !important", "maxHeight");
										} else {
											onChange(widthUnit, "maxHeight");
										}
									} else {
										//onChange(newVal + widthUnit, 'width');
										if (isImportant) {
											onChange(newVal + widthUnit + " !important", "maxHeight");
										} else {
											onChange(newVal + widthUnit, "maxHeight");
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
																onChange(x.value + " !important", "maxHeight");
															} else {
																onChange(x.value, "maxHeight");
															}
														} else {
															if (isImportant) {
																onChange(
																	widthVal + x.value + " !important",
																	"maxHeight"
																);
															} else {
																onChange(widthVal + x.value, "maxHeight");
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
									// onChange(newVal, "maxHeight", );
									if (isImportant) {
										var valX = val.replaceAll(" !important", "");
										onChange(valX, "maxHeight");
										// onChange(val + " !important", "maxHeight", );
									} else {
										// var valX = val.replaceAll(" !important", "");
										// onChange(valX, "maxHeight", );
										onChange(val + " !important", "maxHeight");
									}
									return;
								}
								if (isImportant) {
									if (widthUnit == "auto") {
										onChange(widthUnit, "maxHeight");
									} else {
										onChange(widthVal + widthUnit, "maxHeight");
									}
								} else {
									if (widthUnit == "auto") {
										onChange(widthUnit + " !important", "maxHeight");
									} else {
										onChange(widthVal + widthUnit + " !important", "maxHeight");
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
							{ label: "none", value: "none" },
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
								newVal == "none" ||
								newVal == "max-content" ||
								newVal == "min-content" ||
								newVal == "inherit" ||
								newVal == "initial" ||
								newVal == "revert" ||
								newVal == "revert-layer" ||
								newVal == "unset"
							) {
								if (isImportant) {
									onChange(newVal + " !important", "maxHeight");
								} else {
									onChange(newVal, "maxHeight");
								}
							} else {
								if (isImportant) {
									onChange(widthVal + newVal + " !important", "maxHeight");
								} else {
									onChange(widthVal + newVal, "maxHeight");
								}
							}
						}}
					/>
				</PanelRow>
			</div>
		</div>
	);
};

export default PgCSSMaxHeight;
