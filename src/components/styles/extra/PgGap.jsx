import React, { useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSGap = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
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
	};

	var valZ = typeof val === "object" ? val.target.value : val;
	var valX =
		valZ == undefined || valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g) == null
			? 0
			: valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g)[0];
	var unitX =
		valZ == undefined || valZ.match(/[a-zA-Z%]+/g) == null
			? "px"
			: valZ.match(/[a-zA-Z%]+/g)[0];
	const [valueX, setValueX] = useState(valX);
	const [unit, setUnit] = useState(unitX);
	useEffect(() => {
		setValueX(valX);
		setUnit(unitX);
	}, [val, breakPoint, sudoSrc]);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	return (
		<div className="flex justify-between gap-2 items-start">
			<label htmlFor="font-size">Gap</label>
			<div className="flex gap-1 items-start">
				<InputControl
					className="w-16 !leading-3"
					id="font-size"
					value={valueX}
					type="number"
					step={0.01}
					onChange={(newVal) => {
						var v = newVal;
						setValueX(v);
						if (unit == "auto") {
							if (isImportant) {
								onChange(unit + " !important", "gap");
							} else {
								onChange(unit, "gap");
							}
						} else {
							if (isImportant) {
								onChange(v + unit + " !important", "gap");
							} else {
								onChange(v + unit, "gap");
							}
						}
					}}
				/>
				<div>
					<select
						value={unit}
						onChange={(ev) => {
							const selectedValue = ev.target.value;
							setUnit(selectedValue);
							if (selectedValue == "auto") {
								if (isImportant) {
									onChange(selectedValue + " !important", "gap");
								} else {
									onChange(selectedValue, "gap");
								}
							} else {
								if (isImportant) {
									onChange(valueX + selectedValue + " !important", "gap");
								} else {
									onChange(valueX + selectedValue, "gap");
								}
							}
						}}>
						{Object.entries(args).map((y) => {
							var index = y[0];
							var x = y[1];
							return (
								<option key={index} value={x.value}>
									{x.label}
								</option>
							);
						})}
					</select>
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
							if (unit == "auto") {
								onChange(unit, "gap");
							} else {
								onChange(valueX + unit, "gap");
							}
						} else {
							if (unit == "auto") {
								onChange(unit + " !important", "gap");
							} else {
								onChange(valueX + unit + " !important", "gap");
							}
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSGap;
