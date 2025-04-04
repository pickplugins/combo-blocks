const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { closeSmall, formatCapitalize, formatLowercase, formatUppercase, Icon } from "@wordpress/icons";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		none: { label: "None", value: "none" },
		capitalize: { label: "Capitalize", value: "capitalize" },
		uppercase: { label: "Uppercase", value: "uppercase" },
		lowercase: { label: "Lowercase", value: "lowercase" },
	};
	const [valArgs, setValArgs] = useState(props.val.split(" "));
	const [align, setalign] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	return (
		<div className="flex justify-between items-center pg-setting-css-components">
			{/* <Dropdown
				position="bottom"
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						title={__("Clear", "combo-blocks")}
						onClick={onToggle}
						aria-expanded={isOpen}>
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
											props.onChange(x.value + " !important", "textTransform");
										} else {
											props.onChange(x.value, "textTransform");
										}
									}}>
									{!x.value && <div>{__("Reset", "combo-blocks")}</div>}
									{x.value && <>{x.label}</>}
								</div>
							);
						})}
					</div>
				)}
			/> */}
			<div className="flex flex-1 items-center justify-around">
				<div
					className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer 
						${align === "capitalize" ? "bg-blue-600 text-white " : ""}
					`}
					onClick={(ev) => {
						if (!isImportant) {
							props.onChange("capitalize", "textTransform");
						} else {
							props.onChange("capitalize" + " !important", "textTransform");
						}
						setalign("capitalize");
						// props.onChange("capitalize", "textTransform");
					}}>
					<Icon icon={formatCapitalize} size={24} />
				</div>
				<div
					className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "uppercase" ? "bg-blue-600 text-white " : ""
						}`}
					onClick={(ev) => {
						if (!isImportant) {
							props.onChange("uppercase", "textTransform");
						} else {
							props.onChange("uppercase" + " !important", "textTransform");
						}
						setalign("uppercase");
						// props.onChange("uppercase", "textTransform");
					}}>
					<Icon icon={formatUppercase} size={24} />
				</div>
				<div
					className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "lowercase" ? "bg-blue-600 text-white " : ""
						}`}
					onClick={(ev) => {
						if (!isImportant) {
							props.onChange("lowercase", "textTransform");
						} else {
							props.onChange("lowercase" + " !important", "textTransform");
						}
						setalign("lowercase");
						// props.onChange("lowercase", "textTransform");
					}}>
					<Icon icon={formatLowercase} size={24} />
				</div>

				<div
					className={`flex items-center justify-center w-[30px] h-[30px] border cursor-pointer ${align === "none" ? "bg-blue-600 text-white " : ""
						}`}
					onClick={(ev) => {
						if (!isImportant) {
							props.onChange("none", "textTransform");
						} else {
							props.onChange("none" + " !important", "textTransform");
						}
						setalign("none");
						// props.onChange("none", "textTransform");
					}}>
					<Icon icon={closeSmall} size={24} />
				</div>
			</div>
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
						props.onChange(align, "textTransform");
					} else {
						props.onChange(align + " !important", "textTransform");
					}
				}}
			/>
		</div>
	);
}
class PGcssTextTransform extends Component {
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
export default PGcssTextTransform;
