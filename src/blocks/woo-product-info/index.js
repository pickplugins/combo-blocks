import apiFetch from "@wordpress/api-fetch";
import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, settings } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
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
		var icon = attributes.icon;
		var postfix = attributes.postfix;
		var prefix = attributes.prefix;
		var itemInfo = attributes.itemInfo;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .pg-woo-product-info-item";
		var itemLinkSelector = blockClass + " .item a";
		var iconSelector = blockClass + " .item .icon";
		var prefixSelector = blockClass + " .item .prefix";
		var postfixSelector = blockClass + " .item .postfix";
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
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		const [productData, setproductData] = useState(defaultProductData);
		const [loading, setloading] = useState(false);
		let isProFeature = applyFilters("isProFeature", true);
		const CustomTagWrapper = `${wrapper.options.tag}`;
		const CustomTagPostTitle =
			items.options?.tag.length != 0 ? `${items.options.tag}` : "div";
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
			if (!liveMode) return;

			setloading(true);
			apiFetch({
				path: "/combo-blocks/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				if (res.manage_stock != undefined) {
					setproductData(res);
					var optionsX = { ...itemInfo.options, productData: res };
					setAttributes({ itemInfo: { ...itemInfo, options: optionsX } });
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
			blockCssObj[itemSelector] = items;
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
			let obj = Object.assign({}, items);
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
			setAttributes({ items: obj });
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
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ items: object });
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
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-woo-product-info`,
		});
		const ALLOWED_BLOCKS = [
			"combo-blocks/woo-product-info-item",
			"combo-blocks/layers",
		];
		const MY_TEMPLATE = [];
		const elementsToAdd = items.elements.length;
		// for (let i = 0; i < elementsToAdd; i++) {
		// 	var metakey = items.elements[i].id;
		// 	MY_TEMPLATE.push([
		// 		"combo-blocks/woo-product-info-item",
		// 		{
		// 			wrapper: {
		// 				options: {
		// 					tag: "span",
		// 					class: "pg-woo-product-info-item",
		// 				},
		// 				styles: {
		// 					color: {
		// 						Desktop: "",
		// 					},
		// 					backgroundColor: {
		// 						Desktop: "",
		// 					},
		// 					padding: {
		// 						Desktop: "",
		// 					},
		// 					margin: {
		// 						Desktop: "",
		// 					},
		// 				},
		// 			},
		// 			field: {
		// 				options: {
		// 					class: "item",
		// 					tag: "span",
		// 					limitBy: "",
		// 					limitCount: 99,
		// 					isLink: true,
		// 					linkTo: "postUrl",
		// 					linkToAuthorMeta: "",
		// 					linkToCustomMeta: "",
		// 					customMeta: "",
		// 					metaType: "string",
		// 					linkTarget: "_blank",
		// 					linkAttr: [],
		// 					fieldValue: metakey,
		// 					customUrl: "",
		// 				},
		// 				styles: {
		// 					color: {
		// 						Desktop: "",
		// 					},
		// 					backgroundColor: {
		// 						Desktop: "",
		// 					},
		// 					padding: {
		// 						Desktop: "",
		// 					},
		// 					margin: {
		// 						Desktop: "",
		// 					},
		// 				},
		// 			},
		// 			icon: {
		// 				options: {
		// 					library: "fontAwesome",
		// 					srcType: "class",
		// 					iconSrc: "",
		// 					position: "beforePrefix",
		// 					class: "info-icon",
		// 				},
		// 				styles: {
		// 					color: {
		// 						Desktop: "",
		// 					},
		// 					backgroundColor: {
		// 						Desktop: "",
		// 					},
		// 					padding: {
		// 						Desktop: "",
		// 					},
		// 					margin: {
		// 						Desktop: "",
		// 					},
		// 				},
		// 			},
		// 			prefix: {
		// 				options: {
		// 					text: items.elements[i].prefix,
		// 					class: "prefix",
		// 					position: "beforebegin ",
		// 				},
		// 				styles: {
		// 					color: {
		// 						Desktop: "",
		// 					},
		// 					backgroundColor: {
		// 						Desktop: "",
		// 					},
		// 					padding: {
		// 						Desktop: "",
		// 					},
		// 					margin: {
		// 						Desktop: "",
		// 					},
		// 				},
		// 			},
		// 			postfix: {
		// 				options: {
		// 					text: "",
		// 					class: "postfix",
		// 					position: "afterend",
		// 				},
		// 				styles: {
		// 					color: {
		// 						Desktop: "",
		// 					},
		// 					backgroundColor: {
		// 						Desktop: "",
		// 					},
		// 					padding: {
		// 						Desktop: "",
		// 					},
		// 					margin: {
		// 						Desktop: "",
		// 					},
		// 				},
		// 			},
		// 		},
		// 	]);
		// }
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
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
								]}>
								<PGtab name="options">
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
							title={__("Items", "combo-blocks")}
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
								]}>
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={items}
										// extra={{ index: index }}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												items,
												"items",
												itemSelector,
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
												itemSelector,
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
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												items,
												"items",
												itemSelector,
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
										var content =
											'<!-- wp:combo-blocks/woo-product-info {"wrapper":{"options":{"tag":"ul","class":"pg-woo-product-info"},"styles":{}},"items":{"options":{"linkTarget":"_blank","showIcon":false,"iconPositon":"beforePrefix","tag":"li"},"styles":{"color":{"Desktop":"#18978F"},"margin":{"Desktop":"10px 10px 10px 10px"},"borderRadius":{"Desktop":"0px 0px 0px 0px"},"fontSize":{"Desktop":"20px"},"display":{"Desktop":"flex"},"listStyle":{"Desktop":"disc inside url(\u0022\u0022)"}},"elements":[{"id":"weight","label":"Weight","prefix":"Weight: ","postfix":"","value":"10kg","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":""},"options":[],"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}},"chosen":false,"selected":false},{"id":"length","label":"Length","prefix":"Length: ","postfix":"","value":"10cm","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":""},"options":[],"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}},"chosen":false,"selected":false},{"id":"width","label":"Width","prefix":"Width: ","postfix":"","value":"10cm","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":""},"options":[],"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}},"chosen":false,"selected":false},{"id":"height","label":"Height","prefix":"Height: ","postfix":"","value":"10cm","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":""},"options":[],"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}},"chosen":false,"selected":false},{"id":"dimensions","label":"Dimensions","prefix":"Dimensions: ","postfix":"","value":"10cm X 10cm X 10cm","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":""},"options":[],"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}},"chosen":false,"selected":false}]},"blockCssY":{"items":{}},"blockId":"pg1e30f72f47c5"} --><!-- wp:combo-blocks/woo-product-info-item {"field":{"options":{"class":"item","tag":"span","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","customMeta":"","metaType":"string","linkTarget":"_blank","linkAttr":[],"fieldValue":"weight","customUrl":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"prefix":{"options":{"text":"Weight: ","class":"prefix","position":"beforebegin "},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"blockCssY":{"items":{}},"blockId":"pga4192eace3c9"} /--><!-- wp:combo-blocks/woo-product-info-item {"field":{"options":{"class":"item","tag":"span","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","customMeta":"","metaType":"string","linkTarget":"_blank","linkAttr":[],"fieldValue":"length","customUrl":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"prefix":{"options":{"text":"Length: ","class":"prefix","position":"beforebegin "},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"blockCssY":{"items":{}},"blockId":"pg6a819f582ee5"} /--><!-- wp:combo-blocks/woo-product-info-item {"field":{"options":{"class":"item","tag":"span","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","customMeta":"","metaType":"string","linkTarget":"_blank","linkAttr":[],"fieldValue":"width","customUrl":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"prefix":{"options":{"text":"Width: ","class":"prefix","position":"beforebegin "},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"blockCssY":{"items":{}},"blockId":"pgf8be17108eca"} /--><!-- wp:combo-blocks/woo-product-info-item {"field":{"options":{"class":"item","tag":"span","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","customMeta":"","metaType":"string","linkTarget":"_blank","linkAttr":[],"fieldValue":"height","customUrl":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"prefix":{"options":{"text":"Height: ","class":"prefix","position":"beforebegin "},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"blockCssY":{"items":{}},"blockId":"pg612f20d6bb77"} /--><!-- wp:combo-blocks/woo-product-info-item {"field":{"options":{"class":"item","tag":"span","limitBy":"","limitCount":99,"isLink":true,"linkTo":"postUrl","linkToAuthorMeta":"","linkToCustomMeta":"","customMeta":"","metaType":"string","linkTarget":"_blank","linkAttr":[],"fieldValue":"dimensions","customUrl":""},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"prefix":{"options":{"text":"Dimensions: ","class":"prefix","position":"beforebegin "},"styles":{"color":{"Desktop":""},"backgroundColor":{"Desktop":""},"padding":{"Desktop":""},"margin":{"Desktop":""}}},"blockCssY":{"items":{}},"blockId":"pg7fbbcdcb1a8f"} /--><!-- /wp:combo-blocks/woo-product-info -->';
										wp.data
											.dispatch("core/block-editor")
											.replaceBlock(clientId, wp.blocks.parse(content));
									}}>
									{__("Skip", "combo-blocks")}
								</div>
							</div>
							<div {...innerBlocksProps} className="">
								<ComboBlocksVariationsPicker
									blockName={"woo-product-info"}
									blockId={blockId}
									clientId={clientId}
									onChange={onPickBlockVariation}
								/>
							</div>
						</div>
					</div>
				)}
				{hasInnerBlocks && (
					<CustomTagWrapper {...innerBlocksProps}>
						{innerBlocksProps.children}
					</CustomTagWrapper>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		// return null;
		return <InnerBlocks.Content />;
	},
});
