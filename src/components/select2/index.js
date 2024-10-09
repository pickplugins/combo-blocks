import { Button, PanelRow, Dropdown, Popover } from "@wordpress/components";
import { __experimentalInputControl as InputControl } from "@wordpress/components";
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
					<Button className={btnClass} variant={variant}>
						{options[value] != undefined ? options[value].label : buttonTitle}
					</Button>
				)}

				{typeof value != "string" && (
					<Button className={btnClass} variant={variant}>
						{buttonTitle}
					</Button>
				)}
			</div>

			{pickerOpen && (
				<Popover position={position}>
					<div className="p-2 w-60	">
						<InputControl
							autoComplete="off"
							className="p-3 w-full"
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

						<div>
							{keyword.length == 0 &&
								typeof options == "object" &&
								Object.entries(options).map((args) => {
									var index = args[0];
									var x = args[1];

									return (
										<div
											className={[
												typeof value == "object" &&
												value.includes(
													isNumeric(index) ? parseInt(index) : index
												)
													? "border-b cursor-pointer bg-slate-200 p-2 block"
													: "border-b cursor-pointer hover:bg-slate-200 p-2 block",
											]}
											onClick={(ev) => {
												if (x.isPro == true) {
													alert("Sorry this feature only avilbale in pro");
												} else {
													onChange(x, index);
												}
											}}>
											<div className="flex justify-between">
												<div className={[x.isPro ? "text-gray-400" : ""]}>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="">{x.label}</span>
												</div>
												{x.isPro && (
													<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
														<a
															target="_blank"
															href={
																"https://pickplugins.com/post-grid/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
																x.label
															}>
															Pro
														</a>
													</span>
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
								typeof options == "array" &&
								options.map((x, index) => {
									return (
										<div
											className={[
												typeof value == "object" &&
												value.includes(
													IsNumeric(index) ? parseInt(index) : index
												)
													? "border-b cursor-pointer bg-slate-200 p-2 block"
													: "border-b cursor-pointer hover:bg-slate-200 p-2 block",
											]}
											onClick={(ev) => {
												//onChange(x, index)

												if (x.isPro == true) {
													alert("Sorry this feature only avilbale in pro");
												} else {
													onChange(x, index);
												}
											}}>
											<div className="flex justify-between">
												<div>
													{x.icon != undefined && (
														<span className="">
															<RawHTML>{x.icon}</RawHTML>
														</span>
													)}
													<span className="">{x.label} </span>
												</div>
												{x.isPro && (
													<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
														Pro
													</span>
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
												className="  cursor-pointer hover:bg-slate-400 p-2 block"
												onClick={(ev) => {
													//onChange(x, index)

													if (x.isPro == true) {
														alert("Sorry this feature only avilbale in pro");
													} else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between">
													<div>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label} </span>
													</div>
													{x.isPro && (
														<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
															Pro
														</span>
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
												className="  cursor-pointer hover:bg-slate-400 p-2 block"
												onClick={(ev) => {
													//onChange(x, index)

													if (x.isPro == true) {
														alert("Sorry this feature only avilbale in pro");
													} else {
														onChange(x, index);
													}
												}}>
												<div className="flex justify-between">
													<div>
														{x.icon != undefined && (
															<span className="">
																<RawHTML>{x.icon}</RawHTML>
															</span>
														)}
														<span className="">{x.label} </span>
													</div>
													{x.isPro && (
														<span className="bg-amber-400 rounded-sm px-3  text-white hover:text-white">
															Pro
														</span>
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
										No options found.
									</div>
								)}

							{keyword.length > 0 && filteredOptions.length == 0 && (
								<div className="text-center p-2 text-red-500 ">
									No options found.
								</div>
							)}
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}

class PGSelect2 extends Component {
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
				/>
			</div>
		);
	}
}

export default PGSelect2;

