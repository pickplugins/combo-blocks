import { createBlock, registerBlockType } from "@wordpress/blocks";
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
import { Icon, close, copy, pages, settings, styles } from "@wordpress/icons";
import PGIconPicker from "../../components/icon-picker";
// import paginationTypes from "./pagination-types";
import { ReactSortable } from "react-sortablejs";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
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
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M61.1765 15H4.70588C3.4578 15 2.26085 15.4958 1.37832 16.3783C0.495798 17.2608 0 18.4578 0 19.7059V66.7647C0 68.0128 0.495798 69.2097 1.37832 70.0923C2.26085 70.9748 3.4578 71.4706 4.70588 71.4706H61.1765C62.4246 71.4706 63.6215 70.9748 64.504 70.0923C65.3866 69.2097 65.8824 68.0128 65.8824 66.7647V19.7059C65.8824 18.4578 65.3866 17.2608 64.504 16.3783C63.6215 15.4958 62.4246 15 61.1765 15ZM56.4706 62.0588H9.41177V24.4118H56.4706V62.0588Z"
					fill="url(#paint0_linear_161_17)"
				/>
				<path
					d="M160 29.1177H84.7061V38.5294H160V29.1177Z"
					fill="url(#paint1_linear_161_17)"
				/>
				<path
					d="M141.177 47.9414H84.7061V57.3532H141.177V47.9414Z"
					fill="url(#paint2_linear_161_17)"
				/>
				<path
					d="M61.1765 89H4.70588C3.4578 89 2.26085 89.4958 1.37832 90.3783C0.495798 91.2608 0 92.4578 0 93.7059V140.765C0 142.013 0.495798 143.21 1.37832 144.092C2.26085 144.975 3.4578 145.471 4.70588 145.471H61.1765C62.4246 145.471 63.6215 144.975 64.504 144.092C65.3866 143.21 65.8824 142.013 65.8824 140.765V93.7059C65.8824 92.4578 65.3866 91.2608 64.504 90.3783C63.6215 89.4958 62.4246 89 61.1765 89ZM56.4706 136.059H9.41177V98.4118H56.4706V136.059Z"
					fill="url(#paint3_linear_161_17)"
				/>
				<path
					d="M160 103.118H84.7061V112.529H160V103.118Z"
					fill="url(#paint4_linear_161_17)"
				/>
				<path
					d="M141.177 121.941H84.7061V131.353H141.177V121.941Z"
					fill="url(#paint5_linear_161_17)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_161_17"
						x1="0"
						y1="43.2353"
						x2="65.8824"
						y2="43.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_161_17"
						x1="84.7061"
						y1="33.8236"
						x2="160"
						y2="33.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_161_17"
						x1="84.7061"
						y1="52.6473"
						x2="141.177"
						y2="52.6473"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_161_17"
						x1="0"
						y1="117.235"
						x2="65.8824"
						y2="117.235"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_161_17"
						x1="84.7061"
						y1="107.824"
						x2="160"
						y2="107.824"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_161_17"
						x1="84.7061"
						y1="126.647"
						x2="141.177"
						y2="126.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	transforms: {
		to: [
			{
				type: "block",
				blocks: ["combo-blocks/filterable-grid"],
				transform: (attributes, innerBlocks) => {
					const newObject = {
						clientId: "4bc31634-31af-4241-ae5e-d9af04abcs",
						name: "combo-blocks/",
						isValid: true,
						originalContent: "",
						validationIssues: [],
						attributes: {
							lazyLoad: {
								options: {
									class: "lazyLoad",
									enable: "no",
									srcUrl: "",
									srcId: "",
									icon: {
										library: "",
										srcType: "class",
										iconSrc: "",
									},
								},
								styles: {},
							},
							search: {
								options: {
									class: "search",
									enable: "no",
									type: "",
									placeholder: "",
									icon: "",
									busyIcon: "",
								},
								styles: {},
							},
							filterable: {
								options: {
									filters: [],
									allText: "All",
									logicWithinGroup: "",
									logicBetweenGroups: "",
									multifilter: false,
									showSort: "",
									filterToggle: "no",
									showRandom: "",
									showAll: "yes",
									showClear: "",
									activeFilter: "",
									perPage: 6,
								},
								styles: {
									color: {
										Desktop: "",
									},
									wordBreak: {},
									padding: {
										Desktop: "",
									},
									margin: {
										Desktop: "",
									},
									display: {
										Desktop: "inline-block",
									},
									cursor: {
										Desktop: "pointer",
									},
								},
							},
							activeFilter: {
								options: {
									slug: "all",
								},
								styles: {
									color: {
										Desktop: "",
									},
									wordBreak: {},
									padding: {
										Desktop: "",
									},
									margin: {
										Desktop: "",
									},
								},
							},
							filterGroupWrap: {
								options: {},
								styles: {
									color: {
										Desktop: "#18978F",
									},
									backgroundColor: {
										Desktop: "#9DD6DF",
									},
									wordBreak: {},
									padding: {
										Desktop: "",
									},
									margin: {
										Desktop: "",
									},
									display: {
										Desktop: "inline-block",
									},
								},
							},
							filterGroup: {
								options: {},
								styles: {
									color: {
										Desktop: "#18978F",
									},
									backgroundColor: {
										Desktop: "#9DD6DF",
									},
									wordBreak: {},
									padding: {
										Desktop: "",
									},
									margin: {
										Desktop: "",
									},
									display: {
										Desktop: "inline-block",
									},
								},
							},
							blockId: "pgd9af0475e6a9",
							blockCssY: {
								items: {
									".pgdc1f0d7f1a2d .filterable-group-wrap": {
										color: {
											Desktop: "#18978F",
										},
										"background-color": {
											Desktop: "#9DD6DF",
										},
										display: {
											Desktop: "inline-block",
										},
									},
									".pgdc1f0d7f1a2d .filterable-group": {
										color: {
											Desktop: "#18978F",
										},
										"background-color": {
											Desktop: "#9DD6DF",
										},
										display: {
											Desktop: "inline-block",
										},
									},
									".pgdc1f0d7f1a2d .pg-filter": {
										display: {
											Desktop: "inline-block",
										},
										cursor: {
											Desktop: "pointer",
										},
									},
								},
							},
						},
						innerBlocks: [],
					};
					var innerBlockX = innerBlocks.map((item, index) => {
						// var widthX = "";
						// widthX = item.attributes.wrapper?.styles.width.Desktop;
						return {
							clientId: item.clientId,
							name: item.name,
							isValid: item.isValid,
							originalContent: "",
							validationIssues: [],
							attributes: item.attributes,
							innerBlocks: item.innerBlocks,
						};
					});
					innerBlockX.splice(0, 0, newObject);
					return createBlock(
						"combo-blocks/filterable-grid",
						{
							lazyLoad: attributes.lazyLoad,
							search: attributes.search,
							container: attributes.container,
							itemsWrap: attributes.itemsWrap,
							itemWrap: attributes.itemWrap,
							noPostsWrap: attributes.noPostsWrap,
							spinnerWrap: attributes.spinnerWrap,
							nthItemStyle: attributes.nthItemStyle,
							grid: attributes.grid,
						},
						innerBlockX
					);
				},
			},
		],
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
		var visible = attributes.visible;
		var grid = attributes.grid;
		var nthItemStyle = attributes.nthItemStyle;
		var blockCssY = attributes.blockCssY;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		var [importLayoutOpen, setimportLayoutOpen] = useState({
			id: 0,
			isOpen: false,
		}); // Using the hook.
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-combo-blocks`,
		});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
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
		var [debounce, setDebounce] = useState(null); // Using the hook.
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		const [postGridData, setPostGridData] = useState(window.ComboBlocksPluginData);
		let isProFeature = applyFilters("isProFeature", true);
		const [clientData, setClientData] = useState({});
		var clientDataX = myStore != null ? myStore.getclientdata() : "";
		useEffect(() => {
			setPostGridData(window.ComboBlocksPluginData);
		}, [window.ComboBlocksPluginData]);
		useEffect(() => {
			setClientData(myStore != null ? myStore.getclientdata() : "");
		}, [clientDataX]);
		const ALLOWED_BLOCKS = ["combo-blocks/post-query", "combo-blocks/terms-query"];
		const MY_TEMPLATE = [
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
				// var gridX = attributes.grid;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				// if (gridX != undefined) {
				// 	var gridY = { ...gridX, options: grid.options };
				// 	setAttributes({ grid: gridY });
				// 	blockCssObj[gridSelector] = gridY;
				// }
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
		// bulk add style
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
		// reset style css
		function onResetContainer(sudoScources) {
			let obj = Object.assign({}, container);
			Object.entries(sudoScources).map((args) => {
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
		function onResetItemsWrap(sudoScources) {
			let obj = Object.assign({}, itemsWrap);
			Object.entries(sudoScources).map((args) => {
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
		function onResetItemWrap(sudoScources) {
			let obj = Object.assign({}, itemWrap);
			Object.entries(sudoScources).map((args) => {
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
		// function onResetNthItem(sudoScource, cssObj, obj, key, extra) {
		// }

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
			nthItemStyle.map((x, i) => {
				var selector = `${blockClass}  .item:nth-child(${i + 1})`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[containerSelector] = container;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemWrapSelector] = itemWrap;
			blockCssObj[noPostsSelector] = noPostsWrap;
			blockCssObj[lazyloadWrapSelector] = lazyLoad;
			blockCssObj[spinnerSelector] = spinnerWrap;
			nthItemStyle.map((x, i) => {
				var selector = `${blockClass}  .item:nth-child(${i + 1})`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
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
		function onChangeStyleNthItem(sudoScource, newVal, attr, obj, extra) {
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
		const copyData = (data) => {
			const dataString = JSON.stringify(data, null, 2);
			navigator.clipboard
				.writeText(dataString)
				.then(() => {
					// alert("Data copied to clipboard!");
				})
				.catch((err) => { });
		};
		const pasteData = () => {
			navigator.clipboard
				.readText()
				.then((text) => {
					const parsedData = JSON.parse(text);
					setAttributes({ nthItemStyle: parsedData });
				})
				.catch((err) => { });
		};
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
								<button
									onClick={(ev) => {
										var nthItemStyleX = [...nthItemStyle];
										nthItemStyleX.push({});
										setAttributes({ nthItemStyle: nthItemStyleX });
									}}
									className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
									{__("Add", "combo-blocks")}
								</button>
							</PanelRow>
							<PanelRow className="justify-start gap-4 mb-3">
								<button
									onClick={() => {
										copyData(nthItemStyle);
									}}
									className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
									<Icon icon={copy} className="fill-white " size={14} />
									{__("Copy", "combo-blocks")}
								</button>
								<button
									onClick={() => {
										pasteData();
									}}
									className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
									<Icon icon={pages} className="fill-white " size={14} />
									{__("Paste", "combo-blocks")}
								</button>
							</PanelRow>
							<ReactSortable
								list={nthItemStyle}
								handle={".handle"}
								setList={(item) => {
									// var nthItemStyleX = [...nthItemStyle];
									// setAttributes({ nthItemStyle: { ...nthItemStyle, nthItemStyle: item } });
								}}>
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
						<div
						// {...innerBlocksProps}
						// {...blockProps}
						// className="w-full"
						>
							<div className="flex justify-center p-5 ">
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
																queryArgs: {
																	items: [
																		{
																			val: ["post"],
																			multiple: false,
																			id: "postType",
																			label: "Post Types",
																			description: "Select Post Types to Query",
																		},
																		{
																			val: ["publish"],
																			multiple: false,
																			id: "postStatus",
																			label: "Post status",
																			description: "Query post by post status",
																		},
																		{
																			val: "DESC",
																			multiple: false,
																			id: "order",
																			label: "Order",
																			description: "Post query order",
																		},
																		{
																			val: ["date"],
																			multiple: false,
																			id: "orderby",
																			label: "Orderby",
																			description: "Post query orderby",
																		},
																		{
																			val: "3",
																			multiple: false,
																			id: "postsPerPage",
																			label: "Posts Per Page",
																			description:
																				"Number of post to show per page",
																		},
																		{
																			val: "1",
																			multiple: false,
																			id: "paged",
																			label: "Paged",
																			description: "Pagination start with",
																		},
																	],
																},
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
																pagination: {
																	options: {
																		class:
																			"pagination pg-post-query-pagination",
																		type: "normal",
																		maxPageNum: "5",
																		prevText: "Previous",
																		nextText: "Next",
																		loadMoreText: "Load More",
																		noMorePosts: "No More Posts",
																		loadingText: "Loading...",
																		loadingIcon: {
																			loadingPosition: "beforeText",
																			library: "fontAwesome",
																			srcType: "class",
																			iconSrc: "",
																			class: "load-more",
																		},
																		loadMoreIcon: {
																			library: "fontAwesome",
																			srcType: "class",
																			iconSrc: "",
																			position: "beforeText",
																			class: "load-more",
																		},
																	},
																	styles: {
																		margin: { Desktop: "20px 0px 20px 0px" },
																		display: { Desktop: "flex" },
																		justifyContent: { Desktop: "center" },
																		alignItems: { Desktop: "center" },
																		gap: { Desktop: "0px" },
																		backgroundColor: { Desktop: "#ffffff" },
																		padding: [],
																		width: {
																			Desktop: "max-content",
																			Tablet: "auto",
																		},
																		marginRight: { Desktop: "auto" },
																		marginLeft: { Desktop: "auto" },
																		borderRadius: {
																			Desktop: "5px 5px 5px 5px",
																		},
																		boxShadow: [],
																		border: [],
																		flexWrap: { Tablet: "wrap !important" },
																	},
																},
																paginationItem: {
																	options: { class: "page-numbers " },
																	styles: {
																		color: { Desktop: "#7b7b7b" },
																		fontSize: { Desktop: "16px" },
																		padding: { Desktop: "5px 15px 5px 15px" },
																		backgroundColor: [],
																		borderRadius: [],
																		boxShadow: [],
																		border: { Desktop: "1px solid #e3e3e3" },
																		fontWeight: { Desktop: "700" },
																	},
																},
																paginationItemActive: {
																	options: { class: "page-numbers " },
																	styles: {
																		backgroundColor: [],
																		padding: [],
																		borderRadius: [],
																		color: { Desktop: "#e34f3f" },
																		border: [],
																		boxShadow: [],
																		fontWeight: [],
																	},
																},
																next: {
																	options: {
																		enable: true,
																		library: "fontAwesome",
																		srcType: "class",
																		iconSrc: "",
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
																		iconSrc: "",
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
											Skip
										</div>
									</div>
									<div>
										<ComboBlocksVariationsPicker
											blockName={"combo-blocks"}
											blockId={blockId}
											clientId={clientId}
											onChange={onPickBlockVariation}
										/>
									</div>
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
		var attributes = props.attributes;
		// 		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		// var blockId = attributes.blockId;
		// const blockProps = useBlockProps.save({
		// 	className: ` ${blockId} `,
		// });
		return <InnerBlocks.Content />;
		//return null;
	},
});
