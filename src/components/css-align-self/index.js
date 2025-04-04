const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		auto: { label: "auto", value: "auto" },
		stretch: { label: "Stretch", value: "stretch" },
		center: { label: "Center", value: "center" },
		"flex-start": { label: "Flex start	", value: "flex-start" },
		"flex-end": { label: "Flex end	", value: "flex-end" },
		normal: { label: "normal", value: "normal" },
		revert: { label: "revert", value: "revert" },
		"self-end": { label: "self-end", value: "self-end" },
		" self-start": { label: " self-start", value: " self-start" },
		start: { label: "start", value: "start" },
		end: { label: "end", value: "end" },
		unset: { label: "unset", value: "unset" },
		inherit: { label: "inherit", value: "inherit" },
		initial: { label: "initial", value: "initial" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
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
					<Button title={__("Align Self", "combo-blocks")} onClick={onToggle} aria-expanded={isOpen}>
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
										// onChange(x.value, 'alignSelf');
										setalign(x.value);
										if (isImportant) {
											props.onChange(x.value + " !important", "alignSelf");
										} else {
											props.onChange(x.value, "alignSelf");
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
			<div className="flex items-center gap-2">
				<label htmlFor="">
					{isImportant
						? __("Important (Enabled)", "combo-blocks")
						: __("Important?", "combo-blocks")}
				</label>
				<ToggleControl
					className="!mb-0"
					checked={isImportant}
					onChange={(arg) => {
						setImportant((isImportant) => !isImportant);
						if (isImportant) {
							props.onChange(align, "alignSelf");
						} else {
							props.onChange(align + " !important", "alignSelf");
						}
					}}
				/>
			</div>
		</div>
	);
}
class PGcssAlignSelf extends Component {
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
export default PGcssAlignSelf;
