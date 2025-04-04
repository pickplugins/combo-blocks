import React from "react";
import {
	Button,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dropdown,
	Popover,
	SelectControl,
	RangeControl,
	Panel,
	DropdownMenu,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";

import { __ } from "@wordpress/i18n";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import {
	useState,
	useEffect,
	Component,
	RawHTML,
	////
	useRef,
	////
} from "@wordpress/element";
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGtoggle from "../toggle";
const PGChartOptions = ({ obj, onChange, objFor, props }) => {
	const [tilt, settilt] = useState(obj);
	var [rules, setrules] = useState(
		tilt?.rules == null || tilt?.rules == undefined ? [] : tilt.rules
	);

	useEffect(() => {
		var tiltX = { ...tilt };
		tiltX.rules = rules;
		onChange(tiltX);
		// settilt(tiltX);
	}, [rules]);

	var RemoveOptionGroup = function ({ title, index }) {
		return (
			<span className="flex gap-1 justify-start items-center">
				<span
					className="hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal cursor-pointer"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}>
					&times;
				</span>
				<span className="">{title}</span>
			</span>
		);
	};
	return (
		<div>
			<PanelRow className="my-3">
				<label>{__("Add Option", "combo-blocks")}</label>
				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle="Choose"
					options={props}
					onChange={(option, index) => {
						var rulesX = [...rules];
						rulesX.push({ id: option.id, value: option.value });
						setrules(rulesX);
					}}
					values=""></PGDropdown>
			</PanelRow>
			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PanelRow className="my-3 flex gap-2">
							<RemoveOptionGroup
								title={props[group.id].label}
								index={groupIndex}
							/>
							{/* //*Toggle Control */}
							{(group.id == "display" ||
								group.id == "fullSize" ||
								group.id === "rtl" ||
								group.id === "reverse" ||
								group.id === "enabled" ||
								group.id === "displayColors" ||
								group.id === "usePointStyle" ||
								group.id === "autoPadding" ||
								group.id === "intersect") && (
									<ToggleControl
										checked={rules[groupIndex].value}
										onChange={(newValue) => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = newValue;
											setrules(rulesX);
										}}
									/>
								)}
							{/* //*Dropdown */}
							{(group.id === "position" ||
								group.id === "align" ||
								group.id === "textDirection" ||
								group.id === "bodyAlign" ||
								group.id === "footerAlign" ||
								group.id === "titleAlign") &&
								(() => {
									let xyz = [];
									if (group.id === "position") {
										if (objFor === "legend") {
											xyz = [
												{ label: "Top", value: "top" },
												{ label: "Left", value: "left" },
												{ label: "Bottom", value: "bottom" },
												{ label: "Right", value: "right" },
												{ label: "ChartArea", value: "chartArea" },
											];
										}
										if (objFor === "title" || objFor === "subtitle") {
											xyz = [
												{ label: "Top", value: "top" },
												{ label: "Left", value: "left" },
												{ label: "Bottom", value: "bottom" },
												{ label: "Right", value: "right" },
											];
										}
										if (objFor === "tooltip") {
											xyz = [
												{ label: "Average", value: "average" },
												{ label: "Nearest", value: "nearest" },
											];
										}
									}
									if (group.id === "align") {
										xyz = [
											{ label: "Start", value: "start" },
											{ label: "Center", value: "center" },
											{ label: "End", value: "end" },
										];
									}
									if (
										group.id === "titleAlign" ||
										group.id === "bodyAlign" ||
										group.id === "footerAlign"
									) {
										xyz = [
											{ label: "Left", value: "left" },
											{ label: "Center", value: "center" },
											{ label: "Right", value: "right" },
										];
									}
									if (group.id === "textDirection") {
										xyz = [
											{ label: "Left to Right", value: "ltr" },
											{ label: "Right to Left", value: "rtl" },
										];
									}
									return (
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												group.value === undefined
													? __("Choose", "combo-blocks")
													: group.value
											}
											options={xyz}
											onChange={(option) => {
												const rulesX = [...rules];
												rulesX[groupIndex].value = option.value;
												setrules(rulesX);
											}}
											values=""
										/>
									);
								})()}
							{/* //*Number Input */}
							{(group.id == "maxHeight" ||
								group.id == "maxWidth" ||
								group.id == "speed" ||
								group.id == "titleMarginBottom" ||
								group.id == "titleSpacing" ||
								group.id == "footerMarginBottom" ||
								group.id == "footerSpacing" ||
								group.id == "caretPadding" ||
								group.id == "caretSize" ||
								group.id == "cornerRadius" ||
								group.id == "boxWidth" ||
								group.id == "boxHeight" ||
								group.id == "boxPadding" ||
								group.id == "borderWidth" ||
								group.id == "max-glare") && (
									<>
										<InputControl
											type="number"
											value={group.value}
											onChange={(newValue) => {
												var rulesX = [...rules];
												rulesX[groupIndex].value = newValue;
												setrules(rulesX);
											}}></InputControl>
									</>
								)}
							{/* //*Text Input */}
							{(group.id == "color" ||
								group.id == "backgroundColor" ||
								group.id == "titleColor" ||
								group.id == "bodyColor" ||
								group.id == "footerColor" ||
								group.id == "borderColor" ||
								group.id == "multiKeyBackground" ||
								group.id == "text" ||
								group.id == "speed" ||
								group.id == "max-glare" ||
								group.id == "mode") && (
									<>
										<InputControl
											value={group.value}
											onChange={(newValue) => {
												var rulesX = [...rules];
												rulesX[groupIndex].value = newValue;
												setrules(rulesX);
											}}></InputControl>
									</>
								)}
						</PanelRow>
					);
				})}
			</div>
		</div>
	);
};

export default PGChartOptions;
