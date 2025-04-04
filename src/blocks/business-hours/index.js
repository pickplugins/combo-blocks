import {
	store as blockEditorStore,
	InnerBlocks,
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
import { useEntityProp } from "@wordpress/core-data";
import { select, useDispatch } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	Icon,
	link,
	linkOff,
	mediaAndText,
	menu,
	settings,
	styles,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
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
					d="M157.275 48.4749L82.63 5.675C81.0376 4.775 78.9477 4.775 77.3552 5.675L2.70979 48.4749C0.122083 49.9749 -0.773663 53.175 0.719246 55.775C1.21688 56.675 1.91343 57.375 2.80917 57.875L77.4546 98.075C79.0471 98.875 80.9382 98.875 82.5306 98.075L157.176 57.875C159.764 56.475 160.759 53.275 159.366 50.675C158.868 49.775 158.072 48.9749 157.275 48.4749ZM79.9428 87.275L16.345 53.075L79.9428 16.575L143.541 53.075L79.9428 87.275Z"
					fill="url(#paint0_linear_61_513)"
				/>
				<path
					d="M82.5306 126.175L154.588 86.3748V74.1748L79.9428 115.375L5.29736 74.1748V86.3748L77.3553 126.175C79.0472 127.075 80.9382 127.075 82.5306 126.175Z"
					fill="url(#paint1_linear_61_513)"
				/>
				<path
					d="M5.29736 115.675L77.4546 154.275C79.0471 155.075 80.9381 155.075 82.431 154.275L154.588 115.675V103.575L79.9428 143.575L5.29736 103.575V115.675Z"
					fill="url(#paint2_linear_61_513)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_513"
						x1="-0.00341797"
						y1="51.8375"
						x2="159.997"
						y2="51.8375"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_513"
						x1="5.29736"
						y1="100.512"
						x2="154.588"
						y2="100.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_513"
						x1="5.29736"
						y1="129.225"
						x2="154.588"
						y2="129.225"
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
		var items = attributes.items;
		var label = attributes.label;
		var timesWrap = attributes.timesWrap;
		var startTime = attributes.startTime;
		var endTime = attributes.endTime;
		var closed = attributes.closed;
		var elements = attributes.elements;
		var separator = attributes.separator;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		const CustomTagWrapper = `${wrapper.options.tag}`;
		var postUrl =
			wrapper.options.customUrl != undefined &&
				wrapper.options.customUrl.length > 0
				? wrapper.options.customUrl
				: currentPostUrl;
		var linkToArgsBasic = {
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
		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var itemsSelector = blockClass + " .item";
		// var itemSelector = blockClass + " .item";
		var labelSelector = blockClass + " .label";
		var timesWrapSelector = blockClass + " .times-wrap";
		var startTimeSelector = blockClass + " .start-time";
		var endTimeSelector = blockClass + " .end-time";
		var separatorSelector = blockClass + " .separator";
		var closedSelector = blockClass + " .closed";
		// var saturdaySelector = blockClass + " .saturday";
		// var sundaySelector = blockClass + " .sunday";
		// var mondaySelector = blockClass + " .monday";
		// var tuesdaySelector = blockClass + " .tuesday";
		// var wednesdaySelector = blockClass + " .wednesday";
		// var thursdaySelector = blockClass + " .thursday";
		// var fridaySelector = blockClass + " .friday";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemsSelector] = items;
			// blockCssObj[itemSelector] = elements;
			blockCssObj[labelSelector] = label;
			blockCssObj[timesWrapSelector] = timesWrap;
			blockCssObj[startTimeSelector] = startTime;
			blockCssObj[endTimeSelector] = endTime;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[closedSelector] = closed;
			elements.items.map((x, i) => {
				var selector = `${blockClass} .item-${i}`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
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
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
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
		function onPickCssLibraryitems(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				items[sudoScource] = sudoScourceArgs;
			});
			var itemsX = Object.assign({}, items);
			setAttributes({ items: itemsX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsSelector
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
		function onPickCssLibrarylabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				label[sudoScource] = sudoScourceArgs;
			});
			var labelX = Object.assign({}, label);
			setAttributes({ label: labelX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelSelector
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
		function onPickCssLibrarytimesWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				timesWrap[sudoScource] = sudoScourceArgs;
			});
			var timesWrapX = Object.assign({}, timesWrap);
			setAttributes({ timesWrap: timesWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					timesWrapSelector
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
		function onPickCssLibrarystartTime(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				startTime[sudoScource] = sudoScourceArgs;
			});
			var startTimeX = Object.assign({}, startTime);
			setAttributes({ startTime: startTimeX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					startTimeSelector
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
		function onPickCssLibraryendTime(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				endTime[sudoScource] = sudoScourceArgs;
			});
			var endTimeX = Object.assign({}, endTime);
			setAttributes({ endTime: endTimeX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					endTimeSelector
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
		function onPickCssLibraryseparator(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				separator[sudoScource] = sudoScourceArgs;
			});
			var separatorX = Object.assign({}, separator);
			setAttributes({ separator: separatorX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					separatorSelector
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
		function onPickCssLibraryclosed(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				closed[sudoScource] = sudoScourceArgs;
			});
			var closedX = Object.assign({}, closed);
			setAttributes({ closed: closedX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					closedSelector
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
		function setFieldLinkTo(option, index) {
			var options = { ...wrapper.options, linkTo: option.value };
			setAttributes({ wrapper: { ...wrapper, options: options } });
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
		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
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
		function onChangeStylelabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ label: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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
		function onRemoveStylelabel(sudoScource, key) {
			let obj = { ...label };
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
			setAttributes({ label: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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
		function onResetlabel(sudoSources) {
			let obj = Object.assign({}, label);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ label: obj });
		}
		function onAddStylelabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}
		function onBulkAddlabel(sudoScource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;
			setAttributes({ label: obj });
			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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
		function onChangeStyletimesWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, timesWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ timesWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				timesWrapSelector
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
		function onRemoveStyletimesWrap(sudoScource, key) {
			let obj = { ...timesWrap };
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
			setAttributes({ timesWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				timesWrapSelector
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
		function onResettimesWrap(sudoSources) {
			let obj = Object.assign({}, timesWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						timesWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ timesWrap: obj });
		}
		function onAddStyletimesWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, timesWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ timesWrap: object });
		}
		function onBulkAddtimesWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, timesWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ timesWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, timesWrapSelector);
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
		function onChangeStylestartTime(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, startTime);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ startTime: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				startTimeSelector
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
		function onRemoveStylestartTime(sudoScource, key) {
			let obj = { ...startTime };
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
			setAttributes({ startTime: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				startTimeSelector
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
		function onResetstartTime(sudoSources) {
			let obj = Object.assign({}, startTime);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						startTimeSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ startTime: obj });
		}
		function onAddStylestartTime(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, startTime);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ startTime: object });
		}
		function onBulkAddstartTime(sudoScource, cssObj) {
			let obj = Object.assign({}, startTime);
			obj[sudoScource] = cssObj;
			setAttributes({ startTime: obj });
			var selector = myStore.getElementSelector(sudoScource, startTimeSelector);
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
		function onChangeStyleendTime(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, endTime);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ endTime: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				endTimeSelector
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
		function onRemoveStyleendTime(sudoScource, key) {
			let obj = { ...endTime };
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
			setAttributes({ endTime: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				endTimeSelector
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
		function onResetendTime(sudoSources) {
			let obj = Object.assign({}, endTime);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						endTimeSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ endTime: obj });
		}
		function onAddStyleendTime(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, endTime);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ endTime: object });
		}
		function onBulkAddendTime(sudoScource, cssObj) {
			let obj = Object.assign({}, endTime);
			obj[sudoScource] = cssObj;
			setAttributes({ endTime: obj });
			var selector = myStore.getElementSelector(sudoScource, endTimeSelector);
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
		function onChangeStyleclosed(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, closed);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ closed: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closedSelector
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
		function onRemoveStyleclosed(sudoScource, key) {
			let obj = { ...closed };
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
			setAttributes({ closed: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closedSelector
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
		function onResetclosed(sudoSources) {
			let obj = Object.assign({}, closed);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						closedSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ closed: obj });
		}
		function onAddStyleclosed(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, closed);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ closed: object });
		}
		function onBulkAddclosed(sudoScource, cssObj) {
			let obj = Object.assign({}, closed);
			obj[sudoScource] = cssObj;
			setAttributes({ closed: obj });
			var selector = myStore.getElementSelector(sudoScource, closedSelector);
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
		function onChangeStyleseparator(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ separator: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
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
		function onRemoveStyleseparator(sudoScource, key) {
			let obj = { ...separator };
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
			setAttributes({ separator: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
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
		function onResetseparator(sudoSources) {
			let obj = Object.assign({}, separator);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						separatorSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ separator: obj });
		}
		function onAddStyleseparator(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ separator: object });
		}
		function onBulkAddseparator(sudoScource, cssObj) {
			let obj = Object.assign({}, separator);
			obj[sudoScource] = cssObj;
			setAttributes({ separator: obj });
			var selector = myStore.getElementSelector(sudoScource, separatorSelector);
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
		function onChangeStyleitems(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ items: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsSelector
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
		function onRemoveStyleitems(sudoScource, key) {
			let obj = { ...items };
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
			setAttributes({ items: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsSelector
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
		function onResetitems(sudoSources) {
			let obj = Object.assign({}, items);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ items: obj });
		}
		function onAddStyleitems(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
		}
		function onBulkAdditems(sudoScource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;
			setAttributes({ items: obj });
			var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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

		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
			var selector = `${blockClass} .item-${index}`;
			//setAttributes({ obj: object });
			var elementSelector = myStore.getElementSelector(sudoScource, selector);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsCssX = Object.assign({}, blockCssY.items);
			if (itemsCssX[elementSelector] == undefined) {
				itemsCssX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsCssX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
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
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
			var selector = `${blockClass} .item-${index}`;
			var elementSelector = myStore.getElementSelector(sudoScource, selector);
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
		function onAddStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
			//setAttributes({ items: object });
			// setAttributes({ items: itemsX });
		}
		function onBulkAddItem(sudoScource, cssObj, extra) {
			var index = extra.index;
			var elementsX = { ...elements };
			var itemssX = elementsX.items[index];
			let obj = Object.assign({}, itemssX);
			obj[sudoScource] = cssObj;
			elementsX.items[index] = obj;
			setAttributes({ elements: elementsX });
			var selectorX = `${blockClass} .item-${index}`;
			var selector = myStore.getElementSelector(sudoScource, selectorX);
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
		function onResetNthItem(sudoSources, extra) {
			const index = extra.index;
			var elementsX = { ...elements };
			var itemssX = elementsX.items[index];
			if (itemssX) {
				const obj = { ...itemssX };
				Object.entries(sudoSources).forEach(([sudoSource]) => {
					if (obj[sudoSource]) {
						obj[sudoSource] = {};
						const selector = `${blockClass} .item-${index}`;
						const elementSelector = myStore.getElementSelector(
							sudoSource,
							selector
						);
						const cssObject = myStore.deletePropertyDeep(blockCssY.items, [
							elementSelector,
						]);
						setAttributes({ blockCssY: { items: cssObject } });
					}
				});
				elementsX.items[index] = obj;
				setAttributes({ elements: elementsX });
			}
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		// const innerBlocksProps = useInnerBlocksProps(blockProps, {
		// 	directInsert: true,
		// 	templateInsertUpdatesSelection: true,
		// 	renderAppender: InnerBlocks.ButtonBlockAppender,
		// });
		// const hasInnerBlocks = useSelect(
		// 	(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
		// 	[clientId]
		// );
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const TimeDisplay = ({ time }) => {
			const formatTime = (time) => {
				const [hours, minutes] = time.split(":");
				let formattedHours = parseInt(hours, 10);
				const period = formattedHours >= 12 ? "PM" : "AM";
				formattedHours = formattedHours % 12 || 12; // Convert 0 to 12 for 12 AM
				return `${formattedHours}:${minutes} ${period}`;
			};
			return <div>{formatTime(time)}</div>;
		};
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
											{__("ID", "combo-blocks")}
										</label>
										<InputControl
											value={wrapper.options.id}
											onChange={(newVal) => {
												var options = { ...wrapper.options, id: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
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
												// { label: "a", value: "a" },
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
									{wrapper.options.tag == "a" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link To", "combo-blocks")}
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={linkToArgs}
													buttonTitle={
														wrapper.options.linkTo == undefined
															? __("Choose", "combo-blocks")
															: linkToArgs[wrapper.options.linkTo].label
													}
													onChange={setFieldLinkTo}
													values={[]}></PGDropdown>
											</PanelRow>
											{wrapper.options.linkTo == "authorMeta" && (
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Author Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={wrapper.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...wrapper.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																wrapper: { ...wrapper, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{wrapper.options.linkTo == "customField" && (
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Meta Key", "combo-blocks")}
													</label>
													<InputControl
														value={wrapper.options.linkToAuthorMeta}
														onChange={(newVal) => {
															var options = {
																...wrapper.options,
																linkToAuthorMeta: newVal,
															};
															setAttributes({
																wrapper: { ...wrapper, options: options },
															});
														}}
													/>
												</PanelRow>
											)}
											{wrapper.options.linkTo == "customUrl" && (
												<>
													<PanelRow>
														<label
															htmlFor=""
															className="font-medium text-slate-900 ">
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
															{wrapper.options.customUrl.length > 0 && (
																<Button
																	className="!text-red-500 ml-2"
																	icon={linkOff}
																	onClick={(ev) => {
																		var options = {
																			...wrapper.options,
																			customUrl: "",
																		};
																		setAttributes({
																			wrapper: { ...wrapper, options: options },
																		});
																		setLinkPickerPosttitle(false);
																	}}></Button>
															)}
															{linkPickerPosttitle && (
																<Popover position="bottom right">
																	<LinkControl
																		settings={[]}
																		value={wrapper.options.customUrl}
																		onChange={(newVal) => {
																			var options = {
																				...wrapper.options,
																				customUrl: newVal.url,
																			};
																			setAttributes({
																				wrapper: {
																					...wrapper,
																					options: options,
																				},
																			});
																		}}
																	/>
																	<div className="p-2">
																		<span className="font-bold">
																			Linked to:
																		</span>{" "}
																		{wrapper.options.customUrl.length != 0
																			? wrapper.options.customUrl
																			: __("No link", "combo-blocks")}{" "}
																	</div>
																</Popover>
															)}
														</div>
													</PanelRow>
													{wrapper.options.customUrl.length > 0 && (
														<div className="p-2 pl-0 truncate ">
															<span className="font-bold">
																{__("Linked to:", "combo-blocks")}
															</span>{" "}
															{wrapper.options.customUrl}
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
													value={wrapper.options.linkTarget}
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
															...wrapper.options,
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
							title={__("Items", "combo-blocks")}
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
									{/* //*items */}
									<ReactSortable
										list={elements.items}
										handle={".handle"}
										setList={(item) => {
											setAttributes({
												elements: { ...elements, items: item },
											});
										}}>
										{elements.items.map((item, index) => (
											<div key={item.id} className="">
												<PGtoggle
													title={
														<>
															<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon icon={menu} />
															</span>
															<span className="mx-2">{item.label}</span>
														</>
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
																icon: styles,
																className: "tab-style",
															},
														]}>
														<PGtab name="options">
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Label", "combo-blocks")}
																</label>
																<InputControl
																	value={item.label}
																	onChange={(newVal) => {
																		var elementX = { ...elements };
																		var items = [...elements.items];
																		items[index].label = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: items,
																			},
																		});
																	}}
																/>
															</PanelRow>
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Start Time", "combo-blocks")}
																</label>
																<InputControl
																	type="time"
																	value={
																		item.start
																			? item.start
																			: startTime.options.start
																	}
																	onChange={(newVal) => {
																		var elementX = { ...elements };
																		var items = elementX.items;
																		items[index].start = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: items,
																			},
																		});
																	}}
																/>
															</PanelRow>
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("End Time", "combo-blocks")}
																</label>
																<InputControl
																	type="time"
																	value={
																		item.end ? item.end : endTime.options.end
																	}
																	onChange={(newVal) => {
																		var elementX = { ...elements };
																		var items = elementX.items;
																		items[index].end = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: items,
																			},
																		});
																	}}
																/>
															</PanelRow>
															<PanelRow>
																<ToggleControl
																	label={__("Closed?", "combo-blocks")}
																	help={
																		item.status
																			? __("Closed", "combo-blocks")
																			: __("Open", "combo-blocks")
																	}
																	checked={item.status ? true : false}
																	onChange={(e) => {
																		var elementX = { ...elements };
																		var items = elementX.items;
																		items[index].status = !items[index].status;
																		setAttributes({
																			elements: {
																				...elements,
																				items: items,
																			},
																		});
																	}}
																/>
															</PanelRow>
															{item.status && (
																<PanelRow>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		{__("Closed Text", "combo-blocks")}
																	</label>
																	<InputControl
																		value={
																			item.closeText
																				? item.closeText
																				: closed.options.closeText
																		}
																		onChange={(newVal) => {
																			var elementX = { ...elements };
																			var itemsX = elementX.items;
																			itemsX[index].closeText = newVal;
																			setAttributes({
																				elements: {
																					...elements,
																					items: itemsX,
																				},
																			});
																		}}
																	/>
																</PanelRow>
															)}
														</PGtab>
														<PGtab name="styles">
															<PGStyles
																obj={item}
																extra={{ index: index }}
																onChange={onChangeStyleItem}
																onAdd={onAddStyleItem}
																onRemove={onRemoveStyleItem}
																onBulkAdd={onBulkAddItem}
																onReset={onResetNthItem}
															/>
														</PGtab>
													</PGtabs>
												</PGtoggle>
											</div>
										))}
									</ReactSortable>
									{/* //*items */}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												items,
												"items",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={items}
										onChange={onPickCssLibraryitems}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Label", "combo-blocks")}
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
										obj={label}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												label,
												"label",
												labelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												label,
												"label",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												label,
												"label",
												labelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												label,
												"label",
												labelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												label,
												"label",
												labelSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={label}
										onChange={onPickCssLibrarylabel}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Times Wrap", "combo-blocks")}
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
										obj={timesWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												timesWrap,
												"timesWrap",
												timesWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												timesWrap,
												"timesWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												timesWrap,
												"timesWrap",
												timesWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												timesWrap,
												"timesWrap",
												timesWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												timesWrap,
												"timesWrap",
												timesWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={timesWrap}
										onChange={onPickCssLibrarytimesWrap}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Start Time", "combo-blocks")}
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
											{__("Start Time", "combo-blocks")}
										</label>
										<InputControl
											type="time"
											value={startTime.options.start}
											onChange={(newVal) => {
												var options = {
													...startTime.options,
													start: newVal,
												};
												setAttributes({
													startTime: { ...startTime, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={startTime}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												startTime,
												"startTime",
												startTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												startTime,
												"startTime",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												startTime,
												"startTime",
												startTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												startTime,
												"startTime",
												startTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												startTime,
												"startTime",
												startTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={startTime}
										onChange={onPickCssLibrarystartTime}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("End Time", "combo-blocks")}
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
											{__("End Time", "combo-blocks")}
										</label>
										<InputControl
											type="time"
											value={endTime.options.end}
											onChange={(newVal) => {
												var options = {
													...endTime.options,
													end: newVal,
												};
												setAttributes({
													endTime: { ...endTime, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={endTime}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												endTime,
												"endTime",
												endTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												endTime,
												"endTime",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												endTime,
												"endTime",
												endTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												endTime,
												"endTime",
												endTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												endTime,
												"endTime",
												endTimeSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={endTime}
										onChange={onPickCssLibraryendTime}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Separator", "combo-blocks")}
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
											{__("Separator", "combo-blocks")}
										</label>
										<InputControl
											value={separator.options.separator}
											onChange={(newVal) => {
												var options = {
													...separator.options,
													separator: newVal,
												};
												setAttributes({
													separator: { ...separator, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={separator}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												separator,
												"separator",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={separator}
										onChange={onPickCssLibraryseparator}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Closed", "combo-blocks")}
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
											{__("Closed Text", "combo-blocks")}
										</label>
										<InputControl
											value={closed.options.closeText}
											onChange={(newVal) => {
												var options = {
													...closed.options,
													closeText: newVal,
												};
												setAttributes({
													closed: { ...closed, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={closed}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												closed,
												"closed",
												closedSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												closed,
												"closed",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												closed,
												"closed",
												closedSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												closed,
												"closed",
												closedSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												closed,
												"closed",
												closedSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={closed}
										onChange={onPickCssLibraryclosed}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						{/* visibility */}

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
					{elements.items[0].start.length == 0 && (
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
													'<!-- wp:combo-blocks/business-hours {"elements":{"options":{"tag":"div","class":"item"},"styles":{"display":{"Desktop":"flex"},"borderBottom":{"Desktop":"1px solid #fafafa"},"padding":{"Desktop":"11px 0px 10px 0px"},"alignItems":{"Desktop":"center"},"justifyContent":{"Desktop":"space-between"},"color":{"Desktop":"#3b3b3b"},"fontSize":{"Desktop":"20px"},"fontWeight":{"Desktop":"500"}},"items":[{"id":"saturday","label":"Saturday","class":"business-hours-day","status":"true","start":"10:00","end":"","closeText":"","styles":{"color":{"Desktop":"#fa2d2d"}},"chosen":false,"selected":false},{"id":"sunday","label":"Sunday","class":"business-hours-day","status":"true","start":"","end":"","closeText":"","styles":{"color":{"Desktop":"#fa2d2d"}},"chosen":false,"selected":false},{"id":"monday","label":"Monday","class":"business-hours-day","status":"","start":"","end":"","closeText":"","styles":{},"chosen":false,"selected":false},{"id":"tuesday","label":"Tuesday","class":"business-hours-day","status":"","start":"","end":"","closeText":"","styles":{},"chosen":false,"selected":false},{"id":"wednesday","label":"Wednesday","class":"business-hours-day","status":"","start":"","end":"","closeText":"","styles":{},"chosen":false,"selected":false},{"id":"thursday","label":"Thursday","class":"business-hours-day","status":"","start":"","end":"","closeText":"","styles":{},"chosen":false,"selected":false},{"id":"friday","label":"Friday","class":"business-hours-day","status":"","start":"","end":"","closeText":"","styles":{},"chosen":false,"selected":false}]},"blockId":"pge3ad2b0434ac","blockCssY":{"items":{".pge3ad2b0434ac":{"background-color":{"Desktop":"#F1F7F9"},"padding":{"Desktop":"20px 20px 20px 20px"},"box-shadow":{"Desktop":"0px 10px 10px 0px #0000001a"}},".pge3ad2b0434ac .item":{"display":{"Desktop":"flex"},"border-bottom":{"Desktop":"1px solid #fafafa"},"padding":{"Desktop":"11px 0px 10px 0px"},"align-items":{"Desktop":"center"},"justify-content":{"Desktop":"space-between"},"color":{"Desktop":"#3b3b3b"},"font-size":{"Desktop":"20px"},"font-weight":{"Desktop":"500"}},".pge3ad2b0434ac .label":{"margin-right":{"Desktop":"auto"}},".pge3ad2b0434ac .times-wrap":{"margin-left":{"Desktop":"auto"},"display":{"Desktop":"flex"},"justify-content":{"Desktop":"flex-end"},"gap":{"Desktop":"10px"}},".pge3ad2b0434ac .start-time":{"display":{"Desktop":"block"},"background-color":{"Desktop":"#F1F7F9"}},".pge3ad2b0434ac .end-time":{"display":{"Desktop":"block"},"background-color":{"Desktop":"#F1F7F9"}},".pge3ad2b0434ac .separator":{"display":{"Desktop":"block"},"background-color":{"Desktop":"#F1F7F9"}},".pge3ad2b0434ac .closed":{"color":{"Desktop":"#fa2d2d"}},".pge3ad2b0434ac .item-0:id":{"0":"s","1":"a","2":"t","3":"u","4":"r","5":"d","6":"a","7":"y"},".pge3ad2b0434ac .item-0:label":{"0":"S","1":"a","2":"t","3":"u","4":"r","5":"d","6":"a","7":"y"},".pge3ad2b0434ac .item-0:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-0:status":{"0":"t","1":"r","2":"u","3":"e"},".pge3ad2b0434ac .item-0:start":{"0":"1","1":"0","2":":","3":"0","4":"0"},".pge3ad2b0434ac .item-0:closeText":{"0":"a","1":"v","2":"c"},".pge3ad2b0434ac .item-0":{"color":{"Desktop":"#fa2d2d"}},".pge3ad2b0434ac .item-1:id":{"0":"s","1":"u","2":"n","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-1:label":{"0":"S","1":"u","2":"n","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-1:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-1:status":{"0":"t","1":"r","2":"u","3":"e"},".pge3ad2b0434ac .item-1":{"color":{"Desktop":"#fa2d2d"}},".pge3ad2b0434ac .item-2:id":{"0":"m","1":"o","2":"n","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-2:label":{"0":"M","1":"o","2":"n","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-2:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-3:id":{"0":"t","1":"u","2":"e","3":"s","4":"d","5":"a","6":"y"},".pge3ad2b0434ac .item-3:label":{"0":"T","1":"u","2":"e","3":"s","4":"d","5":"a","6":"y"},".pge3ad2b0434ac .item-3:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-4:id":{"0":"w","1":"e","2":"d","3":"n","4":"e","5":"s","6":"d","7":"a","8":"y"},".pge3ad2b0434ac .item-4:label":{"0":"W","1":"e","2":"d","3":"n","4":"e","5":"s","6":"d","7":"a","8":"y"},".pge3ad2b0434ac .item-4:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-5:id":{"0":"t","1":"h","2":"u","3":"r","4":"s","5":"d","6":"a","7":"y"},".pge3ad2b0434ac .item-5:label":{"0":"T","1":"h","2":"u","3":"r","4":"s","5":"d","6":"a","7":"y"},".pge3ad2b0434ac .item-5:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"},".pge3ad2b0434ac .item-6:id":{"0":"f","1":"r","2":"i","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-6:label":{"0":"F","1":"r","2":"i","3":"d","4":"a","5":"y"},".pge3ad2b0434ac .item-6:class":{"0":"b","1":"u","2":"s","3":"i","4":"n","5":"e","6":"s","7":"s","8":"-","9":"h","10":"o","11":"u","12":"r","13":"s","14":"-","15":"d","16":"a","17":"y"}}}} /-->';
												wp.data
													.dispatch("core/block-editor")
													.replaceBlock(clientId, wp.blocks.parse(content));
											}}>
											Skip
										</div>
									</div>
									<div {...blockProps} className="">
										<ComboBlocksVariationsPicker
											blockName={"business-hours"}
											blockId={blockId}
											clientId={clientId}
											onChange={onPickBlockVariation}
										/>
									</div>
								</div>
							</div>
						</>
					)}
					{elements.items[0].start.length > 0 && (
						<CustomTagWrapper {...blockProps}>
							{elements.items.map((x, index) => (
								<div className={"item item-" + index} key={index}>
									<div className="label">{x.label}</div>
									<div className="times-wrap">
										{x.status ? (
											<span className="closed">
												{x.closeText ? x.closeText : closed.options.closeText}{" "}
											</span>
										) : (
											<>
												<span className="start-time">
													<TimeDisplay
														time={x.start ? x.start : startTime.options.start}
													/>
												</span>
												<span className="separator">
													{separator.options.separator}
												</span>
												<span className="end-time">
													<TimeDisplay
														time={x.end ? x.end : endTime.options.end}
													/>
												</span>
											</>
										)}
									</div>
								</div>
							))}
						</CustomTagWrapper>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		return <InnerBlocks.Content />;
		//return null;
	},
});
