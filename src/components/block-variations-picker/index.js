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
		fetch("https://comboblocks.com/server/wp-json/combo-blocks/v2/get_block_patterns", {
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
							//loadMasonry();
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

	return (
		<div className=" mt-4">
			<div className="m-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1  gap-3 " id={props.blockName}>
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
								className={`item-${index} group p-3 border border-solid relative border-slate-400 rounded-md overflow-hidden hover:border-black hover:shadow-md hover:shadow-slate-300 transition-all duration-150 ease-in-out shadow-md   `}
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
								<div
									className="mx-auto mb-3 text-white bg-gray-600 text-lg truncate max-w-full text-center p-2  peer-hover:invisible"
									dangerouslySetInnerHTML={{ __html: title }}
								/>
								<div className="flex justify-center  ">
									<img src={x.thumb_url} alt="" className="w-[95%]" />

									{isProFeature && (
										<div className="absolute top-1 right-3">
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
											<span>{__("Subscribe to Import", "combo-blocks")}</span>
										</button>
									</div>
								)}

							</div>
						</>
					);
				})}
			</div>
			{cssLibrary.items.length == 0 && !isLoading && (
				<div>{__("No variation found.", "combo-blocks")}</div>
			)}
		</div>
	);
}
class ComboBlocksVariationsPicker extends Component {
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
export default ComboBlocksVariationsPicker;
