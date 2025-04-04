import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
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
import { useEntityProp, useEntityRecord } from "@wordpress/core-data";
import { select, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, link, linkOff, mediaAndText, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import customTags from "../../custom-tags";
import metadata from "./block.json";

var myStore = wp.data.select("ComboBlocksStore");
registerBlockType(metadata, {
	title: "Terms Field",
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
	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		let termField = attributes.termField;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var thumb = attributes.thumb;
		var utmTracking = attributes.utmTracking;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var term_id = context["term_id"];
		var taxonomy = context["taxonomy"];
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [isVisible, setIsVisible] = useState(false);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const { deviceType } = useSelect((select) => {
			const { getPreviewDeviceType } = select("core/editor");
			return {
				deviceType: getPreviewDeviceType,
			};
		}, []);
		const { record } = useEntityRecord("taxonomy", taxonomy, term_id);
		var termsQueryItemLinkToBasic = {
			none: { label: __("Choose", "combo-blocks"), value: "" },
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
			customUrl: {
				label: __("Custom URL", "combo-blocks"),
				value: "customUrl",
				isPro: true,
			},
		};
		let linkToArgs = applyFilters(
			"comboBlocksTermsQueryItemLinkTo",
			termsQueryItemLinkToBasic
		);
		var termsQueryItemTermFieldBasic = {
			termId: { label: "Term ID", value: "termId" },
			name: { label: "Name", value: "name" },
			slug: {
				label: "Slug",
				value: "slug",
				isPro: true,
			},
			description: { label: "Description", value: "description" },
			count: {
				label: "Count",
				value: "count",
				isPro: true,
			},
			wooCategoryThumb: {
				label: "WooCommerce Category Thumbnail",
				value: "wooCategoryThumb",
				isPro: true,
			},
			meta: {
				label: "Meta",
				value: "meta",
				isPro: true,
			},
		};
		let termFieldsArgs = applyFilters(
			"comboBlocksTermsQueryTermField",
			termsQueryItemTermFieldBasic
		);
		function setFieldsArgs(option, index) {
			var options = {
				...termField.options,
				field: option.value,
			};
			setAttributes({
				termField: { ...termField, options: options },
			});
		}
		function setRecrdValue() {
			var field = termField.options.field;
			if (field == "name") {
				return record?.name;
			}
			if (field == "description") {
				return record?.description;
			}
			if (field == "slug") {
				return record?.slug;
			}
			if (field == "termId") {
				return record?.id;
			}
			if (field == "count") {
				return record?.count;
			}
			if (field == "wooCategoryThumb") {
				return (
					<img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
				);
			}
			if (field == "meta") {
				return "Meta Value";
			}
		}
		const [currentTermHtml, setcurrentTermHtml] = useState(
			record == undefined ? "Category Title 2" : setRecrdValue()
		);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		useEffect(() => {
			var field = termField.options.field;
			if (field == "name") {
				setcurrentTermHtml(record?.name);
			}
			if (field == "description") {
				setcurrentTermHtml(record?.description);
			}
			if (field == "slug") {
				setcurrentTermHtml(record?.slug);
			}
			if (field == "termId") {
				setcurrentTermHtml(record?.id);
			}
			if (field == "count") {
				setcurrentTermHtml(record?.count);
			}
			if (field == "wooCategoryThumb") {
				setcurrentTermHtml(
					<img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
				);
			}
			if (field == "meta") {
				setcurrentTermHtml("Meta Value");
			}
		}, [record]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[postTitleSelector] = termField;
			blockCssObj[thumbSelector] = thumb;
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
			if (termField.options.isLink) {
				postTitleSelector = blockClass + " a";
			} else {
				postTitleSelector = blockClass;
			}
		} else {
			postTitleSelector = blockClass;
		}
		function setFieldLinkTo(option, index) {
			var options = { ...termField.options, linkTo: option.value };
			setAttributes({ termField: { ...termField, options: options } });
		}
		const thumbSelector = blockClass + " img";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const [termHtml, settermHtml] = useState(currentTermHtml);
		useEffect(() => {
			var currentTermHtmlX =
				currentTermHtml != undefined && currentTermHtml.length == 0
					? currentTermHtml
					: "Category Title 3";
			var field = termField.options.field;
			if (field == "name") {
				currentTermHtmlX = record?.name;
			}
			if (field == "description") {
				currentTermHtmlX = record?.description;
			}
			if (field == "slug") {
				currentTermHtmlX = record?.slug;
			}
			if (field == "termId") {
				currentTermHtmlX = record?.id;
			}
			if (field == "count") {
				currentTermHtmlX = record?.count;
			}
			if (field == "wooCategoryThumb") {
				setcurrentTermHtml(
					<img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
				);
			}
			if (field == "meta") {
				currentTermHtmlX = "Meta Value";
			}
			settermHtml(currentTermHtmlX);
		}, [termField]);
		useEffect(() => {
			var count =
				termField.options.limitCount > 0 ? termField.options.limitCount : 0;
			var currentTermHtmlX =
				currentTermHtml == undefined ? "Category Title 1" : currentTermHtml;
			settermHtml(currentTermHtmlX);
		}, [currentTermHtml]);
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
				// var blockId = attributes.blockId
				var wrapperX = attributes.wrapper;
				var postTitleX = attributes.termField;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (postTitleX != undefined) {
					var postTitleY = { ...postTitleX, options: termField.options };
					setAttributes({ termField: postTitleY });
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
				termField[sudoScource] = sudoScourceArgs;
			});
			var postTitleX = Object.assign({}, termField);
			setAttributes({ termField: postTitleX });
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
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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
			let obj = Object.assign({}, termField);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ termField: object });
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
			let obj = { ...termField };
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
			setAttributes({ termField: objectX });
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
			let obj = Object.assign({}, termField);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ termField: object });
		}
		function onResetPostTitle(sudoScources) {
			let obj = Object.assign({}, termField);
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
			setAttributes({ termField: obj });
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
			var object = myStore.deletePropertyDeep(prefix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ prefix: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
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
		function onChangeStyleThumb(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, thumb);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ thumb: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
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
		function onRemoveStyleThumb(sudoScource, key) {
			var object = myStore.deletePropertyDeep(thumb, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ thumb: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleThumb(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, thumb);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ thumb: object });
		}
		function onResetThumb(sudoScources) {
			let obj = Object.assign({}, thumb);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						thumbSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ thumb: obj });
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
			var object = myStore.deletePropertyDeep(postfix, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postfix: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
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
		function onBulkAddPostTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, termField);
			obj[sudoScource] = cssObj;
			setAttributes({ termField: obj });
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
		function onBulkAddThumb(sudoScource, cssObj) {
			let obj = Object.assign({}, thumb);
			obj[sudoScource] = cssObj;
			setAttributes({ thumb: obj });
			var selector = myStore.getElementSelector(sudoScource, thumbSelector);
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
		function onBulkAddPostTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, termField);
			obj[sudoScource] = cssObj;
			setAttributes({ termField: obj });
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			linkAttrObj();
		}, [termField]);
		var linkAttrObj = () => {
			var sdsd = {};
			termField.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		var postUrl =
			termField.options.customUrl != undefined &&
				termField.options.customUrl.length > 0
				? termField.options.customUrl
				: currentPostUrl;
		const CustomTagWrapper = `${wrapper.options.tag}`;
		const CustomTagPostTitle =
			termField.options.tag.length != 0 ? `${termField.options.tag}` : "div";
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
		}
		return (
			<>
				<InspectorControls className=" pg-setting-input-text ">
					<div className=" pg-setting-input-text">
						<div className="px-3 mb-3 ">
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Select Term Field", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={termFieldsArgs}
									buttonTitle={
										termField?.options?.field == undefined
											? __("Choose", "combo-blocks")
											: termFieldsArgs[termField?.options?.field]?.label
									}
									onChange={setFieldsArgs}
									values={termField.options.field}></PGDropdown>
							</PanelRow>
							{termField.options.field == "meta" && (
								<>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Field Key", "combo-blocks")}
										</label>
										<InputControl
											className="mr-2"
											value={termField.options.metaKey}
											onChange={(newVal) => {
												var options = {
													...termField.options,
													metaKey: newVal,
												};
												setAttributes({
													termField: { ...termField, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Metakey Type", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={termField.options.imgSrcMetaKeyType}
											options={[
												{ label: "ID", value: "ID" },
												{ label: "URL", value: "URL" },
											]}
											onChange={(newVal) => {
												var options = {
													...termField.options,
													metaKeyType: newVal,
												};
												setAttributes({
													termField: { ...termField, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}
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
							title={__("Field Settings", "combo-blocks")}
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
										name: "style",
										title: "Style",
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
									<>
										<ToggleControl
											label={__("Linked?", "combo-blocks")}
											help={
												termField.options.isLink
													? __("Linked to URL", "combo-blocks")
													: __("Not linked to URL", "combo-blocks")
											}
											checked={termField.options.isLink ? true : false}
											onChange={(e) => {
												var options = {
													...termField.options,
													isLink: termField.options.isLink ? false : true,
												};
												setAttributes({
													termField: { ...termField, options: options },
												});
											}}
										/>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Link To", "combo-blocks")}
											</label>
											<PGDropdown
												position="bottom right"
												btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
												// variant="secondary"
												options={linkToArgs}
												// buttonTitle="Choose"
												buttonTitle={
													linkToArgs[termField.options.linkTo] != undefined
														? linkToArgs[termField.options.linkTo].label
														: __("Choose", "combo-blocks")
												}
												onChange={setFieldLinkTo}
												values={termField.options.field}></PGDropdown>
										</PanelRow>
										{termField.options.linkTo.length > 0 && (
											<>
												{termField.options.linkTo == "authorMeta" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Author Meta Key", "combo-blocks")}
														</label>
														<InputControl
															value={termField.options.linkToMeta}
															onChange={(newVal) => {
																var options = {
																	...termField.options,
																	linkToMeta: newVal,
																};
																setAttributes({
																	termField: { ...termField, options: options },
																});
															}}
														/>
													</PanelRow>
												)}
												{termField.options.linkTo == "customField" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Custom Meta Key", "combo-blocks")}
														</label>
														<InputControl
															value={termField.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...termField.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	termField: { ...termField, options: options },
																});
															}}
														/>
													</PanelRow>
												)}
												{termField.options.linkTo == "customUrl" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Custom Url
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
																{termField.options.customUrl.length > 0 && (
																	<Button
																		className="!text-red-500 ml-2"
																		icon={linkOff}
																		onClick={(ev) => {
																			var options = {
																				...termField.options,
																				customUrl: "",
																			};
																			setAttributes({
																				termField: {
																					...termField,
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
																			value={termField.options.customUrl}
																			onChange={(newVal) => {
																				var options = {
																					...termField.options,
																					customUrl: newVal.url,
																				};
																				setAttributes({
																					termField: {
																						...termField,
																						options: options,
																					},
																				});
																			}}
																		/>
																		<div className="p-2">
																			<span className="font-bold">
																				{__("Linked to:", "combo-blocks")}
																			</span>{" "}
																			{termField.options.customUrl.length != 0
																				? termField.options.customUrl
																				: __("No link", "combo-blocks")}{" "}
																		</div>
																	</Popover>
																)}
															</div>
														</PanelRow>
														{termField.options.customUrl.length > 0 && (
															<div className="p-2 pl-0 truncate ">
																<span className="font-bold">
																	{__("Linked to:", "combo-blocks")}
																</span>{" "}
																{termField.options.customUrl}
															</div>
														)}
													</>
												)}
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Link Target", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={termField.options.linkTarget}
														options={[
															{ label: "_self", value: "_self" },
															{ label: "_blank", value: "_blank" },
															{ label: "_parent", value: "_parent" },
															{ label: "_top", value: "_top" },
														]}
														onChange={(newVal) => {
															var options = {
																...termField.options,
																linkTarget: newVal,
															};
															setAttributes({
																termField: { ...termField, options: options },
															});
														}}
													/>
												</PanelRow>
											</>
										)}
										{termField.options.linkTo == "custom" && (
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom URL", "combo-blocks")}
												</label>
												<InputControl
													value={termField.options.customUrl}
													onChange={(newVal) => {
														var options = {
															...termField.options,
															customUrl: newVal,
														};
														setAttributes({
															termField: { ...termField, options: options },
														});
													}}
												/>
											</PanelRow>
										)}
									</>
								</PGtab>
								<PGtab name="style">
									<PGStyles
										obj={termField}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												termField,
												"termField",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												termField,
												"termField",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												termField,
												"termField",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												termField,
												"termField",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												termField,
												"termField",
												postTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css"></PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Thumb", "combo-blocks")}
							initialOpen={false}
							disabled="true">
							<PGStyles
								obj={thumb}
								onChange={(sudoScource, newVal, attr) => {
									myStore.onChangeStyleElement(
										sudoScource,
										newVal,
										attr,
										thumb,
										"thumb",
										thumbSelector,
										blockCssY,
										setAttributes
									);
								}}
								onAdd={(sudoScource, key) => {
									myStore.onAddStyleElement(
										sudoScource,
										key,
										thumb,
										"thumb",
										setAttributes
									);
								}}
								onRemove={(sudoScource, key) => {
									myStore.onRemoveStyleElement(
										sudoScource,
										key,
										thumb,
										"thumb",
										thumbSelector,
										blockCssY,
										setAttributes
									);
								}}
								onBulkAdd={(sudoScource, cssObj) => {
									myStore.onBulkAddStyleElement(
										sudoScource,
										cssObj,
										thumb,
										"thumb",
										thumbSelector,
										blockCssY,
										setAttributes
									);
								}}
								onReset={(sudoSources) => {
									myStore.onResetElement(
										sudoSources,
										thumb,
										"thumb",
										thumbSelector,
										blockCssY,
										setAttributes
									);
								}}
							/>
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
													label: __("Before Term Field Text", "combo-blocks"),
													value: "beforebegin",
												},
												{
													label: __("Before Term Field", "combo-blocks"),
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
													label: __("After Term Field Text", "combo-blocks"),
													value: "afterend",
												},
												{
													label: __("After Term Field", "combo-blocks"),
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
						{/* UTM  */}
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("UTM Tracking", "combo-blocks")}</span>
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
									label={__("Enable?", "combo-blocks")}
									help={
										utmTracking.enable
											? __("Tracking Enabled.", "combo-blocks")
											: __("Tracking Disabled.", "combo-blocks")
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
								{utmTracking.enable ? (
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
								) : (
									""
								)}
							</div>
						</PGtoggle>
						{/* UTM  */}

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle> */}
					</div>
				</InspectorControls>
				{wrapper.options.tag && (
					<CustomTagWrapper {...blockProps}>
						{termField.options.isLink && (
							<>
								{prefix.options.position == "afterbegin" &&
									prefix.options.text && (
										<span className={prefix.options.class}>{prefixText}</span>
									)}
								<a
									onClick={handleLinkClick}
									{...linkAttrItems}
									href={postUrl}
									className={termField.options.class}
									target={termField.options.linkTarget}>
									{prefix.options.position == "beforebegin" &&
										prefix.options.text && (
											<span className={prefix.options.class}>{prefixText}</span>
										)}
									{termHtml}
									{postfix.options.position == "afterend" &&
										postfix.options.text && (
											<span className={postfix.options.class}>
												{postfixText}
											</span>
										)}
								</a>
								{postfix.options.position == "beforeend" &&
									postfix.options.text && (
										<span className={postfix.options.class}>{postfixText}</span>
									)}
							</>
						)}
						{!termField.options.isLink && (
							<>
								{termField.options.tag.length == 0 && (
									<>
										{prefix.options.position != "none" &&
											prefix.options.text && (
												<span className={prefix.options.class}>
													{prefixText}
												</span>
											)}
										{termHtml}
										{postfix.options.position != "none" &&
											postfix.options.text && (
												<span className={postfix.options.class}>
													{postfixText}
												</span>
											)}
									</>
								)}
								{termField.options.tag.length > 0 && (
									<>
										{prefix.options.position == "afterbegin" &&
											prefix.options.text && (
												<span className={prefix.options.class}>
													{prefixText}
												</span>
											)}
										<CustomTagPostTitle>
											{prefix.options.position == "beforebegin" &&
												prefix.options.text && (
													<span className={prefix.options.class}>
														{prefixText}
													</span>
												)}
											{termHtml}
											{postfix.options.position == "afterend" &&
												postfix.options.text && (
													<span className={postfix.options.class}>
														{postfixText}
													</span>
												)}
										</CustomTagPostTitle>
										{postfix.options.position == "beforeend" &&
											postfix.options.text && (
												<span className={postfix.options.class}>
													{postfixText}
												</span>
											)}
									</>
								)}
							</>
						)}
					</CustomTagWrapper>
				)}
				{wrapper.options.tag.length == 0 && termField.options.isLink && (
					<div {...blockProps}>
						{prefix.options.position == "afterbegin" && prefix.options.text && (
							<span className={prefix.options.class}>{prefixText}</span>
						)}
						<a
							onClick={handleLinkClick}
							// {...blockProps}
							// className="p"
							{...linkAttrItems}
							href={postUrl}
							target={termField.options.linkTarget}>
							{prefix.options.position == "beforebegin" &&
								prefix.options.text && (
									<span className={prefix.options.class}>{prefixText}</span>
								)}
							{termHtml}
							{postfix.options.position == "afterend" &&
								postfix.options.text && (
									<span className={postfix.options.class}>{postfixText}</span>
								)}
						</a>
						{postfix.options.position == "beforeend" &&
							postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
					</div>
				)}
				{wrapper.options.tag.length == 0 && !termField.options.isLink && (
					<>
						{termField.options.tag.length > 0 && (
							<CustomTagPostTitle {...blockProps}>
								{prefix.options.position != "none" && prefix.options.text && (
									<span className={prefix.options.class}>{prefixText}</span>
								)}
								{termHtml}
								{postfix.options.position != "none" && postfix.options.text && (
									<span className={postfix.options.class}>{postfixText}</span>
								)}
							</CustomTagPostTitle>
						)}
						{termField.options.tag.length == 0 && (
							<CustomTagPostTitle {...blockProps}>
								{prefix.options.position != "none" && prefix.options.text && (
									<span className={prefix.options.class}>{prefixText}</span>
								)}
								{termHtml}
								{postfix.options.position != "none" && postfix.options.text && (
									<span className={postfix.options.class}>{postfixText}</span>
								)}
							</CustomTagPostTitle>
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
