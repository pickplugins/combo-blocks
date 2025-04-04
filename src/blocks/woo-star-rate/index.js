import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings, styles } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGRadioControl from "../../components/radio-control";
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
					d="M85.6845 43.978C85.6845 54.8453 85.6845 65.3782 85.6845 76.2455C72.7273 81.094 59.6866 85.9425 46.395 90.9581C46.395 80.0908 46.395 69.4744 46.395 58.6071C59.3522 53.7586 72.4765 48.9101 85.6845 43.978Z"
					fill="url(#paint0_linear_61_949)"
				/>
				<path
					d="M42.466 58.5235C42.466 69.3908 42.466 79.9237 42.466 90.8746C29.2581 85.9425 16.301 81.094 3.26025 76.2455C3.26025 65.4618 3.26025 54.9289 3.26025 43.978C16.4682 48.9101 29.5089 53.675 42.466 58.5235Z"
					fill="url(#paint1_linear_61_949)"
				/>
				<path
					d="M85.4334 25.8381C71.4731 31.0209 58.098 36.0366 44.4721 41.1358C31.0969 36.2037 17.6382 31.1045 3.51074 25.9216C12.4554 22.5779 20.7312 19.4848 29.0907 16.3918C33.6048 14.72 38.1189 13.1317 42.633 11.3762C43.887 10.8746 44.9736 10.8746 46.2275 11.3762C59.1011 16.1411 72.0583 20.8224 85.4334 25.8381Z"
					fill="url(#paint2_linear_61_949)"
				/>
				<path
					d="M88.9446 28.5967C88.9446 32.0241 88.9446 35.2006 88.9446 38.628C74.9007 43.8109 60.8568 49.0774 46.4785 54.4274C46.4785 51 46.4785 47.907 46.4785 44.3961C60.4388 39.2132 74.6499 33.9467 88.9446 28.5967Z"
					fill="url(#paint3_linear_61_949)"
				/>
				<path
					d="M42.466 54.4274C28.0877 49.0774 14.0439 43.8109 0 38.628C0 35.2842 0 32.1077 0 28.5967C14.2947 33.9467 28.4221 39.1296 42.466 44.3961C42.466 47.7399 42.466 50.9164 42.466 54.4274Z"
					fill="url(#paint4_linear_61_949)"
				/>
				<path
					d="M160 100.488H0V117.625H160V100.488Z"
					fill="url(#paint5_linear_61_949)"
				/>
				<path
					d="M160 131.334H0V148.471H160V131.334Z"
					fill="url(#paint6_linear_61_949)"
				/>
				<path
					d="M101.557 54.2881L96.5895 56.9114C96.041 57.2017 95.4097 56.7351 95.5132 56.1337L96.4653 50.5863C96.5067 50.3479 96.4239 50.099 96.248 49.9331L92.2221 46.0033C91.7874 45.5781 92.0254 44.8212 92.636 44.7383L98.1936 43.9295C98.4317 43.8984 98.6387 43.7428 98.7525 43.5251L101.236 38.4754C101.505 37.9258 102.292 37.9258 102.561 38.4754L105.045 43.5251C105.148 43.7428 105.366 43.8984 105.604 43.9295L111.161 44.7383C111.772 44.8316 112.01 45.5781 111.575 46.0033L107.549 49.9331C107.374 50.099 107.291 50.3479 107.332 50.5863L108.284 56.1337C108.388 56.7351 107.756 57.2017 107.208 56.9114L102.24 54.2881C102.033 54.174 101.775 54.174 101.557 54.2881Z"
					fill="#C15940"
				/>
				<path
					d="M125.658 54.2881L120.691 56.9114C120.142 57.2017 119.511 56.7351 119.614 56.1337L120.566 50.5863C120.608 50.3479 120.525 50.099 120.349 49.9331L116.323 46.0033C115.888 45.5781 116.126 44.8212 116.737 44.7383L122.295 43.9295C122.533 43.8984 122.74 43.7428 122.854 43.5251L125.337 38.4754C125.607 37.9258 126.393 37.9258 126.662 38.4754L129.146 43.5251C129.25 43.7428 129.467 43.8984 129.705 43.9295L135.263 44.7383C135.873 44.8316 136.111 45.5781 135.676 46.0033L131.651 49.9331C131.475 50.099 131.392 50.3479 131.433 50.5863L132.385 56.1337C132.489 56.7351 131.858 57.2017 131.309 56.9114L126.341 54.2881C126.134 54.174 125.876 54.174 125.658 54.2881Z"
					fill="#C15940"
				/>
				<path
					d="M149.76 54.2881L144.792 56.9114C144.244 57.2017 143.612 56.7351 143.716 56.1337L144.668 50.5863C144.709 50.3479 144.627 50.099 144.451 49.9331L140.425 46.0033C139.99 45.5781 140.228 44.8212 140.839 44.7383L146.396 43.9295C146.634 43.8984 146.841 43.7428 146.955 43.5251L149.439 38.4754C149.708 37.9258 150.495 37.9258 150.764 38.4754L153.248 43.5251C153.351 43.7428 153.568 43.8984 153.806 43.9295L159.364 44.7383C159.975 44.8316 160.213 45.5781 159.778 46.0033L155.752 49.9331C155.576 50.099 155.493 50.3479 155.535 50.5863L156.487 56.1337C156.59 56.7351 155.959 57.2017 155.411 56.9114L150.443 54.2881C150.236 54.174 149.977 54.174 149.76 54.2881Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_949"
						x1="46.395"
						y1="67.4681"
						x2="85.6845"
						y2="67.4681"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_949"
						x1="3.26025"
						y1="67.4263"
						x2="42.466"
						y2="67.4263"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_949"
						x1="3.51074"
						y1="26.0679"
						x2="85.4334"
						y2="26.0679"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_949"
						x1="46.4785"
						y1="41.512"
						x2="88.9446"
						y2="41.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_949"
						x1="0"
						y1="41.512"
						x2="42.466"
						y2="41.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_949"
						x1="0"
						y1="109.056"
						x2="160"
						y2="109.056"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_949"
						x1="0"
						y1="139.903"
						x2="160"
						y2="139.903"
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
		var iconsWrap = attributes.iconsWrap;
		var iconsIdle = attributes.iconsIdle;
		var iconsFilled = attributes.iconsFilled;
		var summary = attributes.summary;
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
		const [isVisible, setIsVisible] = useState(false);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconsWrapSelector = blockClass + " .icons-wrap";
		const iconsFilledSelector = blockClass + " .icons-filled";
		const iconsIdleSelector = blockClass + " .icons-idle";
		const summarySelector = blockClass + " .summary";
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		var str = "bat, ball, cat";
		var wooStarRateRadioOptionsBasic = {
			pgNone: { label: __("None", "combo-blocks"), value: "" },
			pg01: {
				label: __("123 customer reviews", "combo-blocks"),
				value: "{review_count} customer reviews",
			},
			pg02: {
				label: __("4.50/5.00", "combo-blocks"),
				value: "{average_rating}/5.00",
				isPro: true,
			},
			pg03: {
				label: __("4.50 out of 5.00", "combo-blocks"),
				value: "{average_rating} out of 5.00",
				isPro: true,
			},
			pg04: {
				label: __("4.50(123 reviews)", "combo-blocks"),
				value: "{average_rating}({review_count} reviews)",
				isPro: true,
			},
			pg05: {
				label: __("Custom", "combo-blocks"),
				value: "custom",
				isPro: true,
			},
		};
		let radioOptions = applyFilters(
			"comboBlocksWooStarRateRadioOptions",
			wooStarRateRadioOptionsBasic
		);
		function setRadioOptions(option, index) {
			var options = {
				...summary.options,
				type: option.value,
			};
			setAttributes({
				summary: { ...summary, options: options },
			});
		}
		var map = {
			"{rating_count}": "",
			"{review_count}": "",
			"{average_rating}": "",
			"{product_title}": "",
		};
		var defaultProductData = {
			ID: 1409,
			post_title: "Beanie with Logo",
			total_sales: 0,
			type: "simple",
			sku: "Woo-beanie-logo",
			manage_stock: true,
			stock_quantity: 5,
			stock_status: "instock",
			backorders: "no",
			weight: "",
			length: "",
			width: "",
			height: "",
			dimensions: "N/A",
			rating_count: 2,
			review_count: 2,
			average_rating: "4.25",
			on_sale: false,
			gallery_image_ids: [],
			currency: "USD",
			currency_symbol: "&#36;",
			currency_pos: "left",
			attributes: {
				pa_color: {
					label: "Color",
					values: "Red",
				},
			},
			regular_price: "20",
			sale_price: "",
			date_on_sale_from: null,
			date_on_sale_to: null,
			price: "20",
		};
		const [productData, setproductData] = useState(defaultProductData);
		const [loading, setloading] = useState(false);
		const [ratingMap, setratingMap] = useState(map);
		const CustomWrapperTag =
			wrapper.options.tag.length != 0 ? `${wrapper.options.tag}` : "div";
		useEffect(() => {
			if (!liveMode) return;

			setloading(true);
			apiFetch({
				path: "/combo-blocks/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				if (res.manage_stock != undefined) {
					setproductData(res);
				}
				var map = {
					"{rating_count}": productData.rating_count,
					"{review_count}": productData.review_count,
					"{average_rating}": productData.average_rating,
					"{product_title}": productData.post_title,
				};
				setratingMap(map);
				setloading(false);
			});
		}, [productData]);
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
				var summaryX = attributes.summary;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var iconsWrapX = attributes.iconsWrap;
				var iconsIdleX = attributes.iconsIdle;
				var iconsFilledX = attributes.iconsFilled;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (iconsFilledX != undefined) {
					var iconsFilledY = { ...iconsFilledX, options: iconsFilled.options };
					setAttributes({ iconsFilled: iconsFilledY });
					blockCssObj[iconsFilledSelector] = iconsFilledY;
				}
				if (iconsIdleX != undefined) {
					var iconsIdleY = { ...iconsIdleX, options: iconsIdle.options };
					setAttributes({ iconsIdle: iconsIdleY });
					blockCssObj[iconsIdleSelector] = iconsIdleY;
				}
				if (iconsWrapX != undefined) {
					var iconsWrapY = { ...iconsWrapX, options: iconsWrap.options };
					setAttributes({ iconsWrap: iconsWrapY });
					blockCssObj[iconsWrapSelector] = iconsWrapY;
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
				if (summaryX != undefined) {
					var summaryY = { ...summaryX, options: summary.options };
					setAttributes({ summary: summaryY });
					blockCssObj[summarySelector] = summaryY;
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
				...iconsWrap.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ iconsWrap: { ...iconsWrap, options: options } });
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
		function onPickCssLibraryiconsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				iconsWrap[sudoScource] = sudoScourceArgs;
			});
			var iconX = Object.assign({}, iconsWrap);
			setAttributes({ iconsWrap: iconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconsWrapSelector
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
		function onRemoveStyleIconsWrap(sudoScource, key) {
			let obj = { ...iconsWrap };
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
			setAttributes({ iconsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsWrapSelector
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
		function onRemoveStyleIconsIdle(sudoScource, key) {
			let obj = { ...iconsIdle };
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
			setAttributes({ iconsIdle: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsIdleSelector
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
		function onRemoveStyleIconsFilled(sudoScource, key) {
			let obj = { ...iconsFilled };
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
			setAttributes({ iconsFilled: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
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
		function onRemoveStyleSummary(sudoScource, key) {
			let obj = { ...summary };
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
			setAttributes({ summary: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summarySelector
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
		function onChangeStyleIconsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ iconsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsWrapSelector
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
		function onAddStyleIconsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsWrap: object });
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
		//
		function onChangeStyleIconsIdle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsIdle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ iconsIdle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsIdleSelector
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
		function onAddStyleIconsIdle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsIdle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsIdle: object });
		}

		function onChangeStyleIconsFilled(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconsFilled);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ iconsFilled: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
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
		function onAddStyleIconsFilled(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconsFilled);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconsFilled: object });
		}

		function onChangeStyleSummary(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, summary);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ summary: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				summarySelector
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
		function onAddStyleSummary(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, summary);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ summary: object });
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
		function onBulkAddSummary(sudoScource, cssObj) {
			let obj = Object.assign({}, summary);
			obj[sudoScource] = cssObj;
			setAttributes({ summary: obj });
			var selector = myStore.getElementSelector(sudoScource, summarySelector);
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
		function onResetSummary(sudoScources) {
			let obj = Object.assign({}, summary);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						summarySelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ summary: obj });
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
		function onBulkAddIconsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, iconsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ iconsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, iconsWrapSelector);
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
		function onResetIconsWrap(sudoScources) {
			let obj = Object.assign({}, iconsWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ iconsWrap: obj });
		}
		function onBulkAddIconsIdle(sudoScource, cssObj) {
			let obj = Object.assign({}, iconsIdle);
			obj[sudoScource] = cssObj;
			setAttributes({ iconsIdle: obj });
			var selector = myStore.getElementSelector(sudoScource, iconsIdleSelector);
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
		function onResetIconsIdle(sudoScources) {
			let obj = Object.assign({}, iconsIdle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconsIdleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ iconsIdle: obj });
		}
		function onBulkAddIconsFilled(sudoScource, cssObj) {
			let obj = Object.assign({}, iconsFilled);
			obj[sudoScource] = cssObj;
			setAttributes({ iconsFilled: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				iconsFilledSelector
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
		function onResetIconsFilled(sudoScources) {
			let obj = Object.assign({}, iconsFilled);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconsFilledSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ iconsFilled: obj });
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
			var iconSrc = iconsWrap.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [iconsWrap]);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		// // Wrapper CSS Class Selectors
		// const wrapperSelector = blockClass;
		// const prefixSelector = blockClass + " .prefix";
		// const postfixSelector = blockClass + " .postfix";
		// const iconsWrapSelector = blockClass + " .icons-wrap";
		// const iconsFilledSelector = blockClass + " .icons-filled";
		// const iconsIdleSelector = blockClass + " .icons-idle";
		// const summarySelector = blockClass + " .summary";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[iconsWrapSelector] = iconsWrap;
			blockCssObj[iconsFilledSelector] = iconsFilled;
			blockCssObj[iconsIdleSelector] = iconsIdle;
			blockCssObj[summarySelector] = summary;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			onChangeStyleIconsFilled(
				"styles",
				parseFloat(productData.average_rating) * 20 + "%",
				"width"
			);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			onChangeStyleIconsFilled(
				"styles",
				parseFloat(productData.average_rating) * 20 + "%",
				"width"
			);
		}, [productData]);
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
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		function replaceAll(str, correction) {
			Object.keys(correction).forEach((key) => {
				str = str.replaceAll(key, correction[key]);
			});
			return str;
		}
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-star-rate`,
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
							title={__("Icons", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Icons Wrap", "combo-blocks")}
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
									<PGtab name="options">
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Choose Icon", "combo-blocks")}
											</label>
											<PGIconPicker
												library={iconsWrap.options.library}
												srcType={iconsWrap.options.srcType}
												iconSrc={iconsWrap.options.iconSrc}
												isPro={isProFeature}
												onChange={onChangeIcon}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={iconsWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													iconsWrap,
													"iconsWrap",
													iconsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													iconsWrap,
													"iconsWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													iconsWrap,
													"iconsWrap",
													iconsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													iconsWrap,
													"iconsWrap",
													iconsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													iconsWrap,
													"iconsWrap",
													iconsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={iconsWrap}
											onChange={onPickCssLibraryiconsWrap}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Icons Idle", "combo-blocks")}
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => { }}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={iconsIdle}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													iconsIdle,
													"iconsIdle",
													iconsIdleSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													iconsIdle,
													"iconsIdle",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													iconsIdle,
													"iconsIdle",
													iconsIdleSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													iconsIdle,
													"iconsIdle",
													iconsIdleSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													iconsIdle,
													"iconsIdle",
													iconsIdleSelector,
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
								title={__("Icons Filled", "combo-blocks")}
								initialOpen={false}>
								<PGtabs
									activeTab="options"
									orientation="horizontal"
									activeClass="active-tab"
									onSelect={(tabName) => { }}
									tabs={[
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
									<PGtab name="styles">
										<PGStyles
											obj={iconsFilled}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													iconsFilled,
													"iconsFilled",
													iconsFilledSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													iconsFilled,
													"iconsFilled",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													iconsFilled,
													"iconsFilled",
													iconsFilledSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													iconsFilled,
													"iconsFilled",
													iconsFilledSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													iconsFilled,
													"iconsFilled",
													iconsFilledSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
									<PGtab name="css"></PGtab>
								</PGtabs>
							</PGtoggle>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Summary", "combo-blocks")}
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
									<PGRadioControl
										selected={summary.options.type}
										options={radioOptions}
										label="Summary Type"
										name={blockClass}
										onChange={setRadioOptions}
									/>
									{summary.options.type == "custom" && (
										<>
											<div className="my-3 relative">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Summary", "combo-blocks")}{" "}
												</label>
												<InputControl
													value={summary.options.typeCustom}
													placeholder="{average_rating} out of 5.00"
													onClick={() => {
														if (isProFeature) {
															setIsVisible(!isVisible);
														}
													}}
													disabled={isProFeature ? true : false}
													onChange={(newVal) => {
														var options = {
															...summary.options,
															typeCustom: newVal,
														};
														setAttributes({
															summary: { ...summary, options: options },
														});
													}}
												/>
												{isProFeature && isVisible && (
													<a
														href="https://comboblocks.com/pricing/"
														target="_blank"
														className="absolute bottom-2 right-0 bg-gray-700 text-white hover:text-white no-underline px-2 rounded-sm py-1 ">
														{__("Subscribe to use", "combo-blocks")}
													</a>
													// </div>
												)}
											</div>
											<p>{__("Please use following tags:", "combo-blocks")}</p>
											<ul>
												<li>
													<code>{"{rating_count}"}</code>
												</li>
												<li>
													<code>{"{review_count}"}</code>
												</li>
												<li>
													<code>{"{average_rating}"}</code>
												</li>
												<li>
													<code>{"{product_title}"}</code>
												</li>
											</ul>
										</>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={summary}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												summary,
												"summary",
												summarySelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												summary,
												"summary",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												summary,
												"summary",
												summarySelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												summary,
												"summary",
												summarySelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												summary,
												"summary",
												summarySelector,
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
					{!iconsWrap.options.iconSrc && (
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
												'<!-- wp:combo-blocks/woo-star-rate {"wrapper":{"options":{"tag":"div","class":"pg-woo-star-rate"},"styles":{"display":{"Desktop":"flex"},"alignItems":[],"gap":{"Desktop":"0px"},"flexWrap":{"Tablet":"wrap !important"},"border":[]}},"iconsWrap":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"fas fa-star","position":"beforeSku","class":""},"styles":{"position":[],"display":[],"fontSize":{"Desktop":"30px"},"fontWeight":{"Desktop":"700"},"backgroundColor":[],"padding":{"Desktop":"10px 10px 10px 10px"},"borderRadius":{"Desktop":"10px 0px 0px 10px"},"border":{"Desktop":"3px solid #f59e0b"},"borderRight":{"Desktop":"0px solid #000000"}}},"iconsIdle":{"options":{"tag":"div","class":""},"styles":{"color":{"Desktop":"#f2f1d7"},"display":{"Desktop":"flex"},"border":[],"backgroundColor":[],"padding":[],"borderRadius":[],"position":{"Desktop":"relative"}}},"iconsFilled":{"options":{"tag":"div","class":""},"styles":{"color":{"Desktop":"#f59e0b"},"display":{"Desktop":"flex"},"position":{"Desktop":"absolute"},"overflow":{"Desktop":"hidden"},"top":{"Desktop":"0px"},"left":{"Desktop":"0px"},"width":{"Desktop":"85%","Tablet":"85%"},"borderTop":[],"border":[],"padding":[]}},"summary":{"options":{"type":"{average_rating}/5.00","typeCustom":"","linkTo":"reviews","class":""},"styles":{"color":{"Desktop":"#000000"},"fontSize":{"Desktop":"18px"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"500"},"lineHeight":{"Desktop":"49px"},"backgroundColor":[],"paddingTop":[],"padding":{"Desktop":"10px 10px 10px 10px"},"borderRadius":{"Desktop":"0px 10px 10px 0px"},"border":{"Desktop":"3px solid #f59e0b"},"borderLeft":{"Desktop":"0px solid #000000"}}},"blockId":"pg713736551ee8","blockCssY":{"items":{".pg713736551ee8":{"display":{"Desktop":"flex"},"gap":{"Desktop":"0px"},"flex-wrap":{"Tablet":"wrap !important"}},".pg713736551ee8 .icons-wrap":{"font-size":{"Desktop":"30px"},"font-weight":{"Desktop":"700"},"padding":{"Desktop":"10px 10px 10px 10px"},"border-radius":{"Desktop":"10px 0px 0px 10px"},"border":{"Desktop":"3px solid #f59e0b"},"border-right":{"Desktop":"0px solid #000000"}},".pg713736551ee8 .icons-filled":{"color":{"Desktop":"#f59e0b"},"display":{"Desktop":"flex"},"position":{"Desktop":"absolute"},"overflow":{"Desktop":"hidden"},"top":{"Desktop":"0px"},"left":{"Desktop":"0px"},"width":{"Desktop":"85%","Tablet":"85%"}},".pg713736551ee8 .icons-idle":{"color":{"Desktop":"#f2f1d7"},"display":{"Desktop":"flex"},"position":{"Desktop":"relative"}},".pg713736551ee8 .summary":{"color":{"Desktop":"#000000"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"500"},"padding":{"Desktop":"10px 10px 10px 10px"},"border-radius":{"Desktop":"0px 10px 10px 0px"},"border":{"Desktop":"3px solid #f59e0b"},"border-left":{"Desktop":"0px solid #000000"},"line-height":{"Desktop":"49px"}}}}} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"woo-star-rate"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{iconsWrap.options.iconSrc && (
						<CustomWrapperTag {...blockProps}>
							{prefix.options.text && (
								<span className={prefix.options.class}>{prefixText}</span>
							)}
							<div className="icons-wrap">
								<div className="icons-idle">
									<span
										className={iconsWrap.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={iconsWrap.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={iconsWrap.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={iconsWrap.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									<span
										className={iconsWrap.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
									{/* dsfsdfsd f */}
									<div className="icons-filled">
										<span
											className={iconsWrap.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											className={iconsWrap.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											className={iconsWrap.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											className={iconsWrap.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
										<span
											className={iconsWrap.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									</div>
								</div>
							</div>
							<div className="summary">
								{summary.options.type !== "custom" &&
									summary.options.type !== null && (
										<>{replaceAll(summary.options.type, ratingMap)}</>
									)}
								{summary.options.type == "custom" &&
									summary.options.typeCustom.length > 0 && (
										<>{replaceAll(summary.options.typeCustom, ratingMap)}</>
									)}
							</div>
							{postfix.options.text && (
								<span className={postfix.options.class}>{postfixText}</span>
							)}
						</CustomWrapperTag>
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
