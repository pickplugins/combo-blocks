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
import { plus, styles, settings, update } from "@wordpress/icons";
import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
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
		blockName: props.blockName,
		category: "",
		isReset: true,
	});
	var [cssLibrary, setCssLibrary] = useState({ items: [] });
	var [cssLibraryCats, setCssLibraryCats] = useState([]);
	var [isLoading, setIsLoading] = useState(false);
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [sudoPicker, setsudoPicker] = useState(null); // Using the hook.
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
	return (
		<div className=" mt-4">
			<PanelRow>
				<InputControl
					value={queryCss.keyword}
					type="text"
					placeholder="Search variations..."
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
				{cssLibrary.items.map((x) => {
					var content = x.post_content;
					return (
						<div className=" border py-2 my-3">
							<img src={x.thumb_url} alt="" className="" />
							<div className="my-2  flex items-center justify-center flex-wrap gap-2 ">
								<button
									type="button"
									className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center "
									onClick={(ev) => {


										props.onChange(content, "insert");
									}}>
									{__("Insert New", "combo-blocks")}
								</button>
								<button
									type="button"
									className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform   items-center justify-center "
									onClick={(ev) => {
										props.onChange(content, "applyStyle");
									}}>
									{__("Apply Style", "combo-blocks")}
								</button>
								<button
									type="button"
									className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-sm text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform  flex items-center justify-center "
									onClick={(ev) => {
										props.onChange(content, "replace");
									}}>
									{__("Replace", "combo-blocks")}
								</button>
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
					});
				}}>
				{isLoading == true && (
					<span className="text-center">
						<Spinner />
					</span>
				)}
				{__("Load More", "combo-blocks")}
			</div>
		</div>
	);
}
class ComboBlocksPatterns extends Component {
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
		var { blockName, onChange } = this.props;
		return (
			<Html
				blockName={blockName}
				onChange={onChange}
				warn={this.state.showWarning}
			/>
		);
	}
}
export default ComboBlocksPatterns;
