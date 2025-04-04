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
	const [tooltip, settooltip] = useState(props.tooltip);
	var [rules, setrules] = useState(
		tooltip?.rules == null || tooltip?.rules == undefined ? [] : tooltip.rules
	);
	useEffect(() => {
		var tooltipX = { ...tooltip };
		tooltipX.rules = rules;
		//settooltip(tooltipX);
		props.onChange(tooltipX);
	}, [rules]);
	var tooltipProps = {
		content: { label: "Content", id: "content", value: "I'm a Tippy tooltip!" },
		placement: { label: "Placement", id: "placement", value: "top" },
		arrow: { label: "Arrow", id: "arrow", value: true },
		// animation: { label: "Animation", id: "animation", value: "fade" },
		duration: { label: "Duration", id: "duration", value: 1000 },
		theme: { label: "Theme", id: "theme", value: "light" },
		trigger: { label: "Trigger", id: "trigger", value: "mouseenter focus" },
		interactive: { label: "Interactive", id: "interactive", value: true },
		allowHTML: { label: "allowHTML", id: "allowHTML", value: true },
		delay: { label: "delay", id: "delay", value: 500 },
		followCursor: { label: "followCursor", id: "followCursor", value: true },
	};
	var RemovetooltipGroup = function ({ title, index }) {
		return (
			<span className="flex gap-1 justify-start items-center">
				{/* <Icon
					icon={close}
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}
				/> */}
				<span
					className="hover:bg-red-500 bg-red-400 py-1 px-[10px] text-lg leading-normal"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}>
					&times;
				</span>
				<span>{title}</span>
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
					options={tooltipProps}
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
							key={groupIndex}
							className={`my-3 flex gap-2  ${group.id == "content"
									? "flex-col items-start"
									: "justify-between"
								}`}>
							<RemovetooltipGroup
								title={tooltipProps[group.id].label}
								index={groupIndex}
							/>
							{(group.id == "arrow" ||
								group.id == "interactive" ||
								group.id == "allowHTML") && (
									<ToggleControl
										// help={
										// 	rules[groupIndex].value
										// 		? __("True", "combo-blocks")
										// 		: __("False.", "combo-blocks")
										// }
										checked={rules[groupIndex].value}
										onChange={(newValue) => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = newValue;
											setrules(rulesX);
										}}
									/>
								)}
							{group.id == "content" && (
								<>
									<RichText
										tagName="div"
										className="components-textarea-control__input flex-1 w-full"
										value={group.value}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(newValue) => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = newValue;
											setrules(rulesX);
										}}
										placeholder={__("Start Writing...")}
									/>
								</>
							)}
							{(group.id == "delay" || group.id == "duration") && (
								<>
									<InputControl
										value={group.value}
										onChange={(newValue) => {
											var rulesX = [...rules];
											rulesX[groupIndex].value = newValue;
											setrules(rulesX);
										}}
									/>
								</>
							)}
							{group.id == "placement" && (
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.value == undefined || group.value.length == 0
											? __("Choose", "combo-blocks")
											: group.value
									}
									options={[
										{ label: "Top", value: "top" },
										{ label: "Top Start", value: "top-start" },
										{ label: "Top End", value: "top-end" },
										{ label: "Right", value: "right" },
										{ label: "Right Start", value: "right-start" },
										{ label: "Right End", value: "right-end" },
										{ label: "Bottom", value: "bottom" },
										{ label: "Bottom Start", value: "bottom-start" },
										{ label: "Bottom End", value: "bottom-end" },
										{ label: "Left", value: "left" },
										{ label: "Left Start", value: "left-start" },
										{ label: "Left End", value: "left-end" },
										{ label: "Auto", value: "auto" },
										{ label: "Auto Start", value: "auto-start" },
										{ label: "Auto End", value: "auto-end" },
									]}
									onChange={(option) => {
										var rulesX = [...rules];
										rulesX[groupIndex].value = option.value;
										setrules(rulesX);
									}}
									values=""></PGDropdown>
							)}
							{group.id == "trigger" && (
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.value == undefined
											? __("Choose", "combo-blocks")
											: group.value
									}
									options={[
										{ label: "Mouseenter Focus", value: "mouseenter focus" },
										{ label: "Click", value: "click" },
										{ label: "Focus in", value: "focusin" },
										{ label: "Mouseenter Click", value: "mouseenter click" },
									]}
									onChange={(option) => {
										var rulesX = [...rules];
										rulesX[groupIndex].value = option.value;
										setrules(rulesX);
									}}
									values=""></PGDropdown>
							)}
							{group.id == "followCursor" && (
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.value == undefined
											? __("Choose", "combo-blocks")
											: group.value
									}
									options={[
										{ label: "False", value: "false" },
										{ label: "True", value: "true" },
										{ label: "Horizontal", value: "horizontal" },
										{ label: "Vertical", value: "vertical" },
										{ label: "Initial", value: "initial" },
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
class PGTooltip extends Component {
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
			tooltip,
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
					tooltip={tooltip}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGTooltip;
