import React, { useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSOpacity = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
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

	var valZ = typeof val === "object" ? val.target.value : val;
	var valX =
		valZ == undefined || valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g) == null
			? 0
			: valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g)[0];

	const [valueX, setValueX] = useState(valX);
	useEffect(() => {
		setValueX(valX);
	}, [val, breakPoint, sudoSrc]);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	return (
		<div className="w-full flex flex-col items-start gap-1">
			<label htmlFor="opacity" className="flex-1">
				Opacity
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<InputControl
					className="w-16 !leading-3"
					id="font-size"
					value={valueX}
					type="number"
					min="0"
					max="1"
					step="0.01"
					onChange={(newVal) => {
						var v = newVal;
						setValueX(v);
						if (isImportant) {
							onChange(v, " !important", "opacity");
						} else {
							onChange(v, "opacity");
						}
					}}
				/>
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
							onChange(valueX, "opacity");
						} else {
							onChange(valueX, " !important", "opacity");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSOpacity;
