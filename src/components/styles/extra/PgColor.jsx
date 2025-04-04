import React, { useEffect, useState } from "react";
import {
	ColorPalette,
	ToggleControl,
	PanelRow,
	SelectControl,
	Popover,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import colorsPresets from "../../../colors-presets";

const PgCSSColor = ({ val, onChange, breakPoint, sudoSrc }) => {
	const [valArgs, setValArgs] = useState(val.split(" "));
	const [align, setalign] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	const [customColor, setCustomColor] = useState([]);
	const [newColorPreset, setNewColorPreset] = useState([]);
	const [widthGlobal, setwidthGlobal] = useState("");
	useEffect(() => {
		if (window.comboBlocksEditor.colors != undefined) {
			setCustomColor(window.comboBlocksEditor.colors);
		}
	}, [window.comboBlocksEditor]);
	useEffect(() => {
		const transformedColors = customColor.map((color, index) => {
			const name = color.substring(1).toUpperCase();
			const upperCaseColor = color.toUpperCase();
			return {
				name,
				color: upperCaseColor,
			};
		});
		let newColor;
		if (transformedColors.length >= 6) {
			newColor = transformedColors;
		} else {
			newColor = transformedColors.concat(
				colorsPresets.slice(0, 6 - transformedColors.length)
			);
		}
		setNewColorPreset(newColor);
	}, [customColor]);
	useEffect(() => {
		setValArgs(val.split(" "));
		if (
			val === "inherit" ||
			val === "initial" ||
			val === "revert" ||
			val === "revert-layer" ||
			val === "unset"
		) {
			setwidthGlobal(val);
		} else {
			setwidthGlobal("");
		}
	}, [val, breakPoint, sudoSrc]);
	useEffect(() => {
		setalign(valArgs[0]);
		setImportant(valArgs[1] == undefined ? false : true);
	}, [valArgs]);
	return (
		<div className="relative">
			<div className="flex items-start justify-between">
				<label htmlFor="color">Color</label>
			</div>
			<div className={"w-full pg-color-palette"}>
				<ColorPalette
					value={align}
					colors={newColorPreset}
					enableAlpha
					onChange={(newVal) => {
						//props.onChange(sudoSrc,newVal, 'color');
						setalign(newVal);
						if (isImportant) {
							onChange(newVal + " !important", "color");
						} else {
							onChange(newVal, "color");
						}
					}}
				/>
				<div className="flex items-start justify-between gap-1 mt-3">
					<div className="flex gap-1 items-center">
						<label className="!mr-0 !font-normal" htmlFor="">
							{__("Global Value", "combo-blocks")}
						</label>
						<SelectControl
							label=""
							value={widthGlobal}
							options={[
								{ label: __("Choose", "combo-blocks"), value: "" },
								{ label: "Inherit", value: "inherit" },
								{ label: "Initial", value: "initial" },
								{ label: "Revert", value: "revert" },
								{ label: "Revert-layer", value: "revert-layer" },
								{ label: "Unset", value: "unset" },
							]}
							onChange={(newVal) => {
								// setwidthUnit(newVal);
								setwidthGlobal(newVal);
								if (isImportant) {
									onChange(newVal + " !important", "color");
								} else {
									onChange(newVal, "color");
								}
							}}
						/>
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
								onChange(align, "color");
							} else {
								onChange(align + " !important", "color");
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default PgCSSColor;
