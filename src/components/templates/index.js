const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import {
	Icon,
	styles,
	close,
	settings,
	download,
	plusCircle,
	arrowRight,
} from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGinputText from "../../components/input-text";
import PGRequestTemplate from "../../components/request-a-template";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
function Html(props) {
	if (!props.warn) {
		return null;
	}

	var enable = props.enable;

	const [searchPrams, setsearchPrams] = useState({
		keyword: "",
		categories: [],
		page: 1,
		myTemplates: false,
	});
	var [templateLibrary, settemplateLibrary] = useState({ items: [] });
	var [templateLibraryCats, settemplateLibraryCats] = useState([]);
	var [templateType, settemplateType] = useState("section"); // section, fullpage, bundle, archive
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [isLoading, setIsLoading] = useState(false);
	var [customTemplate, setcustomTemplate] = useState(false);
	var [spin, setSpin] = useState(false);
	let isProFeature = applyFilters("isProFeature", true);
	var templateTypes = {
		section: { label: "Sections", value: "section" },
		fullpage: { label: "Full pages", value: "fullpage" },
		// bundle: { label: "Bundles", value: "bundle" },
	};
	// useEffect(() => {
	// 	fetchCss();
	// }, [searchPrams]);

	useEffect(() => { }, [enable]);

	useEffect(() => {
		settemplateLibrary({ items: [] });
		fetchCss();
	}, [templateType]);
	function loadMasonry() {
		var elem = document.querySelector("#itemsWrap");
		if (elem != null) {
			imagesLoaded(elem, function () {
				var msnry = new Masonry(elem, {
					// options
					itemSelector: ".item",
					gutter: 15,
					horizontalOrder: true,
					percentPosition: true,
					fitWidth: true,
				});
			});
		}
	}
	function fetchCss() {
		setIsLoading(true);
		var postData = {
			keyword: searchPrams.keyword,
			page: searchPrams.page,
			categories: searchPrams.categories,
		};
		postData = JSON.stringify(postData);
		if (templateType == "section") {
			fetch(
				"https://comboblocks.com/server/wp-json/combo-blocks/v2/get_post_section",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: postData,
				}
			)
				.then((response) => {
					if (response.ok && response.status < 400) {
						response.json().then((res) => {
							var items = templateLibrary.items;
							if (res.posts.length > 0) {
								res.posts.map((x) => {
									return items.push(x);
								});
								settemplateLibrary({ items: items });
							}
							var cats = res.terms.map((x) => {
								return {
									label:
										x.count == undefined
											? x.label
											: x.label + " (" + x.count + ")",
									value: x.value,
								};
							});
							settemplateLibraryCats(cats);
							setIsLoading(false);
							setTimeout(() => {
								//loadMasonry();
							}, 500);
						});
					}
				})
				.catch((_error) => {
					//this.saveAsStatus = 'error';
					// handle the error
				});
		}
		if (templateType == "fullpage") {
			fetch(
				"https://comboblocks.com/server/wp-json/combo-blocks/v2/get_post_fullpage",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: postData,
				}
			)
				.then((response) => {
					if (response.ok && response.status < 400) {
						response.json().then((res) => {
							var items = templateLibrary.items;
							if (res.posts.length > 0) {
								res.posts.map((x) => {
									return items.push(x);
								});
								settemplateLibrary({ items: items });
							}
							var cats = res.terms.map((x) => {
								return {
									label:
										x.count == undefined
											? x.label
											: x.label + " (" + x.count + ")",
									value: x.value,
								};
							});
							settemplateLibraryCats(cats);
							setIsLoading(false);
							setTimeout(() => {
								//loadMasonry();
							}, 500);
						});
					}
				})
				.catch((_error) => {
					//this.saveAsStatus = 'error';
					// handle the error
				});
		}
	}

	return (
		<div
			className={
				!enable
					? "hidden pg-setting-input-text"
					: "pg-setting-input-text  fixed z-[999] top-[70px] h-[90vh] w-full border-2 border-solid border-gray-600 bg-gray-700/50"
			}>
			<div className="w-[80%] h-full bg-gray-400 mx-auto overflow-y-scroll">
				<div className="flex justify-between items-center p-3 bg-white ">
					<div className="flex  items-center ">
						<div className="px-4">
							{isLoading && (
								<span className="text-center">
									<Spinner /> {templateType}
								</span>
							)}
							{!isLoading && (
								<span className="text-center">
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={templateTypes}
										buttonTitle={
											templateTypes[templateType] == undefined
												? "Categories"
												: templateTypes[templateType].label
										}
										onChange={(option, index) => {
											settemplateLibrary({ items: [] });
											setsearchPrams({ ...searchPrams, page: 0 });
											settemplateType(option.value);
										}}
										values={[]}></PGDropdown>
								</span>
							)}
						</div>
						<div>
							<Icon icon={arrowRight} />
						</div>
						<div>
							<InputControl
								className="w-60 !px-3 !py-2 !rounded-none !text-lg"
								type="text"
								placeholder="Search..."
								value={searchPrams.keyword}
								onChange={(newVal) => {
									clearTimeout(debounce);
									debounce = setTimeout(() => {
										//var newVal = ev.target.value;
										settemplateLibrary({ items: [] });
										setsearchPrams({ ...searchPrams, keyword: newVal });
									}, 1000);
								}}
							/>
						</div>
						<div className="px-2">
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={templateLibraryCats}
								buttonTitle="Categories"
								onChange={(option, index) => {
									if (searchPrams.categories.includes(option.value)) {
										var categoriesX = searchPrams.categories.splice(
											option.value,
											1
										);
									} else {
										var categoriesX = searchPrams.categories.concat(
											option.value
										);
									}
									setsearchPrams({ ...searchPrams, categories: categoriesX });
									settemplateLibrary({ items: [] });
								}}
								values={[]}></PGDropdown>
						</div>
						<div className="px-4 flex items-center">
							{searchPrams.categories.length > 0 &&
								searchPrams.categories.map((x, index) => {
									return (
										<div className="flex items-center mx-1 text-sm  bg-slate-500 text-white">
											<span
												className="cursor-pointer p-1 bg-red-500 inline-block"
												onClick={() => {
													settemplateLibrary({ items: [] });
													var categoriesX = searchPrams.categories.splice(
														index,
														1
													);
													setsearchPrams({
														...searchPrams,
														categories: searchPrams.categories,
													});
												}}>
												<Icon icon={close} />
											</span>{" "}
											<span className="px-2 inline-block">
												{
													templateLibraryCats[
														templateLibraryCats.findIndex((p) => p.value == x)
													].label
												}
											</span>
										</div>
									);
								})}
						</div>
						<ToggleControl
							className="!mb-0 hidden"
							label={
								searchPrams.myTemplates
									? "Loaded Your Teplates?"
									: "My Teplates?"
							}
							checked={searchPrams.myTemplates ? true : false}
							onChange={(e) => {
								setsearchPrams({
									...searchPrams,
									myTemplates: !searchPrams.myTemplates,
								});
							}}
						/>
					</div>
					<div className="flex items-center">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white  rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
							// className="bg-gray-700 hover:bg-gray-600 flex items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-lg text-white px-4 py-1 rounded-sm hover:text-white"
							onClick={() => {
								setcustomTemplate(!customTemplate);
								setTimeout(() => {
									//loadMasonry();
								}, 500);
							}}>
							<span className="dashicons dashicons-slides mr-2"></span>
							<span>{__("Request a Template", "combo-blocks")}</span>
						</div>
						<div className="px-4">
							<span
								className="cursor-pointer rounded-sm p-1 bg-red-500 hover:bg-red-600 inline-block"
								onClick={() => {
									props.setEnable(false);
								}}>
								<Icon icon={close} className="fill-white" />
							</span>
						</div>
					</div>
				</div>
				<div className="p-5 ">
					{customTemplate && <PGRequestTemplate />}
					{!customTemplate && (
						<>
							<div id="itemsWrap" className="mx-auto grid grid-cols-4 gap-5 ">
								{templateLibrary.items.map((x, index) => {
									return (
										<div
											className=" bg-white item grid-rows-[subgrid]"
											key={index}>
											<div className="relative pt-3 h-[200px]">
												<img
													className="!shadow-none !h-full object-contain w-full"
													src={x.thumb_url}
													alt=""
												/>
												{isProFeature && (
													<div className="absolute top-2 right-2">
														{!x.is_pro && (
															<span className=" bg-lime-600 px-4 py-2  no-underline rounded-sm  cursor-pointer ">
																{__("Free", "combo-blocks")}
															</span>
														)}
														{x.is_pro && (
															<span className="bg-amber-500  px-4 py-2  no-underline rounded-sm  cursor-pointer ">
																{__("Pro", "combo-blocks")}
															</span>
														)}
													</div>
												)}
											</div>
											{(!x.is_pro || (x.is_pro && !isProFeature)) && (
												<div className="flex items-center  p-2 ">
													<div
														className="bg-gray-700 hover:bg-gray-600 p-1 px-3 cursor-pointer rounded-sm flex items-center"
														onClick={async (ev) => {
															setSpin(true);
															console.log(spin);
															try {
																var content = x.post_content;
																var wp_editor = wp.data.dispatch("core/editor");
																var wp_insertBlocks = wp_editor.insertBlocks;
																await wp_insertBlocks(wp.blocks.parse(content)); // Assuming insertBlocks returns a promise
																props.setEnable(false);
															} catch (error) {
																console.error("Error inserting blocks:", error);
															} finally {
																setSpin(false);
																console.log(spin);
															}
														}}>
														<span className="inline-block">
															{spin ? (
																<Spinner />
															) : (
																<Icon icon={download} className="fill-white" />
															)}
														</span>
													</div>
													<a
														className="inline-block pg-font mx-2  no-underline  text-base  "
														target="_blank"
														href={x.url}>
														{x.post_title}
													</a>
												</div>
											)}
											{x.is_pro && isProFeature && (
												<a
													className=" text-lg flex gap-2 justify-center text-amber-500 no-underline  py-2   pg-font   w-full bg-slate-600 "
													href="https://comboblocks.com/pricing/">
													<span>{__("Subscribe to Import", "combo-blocks")}</span>
													<span>
														<Icon fill="white" icon={plusCircle} />
													</span>
												</a>
												// </div>
											)}
										</div>
									);
								})}
							</div>
							<div className="my-5 p-5  text-center">
								<div
									className="inline-block pg-font bg-gray-700 hover:bg-gray-600 rounded-md relative p-3 px-5 cursor-pointer  text-white font-bold "
									onClick={(ev) => {
										var pageX = parseInt(searchPrams.page) + 1;
										setsearchPrams({ ...searchPrams, page: pageX });
										fetchCss();
									}}>
									<span className="flex items-center justify-center gap-2">
										{isLoading && (
											<span className="text-center">
												<Spinner />
											</span>
										)}
										<span>{__("Load More", "combo-blocks")}</span>
									</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
class PGTemplates extends Component {
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
		var { onChange, enable, setEnable } = this.props;
		return (
			<Html
				enable={enable}
				setEnable={setEnable}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default PGTemplates;
