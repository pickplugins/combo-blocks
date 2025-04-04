import {
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
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, link, linkOff, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
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
					d="M36.8388 42H0V117.1H36.8388V42Z"
					fill="url(#paint0_linear_61_757)"
				/>
				<path
					d="M160 42H123.161V117.1H160V42Z"
					fill="url(#paint1_linear_61_757)"
				/>
				<path
					d="M110.915 42H49.1846V117.1H110.915V42Z"
					fill="#C15940"
					stroke="#8E240B"
					strokeWidth="2"
					strokeDasharray="6 6"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_757"
						x1="0"
						y1="79.55"
						x2="36.8388"
						y2="79.55"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_757"
						x1="123.161"
						y1="79.55"
						x2="160"
						y2="79.55"
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
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
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
		var flexWrapItemWrapperTagArgsBasic = {
			none: { label: __("Choose Tag", "combo-blocks"), value: "" },
			h1: { label: "H1", value: "h1" },
			h2: { label: "H2", value: "h2" },
			h3: { label: "H3", value: "h3" },
			h4: { label: "H4", value: "h4" },
			h5: { label: "H5", value: "h5" },
			h6: { label: "H6", value: "h6" },
			span: { label: "SPAN", value: "span" },
			div: { label: "DIV", value: "div" },
			p: { label: "P", value: "p" },
			a: { label: "A", value: "a", isPro: true },
		};
		let wrapperTagArgs = applyFilters(
			"comboBlocksFlexWrapItemTags",
			flexWrapItemWrapperTagArgsBasic
		);
		function setWrapperTag(option, index) {
			var options = { ...wrapper.options, tag: option.value };
			setAttributes({ wrapper: { ...wrapper, options: options } });
		}
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		function generateElementSudoCss(obj) {
			var stylesObj = {};
			Object.entries(obj).map((args) => {
				var sudoSrc = args[0];
				var sudoArgs = args[1];
				if (sudoSrc != "options") {
					var selector = myStore.getElementSelector(sudoSrc, wrapperSelector);
					Object.entries(args[1]).map((x) => {
						var attr = x[0];
						var cssPropty = myStore.cssAttrParse(attr);
						if (stylesObj[selector] == undefined) {
							stylesObj[selector] = {};
						}
						if (stylesObj[selector][cssPropty] == undefined) {
							stylesObj[selector][cssPropty] = {};
						}
						stylesObj[selector][cssPropty] = x[1];
					});
				}
			});
			var cssItems = { ...blockCssY.items };
			var cssItemsX = { ...cssItems, ...stylesObj };
			setAttributes({ blockCssY: { items: cssItemsX } });
		}
		useEffect(() => {
			//var elementCss = generateElementSudoCss(wrapper);
		}, [wrapper]);

		// useEffect(() => {
		// 	myStore.generateBlockCss(blockCssY.items, blockId);
		// }, [blockCssY]);
		const MY_TEMPLATE = [
			//['core/paragraph', { placeholder: '', content: 'Hello Text...' }],
		];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const CustomTag = `${wrapper.options.tag}`;
		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		// const ALLOWED_BLOCKS = ["combo-blocks/terms-query-item"];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			// allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		function setFieldLinkTo(option, index) {
			var options = { ...wrapper.options, linkTo: option.value };
			setAttributes({ wrapper: { ...wrapper, options: options } });
		}
		return (
			<>
				<InspectorControls className="">
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
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={wrapperTagArgs}
											buttonTitle={
												wrapper.options.tag.length == 0
													? __("Choose", "combo-blocks")
													: wrapperTagArgs[wrapper.options.tag].label
											}
											onChange={setWrapperTag}
											values={[]}></PGDropdown>
										{/* <SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose","combo-blocks"), value: "" },
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
										/> */}
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
						<CustomTag {...innerBlocksProps}>
							{innerBlocksProps.children}
						</CustomTag>
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
	},
});
