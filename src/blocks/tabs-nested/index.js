import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, mediaAndText, settings } from "@wordpress/icons";
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
				<path d="M47.5917 48H0V64.2H47.5917V48Z" fill="#C15940" />
				<path
					d="M8.66189 54C8.76145 54 8.96097 54.1 9.06053 54.2L11.8481 57.5C12.0473 57.7 11.9476 58 11.7485 58.2C11.5494 58.4 11.251 58.3 11.0518 58.1L8.56271 55.2L6.0736 58.1C5.87447 58.3 5.57558 58.3 5.37645 58.2C5.17732 58.1 5.17722 57.7 5.27679 57.5L8.06489 54.2C8.36358 54.1 8.46276 54 8.66189 54Z"
					fill="white"
				/>
				<path d="M40.8216 54H15.4326V58.3H40.8216V54Z" fill="white" />
				<path
					d="M103.846 48H56.2539V64.2H103.846V48Z"
					fill="url(#paint0_linear_61_760)"
				/>
				<path
					d="M64.8167 58.3002C64.7172 58.3002 64.5177 58.2002 64.4181 58.1002L61.6305 54.8002C61.4314 54.6002 61.531 54.3002 61.7301 54.1002C61.9293 53.9002 62.2277 54.0002 62.4268 54.2002L64.9159 57.1002L67.405 54.2002C67.6042 54.0002 67.9031 54.0002 68.1022 54.1002C68.3013 54.3002 68.3014 54.6002 68.2018 54.8002L65.4137 58.1002C65.115 58.2002 64.9163 58.3002 64.8167 58.3002Z"
					fill="white"
				/>
				<path d="M96.9759 54H71.5869V58.3H96.9759V54Z" fill="white" />
				<path
					d="M160 48H112.408V64.2H160V48Z"
					fill="url(#paint1_linear_61_760)"
				/>
				<path
					d="M120.971 58.3002C120.871 58.3002 120.672 58.2002 120.573 58.1002L117.785 54.8002C117.586 54.6002 117.685 54.3002 117.884 54.1002C118.084 53.9002 118.382 54.0002 118.582 54.2002L121.071 57.1002L123.56 54.2002C123.759 54.0002 124.057 54.0002 124.256 54.1002C124.456 54.3002 124.456 54.6002 124.356 54.8002L121.569 58.1002C121.27 58.2002 121.17 58.3002 120.971 58.3002Z"
					fill="white"
				/>
				<path d="M153.13 54H127.741V58.3H153.13V54Z" fill="white" />
				<path d="M160 74.1001H0V112.8H160V74.1001Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_760"
						x1="56.2539"
						y1="56.1"
						x2="103.846"
						y2="56.1"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_760"
						x1="112.408"
						y1="56.1"
						x2="160"
						y2="56.1"
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
		var tabs = attributes.tabs;
		var activeTab = attributes.activeTab;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;
		if (!iconToggle || !iconToggle.options) {
			// Set default values for iconToggle.options
			iconToggle = {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "",
					class: "icon-toggle",
				},
				styles: {},
			};
		}
		var navsWrap = attributes.navsWrap;
		var navItem = attributes.navItem;
		var activeNavItem = attributes.activeNavItem;
		var navLabel = attributes.navLabel;
		var panelWrap = attributes.panelWrap;
		var blockCssY = attributes.blockCssY;
		var childBlocks =
			select("core/block-editor").getBlocksByClientId(clientId)[0].innerBlocks;
		let isProFeature = applyFilters("isProFeature", true);
		var breakPointX = myStore.getBreakPoint();
		const [iconPickerIndex, setIconPickerIndex] = useState(99);
		const [iconPickerEnable, setIconPickerEnable] = useState(false);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var navsWrapSelector = blockClass + " .navs-wrapper";
		var navItemSelector = blockClass + " .nav-item";
		var activeNavItemSelector = blockClass + " .nav-item-active";
		var navLabelSelector = blockClass + " .nav-label";
		var panelWrapSelector = blockClass + " .panels-wrap";
		var navIconSelector = blockClass + " .nav-icon";
		var iconToggleSelector = blockClass + " .nav-icon-toggle";
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[activeNavItemSelector] = activeNavItem;
			blockCssObj[navsWrapSelector] = navsWrap;
			blockCssObj[navItemSelector] = navItem;
			blockCssObj[navLabelSelector] = navLabel;
			blockCssObj[panelWrapSelector] = panelWrap;
			blockCssObj[navIconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
			setTimeout(() => {
				var tabsX = [...tabs];
				if (childBlocks.length > 0) {
					childBlocks.map((item, index) => {
						if (tabsX[index] == undefined) {
							tabsX[index] = {};
						}
						//tabsX[index].uid = item.clientId;
						tabsX[index].uid = item.attributes.uid;
						// tabsX.push({uid: item.attributes.uid})
						// tabsX[index].uid = "pg0d16b72d0917"
					});
					setAttributes({ tabs: tabsX });
				}
			}, 1000);
		}, [blockId]);
		useEffect(() => {
			var tabsX = [...tabs];
			if (childBlocks.length > 0) {
				childBlocks.map((item, index) => {
					if (tabsX[index] == undefined) {
						tabsX[index] = {};
					}
					//tabsX[index].uid = item.clientId;
					tabsX[index].uid = item.attributes.uid;
					//tabsX.push({uid: item.attributes.uid})
					// tabsX[index].uid = "pg0d16b72d0917"
				});
				setAttributes({ tabs: tabsX });
			}
			if (tabsX[0] != undefined && activeTab.length == 0) {
				setActiveTab(tabsX[0].uid);
			}
		}, [childBlocks]);
		function bulkCssGenerate(cssObj) {
			var stylesObj = {};
			Object.entries(cssObj).map((args) => {
				var selector = args[0];
				Object.entries(args[1]).map((x) => {
					var attr = x[0];
					var cssPropty = myStore.cssAttrParse(attr);
					if (stylesObj[selector] == undefined) {
						stylesObj[selector] = {};
					}
					if (stylesObj[selector][cssPropty] == undefined) {
						stylesObj[selector][cssPropty] = {};
					}
					stylesObj[selector][cssPropty] = x[1];
				});
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
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
				var itemsX = attributes.items;
				var navsWrapX = attributes.navsWrap;
				var navItemX = attributes.navItem;
				var activeNavItemX = attributes.activeNavItem;
				var navLabelX = attributes.navLabel;
				var iconX = attributes.icon;
				var iconToggleX = attributes.iconToggle;
				var panelWrapX = attributes.panelWrap;
				var tabsX = attributes.tabs;
				var activeTabX = attributes.activeTab;
				var wrapperX = attributes.wrapper;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
				}
				if (navsWrapX != undefined) {
					var navsWrapY = { ...navsWrapX, options: navsWrap.options };
					setAttributes({ navsWrap: navsWrapY });
					blockCssObj[navsWrapSelector] = navsWrapY;
				}
				if (activeNavItemX != undefined) {
					var activeNavItemY = {
						...activeNavItemX,
						options: activeNavItem.options,
					};
					setAttributes({ activeNavItem: activeNavItemY });
					blockCssObj[activeNavItemSelector] = activeNavItemY;
				}
				if (navItemX != undefined) {
					var navItemY = { ...navItemX, options: navItem.options };
					setAttributes({ navItem: navItemY });
					blockCssObj[navItemSelector] = navItemY;
				}
				if (navLabelX != undefined) {
					var navLabelY = { ...navLabelX, options: navLabel.options };
					setAttributes({ navLabel: navLabelY });
					blockCssObj[navLabelSelector] = navLabelY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[navIconSelector] = iconY;
				}
				if (iconToggleX != undefined) {
					var iconToggleY = { ...iconToggleX, options: iconToggle.options };
					setAttributes({ iconToggle: iconToggleY });
					blockCssObj[iconToggleSelector] = iconToggleY;
				}
				if (panelWrapX != undefined) {
					var panelWrapY = { ...panelWrapX, options: panelWrap.options };
					setAttributes({ panelWrap: panelWrapY });
					blockCssObj[panelWrapSelector] = panelWrapY;
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
		function onRemoveStyleNavLabel(sudoScource, key) {
			let obj = { ...navLabel };
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
			setAttributes({ navLabel: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navLabelSelector
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
		function onRemoveStylepanelWrap(sudoScource, key) {
			let obj = { ...panelWrap };
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
			setAttributes({ panelWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
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
				navIconSelector
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
		function onRemoveStyleNavsWrap(sudoScource, key) {
			let obj = { ...navsWrap };
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
			setAttributes({ navsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
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
		function onRemoveStyleNavItem(sudoScource, key) {
			let obj = { ...navItem };
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
			setAttributes({ navItem: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
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
		function onRemoveStyleActiveNavItem(sudoScource, key) {
			let obj = { ...activeNavItem };
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
			setAttributes({ activeNavItem: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
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
		function onChangeStyleNavLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ navLabel: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navLabelSelector
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
		function onAddStyleNavLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navLabel: object });
		}
		function onPickCssLibraryNavLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navLabel[sudoScource] = sudoScourceArgs;
			});
			var navLabelX = Object.assign({}, navLabel);
			setAttributes({ navLabel: navLabelX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navLabelSelector
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
		function onChangeStylepanelWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ panelWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				panelWrapSelector
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
		function onAddStylepanelWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, panelWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ panelWrap: object });
		}
		function onPickCssLibrarypanelWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				panelWrap[sudoScource] = sudoScourceArgs;
			});
			var panelWrapX = Object.assign({}, panelWrap);
			setAttributes({ panelWrap: panelWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					panelWrapSelector
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
		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ icon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navIconSelector
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
					navIconSelector
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
		function onChangeStyleNavsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ navsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
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
		function onAddStyleNavsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navsWrap: object });
		}
		function onPickCssLibraryNavsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navsWrap[sudoScource] = sudoScourceArgs;
			});
			var navsWrapX = Object.assign({}, navsWrap);
			setAttributes({ navsWrap: navsWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navsWrapSelector
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
		function onChangeStyleNavItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ navItem: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navItemSelector
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
		function onAddStyleNavItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navItem: object });
		}
		function onPickCssLibraryNavItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				navItem[sudoScource] = sudoScourceArgs;
			});
			var navItemX = Object.assign({}, navItem);
			setAttributes({ navItem: navItemX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					navItemSelector
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
		function onChangeStyleActiveNavItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, activeNavItem);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ activeNavItem: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
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
		function onAddStyleActiveNavItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, activeNavItem);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ activeNavItem: object });
		}
		function onPickCssLibraryActiveNavItem(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				activeNavItem[sudoScource] = sudoScourceArgs;
			});
			var activeNavItemX = Object.assign({}, activeNavItem);
			setAttributes({ activeNavItem: activeNavItemX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					activeNavItemSelector
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
		function onBulkAddNavsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, navsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ navsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, navsWrapSelector);
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
		function onBulkAddNavItem(sudoScource, cssObj) {
			let obj = Object.assign({}, navItem);
			obj[sudoScource] = cssObj;
			setAttributes({ navItem: obj });
			var selector = myStore.getElementSelector(sudoScource, navItemSelector);
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
		function onBulkAddActiveNavItem(sudoScource, cssObj) {
			let obj = Object.assign({}, activeNavItem);
			obj[sudoScource] = cssObj;
			setAttributes({ activeNavItem: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				activeNavItemSelector
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
		function onBulkAddNavLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, navLabel);
			obj[sudoScource] = cssObj;
			setAttributes({ navLabel: obj });
			var selector = myStore.getElementSelector(sudoScource, navLabelSelector);
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
		function onBulkAddPanelWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, panelWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ panelWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, panelWrapSelector);
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
		// add bulk style end
		// reset bulk style start
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
		function onResetNavsWrap(sudoScources) {
			let obj = Object.assign({}, navsWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ navsWrap: obj });
		}
		function onResetNavItem(sudoScources) {
			let obj = Object.assign({}, navItem);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navItemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ navItem: obj });
		}
		function onResetActiveNavItem(sudoScources) {
			let obj = Object.assign({}, activeNavItem);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						activeNavItemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ activeNavItem: obj });
		}
		function onResetNavLabel(sudoScources) {
			let obj = Object.assign({}, navLabel);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navLabelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ navLabel: obj });
		}
		function onResetPanelWrap(sudoScources) {
			let obj = Object.assign({}, panelWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						panelWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ panelWrap: obj });
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
						navIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ icon: obj });
		}
		// reset bulk style end
		const ALLOWED_BLOCKS = ["combo-blocks/tabs-nested-item"];
		const MY_TEMPLATE = [
			["combo-blocks/tabs-nested-item", {}],
			["combo-blocks/tabs-nested-item", {}],
		];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			directInsert: true,
			//template: MY_TEMPLATE,
			templateInsertUpdatesSelection: true,
		});
		const setActiveTab = (uid) => {
			setAttributes({ activeTab: uid });
		};
		const addNewTab = () => {
			const tab = createBlock("combo-blocks/tabs-nested-item");
			const position = tabs.length;
			dispatch("core/block-editor").insertBlock(tab, position, clientId);
			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			setAttributes({
				tabs: [
					...tabs,
					{
						uid: tab.clientId,
						title: `Tab ${tabs.length + 1}`,
						icon: {
							library: "fontAwesome",
							srcType: "class",
							/*class, html, img, svg */ iconSrc: "",
						},
					},
				],
			});
			//setActiveTab(now);
		};
		const tabTitleChange = (newValue) => {
			setAttributes({
				tabs: [
					...tabs.map((t) => {
						return t.uid === activeTab
							? {
								...t,
								title: newValue,
							}
							: t;
					}),
				],
			});
		};
		useEffect(() => {
			if (tabs.length && !activeTab) {
				//setActiveTab(tabs[0].uid);
			}
		}, [tabs]);
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							onClick={(ev) => {
								addNewTab();
							}}>
							{__("Add Item", "combo-blocks")}
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
							title={__("Navs Wrapper", "combo-blocks")}
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navsWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												navsWrap,
												"navsWrap",
												navsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												navsWrap,
												"navsWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												navsWrap,
												"navsWrap",
												navsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												navsWrap,
												"navsWrap",
												navsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												navsWrap,
												"navsWrap",
												navsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navsWrap}
										onChange={onPickCssLibraryNavsWrap}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Nav Item", "combo-blocks")}
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navItem}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												navItem,
												"navItem",
												navItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												navItem,
												"navItem",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												navItem,
												"navItem",
												navItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												navItem,
												"navItem",
												navItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												navItem,
												"navItem",
												navItemSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navItem}
										onChange={onPickCssLibraryNavItem}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Active Nav Item", "combo-blocks")}
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={activeNavItem}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												activeNavItem,
												"activeNavItem",
												activeNavItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												activeNavItem,
												"activeNavItem",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												activeNavItem,
												"activeNavItem",
												activeNavItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												activeNavItem,
												"activeNavItem",
												activeNavItemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												activeNavItem,
												"activeNavItem",
												activeNavItemSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={activeNavItem}
										onChange={onPickCssLibraryActiveNavItem}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Nav Label", "combo-blocks")}
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={navLabel}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												navLabel,
												"navLabel",
												navLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												navLabel,
												"navLabel",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												navLabel,
												"navLabel",
												navLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												navLabel,
												"navLabel",
												navLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												navLabel,
												"navLabel",
												navLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={navLabel}
										onChange={onPickCssLibraryNavLabel}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Content Wrap", "combo-blocks")}
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
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={panelWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												panelWrap,
												"panelWrap",
												panelWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												panelWrap,
												"panelWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												panelWrap,
												"panelWrap",
												panelWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												panelWrap,
												"panelWrap",
												panelWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												panelWrap,
												"panelWrap",
												panelWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={panelWrap}
										onChange={onPickCssLibrarypanelWrap}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Nav Icon"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Nav Icon", "combo-blocks")}</span>
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
												{ label: __("Before", "combo-blocks"), value: "before" },
												{ label: __("After", "combo-blocks"), value: "after" },
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
				{!hasInnerBlocks && (
					<div {...innerBlocksProps} className="flex justify-center my-4">
						<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
							<div className="flex justify-between mb-5">
								<div className="text-xl rounded-sm">
									{__("Click to pick a variation", "combo-blocks")}
								</div>
								<div
									className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
									// onClick={(ev) => {
									// 	replaceInnerBlocks(
									// 		clientId,
									// 		createBlocksFromInnerBlocksTemplate([
									// 			["combo-blocks/tabs-nested-item", {"uid": ""}],
									// 		]),
									// 		true
									// 	);
									// }}
									onClick={(ev) => {
										var variation = {
											name: "preset-1",
											title: __("preset-1"),
											description: __("preset-1"),
											isPro: false,
											atts: {
												wrapper: {
													options: { tag: "div", class: "pg-tabs" },
													styles: {},
												},
												navsWrap: {
													options: { class: "" },
													styles: {
														display: { Desktop: "flex" },
														justifyContent: { Desktop: "start" },
													},
												},
												navItem: {
													options: {
														viewType: "horizontal",
														position: "left",
														class: "",
														activeTab: "",
													},
													styles: {
														display: { Desktop: "flex" },
														color: { Desktop: "#ffffff" },
														padding: { Desktop: "5px 15px 5px 15px" },
														backgroundColor: { Desktop: "#3236ff" },
														margin: { Desktop: "0px 5px 0px 0px" },
														justifyContent: {},
														alignItems: { Desktop: "center" },
														cursor: { Desktop: "pointer" },
													},
												},
												activeNavItem: {
													options: {
														viewType: "horizontal",
														position: "left",
														class: "",
														activeTab: "",
													},
													styles: {
														backgroundColor: { Desktop: "#afb1ff" },
														display: { Desktop: "flex" },
														padding: { Desktop: "5px 15px 5px 15px" },
														margin: { Desktop: "0px 5px 0px 0px" },
														alignItems: { Desktop: "center" },
													},
												},
												navLabel: {
													options: {
														viewType: "horizontal",
														position: "left",
														class: "",
														activeTab: "",
													},
													styles: { padding: { Desktop: "0px 10px 0px 10px" } },
												},
												icon: {
													options: {
														library: "fontAwesome",
														srcType: "class",
														iconSrc: "fas fa-angle-right",
														position: "before",
														class: "nav-icon nav-icon-idle",
													},
													styles: { fontSize: { Desktop: "20px" } },
												},
												iconToggle: {
													options: {
														library: "fontAwesome",
														srcType: "class",
														iconSrc: "fas fa-angle-down",
														position: "before",
														class: "nav-icon-toggle nav-icon",
													},
													styles: { fontSize: { Desktop: "20px" } },
												},
												panelWrap: {
													options: { class: "" },
													styles: {
														backgroundColor: { Desktop: "#afb1ff" },
														padding: { Desktop: "10px 10px 10px 10px" },
														margin: { Desktop: "0px 0px 0px 0px" },
													},
												},
											},
											innerBlocks: [
												[
													"combo-blocks/tabs-nested-item",
													{
														wrapper: {
															options: { tag: "div", class: "pg-tabs" },
															styles: {},
														},
														content: {
															options: { tag: "div", class: "" },
															styles: {},
														},
														header: {
															options: {
																text: "Accordion Header",
																tag: "div",
																class: "",
															},
															styles: {},
														},
														icon: {
															options: {
																library: "fontAwesome",
																srcType: "class",
																iconSrc: "fas fa-angle-down",
																position: "before",
																class: "icon",
															},
															styles: {},
														},
														title: "Tab 1",
													},
												],
											],
											scope: ["block"],
											icon: (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 500 169.7">
													<defs></defs>
													<rect fill="#ffffff" width="109.1" height="37.04" />
													<path
														fill="#3c3c3b"
														d="M19.71,13.65a1.07,1.07,0,0,1,.82.38L27,21.61a1.08,1.08,0,0,1-.11,1.52A1.09,1.09,0,0,1,25.39,23l-5.68-6.63L14,23a1.09,1.09,0,0,1-1.53.11,1.07,1.07,0,0,1-.12-1.52L18.89,14A1.08,1.08,0,0,1,19.71,13.65Z"
													/>
													<rect
														fill="#3c3c3b"
														x="35.26"
														y="13.65"
														width="58.16"
														height="9.75"
													/>
													<rect
														fill="#3c3c3b"
														x="128.7"
														width="109.1"
														height="37.04"
													/>
													<path
														fill="#ffffff"
														d="M148.41,23.4a1.1,1.1,0,0,1-.82-.38l-6.5-7.58A1.09,1.09,0,0,1,142.74,14l5.67,6.62L154.09,14a1.08,1.08,0,1,1,1.64,1.41L149.23,23A1.07,1.07,0,0,1,148.41,23.4Z"
													/>
													<rect
														fill="#ffffff"
														x="163.96"
														y="13.65"
														width="58.16"
														height="9.75"
													/>
													<rect
														fill="#3c3c3b"
														x="257.4"
														width="109.1"
														height="37.04"
													/>
													<path
														fill="#ffffff"
														d="M277.11,23.4a1.1,1.1,0,0,1-.82-.38l-6.5-7.58a1.08,1.08,0,0,1,.12-1.53,1.07,1.07,0,0,1,1.52.12l5.68,6.62L282.79,14a1.08,1.08,0,1,1,1.64,1.41L277.93,23A1.07,1.07,0,0,1,277.11,23.4Z"
													/>
													<rect
														fill="#ffffff"
														x="292.66"
														y="13.65"
														width="58.16"
														height="9.75"
													/>
													<rect
														fill="#ffffff"
														y="37.04"
														width="500"
														height="132.66"
													/>
												</svg>
											),
										};
										var atts = variation.atts;
										var wrapper = { ...atts.wrapper };
										var navsWrap = { ...atts.navsWrap };
										var navItem = { ...atts.navItem };
										var activeNavItem = { ...atts.activeNavItem };
										var panelWrap = { ...atts.panelWrap };
										var navLabel = { ...atts.navLabel };
										var labelCounter = { ...atts.labelCounter };
										var icon = { ...atts.icon };
										var iconToggle = { ...atts.iconToggle };
										var blockCssY = { ...atts.blockCssY };
										var blockCssObj = {};
										blockCssObj[wrapperSelector] = wrapper;
										blockCssObj[activeNavItemSelector] = activeNavItem;
										blockCssObj[panelWrapSelector] = panelWrap;
										blockCssObj[navLabelSelector] = navLabel;
										blockCssObj[navsWrapSelector] = navsWrap;
										blockCssObj[navItemSelector] = navItem;
										blockCssObj[navIconSelector] = icon;
										blockCssObj[iconToggleSelector] = iconToggle;
										setAttributes({
											wrapper: wrapper,
											navsWrap: navsWrap,
											navItem: navItem,
											activeNavItem: activeNavItem,
											panelWrap: panelWrap,
											navLabel: navLabel,
											icon: icon,
											iconToggle: iconToggle,
										});
										var blockCssRules = myStore.getBlockCssRules(blockCssObj);
										var items = blockCssRules;
										setAttributes({ blockCssY: { items: items } });
										var innerBlocksTemplate =
											createBlocksFromInnerBlocksTemplate(
												variation.innerBlocks
											);
										replaceInnerBlocks(clientId, innerBlocksTemplate, true);
										setAttributes({
											tabs: [
												...tabs,
												{
													uid: innerBlocksTemplate[0].attributes.uid,
													title: `Tab ${tabs.length + 1}`,
													icon: {
														library: "fontAwesome",
														srcType: "class",
														iconSrc: "",
													},
												},
											],
										});
										setActiveTab(innerBlocksTemplate[0].attributes.uid);
									}}>
									Skip
								</div>
							</div>
							<div {...innerBlocksProps} className="">
								<ComboBlocksVariationsPicker
									blockName={"tabs-nested"}
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
						<div className={" navs-wrapper  "} role="tablist">
							{tabs.map((tab, index) => {
								return (
									<div
										key={tab.uid}
										className={` ${tab.uid === activeTab
											? "  nav-item-active nav-item "
											: `nav-item pg${tab.uid.split("-").pop()}-nav-item`
											}`}
										role="tab"
										tabIndex={index}
										onClick={() => setActiveTab(tab.uid)}>
										{icon.options.position == "before" && (
											<>
												{tab.uid == activeTab ? (
													<>
														{(tab.iconToggle?.iconSrc != undefined ||
															tab.iconToggle?.iconSrc.length != 0) && (
																<div
																	className="nav-icon"
																	onClick={(ev) => {
																		setIconPickerIndex(index);
																		setIconPickerEnable(!iconPickerEnable);
																	}}>
																	<span
																		className={
																			iconToggle.options?.iconSrc
																		}></span>
																</div>
															)}
													</>
												) : (
													<>
														{(tab.icon != undefined || tab.icon != null) && (
															<>
																{(tab.icon.iconSrc != undefined ||
																	tab.icon.iconSrc.length != 0) && (
																		<div
																			className="nav-icon"
																			onClick={(ev) => {
																				setIconPickerIndex(index);
																				setIconPickerEnable(!iconPickerEnable);
																			}}>
																			<span
																				className={icon.options.iconSrc}></span>
																		</div>
																	)}
															</>
														)}
													</>
												)}
												{iconPickerEnable && iconPickerIndex != index && (
													<div
														className="nav-icon"
														onClick={(ev) => {
															setIconPickerIndex(index);
															setIconPickerEnable(!iconPickerEnable);
														}}>
														<span className={tab.icon.iconSrc}></span>
													</div>
												)}
												{iconPickerIndex == index && iconPickerEnable && (
													<PGIconPicker
														library={tab.icon.library}
														srcType={tab.icon.srcType}
														iconSrc={tab.icon.iconSrc}
														onChange={(arg) => {
															tabs[index].icon = {
																srcType: arg.srcType,
																library: arg.library,
																iconSrc: arg.iconSrc,
															};
															setAttributes({ tabs: tabs });
															setIconPickerEnable(!iconPickerEnable);
															setIconPickerIndex(99);
														}}
													/>
												)}
											</>
										)}
										<RichText
											className=" nav-label"
											tagName="div"
											value={tab.title}
											onChange={tabTitleChange}
										/>
										{icon.options.position == "after" && (
											<>
												{tab.icon.iconSrc == undefined ||
													(tab.icon.iconSrc.length == 0 && (
														<div
															className="nav-icon"
															onClick={(ev) => {
																setIconPickerIndex(index);
																setIconPickerEnable(!iconPickerEnable);
															}}>
															<span className={icon.options.iconSrc}></span>
														</div>
													))}
												{/* {!iconPickerEnable && (
                          <div className='nav-icon' onClick={ev => {
                            setIconPickerIndex(index)
                            setIconPickerEnable(!iconPickerEnable)
                          }}>
                            <span className={tab.icon.iconSrc} ></span>
                          </div>
                        )} */}
												{iconPickerEnable && iconPickerIndex != index && (
													<div
														className="nav-icon"
														onClick={(ev) => {
															setIconPickerIndex(index);
															setIconPickerEnable(!iconPickerEnable);
														}}>
														<span className={tab.icon.iconSrc}></span>
													</div>
												)}
												{iconPickerIndex == index && iconPickerEnable && (
													<PGIconPicker
														library={tab.icon.library}
														srcType={tab.icon.srcType}
														iconSrc={tab.icon.iconSrc}
														onChange={(arg) => {
															tabs[index].icon = {
																srcType: arg.srcType,
																library: arg.library,
																iconSrc: arg.iconSrc,
															};
															setAttributes({ tabs: tabs });
															setIconPickerEnable(!iconPickerEnable);
															setIconPickerIndex(99);
														}}
													/>
												)}
											</>
										)}
										<Icon
											fill="red"
											icon={close}
											onClick={(ev) => {
												var tabX = [...tabs];
												tabX.splice(index, 1);
												setAttributes({ tabs: tabX });
												dispatch("core/block-editor").removeBlock(
													tabs[index].uid
												);
												setActiveTab(tabX[0].uid);
											}}
										/>
									</div>
								);
							})}
						</div>
						<div className={"panels-wrap"}>
							<InnerBlocks
								allowedBlocks={["combo-blocks/tabs-nested-item"]}
								renderAppender={false}
							/>
						</div>
					</div>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		var blockId = attributes.blockId;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		const blockProps = useBlockProps.save({
			className: ` ${blockId} {wrapper.options.class}`,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
