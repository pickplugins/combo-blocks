import { registerBlockType } from "@wordpress/blocks";
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
	Placeholder,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import { applyFilters } from "@wordpress/hooks";
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const { RawHTML } = wp.element;
import { store } from "../../store";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	more,
	brush,
	mediaAndText,
} from "@wordpress/icons";

import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";

import PGStyles from "../../components/styles";
import PGIconPicker from "../../components/icon-picker";
import PGCssLibrary from "../../components/css-library";
import PGtoggle from "../../components/toggle";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGDropdown from "../../components/dropdown";

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

		var blockCssY = attributes.blockCssY;

		var postId = context["postId"];
		var postType = context["postType"];
		var visible = attributes.visible;

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
			postUrl: { label: __("Post URL", "post-grid"), value: "postUrl" },
			homeUrl: { label: __("Home URL", "post-grid"), value: "homeUrl" },
			authorUrl: { label: __("Author URL", "post-grid"), value: "authorUrl" },
			authorLink: {
				label: __("Author Link", "post-grid"),
				value: "authorLink",
			},
			authorMail: {
				label: __("Author Mail", "post-grid"),
				value: "authorMail",
				isPro: true,
			},
			authorMeta: {
				label: __("Author Meta", "post-grid"),
				value: "authorMeta",
				isPro: true,
			},
			customField: {
				label: __("Custom Field", "post-grid"),
				value: "customField",
				isPro: true,
			},
			customUrl: {
				label: __("Custom URL", "post-grid"),
				value: "customUrl",
				isPro: true,
			},
		};

		let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);

		var flexWrapItemWrapperTagArgsBasic = {
			none: { label: __("Choose Tag", "post-grid"), value: "" },
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
			"postGridFlexWrapItemTags",
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
			var elementCss = generateElementSudoCss(wrapper);
		}, [wrapper]);

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

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		const MY_TEMPLATE = [
			//['core/paragraph', { placeholder: '', content: 'Hello Text...' }],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});

		const CustomTag = `${wrapper.options.tag}`;

		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		// const ALLOWED_BLOCKS = ["post-grid/terms-query-item"];

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
							title={__("Wrapper", "post-grid")}
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "post-grid")}
										</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={wrapperTagArgs}
											buttonTitle={
												wrapper.options.tag.length == 0
													? __("Choose", "post-grid")
													: wrapperTagArgs[wrapper.options.tag].label
											}
											onChange={setWrapperTag}
											values={[]}></PGDropdown>

										{/* <SelectControl
											label=""
											value={wrapper.options.tag}
											options={[
												{ label: __("Choose","post-grid"), value: "" },
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
													{__("Link To", "post-grid")}
												</label>

												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={linkToArgs}
													buttonTitle={
														wrapper.options.linkTo == undefined
															? __("Choose", "post-grid")
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
														{__("Author Meta Key", "post-grid")}
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
														{__("Custom Meta Key", "post-grid")}
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
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Url", "post-grid")}
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
																			wrapper: { ...wrapper, options: options },
																		});
																	}}
																/>

																<div className="p-2">
																	<span className="font-bold">Linked to:</span>{" "}
																	{wrapper.options.customUrl.length != 0
																		? wrapper.options.customUrl
																		: __("No link", "post-grid")}{" "}
																</div>
															</Popover>
														)}
													</div>
												</PanelRow>
											)}

											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link Target", "post-grid")}
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
										onChange={onChangeStyleWrapper}
										onAdd={onAddStyleWrapper}
										onRemove={onRemoveStyleWrapper}
										onBulkAdd={onBulkAddWrapper}
										onReset={onResetWrapper}
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
		var wrapper = attributes.wrapper;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class}`,
		});

		return <InnerBlocks.Content />;
	},
});
