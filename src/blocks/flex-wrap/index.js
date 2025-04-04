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
	Tooltip,
} from "@wordpress/components";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { brush, settings } from "@wordpress/icons";
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
					fill="url(#paint0_linear_61_756)"
				/>
				<path
					d="M160 42H123.161V117.1H160V42Z"
					fill="url(#paint1_linear_61_756)"
				/>
				<path
					d="M110.915 42H49.1846V117.1H110.915V42Z"
					fill="url(#paint2_linear_61_756)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_756"
						x1="0"
						y1="79.55"
						x2="36.8388"
						y2="79.55"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_756"
						x1="123.161"
						y1="79.55"
						x2="160"
						y2="79.55"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_756"
						x1="49.1846"
						y1="79.55"
						x2="110.915"
						y2="79.55"
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
					var innerBlockX = innerBlocks.map((item, index) => {
						var widthX = item.attributes.width;
						var backgroundColorX = item.attributes.backgroundColor;
						return {
							clientId: item.clientId,
							name:
								item.name == "core/column"
									? "combo-blocks/flex-wrap-item"
									: item.name,
							isValid: item.isValid,
							originalContent: "",
							validationIssues: [],
							attributes: {
								wrapper: {
									options: {
										tag: "div",
										class: "pg-flex-wrap-item",
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
						"combo-blocks/flex-wrap",
						{
							wrapper: {
								options: {
									tag: "div",
									class: "pg-flex-wrap",
								},
								styles: {
									display: {
										Desktop: "flex",
									},
									gap: {
										Desktop: "1em",
									},
								},
							},
							item: {
								options: {
									tag: "div",
									class: "pg-grid-wrap-item",
								},
								styles: {
									flexGrow: {
										Desktop: "1",
									},
								},
							},
						},
						innerBlockX
					);
				},
			},
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					if (attributes.layout.type == "flex") {
						var flexWrap = attributes.layout.flexWrap;
						return createBlock(
							"combo-blocks/flex-wrap",
							{
								wrapper: {
									options: {
										tag: "div",
										class: "pg-flex-wrap",
									},
									styles: {
										display: {
											Desktop: "flex",
										},
										gap: {
											Desktop: "1em",
										},
										flexDirection: {
											Desktop: flexWrap == undefined ? "column" : "row",
										},
									},
								},
								item: {
									options: {
										tag: "div",
										class: "pg-grid-wrap-item",
									},
									styles: {
										flexGrow: {
											Desktop: "1",
										},
									},
								},
							},
							innerBlocks
						);
					}
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/columns"],
				transform: (attributes, innerBlocks) => {
					var innerBlockX = innerBlocks.map((item, index) => {
						// var widthX = "";
						// widthX = item.attributes.wrapper?.styles.width.Desktop;
						return {
							clientId: item.clientId,
							name:
								item.name == "combo-blocks/flex-wrap-item"
									? "core/column"
									: item.name,
							isValid: item.isValid,
							originalContent: "",
							validationIssues: [],
							attributes: {
								// width: item.name == "combo-blocks/flex-wrap-item" ? widthX : "",
								blockId: "pgfaaa4b544973abc",
								blockCssY: {
									items: {},
								},
							},
							innerBlocks: item.innerBlocks,
						};
					});
					return createBlock("core/columns", {}, innerBlockX);
				},
			},
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					var direction = attributes.wrapper.styles?.flexDirection?.Desktop;
					if (direction == "column") {
						return createBlock(
							"core/group",
							{
								tagName: "div",
								layout: {
									type: "flex",
									orientation: "vertical",
								},
							},
							innerBlocks
						);
					} else {
						return createBlock(
							"core/group",
							{
								tagName: "div",
								layout: {
									type: "flex",
									flexWrap: "nowrap",
								},
							},
							innerBlocks
						);
					}
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
		var item = attributes.item;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var itemSelector = blockClass + " .pg-flex-wrap-item";
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			// blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'display': { "Desktop": "flex" } };
			//blockCssY.items[wrapperSelector] = { ...blockCssY.items[wrapperSelector], 'gap': { "Desktop": "1em" } };
			setAttributes({ blockCssY: { items: blockCssY.items } });
			//setAttributes({ wrapper: { ...wrapper, styles: { display: { Desktop: 'flex' }, gap: { Desktop: '20px' } } } });
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

		function applyFlex(attr, newVal) {
			onChangeStyleWrapper("styles", newVal, attr);
		}



		function onChangeStyleWrapper(sudoScource, newVal, attr) {
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

		}






		const ALLOWED_BLOCKS = [
			"combo-blocks/flex-wrap-item",
			"combo-blocks/terms-query",
		];
		const MY_TEMPLATE = [
			["combo-blocks/flex-wrap-item", {}],
			["combo-blocks/flex-wrap-item", {}],
			["combo-blocks/flex-wrap-item", {}],
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
			const slide = createBlock("combo-blocks/flex-wrap-item");
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
							// className="bg-gray-700 hover:bg-gray-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addChild();
							}}>
							{__("Add Item", "combo-blocks")}
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Flex Options"
							initialOpen={true}>
							<label
								htmlFor=""
								className="font-medium text-slate-900 block my-3">
								{__("Justify Content", "combo-blocks")}
							</label>
							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles.justifyContent[breakPointX] ==
											"flex-start"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "flex-start");
									}}>
									<Tooltip text="Flex Start">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="11.44"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="17.39"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px] ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.justifyContent[breakPointX] == "flex-end"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "flex-end");
									}}>
									<Tooltip text="Flex End">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="14.94"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="20.88"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.justifyContent[breakPointX] == "center"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "center");
									}}>
									<Tooltip text="Center">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="10.22"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="22.11"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.justifyContent[breakPointX] ==
											"space-between"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-between");
									}}>
									<Tooltip text="Space Between">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.justifyContent[breakPointX] ==
											"space-around"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-around");
									}}>
									<Tooltip text="Space Around">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="7.34"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.12"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="24.9"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.justifyContent == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.justifyContent[breakPointX] ==
											"space-evenly"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("justifyContent", "space-evenly");
									}}>
									<Tooltip text="Space Evenly">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="5.5"
												width="3.67"
												height="25"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>
							<label
								htmlFor=""
								className="font-medium text-slate-900 my-3 block">
								{__("Align Items", "combo-blocks")}
							</label>
							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.alignItems == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.alignItems[breakPointX] == "flex-start"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("alignItems", "flex-start");
									}}>
									<Tooltip text="Flex Start">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="5.5"
												width="3.67"
												height="8.88"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="16.42"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="5.5"
												width="3.67"
												height="12.5"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.alignItems == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.alignItems[breakPointX] == "flex-end"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("alignItems", "flex-end");
									}}>
									<Tooltip text="Flex End">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="21.62"
												width="3.67"
												height="8.88"
												transform="translate(50.08 52.12) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="14.08"
												width="3.67"
												height="16.42"
												transform="translate(36 44.58) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="18"
												width="3.67"
												height="12.5"
												transform="translate(21.92 48.5) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.alignItems == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.alignItems[breakPointX] == "center"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("alignItems", "center");
									}}>
									<Tooltip text="Center">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="13.56"
												width="3.67"
												height="8.88"
												transform="translate(50.08 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(36 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="13.56"
												width="3.67"
												height="8.88"
												transform="translate(21.92 36) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.alignItems == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.alignItems[breakPointX] == "stretch"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("alignItems", "stretch");
									}}>
									<Tooltip text="Stretch">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="23.2"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(50.08 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(36 36) rotate(180)"
											/>
											<rect
												fill="#fff"
												x="9.12"
												y="9.79"
												width="3.67"
												height="16.42"
												transform="translate(21.92 36) rotate(180)"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>
							<label
								htmlFor=""
								className="font-medium text-slate-900 my-3 block">
								{__("Flex Direction", "combo-blocks")}
							</label>
							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexDirection == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexDirection[breakPointX] == "row"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "row");
									}}>
									<Tooltip text="Row">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="5.5"
												y="9.52"
												width="3.67"
												height="16.42"
											/>
											<polygon
												fill="#fff"
												points="24.95 12.19 23.25 13.85 25.93 16.51 13.19 16.51 12.33 16.5 12.31 18.91 25.95 18.91 23.29 21.57 24.95 23.27 30.5 17.73 24.95 12.19"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexDirection == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexDirection[breakPointX] ==
											"row-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "row-reverse");
									}}>
									<Tooltip text="Row Reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="26.83"
												y="9.52"
												width="3.67"
												height="16.42"
												transform="translate(57.33 35.45) rotate(-180)"
											/>
											<polygon
												fill="#fff"
												points="11.05 12.19 12.75 13.85 10.07 16.51 22.81 16.51 23.67 16.5 23.69 18.91 10.04 18.91 12.71 21.57 11.05 23.27 5.5 17.73 11.05 12.19"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexDirection == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexDirection[breakPointX] == "column"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "column");
									}}>
									<Tooltip text="Column">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="20.45"
												width="3.67"
												height="16.42"
												transform="translate(-10.66 46.66) rotate(-90)"
											/>
											<polygon
												fill="#fff"
												points="23.54 11.05 21.88 12.75 19.21 10.07 19.21 22.81 19.22 23.67 16.82 23.69 16.81 10.04 14.16 12.71 12.46 11.05 18 5.5 23.54 11.05"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexDirection == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexDirection[breakPointX] ==
											"column-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexDirection", "column-reverse");
									}}>
									<Tooltip text="Column-reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="5.5"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="-0.87"
												width="3.67"
												height="16.42"
												transform="translate(25.34 -10.66) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="12.46 24.95 14.13 23.25 16.79 25.93 16.79 13.19 16.78 12.33 19.18 12.31 19.19 25.95 21.84 23.29 23.54 24.95 18 30.5 12.46 24.95"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>
							<label
								htmlFor=""
								className="font-medium text-slate-900 my-3 block">
								{__("Flex Wrap", "combo-blocks")}
							</label>
							<div className="!grid !grid-cols-4 place-items-center gap-3">
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexWrap == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexWrap[breakPointX] == "wrap"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "wrap");
									}}>
									<Tooltip text="Wrap">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="1.95"
												width="3.67"
												height="25"
												transform="translate(32.45 -3.55) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="16.79 18.15 15.81 19.11 17.35 20.65 6.01 20.65 5.51 20.64 5.5 22.03 17.37 22.03 15.83 23.56 16.79 24.54 19.99 21.35 16.79 18.15"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexWrap == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexWrap[breakPointX] == "wrap-reverse"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "wrap-reverse");
									}}>
									<Tooltip text="Wrap-reverse">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="10.21"
												width="3.67"
												height="25"
												transform="translate(40.71 4.71) rotate(90)"
											/>
											<polygon
												fill="#fff"
												points="8.7 19.01 9.68 18.05 8.14 16.51 19.48 16.51 19.98 16.51 19.99 15.13 8.12 15.12 9.66 13.6 8.7 12.61 5.5 15.81 8.7 19.01"
											/>
										</svg>
									</Tooltip>
								</div>
								<div
									className={`hover:bg-[#3737c7] cursor-pointer h-[50px] w-[50px]  ${wrapper.styles?.flexWrap == undefined
										? "bg-[#5655ff]"
										: wrapper.styles?.flexWrap[breakPointX] == "nowrap"
											? "bg-[#1f1f8b]"
											: "bg-[#5655ff]"
										}`}
									onClick={(ev) => {
										applyFlex("flexWrap", "nowrap");
									}}>
									<Tooltip text="No-wrap">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
											<rect
												fill="#5655ff"
												x="5.5"
												y="6.08"
												width="25"
												height="25"
											/>
											<rect
												fill="#fff"
												x="16.16"
												y="5.5"
												width="3.67"
												height="25"
												transform="translate(36) rotate(90)"
											/>
										</svg>
									</Tooltip>
								</div>
							</div>
						</PGtoggle>
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
														"combo-blocks/flex-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "flex-item-wrap",
																},
																styles: {
																	flexBasis: { Desktop: "0" },
																	flexGrow: { Desktop: "1" },
																},
															},
														},
													],
													[
														"combo-blocks/flex-wrap-item",
														{
															wrapper: {
																options: {
																	tag: "div",
																	class: "flex-item-wrap",
																},
																styles: {
																	flexBasis: { Desktop: "0" },
																	flexGrow: { Desktop: "1" },
																},
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
										blockName={"flex-wrap"}
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
		//return null;
	},
});
