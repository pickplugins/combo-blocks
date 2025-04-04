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
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, mediaAndText, settings } from "@wordpress/icons";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGFormFieldConditions from "../../components/form-field-conditions";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import metadata from "./block.json";


import PGcssClassPicker from "../../components/css-class-picker";
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
		var audio = attributes.audio;
		var triggersPlay = attributes.triggersPlay;
		var triggersPause = attributes.triggersPause;
		var triggersStop = attributes.triggersStop;
		var visible = attributes.visible;
		var conditions = attributes.conditions;

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
		var [comboBlocksEditor, setcomboBlocksEditor] = useState({}); // Using the hook.
		useEffect(() => {
			setcomboBlocksEditor(window.comboBlocksEditor);
		}, [window.comboBlocksEditor]);

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
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		var playTriggersList = {
			playOnLoad: {
				label: "Play On Load",
				args: { id: "playOnLoad", value: false },
			},
			playNScrollPercent: {
				label: "Play n scroll %",
				args: { id: "playNScrollPercent", value: "" },
			},
			playOnScrollElement: {
				label: "Play on scroll element",
				args: { id: "playOnScrollElement", value: "" },
			},
			playOnScrollEnd: {
				label: "Play on scroll end",
				args: { id: "playOnScrollEnd", value: false },
			},
			playOnMouseOver: {
				label: "Play Mouse over element",
				args: { id: "playOnMouseOver", value: false },
			},
			playOnMouseOut: {
				label: "Play mouse out element",
				args: { id: "playOnMouseOut", value: false },
			},
			playOnExit: {
				label: "Play on exit",
				args: { id: "playOnExit", value: false },
			},
		};
		var pauseTriggersList = {
			playNScrollPercent: {
				label: "Play n scroll %",
				args: { id: "playNScrollPercent", value: "" },
			},
			playOnScrollElement: {
				label: "Play on scroll element",
				args: { id: "playOnScrollElement", value: "" },
			},
			playOnScrollEnd: {
				label: "Play on scroll end",
				args: { id: "playOnScrollEnd", value: false },
			},
			playOnMouseOver: {
				label: "Play Mouse over element",
				args: { id: "playOnMouseOver", value: false },
			},
			playOnMouseOut: {
				label: "Play mouse out element",
				args: { id: "playOnMouseOut", value: false },
			},
			playOnExit: {
				label: "Play on exit",
				args: { id: "playOnExit", value: false },
			},
		};

		var RemoveSubmitTriggers = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var triggersPlayX = { ...triggersPlay };
							delete triggersPlayX[index];
							setAttributes({ triggersPlay: triggersPlayX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};

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

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Audio", "combo-blocks")}
							initialOpen={false}>
							<PanelRow>
								<ToggleControl
									label="Controls?"
									help={
										audio.options.controls
											? "Controls Enable"
											: "Controls disable"
									}
									checked={audio.options.controls ? true : false}
									onChange={(e) => {
										var options = {
											...audio.options,
											controls: audio.options.controls ? false : true,
										};
										setAttributes({
											audio: { ...audio, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Autoplay?"
									help={
										audio.options.autoplay
											? "Autoplay Enable"
											: "Autoplay disable"
									}
									checked={audio.options.autoplay ? true : false}
									onChange={(e) => {
										var options = {
											...audio.options,
											autoplay: audio.options.autoplay ? false : true,
										};
										setAttributes({
											audio: { ...audio, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Muted?"
									help={audio.options.muted ? "Muted Enable" : "Muted disable"}
									checked={audio.options.muted ? true : false}
									onChange={(e) => {
										var options = {
											...audio.options,
											muted: audio.options.muted ? false : true,
										};
										setAttributes({
											audio: { ...audio, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Loop?"
									help={audio.options.loop ? "Loop Enable" : "Loop disable"}
									checked={audio.options.loop ? true : false}
									onChange={(e) => {
										var options = {
											...audio.options,
											loop: audio.options.loop ? false : true,
										};
										setAttributes({
											audio: { ...audio, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Audio Source</label>
								<button
									className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	"
									onClick={() => {
										var sourcesX = audio.options.sources;
										sourcesX.push({ src: "", type: "" });
										var optionX = {
											...audio.options,
											sources: sourcesX,
										};
										setAttributes({
											audio: {
												...audio,
												options: optionX,
											},
										});
									}}>
									Add
								</button>
							</PanelRow>
							{audio.options.sources.length > 0 && (
								<div>
									{audio.options.sources.map((x, i) => (
										<PGtoggle
											className="font-medium text-slate-900 "
											title={`Source ${i + 1}`}
											initialOpen={false}
											key={i}>
											<PanelRow>
												<label htmlFor="">src</label>
												<InputControl
													type="text"
													value={x.src}
													onChange={(newVal) => {
														var sourcesX = [...audio.options.sources];
														sourcesX[i].src = newVal;
														var optionX = {
															...audio.options,
															sources: sourcesX,
														};
														setAttributes({
															audio: {
																...audio,
																options: optionX,
															},
														});
													}}
												/>
											</PanelRow>
											<PanelRow>
												<label htmlFor="">type</label>
												<SelectControl
													label=""
													value={x.type}
													options={[
														{
															label: __("Choose Position", "combo-blocks"),
															value: "",
														},
														{
															label: __("OGG", "combo-blocks"),
															value: "audio/ogg",
														},
														{
															label: __("MP3", "combo-blocks"),
															value: "audio/mpeg",
														},
														{
															label: __("WAV", "combo-blocks"),
															value: "audio/wav",
														},
														{
															label: __("AAC", "combo-blocks"),
															value: "audio/aac",
														},
														{
															label: __("MP4", "combo-blocks"),
															value: "audio/mp4",
														},
													]}
													onChange={(newVal) => {
														var sourcesX = [...audio.options.sources];
														sourcesX[i].type = newVal;
														var optionX = {
															...audio.options,
															sources: sourcesX,
														};
														setAttributes({
															audio: {
																...audio,
																options: optionX,
															},
														});
													}}
												/>
											</PanelRow>
										</PGtoggle>
									))}
								</div>
							)}
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Play Triggers", "combo-blocks")}
							initialOpen={false}>
							<label for="">Add Triggers</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle="Choose"
								options={playTriggersList}
								onChange={(option, index) => {
									var triggersPlayX = { ...triggersPlay };
									var index = Object.entries(triggersPlayX).length;
									triggersPlayX[index] = option.args;
									setAttributes({ triggersPlay: triggersPlayX });
									// var rulesX = [...triggersPlay.rules];
									// rulesX.push({ id: option.id, value: option.value });
									// setAttributes({ triggersPlay: { rules: rulesX } });
								}}
								values=""></PGDropdown>
							<div className="my-4">
								{Object.entries(triggersPlay).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveSubmitTriggers
													title={
														playTriggersList[id] == undefined
															? id
															: playTriggersList[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "playNScrollPercent" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Percent", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersPlayX = { ...triggersPlay };
																	triggersPlayX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersPlay: triggersPlayX,
																	});
																}}
															/>
														</div>
													</>
												)}
												{(id == "playOnLoad" ||
													id == "playOnScrollEnd" ||
													id == "playOnMouseOver" ||
													id == "playOnMouseOut" ||
													id == "playOnExit") && (
														<>No options for this condition</>
													)}

												{id == "playOnScrollElement" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element #ID or .Class", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersPlayX = { ...triggersPlay };
																	triggersPlayX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersPlay: triggersPlayX,
																	});
																}}
															/>
														</div>
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Pause Triggers", "combo-blocks")}
							initialOpen={false}>
							<label for="">Add Triggers</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle="Choose"
								options={pauseTriggersList}
								onChange={(option, index) => {
									var triggersPauseX = { ...triggersPause };
									var index = Object.entries(triggersPauseX).length;
									triggersPauseX[index] = option.args;
									setAttributes({ triggersPause: triggersPauseX });
								}}
								values=""></PGDropdown>
							<div className="my-4">
								{Object.entries(triggersPause).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveSubmitTriggers
													title={
														playTriggersList[id] == undefined
															? id
															: playTriggersList[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "playNScrollPercent" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Percent", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersPauseX = { ...triggersPause };
																	triggersPauseX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersPause: triggersPauseX,
																	});
																}}
															/>
														</div>
													</>
												)}
												{(id == "playOnScrollEnd" ||
													id == "playOnMouseOver" ||
													id == "playOnMouseOut" ||
													id == "playOnExit") && (
														<>No options for this condition</>
													)}

												{id == "playOnScrollElement" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element #ID or .Class", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersPauseX = { ...triggersPause };
																	triggersPauseX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersPause: triggersPauseX,
																	});
																}}
															/>
														</div>
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Stop Triggers", "combo-blocks")}
							initialOpen={false}>
							<label for="">Add Triggers</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle="Choose"
								options={pauseTriggersList}
								onChange={(option, index) => {
									var triggersStopX = { ...triggersStop };
									var index = Object.entries(triggersStopX).length;
									triggersStopX[index] = option.args;
									setAttributes({ triggersStop: triggersStopX });
								}}
								values=""></PGDropdown>
							<div className="my-4">
								{Object.entries(triggersStop).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveSubmitTriggers
													title={
														playTriggersList[id] == undefined
															? id
															: playTriggersList[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "playNScrollPercent" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Scroll Percent", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersStopX = { ...triggersStop };
																	triggersStopX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersStop: triggersStopX,
																	});
																}}
															/>
														</div>
													</>
												)}
												{(id == "playOnScrollEnd" ||
													id == "playOnMouseOver" ||
													id == "playOnMouseOut" ||
													id == "playOnExit") && (
														<>No options for this condition</>
													)}

												{id == "playOnScrollElement" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element #ID or .Class", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var triggersStopX = { ...triggersStop };
																	triggersStopX[groupIndex]["value"] = newVal;
																	setAttributes({
																		triggersStop: triggersStopX,
																	});
																}}
															/>
														</div>
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Conditions", "combo-blocks")}
							initialOpen={false}>
							<PGFormFieldConditions
								visible={conditions}
								onChange={(prams) => {
									setAttributes({ conditions: prams });
								}}
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
