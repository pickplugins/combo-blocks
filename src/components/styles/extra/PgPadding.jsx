import React, { useEffect, useState } from "react";
import {
	ToggleControl,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
// import { closeSmall, formatCapitalize, formatLowercase, formatUppercase, Icon } from "@wordpress/icons";

const PgCSSPadding = ({ val, onChange, breakPoint, sudoSrc }) => {
	if (typeof val == "object") {
		var topX = val.top;
		var rightX = val.right;
		var bottomX = val.bottom;
		var leftX = val.left;
		var important = "";
		var valParts = [topX, rightX, bottomX, leftX, ""];
	} else {
		var valParts =
			val != undefined ? val.split(" ") : ["5px", "5px", "5px", "5px", ""];
		var topX = valParts[0];
		var rightX = valParts[1];
		var bottomX = valParts[2];
		var leftX = valParts[3];
		var important = valParts[4];
	}
	const [valX, setvalX] = useState({
		top: topX,
		right: rightX,
		bottom: bottomX,
		left: leftX,
	});
	const [isImportant, setImportant] = useState(
		valParts.includes("!important") ? true : false
	);
	useEffect(() => {
		if (typeof val == "object") {
			topX = val.top;
			rightX = val.right;
			bottomX = val.bottom;
			leftX = val.left;
			important = "";
			valParts = [topX, rightX, bottomX, leftX, ""];
		} else {
			valParts = val != undefined ? val.split(" ") : val;
			topX = valParts[0];
			rightX = valParts[1];
			bottomX = valParts[2];
			leftX = valParts[3];
			important = valParts[4];
		}
		setvalX({
			top: topX,
			right: rightX,
			bottom: bottomX,
			left: leftX,
		});
		setImportant(valParts.includes("!important") ? true : false);
		// setValArgs(val.split(" "));
	}, [val, breakPoint, sudoSrc]);
	return (
		<div className="w-full relative">
			<div className="flex items-start justify-between">
				<label htmlFor="padding">Padding</label>
			</div>
			<BoxControl
				label=""
				values={valX}
				onChange={(nextValues) => {
					setvalX({
						top: nextValues.top,
						right: nextValues.right,
						bottom: nextValues.bottom,
						left: nextValues.left,
					});
					if (isImportant) {
						onChange(
							nextValues.top +
							" " +
							nextValues.right +
							" " +
							nextValues.bottom +
							" " +
							nextValues.left +
							" !important",
							"padding"
						);
					} else {
						onChange(
							nextValues.top +
							" " +
							nextValues.right +
							" " +
							nextValues.bottom +
							" " +
							nextValues.left,
							"padding"
						);
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
				className="absolute !top-[20px] !right-[80px]"
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						onChange(
							valX.top + " " + valX.right + " " + valX.bottom + " " + valX.left,
							"padding"
						);
					} else {
						onChange(
							valX.top +
							" " +
							valX.right +
							" " +
							valX.bottom +
							" " +
							valX.left +
							" !important",
							"padding"
						);
					}
				}}
			/>
		</div>
	);
};

export default PgCSSPadding;
