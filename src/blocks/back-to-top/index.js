import apiFetch from "@wordpress/api-fetch";
import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
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
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import customTags from "../../custom-tags";
import MyImage from "../../placeholder.jpg";
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
				<g clipPath="url(#clip0_165_99)">
					<circle cx="80" cy="80" r="80" fill="url(#paint0_linear_165_99)" />
					<path
						d="M40.1083 107.055L79.9188 73.6678L119.881 107.2C119.881 102.694 119.921 98.1878 120 93.6817C120 94.681 119.903 90.175 120 86.4138L79.9188 52.8L40 86.323C40.0758 93.2366 40.0975 100.096 40.1083 107.055Z"
						fill="white"
					/>
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_165_99"
						x1="0"
						y1="80"
						x2="160"
						y2="80"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<clipPath id="clip0_165_99">
						<rect width="160" height="160" fill="white" />
					</clipPath>
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
		var visible = attributes.visible;
		var text = attributes.text;
		var icon = attributes.icon;
		var image = attributes.image;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		let isProFeature = applyFilters("isProFeature", true);
		const [isVisible, setIsVisible] = useState(false);
		var breakPointX = myStore.getBreakPoint();
		var [isLoading, setisLoading] = useState(false);
		var [editMode, seteditMode] = useState(false);
		var [editModeStyles, seteditModeStyles] = useState(null);
		var [styles, setstyles] = useState(wrapper.styles);
		const [currentPostContent, setCurrentpostContent] = useEntityProp(
			"postType",
			postType,
			"content",
			postId
		);
		const [customFields, setCustomFields] = useState({});
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		const ALLOWED_MEDIA_TYPES = ["image"];
		const [iconHtml, setIconHtml] = useState("");
		const textEnable =
			text.options.enable == undefined ? true : text.options.enable;
		const imageEnable =
			image.options.enable == undefined ? true : image.options.enable;
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const textSelector = blockClass + " .back-to-top-text";
		const iconSelector = blockClass + " .back-to-top-icon";
		const imgSelector = blockClass + " .back-to-top-image";
		const [preview, setPreview] = useState(true);
		const [customText, setCustomText] = useState(
			myStore.parseCustomTags(text.options.text, customTags)
		);
		const [currentPostImageId, setCurrentPostImageId] = useState(
			image.options.srcId
		);
		const [linkPickerSrcUrl, setlinkPickerSrcUrl] = useState(false);
		useEffect(() => {
			if (editMode) {
				var styleObj = {
					position: {
						Desktop: "relative",
					},
				};
				var newStyle = { ...wrapper.styles, ...styleObj };
				seteditModeStyles(newStyle);
			} else {
				var styleObj = {
					position: {
						Desktop: "fixed !important",
					},
				};
				var newStyle = { ...wrapper.styles, ...styleObj };
				seteditModeStyles(newStyle);
			}
		}, [wrapper.styles]);
		useEffect(() => {
			var textX = myStore.parseCustomTags(text.options.text, customTags);
			setCustomText(textX);
		}, [text.options.text]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[textSelector] = text;
			blockCssObj[iconSelector] = icon;
			blockCssObj[imgSelector] = image;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
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
		const [imageSizes, setImageSizes] = useState([]);
		const [postImage, setPostImage] = useState(null);
		useEffect(() => {
			if (
				currentPostImageId.length != 0 &&
				image.options.imgSrcType == "media"
			) {
				// setLoading(true);
				apiFetch({
					path: "/wp/v2/media/" + currentPostImageId,
					method: "POST",
					data: { id: currentPostImageId },
				}).then((res) => {
					setPostImage(res);
					var options = {
						...image.options,
						srcUrl: res.source_url,
						srcId: res.id,
					};
					setAttributes({ image: { ...image, options: options } });
					// setLoading(false);
					var imgSizes = [];
					Object.keys(res.media_details.sizes).map((x) => {
						var height = res.media_details.sizes[x].height;
						var width = res.media_details.sizes[x].width;
						//var crop = res[x].crop
						var label = x.replaceAll("_", " ");
						imgSizes[x] = {
							label: label + "(" + width + "*" + height + ")",
							value: x,
							height: height,
							width: width,
						};
					});
					setImageSizes(imgSizes);
				});
			}
		}, [currentPostImageId]);
		var iconLinkToBasic = {
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
		var textSrcArgs = applyFilters(
			"comboBlocksIconTextSource",
			iconTextSourceBasic
		);
		const [linkPickerExcerpt, setLinkPickerExcerpt] = useState(false);
		const [linkPickerText, setLinkPickerText] = useState(false);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
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
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
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
		function setTextSrc(option, index) {
			var options = { ...text.options, src: option.value };
			setAttributes({ text: { ...text, options: options } });
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStyleText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, text);
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
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
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
		function onChangeStyleImage(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, image);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ image: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
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
		function onRemoveStyleImage(sudoScource, key) {
			let obj = { ...image };
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
			setAttributes({ image: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
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
		function onAddStyleImage(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, image);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ image: object });
		}
		function onBulkAddImage(sudoScource, cssObj) {
			let obj = Object.assign({}, image);
			obj[sudoScource] = cssObj;
			setAttributes({ image: obj });
			var selector = myStore.getElementSelector(sudoScource, imgSelector);
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
		function onResetImage(sudoScources) {
			let obj = Object.assign({}, image);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						imgSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ image: obj });
		}
		function onPickCssLibraryImage(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				image[sudoScource] = sudoScourceArgs;
			});
			var imageX = Object.assign({}, image);
			setAttributes({ image: imageX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					imgSelector
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
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const blockPropsXYZ = useBlockProps({
			className: `text-center inline-block mx-auto `,
		});
		useEffect(() => {
			if (editMode) {
				var styleObj = {
					position: {
						Desktop: "relative",
					},
				};
				var newStyle = { ...wrapper.styles, ...styleObj };
				onBulkAddWrapper("styles", newStyle);
			} else {
				if (editModeStyles != null) {
					var styleObj = {
						position: {
							Desktop: "fixed !important",
						},
					};
					var newStyle = { ...wrapper.styles, ...styleObj };
					onBulkAddWrapper("styles", newStyle);
				}
			}
		}, [editMode]);
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
						<div className="p-3">
							<ToggleControl
								label={__("Edit Mode?", "combo-blocks")}
								help={editMode ? "Edit Mode Disabled." : "Edit Mode Enabled."}
								checked={editMode}
								onChange={(e) => {
									seteditMode(!editMode);
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
											{__("Offset Top", "combo-blocks")}
										</label>
										<InputControl
											value={wrapper.options.offsetTop}
											onChange={(newVal) => {
												var options = { ...wrapper.options, offsetTop: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Show After", "combo-blocks")}
										</label>
										<InputControl
											value={wrapper.options.showAfter}
											onChange={(newVal) => {
												var options = { ...wrapper.options, showAfter: newVal };
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
										checked={textEnable}
										onChange={(e) => {
											var options = {
												...text.options,
												enable: text.options.enable ? false : true,
											};
											setAttributes({ text: { ...text, options: options } });
										}}
									/>
									{/* <PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											Text Source
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={textSrcArgs}
											buttonTitle={
												textSrcArgs[text.options.src] == undefined
													? __("Choose","combo-blocks")
													: textSrcArgs[text.options.src].label
											}
											onChange={setTextSrc}
											values={[]}></PGDropdown>
									</PanelRow> */}
									{/* <PGcssClassPicker
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
									/> */}
									<RichText
										className="components-textarea-control__input"
										tagName={"div"}
										// className="pg-text"
										value={text.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var options = { ...text.options, text: content };
											setAttributes({ text: { ...text, options: options } });
										}}
										placeholder={__("Start Writing...")}
									/>
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
						{/* //*image */}
						<PGtoggle
							opened={isProFeature ? false : null}
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Image", "combo-blocks")}</span>
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
									<ToggleControl
										label={__("Enable Image?", "combo-blocks")}
										help={
											imageEnable
												? __("Image enabled", "combo-blocks")
												: __("Image disabled.", "combo-blocks")
										}
										checked={imageEnable ? true : false}
										onChange={(e) => {
											var options = {
												...image.options,
												enable: image.options.enable ? false : true,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
									/>
									<div>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Image Sources", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={image.options.imgSrcType}
												options={[
													{ label: __("Media", "combo-blocks"), value: "media" },
													// { label: __("Custom Field","combo-blocks"), value: "customField" },
													{
														label: __("Image Source URL", "combo-blocks"),
														value: "customUrl",
													},
													// { label: 'Image ID', value: 'imgId' },
												]}
												onChange={(newVal) => {
													var options = {
														...image.options,
														imgSrcType: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
										{image.options.srcUrl.length > 0 && (
											<MediaUploadCheck>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														// media.id
														setCurrentPostImageId(media.id);
														var options = {
															...image.options,
															srcUrl: media.url,
															srcId: media.id,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
													onClose={() => { }}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={image.options.srcId}
													render={({ open }) => (
														<img
															src={image.options.srcUrl}
															alt=""
															className="cursor-pointer"
															onClick={open}
														/>
													)}
												/>
											</MediaUploadCheck>
										)}
										{image.options.srcUrl.length == 0 && (
											<MediaUploadCheck>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														// media.id
														setCurrentPostImageId(media.id);
														var options = {
															...image.options,
															srcUrl: media.url,
															srcId: media.id,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
													onClose={() => { }}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={image.options.srcId}
													render={({ open }) => (
														// <Button
														// 	className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full"
														// 	onClick={open}>
														// 	{__("Open Media Library","combo-blocks")}
														// </Button>
														<img
															src={MyImage}
															alt=""
															className="cursor-pointer"
															onClick={open}
														/>
													)}
												/>
											</MediaUploadCheck>
										)}
										{image.options.imgSrcType == "media" && (
											<>
												<div className="mt-5">
													{__("Choose Image", "combo-blocks")}
												</div>
												<MediaUploadCheck>
													<MediaUpload
														className="bg-gray-700 hover:bg-gray-600"
														onSelect={(media) => {
															// media.id
															setCurrentPostImageId(media.id);
															var options = {
																...image.options,
																srcUrl: media.url,
																srcId: media.id,
															};
															setAttributes({
																image: { ...image, options: options },
															});
														}}
														onClose={() => { }}
														allowedTypes={ALLOWED_MEDIA_TYPES}
														value={image.options.srcId}
														render={({ open }) => (
															<Button
																className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
																onClick={open}>
																{__("Open Media Library", "combo-blocks")}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											</>
										)}
										{image.options.imgSrcType == "customUrl" && (
											<>
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Image URL", "combo-blocks")}
													</label>
													<div className="relative">
														<Button
															className={linkPickerSrcUrl ? "!bg-gray-400" : ""}
															icon={link}
															onClick={(ev) => {
																setlinkPickerSrcUrl((prev) => !prev);
															}}></Button>
														{image.options.srcUrl.length > 0 && (
															<Button
																className="!text-red-500 ml-2"
																icon={linkOff}
																onClick={(ev) => {
																	var options = {
																		...image.options,
																		srcUrl: "",
																	};
																	setAttributes({
																		image: { ...image, options: options },
																	});
																	setlinkPickerSrcUrl(false);
																}}></Button>
														)}
														{linkPickerSrcUrl && (
															<Popover position="bottom right">
																<LinkControl
																	settings={[]}
																	value={image.options.srcUrl}
																	onChange={(newVal) => {
																		var options = {
																			...image.options,
																			srcUrl: newVal.url,
																		};
																		setAttributes({
																			image: { ...image, options: options },
																		});
																		setPostImage({
																			...postImage,
																			srcUrl: newVal.url,
																			media_details: { sizes: {} },
																			guid: { rendered: newVal.url },
																		});
																	}}
																/>
																<div className="p-2">
																	<span className="font-bold">
																		{__("Image Source URL:", "combo-blocks")}
																	</span>{" "}
																	{image.options.srcUrl.length != 0
																		? image.options.srcUrl
																		: __("No link", "combo-blocks")}{" "}
																</div>
															</Popover>
														)}
													</div>
												</PanelRow>
											</>
										)}
										{image.options.imgSrcType == "imgId" && (
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Image ID", "combo-blocks")}
												</label>
												<InputControl
													className="mr-2"
													value={image.options.imgSrcImgId}
													onChange={(newVal) => {
														var options = {
															...image.options,
															imgSrcImgId: newVal,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
									</div>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Image position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={image.options.position}
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
												var options = { ...image.options, position: newVal };
												setAttributes({
													image: { ...image, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={image}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												image,
												"image",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={image}
										onChange={onPickCssLibraryImage}
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
				{wrapper.options.showAfter == 0 && (
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
												'<!-- wp:combo-blocks/back-to-top {"wrapper":{"options":{"tag":"div","class":"pg-back-to-top","showAfter":"300","offsetTop":"0","attr":[]},"styles":{"position":{"Desktop":"relative"},"right":{"Desktop":"50px"},"bottom":{"Desktop":"50px"}}},"blockId":"pg8dd7d1541a1c","blockCssY":{"items":{".pg8dd7d1541a1c":{"position":{"Desktop":"relative"},"right":{"Desktop":"50px"},"bottom":{"Desktop":"50px"}},".pg8dd7d1541a1c .back-to-top-image":{"display":{"Desktop":"block"},"max-width":{"Desktop":"40px"},"height":{"Desktop":"auto"}}}}} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"back-to-top"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{wrapper.options.showAfter > 0 && (
					<>
						{!editMode && (
							<div
								className="bg-green-200 p-2"
								onClick={(ev) => {
									seteditMode(true);
								}}>
								Enable Edit - Back to Top
							</div>
						)}
						{wrapper.options.tag && (
							<CustomTag {...blockProps} {...wrapAttrItems}>
								{icon.options.position == "beforeText" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{imageEnable && image.options.position == "beforeText" && (
									<>
										{postImage != null && (
											<>
												{postImage.media_details.sizes[
													image.options.size[breakPointX]
												] == undefined && (
														<img
															className="back-to-top-image"
															// {...linkAttrItems}
															src={
																postImage.guid.rendered != undefined
																	? postImage.guid.rendered
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}
												{postImage.media_details.sizes[
													image.options.size[breakPointX]
												] != undefined && (
														<img
															className="back-to-top-image"
															// {...linkAttrItems}
															src={
																postImage.media_details.sizes[
																	image.options.size[breakPointX]
																].source_url
															}
															alt={postImage.alt_text}
														/>
													)}
											</>
										)}
									</>
								)}
								{text.options.enable && (
									<RichText
										className="text"
										tagName={"span"}
										value={text.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var options = { ...text.options, text: content };
											setAttributes({
												text: { ...text, options: options },
											});
										}}
										placeholder={__("Start Writing...")}
									/>
								)}
								{imageEnable && image.options.position == "afterText" && (
									<>
										{postImage != null && (
											<>
												{postImage.media_details.sizes[
													image.options.size[breakPointX]
												] == undefined && (
														<img
															className="back-to-top-image"
															// {...linkAttrItems}
															src={
																postImage.guid.rendered != undefined
																	? postImage.guid.rendered
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}
												{postImage.media_details.sizes[
													image.options.size[breakPointX]
												] != undefined && (
														<img
															className="back-to-top-image"
															// {...linkAttrItems}
															src={
																postImage.media_details.sizes[
																	image.options.size[breakPointX]
																].source_url
															}
															alt={postImage.alt_text}
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
								{/* </>
							)} */}
							</CustomTag>
						)}
						{wrapper.options.tag.length == 0 && (
							<>
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
												}}>
												{customText}
											</span>
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
							</>
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
