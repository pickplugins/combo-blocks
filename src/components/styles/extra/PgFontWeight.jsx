import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	closeSmall,
	formatCapitalize,
	formatLowercase,
	formatUppercase,
	Icon,
} from "@wordpress/icons";

const PgCSSFontWeight = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		normal: { label: "normal", value: "normal" },
		bold: { label: "bold", value: "bold" },
		bolder: { label: "bolder", value: "bolder" },
		lighter: { label: "lighter", value: "lighter" },
		100: { label: "100", value: "100" },
		200: { label: "200", value: "200" },
		300: { label: "300", value: "300" },
		400: { label: "400", value: "400" },
		500: { label: "500", value: "500" },
		600: { label: "600", value: "600" },
		700: { label: "700", value: "700" },
		800: { label: "800", value: "800" },
		900: { label: "900", value: "900" },
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
			<label htmlFor="font-weight" className="flex-1">
				Font Weight
			</label>
			<div className="flex items-start justify-between gap-1 w-full">
				<select
					value={align}
					onChange={(ev) => {
						const selectedValue = ev.target.value;
						if (isImportant) {
							onChange(selectedValue + " !important", "fontWeight");
						} else {
							onChange(selectedValue, "fontWeight");
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
							onChange(align, "fontWeight");
						} else {
							onChange(align + " !important", "fontWeight");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSFontWeight;
