const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Button,
	Dropdown,
	ToggleControl,
	Popover,
	TextareaControl,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import { Icon, styles, settings, close, plusCircle } from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
import customTags from "../../custom-tags";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");
	//const [valArgs, setValArgs] = useState(props.val == undefined ? [] : val);
	const [search, setsearch] = useState({ enable: false, keyword: "" });
	const [keyword, setKeyword] = useState("");
	const [filteredOptions, setfilteredOptions] = useState([]);
	var tags = applyFilters("comboBlocksClassPickerFilter", customTags);
	// useEffect(() => {
	//   //props.onChange(valArgs.join(' '));
	// }, [valArgs]);
	useEffect(() => {
		//var val = (typeof props.val == 'object') ? props.val : props.val.split(" ");
		//setValArgs(val);
	}, [props.val]);
	useEffect(() => {
	}, [search]);
	return (
		<div className=" p-1">
			<div className="">
				<div className="flex justify-between items-center capitalize font-medium text-slate-900 text-[13px] ">
					<h3 className="!capitalize !text-[13px] !mb-0 pg-font ">
						{props.label}
					</h3>
					<div
						className="relative flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600	"
						onClick={(ev) => {
							setsearch({ ...search, enable: !search.enable });
						}}>
						<Icon fill="#fff" size="20" icon={plusCircle} />
						<span className="text-[13px] ">{__("Add", "combo-blocks")}</span>
					</div>
				</div>
				<div className="pg-setting-input-textarea">
					<TextareaControl
						className="w-full "
						value={props.val}
						placeholder={props.placeholder}
						onChange={(newVal) => {
							props.onChange(newVal);
						}}
					/>
				</div>
			</div>
			{search.enable && (
				// <>
				<Popover position="bottom left">
					<div className=" p-2 w-[300px] pg-font pg-setting-input-text   custom-scrollbar	">
						{/* <div className="flex justify-between items-center "> */}
						<InputControl
							autoComplete="off"
							className="p-3 w-full"
							placeholder={
								props.placeholder == undefined ? "Search..." : props.placeholder
							}
							value={keyword}
							onChange={(newVal) => {
								var newValX = newVal.replace(/[^a-zA-Z ]/g, "");
								if (newValX.length > 0) {
									setKeyword(newValX);
								}
								if (typeof tags == "object") {
									setfilteredOptions({});
									var newOptions = {};
									Object.entries(tags).map((args) => {
										var index = args[0];
										var x = args[1];
										let position = x.label
											.toLowerCase()
											.search(newValX.toLowerCase());
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
									tags.map((x, index) => {
										let position = x.label
											.toLowerCase()
											.search(newValX.toLowerCase());
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
								typeof tags == "object" &&
								Object.entries(tags).map((args) => {
									var index = args[0];
									var x = args[1];
									var id = args[0];
									var item = args[1];
									return (
										<div
											className={[
												typeof value == "object" &&
													value.includes(
														isNumeric(index) ? parseInt(index) : index
													)
													? "border-b cursor-pointer bg-slate-200 p-2 block"
													: "border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px] ",
											]}
											onClick={(ev) => {
												if (x.isPro == true) {
													alert("Sorry this feature only available in pro");
												} else {
													// onChange(x, index);
													props.onChange(props.val + " " + item.id);
												}
											}}>
											<div className="flex justify-between items-center">
												<div className={[x.isPro ? "text-gray-400" : ""]}>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="">{x.label}</span>
												</div>
												{x.isPro && (
													<a
														target="_blank"
														href={
															"https://pickplugins.com/combo-blocks/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
															x.label
														}
														className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
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
								typeof tags == "array" &&
								tags.map((x, index) => {
									return (
										<div
											className={[
												typeof value == "object" &&
													value.includes(
														IsNumeric(index) ? parseInt(index) : index
													)
													? "border-b cursor-pointer bg-slate-200 p-2 block"
													: "border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px] ",
											]}
											onClick={(ev) => {
												//onChange(x, index)
												if (x.isPro == true) {
													alert("Sorry this feature only available in pro");
												} else {
													// onChange(x, index);
													props.onChange(props.val + " " + item.id);
												}
											}}>
											<div className="flex justify-between items-center">
												<div>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="">{x.label} </span>
												</div>
												{x.isPro && (
													<a
														target="_blank"
														href={
															"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
															x.label
														}
														className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
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
												className="border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px] "
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														alert("Sorry this feature only available in pro");
													} else {
														// onChange(x, index);
														props.onChange(props.val + " " + x.id);
													}
												}}>
												<div className="flex justify-between items-center">
													<div>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label} </span>
													</div>
													{x.isPro && (
														<a
															target="_blank"
															href={
																"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
																x.label
															}
															className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
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
												className="border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:border-b-0 min-h-[40px] "
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														alert("Sorry this feature only available in pro");
													} else {
														// onChange(x, index);
														props.onChange(props.val + " " + x.id);
													}
												}}>
												<div className="flex justify-between items-center">
													<div>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label} </span>
													</div>
													{x.isPro && (
														<a
															target="_blank"
															href={
																"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
																x.label
															}
															className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
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
										{__("No tags found.", "combo-blocks")}
									</div>
								)}
							{keyword.length > 0 && filteredOptions.length == 0 && (
								<div className="text-center p-2 text-red-500 ">
									{__("No tags found.", "combo-blocks")}
								</div>
							)}
						</div>
					</div>
				</Popover>
				// </>
			)}
		</div>
	);
}
class PGcssClassPicker extends Component {
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
		var { value, placeholder, tags, label, onChange } = this.props;
		return (
			<Html
				val={value}
				placeholder={placeholder}
				tags={tags}
				label={label}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default PGcssClassPicker;
