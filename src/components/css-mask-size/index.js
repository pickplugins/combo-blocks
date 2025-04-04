const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Button,
	Dropdown,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { Icon, styles, close, settings, link, linkOff } from "@wordpress/icons";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		auto: { label: "auto", value: "auto" },
		cover: { label: "Cover", value: "cover" },
		contain: { label: "Contain", value: "contain" },
		custom: { label: "Custom", value: "custom" },
		inherit: { label: "inherit", value: "inherit" },
		initial: { label: "initial", value: "initial" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
	};
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		"%": { label: "%", value: "%" },
		cm: { label: "CM", value: "cm" },
		mm: { label: "MM", value: "mm" },
		in: { label: "IN", value: "in" },
		pt: { label: "PT", value: "pt" },
		pc: { label: "PC", value: "pc" },
		ex: { label: "EX", value: "ex" },
		ch: { label: "CH", value: "ch" },
		vw: { label: "VW", value: "vw" },
		vh: { label: "VH", value: "vh" },
		vmin: { label: "VMIN", value: "vmin" },
		vmax: { label: "VMAX", value: "vmax" },
	};
	const [isMultiple, setisMultiple] = useState(
		props.val.includes(", ") ? true : false
	);
	const [valArgs, setValArgs] = useState(
		isMultiple ? props.val.split(", ") : props.val.split(" ")
	);
	const [isImportant, setImportant] = useState(
		props.val.includes("!important") ? true : false
	);
	return (
		<div className="">
			<div className="flex justify-between items-center">
				<div
					className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 my-3"
					onClick={(ev) => {
						valArgs.push("auto");
						setValArgs(valArgs);
						props.onChange(valArgs.join(" "), "maskSize");
					}}>
					{__('Add', "combo-blocks")}</div>
				<ToggleControl
					label={
						isMultiple
							? __("Multiple (Enabled)", "combo-blocks")
							: __("Multiple?", "combo-blocks")
					}
					checked={isMultiple}
					onChange={(arg) => {
						setisMultiple((isMultiple) => !isMultiple);
						if (isMultiple) {
							if (isImportant) {
								props.onChange(valArgs.join(" ") + " !important", "maskSize");
							} else {
								props.onChange(valArgs.join(" "), "maskSize");
							}
						} else {
							if (isImportant) {
								props.onChange(valArgs.join(", ") + " !important", "maskSize");
							} else {
								props.onChange(valArgs.join(", "), "maskSize");
							}
						}
					}}
				/>
			</div>
			<div>
				{valArgs.map((item, i) => {
					return (
						<div className="flex items-center">
							<span
								className="bg-red-500 text-white"
								onClick={(ev) => {
									valArgs.splice(i, 1);
									if (isMultiple) {
										if (isImportant) {
											props.onChange(
												valArgs.join(", ") + " !important",
												"maskSize"
											);
										} else {
											props.onChange(valArgs.join(", "), "maskSize");
										}
									} else {
										if (isImportant) {
											props.onChange(
												valArgs.join(" ") + " !important",
												"maskSize"
											);
										} else {
											props.onChange(valArgs.join(" "), "maskSize");
										}
									}
								}}>
								<Icon fill="#fff" icon={close} />
							</span>
							<Dropdown
								position="bottom"
								renderToggle={({ isOpen, onToggle }) => (
									<Button
										title={__("Background Repeat", "combo-blocks")}
										onClick={onToggle}
										aria-expanded={isOpen}>
										{/* <div className=" ">{val ? args[val].label : 'Select...'}</div> */}
										<div className=" ">
											{args[item] == undefined
												? __("Custom", "combo-blocks")
												: args[item].label}
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
														if (x.value == "custom") {
															valArgs[i] = "0px";
														} else {
															valArgs[i] = x.value;
														}
														props.onChange(valArgs.join(" "), "maskSize");
														setValArgs(valArgs);
													}}>
													{!x.value && <div>{__("Reset", "combo-blocks")}</div>}
													{x.value && <>{x.label}</>}
												</div>
											);
										})}
									</div>
								)}
							/>
							<div></div>
							{item.match(/-?\d+/g) != null && (
								<div className="flex justify-between">
									<InputControl
										value={
											item.match(/-?\d+/g) == null
												? "0"
												: item.match(/-?\d+/g)[0]
										}
										type="number"
										onChange={(newVal) => {
											if (newVal.length > 0) {
												valArgs[i] = newVal + item.match(/[a-zA-Z%]+/g)[0];
												props.onChange(valArgs.join(" "), "maskSize");
												setValArgs(valArgs);
											}
										}}
									/>
									<Dropdown
										position="bottom left"
										renderToggle={({ isOpen, onToggle }) => (
											<Button
												title=""
												onClick={onToggle}
												aria-expanded={isOpen}>
												<div className=" ">
													{item.match(/[a-zA-Z%]+/g) == null
														? __("Select...", "combo-blocks")
														: unitArgs[item.match(/[a-zA-Z%]+/g)[0]] ==
															undefined
															? ""
															: unitArgs[item.match(/[a-zA-Z%]+/g)[0]].label}
												</div>
											</Button>
										)}
										renderContent={() => (
											<div className="w-32">
												{Object.entries(unitArgs).map((y) => {
													var index = y[0];
													var x = y[1];
													return (
														<div
															className={
																"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
															}
															onClick={(ev) => {
																var val =
																	item.match(/-?\d+/g) == null
																		? 0
																		: item.match(/-?\d+/g)[0];
																valArgs[i] = val + x.value;
																props.onChange(valArgs.join(" "), "maskSize");
																setValArgs(valArgs);
															}}>
															{x.value && <>{x.label}</>}
														</div>
													);
												})}
											</div>
										)}
									/>
								</div>
							)}
							<div></div>
						</div>
					);
				})}
			</div>
			<ToggleControl
				label={
					isImportant
						? __("Important (Enabled)", "combo-blocks")
						: __("Important?", "combo-blocks")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isMultiple) {
						if (isImportant) {
							props.onChange(
								valArgs.join(", ").replace("!important", ""),
								"maskSize"
							);
						} else {
							props.onChange(valArgs.join(", ") + " !important", "maskSize");
						}
					} else {
						if (isImportant) {
							props.onChange(
								valArgs.join(" ").replace("!important", ""),
								"maskSize"
							);
						} else {
							props.onChange(valArgs.join(" ") + " !important", "maskSize");
						}
					}
				}}
			/>
		</div>
	);
}
class PGcssMaskSize extends Component {
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
export default PGcssMaskSize;
