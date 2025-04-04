import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, settings, styles } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
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
					d="M159.996 25H-0.00439453V50.7778H159.996V25Z"
					fill="url(#paint0_linear_61_608)"
				/>
				<path
					d="M10.6617 29.8887H88.4394C89.7728 29.8887 90.6617 30.7776 90.6617 32.1109V43.222C90.6617 44.5553 89.7728 45.4442 88.4394 45.4442H10.6617C9.32834 45.4442 8.43945 44.5553 8.43945 43.222V32.1109C8.43945 30.7776 9.32834 29.8887 10.6617 29.8887Z"
					fill="#C15940"
				/>
				<path
					d="M159.996 67.6665H-0.00439453V93.4443H159.996V67.6665Z"
					fill="url(#paint1_linear_61_608)"
				/>
				<path
					d="M10.6617 72.5557H132.884C134.217 72.5557 135.106 73.4446 135.106 74.7779V85.889C135.106 87.2223 134.217 88.1112 132.884 88.1112H10.6617C9.32834 88.1112 8.43945 87.2223 8.43945 85.889V74.7779C8.43945 73.889 9.32834 72.5557 10.6617 72.5557Z"
					fill="#C15940"
				/>
				<path
					d="M159.996 110.333H-0.00439453V136.111H159.996V110.333Z"
					fill="url(#paint2_linear_61_608)"
				/>
				<path
					d="M10.6617 115.667H150.217C151.551 115.667 152.439 116.555 152.439 117.889V129C152.439 130.333 151.551 131.222 150.217 131.222H10.6617C9.32834 131.222 8.43945 130.333 8.43945 129V117.889C8.43945 116.555 9.32834 115.667 10.6617 115.667Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_608"
						x1="-0.00439453"
						y1="37.8889"
						x2="159.996"
						y2="37.8889"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_608"
						x1="-0.00439453"
						y1="80.5554"
						x2="159.996"
						y2="80.5554"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_608"
						x1="-0.00439453"
						y1="123.222"
						x2="159.996"
						y2="123.222"
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
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;
		let progressBar = attributes.progressBar;
		var progressLabel = attributes.progressLabel;
		var progressCount = attributes.progressCount;
		var progressFill = attributes.progressFill;
		var progressData = attributes.progressData;
		var progressInfo = attributes.progressInfo;
		var circleOverlay = attributes.circleOverlay;
		var circleMask = attributes.circleMask;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var progressBarSelector = blockClass + " .progress-bar";
		var progressFillSelector = blockClass + " .progress-fill";
		var progressCountSelector = blockClass + " .progress-count";
		var progressLabelSelector = blockClass + " .progress-label";
		const iconSelector = blockClass + " .progress-icon";
		const circleOverlaySelector = blockClass + " .progress-circle-overlay";
		const circleMaskSelector = blockClass + " .progress-circle-mask";
		var progressInfoSelector = blockClass + " .progress-info";
		var progressBarSourceBasic = {
			normal: {
				label: __("Normal", "combo-blocks"),
				value: "normal",
			},
			total_sale: {
				label: __("Total Sale", "combo-blocks"),
				value: "total_sale",
				isPro: true,
			},
			stock_quantity: {
				label: __("Stock Quantity", "combo-blocks"),
				value: "stock_quantity",
				isPro: true,
			},
		};
		let progressBarSource = applyFilters(
			"comboBlocksProgressBarSource",
			progressBarSourceBasic
		);
		function setProgressBarSrc(option, index) {
			// var options = {
			// 	...progressData.options,
			// 	source: option.value,
			// };
			setAttributes({
				progressData: { ...progressData, source: option.value },
			});
		}
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ progressBar: progressBar });
			// setAttributes({ wrapper: wrapper });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[progressBarSelector] = progressBar;
			blockCssObj[progressFillSelector] = progressFill;
			blockCssObj[progressCountSelector] = progressCount;
			blockCssObj[progressLabelSelector] = progressLabel;
			blockCssObj[iconSelector] = icon;
			blockCssObj[circleOverlaySelector] = circleOverlay;
			blockCssObj[circleMaskSelector] = circleMask;
			blockCssObj[progressInfoSelector] = progressInfo;
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
				var wrapperX = attributes.wrapper;
				var progressDataX = attributes.progressData;
				var progressInfoX = attributes.progressInfo;
				var progressBarX = attributes.progressBar;
				var progressFillX = attributes.progressFill;
				var progressCountX = attributes.progressCount;
				var circleOverlayX = attributes.circleOverlay;
				var circleMaskX = attributes.circleMask;
				var progressLabelX = attributes.progressLabel;
				var iconX = attributes.icon;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (progressLabelX != undefined) {
					var progressLabelY = {
						...progressLabelX,
						options: progressLabel.options,
					};
					setAttributes({ progressLabel: progressLabelY });
					blockCssObj[progressLabelSelector] = progressLabelY;
				}
				if (circleMaskX != undefined) {
					var circleMaskY = { ...circleMaskX, options: circleMask.options };
					setAttributes({ circleMask: circleMaskY });
					blockCssObj[circleMaskSelector] = circleMaskY;
				}
				if (circleOverlayX != undefined) {
					var circleOverlayY = {
						...circleOverlayX,
						options: circleOverlay.options,
					};
					setAttributes({ circleOverlay: circleOverlayY });
					blockCssObj[circleOverlaySelector] = circleOverlayY;
				}
				if (progressCountX != undefined) {
					var progressCountY = {
						...progressCountX,
						options: progressCount.options,
					};
					setAttributes({ progressCount: progressCountY });
					blockCssObj[progressCountSelector] = progressCountY;
				}
				if (progressFillX != undefined) {
					var progressFillY = {
						...progressFillX,
						options: progressFill.options,
					};
					setAttributes({ progressFill: progressFillY });
					blockCssObj[progressFillSelector] = progressFillY;
				}
				if (progressBarX != undefined) {
					var progressBarY = { ...progressBarX, options: progressBar.options };
					setAttributes({ progressBar: progressBarY });
					blockCssObj[progressBarSelector] = progressBarY;
				}
				if (progressInfoX != undefined) {
					var progressInfoY = {
						...progressInfoX,
						options: progressInfo.options,
					};
					setAttributes({ progressInfo: progressInfoY });
					blockCssObj[progressInfoSelector] = progressInfoY;
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
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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
		function onRemoveStyleProgressCount(sudoScource, key) {
			let obj = { ...progressCount };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressCountSelector
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
		function onRemoveStyleProgressLabel(sudoScource, key) {
			let obj = { ...progressLabel };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressLabelSelector
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
		function onRemoveStyleProgressBar(sudoScource, key) {
			let obj = { ...progressBar };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressBarSelector
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
		function onRemoveStyleProgressFill(sudoScource, key) {
			let obj = { ...progressFill };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressFillSelector
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
		function onRemoveStyleCircleOverlay(sudoScource, key) {
			let obj = { ...circleOverlay };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				circleOverlaySelector
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
		function onRemoveStyleCircleMask(sudoScource, key) {
			let obj = { ...circleMask };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				circleMaskSelector
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
		function onRemoveStyleProgressInfo(sudoScource, key) {
			let obj = { ...progressInfo };
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
			setAttributes({ progressInfo: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressInfoSelector
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
		function onResetProgressCount(sudoSources) {
			let obj = Object.assign({}, progressCount);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						progressCountSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ progressCount: obj });
		}
		function onResetProgressLabel(sudoSources) {
			let obj = Object.assign({}, progressLabel);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						progressLabelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ progressLabel: obj });
		}
		function onResetProgressBar(sudoSources) {
			let obj = Object.assign({}, progressBar);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						progressBarSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ progressBar: obj });
		}
		function onResetProgressFill(sudoSources) {
			let obj = Object.assign({}, progressFill);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						progressFillSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ progressFill: obj });
		}
		function onResetCircleOverlay(sudoSources) {
			let obj = Object.assign({}, circleOverlay);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						circleOverlaySelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ circleOverlay: obj });
		}
		function onResetCircleMask(sudoSources) {
			let obj = Object.assign({}, circleMask);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						circleMaskSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ circleMask: obj });
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
		function onResetProgressInfo(sudoSources) {
			let obj = Object.assign({}, progressInfo);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						progressInfoSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ progressInfo: obj });
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
		function onChangeStyleProgressCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, progressCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ progressCount: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressCountSelector
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
		function onAddStyleProgressCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, progressCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ progressCount: object });
		}
		function onChangeStyleProgressLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, progressLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ progressLabel: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressLabelSelector
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
		function onAddStyleProgressLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, progressLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ progressLabel: object });
		}
		function onChangeStyleProgressBar(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, progressBar);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ progressBar: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressBarSelector
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
		function onAddStyleProgressBar(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, progressBar);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ progressBar: object });
		}
		function onChangeStyleProgressFill(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, progressFill);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ progressFill: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressFillSelector
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
		function onAddStyleProgressFill(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, progressFill);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ progressFill: object });
		}
		function onChangeStyleCircleOverlay(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, circleOverlay);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ circleOverlay: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				circleOverlaySelector
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
		function onAddStyleCircleOverlay(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, circleOverlay);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ circleOverlay: object });
		}
		function onChangeStyleCircleMask(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, circleMask);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ circleMask: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				circleMaskSelector
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
		function onAddStyleCircleMask(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, circleMask);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ circleMask: object });
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
		function onChangeStyleProgressInfo(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, progressInfo);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ progressInfo: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				progressInfoSelector
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
		function onAddStyleProgressInfo(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, progressInfo);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ progressInfo: object });
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
		function onBulkAddProgressLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, progressLabel);
			obj[sudoScource] = cssObj;
			setAttributes({ progressLabel: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				progressLabelSelector
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
		function onBulkAddProgressCount(sudoScource, cssObj) {
			let obj = Object.assign({}, progressCount);
			obj[sudoScource] = cssObj;
			setAttributes({ progressCount: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				progressCountSelector
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
		function onBulkAddProgressBar(sudoScource, cssObj) {
			let obj = Object.assign({}, progressBar);
			obj[sudoScource] = cssObj;
			setAttributes({ progressBar: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				progressBarSelector
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
		function onBulkAddProgressFill(sudoScource, cssObj) {
			let obj = Object.assign({}, progressFill);
			obj[sudoScource] = cssObj;
			setAttributes({ progressFill: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				progressFillSelector
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
		function onBulkAddCircleOverlay(sudoScource, cssObj) {
			let obj = Object.assign({}, circleOverlay);
			obj[sudoScource] = cssObj;
			setAttributes({ circleOverlay: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				circleOverlaySelector
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
		function onBulkAddCircleMask(sudoScource, cssObj) {
			let obj = Object.assign({}, circleMask);
			obj[sudoScource] = cssObj;
			setAttributes({ circleMask: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				circleMaskSelector
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
		function onBulkAddProgressInfo(sudoScource, cssObj) {
			let obj = Object.assign({}, progressInfo);
			obj[sudoScource] = cssObj;
			setAttributes({ progressInfo: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				progressInfoSelector
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		// useEffect(() => {}, [progressBar]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Fill?", "combo-blocks")}
								</label>
								<div className="flex items-center gap-1">
									<InputControl
										type="number"
										className="mr-2"
										value={progressData.fill}
										onChange={(newVal) => {
											setAttributes({
												progressData: { ...progressData, fill: newVal },
											});
											onChangeStyleProgressFill(
												"styles",
												newVal + "%",
												"width"
											);
										}}
									/>{" "}
									<span>%</span>
								</div>
							</PanelRow>
							{/* )} */}
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Animate On", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={
										progressData.animate == undefined
											? ""
											: progressData.animate
									}
									options={[
										{ label: __("No Animation", "combo-blocks"), value: "" },
										{ label: __("onVisible", "combo-blocks"), value: "onVisible" },
										{ label: __("onLoad", "combo-blocks"), value: "onLoad" },
									]}
									onChange={(newVal) => {
										// var options = { ...progressData.options, animate: newVal };
										setAttributes({
											progressData: { ...progressData, animate: newVal },
										});
									}}
								/>
							</PanelRow>
							{progressData.animate != undefined &&
								progressData.animate.length > 0 && (
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Duration?", "combo-blocks")}
										</label>
										<InputControl
											type="number"
											className="mr-2"
											placeholder="In second"
											value={progressData.animateDuration}
											onChange={(newVal) => {
												setAttributes({
													progressData: {
														...progressData,
														animateDuration: newVal,
													},
												});
											}}
										/>
									</PanelRow>
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
							title={__("Progress Label", "combo-blocks")}
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
											{__("Label Text?", "combo-blocks")}
										</label>
										<InputControl
											type="text"
											className="mr-2"
											value={progressLabel.options.text}
											onChange={(newVal) => {
												var options = {
													...progressLabel.options,
													text: newVal,
												};
												setAttributes({
													progressLabel: { ...progressLabel, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Label Position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={progressLabel.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Bar", "combo-blocks"),
													value: "beforeBar",
												},
												{
													label: __("Before Fill", "combo-blocks"),
													value: "beforeFill",
												},
												{
													label: __("After Fill", "combo-blocks"),
													value: "afterFill",
												},
												{
													label: __("Inside Fill", "combo-blocks"),
													value: "insideFill",
												},
												{
													label: __("After Bar", "combo-blocks"),
													value: "afterBar",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...progressLabel.options,
													position: newVal,
												};
												setAttributes({
													progressLabel: { ...progressLabel, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={progressLabel}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												progressLabel,
												"progressLabel",
												progressLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												progressLabel,
												"progressLabel",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												progressLabel,
												"progressLabel",
												progressLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												progressLabel,
												"progressLabel",
												progressLabelSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												progressLabel,
												"progressLabel",
												progressLabelSelector,
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
							title={__("Progress Count", "combo-blocks")}
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
											{__("Counter position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={progressCount.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Bar", "combo-blocks"),
													value: "beforeBar",
												},
												{
													label: __("Before Fill", "combo-blocks"),
													value: "beforeFill",
												},
												{
													label: __("Inside Fill", "combo-blocks"),
													value: "insideFill",
												},
												{
													label: __("After Fill", "combo-blocks"),
													value: "afterFill",
												},
												{
													label: __("After Bar", "combo-blocks"),
													value: "afterBar",
												},
												{
													label: __("Before Label", "combo-blocks"),
													value: "beforeLabel",
												},
												{
													label: __("After Label", "combo-blocks"),
													value: "afterLabel",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...progressCount.options,
													position: newVal,
												};
												setAttributes({
													progressCount: { ...progressCount, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Prefix", "combo-blocks")}
										</label>
										<InputControl
											type="text"
											className="mr-2"
											value={progressCount.options.prefix}
											onChange={(newVal) => {
												var options = {
													...progressCount.options,
													prefix: newVal,
												};
												setAttributes({
													progressCount: { ...progressCount, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Postfix", "combo-blocks")}
										</label>
										<InputControl
											type="text"
											className="mr-2"
											value={progressCount.options.postfix}
											onChange={(newVal) => {
												var options = {
													...progressCount.options,
													postfix: newVal,
												};
												setAttributes({
													progressCount: { ...progressCount, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={progressCount}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												progressCount,
												"progressCount",
												progressCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												progressCount,
												"progressCount",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												progressCount,
												"progressCount",
												progressCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												progressCount,
												"progressCount",
												progressCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												progressCount,
												"progressCount",
												progressCountSelector,
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
							title={__("Progress Bar", "combo-blocks")}
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
										obj={progressBar}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												progressBar,
												"progressBar",
												progressBarSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												progressBar,
												"progressBar",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												progressBar,
												"progressBar",
												progressBarSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												progressBar,
												"progressBar",
												progressBarSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												progressBar,
												"progressBar",
												progressBarSelector,
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
							title={__("Progress Fill", "combo-blocks")}
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
										obj={progressFill}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												progressFill,
												"progressFill",
												progressFillSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												progressFill,
												"progressFill",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												progressFill,
												"progressFill",
												progressFillSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												progressFill,
												"progressFill",
												progressFillSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												progressFill,
												"progressFill",
												progressFillSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						{progressData.type == "circleBorder" && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Circle Overlay", "combo-blocks")}
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
										<PGtab name="options"></PGtab>
										<PGtab name="styles">
											<PGStyles
												obj={circleOverlay}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														circleOverlay,
														"circleOverlay",
														circleOverlaySelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														circleOverlay,
														"circleOverlay",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														circleOverlay,
														"circleOverlay",
														circleOverlaySelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														circleOverlay,
														"circleOverlay",
														circleOverlaySelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														circleOverlay,
														"circleOverlay",
														circleOverlaySelector,
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
									title={__("Circle Mask", "combo-blocks")}
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
										<PGtab name="options"></PGtab>
										<PGtab name="styles">
											<PGStyles
												obj={circleMask}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														circleMask,
														"circleMask",
														circleMaskSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														circleMask,
														"circleMask",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														circleMask,
														"circleMask",
														circleMaskSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														circleMask,
														"circleMask",
														circleMaskSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														circleMask,
														"circleMask",
														circleMaskSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
							</>
						)}
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
													label: __("Before Label", "combo-blocks"),
													value: "beforeLabel",
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
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Progress Info", "combo-blocks")}
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
											{__("Info Position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={progressInfo.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Bar", "combo-blocks"),
													value: "beforeBar",
												},
												{
													label: __("After Bar", "combo-blocks"),
													value: "afterBar",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...progressInfo.options,
													position: newVal,
												};
												setAttributes({
													progressInfo: { ...progressInfo, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={progressInfo}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												progressInfo,
												"progressInfo",
												progressInfoSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												progressInfo,
												"progressInfo",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												progressInfo,
												"progressInfo",
												progressInfoSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												progressInfo,
												"progressInfo",
												progressInfoSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												progressInfo,
												"progressInfo",
												progressInfoSelector,
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
					{!progressData.type && (
						<div {...blockProps} className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										{__("Click to pick a variation", "combo-blocks")}
									</div>
									<div
										className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											var content =
												'<!-- wp:combo-blocks/progress-bar {"wrapper":{"options":{"tag":"div","class":""},"styles":{"color":[],"backgroundColor":[],"margin":[],"paddingBottom":[],"display":{"Desktop":"flex"},"alignItems":{"Desktop":"center"},"gap":{"Desktop":"10px"}}},"progressData":{"type":"horizontal","animate":"onVisible","animateDuration":1,"animateIteration":2,"animateDelay":2,"fill":"40","unit":"%"},"progressInfo":{"options":{"tag":"div","class":"","position":""},"styles":{"display":{"Desktop":"flex"},"justifyContent":{"Desktop":"space-between"},"padding":{"Desktop":"10px 0px 10px 0px"},"width":{"Desktop":"25%"}}},"progressBar":{"options":{"tag":"div","class":""},"styles":{"color":[],"fontSize":[],"backgroundColor":{"Desktop":"#cbd7b3"},"height":{"Desktop":"12px"},"width":{"Desktop":"65%"},"borderRadius":{"Desktop":"50px 50px 50px 50px"},"overflow":{"Desktop":"hidden"}}},"progressFill":{"options":{"tag":"div","class":""},"styles":{"color":[],"fontSize":[],"backgroundColor":{"Desktop":"#abbcb4"},"height":{"Desktop":"12px"},"width":{"Desktop":"40%"},"borderRadius":{"Desktop":"50px 50px 50px 50px"}}},"progressCount":{"options":{"position":"afterBar","class":""},"styles":{"color":[],"fontSize":{"Desktop":"20px"},"width":{"Desktop":"10%"},"textAlign":{"Desktop":"center"}}},"circleOverlay":[],"circleMask":[],"progressLabel":{"options":{"text":"Equality","position":"beforeBar","class":""},"styles":{"textAlign":[],"fontSize":{"Desktop":"20px","Tablet":"36px","Mobile":"30px"},"fontFamily":{"Desktop":"Josefin Sans"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"color":{"Desktop":"#494949"},"width":{"Tablet":"80%","Mobile":"100%"},"marginRight":[],"marginLeft":[]}},"icon":{"options":{"library":"fontAwesome","position":"beforeprogressCount","srcType":"class","iconSrc":"far fa-calendar-alt","class":"number-count-icon"},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"fontSize":{"Desktop":""}}},"blockId":"pg8291e792fbb0","blockCssY":{"items":{".pg8291e792fbb0":{"display":{"Desktop":"flex"},"align-items":{"Desktop":"center"},"gap":{"Desktop":"10px"}},".pg8291e792fbb0 .progress-bar":{"background-color":{"Desktop":"#cbd7b3"},"height":{"Desktop":"12px"},"width":{"Desktop":"65%"},"border-radius":{"Desktop":"50px 50px 50px 50px"},"overflow":{"Desktop":"hidden"}},".pg8291e792fbb0 .progress-fill":{"background-color":{"Desktop":"#abbcb4"},"height":{"Desktop":"12px"},"width":{"Desktop":"40%"},"border-radius":{"Desktop":"50px 50px 50px 50px"}},".pg8291e792fbb0 .progress-count":{"font-size":{"Desktop":"20px"},"width":{"Desktop":"10%"},"text-align":{"Desktop":"center"}},".pg8291e792fbb0 .progress-label":{"font-size":{"Desktop":"20px","Tablet":"36px","Mobile":"30px"},"font-family":{"Desktop":"Josefin Sans"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"color":{"Desktop":"#494949"},"width":{"Tablet":"80%","Mobile":"100%"}},".pg8291e792fbb0 .progress-info":{"display":{"Desktop":"flex"},"justify-content":{"Desktop":"space-between"},"padding":{"Desktop":"10px 0px 10px 0px"},"width":{"Desktop":"25%"}}}}} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"progress-bar"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{progressData.type == "horizontal" && (
						<div {...blockProps}>
							{progressInfo.options.position == "beforeBar" && (
								<div className="progress-info">
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									<div className="progress-label">
										{progressLabel.options.text}
									</div>
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
							{progressLabel.options.position == "beforeBar" && (
								<>
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.text.length > 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</>
							)}
							{progressCount.options.position == "beforeBar" && (
								<div className="progress-count">
									{progressCount.options.prefix}
									{progressData.fill}
									{progressCount.options.postfix}
								</div>
							)}
							<div className="progress-bar">
								{progressLabel.options.position == "beforeFill" && (
									<>
										{icon.options.position == "beforeLabel" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{progressCount.options.position == "beforeLabel" && (
											<div className="progress-count">
												{progressCount.options.prefix}
												{progressData.fill}
												{progressCount.options.postfix}
											</div>
										)}
										{progressLabel.options.text.length > 0 && (
											<div className="progress-label">
												{progressLabel.options.text}
											</div>
										)}
										{progressCount.options.position == "afterLabel" && (
											<div className="progress-count">
												{progressCount.options.prefix}
												{progressData.fill}
												{progressCount.options.postfix}
											</div>
										)}
									</>
								)}
								{progressCount.options.position == "beforeFill" && (
									<div className="progress-count">
										{progressCount.options.prefix}
										{progressData.fill}
										{progressCount.options.postfix}
									</div>
								)}
								<div className="progress-fill">
									{progressLabel.options.position == "insideFill" && (
										<>
											{icon.options.position == "beforeLabel" && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{progressCount.options.position == "beforeLabel" && (
												<div className="progress-count">
													{progressCount.options.prefix}
													{progressData.fill}
													{progressCount.options.postfix}
												</div>
											)}
											{progressLabel.options.text.length > 0 && (
												<div className="progress-label">
													{progressLabel.options.text}
												</div>
											)}
											{progressCount.options.position == "afterLabel" && (
												<div className="progress-count">
													{progressCount.options.prefix}
													{progressData.fill}
													{progressCount.options.postfix}
												</div>
											)}
										</>
									)}
									{progressCount.options.position == "insideFill" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
								{progressLabel.options.position == "afterFill" && (
									<>
										{icon.options.position == "beforeLabel" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{progressCount.options.position == "beforeLabel" && (
											<div className="progress-count">
												{progressCount.options.prefix}
												{progressData.fill}
												{progressCount.options.postfix}
											</div>
										)}
										{progressLabel.options.text.length > 0 && (
											<div className="progress-label">
												{progressLabel.options.text}
											</div>
										)}
										{progressCount.options.position == "afterLabel" && (
											<div className="progress-count">
												{progressCount.options.prefix}
												{progressData.fill}
												{progressCount.options.postfix}
											</div>
										)}
									</>
								)}
								{progressCount.options.position == "afterFill" && (
									<div className="progress-count">
										{progressCount.options.prefix}
										{progressData.fill}
										{progressCount.options.postfix}
									</div>
								)}
							</div>
							{progressInfo.options.position == "afterBar" && (
								<div className="progress-info">
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
							{progressCount.options.position == "afterBar" && (
								<div className="progress-count">
									{progressCount.options.prefix}
									{progressData.fill}
									{progressCount.options.postfix}
								</div>
							)}
							{progressLabel.options.position == "afterBar" && (
								<>
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.text.length > 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</>
							)}
						</div>
					)}
					{progressData.type == "vertical" && (
						<div {...blockProps}>
							{progressInfo.options.position == "beforeBar" && (
								<div className="progress-info">
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
							<div className="progress-bar">
								{progressLabel.options.position == "beforeFill" && (
									<div className="progress-label">
										{progressLabel.options.text}
									</div>
								)}
								{progressCount.options.position == "beforeFill" && (
									<div className="progress-count">
										{progressCount.options.prefix}
										{progressData.fill}
										{progressCount.options.postfix}
									</div>
								)}
								<div className="progress-fill">
									{progressLabel.options.position == "insideFill" && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "insideFill" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
								{progressLabel.options.position == "afterFill" && (
									<div className="progress-label">
										{progressLabel.options.text}
									</div>
								)}
								{progressCount.options.position == "afterFill" && (
									<div className="progress-count">
										{progressCount.options.prefix}
										{progressData.fill}
										{progressCount.options.postfix}
									</div>
								)}
							</div>
							{progressInfo.options.position == "afterBar" && (
								<div className="progress-info">
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
						</div>
					)}
					{progressData.type == "circleBorder" && (
						<div {...blockProps}>
							{progressInfo.options.position == "beforeBar" && (
								<div className="progress-info">
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
							<div className="circle-wrap progress-bar">
								<div className="mask full progress-circle-mask">
									<div className="fill progress-fill"></div>
								</div>
								<div className="mask half progress-circle-mask">
									<div className="fill progress-fill"></div>
								</div>
								<div className="inside-circle progress-circle-overlay"> </div>
							</div>
							{progressInfo.options.position == "afterBar" && (
								<div className="progress-info">
									{progressInfo.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{icon.options.position == "beforePrefix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">
											{progressCount.options.prefix}
											{progressData.fill}
											{progressCount.options.postfix}
										</div>
									)}
								</div>
							)}
						</div>
					)}
					{progressData.type == "circleFill" && (
						<div {...blockProps}>
							{progressInfo.options.position == "beforeBar" && (
								<div className="progress-info">
									{progressInfo.options.position == "beforeLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
									{icon.options.position == "beforeLabel" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
								</div>
							)}
							<div className="circle-wrap progress-bar">
								<div className="mask full">
									<div className="fill progress-fill"></div>
								</div>
								<div className="mask half">
									<div className="fill progress-fill"></div>
								</div>
							</div>
							{progressInfo.options.position == "afterBar" && (
								<div className="progress-info">
									{progressInfo.options.position == "beforeLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
									{icon.options.position == "beforePrefix" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{progressCount.options.position == "beforeLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
									{progressLabel.options.position.length == 0 && (
										<div className="progress-label">
											{progressLabel.options.text}
										</div>
									)}
									{progressCount.options.position == "afterLabel" && (
										<div className="progress-count">{progressData.fill}</div>
									)}
								</div>
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
