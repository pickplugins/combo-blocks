import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
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
					fillRule="evenodd"
					clipRule="evenodd"
					d="M9 9V52H48V9H9ZM9 61H48V104H9V61ZM57 61V104H100V61H57ZM109 61V104H151V61H109ZM100 113H57V151H100V113ZM109 151V113H151V151H109ZM109 160H100H57H48H2C0.895508 160 0 159.104 0 158V113V104V61V52V2C0 0.895508 0.895508 0 2 0H48H57H100H109H158C159.104 0 160 0.895508 160 2V52V61V104V113V158C160 159.104 159.104 160 158 160H109ZM109 9H151V52H109V9ZM100 9V52H57V9H100ZM9 113H48V151H9V113Z"
					fill="url(#paint0_linear_162_84)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_162_84"
						x1="104.5"
						y1="-1.96701e-07"
						x2="104.5"
						y2="160"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/quote"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/table",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlocks
					);
				},
			},
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (attributes, innerBlocks) => {
					var innerBlockX = innerBlocks.map((item, index) => {
						return {
							clientId: item.clientId,
							name: "combo-blocks/icon",
							innerBlocks: [],
							attributes: {
								wrapper: {
									options: {
										tag: "div",
										class: "pg-icon",
										attr: [],
									},
								},
								text: {
									options: {
										enable: true,
										text: "Custom Text",
										src: "",
										linkTo: "",
										linkToAuthorMeta: "",
										linkToCustomMeta: "",
										linkTarget: "_blank",
										customUrl: "",
										linkAttr: [],
										class: "",
									},
								},
								icon: {
									options: {
										enable: true,
										library: "fontAwesome",
										srcType: "class",
										iconSrc: "fas fa-check-circle",
										position: "beforeText",
										class: "text-icon",
									},
								},
								prefix: {
									options: {
										text: "",
										class: "prefix",
									},
								},
								postfix: {
									options: {
										text: "",
										class: "postfix",
									},
								},
								utmTracking: {
									enable: false,
									id: "",
									source: "",
									medium: "",
									campaign: "",
									term: "",
									content: "",
								},
								blockId: "",
								linkAttr: [],
								blockCssY: {
									items: {},
								},
							},
						};
					});
					return createBlock(
						"combo-blocks/table",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlockX
					);
				},
			},
			{
				type: "block",
				blocks: ["combo-blocks/layer"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/table",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlocks
					);
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["combo-blocks/grid-wrap"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/grid-wrap",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-grid-wrap",
								},
							},
						},
						innerBlocks
					);
				},
			},
		],
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
		var visible = attributes.visible;
		var trStyle = attributes.trStyle;
		var tdStyle = attributes.tdStyle;
		var thStyle = attributes.thStyle;
		var table = attributes.table;
		var caption = attributes.caption;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
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
		var tableSelector = blockClass + " table";
		var tdStyleSelector = blockClass + " td";
		var thStyleSelector = blockClass + " th";
		var trStyleSelector = blockClass + " tr";
		var captionSelector = blockClass + " caption";
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[tableSelector] = table;
			blockCssObj[tdStyleSelector] = tdStyle;
			blockCssObj[thStyleSelector] = thStyle;
			blockCssObj[trStyleSelector] = trStyle;
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
				var tdStyleX = attributes.tdStyle;
				var thStyleX = attributes.thStyle;
				var trStyleX = attributes.trStyle;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (trStyleX != undefined) {
					var trStyleY = { ...trStyleX, options: trStyle.options };
					setAttributes({ trStyle: trStyleY });
					blockCssObj[trStyleSelector] = trStyleY;
				}
				if (tdStyleX != undefined) {
					var tdStyleY = { ...tdStyleX, options: tdStyle.options };
					setAttributes({ tdStyle: tdStyleY });
					blockCssObj[tdStyleSelector] = tdStyleY;
				}
				if (thStyleX != undefined) {
					var thStyleY = { ...thStyleX, options: thStyle.options };
					setAttributes({ thStyle: thStyleY });
					blockCssObj[thStyleSelector] = thStyleY;
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
		function setFieldLinkTo(option, index) {
			var options = { ...wrapper.options, linkTo: option.value };
			setAttributes({ wrapper: { ...wrapper, options: options } });
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
		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
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
		function onBulkAddtdStyle(sudoScource, cssObj) {
			let obj = Object.assign({}, tdStyle);
			obj[sudoScource] = cssObj;
			setAttributes({ tdStyle: obj });
			var selector = myStore.getElementSelector(sudoScource, tdStyleSelector);
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
		function onPickCssLibrarytdStyle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				tdStyle[sudoScource] = sudoScourceArgs;
			});
			var tdStyleX = Object.assign({}, tdStyle);
			setAttributes({ tdStyle: tdStyleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tdStyleSelector
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
		function onChangeStyletdStyle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, tdStyle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ tdStyle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tdStyleSelector
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
		function onRemoveStyletdStyle(sudoScource, key) {
			let obj = { ...tdStyle };
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
			setAttributes({ tdStyle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tdStyleSelector
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
		function onAddStyletdStyle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, tdStyle);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ tdStyle: object });
		}
		function onResettdStyle(sudoScources) {
			let obj = Object.assign({}, tdStyle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tdStyleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ tdStyle: obj });
		}
		function onBulkAddthStyle(sudoScource, cssObj) {
			let obj = Object.assign({}, thStyle);
			obj[sudoScource] = cssObj;
			setAttributes({ thStyle: obj });
			var selector = myStore.getElementSelector(sudoScource, thStyleSelector);
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
		function onPickCssLibrarythStyle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				thStyle[sudoScource] = sudoScourceArgs;
			});
			var thStyleX = Object.assign({}, thStyle);
			setAttributes({ thStyle: thStyleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					thStyleSelector
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
		function onChangeStylethStyle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, thStyle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ thStyle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thStyleSelector
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
		function onRemoveStylethStyle(sudoScource, key) {
			let obj = { ...thStyle };
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
			setAttributes({ thStyle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thStyleSelector
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
		function onAddStylethStyle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, thStyle);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ thStyle: object });
		}
		function onResetthStyle(sudoScources) {
			let obj = Object.assign({}, thStyle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						thStyleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ thStyle: obj });
		}
		function onBulkAddtrStyle(sudoScource, cssObj) {
			let obj = Object.assign({}, trStyle);
			obj[sudoScource] = cssObj;
			setAttributes({ trStyle: obj });
			var selector = myStore.getElementSelector(sudoScource, trStyleSelector);
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
		function onPickCssLibrarytrStyle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				trStyle[sudoScource] = sudoScourceArgs;
			});
			var trStyleX = Object.assign({}, trStyle);
			setAttributes({ trStyle: trStyleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					trStyleSelector
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
		function onChangeStyletrStyle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, trStyle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ trStyle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				trStyleSelector
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
		function onRemoveStyletrStyle(sudoScource, key) {
			let obj = { ...trStyle };
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
			setAttributes({ trStyle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				trStyleSelector
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
		function onAddStyletrStyle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, trStyle);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ trStyle: object });
		}
		function onResettrStyle(sudoScources) {
			let obj = Object.assign({}, trStyle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						trStyleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ trStyle: obj });
		}
		function onBulkAddcaption(sudoScource, cssObj) {
			let obj = Object.assign({}, caption);
			obj[sudoScource] = cssObj;
			setAttributes({ caption: obj });
			var selector = myStore.getElementSelector(sudoScource, captionSelector);
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
		function onPickCssLibrarycaption(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				caption[sudoScource] = sudoScourceArgs;
			});
			var captionX = Object.assign({}, caption);
			setAttributes({ caption: captionX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					captionSelector
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
		function onChangeStylecaption(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, caption);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ caption: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				captionSelector
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
		function onRemoveStylecaption(sudoScource, key) {
			let obj = { ...caption };
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
			setAttributes({ caption: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				captionSelector
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
		function onAddStylecaption(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, caption);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ caption: object });
		}
		function onResetcaption(sudoScources) {
			let obj = Object.assign({}, caption);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						captionSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ caption: obj });
		}
		function onPickCssLibraryTable(args) {
			var textX = Object.assign({}, table);
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				textX[sudoScource] = sudoScourceArgs;
			});
			setAttributes({ table: textX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					tableSelector
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
		function onChangeStyleTable(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, table);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ table: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tableSelector
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
		function onRemoveStyleTable(sudoScource, key) {
			let obj = { ...table };
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
			setAttributes({ table: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				tableSelector
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
		function onResetTable(sudoSources) {
			let obj = Object.assign({}, table);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						tableSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ table: obj });
		}
		function onAddStyleTable(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, table);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ table: object });
		}
		function onBulkAddTable(sudoScource, cssObj) {
			let obj = Object.assign({}, table);
			obj[sudoScource] = cssObj;
			setAttributes({ table: obj });
			var selector = myStore.getElementSelector(sudoScource, tableSelector);
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
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		const ALLOWED_BLOCKS = ["combo-blocks/table-tr"];
		//const MY_TEMPLATE = generateTable();
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		const addRow = () => {
			var rowCountX = parseInt(table.options.rowCount) + 1;
			var columnCountX = parseInt(table.options.columnCount);
			var options = { ...table.options, rowCount: rowCountX };
			setAttributes({ table: { ...table, options: options } });
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
			const position = childBlocks.length;
			var trData = [];
			var tdData = [];
			for (let j = 0; j < columnCountX; j++) {
				tdData.push(["combo-blocks/table-td", {}]);
			}
			trData.push(["combo-blocks/table-tr", {}, tdData]);
			var trBlock = createBlocksFromInnerBlocksTemplate(trData);
			dispatch("core/block-editor").insertBlock(trBlock[0], position, clientId);
			//wp.data.dispatch("core/block-editor").selectBlock(clientId);
		};
		const addColumn = () => {
			var columnCountX = parseInt(table.options.columnCount) + 1;
			var options = { ...table.options, columnCount: columnCountX };
			setAttributes({ table: { ...table, options: options } });
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
			childBlocks.map((item) => {
				var trclientId = item.clientId;
				const position = item.innerBlocks.length;
				const slide = createBlock("combo-blocks/table-td");
				dispatch("core/block-editor").insertBlock(slide, position, trclientId);
			});
			//wp.data.dispatch("core/block-editor").selectBlock(clientId);
		};
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div>
							<div className=" p-5 ">
								<div className="flex  gap-3 items-center">
									<label
										for=""
										className="font-medium text-slate-900 my-4 block">
										{__("Rows", "combo-blocks")}
									</label>
									<InputControl
										placeholder=""
										value={table.options.rowCount}
										onChange={(newVal) => {
											var options = { ...table.options, rowCount: newVal };
											setAttributes({ table: { ...table, options: options } });
											var columnCountX = parseInt(table.options.columnCount);
											var tableData = [];
											for (let i = 0; i < newVal; i++) {
												var tableColumn = [];
												var rowsdata = childBlocks[i];
												for (let j = 0; j < columnCountX; j++) {
													var columnsData = rowsdata?.innerBlocks[j];
													if (columnsData == undefined) {
														tableColumn.push(["combo-blocks/table-td", {}]);
													} else {
														tableColumn.push([
															columnsData.name,
															columnsData.attributes,
															columnsData.innerBlocks,
														]);
													}
												}
												tableData.push(["combo-blocks/table-tr", {}, tableColumn]);
											}
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate(tableData),
												true
											);
										}}
									/>
								</div>
								<div className="flex  gap-3 items-center">
									<label
										for=""
										className="font-medium text-slate-900 my-4 block">
										{__("Columns", "combo-blocks")}
									</label>
									<InputControl
										placeholder=""
										value={table.options.columnCount}
										onChange={(newVal) => {
											var options = { ...table.options, columnCount: newVal };
											setAttributes({ table: { ...table, options: options } });
											var rowCountX = parseInt(table.options.rowCount);
											var tableData = [];
											for (let i = 0; i < rowCountX; i++) {
												var tableColumn = [];
												var rowsdata = childBlocks[i];
												for (let j = 0; j < newVal; j++) {
													var columnsData = rowsdata?.innerBlocks[j];
													if (columnsData == undefined) {
														tableColumn.push(["combo-blocks/table-td", {}]);
													} else {
														tableColumn.push([
															columnsData.name,
															columnsData.attributes,
															columnsData.innerBlocks,
														]);
													}
												}
												tableData.push(["combo-blocks/table-tr", {}, tableColumn]);
											}
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate(tableData),
												true
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div className="flex gap-3 items-center">
							<div
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
								onClick={(ev) => {
									addRow();
								}}>
								{__("Add Row", "combo-blocks")}
							</div>
							<div
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
								onClick={(ev) => {
									addColumn();
								}}>
								{__("Add Column", "combo-blocks")}
							</div>
						</div>
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
										onChange={onPickCssLibraryLayers}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Table", "combo-blocks")}
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
										value={table.options.class}
										onChange={(newVal) => {
											var options = { ...table.options, class: newVal };
											setAttributes({
												table: { styles: table.styles, options: options },
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("ID", "combo-blocks")}
										</label>
										<InputControl
											value={table.options.id}
											onChange={(newVal) => {
												var options = { ...table.options, id: newVal };
												setAttributes({
													table: { ...table, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={table}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												table,
												"table",
												tableSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												table,
												"table",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												table,
												"table",
												tableSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												table,
												"table",
												tableSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												table,
												"table",
												tableSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={table}
										onChange={onPickCssLibraryTable}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Prefix"
							title={__("Row Style", "combo-blocks")}
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
								<PGtab name="styles">
									<PGStyles
										obj={trStyle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												trStyle,
												"trStyle",
												trStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												trStyle,
												"trStyle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												trStyle,
												"trStyle",
												trStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												trStyle,
												"trStyle",
												trStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												trStyle,
												"trStyle",
												trStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={trStyle}
										onChange={onPickCssLibrarytrStyle}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Prefix"
							title={__("Cell Style", "combo-blocks")}
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
								<PGtab name="styles">
									<PGStyles
										obj={tdStyle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												tdStyle,
												"tdStyle",
												tdStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												tdStyle,
												"tdStyle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												tdStyle,
												"tdStyle",
												tdStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												tdStyle,
												"tdStyle",
												tdStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												tdStyle,
												"tdStyle",
												tdStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={tdStyle}
										onChange={onPickCssLibrarytdStyle}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Heading Style", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									// {
									// 	name: "options",
									// 	title: "Options",
									// 	icon: settings,
									// 	className: "tab-settings",
									// },
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
								<PGtab name="styles">
									<PGStyles
										obj={thStyle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												thStyle,
												"thStyle",
												thStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												thStyle,
												"thStyle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												thStyle,
												"thStyle",
												thStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												thStyle,
												"thStyle",
												thStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												thStyle,
												"thStyle",
												thStyleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={thStyle}
										onChange={onPickCssLibrarythStyle}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Prefix"
							title={__("Caption", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
									<PanelRow className="mb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Caption Content", "combo-blocks")}
										</label>
									</PanelRow>
									<RichText
										{...blockProps}
										className="pg-text px-3 py-2 border border-solid min-h-[80px] resize-y "
										value={caption.options.content}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(newVal) => {
											var options = { ...caption.options, content: newVal };
											setAttributes({
												caption: { ...caption, options: options },
											});
										}}
										placeholder={__("Start Writing...")}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={caption}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												caption,
												"caption",
												captionSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												caption,
												"caption",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												caption,
												"caption",
												captionSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												caption,
												"caption",
												captionSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												caption,
												"caption",
												captionSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={caption}
										onChange={onPickCssLibrarycaption}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>

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

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Visibility", "combo-blocks")}
							initialOpen={false}>
							<PGVisible
								visible={visible}
								onChange={(prams) => {
									setAttributes({ visible: prams });
								}}
							/>
						</PGtoggle>
					</div>
				</InspectorControls>
				<>
					{table.options.columnCount == 0 && !hasInnerBlocks && (
						<div {...blockProps}>
							{/* <div className="bg-slate-300 p-5 ">
								<div className="flex  gap-3 items-center">
									<label
										for=""
										className="font-medium text-slate-900 my-4 block">
										{__("Rows", "combo-blocks")}
									</label>
									<InputControl
										placeholder=""
										value={table.options.rowCount}
										onChange={(newVal) => {
											var options = { ...table.options, rowCount: newVal };
											setAttributes({ table: { ...table, options: options } });
										}}
									/>
								</div>
								<div className="flex  gap-3 items-center">
									<label
										for=""
										className="font-medium text-slate-900 my-4 block">
										{__("Columns", "combo-blocks")}
									</label>
									<InputControl
										placeholder=""
										value={table.options.columnCount}
										onChange={(newVal) => {
											var options = { ...table.options, columnCount: newVal };
											setAttributes({ table: { ...table, options: options } });
											var rowCountX = table.options.rowCount;
											var tableData = [];
											for (let i = 0; i < rowCountX; i++) {
												var tableColumn = [];
												var rowsdata = childBlocks[i];
												for (let j = 0; j < newVal; j++) {
													var columnsData = rowsdata?.innerBlocks[j];
													if (columnsData == undefined) {
														tableColumn.push(["combo-blocks/table-td", {}]);
													} else {
														tableColumn.push([
															columnsData.name,
															columnsData.attributes,
															columnsData.innerBlocks,
														]);
													}
												}
												tableData.push(["combo-blocks/table-tr", {}, tableColumn]);
											}
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate(tableData),
												true
											);
										}}
									/>
								</div>
							</div> */}
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										{__("Click to pick a variation", "combo-blocks")}
									</div>
									<div
										className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													[
														"combo-blocks/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {},
															},
														},
													],
													[
														"combo-blocks/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {},
															},
														},
													],
												]),
												true
											);
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...innerBlocksProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"table"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<table>
								<caption>{caption.options.content}</caption>
								<tbody>{innerBlocksProps.children}</tbody>
							</table>
						</div>
					)}
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
