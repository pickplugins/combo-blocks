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
import { Icon, close, copy, pages } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [visible, setVisible] = useState(props.visible);
	const [postTypes, setpostTypes] = useState({});
	const [PMProLevels, setPMProLevels] = useState(null);
	const [MeprMemberships, setMeprMemberships] = useState({});

	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);

	var [enableDatePicker, setenableDatePicker] = useState(false);
	const [userRoles, setuserRoles] = useState({});
	const [taxonomies, settaxonomies] = useState({});

	useEffect(() => {
		var visibleX = { ...visible };
		visibleX.rules = rules;
		setVisible(visibleX);
		props.onChange(visibleX);

	}, [rules]);


	useEffect(() => {
		apiFetch({
			path: "/combo-blocks/v2/post_types",
			method: "POST",
			data: {},
		}).then((res) => {
			var types = Object.fromEntries(
				Object.entries(res).map(([key, value]) => [
					key,
					{ label: value, value: key },
				])
			);
			// Object.entries(res).map((x) => {
			// 	var postTypeId = x[0];
			// 	var postTypeLabel = x[1];
			// 	types.push({ label: postTypeLabel, value: postTypeId });
			// });
			setpostTypes(types);
		});
		apiFetch({
			path: "/combo-blocks/v2/pmpro_membership_levels",
			method: "POST",
			data: {},
		}).then((res) => {
			var levels = Object.fromEntries(
				Object.entries(res).map(([key, args]) => [
					key,
					{ label: args.name, value: args.id },
				])
			);
			setPMProLevels(levels);
		});
		apiFetch({
			path: "/combo-blocks/v2/mepr_memberships",
			method: "POST",
			data: {},
		}).then((res) => {
			var levels = Object.fromEntries(
				Object.entries(res).map(([key, args]) => [
					args.value,
					{ label: args.label, value: args.value },
				])
			);
			setMeprMemberships(levels);
		});
	}, []);
	useEffect(() => {
		apiFetch({
			path: "/combo-blocks/v2/get_site_data",
			method: "POST",
			data: {},
		}).then((res) => {
			var userRolesList = [];
			Object.entries(res.roles).map((args) => {
				var id = args[0];
				var label = args[1];
				userRolesList.push({ label: label, value: id });
			});
			var taxonomiesList = {};
			// Object.entries(res.taxonomies).map((args) => {
			// 	var id = args[0];
			// 	var label = args[1];
			// 	taxonomiesList.push({ label: label, value: id });
			// });
			res?.taxonomies.forEach((tax, index) => {
				taxonomiesList[tax.id] = { label: tax.label, value: tax.id };
			});
			setuserRoles(userRolesList);
			settaxonomies(taxonomiesList);
		});
	}, []);





	var visibleArgsBasic = {

		isUserMeta: {
			label: "Add condition",
			description: "",
			args: { selector: "", value: "", values: [], compare: "=" },
		},

		// visitCount: { label: 'Visit Count', description: 'Display popup based on date', args: { id: 'visitCount', value: '', compair: '' }, isPro: true },
	};
	//let visibleArgs = applyFilters("comboBlocksVisibleArgs", visibleArgsBasic);
	let visibleArgs = visibleArgsBasic;
	var RemoveVisibleGroup = function ({ title, index }) {
		return (
			<>
				<Icon
					icon={close}
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.splice(index, 1);
						setrules(rulesX);
					}}
				/>
				<span>{title}</span>
			</>
		);
	};
	var RemoveVisibleArg = function ({ title, index, groupIndex }) {
		return (
			<>
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX[groupIndex].args.splice(index, 1);
						setrules(rulesX);
					}}>
					<Icon icon={close} />
				</span>
				<span>{title}</span>
			</>
		);
	};

	const copyData = (data) => {
		const dataString = JSON.stringify(data, null, 2);
		navigator.clipboard
			.writeText(dataString)
			.then(() => {
				// alert("Data copied to clipboard!");
			})
			.catch((err) => { });
	};
	const pasteData = () => {
		navigator.clipboard
			.readText()
			.then((text) => {
				const parsedData = JSON.parse(text);
				setVisible(parsedData);
				// var visibleX = { ...parsedData };
				// visibleX.rules = rules;
				// setVisible(visibleX);
				props.onChange(parsedData);

			})
			.catch((err) => { });
	};
	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.push({ relation: "OR", title: "", args: [] });
						setrules(rulesX);
					}}>
					{__("Add Group", "combo-blocks")}
				</div>
				<div
					className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
					onClick={() => {
						copyData(rules);
					}}>
					<Icon icon={copy} className="fill-white " size={14} />
					{__("Copy", "combo-blocks")}
				</div>
				<div
					className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
					onClick={() => {
						pasteData();
					}}>
					<Icon icon={pages} className="fill-white " size={14} />
					{__("Paste", "combo-blocks")}
				</div>
				{/* <PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle={
						visible?.relation == undefined ? "Relation?" : visible.relation
					}
					options={[
						{ label: "OR", value: "OR" },
						{ label: "AND", value: "AND" },
					]}
					onChange={(option, index) => {
						var visibleX = { ...visible };
						visibleX.relation = option.value;
						setVisible(visibleX);
					}}
					values=""></PGDropdown> */}
			</PanelRow>
			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PGtoggle
							title={
								<RemoveVisibleGroup title={groupIndex} index={groupIndex} />
							}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add"}
									options={visibleArgs}
									onChange={(option, index) => {
										var rulesX = [...rules];
										rulesX[groupIndex]["args"].push(option.args);
										setrules(rulesX);
									}}
									values=""></PGDropdown>
								{/* <PanelRow>
									<label>{__("Relation?", "combo-blocks")}</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											group["relation"] == undefined
												? __("Choose", "combo-blocks")
												: group["relation"]
										}
										options={[
											{ label: "OR", value: "OR" },
											{ label: "AND", value: "AND" },
										]}
										onChange={(option, index) => {
											var rulesX = [...rules];
											rulesX[groupIndex]["relation"] = option.value;
											setrules(rulesX);
										}}
										values=""></PGDropdown>
								</PanelRow> */}
							</PanelRow>
							{rules[groupIndex]["args"] != undefined &&
								rules[groupIndex]["args"].map((item, index) => {
									var id = item.id;
									return (
										<>
											<PGtoggle
												title={
													<RemoveVisibleArg
														title={
															item.selector +
															" " +
															item.compare +
															" " +
															item.value
														}
														index={index}
														groupIndex={groupIndex}
													/>
												}
												initialOpen={false}>
												<>
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															Selector
														</label>
														<InputControl
															className="mr-2"
															value={item.selector}
															onChange={(newVal) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].selector =
																	newVal;
																setrules(rulesX);
															}}
														/>
													</PanelRow>

													{(item.compare == "lengthEqual" ||
														item.compare == "lengthGtEq" ||
														item.compare == "lengthGtEq" ||
														item.compare == "lengthGt" ||
														item.compare == "lengthLtEq" ||
														item.compare == "lengthLt" ||
														item.compare == "=" ||
														item.compare == "!=" ||
														item.compare == ">=" ||
														item.compare == "<=" ||
														item.compare == "regexp") && (
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Value
																</label>
																<InputControl
																	className="mr-2"
																	value={item.value}
																	onChange={(newVal) => {
																		var rulesX = [...rules];
																		rulesX[groupIndex]["args"][index].value =
																			newVal;
																		setrules(rulesX);
																	}}
																/>
															</PanelRow>
														)}
													{(item.compare == "contain" ||
														item.compare == "notContain" ||
														item.compare == "between" ||
														item.compare == "exist") && <></>}

													{item.compare == "exist" && (
														<>
															<div
																onClick={(ev) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push("dfsd");
																	setrules(rulesX);
																}}>
																Add
															</div>
															<div>
																{item.values.map((x, i) => {
																	return (
																		<div className="flex justify-between my-1">
																			<span></span>
																			<span
																				className="bg-red-500 text-white p-1 cursor-pointer hover:"
																				onClick={(ev) => {
																					item.values.splice(i, 1);
																					var rulesX = [...rules];
																					rulesX[groupIndex]["args"][index][
																						"values"
																					] = item.values;
																					setrules(rulesX);
																				}}>
																				<Icon fill="#fff" icon={close} />
																			</span>
																		</div>
																	);
																})}
															</div>
														</>
													)}
													{item.compare == "between" && (
														<>
															<PanelRow className="mb-4"></PanelRow>
															<div>
																{item.values.slice(0, 2).map((x, i) => {
																	return (
																		<div className="flex justify-between my-1">
																			<span></span>
																			<span
																				className="bg-red-500 text-white p-1 cursor-pointer hover:"
																				onClick={(ev) => {
																					item.values.splice(i, 1);
																					var rulesX = [...rules];
																					rulesX[groupIndex]["args"][index][
																						"values"
																					] = item.values;
																					setrules(rulesX);
																				}}>
																				<Icon fill="#fff" icon={close} />
																			</span>
																		</div>
																	);
																})}
															</div>
														</>
													)}

													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Compare", "combo-blocks")}
														</label>
														<SelectControl
															label=""
															value={item.compare}
															options={[
																{ label: "Empty", value: "empty" },
																{ label: "Not empty", value: "notEmpty" },
																{ label: "Length Equal", value: "lengthEqual" },
																{ label: "Length >=", value: "lengthGtEq" },
																{ label: "Length >", value: "lengthGt" },
																{ label: "Length <=", value: "lengthLtEq" },
																{ label: "Length <", value: "lengthLt" },
																{ label: "=", value: "=" },
																{ label: "!=", value: "!=" },
																{ label: "Contain", value: "contain" },
																{ label: "Not Contain", value: "notContain" },
																{ label: ">=", value: ">=" },
																{ label: "<=", value: "<=" },
																{ label: "Between", value: "between" },
																{ label: "Exist", value: "exist" },
																{ label: "Regexp", value: "regexp" },
															]}
															onChange={(newVal) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index]["compare"] =
																	newVal;
																setrules(rulesX);
															}}
														/>
													</PanelRow>
												</>
											</PGtoggle>
										</>
									);
								})}
						</PGtoggle>
					);
				})}
			</div>
		</div>
	);
}
class PGFormFieldConditions extends Component {
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
export default PGFormFieldConditions;
