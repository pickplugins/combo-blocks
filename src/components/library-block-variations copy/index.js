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
import PGtabs from "../tabs";
import PGtab from "../tab";
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
import { applyFilters } from "@wordpress/hooks";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	const [queryCss, setQueryCss] = useState({
		keyword: "",
		page: 1,
		blockName: props.blockName,
		category: "",
		isReset: true,
	});
	var [cssLibrary, setCssLibrary] = useState({ items: [] });
	var [cssLibraryCats, setCssLibraryCats] = useState([]);
	var [isLoading, setIsLoading] = useState(false);
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [sudoPicker, setsudoPicker] = useState(null); // Using the hook.
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
		idleMessage: "Submit to CSS Library",
		message: "",
		timeout: 2,
	});
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
					<PanelRow>
						<InputControl
							value={queryCss.keyword}
							type="text"
							placeholder="Search Block Variation..."
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
							var content = x.post_content;
							return (
								<div
									className={`item-${index} border border-solid relative border-slate-400 rounded-sm shadow-md py-2 pb-[30px] my-3 `}
									onMouseEnter={() => {
										setIsHovered(true);
										setHoverValue(index);
									}}
									onMouseLeave={() => {
										setIsHovered(false);
										setHoverValue("");
									}}>
									<div className="relative ">
										<img src={x.thumb_url} alt="" />
										{/* <div className="absolute top-0 left-2"> */}
										{/* </div> */}
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
									<div
										className={` ${isHovered && hoverValue == index
											? "my-2 mb-0 w-full bg-slate-400 bg-opacity-30 flex items-center justify-center flex-wrap gap-2 opacity-100 visible h-[max-content] absolute bottom-0 left-0 right-0 "
											: "opacity-0 invisible h-0 "
											} `}>
										{x.is_pro && isProFeature && (
											<div className="">
												<button
													className="px-3 py-2 bg-amber-500 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center gap-2 justify-center "
													onClick={(ev) => {
														window.open(
															"https://comboblocks.com/pricing/",
															"_blank"
														);
													}}>
													<Icon fill="#fff" icon={link} />
													<span>Subscribe to Import</span>
												</button>
											</div>
										)}
										{(!x.is_pro || (x.is_pro && !isProFeature)) && (
											<div className="flex items-center justify-evenly w-full flex-wrap gap-2 px-3 py-2">
												<a
													className="bg-gray-700  text-white no-underline hover:text-white text-xs px-2 rounded-sm py-1"
													href={x.url}
													target="_blank">
													#{x.ID}
												</a>
												<button
													type="button"
													title="Insert New"
													className="rounded-sm bg-slate-400 bg-opacity-30 text-white text-xs outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center gap-2"
													onClick={(ev) => {
														props.onChange(content, "insert");
													}}>
													<Icon
														icon={
															<svg
																width="186"
																height="187"
																viewBox="0 0 186 187"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M160.72 139.058V139.675H161.337H178.422C181.118 139.675 183.5 142.057 183.5 144.753V156.143C183.5 158.839 181.118 161.221 178.422 161.221H161.337H160.72V161.838V178.922C160.72 181.619 158.339 184 155.643 184H144.253C141.556 184 139.175 181.619 139.175 178.922V161.838V161.221H138.558H121.474C118.777 161.221 116.396 158.839 116.396 156.143V144.753C116.396 142.057 118.777 139.675 121.474 139.675H138.558H139.175V139.058V121.974C139.175 119.278 141.556 116.896 144.253 116.896H155.643C158.339 116.896 160.72 119.278 160.72 121.974V139.058Z"
																	fill="url(#paint0_linear_1_2531)"
																	stroke="black"
																	strokeWidth="5"
																/>
																<path
																	d="M129.067 100.476C125.689 100.476 122.756 103.41 122.756 106.788V123.255H106.288C102.91 123.255 99.9762 126.189 99.9762 129.567V138.441H17.0692C9.05756 138.441 2.5 131.884 2.5 123.872V17.5692C2.5 9.55757 9.05756 3 17.0692 3H123.372C131.384 3 137.942 9.55757 137.942 17.5692V100.476H129.067ZM51.2381 40.9653C52.5173 40.9653 53.6313 40.5362 54.4269 39.7406C55.2225 38.945 55.6516 37.831 55.6516 36.552V28.9587C55.6516 27.6797 55.2225 26.5658 54.4269 25.7702C53.6313 24.9743 52.5173 24.5454 51.2381 24.5454H28.459C27.1797 24.5454 26.0657 24.9743 25.2701 25.7702C24.4745 26.5658 24.0454 27.6797 24.0454 28.9587V36.552C24.0454 37.831 24.4745 38.945 25.2701 39.7406C26.0657 40.5362 27.1797 40.9653 28.459 40.9653H51.2381ZM96.7968 101.71C98.0758 101.71 99.1897 101.281 99.9853 100.485C100.781 99.6896 101.21 98.5757 101.21 97.2964V89.7034C101.21 88.4243 100.781 87.3104 99.9853 86.5148C99.1897 85.7189 98.0758 85.29 96.7968 85.29H28.459C27.1797 85.29 26.0657 85.7189 25.2701 86.5148C24.4745 87.3104 24.0454 88.4243 24.0454 89.7034V97.2964C24.0454 98.5757 24.4745 99.6896 25.2701 100.485C26.0657 101.281 27.1797 101.71 28.459 101.71H96.7968ZM111.983 71.3376C113.262 71.3376 114.376 70.9085 115.172 70.1129C115.967 69.3173 116.396 68.2034 116.396 66.9241V59.3311C116.396 58.052 115.967 56.9381 115.172 56.1425C114.376 55.3466 113.262 54.9177 111.983 54.9177H28.459C27.1797 54.9177 26.0657 55.3466 25.2701 56.1425C24.4745 56.9381 24.0454 58.052 24.0454 59.3311V66.9241C24.0454 68.2034 24.4745 69.3173 25.2701 70.1129C26.0657 70.9085 27.1797 71.3376 28.459 71.3376H111.983Z"
																	fill="url(#paint1_linear_1_2531)"
																	stroke="black"
																	strokeWidth="5"
																/>
																<defs>
																	<linearGradient
																		id="paint0_linear_1_2531"
																		x1="115.779"
																		y1="150.448"
																		x2="184.117"
																		y2="150.448"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																	<linearGradient
																		id="paint1_linear_1_2531"
																		x1="1.88306"
																		y1="70.7207"
																		x2="138.559"
																		y2="70.7207"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																</defs>
															</svg>
														}
													/>
													{/* <span>Insert New</span> */}
												</button>
												<button
													type="button"
													title="Apply Style"
													className="  rounded-sm bg-slate-400 bg-opacity-30 text-white text-xs outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex gap-2 items-center justify-center "
													onClick={(ev) => {
														props.onChange(content, "applyStyle");
													}}>
													<Icon
														icon={
															<svg
																width="186"
																height="186"
																viewBox="0 0 186 186"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M79.2537 37.469L79.3566 38.3276L79.9681 38.9391L150.532 109.511L85.9794 174.063L85.9793 174.063C83.8361 176.207 81.2916 177.907 78.4912 179.067C75.6907 180.227 72.6892 180.825 69.658 180.825C66.6268 180.825 63.6253 180.227 60.8249 179.067C58.0244 177.907 55.48 176.207 53.3368 174.063L17.1756 137.894L17.1752 137.893C15.0317 135.75 13.3313 133.205 12.1712 130.405C11.011 127.605 10.4139 124.603 10.4139 121.572C10.4139 118.541 11.011 115.539 12.1712 112.739C13.3313 109.938 15.0317 107.394 17.1752 105.251L17.1757 105.25L41.0842 81.3331L41.8162 80.6009V79.5657V40.7441C41.8162 27.7933 50.6207 18.0338 60.6284 18.031C69.7864 18.0335 77.8956 26.1381 79.2537 37.469ZM66.6552 55.7537L67.3874 55.0214V53.9859V40.7441C67.3874 36.9846 64.7432 33.2049 60.6241 33.2049C56.5164 33.2049 53.8608 36.9811 53.8608 40.7441V62.5125V68.548L58.1286 64.2803L66.6552 55.7537ZM67.3874 89.7703V78.0991V72.0626L63.1194 76.3315L25.6877 113.772L25.6876 113.772C23.6205 115.84 22.4592 118.644 22.4592 121.568C22.4592 124.491 23.6205 127.296 25.6876 129.363L25.6879 129.364L61.8662 165.542L61.8665 165.542C63.9343 167.609 66.7384 168.771 69.6623 168.771C72.5861 168.771 75.3903 167.609 77.4581 165.542L77.4584 165.542L131.722 111.279L133.489 109.511L131.722 107.743L83.7169 59.7386L79.4491 55.4708V61.5064V89.7703H67.3874Z"
																	fill="url(#paint0_linear_7_12)"
																	stroke="black"
																	strokeWidth="5"
																/>
																<path
																	d="M136.198 144.098L136.198 144.098L152.515 127.781L168.832 144.098L168.832 144.098C172.061 147.326 174.26 151.438 175.151 155.915C176.042 160.392 175.585 165.033 173.839 169.251C172.092 173.469 169.134 177.074 165.338 179.61C161.543 182.146 157.08 183.5 152.515 183.5C147.95 183.5 143.488 182.146 139.692 179.61C135.896 177.074 132.938 173.469 131.191 169.251C129.445 165.033 128.988 160.392 129.879 155.915C130.77 151.438 132.969 147.326 136.198 144.098Z"
																	fill="url(#paint1_linear_7_12)"
																	stroke="black"
																	strokeWidth="5"
																/>
																<defs>
																	<linearGradient
																		id="paint0_linear_7_12"
																		x1="7.91394"
																		y1="99.4278"
																		x2="154.067"
																		y2="99.4278"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																	<linearGradient
																		id="paint1_linear_7_12"
																		x1="126.935"
																		y1="155.123"
																		x2="178.095"
																		y2="155.123"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																</defs>
															</svg>
														}
													/>
													{/* <span>Apply Style</span> */}
												</button>
												<button
													type="button"
													title="Replace"
													className="  rounded-sm bg-slate-400 bg-opacity-30 text-white text-xs outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center gap-2 "
													onClick={(ev) => {
														props.onChange(content, "replace");
													}}>
													<Icon
														icon={
															<svg
																width="186"
																height="186"
																viewBox="0 0 186 186"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M125.345 69.8943L125.33 69.8787L125.314 69.8633L97.4317 41.9807C97.4316 41.9806 97.4315 41.9805 97.4314 41.9804C96.1579 40.7064 95.4424 38.9786 95.4424 37.1772C95.4424 35.3757 96.1579 33.6479 97.4314 32.3739C97.4315 32.3738 97.4316 32.3737 97.4317 32.3736L125.298 4.50748C126.578 3.27866 128.288 2.59904 130.062 2.61447C131.844 2.62995 133.548 3.3445 134.808 4.60421C136.067 5.86393 136.782 7.56802 136.797 9.34946C136.813 11.1243 136.133 12.8344 134.904 14.1142L122.903 26.1151L118.636 30.3829H124.671H162.648C168.147 30.3829 173.421 32.5675 177.31 36.4562C181.199 40.3449 183.383 45.6191 183.383 51.1186V83.6486C183.383 85.4506 182.668 87.1787 181.393 88.4529C180.119 89.7271 178.391 90.4429 176.589 90.4429C174.787 90.4429 173.059 89.7271 171.785 88.4529C170.511 87.1787 169.795 85.4506 169.795 83.6486V51.1186C169.795 49.2231 169.042 47.4051 167.701 46.0648C166.361 44.7244 164.543 43.9714 162.648 43.9714H124.671H118.636L122.903 48.2392L134.921 60.2567L134.936 60.2721L134.952 60.2872C135.601 60.9139 136.118 61.6637 136.475 62.4926C136.831 63.3215 137.018 64.2131 137.026 65.1152C137.034 66.0173 136.862 66.912 136.52 67.747C136.179 68.582 135.674 69.3406 135.036 69.9785C134.398 70.6165 133.64 71.1209 132.805 71.4626C131.97 71.8042 131.075 71.9761 130.173 71.9683C129.271 71.9604 128.379 71.773 127.55 71.4169C126.721 71.0608 125.972 70.5432 125.345 69.8943ZM61.2097 141.914H67.2453L62.9775 137.647L50.9765 125.646C49.7477 124.366 49.068 122.656 49.0835 120.881C49.0989 119.099 49.8135 117.395 51.0732 116.136C52.3329 114.876 54.037 114.161 55.8185 114.146C57.5931 114.131 59.3031 114.81 60.583 116.039L88.4492 143.905C89.7229 145.179 90.4385 146.907 90.4385 148.709C90.4385 150.51 89.723 152.238 88.4494 153.512C88.4494 153.512 88.4493 153.512 88.4492 153.512L60.5666 181.395L60.5512 181.41L60.5361 181.426C59.9094 182.075 59.1597 182.592 58.3307 182.948C57.5018 183.304 56.6102 183.492 55.7081 183.5C54.806 183.508 53.9113 183.336 53.0763 182.994C52.2413 182.652 51.4827 182.148 50.8448 181.51C50.2069 180.872 49.7024 180.113 49.3607 179.278C49.0191 178.443 48.8472 177.549 48.855 176.647C48.8629 175.745 49.0503 174.853 49.4064 174.024C49.7625 173.195 50.2801 172.445 50.929 171.819L50.9446 171.804L50.96 171.788L62.9775 159.771L67.2453 155.503H61.2097H23.2333C17.7338 155.503 12.4596 153.318 8.57091 149.43C4.68221 145.541 2.49756 140.267 2.49756 134.767V102.237C2.49756 100.435 3.21338 98.7071 4.48756 97.4329C5.76174 96.1587 7.48989 95.4429 9.29185 95.4429C11.0938 95.4429 12.822 96.1587 14.0961 97.4329C15.3703 98.7071 16.0861 100.435 16.0861 102.237V134.767C16.0861 136.663 16.8391 138.481 18.1795 139.821C19.5198 141.161 21.3377 141.914 23.2333 141.914H61.2097ZM5.84868 5.85112C7.99436 3.70543 10.9045 2.5 13.939 2.5H60.4104C63.4449 2.5 66.3551 3.70543 68.5007 5.85112C70.6464 7.9968 71.8519 10.907 71.8519 13.9414V60.4129C71.8519 63.4473 70.6464 66.3575 68.5007 68.5032C66.3551 70.6489 63.4449 71.8543 60.4104 71.8543H13.939C10.9045 71.8543 7.99436 70.6489 5.84868 68.5032C3.70299 66.3575 2.49756 63.4473 2.49756 60.4129V13.9414C2.49756 10.907 3.70299 7.9968 5.84868 5.85112ZM183.383 171.944C183.383 174.979 182.178 177.889 180.032 180.035C177.887 182.18 174.976 183.386 171.942 183.386H125.47C122.436 183.386 119.526 182.18 117.38 180.035C115.234 177.889 114.029 174.979 114.029 171.944V125.473C114.029 122.438 115.234 119.528 117.38 117.383C119.526 115.237 122.436 114.031 125.47 114.031H171.942C174.976 114.031 177.887 115.237 180.032 117.383C182.178 119.528 183.383 122.438 183.383 125.473V171.944Z"
																	fill="url(#paint0_linear_7_28)"
																	stroke="black"
																	strokeWidth="5"
																/>
																<defs>
																	<linearGradient
																		id="paint0_linear_7_28"
																		x1="-0.00244141"
																		y1="93"
																		x2="185.883"
																		y2="93"
																		gradientUnits="userSpaceOnUse">
																		<stop stopColor="#FC7F64" />
																		<stop offset="1" stopColor="#FF9D42" />
																	</linearGradient>
																</defs>
															</svg>
														}
													/>
													{/* <span>Replace</span> */}
												</button>
											</div>
										)}
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
		var { blockName, blockId, clientId, onChange } = this.props;
		return (
			<Html
				blockId={blockId}
				clientId={clientId}
				blockName={blockName}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default PGLibraryBlockVariations;
