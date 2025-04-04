import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { dispatch, select, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
// import { select } from "@wordpress/data";
import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { brush, close, Icon, mediaAndText, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
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
				width="162"
				height="160"
				viewBox="0 0 162 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M161 27H1V45.8H161V27Z" fill="url(#paint0_linear_61_765)" />
				<path
					d="M18.6226 38.8999C18.4235 38.8999 18.3238 38.7998 18.2242 38.6998L14.9385 34.8999C14.7394 34.6999 14.7395 34.2998 15.0382 34.0998C15.2373 33.8998 15.6356 33.8998 15.8348 34.1998L18.722 37.5998L21.6095 34.1998C21.8087 33.9998 22.1072 33.8998 22.4059 34.0998C22.605 34.2998 22.7047 34.5999 22.5055 34.8999L19.2199 38.6998C18.9212 38.7998 18.8217 38.8999 18.6226 38.8999Z"
					fill="white"
				/>
				<path
					d="M105.443 33.8999H27.9819V38.7999H105.443V33.8999Z"
					fill="white"
				/>
				<path
					d="M161 71.3999H1V110.1H161V71.3999Z"
					fill="#C15940"
					stroke="#8E240B"
					strokeWidth="2"
					strokeDasharray="6 6"
				/>
				<path d="M161 49.2002H1V68.0002H161V49.2002Z" fill="#C15940" />
				<path
					d="M18.623 56.2002C18.8221 56.2002 18.9216 56.3003 19.0211 56.4003L22.3068 60.2002C22.5059 60.4002 22.5058 60.8002 22.2071 61.0002C22.008 61.2002 21.6097 61.2003 21.4106 60.9003L18.5233 57.5002L15.636 60.9003C15.4369 61.1003 15.1382 61.2002 14.8395 61.0002C14.5408 60.8002 14.5407 60.5002 14.7398 60.2002L18.0255 56.4003C18.3242 56.2003 18.4238 56.2002 18.623 56.2002Z"
					fill="white"
				/>
				<path
					d="M105.443 56.2002H27.9819V61.1002H105.443V56.2002Z"
					fill="white"
				/>
				<path
					d="M161 113.5H1V132.3H161V113.5Z"
					fill="url(#paint1_linear_61_765)"
				/>
				<path
					d="M18.6226 125.4C18.4235 125.4 18.3238 125.3 18.2242 125.2L14.9385 121.4C14.7394 121.2 14.7395 120.8 15.0382 120.6C15.2373 120.4 15.6356 120.4 15.8348 120.7L18.722 124.1L21.6095 120.7C21.8087 120.5 22.1072 120.4 22.4059 120.6C22.605 120.8 22.7047 121.1 22.5055 121.4L19.2199 125.2C18.9212 125.3 18.8217 125.4 18.6226 125.4Z"
					fill="white"
				/>
				<path d="M105.443 120.4H27.9819V125.3H105.443V120.4Z" fill="white" />
				<defs>
					<linearGradient
						id="paint0_linear_61_765"
						x1="1"
						y1="36.4"
						x2="161"
						y2="36.4"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_765"
						x1="1"
						y1="122.9"
						x2="161"
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
		var parentIcon =
			context["combo-blocks/accordionNestedIcon"] == undefined
				? null
				: context["combo-blocks/accordionNestedIcon"];
		var parentIconToggle =
			context["combo-blocks/accordionNestedIconToggle"] == undefined
				? null
				: context["combo-blocks/accordionNestedIconToggle"];
		var parentLabelIcon =
			context["combo-blocks/accordionNestedLabelIcon"] == undefined
				? null
				: context["combo-blocks/accordionNestedLabelIcon"];
		var parentLabelCounter =
			context["combo-blocks/accordionNestedLabelCounter"] == undefined
				? null
				: context["combo-blocks/accordionNestedLabelCounter"];
		var parentContentWrapper =
			context["combo-blocks/accordionNestedContent"] == undefined
				? null
				: context["combo-blocks/accordionNestedContent"];
		var parentHeader =
			context["combo-blocks/accordionNestedHeader"] == undefined
				? null
				: context["combo-blocks/accordionNestedHeader"];
		var parentHeaderLabel =
			context["combo-blocks/accordionNestedHeaderLabel"] == undefined
				? null
				: context["combo-blocks/accordionNestedHeaderLabel"];
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var header = attributes.header;
		var headerLabel = attributes.headerLabel;
		var labelCounter = attributes.labelCounter;
		var labelIcon = attributes.labelIcon;
		var count = attributes.count;
		var content = attributes.content;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		const [isLoading, setisLoading] = useState(false);
		const [toggled, setToggled] = useState(false);
		const contentSelector = blockClass + "-accordion-content";
		const headerSelector = blockClass + "-accordion-header ";
		const headerLabelSelector = blockClass + " > .accordion-header-label";
		const labelIconSelector = blockClass + " .accordion-label-icon";
		const labelCounterSelector = blockClass + " > .accordion-label-counter";
		const iconSelector = blockClass + " > .accordion-icon";
		const iconToggleSelector = blockClass + " > .accordion-icon-toggle";
		let isProFeature = applyFilters("isProFeature", true);
		const [iconHtml, setIconHtml] = useState("");
		const [iconToggleHtml, seticonToggleHtml] = useState("");
		const [labelIconHtml, setlabelIconHtml] = useState("");
		function headerLabelText() { }
		//Icon update from nested item
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="accordion-icon ${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon, icon.options.iconSrc]);
		// Icon update from parent
		useEffect(() => {
			if (parentIcon.options.overrideChild == true) {
				var options = { ...parentIcon.options };
				setAttributes({ icon: { ...icon, options: options } });
			}
		}, [parentIcon]);
		//iconToggle update from nested item
		useEffect(() => {
			var iconSrc = iconToggle.options.iconSrc;
			var iconHtml = `<span class=" ${iconSrc}"></span>`;
			seticonToggleHtml(iconHtml);
		}, [iconToggle, iconToggle.options.iconSrc, parentIcon]);
		// *iconToggle update from parent
		useEffect(() => {
			if (parentIcon.options.overrideChild == true) {
				var iconSrc = parentIconToggle.options.iconSrc;
				setAttributes({ iconToggle: parentIconToggle });
				var iconHtml = `<span class="${iconSrc}"></span>`;
				seticonToggleHtml(iconHtml);
			}
		}, [parentIconToggle]);
		//labelIcon update from nested item
		useEffect(() => {
			var iconSrc = labelIcon.options.iconSrc;
			var iconHtml = `<span class=" ${iconSrc}"></span>`;
			setlabelIconHtml(iconHtml);
		}, [labelIcon, labelIcon.options.iconSrc]);
		//labelIcon update from parent
		useEffect(() => {
			if (parentLabelIcon.options.overrideChild == true) {
				setAttributes({ labelIcon: parentLabelIcon });
				var iconSrc = parentLabelIcon.options.iconSrc;
				var iconHtml = `<span class=" ${iconSrc}"></span>`;
				setlabelIconHtml(iconHtml);
			}
		}, [parentLabelIcon]);
		useEffect(() => {
			// if (parentLabelCounter.options.overrideChild == true) {
			if (parentLabelCounter.options.overrideChild == true) {
				setAttributes({ labelCounter: parentLabelCounter });
			}
		}, [parentLabelCounter]);
		useEffect(() => {
			if (parentContentWrapper.options?.overrideChild == true) {
				setAttributes({ content: parentContentWrapper });
			}
		}, [parentContentWrapper]);
		const CustomContentWrapper =
			content.options.tag.length != 0 ? `${content.options.tag}` : "div";
		useEffect(() => {
			// if (
			// 	parentHeader !== null &&
			// 	parentHeader.options?.overrideChild == true
			// ) {
			setAttributes({ header: parentHeader });
			// }
		}, [parentHeader]);
		const CustomHeaderTag =
			header.options.tag.length != 0 ? `${header.options.tag}` : "div";
		useEffect(() => {
			if (
				parentHeaderLabel !== null &&
				parentHeaderLabel.options?.overrideChild == true
			) {
				parentHeaderLabel.options.text = headerLabel.options.text;
				//var parenLabel = { ...parentHeaderLabel, text: headerLabel.options.text };
				setAttributes({ headerLabel: parentHeaderLabel });
			}
		}, [parentHeaderLabel]);
		const CustomHeaderLabelTag =
			headerLabel.options.tag.length != 0
				? `${headerLabel.options.tag}`
				: "div";
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[contentSelector] = content;
			blockCssObj[headerSelector] = header;
			blockCssObj[headerLabelSelector] = headerLabel;
			blockCssObj[labelCounterSelector] = labelCounter;
			blockCssObj[labelIconSelector] = labelIcon;
			blockCssObj[iconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
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

		function onAddStyleHeader(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ header: object });
		}
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
		const blockProps = useBlockProps();
		var allowedExtraBlocks = [];
		wp.blocks.getBlockTypes().forEach(function (blockType) {
			if (blockType.name.startsWith("combo-blocks/accordion-nested")) {
				if (!isProFeature) {
					allowedExtraBlocks.push(blockType.name);
				}
			} else {
				allowedExtraBlocks.push(blockType.name);
			}
		});
		const removeChild = () => {
			dispatch("core/block-editor").removeBlock(clientId);
		};
		const selectedBlock = useSelect((select) =>
			select("core/block-editor").getSelectedBlock()
		);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const duplicateChild = () => {
			var childBlocks = wp.data
				.select(blockEditorStore)
				.getBlocks(parentClientId);
			// const slide = createBlock("combo-blocks/accordion-nested-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(
				selectedBlock,
				position,
				parentClientId
			);
			wp.data.dispatch("core/block-editor").selectBlock(parentClientId);
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="flex  items-center justify-center mx-3 my-2 px-3"
						// className="text-center"
						>
							<div
								className="bg-red-500 w-full cursor-pointer hover:text-white font-bold text-[16px] px-3 py-2 text-center text-white rounded flex justify-between items-center gap-2"
								onClick={(ev) => {
									removeChild();
								}}>
								<span>{__("Remove", "combo-blocks")}</span>
								<Icon fill="white" icon={close} height={20} width={20} />
							</div>
							{/* <div
								className="bg-gray-700 cursor-pointer hover:text-white font-bold text-[16px] px-3 py-2 text-center text-white rounded flex justify-between items-center gap-2"
								onClick={(ev) => {
									duplicateChild();
								}}>
								<span>Duplicate</span>
								<Icon fill="white" icon={copy} height={20} width={20} />
							</div> */}
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Header"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Header", "combo-blocks")}</span>
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
										label="CSS Class"
										placeholder="Add Class"
										value={header.options.class}
										onChange={(newVal) => {
											var options = { ...header.options, class: newVal };
											setAttributes({
												header: { styles: header.styles, options: options },
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
										onAdd={onAddStyleHeader}
										onRemove={onRemoveStyleHeader}
										onBulkAdd={onBulkAddHeader}
										onReset={onResetHeader}
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
							// title="Header Label"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>Header Label</span>
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
							initialOpen={true}>
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
											{__("Label Source", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={headerLabel.options.textSrc}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
												{
													label: __("Post title", "combo-blocks"),
													value: "post_title",
												},
												{
													label: __("Term title", "combo-blocks"),
													value: "term_title",
												},
												{
													label: __("Post meta", "combo-blocks"),
													value: "post_meta",
												},
												// { label: "Term meta", value: "term_meta" },
												// { label: "User meta", value: "user_meta" },
											]}
											onChange={(newVal) => {
												var options = {
													...headerLabel.options,
													textSrc: newVal,
												};
												setAttributes({
													headerLabel: { ...headerLabel, options: options },
												});
											}}
										/>
									</PanelRow>
									{(headerLabel.options.textSrc == null ||
										headerLabel.options.textSrc.length == 0) && (
											<>
												<label htmlFor="" className="font-medium text-slate-900 ">
													{__("Header Label Text", "combo-blocks")}
												</label>
												<div className="border border-gray-600 border-solid p-2 min-h-[75px] resize-y rounded-[6px]  ">
													<RichText
														tagName={"span"}
														value={headerLabel.options.text}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(newVal) => {
															var options = {
																...headerLabel.options,
																text: newVal,
															};
															setAttributes({
																headerLabel: {
																	...headerLabel,
																	options: options,
																},
															});
														}}
														placeholder={__("Start Writing...")}
													/>
												</div>
											</>
										)}
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
									{headerLabel.options.tag == "a" && (
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Slug", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={
													headerLabel.options.slug == undefined
														? ""
														: headerLabel.options.slug
												}
												onChange={(newVal) => {
													var options = {
														...headerLabel.options,
														slug: newVal,
													};
													setAttributes({
														headerLabel: { ...headerLabel, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									<ToggleControl
										label={__("Enable Label Icon?", "combo-blocks")}
										help={
											labelIcon.options.enable
												? __("Label Icon Enabled", "combo-blocks")
												: __("Label Icon Disabled.", "combo-blocks")
										}
										checked={labelIcon.options.enable ? true : false}
										onChange={(e) => {
											var options = {
												...labelIcon.options,
												enable: labelIcon.options.enable ? false : true,
											};
											setAttributes({
												labelIcon: { ...labelIcon, options: options },
											});
										}}
									/>
									{labelIcon.options.enable && (
										<PanelRow>
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
										onAdd={onAddStyleHeaderLabel}
										onRemove={onRemoveStyleHeaderLabel}
										onBulkAdd={onBulkAddHeaderLabel}
										onReset={onResetHeaderLabel}
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
							// title="Label Icon"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label Icon", "combo-blocks")}</span>
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
								]}>
								<PGtab name="options">
									<PanelRow>
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
										<PanelRow>
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
										onAdd={onAddStyleLabelIcon}
										onRemove={onRemoveStyleLabelIcon}
										onBulkAdd={onBulkAddLabelIcon}
										onReset={onResetLabelIcon}
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
									<PanelRow>
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
										onAdd={onAddStyleLabelCounter}
										onRemove={onRemoveStyleLabelCounter}
										onBulkAdd={onBulkAddLabelCounter}
										onReset={onResetLabelCounter}
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
							// title="Content"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Content", "combo-blocks")}</span>
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
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={content.options.tag}
											options={[
												// { label: __("Choose","combo-blocks"), value: "" },
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
										onAdd={onAddStyleContent}
										onRemove={onRemoveStyleContent}
										onBulkAdd={onBulkAddContent}
										onReset={onResetContent}
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
					</div>
				</InspectorControls>
				<>
					<CustomHeaderTag
						className={`${blockId}-accordion-header ${blockIdX}  ${header.options.class
							} ${toggled ? "accordion-header-active" : ""}`}
						onClick={(ev) => {
							setToggled(!toggled);
						}}>
						{labelCounter.options.position == "left" && (
							<span
								className={`${blockId}-accordion-label-counter accordion-label-counter`}>
								{count}
							</span>
						)}
						{icon.options.position == "left" && (
							<>
								{!toggled && (
									<span
										className={`${blockId}-accordion-icon accordion-icon`}
										dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
								)}
								{toggled && (
									<span
										className={`${blockId}-accordion-icon-toggle accordion-icon accordion-icon-toggle}`}
										dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
								)}
							</>
						)}
						{labelIcon.options.position == "beforeLabel" && (
							<span
								className={`${blockId}-accordion-label-icon accordion-label-icon`}
								dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
						)}
						<CustomHeaderLabelTag
							className={`${blockId}-accordion-header-label accordion-header-label`}
							onClick={(e) => {
								return;
							}}>
							{labelCounter.options.position == "beforeLabelText" && (
								<span
									className={`${blockId}-accordion-label-counter accordion-label-counter`}>
									{count}
								</span>
							)}
							{labelIcon.options.position == "beforeLabelText" && (
								<span
									className={`${blockId}-accordion-label-icon accordion-label-icon`}
									dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
							)}
							{headerLabel.options.text.length > 0 ? (
								<span
									data-pgtooltip="Navigate to the Item Header Label to edit the Label"
									// data-pgtooltip-location="right"
									onClick={(ev) => {
										wp.data.dispatch("core/block-editor").selectBlock(clientId);
									}}
									dangerouslySetInnerHTML={{ __html: headerLabel.options.text }}
								/>
							) : (
								"Start Writing..."
							)}
							{labelIcon.options.position == "afterLabelText" && (
								<span
									className={`${blockId}-accordion-label-icon accordion-label-icon`}
									dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
							)}
							{labelCounter.options.position == "afterLabelText" && (
								<span
									className={`${blockId}-accordion-label-counter accordion-label-counter`}>
									{count}
								</span>
							)}
						</CustomHeaderLabelTag>
						{labelIcon.options.position == "afterLabel" && (
							<span
								className={`${blockId}-accordion-label-icon accordion-label-icon`}
								dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
						)}
						{labelCounter.options.position == "right" && (
							<span
								className={`${blockId}-accordion-label-counter accordion-label-counter`}>
								{count}
							</span>
						)}
						{icon.options.position == "right" && (
							<>
								{!toggled && (
									<span
										className={`${blockId}-accordion-icon accordion-icon`}
										dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
								)}
								{toggled && (
									<span
										className={`${blockId}-accordion-icon-toggle accordion-icon-toggle`}
										dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
								)}
							</>
						)}
					</CustomHeaderTag>
					{toggled && (
						<CustomContentWrapper
							className={`${blockId}-accordion-content accordion-content`}>
							<InnerBlocks
								allowedBlocks={allowedExtraBlocks}
								renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
							/>
						</CustomContentWrapper>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		const blockProps = useBlockProps.save({});
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);
		return <>{children}</>;
	},
});
