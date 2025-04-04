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
import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'

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
import { Icon, close, plus, percent, superscript } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [visible, setVisible] = useState(props.visible);
	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);

	useEffect(() => {
		var visibleX = { ...visible };
		//visibleX.rules = rules;
		//setVisible(visibleX);
		props.onChange(visibleX);
	}, [visible]);









	return (
		<div className="relative">

			<div>Rules</div>
			<div className="flex items-center gap-2 flex-wrap">
				<span className="w-[30px] rounded-[3px] py-[3px] text-center text-[18px] bg-slate-400"><Icon icon={plus} /></span>
				<span className="w-[30px] rounded-[3px] py-[7px] text-center text-[18px] bg-slate-400">-</span>
				<span className="w-[30px] rounded-[3px] py-[3px] text-center text-[18px] bg-slate-400"><Icon icon={close} /></span>
				<span className="w-[30px] rounded-[3px] py-[7px] text-center text-[18px] bg-slate-400">/</span>
				<span className="w-[30px] rounded-[3px] py-[3px] text-center text-[18px] bg-slate-400"><Icon icon={percent} /></span>
				<span className="w-[30px] rounded-[3px] py-[7px] text-center text-[18px] bg-slate-400">|</span>
				<span className="w-[30px] rounded-[3px] py-[7px] text-center text-[18px] bg-slate-400">&</span>
				<span className="w-[30px] rounded-[3px] py-[3px] text-center text-[18px] bg-slate-400"><Icon icon={superscript} /></span>


			</div>
			<RichText
				className="bg-slate-300 p-2 h-40"
				tagName={"pre"}
				value={visible.rules}
				allowedFormats={[]}
				onChange={(newVal) => {

					var visibleX = { ...visible };
					visibleX.rules = newVal;
					setVisible(visibleX);
				}}
				placeholder={"Write calclations"}
			/>

			<div className="my-4">

			</div>
		</div>
	);
}
class PGFormFieldCalculations extends Component {
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
			visible,
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
					visible={visible}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGFormFieldCalculations;
