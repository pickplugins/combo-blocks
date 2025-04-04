import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { createBlock, registerBlockType } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { dispatch, select, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, link, linkOff, mediaAndText, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
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
					d="M4.5 155.5V4.5H155.5V155.5H4.5Z"
					stroke="url(#paint0_linear_162_90)"
					strokeWidth="9"
				/>
				<rect y="52" width="160" height="9" fill="url(#paint1_linear_162_90)" />
				<rect
					y="104"
					width="160"
					height="9"
					fill="url(#paint2_linear_162_90)"
				/>
				<rect
					x="57"
					width="160"
					height="9"
					transform="rotate(90 57 0)"
					fill="url(#paint3_linear_162_90)"
				/>
				<rect
					x="109"
					width="160"
					height="9"
					transform="rotate(90 109 0)"
					fill="url(#paint4_linear_162_90)"
				/>
				<rect
					x="4.5"
					y="56.5"
					width="151"
					height="52"
					stroke="#995B43"
					strokeWidth="9"
					strokeDasharray="10 10"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_162_90"
						x1="0"
						y1="80"
						x2="160"
						y2="80"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC8161" />
						<stop offset="1" stopColor="#FE9A45" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_162_90"
						x1="0"
						y1="56.5"
						x2="160"
						y2="56.5"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_162_90"
						x1="0"
						y1="108.5"
						x2="160"
						y2="108.5"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_162_90"
						x1="57"
						y1="4.5"
						x2="217"
						y2="4.49999"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_162_90"
						x1="109"
						y1="4.5"
						x2="269"
						y2="4.49999"
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
				blocks: ["core/quote"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/table-tr",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table-tr",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlocks
					);
				},
			},
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (attributes, innerBlocks) => {
					var innerBlockX = innerBlocks.map((item, index) => {
						return {
							clientId: item.clientId,
							name: "combo-blocks/icon",
							innerBlocks: [],
							attributes: {
								wrapper: {
									options: {
										tag: "div",
										class: "pg-icon",
										attr: [],
									},
								},
								text: {
									options: {
										enable: true,
										text: "Custom Text",
										src: "",
										linkTo: "",
										linkToAuthorMeta: "",
										linkToCustomMeta: "",
										linkTarget: "_blank",
										customUrl: "",
										linkAttr: [],
										class: "",
									},
								},
								icon: {
									options: {
										enable: true,
										library: "fontAwesome",
										srcType: "class",
										iconSrc: "fas fa-check-circle",
										position: "beforeText",
										class: "text-icon",
									},
								},
								prefix: {
									options: {
										text: "",
										class: "prefix",
									},
								},
								postfix: {
									options: {
										text: "",
										class: "postfix",
									},
								},
								utmTracking: {
									enable: false,
									id: "",
									source: "",
									medium: "",
									campaign: "",
									term: "",
									content: "",
								},
								blockId: "",
								linkAttr: [],
								blockCssY: {
									items: {},
								},
							},
						};
					});
					return createBlock(
						"combo-blocks/table-tr",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table-tr",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlockX
					);
				},
			},
			{
				type: "block",
				blocks: ["combo-blocks/layer"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/table-tr",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-table-tr",
									id: "",
									linkTo: "postUrl",
									linkToAuthorMeta: "",
									linkToCustomMeta: "",
									linkTarget: "_blank",
									customUrl: "",
								},
							},
						},
						innerBlocks
					);
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["combo-blocks/grid-wrap"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/grid-wrap",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-grid-wrap",
								},
							},
						},
						innerBlocks
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
		var visible = attributes.visible;
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
		const selectedBlock = useSelect((select) =>
			select("core/block-editor").getSelectedBlock()
		);
		const duplicate = () => {
			const parentClientId =
				select("core/block-editor").getBlockRootClientId(clientId);
			const position =
				select("core/editor").getBlockInsertionPoint(parentClientId);
			var serelized = wp.blocks.serialize(selectedBlock);
			wp.data
				.dispatch("core/block-editor")
				.insertBlocks(
					wp.blocks.parse(serelized),
					position.index,
					position.rootClientId
				);
		};
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
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
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
		function onPickCssLibraryLayers(args) {
			var textX = Object.assign({}, wrapper);
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				textX[sudoScource] = sudoScourceArgs;
			});
			setAttributes({ wrapper: textX });
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
			var blockCssYX = { ...blockCssY };
			var items = { ...blockCssYX.items };
			var cssItems = Object.assign(items, styleObj);
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
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		const ALLOWED_BLOCKS = ["combo-blocks/table-tr"];
		const MY_TEMPLATE = [
			["combo-blocks/table-td", {}],
			["combo-blocks/table-td", {}],
		];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			directInsert: true,
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
			const slide = createBlock("combo-blocks/table-td", {});
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
							}}>
							{__("Add Column", "combo-blocks")}
						</div>
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							onClick={(ev) => {
								duplicate();
							}}>
							{__("Duplicate Row", "combo-blocks")}
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
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
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
										onChange={onPickCssLibraryLayers}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle> */}

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
					<tr {...innerBlocksProps}>{innerBlocksProps.children}</tr>
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
