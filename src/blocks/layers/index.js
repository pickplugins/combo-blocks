import {
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
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, link, linkOff, mediaAndText, settings } from "@wordpress/icons";
// import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGFormFieldConditions from "../../components/form-field-conditions";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import metadata from "./block.json";

import PGAnimateOn from "../../components/animate-on";
import PGcssClassPicker from "../../components/css-class-picker";
import PGTilt from "../../components/tilt";
import PGTooltip from "../../components/tooltip";
import PGTypingTextOn from "../../components/typing-text";
import customTags from "../../custom-tags";
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
					d="M157.275 48.4749L82.63 5.675C81.0376 4.775 78.9477 4.775 77.3552 5.675L2.70979 48.4749C0.122083 49.9749 -0.773663 53.175 0.719246 55.775C1.21688 56.675 1.91343 57.375 2.80917 57.875L77.4546 98.075C79.0471 98.875 80.9382 98.875 82.5306 98.075L157.176 57.875C159.764 56.475 160.759 53.275 159.366 50.675C158.868 49.775 158.072 48.9749 157.275 48.4749ZM79.9428 87.275L16.345 53.075L79.9428 16.575L143.541 53.075L79.9428 87.275Z"
					fill="url(#paint0_linear_61_513)"
				/>
				<path
					d="M82.5306 126.175L154.588 86.3748V74.1748L79.9428 115.375L5.29736 74.1748V86.3748L77.3553 126.175C79.0472 127.075 80.9382 127.075 82.5306 126.175Z"
					fill="url(#paint1_linear_61_513)"
				/>
				<path
					d="M5.29736 115.675L77.4546 154.275C79.0471 155.075 80.9381 155.075 82.431 154.275L154.588 115.675V103.575L79.9428 143.575L5.29736 103.575V115.675Z"
					fill="url(#paint2_linear_61_513)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_513"
						x1="-0.00341797"
						y1="51.8375"
						x2="159.997"
						y2="51.8375"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_513"
						x1="5.29736"
						y1="100.512"
						x2="154.588"
						y2="100.512"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_513"
						x1="5.29736"
						y1="129.225"
						x2="154.588"
						y2="129.225"
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
						"combo-blocks/layers",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-layers",
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
						"combo-blocks/layers",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-layers",
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
						"combo-blocks/layers",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-layers",
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
			{
				type: "block",
				blocks: ["combo-blocks/info-box-item"],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						"combo-blocks/info-box-item",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-info-box-item",
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
		var animateOn = attributes.animateOn;
		var tilt = attributes.tilt;
		var tooltip = attributes.tooltip;
		var typingText = attributes.typingText;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var conditions = attributes.conditions;

		var item = attributes.item;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];

		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		var [comboBlocksEditor, setcomboBlocksEditor] = useState({}); // Using the hook.

		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);


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
		var itemSelector = blockClass + " .pg-layer";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			console.log(blockIdX);

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			console.log(blockId);

			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);




		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
			console.log(blockCssY);

		}, [blockCssY]);

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
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
													onChange={(option, index) => {
														var options = { ...wrapper.options, linkTo: option.value };
														setAttributes({ wrapper: { ...wrapper, options: options } });
													}}
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
									{/* <PGCssLibrary
										blockId={blockId}
										obj={wrapper}
										onChange={onPickCssLibraryLayers}
									/> */}
								</PGtab>
							</PGtabs>
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
						{/* testing */}

						{/* {comboBlocksEditor?.addons?.enabled?.includes("animateOn") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Animate On", "combo-blocks")}
									initialOpen={false}>
									<PGAnimateOn
										animateOn={animateOn}
										onChange={(prams) => {
											setAttributes({ animateOn: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
						{comboBlocksEditor?.addons?.enabled?.includes("tilt") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Tilt", "combo-blocks")}
									initialOpen={false}>
									<PGTilt
										tilt={tilt}
										onChange={(prams) => {
											setAttributes({ tilt: prams });
										}}
									/>
								</PGtoggle>
							</>
						)} */}

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Conditions", "combo-blocks")}
							initialOpen={false}>
							<PGFormFieldConditions
								visible={conditions}
								onChange={(prams) => {
									setAttributes({ conditions: prams });
								}}
							/>
						</PGtoggle> */}

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Visibility", "combo-blocks")}
							initialOpen={false}>
							<PGVisible
								visible={visible}
								onChange={(prams) => {
									setAttributes({ visible: prams });
								}}
							/>
						</PGtoggle> */}
					</div>
				</InspectorControls>
				<>



					{wrapper.options.tag == "a" && (
						<a
							{...innerBlocksProps}
							onClick={ev => {
								ev.stopPropagation();
								ev.preventDefault();
								return false;
							}}
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
		var blockId = attributes.blockId;
		var wrapper = attributes.wrapper;

		// const blockProps = useBlockProps.save({
		// 	className: ` ${blockId} ${wrapper.options.class}`,
		// });
		// const innerBlocksProps = useInnerBlocksProps.save(blockProps);

		// return (
		// 	<div {...innerBlocksProps} />
		// );
		return <InnerBlocks.Content />;

		//return <InnerBlocks.Content />;
		//return null;
	},
});
