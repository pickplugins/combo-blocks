import apiFetch from "@wordpress/api-fetch";
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
	Spinner,
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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_194)"
				/>
				<path
					d="M160 57H84.7061V66.4118H160V57Z"
					fill="url(#paint1_linear_61_194)"
				/>
				<path d="M160 75.8823H85V84.8823H160V75.8823Z" fill="#C15940" />
				<path d="M131 94.8823H85V103.882H131V94.8823Z" fill="#C15940" />
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="url(#paint2_linear_61_194)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_194"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_194"
						x1="84.7061"
						y1="61.7059"
						x2="160"
						y2="61.7059"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_194"
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
				blocks: ["core/post-excerpt"],
				transform: (attributes) => {
					return createBlock("combo-blocks/post-excerpt", {
						wrapper: {
							options: {
								tag: "div",
								class: "pg-post-excerpt",
							},
							styles: {
								display: {
									Desktop: "block",
								},
							},
						},
						postExcerpt: {
							options: {
								tag: "p",
								text: "",
								limitBy: "word",
								limitCount: attributes.excerptLength,
								excerptSource: "auto",
								excerptSourceMeta: "",
								removeBlocks: true,
								removeShortcodes: true,
								keepHtml: false,
								removeEmbeds: true,
								autoP: false,
								isLink: false,
								linkTarget: "_blank",
								customUrl: "",
								linkAttr: [],
								class: "excerpt-text",
							},
							styles: {
								color: {
									Desktop: "#000000 !important",
								},
								display: {
									Desktop: attributes.showMoreOnNewLine ? "block" : "inline",
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
							},
						},
						readMore: {
							options: {
								enable: attributes.moreText ? true : false,
								text: attributes.moreText,
								isLink: true,
								linkTarget: "_blank",
								customUrl: "",
								linkAttr: [],
								class: "readmore",
							},
							styles: {
								display: {
									Desktop: "inline-block",
								},
								color: {
									Desktop: "#1F2E45",
								},
								margin: {
									Desktop: "0px 0px 0px 6px",
								},
								fontSize: {
									Desktop: "18px",
								},

								fontStyle: {
									Desktop: "normal",
								},
								fontWeight: {
									Desktop: "600",
								},
							},
						},
						prefix: {
							options: {
								text: "",
								class: "prefix",
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
				blocks: ["core/post-excerpt"],
				transform: (attributes) => {
					var content = attributes.postExcerpt;
					var readMore = attributes.readMore.options;
					return createBlock("core/post-excerpt", {
						excerptLength: content.options?.limitCount,
						moreText: readMore.enable ? readMore.text : null,
						showMoreOnNewLine:
							content.styles?.display?.Desktop == "block" ||
								content.styles?.display?.Desktop == "inline-block"
								? true
								: false,
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
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var postExcerpt = attributes.postExcerpt;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var readMore = attributes.readMore;
		var linkAttr = attributes.linkAttr;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		var dummyPostExcerpt =
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [isLoading, setisLoading] = useState(false);
		const [currentPostExcerpt, setCurrentpostExcerpt] = liveMode
			? useEntityProp("postType", postType, "excerpt", postId)
			: useState(dummyPostExcerpt);
		const [currentPostContent, setCurrentpostContent] = liveMode
			? useEntityProp("postType", postType, "content", postId)
			: useState("");
		const [customFields, setCustomFields] = useState({});
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [linkPickerReadMore, setLinkPickerReadMore] = useState(false);
		const [currentPostUrl, setCurrentPostUrl] = liveMode
			? useEntityProp("postType", postType, "link", postId)
			: useState("");
		var postExcerptLinkToBasic = {
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
			"comboBlocksPostExcerptLinkTo",
			postExcerptLinkToBasic
		);
		var postExcerptReadMoreLinkToBasic = {
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
		let linkToArgsReadMore = applyFilters(
			"comboBlocksPostExcerptReadMoreLinkTo",
			postExcerptReadMoreLinkToBasic
		);
		var limitByArgsBasic = {
			none: { label: __("Choose..", "combo-blocks"), value: "none" },
			word: { label: __("Word", "combo-blocks"), value: "word" },
			character: {
				label: __("Character", "combo-blocks"),
				value: "character",
				isPro: true,
			},
		};
		let limitByArgs = applyFilters("limitByArgs", limitByArgsBasic);
		var excerptSourceArgsBasic = {
			auto: { label: __("Auto", "combo-blocks"), value: "auto" },
			excerpt: { label: __("Excerpt", "combo-blocks"), value: "excerpt" },
			content: { label: __("Content", "combo-blocks"), value: "content" },
			meta: {
				label: __("Custom Fields", "combo-blocks"),
				value: "meta",
				isPro: true,
			},
		};
		let excerptSourceArgs = applyFilters(
			"excerptSourceArgs",
			excerptSourceArgsBasic
		);
		function setFieldLinkTo(option, index) {
			var options = { ...postExcerpt.options, linkTo: option.value };
			setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
		}
		function setReadMoreLinkTo(option, index) {
			var options = { ...readMore.options, linkTo: option.value };
			setAttributes({ readMore: { ...readMore, options: options } });
		}
		function setLimitBy(option, index) {
			var options = { ...postExcerpt.options, limitBy: option.value };
			setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
		}
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var excerptSelector = "";
		const readmoreSelector = blockClass + " .readmore";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		if (wrapper.options?.tag.length != 0) {
			if (postExcerpt.options?.isLink) {
				excerptSelector = blockClass + " .excerpt-text";
			} else {
				if (postExcerpt.options?.tag.length > 0) {
					excerptSelector = blockClass + " .excerpt-text";
				} else {
					excerptSelector = blockClass;
				}
			}
		} else {
			excerptSelector = blockClass;
		}
		function getMetaField(metaKey) {
			apiFetch({
				path: "/combo-blocks/v2/get_post_meta",
				method: "POST",
				data: { postId: postId, meta_key: metaKey },
			}).then((res) => {
				if (res["meta_value"] != undefined && res["meta_value"].length > 0) {
					customFields[metaKey] = res["meta_value"];
					setCustomFields({});
					setCustomFields(customFields);
				}
			});
		}
		useEffect(() => {
			var excerptSource = postExcerpt.options?.excerptSource;
			var excerptSourceMeta = postExcerpt.options?.excerptSourceMeta;
			if (excerptSource == "meta" && excerptSourceMeta.length > 0) {
				var response = getMetaField(excerptSourceMeta);
			}
		}, [postExcerpt]);
		const [postExcerptEdited, setPostExcerptEdited] =
			useState(currentPostExcerpt);
		//const [postContentEdited, setPostContentEdited] = useState(currentPostContent);
		useEffect(() => {
			//setisLoading(true);
			var excerptSource = postExcerpt.options?.excerptSource;
			var excerptText = "";
			if (excerptSource == "auto") {
				excerptText =
					currentPostExcerpt != undefined && currentPostExcerpt.length > 0
						? currentPostExcerpt
						: "";
			} else if (excerptSource == "excerpt") {
				excerptText = currentPostExcerpt;
			} else if (excerptSource == "content") {
				excerptText = "";
			} else if (excerptSource == "meta") {
				var excerptSourceMeta = postExcerpt.options?.excerptSourceMeta;
				setTimeout(() => {
					excerptText = customFields[excerptSourceMeta]
						? customFields[excerptSourceMeta]
						: "";
				}, 100);
			}
			excerptText =
				excerptText.length > 0
					? excerptText
					: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
			if (!postExcerpt.options?.keepHtml) {
				excerptText = excerptText.replace(/<[^>]*>?/gm, "");
			}
			setTimeout(() => {
				var count =
					postExcerpt.options?.limitCount > 0
						? postExcerpt.options?.limitCount
						: 999;
				if (postExcerpt.options?.limitBy == "character") {
					setPostExcerptEdited(excerptText.substring(0, count));
				} else if (postExcerpt.options?.limitBy == "word") {
					setPostExcerptEdited(
						excerptText.split(" ").splice(0, count).join(" ")
					);
				} else {
					setPostExcerptEdited(excerptText);
				}
				//setisLoading(false);
			}, 100);
		}, [postExcerpt, currentPostExcerpt]);
		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerReadmore, setLinkPickerReadmore] = useState(false);
		// useEffect(() => {
		// 	setAttributes({ blockId: blockIdX });
		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [clientId]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[excerptSelector] = postExcerpt;
			blockCssObj[readmoreSelector] = readMore;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
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
				var postExcerptX = attributes.postExcerpt;
				var readMoreX = attributes.readMore;
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
				if (readMoreX != undefined) {
					var readMoreY = { ...readMoreX, options: readMore.options };
					setAttributes({ readMore: readMoreY });
					blockCssObj[readmoreSelector] = readMoreY;
				}
				if (postExcerptX != undefined) {
					var postExcerptY = { ...postExcerptX, options: postExcerpt.options };
					setAttributes({ postExcerpt: postExcerptY });
					blockCssObj[excerptSelector] = postExcerptY;
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
		function onPickCssLibraryPostExcerpt(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postExcerpt[sudoScource] = sudoScourceArgs;
			});
			var postExcerptX = Object.assign({}, postExcerpt);
			setAttributes({ postExcerpt: postExcerptX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					excerptSelector
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
		function onPickCssLibraryReadmore(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				readMore[sudoScource] = sudoScourceArgs;
			});
			var readMoreX = Object.assign({}, readMore);
			setAttributes({ readMore: readMoreX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					readmoreSelector
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
		function onRemoveStylePostExcerpt(sudoScource, key) {
			let obj = { ...postExcerpt };
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
			setAttributes({ postExcerpt: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				excerptSelector
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
		function onRemoveStyleReadmore(sudoScource, key) {
			let obj = { ...readMore };
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
			setAttributes({ readMore: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				readmoreSelector
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
		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStylePostExcerpt(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postExcerpt);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postExcerpt: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				excerptSelector
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
		function onRemoveStylePostExcerpt(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postExcerpt, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postExcerpt: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				excerptSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
			var sudoScourceX = { ...postExcerpt[sudoScource] };
			if (sudoScourceX[key] != undefined) {
				delete sudoScourceX[key];
			}
			postExcerpt[sudoScource] = sudoScourceX;
			setAttributes({ postExcerpt: { ...postExcerpt } });
			if (blockCssY.items[excerptSelector] == undefined) {
				blockCssY.items[excerptSelector] = {};
			}
			Object.entries(sudoScourceX).map((args) => {
				var argAttr = myStore.cssAttrParse(args[0]);
				var argAttrVal = args[1];
				blockCssY.items[excerptSelector][argAttr] = argAttrVal;
			});
			if (blockCssY.items[excerptSelector][key] != undefined) {
				delete blockCssY.items[excerptSelector][key];
			}
			setAttributes({ blockCssY: { items: blockCssY.items } });
		}
		function onAddStylePostExcerpt(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postExcerpt);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postExcerpt: object });
		}
		function onChangeStyleReadmore(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, readMore);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ readMore: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				readmoreSelector
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
		function onAddStyleReadmore(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, readMore);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ readMore: object });
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
		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
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
		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
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
		function onBulkAddPostExcerpt(sudoScource, cssObj) {
			let obj = Object.assign({}, postExcerpt);
			obj[sudoScource] = cssObj;
			setAttributes({ postExcerpt: obj });
			var selector = myStore.getElementSelector(sudoScource, excerptSelector);
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
		function onBulkAddReadmore(sudoScource, cssObj) {
			let obj = Object.assign({}, readMore);
			obj[sudoScource] = cssObj;
			setAttributes({ readMore: obj });
			var selector = myStore.getElementSelector(sudoScource, readmoreSelector);
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
		function onResetPostExcerpt(sudoScources) {
			let obj = Object.assign({}, postExcerpt);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						excerptSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ postExcerpt: obj });
		}
		function onResetReadMore(sudoScources) {
			let obj = Object.assign({}, readMore);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						readmoreSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ readMore: obj });
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		var [linkAttrItemsReadmore, setlinkAttrItemsReadmore] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var sdsd = {};
			postExcerpt.options?.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		}, [postExcerpt]);
		useEffect(() => {
			var sdsd = {};
			readMore.options?.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItemsReadmore(sdsd);
		}, [readMore]);
		var postUrl =
			postExcerpt.options?.customUrl != undefined &&
				postExcerpt.options?.customUrl.length > 0
				? postExcerpt.options?.customUrl
				: currentPostUrl;
		const CustomTagX = `${wrapper.options?.tag}`;
		const CustomTagExcerpt = `${postExcerpt.options?.tag}`;
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options?.class} `,
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
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options?.class}
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
											value={wrapper.options?.tag}
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
							title={__("Post Excerpt", "combo-blocks")}
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
											for=""
											className="font-medium text-slate-900  pg-font  ">
											{__("Link To", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											// variant="secondary"
											options={linkToArgs}
											buttonTitle={
												postExcerpt.options?.linkTo == undefined ||
													postExcerpt.options?.linkTo?.length == 0
													? __("Choose", "combo-blocks")
													: linkToArgs[postExcerpt.options?.linkTo] == undefined
														? __("Choose", "combo-blocks")
														: linkToArgs[postExcerpt.options?.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>
									{postExcerpt.options?.linkTo == "authorMeta" && (
										<PanelRow>
											<label
												for=""
												className="font-medium text-slate-900  pg-font  ">
												{__("Author Meta Key", "combo-blocks")}
											</label>
											<InputControl
												value={postExcerpt.options?.linkToAuthorMeta}
												onChange={(newVal) => {
													var options = {
														...postExcerpt.options,
														linkToAuthorMeta: newVal,
													};
													setAttributes({
														postExcerpt: { ...postExcerpt, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									{postExcerpt.options?.linkTo == "customField" && (
										<PanelRow>
											<label
												for=""
												className="font-medium text-slate-900  pg-font  ">
												{__("Custom Meta Key", "combo-blocks")}
											</label>
											<InputControl
												value={postExcerpt.options?.linkToCustomMeta}
												onChange={(newVal) => {
													var options = {
														...postExcerpt.options,
														linkToCustomMeta: newVal,
													};
													setAttributes({
														postExcerpt: { ...postExcerpt, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									{postExcerpt.options?.linkTo == "customUrl" && (
										<PanelRow>
											<label
												for=""
												className="font-medium text-slate-900  pg-font  ">
												{__("Custom URL", "combo-blocks")}
											</label>
											<div className="relative">
												<Button
													className={linkPickerPosttitle ? "!bg-gray-400" : ""}
													icon={link}
													onClick={(ev) => {
														setLinkPickerPosttitle((prev) => !prev);
													}}></Button>
												{postExcerpt.options?.customUrl.length > 0 && (
													<Button
														className="!text-red-500 ml-2"
														icon={linkOff}
														onClick={(ev) => {
															var options = {
																...postExcerpt.options,
																customUrl: "",
															};
															setAttributes({
																postExcerpt: {
																	...postExcerpt,
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
															value={postExcerpt.options?.customUrl}
															onChange={(newVal) => {
																var options = {
																	...postExcerpt.options,
																	customUrl: newVal.url,
																};
																setAttributes({
																	postExcerpt: {
																		...postExcerpt,
																		options: options,
																	},
																});
															}}
														/>
														<div className="p-2">
															<span className="font-bold">Linked to:</span>{" "}
															{postExcerpt.options?.customUrl.length != 0
																? postExcerpt.options?.customUrl
																: __("No link", "combo-blocks")}{" "}
														</div>
													</Popover>
												)}
											</div>
										</PanelRow>
									)}
									{/* <ToggleControl
										label="Linked with post?"
										help={
											postExcerpt.options?.isLink
												? "Linked with post URL"
												: "Not linked to post URL."
										}
										checked={postExcerpt.options?.isLink ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												isLink: postExcerpt.options?.isLink ? false : true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/> */}
									{postExcerpt.options?.linkTo !== undefined &&
										postExcerpt.options?.linkTo?.length == 0 && (
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Tag", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={postExcerpt.options?.tag}
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
														var options = {
															...postExcerpt.options,
															tag: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
									{postExcerpt.options?.linkTo !== undefined &&
										postExcerpt.options?.linkTo?.length > 0 && (
											<div>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Link Target", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={postExcerpt.options?.linkTarget}
														options={[
															{ label: "_self", value: "_self" },
															{ label: "_blank", value: "_blank" },
															{ label: "_parent", value: "_parent" },
															{ label: "_top", value: "_top" },
														]}
														onChange={(newVal) => {
															var options = {
																...postExcerpt.options,
																linkTarget: newVal,
															};
															setAttributes({
																postExcerpt: {
																	...postExcerpt,
																	options: options,
																},
															});
														}}
													/>
												</PanelRow>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Attributes", "combo-blocks")}
													</label>
													<div
														// className=" cursor-pointer px-3 text-white py-1 bg-gray-700 hover:bg-gray-600"
														className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														onClick={(ev) => {
															var sdsd =
																postExcerpt.options?.linkAttr != undefined
																	? postExcerpt.options?.linkAttr.concat({
																		id: "",
																		val: "",
																	})
																	: [];
															var options = {
																...postExcerpt.options,
																linkAttr: sdsd,
															};
															setAttributes({
																postExcerpt: {
																	...postExcerpt,
																	options: options,
																},
															});
														}}>
														{__("Add", "combo-blocks")}
													</div>
												</PanelRow>
												{postExcerpt.options?.linkAttr != undefined &&
													postExcerpt.options?.linkAttr.map((x, i) => {
														return (
															<div className="my-2">
																<PanelRow>
																	<InputControl
																		placeholder="Name"
																		className="mr-2"
																		value={postExcerpt.options.linkAttr[i].id}
																		onChange={(newVal) => {
																			postExcerpt.options.linkAttr[i].id =
																				newVal;
																			var ssdsd =
																				postExcerpt.options?.linkAttr.concat(
																					[]
																				);
																			var options = {
																				...postExcerpt.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				postExcerpt: {
																					...postExcerpt,
																					options: options,
																				},
																			});
																		}}
																	/>
																	<InputControl
																		className="mr-2"
																		placeholder="Value"
																		value={x.val}
																		onChange={(newVal) => {
																			postExcerpt.options.linkAttr[i].val =
																				newVal;
																			var ssdsd =
																				postExcerpt.options.linkAttr.concat([]);
																			var options = {
																				...postExcerpt.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				postExcerpt: {
																					...postExcerpt,
																					options: options,
																				},
																			});
																		}}
																	/>
																	<span
																		className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																		onClick={(ev) => {
																			postExcerpt.options?.linkAttr.splice(
																				i,
																				1
																			);
																			var ssdsd =
																				postExcerpt.options?.linkAttr.concat(
																					[]
																				);
																			var options = {
																				...postExcerpt.options,
																				linkAttr: ssdsd,
																			};
																			setAttributes({
																				postExcerpt: {
																					...postExcerpt,
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
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Limit By", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											btnClass="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											// variant="secondary"
											options={limitByArgs}
											// buttonTitle="Choose"
											buttonTitle={
												postExcerpt.options?.limitBy == undefined
													? __("Choose", "combo-blocks")
													: limitByArgs[postExcerpt.options?.limitBy] ==
														undefined
														? __("Choose", "combo-blocks")
														: limitByArgs[postExcerpt.options?.limitBy].label
											}
											onChange={setLimitBy}
											values={[]}></PGDropdown>
									</PanelRow>
									{(postExcerpt.options?.limitBy == "word" ||
										postExcerpt.options?.limitBy == "character") && (
											<PanelRow>
												<label htmlFor="" className="font-medium text-slate-900 ">
													{__("Limit Count", "combo-blocks")}
												</label>
												<InputControl
													value={postExcerpt.options?.limitCount}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															limitCount: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
									<PanelRow className="my-3">
										<label>{__("Excerpt Source", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												postExcerpt.options?.excerptSource.length == 0
													? __("Choose", "combo-blocks")
													: postExcerpt.options?.excerptSource
											}
											options={excerptSourceArgs}
											onChange={(option, index) => {
												var options = {
													...postExcerpt.options,
													excerptSource: option.value,
												};
												setAttributes({
													postExcerpt: { ...postExcerpt, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{postExcerpt.options?.excerptSource == "excerpt" &&
										currentPostExcerpt?.length == 0 && (
											<div className="text-red-500">Post Excerpt is empty.</div>
										)}
									{postExcerpt.options?.excerptSource == "meta" && (
										<div>
											<PanelRow className="my-4">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Meta Field", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={postExcerpt.options?.excerptSourceMeta}
													options={[
														{ label: __("Custom", "combo-blocks"), value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															excerptSourceMeta: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Meta Key", "combo-blocks")}
												</label>
												<InputControl
													value={postExcerpt.options?.excerptSourceMeta}
													onChange={(newVal) => {
														var options = {
															...postExcerpt.options,
															excerptSourceMeta: newVal,
														};
														setAttributes({
															postExcerpt: { ...postExcerpt, options: options },
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									<ToggleControl
										className="my-4"
										label={__("Remove Blocks?", "combo-blocks")}
										help={
											postExcerpt.options?.removeBlocks
												? __("Blocks will be removed", "combo-blocks")
												: __("Blocks may output with excerpt.", "combo-blocks")
										}
										checked={postExcerpt.options?.removeBlocks ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												removeBlocks: postExcerpt.options?.removeBlocks
													? false
													: true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>
									<ToggleControl
										className="my-4"
										label={__("Remove Shortcodes?", "combo-blocks")}
										help={
											postExcerpt.options?.removeShortcodes
												? __("Shortcodes will be removed", "combo-blocks")
												: __("Shortcodes may output with excerpt.", "combo-blocks")
										}
										checked={
											postExcerpt.options?.removeShortcodes ? true : false
										}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												removeShortcodes: postExcerpt.options?.removeShortcodes
													? false
													: true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>
									<div className="flex justify-between items-center gap-2">
										<ToggleControl
											className="my-4"
											label="Keep HTML?"
											help={
												postExcerpt.options?.keepHtml
													? __("HTML may output with excerpt.", "combo-blocks")
													: __("HTML will be removed", "combo-blocks")
											}
											checked={postExcerpt.options?.keepHtml ? true : false}
											onChange={(e) => {
												var options = {
													...postExcerpt.options,
													keepHtml: postExcerpt.options?.keepHtml
														? false
														: true,
												};
												if (isProFeature) {
													alert(
														"This feature is only available in Pro Version."
													);
													return;
												}
												setAttributes({
													postExcerpt: { ...postExcerpt, options: options },
												});
											}}
										/>
										{isProFeature && (
											<a
												target="_blank"
												href={
													"https://comboblocks.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium=search"
												}
												className="bg-gray-700 rounded-sm px-3 inline-block cursor-pointer py-1 no-underline text-white hover:text-white">
												{__("Pro", "combo-blocks")}
											</a>
										)}
									</div>
									<ToggleControl
										className="my-4"
										label="Enable wpautop()?"
										help={
											postExcerpt.options?.autoP
												? __("wpautop function will be applied", "combo-blocks")
												: __(
													"wpautop function will not be applied.",
													"combo-blocks"
												)
										}
										checked={postExcerpt.options?.autoP ? true : false}
										onChange={(e) => {
											var options = {
												...postExcerpt.options,
												autoP: postExcerpt.options?.autoP ? false : true,
											};
											setAttributes({
												postExcerpt: { ...postExcerpt, options: options },
											});
										}}
									/>
									{/* <ToggleControl className='my-4'
                    label="Remove Embeds?"
                    help={postExcerpt.options?.removeEmbeds ? 'Embeded will be removed' : 'Embeded may output with excerpt.'}
                    checked={postExcerpt.options?.removeEmbeds ? true : false}
                    onChange={(e) => {
                      var options = { ...postExcerpt.options, removeEmbeds: postExcerpt.options?.removeEmbeds ? false : true, };
                      setAttributes({ postExcerpt: { ...postExcerpt, options: options } });
                    }}
                  /> */}
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={postExcerpt.options?.class}
										onChange={(newVal) => {
											var options = { ...postExcerpt.options, class: newVal };
											setAttributes({
												postExcerpt: {
													styles: postExcerpt.styles,
													options: options,
												},
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postExcerpt}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												postExcerpt,
												"postExcerpt",
												postExcerptSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												postExcerpt,
												"postExcerpt",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												postExcerpt,
												"postExcerpt",
												postExcerptSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												postExcerpt,
												"postExcerpt",
												postExcerptSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												postExcerpt,
												"postExcerpt",
												postExcerptSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postExcerpt}
										onChange={onPickCssLibraryPostExcerpt}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Read More", "combo-blocks")}
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
										label={__("Enable Read more?", "combo-blocks")}
										help={
											readMore.options?.enable
												? __("Read more enabled", "combo-blocks")
												: __("Read more disabled.", "combo-blocks")
										}
										checked={readMore.options?.enable ? true : false}
										onChange={(e) => {
											var options = {
												...readMore.options,
												enable: readMore.options?.enable ? false : true,
											};
											setAttributes({
												readMore: { ...readMore, options: options },
											});
										}}
									/>
									{readMore.options?.enable && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Read More Text", "combo-blocks")}
												</label>
												<InputControl
													value={readMore.options?.text}
													onChange={(newVal) => {
														var options = { ...readMore.options, text: newVal };
														setAttributes({
															readMore: { ...readMore, options: options },
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label
													for=""
													className="font-medium text-slate-900  pg-font  ">
													{__("Link To", "combo-blocks")}
												</label>
												<PGDropdown
													position="bottom right"
													// variant="secondary"
													options={linkToArgsReadMore}
													buttonTitle={
														readMore.options?.linkTo == undefined ||
															readMore.options?.linkTo?.length == 0
															? __("Choose", "combo-blocks")
															: linkToArgsReadMore[readMore.options?.linkTo] ==
																undefined
																? __("Choose", "combo-blocks")
																: linkToArgsReadMore[readMore.options?.linkTo]
																	.label
													}
													onChange={setReadMoreLinkTo}
													values={[]}></PGDropdown>
											</PanelRow>
											{readMore.options?.linkTo == "authorMeta" && (
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900  pg-font  ">
														{__("Author Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={readMore.options?.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...readMore.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																readMore: { ...readMore, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{readMore.options?.linkTo == "customField" && (
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900  pg-font  ">
														{__("Custom Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={readMore.options?.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...readMore.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																readMore: { ...readMore, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{readMore.options?.linkTo == "customUrl" && (
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900  pg-font  ">
														{__("Custom Url", "combo-blocks")}
													</label>
													<div className="relative">
														<Button
															className={
																linkPickerReadMore ? "!bg-gray-400" : ""
															}
															icon={link}
															onClick={(ev) => {
																setLinkPickerReadMore((prev) => !prev);
															}}></Button>
														{readMore.options?.customUrl.length > 0 && (
															<Button
																className="!text-red-500 ml-2"
																icon={linkOff}
																onClick={(ev) => {
																	var options = {
																		...readMore.options,
																		customUrl: "",
																	};
																	setAttributes({
																		readMore: {
																			...readMore,
																			options: options,
																		},
																	});
																	setLinkPickerReadMore(false);
																}}></Button>
														)}
														{linkPickerReadMore && (
															<Popover position="bottom right">
																<LinkControl
																	settings={[]}
																	value={readMore.options?.customUrl}
																	onChange={(newVal) => {
																		var options = {
																			...readMore.options,
																			customUrl: newVal.url,
																		};
																		setAttributes({
																			readMore: {
																				...readMore,
																				options: options,
																			},
																		});
																	}}
																/>
																<div className="p-2">
																	<span className="font-bold">Linked to:</span>{" "}
																	{readMore.options?.customUrl.length != 0
																		? readMore.options?.customUrl
																		: __("No link", "combo-blocks")}{" "}
																</div>
															</Popover>
														)}
													</div>
												</PanelRow>
											)}
											<PGcssClassPicker
												tags={customTags}
												label="CSS Class"
												placeholder="Add Class"
												value={readMore.options?.class}
												onChange={(newVal) => {
													var options = { ...readMore.options, class: newVal };
													setAttributes({
														readMore: {
															styles: readMore.styles,
															options: options,
														},
													});
												}}
											/>
										</>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={readMore}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												readMore,
												"readMore",
												readmoreSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												readMore,
												"readMore",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												readMore,
												"readMore",
												readmoreSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												readMore,
												"readMore",
												readmoreSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												readMore,
												"readMore",
												readmoreSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={readMore}
										onChange={onPickCssLibraryReadmore}
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
										placeholder="Add Class"
										value={prefix.options?.text}
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
										placeholder="Add Class"
										value={postfix.options?.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
									{/* <PanelRow>
									<label htmlFor=""  className="font-medium text-slate-900 " >Postfix</label>
									<InputControl
										value={postfix.options?.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
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
					{isLoading && <Spinner />}
					{wrapper.options?.tag && (
						<CustomTagX {...blockProps}>
							{postExcerpt.options?.linkTo !== undefined &&
								postExcerpt.options?.linkTo?.length > 0 && (
									<a
										className={postExcerpt.options?.class}
										onClick={handleLinkClick}
										{...linkAttrItems}
										href={postUrl}>
										{prefix.options?.text && (
											<span className={prefix.options?.class}>
												{prefix.options?.text}
											</span>
										)}
										{postExcerpt.options?.keepHtml && (
											<div
												dangerouslySetInnerHTML={{
													__html: postExcerptEdited,
												}}></div>
										)}
										{!postExcerpt.options?.keepHtml && <>{postExcerptEdited}</>}
										{postfix.options?.text && (
											<span className={postfix.options?.class}>
												{postfix.options?.text}
											</span>
										)}
									</a>
								)}
							{postExcerpt.options?.linkTo == 0 && (
								<>
									{postExcerpt.options?.tag.length > 0 && (
										<CustomTagExcerpt className={postExcerpt.options?.class}>
											{prefix.options?.text && (
												<span className={prefix.options?.class}>
													{prefix.options?.text}
												</span>
											)}
											{postExcerpt.options?.keepHtml && (
												<div
													dangerouslySetInnerHTML={{
														__html: postExcerptEdited,
													}}></div>
											)}
											{!postExcerpt.options?.keepHtml && (
												<>{postExcerptEdited}</>
											)}
											{postfix.options?.text && (
												<span className={postfix.options?.class}>
													{postfix.options?.text}
												</span>
											)}
										</CustomTagExcerpt>
									)}
									{postExcerpt.options?.tag.length == 0 && (
										<>
											{prefix.options?.text && (
												<span className={prefix.options?.class}>
													{prefix.options?.text}
												</span>
											)}
											{postExcerpt.options?.keepHtml && (
												<div
													dangerouslySetInnerHTML={{
														__html: postExcerptEdited,
													}}></div>
											)}
											{!postExcerpt.options?.keepHtml && (
												<>{postExcerptEdited}</>
											)}
											{postfix.options?.text && (
												<span className={postfix.options?.class}>
													{postfix.options?.text}
												</span>
											)}
										</>
									)}
								</>
							)}
							{readMore.options?.enable && (
								<>
									{readMore.options?.linkTo?.length > 0 && (
										<a
											className={readMore.options?.class}
											onClick={handleLinkClick}
											{...linkAttrItemsReadmore}
											target={readMore.options?.linkTarget}
											href={postUrl}>
											{" "}
											{readMore.options?.text}
										</a>
									)}
									{readMore.options?.linkTo?.length == 0 && (
										<span className="readmore"> {readMore.options?.text}</span>
									)}
								</>
							)}
						</CustomTagX>
					)}
					{wrapper.options?.tag.length == 0 && (
						<>
							{postExcerpt.options?.linkTo?.length > 0 && (
								<>
									<a
										{...blockProps}
										onClick={handleLinkClick}
										{...linkAttrItems}
										href={postUrl}
										target={postExcerpt.options?.linkTarget}>
										{prefix.options?.text && (
											<span className="prefix">{prefix.options?.text}</span>
										)}
										{postExcerpt.options?.keepHtml && (
											<div
												dangerouslySetInnerHTML={{
													__html: postExcerptEdited,
												}}></div>
										)}
										{!postExcerpt.options?.keepHtml && <>{postExcerptEdited}</>}
										{postfix.options?.text && (
											<span className="postfix">{postfix.options?.text}</span>
										)}
									</a>
									{readMore.options?.linkTo?.length > 0 && (
										<a
											className="readmore"
											onClick={handleLinkClick}
											{...linkAttrItemsReadmore}
											target={readMore.options?.linkTarget}
											href={postUrl}>
											{" "}
											{readMore.options?.text}
										</a>
									)}
								</>
							)}
						</>
					)}
					{wrapper.options?.tag.length == 0 &&
						postExcerpt.options?.linkTo?.length == 0 && (
							<div {...blockProps}>
								{prefix.options?.text && (
									<span className="prefix">{prefix.options?.text}</span>
								)}
								{postExcerpt.options?.keepHtml && (
									<div
										dangerouslySetInnerHTML={{
											__html: postExcerptEdited,
										}}></div>
								)}
								{!postExcerpt.options?.keepHtml && <>{postExcerptEdited}</>}
								{postfix.options?.text && (
									<span className="postfix">{postfix.options?.text}</span>
								)}
								{readMore.options?.linkTo?.length > 0 && (
									<a
										className="readmore"
										onClick={handleLinkClick}
										{...linkAttrItemsReadmore}
										target={postExcerpt.options?.linkTarget}
										href={postUrl}>
										{" "}
										{readMore.options?.text}
									</a>
								)}
							</div>
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
