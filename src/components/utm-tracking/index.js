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
	let isProFeature = applyFilters("isProFeature", true);
	// const [utmTrackingOn, setutmTrackingOn] = useState(props.utmTrackingOn);
	const [utmTrackingOn, setutmTrackingOn] = useState(
		props.utmTrackingOn == undefined
			? {
				options: { enable: false },
			}
			: props.utmTrackingOn
	);
	useEffect(() => {
		props.onChange(utmTrackingOn);
	}, [utmTrackingOn]);
	var utmOptions = utmTrackingOn.options
	var utmEnable =
		utmTrackingOn?.options?.enable == undefined
			? false
			: utmTrackingOn.options.enable;
	return (
		<div className="relative pg-setting-input-text">
			<ToggleControl
				label={__("Enable?", "combo-blocks")}
				help={
					utmEnable
						? __("Tracking Enabled.", "combo-blocks")
						: __("Tracking Disabled.", "combo-blocks")
				}
				checked={utmEnable ? true : false}
				onChange={(e) => {
					var optionsX = {
						...utmTrackingOn.options,
						enable: utmEnable ? false : true,
					};
					if (isProFeature) {
						alert("This feature is only available in Pro Version.");
						return;
					}
					setutmTrackingOn({
						...utmTrackingOn,
						options: optionsX,
					});
				}}
			/>
			{utmEnable && (
				<>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							ID
						</label>
						<InputControl
							value={utmOptions.id}
							onChange={(newVal) => {
								var update = { ...utmOptions, id: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							Source
						</label>
						<InputControl
							value={utmOptions.source}
							onChange={(newVal) => {
								var update = { ...utmOptions, source: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							Medium
						</label>
						<InputControl
							value={utmOptions.medium}
							onChange={(newVal) => {
								var update = { ...utmOptions, medium: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							Campaign
						</label>
						<InputControl
							value={utmOptions.campaign}
							onChange={(newVal) => {
								var update = { ...utmOptions, campaign: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							Term
						</label>
						<InputControl
							value={utmOptions.term}
							onChange={(newVal) => {
								var update = { ...utmOptions, term: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
					<PanelRow className="">
						<label htmlFor="" className="font-medium text-slate-900 pg-font ">
							Content
						</label>
						<InputControl
							value={utmOptions.content}
							onChange={(newVal) => {
								var update = { ...utmOptions, content: newVal };
								setutmTrackingOn({
									...utmTrackingOn,
									options: update,
								});
							}}
						/>
					</PanelRow>
				</>
			)}
		</div>
	);
}
class PGUtmTracking extends Component {
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
			utmTrackingOn,
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
					utmTrackingOn={utmTrackingOn}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGUtmTracking;
