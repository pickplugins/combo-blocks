import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSFlexDirection = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		row: { label: "row", value: "row" },
		"row-reverse": { label: "row-reverse", value: "row-reverse" },
		column: { label: "column", value: "column" },
		"column-reverse": { label: "column-reverse", value: "column-reverse" },
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
			<label htmlFor="flex-direction" className="flex-1">
				Flex Direction
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<select
					value={align}
					onChange={(ev) => {
						const selectedValue = ev.target.value;
						if (isImportant) {
							onChange(selectedValue + " !important", "flexDirection");
						} else {
							onChange(selectedValue, "flexDirection");
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
							onChange(align, "flexDirection");
						} else {
							onChange(align + " !important", "flexDirection");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSFlexDirection;
