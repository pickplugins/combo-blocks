import {
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	RadioControl,
	SelectControl,
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import { BACKSPACE, DELETE, ENTER } from "@wordpress/keycodes";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGcssOpenaiPrompts from "../../components/openai-prompts";
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
		background: "#fff0",
		foreground: "#fff",
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M160 11.9551H57.1855V22.4158H160V11.9551Z"
					fill="url(#paint0_linear_61_754)"
				/>
				<path
					d="M37.3599 0L15.5418 21.8182L6.27675 12.553L0 18.7298L15.5418 34.3711L43.6366 6.27651L37.3599 0Z"
					fill="url(#paint1_linear_61_754)"
				/>
				<path
					d="M160 61.0708H57.1855V71.5316H160V61.0708Z"
					fill="url(#paint2_linear_61_754)"
				/>
				<path
					d="M160 110.187H57.1855V120.647H160V110.187Z"
					fill="url(#paint3_linear_61_754)"
				/>
				<path
					d="M0 48.5181V84.0847H35.5668V48.5181H0ZM8.36852 75.8157V56.787H27.3972V75.8157H8.36852Z"
					fill="url(#paint4_linear_61_754)"
				/>
				<path
					d="M0 133.2H35.6665V97.5342H0V133.2ZM27.3972 105.903V124.931H8.36852V105.903H27.3972Z"
					fill="url(#paint5_linear_61_754)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_754"
						x1="57.1855"
						y1="17.1855"
						x2="160"
						y2="17.1855"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_754"
						x1="0"
						y1="17.1855"
						x2="43.6366"
						y2="17.1855"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_754"
						x1="57.1855"
						y1="66.3012"
						x2="160"
						y2="66.3012"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_754"
						x1="57.1855"
						y1="115.417"
						x2="160"
						y2="115.417"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_754"
						x1="0"
						y1="66.3014"
						x2="35.5668"
						y2="66.3014"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_754"
						x1="0"
						y1="115.367"
						x2="35.6665"
						y2="115.367"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	deprecated: [
		{
			attributes: {
				items: {
					type: "array",
					default: [
						{
							text: "",
							icon: {
								library: "fontAwesome",
								srcType: "class",
								/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
							},
							styles: {},
						},
					],
				},
			},
		},
	],
	transforms: {
		to: [
			{
				type: "block",
				blocks: ["combo-blocks/list-nested"],
				transform: (attributes) => {
					var items = attributes?.itemsX.items;
					var innerBlockX = items.map((item, index) => {
						// var widthX = item.attributes.width;
						// var backgroundColorX = item.attributes.backgroundColor;
						var text = item.text;
						return {
							clientId: "",
							name: "combo-blocks/list-nested-item",
							attributes: {
								wrapper: {
									options: {
										content: "",
										tag: "li",
										class: "pg-list-nested-item",
									},
								},
								icon: {
									options: {
										library: "fontAwesome",
										srcType: "class",
										iconSrc: "fas fa-chevron-right",
										class: "icon",
										position: "before",
									},
								},
								blockId: "",
							},
							innerBlocks: [
								[
									"combo-blocks/text",
									{
										text: {
											options: {
												content: text,
												tag: "span",
												class: "pg-text",
												id: "",
												limitBy: "",
												limitCount: 99,
											},
										},
									},
								],
							],
						};
					});
					var blokss = createBlocksFromInnerBlocksTemplate(innerBlockX);
					return createBlock(
						"combo-blocks/list-nested",
						{
							wrapper: {
								options: {
									tag: attributes.wrapper.options.tag,
									class: "pg-list-nested",
								},
								styles: attributes.wrapper.styles,
							},
							item: {
								options: attributes.item.options,
								styles: attributes.item.styles,
							},
							icon: {
								options: attributes.icon.options,
								styles: attributes.icon.styles,
							},
						},
						blokss
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
		var itemsX = attributes.itemsX;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var item = attributes.item;
		var items = attributes.items;
		var icon = attributes.icon;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		var formattedPrompt =
			"Respond only with list and no other text. Do not include any explanations, introductions, or concluding remarks.";
		const [listContentEditor, setlistContentEditor] = useState("rich"); // rich, textarea
		const [isLoading, setisLoading] = useState(false);
		const [activeIndex, setactiveIndex] = useState(null);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var itemSelector = blockClass + " .item";
		const iconSelector = blockClass + " .icon";
		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagItem = `${item.options.tag}`;
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			// if (items.length > 0) {
			// 	if (itemsX.items.length == 0) {
			// 		setAttributes({ itemsX: { ...itemsX, items: items } });
			// 	}
			// }
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			blockCssObj[iconSelector] = icon;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		function onKeyDown(event, i) {
			const { keyCode } = event;
			var itemText = itemsX.items[i].text;
			var textLength = itemsX.items[i].text.length;
			var itemCount = itemsX.items.length;
			if (keyCode === BACKSPACE) {
				if (itemText.length == 0) {
					var itemsZ = { ...itemsX };
					itemsZ.items.splice(i, 1);
					setAttributes({
						itemsX: { ...itemsX, items: itemsZ.items },
					});
				}
			}
			if (keyCode === DELETE) {
				if (itemText.length == 0) {
					var itemsZ = { ...itemsX };
					itemsZ.items.splice(i, 1);
					setAttributes({
						itemsX: { ...itemsX, items: itemsZ.items },
					});
				}
			}
			if (keyCode === ENTER) {
				event.preventDefault();
				var itemsZ = { ...itemsX };
				var itemObj = {
					text: "",
					icon: {
						library: "fontAwesome",
						srcType: "class",
						/*class, html, img, svg */ iconSrc: "fas fa-chevron-right",
					},
					styles: {},
				};
				var itemx = itemsZ.items.splice(i + 1, 0, itemObj);
				//itemsZ.items.splice(i, 0, "Lene");
				//var itemx = itemsZ.items.concat(itemObj);
				setAttributes({ itemsX: { ...itemsX, items: itemsZ.items } });
			}
		}
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
				var itemsX = attributes.items;
				var itemsXX = attributes.itemsX;
				var itemX = attributes.item;
				var iconX = attributes.icon;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
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
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}
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
		function onPickCssLibraryItem(args) {
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
		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});
			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
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
		function onRemoveStyleIcon(sudoScource, key) {
			let obj = { ...icon };
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
			setAttributes({ icon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
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
		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ icon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
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
		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
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
		function onBulkAddItems(sudoScource, cssObj) {
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
		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;
			setAttributes({ icon: obj });
			var selector = myStore.getElementSelector(sudoScource, iconSelector);
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
		function onResetIcon(sudoSources) {
			let obj = Object.assign({}, icon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ icon: obj });
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
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
						<div className="flex items-center my-3 gap-2 flex-wrap">
							<div
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
								// className="bg-gray-700 hover:bg-gray-600 p-2 mx-3 px-5 text-white my-4 text-center cursor-pointer"
								onClick={(ev) => {
									var itemsZ = { ...itemsX };
									var itemx = itemsZ.items.concat({
										text: "",
										icon: {
											library: "fontAwesome",
											srcType: "class",
											/*class, html, img, svg */ iconSrc:
												"fas fa-chevron-right",
										},
										styles: {},
									});
									setAttributes({ itemsX: { ...itemsX, items: itemx } });
								}}>
								{__("Add List Item", "combo-blocks")}
							</div>
							<div className="relative 	">
								<div
									className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
									onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();
										setAIWriter(!AIWriter);
									}}>
									AI
								</div>
								{AIWriter && (
									<Popover position="bottom right">
										<div className="w-[800px] p-3">
											<PGcssOpenaiPrompts
												value={""}
												formattedPrompt={formattedPrompt}
												promptsAgs={{
													action: "write",
													aiModel: "gpt-4-turbo",
													objective: "generateListItems",
												}}
												autoUpdate={AIautoUpdate}
												onResponseLoaded={(value, autoUpdate) => {
													// if (autoUpdate) {
													// 	var options = { ...text.options, content: value };
													// 	setAttributes({ text: { ...text, options: options } });
													// }
												}}
												clickHandle={(value, action) => {
													var itemsZ = { ...itemsX };

													var arr = value.split(/\r?\n/);

													var itemObj = arr.map((item) => {
														return {
															text: item,
															icon: {
																library: "fontAwesome",
																srcType: "class",
																/*class, html, img, svg */ iconSrc:
																	"fas fa-chevron-right",
															},
															styles: {},
														};
													});

													if (action == "prepend") {
														setAttributes({
															itemsX: {
																...itemsX,
																items: [...itemObj, ...itemsZ.items],
															},
														});
													}
													if (action == "append") {
														setAttributes({
															itemsX: {
																...itemsX,
																items: [...itemsZ.items, ...itemObj],
															},
														});
													}
													if (action == "replace") {
														setAttributes({
															itemsX: { ...itemsX, items: itemObj },
														});
													}

													//setAttributes({ itemsX: { ...itemsX, items: itemx } });
												}}
											/>
										</div>
									</Popover>
								)}
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
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
												{ label: "Ul", value: "ul" },
												{ label: "Ol", value: "ol" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
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
							title={__("Items", "combo-blocks")}
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
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={item.options.tag}
											options={[
												{ label: "li", value: "li" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...item.options, tag: newVal };
												setAttributes({ item: { ...item, options: options } });
											}}
										/>
									</PanelRow>
									{wrapper.options.tag == "ol" && (
										<>
											<ToggleControl
												label={__("Reversed?", "combo-blocks")}
												help={
													item.options.reversed
														? __("Counter reversed?", "combo-blocks")
														: __("No reversed", "combo-blocks")
												}
												checked={item.options.reversed ? true : false}
												onChange={(e) => {
													var options = {
														...item.options,
														reversed: item.options.reversed ? false : true,
													};
													setAttributes({
														item: { ...item, options: options },
													});
												}}
											/>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Counter start with", "combo-blocks")}
												</label>
												<InputControl
													type="number"
													value={item.options.start}
													onChange={(newVal) => {
														var options = { ...item.options, start: newVal };
														setAttributes({
															item: { ...item, options: options },
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Ordered list type?", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={item.options.type}
													options={[
														{ label: __("Choose", "combo-blocks"), value: "" },
														{
															label: __(
																"Decimal numbers (1, 2, 3, 4)",
																"combo-blocks"
															),
															value: "1",
														},
														{
															label: __(
																"Alphabetically ordered list",
																"combo-blocks"
															),
															value: "a",
														},
														{
															label: __(
																"Alphabetically ordered list, uppercase",
																"combo-blocks"
															),
															value: "A",
														},
														{
															label: __(
																"Roman numbers, lowercase (i, ii, iii, iv)",
																"combo-blocks"
															),
															value: "i",
														},
														{
															label: __(
																"Roman numbers, uppercase (I, II, III, IV)",
																"combo-blocks"
															),
															value: "I",
														},
													]}
													onChange={(newVal) => {
														var options = { ...item.options, type: newVal };
														setAttributes({
															item: { ...item, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}
									<div className="flex">
										<RadioControl
											label="Editor Type"
											className="flex"
											selected={listContentEditor}
											options={[
												{ label: "Rich Text", value: "rich" },
												{ label: "Textarea", value: "textarea" },
											]}
											onChange={(value) => setlistContentEditor(value)}
										/>
									</div>
									{itemsX.items != undefined &&
										itemsX.items.map((itemX, i) => {
											return (
												<div
													className="bg-gray-200 p-2 pr-0 flex justify-between items-center my-1 group relative "
													key={i}>
													{listContentEditor == "textarea" && (
														<>
															<TextareaControl
																value={itemX.text}
																onChange={(content) => {
																	var itemsZ = { ...itemsX };
																	var item = {
																		...itemsZ.items[i],
																		text: content,
																	};
																	itemsZ.items[i] = item;
																	setAttributes({
																		itemsX: { ...itemsX, items: itemsZ.items },
																	});
																}}
															/>
															<div
																className="bg-red-500 px-2 invisible  group-hover:visible absolute right-0 top-0  "
																onClick={(ev) => {
																	var itemsZ = { ...itemsX };
																	itemsZ.items.splice(i, 1);
																	setAttributes({
																		itemsX: { ...itemsX, items: itemsZ.items },
																	});
																}}>
																<span className="text-xl text-white">x</span>
															</div>
														</>
													)}
													{listContentEditor == "rich" && (
														<>
															<RichText
																onKeyDown={(ev) => {
																	onKeyDown(ev, i);
																}}
																tagName="div"
																className="inline-block"
																value={itemX.text}
																allowedFormats={[
																	"core/bold",
																	"core/italic",
																	"core/link",
																]}
																onChange={(content) => {
																	var itemsZ = { ...itemsX };
																	var item = {
																		...itemsZ.items[i],
																		text: content,
																	};
																	itemsZ.items[i] = item;
																	setAttributes({
																		itemsX: { ...itemsX, items: itemsZ.items },
																	});
																}}
																placeholder={__("Start Writing...")}
															/>
															<div
																className="bg-red-500 px-2 invisible  group-hover:visible absolute right-0 top-0  "
																onClick={(ev) => {
																	var itemsZ = { ...itemsX };
																	itemsZ.items.splice(i, 1);
																	setAttributes({
																		itemsX: { ...itemsX, items: itemsZ.items },
																	});
																}}>
																<span className="text-xl text-white">x</span>
															</div>
														</>
													)}
												</div>
											);
										})}
								</PGtab>
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
										onChange={onPickCssLibraryItem}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title= {__("Icon","combo-blocks")}
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Icon", "combo-blocks")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white"
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
											{__("Choose Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Icon position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: __("Choose...", "combo-blocks"), value: "" },
												{
													label: __("Before Text", "combo-blocks"),
													value: "before",
												},
												{
													label: __("After Text", "combo-blocks"),
													value: "after",
												},
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												icon,
												"icon",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
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
					{itemsX.items.length == 0 && (
						<>
							<div className="flex justify-center my-4">
								<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
									<div className="flex justify-between mb-5">
										<div className="text-xl rounded-sm">
											{__("Click to pick a variation", "combo-blocks")}
										</div>
										<div
											className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
											onClick={(ev) => {
												var content =
													'<!-- wp:combo-blocks/list {"wrapper":{"options":{"tag":"ul","class":"pg-list"},"styles":{"display":{"Desktop":"block"},"margin":{"Desktop":"0px 0px 0px 0px"},"padding":{"Desktop":"0px 0px 0px 0px"}}},"itemsX":{"items":[{"text":"HTML","icon":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-chevron-right"},"styles":[]},{"text":"CSS","icon":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-chevron-right"},"styles":[]},{"text":"Photoshop","icon":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-chevron-right"},"styles":[]},{"text":"Illustrator","icon":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-chevron-right"},"styles":[]}]},"item":{"options":{"text":"","tag":"li","counter":false,"reversed":false,"start":1,"type":"1","class":"item"},"styles":{"color":{"Desktop":"#000000"},"fontSize":{"Desktop":"18px"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"listStyle":{"Desktop":"none inside url(\u0022\u0022)"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-check","class":"icon","position":"before"},"styles":{"color":{"Desktop":"#258de0"},"fontSize":{"Desktop":"16px"},"margin":{"Desktop":"0px 10px 5px 10px"},"backgroundColor":{"Desktop":"#ffffff"},"display":{"Desktop":"inline-block"},"height":{"Desktop":"25px"},"lineHeight":{"Desktop":"25px"},"width":{"Desktop":"25px"},"textAlign":{"Desktop":"center"},"borderRadius":{"Desktop":"50px 50px 50px 50px"}}},"blockId":"pg4618ee8f8c8f","blockCssY":{"items":{".pg4618ee8f8c8f":{"display":{"Desktop":"block"},"margin":{"Desktop":"0px 0px 0px 0px"},"padding":{"Desktop":"0px 0px 0px 0px"}},".pg4618ee8f8c8f .item":{"color":{"Desktop":"#000000"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"list-style":{"Desktop":"none inside url(\u0022\u0022)"}},".pg4618ee8f8c8f .icon":{"color":{"Desktop":"#258de0"},"font-size":{"Desktop":"16px"},"margin":{"Desktop":"0px 10px 5px 10px"},"background-color":{"Desktop":"#ffffff"},"display":{"Desktop":"inline-block"},"height":{"Desktop":"25px"},"line-height":{"Desktop":"25px"},"width":{"Desktop":"25px"},"text-align":{"Desktop":"center"},"border-radius":{"Desktop":"50px 50px 50px 50px"}}}}} /-->';
												wp.data
													.dispatch("core/block-editor")
													.replaceBlock(clientId, wp.blocks.parse(content));
											}}>
											{__("Skip", "combo-blocks")}
										</div>
									</div>
									<div {...blockProps} className="">
										<ComboBlocksVariationsPicker
											blockName={"list"}
											blockId={blockId}
											clientId={clientId}
											onChange={onPickBlockVariation}
										/>
									</div>
								</div>
							</div>
						</>
					)}
					{itemsX.items.length > 0 && (
						<>
							{wrapper.options.tag && (
								<CustomTag
									{...blockProps}
									reversed={item.options.reversed ? "reversed" : ""}
									start={item.options.start}>
									{itemsX.items != undefined &&
										itemsX.items.map((itemX, i) => {
											return (
												<CustomTagItem
													className={` ${item.options.class}`}
													key={i}
													onClick={(ev) => {
														var ssdsd = itemsX.items.concat([]);
														// setAttributes({ items: { items: ssdsd } });
														setAttributes({
															itemsX: { ...itemsX, items: ssdsd },
														});
													}}>
													{icon.options.position == "before" && (
														<span
															className="icon"
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}
													<RichText
														onKeyDown={(ev) => {
															onKeyDown(ev, i);
														}}
														tagName="div"
														className="inline-block item"
														value={itemX.text}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(content) => {
															var itemsZ = { ...itemsX };
															var item = { ...itemsZ.items[i], text: content };
															itemsZ.items[i] = item;
															setAttributes({
																itemsX: { ...itemsX, items: itemsZ.items },
															});
														}}
														placeholder={__("Start Writing...")}
													/>
													{icon.options.position == "after" && (
														<span
															className="icon"
															dangerouslySetInnerHTML={{ __html: iconHtml }}
														/>
													)}
													<span
														className="text-lg cursor-pointer px-2 text-red-500  py-1 float-right icon-close"
														onClick={(ev) => {
															itemsX.items.splice(i, 1);
															var ssdsd = itemsX.items.concat([]);
															//setAttributes({ items: { items: ssdsd } })
															setAttributes({
																itemsX: { ...itemsX, items: ssdsd },
															});
															ev.preventDefault();
														}}></span>
												</CustomTagItem>
											);
										})}
								</CustomTag>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
