const { Component } = wp.element;
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

import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
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
	addTemplate,
	replace,
	download,
} from "@wordpress/icons";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import apiFetch from "@wordpress/api-fetch";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	const [queryCss, setQueryCss] = useState({
		keyword: "",
		page: 1,
		category: "",
		isReset: true,
	});

	var [cssLibrary, setCssLibrary] = useState({ items: [] });
	var [cssLibraryCats, setCssLibraryCats] = useState([]);
	var [isLoading, setIsLoading] = useState(false);
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [sudoPicker, setsudoPicker] = useState(null); // Using the hook.

	let isProFeature = applyFilters("isProFeature", true);

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
		idleMessage: "Submit to CSS Library",
		message: "",

		timeout: 2,
	});

	useEffect(() => {
		fetchCss();
	}, [queryCss]);

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/get_site_details",
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
		};
		postData = JSON.stringify(postData);

		fetch("https://comboblocks.com/server/wp-json/post-grid/v2/get_post_css", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var isReset = queryCss.isReset;
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
		// setloading(true);
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
				onSelect={(tabName) => {}}
				tabs={[
					{
						name: "cssItems",
						title: "Library",
						icon: settings,
						className: "tab-cssItems",
					},
					{
						name: "submit",
						title: "Submission",
						icon: styles,
						className: "tab-submit",
					},
				]}>
				<PGtab name="cssItems">
					<PanelRow>
						<InputControl
							value={queryCss.keyword}
							type="text"
							placeholder="Search Styles..."
							onChange={(newVal) => {
								clearTimeout(debounce);
								debounce = setTimeout(() => {
									setQueryCss({
										keyword: newVal,
										page: 1,
										category: queryCss.category,
										isReset: true,
									});
								}, 1000);

								//fetchLayouts();
							}}
						/>
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
					</PanelRow>

					<div className="items">
						{cssLibrary.items.map((x, index) => {
							var objCss = JSON.parse(x.post_content);

							return (
								<div
									className={`item-${index} border border-solid relative border-slate-400 rounded-md shadow-md py-2 my-3 `}
									onMouseEnter={() => {
										setIsHovered(true);
										setHoverValue(index);
									}}
									onMouseLeave={() => {
										setIsHovered(false);
										setHoverValue("");
									}}>
									<div className="relative pb-2 grid place-items-center">
										<img
											src={x.thumb_url}
											alt={x.ID}
											onClick={(ev) => {
												// var objCss = {
												//   styles: { "backgroundColor": { "Desktop": "#9DD6DF" }, "textAlign": { "Desktop": "center" }, "border": { "Desktop": "5px dashed #000000" } }, hover: { "border": { "Desktop": "2px dashed #A084CF" } }
												// }

												props.onChange(objCss);
											}}
										/>
										{isProFeature && (
											<div className="absolute top-0 right-2">
												{!x.is_pro && (
													<span className=" bg-lime-600 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														Free
													</span>
												)}
												{x.is_pro && (
													<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														Pro
													</span>
												)}
											</div>
										)}
									</div>

									<div className="my-2 mb-0 w-full bg-slate-400 bg-opacity-30 flex items-center justify-center flex-wrap gap-2 opacity-100 visible h-[max-content]">
										{x.is_pro && isProFeature && (
											<div className="">
												<a
													href={
														"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
														x.post_title
													}
													className="px-3 py-2 bg-amber-500 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center gap-2 justify-center ">
													<Icon fill="#fff" icon={link} />
													<span>Subscribe to Import</span>
												</a>
											</div>
										)}
										{(!x.is_pro || (x.is_pro && !isProFeature)) && (
											<div className="flex pg-span-hidden items-center justify-between w-full flex-wrap gap-2 px-4 ">
												<a
													className="  no-underline hover:text-gray-800 text-gray-800 text-sm font-semibold px-2 rounded-sm py-1"
													target="_blank"
													href={x.url}
													title={x.post_title}>
													{x.post_title.length > 17
														? `${x.post_title.substring(0, 17)}...`
														: x.post_title}
												</a>
												<div
													className="hover:bg-slate-300 p-2 cursor-pointer relative inline-flex"
													onClick={(ev) => {
														setsudoPicker((sudoPicker) => {
															return sudoPicker == null ? x.ID : null;
														});
													}}>
													<Icon
														icon={
															<svg
																width="186px"
																height="186px"
																viewBox="0 -6 16 16"
																version="1.1">
																<title>Apply Style</title>
																<defs>
																	<linearGradient
																		id="gradient1"
																		x1="7.91394"
																		y1="99.4278"
																		x2="154.067"
																		y2="99.4278"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																	<linearGradient
																		id="gradient2"
																		x1="126.935"
																		y1="155.123"
																		x2="178.095"
																		y2="155.123"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																</defs>
																<g
																	id="Free-Icons"
																	stroke="none"
																	strokeWidth="1"
																	fill="none"
																	fillRule="evenodd">
																	<g
																		transform="translate(-1119.000000, -756.000000)"
																		fill="#000000"
																		fillRule="nonzero"
																		id="Group">
																		<g
																			transform="translate(1115.000000, 746.000000)"
																			id="Shape">
																			<path
																				d="M6,10 C4.8954305,10 4,10.8954305 4,12 C4,13.1045695 4.8954305,14 6,14 C7.1045695,14 8,13.1045695 8,12 C8,10.8954305 7.1045695,10 6,10 Z"
																				fill="url(#gradient1)"></path>
																			<path
																				d="M12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 Z"
																				fill="url(#gradient1)"></path>
																			<path
																				d="M18,10 C16.8954305,10 16,10.8954305 16,12 C16,13.1045695 16.8954305,14 18,14 C19.1045695,14 20,13.1045695 20,12 C20,10.8954305 19.1045695,10 18,10 Z"
																				fill="url(#gradient2)"></path>
																		</g>
																	</g>
																</g>
															</svg>
														}
													/>
												</div>
												{sudoPicker == x.ID && (
													<Popover position="bottom left">
														<div
															className="w-40 p-2"
															// className="w-32 p-2 border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 block last-of-type:border-b-0 min-h-[40px] "
														>
															<div
																className="p-2 border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:pg-text-color hover:bg-slate-200 block last-of-type:border-b-0 last-of-type:hover:border-b min-h-[40px] "
																// className="p-2 cursor-pointer hover:bg-slate-300"
																onClick={(ev) => {
																	props.onChange(objCss);
																}}>
																Apply All
															</div>

															{Object.entries(objCss).map((item) => {
																var sudoIndex = item[0];
																var sudoArgs = item[1];

																return (
																	<div
																		className="p-2 border-b border-b-gray-800/20 hover:border-b-gray-800 transition-all duration-200 ease-in-out border-transparent border-solid cursor-pointer hover:bg-slate-200 block last-of-type:border-b-0 min-h-[40px] "
																		// className="p-2 cursor-pointer hover:bg-slate-300"
																		onClick={(ev) => {
																			var css = {};

																			css[sudoIndex] = objCss[sudoIndex];

																			props.onChange(css);
																		}}>
																		{sudoIndex}
																	</div>
																);
															})}
														</div>
													</Popover>
												)}
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>

					<div
						className="w-full rounded-sm  py-2 bg-indigo-300 hover:bg-indigo-500 text-[14px] font-bold text-white cursor-pointer my-3 text-center"
						onClick={(_ev) => {
							var page = queryCss.page + 1;
							setQueryCss({
								keyword: queryCss.keyword,
								page: page,
								category: queryCss.category,
								isReset: false,
							});
						}}>
						{isLoading == true && (
							<span className="text-center">
								<Spinner />
							</span>
						)}
						Load More
					</div>
				</PGtab>
				<PGtab name="submit">
					<div>
						<label htmlFor="">Item Title</label>
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
						<label htmlFor="">Choose category</label>

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
						<label htmlFor="">Add Some Tags</label>
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
							Take Screenshot
						</div>

						<label htmlFor="">Preview Thumbnail</label>
						<img src={cssSubmission.thumb} />
					</div>

					<div>
						<label htmlFor="">Your Email</label>
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
						className="bg-indigo-300 hover:bg-indigo-500 my-5 px-10 py-3 text-white cursor-pointer text-center rounded-sm mb-5"
						onClick={(ev) => {
							setIsLoading(true);

							setCssSubmission({ ...cssSubmission, status: "busy" });

							var objX = Object.assign({}, props.obj);

							if (objX.options != undefined) {
								delete objX.options;
							}

							var postData = {
								title: cssSubmission.title,
								content: objX,
								thumb: cssSubmission.thumb,
								category: cssSubmission.category,
								tags: cssSubmission.tags,
							};
							postData = JSON.stringify(postData);

							fetch(
								"https://comboblocks.com/server/wp-json/post-grid/v2/submit_css",
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
						Submit to CSS Library
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

class PGCssLibrary extends Component {
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
		var { blockId, obj, onChange } = this.props;

		return (
			<Html
				blockId={blockId}
				obj={obj}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PGCssLibrary;
