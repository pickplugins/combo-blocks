const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Panel,
	PanelRow,
	PanelItem,
	Button,
	Dropdown,
	SelectControl,
	Popover,
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		flat: { label: "flat", value: "flat" },
		"preserve-3d": { label: "preserve-3d", value: "preserve-3d" },
		"revert-layer": { label: "revert-layer", value: "revert-layer" },
		revert: { label: "revert", value: "revert" },
		initial: { label: "initial", value: "justify" },
	};
	const [valArgs, setValArgs] = useState(props.val.split(" "));
	const [align, setalign] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	return (
		<div className="flex justify-between items-center">
			<Dropdown
				position="bottom"
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						title={__("Clear", "combo-blocks")}
						onClick={onToggle}
						aria-expanded={isOpen}>
						{/* <div className=" ">{val ? args[val].label : 'Select...'}</div> */}
						<div className=" ">
							{args[align] == undefined
								? __("Select...", "combo-blocks")
								: args[align].label}
						</div>
					</Button>
				)}
				renderContent={() => (
					<div className="w-32 pg-font">
						{Object.entries(args).map((args) => {
							var index = args[0];
							var x = args[1];
							return (
								<div
									className={
										"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
									}
									onClick={(ev) => {
										setalign(x.value);
										if (isImportant) {
											props.onChange(x.value + " !important", "transformStyle");
										} else {
											props.onChange(x.value, "transformStyle");
										}
									}}>
									{!x.value && <div>{__("Reset", "combo-blocks")}</div>}
									{x.value && <>{x.label}</>}
								</div>
							);
						})}
					</div>
				)}
			/>
			<ToggleControl
				help={
					isImportant
						? __("Important (Enabled)", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						props.onChange(align, "transformStyle");
					} else {
						props.onChange(align + " !important", "transformStyle");
					}
				}}
			/>
		</div>
	);
}
class PGcssTransformStyle extends Component {
	// var { onChange } = this.props;
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
		const { val, onChange } = this.props;
		return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
	}
}
export default PGcssTransformStyle;
