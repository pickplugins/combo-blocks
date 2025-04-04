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

const PgCSSTextTransform = ({ val, onChange, breakPoint, sudoSrc }) => {
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
			<label htmlFor="text-transform">Text Transform</label>
			<div className="flex items-start justify-between w-full">
				<div className="flex items-center justify-around gap-1">
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer
							${align === "capitalize" ? "bg-blue-600 text-white " : ""}
						`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("capitalize", "textTransform");
							} else {
								onChange("capitalize" + " !important", "textTransform");
							}
							setalign("capitalize");
							// onChange("capitalize", "textTransform", );
						}}>
						<Icon icon={formatCapitalize} size={24} />
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "uppercase" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("uppercase", "textTransform");
							} else {
								onChange("uppercase" + " !important", "textTransform");
							}
							setalign("uppercase");
							// onChange("uppercase", "textTransform", );
						}}>
						<Icon icon={formatUppercase} size={24} />
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "lowercase" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("lowercase", "textTransform");
							} else {
								onChange("lowercase" + " !important", "textTransform");
							}
							setalign("lowercase");
							// onChange("lowercase", "textTransform", );
						}}>
						<Icon icon={formatLowercase} size={24} />
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "none" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("none", "textTransform");
							} else {
								onChange("none" + " !important", "textTransform");
							}
							setalign("none");
							// onChange("none", "textTransform", );
						}}>
						<Icon icon={closeSmall} size={24} />
					</div>
				</div>
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
							onChange(align, "textTransform");
						} else {
							onChange(align + " !important", "textTransform");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSTextTransform;
