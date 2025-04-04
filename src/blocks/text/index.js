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
	SelectControl,
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import PGAnimateOn from "../../components/animate-on";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGFormFieldConditions from "../../components/form-field-conditions";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGcssOpenaiPrompts from "../../components/openai-prompts";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGTilt from "../../components/tilt";
import PGtoggle from "../../components/toggle";
import PGTooltip from "../../components/tooltip";
import PGTypingTextOn from "../../components/typing-text";
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
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M160.294 62H85V71.4118H160.294V62Z"
					fill="url(#paint0_linear_61_930)"
				/>
				<path
					d="M160.294 80.8823H85.2939V89.8823H160.294V80.8823Z"
					fill="#C15940"
				/>
				<path
					d="M131.294 99.8823H85.2939V108.882H131.294V99.8823Z"
					fill="#C15940"
				/>
				<path
					d="M68.0095 79.9611C65.7484 79.9611 63.922 81.7874 63.922 84.0486V114.836H8.26203V59.1756H39.0491C41.3103 59.1756 43.1366 57.3492 43.1366 55.088C43.1366 52.8268 41.3103 51.0005 39.0491 51.0005H7.04456C3.13096 51.0005 0 54.1313 0 58.0449V116.14C0 120.054 3.13096 123.185 7.04456 123.185H65.1397C69.0533 123.185 72.1841 120.054 72.1841 116.14V84.1356C72.0971 81.7874 70.2707 79.9611 68.0095 79.9611Z"
					fill="url(#paint1_linear_61_930)"
				/>
				<path
					d="M73.8365 60.8279L62.1826 49.1741C60.6171 47.6086 58.0081 47.6086 56.3557 49.1741L21.4811 84.0485C20.6984 84.8313 20.2637 85.8749 20.2637 87.0055V98.6593C20.2637 100.921 22.09 102.747 24.3512 102.747H36.0051C37.1357 102.747 38.1792 102.312 38.8749 101.529L73.7495 66.6548C75.4019 65.0024 75.402 62.3934 73.8365 60.8279ZM56.3557 72.3947L34.3526 94.3978H28.5257V88.5709L50.5288 66.5678L56.3557 72.3947ZM65.0526 63.6978L62.1826 66.5678L56.3557 60.7409L59.2257 57.871L65.0526 63.6978Z"
					fill="url(#paint2_linear_61_930)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_930"
						x1="85"
						y1="66.7059"
						x2="160.294"
						y2="66.7059"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_930"
						x1="0"
						y1="87.0925"
						x2="72.1841"
						y2="87.0925"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_930"
						x1="20.2637"
						y1="75.3734"
						x2="74.9999"
						y2="75.3734"
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
				blocks: ["core/paragraph", "core/code"],
				transform: (attributes, innerBlocks) => {
					var content = attributes.content;
					var atts = {
						text: {
							options: { content: content, tag: "div", class: "pg-text" },
						},
					};
					return createBlock("combo-blocks/text", atts);
				},
			},
			{
				type: "block",
				blocks: ["core/heading"],
				transform: (attributes) => {
					var content = attributes.content;
					var level = attributes.level;
					return createBlock("combo-blocks/text", {
						text: { options: { content: content, tag: "h" + level } },
					});
				},
			},
			{
				type: "block",
				blocks: ["core/quote"],
				transform: (attributes) => {
					var citation = attributes.citation;
					return createBlock("combo-blocks/text", {
						text: { options: { content: citation } },
					});
				},
			},
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (attributes, innerBlocks) => {
					var innerBlockX = innerBlocks.map((item, i) => {
						var textX = item.attributes.text;
						var urlX = item.attributes.url;
						var tagNameX = item.attributes.tagName;
						return createBlock("combo-blocks/text", {
							text: {
								options: {
									content: textX,
									tag: tagNameX,
									class: "pg-text",
									id: "",
									limitBy: "",
									limitCount: 99,
								},
								styles: {
									color: {
										Desktop: "#000000",
									},
									fontSize: {
										Desktop: "18px",
									},
									fontFamily: {
										
									},
									fontStyle: {
										Desktop: "normal",
									},
									fontWeight: {
										Desktop: "400",
									},
								},
							},
						});
					});
					return innerBlockX;
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: (attributes) => {
					var text = attributes.text;
					return createBlock("core/paragraph", {
						content: text.options.content,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/code"],
				transform: (attributes) => {
					var text = attributes.text;
					return createBlock("core/code", { content: text.options.content });
				},
			},
			{
				type: "block",
				blocks: ["core/heading"],
				transform: (attributes) => {
					var text = attributes.text;
					var tag = attributes.tag;
					return createBlock("core/heading", {
						content: text.options.content,
						level: "3",
					});
				},
			},
			{
				type: "block",
				blocks: ["core/quote"],
				transform: (attributes) => {
					var text = attributes.text;
					var tag = attributes.tag;
					return createBlock("core/quote", {
						value: text.options.content,
						citation: text.options.content,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (attributes) => {
					var textX = attributes.text.options.content;
					var tagX = attributes.text.options.tag;
					var innerBlockX = [
						{
							clientId: "",
							name: "core/button",
							attributes: {
								tagName: tagX,
								type: "button",
								text: textX,
							},
						},
					];
					var blokss = createBlocksFromInnerBlocksTemplate(innerBlockX);
					return createBlock("core/buttons", {}, blokss);
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
		var wrapper = attributes.wrapper;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var animateOn = attributes.animateOn;
		var tilt = attributes.tilt;
		var tooltip = attributes.tooltip;
		var typingText = attributes.typingText;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var text = attributes.text;
		var conditions = attributes.conditions;
		var calculations = attributes.calculations;
		var visible = attributes.visible;
		// var typingText = attributes.typingText;
		var other = attributes.other;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		const [AIautoUpdate, setAIautoUpdate] = useState(false);

		var [comboBlocksEditor, setcomboBlocksEditor] = useState({}); // Using the hook.
		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);

		let isProFeature = applyFilters("isProFeature", true);
		const CustomTag = wrapper.options.tag;
		const CustomTextTag = text.options?.tag?.length == 0 ? "div" : text.options.tag;
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var textSelector = blockClass + " .pg-text";
		// var textSelector = blockClass;
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		var limitByArgsBasic = {
			none: { label: __("Choose..", "combo-blocks"), value: "" },
			word: { label: __("Word", "combo-blocks"), value: "word" },
			character: {
				label: __("Character", "combo-blocks"),
				value: "character",
				isPro: true,
			},
		};

		let limitByArgs = applyFilters("limitByArgs", limitByArgsBasic);

		const [prefixText, setprefixText] = useState(
			myStore.parseCustomTags(prefix.options.text, customTags)
		);
		const [postfixText, setpostfixText] = useState(
			myStore.parseCustomTags(postfix.options.text, customTags)
		);
		useEffect(() => {
			var text = myStore.parseCustomTags(prefix.options.text, customTags);
			setprefixText(text);
		}, [prefix.options.text]);
		useEffect(() => {
			var text = myStore.parseCustomTags(postfix.options.text, customTags);
			setpostfixText(text);
		}, [postfix.options.text]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[textSelector] = text;
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		function setLimitBy(option, index) {
			var options = { ...text.options, limitBy: option.value };
			setAttributes({ text: { ...text, options: options } });
		}
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var textX = attributes.text;
				var wrapperX = attributes.wrapper;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (textX != undefined) {
					var textY = { ...textX, options: text.options };
					setAttributes({ text: textY });
					blockCssObj[textSelector] = textY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
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
		function onPickCssLibraryText(args) {
			var textX = Object.assign({}, text);
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				textX[sudoScource] = sudoScourceArgs;
			});
			setAttributes({ text: textX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					textSelector
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
		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				prefix[sudoScource] = sudoScourceArgs;
			});
			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					prefixSelector
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
		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postfix[sudoScource] = sudoScourceArgs;
			});
			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postfixSelector
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
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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
		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoScources).map((args) => {
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
		function onChangeStyleText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			//let obj = Object.assign({}, text);
			let obj = { ...text };
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ text: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			// if (blockCssY.items[elementSelector] == undefined) {
			//     blockCssY.items[elementSelector] = {};
			//   }
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleText(sudoScource, key) {
			let obj = { ...text };
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
			setAttributes({ text: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
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
		function onAddStyleText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			//let objX = Object.assign({}, text);
			let obj = { ...text };
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ text: object });
		}
		function onBulkAddText(sudoScource, cssObj) {
			let obj = Object.assign({}, text);
			obj[sudoScource] = cssObj;
			setAttributes({ text: obj });
			var selector = myStore.getElementSelector(sudoScource, textSelector);
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
		function onResetText(sudoSources) {
			let obj = Object.assign({}, text);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						textSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ text: obj });
		}
		function onChangeStylePrefix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ prefix: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
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
		function onRemoveStylePrefix(sudoScource, key) {
			let obj = { ...prefix };
			var object = myStore.deletePropertyDeep(prefix, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ prefix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
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
		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}
		function onResetPrefix(sudoScources) {
			let obj = Object.assign({}, prefix);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prefixSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ prefix: obj });
		}
		function onBulkAddPrefix(sudoScource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoScource] = cssObj;
			setAttributes({ prefix: obj });
			var selector = myStore.getElementSelector(sudoScource, prefixSelector);
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
		function onBulkAddPostfix(sudoScource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoScource] = cssObj;
			setAttributes({ postfix: obj });
			var selector = myStore.getElementSelector(sudoScource, postfixSelector);
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
		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postfix: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
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
		function onRemoveStylePostfix(sudoScource, key) {
			let obj = { ...postfix };
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
			setAttributes({ postfix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
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
		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}
		function onResetPostfix(sudoScources) {
			let obj = Object.assign({}, postfix);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postfixSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ postfix: obj });
		}

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
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
									{/* <div className="pg-setting-input-textarea"> */}
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										className="pg-setting-input-textarea"
										placeholder="Add Class"
										value={wrapper.options.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
									{/* </div> */}
									<PanelRow className="pg-setting-input-text">
										<label
											for=""
											className="font-medium text-slate-900 pg-font ">
											Block ID
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
									<PanelRow className="pg-setting-select">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
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
													wrapper: { styles: wrapper.styles, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										blockId={blockId}
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
							title={__("Text", "combo-blocks")}
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
									<div className="flex justify-between items-center">
										<div>AI Writer</div>
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
															value={text.options.content}
															formattedPrompt={""}
															promptsAgs={{
																action: "write",
																aiModel: "gpt-4-turbo",
															}}
															autoUpdate={AIautoUpdate}
															onResponseLoaded={(value, autoUpdate) => {
																if (autoUpdate) {
																	var options = {
																		...text.options,
																		content: value,
																	};
																	setAttributes({
																		text: { ...text, options: options },
																	});
																}
															}}
															clickHandle={(value) => {
																var options = {
																	...text.options,
																	content: value,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}}
														/>
													</div>
												</Popover>
											)}
										</div>
									</div>

									<PGcssClassPicker
										tags={customTags}
										label="Text Source"
										placeholder="Text Source"
										value={text.options.content}
										onChange={(newVal) => {
											var options = { ...text.options, content: newVal };
											setAttributes({
												text: { ...text, options: options },
											});
										}}
									/>
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={text.options.class}
										onChange={(newVal) => {
											var options = { ...text.options, class: newVal };
											setAttributes({
												text: { ...text, options: options },
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
											value={text.options.id}
											onChange={(newVal) => {
												var options = { ...text.options, id: newVal };
												setAttributes({
													text: { ...text, options: options },
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
											value={text.options.tag}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
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
												var options = { ...text.options, tag: newVal };
												setAttributes({ text: { ...text, options: options } });
											}}
										/>
									</PanelRow>
									{text.options?.tag?.length == 0 && (
										<p className="text-red-500 my-3">
											{__(
												"Tag is empty, Style and selection of block will be unavilable.",
												"combo-blocks"
											)}
										</p>
									)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Limit By", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={limitByArgs}
											buttonTitle={
												text.options.limitBy !== undefined &&
													text.options.limitBy.length > 0
													? text.options.limitBy
													: __("Choose", "combo-blocks")
											}
											onChange={setLimitBy}
											values={[]}></PGDropdown>
									</PanelRow>
									{text.options.limitBy != null &&
										text.options.limitBy.length > 0 && (
											<div className="bg-gray-500 my-3 text-white p-2">
												{limitByArgs[text.options.limitBy].label}
											</div>
										)}
									{text.options.limitBy != null &&
										(text.options.limitBy == "word" ||
											text.options.limitBy == "character") && (
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Limit Count", "combo-blocks")}
												</label>
												<InputControl
													value={
														text.options.limitCount == null
															? "99"
															: text.options.limitCount
													}
													onChange={(newVal) => {
														var options = {
															...text.options,
															limitCount: newVal,
														};
														setAttributes({
															text: { ...text, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={text}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												text,
												"text",
												textSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												text,
												"text",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												text,
												"text",
												textSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												text,
												"text",
												textSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												text,
												"text",
												textSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={text}
										onChange={onPickCssLibraryText}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Prefix"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2 ">
									<span>{__("Prefix", "combo-blocks")}</span>
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
							initialOpen={false}
							disabled="true">
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
									<div className="pg-setting-input-textarea">
										<PGcssClassPicker
											tags={customTags}
											label="Prefix"
											placeholder="Add Prefix"
											value={prefix.options.text}
											onChange={(newVal) => {
												var options = { ...prefix.options, text: newVal };
												setAttributes({
													prefix: { styles: prefix.styles, options: options },
												});
											}}
										/>
									</div>
									{/* <PanelRow className="pg-setting-select">
										<label
											for=""
											className="font-medium text-slate-900 pg-font  ">
											{__("Position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={prefix.options.position}
											options={[
												{ label: __("None", "combo-blocks"), value: "none" },
												{
													label: __("Before Post Title Text", "combo-blocks"),
													value: "beforebegin",
												},
												{
													label: __("Start of Post Title", "combo-blocks"),
													value: "afterbegin",
												},
											]}
											onChange={(newVal) => {
												var options = { ...prefix.options, position: newVal };
												setAttributes({
													prefix: { ...prefix, options: options },
												});
											}}
										/>
									</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												prefix,
												"prefix",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={prefix}
										onChange={onPickCssLibraryPrefix}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Postfix"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2 ">
									<span>{__("Postfix", "combo-blocks")}</span>
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
									<div className="pg-setting-input-textarea">
										<PGcssClassPicker
											tags={customTags}
											label="Postfix"
											placeholder="Add Postfix"
											value={postfix.options.text}
											onChange={(newVal) => {
												var options = { ...postfix.options, text: newVal };
												setAttributes({
													postfix: { styles: postfix.styles, options: options },
												});
											}}
										/>
									</div>
									{/* <PanelRow className="pg-setting-select">
										<label
											for=""
											className="font-medium text-slate-900 pg-font  ">
											{__("Position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={postfix.options.position}
											options={[
												{ label: __("None", "combo-blocks"), value: "none" },
												{
													label: __("After Post Title Text", "combo-blocks"),
													value: "afterend",
												},
												{
													label: __("End of Post Title", "combo-blocks"),
													value: "beforeend",
												},
											]}
											onChange={(newVal) => {
												var options = { ...postfix.options, position: newVal };
												setAttributes({
													postfix: { ...postfix, options: options },
												});
											}}
										/>
									</PanelRow> */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												postfix,
												"postfix",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postfix}
										onChange={onPickCssLibraryPostfix}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Others", "combo-blocks")}
							initialOpen={false}>
							<ToggleControl
								label={__("Click to Copy?", "combo-blocks")}
								help={
									other.options?.copyObj
										? __("Enabled", "combo-blocks")
										: __("Disabled", "combo-blocks")
								}
								checked={other.options?.copyObj ? true : false}
								onChange={(e) => {
									if (!isProFeature) {
										var options = {
											...other.options,
											copyObj: other.options?.copyObj ? false : true,
										};
										setAttributes({
											other: { ...other, options: options },
										});
									} else {
										alert(
											__(
												"This feature is available in PRO version only.",
												"combo-blocks"
											)
										);
									}
								}}
							/>
							<div>{__("Copy content", "combo-blocks")}</div>
							<div className="pg-setting-input-textarea">
								<TextareaControl
									className="w-full"
									value={other.options.copyContent}
									placeholder={props.placeholder}
									onChange={(newVal) => {
										var options = { ...other.options, copyContent: newVal };
										setAttributes({
											other: { ...other, options: options },
										});
									}}
								/>
							</div>
						</PGtoggle>
						{/* testing */}

						{comboBlocksEditor?.addons?.enabled?.includes("typingText") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Typing Text", "combo-blocks")}
									initialOpen={false}>
									<PGTypingTextOn
										typingText={typingText}
										onChange={(prams) => {
											setAttributes({ typingText: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{comboBlocksEditor?.addons?.enabled?.includes("animateOn") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Animate On", "combo-blocks")}
									initialOpen={false}>
									<PGAnimateOn
										animateOn={animateOn}
										onChange={(prams) => {
											setAttributes({ animateOn: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{comboBlocksEditor?.addons?.enabled?.includes("tilt") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Tilt", "combo-blocks")}
									initialOpen={false}>
									<PGTilt
										tilt={tilt}
										onChange={(prams) => {
											setAttributes({ tilt: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{comboBlocksEditor?.addons?.enabled?.includes("tooltip") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Tooltip", "combo-blocks")}
									initialOpen={false}>
									<PGTooltip
										tooltip={tooltip}
										onChange={(prams) => {
											setAttributes({ tooltip: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{comboBlocksEditor?.addons?.enabled?.includes("conditions") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									opened={isProFeature ? false : null}
									title={
										<span className="flex justify-between w-full gap-2 ">
											<span>{__("Conditions", "combo-blocks")}</span>
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
									<PGFormFieldConditions
										visible={conditions}
										onChange={(prams) => {
											setAttributes({ conditions: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{/* {comboBlocksEditor?.addons?.enabled?.includes("calculations") && (
							<PGtoggle
								className="font-medium text-slate-900 "
								opened={isProFeature ? false : null}
								title={
									<span className="flex justify-between w-full gap-2 ">
										<span>{__("Calculations", "combo-blocks")}</span>
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
								<PGFormFieldCalculations
									visible={calculations}
									onChange={(prams) => {
										setAttributes({ calculations: prams });
									}}
								/>
							</PGtoggle>
						)} */}
						{/* testing */}

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
				{/* {JSON.stringify(wrapper)} */}
				{CustomTag.length != 0 && (
					<CustomTag {...blockProps}>
						{prefix.options.text && (
							<span className={prefix.options.class}>{prefixText}</span>
						)}
						<RichText
							tagName={CustomTextTag}
							className={text.options.class}
							value={text.options.content}
							allowedFormats={["core/bold", "core/italic", "core/link"]}
							onChange={(content) => {
								var options = { ...text.options, content: content };
								setAttributes({ text: { ...text, options: options } });
							}}
							placeholder={__("Start Writing...")}
						/>
						{postfix.options.text && (
							<span className={postfix.options.class}>{postfixText}</span>
						)}
					</CustomTag>
				)}
				{CustomTag.length == 0 && (
					<>
						{CustomTextTag.length == 0 && <>{text.options.content}</>}
						{CustomTextTag.length != 0 && (
							<CustomTextTag className={text.options.class}>
								{text.options.content}
							</CustomTextTag>
						)}
					</>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
