const { Component } = wp.element;
import {
	Button,
	Dropdown,
	PanelRow,
	SelectControl,
	Spinner,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
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

import Masonry from "masonry-layout";

import imagesLoaded from "imagesloaded";

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
			blockName: queryCss.blockName,
		};
		postData = JSON.stringify(postData);

		fetch("https://comboblocks.com/server/wp-json/post-grid/v2/get_block_patterns", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						// res.posts.map((e)=>{

						// })
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
						setTimeout(() => {
							loadMasonry();
						}, 500);
						setIsLoading(false);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function loadMasonry() {
		var elem = document.querySelector("#" + props.blockName);

		if (elem != null) {
			imagesLoaded(elem, function () {
				var msnry = new Masonry(elem, {
					// options
					itemSelector: ".variation-item",
					gutter: 15,
					horizontalOrder: true,
					percentPosition: true,
					// columnWidth: ".masonry-width",
					// fitWidth: true,
				});
			});
		}
	}

	const htmlToImageCapt = () => {
		var stylesheet = document.getElementById("pg-google-fonts-css");
		if (stylesheet && !stylesheet.hasAttribute("disabled")) {
			stylesheet.setAttribute("disabled", "disabled");
			//setDisabled(true);
		}

		const elementToCapture = document.querySelector("." + props.blockId);

		htmlToImage.toPng(elementToCapture).then(function (dataUrl) {
			setCssSubmission({ ...cssSubmission, thumb: dataUrl });

			setTimeout(() => {
				if (stylesheet && stylesheet.hasAttribute("disabled")) {
					stylesheet.removeAttribute("disabled");
				}
			}, 500);

			//download(dataUrl, 'my-node.png');
		});
	};

	return (
		<div className=" mt-4">
			<div className="m-auto  " id={props.blockName}>
				{isLoading == true && (
					<div className="text-center">
						<Spinner
							style={{
								height: "30px",
								width: "30px",
								color: "#1f2937",
							}}
						/>
					</div>
				)}
				{cssLibrary.items.slice(0, 10).map((x, index) => {
					var content = x.post_content;
					var title = x.post_title;
					return (
						<>
							<div
								className={`item-${index} group pb-[20px] variation-item border border-solid relative border-slate-400 rounded-md overflow-hidden hover:border-black hover:shadow-md hover:shadow-slate-300 transition-all duration-150 ease-in-out shadow-md py-2 pt-3 mb-4  `}
								onClick={(ev) => {
									if (!x.is_pro) {
										props.onChange(content, "replace");
									}
									if (x.is_pro && !isProFeature) {
										// alert("This feature is only available in Pro Version.");
										props.onChange(content, "replace");
									}
									if (x.is_pro && isProFeature) {
										alert("This feature is only available in Pro Version.");
									}
								}}>
								<div className="flex justify-center  ">
									<img src={x.thumb_url} alt="" className="w-[95%]" />
									{/* <div className="absolute top-0 left-2"> */}

									{/* </div> */}
									{isProFeature && (
										<div className="absolute top-1 right-3">
											{!x.is_pro && (
												<span className=" bg-lime-600 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
													{__("Free", "post-grid")}
												</span>
											)}
											{x.is_pro && (
												<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
													{__("Pro", "post-grid")}
												</span>
											)}
										</div>
									)}
								</div>
								{x.is_pro && isProFeature && (
									<div className="absolute bottom-0 w-full left-0 opacity-0 group-hover:opacity-100 flex justify-center pb-1 mt-4 peer">
										<button
											className="cursor-pointer px-3 py-1 border-0 bg-amber-500 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform text-[16px] flex items-center gap-2 justify-center "
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											<Icon fill="#fff" icon={link} />
											<span>{__("Subscribe to Import", "post-grid")}</span>
										</button>
									</div>
								)}
								<div
									className="mx-auto truncate max-w-full text-center px-4 pt-2 pg-setting-input-text peer-hover:invisible"
									dangerouslySetInnerHTML={{ __html: title }}
								/>
							</div>
						</>
					);
				})}
			</div>
			{cssLibrary.items.length == 0 && !isLoading && (
				<div>{__("No variation found.", "post-grid")}</div>
			)}
		</div>
	);
}

class PGBlockVariationsPicker extends Component {
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

export default PGBlockVariationsPicker;




