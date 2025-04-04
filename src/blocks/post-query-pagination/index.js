import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, cloud, mediaAndText, pencil, settings } from "@wordpress/icons";
const { parse } = wp.blockSerializationDefaultParser;

// import paginationTypes from "./pagination-types";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import metadata from "./block.json";
var myStore = wp.data.select("ComboBlocksStore");
// var queryPramsX = queryPrams.map((x, i) => {
//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })
registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff0",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M61.176 0H4.70539C3.45732 0 2.26036 0.495793 1.37783 1.37832C0.49531 2.26084 -0.000488281 3.4578 -0.000488281 4.70588V51.7647C-0.000488281 53.0128 0.49531 54.2097 1.37783 55.0923C2.26036 55.9748 3.45732 56.4706 4.70539 56.4706H61.176C62.4241 56.4706 63.621 55.9748 64.5035 55.0923C65.3861 54.2097 65.8819 53.0128 65.8819 51.7647V4.70588C65.8819 3.4578 65.3861 2.26084 64.5035 1.37832C63.621 0.495793 62.4241 0 61.176 0ZM56.4701 47.0588H9.41128V9.41177H56.4701V47.0588Z"
					fill="url(#paint0_linear_61_3)"
				/>
				<path
					d="M160 14.1177H84.7056V23.5294H160V14.1177Z"
					fill="url(#paint1_linear_61_3)"
				/>
				<path
					d="M141.176 32.9414H84.7056V42.3532H141.176V32.9414Z"
					fill="url(#paint2_linear_61_3)"
				/>
				<path
					d="M61.176 74H4.70539C3.45732 74 2.26036 74.4958 1.37783 75.3783C0.49531 76.2608 -0.000488281 77.4578 -0.000488281 78.7059V125.765C-0.000488281 127.013 0.49531 128.21 1.37783 129.092C2.26036 129.975 3.45732 130.471 4.70539 130.471H61.176C62.4241 130.471 63.621 129.975 64.5035 129.092C65.3861 128.21 65.8819 127.013 65.8819 125.765V78.7059C65.8819 77.4578 65.3861 76.2608 64.5035 75.3783C63.621 74.4958 62.4241 74 61.176 74ZM56.4701 121.059H9.41128V83.4118H56.4701V121.059Z"
					fill="url(#paint3_linear_61_3)"
				/>
				<path
					d="M160 88.1177H84.7056V97.5294H160V88.1177Z"
					fill="url(#paint4_linear_61_3)"
				/>
				<path
					d="M141.176 106.941H84.7056V116.353H141.176V106.941Z"
					fill="url(#paint5_linear_61_3)"
				/>
				<path d="M53.5996 142H35.5996V160H53.5996V142Z" fill="#C15940" />
				<path d="M89.5996 142H71.5996V160H89.5996V142Z" fill="#C15940" />
				<path d="M125.6 142H107.6V160H125.6V142Z" fill="#C15940" />
				<path
					d="M155.809 151.788C155.809 152.076 155.579 152.459 155.349 152.651L145.93 159.461C145.356 159.845 144.552 159.845 143.977 159.365C143.518 158.886 143.518 158.214 144.092 157.735L152.363 151.788L144.092 145.842C143.518 145.458 143.403 144.691 143.977 144.211C144.437 143.731 145.356 143.636 145.93 144.115L155.349 150.925C155.694 151.117 155.809 151.404 155.809 151.788Z"
					fill="#C15940"
				/>
				<path
					d="M4.99955 151.788C4.99955 152.076 5.22945 152.459 5.45919 152.651L14.8782 159.461C15.4525 159.845 16.2565 159.845 16.8308 159.365C17.2903 158.886 17.2905 158.214 16.7161 157.735L8.44554 151.788L16.7161 145.842C17.2905 145.458 17.4052 144.691 16.8308 144.211C16.3714 143.731 15.4525 143.636 14.8782 144.115L5.45919 150.925C5.11459 151.117 4.99955 151.404 4.99955 151.788Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_3"
						x1="-0.000488281"
						y1="28.2353"
						x2="65.8819"
						y2="28.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_3"
						x1="84.7056"
						y1="18.8236"
						x2="160"
						y2="18.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_3"
						x1="84.7056"
						y1="37.6473"
						x2="141.176"
						y2="37.6473"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_3"
						x1="-0.000488281"
						y1="102.235"
						x2="65.8819"
						y2="102.235"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_3"
						x1="84.7056"
						y1="92.8236"
						x2="160"
						y2="92.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_3"
						x1="84.7056"
						y1="111.647"
						x2="141.176"
						y2="111.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;
		var next = attributes.next;
		var previous = attributes.previous;
		var start = attributes.start;
		var end = attributes.end;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		const paginationSelector = blockClass;
		const paginationItemSelector = blockClass + " .page-numbers";
		const paginationItemActiveSelector = blockClass + " .page-numbers.current";
		const nextSelector = blockClass + " .page-numbers.next";
		const previousSelector = blockClass + " .page-numbers.prev";
		const startSelector = blockClass + " .page-numbers.start";
		const endSelector = blockClass + " .page-numbers.end";
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);
		const parentBlocks = wp.data
			.select("core/block-editor")
			.getBlockParents(clientId);
		const parentAttributes = wp.data
			.select("core/block-editor")
			.getBlocksByClientId(parentBlocks);
		const paginationTypesBasic = {
			none: { label: __("None", "combo-blocks"), value: "none" },
			normal: { label: __("Normal Pagination", "combo-blocks"), value: "normal" },
			ajax: {
				label: __("Ajax Pagination", "combo-blocks"),
				value: "ajax",
				isPro: true,
			},
			next_previous: {
				label: __("Next-Previous", "combo-blocks"),
				value: "next_previous",
				isPro: true,
			},
			loadmore: {
				label: __("Load More", "combo-blocks"),
				value: "loadmore",
				isPro: true,
			},
			infinite: {
				label: __("Infinite Load", "combo-blocks"),
				value: "infinite",
				isPro: true,
			},
			filterable: { label: __("Filterable", "combo-blocks"), value: "filterable" },
		};
		let paginationTypes = applyFilters("paginationTypes", paginationTypesBasic);
		var [paginationTypeZ, setPaginationTypeZ] = useState({});
		useEffect(() => { }, [parentAttributes]);
		var parentPagination =
			context["combo-blocks/pagination"] == undefined
				? null
				: context["combo-blocks/pagination"];
		var parentPaginationItem =
			context["combo-blocks/paginationItem"] == undefined
				? null
				: context["combo-blocks/paginationItem"];
		var parentPaginationItemActive =
			context["combo-blocks/paginationItemActive"] == undefined
				? null
				: context["combo-blocks/paginationItemActive"];
		var postGridId =
			context["combo-blocks/postGridId"] == undefined
				? null
				: context["combo-blocks/postGridId"];
		const [previousHtml, setPreviousHtml] = useState("");
		const [nextHtml, setNextHtml] = useState("");
		const [startHtml, setStartHtml] = useState("");
		const [endHtml, setEndHtml] = useState("");
		const [loadingHtml, setLoadingHtml] = useState("");
		const [loadMoreHtml, setLoadMoreHtml] = useState("");
		useEffect(() => {
			var iconSrc = previous.options.iconSrc;
			var previousHtml = `<span class="${iconSrc}"></span>`;
			setPreviousHtml(previousHtml);
		}, [previous]);
		useEffect(() => {
			var iconSrc = next.options.iconSrc;
			var nextHtml = `<span class="${iconSrc}"></span>`;
			setNextHtml(nextHtml);
		}, [next]);
		useEffect(() => {
			var iconSrc = start.options.iconSrc;
			var startHtml = `<span class="${iconSrc}"></span>`;
			setStartHtml(startHtml);
		}, [start]);
		useEffect(() => {
			var iconSrc = end.options.iconSrc;
			var endHtml = `<span class="${iconSrc}"></span>`;
			setEndHtml(endHtml);
		}, [end]);
		useEffect(() => {
			var iconSrc = pagination.options.loadingIcon.iconSrc;
			var loadingHtml = `<span class="${iconSrc}"></span>`;
			setLoadingHtml(loadingHtml);
			// var iconSrc1 = pagination.options.loadMoreIcon.iconSrc;
			// var loadMoreHtml = `<span class="${iconSrc}"></span>`;
			// setLoadMoreHtml(loadMoreHtml);
		}, [pagination]);
		// useEffect(() => {
		// 	var iconSrc1 = pagination.options.loadMoreIcon.iconSrc;
		// 	var loadMoreHtml = `<span className="${iconSrc1}"></span>`;
		// 	setLoadMoreHtml(loadMoreHtml);
		// }, [pagination]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			setAttributes({ blockCssY: { items: blockCssY.items } });
			if (parentBlock != null) {
				if (parentBlock != undefined) {
					if (parentBlock.name === "combo-blocks/post-grid") {
						const paginationTypeX = { ...paginationTypes };
						if ("filterable" in paginationTypeX) {
							delete paginationTypeX.filterable;
							setPaginationTypeZ(paginationTypeX);
						}
					} else if (parentBlock.name === "combo-blocks/filterable-grid") {
						const paginationTypeX = { filterable: paginationTypes.filterable };
						setPaginationTypeZ(paginationTypeX);
					}
				} else {
					setPaginationTypeZ("normal");
				}
			}
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[paginationSelector] = pagination;
			blockCssObj[paginationItemSelector] = paginationItem;
			blockCssObj[paginationItemActiveSelector] = paginationItemActive;
			blockCssObj[nextSelector] = next;
			blockCssObj[previousSelector] = previous;
			blockCssObj[startSelector] = start;
			blockCssObj[endSelector] = end;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			if (
				parentPagination != null &&
				Object.entries(pagination.styles).length == 0
			) {
				// setAttributes({ pagination: parentPagination });
			}
		}, [parentPagination]);
		useEffect(() => {
			if (
				parentPaginationItem != null &&
				Object.entries(paginationItem.styles).length == 0
			) {
				// setAttributes({ paginationItem: parentPaginationItem });
			}
		}, [parentPaginationItem]);
		useEffect(() => {
			if (
				parentPaginationItemActive != null &&
				Object.entries(paginationItemActive.styles).length == 0
			) {
				// setAttributes({ paginationItemActive: parentPaginationItemActive });
			}
		}, [parentPaginationItemActive]);
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				const position =
					select("core/editor").getBlockInsertionPoint(parentClientId);
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(
						wp.blocks.parse(content),
						position.index,
						position.rootClientId
					);
			}
			if (action == "applyStyle") {
				// var blockId = attributes.blockId
				var paginationX = attributes.pagination;
				var paginationItemX = attributes.paginationItem;
				var paginationItemActiveX = attributes.paginationItemActive;
				var nextX = attributes.next;
				var previousX = attributes.previous;
				var startX = attributes.start;
				var endX = attributes.end;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (paginationX != undefined) {
					var paginationY = { ...paginationX, options: pagination.options };
					setAttributes({ pagination: paginationY });
					blockCssObj[paginationSelector] = paginationY;
				}
				if (paginationItemX != undefined) {
					var paginationItemY = {
						...paginationItemX,
						options: paginationItem.options,
					};
					setAttributes({ paginationItem: paginationItemY });
					blockCssObj[paginationItemSelector] = paginationItemY;
				}
				if (paginationItemActiveX != undefined) {
					var paginationItemActiveY = {
						...paginationItemActiveX,
						options: paginationItemActive.options,
					};
					setAttributes({ paginationItemActive: paginationItemActiveY });
					blockCssObj[paginationItemActiveSelector] = paginationItemActiveY;
				}
				if (nextX != undefined) {
					var nextY = { ...nextX, options: next.options };
					setAttributes({ next: nextY });
					blockCssObj[nextSelector] = nextY;
				}
				if (previousX != undefined) {
					var previousY = { ...previousX, options: previous.options };
					setAttributes({ previous: previousY });
					blockCssObj[previousSelector] = previousY;
				}
				if (startX != undefined) {
					var startY = { ...startX, options: start.options };
					setAttributes({ start: startY });
					blockCssObj[startSelector] = startY;
				}
				if (endX != undefined) {
					var endY = { ...endX, options: end.options };
					setAttributes({ end: endY });
					blockCssObj[endSelector] = endY;
				}
				var blockCssRules = myStore.getBlockCssRules(blockCssObj);
				var items = blockCssRules;
				setAttributes({ blockCssY: { items: items } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}
		function onPickCssLibraryPaginationItemActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItemActive[sudoScource] = sudoScourceArgs;
			});
			var paginationItemActiveX = Object.assign({}, paginationItemActive);
			setAttributes({ paginationItemActive: paginationItemActiveX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemActiveSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onChangeStylePaginationItemActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ paginationItemActive: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStylePaginationItemActive(sudoScource, key) {
			let obj = { ...paginationItemActive };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ paginationItemActive: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStylePagination(sudoScource, key) {
			let obj = { ...pagination };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ pagination: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStylePaginationItem(sudoScource, key) {
			let obj = { ...paginationItem };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ paginationItem: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStylePrevious(sudoScource, key) {
			let obj = { ...previous };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ previous: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				previousSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleNext(sudoScource, key) {
			let obj = { ...next };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ next: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nextSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleStart(sudoScource, key) {
			let obj = { ...start };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ start: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				startSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleEnd(sudoScource, key) {
			let obj = { ...end };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ end: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				endSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}

		function onAddStylePaginationItemActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItemActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItemActive: object });
		}
		function onPickCssLibraryPagination(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				pagination[sudoScource] = sudoScourceArgs;
			});
			var paginationX = Object.assign({}, pagination);
			setAttributes({ pagination: paginationX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		// function onChangeStylePagination(sudoScource, newVal, attr) {
		// 	var path = [sudoScource, attr, breakPointX];
		// 	let obj = Object.assign({}, pagination);
		// 	const object = myStore.updatePropertyDeep(obj, path, newVal);
		// 	setAttributes({ pagination: object });
		// 	var elementSelector = myStore.getElementSelector(
		// 		sudoScource,
		// 		paginationSelector
		// 	);
		// 	var cssPropty = myStore.cssAttrParse(attr);
		// 	let itemsX = Object.assign({}, blockCssY.items);
		// 	if (itemsX[elementSelector] == undefined) {
		// 		itemsX[elementSelector] = {};
		// 	}
		// 	var cssPath = [elementSelector, cssPropty, breakPointX];
		// 	const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
		// 	setAttributes({ blockCssY: { items: cssItems } });
		// }
		function onChangeStylePagination(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ pagination: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				paginationSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStylePagination(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ pagination: object });
		}
		function onPickCssLibraryPaginationItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				paginationItem[sudoScource] = sudoScourceArgs;
			});
			var paginationX = Object.assign({}, paginationItem);
			setAttributes({ paginationItem: paginationX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					paginationItemSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onChangeStylePaginationItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ paginationItem: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		// button style
		function onChangeStylePrevious(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, previous);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ previous: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				previousSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStylePrevious(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, previous);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ previous: object });
		}
		function onChangeStyleNext(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, next);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ next: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				nextSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleNext(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, next);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ next: object });
		}
		function onChangeStyleStart(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, start);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ start: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				startSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleStart(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, start);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ start: object });
		}
		function onChangeStyleEnd(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, end);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ end: object });
			var elementSelector = myStore.getElementSelector(sudoSource, endSelector);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleEnd(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, end);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ end: object });
		}
		function onBulkAddPaginationItemActive(sudoScource, cssObj) {
			let obj = Object.assign({}, paginationItemActive);
			obj[sudoScource] = cssObj;
			setAttributes({ paginationItemActive: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationItemActiveSelector
			);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddPaginationItem(sudoScource, cssObj) {
			let obj = Object.assign({}, paginationItem);
			obj[sudoScource] = cssObj;
			setAttributes({ paginationItem: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationItemSelector
			);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddPagination(sudoScource, cssObj) {
			let obj = Object.assign({}, pagination);
			obj[sudoScource] = cssObj;
			setAttributes({ pagination: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
			);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddPrevious(sudoScource, cssObj) {
			let obj = Object.assign({}, previous);
			obj[sudoScource] = cssObj;
			setAttributes({ previous: obj });
			var selector = myStore.getElementSelector(sudoScource, previousSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddNext(sudoScource, cssObj) {
			let obj = Object.assign({}, next);
			obj[sudoScource] = cssObj;
			setAttributes({ next: obj });
			var selector = myStore.getElementSelector(sudoScource, nextSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddStart(sudoScource, cssObj) {
			let obj = Object.assign({}, start);
			obj[sudoScource] = cssObj;
			setAttributes({ start: obj });
			var selector = myStore.getElementSelector(sudoScource, startSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		function onBulkAddEnd(sudoScource, cssObj) {
			let obj = Object.assign({}, end);
			obj[sudoScource] = cssObj;
			setAttributes({ end: obj });
			var selector = myStore.getElementSelector(sudoScource, endSelector);
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var attr = args[0];
				var cssPropty = myStore.cssAttrParse(attr);
				if (stylesObj[selector] == undefined) {
					stylesObj[selector] = {};
				}
				if (stylesObj[selector][cssPropty] == undefined) {
					stylesObj[selector][cssPropty] = {};
				}
				stylesObj[selector][cssPropty] = args[1];
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onResetPaginationItemActive(sudoSources) {
			let obj = Object.assign({}, paginationItemActive);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationItemActiveSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ paginationItemActive: obj });
		}
		function onResetPaginationItem(sudoSources) {
			let obj = Object.assign({}, paginationItem);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationItemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ paginationItem: obj });
		}
		function onResetPagination(sudoSources) {
			let obj = Object.assign({}, pagination);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ pagination: obj });
		}
		function onResetPrevious(sudoSources) {
			let obj = Object.assign({}, previous);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						previousSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ previous: obj });
		}
		function onResetNext(sudoSources) {
			let obj = Object.assign({}, next);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						nextSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ next: obj });
		}
		function onResetStart(sudoSources) {
			let obj = Object.assign({}, start);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						startSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ start: obj });
		}
		function onResetEnd(sudoSources) {
			let obj = Object.assign({}, end);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						endSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ end: obj });
		}

		function onPickCssLibraryPrevious(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				previous[sudoScource] = sudoScourceArgs;
			});
			var previousX = Object.assign({}, previous);
			setAttributes({ previous: previousX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					previousSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryNext(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				next[sudoScource] = sudoScourceArgs;
			});
			var nextX = Object.assign({}, next);
			setAttributes({ next: nextX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					nextSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryStart(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				start[sudoScource] = sudoScourceArgs;
			});
			var startX = Object.assign({}, start);
			setAttributes({ start: startX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					startSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryEnd(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				end[sudoScource] = sudoScourceArgs;
			});
			var endX = Object.assign({}, end);
			setAttributes({ end: endX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					endSelector
				);
				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		// button style end
		function onAddStylePaginationItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationItem: object });
		}
		function onChangePreviousIcon(arg) {
			var options = {
				...previous.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ previous: { ...previous, options: options } });
		}
		function onChangeNextIcon(arg) {
			var options = {
				...next.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ next: { ...next, options: options } });
		}
		function onChangeStartIcon(arg) {
			var options = {
				...start.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ start: { ...start, options: options } });
		}
		function onChangeEndIcon(arg) {
			var options = {
				...end.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ end: { ...end, options: options } });
		}
		const blockProps = useBlockProps({
			className: ` ${blockId} ${pagination?.options?.class}`,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text pg-font">
						<div className="my-4 px-3">
							<PanelRow className="mb-4">
								<label htmlFor="">{__("Pagination Type", "combo-blocks")}</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={paginationTypeZ}
									buttonTitle={
										paginationTypes[pagination.options.type] != undefined
											? paginationTypes[pagination.options.type].label
											: __("Choose", "combo-blocks")
									}
									onChange={(arg, index) => {
										var options = { ...pagination.options, type: arg.value };
										setAttributes({
											pagination: { ...pagination, options: options },
										});
									}}
									values={""}></PGDropdown>
							</PanelRow>
							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax") && (
									<>
										<PanelRow>
											<label htmlFor="">
												{__("Max Number of Pagination", "combo-blocks")}
											</label>
											<InputControl
												value={pagination.options.maxPageNum}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														maxPageNum: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
									</>
								)}
							{(pagination.options.type == "normal" ||
								pagination.options.type == "ajax" ||
								pagination.options.type == "next_previous" ||
								pagination.options.type == "filterable") && (
									<>
										<PanelRow>
											<label htmlFor="">{__("Previous Text", "combo-blocks")}</label>
											<InputControl
												value={pagination.options.prevText}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														prevText: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("Next Text", "combo-blocks")}</label>
											<InputControl
												value={pagination.options.nextText}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														nextText: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
									</>
								)}
							{(pagination.options.type == "loadmore" ||
								pagination.options.type == "infinite") && (
									<>
										<PanelRow>
											<label htmlFor="">
												{__("Load More Text", "combo-blocks")}
											</label>
											<InputControl
												value={pagination.options.loadMoreText}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														loadMoreText: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("No Posts Text", "combo-blocks")}</label>
											<InputControl
												value={pagination.options.noMorePosts}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														noMorePosts: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("Loading Text", "combo-blocks")}</label>
											<InputControl
												value={pagination.options.loadingText}
												onChange={(newVal) => {
													var options = {
														...pagination.options,
														loadingText: newVal,
													};
													setAttributes({
														pagination: { ...pagination, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">{__("Loading Icon", "combo-blocks")}</label>
											<PGIconPicker
												library={pagination.options.loadingIcon.library}
												srcType={pagination.options.loadingIcon.srcType}
												iconSrc={pagination.options.loadingIcon.iconSrc}
												onChange={(arg) => {
													const options = {
														...pagination.options,
													};
													const iconX = {
														...options.loadingIcon,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													const optionX = {
														...options,
														loadingIcon: iconX,
													};
													setAttributes({
														pagination: { ...pagination, options: optionX },
													});
													// setAttributes({
													// 	pagination: { ...pagination, options: options },
													// });
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Loading Icon position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={pagination.options.loadingIcon.loadingPosition}
												options={[
													{
														label: __("Choose Position", "combo-blocks"),
														value: "",
													},
													{
														label: __("Before Text", "combo-blocks"),
														value: "beforeText",
													},
													{
														label: __("After Text", "combo-blocks"),
														value: "afterText",
													},
												]}
												onChange={(newVal) => {
													const options = {
														...pagination.options,
													};
													const positionX = {
														...options.loadingIcon,
														loadingPosition: newVal,
													};
													const optionX = {
														...options,
														loadingIcon: positionX,
													};
													setAttributes({
														pagination: { ...pagination, options: optionX },
													});
													// setAttributes({
													// 	pagination: { ...pagination, options: options },
													// });
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">
												{__("Load More Icon", "combo-blocks")}
											</label>
											<PGIconPicker
												library={pagination.options.loadMoreIcon.library}
												srcType={pagination.options.loadMoreIcon.srcType}
												iconSrc={pagination.options.loadMoreIcon.iconSrc}
												onChange={(arg) => {
													const options = {
														...pagination.options,
													};
													const iconX = {
														...options.loadMoreIcon,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													const optionX = {
														...options,
														loadMoreIcon: iconX,
													};
													setAttributes({
														pagination: { ...pagination, options: optionX },
													});
													// setAttributes({
													// 	pagination: { ...pagination, options: options },
													// });
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Load More Icon position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={pagination.options.loadMoreIcon.position}
												options={[
													{
														label: __("Choose Position", "combo-blocks"),
														value: "",
													},
													{
														label: __("Before Text", "combo-blocks"),
														value: "beforeText",
													},
													{
														label: __("After Text", "combo-blocks"),
														value: "afterText",
													},
												]}
												onChange={(newVal) => {
													const options = {
														...pagination.options,
													};
													const positionX = {
														...options.loadMoreIcon,
														position: newVal,
													};
													const optionX = {
														...options,
														loadMoreIcon: positionX,
													};
													setAttributes({
														pagination: { ...pagination, options: optionX },
													});
													// setAttributes({
													// 	pagination: { ...pagination, options: options },
													// });
												}}
											/>
										</PanelRow>
									</>
								)}
						</div>
						<PGtoggle
							className=""
							title={__("Pagination Wrapper", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={pagination}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												pagination,
												"pagination",
												paginationSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												pagination,
												"pagination",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												pagination,
												"pagination",
												paginationSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												pagination,
												"pagination",
												paginationSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												pagination,
												"pagination",
												paginationSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={pagination}
										onChange={onPickCssLibraryPagination}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							title={__("Pagination Items", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItem}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												paginationItem,
												"paginationItem",
												paginationItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												paginationItem,
												"paginationItem",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												paginationItem,
												"paginationItem",
												paginationItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												paginationItem,
												"paginationItem",
												paginationItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												paginationItem,
												"paginationItem",
												paginationItemSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItem}
										onChange={onPickCssLibraryPaginationItem}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							title={__("Pagination Active", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: pencil,
										className: "tab-style",
									},
									{
										name: "css",
										title: "CSS Library",
										icon: cloud,
										className: "tab-css",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={paginationItemActive}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												paginationItemActive,
												"paginationItemActive",
												paginationItemActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												paginationItemActive,
												"paginationItemActive",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												paginationItemActive,
												"paginationItemActive",
												paginationItemActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												paginationItemActive,
												"paginationItemActive",
												paginationItemActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												paginationItemActive,
												"paginationItemActive",
												paginationItemActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={paginationItemActive}
										onChange={onPickCssLibraryPaginationItemActive}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						{(pagination.options.type == "normal" ||
							pagination.options.type == "ajax" ||
							pagination.options.type == "next_previous" ||
							pagination.options.type == "filterable") && (
								<>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Previous", "combo-blocks")}
										initialOpen={false}>
										<PGtabs
											activeTab="options"
											orientation="horizontal"
											activeClass="active-tab"
											onSelect={(tabName) => { }}
											tabs={[
												{
													name: "options",
													title: "Options",
													icon: settings,
													className: "tab-settings",
												},
												{
													name: "styles",
													title: "Styles",
													icon: brush,
													className: "tab-style",
												},
												{
													name: "css",
													title: "CSS Library",
													icon: mediaAndText,
													className: "tab-css",
												},
											]}>
											<PGtab name="options">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose Previous Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={previous.options.library}
														srcType={previous.options.srcType}
														iconSrc={previous.options.iconSrc}
														onChange={onChangePreviousIcon}
													/>
												</PanelRow>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Icon position", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={previous.options.position}
														options={[
															{
																label: __("Choose Position", "combo-blocks"),
																value: "",
															},
															{
																label: __("Before Text", "combo-blocks"),
																value: "beforeText",
															},
															{
																label: __("After Text", "combo-blocks"),
																value: "afterText",
															},
														]}
														onChange={(newVal) => {
															var options = {
																...previous.options,
																position: newVal,
															};
															setAttributes({
																previous: { ...previous, options: options },
															});
														}}
													/>
												</PanelRow>
											</PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={previous}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															previous,
															"previous",
															previousSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															previous,
															"previous",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															previous,
															"previous",
															previousSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															previous,
															"previous",
															previousSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															previous,
															"previous",
															previousSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={previous}
													onChange={onPickCssLibraryPrevious}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Next", "combo-blocks")}
										initialOpen={false}>
										<PGtabs
											activeTab="options"
											orientation="horizontal"
											activeClass="active-tab"
											onSelect={(tabName) => { }}
											tabs={[
												{
													name: "options",
													title: "Options",
													icon: settings,
													className: "tab-settings",
												},
												{
													name: "styles",
													title: "Styles",
													icon: brush,
													className: "tab-style",
												},
												{
													name: "css",
													title: "CSS Library",
													icon: mediaAndText,
													className: "tab-css",
												},
											]}>
											<PGtab name="options">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose Next Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={next.options.library}
														srcType={next.options.srcType}
														iconSrc={next.options.iconSrc}
														onChange={onChangeNextIcon}
													/>
												</PanelRow>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Icon position", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={next.options.position}
														options={[
															{
																label: __("Choose Position", "combo-blocks"),
																value: "",
															},
															{
																label: __("Before Text", "combo-blocks"),
																value: "beforeText",
															},
															{
																label: __("After Text", "combo-blocks"),
																value: "afterText",
															},
														]}
														onChange={(newVal) => {
															var options = {
																...next.options,
																position: newVal,
															};
															setAttributes({
																next: { ...next, options: options },
															});
														}}
													/>
												</PanelRow>
											</PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={next}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															next,
															"next",
															nextSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															next,
															"next",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															next,
															"next",
															nextSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															next,
															"next",
															nextSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															next,
															"next",
															nextSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={next}
													onChange={onPickCssLibraryNext}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Start", "combo-blocks")}
										initialOpen={false}>
										<PGtabs
											activeTab="options"
											orientation="horizontal"
											activeClass="active-tab"
											onSelect={(tabName) => { }}
											tabs={[
												{
													name: "options",
													title: "Options",
													icon: settings,
													className: "tab-settings",
												},
												{
													name: "styles",
													title: "Styles",
													icon: brush,
													className: "tab-style",
												},
												{
													name: "css",
													title: "CSS Library",
													icon: mediaAndText,
													className: "tab-css",
												},
											]}>
											<PGtab name="options">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose Start Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={start.options.library}
														srcType={start.options.srcType}
														iconSrc={start.options.iconSrc}
														onChange={onChangeStartIcon}
													/>
												</PanelRow>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Icon position", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={start.options.position}
														options={[
															{
																label: __("Choose Position", "combo-blocks"),
																value: "",
															},
															{
																label: __("Before Text", "combo-blocks"),
																value: "beforeText",
															},
															{
																label: __("After Text", "combo-blocks"),
																value: "afterText",
															},
														]}
														onChange={(newVal) => {
															var options = {
																...start.options,
																position: newVal,
															};
															setAttributes({
																start: { ...start, options: options },
															});
														}}
													/>
												</PanelRow>
											</PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={start}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															start,
															"start",
															startSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															start,
															"start",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															start,
															"start",
															startSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															start,
															"start",
															startSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															start,
															"start",
															startSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={start}
													onChange={onPickCssLibraryStart}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("End", "combo-blocks")}
										initialOpen={false}>
										<PGtabs
											activeTab="options"
											orientation="horizontal"
											activeClass="active-tab"
											onSelect={(tabName) => { }}
											tabs={[
												{
													name: "options",
													title: "Options",
													icon: settings,
													className: "tab-settings",
												},
												{
													name: "styles",
													title: "Styles",
													icon: brush,
													className: "tab-style",
												},
												{
													name: "css",
													title: "CSS Library",
													icon: mediaAndText,
													className: "tab-css",
												},
											]}>
											<PGtab name="options">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose End Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={end.options.library}
														srcType={end.options.srcType}
														iconSrc={end.options.iconSrc}
														onChange={onChangeEndIcon}
													/>
												</PanelRow>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Icon position", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={end.options.position}
														options={[
															{
																label: __("Choose Position", "combo-blocks"),
																value: "",
															},
															{
																label: __("Before Text", "combo-blocks"),
																value: "beforeText",
															},
															{
																label: __("After Text", "combo-blocks"),
																value: "afterText",
															},
														]}
														onChange={(newVal) => {
															var options = {
																...end.options,
																position: newVal,
															};
															setAttributes({
																end: { ...end, options: options },
															});
														}}
													/>
												</PanelRow>
											</PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={end}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															end,
															"end",
															endSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															end,
															"end",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															end,
															"end",
															endSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															end,
															"end",
															endSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															end,
															"end",
															endSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={end}
													onChange={onPickCssLibraryEnd}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
								</>
							)}

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle>
					</div>
				</InspectorControls>
				<>
					<div {...blockProps}>
						{pagination.options.type == "normal" && (
							<>
								<span className="page-numbers prev">
									{previous.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
									{pagination.options.prevText}
									{previous.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
								</span>
								<span className="page-numbers current">1</span>
								<span className="page-numbers">2</span>
								<span className="page-numbers">3</span>
								<span className="page-numbers next">
									{next.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
									{pagination.options.nextText}
									{next.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
								</span>
							</>
						)}
						{pagination.options.type == "filterable" && (
							<>
								<span className="page-numbers prev">
									{previous.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
									{pagination.options.prevText}
									{previous.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
								</span>
								<span className="page-numbers current">1</span>
								<span className="page-numbers">2</span>
								<span className="page-numbers">3</span>
								<span className="page-numbers next">
									{next.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
									{pagination.options.nextText}
									{next.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
								</span>
							</>
						)}
						{pagination.options.type == "ajax" && (
							<>
								<span className="page-numbers prev">
									{previous.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
									{pagination.options.prevText}
									{previous.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
								</span>
								<span className="page-numbers current">1</span>
								<span className="page-numbers">2</span>
								<span className="page-numbers">3</span>
								<span className="page-numbers next">
									{next.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
									{pagination.options.nextText}
									{next.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
								</span>
							</>
						)}
						{pagination.options.type == "next_previous" && (
							<>
								<span className="page-numbers prev">
									{previous.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
									{pagination.options.prevText}
									{previous.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: previousHtml }}
										/>
									)}
								</span>
								<span className="page-numbers next">
									{next.options.position == "beforeText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
									{pagination.options.nextText}
									{next.options.position == "afterText" && (
										<span
											className=""
											dangerouslySetInnerHTML={{ __html: nextHtml }}
										/>
									)}
								</span>
							</>
						)}
						{pagination.options.type == "loadmore" && (
							<>
								<div className="page-numbers">
									{pagination.options.loadMoreIcon.position ===
										"beforeText" && (
											<span
												className={pagination.options.loadMoreIcon.iconSrc}
												dangerouslySetInnerHTML={{ __html: loadMoreHtml }}
											/>
										)}
									{pagination.options.loadMoreText}
									{pagination.options.loadMoreIcon.position === "afterText" && (
										<span
											className={pagination.options.loadMoreIcon.iconSrc}
											dangerouslySetInnerHTML={{ __html: loadMoreHtml }}
										/>
									)}
								</div>
							</>
						)}
						{pagination.options.type == "infinite" && (
							<div className="page-numbers">
								{pagination.options.loadingPosition == "beforeText" && (
									<span
										className={pagination.options.loadingIcon.class}
										dangerouslySetInnerHTML={{ __html: loadingHtml }}
									/>
								)}
								{pagination.options.loadMoreText}
								{pagination.options.loadingPosition == "afterText" && (
									<span
										className={pagination.options.loadingIcon.class}
										dangerouslySetInnerHTML={{ __html: loadingHtml }}
									/>
								)}
							</div>
						)}
					</div>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		//return <InnerBlocks.Content />;
		return null;
	},
});
