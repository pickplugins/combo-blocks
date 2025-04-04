import { Button, PanelRow, Dropdown, Popover } from "@wordpress/components";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
	Component,
	RawHTML,
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
function Html(props) {
	const position = props.position;
	const obj = props.obj;
	const variant = props.variant;
	const options = props.options;
	const buttonTitle = props.buttonTitle;
	const onChange = props.onChange;
	const values = props.values;
	const value = props.value;
	const sudoScourceUpdate = props.sudoScourceUpdate;
	//var sudoScourceArgsLocal = localStorage.getItem('sudoScourceArgs');
	//sudoScourceArgsLocal = (sudoScourceArgsLocal != null) ? JSON.parse(sudoScourceArgsLocal) : {};
	const [pickerOpen, setPickerOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [filteredOptions, setfilteredOptions] = useState([]);
	const [optionsX, setoptionsX] = useState(options);
	useEffect(() => {
		sudoScourceUpdate(optionsX);
	}, [optionsX]);
	return (
		<div className="relative">
			<div
				className=""
				onClick={(ev) => {
					setPickerOpen((prev) => !prev);
				}}>
				<Button
					className="pg-font flex gap-2 justify-center cursor-pointer py-2 px-4 capitalize tracking-wide !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
				// variant={variant}
				>
					{optionsX[value] != undefined ? optionsX[value].label : buttonTitle}
				</Button>
			</div>
			{pickerOpen && (
				<Popover position={position}>
					<div className="p-2 w-[260px] pg-font pg-setting-input-text custom-scrollbar ">
						<InputControl
							autoComplete="off"
							className="p-3 w-full"
							placeholder="Search Options"
							value={keyword}
							onChange={(newVal) => {
								if (newVal.length > 0) {
									setKeyword(newVal);
								}
								if (typeof optionsX == "object") {
									setfilteredOptions({});
									var newOptions = {};
									Object.entries(optionsX).map((args) => {
										var index = args[0];
										var x = args[1];
										let position = x.label
											.toLowerCase()
											.search(newVal.toLowerCase());
										if (position < 0) {
											x.exclude = true;
										} else {
											x.exclude = false;
										}
										newOptions[index] = x;
									});
									setfilteredOptions(newOptions);
								} else {
									setfilteredOptions([]);
									var newOptions = [];
									optionsX.map((x, index) => {
										let position = x.label
											.toLowerCase()
											.search(newVal.toLowerCase());
										if (position < 0) {
											x.exclude = true;
										} else {
											x.exclude = false;
										}
										//newOptions.push(x);
									});
									setfilteredOptions(newOptions);
								}
							}}
						/>
						<div>
							{keyword.length == 0 &&
								typeof optionsX == "object" &&
								Object.entries(optionsX).map((args) => {
									var index = args[0];
									var x = args[1];
									return (
										<div className="border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px]">
											<div
												className={[
													x.isPro ? "flex justify-between items-center" : "",
												]}>
												<div className={[x.isPro ? "text-gray-400" : ""]}>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<div
														className="flex items-center gap-2"
														onClick={(ev) => {
															if (x.isPro == true) {
																alert(
																	"Sorry this feature only available in pro"
																);
															} else {
																// var sudoScourceArgsLocal = localStorage.getItem('sudoScourceArgs');
																//sudoScourceArgsLocal = (sudoScourceArgsLocal != null) ? JSON.parse(sudoScourceArgsLocal) : {};
																var sudoId = x.value.replace(
																	"(n)",
																	"(" + x.arg + ")"
																);
																//sudoScourceArgsLocal[sudoId] = { label: sudoId, value: sudoId, }
																//localStorage.setItem('sudoScourceArgs', JSON.stringify(sudoScourceArgsLocal));
																// var sudoScourceArgsLocalX = localStorage.getItem('sudoScourceArgs');
																//localStorage.clear();
																//options = JSON.parse(sudoScourceArgsLocalX);
																//setoptionsX(JSON.parse(sudoScourceArgsLocalX));
																onChange(x, index);
																optionsX[sudoId] = {
																	label: x.label,
																	value: sudoId,
																};
																setoptionsX(optionsX);
																//sudoScourceUpdate();
															}
														}}>
														<span>{x.label}</span>
														{obj[index] != null &&
															Object.entries(obj[index]).length > 0 ? (
															<span className="pg-text-color font-bold">*</span>
														) : (
															" "
														)}
													</div>
												</div>
												{x.arg != undefined && (
													<div className="w-16">
														<InputControl
															className="mr-2"
															value={x.arg}
															onChange={(newVal) => {
																x.arg = newVal;
															}}
														/>
													</div>
												)}
												{x.isPro && (
													// <span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
													<a
														target="_blank"
														href={
															"https://pickplugins.com/combo-blocks/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
															x.label
														}
														className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														{__("Pro", "combo-blocks")}
													</a>
													// </span>
												)}
											</div>
											{x.description != undefined &&
												x.description.length > 0 && (
													<div className="text-xs text-slate-400">
														{x.description}
													</div>
												)}
										</div>
									);
								})}
							{keyword.length == 0 &&
								typeof optionsX == "array" &&
								optionsX.map((x, index) => {
									return (
										<div
											className=" border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px]"
											onClick={(ev) => {
												//onChange(x, index)
												if (x.isPro == true) {
													alert("Sorry this feature only available in pro");
												} else {
													onChange(x, index);
												}
											}}>
											<div className="flex justify-between items-center">
												<div className="">
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="flex items-center gap-2">
														<span>{x.label}</span>
														{obj[index] != null &&
															Object.entries(obj[index]).length > 0 ? (
															<span className="pg-text-color font-bold">*</span>
														) : (
															" "
														)}{" "}
													</span>
												</div>
												{x.isPro && (
													<a
														target="_blank"
														href={
															"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
															x.label
														}
														className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														{__("Pro", "combo-blocks")}
													</a>
												)}
											</div>
											{x.description != undefined &&
												x.description.length > 0 && (
													<div className="text-xs text-slate-400">
														{x.description}
													</div>
												)}
										</div>
									);
								})}
							{keyword.length > 0 &&
								typeof filteredOptions == "object" &&
								Object.entries(filteredOptions).map((args) => {
									var index = args[0];
									var x = args[1];
									if (x.exclude == false) {
										return (
											<div
												className="border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px]"
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														alert("Sorry this feature only available in pro");
													} else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between items-center">
													<div className="">
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="flex items-center gap-2">
															<span>{x.label}</span>
															{obj[index] != null &&
																Object.entries(obj[index]).length > 0 ? (
																<span className="pg-text-color font-bold">
																	*
																</span>
															) : (
																" "
															)}{" "}
														</span>
													</div>
													{x.isPro && (
														<a
															target="_blank"
															href={
																"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
																x.label
															}
															className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
															{__("Pro", "combo-blocks")}
														</a>
													)}
												</div>
												{x.description != undefined &&
													x.description.length > 0 && (
														<div className="text-xs text-slate-400">
															{x.description}
														</div>
													)}
											</div>
										);
									}
								})}
							{keyword.length > 0 &&
								typeof filteredOptions == "array" &&
								filteredOptions.map((x, index) => {
									if (x.exclude == false) {
										return (
											<div
												className="border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px]"
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														alert("Sorry this feature only available in pro");
													} else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between items-center">
													<div className="">
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="flex items-center gap-2">
															<span>{x.label}</span>
															{obj[index] != null &&
																Object.entries(obj[index]).length > 0 ? (
																<span className="pg-text-color font-bold">
																	*
																</span>
															) : (
																" "
															)}{" "}
														</span>
													</div>
													{x.isPro && (
														<a
															target="_blank"
															href={
																"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
																x.label
															}
															className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
															{__("Pro", "combo-blocks")}
														</a>
													)}
												</div>
												{x.description != undefined &&
													x.description.length > 0 && (
														<div className="text-xs text-slate-400">
															{x.description}
														</div>
													)}
											</div>
										);
									}
								})}
							{keyword.length > 0 &&
								typeof filteredOptions == "object" &&
								Object.entries(filteredOptions).length == 0 && (
									<div className="text-center p-2 text-red-500 ">
										{__("No options found.", "combo-blocks")}
									</div>
								)}
							{keyword.length > 0 && filteredOptions.length == 0 && (
								<div className="text-center p-2 text-red-500 ">
									{__("No options found.", "combo-blocks")}
								</div>
							)}
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}
class PGDropdownSudoSelector extends Component {
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
			obj,
			variant,
			options,
			buttonTitle,
			onChange,
			values,
			value,
			sudoScourceUpdate,
		} = this.props;
		return (
			<div>
				<Html
					position={position}
					obj={obj}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					values={values}
					value={value}
					sudoScourceUpdate={sudoScourceUpdate}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}
export default PGDropdownSudoSelector;
