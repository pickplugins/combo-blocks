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
import { Icon, close, copy, pages } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [tilt, settilt] = useState(props.tilt);
	var [rules, setrules] = useState(
		tilt?.rules == null || tilt?.rules == undefined ? [] : tilt.rules
	);
	// useEffect(() => {
	// 	props.onChange(tilt);
	// }, [tilt]);
	useEffect(() => {
		var tiltX = { ...tilt };
		tiltX.rules = rules;
		props.onChange(tiltX);
		// settilt(tiltX);
	}, [rules]);
	var tiltProps = {
		reverse: { label: "Reverse", id: "reverse", value: false },
		max: { label: "Max", id: "max", value: 35 },
		startX: { label: "Start X", id: "startX", value: 0 },
		startY: { label: "Start Y", id: "startY", value: 0 },
		perspective: { label: "Perspective", id: "perspective", value: 1000 },
		scale: { label: "Scale", id: "scale", value: 1 },
		speed: { label: "Speed", id: "speed", value: 300 },
		transition: { label: "Transition", id: "transition", value: true },
		axis: { label: "Axis", id: "axis", value: null },
		reset: { label: "Reset", id: "reset", value: true },
		resetToStart: {
			label: "Reset To Start",
			id: "reset-to-start",
			value: true,
		},
		easing: {
			label: "Easing",
			id: "easing",
			value: "cubic-bezier(.03,.98,.52,.99)",
		},
		glare: { label: "Glare", id: "glare", value: false },
		maxGlare: { label: "Max Glare", id: "max-glare", value: 1 },
		glarePrerender: {
			label: "Glare Prerender",
			id: "glare-prerender",
			value: false,
		},
		mouseEventElement: {
			label: "Mouse Event Element",
			id: "mouse-event-element",
			value: null,
		},
		gyroscope: { label: "Gyroscope", id: "gyroscope", value: true },
		gyroscopeMinAngleX: {
			label: "Gyroscope Min Angle X",
			id: "gyroscopeMinAngleX",
			value: -45,
		},
		gyroscopeMaxAngleX: {
			label: "Gyroscope Max Angle X",
			id: "gyroscopeMaxAngleX",
			value: 45,
		},
		gyroscopeMinAngleY: {
			label: "Gyroscope Min Angle Y",
			id: "gyroscopeMinAngleY",
			value: -45,
		},
		gyroscopeMaxAngleY: {
			label: "Gyroscope Max Angle Y",
			id: "gyroscopeMaxAngleY",
			value: 45,
		},
	};
	var RemovetiltGroup = function ({ title, index }) {
		return (
			<span className="flex gap-1 justify-start items-center">
				<span
					className="hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}>
					&times;
				</span>
				<span className={`${title === "Max Glare" ? "whitespace-nowrap" : ""}`}>
					{title}
				</span>
			</span>
		);
	};
	const copyData = (data) => {
		const dataString = JSON.stringify(data, null, 2);
		navigator.clipboard
			.writeText(dataString)
			.then(() => {
				// alert("Data copied to clipboard!");
			})
			.catch((err) => { });
	};
	const pasteData = () => {
		navigator.clipboard
			.readText()
			.then((text) => {
				const parsedData = JSON.parse(text);
				// setVisible(parsedData);
				// var visibleX = { ...parsedData };
				// visibleX.rules = rules;
				// setVisible(visibleX);
				props.onChange(parsedData);
			})
			.catch((err) => { });
	};
	return (
		<div className="relative">
			<PanelRow className="my-3">
				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle={__("Add Option", "combo-blocks")}
					options={tiltProps}
					onChange={(option, index) => {
						var rulesX = [...rules];
						rulesX.push({ id: option.id, value: option.value });
						setrules(rulesX);
					}}
					values=""></PGDropdown>

				<div
					className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
					onClick={() => {
						copyData(rules);
					}}>
					<Icon icon={copy} className="fill-white " size={14} />
					{__("Copy", "combo-blocks")}
				</div>
				<div
					className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
					onClick={() => {
						pasteData();
					}}>
					<Icon icon={pages} className="fill-white " size={14} />
					{__("Paste", "combo-blocks")}
				</div>

			</PanelRow>
			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PanelRow
							className={`my-3 flex gap-2 ${group.id == "gyroscopeMinAngleX" ||
								group.id == "gyroscopeMinAngleY" ||
								group.id == "gyroscopeMaxAngleY" ||
								group.id == "gyroscopeMaxAngleX"
								? "flex-col items-start"
								: "justify-between"
								}`}>
							<RemovetiltGroup
								title={tiltProps[group.id].label}
								index={groupIndex}
							/>
							{/* <label>Event?</label> */}
							{(group.id == "reverse" ||
								group.id == "transition" ||
								group.id == "reset" ||
								group.id == "reset-to-start" ||
								group.id == "glare" ||
								group.id == "glare-prerender" ||
								group.id == "gyroscope") && (
									<ToggleControl
										checked={rules[groupIndex].value}
										onChange={(newValue) => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = newValue;
											setrules(rulesX);
										}}
									/>
								)}
							{(group.id == "max" ||
								group.id == "startX" ||
								group.id == "startY" ||
								// group.id == "perspective" ||
								// group.id == "scale" ||
								// group.id == "speed" ||
								group.id == "gyroscopeMinAngleX" ||
								group.id == "gyroscopeMaxAngleX" ||
								group.id == "gyroscopeMinAngleY" ||
								group.id == "gyroscopeMaxAngleY") && (
									// group.id == "max-glare"
									<>
										<RangeControl
											// label="Columns"
											value={group.value}
											className={`flex-1 ${group.id == "gyroscopeMinAngleX" ||
												group.id == "gyroscopeMaxAngleX" ||
												group.id == "gyroscopeMinAngleY" ||
												group.id == "gyroscopeMaxAngleY"
												? "w-full"
												: ""
												}`}
											// onChange={(value) => setColumns(value)}
											onChange={(newValue) => {
												// var rulesX = [...rules];
												// rulesX[groupIndex]["event"] = option.value;
												// setrules(rulesX);
												var rulesX = [...rules];
												rulesX[groupIndex].value = newValue;
												setrules(rulesX);
											}}
											min={-360}
											max={360}
										/>
									</>
								)}
							{(group.id == "perspective" ||
								group.id == "scale" ||
								group.id == "speed" ||
								group.id == "max-glare") && (
									<>
										<InputControl
											type="number"
											value={group.value}
											onChange={(newValue) => {
												// var rulesX = [...rules];
												// rulesX[groupIndex]["event"] = option.value;
												// setrules(rulesX);
												var rulesX = [...rules];
												rulesX[groupIndex].value = newValue;
												setrules(rulesX);
											}}></InputControl>
									</>
								)}
							{(group.id == "mouse-event-element" || group.id == "axis") && (
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.value == undefined
											? __("Choose", "combo-blocks")
											: group.value
									}
									options={[
										{ label: "NULL", value: "null" },
										{ label: "X", value: "x" },
										{ label: "Y", value: "y" },
									]}
									onChange={(option) => {
										var rulesX = [...rules];
										rulesX[groupIndex].value = option.value;
										setrules(rulesX);
									}}
									values=""></PGDropdown>
							)}
						</PanelRow>
					);
				})}
			</div>
		</div>
	);
}
class PGTilt extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		const {
			position,
			variant,
			btnClass,
			searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			buttonTitle,
			onChange,
			tilt,
			values,
			value,
		} = this.props;
		return (
			<div>
				<Html
					value={value}
					position={position}
					searchPlaceholder={searchPlaceholder}
					btnClass={btnClass}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					tilt={tilt}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGTilt;
