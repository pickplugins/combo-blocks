import {
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
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { brush, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
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
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M76.1669 11H1V148.964H76.1669V11Z"
					fill="#C15940"
					stroke="#8E240B"
					strokeWidth="2"
					strokeDasharray="6 6"
				/>
				<path
					d="M161 70.104V16C161 13.2386 158.761 11 156 11L90.8331 11C88.0717 11 85.8331 13.2386 85.8331 16V70.104C85.8331 72.8655 88.0717 75.104 90.8332 75.104H156C158.761 75.104 161 72.8655 161 70.104Z"
					fill="url(#paint0_linear_61_846)"
				/>
				<path
					d="M128.779 26.4624L115.292 45.7442L109.999 38.1051L94.9473 59.6419H151.932L128.779 26.4624Z"
					fill="#C15940"
				/>
				<path
					d="M161 143.964V89.8599C161 87.0984 158.761 84.8599 156 84.8599H90.8332C88.0717 84.8599 85.8332 87.0984 85.8332 89.8599V143.964C85.8332 146.725 88.0717 148.964 90.8332 148.964H156C158.761 148.964 161 146.725 161 143.964Z"
					fill="url(#paint1_linear_61_846)"
				/>
				<path
					d="M128.779 100.322L115.292 119.604L109.999 111.965L94.9473 133.548H151.932L128.779 100.322Z"
					fill="#C15940"
				/>
				<path
					d="M44.6824 60.8843L29.2163 83.0653L23.0944 74.2757L5.78711 99.1258H71.3337L44.6824 60.8843Z"
					fill="url(#paint2_linear_61_846)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_846"
						x1="123.417"
						y1="11"
						x2="123.417"
						y2="75.104"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_846"
						x1="123.417"
						y1="84.8599"
						x2="123.417"
						y2="148.964"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_846"
						x1="5.78711"
						y1="80.005"
						x2="71.3337"
						y2="80.005"
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
		var breakPointX = myStore.getBreakPoint();
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		useEffect(() => {
			// var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			//blockCssY.items = [];
			//blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'flex-grow': { "Desktop": "1" } };
			//blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'flex-basis': { "Desktop": "0" } };
			//setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		// useEffect(() => {
		// 	var blockCssObj = {};
		// 	blockCssObj[wrapperSelector] = wrapper;
		// 	var blockCssRules = myStore.getBlockCssRules(blockCssObj);
		// 	var items = blockCssRules;
		// 	setAttributes({ blockCssY: { items: items } });
		// }, [blockId]);
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
		const MY_TEMPLATE = [
			[
				"combo-blocks/image",
				{
					wrapper: {
						options: { tag: "div", class: "", useAsBackground: "no" },
						styles: {
							width: { Desktop: "100%" },
							height: { Desktop: "100%" },
							overflow: { Desktop: "hidden" },
						},
					},
					image: {
						options: {
							imgSrcType: "media",
							imgSrcMetaKey: "",
							imgSrcMetaKeyType: "ID",
							imgSrcImgId: "",
							srcUrl: "",
							srcId: "",
							linkTo: "",
							linkToMetaKey: "",
							linkTocustomUrl: "",
							altTextSrc: "imgAltText",
							altTextCustom: "",
							altTextMetaKey: "",
							titleTextSrc: "imgTitle",
							titleTextCustom: "",
							titleTextMetaKey: "",
							linkTarget: "_blank",
							linkAttr: [],
							class: "",
							size: { Desktop: "full", Tablet: "full", Mobile: "full" },
						},
						styles: {
							maxWidth: { Desktop: "100%" },
							height: { Desktop: "auto" },
							display: { Desktop: "block" },
						},
					},
					lightbox: { options: { enable: false, class: "" }, styles: {} },
				},
			],
		];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		//const isParentOfSelectedBlock = useSelect((select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true))
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
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
					</div>
				</InspectorControls>
				<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
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
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		return <InnerBlocks.Content />;
	},
});
