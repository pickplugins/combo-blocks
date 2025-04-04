import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSPosition = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		static: { label: "static", value: "static" },
		absolute: { label: "absolute", value: "absolute" },
		fixed: { label: "fixed", value: "fixed" },
		relative: { label: "relative", value: "relative" },
		sticky: { label: "sticky", value: "sticky" },
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
			<label htmlFor="position" className="flex-1">
				Position
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<select
					value={align}
					onChange={(ev) => {
						const selectedValue = ev.target.value;
						if (isImportant) {
							onChange(selectedValue + " !important", "position");
						} else {
							onChange(selectedValue, "position");
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
							onChange(align, "position");
						} else {
							onChange(align + " !important", "position");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSPosition;
