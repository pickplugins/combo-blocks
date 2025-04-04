import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	Icon,
	link,
	linkOff,
	mediaAndText,
	settings,
} from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
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
					d="M157 57H3C1.34315 57 0 58.3431 0 60V94C0 95.6568 1.34315 97 3 97H157C158.657 97 160 95.6568 160 94V60C160 58.3431 158.657 57 157 57Z"
					fill="url(#paint0_linear_61_613)"
				/>
				<path d="M109 71H20V82H109V71Z" fill="white" />
				<path
					d="M138.943 69.1227C138.698 68.9943 138.408 68.9613 138.125 69.0493L119.776 74.5338C118.955 74.7521 118.72 75.9034 119.39 76.4267L123.547 79.8751L138.943 69.1227Z"
					fill="white"
				/>
				<path
					d="M139.446 69.6655C137.762 70.8455 124.13 80.3592 124.13 80.3592L130.043 85.264C130.554 85.7058 131.408 85.541 131.709 84.9411C131.709 84.9411 139.406 70.6157 139.406 70.6157C139.567 70.3112 139.582 69.9663 139.446 69.6655Z"
					fill="white"
				/>
				<path
					d="M123.099 80.4585C123.066 80.5099 123.051 80.5722 123.051 80.6346V84.2444C123.019 85.1472 124.196 85.6986 124.86 85.0698C124.86 85.0698 126.727 83.463 126.727 83.463C126.361 83.167 123.099 80.4585 123.099 80.4585Z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_613"
						x1="0"
						y1="77"
						x2="160"
						y2="77"
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
				blocks: ["core/read-more"],
				transform: (attributes) => {
					var content = attributes.content;
					var linkTarget = attributes.linkTarget;
					return createBlock("combo-blocks/icon", {
						text: {
							options: {
								text: content,
								linkTarget: linkTarget,
								linkTo: "postUrl",
								linkAttr: [],
							},
						},
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
						return createBlock("combo-blocks/icon", {
							wrapper: {
								options: {
									tag: "div",
									class: "pg-text",
									attr: [],
								},
							},
							text: {
								options: {
									enable: true,
									text: textX,
									src: "",
									linkTo: "customUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: urlX,
									linkAttr: [],
									class: "",
								},
								styles: {},
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
								styles: {},
							},
							prefix: {
								options: {
									text: "",
									class: "prefix",
								},
								styles: {},
							},
							postfix: {
								options: {
									text: "",
									class: "postfix",
								},
								styles: {},
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
						});
					});
					return innerBlockX;
				},
			},
			{
				type: "block",
				blocks: ["core/home-link"],
				transform: (attributes) => {
					var content = attributes.label;
					return createBlock("combo-blocks/icon", {
						text: {
							options: {
								text: content,
								linkAttr: [],
							},
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/read-more"],
				transform: (attributes) => {
					var content = attributes.text;
					return createBlock("core/read-more", {
						content: content.options.text,
						linkTarget: content.options.linkTarget,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/home-link"],
				transform: (attributes) => {
					var content = attributes.text;
					return createBlock("core/home-link", {
						label: content.options.text,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (attributes) => {
					var textX = attributes.text.options.text;
					var urlX =
						attributes.text.options.linkTo == "customUrl"
							? attributes.text.options.customUrl
							: "";
					var innerBlockX = [
						{
							clientId: "",
							name: "core/button",
							attributes: {
								text: textX,
								url: urlX,
								tagName: "a",
								type: "button",
							},
						},
					];
					var innerBlocksX = createBlocksFromInnerBlocksTemplate(innerBlockX);
					return createBlock("core/buttons", {}, innerBlocksX);
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
		var text = attributes.text;
		var icon = attributes.icon;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var utmTracking = attributes.utmTracking;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var iconLink = context["iconLink"];
		var iconText = context["iconText"];
		let isProFeature = applyFilters("isProFeature", true);
		const [isVisible, setIsVisible] = useState(false);
		var breakPointX = myStore.getBreakPoint();
		var [comboBlocksEditor, setcomboBlocksEditor] = useState({});
		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);

		const [customFields, setCustomFields] = useState({});
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		const [iconHtml, setIconHtml] = useState("");
		const textEnable =
			text.options.enable == undefined ? true : text.options.enable;
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const textSelector = blockClass + " .text";
		const iconSelector = blockClass + " .text-icon";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const [preview, setPreview] = useState(true);
		const [customText, setCustomText] = useState(
			myStore.parseCustomTags(text.options.text, customTags)
		);
		const [prefixText, setprefixText] = useState(
			myStore.parseCustomTags(prefix.options.text, customTags)
		);
		const [postfixText, setpostfixText] = useState(
			myStore.parseCustomTags(postfix.options.text, customTags)
		);
		useEffect(() => {
			var textX = myStore.parseCustomTags(text.options.text, customTags);
			setCustomText(textX);
		}, [text.options.text]);
		useEffect(() => {
			var textX = myStore.parseCustomTags(prefix.options.text, customTags);
			setprefixText(textX);
		}, [prefix.options.text]);
		useEffect(() => {
			var textX = myStore.parseCustomTags(postfix.options.text, customTags);
			setpostfixText(textX);
		}, [postfix.options.text]);
		// useEffect(() => {
		// 	var blockIdX = "pg" + clientId.split("-").pop();
		// 	setAttributes({ blockId: blockIdX });
		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [clientId]);
		// useEffect(() => {
		// 	var blockCssObj = {};
		// 	blockCssObj[wrapperSelector] = wrapper;
		// 	blockCssObj[textSelector] = text;
		// 	blockCssObj[iconSelector] = icon;
		// 	blockCssObj[prefixSelector] = prefix;
		// 	blockCssObj[postfixSelector] = postfix;
		// 	var blockCssRules = myStore.getBlockCssRules(blockCssObj);
		// 	var items = blockCssRules;
		// 	setAttributes({ blockCssY: { items: items } });
		// }, [blockId]);

		var iconLinkToBasic = {
			postUrl: { label: __("Post URL", "combo-blocks"), value: "postUrl" },
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			authorUrl: { label: __("Author URL", "combo-blocks"), value: "authorUrl" },
			authorLink: {
				label: __("Author Link", "combo-blocks"),
				value: "authorLink",
			},
			nextPostUrl: {
				label: __("Next Post URL", "combo-blocks"),
				value: "nextPostUrl",
				isPro: true,
			},
			previousPostUrl: {
				label: __("Previous Post URL", "combo-blocks"),
				value: "previousPostUrl",
				isPro: true,
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
		let linkToArgs = applyFilters("comboBlocksIconLinkTo", iconLinkToBasic);
		var iconTextSourceBasic = {
			siteTitle: { label: __("Site Title", "combo-blocks"), value: "siteTitle" },
			tagline: { label: __("Tag line", "combo-blocks"), value: "tagline" },
			siteUrl: { label: __("Site URL", "combo-blocks"), value: "siteUrl" },
			currentYear: {
				label: __("Current Year", "combo-blocks"),
				value: "currentYear",
			},
			currentDate: {
				label: __("Current Date", "combo-blocks"),
				value: "currentDate",
				isPro: true,
			},
			postTitle: {
				label: __("Post title", "combo-blocks"),
				value: "postTitle",
				isPro: true,
			},
		};

		const [linkPickerText, setLinkPickerText] = useState(false);
		// useEffect(() => {
		// 	var blockIdX = "pg" + clientId.split("-").pop();
		// 	setAttributes({ blockId: blockIdX });
		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [clientId]);
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
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
				var textX = attributes.text;
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}
				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
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
			var options = { ...text.options, linkTo: option.value };
			setAttributes({ text: { ...text, options: options } });
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
		function onPickCssLibraryText(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				text[sudoScource] = sudoScourceArgs;
			});
			var textX = Object.assign({}, text);
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
			var blockCssX = { ...blockCssY };
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssX.items, [
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
		function onRemoveStylePrefix(sudoScource, key) {
			let obj = { ...prefix };
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
		function onResetPrefix(sudoSources) {
			let obj = Object.assign({}, prefix);
			Object.entries(sudoSources).map((args) => {
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
		function onResetPostfix(sudoSources) {
			let obj = Object.assign({}, postfix);
			Object.entries(sudoSources).map((args) => {
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

		function onAddStyleText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, text);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ text: object });
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

		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}

		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
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
		var [linkAttrItemsText, setlinkAttrItemsText] = useState({}); // Using the hook.
		var [wrapAttrItems, setwrapAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var sdsd = {};
			text.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItemsText(sdsd);
		}, [text]);
		useEffect(() => {
			var sdsd = {};
			if (wrapper.options.attr != undefined) {
				wrapper.options.attr.map((x) => {
					if (x.val) sdsd[x.id] = x.val;
				});
			}
			setwrapAttrItems(sdsd);
		}, [wrapper]);
		var postUrl =
			text.options.customUrl != undefined && text.options.customUrl.length > 0
				? text.options.customUrl
				: currentPostUrl;
		const CustomTag = `${wrapper.options.tag}`;
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<ToggleControl
								label={__("Edit Text?", "combo-blocks")}
								help={
									preview
										? __("Edit Text Disabled.", "combo-blocks")
										: __("Edit Text Enabled.", "combo-blocks")
								}
								checked={preview ? false : true}
								onChange={(e) => {
									setPreview(!preview);
								}}
							/>
						</div>
						{/* <span
							className="bg-gray-900 cursor-pointer text-white mx-3 py-1 px-2 inline-block"
							onClick={(ev) => {
								setPreview(!preview);
							}}>
							End Edit
						</span> */}
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
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
												{ label: "BUTTON", value: "button" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Attributes", "combo-blocks")}
										</label>
										<div
											// className=" cursor-pointer px-3 text-white py-1 bg-gray-700 hover:bg-gray-600"
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												if (wrapper.options.attr == undefined) {
													wrapper.options.attr = {};
												}
												var sdsd = wrapper.options.attr.concat({
													id: "",
													val: "",
												});
												var options = { ...wrapper.options, attr: sdsd };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}>
											{__("Add", "combo-blocks")}
										</div>
									</PanelRow>
									{wrapper.options.attr != undefined &&
										wrapper.options.attr.map((x, i) => {
											return (
												<div className="my-2" key={i}>
													<PanelRow>
														<InputControl
															placeholder="Name"
															className="mr-2"
															value={wrapper.options.attr[i].id}
															onChange={(newVal) => {
																wrapper.options.attr[i].id = newVal;
																var ssdsd = wrapper.options.attr.concat([]);
																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>
														<InputControl
															className="mr-2"
															placeholder="Value"
															value={x.val}
															onChange={(newVal) => {
																wrapper.options.attr[i].val = newVal;
																var ssdsd = wrapper.options.attr.concat([]);
																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}
														/>
														<span
															// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																wrapper.options.attr.splice(i, 1);
																var ssdsd = wrapper.options.attr.concat([]);
																var options = {
																	...wrapper.options,
																	attr: ssdsd,
																};
																setAttributes({
																	wrapper: { ...wrapper, options: options },
																});
															}}>
															<Icon icon={close} />
														</span>
													</PanelRow>
												</div>
											);
										})}
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
									<ToggleControl
										label={__("Enable text?", "combo-blocks")}
										help={
											textEnable
												? __("Text enabled", "combo-blocks")
												: __("Text disabled.", "combo-blocks")
										}
										checked={textEnable ? true : false}
										onChange={(e) => {
											var options = {
												...text.options,
												enable: text.options.enable ? false : true,
											};
											setAttributes({ text: { ...text, options: options } });
										}}
									/>
									<PGcssClassPicker
										tags={customTags}
										label="Text Source"
										placeholder="Text Source"
										value={text.options.text}
										onChange={(newVal) => {
											var options = { ...text.options, text: newVal };
											setAttributes({
												text: { ...text, options: options },
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Link To", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												linkToArgs[text.options.linkTo] == undefined
													? __("Choose", "combo-blocks")
													: linkToArgs[text.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>
									{text.options.linkTo.length > 0 && (
										<>
											{text.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Author Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={text.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...text.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{text.options.linkTo == "customField" && (
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={text.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...text.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link Target", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={text.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{
															label: "_blank",
															value: "_blank",
														},
														{
															label: "_parent",
															value: "_parent",
														},
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...text.options,
															linkTarget: newVal,
														};
														setAttributes({
															text: { ...text, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}
									{text.options.linkTo == "customUrl" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom URL", "combo-blocks")}
												</label>
												<div className="relative">
													<Button
														className={linkPickerText ? "!bg-gray-400" : ""}
														icon={link}
														onClick={(ev) => {
															setLinkPickerText((prev) => !prev);
														}}></Button>
													{text.options.customUrl?.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...text.options,
																	customUrl: "",
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}}></Button>
													)}
													{linkPickerText && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={text.options.customUrl}
																onChange={(newVal) => {
																	var options = {
																		...text.options,
																		customUrl: newVal.url,
																	};
																	setAttributes({
																		text: { ...text, options: options },
																	});
																	//setLinkPickerText(false)
																}}
															/>
															<div className="p-2">
																<span className="font-bold">
																	{__("Linked to:", "combo-blocks")}
																</span>{" "}
																{text.options.customUrl.length != 0
																	? text.options.customUrl
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
											{text.options.customUrl.length > 0 && (
												<div className="p-2 pl-0 truncate ">
													<span className="font-bold">
														{__("Linked to:", "combo-blocks")}
													</span>{" "}
													{text.options.customUrl}
												</div>
											)}
										</>
									)}

									{text.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<div
													className={` ${isVisible ? "pb-6" : ""
														} transition-all duration-200 w-full flex justify-between items-center relative`}>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Link Append", "combo-blocks")}
													</label>
													<div
														// className=" cursor-pointer px-3 text-white py-1 bg-gray-700 hover:bg-gray-600"
														className="flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var linkAppendX =
																text.options.linkAppend == undefined
																	? []
																	: text.options.linkAppend;

															var sdsd = linkAppendX.concat({
																id: "",
																val: "",
															});
															if (isProFeature) {
																setIsVisible(!isVisible);
															}
															if (!isProFeature) {
																var options = {
																	...text.options,
																	linkAppend: sdsd,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}
														}}>
														{__("Add", "combo-blocks")}
													</div>
													{isProFeature && isVisible && (
														// <div className="absolute bottom-2 right-0 bg-gray-700 text-white no-underline px-2 rounded-sm py-1 ">
														<a
															href="https://comboblocks.com/pricing/"
															target="_blank"
															className="absolute bottom-2 right-0 bg-gray-700 text-white hover:text-white no-underline px-2 rounded-sm py-1 ">
															{__("Subscribe to use", "combo-blocks")}
														</a>
														// </div>
													)}
												</div>
											</PanelRow>
											{text.options?.linkAppend != undefined &&
												!isProFeature &&
												text.options?.linkAppend.map((x, i) => {
													return (
														<div className="my-2" key={i}>
															<PanelRow>
																<InputControl
																	placeholder="Name"
																	className="mr-2"
																	value={text.options?.linkAppend[i].id}
																	onChange={(newVal) => {
																		text.options.linkAppend[i].id = newVal;
																		var ssdsd = text.options?.linkAppend.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAppend: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>
																<InputControl
																	className="mr-2"
																	placeholder="Value"
																	value={x.val}
																	onChange={(newVal) => {
																		text.options.linkAppend[i].val = newVal;
																		var ssdsd = text.options.linkAppend.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAppend: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>
																<span
																	// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																	onClick={(ev) => {
																		text.options.linkAppend.splice(i, 1);
																		var ssdsd = text.options.linkAppend.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAppend: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}>
																	<Icon icon={close} />
																</span>
															</PanelRow>
														</div>
													);
												})}
										</div>
									)}
									{text.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<div
													className={` ${isVisible ? "pb-6" : ""
														} transition-all duration-200 w-full flex justify-between items-center relative`}>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Attributes", "combo-blocks")}
													</label>
													<div
														// className=" cursor-pointer px-3 text-white py-1 bg-gray-700 hover:bg-gray-600"
														className="flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var sdsd = text.options.linkAttr.concat({
																id: "",
																val: "",
															});
															if (isProFeature) {
																setIsVisible(!isVisible);
															}
															if (!isProFeature) {
																var options = {
																	...text.options,
																	linkAttr: sdsd,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}
														}}>
														{__("Add", "combo-blocks")}
													</div>
													{isProFeature && isVisible && (
														// <div className="absolute bottom-2 right-0 bg-gray-700 text-white no-underline px-2 rounded-sm py-1 ">
														<a
															href="https://comboblocks.com/pricing/"
															target="_blank"
															className="absolute bottom-2 right-0 bg-gray-700 text-white hover:text-white no-underline px-2 rounded-sm py-1 ">
															{__("Subscribe to use", "combo-blocks")}
														</a>
														// </div>
													)}
												</div>
											</PanelRow>

											<ToggleControl
												label={__("Append URL Prams?", "combo-blocks")}
												help={
													text.options?.appendURLPrams
														? "Append URL Enable."
														: "Append URL Disabled."
												}
												checked={text.options?.appendURLPrams}
												onChange={(e) => {
													var options = {
														...text.options,
														appendURLPrams: !text.options?.appendURLPrams,
													};
													if (isProFeature) {
														alert(
															"This feature is only available in Pro Version."
														);
														return;
													}
													setAttributes({
														text: { ...text, options: options },
													});
												}}
											/>

											{text.options.linkAttr != undefined &&
												!isProFeature &&
												text.options.linkAttr.map((x, i) => {
													return (
														<div className="my-2" key={i}>
															<PanelRow>
																<InputControl
																	placeholder="Name"
																	className="mr-2"
																	value={text.options.linkAttr[i].id}
																	onChange={(newVal) => {
																		text.options.linkAttr[i].id = newVal;
																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>
																<InputControl
																	className="mr-2"
																	placeholder="Value"
																	value={x.val}
																	onChange={(newVal) => {
																		text.options.linkAttr[i].val = newVal;
																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}
																/>
																<span
																	// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																	className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																	onClick={(ev) => {
																		text.options.linkAttr.splice(i, 1);
																		var ssdsd = text.options.linkAttr.concat(
																			[]
																		);
																		var options = {
																			...text.options,
																			linkAttr: ssdsd,
																		};
																		setAttributes({
																			text: { ...text, options: options },
																		});
																	}}>
																	<Icon icon={close} />
																</span>
															</PanelRow>
														</div>
													);
												})}
										</div>
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
							title={__("Icon", "combo-blocks")}
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
												{
													label: __("Before Prefix", "combo-blocks"),
													value: "beforePrefix",
												},
												{
													label: __("After Prefix", "combo-blocks"),
													value: "afterPrefix",
												},
												{
													label: __("Before Postfix", "combo-blocks"),
													value: "beforePostfix",
												},
												{
													label: __("After Postfix", "combo-blocks"),
													value: "afterPostfix",
												},
												{
													label: __("Before Link", "combo-blocks"),
													value: "beforeLink",
												},
												{
													label: __("After Link", "combo-blocks"),
													value: "afterLink",
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
							// title="Prefix"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
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
								<span className="flex justify-between w-full gap-2">
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
						{/* UTM  */}
						{comboBlocksEditor?.addons?.enabled?.includes("utmTracking") && (
							<PGtoggle
								opened={isProFeature ? false : null}
								className="font-medium text-slate-900 "
								// title="UTM tracking"
								title={
									<span className="flex justify-between w-full gap-2">
										<span>{__("UTM tracking", "combo-blocks")}</span>
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
								<div>
									<ToggleControl
										label={__("Enable UTM Tracking?", "combo-blocks")}
										help={
											utmTracking.enable
												? "Tracking Enable."
												: "Tracking Disabled."
										}
										checked={utmTracking.enable ? true : false}
										onChange={(e) => {
											var options = {
												...utmTracking,
												enable: utmTracking.enable ? false : true,
											};
											if (isProFeature) {
												alert("This feature is only available in Pro Version.");
												return;
											}
											setAttributes({
												utmTracking: options,
											});
										}}
									/>
									{utmTracking.enable && (
										<>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													ID
												</label>
												<InputControl
													value={utmTracking.id}
													onChange={(newVal) => {
														var update = { ...utmTracking, id: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													Source
												</label>
												<InputControl
													value={utmTracking.source}
													onChange={(newVal) => {
														var update = { ...utmTracking, source: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													Medium
												</label>
												<InputControl
													value={utmTracking.medium}
													onChange={(newVal) => {
														var update = { ...utmTracking, medium: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													Campaign
												</label>
												<InputControl
													value={utmTracking.campaign}
													onChange={(newVal) => {
														var update = { ...utmTracking, campaign: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													Term
												</label>
												<InputControl
													value={utmTracking.term}
													onChange={(newVal) => {
														var update = { ...utmTracking, term: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
											<PanelRow className="">
												<label
													for=""
													className="font-medium text-slate-900 pg-font ">
													Content
												</label>
												<InputControl
													value={utmTracking.content}
													onChange={(newVal) => {
														var update = { ...utmTracking, content: newVal };
														setAttributes({
															utmTracking: update,
														});
													}}
												/>
											</PanelRow>
										</>
									)}
									<PanelRow className="">
										<label
											htmlFor=""
											className="font-medium text-slate-900 pg-font ">
											{__("Trigger Name", "combo-blocks")}
										</label>
										<InputControl
											value={text.options.triggerName}
											onChange={(newVal) => {
												var options = { ...text.options, triggerName: newVal };
												setAttributes({ text: { ...text, options: options } });
											}}
										/>
									</PanelRow>
									{text.options.triggerName && (
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												{__("Trigger Type", "combo-blocks")}
											</label>
											<SelectControl
												value={text.options.triggerType}
												options={[
													{ label: __("Choose", "combo-blocks"), value: "" },
													{ label: "Click", value: "click" },
													{ label: "Mouse Over", value: "mouseover" },
													{ label: "Mouse Leave", value: "mouseleave" },
													{ label: "Mouse Out", value: "mouseout" },
												]}
												onChange={(newVal) => {
													var options = {
														...text.options,
														triggerType: newVal,
													};
													setAttributes({
														text: { ...text, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
								</div>
							</PGtoggle>
						)}
						{/* UTM  */}

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
					{wrapper.options.tag && (
						<CustomTag {...blockProps} {...wrapAttrItems}>
							{icon.options.position == "beforePrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{prefix.options.text && (
								<span className={prefix.options.class}>{prefixText}</span>
							)}
							{icon.options.position == "afterPrefix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{text.options.linkTo.length > 0 && (
								<>
									{icon.options.position == "beforeLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<a
										className="text"
										onClick={handleLinkClick}
										{...linkAttrItemsText}
										target={text.options.linkTarget}
										href={postUrl}>
										{icon.options.position == "beforeText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{textEnable && (
											<>
												{preview && (
													<span
														// className="text"
														onClick={(ev) => {
															setPreview(!preview);
														}}
														dangerouslySetInnerHTML={{
															__html: customText,
														}}></span>
												)}
												{!preview && (
													<>
														{textEnable && (
															<RichText
																// className="text"
																tagName={"span"}
																value={text.options.text}
																allowedFormats={[
																	"core/bold",
																	"core/italic",
																	"core/link",
																]}
																onChange={(content) => {
																	var options = {
																		...text.options,
																		text: content,
																	};
																	setAttributes({
																		text: { ...text, options: options },
																	});
																}}
																placeholder={__("Start Writing...")}
															/>
														)}
													</>
												)}
											</>
										)}
										{icon.options.position == "afterText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
									</a>
									{icon.options.position == "afterLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{text.options.linkTo.length == 0 && (
										<>
											{icon.options.position == "beforeText" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{preview && (
												<span
													className="text"
													onClick={(ev) => {
														setPreview(!preview);
													}}
													dangerouslySetInnerHTML={{
														__html: customText,
													}}></span>
											)}
											{!preview && (
												<>
													{textEnable && (
														<RichText
															className="text"
															tagName={"span"}
															value={text.options.text}
															allowedFormats={[
																"core/bold",
																"core/italic",
																"core/link",
															]}
															onChange={(content) => {
																var options = {
																	...text.options,
																	text: content,
																};
																setAttributes({
																	text: { ...text, options: options },
																});
															}}
															placeholder={__("Start Writing...")}
														/>
													)}
												</>
											)}
											{icon.options.position == "afterText" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</>
									)}
								</>
							)}
							{text.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{preview && (
										<span
											className="text"
											onClick={(ev) => {
												setPreview(!preview);
											}}
											dangerouslySetInnerHTML={{ __html: customText }}></span>
									)}
									{!preview && (
										<>
											{textEnable && (
												<RichText
													className="text"
													tagName={"span"}
													value={customText}
													allowedFormats={[
														"core/bold",
														"core/italic",
														"core/link",
													]}
													onChange={(content) => {
														var options = { ...text.options, text: content };
														setAttributes({
															text: { ...text, options: options },
														});
													}}
													placeholder={__("Start Writing...")}
												/>
											)}
										</>
									)}
									{icon.options.position == "afterText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
						</CustomTag>
					)}
					{wrapper.options.tag.length == 0 && (
						<>
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{prefix.options.text && (
								<span className={prefix.options.class}>{prefixText}</span>
							)}
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{text.options.linkTo.length > 0 && (
								<>
									{icon.options.position == "beforeLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<a
										className="text"
										onClick={handleLinkClick}
										{...linkAttrItemsText}
										target={text.options.linkTarget}
										href={postUrl}>
										{icon.options.position == "beforeText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{preview && (
											<span
												className="text"
												onClick={(ev) => {
													setPreview(!preview);
												}}
												dangerouslySetInnerHTML={{ __html: customText }}></span>
										)}
										{!preview && (
											<>
												{textEnable && (
													<RichText
														className="text"
														tagName={"span"}
														value={text.options.text}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(content) => {
															var options = {
																...text.options,
																text: content,
															};
															setAttributes({
																text: { ...text, options: options },
															});
														}}
														placeholder={__("Start Writing...")}
													/>
												)}
												<span
													className="bg-gray-900 cursor-pointer text-white mx-3 py-1 px-2 inline-block"
													onClick={(ev) => {
														setPreview(!preview);
													}}>
													End Edit
												</span>
											</>
										)}
										{icon.options.position == "afterText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
									</a>
									{icon.options.position == "afterLink" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}
							{text.options.linkTo.length == 0 && (
								<>
									{icon.options.position == "beforeText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{preview && (
										<span
											className="text"
											onClick={(ev) => {
												setPreview(!preview);
											}}
											dangerouslySetInnerHTML={{ __html: customText }}></span>
									)}
									{!preview && (
										<>
											{textEnable && (
												<RichText
													className="text"
													tagName={"span"}
													value={customText}
													allowedFormats={[
														"core/bold",
														"core/italic",
														"core/link",
													]}
													onChange={(content) => {
														var options = { ...text.options, text: content };
														setAttributes({
															text: { ...text, options: options },
														});
													}}
													placeholder={__("Start Writing...")}
												/>
											)}
										</>
									)}
									{icon.options.position == "afterText" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</>
							)}
							{icon.options.position == "beforePostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							{postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
							{icon.options.position == "afterPostfix" && (
								<span
									className={icon.options.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
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
