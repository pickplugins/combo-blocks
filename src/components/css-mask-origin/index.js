const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		"border-box": { label: "Border Box", value: "border-box" },
		"content-box": { label: "Content Box", value: "content-box" },
		"padding-box": { label: "Padding Box", value: "padding-box" },
		"margin-box": { label: "Margin Box", value: "margin-box" },
		"fill-box": { label: "Fill Box", value: "fill-box" },
		"stroke-box": { label: "Stroke Box", value: "stroke-box" },
		"view-box": { label: "View Box", value: "view-box" },
		inherit: { label: "Inherit", value: "inherit" },
		initial: { label: "Initial", value: "initial" },
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
						title={__("Background Blend Mode", "combo-blocks")}
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
					<div className="w-32">
						{Object.entries(args).map((args) => {
							var index = args[0];
							var x = args[1];
							return (
								<div
									className={
										"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
									}
									onClick={(ev) => {
										// onChange(x.value, 'maskOrigin');
										setalign(x.value);
										if (isImportant) {
											props.onChange(x.value + " !important", "maskOrigin");
										} else {
											props.onChange(x.value, "maskOrigin");
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
						props.onChange(align, "maskOrigin");
					} else {
						props.onChange(align + " !important", "maskOrigin");
					}
				}}
			/>
		</div>
	);
}
class PGcssMaskOrigin extends Component {
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
export default PGcssMaskOrigin;
