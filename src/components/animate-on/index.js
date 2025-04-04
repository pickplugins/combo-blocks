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
import { __ } from "@wordpress/i18n";
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [animateOn, setanimateOn] = useState(props.animateOn);
	var [rules, setrules] = useState(
		animateOn?.rules == null || animateOn?.rules == undefined ? [] : animateOn.rules
	);
	useEffect(() => {
		props.onChange(animateOn);
	}, [animateOn]);
	useEffect(() => {
		var animateOnX = { ...animateOn };
		animateOnX.rules = rules;
		setanimateOn(animateOnX);
	}, [rules]);
	var animateListArgsBasic = {
		backInDown: { label: __("backInDown", "combo-blocks"), value: "backInDown" },
		backInLeft: { label: __("backInLeft", "combo-blocks"), value: "backInLeft" },
		backInRight: {
			label: __("backInRight", "combo-blocks"),
			value: "backInRight",
			isPro: true,
		},
		backInUp: {
			label: __("backInUp", "combo-blocks"),
			value: "backInUp",
			isPro: true,
		},
		bounceIn: { label: __("bounceIn", "combo-blocks"), value: "bounceIn" },
		bounceInDown: {
			label: __("bounceInDown", "combo-blocks"),
			value: "bounceInDown",
			isPro: true,
		},
		bounceInLeft: {
			label: __("bounceInLeft", "combo-blocks"),
			value: "bounceInLeft",
			isPro: true,
		},
		bounceInRight: {
			label: __("bounceInRight", "combo-blocks"),
			value: "bounceInRight",
			isPro: true,
		},
		bounceInUp: {
			label: __("bounceInUp", "combo-blocks"),
			value: "bounceInUp",
			isPro: true,
		},
		fadeIn: { label: __("fadeIn", "combo-blocks"), value: "fadeIn" },
		fadeInDown: {
			label: __("fadeInDown", "combo-blocks"),
			value: "fadeInDown",
			isPro: true,
		},
		fadeInDownBig: {
			label: __("fadeInDownBig", "combo-blocks"),
			value: "fadeInDownBig",
			isPro: true,
		},
		fadeInLeft: {
			label: __("fadeInLeft", "combo-blocks"),
			value: "fadeInLeft",
			isPro: true,
		},
		fadeInLeftBig: {
			label: __("fadeInLeftBig", "combo-blocks"),
			value: "fadeInLeftBig",
			isPro: true,
		},
		fadeInRight: {
			label: __("fadeInRight", "combo-blocks"),
			value: "fadeInRight",
			isPro: true,
		},
		fadeInRightBig: {
			label: __("fadeInRightBig", "combo-blocks"),
			value: "fadeInRightBig",
			isPro: true,
		},
		fadeInUp: {
			label: __("fadeInUp", "combo-blocks"),
			value: "fadeInUp",
			isPro: true,
		},
		fadeInUpBig: {
			label: __("fadeInUpBig", "combo-blocks"),
			value: "fadeInUpBig",
			isPro: true,
		},
		fadeInTopLeft: {
			label: __("fadeInTopLeft", "combo-blocks"),
			value: "fadeInTopLeft",
			isPro: true,
		},
		fadeInTopRight: {
			label: __("fadeInTopRight", "combo-blocks"),
			value: "fadeInTopRight",
			isPro: true,
		},
		fadeInBottomRight: {
			label: __("fadeInBottomRight", "combo-blocks"),
			value: "fadeInBottomRight",
			isPro: true,
		},
		fadeInBottomLeft: {
			label: __("fadeInBottomLeft", "combo-blocks"),
			value: "fadeInBottomLeft",
			isPro: true,
		},
		rotateIn: { label: __("rotateIn", "combo-blocks"), value: "rotateIn" },
		rotateInDownLeft: {
			label: __("rotateInDownLeft", "combo-blocks"),
			value: "rotateInDownLeft",
			isPro: true,
		},
		rotateInDownRight: {
			label: __("rotateInDownRight", "combo-blocks"),
			value: "rotateInDownRight",
			isPro: true,
		},
		rotateInUpLeft: {
			label: __("rotateInUpLeft", "combo-blocks"),
			value: "rotateInUpLeft",
			isPro: true,
		},
		rotateInUpRight: {
			label: __("rotateInUpRight", "combo-blocks"),
			value: "rotateInUpRight",
			isPro: true,
		},
		zoomIn: { label: __("zoomIn", "combo-blocks"), value: "zoomIn", isPro: true },
		zoomInDown: {
			label: __("zoomInDown", "combo-blocks"),
			value: "zoomInDown",
			isPro: true,
		},
		zoomInLeft: {
			label: __("zoomInLeft", "combo-blocks"),
			value: "zoomInLeft",
			isPro: true,
		},
		zoomInRight: {
			label: __("zoomInRight", "combo-blocks"),
			value: "zoomInRight",
			isPro: true,
		},
		zoomInUp: {
			label: __("zoomInUp", "combo-blocks"),
			value: "zoomInUp",
			isPro: true,
		},
		slideInDown: {
			label: __("slideInDown", "combo-blocks"),
			value: "slideInDown",
			isPro: true,
		},
		slideInLeft: {
			label: __("slideInLeft", "combo-blocks"),
			value: "slideInLeft",
			isPro: true,
		},
		slideInRight: {
			label: __("slideInRight", "combo-blocks"),
			value: "slideInRight",
			isPro: true,
		},
		slideInUp: {
			label: __("slideInUp", "combo-blocks"),
			value: "slideInUp",
			isPro: true,
		},
		backOutDown: {
			label: __("backOutDown", "combo-blocks"),
			value: "backOutDown",
		},
		backOutLeft: {
			label: __("backOutLeft", "combo-blocks"),
			value: "backOutLeft",
		},
		backOutRight: {
			label: __("backOutRight", "combo-blocks"),
			value: "backOutRight",
			isPro: true,
		},
		backOutUp: {
			label: __("backOutUp", "combo-blocks"),
			value: "backOutUp",
			isPro: true,
		},
		bounceOut: { label: __("bounceOut", "combo-blocks"), value: "bounceOut" },
		bounceOutDown: {
			label: __("bounceOutDown", "combo-blocks"),
			value: "bounceOutDown",
			isPro: true,
		},
		bounceOutLeft: {
			label: __("bounceOutLeft", "combo-blocks"),
			value: "bounceOutLeft",
			isPro: true,
		},
		bounceOutRight: {
			label: __("bounceOutRight", "combo-blocks"),
			value: "bounceOutRight",
			isPro: true,
		},
		bounceOutUp: {
			label: __("bounceOutUp", "combo-blocks"),
			value: "bounceOutUp",
			isPro: true,
		},
		fadeOut: { label: __("fadeOut", "combo-blocks"), value: "fadeOut" },
		fadeOutDown: {
			label: __("fadeOutDown", "combo-blocks"),
			value: "fadeOutDown",
			isPro: true,
		},
		fadeOutDownBig: {
			label: __("fadeOutDownBig", "combo-blocks"),
			value: "fadeOutDownBig",
			isPro: true,
		},
		fadeOutLeft: {
			label: __("fadeOutLeft", "combo-blocks"),
			value: "fadeOutLeft",
			isPro: true,
		},
		fadeOutLeftBig: {
			label: __("fadeOutLeftBig", "combo-blocks"),
			value: "fadeOutLeftBig",
			isPro: true,
		},
		fadeOutRight: {
			label: __("fadeOutRight", "combo-blocks"),
			value: "fadeOutRight",
			isPro: true,
		},
		fadeOutRightBig: {
			label: __("fadeOutRightBig", "combo-blocks"),
			value: "fadeOutRightBig",
			isPro: true,
		},
		fadeOutUp: {
			label: __("fadeOutUp", "combo-blocks"),
			value: "fadeOutUp",
			isPro: true,
		},
		fadeOutUpBig: {
			label: __("fadeOutUpBig", "combo-blocks"),
			value: "fadeOutUpBig",
			isPro: true,
		},
		fadeOutTopLeft: {
			label: __("fadeOutTopLeft", "combo-blocks"),
			value: "fadeOutTopLeft",
			isPro: true,
		},
		fadeOutTopRight: {
			label: __("fadeOutTopRight", "combo-blocks"),
			value: "fadeOutTopRight",
			isPro: true,
		},
		fadeOutBottomRight: {
			label: __("fadeOutBottomRight", "combo-blocks"),
			value: "fadeOutBottomRight",
			isPro: true,
		},
		fadeOutBottomLeft: {
			label: __("fadeOutBottomLeft", "combo-blocks"),
			value: "fadeOutBottomLeft",
			isPro: true,
		},
		rotateOut: { label: __("rotateOut", "combo-blocks"), value: "rotateOut" },
		rotateOutDownLeft: {
			label: __("rotateOutDownLeft", "combo-blocks"),
			value: "rotateOutDownLeft",
			isPro: true,
		},
		rotateOutDownRight: {
			label: __("rotateOutDownRight", "combo-blocks"),
			value: "rotateOutDownRight",
			isPro: true,
		},
		rotateOutUpLeft: {
			label: __("rotateOutUpLeft", "combo-blocks"),
			value: "rotateOutUpLeft",
			isPro: true,
		},
		rotateOutUpRight: {
			label: __("rotateOutUpRight", "combo-blocks"),
			value: "rotateOutUpRight",
			isPro: true,
		},
		zoomOut: {
			label: __("zoomOut", "combo-blocks"),
			value: "zoomOut",
			isPro: true,
		},
		zoomOutDown: {
			label: __("zoomOutDown", "combo-blocks"),
			value: "zoomOutDown",
			isPro: true,
		},
		zoomOutLeft: {
			label: __("zoomOutLeft", "combo-blocks"),
			value: "zoomOutLeft",
			isPro: true,
		},
		zoomOutRight: {
			label: __("zoomOutRight", "combo-blocks"),
			value: "zoomOutRight",
			isPro: true,
		},
		zoomOutUp: {
			label: __("zoomOutUp", "combo-blocks"),
			value: "zoomOutUp",
			isPro: true,
		},
		slideOutDown: {
			label: __("slideOutDown", "combo-blocks"),
			value: "slideOutDown",
			isPro: true,
		},
		slideOutLeft: {
			label: __("slideOutLeft", "combo-blocks"),
			value: "slideOutLeft",
			isPro: true,
		},
		slideOutRight: {
			label: __("slideOutRight", "combo-blocks"),
			value: "slideOutRight",
			isPro: true,
		},
		slideOutUp: {
			label: __("slideOutUp", "combo-blocks"),
			value: "slideOutUp",
			isPro: true,
		},
	};
	let animateListArgs = applyFilters(
		"AnimateOnArgs",
		animateListArgsBasic
	);

	var RemoveAnimateOnGroup = function ({ title, index }) {
		return (
			<>
				<Icon icon={close} onClick={(ev) => {
					var rulesX = [...rules];
					rulesX.splice(index, 1);
					setrules(rulesX);
				}} />
				<span>{title}</span>
			</>
		);
	};
	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.push({ event: "scrollTo", title: "", animationName: "", duration: "", delay: "", });
						setrules(rulesX);
					}}>
					{__("Add", "combo-blocks")}
				</div>
			</PanelRow>
			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PGtoggle
							title={
								<RemoveAnimateOnGroup title={group.event + " - " + animateListArgs[group.animationName]?.label} index={groupIndex} />
							}
							initialOpen={false} key={groupIndex} >
							<PanelRow className="my-3">
								<label>Event?</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										group.event == undefined
											? __("Choose", "combo-blocks")
											: group.event
									}
									options={[
										{ label: __("Page Load", "combo-blocks"), value: "load" },
										{ label: __("Scroll To", "combo-blocks"), value: "scroll" },
										{ label: __("Mouse Over", "combo-blocks"), value: "mouseover" },
										{ label: __("Mouse Out", "combo-blocks"), value: "mouseout" },
										{ label: __("Click Element", "combo-blocks"), value: "click" },
									]}
									onChange={(option, index) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["event"] = option.value;
										setrules(rulesX);
									}}
									values=""></PGDropdown>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" >
									{__("Animation", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										animateListArgs[group.animationName] ==
											undefined
											? __("Choose", "combo-blocks")
											: animateListArgs[group.animationName].label
									}
									options={animateListArgs}
									onChange={(option, index) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["animationName"] = option.value;
										setrules(rulesX);
									}}
									values=""></PGDropdown>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" >
									{__("Duration", "combo-blocks")}
								</label>
								<InputControl
									className=""
									value={group.duration}
									onChange={(newVal) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["duration"] = newVal;
										setrules(rulesX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" >
									{__("Delay", "combo-blocks")}
								</label>
								<InputControl
									className=""
									value={group.delay}
									onChange={(newVal) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["delay"] = newVal;
										setrules(rulesX);
									}}
								/>
							</PanelRow>
						</PGtoggle>
					);
				})}
			</div>
		</div>
	);
}
class PGAnimateOn extends Component {
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
			animateOn,
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
					animateOn={animateOn}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGAnimateOn;
