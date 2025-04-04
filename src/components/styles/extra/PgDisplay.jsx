import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSDisplay = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		none: { label: "None", value: "none" },
		block: { label: "Block", value: "block" },
		inline: { label: "Inline", value: "inline" },
		"inline-block": { label: "Inline Block", value: "inline-block" },
		grid: { label: "Grid", value: "grid" },
		flex: { label: "Flex", value: "flex" },
		contents: { label: "contents", value: "contents" },
		"inline-flex": { label: "inline-flex", value: "inline-flex" },
		"inline-grid": { label: "inline-grid", value: "inline-grid" },
		"inline-table": { label: "inline-table", value: "inline-table" },
		"list-item": { label: "list-item", value: "list-item" },
		// 'run-in': { "label": "run-in", "value": "run-in" },
		table: { label: "table", value: "table" },
		"table-caption": { label: "table-caption", value: "table-caption" },
		"table-column-group": {
			label: "table-column-group",
			value: "table-column-group",
		},
		"table-header-group": {
			label: "table-header-group",
			value: "table-header-group",
		},
		"table-footer-group": {
			label: "table-footer-group",
			value: "table-footer-group",
		},
		"table-row-group": { label: "table-row-group", value: "table-row-group" },
		"table-cell": { label: "table-cell", value: "table-cell" },
		"table-column": { label: "table-column", value: "table-column" },
		"table-row": { label: "table-row", value: "table-row" },
		"flow-root": { label: "flow-root", value: "flow-root" },
		"inline-grid": { label: "inline-grid", value: "inline-grid" },
		initial: { label: "initial", value: "initial" },
		inherit: { label: "inherit", value: "inherit" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
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
			<label htmlFor="display" className="flex-1">
				Display
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<select
					value={align}
					onChange={(ev) => {
						const selectedValue = ev.target.value;
						if (isImportant) {
							onChange(selectedValue + " !important", "display");
						} else {
							onChange(selectedValue, "display");
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
							onChange(align, "display");
						} else {
							onChange(align + " !important", "display");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSDisplay;
