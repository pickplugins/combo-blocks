import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
} from "@wordpress/block-editor";
import { createBlock, registerBlockType } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select, useSelect } from "@wordpress/data";
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
	menu,
	settings,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
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
	title: "Post Title",
	description:
		"The post title block showcases the main title or headline of a blog post.",
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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_182)"
				/>
				<path d="M160 66.1177H84.7061V75.5294H160V66.1177Z" fill="#C15940" />
				<path
					d="M141.177 84.9412H84.7061V94.3529H141.177V84.9412Z"
					fill="url(#paint1_linear_61_182)"
				/>
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="url(#paint2_linear_61_182)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_182"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_182"
						x1="84.7061"
						y1="89.647"
						x2="141.177"
						y2="89.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_182"
						x1="13"
						y1="82"
						x2="53"
						y2="82"
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
				blocks: ["core/post-title"],
				transform: (attributes) => {
					return createBlock("combo-blocks/post-title", {
						wrapper: {
							options: {
								tag: "h" + attributes.level,
								class: "pg-post-title",
							},
							styles: {
								display: {
									Desktop: "block",
								},
							},
						},
						abTest: [],
						postTitle: {
							options: {
								tag: "",
								limitBy: "",
								limitCount: 99,
								linkTo: "postUrl",
								linkToAuthorMeta: "",
								linkToCustomMeta: "",
								linkTarget: attributes.linkTarget,
								linkAttr:
									attributes.rel !== null &&
										attributes.rel !== undefined &&
										attributes.rel.length > 0
										? [
											{
												id: "rel",
												val: attributes.rel,
											},
										]
										: [],
								customUrl: "",
								class: "",
							},
							styles: {
								color: {
									Desktop: "#000000",
								},
								fontSize: {
									Desktop: "30px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "700",
								},
								lineHeight: {
									Desktop: "155%",
								},
							},
						},
						prefix: {
							options: {
								text: "",
								class: "prefix",
								position: "beforebegin ",
							},
							styles: {
								color: {
									Desktop: "#000000 !important",
								},
								fontSize: {
									Desktop: "18px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "400",
								},
								margin: {
									Desktop: "0px 10px 0px 0px",
								},
							},
						},
						postfix: {
							options: {
								text: "",
								class: "postfix",
								position: "afterend",
							},
							styles: {
								color: {
									Desktop: "#000000 !important",
								},
								fontSize: {
									Desktop: "18px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "400",
								},
								margin: {
									Desktop: "0px 0px 0px 10px",
								},
							},
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/post-title"],
				transform: (attributes) => {
					var content = attributes.wrapper.options;
					var postTitle = attributes.postTitle.options;
					var numb = content.tag.match(/\d/g);
					if (numb !== null) {
						numb = numb.join("");
					}
					function checkIDExists(idToCheck) {
						return postTitle.linkAttr.some((item) => item.id === idToCheck);
					}
					const relExists = checkIDExists("rel");
					var value = "";
					if (relExists) {
						value = postTitle.linkAttr.find((obj) => obj.id === "rel");
					}
					return createBlock("core/post-title", {
						level: content.tag === ("div" || "span" || "p") ? 2 : numb,
						linkTarget: postTitle.linkTarget,
						rel: relExists ? value.val : null,
						linkTo: "",
					});
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
		let postTitle = attributes.postTitle;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		// var visible = attributes?.visible == "undefined" ? [] : attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var abTest = attributes.abTest;
		var utmTracking = attributes.utmTracking;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);

		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		const [isVisible, setIsVisible] = useState(false);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const { deviceType } = useSelect((select) => {
			const { getPreviewDeviceType } = select("core/editor");
			return {
				deviceType: getPreviewDeviceType,
			};
		}, []);
		var postTitleLinkToBasic = {
			none: { label: __("Choose", "combo-blocks"), value: "" },
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
		let linkToArgs = applyFilters(
			"comboBlocksPostTitleLinkTo",
			postTitleLinkToBasic
		);
		var postTitleLimitByBasic = {
			none: { label: __("Choose..", "combo-blocks"), value: "" },
			word: { label: __("Word", "combo-blocks"), value: "word" },
			character: {
				label: __("Character", "combo-blocks"),
				value: "character",
				isPro: true,
			},
		};
		let limitByArgs = applyFilters(
			"comboBlocksPostTitleLimitBy",
			postTitleLimitByBasic
		);
		var dummyPostTitle = "What is Lorem Ipsum?";
		const [currentPostTitle, setCurrentPostTitle] = liveMode
			? useEntityProp("postType", postType, "title", postId)
			: useState(dummyPostTitle);
		//var [currentPostTitle, setCurrentPostTitle] = useState(dummyPostTitle);

		const [currentPostUrl, setCurrentPostUrl] = liveMode
			? useEntityProp("postType", postType, "link", postId)
			: useState("");
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[postTitleSelector] = postTitle;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
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
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var postTitleSelector = "";
		if (wrapper.options.tag.length != 0) {
			if (postTitle.options.linkTo.length > 0) {
				postTitleSelector = blockClass + " a";
			} else {
				postTitleSelector = blockClass + " .post-title";
			}
		} else {
			postTitleSelector = blockClass + " .post-title";
		}
		function setFieldLinkTo(option, index) {
			var options = { ...postTitle.options, linkTo: option.value };
			setAttributes({ postTitle: { ...postTitle, options: options } });
		}
		function setLimitBy(option, index) {
			var options = { ...postTitle.options, limitBy: option.value };
			setAttributes({ postTitle: { ...postTitle, options: options } });
		}
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";

		const [postTitleEdited, setpostTitleEdited] = useState(currentPostTitle);
		useEffect(() => {
			var count =
				postTitle.options.limitCount > 0 ? postTitle.options.limitCount : 999;
			var currentPostTitleX =
				currentPostTitle != undefined && currentPostTitle.length > 0
					? currentPostTitle
					: dummyPostTitle;
			if (postTitle.options.limitBy == "character") {
				setpostTitleEdited(currentPostTitleX.substring(0, count));
			} else if (postTitle.options.limitBy == "word") {
				setpostTitleEdited(
					currentPostTitleX.split(" ").splice(0, count).join(" ")
				);
			} else {
				setpostTitleEdited(currentPostTitleX);
			}
		}, [postTitle]);
		useEffect(() => {
			var count =
				postTitle.options.limitCount > 0 ? postTitle.options.limitCount : 999;
			var currentPostTitleX =
				currentPostTitle != undefined && currentPostTitle.length > 0
					? currentPostTitle
					: dummyPostTitle;
			if (postTitle.options.limitBy == "character") {
				setpostTitleEdited(currentPostTitleX.substring(0, count));
			} else if (postTitle.options.limitBy == "word") {
				setpostTitleEdited(
					currentPostTitleX.split(" ").splice(0, count).join(" ")
				);
			} else {
				setpostTitleEdited(currentPostTitleX);
			}
		}, [currentPostTitle]);
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
			// if (action == "applyStyle") {
			//
			// 			var wrapper = attributes.wrapper;
			var visible = attributes.visible;
			// 	var postTitle = attributes.postTitle;
			// 	var prefix = attributes.prefix;
			// 	var postfix = attributes.postfix;
			// 	var blockCssY = attributes.blockCssY;
			// 	setAttributes({ wrapper: wrapper });
			// 	setAttributes({ postTitle: postTitle });
			// 	setAttributes({ prefix: prefix });
			// 	// setAttributes({ postfix: postfix });
			// 	setAttributes({ blockCssY: blockCssY });
			// }
			if (action == "applyStyle") {
				// var blockId = attributes.blockId
				var wrapperX = attributes.wrapper;
				var postTitleX = attributes.postTitle;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (postTitleX != undefined) {
					var postTitleY = { ...postTitleX, options: postTitle.options };
					setAttributes({ postTitle: postTitleY });
					blockCssObj[postTitleSelector] = postTitleY;
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
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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
		function onPickCssLibraryPostTitle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postTitle[sudoScource] = sudoScourceArgs;
			});
			var postTitleX = Object.assign({}, postTitle);
			setAttributes({ postTitle: postTitleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postTitleSelector
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
		function onChangeStylePostTitle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postTitle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postTitle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postTitleSelector
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
		function onRemoveStylePostTitle(sudoScource, key) {
			let obj = { ...postTitle };
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
			setAttributes({ postTitle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postTitleSelector
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
		function onAddStylePostTitle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postTitle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postTitle: object });
		}
		function onResetPostTitle(sudoScources) {
			let obj = Object.assign({}, postTitle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postTitleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ postTitle: obj });
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

		function onBulkAddPostTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, postTitle);
			obj[sudoScource] = cssObj;
			setAttributes({ postTitle: obj });
			var selector = myStore.getElementSelector(sudoScource, postTitleSelector);
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			linkAttrObj();
		}, [postTitle]);
		var linkAttrObj = () => {
			var sdsd = {};
			postTitle.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		var postUrl =
			postTitle.options.customUrl != undefined &&
				postTitle.options.customUrl.length > 0
				? postTitle.options.customUrl
				: currentPostUrl;
		if (
			postTitle.options.linkTo != "postUrl" &&
			postTitle.options.linkTo != "customUrl"
		) {
			var postUrl = "#worked-on-frontend";
		}
		const CustomTagWrapper =
			wrapper.options.tag?.length != 0 ? `${wrapper.options.tag}` : "div";
		const CustomTagPostTitle =
			postTitle.options.tag.length != 0 ? `${postTitle.options.tag}` : "span";
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
			if (!isProFeature) {
				var abTestX = [...abTest];
				abTestX.push({ content: "" });
				setAttributes({ abTest: abTestX });
			}
		}
		return (
			<>
				<InspectorControls className=" pg-setting-input-text ">
					<div className=" pg-setting-input-text">
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
							title={__("Post Title", "combo-blocks")}
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
											label="CSS Class"
											placeholder="Add Class"
											value={postTitle.options.class}
											onChange={(newVal) => {
												var options = { ...postTitle.options, class: newVal };
												setAttributes({
													postTitle: {
														styles: postTitle.styles,
														options: options,
													},
												});
											}}
										/>
									</div>

									{postTitle.options.linkTo.length == 0 && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Tag", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={postTitle.options.tag}
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
													var options = { ...postTitle.options, tag: newVal };
													setAttributes({
														postTitle: { ...postTitle, options: options },
													});
												}}
											/>
										</PanelRow>
									)}

									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Link To", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											// variant="secondary"
											options={linkToArgs}
											buttonTitle={
												postTitle.options.linkTo == undefined ||
													postTitle.options.linkTo.length == 0
													? __("Choose", "combo-blocks")
													: linkToArgs[postTitle.options.linkTo] == undefined
														? __("Choose", "combo-blocks")
														: linkToArgs[postTitle.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>

									{postTitle.options.linkTo.length > 0 && (
										<>
											{/* <div className="bg-gray-500 p-2 my-3 text-white">
												{linkToArgs[postTitle.options.linkTo] != undefined
													? linkToArgs[postTitle.options.linkTo].label
													: ""}
											</div> */}
											{postTitle.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900  pg-font  ">
														{__("Author Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={postTitle.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...postTitle.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																postTitle: { ...postTitle, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{postTitle.options.linkTo == "customField" && (
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900  pg-font  ">
														{__("Custom Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={postTitle.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...postTitle.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																postTitle: { ...postTitle, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{postTitle.options.linkTo == "customUrl" && (
												<>
													<PanelRow>
														<label
															htmlFor=""
															className="font-medium text-slate-900  pg-font  ">
															{__("Custom Url", "combo-blocks")}
														</label>
														<div className="relative">
															<Button
																className={
																	linkPickerPosttitle ? "!bg-gray-400" : ""
																}
																icon={link}
																onClick={(ev) => {
																	setLinkPickerPosttitle((prev) => !prev);
																}}></Button>
															{postTitle.options.customUrl.length > 0 && (
																<Button
																	className="!text-red-500 ml-2"
																	icon={linkOff}
																	onClick={(ev) => {
																		var options = {
																			...postTitle.options,
																			customUrl: "",
																		};
																		setAttributes({
																			postTitle: {
																				...postTitle,
																				options: options,
																			},
																		});
																		setLinkPickerPosttitle(false);
																	}}></Button>
															)}
															{linkPickerPosttitle && (
																<Popover position="bottom right">
																	<LinkControl
																		settings={[]}
																		value={postTitle.options.customUrl}
																		onChange={(newVal) => {
																			var options = {
																				...postTitle.options,
																				customUrl: newVal.url,
																			};
																			setAttributes({
																				postTitle: {
																					...postTitle,
																					options: options,
																				},
																			});
																		}}
																	/>
																	<div className="p-2">
																		<span className="font-bold">
																			Linked to:
																		</span>{" "}
																		{postTitle.options.customUrl.length != 0
																			? postTitle.options.customUrl
																			: __("No link", "combo-blocks")}{" "}
																	</div>
																</Popover>
															)}
														</div>
													</PanelRow>
													{postTitle.options.customUrl.length > 0 && (
														<div className="p-2 pl-0 truncate ">
															<span className="font-bold">
																{__("Linked to:", "combo-blocks")}
															</span>{" "}
															{postTitle.options.customUrl}
														</div>
													)}
												</>
											)}
											<PanelRow className="pg-setting-select">
												<label
													for=""
													className="font-medium text-slate-900 pg-font  ">
													{__("Link Target", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={postTitle.options.linkTarget}
													options={[
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...postTitle.options,
															linkTarget: newVal,
														};
														setAttributes({
															postTitle: { ...postTitle, options: options },
														});
													}}
												/>
											</PanelRow>
										</>
									)}
									{postTitle.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label
													for=""
													className="font-medium text-slate-900 pg-font  ">
													{__("Custom Attributes", "combo-blocks")}
												</label>
												<div
													className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														var sdsd = postTitle.options.linkAttr.concat({
															id: "",
															val: "",
														});
														var options = {
															...postTitle.options,
															linkAttr: sdsd,
														};
														setAttributes({
															postTitle: { ...postTitle, options: options },
														});
														linkAttrObj();
													}}>
													{__("Add", "combo-blocks")}
												</div>
											</PanelRow>
											{postTitle.options.linkAttr.map((x, i) => {
												return (
													<div className="my-2">
														<PanelRow>
															<InputControl
																placeholder="Name"
																className="mr-2"
																value={postTitle.options.linkAttr[i].id}
																onChange={(newVal) => {
																	postTitle.options.linkAttr[i].id = newVal;
																	var ssdsd = postTitle.options.linkAttr.concat(
																		[]
																	);
																	var options = {
																		...postTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		postTitle: {
																			...postTitle,
																			options: options,
																		},
																	});
																}}
															/>
															<InputControl
																placeholder="Value"
																className="mr-2"
																value={x.val}
																onChange={(newVal) => {
																	postTitle.options.linkAttr[i].val = newVal;
																	var ssdsd = postTitle.options.linkAttr.concat(
																		[]
																	);
																	var options = {
																		...postTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		postTitle: {
																			...postTitle,
																			options: options,
																		},
																	});
																}}
															/>
															<span
																// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	postTitle.options.linkAttr.splice(i, 1);
																	var ssdsd = postTitle.options.linkAttr.concat(
																		[]
																	);
																	var options = {
																		...postTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		postTitle: {
																			...postTitle,
																			options: options,
																		},
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
									<PanelRow>
										<label
											for=""
											className="font-medium text-slate-900 pg-font  ">
											{__("Limit By", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											btnClass="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											// variant="secondary"
											options={limitByArgs}
											buttonTitle="Choose"
											onChange={setLimitBy}
											values={[]}></PGDropdown>
									</PanelRow>
									{postTitle.options.limitBy.length > 0 && (
										<div className="bg-gray-500 my-3 text-white p-2">
											{limitByArgs[postTitle.options.limitBy].label}
										</div>
									)}
									{(postTitle.options.limitBy == "word" ||
										postTitle.options.limitBy == "character") && (
											<PanelRow>
												<label htmlFor="" className="font-medium text-slate-900 ">
													{__("Limit Count", "combo-blocks")}
												</label>
												<InputControl
													value={postTitle.options.limitCount}
													onChange={(newVal) => {
														var options = {
															...postTitle.options,
															limitCount: newVal,
														};
														setAttributes({
															postTitle: { ...postTitle, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postTitle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												postTitle,
												"postTitle",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												postTitle,
												"postTitle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												postTitle,
												"postTitle",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												postTitle,
												"postTitle",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												postTitle,
												"postTitle",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postTitle}
										onChange={onPickCssLibraryPostTitle}
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
									<PanelRow className="pg-setting-select">
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
									</PanelRow>
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
									<PanelRow className="pg-setting-select">
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
									</PanelRow>
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
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("A/B Test", "combo-blocks")}</span>
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
							<div className="px-3 py-2 rounded bg-yellow-200 text-gray-400 text-xs pg-font ">
								{__(
									"A/B Test may not work if cache is enable on the page. Please make as Non cacheable",
									"combo-blocks"
								)}
							</div>
							<PanelRow>
								<div
									className={` ${isVisible ? "pb-6" : ""
										} transition-all duration-200 w-full flex justify-between items-center relative`}>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("A/B Test Text", "combo-blocks")}
									</label>
									<button
										onClick={(ev) => {
											addMedia();
											if (isProFeature) {
												setIsVisible(!isVisible);
											}
										}}
										className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700">
										Add
									</button>
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
							<ReactSortable
								list={abTest}
								handle={".handle"}
								setList={(item) => {
									// var nthItemStyleX = [...nthItemStyle];
									// setAttributes({ nthItemStyle: { ...nthItemStyle, nthItemStyle: item } });
								}}>
								{abTest.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var abTestX = [...abTest];
															abTestX.splice(index, 1);
															setAttributes({
																abTest: abTestX,
															});
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>
													<span className="mx-2">
														{abTest[index].content.length > 0
															? abTest[index].content
															: index + 1}
													</span>
												</>
											}
											initialOpen={false}>
											<div>
												<label htmlFor="">Title - {index + 1}</label>
												<InputControl
													value={item.content}
													onChange={(newVal) => {
														var abTestX = [...abTest];
														abTestX[index].content = newVal;
														setAttributes({
															abTest: abTestX,
														});
													}}
												/>
											</div>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
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

				<CustomTagWrapper {...blockProps}>
					{prefix.options.position == "afterbegin" && prefix.options.text && (
						<span className={prefix.options.class}>{prefixText}</span>
					)}
					{postTitle.options.linkTo.length > 0 && (
						<a
							onClick={handleLinkClick}
							{...linkAttrItems}
							href={postUrl}
							className={postTitle.options.class}
							target={postTitle.options.linkTarget}>
							{prefix.options.position == "beforebegin" &&
								prefix.options.text && (
									<span className={prefix.options.class}>{prefixText}</span>
								)}
							{postTitleEdited}
							{postfix.options.position == "afterend" &&
								postfix.options.text && (
									<span className={postfix.options.class}>{postfixText}</span>
								)}
						</a>
					)}
					{!postTitle.options.linkTo.length > 0 && (
						<CustomTagPostTitle className="post-title">
							{prefix.options.position == "beforebegin" &&
								prefix.options.text && (
									<span className={prefix.options.class}>{prefixText}</span>
								)}
							{postTitleEdited}
							{postfix.options.position == "afterend" &&
								postfix.options.text && (
									<span className={postfix.options.class}>{postfixText}</span>
								)}
						</CustomTagPostTitle>
					)}
					{postfix.options.position == "beforeend" && postfix.options.text && (
						<span className={postfix.options.class}>{postfixText}</span>
					)}
				</CustomTagWrapper>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
