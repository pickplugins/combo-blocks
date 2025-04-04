import { registerBlockType } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
const { parse } = wp.blockSerializationDefaultParser;

// var select = wp.data.select('core/block-editor');
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	Spinner,
} from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { Icon, close, menu, settings, styles } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
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
const ALLOWED_MEDIA_TYPES = ["image"];
// var queryPramsX = queryPrams.map((x, i) => {
//   return { value: i, label: x.label, description: x.description, isPro: x.isPro, }
// })
var myStore = wp.data.select("ComboBlocksStore");
registerBlockType(metadata, {
	icon: {
		background: "#fff0",
		foreground: "#fff",
		src: (
			<svg
				width="160"
				height="161"
				viewBox="0 0 160 161"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M61.175 30H4.70442C3.45634 30 2.25938 30.4958 1.37686 31.3783C0.494333 32.2608 -0.00146484 33.4578 -0.00146484 34.7059V81.7647C-0.00146484 83.0128 0.494333 84.2097 1.37686 85.0923C2.25938 85.9748 3.45634 86.4706 4.70442 86.4706H61.175C62.4231 86.4706 63.62 85.9748 64.5026 85.0923C65.3851 84.2097 65.8809 83.0128 65.8809 81.7647V34.7059C65.8809 33.4578 65.3851 32.2608 64.5026 31.3783C63.62 30.4958 62.4231 30 61.175 30ZM56.4691 77.0588H9.4103V39.4118H56.4691V77.0588Z"
					fill="url(#paint0_linear_61_82)"
				/>
				<path
					d="M159.999 44.1177H84.7046V53.5294H159.999V44.1177Z"
					fill="url(#paint1_linear_61_82)"
				/>
				<path
					d="M141.175 62.9414H84.7046V72.3532H141.175V62.9414Z"
					fill="url(#paint2_linear_61_82)"
				/>
				<path
					d="M61.175 104H4.70442C3.45634 104 2.25938 104.496 1.37686 105.378C0.494333 106.261 -0.00146484 107.458 -0.00146484 108.706V155.765C-0.00146484 157.013 0.494333 158.21 1.37686 159.092C2.25938 159.975 3.45634 160.471 4.70442 160.471H61.175C62.4231 160.471 63.62 159.975 64.5026 159.092C65.3851 158.21 65.8809 157.013 65.8809 155.765V108.706C65.8809 107.458 65.3851 106.261 64.5026 105.378C63.62 104.496 62.4231 104 61.175 104ZM56.4691 151.059H9.4103V113.412H56.4691V151.059Z"
					fill="url(#paint3_linear_61_82)"
				/>
				<path
					d="M159.999 118.118H84.7046V127.529H159.999V118.118Z"
					fill="url(#paint4_linear_61_82)"
				/>
				<path
					d="M141.175 136.941H84.7046V146.353H141.175V136.941Z"
					fill="url(#paint5_linear_61_82)"
				/>
				<path
					d="M43.9957 0H1.99854C0.893966 0 -0.00146484 0.89543 -0.00146484 2V12C-0.00146484 13.1046 0.893966 14 1.99854 14H43.9957C45.1003 14 45.9957 13.1046 45.9957 12V2C45.9957 0.895431 45.1003 0 43.9957 0Z"
					fill="url(#paint6_linear_61_82)"
				/>
				<path
					d="M100.997 0H59.0005C57.8959 0 57.0005 0.89543 57.0005 2V12C57.0005 13.1046 57.8959 14 59.0005 14H100.997C102.102 14 102.997 13.1046 102.997 12V2C102.997 0.895431 102.102 0 100.997 0Z"
					fill="url(#paint7_linear_61_82)"
				/>
				<path
					d="M157.999 0H116.002C114.897 0 114.002 0.89543 114.002 2V12C114.002 13.1046 114.897 14 116.002 14H157.999C159.103 14 159.999 13.1046 159.999 12V2C159.999 0.895431 159.103 0 157.999 0Z"
					fill="url(#paint8_linear_61_82)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_82"
						x1="-0.00146484"
						y1="58.2353"
						x2="65.8809"
						y2="58.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_82"
						x1="84.7046"
						y1="48.8236"
						x2="159.999"
						y2="48.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_82"
						x1="84.7046"
						y1="67.6473"
						x2="141.175"
						y2="67.6473"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_82"
						x1="-0.00146484"
						y1="132.235"
						x2="65.8809"
						y2="132.235"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_82"
						x1="84.7046"
						y1="122.824"
						x2="159.999"
						y2="122.824"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_82"
						x1="84.7046"
						y1="141.647"
						x2="141.175"
						y2="141.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_82"
						x1="-0.00146484"
						y1="7"
						x2="45.9957"
						y2="7"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_82"
						x1="57.0005"
						y1="7"
						x2="102.997"
						y2="7"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_61_82"
						x1="114.002"
						y1="7"
						x2="159.999"
						y2="7"
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
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		var setAttributes = props.setAttributes;
		var lazyLoad = attributes.lazyLoad;
		var container = attributes.container;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var noPostsWrap = attributes.noPostsWrap;
		var spinnerWrap = attributes.spinnerWrap;
		var queryArgs = attributes.queryArgs;
		var pagination = attributes.pagination;
		var paginationItem = attributes.paginationItem;
		var paginationItemActive = attributes.paginationItemActive;
		var layout = attributes.layout;
		var grid = attributes.grid;
		var nthItemStyle = attributes.nthItemStyle;
		var visible = attributes.visible;
		var blockCssY = attributes.blockCssY;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-combo-blocks`,
		});
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var containerSelector = blockClass;
		const itemsWrapSelector = blockClass + " .items-loop";
		const itemWrapSelector = blockClass + " .item";
		const noPostsSelector = blockClass + " .no-posts";
		const lazyloadWrapSelector = blockClass + " .lazyLoad";
		const spinnerSelector = blockClass + " .spinner";
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		useEffect(() => {
			childBlocks.map((item) => {
				if (item.name == "combo-blocks/") {
				}
			});
		}, [childBlocks]);
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		let isProFeature = applyFilters("isProFeature", true);
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const ALLOWED_BLOCKS = [
			"combo-blocks/",
			"combo-blocks/post-query",
			"combo-blocks/masonry-wrap",
			"post/grid/post-query-pagination",
			"combo-blocks/testimonials",
			"combo-blocks/team-members",
			"combo-blocks/terms-query",
			"combo-blocks/user-query",
		];
		const MY_TEMPLATE = [
			["combo-blocks/", {}],
			["combo-blocks/post-query", {}],
			["combo-blocks/post-query-pagination", {}],
		];
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
				var lazyLoadX = attributes.lazyLoad;
				var containerX = attributes.container;
				var itemsWrapX = attributes.itemsWrap;
				var itemWrapX = attributes.itemWrap;
				var noPostsWrapX = attributes.noPostsWrap;
				var spinnerWrapX = attributes.spinnerWrap;
				var gridX = attributes.grid;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (gridX != undefined) {
					var gridY = { ...gridX, options: grid.options };
					setAttributes({ grid: gridY });
					blockCssObj[gridSelector] = gridY;
				}
				if (spinnerWrapX != undefined) {
					var spinnerWrapY = { ...spinnerWrapX, options: spinnerWrap.options };
					setAttributes({ spinnerWrap: spinnerWrapY });
					blockCssObj[spinnerWrapSelector] = spinnerWrapY;
				}
				if (noPostsWrapX != undefined) {
					var noPostsWrapY = { ...noPostsWrapX, options: noPostsWrap.options };
					setAttributes({ noPostsWrap: noPostsWrapY });
					blockCssObj[noPostsWrapSelector] = noPostsWrapY;
				}
				if (itemWrapX != undefined) {
					var itemWrapY = { ...itemWrapX, options: itemWrap.options };
					setAttributes({ itemWrap: itemWrapY });
					blockCssObj[itemWrapSelector] = itemWrapY;
				}
				if (itemsWrapX != undefined) {
					var itemsWrapY = { ...itemsWrapX, options: itemsWrap.options };
					setAttributes({ itemsWrap: itemsWrapY });
					blockCssObj[itemsWrapSelector] = itemsWrapY;
				}
				if (containerX != undefined) {
					var containerY = { ...containerX, options: container.options };
					setAttributes({ container: containerY });
					blockCssObj[containerSelector] = containerY;
				}
				if (lazyLoadX != undefined) {
					var lazyLoadY = { ...lazyLoadX, options: lazyLoad.options };
					setAttributes({ lazyLoad: lazyLoadY });
					blockCssObj[lazyLoadSelector] = lazyLoadY;
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
		function onChangeStyleContainer(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ container: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
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

		function onRemoveStyleContainer(sudoScource, key) {
			let obj = { ...container };
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
			setAttributes({ container: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				containerSelector
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
		function onRemoveStyleItemsWrap(sudoScource, key) {
			let obj = { ...itemsWrap };
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
			setAttributes({ itemsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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
		function onRemoveStyleItemWrap(sudoScource, key) {
			let obj = { ...itemWrap };
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
			setAttributes({ itemWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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

		function onResetContainer(sudoSources) {
			let obj = Object.assign({}, container);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						containerSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ container: obj });
		}
		function onResetItemsWrap(sudoSources) {
			let obj = Object.assign({}, itemsWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemsWrap: obj });
		}
		function onResetItemWrap(sudoSources) {
			let obj = Object.assign({}, itemWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemWrap: obj });
		}

		function onBulkAddContainer(sudoScource, cssObj) {
			let obj = Object.assign({}, container);
			obj[sudoScource] = cssObj;
			setAttributes({ container: obj });
			var selector = myStore.getElementSelector(sudoScource, containerSelector);
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
		function onBulkAddItemsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, itemsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ itemsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, itemsWrapSelector);
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
		function onBulkAddItemWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, itemWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ itemWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, itemWrapSelector);
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

		function onAddStyleContainer(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, container);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ container: object });
		}
		function onPickCssLibraryItemsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemsWrap[sudoScource] = sudoScourceArgs;
			});
			var itemsWrapX = Object.assign({}, itemsWrap);
			setAttributes({ itemsWrap: itemsWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector
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
		function onChangeStyleItemsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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
		function onAddStyleItemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
		}
		function onPickCssLibraryItemWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemWrap[sudoScource] = sudoScourceArgs;
			});
			var itemWrapX = Object.assign({}, itemWrap);
			setAttributes({ itemWrap: itemWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemWrapSelector
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
		function onChangeStyleItemWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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
		function onRemoveStyleItemWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(itemWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ itemWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleItemWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemWrap: object });
		}
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[containerSelector] = container;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemWrapSelector] = itemWrap;
			blockCssObj[noPostsSelector] = noPostsWrap;
			blockCssObj[lazyloadWrapSelector] = lazyLoad;
			blockCssObj[spinnerSelector] = spinnerWrap;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		// useEffect(() => {
		// 	blockCssY.items[itemsWrapSelector] =
		// 		blockCssY.items[itemsWrapSelector] != undefined
		// 			? blockCssY.items[itemsWrapSelector]
		// 			: {};
		// 	var nthItemsResponsive = [];
		// 	var itemX = { ...blockCssY.items };
		// 	Object.entries(grid.options.itemCss).map((args) => {
		// 		/****breakPoint****/
		// 		var breakPoint = args[0];
		// 		var nthItems = args[1];
		// 		nthItems.length > 0 &&
		// 			nthItems.map((x, i) => {
		// 				/****nthItems****/
		// 				Object.entries(x).map((attr) => {
		// 					var attrId = attr[0];
		// 					var attrVal = attr[1];
		// 					if (nthItemsResponsive[i] != undefined) {
		// 						//nthItemsResponsive[i] = [];
		// 					} else {
		// 						nthItemsResponsive[i] = [];
		// 					}
		// 					if (nthItemsResponsive[i][attrId] != undefined) {
		// 						//nthItemsResponsive[i][attrId] = [];
		// 					} else {
		// 						nthItemsResponsive[i][attrId] = [];
		// 					}
		// 					if (nthItemsResponsive[i][attrId][breakPoint] != undefined) {
		// 						nthItemsResponsive[i][attrId][breakPoint] = attrVal;
		// 					} else {
		// 						nthItemsResponsive[i][attrId][breakPoint] = attrVal;
		// 					}
		// 				});
		// 			});
		// 	});
		// 	for (var i = 0; i < 10; i++) {
		// 		var selector = `${blockClass} .item:nth-child(${i})`;
		// 		if (blockCssY.items[selector] != undefined) {
		// 			delete blockCssY.items[selector];
		// 		}
		// 	}
		// 	var imtasdas = {};
		// 	nthItemsResponsive.length > 0 &&
		// 		nthItemsResponsive.map((nth, i) => {
		// 			var selector = `${blockClass} .item:nth-child(${i + 1})`;
		// 			Object.entries(nth).map((attr) => {
		// 				var attrId = attr[0];
		// 				var attrVal = attr[1];
		// 				if (imtasdas[selector] != undefined) {
		// 				} else {
		// 					imtasdas[selector] = {};
		// 				}
		// 				if (imtasdas[selector][attrId] != undefined) {
		// 				} else {
		// 					imtasdas[selector][attrId] = {};
		// 				}
		// 				imtasdas[selector][attrId] = attrVal;
		// 			});
		// 		});
		// 	var asdsd = { ...blockCssY.items, ...imtasdas };
		// 	setAttributes({ blockCssY: { items: asdsd } });
		// }, [grid]);
		function onChangeStyleNthItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX[index] = object;
			setAttributes({ nthItemStyle: nthItemStyleX });
			var selector = `${blockClass} .item:nth-child(${index + 1})`;
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
		function onRemoveStyleNthItem(sudoScource, key, obj, extra) {
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
			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };
			nthItemStyleX[index] = objectX;
			setAttributes({ nthItemStyle: nthItemStyleX });
			var selector = `${blockClass} .item:nth-child(${index + 1})`;
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
		function onAddStyleNthItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX[index] = object;
			//setAttributes({ nthItemStyle: object });
			setAttributes({ nthItemStyle: nthItemStyleX });
		}
		function onBulkAddNthItem(sudoScource, cssObj, extra) {
			var index = extra.index;
			var nthItemStyleX = [...nthItemStyle];
			var nthObj = nthItemStyleX[index];
			let obj = Object.assign({}, nthObj);
			obj[sudoScource] = cssObj;
			nthItemStyleX[index] = obj;
			setAttributes({ nthItemStyle: nthItemStyleX });
			var selectorX = `${blockClass} .item:nth-child(${index + 1})`;
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
			const nthItemStyleX = [...nthItemStyle];
			const nthObj = nthItemStyleX[index];
			if (nthObj) {
				const obj = { ...nthObj };
				Object.entries(sudoSources).forEach(([sudoSource]) => {
					if (obj[sudoSource]) {
						obj[sudoSource] = {};
						const selector = `${blockClass} .item:nth-child(${index + 1})`;
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
				nthItemStyleX[index] = obj;
				setAttributes({ nthItemStyle: nthItemStyleX });
			}
		}
		function addMedia(option, index) {
			//var isExist = items.elements.find(x => x.label === option.label);
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX.push({});
			setAttributes({ nthItemStyle: nthItemStyleX });
		}
		useEffect(() => {
			nthItemStyle.map((x, i) => {
				var styles = x.styles;
				if (styles != undefined) {
					Object.entries(styles).map((y) => {
						var attrId = y[0];
						var attrVal = y[1];
						if (Object.keys(attrVal).length != 0) {
							var attrIdX = "";
							if (attrId == "backgroundColor") {
								attrIdX = "background-color";
							} else if (attrId == "textAlign") {
								attrIdX = "text-align";
							} else {
								attrIdX = attrId;
							}
							var selector = `${blockClass} .item:nth-child(${i + 1})`;
							if (blockCssY.items[selector] == undefined) {
								blockCssY.items[selector] = {};
								blockCssY.items[selector][attrIdX] = attrVal;
							} else {
								blockCssY.items[selector][attrIdX] = attrVal;
							}
							setAttributes({ blockCssY: { items: blockCssY.items } });
						}
					});
				}
			});
			setTimeout((x) => {
				//setAttributes({ blockCssY: { items: newValuesObjX } });
			}, 2000);
		}, [nthItemStyle]);
		var postTypes = [];
		const postTypesData = useSelect(
			(select) => select(coreStore).getPostTypes({ per_page: -1 }),
			[]
		);
		postTypesData !== null &&
			postTypesData.map((x) => {
				postTypes.push({ value: x.slug, label: x.name });
			});
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };
			nthItemStyleX[index] = object;
			setAttributes({ nthItemStyle: nthItemStyleX });
			var selector = `${blockClass} .item:nth-child(${index + 1})`;
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
			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };
			nthItemStyleX[index] = object;
			setAttributes({ nthItemStyle: nthItemStyleX });
		}
		function onAddStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");
			var nthItemStyleX = [...nthItemStyle];
			nthItemStyleX[index] = object;
			//setAttributes({ nthItemStyle: object });
			setAttributes({ nthItemStyle: nthItemStyleX });
		}
		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, nthItemStyle);
			obj[sudoScource] = cssObj;
			setAttributes({ nthItemStyle: obj });
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
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle title={__("Container", "combo-blocks")} initialOpen={false}>
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
									<label htmlFor="">CSS Class</label>
									<PGcssClassPicker
										tags={customTags}
										placeholder="Add Class"
										value={container.options.class}
										onChange={(newVal) => {
											var options = { ...container.options, class: newVal };
											setAttributes({
												container: {
													styles: container.styles,
													options: options,
												},
											});
										}}
									/>
									<PanelRow>
										<label htmlFor="">Block ID</label>
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
										obj={container}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												container,
												"container",
												containerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												container,
												"container",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												container,
												"container",
												containerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												container,
												"container",
												containerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												container,
												"container",
												containerSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle title="Grid Wrap" initialOpen={false}>
							<PGStyles
								obj={itemsWrap}
								onChange={(sudoScource, newVal, attr) => {
									myStore.onChangeStyleElement(
										sudoScource,
										newVal,
										attr,
										itemsWrap,
										"itemsWrap",
										itemsWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onAdd={(sudoScource, key) => {
									myStore.onAddStyleElement(
										sudoScource,
										key,
										itemsWrap,
										"itemsWrap",
										setAttributes
									);
								}}
								onRemove={(sudoScource, key) => {
									myStore.onRemoveStyleElement(
										sudoScource,
										key,
										itemsWrap,
										"itemsWrap",
										itemsWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onBulkAdd={(sudoScource, cssObj) => {
									myStore.onBulkAddStyleElement(
										sudoScource,
										cssObj,
										itemsWrap,
										"itemsWrap",
										itemsWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onReset={(sudoSources) => {
									myStore.onResetElement(
										sudoSources,
										itemsWrap,
										"itemsWrap",
										itemsWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
							/>
						</PGtoggle>
						<PGtoggle title="Grid Item Wrap" initialOpen={false}>
							<PGStyles
								obj={itemWrap}
								onChange={(sudoScource, newVal, attr) => {
									myStore.onChangeStyleElement(
										sudoScource,
										newVal,
										attr,
										itemWrap,
										"itemWrap",
										itemWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onAdd={(sudoScource, key) => {
									myStore.onAddStyleElement(
										sudoScource,
										key,
										itemWrap,
										"itemWrap",
										setAttributes
									);
								}}
								onRemove={(sudoScource, key) => {
									myStore.onRemoveStyleElement(
										sudoScource,
										key,
										itemWrap,
										"itemWrap",
										itemWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onBulkAdd={(sudoScource, cssObj) => {
									myStore.onBulkAddStyleElement(
										sudoScource,
										cssObj,
										itemWrap,
										"itemWrap",
										itemWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
								onReset={(sudoSources) => {
									myStore.onResetElement(
										sudoSources,
										itemWrap,
										"itemWrap",
										itemWrapSelector,
										blockCssY,
										setAttributes
									);
								}}
							/>
						</PGtoggle>
						<PGtoggle
							// title="N'th Item CSS"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("N'th Item CSS", "combo-blocks")}</span>
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
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Add N'th Item", "combo-blocks")}
								</label>
								<button onClick={(ev) => addMedia()}>Add</button>
							</PanelRow>
							<ReactSortable
								list={nthItemStyle}
								handle={".handle"}
								setList={(item) => { }}>
								{nthItemStyle.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var nthItemStyleX = [...nthItemStyle];
															nthItemStyleX.splice(index, 1);
															setAttributes({
																nthItemStyle: nthItemStyleX,
															});
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>
													<span className="mx-2">{index + 1}</span>
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
												<PGtab name="options"></PGtab>
												<PGtab name="styles">
													<PGStyles
														obj={item}
														extra={{ index: index }}
														onChange={onChangeStyleNthItem}
														onAdd={onAddStyleNthItem}
														onRemove={onRemoveStyleNthItem}
														onBulkAdd={onBulkAddNthItem}
														onReset={onResetNthItem}
													/>
												</PGtab>
											</PGtabs>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
						</PGtoggle>
						<PGtoggle title="Lazy load" initialOpen={false}>
							<PanelRow>
								<label htmlFor="">{__("Enable Lazy Load", "combo-blocks")}</label>
								<SelectControl
									label=""
									value={lazyLoad.options.enable}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									onChange={(newVal) => {
										var options = { ...lazyLoad.options, enable: newVal };
										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">{__("Lazy load Icon", "combo-blocks")}</label>
								<PGIconPicker
									library={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.library
											: "fontAwesome"
									}
									srcType={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.srcType
											: "class"
									}
									iconSrc={
										lazyLoad.options.icon != undefined
											? lazyLoad.options.icon.iconSrc
											: ""
									}
									onChange={(arg) => {
										var options = {
											...lazyLoad.options,
											icon: {
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											},
										};
										setAttributes({
											lazyLoad: { ...lazyLoad, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">{__("Lazy Load Image", "combo-blocks")}</label>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											// media.id
											var options = {
												...lazyLoad.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({
												lazyLoad: { ...lazyLoad, options: options },
											});
										}}
										onClose={() => { }}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={lazyLoad.options.srcId}
										render={({ open }) => (
											<Button className="border" onClick={open}>
												{__("Open Media Library", "combo-blocks")}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</PanelRow>
							<img className="my-5" src={lazyLoad.options.srcUrl} alt="" />
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
													["combo-blocks/", {}],
													[
														"combo-blocks/post-query",
														{
															noPostsWrap: {
																options: { class: "no-posts text-center" },
																styles: [],
															},
															spinnerWrap: {
																options: { class: "spinner" },
																styles: [],
															},
															queryArgs: queryArgs,
															itemsWrap: {
																options: { excludedWrapper: "" },
																styles: [],
															},
															itemWrap: {
																options: {
																	tag: "div",
																	class: "item",
																	counterClass: true,
																	termsClass: true,
																	oddEvenClass: true,
																},
																styles: [],
															},
														},
													],
													[
														"combo-blocks/post-query-pagination",
														{
															pagination: pagination,
															paginationItem: paginationItem,
															paginationItemActive: paginationItemActive,
															next: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "fas fa-angle-right",
																	position: "beforeText",
																	class: "next",
																},
																styles: [],
															},
															previous: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "fas fa-angle-left",
																	position: "beforeText",
																	class: "previous",
																},
																styles: [],
															},
															start: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "start",
																},
																styles: [],
															},
															end: {
																options: {
																	enable: true,
																	library: "fontAwesome",
																	srcType: "class",
																	iconSrc: "",
																	position: "beforeText",
																	class: "end",
																},
																styles: [],
															},
														},
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
										blockName={"filterable-grid"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
					)}
				</>
				{/* <div {...innerBlocksProps}>{innerBlocksProps.children}</div> */}
				<div {...blockProps}>
					{lazyLoad.options.enable == "yes" && isBusy && (
						<div className={lazyLoad.options.class}></div>
					)}
					{isBusy && (
						<div className="text-center">
							<Spinner />
						</div>
					)}
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return <InnerBlocks.Content />;
	},
});
