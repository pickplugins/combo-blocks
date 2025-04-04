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
import { RichText } from "@wordpress/block-editor";
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
function Html(props) {
	if (!props.warn) {
		return null;
	}



	const [typingText, settypingText] = useState(props.typingText);
	var [rules, setrules] = useState(
		typingText?.rules == null || typingText?.rules == undefined
			? []
			: typingText.rules
	);
	useEffect(() => {
		props.onChange(typingText);
	}, [typingText]);
	useEffect(() => {
		var typingTextX = { ...typingText };
		typingTextX.rules = rules;
		settypingText(typingTextX);
	}, [rules]);
	// var tiltOptions = [
	// 	{
	// 		label: "Strings",
	// 		id: "strings",
	// 		value: [
	// 			"These are the default values...",
	// 			"You know what you should do?",
	// 			"Use your own!",
	// 			"Have a great day!",
	// 		],
	// 	},
	// 	{ label: "Type Speed", id: "typeSpeed", value: 0 },
	// 	{ label: "Start Delay", id: "startDelay", value: 0 },
	// 	{ label: "Back Speed", id: "backSpeed", value: 0 },
	// 	{ label: "Smart Backspace", id: "smartBackspace", value: true },
	// 	{ label: "Shuffle", id: "shuffle", value: false },
	// 	{ label: "Back Delay", id: "backDelay", value: 700 },
	// 	{ label: "Fade Out", id: "fadeOut", value: false },
	// 	{ label: "Loop", id: "loop", value: false },
	// 	{ label: "Show Cursor", id: "showCursor", value: true },
	// ];

	var typingProps = {
		strings: {
			label: "Strings",
			id: "strings",
			value: [
				"These are the default values...",
				"You know what you should do?",
				"Use your own!",
				"Have a great day!",
			],
		},
		typeSpeed: { label: "Type Speed", id: "typeSpeed", value: 0 },
		startDelay: { label: "Start Delay", id: "startDelay", value: 0 },
		backSpeed: { label: "Back Speed", id: "backSpeed", value: 0 },
		smartBackspace: {
			label: "Smart Backspace",
			id: "smartBackspace",
			value: true,
		},
		shuffle: { label: "Shuffle", id: "shuffle", value: false },
		backDelay: { label: "Back Delay", id: "backDelay", value: 700 },
		fadeOut: { label: "Fade Out", id: "fadeOut", value: false },
		loop: { label: "Loop", id: "loop", value: false },
		showCursor: { label: "Show Cursor", id: "showCursor", value: true },
	};
	var RemovetypingTextGroup = function ({ title, index }) {
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
				<span className="whitespace-nowrap">{title}</span>
			</span>
		);
	};
	return (
		<div className="relative pg-setting-input-text">
			<PanelRow className="my-3">
				<label>{__("Add Option", "combo-blocks")}</label>
				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle="Choose"
					options={typingProps}
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
						<PanelRow
							className={`my-3 flex gap-2  ${group.id == "strings"
									? "flex-col items-start"
									: "justify-between"
								}`}>
							<RemovetypingTextGroup
								title={typingProps[group.id].label}
								index={groupIndex}
							/>
							{group.id == "strings" && (
								<>
									<button
										className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600"
										onClick={() => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = [
												...rulesX[groupIndex].value,
												"",
											]; // Add an empty string
											setrules(rulesX);
										}}>
										{__("Add String", "combo-blocks")}
									</button>
									{group.value.map((string, i) => (
										<RichText
											key={i}
											tagName={"div"}
											className="border border-solid border-gray-500 rounded-md p-1 min-h-[50px] flex-1 w-full"
											value={string}
											allowedFormats={["core/bold", "core/italic", "core/link"]}
											onChange={(newValue) => {
												var rulesX = [...rules];
												rulesX[groupIndex].value[i] = newValue; // Update the specific string
												setrules(rulesX);
											}}
											placeholder={__("Start Writing...")}
										/>
									))}
								</>
							)}
							{(group.id == "typeSpeed" ||
								group.id == "startDelay" ||
								group.id == "backSpeed" ||
								group.id == "backDelay") && (
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
							{(group.id == "smartBackspace" ||
								group.id == "shuffle" ||
								group.id == "fadeOut" ||
								group.id == "loop" ||
								group.id == "showCursor") && (
									<>
										<ToggleControl
											checked={rules[groupIndex].value}
											onChange={(newValue) => {
												var rulesX = [...rules];
												rulesX[groupIndex].value = newValue;
												setrules(rulesX);
											}}
										/>
									</>
								)}
						</PanelRow>
					);
				})}
			</div>
		</div>
	);
}
class PGTypingText extends Component {
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
			typingText,
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
					typingText={typingText}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGTypingText;
