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
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { brush, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
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
					d="M157.276 48.4749L82.6307 5.675C81.0383 4.775 78.9482 4.775 77.3557 5.675L2.71028 48.4749C0.122571 49.9749 -0.773174 53.175 0.719735 55.775C1.21737 56.675 1.91392 57.375 2.80966 57.875L77.4551 98.075C79.0476 98.875 80.9387 98.875 82.5311 98.075L157.177 57.875C159.764 56.475 160.759 53.275 159.366 50.675C158.868 49.775 158.172 48.9749 157.276 48.4749ZM80.0429 87.275L16.4451 53.075L80.0429 16.575L143.641 53.075L80.0429 87.275Z"
					fill="url(#paint0_linear_61_500)"
				/>
				<path
					d="M5.39746 115.675L77.5547 154.275C79.1472 155.075 81.0382 155.075 82.5311 154.275L154.688 115.675V103.575L80.0429 143.575L5.39746 103.575V115.675Z"
					fill="url(#paint1_linear_61_500)"
				/>
				<path
					d="M18.0375 93.0748L5.39754 85.9747L4.8999 73.6748L23.2128 83.8748L18.0375 93.0748Z"
					fill="url(#paint2_linear_61_500)"
				/>
				<path
					d="M34.2945 90.2918L29.2031 99.4614L51.2801 111.836L56.3715 102.667L34.2945 90.2918Z"
					fill="url(#paint3_linear_61_500)"
				/>
				<path
					d="M80.0428 127.875L62.2275 117.875L67.3033 108.675L80.0428 115.775L92.6827 108.675L97.7587 117.875L80.0428 127.875Z"
					fill="url(#paint4_linear_61_500)"
				/>
				<path
					d="M125.922 90.122L103.863 102.527L108.967 111.69L131.026 99.2843L125.922 90.122Z"
					fill="url(#paint5_linear_61_500)"
				/>
				<path
					d="M141.949 93.0751L136.873 83.875L154.688 73.875V85.975L141.949 93.0751Z"
					fill="url(#paint6_linear_61_500)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_500"
						x1="-0.00292969"
						y1="51.8375"
						x2="159.997"
						y2="51.8375"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_500"
						x1="5.39746"
						y1="129.225"
						x2="154.688"
						y2="129.225"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_500"
						x1="4.8999"
						y1="83.3748"
						x2="23.2128"
						y2="83.3748"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_500"
						x1="40.2416"
						y1="105.649"
						x2="45.3699"
						y2="96.4999"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_500"
						x1="62.2275"
						y1="118.275"
						x2="97.7587"
						y2="118.275"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_500"
						x1="106.415"
						y1="107.108"
						x2="128.524"
						y2="94.7925"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_500"
						x1="136.873"
						y1="83.475"
						x2="154.688"
						y2="83.475"
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
		const [isLoading, setisLoading] = useState(false);
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
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const MY_TEMPLATE = [["core/paragraph", {}]];
		const blockProps = useBlockProps({
			className: ` ${blockId} pg-layer`,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
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
											{__("CSS ID", "combo-blocks")}
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
				<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		return <InnerBlocks.Content />;
	},
});
