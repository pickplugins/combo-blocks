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
	useRef,
} from "@wordpress/element";
import { DOWN, ENTER } from "@wordpress/keycodes";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [pickerOpen, setPickerOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [filteredOptions, setfilteredOptions] = useState([]);
	var position = props.position;
	var variant = props.variant;
	var btnClass = props.btnClass;
	var options = props.options;
	var buttonTitle = props.buttonTitle;
	var value = props.value == undefined ? "" : props.value;
	var onChange = props.onChange;
	//
	const firstElementRef = useRef(null);
	useEffect(() => {
		if (pickerOpen && firstElementRef.current) {
			firstElementRef.current.focus();
		}
	}, [pickerOpen]);
	const handleKeyDown = (event) => {
		if (!props.warn) return;
		const focusableElements = document.querySelectorAll(".focusable");
		const inputControl = document.querySelector(".pgDropdownSearch");
		switch (event.key) {
			case "ArrowDown":
				// case "ArrowRight":
				event.preventDefault();
				for (let i = 0; i < focusableElements.length; i++) {
					if (focusableElements[i] === document.activeElement) {
						const nextIndex = (i + 1) % focusableElements.length;
						focusableElements[nextIndex].focus();
						break;
					}
				}
				break;
			case "ArrowUp":
				// case "ArrowLeft":
				event.preventDefault();
				for (let i = 0; i < focusableElements.length; i++) {
					if (focusableElements[i] === document.activeElement) {
						const prevIndex =
							(i - 1 + focusableElements.length) % focusableElements.length;
						focusableElements[prevIndex].focus();
						break;
					}
				}
				break;
			case "/":
				event.preventDefault();
				if (inputControl) inputControl.focus();
				break;
			case "Escape":
				event.preventDefault();
				setPickerOpen(false);
				break;
			default:
				break;
		}
	};
	// Handle focusing on the first element
	// useEffect(() => {
	// 	if (props.warn && firstElementRef.current) {
	// 		firstElementRef.current.focus();
	// 	}
	// }, [props.warn]);
	//
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	return (
		<div className="relative">
			<div
				className=""
				onClick={(ev) => {
					setPickerOpen((prev) => !prev);
				}}>
				{typeof value == "string" && (
					<Button
						className={`${btnClass} pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600`}
					// variant={variant}
					>
						{options[value] != undefined ? options[value]?.label : buttonTitle}
					</Button>
				)}
				{typeof value != "string" && (
					<Button
						className={`${btnClass} pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600`}
					// variant={variant}
					>
						{buttonTitle}
					</Button>
				)}
			</div>
			{pickerOpen && (
				<Popover position={position}>
					<div
						className="p-2 w-[300px] pg-font pg-setting-input-text max-h-[350px] custom-scrollbar	"
						onKeyDown={handleKeyDown}>
						<span
							className="absolute -top-[15px] -left-[15px] rounded-full  w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
							onClick={(ev) => {
								setPickerOpen((prev) => !prev);
							}}>
							<span className="text-[20px] text-white ">&times;</span>
						</span>
						<div className="flex flex-col w-full ">
							<InputControl
								autoComplete="off"
								className="p-3 w-full pgDropdownSearch"
								placeholder={
									props.searchPlaceholder == undefined
										? "Search..."
										: props.searchPlaceholder
								}
								value={keyword}
								onChange={(newVal) => {
									var newValX = newVal.replace(/[^a-zA-Z ]/g, "");
									if (newValX.length > 0) {
										setKeyword(newValX);
									}
									if (typeof options == "object") {
										setfilteredOptions({});
										var newOptions = {};
										Object.entries(options).map((args) => {
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
										options.map((x, index) => {
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
							<p className="block w-full text-xs pg-font ">
								{" "}
								Press{" "}
								<code className="inline-block p-1 px-2 bg-gray-500/60 text-white">
									⭾ Tab
								</code>{" "}
								to access by keyboard.
							</p>
						</div>
						<div>
							{keyword.length == 0 &&
								typeof options == "object" &&
								Object.entries(options).map((args) => {
									var index = args[0];
									var x = args[1];
									return (
										<button
											ref={firstElementRef}
											className={[
												typeof value == "object" &&
													value.includes(
														isNumeric(index) ? parseInt(index) : index
													)
													? "w-full focusable !border-b cursor-pointer bg-slate-200 p-2 block"
													: "w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] ",
											]}
											onClick={(ev) => {
												if (x.isPro == true) {
													alert("Sorry this feature only available in pro");
												}
												else if (x.isComming == true) {
													ev.preventDefault();
													alert("Sorry this feature is comming soon");
													return;
												}
												else {
													onChange(x, index);
												}
											}}>
											<div className="flex justify-between items-center">
												<div
													className={[
														x.isPro ? "text-gray-400 text-left" : "text-left",
													]}>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className=" text-left">{x.label}</span>
												</div>
												{x.isPro && (
													<a
														target="_blank"
														href={
															"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=" +
															x.label
														}
														className=" no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														{__("Pro", "combo-blocks")}
													</a>
												)}
												{x.isComming && (
													<span
														className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														{__("Coming Soon", "combo-blocks")}
													</span>
												)}
											</div>
											{x.description != undefined &&
												x.description.length > 0 && (
													<div className="text-xs text-slate-400 text-left">
														{x.description}
													</div>
												)}
										</button>
									);
								})}
							{keyword.length == 0 &&
								typeof options == "array" &&
								options.map((x, index) => {
									return (
										<button
											ref={firstElementRef}
											className={[
												typeof value == "object" &&
													value.includes(
														IsNumeric(index) ? parseInt(index) : index
													)
													? "border-b cursor-pointer bg-slate-200 p-2 block"
													: "border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] ",
											]}
											onClick={(ev) => {
												if (x.isPro == true) {
													alert("Sorry this feature only available in pro");
												} else {
													onChange(x, index);
												}
											}}>
											<div className="flex justify-between items-center">
												<div
													className={[
														x.isPro
															? "text-gray-400  text-left"
															: "  text-left",
													]}>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="  text-left">{x.label} </span>
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
												{x.isComming && (
													<span
														className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														{__("Coming Soon", "combo-blocks")}
													</span>
												)}
											</div>
											{x.description != undefined &&
												x.description.length > 0 && (
													<div className="text-xs text-slate-400 text-left">
														{x.description}
													</div>
												)}
										</button>
									);
								})}
							{keyword.length > 0 &&
								typeof filteredOptions == "object" &&
								Object.entries(filteredOptions).map((args) => {
									var index = args[0];
									var x = args[1];
									if (x.exclude == false) {
										return (
											<button
												ref={firstElementRef}
												className="w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] "
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														ev.preventDefault();
														alert("Sorry this feature only available in pro");
														return;
													}
													else if (x.isComming == true) {
														ev.preventDefault();
														alert("Sorry this feature is comming soon");
														return;
													}
													else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between items-center">
													<div
														className={[
															x.isPro
																? "text-gray-400  text-left"
																: "  text-left",
														]}>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="  text-left">{x.label} </span>
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
														<div className="text-xs text-slate-400 text-left">
															{x.description}
														</div>
													)}
											</button>
										);
									}
								})}
							{keyword.length > 0 &&
								typeof filteredOptions == "array" &&
								filteredOptions.map((x, index) => {
									if (x.exclude == false) {
										return (
											<button
												ref={firstElementRef}
												className="w-full focusable !border-b !border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent !border-solid cursor-pointer hover:bg-slate-200 p-2 block last-of-type:!border-b-0 min-h-[40px] "
												onClick={(ev) => {
													//onChange(x, index)
													if (x.isPro == true) {
														alert("Sorry this feature only available in pro");
													}
													else if (x.isComming == true) {
														ev.preventDefault();
														alert("Sorry this feature is comming soon");
														return;
													}
													else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between items-center">
													<div
														className={[
															x.isPro
																? "text-gray-400  text-left"
																: "  text-left",
														]}>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="  text-left">{x.label} </span>
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
													{x.isComming && (
														<span
															className="no-underline  bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
															{__("Coming Soon", "combo-blocks")}
														</span>
													)}
												</div>
												{x.description != undefined &&
													x.description.length > 0 && (
														<div className="text-xs text-slate-400 text-left">
															{x.description}
														</div>
													)}
											</button>
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
			)
			}
		</div >
	);
}
class PGDropdown extends Component {
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
					warn={this.state.showWarning}
					handleToggleClick={this.handleToggleClick}
				/>
			</div>
		);
	}
}
export default PGDropdown;
