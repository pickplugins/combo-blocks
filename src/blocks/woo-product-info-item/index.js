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
import { brush, mediaAndText, settings } from "@wordpress/icons";
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
					d="M85.6845 32.978C85.6845 43.8453 85.6845 54.3782 85.6845 65.2455C72.7273 70.094 59.6866 74.9425 46.395 79.9581C46.395 69.0908 46.395 58.4744 46.395 47.6071C59.3522 42.7586 72.4765 37.9101 85.6845 32.978Z"
					fill="url(#paint0_linear_61_946)"
				/>
				<path
					d="M42.466 47.5235C42.466 58.3908 42.466 68.9237 42.466 79.8746C29.2581 74.9425 16.301 70.094 3.26025 65.2455C3.26025 54.4618 3.26025 43.9289 3.26025 32.978C16.4682 37.9101 29.5089 42.675 42.466 47.5235Z"
					fill="url(#paint1_linear_61_946)"
				/>
				<path
					d="M85.4334 14.8381C71.4731 20.0209 58.098 25.0366 44.4721 30.1358C31.0969 25.2037 17.6382 20.1045 3.51074 14.9216C12.4554 11.5779 20.7312 8.48485 29.0907 5.39185C33.6048 3.71996 38.1189 2.13166 42.633 0.376176C43.887 -0.125392 44.9736 -0.125392 46.2275 0.376176C59.1011 5.14107 72.0583 9.8224 85.4334 14.8381Z"
					fill="url(#paint2_linear_61_946)"
				/>
				<path
					d="M88.9446 17.5967C88.9446 21.0241 88.9446 24.2006 88.9446 27.628C74.9007 32.8109 60.8568 38.0774 46.4785 43.4274C46.4785 40 46.4785 36.907 46.4785 33.3961C60.4388 28.2132 74.6499 22.9467 88.9446 17.5967Z"
					fill="url(#paint3_linear_61_946)"
				/>
				<path
					d="M42.466 43.4274C28.0877 38.0774 14.0439 32.8109 0 27.628C0 24.2842 0 21.1077 0 17.5967C14.2947 22.9467 28.4221 28.1296 42.466 33.3961C42.466 36.7399 42.466 39.9164 42.466 43.4274Z"
					fill="url(#paint4_linear_61_946)"
				/>
				<path
					d="M160 89.4878H0V106.625H160V89.4878Z"
					fill="url(#paint5_linear_61_946)"
				/>
				<path
					d="M160 120.334H0V137.471H160V120.334Z"
					fill="url(#paint6_linear_61_946)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_946"
						x1="46.395"
						y1="56.4681"
						x2="85.6845"
						y2="56.4681"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_946"
						x1="3.26025"
						y1="56.4263"
						x2="42.466"
						y2="56.4263"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_946"
						x1="3.51074"
						y1="15.0679"
						x2="85.4334"
						y2="15.0679"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_946"
						x1="46.4785"
						y1="30.512"
						x2="88.9446"
						y2="30.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_946"
						x1="0"
						y1="30.512"
						x2="42.466"
						y2="30.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_946"
						x1="0"
						y1="98.0562"
						x2="160"
						y2="98.0562"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_946"
						x1="0"
						y1="128.903"
						x2="160"
						y2="128.903"
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
		var field = attributes.field;
		var icon = attributes.icon;
		var postfix = attributes.postfix;
		var prefix = attributes.prefix;
		var itemInfo = attributes.itemInfo;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .item";
		var itemLinkSelector = blockClass + " .item a";
		var iconSelector = blockClass + " .info-icon";
		var prefixSelector = blockClass + " .prefix";
		var postfixSelector = blockClass + " .postfix";
		var parentItemData =
			context["combo-blocks/productInfo"] == undefined
				? null
				: context["combo-blocks/productInfo"];
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
			weight: "20",
			length: "10",
			width: "10",
			height: "10",
			dimensions: "N/A",
			rating_count: 0,
			review_count: 0,
			average_rating: "0",
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
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		const [productData, setproductData] = useState(defaultProductData);
		useEffect(() => {
			if (parentItemData != null) {
				setproductData(parentItemData);
			}
			// else {
			// 	setproductData(defaultProductData);
			// }
		}, [parentItemData]);
		const [loading, setloading] = useState(false);
		let isProFeature = applyFilters("isProFeature", true);
		const CustomTagWrapper =
			wrapper.options?.tag.length != 0 ? `${wrapper.options?.tag}` : "span";
		const CustomTagPostTitle =
			field.options?.tag.length != 0 ? `${field.options?.tag}` : "span";
		var elementsArgsBase = [
			{
				id: "weight",
				label: "Weight",
				prefix: "Weight: ",
				postfix: "",
				value: "10kg",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "length",
				label: "Length",
				prefix: "Length: ",
				postfix: "",
				value: "10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "width",
				label: "Width",
				prefix: "Width: ",
				postfix: "",
				value: "10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "height",
				label: "Height",
				prefix: "Height: ",
				postfix: "",
				value: "10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "dimensions",
				label: "Dimensions",
				prefix: "Dimensions: ",
				postfix: "",
				value: "10cm X 10cm X 10cm",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "attributes",
				label: "Attributes",
				prefix: "Attributes: ",
				postfix: "",
				taxonomy: "",
				maxCount: 3,
				separator: ", ",
				value: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
				isPro: isProFeature ? true : false,
			},
		];
		//let elementsArgs = applyFilters('elementsArgs', elementsArgsBase);
		var [elementsArgs, setelementsArgs] = useState(elementsArgsBase);
		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		useEffect(() => {
			setloading(true);
			apiFetch({
				path: "/combo-blocks/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				if (res.manage_stock != undefined) {
					setproductData(res);
				}
				var attributes = res.attributes != undefined ? res.attributes : {};
				Object.entries(attributes).map((item) => {
					var index = item[0];
					var value = item[1];
					elementsArgs.push({
						id: index,
						label: value.label,
						type: "taxonomy",
						separator: ", ",
						linkTo: "termUrl",
						prefix: value.label + ": ",
						postfix: "",
						value: value.values,
						siteIcon: {
							library: "fontAwesome",
							srcType: "class",
							/*class, html, img, svg */ iconSrc: "",
						},
						options: {},
						styles: {
							color: { Desktop: "" },
							backgroundColor: { Desktop: "" },
							padding: { Desktop: "" },
							margin: { Desktop: "" },
						},
						isPro: isProFeature ? true : false,
					});
				});
				setelementsArgs(elementsArgs);
				setloading(false);
			});
		}, []);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			blockCssObj[iconSelector] = icon;
			// blockCssObj[itemSelector] = items;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		useEffect(() => {
			items.elements.map((x, index) => {
				var styles = x.styles;
				Object.entries(styles).map((y) => {
					var attrId = y[0];
					var attrVal = y[1];
					if (Object.keys(attrVal).length != 0) {
						var attrIdX = "";
						var cssPropty = myStore.cssAttrParse(attrId);
						if (
							blockCssY.items[itemSelector + ".item-" + index + " a"] ==
							undefined
						) {
							blockCssY.items[itemSelector + ".item-" + index + " a"] = {};
							blockCssY.items[itemSelector + ".item-" + index + " a"][
								cssPropty
							] = attrVal;
						} else {
							blockCssY.items[itemSelector + ".item-" + index + " a"][
								cssPropty
							] = attrVal;
						}
						if (blockCssY.items[itemSelector + ".item-" + index] == undefined) {
							blockCssY.items[itemSelector + ".item-" + index] = {};
							blockCssY.items[itemSelector + ".item-" + index][cssPropty] =
								attrVal;
						} else {
							blockCssY.items[itemSelector + ".item-" + index][cssPropty] =
								attrVal;
						}
						setAttributes({ blockCssY: { items: blockCssY.items } });
					}
				});
			});
			setTimeout((x) => {
				//setAttributes({ blockCssY: { items: newValuesObjX } });
			}, 2000);
		}, [items]);
		//let elementsArgs = elementsArgsBase
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
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var itemInfoX = attributes.itemInfo;
				var itemsX = attributes.items;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemSelector] = itemsY;
				}
				if (itemInfoX != undefined) {
					var itemInfoY = { ...itemInfoX, options: itemInfo.options };
					setAttributes({ itemInfo: itemInfoY });
					blockCssObj[itemInfoSelector] = itemInfoY;
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
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				var blockCssRules = myStore.getBlockCssRules(blockCssObj);
				var itemsXYZ = blockCssRules;
				setAttributes({ blockCssY: { items: itemsXYZ } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}
		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
			var elementsX = items.elements.push(option);
			setAttributes({ items: { ...items, elements: items.elements } });
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
		function onRemoveStyleItems(sudoScource, key) {
			let obj = { ...field };
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
			setAttributes({ field: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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

		function onResetItem(sudoSources) {
			let obj = Object.assign({}, field);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ field: obj });
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
		function onChangeStyleItems(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, field);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ field: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
		function onAddStyleItems(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
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
		function onBulkAddItems(sudoScource, cssObj) {
			let obj = Object.assign({}, field);
			obj[sudoScource] = cssObj;
			setAttributes({ field: obj });
			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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
		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var itemsX = { ...items };
			itemsX.elements[index] = object;
			setAttributes({ items: itemsX });
			//setAttributes({ obj: object });
			// var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
			// var cssPropty = myStore.cssAttrParse(attr);
			// let itemsX = Object.assign({}, blockCssY.items);
			// if (itemsX[elementSelector] == undefined) {
			//   itemsX[elementSelector] = {};
			// }
			// var cssPath = [elementSelector, cssPropty, breakPointX]
			// const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal)
			// setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var itemsX = { ...items };
			itemsX.elements[index] = object;
			setAttributes({ items: itemsX });
			//setAttributes({ items: object });
			// var elementSelector = myStore.getElementSelector(sudoScource, itemSelector);
			// var cssPropty = myStore.cssAttrParse(key);
			// var cssObject = myStore.deletePropertyDeep(blockCssY.items, [elementSelector, cssPropty, breakPointX]);
			// setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");
			var itemsX = { ...items };
			itemsX.elements[index] = object;
			//setAttributes({ items: object });
			setAttributes({ items: itemsX });
		}
		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;
			setAttributes({ items: obj });
			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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
		function onResetItems(sudoScources) {
			let obj = Object.assign({}, field);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ field: obj });
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
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options?.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-product-info-item`,
		});
		// const innerBlocksProps = useInnerBlocksProps(blockProps, {
		// 	allowedBlocks: ALLOWED_BLOCKS,
		// 	template: MY_TEMPLATE,
		// 	orientation: "horizontal",
		// 	templateInsertUpdatesSelection: true,
		// 	//renderAppender: InnerBlocks.ButtonBlockAppender
		// });
		// objectTypes;
		var wooProductInfoItemObjectTypesBasic = {
			// text: { label: __("Choose","combo-blocks"), value: "text" },
			weight: { label: "Weight", value: "weight" },
			length: { label: "Length", value: "length" },
			width: { label: "Width", value: "width" },
			height: { label: "Height", value: "height" },
			dimensions: { label: "Dimensions", value: "dimensions", isPro: true },
			taxonomy: {
				label: __("Taxonomy", "combo-blocks"),
				value: "taxonomy",
				isPro: true,
			},
			meta: { label: "Custom Meta", value: "meta", isPro: true },
		};
		let objectTypes = applyFilters(
			"comboBlocksWooProductInfoItemObjectTypes",
			wooProductInfoItemObjectTypesBasic
		);
		const [meta, setMeta] = useState("");
		useEffect(() => {
			if (field.options?.customMeta.length != 0) {
				// setLoading(true);
				apiFetch({
					path: "/combo-blocks/v2/get_post_meta",
					method: "POST",
					data: {
						postId: postId,
						meta_key: field.options.customMeta,
						type: "string",
						template: "",
					},
				}).then((res) => {
					var metaKeyType =
						field.options.metaType != undefined ? field.options.metaType : "ID";
					if (metaKeyType == "ID") {
						setMeta(res.meta_value);
					} else {
						//setPostImage(res)
						// setMeta({
						// 	media_details: { sizes: {} },
						// 	guid: { rendered: res.meta_value },
						// });
						setMeta(res.meta_value);
					}
					// setLoading(false);
				});
			}
		}, [field.options?.customMeta, field.options?.metaType]);
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="px-3 py-3">
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Product Info Field", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={objectTypes}
									buttonTitle={
										objectTypes[field.options?.fieldValue] == undefined
											? __("Choose", "combo-blocks")
											: objectTypes[field.options?.fieldValue].label
									}
									onChange={(option) => {
										var options = {
											...field.options,
											fieldValue: option.value,
										};
										setAttributes({
											field: { styles: field.styles, options: options },
										});
									}}
									values=""
									className="font-medium text-slate-900 "></PGDropdown>
							</PanelRow>
							{field.options.fieldValue == "meta" && (
								<>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Field Key", "combo-blocks")}
										</label>
										<InputControl
											className="mr-2"
											value={field.options?.customMeta}
											onChange={(newVal) => {
												var options = {
													...field.options,
													customMeta: newVal,
												};
												setAttributes({
													field: { ...field, options: options },
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options?.tag}
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
												{ label: "UL", value: "ul" },
												{ label: "OL", value: "ol" },
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
							title={__("Product Info Item", "combo-blocks")}
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
											label="CSS Class"
											placeholder="Add Class"
											value={field.options?.class}
											onChange={(newVal) => {
												var options = { ...field.options, class: newVal };
												setAttributes({
													field: {
														styles: field.styles,
														options: options,
													},
												});
											}}
										/>
									</div>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={field.options?.tag}
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
												var options = { ...field.options, tag: newVal };
												setAttributes({
													field: { ...field, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={field}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												field,
												"field",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												field,
												"field",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												field,
												"field",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												field,
												"field",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												field,
												"field",
												itemSelector,
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
											library={icon.options?.library}
											srcType={icon.options?.srcType}
											iconSrc={icon.options?.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Icon position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={icon.options?.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
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
											value={prefix.options?.text}
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
											value={prefix.options?.position}
											options={[
												{ label: __("None", "combo-blocks"), value: "none" },
												{
													label: __("Before Post Title Text", "combo-blocks"),
													value: "beforebegin",
												},
												{
													label: __("Start of Post Title", "combo-blocks"),
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
											value={postfix.options?.text}
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
											value={postfix.options?.position}
											options={[
												{ label: __("None", "combo-blocks"), value: "none" },
												{
													label: __("After Post Title Text", "combo-blocks"),
													value: "afterend",
												},
												{
													label: __("End of Post Title", "combo-blocks"),
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
				<CustomTagWrapper {...blockProps}>
					{/* <CustomTagWrapper {...blockProps}> */}
					{icon.options?.position == "beforePrefix" &&
						icon.options?.iconSrc.length > 0 && (
							<span
								className={icon.options?.class}
								dangerouslySetInnerHTML={{ __html: iconHtml }}
							/>
						)}
					{prefix.options?.text && (
						<span className={prefix.options?.class}>
							{prefix.options?.text}
						</span>
					)}
					{icon.options?.position == "afterPrefix" &&
						icon.options?.iconSrc.length > 0 && (
							<span
								className={icon.options?.class}
								dangerouslySetInnerHTML={{ __html: iconHtml }}
							/>
						)}
					<CustomTagPostTitle className="item">
						{field.options?.fieldValue == "weight" && (
							<>{productData.weight}kg</>
						)}
						{field.options?.fieldValue == "length" && (
							<>{productData.length}cm</>
						)}
						{field.options?.fieldValue == "width" && <>{productData.width}cm</>}
						{field.options?.fieldValue == "height" && (
							<>{productData.height}cm</>
						)}
						{field.options?.fieldValue == "dimensions" && (
							<span
								className="value"
								dangerouslySetInnerHTML={{
									__html: productData.dimensions,
								}}
							/>
						)}
						{field.options?.fieldValue == "taxonomy" && (
							<span
								className="value"
								dangerouslySetInnerHTML={{ __html: productData.value }}
							/>
						)}
						{field.options?.fieldValue == "meta" && (
							<span className="value">{meta}</span>
						)}
					</CustomTagPostTitle>
					{icon.options?.position == "beforePostfix" &&
						icon.options?.iconSrc.length > 0 && (
							<span
								className={icon.options?.class}
								dangerouslySetInnerHTML={{ __html: iconHtml }}
							/>
						)}
					{postfix.options?.text && (
						<span className={postfix.options?.class}>
							{postfix.options?.text}
						</span>
					)}
					{icon.options?.position == "afterPostfix" &&
						icon.options?.iconSrc.length > 0 && (
							<span
								className={icon.options?.class}
								dangerouslySetInnerHTML={{ __html: iconHtml }}
							/>
						)}
				</CustomTagWrapper>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
