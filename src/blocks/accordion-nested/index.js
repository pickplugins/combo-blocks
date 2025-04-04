import {
	store as blockEditorStore,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps
} from "@wordpress/block-editor";
import { createBlock, createBlocksFromInnerBlocksTemplate, registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl
} from "@wordpress/components";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import {
	useEffect,
	useState
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	Icon,
	mediaAndText,
	settings,
	styles
} from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
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
				<path d="M160 27H0V45.8H160V27Z" fill="url(#paint0_linear_61_752)" />
				<path
					d="M17.6226 38.8999C17.4235 38.8999 17.3238 38.7998 17.2242 38.6998L13.9385 34.8999C13.7394 34.6999 13.7395 34.2998 14.0382 34.0998C14.2373 33.8998 14.6356 33.8998 14.8348 34.1998L17.722 37.5998L20.6095 34.1998C20.8087 33.9998 21.1072 33.8998 21.4059 34.0998C21.605 34.2998 21.7047 34.5999 21.5055 34.8999L18.2199 38.6998C17.9212 38.7998 17.8217 38.8999 17.6226 38.8999Z"
					fill="white"
				/>
				<path
					d="M104.443 33.8999H26.9819V38.7999H104.443V33.8999Z"
					fill="white"
				/>
				<path d="M160 71.3999H0V110.1H160V71.3999Z" fill="#C15940" />
				<path d="M160 49.2002H0V68.0002H160V49.2002Z" fill="#C15940" />
				<path
					d="M17.623 56.2002C17.8221 56.2002 17.9216 56.3003 18.0211 56.4003L21.3068 60.2002C21.5059 60.4002 21.5058 60.8002 21.2071 61.0002C21.008 61.2002 20.6097 61.2003 20.4106 60.9003L17.5233 57.5002L14.636 60.9003C14.4369 61.1003 14.1382 61.2002 13.8395 61.0002C13.5408 60.8002 13.5407 60.5002 13.7398 60.2002L17.0255 56.4003C17.3242 56.2003 17.4238 56.2002 17.623 56.2002Z"
					fill="white"
				/>
				<path
					d="M104.443 56.2002H26.9819V61.1002H104.443V56.2002Z"
					fill="white"
				/>
				<path
					d="M160 113.5H0V132.3H160V113.5Z"
					fill="url(#paint1_linear_61_752)"
				/>
				<path
					d="M17.6226 125.4C17.4235 125.4 17.3238 125.3 17.2242 125.2L13.9385 121.4C13.7394 121.2 13.7395 120.8 14.0382 120.6C14.2373 120.4 14.6356 120.4 14.8348 120.7L17.722 124.1L20.6095 120.7C20.8087 120.5 21.1072 120.4 21.4059 120.6C21.605 120.8 21.7047 121.1 21.5055 121.4L18.2199 125.2C17.9212 125.3 17.8217 125.4 17.6226 125.4Z"
					fill="white"
				/>
				<path d="M104.443 120.4H26.9819V125.3H104.443V120.4Z" fill="white" />
				<defs>
					<linearGradient
						id="paint0_linear_61_752"
						x1="0"
						y1="36.4"
						x2="160"
						y2="36.4"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_752"
						x1="0"
						y1="122.9"
						x2="160"
						y2="122.9"
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
		var visible = attributes.visible;
		var header = attributes.header;
		var headerActive = attributes.headerActive;
		var headerLabel = attributes.headerLabel;
		var labelIcon = attributes.labelIcon;
		var labelCounter = attributes.labelCounter;
		var searchWrap = attributes.searchWrap;
		var searchInput = attributes.searchInput;
		var schema = attributes.schema;
		var content = attributes.content;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;
		var accOptions = attributes.accOptions;
		var blockCssY = attributes.blockCssY;
		let isProFeature = applyFilters("isProFeature", true);
		var breakPointX = myStore.getBreakPoint();
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		const contentSelector = blockClass + " > .accordion-content";
		const headerSelector = blockClass + " > .accordion-header";
		const headerActiveSelector = blockClass + " > .accordion-header-active";
		const headerLabelSelector =
			blockClass + " > .accordion-header > .accordion-header-label";
		const labelIconSelector =
			blockClass + " > .accordion-header .accordion-label-icon";
		const labelCounterSelector =
			blockClass + " > .accordion-header .accordion-label-counter";
		const searchWrapSelector = blockClass + "-accordion-search-wrap";
		const searchInputSelector = blockClass + "-accordion-search-input";
		const iconSelector = blockClass + " > .accordion-header >  .accordion-icon";
		const iconToggleSelector =
			blockClass + " > .accordion-header >  .accordion-icon-toggle";
		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		var formattedPrompt = "Respond only with question answer as json array and no other text. Do not include any explanations, introductions, or concluding remarks.";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
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
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		var childBlocks =
			select("core/block-editor").getBlocksByClientId(clientId)[0]?.innerBlocks;
		useEffect(() => {
			var count = 0;
			childBlocks.forEach(function (childBlock) {
				count++;
				var childClientId = childBlock.clientId;
				var childAttributes = { ...childBlock.attributes };
				childAttributes.count = count;
				dispatch("core/block-editor").updateBlockAttributes(
					childClientId,
					childAttributes
				);
			});
		}, [childBlocks]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[contentSelector] = content;
			blockCssObj[headerActiveSelector] = headerActive;
			blockCssObj[headerSelector] = header;
			blockCssObj[headerLabelSelector] = headerLabel;
			blockCssObj[labelCounterSelector] = labelCounter;
			blockCssObj[labelIconSelector] = labelIcon;
			blockCssObj[searchWrapSelector] = searchWrap;
			blockCssObj[searchInputSelector] = searchInput;
			blockCssObj[iconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
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
				var headerX = attributes.header;
				var headerActiveX = attributes.headerActive;
				var headerLabelX = attributes.headerLabel;
				var labelIconX = attributes.labelIcon;
				var labelCounterX = attributes.labelCounter;
				var schemaX = attributes.schema;
				var contentX = attributes.content;
				var iconX = attributes.icon;
				var iconToggleX = attributes.iconToggle;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					//var wrapperY = { ...wrapperX, options: wrapper.options }
					setAttributes({ wrapper: wrapperX });
					blockCssObj[wrapperSelector] = wrapperX;
				}
				if (headerX != undefined) {
					//var headerY = { ...headerX, options: header.options }
					setAttributes({ header: headerX });
					blockCssObj[headerSelector] = headerX;
				}
				if (headerActiveX != undefined) {
					//var headerActiveY = { ...headerActiveX, options: headerActive.options }
					setAttributes({ headerActive: headerActiveX });
					blockCssObj[headerActiveSelector] = headerActiveX;
				}
				if (headerLabelX != undefined) {
					//var headerLabelY = { ...headerLabelX, options: headerLabel.options }
					setAttributes({ headerLabel: headerLabelX });
					blockCssObj[headerLabelSelector] = headerLabelX;
				}
				if (labelIconX != undefined) {
					//var labelIconY = { ...labelIconX, options: labelIcon.options }
					setAttributes({ labelIcon: labelIconX });
					blockCssObj[labelIconSelector] = labelIconX;
				}
				if (labelCounterX != undefined) {
					//var labelCounterY = { ...labelCounterX, options: labelCounter.options }
					setAttributes({ labelCounter: labelCounterX });
					blockCssObj[labelCounterSelector] = labelCounterX;
				}
				if (schemaX != undefined) {
					var schemaY = { ...schemaX, options: schema.options };
					setAttributes({ schema: schemaY });
					//blockCssObj[schemaSelector] = schemaY;
				}
				if (contentX != undefined) {
					//var contentY = { ...contentX, options: content.options }
					setAttributes({ content: contentX });
					blockCssObj[contentSelector] = contentX;
				}
				if (iconX != undefined) {
					//var iconY = { ...iconX, options: icon.options }
					setAttributes({ icon: iconX });
					blockCssObj[iconSelector] = iconX;
				}
				if (iconToggleX != undefined) {
					//var iconToggleY = { ...iconToggleX, options: iconToggle.options }
					setAttributes({ iconToggle: iconToggleX });
					blockCssObj[iconToggleSelector] = iconToggleX;
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
		function onRemoveStyleHeader(sudoScource, key) {
			let obj = { ...header };
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
			setAttributes({ header: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerSelector
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
		function onRemoveStyleHeaderActive(sudoScource, key) {
			let obj = { ...headerActive };
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
			setAttributes({ headerActive: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
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
		function onRemoveStyleHeaderLabel(sudoScource, key) {
			let obj = { ...headerLabel };
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
			setAttributes({ headerLabel: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
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
		function onRemoveStyleLabelCounter(sudoScource, key) {
			let obj = { ...labelCounter };
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
			setAttributes({ labelCounter: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
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
		function onRemoveStyleLabelIcon(sudoScource, key) {
			let obj = { ...labelIcon };
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
			setAttributes({ labelIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelIconSelector
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
		function onRemoveStyleContent(sudoScource, key) {
			let obj = { ...content };
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
			setAttributes({ content: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				contentSelector
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
		function onRemoveStyleIconToggle(sudoScource, key) {
			let obj = { ...iconToggle };
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
			setAttributes({ iconToggle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
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
		function onRemoveStyleSearchWrap(sudoScource, key) {
			let obj = { ...searchWrap };
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
			setAttributes({ searchWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
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
		function onRemoveStyleSearchInput(sudoScource, key) {
			let obj = { ...searchInput };
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
			setAttributes({ searchInput: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
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
			myStore.onAddStyleElement(sudoScource, key, wrapper, "wrapper", setAttributes);
		}
		function onChangeStyleHeader(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ header: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerSelector
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
		function onAddStyleHeader(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ header: object });
		}
		function onPickCssLibraryHeader(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				header[sudoScource] = sudoScourceArgs;
			});
			var headerX = Object.assign({}, header);
			setAttributes({ header: headerX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerSelector
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
		// #########
		function onChangeStyleHeaderActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ headerActive: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
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
		function onAddStyleHeaderActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, headerActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerActive: object });
		}
		function onPickCssLibraryHeaderActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerActive[sudoScource] = sudoScourceArgs;
			});
			var headerActiveX = Object.assign({}, headerActive);
			setAttributes({ headerActive: headerActiveX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerActiveSelector
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
		//########
		function onChangeStyleHeaderLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ headerLabel: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
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
		function onAddStyleHeaderLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerLabel: object });
		}
		function onPickCssLibraryHeaderLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerLabel[sudoScource] = sudoScourceArgs;
			});
			var headerLabelX = Object.assign({}, headerLabel);
			setAttributes({ headerLabel: headerLabelX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerLabelSelector
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
		function onChangeStyleLabelCounter(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ labelCounter: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
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
		function onAddStyleLabelCounter(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelCounter: object });
		}
		function onPickCssLibraryLabelCounter(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				labelCounter[sudoScource] = sudoScourceArgs;
			});
			var labelCounterX = Object.assign({}, labelCounter);
			setAttributes({ labelCounter: labelCounterX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelCounterSelector
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

		function onChangeStyleLabelIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ labelIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelIconSelector
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
		function onAddStyleLabelIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelIcon: object });
		}
		function onChangeStyleContent(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ content: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				contentSelector
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
		function onAddStyleContent(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ content: object });
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
		function onChangeStyleIconToggle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ iconToggle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
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
		function onAddStyleIconToggle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconToggle: object });
		}
		function onPickCssLibraryIconToggle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				iconToggle[sudoScource] = sudoScourceArgs;
			});
			var iconToggleX = Object.assign({}, iconToggle);
			setAttributes({ iconToggle: iconToggleX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconToggleSelector
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
		function onPickCssLibraryContent(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				content[sudoScource] = sudoScourceArgs;
			});
			var contentX = Object.assign({}, content);
			setAttributes({ content: contentX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					contentSelector
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
		function onChangeStyleSearchWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ searchWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
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
		function onAddStyleSearchWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchWrap: object });
		}
		function onChangeStyleSearchInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ searchInput: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
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
		function onAddStyleSearchInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchInput: object });
		}
		// add bulk style start
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
		function onBulkAddHeader(sudoScource, cssObj) {
			let obj = Object.assign({}, header);
			obj[sudoScource] = cssObj;
			setAttributes({ header: obj });
			var selector = myStore.getElementSelector(sudoScource, headerSelector);
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
		function onBulkAddHeaderActive(sudoScource, cssObj) {
			let obj = Object.assign({}, headerActive);
			obj[sudoScource] = cssObj;
			setAttributes({ headerActive: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
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
		function onBulkAddHeaderLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, headerLabel);
			obj[sudoScource] = cssObj;
			setAttributes({ headerLabel: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
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
		function onBulkAddLabelIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, labelIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ labelIcon: obj });
			var selector = myStore.getElementSelector(sudoScource, labelIconSelector);
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
		function onBulkAddLabelCounter(sudoScource, cssObj) {
			let obj = Object.assign({}, labelCounter);
			obj[sudoScource] = cssObj;
			setAttributes({ labelCounter: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
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
		function onBulkAddContent(sudoScource, cssObj) {
			let obj = Object.assign({}, content);
			obj[sudoScource] = cssObj;
			setAttributes({ content: obj });
			var selector = myStore.getElementSelector(sudoScource, contentSelector);
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
		function onBulkAddIconToggle(sudoScource, cssObj) {
			let obj = Object.assign({}, iconToggle);
			obj[sudoScource] = cssObj;
			setAttributes({ iconToggle: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
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
		// add bulk style end
		// reset style start
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
		function onResetHeader(sudoScources) {
			let obj = Object.assign({}, header);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						headerSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ header: obj });
		}
		function onResetHeaderActive(sudoScources) {
			let obj = Object.assign({}, headerActive);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						headerActiveSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ headerActive: obj });
		}
		function onResetHeaderLabel(sudoScources) {
			let obj = Object.assign({}, headerLabel);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						headerLabelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ headerLabel: obj });
		}
		function onResetLabelIcon(sudoScources) {
			let obj = Object.assign({}, labelIcon);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ labelIcon: obj });
		}
		function onResetLabelCounter(sudoScources) {
			let obj = Object.assign({}, labelCounter);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelCounterSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ labelCounter: obj });
		}
		function onResetContent(sudoScources) {
			let obj = Object.assign({}, content);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						contentSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ content: obj });
		}
		function onResetIcon(sudoScources) {
			let obj = Object.assign({}, icon);
			Object.entries(sudoScources).map((args) => {
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
		function onResetIconToggle(sudoScources) {
			let obj = Object.assign({}, iconToggle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconToggleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ iconToggle: obj });
		}
		// reset style end
		const ALLOWED_BLOCKS = [
			"combo-blocks/accordion-nested-item",
			"combo-blocks/accordion",
		];
		const MY_TEMPLATE = [
			["combo-blocks/accordion-nested-item", {}],
			["combo-blocks/accordion-nested-item", {}],
		];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options?.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			// directInsert : true,
			template: MY_TEMPLATE,
			//templateInsertUpdatesSelection: true,
		});
		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
			const slide = createBlock("combo-blocks/accordion-nested-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);
			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};
		// const selectedBlock = useSelect((select) =>
		// 	select("core/block-editor").getSelectedBlock()
		// );
		// const dupChild = () => {
		// 	var serelized = wp.blocks.serialize(selectedBlock);
		// 	wp.data
		// 		.dispatch("core/block-editor")
		// 		.insertBlocks(wp.blocks.parse(serelized));
		// }
		var accOptionsArgs = {
			active: { label: __("Active", "combo-blocks"), value: "0" },
			animate: { label: __("Animate", "combo-blocks"), value: "500" },
			collapsible: { label: __("Collapsible", "combo-blocks"), value: false },
			disabled: { label: __("Disabled", "combo-blocks"), value: false },
			event: { label: __("Event", "combo-blocks"), value: "click" },
			// header: { label: "Header", value: "div" },
			heightStyle: { label: __("Height Style", "combo-blocks"), value: "auto" },
		};
		var RemoveAccArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var accOptionsX = { ...accOptions };
						delete accOptionsX[index];
						setAttributes({ accOptions: accOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};
		// var RemoveAccArgRes = function ({ index }) {
		// 	return (
		// 		<span
		// 			className="cursor-pointer hover:bg-red-500 hover:text-white "
		// 			onClick={(ev) => {
		// 				var sliderOptionsResX = { ...sliderOptionsRes };
		// 				delete sliderOptionsResX[index];
		// 				setAttributes({ sliderOptionsRes: sliderOptionsResX });
		// 			}}>
		// 			<Icon icon={close} />
		// 		</span>
		// 	);
		// };
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="flex items-center gap-3 ">
							<div
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
								// className="bg-gray-700 hover:bg-gray-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
								onClick={(ev) => {
									addChild();
								}}>
								{__("Add Item", "combo-blocks")}
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
													objective: "generateFAQ",
												}}
												autoUpdate={AIautoUpdate}
												onResponseLoaded={(value, autoUpdate) => {
													// if (autoUpdate) {
													// 	var options = { ...text.options, content: value };
													// 	setAttributes({ text: { ...text, options: options } });
													// }
												}}
												clickHandle={(value, action) => {
													var valueObj = JSON.parse(value);

													if (action == "prepend") {
													}
													if (action == "append") {
														valueObj.map((item) => {
															var answer = item.answer;
															var question = item.question;

															const innerBlock2 = createBlock(
																"core/paragraph",
																{
																	content: answer,
																	align: "",
																}
															);

															var childBlocks = wp.data
																.select(blockEditorStore)
																.getBlocks(clientId);
															const slide = createBlock(
																"combo-blocks/accordion-nested-item", // Parent block type
																{
																	// Parent block attributes
																	headerLabel: {
																		options: { text: question, tag: "div" },
																	},
																},
																[innerBlock2] // Array of inner blocks
															);
															const position = childBlocks.length;
															dispatch("core/block-editor").insertBlock(
																slide,
																position,
																clientId
															);
															wp.data
																.dispatch("core/block-editor")
																.selectBlock(clientId);
														});
													}
													if (action == "replace") {
														var blocksX = [];

														valueObj.map((item) => {
															var answer = item.answer;
															var question = item.question;

															const innerBlock2 = createBlock(
																"core/paragraph",
																{
																	content: answer,
																	align: "",
																}
															);

															var childBlocks = wp.data
																.select(blockEditorStore)
																.getBlocks(clientId);
															const slide = createBlock(
																"combo-blocks/accordion-nested-item", // Parent block type
																{
																	// Parent block attributes
																	headerLabel: {
																		options: { text: question, tag: "div" },
																	},
																},
																[innerBlock2] // Array of inner blocks
															);
															blocksX.push(slide);
														});

														// var blocks = parse(postContent);
														// var arrs = ObjectToArr(blocksX);
														replaceInnerBlocks(
															clientId,
															createBlocksFromInnerBlocksTemplate(blocksX)
														);
													}

													//setAttributes({ itemsX: { ...itemsX, items: itemx } });
												}}
											/>
										</div>
									</Popover>
								)}
							</div>
						</div>

						{/* <div onClick={(ev) => {
							dupChild();
						}}>wrapper</div> */}
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
									{/* <PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options?.tag}
											options={[
												{ label: __("Choose","combo-blocks"), value: "" },
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
									</PanelRow> */}
									<div className="hidden">
										<PanelRow className="my-3">
											<label>Accordion Options</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												buttonTitle={"Choose"}
												options={accOptionsArgs}
												onChange={(option, index) => {
													var accOptionsX = { ...accOptions };
													accOptionsX[index] = option.value;
													setAttributes({ accOptions: accOptionsX });
												}}
												values=""></PGDropdown>
										</PanelRow>
										<div className="flex flex-col gap-2 items-start">
											{Object.entries(accOptions).map((item, index) => {
												var id = item[0];
												var value = item[1];
												return (
													<div key={index}>
														{id == "active" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Active?</span>
																</div>
																<InputControl
																	value={value}
																	type="number"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "animate" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Animate?</span>
																</div>
																<InputControl
																	value={value}
																	type="number"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "header" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Header?</span>
																</div>
																<InputControl
																	value={value}
																	type="text"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "event" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Event?</span>
																</div>
																<InputControl
																	value={value}
																	type="text"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "disabled" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Disabled?</span>
																</div>
																<ToggleControl
																	help={
																		value
																			? __("Enabled", "combo-blocks")
																			: __("Disabled.", "combo-blocks")
																	}
																	checked={value ? true : false}
																	onChange={(e) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = value ? false : true;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "collapsible" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Collapsible?</span>
																</div>
																<ToggleControl
																	help={
																		value
																			? __("Enabled", "combo-blocks")
																			: __("Disabled.", "combo-blocks")
																	}
																	checked={value ? true : false}
																	onChange={(e) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = value ? false : true;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "heightStyle" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Height Style?</span>
																</div>
																<SelectControl
																	label=""
																	value={value}
																	options={[
																		{ label: "Auto", value: "auto" },
																		{ label: "Fill", value: "fill" },
																		{ label: "Content", value: "content" },
																	]}
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
													</div>
												);
											})}
										</div>
									</div>
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
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Header"
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
											value={header.options.tag}
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
												var options = { ...header.options, tag: newVal };
												setAttributes({
													header: { ...header, options: options },
												});
											}}
										/>
									</PanelRow>
									<ToggleControl
										label={__("Enable Override Child?", "combo-blocks")}
										help={
											header.options.overrideChild
												? __("Override Child Enabled", "combo-blocks")
												: __("Override Child Disabled.", "combo-blocks")
										}
										checked={header.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...header.options,
												overrideChild: header.options.overrideChild
													? false
													: true,
											};
											setAttributes({
												header: { ...header, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={header}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												header,
												"header",
												headerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												header,
												"header",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												header,
												"header",
												headerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												header,
												"header",
												headerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												header,
												"header",
												headerSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={header}
										onChange={onPickCssLibraryHeader}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Header Active"
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
										obj={headerActive}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												headerActive,
												"headerActive",
												headerActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												headerActive,
												"headerActive",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												headerActive,
												"headerActive",
												headerActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												headerActive,
												"headerActive",
												headerActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												headerActive,
												"headerActive",
												headerActiveSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerActive}
										onChange={onPickCssLibraryHeaderActive}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Header Label"
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
											value={headerLabel.options.tag}
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
												{ label: "a", value: "a" },
											]}
											onChange={(newVal) => {
												var options = { ...headerLabel.options, tag: newVal };
												setAttributes({
													headerLabel: { ...headerLabel, options: options },
												});
											}}
										/>
									</PanelRow>
									<ToggleControl
										label={__("Enable Override Child?", "combo-blocks")}
										help={
											headerLabel.options.overrideChild
												? __("Override Child Enabled", "combo-blocks")
												: __("Override Child Disabled.", "combo-blocks")
										}
										checked={headerLabel.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...headerLabel.options,
												overrideChild: headerLabel.options.overrideChild
													? false
													: true,
											};
											setAttributes({
												headerLabel: { ...headerLabel, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerLabel}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												headerLabel,
												"headerLabel",
												headerLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												headerLabel,
												"headerLabel",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												headerLabel,
												"headerLabel",
												headerLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												headerLabel,
												"headerLabel",
												headerLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												headerLabel,
												"headerLabel",
												headerLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerLabel}
										onChange={onPickCssLibraryHeaderLabel}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Label Counter"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label Counter", "combo-blocks")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
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
										label={__("Enable Header Counter?", "combo-blocks")}
										help={
											labelCounter.options?.enable
												? __("Header Counter Enabled", "combo-blocks")
												: __("Header Counter Disabled.", "combo-blocks")
										}
										checked={labelCounter.options.enable ? true : false}
										onChange={(e) => {
											var options = {
												...labelCounter.options,
												enable: labelCounter.options.enable ? false : true,
											};
											setAttributes({
												labelCounter: { ...labelCounter, options: options },
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Counter position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={labelCounter.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{ label: __("Left", "combo-blocks"), value: "left" },
												{ label: __("Right", "combo-blocks"), value: "right" },
												{
													label: __("Before Label Text", "combo-blocks"),
													value: "beforeLabelText",
												},
												{
													label: __("After Label Text", "combo-blocks"),
													value: "afterLabelText",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...labelCounter.options,
													position: newVal,
												};
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={labelCounter.options.tag}
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
												var options = { ...labelCounter.options, tag: newVal };
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
												});
											}}
										/>
									</PanelRow>
									<ToggleControl
										label={__("Enable Override Child?", "combo-blocks")}
										help={
											labelCounter.options.overrideChild
												? __("Override Child Enabled", "combo-blocks")
												: __("Override Child Disabled.", "combo-blocks")
										}
										checked={labelCounter.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...labelCounter.options,
												overrideChild: labelCounter.options.overrideChild
													? false
													: true,
											};
											setAttributes({
												labelCounter: { ...labelCounter, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelCounter}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												labelCounter,
												"labelCounter",
												labelCounterSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												labelCounter,
												"labelCounter",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												labelCounter,
												"labelCounter",
												labelCounterSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												labelCounter,
												"labelCounter",
												labelCounterSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												labelCounter,
												"labelCounter",
												labelCounterSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={labelCounter}
										onChange={onPickCssLibraryLabelCounter}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Label Icon"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label Icon", "combo-blocks")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
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
								]}>
								<PGtab name="options">
									<PanelRow className="pb-2">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Label Icon position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={labelIcon.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Label", "combo-blocks"),
													value: "beforeLabel",
												},
												{
													label: __("After Label", "combo-blocks"),
													value: "afterLabel",
												},
												{
													label: __("Before Label Text", "combo-blocks"),
													value: "beforeLabelText",
												},
												{
													label: __("After Label Text", "combo-blocks"),
													value: "afterLabelText",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...labelIcon.options,
													position: newVal,
												};
												setAttributes({
													labelIcon: { ...labelIcon, options: options },
												});
											}}
										/>
									</PanelRow>
									{labelIcon.options.position.length > 0 && (
										<PanelRow className="pb-2">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Choose Icon", "combo-blocks")}
											</label>
											<PGIconPicker
												library={labelIcon.options.library}
												srcType={labelIcon.options.srcType}
												iconSrc={labelIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...labelIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														labelIcon: { ...labelIcon, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									<ToggleControl
										label={__("Enable Override Child?", "combo-blocks")}
										help={
											labelIcon.options.overrideChild ? (
												<>{__("Override Child Enabled", "combo-blocks")}</>
											) : (
												<>{__("Override Child Disabled.", "combo-blocks")}</>
											)
										}
										checked={labelIcon.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...labelIcon.options,
												overrideChild: labelIcon.options.overrideChild
													? false
													: true,
											};
											setAttributes({
												labelIcon: { ...labelIcon, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelIcon}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												labelIcon,
												"labelIcon",
												labelIconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												labelIcon,
												"labelIcon",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												labelIcon,
												"labelIcon",
												labelIconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												labelIcon,
												"labelIcon",
												labelIconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												labelIcon,
												"labelIcon",
												labelIconSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Content"
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
											value={content.options.tag}
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
												var options = { ...content.options, tag: newVal };
												setAttributes({
													content: { ...content, options: options },
												});
											}}
										/>
									</PanelRow>
									<div className="mt-2">
										<ToggleControl
											label={__("Enable Override Child?", "combo-blocks")}
											help={
												content.options.overrideChild
													? "Override Child Enabled"
													: "Override Child Disabled."
											}
											checked={content.options.overrideChild ? true : false}
											onChange={(e) => {
												var options = {
													...content.options,
													overrideChild: content.options.overrideChild
														? false
														: true,
												};
												setAttributes({
													content: { ...content, options: options },
												});
											}}
										/>
									</div>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={content}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												content,
												"content",
												contentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												content,
												"content",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												content,
												"content",
												contentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												content,
												"content",
												contentSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												content,
												"content",
												contentSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={content}
										onChange={onPickCssLibraryContent}
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
											onChange={(arg) => {
												var options = {
													...icon.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Toggled Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={iconToggle.options.library}
											srcType={iconToggle.options.srcType}
											iconSrc={iconToggle.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...iconToggle.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({
													iconToggle: { ...iconToggle, options: options },
												});
											}}
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
												{ label: __("Left", "combo-blocks"), value: "left" },
												{ label: __("Right", "combo-blocks"), value: "right" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
									<ToggleControl
										label={__("Enable Override Child?", "combo-blocks")}
										help={
											icon.options.overrideChild ? (
												<>{__("Override Child Enabled", "combo-blocks")}</>
											) : (
												<>{__("Override Child Disabled.", "combo-blocks")}</>
											)
										}
										checked={icon.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...icon.options,
												overrideChild: icon.options.overrideChild
													? false
													: true,
											};
											setAttributes({
												icon: { ...icon, options: options },
											});
										}}
									/>
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
							title={__("Schema", "combo-blocks")}
							initialOpen={false}>
							<ToggleControl
								label={__("Enable Schema?", "combo-blocks")}
								help={
									schema.options.enable
										? __("Schema Enabled", "combo-blocks")
										: __("Schema Disabled.", "combo-blocks")
								}
								checked={schema.options.enable ? true : false}
								onChange={(e) => {
									var options = {
										...schema.options,
										enable: schema.options.enable ? false : true,
									};
									setAttributes({ schema: { ...schema, options: options } });
								}}
							/>
						</PGtoggle>
						<PGtoggle
							className="font-medium hidden text-slate-900 "
							title={__("Search", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-3">
								<ToggleControl
									label={__("Enable Search?", "combo-blocks")}
									help={
										searchWrap.options.enable
											? __("Search Enabled", "combo-blocks")
											: __("Search Disabled.", "combo-blocks")
									}
									disabled={isProFeature}
									checked={searchWrap.options.enable ? true : false}
									onChange={(e) => {
										var options = {
											...searchWrap.options,
											enable: searchWrap.options.enable ? false : true,
										};
										setAttributes({
											searchWrap: { ...searchWrap, options: options },
										});
									}}
								/>
								{isProFeature && (
									<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
										<a
											target="_blank"
											href={
												"https://comboblocks.com/pricing/?utm_source=search&utm_term=blockaccordion&utm_campaign=pluginComboBlocks&utm_medium=search"
											}>
											{__("Pro", "combo-blocks")}
										</a>
									</span>
								)}
							</PanelRow>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Search Wrap", "combo-blocks")}
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
											icon: styles,
											className: "tab-css",
										},
									]}>
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													searchWrap,
													"searchWrap",
													searchWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													searchWrap,
													"searchWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													searchWrap,
													"searchWrap",
													searchWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													searchWrap,
													"searchWrap",
													searchWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													searchWrap,
													"searchWrap",
													searchWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Search Input", "combo-blocks")}
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
											icon: styles,
											className: "tab-css",
										},
									]}>
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchInput}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													searchInput,
													"searchInput",
													searchInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													searchInput,
													"searchInput",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													searchInput,
													"searchInput",
													searchInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													searchInput,
													"searchInput",
													searchInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													searchInput,
													"searchInput",
													searchInputSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
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
					{!hasInnerBlocks && (
						<div {...innerBlocksProps} className="flex justify-center my-4">
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
														"combo-blocks/accordion-nested-item",
														{ blockId: "XYZ123" },
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
										blockName={"accordion-nested"}
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
							{searchWrap.options.enable && (
								<div className={`${blockId}-accordion-search-wrap`}>
									<input
										className={`${blockId}-accordion-search-input my-4`}
										type={searchInput.options.type}
										placeholder={searchInput.options.placeholder}
										value={searchInput.options.value}
									/>
								</div>
							)}
							{innerBlocksProps.children}
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		var blockId = attributes.blockId;
		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-accordion-nested`,
		});
		//const innerBlocksProps = useInnerBlocksProps.save(blockProps);
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);
		return <>{children}</>;
		//return null;
	},
});
