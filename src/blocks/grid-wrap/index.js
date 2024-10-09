import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { doAction } from "@wordpress/hooks";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { useEntityRecord } from "@wordpress/core-data";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	ToggleControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Popover,
	Spinner,
	Tooltip,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	close,
	mediaAndText,
} from "@wordpress/icons";
import { __experimentalBlockVariationPicker as BlockVariationPicker } from "@wordpress/block-editor";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const { RawHTML } = wp.element;
import { store } from "../../store";
import { __experimentalScrollable as Scrollable } from "@wordpress/components";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGtoggle from "../../components/toggle";

import PGIconPicker from "../../components/icon-picker";
import metadata from "./block.json";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";

import PGBlockVariationsPicker from "../../components/block-variations-picker";

import { applyFilters } from "@wordpress/hooks";
import { ReactSortable } from "react-sortablejs";

var myStore = wp.data.select("postgrid-shop");

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
					d="M56.4043 116.3H103.695L103.695 43.9998H56.4043L56.4043 116.3Z"
					fill="url(#paint0_linear_61_758)"
				/>
				<path
					d="M-7.62939e-06 116.275H47.291L47.291 84.6754H-7.62939e-06L-7.62939e-06 116.275Z"
					fill="url(#paint1_linear_61_758)"
				/>
				<path
					d="M-7.62939e-06 75.625H47.291L47.291 44.025L-7.62939e-06 44.025L-7.62939e-06 75.625Z"
					fill="url(#paint2_linear_61_758)"
				/>
				<path
					d="M112.709 116.275H160V84.6754H112.709V116.275Z"
					fill="url(#paint3_linear_61_758)"
				/>
				<path
					d="M112.709 75.625H160V44.025L112.709 44.025V75.625Z"
					fill="url(#paint4_linear_61_758)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_758"
						x1="103.695"
						y1="80.1498"
						x2="56.4043"
						y2="80.1498"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_758"
						x1="47.291"
						y1="100.475"
						x2="-7.62939e-06"
						y2="100.475"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_758"
						x1="47.291"
						y1="59.825"
						x2="-7.62939e-06"
						y2="59.825"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_758"
						x1="160"
						y1="100.475"
						x2="112.709"
						y2="100.475"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_758"
						x1="160"
						y1="59.825"
						x2="112.709"
						y2="59.825"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},

	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/columns"],
				transform: (attributes, innerBlocks) => {
					var gridTemplateColumns = "";
					innerBlocks.map((i) => {
						gridTemplateColumns += "1fr ";
					});

					var innerBlockX = innerBlocks.map((item, index) => {
						var widthX = item.attributes.width;
						var backgroundColorX = item.attributes.backgroundColor;

						return {
							clientId: item.clientId,
							name:
								item.name == "core/column"
									? "post-grid/grid-wrap-item"
									: item.name,
							isValid: item.isValid,
							originalContent: "",
							validationIssues: [],
							attributes: {
								wrapper: {
									options: {
										tag: "div",
										class: "pg-grid-wrap-item",
									},
									styles: {
										width: {
											Desktop: widthX,
										},
										backgroundColor: {
											Desktop:
												"var(--wp--preset--color--" +
												backgroundColorX +
												") !important",
										},
									},
								},
								blockId: "pgfaaa4b544973abc",
								blockCssY: {
									items: {},
								},
							},
							innerBlocks: item.innerBlocks,
						};
					});

					return createBlock(
						"post-grid/grid-wrap",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-grid-wrap",
								},
								styles: {
									display: {
										Desktop: "grid",
									},
									gap: {
										Desktop: "1em",
									},
									gridTemplateColumns: {
										Desktop: gridTemplateColumns,
									},
								},
							},
							item: {
								options: {
									tag: "div",
									class: "pg-grid-wrap-item",
								},
							},
						},
						innerBlockX
					);
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/columns"],
				transform: (attributes, innerBlocks) => {
					var innerBlockX = innerBlocks.map((item, index) => {
						return {
							clientId: item.clientId,
							name:
								item.name == "post-grid/grid-wrap-item"
									? "core/column"
									: item.name,
							isValid: item.isValid,
							originalContent: "",
							validationIssues: [],
							attributes: {
								blockId: "pgfaaa4b544973abc",
								blockCssY: {
									items: {},
								},
							},
							innerBlocks: item.innerBlocks,
						};
					});

					return createBlock(
						"core/columns",
						{
							isStackedOnMobile: true,
						},
						innerBlockX
					);
				},
			},
		],
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

		var item = attributes.item;

		var nthItemStyle = attributes.nthItemStyle;

		var visible = attributes.visible;

		var blockCssY = attributes.blockCssY;

		let isProFeature = applyFilters("isProFeature", true);

		var postId = context["postId"];
		var postType = context["postType"];

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;

		var itemSelector = blockClass + " .pg-grid-wrap-item";

		const CustomTagWrapper =
			wrapper.options.tag?.length != 0 ? `${wrapper.options.tag}` : "div";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

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
			blockCssObj[itemSelector] = item;

			nthItemStyle.map((x, i) => {
				var selector = `${blockClass} .pg-grid-wrap-item:nth-child(${i + 1})`;
				blockCssObj[selector] = x;
			});

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

		function applyFlex(attr, newVal) {
			onChangeStyleWrapper("styles", newVal, attr);
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
		////////////////////
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
		function onRemoveStyleItem(sudoScource, key) {
			let obj = { ...item };
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
			setAttributes({ item: objectX });

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
		//////////////////////

		//////////////////reset
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
		function onResetItem(sudoSources) {
			let obj = Object.assign({}, item);

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

			setAttributes({ item: obj });
		}
		//////////////////reset
		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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

		function onChangeStyleItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ item: object });

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

		function onAddStyleItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}

		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;

			setAttributes({ item: obj });

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

		const ALLOWED_BLOCKS = [
			"post-grid/grid-wrap-item",
			"post-grid/terms-query",
			"post-grid/post-query",
			"post-grid/user-query",
			"post-grid/images",
		];

		const MY_TEMPLATE = [
			["post-grid/grid-wrap-item", {}],
			["post-grid/grid-wrap-item", {}],
			["post-grid/grid-wrap-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});

		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

			const slide = createBlock("post-grid/grid-wrap-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		function onChangeStyleNthItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;

			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);

			var nthItemStyleX = [...nthItemStyle];
			// var itemsX = { ...nthItemStyle };

			nthItemStyleX[index] = object;

			setAttributes({ nthItemStyle: nthItemStyleX });

			var selector = `${blockClass} .pg-grid-wrap-item:nth-child(${index + 1})`;

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

			var selector = `${blockClass} .pg-grid-wrap-item:nth-child(${index + 1})`;

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

			var selectorX = `${blockClass} .pg-grid-wrap-item:nth-child(${index + 1
				})`;

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

						const selector = `${blockClass} .pg-grid-wrap-item:nth-child(${index + 1
							})`;
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

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-indigo-400 text-white font-medium rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-indigo-300 hover:bg-indigo-500 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addChild();
							}}>
							{__("Add Item", "post-grid")}
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Wrapper", "post-grid")}
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
											{__("Block ID", "post-grid")}
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
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onReset={onResetWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Item", "post-grid")}
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
										obj={item}
										onChange={onChangeStyleItem}
										onAdd={onAddStyleItem}
										onRemove={onRemoveStyleItem}
										onBulkAdd={onBulkAddItem}
										onReset={onResetItem}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>



						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "post-grid")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
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
										{__("Click to pick a variation", "post-grid")}
									</div>

									<div
										className="bg-indigo-300 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											var wrapperX = {
												...wrapper,
												styles: {
													gridTemplateColumns: { Desktop: "1fr 1fr" },
													gap: { Desktop: "1em" },
													display: { Desktop: "grid" },
												},
											};
											setAttributes({ wrapper: wrapperX });

											var elementCss = myStore.generateElementCss(
												wrapperX,
												wrapperSelector
											);

											var itemsX = { ...blockCssY.items, ...elementCss };
											setAttributes({ blockCssY: { items: itemsX } });

											myStore.generateBlockCss(blockCssY.items, blockId);

											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													[
														"post-grid/grid-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-grid-wrap-item",
																},
																styles: {},
															},
														},
													],
													[
														"post-grid/grid-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-grid-wrap-item",
																},
																styles: {},
															},
														},
													],
												]),
												true
											);
										}}>
										{__("Skip", "post-grid")}
									</div>
								</div>

								<div {...innerBlocksProps} className="">
									<PGBlockVariationsPicker
										blockName={"grid-wrap"}
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
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-grid-wrap-item`,
		});

		return <InnerBlocks.Content />;

		//return null;
	},
});
