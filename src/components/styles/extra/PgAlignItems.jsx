import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSAlignItems = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		stretch: { label: "stretch", value: "stretch" },
		center: { label: "center", value: "center" },
		"flex-start": { label: "flex start	", value: "flex-start" },
		"flex-end": { label: "flex end	", value: "flex-end" },
		"space-between": { label: "space between", value: "space-between" },
		"space-around": { label: "space around", value: "space-around" },
		"space-evenly": { label: "space evenly", value: "space-evenly" },
		start: { label: "start", value: "start" },
		end: { label: "end", value: "end" },
		normal: { label: "normal", value: "normal" },
		start: { label: "start", value: "start" },
		baseline: { label: "baseline", value: "baseline" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
		inherit: { label: "inherit", value: "inherit" },
		initial: { label: "initial", value: "initial" },
	};
	const [valArgs, setValArgs] = useState(val.split(" "));
	const [align, setalign] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	useEffect(() => {
		setValArgs(val.split(" "));
	}, [val, breakPoint, sudoSrc]);
	useEffect(() => {
		setalign(valArgs[0]);
		setImportant(valArgs[1] == undefined ? false : true);
	}, [valArgs]);
	return (
		<div className="w-full flex flex-col items-start gap-1">
			<label htmlFor="align-items" className="flex-1">
				Align Items
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<select
					value={align}
					onChange={(ev) => {
						const selectedValue = ev.target.value;
						if (isImportant) {
							onChange(selectedValue + " !important", "alignItems");
						} else {
							onChange(selectedValue, "alignItems");
						}
						setalign(selectedValue);
					}}>
					{Object.entries(args).map((item, i) => {
						var x = item[1];
						return (
							<option key={i} value={x.value}>
								{x.label}
							</option>
						);
					})}
				</select>
				<ToggleControl
					help={
						isImportant
							? __("(Enabled)", "combo-blocks")
							: __("Important?", "combo-blocks")
					}
					checked={isImportant}
					onChange={(arg) => {
						setImportant((isImportant) => !isImportant);
						if (isImportant) {
							onChange(align, "alignItems");
						} else {
							onChange(align + " !important", "alignItems");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSAlignItems;
