import React, { useEffect, useState } from "react";
import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSTextAlign = ({ val, onChange, breakPoint, sudoSrc }) => {
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
			<label htmlFor="text-align">Text Align</label>
			<div className="flex items-start w-full justify-between">
				<div className="flex items-center justify-around gap-1">
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer
							${align === "left" ? "bg-blue-600 text-white " : ""}
						`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("left", "textAlign");
							} else {
								onChange("left" + " !important", "textAlign");
							}
							setalign("left");
							// onChange("left", "textAlign", );
						}}>
						<svg
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path d="M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"></path>
						</svg>
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "center" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("center", "textAlign");
							} else {
								onChange("center" + " !important", "textAlign");
							}
							setalign("center");
							// onChange("center", "textAlign", );
						}}>
						<svg
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path d="M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"></path>
						</svg>
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "right" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("right", "textAlign");
							} else {
								onChange("right" + " !important", "textAlign");
							}
							setalign("right");
							// onChange("right", "textAlign", );
						}}>
						<svg
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path d="M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"></path>
						</svg>
					</div>
					<div
						className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "justify" ? "bg-blue-600 text-white " : ""
							}`}
						onClick={(ev) => {
							if (!isImportant) {
								onChange("justify", "textAlign");
							} else {
								onChange("justify" + " !important", "textAlign");
							}
							setalign("justify");
							// onChange("justify", "textAlign", );
						}}>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg">
							<rect width="20" height="2.35838" fill="black" />
							<rect y="10.8208" width="20" height="2.35838" fill="black" />
							<rect y="21.6416" width="20" height="2.35838" fill="black" />
						</svg>
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
							onChange(align, "textAlign");
						} else {
							onChange(align + " !important", "textAlign");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSTextAlign;
