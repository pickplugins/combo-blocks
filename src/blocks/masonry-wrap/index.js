import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
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
	ToggleControl,
} from "@wordpress/components";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, settings } from "@wordpress/icons";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGLightbox from "../../components/lightbox";
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
					d="M-0.00488281 115.556H47.5506V96.8892H-0.00488281V115.556Z"
					fill="url(#paint0_linear_61_609)"
				/>
				<path
					d="M159.995 44H112.439V62.6666H159.995V44Z"
					fill="url(#paint1_linear_61_609)"
				/>
				<path
					d="M103.106 44H55.5508V75.5555H103.106V44Z"
					fill="url(#paint2_linear_61_609)"
				/>
				<path
					d="M-0.00488281 88.8888H47.5506V44H-0.00488281V88.8888Z"
					fill="url(#paint3_linear_61_609)"
				/>
				<path
					d="M159.995 71.1108H112.439V115.555H159.995V71.1108Z"
					fill="url(#paint4_linear_61_609)"
				/>
				<path
					d="M103.106 84H55.5508V115.556H103.106V84Z"
					fill="url(#paint5_linear_61_609)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_609"
						x1="-0.00488281"
						y1="106.222"
						x2="47.5506"
						y2="106.222"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_609"
						x1="112.439"
						y1="53.3333"
						x2="159.995"
						y2="53.3333"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_609"
						x1="55.5508"
						y1="59.7777"
						x2="103.106"
						y2="59.7777"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_609"
						x1="-0.00488281"
						y1="66.4444"
						x2="47.5506"
						y2="66.4444"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_609"
						x1="112.439"
						y1="93.333"
						x2="159.995"
						y2="93.333"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_609"
						x1="55.5508"
						y1="99.7777"
						x2="103.106"
						y2="99.7777"
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
		var item = attributes.item;
		var masonryOptions = attributes.masonryOptions;
		var lightbox = attributes.lightbox;

		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();

		var [comboBlocksEditor, setcomboBlocksEditor] = useState({}); // Using the hook.
		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);

		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		useEffect(() => {
			loadMasonry();
		}, [childBlocks]);
		let isProFeature = applyFilters("isProFeature", true);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var itemSelector = blockClass + " .pg-masonry-wrap-item";
		// var masonryOptionsSelector = blockClass + " .pg-masonry-wrap-item";
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var icons = { bed: "", layout: "", smiley: "", columns: "", globe: "" };
		function loadMasonry() {
			// var elemX = document.querySelectorAll("." + blockId);
			var elemX = document.querySelector(blockClass);
			if (elemX != null) {
				// elemX.forEach((arg) => {
				imagesLoaded(elemX, function () {
					var msnry = new Masonry(elemX, masonryOptions);
				});
				// });
			}
		}
		useEffect(() => {
			setTimeout(() => {
				loadMasonry();
			}, 2000);
		}, [masonryOptions, blockId]);
		useEffect(() => {
			var numberOfColumns = masonryOptions.numberOfColumns;
			var gutter =
				parseInt(masonryOptions.gutter) * (parseInt(numberOfColumns) - 1);
			var clac = "calc((100% - " + gutter + "px)/" + numberOfColumns + ")";
			blockCssY.items[itemSelector] = {
				...blockCssY.items[itemSelector],
				width: { Desktop: clac },
			};
			setAttributes({ blockCssY: { items: blockCssY.items } });
			onChangeStyleItem("styles", clac, "width");
		}, [masonryOptions.numberOfColumns]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			setAttributes({ blockCssY: { items: blockCssY.items } });
			setTimeout(() => {
				loadMasonry();
			}, 2000);
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
			// loadMasonry();
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
				var blockCssY = attributes.blockCssY;
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
		function onChangeStyleGutter(sudoScource, newVal, attr) {
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
		var masonryOptionsArgs = {
			numberOfColumns: { label: "Number Of Columns", value: 3 },
			gutter: { label: "Gutter", value: 15 },
			itemSelector: { label: "Item Selector", value: ".pg-masonry-wrap-item" },
			columnWidth: { label: "Column Width", value: ".pg-masonry-wrap-item" },
			percentPosition: { label: "Percent Position", value: true },
			horizontalOrder: { label: "Horizontal Order", value: true },
			stamp: { label: "Stamp", value: ".stamp" },
			fitWidth: { label: "Fit Width", value: true },
			originLeft: { label: "Origin Left", value: true },
			originTop: { label: "Origin Top", value: true },
			stagger: { label: "Stagger", value: 30 },
			resize: { label: "Resize", value: true },
		};
		var RemoveMasonryArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var masonryOptionsX = { ...masonryOptions };
						delete masonryOptionsX[index];
						setAttributes({ masonryOptions: masonryOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};
		const ALLOWED_BLOCKS = [
			"combo-blocks/masonry-wrap-item",
			"combo-blocks/post-query",
			"combo-blocks/post-query-pagination",
			"combo-blocks/images",
			"combo-blocks/testimonials",
			"combo-blocks/team-members",
			"combo-blocks/terms-query",
			"combo-blocks/user-query",
		];
		const MY_TEMPLATE = [
			["combo-blocks/masonry-wrap-item", {}],
			["combo-blocks/masonry-wrap-item", {}],
			["combo-blocks/masonry-wrap-item", {}],
		];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		const addChild = () => {
			const slide = createBlock("combo-blocks/masonry-wrap-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);
			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							onClick={(ev) => {
								addChild();
								loadMasonry();
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
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
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
							title={__("Masonry", "combo-blocks")}
							initialOpen={true}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={masonryOptionsArgs}
									onChange={(option, index) => {
										var masonryOptionsX = { ...masonryOptions };
										masonryOptionsX[index] = option.value;
										setAttributes({ masonryOptions: masonryOptionsX });
									}}
									values=""></PGDropdown>
							</PanelRow>
							{Object.entries(masonryOptions).map((item, index) => {
								var id = item[0];
								var value = item[1];
								return (
									<div key={index}>
										{id == "itemSelector" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														Item Selector
													</label>
												</div>
												<InputControl
													value={masonryOptions.itemSelector}
													onChange={(newVal) => {
														setAttributes({
															masonryOptions: {
																...masonryOptions,
																itemSelector: newVal,
															},
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "gutter" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														Gutter
													</label>
												</div>
												<InputControl
													type="number"
													value={masonryOptions.gutter}
													onChange={(newVal) => {
														setAttributes({
															masonryOptions: {
																...masonryOptions,
																gutter: parseInt(newVal),
															},
														});
														onChangeStyleItem(
															"styles",
															parseInt(newVal) + "px",
															"marginBottom"
														);
													}}
												/>
											</PanelRow>
										)}
										{id == "columnWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														Column width
													</label>
												</div>
												<InputControl
													value={masonryOptions.columnWidth}
													onChange={(newVal) => {
														setAttributes({
															masonryOptions: {
																...masonryOptions,
																columnWidth: newVal,
															},
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "numberOfColumns" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														Number Of Columns
													</label>
												</div>
												<InputControl
													type="number"
													value={masonryOptions.numberOfColumns}
													onChange={(newVal) => {
														setAttributes({
															masonryOptions: {
																...masonryOptions,
																numberOfColumns: parseInt(newVal),
															},
														});
													}}
												/>
											</PanelRow>
										)}
										{id == "horizontalOrder" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Horizontal Order?"
														help={
															masonryOptions.horizontalOrder
																? "Horizontal Order Enabled"
																: "Horizontal Order Disabled"
														}
														checked={masonryOptions.horizontalOrder}
														onChange={(newHorizontalOrder) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																horizontalOrder: newHorizontalOrder,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "percentPosition" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Percent Position?"
														help={
															masonryOptions.percentPosition
																? "Percent Position Enabled"
																: "Percent Position Disabled"
														}
														checked={masonryOptions.percentPosition}
														onChange={(newPercentPosition) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																percentPosition: newPercentPosition,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "stamp" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														Stamp
													</label>
												</div>
											</PanelRow>
										)}
										{id == "fitWidth" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Fit Width?"
														help={
															masonryOptions.fitWidth
																? "Fit Width Enabled"
																: "Fit Width Disabled."
														}
														checked={masonryOptions.fitWidth}
														onChange={(fitWidth) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																fitWidth: fitWidth,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "originLeft" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Origin Left?"
														help={
															masonryOptions.originLeft
																? "Origin Left Enabled"
																: "Origin Left Disabled."
														}
														checked={masonryOptions.originLeft}
														onChange={(originLeft) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																originLeft: originLeft,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "originTop" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Origin Top?"
														help={
															masonryOptions.originTop
																? "Origin Top Enabled"
																: "Origin Top Disabled."
														}
														checked={masonryOptions.originTop}
														onChange={(originTop) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																originTop: originTop,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "stagger" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Stagger?"
														help={
															masonryOptions.stagger
																? "Stagger Enabled"
																: "Stagger Disabled."
														}
														checked={masonryOptions.stagger}
														onChange={(stagger) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																stagger: stagger,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
										{id == "resize" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveMasonryArg index={id} />
													<ToggleControl
														label="Resize?"
														help={
															masonryOptions.resize
																? "Resize Enabled"
																: "Resize Disabled."
														}
														checked={masonryOptions.resize}
														onChange={(resize) => {
															const updatedMasonryOptions = {
																...masonryOptions,
																resize: resize,
															};
															setAttributes({
																masonryOptions: updatedMasonryOptions,
															});
														}}
													/>
												</div>
											</PanelRow>
										)}
									</div>
								);
							})}
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Item", "combo-blocks")}
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
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												item,
												"item",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						{comboBlocksEditor?.addons?.enabled?.includes("lightbox") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Lightbox", "combo-blocks")}
									initialOpen={false}>
									<PGLightbox
										lightbox={lightbox}
										onChange={(prams) => {
											setAttributes({ lightbox: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}

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
													[
														"combo-blocks/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {},
															},
														},
													],
													[
														"combo-blocks/masonry-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "pg-masonry-wrap-item",
																},
																styles: {},
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
										blockName={"masonry-wrap"}
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
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
