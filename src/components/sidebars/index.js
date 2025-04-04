const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Icon, close, settings, cloud, plus } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
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
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import {
	createElement,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";

import PGcssKeyframes from "../../components/css-keyframes";
import PGAiLayoutGenerator from "../../components/openai-layout-generator";
import PGGlobalStyles from "../../components/global-styles";
import PGPageStyles from "../../components/page-styles";
var myStore = wp.data.select("ComboBlocksStore");
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var isLoaded = props.isLoaded;
	var optionDataDefault = {
		customFonts: [],
		googleFonts: [],
		container: { width: "1150px" },
		breakpoints: [],
		colors: [],
		editor: { width: "1150px" },
		blocks: { disabled: [] },
		addons: { enabled: [] },
		blockInserter: { comboBlocksPositon: "" }, // Category positon
		openAI: { apiKey: "" },
		keyframes: {},
		globalStyles: [
			{ options: { selector: "a" }, styles: {} },
			{ options: { selector: "h1" }, styles: {} },
			{ options: { selector: "h2" }, styles: {} },
		],
		pageStyles: [
			{ options: { selector: "a" }, styles: {} },
			{ options: { selector: "h1" }, styles: {} },
			{ options: { selector: "h2" }, styles: {} },
		],
	};
	var breakPointX = myStore.getBreakPoint();
	var [optionData, setoptionData] = useState(optionDataDefault); // Using the hook.
	var [dataLoaded, setdataLoaded] = useState(false); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [colorPopup, setcolorPopup] = useState(null); // Using the hook.
	var [blockCategories, setblockCategories] = useState(null);
	// Using the hook.
	let isProFeature = applyFilters("isProFeature", true);
	var isLoaded = props.isLoaded;

	useEffect(() => {
		setoptionData(window.comboBlocksEditor);
	}, [window.comboBlocksEditor]);
	useEffect(() => {

		apiFetch({
			path: "/combo-blocks/v2/block_categories",
			method: "POST",
			data: {},
		}).then((res) => {
			var items = [];
			res.map((x) => {
				items.push({ label: x.title, value: x.slug });
			});
			setblockCategories(items);
		});
	}, [isLoaded]);
	useEffect(() => {
		if (optionData != null) {
			clearTimeout(debounce);
			debounce = setTimeout(() => {
				updateOption();
			}, 1000);
		}
	}, [optionData]);
	// useEffect(() => {
	//   wp.domReady(function () {
	//     optionData.blocks.disabled.forEach(function (blockName) {
	//       if (blockName && wp.blocks.getBlockType(blockName) !== undefined) {
	//         wp.blocks.unregisterBlockType(blockName);
	//       }
	//     });
	//   });
	// }, [optionData.blocks.disabled]);
	function updateOption() {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/update_options",
			method: "POST",
			data: { name: "combo_blocks_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			//setoptionData(res)
		});
	}
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		auto: { label: "AUTO", value: "auto" },
		"%": { label: "%", value: "%" },
		cm: { label: "CM", value: "cm" },
		mm: { label: "MM", value: "mm" },
		in: { label: "IN", value: "in" },
		pt: { label: "PT", value: "pt" },
		pc: { label: "PC", value: "pc" },
		ex: { label: "EX", value: "ex" },
		ch: { label: "CH", value: "ch" },
		vw: { label: "VW", value: "vw" },
		vh: { label: "VH", value: "vh" },
		vmin: { label: "VMIN", value: "vmin" },
		vmax: { label: "VMAX", value: "vmax" },
	};
	var fontWeightArgs = {
		normal: { label: "normal", value: "normal" },
		bold: { label: "bold", value: "bold" },
		bolder: { label: "bolder", value: "bolder" },
		lighter: { label: "lighter", value: "lighter" },
		100: { label: "100", value: "100" },
		200: { label: "200", value: "200" },
		300: { label: "300", value: "300" },
		400: { label: "400", value: "400" },
		500: { label: "500", value: "500" },
		600: { label: "600", value: "600" },
		700: { label: "700", value: "700" },
		800: { label: "800", value: "800" },
		900: { label: "900", value: "900" },
	};
	var fontStyleArgs = {
		normal: { label: "normal", value: "normal" },
		italic: { label: "italic", value: "italic" },
		oblique: { label: "oblique", value: "oblique" },
	};
	var fontStretchArgs = {
		"ultra-condensed": { label: "ultra-condensed", value: "ultra-condensed" },
		"extra-condensed": { label: "extra-condensed", value: "extra-condensed" },
		condensed: { label: "condensed", value: "condensed" },
		"semi-condensed": { label: "semi-condensed", value: "semi-condensed" },
		normal: { label: "normal", value: "normal" },
		"semi-expanded": { label: "semi-expanded", value: "semi-expanded" },
		expanded: { label: "expanded", value: "expanded" },
		"extra-expanded": { label: "extra-expanded", value: "extra-expanded" },
		"ultra-expanded": { label: "ultra-expanded", value: "ultra-expanded" },
	};
	var pgBlocks = {
		"combo-blocks/post-grid": { label: "Post Grid", value: "combo-blocks/post-grid" },
		"combo-blocks/filterable-grid": {
			label: "Filterable Grid",
			value: "combo-blocks/filterable-grid",
		},
		"combo-blocks/content-slider": {
			label: "Content Slider",
			value: "combo-blocks/content-slider",
		},
		"combo-blocks/content-slider-item": {
			label: "Content Slider Item",
			value: "combo-blocks/content-slider-item",
		},
		"combo-blocks/popup": { label: "Popup", value: "combo-blocks/popup" },
		"combo-blocks/post-title": {
			label: __("Post title", "combo-blocks"),
			value: "combo-blocks/post-title",
		},
		"combo-blocks/post-excerpt": {
			label: "Post Excerpt",
			value: "combo-blocks/post-excerpt",
		},
		"combo-blocks/post-featured-image": {
			label: "Post Featured Image",
			value: "combo-blocks/post-featured-image",
		},
		"combo-blocks/image": { label: "Image", value: "combo-blocks/image" },
		"combo-blocks/post-author": {
			label: "Post Author",
			value: "combo-blocks/post-author",
		},
		"combo-blocks/post-author-fields": {
			label: "Post Author Fields",
			value: "combo-blocks/post-author-fields",
		},
		"combo-blocks/post-categories": {
			label: "Post Categories",
			value: "combo-blocks/post-categories",
		},
		"combo-blocks/post-tags": { label: "Post Tags", value: "combo-blocks/post-tags" },
		"combo-blocks/post-taxonomies": {
			label: "Post Taxonomies",
			value: "combo-blocks/post-taxonomies",
		},
		"combo-blocks/post-date": { label: "Post Date", value: "combo-blocks/post-date" },
		"combo-blocks/post-meta": { label: "Post Meta", value: "combo-blocks/post-meta" },
		"combo-blocks/read-more": { label: "Read More", value: "combo-blocks/read-more" },
		"combo-blocks/post-comment-count": {
			label: "Post Comment Count",
			value: "combo-blocks/post-comment-count",
		},
		"combo-blocks/progress-bar": {
			label: "Progress Bar",
			value: "combo-blocks/progress-bar",
		},
		"combo-blocks/form-wrap": { label: "Form Wrap", value: "combo-blocks/form-wrap" },
		"combo-blocks/form-field-input": {
			label: "Form Field Input",
			value: "combo-blocks/form-field-input",
		},
		"combo-blocks/form-field-select": {
			label: "Form Field Select",
			value: "combo-blocks/form-field-select",
		},
		"combo-blocks/form-field-checkbox": {
			label: "Form Field Checkbox",
			value: "combo-blocks/form-field-checkbox",
		},
		"combo-blocks/form-field-radio": {
			label: "Form Field Radio",
			value: "combo-blocks/form-field-radio",
		},
		"combo-blocks/form-field-textarea": {
			label: "Form Field Textarea",
			value: "combo-blocks/form-field-textarea",
		},
		"combo-blocks/form-field-submit": {
			label: "Form Field Submit",
			value: "combo-blocks/form-field-submit",
		},
		"combo-blocks/form-field-file-multi": {
			label: "Form Field File Multi",
			value: "combo-blocks/form-field-file-multi",
		},
		"combo-blocks/form-field-file": {
			label: "Form Field File",
			value: "combo-blocks/form-field-file",
		},
		"combo-blocks/list": { label: "List", value: "combo-blocks/list" },
		"combo-blocks/number-counter": {
			label: "Number Counter",
			value: "combo-blocks/number-counter",
		},
		"combo-blocks/icon": { label: "Icon", value: "combo-blocks/icon" },
		"combo-blocks/text": { label: "Text", value: "combo-blocks/text" },
		"combo-blocks/star-rate": { label: "Star Rate", value: "combo-blocks/star-rate" },
		"combo-blocks/breadcrumb": {
			label: "Breadcrumb",
			value: "combo-blocks/breadcrumb",
		},
		"combo-blocks/shortcode": { label: "Shortcode", value: "combo-blocks/shortcode" },
		"combo-blocks/social-share": {
			label: "Social Share",
			value: "combo-blocks/social-share",
		},
		"combo-blocks/terms-list": {
			label: "Terms List",
			value: "combo-blocks/terms-list",
		},
		"combo-blocks/layers": { label: "Layers", value: "combo-blocks/layers" },
		"combo-blocks/layer": { label: "Layer", value: "combo-blocks/layer" },
		"combo-blocks/flex-wrap": { label: "Flex Wrap", value: "combo-blocks/flex-wrap" },
		"combo-blocks/flex-wrap-item": {
			label: "Flex Wrap Item",
			value: "combo-blocks/flex-wrap-item",
		},
		"combo-blocks/grid-wrap": { label: "Grid Wrap", value: "combo-blocks/grid-wrap" },
		"combo-blocks/grid-wrap-item": {
			label: "Grid Wrap Item",
			value: "combo-blocks/grid-wrap-item",
		},
		"combo-blocks/image-gallery": {
			label: "Image Gallery",
			value: "combo-blocks/image-gallery",
		},
		"combo-blocks/image-gallery-item": {
			label: "image Gallery Item",
			value: "combo-blocks/image-gallery-item",
		},
		"combo-blocks/accordion-nested": {
			label: "Accordion Nested",
			value: "combo-blocks/accordion-nested",
		},
		"combo-blocks/accordion-nested-item": {
			label: "Accordion Nested Item",
			value: "combo-blocks/accordion-nested-item",
		},
		"combo-blocks/tabs-nested": {
			label: "Tabs Nested",
			value: "combo-blocks/tabs-nested",
		},
		"combo-blocks/tabs-nested-item": {
			label: "Tabs Nested Item",
			value: "combo-blocks/tabs-nested-item",
		},
		"combo-blocks/post": { label: "Post", value: "combo-blocks/post" },
		"combo-blocks/accordion": { label: "Accordion", value: "combo-blocks/accordion" },
		"combo-blocks/tabs": { label: "Tabs", value: "combo-blocks/tabs" },
	};
	useEffect(() => {
		var width = optionData.editor.width;
		var str = `body.block-editor-page #editor .wp-block {
    max-width: ${width};
}`;
		var wpfooter = document.getElementById("wpfooter");
		var divWrap = document.getElementById("pg-editor-width");
		if (divWrap != undefined) {
			document.getElementById("pg-editor-width").outerHTML = "";
		}
		var divWrap = '<div id="pg-editor-width"></div>';
		wpfooter.insertAdjacentHTML("beforeend", divWrap);
		var csswrappg = document.getElementById("pg-editor-width");
		var contWidth = "<style>" + str + "</style>";
		csswrappg.insertAdjacentHTML("beforeend", contWidth);
	}, [optionData]);
	return (
		<div className="relative pg-setting-input-text">


			{(isLoading) && (
				<div className="absolute w-full text-center p-3 top-0 left-0">
					<Spinner />
				</div>
			)}



			<>
				<div className="">
					<div className="p-3">
						<PanelRow>
							<label>{__("Container Width", "combo-blocks")}</label>
							<InputControl
								type="number"
								value={
									optionData?.container?.width == undefined
										? ""
										: optionData.container.width.match(/-?\d+/g)[0]
								}
								onChange={(newVal) => {
									var container = { ...optionData.container };
									var widthValX =
										container.width == undefined ||
											container.width.match(/-?\d+/g) == null
											? 0
											: container.width.match(/-?\d+/g)[0];
									var widthUnitX =
										container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: container.width.match(/[a-zA-Z%]+/g)[0];
									var containerX = {
										...optionData.container,
										width: newVal + widthUnitX,
									};
									setoptionData({ ...optionData, container: containerX });
								}}
							/>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={unitArgs}
								buttonTitle={
									optionData.container.width.match(/[a-zA-Z%]+/g) == null
										? __("Choose", "combo-blocks")
										: optionData.container.width.match(/[a-zA-Z%]+/g)[0]
								}
								onChange={(option, index) => {
									var container = { ...optionData.container };
									var widthValX =
										container.width == undefined ||
											container.width.match(/-?\d+/g) == null
											? 0
											: container.width.match(/-?\d+/g)[0];
									var widthUnitX =
										container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: container.width.match(/[a-zA-Z%]+/g)[0];
									var containerX = {
										...optionData.container,
										width: widthValX + option.value,
									};
									setoptionData({ ...optionData, container: containerX });
								}}
								values={""}></PGDropdown>
						</PanelRow>
						<PanelRow>
							<label>{__("Editor Width", "combo-blocks")}</label>
							<InputControl
								type="number"
								value={optionData.editor.width.match(/-?\d+/g)[0]}
								onChange={(newVal) => {
									var editor = { ...optionData.editor };
									var widthValX =
										editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
											? 0
											: editor.width.match(/-?\d+/g)[0];
									var widthUnitX =
										editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: editor.width.match(/[a-zA-Z%]+/g)[0];
									var editorX = {
										...optionData.editor,
										width: newVal + widthUnitX,
									};
									setoptionData({ ...optionData, editor: editorX });
								}}
							/>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={unitArgs}
								buttonTitle={
									optionData.editor.width.match(/[a-zA-Z%]+/g) == null
										? __("Choose", "combo-blocks")
										: optionData.editor.width.match(/[a-zA-Z%]+/g)[0]
								}
								onChange={(option, index) => {
									var editor = { ...optionData.editor };
									var widthValX =
										editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
											? 0
											: editor.width.match(/-?\d+/g)[0];
									var widthUnitX =
										editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: editor.width.match(/[a-zA-Z%]+/g)[0];
									var editorX = {
										...optionData.editor,
										width: widthValX + option.value,
									};
									setoptionData({ ...optionData, editor: editorX });
								}}
								values={""}></PGDropdown>
						</PanelRow>
					</div>
					{optionData?.addons?.enabled?.includes("globalStyle") && (
						<PGtoggle
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Global Styles", "combo-blocks")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											{__("Pro", "combo-blocks")}
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
							initialOpen={false}>
							<p className="my-3">{__("Global styles will used to all pages.", "combo-blocks")}</p>
							<div
								className={`${isProFeature ? "pg-blur	pointer-events-none" : ""
									}`}>
								<PGGlobalStyles
									args={
										optionData.globalStyles == undefined
											? optionDataDefault.globalStyles
											: optionData.globalStyles
									}
									onChange={(prams) => {
										setoptionData({ ...optionData, globalStyles: prams });
									}}
								/>
							</div>
						</PGtoggle>
					)}
					{optionData?.addons?.enabled?.includes("pageStyles") && (
						<PGtoggle
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between gap-2 w-full">
									<span>{__("Page Styles", "combo-blocks")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											{__("Pro", "combo-blocks")}
										</span>
									) : (
										""
									)}
								</span>
							}
							initialOpen={false}>
							<PGPageStyles
								onChange={(prams) => {
									setoptionData({ ...optionData, pageStyles: prams })
								}}
							/>
						</PGtoggle>
					)}
					{/* <PGtoggle title="keyframes" initialOpen={false}>
							<div className="text-2xl font-bold mb-7">Keyframes</div>
							<div
								className={`${
									isProFeature ? "pg-blur	pointer-events-none" : ""
								}`}>
								{optionData.keyframes != null && (
									<PGcssKeyframes
										keyframes={optionData.keyframes}
										onChange={(args) => {
											setoptionData({ ...optionData, keyframes: args });
										}}
									/>
								)}
							</div>
						</PGtoggle> */}
					{/* <PGtoggle title="Layout Generator" initialOpen={false}>
						<PGAiLayoutGenerator args={''} onChange={(args) => {
						}} />
					</PGtoggle> */}
					{/* <PGtoggle title="OpenAI" initialOpen={false}>
              <PanelRow>
                <label>API Key</label>
                <InputControl
                  type="text"
                  value={optionData.openAI == undefined ? '' : optionData.openAI.apiKey}
                  onChange={(newVal) => {
                    var openAI = { ...optionData.openAI, apiKey: newVal }
                    setoptionData({ ...optionData, openAI: openAI })
                  }}
                />
              </PanelRow>
            </PGtoggle> */}
				</div>
			</>

		</div>
	);
}
class PGsidebars extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState((state) => ({
				isLoaded: !state.isLoaded,
			}));
		}, 1000);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		var { onChange } = this.props;
		return (
			<Html
				onChange={onChange}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}
export default PGsidebars;
