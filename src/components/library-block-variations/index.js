const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import {
	Button,
	Dropdown,
	PanelRow,
	SelectControl,
	Spinner,
} from "@wordpress/components";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
	RangeControl,
	Popover,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import {
	Icon,
	styles,
	settings,
	lineDotted,
	list,
	link,
	upload,
	close,
	addTemplate,
	replace,
	download,
} from "@wordpress/icons";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";
import PGDropdown from "../../components/dropdown";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [queryCss, setQueryCss] = useState({
		keyword: "",
		page: 1,
		blockName: props.blockName,
		category: "",
		filterBy: {
			style: [], //borderRadius, textDecoration, border, textShadow, boxShadow
			options: {},
		},
		isReset: true,
	});
	var [cssLibrary, setCssLibrary] = useState({ items: [] });
	var [cssLibraryCats, setCssLibraryCats] = useState([]);
	var pgLocalVariations = localStorage.getItem("pgLocalVariations");
	var [localVariations, setlocalVariations] = useState(pgLocalVariations);
	var [isLoading, setIsLoading] = useState(false);
	var [loading, setloading] = useState(false);
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [sudoPicker, setsudoPicker] = useState(null); // Using the hook.
	const [filterEnable, setfilterEnable] = useState(false);
	let isProFeature = applyFilters("isProFeature", true);
	const selectedBlock = useSelect((select) =>
		select("core/block-editor").getSelectedBlock()
	);
	var [cssSubmission, setCssSubmission] = useState({
		enable: false,
		title: "",
		category: "",
		tags: "",
		thumb: "",
		email: "",
		status: "", // idle => ready to submit, busy => submission process, falied => submission falied, success=> Successfully submitted!
		successMessage: "Successfully submitted!",
		failedMessage: "Submission was failed!",
		idleMessage: "Submit to Library",
		message: "",
		timeout: 2,
	});
	var filterByStyleArgs = {
		none: { label: "All", value: "" },
		boxShadow: { label: "Box Shadow", value: "boxShadow" },
		borderRadius: { label: "Border Radius", value: "borderRadius" },
		textDecoration: { label: "Text Decoration", value: "textDecoration" },
		border: { label: "Border", value: "border" },
		textShadow: { label: "Text Shadow", value: "textShadow" },
	};
	useEffect(() => {
		fetchCss();
	}, [queryCss]);
	useEffect(() => {
		apiFetch({
			path: "/combo-blocks/v2/get_site_details",
			method: "POST",
			data: {},
		}).then((res) => {
			//
			//setEmailSubscribe({ ...userDetails, email: res.email, status: res.subscribe_status });
			setCssSubmission({ ...cssSubmission, email: res.email });
		});
	}, []);
	function fetchCss() {
		setIsLoading(true);
		var postData = {
			keyword: queryCss.keyword,
			page: queryCss.page,
			category: queryCss.category,
			blockName: queryCss.blockName,
		};
		postData = JSON.stringify(postData);
		fetch(
			"https://comboblocks.com/server/wp-json/combo-blocks/v2/get_block_patterns",
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
						var isReset = queryCss.isReset;
						const posts = res.posts;
						const blockPosts = { [props.blockName]: posts };
						const storedVariation = localStorage.getItem("pgBlockVariation");
						let variation = [];
						if (storedVariation) {
							variation = JSON.parse(storedVariation);
						}
						const existingBlockIndex = variation.findIndex(
							(item) => Object.keys(item)[0] === props.blockName
						);
						if (existingBlockIndex !== -1) {
							const existingPostIds = variation[existingBlockIndex][
								props.blockName
							].map((post) => post.ID);
							posts.forEach((post) => {
								if (!existingPostIds.includes(post.ID)) {
									variation[existingBlockIndex][props.blockName].push(post);
								}
							});
						} else {
							// If block name doesn't exist, add new blockPosts to variation
							if (variation.length === 0) {
								variation.push(blockPosts);
							} else {
								// Find and remove duplicate posts from other block names
								variation.forEach((block) => {
									const blockKey = Object.keys(block)[0];
									block[blockKey] = block[blockKey].filter(
										(post) => !posts.find((p) => p.ID === post.ID)
									);
								});
								variation.push(blockPosts);
							}
						}
						//localStorage.setItem("pgBlockVariation", JSON.stringify(variation));
						if (isReset) {
							var items = res.posts;
						} else {
							res.posts.map((item) => {
								cssLibrary.items.push(item);
							});
							var items = cssLibrary.items;
						}
						setCssLibrary({ items: items });
						setCssLibraryCats(res.terms);
						setIsLoading(false);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}
	const htmlToImageCapt = () => {
		setloading(true);
		var stylesheet = document.getElementById("pg-google-fonts-css");
		if (stylesheet && !stylesheet.hasAttribute("disabled")) {
			stylesheet.setAttribute("disabled", "disabled");
			//setDisabled(true);
		}
		const eleementToCapture = document.querySelector("." + props.blockId);
		htmlToImage.toPng(eleementToCapture).then(function (dataUrl) {
			setCssSubmission({ ...cssSubmission, thumb: dataUrl });
			setTimeout(() => {
				if (stylesheet && stylesheet.hasAttribute("disabled")) {
					stylesheet.removeAttribute("disabled");
				}
			}, 500);
			//download(dataUrl, 'my-node.png');
			setloading(false);
		});
	};
	const [isHovered, setIsHovered] = useState(false);
	const [hoverValue, setHoverValue] = useState("");
	return (
		<div className=" mt-4">
			<PGtabs
				activeTab="cssItems"
				orientation="horizontal"
				activeClass="active-tab"
				onSelect={(tabName) => { }}
				tabs={[
					{
						name: "cssItems",
						title: "Library",
						icon: list,
						className: "tab-cssItems",
					},
					{
						name: "submit",
						title: "Submission",
						icon: upload,
						className: "tab-submit",
					},
				]}>
				<PGtab name="cssItems">
					<div className="flex items-center gap-2">
						<InputControl
							value={queryCss.keyword}
							type="text"
							className="w-full"
							placeholder="Search Block Variation..."
							onChange={(newVal) => {
								clearTimeout(debounce);
								debounce = setTimeout(() => {
									setQueryCss({
										keyword: newVal,
										page: 1,
										category: queryCss.category,
										blockName: queryCss.blockName,
										isReset: true,
									});
								}, 1000);
								//fetchLayouts();
							}}
						/>
						<div className="relative">
							<Button
								className={` pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600`}
								// variant={variant}
								onClick={(ev) => {
									setfilterEnable((prev) => !prev);
								}}>
								...
							</Button>
							{filterEnable && (
								<Popover position="top left">
									<div className="p-3 w-[300px]">
										<PanelRow className="my-3">
											<label>{__("Filter by Style", "combo-blocks")}</label>
											<PGDropdown
												position="top right"
												variant="secondary"
												buttonTitle={"Choose"}
												options={filterByStyleArgs}
												onChange={(option, index) => {
													var queryCssX = { ...queryCss };
													queryCssX.filterBy.style.push(option.value);
													setQueryCss(queryCssX);
												}}
												values=""></PGDropdown>
										</PanelRow>
										<div className="flex items-center gap-1 flex-wrap">
											{queryCss.filterBy.style.map((item, i) => {
												return (
													<div className="border border-solid flex items-center gap-1 rounded-sm text-xs pr-2">
														<span className="bg-red-500 cursor-pointer " onClick={ev => {
															var queryCssX = { ...queryCss };
															queryCssX.filterBy.style.splice(i, 1);
															setQueryCss(queryCssX);
														}} ><Icon fill="#fff" icon={close} /></span>	<span>{filterByStyleArgs[item].label}</span>
													</div>
												);
											})}
										</div>
									</div>
								</Popover>
							)}
						</div>
						<SelectControl
							className="w-full"
							style={{ margin: 0 }}
							label=""
							value={queryCss.category}
							options={cssLibraryCats}
							onChange={(newVal) => {
								setQueryCss({
									keyword: queryCss.keyword,
									page: 1,
									category: newVal,
									isReset: true,
								});
								//fetchLayouts();
							}}
						/>
					</div>
					<div className="items">
						{cssLibrary.items.map((x, index) => {
							var content = x.post_content;
							var title = x.post_title
							return (
								<div
									className={`item-${index} relative  group pb-[20px] py-2 hover:border-black  border border-solid  border-slate-400 rounded-md shadow-md  my-3 transition-all duration-300 ease-in-out group `}

								>
									{isProFeature && (
										<div className="absolute z-30 top-2 right-2">
											{!x.is_pro && (
												<span className=" bg-lime-600 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
													{__("Free", "combo-blocks")}
												</span>
											)}
											{x.is_pro && (
												<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
													{__("Pro", "combo-blocks")}
												</span>
											)}
										</div>
									)}
									<div className="relative flex justify-center px-2 ">
										<img src={x.thumb_url} alt="" />

									</div>
									<div
										className="mx-auto text-lg truncate max-w-full text-center px-4 pt-2  group-hover:invisible"
										dangerouslySetInnerHTML={{ __html: title }}
									/>
									<div
										className="absolute bottom-0 w-full left-0 opacity-0 group-hover:opacity-100 my-2 mb-0 bg-slate-400 bg-opacity-90 flex items-center justify-center flex-col flex-wrap gap-2 visible h-[max-content] 
										  transition-all duration-300 ease-in-out 
										">
										<div className="flex items-center justify-center flex-wrap gap-2">
											{x.is_pro && isProFeature && (
												<div className="">
													<button
														className="px-3 py-2 bg-gray-700 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center gap-2 justify-center "
														onClick={(ev) => {
															window.open(
																"https://comboblocks.com/pricing/",
																"_blank"
															);
														}}>
														<Icon fill="#fff" icon={link} />
														<span>{__("Subscribe to Import", "combo-blocks")}</span>
													</button>
												</div>
											)}
											{(!x.is_pro || (x.is_pro && !isProFeature)) && (
												<>

													<div className=" flex items-center justify-center flex-wrap gap-1 pb-2">

														<button
															type="button"
															title="Insert New"
															className="bg-gray-700  text-white no-underline hover:text-white text-sm px-2 rounded-sm py-1"
															onClick={(ev) => {
																props.onChange(content, "insert");
															}}>
															{__("Insert New", "combo-blocks")}
															{/* </span> */}
														</button>
														{props.isApplyStyle && (
															<button
																type="button"
																title="Apply Style"
																className="bg-gray-700  text-white no-underline hover:text-white text-sm px-2 rounded-sm py-1"
																onClick={(ev) => {
																	props.onChange(content, "applyStyle");
																}}>
																{__("Apply Style", "combo-blocks")}
															</button>
														)}
														<button
															type="button"
															title="Replace"
															className="bg-gray-700  text-white no-underline hover:text-white text-sm px-2 rounded-sm py-1"
															onClick={(ev) => {
																props.onChange(content, "replace");
															}}>
															{__("Replace", "combo-blocks")}
														</button>
														<a
															className="bg-gray-700  text-white no-underline hover:text-white text-sm px-2 rounded-sm py-1"
															href={x.url}
															target="_blank">
															#{x.ID}
														</a>
													</div>
													<div
														className="mx-auto text-lg truncate text-white max-w-full text-center px-4 pt-2 "
														dangerouslySetInnerHTML={{ __html: title }}
													/>
												</>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div
						className="w-full rounded-sm  py-2 bg-gray-700 hover:bg-gray-600 text-[14px] font-bold text-white cursor-pointer my-3 text-center"
						onClick={(_ev) => {
							var page = queryCss.page + 1;
							setQueryCss({
								keyword: queryCss.keyword,
								page: page,
								category: queryCss.category,
								isReset: false,
								blockName: props.blockName,
							});
						}}>
						{isLoading == true && (
							<span className="text-center">
								<Spinner />
							</span>
						)}
						{__("Load More", "combo-blocks")}
					</div>
				</PGtab>
				<PGtab name="submit">
					<div>
						<label htmlFor="">{__("Item Title", "combo-blocks")}</label>
						<InputControl
							className="w-full"
							value={cssSubmission.title}
							type="text"
							placeholder="Ex: Blue Button"
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, title: newVal });
							}}
						/>
					</div>
					<PanelRow>
						<label htmlFor="">{__("Choose category", "combo-blocks")}</label>
						<SelectControl
							className="w-full"
							style={{ margin: 0 }}
							label=""
							value={cssSubmission.category}
							options={cssLibraryCats}
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, category: newVal });
							}}
						/>
					</PanelRow>
					<div>
						<label htmlFor="">{__("Add Some Tags", "combo-blocks")}</label>
						<InputControl
							className="w-full"
							value={cssSubmission.tags}
							type="text"
							placeholder="button, blue button"
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, tags: newVal });
							}}
						/>
					</div>
					<div className="my-4">
						<div
							onClick={htmlToImageCapt}
							className="bg-green-700 text-white p-3 px-5 cursor-pointer">
							{__("Take Screenshot", "combo-blocks")}
							{loading && (
								<span className="text-center">
									<Spinner />
								</span>
							)}
						</div>
						<label htmlFor="">{__("Preview Thumbnail", "combo-blocks")}</label>
						<img src={cssSubmission.thumb} />
					</div>
					<div>
						<label htmlFor="">{__("Your Email", "combo-blocks")}</label>
						<InputControl
							className="w-full"
							value={cssSubmission.email}
							type="text"
							onChange={(newVal) => {
								setCssSubmission({ ...cssSubmission, email: newVal });
							}}
						/>
					</div>
					<div
						className="bg-gray-700 hover:bg-gray-600 my-5 px-10 py-3 text-white cursor-pointer text-center rounded-sm mb-5"
						onClick={(ev) => {
							setIsLoading(true);
							setCssSubmission({ ...cssSubmission, status: "busy" });
							var serelized = wp.blocks.serialize(selectedBlock);
							var postData = {
								title: cssSubmission.title,
								content: serelized,
								thumb: cssSubmission.thumb,
								category: cssSubmission.category,
								tags: cssSubmission.tags,
								blockName: props.blockName,
							};
							postData = JSON.stringify(postData);
							fetch(
								"https://comboblocks.com/server/wp-json/combo-blocks/v2/submit_block_variation",
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
											if (res.status == "success") {
												setCssSubmission({
													...cssSubmission,
													status: "success",
													message: res.message,
												});
												setTimeout(() => {
													setCssSubmission({
														...cssSubmission,
														status: "idle",
														message: res.message,
													});
												}, 3000);
											} else {
												setCssSubmission({
													...cssSubmission,
													status: "falied",
													message: res.message,
												});
												setTimeout(() => {
													setCssSubmission({
														...cssSubmission,
														status: "idle",
														message: res.message,
													});
												}, 3000);
											}
										});
									}
								})
								.catch((_error) => {
									//this.saveAsStatus = 'error';
									// handle the error
								});
						}}>
						{__("Submit to Library", "combo-blocks")}
						{cssSubmission.status == "busy" && (
							<span className="text-center">
								<Spinner />
							</span>
						)}
					</div>
					{cssSubmission.status == "success" && (
						<div className=" font-bold text-green-700">
							{cssSubmission.successMessage}
						</div>
					)}
					{cssSubmission.status == "falied" && (
						<div>
							<div className=" font-bold text-red-500">
								{cssSubmission.failedMessage}
							</div>
							<p>{cssSubmission.message}</p>
						</div>
					)}
				</PGtab>
			</PGtabs>
		</div>
	);
}
class PGLibraryBlockVariations extends Component {
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
		var { blockName, blockId, clientId, onChange, isApplyStyle = true } = this.props;
		return (
			<Html
				blockId={blockId}
				clientId={clientId}
				blockName={blockName}
				onChange={onChange}
				isApplyStyle={isApplyStyle}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default PGLibraryBlockVariations;
