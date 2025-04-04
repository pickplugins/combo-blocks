import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import customTags from "../../custom-tags";
import metadata from "./block.json";

var myStore = wp.data.select("ComboBlocksStore");
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
					d="M157.275 48.4749L82.63 5.675C81.0376 4.775 78.9477 4.775 77.3552 5.675L2.70979 48.4749C0.122083 49.9749 -0.773663 53.175 0.719246 55.775C1.21688 56.675 1.91343 57.375 2.80917 57.875L77.4546 98.075C79.0471 98.875 80.9382 98.875 82.5306 98.075L157.176 57.875C159.764 56.475 160.759 53.275 159.366 50.675C158.868 49.775 158.072 48.9749 157.275 48.4749ZM79.9428 87.275L16.345 53.075L79.9428 16.575L143.541 53.075L79.9428 87.275Z"
					fill="url(#paint0_linear_61_513)"
				/>
				<path
					d="M82.5306 126.175L154.588 86.3748V74.1748L79.9428 115.375L5.29736 74.1748V86.3748L77.3553 126.175C79.0472 127.075 80.9382 127.075 82.5306 126.175Z"
					fill="url(#paint1_linear_61_513)"
				/>
				<path
					d="M5.29736 115.675L77.4546 154.275C79.0471 155.075 80.9381 155.075 82.431 154.275L154.588 115.675V103.575L79.9428 143.575L5.29736 103.575V115.675Z"
					fill="url(#paint2_linear_61_513)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_513"
						x1="-0.00341797"
						y1="51.8375"
						x2="159.997"
						y2="51.8375"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_513"
						x1="5.29736"
						y1="100.512"
						x2="154.588"
						y2="100.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_513"
						x1="5.29736"
						y1="129.225"
						x2="154.588"
						y2="129.225"
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
		var wrapper = attributes.wrapper;
		var tocHeader = attributes.tocHeader;
		var tocHeaderLabel = attributes.tocHeaderLabel;
		var tocHeaderLabelIcon = attributes.tocHeaderLabelIcon;
		var tocHeaderToggleIcon = attributes.tocHeaderToggleIcon;
		var itemToggleIconIdle = attributes.itemToggleIconIdle;
		var itemToggleIconActive = attributes.itemToggleIconActive;
		var tocContent = attributes.tocContent;
		var itemsWrap = attributes.itemsWrap;
		var item = attributes.item;
		var itemCurrent = attributes.itemCurrent;
		var slideToggle = attributes.slideToggle;
		var slideToggleIcon = attributes.slideToggleIcon;

		var visible = attributes.visible;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		const CustomTagWrapper = `${wrapper.options.tag}`;
		var postUrl =
			wrapper.options.customUrl != undefined &&
				wrapper.options.customUrl.length > 0
				? wrapper.options.customUrl
				: currentPostUrl;
		var linkToArgsBasic = {
			postUrl: { label: __("Post URL", "combo-blocks"), value: "postUrl" },
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			authorUrl: { label: __("Author URL", "combo-blocks"), value: "authorUrl" },
			authorLink: {
				label: __("Author Link", "combo-blocks"),
				value: "authorLink",
			},
			authorMail: {
				label: __("Author Mail", "combo-blocks"),
				value: "authorMail",
				isPro: true,
			},
			authorMeta: {
				label: __("Author Meta", "combo-blocks"),
				value: "authorMeta",
				isPro: true,
			},
			customField: {
				label: __("Custom Field", "combo-blocks"),
				value: "customField",
				isPro: true,
			},
			customUrl: {
				label: __("Custom URL", "combo-blocks"),
				value: "customUrl",
				isPro: true,
			},
		};
		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var tocHeaderSelector = blockClass + " .toc-header";
		var tocHeaderLabelSelector = blockClass + " .toc-header-label";
		var tocHeaderLabelIconSelector = blockClass + " .toc-header-label-icon";
		var tocHeaderToggleIconSelector = blockClass + " .toc-header-icon";
		var itemToggleIconIdleSelector = blockClass + " .toc-toggle-icon";
		var itemToggleIconActiveSelector = blockClass + " .toc-toggle-icon-active";
		var tocContentSelector = blockClass + " .toc-content";
		var itemsWrapSelector = blockClass + " .toc-items";
		var itemSelector = blockClass + " .toc-item";
		var itemCurrentSelector = blockClass + " .toc-item-current";
		var slideToggleSelector = blockClass + " .toc-slide-toggle";
		var slideToggleIconSelector = blockClass + " .toc-slide-toggle-icon";

		var [headerLabelIconHtml, setHeaderLabelIconHtml] = useState("");
		var [headerLabelToggleIconHtml, setHeaderLabelToggleIconHtml] =
			useState("");
		var [itemToggleIconIdleHtml, setItemToggleIconIdleHtml] = useState("");
		var [itemToggleIconActiveHtml, setItemToggleIconActiveHtml] = useState("");

		useEffect(() => {
			var iconSrc = itemToggleIconIdle.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setItemToggleIconIdleHtml(iconHtml);
		}, [itemToggleIconIdle]);
		useEffect(() => {
			var iconSrc = itemToggleIconActive.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setItemToggleIconActiveHtml(iconHtml);
		}, [itemToggleIconActive]);

		useEffect(() => {
			var iconSrc = tocHeaderToggleIcon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setHeaderLabelToggleIconHtml(iconHtml);
		}, [tocHeaderToggleIcon]);
		useEffect(() => {
			var iconSrc = tocHeaderLabelIcon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setHeaderLabelIconHtml(iconHtml);
		}, [tocHeaderLabelIcon]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[tocHeaderSelector] = tocHeader;
			blockCssObj[tocHeaderLabelSelector] = tocHeaderLabel;
			blockCssObj[tocHeaderLabelIconSelector] = tocHeaderLabelIcon;
			blockCssObj[tocHeaderToggleIconSelector] = tocHeaderToggleIcon;
			blockCssObj[itemToggleIconIdleSelector] = itemToggleIconIdle;
			blockCssObj[itemToggleIconActiveSelector] = itemToggleIconActive;
			blockCssObj[tocContentSelector] = tocContent;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemSelector] = item;
			blockCssObj[itemCurrentSelector] = itemCurrent;
			blockCssObj[slideToggleSelector] = slideToggle;
			blockCssObj[slideToggleIconSelector] = slideToggleIcon;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
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
				var wrapperX = attributes.wrapper;
				var itemX = attributes.item;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
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
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		function onPickCssLibraryLayers(args) {
			var textX = Object.assign({}, wrapper);
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				textX[sudoScource] = sudoScourceArgs;
			});
			setAttributes({ wrapper: textX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
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
			var blockCssYX = { ...blockCssY };
			var items = { ...blockCssYX.items };
			var cssItems = Object.assign(items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function setFieldLinkTo(option, index) {
			var options = { ...wrapper.options, linkTo: option.value };
			setAttributes({ wrapper: { ...wrapper, options: options } });
		}

		// w
		// o
		// r
		// k
		// i
		// n
		// g

		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});
			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
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

		function onChangeStyleWrapper(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ wrapper: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
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

		function onRemoveStyleWrapper(sudoScource, key) {
			let obj = { ...wrapper };
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
			setAttributes({ wrapper: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}

		function onResetWrapper(sudoSources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ wrapper: obj });
		}

		function onBulkAddWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoScource] = cssObj;
			setAttributes({ wrapper: obj });
			var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
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

		function onPickCssLibrarytocHeader(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tocHeader[sudoScource] = sudoScourceArgs;
			});
			var tocHeaderX = Object.assign({}, tocHeader);
			setAttributes({ tocHeader: tocHeaderX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tocHeaderSelector
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

		function onChangeStyletocHeader(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tocHeader);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tocHeader: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderSelector
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

		function onRemoveStyletocHeader(sudoScource, key) {
			let obj = { ...tocHeader };
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
			setAttributes({ tocHeader: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderSelector
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

		function onAddStyletocHeader(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tocHeader);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tocHeader: object });
		}

		function onResettocHeader(sudoSources) {
			let obj = Object.assign({}, tocHeader);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tocHeaderSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tocHeader: obj });
		}

		function onBulkAddtocHeader(sudoScource, cssObj) {
			let obj = Object.assign({}, tocHeader);
			obj[sudoScource] = cssObj;
			setAttributes({ tocHeader: obj });
			var selector = myStore.getElementSelector(sudoScource, tocHeaderSelector);
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

		function onPickCssLibrarytocHeaderLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tocHeaderLabel[sudoScource] = sudoScourceArgs;
			});
			var tocHeaderLabelX = Object.assign({}, tocHeaderLabel);
			setAttributes({ tocHeaderLabel: tocHeaderLabelX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tocHeaderLabelSelector
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

		function onChangeStyletocHeaderLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tocHeaderLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tocHeaderLabel: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelSelector
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

		function onRemoveStyletocHeaderLabel(sudoScource, key) {
			let obj = { ...tocHeaderLabel };
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
			setAttributes({ tocHeaderLabel: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelSelector
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

		function onAddStyletocHeaderLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tocHeaderLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tocHeaderLabel: object });
		}

		function onResettocHeaderLabel(sudoSources) {
			let obj = Object.assign({}, tocHeaderLabel);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tocHeaderLabelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tocHeaderLabel: obj });
		}

		function onBulkAddtocHeaderLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, tocHeaderLabel);
			obj[sudoScource] = cssObj;
			setAttributes({ tocHeaderLabel: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelSelector
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

		function onPickCssLibrarytocHeaderLabelIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tocHeaderLabelIcon[sudoScource] = sudoScourceArgs;
			});
			var tocHeaderLabelIconX = Object.assign({}, tocHeaderLabelIcon);
			setAttributes({ tocHeaderLabelIcon: tocHeaderLabelIconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tocHeaderLabelIconSelector
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

		function onChangeStyletocHeaderLabelIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tocHeaderLabelIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tocHeaderLabelIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelIconSelector
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

		function onRemoveStyletocHeaderLabelIcon(sudoScource, key) {
			let obj = { ...tocHeaderLabelIcon };
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
			setAttributes({ tocHeaderLabelIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelIconSelector
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

		function onAddStyletocHeaderLabelIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tocHeaderLabelIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tocHeaderLabelIcon: object });
		}

		function onResettocHeaderLabelIcon(sudoSources) {
			let obj = Object.assign({}, tocHeaderLabelIcon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tocHeaderLabelIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tocHeaderLabelIcon: obj });
		}

		function onBulkAddtocHeaderLabelIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, tocHeaderLabelIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ tocHeaderLabelIcon: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				tocHeaderLabelIconSelector
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

		function onPickCssLibrarytocHeaderToggleIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tocHeaderToggleIcon[sudoScource] = sudoScourceArgs;
			});
			var tocHeaderToggleIconX = Object.assign({}, tocHeaderToggleIcon);
			setAttributes({ tocHeaderToggleIcon: tocHeaderToggleIconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tocHeaderToggleIconSelector
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

		function onChangeStyletocHeaderToggleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tocHeaderToggleIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tocHeaderToggleIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderToggleIconSelector
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

		function onRemoveStyletocHeaderToggleIcon(sudoScource, key) {
			let obj = { ...tocHeaderToggleIcon };
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
			setAttributes({ tocHeaderToggleIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocHeaderToggleIconSelector
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

		function onAddStyletocHeaderToggleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tocHeaderToggleIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tocHeaderToggleIcon: object });
		}

		function onResettocHeaderToggleIcon(sudoSources) {
			let obj = Object.assign({}, tocHeaderToggleIcon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tocHeaderToggleIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tocHeaderToggleIcon: obj });
		}

		function onBulkAddtocHeaderToggleIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, tocHeaderToggleIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ tocHeaderToggleIcon: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				tocHeaderToggleIconSelector
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

		function onPickCssLibraryitemToggleIconIdle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemToggleIconIdle[sudoScource] = sudoScourceArgs;
			});
			var itemToggleIconIdleX = Object.assign({}, itemToggleIconIdle);
			setAttributes({ itemToggleIconIdle: itemToggleIconIdleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemToggleIconIdleSelector
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

		function onChangeStyleitemToggleIconIdle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemToggleIconIdle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemToggleIconIdle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconIdleSelector
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

		function onRemoveStyleitemToggleIconIdle(sudoScource, key) {
			let obj = { ...itemToggleIconIdle };
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
			setAttributes({ itemToggleIconIdle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconIdleSelector
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

		function onAddStyleitemToggleIconIdle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemToggleIconIdle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemToggleIconIdle: object });
		}

		function onResetitemToggleIconIdle(sudoSources) {
			let obj = Object.assign({}, itemToggleIconIdle);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemToggleIconIdleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemToggleIconIdle: obj });
		}

		function onBulkAdditemToggleIconIdle(sudoScource, cssObj) {
			let obj = Object.assign({}, itemToggleIconIdle);
			obj[sudoScource] = cssObj;
			setAttributes({ itemToggleIconIdle: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconIdleSelector
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

		function onPickCssLibraryitemToggleIconActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemToggleIconActive[sudoScource] = sudoScourceArgs;
			});
			var itemToggleIconActiveX = Object.assign({}, itemToggleIconActive);
			setAttributes({ itemToggleIconActive: itemToggleIconActiveX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemToggleIconActiveSelector
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

		function onChangeStyleitemToggleIconActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemToggleIconActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemToggleIconActive: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconActiveSelector
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

		function onRemoveStyleitemToggleIconActive(sudoScource, key) {
			let obj = { ...itemToggleIconActive };
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
			setAttributes({ itemToggleIconActive: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconActiveSelector
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

		function onAddStyleitemToggleIconActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemToggleIconActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemToggleIconActive: object });
		}

		function onResetitemToggleIconActive(sudoSources) {
			let obj = Object.assign({}, itemToggleIconActive);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemToggleIconActiveSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemToggleIconActive: obj });
		}

		function onBulkAdditemToggleIconActive(sudoScource, cssObj) {
			let obj = Object.assign({}, itemToggleIconActive);
			obj[sudoScource] = cssObj;
			setAttributes({ itemToggleIconActive: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				itemToggleIconActiveSelector
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

		function onPickCssLibrarytocContent(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tocContent[sudoScource] = sudoScourceArgs;
			});
			var tocContentX = Object.assign({}, tocContent);
			setAttributes({ tocContent: tocContentX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tocContentSelector
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

		function onChangeStyletocContent(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tocContent);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tocContent: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocContentSelector
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

		function onRemoveStyletocContent(sudoScource, key) {
			let obj = { ...tocContent };
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
			setAttributes({ tocContent: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tocContentSelector
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

		function onAddStyletocContent(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tocContent);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tocContent: object });
		}

		function onResettocContent(sudoSources) {
			let obj = Object.assign({}, tocContent);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tocContentSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tocContent: obj });
		}

		function onBulkAddtocContent(sudoScource, cssObj) {
			let obj = Object.assign({}, tocContent);
			obj[sudoScource] = cssObj;
			setAttributes({ tocContent: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				tocContentSelector
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

		function onPickCssLibraryitemsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemsWrap[sudoScource] = sudoScourceArgs;
			});
			var itemsWrapX = Object.assign({}, itemsWrap);
			setAttributes({ itemsWrap: itemsWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector
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

		function onChangeStyleitemsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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

		function onRemoveStyleitemsWrap(sudoScource, key) {
			let obj = { ...itemsWrap };
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
			setAttributes({ itemsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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

		function onAddStyleitemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
		}

		function onResetitemsWrap(sudoSources) {
			let obj = Object.assign({}, itemsWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemsWrap: obj });
		}

		function onBulkAdditemsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, itemsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ itemsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, itemsWrapSelector);
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

		function onPickCssLibraryitem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				item[sudoScource] = sudoScourceArgs;
			});
			var itemX = Object.assign({}, item);
			setAttributes({ item: itemX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemSelector
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

		function onChangeStyleitem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ item: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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

		function onRemoveStyleitem(sudoScource, key) {
			let obj = { ...item };
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
			setAttributes({ item: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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

		function onAddStyleitem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}

		function onResetitem(sudoSources) {
			let obj = Object.assign({}, item);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ item: obj });
		}

		function onBulkAdditem(sudoScource, cssObj) {
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;
			setAttributes({ item: obj });
			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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

		function onPickCssLibraryitemCurrent(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemCurrent[sudoScource] = sudoScourceArgs;
			});
			var itemCurrentX = Object.assign({}, itemCurrent);
			setAttributes({ itemCurrent: itemCurrentX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemCurrentSelector
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

		function onChangeStyleitemCurrent(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemCurrent);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemCurrent: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemCurrentSelector
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

		function onRemoveStyleitemCurrent(sudoScource, key) {
			let obj = { ...itemCurrent };
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
			setAttributes({ itemCurrent: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemCurrentSelector
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

		function onAddStyleitemCurrent(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemCurrent);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemCurrent: object });
		}

		function onResetitemCurrent(sudoSources) {
			let obj = Object.assign({}, itemCurrent);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemCurrentSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemCurrent: obj });
		}

		function onBulkAdditemCurrent(sudoScource, cssObj) {
			let obj = Object.assign({}, itemCurrent);
			obj[sudoScource] = cssObj;
			setAttributes({ itemCurrent: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				itemCurrentSelector
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

		function onPickCssLibraryslideToggle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				slideToggle[sudoScource] = sudoScourceArgs;
			});
			var slideToggleX = Object.assign({}, slideToggle);
			setAttributes({ slideToggle: slideToggleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					slideToggleSelector
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

		function onChangeStyleslideToggle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, slideToggle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ slideToggle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				slideToggleSelector
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

		function onRemoveStyleslideToggle(sudoScource, key) {
			let obj = { ...slideToggle };
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
			setAttributes({ slideToggle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				slideToggleSelector
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

		function onAddStyleslideToggle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, slideToggle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ slideToggle: object });
		}

		function onResetslideToggle(sudoSources) {
			let obj = Object.assign({}, slideToggle);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						slideToggleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ slideToggle: obj });
		}

		function onBulkAddslideToggle(sudoScource, cssObj) {
			let obj = Object.assign({}, slideToggle);
			obj[sudoScource] = cssObj;
			setAttributes({ slideToggle: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				slideToggleSelector
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

		function onPickCssLibraryslideToggleIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				slideToggleIcon[sudoScource] = sudoScourceArgs;
			});
			var slideToggleIconX = Object.assign({}, slideToggleIcon);
			setAttributes({ slideToggleIcon: slideToggleIconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					slideToggleIconSelector
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

		function onChangeStyleslideToggleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, slideToggleIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ slideToggleIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				slideToggleIconSelector
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

		function onRemoveStyleslideToggleIcon(sudoScource, key) {
			let obj = { ...slideToggleIcon };
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
			setAttributes({ slideToggleIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				slideToggleIconSelector
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

		function onAddStyleslideToggleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, slideToggleIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ slideToggleIcon: object });
		}

		function onResetslideToggleIcon(sudoSources) {
			let obj = Object.assign({}, slideToggleIcon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						slideToggleIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ slideToggleIcon: obj });
		}

		function onBulkAddslideToggleIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, slideToggleIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ slideToggleIcon: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				slideToggleIconSelector
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

		// w
		// o
		// r
		// k
		// i
		// n
		// g

		function onChangeStyleItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ item: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
		function onAddStyleItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}
		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;
			setAttributes({ item: obj });
			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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
		function onResetItem(sudoSources) {
			let obj = Object.assign({}, item);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ item: obj });
		}
		function onRemoveStyleItem(sudoScource, key) {
			let obj = { ...item };
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
			setAttributes({ item: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		function onChangeHeaderLabelIcon(arg) {
			var options = {
				...tocHeaderLabelIcon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				tocHeaderLabelIcon: { ...tocHeaderLabelIcon, options: options },
			});
		}
		function onChangeHeaderLabelToggleIcon(arg) {
			var options = {
				...tocHeaderToggleIcon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				tocHeaderToggleIcon: { ...tocHeaderToggleIcon, options: options },
			});
		}
		function onChangeSlideToggleIcon(arg) {
			var options = {
				...slideToggle.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				slideToggle: { ...slideToggle, options: options },
			});
		}
		function onChangeSlideToggleToggleIcon(arg) {
			var options = {
				...slideToggleIcon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				slideToggleIcon: { ...slideToggleIcon, options: options },
			});
		}
		function onChangeItemToggleIdleIcon(arg) {
			var options = {
				...itemToggleIconIdle.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				itemToggleIconIdle: { ...itemToggleIconIdle, options: options },
			});
		}
		function onChangeItemToggleIdleIcon(arg) {
			var options = {
				...itemToggleIconIdle.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				itemToggleIconIdle: { ...itemToggleIconIdle, options: options },
			});
		}
		function onChangeItemToggleActiveIcon(arg) {
			var options = {
				...itemToggleIconActive.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({
				itemToggleIconActive: { ...itemToggleIconActive, options: options },
			});
		}
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Wrapper", "combo-blocks")}
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
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Block ID", "combo-blocks")}
										</label>
										<InputControl
											value={blockId}
											disabled={true}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("ID", "combo-blocks")}
										</label>
										<InputControl
											value={wrapper.options.id}
											onChange={(newVal) => {
												var options = { ...wrapper.options, id: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={wrapper}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												wrapper,
												"wrapper",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												wrapper,
												"wrapper",
												wrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Header", "combo-blocks")}
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
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Label", "combo-blocks")}
										</label>
										<InputControl
											value={tocHeaderLabel.options.text}
											onChange={(newVal) => {
												var options = {
													...tocHeaderLabel.options,
													text: newVal,
												};
												setAttributes({
													tocHeaderLabel: {
														...tocHeaderLabel,
														options: options,
													},
												});
											}}
										/>
									</PanelRow>

									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={tocHeaderLabelIcon.options.library}
											srcType={tocHeaderLabelIcon.options.srcType}
											iconSrc={tocHeaderLabelIcon.options.iconSrc}
											// isPro={isProFeature}
											onChange={onChangeHeaderLabelIcon}
										/>
									</PanelRow>
									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Toggle Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={tocHeaderToggleIcon.options.library}
											srcType={tocHeaderToggleIcon.options.srcType}
											iconSrc={tocHeaderToggleIcon.options.iconSrc}
											// isPro={isProFeature}
											onChange={onChangeHeaderLabelToggleIcon}
										/>
									</PanelRow>
									<ToggleControl
										label={__("Hide Content", "combo-blocks")}
										help={
											tocHeader.options.hideContent
												? __("On Click Content will hide.", "combo-blocks")
												: __("On Click Content will not hide.", "combo-blocks")
										}
										checked={tocHeader.options.hideContent ? true : false}
										onChange={(e) => {
											var options = {
												...tocHeader.options,
												hideContent: tocHeader.options.hideContent
													? false
													: true,
											};
											setAttributes({
												tocHeader: { ...tocHeader, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={tocHeader}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												tocHeader,
												"tocHeader",
												tocHeaderSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												tocHeader,
												"tocHeader",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												tocHeader,
												"tocHeader",
												tocHeaderSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												tocHeader,
												"tocHeader",
												tocHeaderSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												tocHeader,
												"tocHeader",
												tocHeaderSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={tocHeader}
										onChange={onPickCssLibrarytocHeader}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Content", "combo-blocks")}
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
									<PanelRow className="mb-4">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("targetTags", "combo-blocks")}
										</label>
										<InputControl
											value={tocContent.options.targetTags}
											onChange={(newVal) => {
												var options = {
													...tocContent.options,
													targetTags: newVal,
												};
												setAttributes({
													tocContent: {
														...tocContent,
														options: options,
													},
												});
											}}
										/>
									</PanelRow>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Items Wrap", "combo-blocks")}
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
											<PGtab name="options"></PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={itemsWrap}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															itemsWrap,
															"itemsWrap",
															itemsWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															itemsWrap,
															"itemsWrap",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															itemsWrap,
															"itemsWrap",
															itemsWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															itemsWrap,
															"itemsWrap",
															itemsWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															itemsWrap,
															"itemsWrap",
															itemsWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={itemsWrap}
													onChange={onPickCssLibraryitemsWrap}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Item", "combo-blocks")}
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
											<PGtab name="options"></PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={item}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															item,
															"item",
															itemSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															item,
															"item",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															item,
															"item",
															itemSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															item,
															"item",
															itemSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															item,
															"item",
															itemSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={item}
													onChange={onPickCssLibraryitem}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Item Toggle Icon", "combo-blocks")}
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
												<PanelRow className="pb-2">
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose Idle Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={itemToggleIconIdle.options.library}
														srcType={itemToggleIconIdle.options.srcType}
														iconSrc={itemToggleIconIdle.options.iconSrc}
														// isPro={isProFeature}
														onChange={onChangeItemToggleIdleIcon}
													/>
												</PanelRow>
												<PanelRow className="pb-2">
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Choose Active Icon", "combo-blocks")}
													</label>
													<PGIconPicker
														library={itemToggleIconActive.options.library}
														srcType={itemToggleIconActive.options.srcType}
														iconSrc={itemToggleIconActive.options.iconSrc}
														// isPro={isProFeature}
														onChange={onChangeItemToggleActiveIcon}
													/>
												</PanelRow>
											</PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={itemToggleIconIdle}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															itemToggleIconIdle,
															"itemToggleIconIdle",
															itemToggleIconIdleSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															itemToggleIconIdle,
															"itemToggleIconIdle",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															itemToggleIconIdle,
															"itemToggleIconIdle",
															itemToggleIconIdleSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															itemToggleIconIdle,
															"itemToggleIconIdle",
															itemToggleIconIdleSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															itemToggleIconIdle,
															"itemToggleIconIdle",
															itemToggleIconIdleSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={itemToggleIconIdle}
													onChange={onPickCssLibraryitemToggleIconIdle}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Current Item", "combo-blocks")}
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
											<PGtab name="options"></PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={itemCurrent}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															itemCurrent,
															"itemCurrent",
															itemCurrentSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															itemCurrent,
															"itemCurrent",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															itemCurrent,
															"itemCurrent",
															itemCurrentSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															itemCurrent,
															"itemCurrent",
															itemCurrentSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															itemCurrent,
															"itemCurrent",
															itemCurrentSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={itemCurrent}
													onChange={onPickCssLibraryitemCurrent}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={tocContent}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												tocContent,
												"tocContent",
												tocContentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												tocContent,
												"tocContent",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												tocContent,
												"tocContent",
												tocContentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												tocContent,
												"tocContent",
												tocContentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												tocContent,
												"tocContent",
												tocContentSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={tocContent}
										onChange={onPickCssLibrarytocContent}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Slide", "combo-blocks")}
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
								]}>
								<PGtab name="options">
									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Slide Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={slideToggle.options.library}
											srcType={slideToggle.options.srcType}
											iconSrc={slideToggle.options.iconSrc}
											// isPro={isProFeature}
											onChange={onChangeSlideToggleIcon}
										/>
									</PanelRow>
									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Slide Toggle Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={slideToggleIcon.options.library}
											srcType={slideToggleIcon.options.srcType}
											iconSrc={slideToggleIcon.options.iconSrc}
											// isPro={isProFeature}
											onChange={onChangeSlideToggleToggleIcon}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={slideToggle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												slideToggle,
												"slideToggle",
												slideToggleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												slideToggle,
												"slideToggle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												slideToggle,
												"slideToggle",
												slideToggleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												slideToggle,
												"slideToggle",
												slideToggleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												slideToggle,
												"slideToggle",
												slideToggleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
					</div>
				</InspectorControls>
				<>
					<div {...blockProps}>
						<div className="toc-header">
							{tocHeaderLabelIcon.position == "left" && (
								<>
									<span
										className={tocHeaderLabelIcon.options.class}
										dangerouslySetInnerHTML={{ __html: headerLabelIconHtml }}
									/>
									<span
										className={tocHeaderToggleIcon.options.class}
										dangerouslySetInnerHTML={{
											__html: headerLabelToggleIconHtml,
										}}
									/>
								</>
							)}
							<span className="toc-header-label">
								{tocHeaderLabel.options.text}
							</span>
							{tocHeaderLabelIcon.position == "right" && (
								<>
									<span
										className={tocHeaderLabelIcon.options.class}
										dangerouslySetInnerHTML={{ __html: headerLabelIconHtml }}
									/>
									<span
										className={tocHeaderToggleIcon.options.class}
										dangerouslySetInnerHTML={{
											__html: headerLabelToggleIconHtml,
										}}
									/>
								</>
							)}
						</div>
						<div className="toc-content">
							<ul className="toc-items">
								<li className="toc-item">
									<a href="#" className="toc-item-current flex justify-between">
										Enhancing Reader Navigation In WordPress
										<span
											className={itemToggleIconIdle.options.class}
											dangerouslySetInnerHTML={{
												__html: itemToggleIconActiveHtml,
											}}
										/>
									</a>
									<ul>
										<li>Offering a Clear Overview of Content</li>
										<li>Improving Content Accessibility</li>
									</ul>
								</li>
								<li className="toc-item flex justify-between">
									<a href="#">
										Supporting Effective SEO for WordPress
										<span
											className={itemToggleIconIdle.options.class}
											dangerouslySetInnerHTML={{
												__html: itemToggleIconIdleHtml,
											}}
										/>
									</a>
									<ul>
										<li>Facilitating Document Organization</li>
										<li>Improving Content Accessibility</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		return <InnerBlocks.Content />;
		//return null;
	},
});
