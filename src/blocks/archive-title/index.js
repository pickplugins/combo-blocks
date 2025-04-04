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
					d="M68.7781 49.5732H20.9829C19.9266 49.5732 18.9135 49.9929 18.1666 50.7398C17.4196 51.4868 17 52.4998 17 53.5562V93.3855C17 94.4418 17.4196 95.4549 18.1666 96.2018C18.9135 96.9488 19.9266 97.3684 20.9829 97.3684H68.7781C69.8344 97.3684 70.8475 96.9488 71.5945 96.2018C72.3414 95.4549 72.761 94.4418 72.761 93.3855V53.5562C72.761 52.4998 72.3414 51.4868 71.5945 50.7398C70.8475 49.9929 69.8344 49.5732 68.7781 49.5732ZM64.7952 89.4025H24.9659V57.5391H64.7952V89.4025Z"
					fill="url(#paint0_linear_61_454)"
				/>
				<path
					d="M152.42 61.5222H88.6934V69.4881H152.42V61.5222Z"
					fill="url(#paint1_linear_61_454)"
				/>
				<path
					d="M136.489 77.4539H88.6934V85.4197H136.489V77.4539Z"
					fill="url(#paint2_linear_61_454)"
				/>
				<path
					d="M68.7781 112.205H20.9829C19.9266 112.205 18.9135 112.624 18.1666 113.371C17.4196 114.118 17 115.131 17 116.188V156.017C17 157.073 17.4196 158.086 18.1666 158.833C18.9135 159.58 19.9266 160 20.9829 160H68.7781C69.8344 160 70.8475 159.58 71.5945 158.833C72.3414 158.086 72.761 157.073 72.761 156.017V116.188C72.761 115.131 72.3414 114.118 71.5945 113.371C70.8475 112.624 69.8344 112.205 68.7781 112.205ZM64.7952 152.034H24.9659V120.171H64.7952V152.034Z"
					fill="url(#paint3_linear_61_454)"
				/>
				<path
					d="M152.42 124.154H88.6934V132.12H152.42V124.154Z"
					fill="url(#paint4_linear_61_454)"
				/>
				<path
					d="M136.489 140.085H88.6934V148.051H136.489V140.085Z"
					fill="url(#paint5_linear_61_454)"
				/>
				<path d="M132 0H17V11H132V0Z" fill="#C15940" />
				<path d="M83 28H17V33H83V28Z" fill="url(#paint6_linear_61_454)" />
				<path d="M103 19H17V24H103V19Z" fill="url(#paint7_linear_61_454)" />
				<defs>
					<linearGradient
						id="paint0_linear_61_454"
						x1="17"
						y1="73.4708"
						x2="72.761"
						y2="73.4708"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_454"
						x1="88.6934"
						y1="65.5051"
						x2="152.42"
						y2="65.5051"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_454"
						x1="88.6934"
						y1="81.4368"
						x2="136.489"
						y2="81.4368"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_454"
						x1="17"
						y1="136.102"
						x2="72.761"
						y2="136.102"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_454"
						x1="88.6934"
						y1="128.137"
						x2="152.42"
						y2="128.137"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_454"
						x1="88.6934"
						y1="144.068"
						x2="136.489"
						y2="144.068"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_454"
						x1="17"
						y1="30.5"
						x2="83"
						y2="30.5"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_454"
						x1="17"
						y1="21.5"
						x2="103"
						y2="21.5"
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
				blocks: ["core/search"],
				transform: (attributes) => {
					// var content = attributes.content;
					// var linkTarget = attributes.linkTarget;
					// 					{
					//     "label": "Search",
					//     "showLabel": true,
					//     "placeholder": "",
					//     "buttonText": "Search",
					//     "buttonPosition": "button-outside",
					//     "buttonUseIcon": false,
					//     "query": [],
					//     "buttonBehavior": "expand-searchfield",
					//     "isSearchFieldHidden": false
					// }
					// return createBlock("combo-blocks/read-more", {
					// 	readMore: {
					// 		options: {
					// 			text: content,
					// 			linkTarget: linkTarget,
					// 			linkTo: "postUrl",
					// 			linkAttr: [],
					// 		},
					// 	},
					// });
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/read-more"],
				transform: (attributes) => {
					// var content = attributes.readMore;
					// return createBlock("core/read-more", {
					// 	content: content.options.text,
					// 	linkTarget: content.options.linkTarget,
					// });
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
		let archiveTitle = attributes.archiveTitle;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		const wrapperSelector = blockClass;
		var archiveTitleSelector = "archive";
		if (wrapper.options.tag.length != 0) {
			if (archiveTitle.options.linkTo.length > 0) {
				archiveTitleSelector = blockClass + " a";
			} else {
				// archiveTitleSelector = blockClass;
				archiveTitleSelector = blockClass + " .archiveTitle";
			}
		} else {
			archiveTitleSelector = blockClass;
		}
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .icon";
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
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
		var archiveTypes = {
			auto: { label: __("Auto Detect", "combo-blocks"), value: "auto" },
			// 'author': { label: 'Author', value: 'author' },
			// 'category': { label: 'Category', value: 'category' },
			// 'tag': { label: 'Tag', value: 'tag' },
			// 'taxonomy': { label: 'Taxonomy', value: 'taxonomy' },
			// 'search': { label: 'Search', value: 'search' },
			// 'index': { label: 'Index', value: 'index' },
			// 'year': { label: 'Year', value: 'year' },
			// 'month': { label: 'Month', value: 'month' },
			// 'date': { label: 'Date', value: 'date' },
			// 'wcCatalog': { label: 'WooCommerce Catalog', value: 'wcCatalog' },
			// 'wcSearch': { label: 'WooCommerce Search', value: 'wcSearch' },
		};
		var archiveLinkToArgsBasic = {
			none: { label: __("No Link", "combo-blocks"), value: "" },
			archiveUrl: {
				label: __("Archive URL", "combo-blocks"),
				value: "archiveUrl",
			},
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			customUrl: { label: __("Custom", "combo-blocks"), value: "customUrl" },
		};
		let archiveLinkToArgs = applyFilters(
			"archiveLinkToArgs",
			archiveLinkToArgsBasic
		);
		var dateFormats = {
			"Y-M-d": { label: "2022-May-25", value: "Y-M-d" },
			"Y-m-d": { label: "2022-05-25", value: "Y-m-d" },
			"d-m-y": { label: "25-05-2022", value: "d-m-y" },
			"d/m/y": { label: "25/05/2022", value: "d/m/y" },
			"y-m-d": { label: "2022-05-25", value: "y-m-d" },
			"y/m/d": { label: "2022/05/25", value: "y/m/d" },
			"D M y": { label: "Sun May 2022", value: "D M y" },
			"D M d, y": { label: "Sun May 11, 2022", value: "D M d, y" },
			"M D d, y": { label: "May Sun 11, 2022", value: "M D d, y" },
			"M d, y": { label: "May 11, 2022", value: "M d, y" },
			"d M y": { label: "25 May 2022", value: "d M y" },
		};
		const [archiveTitleEdited, setarchiveTitleEdited] = useState("Hello %s");
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[archiveTitleSelector] = archiveTitle;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var archiveType = archiveTitle.options.archiveType;
			if (archiveType == "auto") {
				//archiveTitleEdited = archiveTitle.options.customLabel;
				setarchiveTitleEdited(archiveTitle.options.customLabel);
			}
		}, [archiveTitle]);
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
				var archiveTitleX = attributes.archiveTitle;
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (archiveTitleX != undefined) {
					var archiveTitleY = {
						...archiveTitleX,
						options: archiveTitle.options,
					};
					setAttributes({ archiveTitle: archiveTitleY });
					blockCssObj[archiveTitleSelector] = archiveTitleY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
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
		function setFieldLinkTo(option, index) {
			var options = { ...archiveTitle.options, linkTo: option.value };
			setAttributes({ archiveTitle: { ...archiveTitle, options: options } });
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
		function onPickCssLibraryArchiveTitle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				archiveTitle[sudoScource] = sudoScourceArgs;
			});
			var archiveTitleX = Object.assign({}, archiveTitle);
			setAttributes({ archiveTitle: archiveTitleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					archiveTitleSelector
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
		function onRemoveStyleArchiveTitle(sudoScource, key) {
			let obj = { ...archiveTitle };
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
			setAttributes({ archiveTitle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
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
		function onResetArchiveTitle(sudoSources) {
			let obj = Object.assign({}, archiveTitle);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						archiveTitleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ archiveTitle: obj });
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStyleArchiveTitle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, archiveTitle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ archiveTitle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
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
		function onAddStyleArchiveTitle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, archiveTitle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ archiveTitle: object });
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
			var sudoScourceX = { ...prefix[sudoScource] };
			sudoScourceX[key] = {};
			prefix[sudoScource] = sudoScourceX;
			setAttributes({ prefix: { ...prefix } });
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
		function onBulkAddArchiveTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, archiveTitle);
			obj[sudoScource] = cssObj;
			setAttributes({ archiveTitle: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				archiveTitleSelector
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
		String.prototype.strtr = function (dic) {
			const str = this.toString(),
				makeToken = (inx) => `{{###~${inx}~###}}`,
				tokens = Object.keys(dic).map((key, inx) => ({
					key,
					val: dic[key],
					token: makeToken(inx),
				})),
				tokenizedStr = tokens.reduce(
					(carry, entry) =>
						carry.replace(new RegExp(entry.key, "g"), entry.token),
					str
				);
			return tokens.reduce(
				(carry, entry) =>
					carry.replace(new RegExp(entry.token, "g"), entry.val),
				tokenizedStr
			);
		};
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		// Wrapper CSS Class Selectors
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			linkAttrObj();
		}, [archiveTitle]);
		var linkAttrObj = () => {
			var sdsd = {};
			archiveTitle.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		var postUrl =
			archiveTitle.options.customUrl != undefined &&
				archiveTitle.options.customUrl.length > 0
				? archiveTitle.options.customUrl
				: currentPostUrl;
		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${archiveTitle.options.tag}`;
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
							title={__("Archive Title", "combo-blocks")}
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
											{__("Archive Type", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={archiveTypes}
											// buttonTitle="Choose"
											buttonTitle={
												archiveTypes[archiveTitle.options.archiveType] !=
													undefined
													? archiveTypes[archiveTitle.options.archiveType].label
													: __("Choose", "combo-blocks")
											}
											onChange={(option, index) => {
												var options = {
													...archiveTitle.options,
													archiveType: option.value,
												};
												setAttributes({
													archiveTitle: { ...archiveTitle, options: options },
												});
											}}
											values={""}></PGDropdown>
									</PanelRow>
									<PanelRow className="mb-4">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Label", "combo-blocks")}
										</label>
										<InputControl
											className="mr-2"
											value={archiveTitle.options.customLabel}
											onChange={(newVal) => {
												var options = {
													...archiveTitle.options,
													customLabel: newVal,
												};
												setAttributes({
													archiveTitle: { ...archiveTitle, options: options },
												});
											}}
										/>
									</PanelRow>
									{(archiveTitle.options.archiveType == "year" ||
										archiveTitle.options.archiveType == "month" ||
										archiveTitle.options.archiveType == "day") && (
											<>
												<PanelRow className="mb-4">
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Date Format", "combo-blocks")}
													</label>
													<PGDropdown
														position="bottom right"
														variant="secondary"
														options={dateFormats}
														buttonTitle="Choose"
														onChange={(option, index) => {
															var options = {
																...archiveTitle.options,
																dateFormat: option.value,
															};
															setAttributes({
																archiveTitle: {
																	...archiveTitle,
																	options: options,
																},
															});
														}}
														values={""}></PGDropdown>
												</PanelRow>
												<PanelRow className="mb-4">
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Format", "combo-blocks")}
													</label>
													<InputControl
														className="mr-2"
														value={archiveTitle.options.dateFormat}
														onChange={(newVal) => {
															var options = {
																...archiveTitle.options,
																dateFormat: newVal,
															};
															setAttributes({
																archiveTitle: {
																	...archiveTitle,
																	options: options,
																},
															});
														}}
													/>
												</PanelRow>
												{dateFormats[archiveTitle.options.dateFormat] !=
													undefined && (
														<div className="p-2 my-3 bg-gray-500 text-white">
															{dateFormats[archiveTitle.options.dateFormat].label}
														</div>
													)}
											</>
										)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Link To", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={archiveLinkToArgs}
											buttonTitle={
												archiveTitle.options.linkTo.length == 0
													? __("Choose", "combo-blocks")
													: archiveLinkToArgs[archiveTitle.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>
									{archiveTitle.options.linkTo == "customUrl" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom URL", "combo-blocks")}
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
													{archiveTitle.options.customUrl.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...archiveTitle.options,
																	customUrl: "",
																};
																setAttributes({
																	archiveTitle: {
																		...archiveTitle,
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
																value={archiveTitle.options.customUrl}
																onChange={(newVal) => {
																	var options = {
																		...archiveTitle.options,
																		customUrl: newVal.url,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
																			options: options,
																		},
																	});
																}}
															/>
															<div className="p-2">
																<span className="font-bold">Linked to:</span>{" "}
																{archiveTitle.options.customUrl.length != 0
																	? archiveTitle.options.customUrl
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
											{archiveTitle.options.customUrl.length > 0 && (
												<div className="p-2 pl-0 truncate ">
													<span className="font-bold">
														{__("Linked to:", "combo-blocks")}
													</span>{" "}
													{archiveTitle.options.customUrl}
												</div>
											)}
										</>
									)}
									{archiveTitle.options.linkTo.length == 0 && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Tag", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={archiveTitle.options.tag}
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
														...archiveTitle.options,
														tag: newVal,
													};
													setAttributes({
														archiveTitle: { ...archiveTitle, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									{archiveTitle.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link Target", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={archiveTitle.options.linkTarget}
													options={[
														{ label: __("Choose...", "combo-blocks"), value: "" },
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
															...archiveTitle.options,
															linkTarget: newVal,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
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
														var sdsd = archiveTitle.options.linkAttr.concat({
															id: "",
															val: "",
														});
														var options = {
															...archiveTitle.options,
															linkAttr: sdsd,
														};
														setAttributes({
															archiveTitle: {
																...archiveTitle,
																options: options,
															},
														});
														linkAttrObj();
													}}>
													Add
												</div>
											</PanelRow>
											{archiveTitle.options.linkAttr.map((x, i) => {
												return (
													<div className="my-2" key={i}>
														<PanelRow>
															<InputControl
																className="mr-2"
																placeholder="Name"
																value={archiveTitle.options.linkAttr[i].id}
																onChange={(newVal) => {
																	archiveTitle.options.linkAttr[i].id = newVal;
																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);
																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
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
																	archiveTitle.options.linkAttr[i].val = newVal;
																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);
																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
																			options: options,
																		},
																	});
																}}
															/>
															<span
																// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	archiveTitle.options.linkAttr.splice(i, 1);
																	var ssdsd =
																		archiveTitle.options.linkAttr.concat([]);
																	var options = {
																		...archiveTitle.options,
																		linkAttr: ssdsd,
																	};
																	setAttributes({
																		archiveTitle: {
																			...archiveTitle,
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
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={archiveTitle.options.class}
										onChange={(newVal) => {
											var options = { ...archiveTitle.options, class: newVal };
											setAttributes({
												archiveTitle: {
													styles: archiveTitle.styles,
													options: options,
												},
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={archiveTitle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												archiveTitle,
												"archiveTitle",
												archiveTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={onAddStyleArchiveTitle}
										onRemove={onRemoveStyleArchiveTitle}
										onBulkAdd={onBulkAddArchiveTitle}
										onReset={onResetArchiveTitle}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={archiveTitle}
										onChange={onPickCssLibraryArchiveTitle}
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
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Archive Title", "combo-blocks"),
													value: "beforeArchiveTitle",
												},
												{
													label: __("After Archive Title", "combo-blocks"),
													value: "afterArchiveTitle",
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
									{/* <PanelRow>
										<label htmlFor=""  className="font-medium text-slate-900 " >Prefix</label>
										<InputControl
											value={prefix.options.text}
											onChange={(newVal) => {
												var options = { ...prefix.options, text: newVal };
												setAttributes({
													prefix: { styles: prefix.styles, options: options },
												});
												// setAttributes({ prefix: { text: newVal, class: prefix.options.class, color: prefix.color, backgroundColor: prefix.backgroundColor } })
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
									{/* <PanelRow>
										<label htmlFor=""  className="font-medium text-slate-900 " >Postfix</label>
										<InputControl
											value={postfix.options.text}
											onChange={(newVal) => {
												var options = { ...postfix.options, text: newVal };
												setAttributes({
													postfix: { ...postfix, options: options },
												});
												// setAttributes({ postfix: { text: newVal, class: prefix.options.class, color: postfix.color, backgroundColor: postfix.backgroundColor } })
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
					{archiveTitle.options.archiveType.length == 0 && (
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
													'<!-- wp:combo-blocks/archive-title {"wrapper":{"options":{"tag":"div","class":"pg-archive-title"},"styles":{"display":{"Desktop":"block"},"padding":{"Desktop":"0px 0px 0px 110px"}}},"archiveTitle":{"options":{"tag":"div","archiveType":"auto","customLabel":"Archive: %s","dateFormat":"","linkTo":"","linkToUrl":"","linkToMetaKey":"","linkTarget":"_blank","linkAttr":[],"customUrl":"","class":"archiveTitle"},"styles":{"color":{"Desktop":"#000000 !important"},"fontSize":{"Desktop":"30px"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"700"},"lineHeight":{"Desktop":"155%"},"position":{"Desktop":"relative"}},"after":{"position":{"Desktop":"absolute !important"},"content":{"Desktop":"\u0022 \u0022"},"height":{"Desktop":"3px"},"width":{"Desktop":"100px"},"left":{"Desktop":"-110px"},"top":{"Desktop":"25px"},"backgroundColor":{"Desktop":"#000000"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"far fa-calendar-alt","position":"","class":"postdate-icon"},"styles":{"color":{"Desktop":"#000000 !important"},"fontSize":{"Desktop":"18px"},"margin":{"Desktop":"0px 10px 0px 0px"}}},"blockId":"pg191eb4e9541e","blockCssY":{"items":{".pg191eb4e9541e":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"30px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"700"},"line-height":{"Desktop":"155%"},"position":{"Desktop":"relative"}},".pg191eb4e9541e::after":{"position":{"Desktop":"absolute !important"},"content":{"Desktop":"\u0022 \u0022"},"height":{"Desktop":"3px"},"width":{"Desktop":"100px"},"left":{"Desktop":"-110px"},"top":{"Desktop":"25px"},"background-color":{"Desktop":"#000000"}},".pg191eb4e9541e .icon":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"margin":{"Desktop":"0px 10px 0px 0px"}},".pg191eb4e9541e .prefix":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"margin":{"Desktop":"0px 10px 0px 0px"}},".pg191eb4e9541e .postfix":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"margin":{"Desktop":"0px 0px 0px 10px"}}}}} /-->';
												wp.data
													.dispatch("core/block-editor")
													.replaceBlock(clientId, wp.blocks.parse(content));
											}}>
											{__("Skip", "combo-blocks")}
										</div>
									</div>
									<div {...blockProps} className="">
										<ComboBlocksVariationsPicker
											blockName={"archive-title"}
											blockId={blockId}
											clientId={clientId}
											onChange={onPickBlockVariation}
										/>
									</div>
								</div>
							</div>
						</>
					)}

					{archiveTitle.options.archiveType.length > 0 && (
						<>
							{wrapper.options.tag && (
								<CustomTag {...blockProps}>
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
									{archiveTitle.options.linkTo.length > 0 && (
										<a
											className="archiveTitle"
											onClick={handleLinkClick}
											{...linkAttrItems}
											target={archiveTitle.options.linkTarget}
											href={postUrl}>
											{icon.options.position == "beforeArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{archiveTitleEdited}
											{icon.options.position == "afterArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</a>
									)}
									{archiveTitle.options.linkTo.length == 0 && (
										<CustomTagPostTitle className="archiveTitle">
											{icon.options.position == "beforeArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{archiveTitleEdited}
											{icon.options.position == "afterArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</CustomTagPostTitle>
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
									{archiveTitle.options.linkTo.length > 0 && (
										<a
											// className="archiveTitle"
											{...blockProps}
											onClick={handleLinkClick}
											{...linkAttrItems}
											target={archiveTitle.options.linkTarget}
											href={postUrl}>
											{icon.options.position == "beforePrefix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{prefix.options.text && (
												<span className={prefix.options.class}>
													{prefixText}
												</span>
											)}
											{icon.options.position == "afterPrefix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{icon.options.position == "beforeArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{archiveTitleEdited}
											{icon.options.position == "afterArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{icon.options.position == "beforePostfix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{postfix.options.text && (
												<span className={postfix.options.class}>
													{postfixText}
												</span>
											)}
											{icon.options.position == "afterPostfix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</a>
									)}
									{archiveTitle.options.linkTo.length == 0 && (
										<CustomTagPostTitle {...blockProps}>
											{icon.options.position == "beforePrefix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{prefix.options.text && (
												<span className={prefix.options.class}>
													{prefixText}
												</span>
											)}
											{icon.options.position == "afterPrefix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{icon.options.position == "beforeArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{archiveTitleEdited}
											{icon.options.position == "afterArchiveTitle" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{icon.options.position == "beforePostfix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{postfix.options.text && (
												<span className={postfix.options.class}>
													{postfixText}
												</span>
											)}
											{icon.options.position == "afterPostfix" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
										</CustomTagPostTitle>
									)}
								</>
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
