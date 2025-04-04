import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select, useDispatch, useSelect } from "@wordpress/data";
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
					d="M153.119 97.9785H8.14355V118.652H153.119V97.9785Z"
					fill="#C15940"
				/>
				<path
					d="M134.202 139.326H25.4707V160H134.202V139.326Z"
					fill="url(#paint0_linear_162_114)"
				/>
				<path
					d="M81.102 40.96L112.482 67.2901C108.055 72.5656 102.369 76.6397 95.9497 79.1355C89.5307 81.6314 82.586 82.4685 75.7577 81.5695C68.9295 80.6704 62.4381 78.0642 56.884 73.9919C51.3299 69.9195 46.8923 64.5125 43.9815 58.2709C41.0708 52.0292 39.7809 45.1544 40.2312 38.2822C40.6814 31.41 42.8573 24.7623 46.5575 18.9537C50.2578 13.1452 55.3629 8.36334 61.4009 5.05044C67.4389 1.73754 74.2148 0.000515169 81.102 0V40.96ZM84.8865 0V1.38908L87.1037 0.0623306C86.3647 1.52588e-07 85.6256 0 84.8865 0ZM91.4136 0.587687L84.8865 4.45217V7.84473L95.4296 1.58497C94.1096 1.18154 92.769 0.84864 91.4136 0.587687ZM98.6531 2.76925L84.8865 10.9791V14.3716L101.805 4.28299C100.782 3.72267 99.73 3.21737 98.6531 2.76925ZM104.352 5.85906L84.8865 17.4347V20.8273L106.872 7.73788C106.067 7.06639 105.226 6.43919 104.352 5.85906ZM108.938 9.60779L84.8954 23.9616V27.3542L110.95 11.7983C110.32 11.0322 109.648 10.301 108.938 9.60779ZM112.571 13.9353L84.8865 30.4529V33.8365L114.112 16.4018C113.643 15.5527 113.128 14.7294 112.571 13.9353ZM114.886 60.1845C118.934 55.3588 121.399 49.4048 121.947 43.1302C122.495 36.8557 121.099 30.5645 117.95 25.1103L117.059 23.5698L88.2792 40.1853L113.738 61.5557L114.886 60.1845ZM115.706 28.4939C117.899 32.9436 118.831 37.9095 118.399 42.8516C117.967 47.7937 116.189 52.5229 113.257 56.5248L94.459 40.7285L115.706 28.4939Z"
					fill="url(#paint1_linear_162_114)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_162_114"
						x1="25.4707"
						y1="149.663"
						x2="134.202"
						y2="149.663"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_162_114"
						x1="40.1436"
						y1="40.96"
						x2="122.064"
						y2="40.96"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	// transforms: {
	// 	from: [
	// 		{
	// 			type: "block",
	// 			blocks: ["core/quote"],
	// 			transform: (attributes, innerBlocks) => {
	// 				return createBlock(
	// 					"combo-blocks/layers",
	// 					{
	// 						wrapper: {
	// 							options: {
	// 								tag: "div",
	// 								class: "pg-layers",
	// 								id: "",
	// 								linkTo: "postUrl",
	// 								linkToAuthorMeta: "",
	// 								linkToCustomMeta: "",
	// 								linkTarget: "_blank",
	// 								customUrl: "",
	// 							},
	// 						},
	// 					},
	// 					innerBlocks
	// 				);
	// 			},
	// 		},
	// 		{
	// 			type: "block",
	// 			blocks: ["core/buttons"],
	// 			transform: (attributes, innerBlocks) => {
	// 				var innerBlockX = innerBlocks.map((item, index) => {
	// 					return {
	// 						clientId: item.clientId,
	// 						name: "combo-blocks/icon",
	// 						innerBlocks: [],
	// 						attributes: {
	// 							wrapper: {
	// 								options: {
	// 									tag: "div",
	// 									class: "pg-icon",
	// 									attr: [],
	// 								},
	// 							},
	// 							text: {
	// 								options: {
	// 									enable: true,
	// 									text: "Custom Text",
	// 									src: "",
	// 									linkTo: "",
	// 									linkToAuthorMeta: "",
	// 									linkToCustomMeta: "",
	// 									linkTarget: "_blank",
	// 									customUrl: "",
	// 									linkAttr: [],
	// 									class: "",
	// 								},
	// 							},
	// 							icon: {
	// 								options: {
	// 									enable: true,
	// 									library: "fontAwesome",
	// 									srcType: "class",
	// 									iconSrc: "fas fa-check-circle",
	// 									position: "beforeText",
	// 									class: "text-icon",
	// 								},
	// 							},
	// 							prefix: {
	// 								options: {
	// 									text: "",
	// 									class: "prefix",
	// 								},
	// 							},
	// 							postfix: {
	// 								options: {
	// 									text: "",
	// 									class: "postfix",
	// 								},
	// 							},
	// 							utmTracking: {
	// 								enable: false,
	// 								id: "",
	// 								source: "",
	// 								medium: "",
	// 								campaign: "",
	// 								term: "",
	// 								content: "",
	// 							},
	// 							blockId: "",
	// 							linkAttr: [],
	// 							blockCssY: {
	// 								items: {},
	// 							},
	// 						},
	// 					};
	// 				});
	// 				return createBlock(
	// 					"combo-blocks/layers",
	// 					{
	// 						wrapper: {
	// 							options: {
	// 								tag: "div",
	// 								class: "pg-layers",
	// 								id: "",
	// 								linkTo: "postUrl",
	// 								linkToAuthorMeta: "",
	// 								linkToCustomMeta: "",
	// 								linkTarget: "_blank",
	// 								customUrl: "",
	// 							},
	// 						},
	// 					},
	// 					innerBlockX
	// 				);
	// 			},
	// 		},
	// 		{
	// 			type: "block",
	// 			blocks: ["combo-blocks/layer"],
	// 			transform: (attributes, innerBlocks) => {
	// 				return createBlock(
	// 					"combo-blocks/layers",
	// 					{
	// 						wrapper: {
	// 							options: {
	// 								tag: "div",
	// 								class: "pg-layers",
	// 								id: "",
	// 								linkTo: "postUrl",
	// 								linkToAuthorMeta: "",
	// 								linkToCustomMeta: "",
	// 								linkTarget: "_blank",
	// 								customUrl: "",
	// 							},
	// 						},
	// 					},
	// 					innerBlocks
	// 				);
	// 			},
	// 		},
	// 	],
	// 	to: [
	// 		{
	// 			type: "block",
	// 			blocks: ["combo-blocks/grid-wrap"],
	// 			transform: (attributes, innerBlocks) => {
	// 				return createBlock(
	// 					"combo-blocks/grid-wrap",
	// 					{
	// 						wrapper: {
	// 							options: {
	// 								tag: "div",
	// 								class: "pg-grid-wrap",
	// 							},
	// 						},
	// 					},
	// 					innerBlocks
	// 				);
	// 			},
	// 		},
	// 	],
	// },
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
		const CustomTagWrapper = `${wrapper.options.tag}`;
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

			var className = wrapper.options.class;
			if (grandParentBlock != null) {
				if (grandParentBlock.name == "combo-blocks/content-slider") {
					className = " pg-content-slider-item splide__slide ";
				}
				var options = { ...wrapper.options, class: className };
				setAttributes({
					wrapper: { ...wrapper, options: options },
				});
			}
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);

		const grandParentClientId =
			select("core/block-editor").getBlockRootClientId(parentClientId);

		const grandParentBlock =
			select("core/block-editor").getBlock(grandParentClientId);

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
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose", "combo-blocks"), value: "" },
												{ label: "a", value: "a" },
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



					</div>
				</InspectorControls>
				<>
					{wrapper.options.tag == "a" && (
						<a
							{...innerBlocksProps}
							onClick={handleLinkClick}
							href={postUrl}
							target={wrapper.options.linkTarget}>
							{innerBlocksProps.children}
						</a>
					)}
					{wrapper.options.tag != "a" && (
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
		return <InnerBlocks.Content />;
		//return null;
	},
});
