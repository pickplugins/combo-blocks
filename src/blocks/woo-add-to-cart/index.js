import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
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
				<path
					d="M85.6845 50.978C85.6845 61.8453 85.6845 72.3782 85.6845 83.2455C72.7273 88.094 59.6866 92.9425 46.395 97.9581C46.395 87.0908 46.395 76.4744 46.395 65.6071C59.3522 60.7586 72.4765 55.9101 85.6845 50.978Z"
					fill="url(#paint0_linear_61_950)"
				/>
				<path
					d="M42.466 65.5235C42.466 76.3908 42.466 86.9237 42.466 97.8746C29.2581 92.9425 16.301 88.094 3.26025 83.2455C3.26025 72.4618 3.26025 61.9289 3.26025 50.978C16.4682 55.9101 29.5089 60.675 42.466 65.5235Z"
					fill="url(#paint1_linear_61_950)"
				/>
				<path
					d="M85.4334 32.8381C71.4731 38.0209 58.098 43.0366 44.4721 48.1358C31.0969 43.2037 17.6382 38.1045 3.51074 32.9216C12.4554 29.5779 20.7312 26.4848 29.0907 23.3918C33.6048 21.72 38.1189 20.1317 42.633 18.3762C43.887 17.8746 44.9736 17.8746 46.2275 18.3762C59.1011 23.1411 72.0583 27.8224 85.4334 32.8381Z"
					fill="url(#paint2_linear_61_950)"
				/>
				<path
					d="M88.9446 35.5967C88.9446 39.0241 88.9446 42.2006 88.9446 45.628C74.9007 50.8109 60.8568 56.0774 46.4785 61.4274C46.4785 58 46.4785 54.907 46.4785 51.3961C60.4388 46.2132 74.6499 40.9467 88.9446 35.5967Z"
					fill="url(#paint3_linear_61_950)"
				/>
				<path
					d="M42.466 61.4274C28.0877 56.0774 14.0439 50.8109 0 45.628C0 42.2842 0 39.1077 0 35.5967C14.2947 40.9467 28.4221 46.1296 42.466 51.3961C42.466 54.7399 42.466 57.9164 42.466 61.4274Z"
					fill="url(#paint4_linear_61_950)"
				/>
				<path
					d="M160 107.488H0V124.625H160V107.488Z"
					fill="url(#paint5_linear_61_950)"
				/>
				<path
					d="M160 138.334H0V155.471H160V138.334Z"
					fill="url(#paint6_linear_61_950)"
				/>
				<path
					d="M142.239 86.9534C145.464 86.9534 148.088 84.3294 148.088 81.104C148.088 77.8787 145.464 75.2546 142.239 75.2546C139.014 75.2546 136.39 77.8787 136.39 81.104C136.39 84.3294 139.014 86.9534 142.239 86.9534ZM142.239 78.8869C143.462 78.8869 144.456 79.8815 144.456 81.104C144.456 82.3266 143.462 83.3211 142.239 83.3211C141.016 83.3211 140.022 82.3266 140.022 81.104C140.022 79.8815 141.017 78.8869 142.239 78.8869Z"
					fill="#C15940"
				/>
				<path
					d="M151.612 54.047C151.268 53.6089 150.741 53.353 150.184 53.353H119.131L118.147 48.4033C117.544 45.2719 114.768 43 111.543 43H108.816C107.813 43 107 43.8131 107 44.8161C107 45.8192 107.813 46.6323 108.816 46.6323H111.543C113.055 46.6323 114.304 47.6444 114.581 49.0936C114.582 49.0978 114.583 49.1019 114.584 49.1061L118.661 69.6194C119.203 72.3493 121.617 74.3306 124.4 74.3306H142.792C145.452 74.3306 147.78 72.5335 148.453 69.9605C148.456 69.9503 148.459 69.9402 148.461 69.93L151.948 55.5987C152.08 55.0572 151.956 54.4852 151.612 54.047ZM144.936 69.0533C144.676 70.0225 143.797 70.6982 142.792 70.6982H124.4C123.345 70.6982 122.429 69.9466 122.223 68.9112L119.853 56.9853H147.873L144.936 69.0533Z"
					fill="#C15940"
				/>
				<path
					d="M124.82 75.2546C121.594 75.2546 118.97 77.8787 118.97 81.104C118.97 84.3294 121.594 86.9534 124.82 86.9534C128.045 86.9534 130.669 84.3294 130.669 81.104C130.669 77.8787 128.045 75.2546 124.82 75.2546ZM124.82 83.3211C123.597 83.3211 122.603 82.3266 122.603 81.104C122.603 79.8816 123.597 78.8869 124.82 78.8869C126.042 78.8869 127.037 79.8815 127.037 81.104C127.037 82.3265 126.042 83.3211 124.82 83.3211Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_950"
						x1="46.395"
						y1="74.4681"
						x2="85.6845"
						y2="74.4681"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_950"
						x1="3.26025"
						y1="74.4263"
						x2="42.466"
						y2="74.4263"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_950"
						x1="3.51074"
						y1="33.0679"
						x2="85.4334"
						y2="33.0679"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_950"
						x1="46.4785"
						y1="48.512"
						x2="88.9446"
						y2="48.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_950"
						x1="0"
						y1="48.512"
						x2="42.466"
						y2="48.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_950"
						x1="0"
						y1="116.056"
						x2="160"
						y2="116.056"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_950"
						x1="0"
						y1="146.903"
						x2="160"
						y2="146.903"
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
		let cartBtn = attributes.cartBtn;
		let quantityWrap = attributes.quantityWrap;
		let quantityInput = attributes.quantityInput;
		let quantityIncrease = attributes.quantityIncrease;
		let quantityDecrease = attributes.quantityDecrease;
		let viewCart = attributes.viewCart;
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
		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var cartBtnSelector = blockClass + " .cartBtn";
		const iconSelector = blockClass + " .sku-icon";
		const viewCartSelector = blockClass + " .added_to_cart";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const quantityWrapSelector = blockClass + " .quantity-wrap";
		const quantityIncreaseSelector = blockClass + " .quantity-increase";
		const quantityDecreaseSelector = blockClass + " .quantity-decrease";
		const quantityInputSelector = blockClass + " .quantity-input";
		// const [
		//   currentPostSKU,
		//   setcurrentPostSKU,
		// ] = useEntityProp('postType', postType, 'date', postId);
		const [postSKUEdited, setpostSKUEdited] = useState(cartBtn.options.text);
		useEffect(() => {
			setpostSKUEdited(cartBtn.options.text);
		}, [cartBtn.options.text]);
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
				var viewCartX = attributes.viewCart;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var cartBtnX = attributes.cartBtn;
				var quantityWrapX = attributes.quantityWrap;
				var quantityInputX = attributes.quantityInput;
				var quantityIncreaseX = attributes.quantityIncrease;
				var quantityDecreaseX = attributes.quantityDecrease;
				var iconX = attributes.icon;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (quantityDecreaseX != undefined) {
					var quantityDecreaseY = {
						...quantityDecreaseX,
						options: quantityDecrease.options,
					};
					setAttributes({ quantityDecrease: quantityDecreaseY });
					blockCssObj[quantityDecreaseSelector] = quantityDecreaseY;
				}
				if (quantityIncreaseX != undefined) {
					var quantityIncreaseY = {
						...quantityIncreaseX,
						options: quantityIncrease.options,
					};
					setAttributes({ quantityIncrease: quantityIncreaseY });
					blockCssObj[quantityIncreaseSelector] = quantityIncreaseY;
				}
				if (quantityInputX != undefined) {
					var quantityInputY = {
						...quantityInputX,
						options: quantityInput.options,
					};
					setAttributes({ quantityInput: quantityInputY });
					blockCssObj[quantityInputSelector] = quantityInputY;
				}
				if (quantityWrapX != undefined) {
					var quantityWrapY = {
						...quantityWrapX,
						options: quantityWrap.options,
					};
					setAttributes({ quantityWrap: quantityWrapY });
					blockCssObj[quantityWrapSelector] = quantityWrapY;
				}
				if (cartBtnX != undefined) {
					var cartBtnY = { ...cartBtnX, options: cartBtn.options };
					setAttributes({ cartBtn: cartBtnY });
					blockCssObj[cartBtnSelector] = cartBtnY;
				}
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
				if (viewCartX != undefined) {
					var viewCartY = { ...viewCartX, options: viewCart.options };
					setAttributes({ viewCart: viewCartY });
					blockCssObj[viewCartSelector] = viewCartY;
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
		function onPickCssLibrarySku(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				cartBtn[sudoScource] = sudoScourceArgs;
			});
			var skuX = Object.assign({}, cartBtn);
			setAttributes({ cartBtn: skuX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					cartBtnSelector
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
		function onRemoveStyleSku(sudoScource, key) {
			let obj = { ...cartBtn };
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
			setAttributes({ cartBtn: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				cartBtnSelector
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
		function onRemoveStyleQuantityWrap(sudoScource, key) {
			let obj = { ...quantityWrap };
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
			setAttributes({ quantityWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityWrapSelector
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
		function onRemoveStyleQuantityInput(sudoScource, key) {
			let obj = { ...quantityInput };
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
			setAttributes({ quantityInput: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityInputSelector
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
		function onRemoveStyleQuantityIncrease(sudoScource, key) {
			let obj = { ...quantityIncrease };
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
			setAttributes({ quantityIncrease: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityIncreaseSelector
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
		function onRemoveStyleQuantityDecrease(sudoScource, key) {
			let obj = { ...quantityDecrease };
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
			setAttributes({ quantityDecrease: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityDecreaseSelector
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
		function onRemoveStyleViewCart(sudoScource, key) {
			let obj = { ...viewCart };
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
			setAttributes({ viewCart: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				viewCartSelector
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
		function onChangeStyleSku(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, cartBtn);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ cartBtn: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				cartBtnSelector
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
		function onAddStyleSku(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, cartBtn);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ cartBtn: object });
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
		function onChangeStyleQuantityWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, quantityWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ quantityWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityWrapSelector
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
		function onAddStyleQuantityWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, quantityWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ quantityWrap: object });
		}
		function onChangeStyleQuantityInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, quantityInput);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ quantityInput: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityInputSelector
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
		function onAddStyleQuantityInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, quantityInput);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ quantityInput: object });
		}
		function onChangeStyleQuantityIncrease(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, quantityIncrease);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ quantityIncrease: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityIncreaseSelector
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
		function onAddStyleQuantityIncrease(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, quantityIncrease);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ quantityIncrease: object });
		}
		function onChangeStyleQuantityDecrease(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, quantityDecrease);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ quantityDecrease: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				quantityDecreaseSelector
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
		function onAddStyleQuantityDecrease(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, quantityDecrease);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ quantityDecrease: object });
		}
		function onChangeStyleViewCart(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, viewCart);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ viewCart: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				viewCartSelector
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
		function onAddStyleViewCart(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, viewCart);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ viewCart: object });
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
		function onBulkAddViewCart(sudoScource, cssObj) {
			let obj = Object.assign({}, viewCart);
			obj[sudoScource] = cssObj;
			setAttributes({ viewCart: obj });
			var selector = myStore.getElementSelector(sudoScource, viewCartSelector);
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
		function onBulkAddCartBtn(sudoScource, cssObj) {
			let obj = Object.assign({}, cartBtn);
			obj[sudoScource] = cssObj;
			setAttributes({ cartBtn: obj });
			var selector = myStore.getElementSelector(sudoScource, cartBtnSelector);
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
		function onBulkAddQuantityWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, quantityWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ quantityWrap: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				quantityWrapSelector
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
		function onBulkAddQuantityInput(sudoScource, cssObj) {
			let obj = Object.assign({}, quantityInput);
			obj[sudoScource] = cssObj;
			setAttributes({ quantityInput: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				quantityInputSelector
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
		function onBulkAddQuantityIncrease(sudoScource, cssObj) {
			let obj = Object.assign({}, quantityIncrease);
			obj[sudoScource] = cssObj;
			setAttributes({ quantityIncrease: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				quantityIncreaseSelector
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
		function onBulkAddQuantityDecrease(sudoScource, cssObj) {
			let obj = Object.assign({}, quantityDecrease);
			obj[sudoScource] = cssObj;
			setAttributes({ quantityDecrease: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				quantityDecreaseSelector
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
		function onResetViewCart(sudoScources) {
			let obj = Object.assign({}, viewCart);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						viewCartSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ viewCart: obj });
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
		function onResetCartBtn(sudoScources) {
			let obj = Object.assign({}, cartBtn);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						cartBtnSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ cartBtn: obj });
		}
		function onResetQuantityWrap(sudoScources) {
			let obj = Object.assign({}, quantityWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						quantityWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ quantityWrap: obj });
		}
		function onResetQuantityInput(sudoScources) {
			let obj = Object.assign({}, quantityInput);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						quantityInputSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ quantityInput: obj });
		}
		function onResetQuantityIncrease(sudoScources) {
			let obj = Object.assign({}, quantityIncrease);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						quantityIncreaseSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ quantityIncrease: obj });
		}
		function onResetQuantityDecrease(sudoScources) {
			let obj = Object.assign({}, quantityDecrease);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						quantityDecreaseSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ quantityDecrease: obj });
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
		// reset style end
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
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ cartBtn: cartBtn });
			// setAttributes({ wrapper: wrapper });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[cartBtnSelector] = cartBtn;
			blockCssObj[viewCartSelector] = viewCart;
			blockCssObj[quantityWrapSelector] = quantityWrap;
			blockCssObj[quantityIncreaseSelector] = quantityIncrease;
			blockCssObj[quantityDecreaseSelector] = quantityDecrease;
			blockCssObj[quantityInputSelector] = quantityInput;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		var postUrl = currentPostUrl;
		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${cartBtn.options.tag}`;
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
												{ label: "Span", value: "span" },
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
							title={__("Cart Button", "combo-blocks")}
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
											{__("Enable Ajax Cart", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={cartBtn.options.ajax}
											options={[
												{ label: __("True", "combo-blocks"), value: 1 },
												{ label: __("False", "combo-blocks"), value: 0 },
											]}
											onChange={(newVal) => {
												var options = { ...cartBtn.options, ajax: newVal };
												setAttributes({
													cartBtn: { ...cartBtn, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Text", "combo-blocks")}
										</label>
										<InputControl
											value={cartBtn.options.text}
											onChange={(newVal) => {
												var options = {
													...cartBtn.options,
													text: newVal,
												};
												setAttributes({
													cartBtn: { ...cartBtn, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Quantity", "combo-blocks")}
										</label>
										<InputControl
											value={quantityInput.options.quantity}
											onChange={(newVal) => {
												var options = {
													...quantityInput.options,
													quantity: newVal,
												};
												setAttributes({
													quantityInput: { ...quantityInput, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Product Id / Variation ID", "combo-blocks")}
										</label>
										<InputControl
											value={cartBtn.options.productId}
											onChange={(newVal) => {
												var options = { ...cartBtn.options, productId: newVal };
												setAttributes({
													cartBtn: { ...cartBtn, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={cartBtn}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												cartBtn,
												"cartBtn",
												cartBtnSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												cartBtn,
												"cartBtn",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												cartBtn,
												"cartBtn",
												cartBtnSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												cartBtn,
												"cartBtn",
												cartBtnSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												cartBtn,
												"cartBtn",
												cartBtnSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={cartBtn}
										onChange={onPickCssLibrarySku}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Quantity"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Quantity", "combo-blocks")}</span>
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
							<div className="mb-2">
								<ToggleControl
									className="my-4"
									label={__("Show Quantity?", "combo-blocks")}
									help={
										quantityWrap.options.enable
											? __("Quantity enabled", "combo-blocks")
											: __("Quantity disabled.", "combo-blocks")
									}
									checked={quantityWrap.options.enable ? true : false}
									onChange={(e) => {
										var options = {
											...quantityWrap.options,
											enable: quantityWrap.options.enable ? false : true,
										};
										setAttributes({
											quantityWrap: { ...quantityWrap, options: options },
										});
									}}
								/>
							</div>
							<PGtoggle
								className="font-medium text-slate-900 "
								title="Quantity Wrap"
								initialOpen={false}>
								<PGStyles
									obj={quantityWrap}
									onChange={(sudoScource, newVal, attr) => {
										myStore.onChangeStyleElement(
											sudoScource,
											newVal,
											attr,
											quantityWrap,
											"quantityWrap",
											quantityWrapSelector,
											blockCssY,
											setAttributes
										);
									}}
									onAdd={(sudoScource, key) => {
										myStore.onAddStyleElement(
											sudoScource,
											key,
											quantityWrap,
											"quantityWrap",
											setAttributes
										);
									}}
									onRemove={(sudoScource, key) => {
										myStore.onRemoveStyleElement(
											sudoScource,
											key,
											quantityWrap,
											"quantityWrap",
											quantityWrapSelector,
											blockCssY,
											setAttributes
										);
									}}
									onBulkAdd={(sudoScource, cssObj) => {
										myStore.onBulkAddStyleElement(
											sudoScource,
											cssObj,
											quantityWrap,
											"quantityWrap",
											quantityWrapSelector,
											blockCssY,
											setAttributes
										);
									}}
									onReset={(sudoSources) => {
										myStore.onResetElement(
											sudoSources,
											quantityWrap,
											"quantityWrap",
											quantityWrapSelector,
											blockCssY,
											setAttributes
										);
									}}
								/>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Quantity Increase", "combo-blocks")}
								initialOpen={false}>
								<PGStyles
									obj={quantityIncrease}
									onChange={(sudoScource, newVal, attr) => {
										myStore.onChangeStyleElement(
											sudoScource,
											newVal,
											attr,
											quantityIncrease,
											"quantityIncrease",
											quantityIncreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onAdd={(sudoScource, key) => {
										myStore.onAddStyleElement(
											sudoScource,
											key,
											quantityIncrease,
											"quantityIncrease",
											setAttributes
										);
									}}
									onRemove={(sudoScource, key) => {
										myStore.onRemoveStyleElement(
											sudoScource,
											key,
											quantityIncrease,
											"quantityIncrease",
											quantityIncreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onBulkAdd={(sudoScource, cssObj) => {
										myStore.onBulkAddStyleElement(
											sudoScource,
											cssObj,
											quantityIncrease,
											"quantityIncrease",
											quantityIncreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onReset={(sudoSources) => {
										myStore.onResetElement(
											sudoSources,
											quantityIncrease,
											"quantityIncrease",
											quantityIncreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
								/>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Quantity Decrease", "combo-blocks")}
								initialOpen={false}>
								<PGStyles
									obj={quantityDecrease}
									onChange={(sudoScource, newVal, attr) => {
										myStore.onChangeStyleElement(
											sudoScource,
											newVal,
											attr,
											quantityDecrease,
											"quantityDecrease",
											quantityDecreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onAdd={(sudoScource, key) => {
										myStore.onAddStyleElement(
											sudoScource,
											key,
											quantityDecrease,
											"quantityDecrease",
											setAttributes
										);
									}}
									onRemove={(sudoScource, key) => {
										myStore.onRemoveStyleElement(
											sudoScource,
											key,
											quantityDecrease,
											"quantityDecrease",
											quantityDecreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onBulkAdd={(sudoScource, cssObj) => {
										myStore.onBulkAddStyleElement(
											sudoScource,
											cssObj,
											quantityDecrease,
											"quantityDecrease",
											quantityDecreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
									onReset={(sudoSources) => {
										myStore.onResetElement(
											sudoSources,
											quantityDecrease,
											"quantityDecrease",
											quantityDecreaseSelector,
											blockCssY,
											setAttributes
										);
									}}
								/>
								{/* </PGtab>
								</PGtabs> */}
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Quantity Input", "combo-blocks")}
								initialOpen={false}>
								<PGStyles
									obj={quantityInput}
									onChange={(sudoScource, newVal, attr) => {
										myStore.onChangeStyleElement(
											sudoScource,
											newVal,
											attr,
											quantityInput,
											"quantityInput",
											quantityInputSelector,
											blockCssY,
											setAttributes
										);
									}}
									onAdd={(sudoScource, key) => {
										myStore.onAddStyleElement(
											sudoScource,
											key,
											quantityInput,
											"quantityInput",
											setAttributes
										);
									}}
									onRemove={(sudoScource, key) => {
										myStore.onRemoveStyleElement(
											sudoScource,
											key,
											quantityInput,
											"quantityInput",
											quantityInputSelector,
											blockCssY,
											setAttributes
										);
									}}
									onBulkAdd={(sudoScource, cssObj) => {
										myStore.onBulkAddStyleElement(
											sudoScource,
											cssObj,
											quantityInput,
											"quantityInput",
											quantityInputSelector,
											blockCssY,
											setAttributes
										);
									}}
									onReset={(sudoSources) => {
										myStore.onResetElement(
											sudoSources,
											quantityInput,
											"quantityInput",
											quantityInputSelector,
											blockCssY,
											setAttributes
										);
									}}
								/>
							</PGtoggle>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
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
													label: __("Before Cart Text", "combo-blocks"),
													value: "beforeCartText",
												},
												{
													label: __("After Cart Text", "combo-blocks"),
													value: "afterCartText",
												},
												{
													label: __("Before Prefix", "combo-blocks"),
													value: "beforePrefix",
												},
												{ label: "After Prefix", value: "afterPrefix" },
												{
													label: __("Before Postfix", "combo-blocks"),
													value: "beforePostfix",
												},
												{
													label: __("Before Postfix", "combo-blocks"),
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
							title={__("View Cart", "combo-blocks")}
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
										obj={viewCart}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												viewCart,
												"viewCart",
												viewCartSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												viewCart,
												"viewCart",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												viewCart,
												"viewCart",
												viewCartSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												viewCart,
												"viewCart",
												viewCartSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												viewCart,
												"viewCart",
												viewCartSelector,
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
					{quantityInput.options.quantity.length == 0 && (
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
												'<!-- wp:combo-blocks/woo-add-to-cart {"wrapper":{"options":{"tag":"div","class":""},"styles":{"color":[],"backgroundColor":[],"padding":[],"margin":[],"display":{"Desktop":"flex"},"borderRadius":[],"alignItems":{"Desktop":"center"},"flexWrap":{"Tablet":"wrap !important"}}},"viewCart":{"options":{"class":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":"#18978F !important"},"padding":{"Desktop":"10px 10px 10px 10px"},"margin":{"Desktop":""}}},"cartBtn":{"styles":{"display":{"Desktop":"inline-block"},"width":[],"color":{"Desktop":"#ffffff"},"backgroundColor":{"Desktop":"#A084CF"},"padding":{"Desktop":"6px 60px 6px 60px"},"margin":{"Desktop":"10px 10px 10px 10px"},"borderRadius":{"Desktop":"2px 2px 2px 2px"},"textDecoration":{"Desktop":"none #000000 wavy 1px !important"},"fontSize":{"Desktop":"16px"},"fontWeight":{"Desktop":"700"}},"options":{"tag":"div","postId":"","sku":"","text":"Add to cart","class":"","ajax":"1"}},"quantityWrap":{"options":{"enable":true,"class":""},"styles":{"display":{"Desktop":"flex"},"width":[],"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":"undefined undefined undefined undefined"},"margin":[],"border":{"Desktop":"1px solid #e1e1e1"},"borderRadius":{"Desktop":"2px 2px 2px 2px"},"alignItems":{"Desktop":"center"},"borderRight":[],"borderLeft":[],"textAlign":[]}},"quantityInput":{"styles":{"display":[],"width":{"Desktop":"50px"},"color":{"Desktop":""},"backgroundColor":[],"padding":[],"margin":[],"border":{"Desktop":"0px solid #000000"},"textAlign":{"Desktop":"center"},"borderRight":[],"justifyContent":[],"marginRight":[],"marginLeft":[],"fontSize":{"Desktop":"16px"},"fontWeight":{"Desktop":"500"}},"options":{"class":"","quantity":"7"},"focus":{"boxShadow":{"Desktop":"0px 0px 0px 0px #50547d4f"}}},"quantityIncrease":{"options":{"class":""},"styles":{"display":[],"width":[],"color":{"Desktop":"#000000"},"backgroundColor":[],"padding":{"Desktop":"7px 10px 7px 10px"},"margin":[],"borderRadius":[],"cursor":{"Desktop":"pointer"},"borderRight":[],"borderLeft":{"Desktop":"1px solid #e1e1e1"},"fontSize":{"Desktop":"16px"}}},"quantityDecrease":{"options":{"class":""},"styles":{"display":[],"width":[],"color":{"Desktop":"#000000"},"backgroundColor":[],"padding":{"Desktop":"7px 10px 7px 10px"},"margin":[],"borderRadius":[],"cursor":{"Desktop":"pointer"},"borderRight":{"Desktop":"1px solid #e1e1e1"},"fontSize":{"Desktop":"16px"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-cart-arrow-down","position":"beforeCartText","class":"sku-icon"},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":"0px 10px 0px 0px"},"display":[],"fontSize":{"Desktop":""},"lineHeight":[],"fontWeight":{"Desktop":"700"},"textDecoration":[]}},"prefix":{"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""}},"options":{"text":"","class":"prefix"}},"blockId":"pg0f2479c295a6","blockCssY":{"items":{".pg0f2479c295a6":{"display":{"Desktop":"flex"},"align-items":{"Desktop":"center"},"flex-wrap":{"Tablet":"wrap !important"}},".pg0f2479c295a6 .cartBtn":{"display":{"Desktop":"inline-block"},"color":{"Desktop":"#ffffff"},"background-color":{"Desktop":"#A084CF"},"padding":{"Desktop":"6px 60px 6px 60px"},"margin":{"Desktop":"10px 10px 10px 10px"},"border-radius":{"Desktop":"2px 2px 2px 2px"},"text-decoration":{"Desktop":"none #000000 wavy 1px !important"},"font-size":{"Desktop":"16px"},"font-weight":{"Desktop":"700"}},".pg0f2479c295a6 .added_to_cart":{"background-color":{"Desktop":"#18978F !important"},"padding":{"Desktop":"10px 10px 10px 10px"}},".pg0f2479c295a6 .quantity-wrap":{"display":{"Desktop":"flex"},"padding":{"Desktop":"undefined undefined undefined undefined"},"border":{"Desktop":"1px solid #e1e1e1"},"border-radius":{"Desktop":"2px 2px 2px 2px"},"align-items":{"Desktop":"center"}},".pg0f2479c295a6 .quantity-increase":{"color":{"Desktop":"#000000"},"padding":{"Desktop":"7px 10px 7px 10px"},"cursor":{"Desktop":"pointer"},"border-left":{"Desktop":"1px solid #e1e1e1"},"font-size":{"Desktop":"16px"}},".pg0f2479c295a6 .quantity-decrease":{"color":{"Desktop":"#000000"},"padding":{"Desktop":"7px 10px 7px 10px"},"cursor":{"Desktop":"pointer"},"border-right":{"Desktop":"1px solid #e1e1e1"},"font-size":{"Desktop":"16px"}},".pg0f2479c295a6 .quantity-input":{"width":{"Desktop":"50px"},"border":{"Desktop":"0px solid #000000"},"text-align":{"Desktop":"center"},"font-size":{"Desktop":"16px"},"font-weight":{"Desktop":"500"}},".pg0f2479c295a6 .sku-icon":{"margin":{"Desktop":"0px 10px 0px 0px"},"font-weight":{"Desktop":"700"}},".pg0f2479c295a6 .quantity-input:focus":{"box-shadow":{"Desktop":"0px 0px 0px 0px #50547d4f"}}}}} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"woo-add-to-cart"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{quantityInput.options.quantity.length > 0 && (
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
									{quantityWrap.options.enable && (
										<div className="quantity-wrap">
											<span className="quantity-decrease">-</span>
											<input
												className="quantity-input"
												size="3"
												type="text"
												inputMode="numeric"
												value={quantityInput.options.quantity}
											/>
											<span className="quantity-increase">+</span>
										</div>
									)}
									<a
										className="cartBtn"
										onClick={handleLinkClick}
										href="?add-to-cart=1399"
										data-quantity="1"
										data-product_id="1399"
										data-product_sku="woo-polo"
										aria-label="Add “Polo” to your cart"
										aria-describedby=""
										rel="nofollow">
										{icon.options.position == "beforeCartText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
										{postSKUEdited}
										{icon.options.position == "afterCartText" && (
											<span
												className={icon.options.class}
												dangerouslySetInnerHTML={{ __html: iconHtml }}
											/>
										)}
									</a>
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
