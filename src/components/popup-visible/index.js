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
	CheckboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import apiFetch from "@wordpress/api-fetch";
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
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../dropdown";
import PGtoggle from "../toggle";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [visible, setVisible] = useState(props.visible);
	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);
	const [userRoles, setuserRoles] = useState({});
	const [taxonomies, settaxonomies] = useState({});
	// useEffect(() => {
	// 	props.onChange(visible);
	// }, [visible]);
	useEffect(() => {
		var visibleX = { ...visible };
		visibleX.rules = rules;
		setVisible(visibleX);
		props.onChange(visibleX);
	}, [rules]);
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
	var pageTypes = {
		homePage: { label: "Home", value: "homePage" },
		frontPage: {
			label: "Front page",
			value: "frontPage",
		},
		postsPage: {
			label: "Posts Page",
			value: "postsPage",
		},
		is404: { label: "Date Page", value: "is404" },
		wcAccount: {
			label: "WooCommerce Account",
			value: "wcAccount",
		},
		wcShop: {
			label: "WooCommerce Shop",
			value: "wcShop",
		},
		searchPage: {
			label: "Search page",
			value: "searchPage",
		},
	};
	const [postTypes, setpostTypes] = useState({});
	var keyEventsX = {
		Escape: { label: "Escape", value: "Escape" },
		Enter: { label: "Enter", value: "Enter" },
		" ": { label: "Space", value: " " },
		Backspace: { label: "Backspace", value: "Backspace" },
	};
	var [keyEvents, setkeyEvents] = useState(keyEventsX);
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
	}, []);
	var visibleArgsBasic = {
		initial: {
			label: __("Initial", "combo-blocks"),
			description: "Visble as soon as possible",
			args: { id: "initial", value: 5 },
		},
		delay: {
			label: __("Delay", "combo-blocks"),
			description: "Delay certain amount of time after page load.",
			args: { id: "delay", value: 1000 },
		},
		scrollPercent: {
			label: __("Scroll Percent", "combo-blocks"),
			description: "After certain amount(parcent) of scroll",
			args: { id: "scrollPercent", min: "30", max: 50 },
		},
		scrollFixed: {
			label: __("Scroll Fixed", "combo-blocks"),
			description: "After fixed amount of scroll",
			args: { id: "scrollFixed", min: "30", max: 50 },
			isPro: true,
		},
		scrollEnd: {
			label: __("Scroll End", "combo-blocks"),
			description: "Scroll to end of page",
			args: { id: "scrollEnd", min: "30", max: 50 },
			isPro: true,
		},
		scrollElement: {
			label: __("Scroll Element", "combo-blocks"),
			description: "Scroll to certain element by class or id",
			args: { id: "scrollElement", value: "" },
			isPro: true,
		},
		clickFirst: {
			label: __("Click First", "combo-blocks"),
			description: "After first click on page",
			args: { id: "clickFirst", value: 1 },
			isPro: true,
		},
		clickCount: {
			label: __("Click Count", "combo-blocks"),
			description: "After certain amount of click on page",
			args: { id: "clickCount", value: 5 },
			isPro: true,
		},
		clickRight: {
			label: __("Click Right", "combo-blocks"),
			description: "on right click",
			args: { id: "clickRight", value: 0 },
			isPro: true,
		},
		onExit: {
			label: __("On Exit", "combo-blocks"),
			description: "before close browser tab.",
			args: { id: "onExit", value: 1 },
			isPro: true,
		},
		clickElement: {
			label: __("Click Element", "combo-blocks"),
			description: "After click an element by id or class",
			args: { id: "clickElement", value: "" },
			isPro: true,
		},
		dateCountdownExpired: {
			label: __("Date Countdown Expired", "combo-blocks"),
			description: "After expired from date countdown block",
			args: { id: "dateCountdownExpired", value: "", once: false },
			isPro: true,
		},
		keyPress: {
			label: __("Key Press", "combo-blocks"),
			description: "Key Press to close.",
			args: { id: "keyPress", value: "esc" },
			isPro: true,
		},
		// wooAddToCart: {
		// 	label: "Woo-Commerce Add to Cart",
		// 	description: "Popup open when added to cart",
		// 	args: { id: "wooAddToCart", value: "", compare: "=" },
		// 	isPro: true,
		// },
		mouseOutElement: {
			label: __("Mouse Out Element", "combo-blocks"),
			description: "if visitor come from external website.",
			args: { id: "mouseOutElement", value: "" },
			isPro: true,
		},
		mouseOverElement: {
			label: __("Mouse Over Element", "combo-blocks"),
			description: "if visitor come from external website.",
			args: { id: "mouseOverElement", value: "" },
			isPro: true,
		},
		// inactiveXSec: {
		// 	label: "Inactive X Second",
		// 	description: "if visitor come from external website.",
		// 	args: { id: "inactiveXSec", value: "" },
		// 	isPro: true,
		// },
		// ADBlocker: {
		// 	label: "Ad blocker Popup",
		// 	description: "if visitor come from external website.",
		// 	args: { id: "ADBlocker", value: "" },
		// 	isPro: true,
		// },
	};
	let visibleArgs = applyFilters("comboBlocksPopupVisibleArgs", visibleArgsBasic);
	var RemoveVisibleGroup = function ({ title, index }) {
		return (
			<>
				<div className="flex items-center">
					<Icon
						icon={close}
						onClick={(ev) => {
							var rulesX = [...rules];
							rulesX.splice(index, 1);
							setrules(rulesX);
						}}
					/>
					<span>{title}</span>
				</div>
			</>
		);
	};
	var RemoveVisibleArg = function ({ title, index, groupIndex }) {
		return (
			<>
				<Icon
					icon={close}
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX[groupIndex].args.splice(index, 1);
						setrules(rulesX);
					}}
				/>
				<span>{title}</span>
			</>
		);
	};
	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.push({ relation: "OR", title: "", args: [] });
						setrules(rulesX);
					}}>
					{__("Add Group", "combo-blocks")}
				</div>
				{/* <PanelRow>
					<PGDropdown
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
						values=""></PGDropdown>
				</PanelRow> */}
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
									<label>Relation?</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											group["relation"] == undefined
												? __("Choose","combo-blocks")
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
															visibleArgs[id] == undefined
																? id
																: visibleArgs[id].label
														}
														index={index}
														groupIndex={groupIndex}
													/>
												}
												initialOpen={false}>
												{id == "initial" && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}
												{id == "delay" && (
													<PanelRow className="mb-4 flex-col items-start gap-2">
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Duration", "combo-blocks")}
														</label>
														<InputControl
															className="mr-2"
															placeholder=".element or #elementId"
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
												{id == "scrollPercent" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Minimum", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Max", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "scrollFixed" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Minimum", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Max", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "scrollEnd" && (
													<>
														<div>
															{__(
																"No Option available for this condition.",
																"combo-blocks"
															)}
														</div>
													</>
												)}
												{id == "scrollElement" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element Class/ID", "combo-blocks")}
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
													</>
												)}
												{id == "clickFirst" && (
													<>
														<div>
															{__(
																"No Option available for this condition.",
																"combo-blocks"
															)}
														</div>
													</>
												)}
												{id == "clickCount" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Click Count", "combo-blocks")}
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
													</>
												)}
												{id == "clickRight" && (
													<>
														<ToggleControl
															label="Disabled right menu?"
															help={
																item.value
																	? "Right Menu Disabled "
																	: "Right Menu Enabled."
															}
															checked={item.value ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].value =
																	item.value ? 0 : 1;
																setrules(rulesX);
															}}
														/>
													</>
												)}
												{id == "onExit" && (
													<>
														<div>
															{__(
																"No Option available for this condition.",
																"combo-blocks"
															)}
														</div>
													</>
												)}
												{id == "fluentformSubmission" && (
													<>
														<div>
															{__(
																"No Option available for this condition.",
																"combo-blocks"
															)}
														</div>
													</>
												)}
												{id == "wooAddToCart" && (
													<>
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
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Product IDs", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{(id == "clickElement" ||
													id == "mouseOutElement" ||
													id == "mouseOverElement") && (
														<>
															<PanelRow className="mb-4 flex-col items-start gap-2">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Element ID/Class", "combo-blocks")}
																</label>
																<InputControl
																	className="mr-2"
																	placeholder=".element or #elementId"
																	value={item.value}
																	onChange={(newVal) => {
																		var rulesX = [...rules];
																		rulesX[groupIndex]["args"][index].value =
																			newVal;
																		setrules(rulesX);
																	}}
																/>
															</PanelRow>
														</>
													)}
												{id == "inactiveXSec" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Inactive (sec)", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																placeholder="3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "queryArgExist" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Argument", "combo-blocks")}
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
													</>
												)}
												{id == "queryArgEqualX" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Query Arg Value", "combo-blocks")}
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
													</>
												)}
												{id == "reviewXProducts" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Has review on X Products", "combo-blocks")}
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
													</>
												)}
												{id == "userVisitXPages" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Page Ids", "combo-blocks")}
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
													</>
												)}
												{id == "userCommentedXTimes" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Number of Comments", "combo-blocks")}
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
													</>
												)}
												{id == "postHasTerms" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Term Slug", "combo-blocks")}
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
													</>
												)}
												{id == "cookieExist" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Cookie Name", "combo-blocks")}
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
													</>
												)}
												{id == "cookieNotExist" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Cookie Name", "combo-blocks")}
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
													</>
												)}
												{id == "urlPrams" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("URL Parameter", "combo-blocks")}
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
													</>
												)}
												{id == "userIds" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("User IDs", "combo-blocks")}
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
													</>
												)}
												{id == "referrerExist" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Referrer Domain", "combo-blocks")}
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
													</>
												)}
												{id == "dateCountdownExpired" && (
													<>
														<ToggleControl
															label="Is Once?"
															className="my-4"
															help={
																item.once
																	? __("IsOnce is Enable", "combo-blocks")
																	: __("IsOnce is disabled.", "combo-blocks")
															}
															checked={item.once ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].once =
																	item.once ? 0 : 1;
																setrules(rulesX);
															}}
														/>
													</>
												)}
												{(id == "userLogged" || id == "ADBlocker") && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}
												{id == "keyPress" && (
													<>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={__("Choose", "combo-blocks")}
															options={keyEvents}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{keyEvents != null && (
																			<span>{keyEvents[x]?.label}</span>
																		)}
																		<span
																			className="bg-red-500 text-white cursor-pointer rounded-full"
																			onClick={(ev) => {
																				var visibleX = {
																					...visible,
																				};
																				item.values.splice(i, 1);
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
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
												{id == "postTypes" && (
													<>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={__("Choose Post Types", "combo-blocks")}
															options={postTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{postTypes != null && (
																			<span>{postTypes[x]?.label}</span>
																		)}
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var visibleX = {
																					...visible,
																				};
																				item.values.splice(i, 1);
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
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
												{id == "pageTypes" && (
													<>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={__("Choose Page Types", "combo-blocks")}
															options={pageTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		<span>{pageTypes[x].label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var visibleX = {
																					...visible,
																				};
																				item.values.splice(i, 1);
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
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
class PGPopupVisible extends Component {
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
export default PGPopupVisible;
