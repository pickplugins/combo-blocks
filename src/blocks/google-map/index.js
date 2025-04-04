import {
	InnerBlocks,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	RichText,
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
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
import { useCallback, useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	copy,
	Icon,
	link,
	linkOff,
	mediaAndText,
	menu,
	pages,
	settings,
} from "@wordpress/icons";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGcssOpenaiPrompts from "../../components/openai-prompts";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import metadata from "./block.json";


import { ReactSortable } from "react-sortablejs";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
// import {
// 	APIProvider,
// 	Map,
// 	Marker,
// 	AdvancedMarker,
// 	Pin,
// 	InfoWindow,
// 	useAdvancedMarkerRef,
// } from "@vis.gl/react-google-maps";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import {
	Circle,
	GoogleMap,
	GoogleMapApiLoader,
	InfoWindow,
	Marker,
	Polygon,
	Polyline,
	Rectangle,
} from "react-google-map-wrapper";
import PGColorPicker from "../../components/input-color-picker";

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
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_513"
						x1="5.29736"
						y1="100.512"
						x2="154.588"
						y2="100.512"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_513"
						x1="5.29736"
						y1="129.225"
						x2="154.588"
						y2="129.225"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
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
		var layers = attributes.layers;
		var mapSettings = attributes.mapSettings;
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
		var [markers, setmarkers] = useState([]);
		var [rectangles, setrectangles] = useState([]);
		var [infoWindows, setinfoWindows] = useState([]);
		var [polylineSets, setpolylineSets] = useState([]);
		var [polygonSets, setpolygonSets] = useState([]);
		var [circles, setcircles] = useState([]);

		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		var formattedPrompt =
			"Respond only with json array useing following format {lat: '',lng: '',title: '',description: '',marker: {pin:{background: ',borderColor: '',glyphColor: '',}}, } and no other text. Do not include any explanations, introductions, or concluding remarks.";
		var formattedPromptCircle =
			"Respond only with json array useing following format {lat: '',lng: '' } and no other text. Do not include any explanations, introductions, or concluding remarks.";

		useEffect(() => {
			console.log(layers);

			var markersX = [];
			var polylineSetsX = [];
			var polygonSetX = [];
			var circlesX = [];
			var rectangleX = [];
			var infoWindowX = [];

			layers.map((layer, layerIndex) => {
				var id = layer.id;
				var label = layer.label;
				var collections = layer.collections;
				console.log(collections);

				if (id == "marker") {
					collections.map((collection) => {
						var lat = parseFloat(collection.lat);
						var lng = parseFloat(collection.lng);
						var title = collection.title;
						var description = collection.description;
						markersX.push({
							lat: lat,
							lng: lng,
							title: title,
							description: description,
						});
					});
				}
				if (id == "markerInfoWindow") {
					collections.map((collection) => {
						var lat = parseFloat(collection.lat);
						var lng = parseFloat(collection.lng);
						var title = collection.title;
						var description = collection.description;
						infoWindowX.push({
							lat: lat,
							lng: lng,
							title: title,
							description: description,
						});
					});
				}
				if (id == "rectangle") {
					collections.map((collection) => {
						var bounds = collection.bounds;
						rectangleX.push(bounds);
					});
				}
				if (id == "polyline") {
					collections.map((collection) => {
						var lat = parseFloat(collection.lat);
						var lng = parseFloat(collection.lng);
						if (polylineSetsX[layerIndex] == undefined) {
							polylineSetsX[layerIndex] = [];
						}

						polylineSetsX[layerIndex].push({ lat: lat, lng: lng });
					});
				}
				if (id == "polygon") {
					collections.map((collection) => {
						var lat = parseFloat(collection.lat);
						var lng = parseFloat(collection.lng);
						if (polygonSetX[layerIndex] == undefined) {
							polygonSetX[layerIndex] = [];
						}

						polygonSetX[layerIndex].push({ lat: lat, lng: lng });
					});
				}

				if (id == "circle") {
					collections.map((collection) => {
						var lat = parseFloat(collection.center.lat);
						var lng = parseFloat(collection.center.lng);
						var radius = parseFloat(collection.radius);
						var strokeColor = collection.strokeColor;
						var strokeOpacity = collection.strokeOpacity;
						var strokeWeight = collection.strokeWeight;
						var fillColor = collection.fillColor;
						var fillOpacity = collection.fillOpacity;
						var center = { lat: lat, lng: lng };

						circlesX.push({ center: center, radius: radius });
					});
				}
			});

			setmarkers(markersX);
			setrectangles(rectangleX);
			setinfoWindows(infoWindowX);
			setpolylineSets(polylineSetsX);
			setpolygonSets(polygonSetX);
			setcircles(circlesX);
		}, [layers]);

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

		var layerElements = {
			marker: {
				id: "marker",
				label: __("Marker", "combo-blocks"),
				collections: [],
				options: {},
			},
			markerInfoWindow: {
				id: "markerInfoWindow",
				label: __("Marker & InfoWindow", "combo-blocks"),
				collections: [],
				options: {},
			},

			polyline: {
				id: "polyline",
				label: __("Polyline", "post - grid"),
				collections: [],
				options: {},
			},
			polygon: {
				id: "polygon",
				label: __("Polygon", "post - grid"),
				collections: [],
				options: {},
			},

			circle: {
				id: "circle",
				label: __("Circle", "post - grid"),
				collections: [],
				options: {},
			},
			rectangle: {
				id: "rectangle",
				label: __("Rectangle", "post - grid"),
				collections: [],
				options: {},
			},
		};

		function addLayer(option, index) {
			var layersX = [...layers];
			layersX.push(option);

			setAttributes({ layers: layersX });
		}

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
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			directInsert: true,
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		useEffect(() => { }, [mapSettings]);
		const ALLOWED_MEDIA_TYPES = ["image"];
		const MarkerWithInfoWindow = ({ position, item }) => {
			// `markerRef` and `marker` are needed to establish the connection between
			// the marker and infowindow (if you're using the Marker component, you
			// can use the `useMarkerRef` hook instead).
			const [markerRef, marker] = useAdvancedMarkerRef();
			const [infoWindowShown, setInfoWindowShown] = useState(false);
			// clicking the marker will toggle the infowindow
			const handleMarkerClick = useCallback(
				() => setInfoWindowShown((isShown) => !isShown),
				[]
			);
			// if the maps api closes the infowindow, we have to synchronize our state
			const handleClose = useCallback(() => setInfoWindowShown(false), []);
			return (
				<>
					<AdvancedMarker
						ref={markerRef}
						position={position}
						onClick={handleMarkerClick}
					/>
					{infoWindowShown && (
						<InfoWindow anchor={marker} onClose={handleClose}>
							<h2 className="title">{item.title}</h2>
							<p className="desc">{item.description}</p>
						</InfoWindow>
					)}
				</>
			);
		};
		const Content = ({ item }) => {
			console.log(item);
			return (
				<>
					<h2 className="title">{item.title}</h2>
					<p className="desc">{item.description}</p>
				</>
			);
		};
		const copyData = (data) => {
			const dataString = JSON.stringify(data, null, 2);
			navigator.clipboard
				.writeText(dataString)
				.then(() => {
					// alert("Data copied to clipboard!");
				})
				.catch((err) => { });
		};
		const pasteData = () => {
			navigator.clipboard
				.readText()
				.then((text) => {
					const parsedData = JSON.parse(text);
					setAttributes({ layers: parsedData });
				})
				.catch((err) => { });
		};
		const [open, setOpen] = useState(-1);
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
										<label for="" className="font-medium text-slate-900 ">
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
										<label for="" className="font-medium text-slate-900 ">
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
										<label for="" className="font-medium text-slate-900 ">
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
												<label for="" className="font-medium text-slate-900 ">
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
													<label for="" className="font-medium text-slate-900 ">
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
													<label for="" className="font-medium text-slate-900 ">
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
															for=""
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
												<label for="" className="font-medium text-slate-900 ">
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
						<PGtoggle title="Layers" initialOpen={true}>
							<div className="flex gap-2 items-center">
								<div className="my-3">
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={layerElements}
										buttonTitle="Add Layer"
										onChange={addLayer}
										values=""></PGDropdown>
								</div>
								{layers.length > 0 && (
									<div
										className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
										onClick={() => {
											open;
											copyData(layers);
										}}>
										<Icon icon={copy} className="fill-white " size={24} />
									</div>
								)}
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={(ev) => {
										pasteData();
									}}>
									<Icon icon={pages} className="fill-white " size={24} />
								</div>
							</div>

							<ReactSortable
								list={layers}
								handle={".handle"}
								setList={(item) => {
									setAttributes({
										layers: item,
									});
								}}>
								{layers.map((layer, layerIndex) => {
									// console.log(layer);
									return (
										<div key={layer.id} className="">
											<PGtoggle
												title={
													<>
														<span
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																var layersX = [...layers];

																layersX.splice(layerIndex, 1);

																setAttributes({
																	layers: layersX,
																});
															}}>
															<Icon icon={close} />
														</span>
														<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
															<Icon icon={menu} />
														</span>
														<span className="mx-2">{layer.label}</span>
													</>
												}
												initialOpen={false}>
												{layer.id == "marker" && (
													<>
														<div className="flex gap-2 items-center my-3">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 text-nowrap"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		lat: "53.54992",
																		lng: "10.00678",
																		title: "",
																		description: "",
																		marker: {
																			image: {
																				id: "",
																				src: "",
																				width: "",
																				height: "",
																			},
																			pin: {
																				background: "",
																				borderColor: "",
																				glyphColor: "",
																			},
																		},
																	});

																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
															<div className="relative 	">
																<div
																	className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
																	onClick={(ev) => {
																		ev.preventDefault();
																		ev.stopPropagation();
																		setAIWriter(!AIWriter);
																	}}>
																	AI
																</div>
																{AIWriter && (
																	<Popover position="bottom right">
																		<div className="w-[800px] p-3">
																			<PGcssOpenaiPrompts
																				value={""}
																				formattedPrompt={formattedPrompt}
																				promptsAgs={{
																					action: "write",
																					aiModel: "gpt-4-turbo",
																					objective: "findLatLong",
																				}}
																				autoUpdate={AIautoUpdate}
																				onResponseLoaded={(
																					value,
																					autoUpdate
																				) => { }}
																				clickHandle={(value, action) => {
																					var items = [];
																					var locationsArr = JSON.parse(value);
																					locationsArr.map((item) => {
																						items.push({
																							lat: item.lat,
																							lng: item.lng,
																							title: item.title,
																							description: item.description,
																							marker: {
																								image: {
																									id: "",
																									src: "",
																									width: "",
																									height: "",
																								},
																								pin: {
																									background:
																										item.marker.pin.background,
																									borderColor:
																										item.marker.pin.borderColor,
																									glyphColor:
																										item.marker.pin.glyphColor,
																								},
																							},
																						});
																					});

																					if (action == "replace") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections =
																							items;
																						setAttributes({ layers: layersX });
																					}

																					if (action == "prepend") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...items,
																							...layersX[layerIndex]
																								.collections,
																						];

																						setAttributes({ layers: layersX });
																					}

																					if (action == "append") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...layersX[layerIndex]
																								.collections,
																							...items,
																						];
																					}
																				}}
																			/>
																		</div>
																	</Popover>
																)}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;

																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Title", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.title}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].title = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Description", "combo-blocks")}
																			</label>
																			<div>
																				<RichText
																					className="components-textarea-control__input"
																					tagName={"div"}
																					value={collection.description}
																					allowedFormats={[
																						"core/bold",
																						"core/italic",
																						"core/link",
																					]}
																					onChange={(content) => {
																						var layersX = [...layers];
																						layersX[layerIndex].collections[
																							colIndex
																						].description = content;
																						setAttributes({
																							layers: layersX,
																						});
																					}}
																					placeholder={__("Start Writing...")}
																				/>
																			</div>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Latitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lat}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lat = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Longitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lng}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lng = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		{mapSettings.markerType == "image" && (
																			<>
																				<MediaUploadCheck>
																					<MediaUploadCheck
																						className="bg-gray-700 hover:bg-gray-600"
																						onSelect={(media) => {
																							var layersX = [...layers];
																							layersX[layerIndex].collections[
																								colIndex
																							].marker.image.id = media.id;
																							layersX[layerIndex].collections[
																								colIndex
																							].marker.image.src = media.url;
																							setAttributes({
																								layers: layersX,
																							});
																						}}
																						onClose={() => { }}
																						allowedTypes={ALLOWED_MEDIA_TYPES}
																						value={collection.marker.image.id}
																						render={({ open }) => (
																							<>
																								<div className="p-3">
																									<img
																										src={
																											collection.marker.image
																												.src
																										}
																										alt=""
																										className="cursor-pointer"
																										onClick={open}
																									/>
																								</div>
																								<Button
																									className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
																									onClick={open}>
																									{__(
																										"Open Media Library",
																										"combo-blocks"
																									)}
																								</Button>
																							</>
																						)}
																					/>
																				</MediaUploadCheck>
																				<div className="flex gap-4">
																					<div className="my-3">
																						<label
																							for=""
																							className="font-medium text-slate-900 ">
																							{__("Width", "combo-blocks")}
																						</label>
																						<InputControl
																							type="number"
																							value={
																								collection.marker.image.width
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.image.width = newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div className="my-3">
																						<label
																							for=""
																							className="font-medium text-slate-900 ">
																							{__("Height", "combo-blocks")}
																						</label>
																						<InputControl
																							type="number"
																							value={
																								collection.marker.image.height
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.image.height = newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																				</div>
																			</>
																		)}
																		{mapSettings.markerType == "pin" && (
																			<>
																				<div className="my-4">
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Background", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin.background
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.background =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Border Color", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin
																									.borderColor
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.borderColor =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Glyph Color", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin.glyphColor
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.glyphColor =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																				</div>
																			</>
																		)}
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}
												{layer.id == "markerInfoWindow" && (
													<>
														<div className="flex gap-2 items-center my-3">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 text-nowrap"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		lat: "53.54992",
																		lng: "10.00678",
																		title: "",
																		description: "",
																		marker: {
																			image: {
																				id: "",
																				src: "",
																				width: "",
																				height: "",
																			},
																			pin: {
																				background: "",
																				borderColor: "",
																				glyphColor: "",
																			},
																		},
																	});

																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
															<div className="relative 	">
																<div
																	className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
																	onClick={(ev) => {
																		ev.preventDefault();
																		ev.stopPropagation();
																		setAIWriter(!AIWriter);
																	}}>
																	AI
																</div>
																{AIWriter && (
																	<Popover position="bottom right">
																		<div className="w-[800px] p-3">
																			<PGcssOpenaiPrompts
																				value={""}
																				formattedPrompt={formattedPrompt}
																				promptsAgs={{
																					action: "write",
																					aiModel: "gpt-4-turbo",
																					objective: "findLatLong",
																				}}
																				autoUpdate={AIautoUpdate}
																				onResponseLoaded={(
																					value,
																					autoUpdate
																				) => { }}
																				clickHandle={(value, action) => {
																					var items = [];
																					var locationsArr = JSON.parse(value);
																					locationsArr.map((item) => {
																						items.push({
																							lat: item.lat,
																							lng: item.lng,
																							title: item.title,
																							description: item.description,
																							marker: {
																								image: {
																									id: "",
																									src: "",
																									width: "",
																									height: "",
																								},
																								pin: {
																									background:
																										item.marker.pin.background,
																									borderColor:
																										item.marker.pin.borderColor,
																									glyphColor:
																										item.marker.pin.glyphColor,
																								},
																							},
																						});
																					});

																					if (action == "replace") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections =
																							items;
																						setAttributes({ layers: layersX });
																					}

																					if (action == "prepend") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...items,
																							...layersX[layerIndex]
																								.collections,
																						];

																						setAttributes({ layers: layersX });
																					}

																					if (action == "append") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...layersX[layerIndex]
																								.collections,
																							...items,
																						];
																					}
																				}}
																			/>
																		</div>
																	</Popover>
																)}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;

																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Title", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.title}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].title = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Description", "combo-blocks")}
																			</label>
																			<div>
																				<RichText
																					className="components-textarea-control__input"
																					tagName={"div"}
																					value={collection.description}
																					allowedFormats={[
																						"core/bold",
																						"core/italic",
																						"core/link",
																					]}
																					onChange={(content) => {
																						var layersX = [...layers];
																						layersX[layerIndex].collections[
																							colIndex
																						].description = content;
																						setAttributes({
																							layers: layersX,
																						});
																					}}
																					placeholder={__("Start Writing...")}
																				/>
																			</div>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Latitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lat}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lat = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Longitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lng}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lng = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		{mapSettings.markerType == "image" && (
																			<>
																				<MediaUploadCheck>
																					<MediaUploadCheck
																						className="bg-gray-700 hover:bg-gray-600"
																						onSelect={(media) => {
																							var layersX = [...layers];
																							layersX[layerIndex].collections[
																								colIndex
																							].marker.image.id = media.id;
																							layersX[layerIndex].collections[
																								colIndex
																							].marker.image.src = media.url;
																							setAttributes({
																								layers: layersX,
																							});
																						}}
																						onClose={() => { }}
																						allowedTypes={ALLOWED_MEDIA_TYPES}
																						value={collection.marker.image.id}
																						render={({ open }) => (
																							<>
																								<div className="p-3">
																									<img
																										src={
																											collection.marker.image
																												.src
																										}
																										alt=""
																										className="cursor-pointer"
																										onClick={open}
																									/>
																								</div>
																								<Button
																									className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
																									onClick={open}>
																									{__(
																										"Open Media Library",
																										"combo-blocks"
																									)}
																								</Button>
																							</>
																						)}
																					/>
																				</MediaUploadCheck>
																				<div className="flex gap-4">
																					<div className="my-3">
																						<label
																							for=""
																							className="font-medium text-slate-900 ">
																							{__("Width", "combo-blocks")}
																						</label>
																						<InputControl
																							type="number"
																							value={
																								collection.marker.image.width
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.image.width = newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div className="my-3">
																						<label
																							for=""
																							className="font-medium text-slate-900 ">
																							{__("Height", "combo-blocks")}
																						</label>
																						<InputControl
																							type="number"
																							value={
																								collection.marker.image.height
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.image.height = newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																				</div>
																			</>
																		)}
																		{mapSettings.markerType == "pin" && (
																			<>
																				<div className="my-4">
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Background", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin.background
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.background =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Border Color", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin
																									.borderColor
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.borderColor =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																					<div>
																						<label
																							htmlFor=""
																							className="font-medium text-slate-900 ">
																							{__("Glyph Color", "combo-blocks")}
																						</label>
																						<PGColorPicker
																							// colors={colors}
																							value={
																								collection.marker.pin.glyphColor
																							}
																							onChange={(newVal) => {
																								var layersX = [...layers];
																								layersX[layerIndex].collections[
																									colIndex
																								].marker.pin.glyphColor =
																									newVal;
																								setAttributes({
																									layers: layersX,
																								});
																							}}
																						/>
																					</div>
																				</div>
																			</>
																		)}
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}

												{layer.id == "polyline" && (
													<>
														<div className="flex gap-2 items-center my-3">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 text-nowrap"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		lat: "53.54992",
																		lng: "10.00678",
																		geodesic: true,
																		strokeColor: "#FF0000",
																		strokeOpacity: 1.0,
																		strokeWeight: 2,
																	});

																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
															<div className="relative 	">
																<div
																	className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
																	onClick={(ev) => {
																		ev.preventDefault();
																		ev.stopPropagation();
																		setAIWriter(!AIWriter);
																	}}>
																	AI
																</div>
																{AIWriter && (
																	<Popover position="bottom right">
																		<div className="w-[800px] p-3">
																			<PGcssOpenaiPrompts
																				value={""}
																				formattedPrompt={formattedPrompt}
																				promptsAgs={{
																					action: "write",
																					aiModel: "gpt-4-turbo",
																					objective: "findLatLong",
																				}}
																				autoUpdate={AIautoUpdate}
																				onResponseLoaded={(
																					value,
																					autoUpdate
																				) => { }}
																				clickHandle={(value, action) => {
																					var items = [];
																					var locationsArr = JSON.parse(value);
																					locationsArr.map((item) => {
																						items.push({
																							lat: item.lat,
																							lng: item.lng,
																							title: item.title,
																							description: item.description,
																							marker: {
																								image: {
																									id: "",
																									src: "",
																									width: "",
																									height: "",
																								},
																								pin: {
																									background:
																										item.marker.pin.background,
																									borderColor:
																										item.marker.pin.borderColor,
																									glyphColor:
																										item.marker.pin.glyphColor,
																								},
																							},
																						});
																					});

																					if (action == "replace") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections =
																							items;
																						setAttributes({ layers: layersX });
																					}

																					if (action == "prepend") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...items,
																							...layersX[layerIndex]
																								.collections,
																						];

																						setAttributes({ layers: layersX });
																					}

																					if (action == "append") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...layersX[layerIndex]
																								.collections,
																							...items,
																						];
																					}
																				}}
																			/>
																		</div>
																	</Popover>
																)}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;

																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Latitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lat}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lat = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Longitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lng}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lng = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<ToggleControl
																			label={__("geodesic", "combo-blocks")}
																			help={
																				collection.geodesic
																					? "Enable."
																					: "disable"
																			}
																			checked={
																				collection.geodesic ? true : false
																			}
																			onChange={(e) => {
																				var layersX = [...layers];
																				layersX[layerIndex].collections[
																					colIndex
																				].geodesic = layersX[layerIndex]
																					.collections[colIndex].geodesic
																						? false
																						: true;
																				setAttributes({
																					layers: layersX,
																				});
																			}}
																		/>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}

												{layer.id == "polygon" && (
													<>
														<div className="flex items-center my-3 justify-between">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 text-nowrap"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		lat: "53.54992",
																		lng: "10.00678",
																		strokeColor: "#FF0000",
																		fillColor: "#FF0000",
																		strokeOpacity: 1.0,
																		fillOpacity: 1.0,
																		strokeWeight: 2,
																	});

																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
															<div className="relative 	">
																<div
																	className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
																	onClick={(ev) => {
																		ev.preventDefault();
																		ev.stopPropagation();
																		setAIWriter(!AIWriter);
																	}}>
																	AI
																</div>
																{AIWriter && (
																	<Popover position="bottom right">
																		<div className="w-[800px] p-3">
																			<PGcssOpenaiPrompts
																				value={""}
																				formattedPrompt={formattedPrompt}
																				promptsAgs={{
																					action: "write",
																					aiModel: "gpt-4-turbo",
																					objective: "findLatLong",
																				}}
																				autoUpdate={AIautoUpdate}
																				onResponseLoaded={(
																					value,
																					autoUpdate
																				) => { }}
																				clickHandle={(value, action) => {
																					var items = [];
																					var locationsArr = JSON.parse(value);
																					locationsArr.map((item) => {
																						items.push({
																							lat: item.lat,
																							lng: item.lng,
																							title: item.title,
																							description: item.description,
																							marker: {
																								image: {
																									id: "",
																									src: "",
																									width: "",
																									height: "",
																								},
																								pin: {
																									background:
																										item.marker.pin.background,
																									borderColor:
																										item.marker.pin.borderColor,
																									glyphColor:
																										item.marker.pin.glyphColor,
																								},
																							},
																						});
																					});

																					if (action == "replace") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections =
																							items;
																						setAttributes({ layers: layersX });
																					}

																					if (action == "prepend") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...items,
																							...layersX[layerIndex]
																								.collections,
																						];

																						setAttributes({ layers: layersX });
																					}

																					if (action == "append") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...layersX[layerIndex]
																								.collections,
																							...items,
																						];
																					}
																				}}
																			/>
																		</div>
																	</Popover>
																)}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;

																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Latitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lat}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lat = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Longitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.lng}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].lng = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<ToggleControl
																			label={__("geodesic", "combo-blocks")}
																			help={
																				collection.geodesic
																					? "Enable."
																					: "disable"
																			}
																			checked={
																				collection.geodesic ? true : false
																			}
																			onChange={(e) => {
																				var layersX = [...layers];
																				layersX[layerIndex].collections[
																					colIndex
																				].geodesic = layersX[layerIndex]
																					.collections[colIndex].geodesic
																						? false
																						: true;
																				setAttributes({
																					layers: layersX,
																				});
																			}}
																		/>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}

												{layer.id == "circle" && (
													<>
														<div className="flex gap-2 items-center my-3">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 text-nowrap"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		strokeColor: "#0000FF",
																		strokeOpacity: 0.8,
																		strokeWeight: 2,
																		fillColor: "#0000FF",
																		fillOpacity: 0.35,
																		center: { lat: 25.74664, lng: 89.25166 },
																		radius: 20000,
																	});
																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
															<div className="relative 	">
																<div
																	className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600"
																	onClick={(ev) => {
																		ev.preventDefault();
																		ev.stopPropagation();
																		setAIWriter(!AIWriter);
																	}}>
																	AI
																</div>
																{AIWriter && (
																	<Popover position="bottom right">
																		<div className="w-[800px] p-3">
																			<PGcssOpenaiPrompts
																				value={""}
																				formattedPrompt={formattedPromptCircle}
																				promptsAgs={{
																					action: "write",
																					aiModel: "gpt-4-turbo",
																					objective: "findLatLong",
																				}}
																				autoUpdate={AIautoUpdate}
																				onResponseLoaded={(
																					value,
																					autoUpdate
																				) => { }}
																				clickHandle={(value, action) => {
																					var items = [];
																					var locationsArr = JSON.parse(value);
																					locationsArr.map((item) => {
																						items.push({
																							strokeColor: "#0000FF",
																							strokeOpacity: 0.8,
																							strokeWeight: 2,
																							fillColor: "#0000FF",
																							fillOpacity: 0.35,
																							center: {
																								lat: item.lat,
																								lng: item.lng,
																							},
																							radius: 20000,
																						});
																					});

																					if (action == "replace") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections =
																							items;
																						setAttributes({ layers: layersX });
																					}

																					if (action == "prepend") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...items,
																							...layersX[layerIndex]
																								.collections,
																						];

																						setAttributes({ layers: layersX });
																					}

																					if (action == "append") {
																						var layersX = [...layers];
																						layersX[layerIndex].collections = [
																							...layersX[layerIndex]
																								.collections,
																							...items,
																						];
																					}
																				}}
																			/>
																		</div>
																	</Popover>
																)}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;

																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Latitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.center.lat}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].center.lat = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Longitude", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.center.lng}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].center.lng = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Weight", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeWeight}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeWeight = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Radius", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.radius}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].radius = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}
												{layer.id == "rectangle" && (
													<>
														<div className="flex items-center my-3 gap-2">
															<div
																className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600"
																onClick={() => {
																	var layersX = [...layers];
																	layersX[layerIndex].collections.push({
																		strokeColor: "#FF0000",
																		strokeOpacity: 0.8,
																		strokeWeight: 2,
																		fillColor: "#FF0000",
																		fillOpacity: 0.35,
																		bounds: {
																			north: 25.8,
																			south: 25.6,
																			east: 89.3,
																			west: 89.1,
																		},
																	});
																	setAttributes({ layers: layersX });
																}}>
																{__("Add New", "combo-blocks")}
															</div>
														</div>
														<ReactSortable
															list={layer.collections}
															handle={".handle"}
															setList={(collectionSotred) => {
																var layersX = [...layers];
																layersX[layerIndex].collections =
																	collectionSotred;
																setAttributes({
																	layers: layersX,
																});
															}}>
															{layer.collections.map((collection, colIndex) => (
																<div key={colIndex}>
																	<PGtoggle
																		title={
																			<>
																				<span
																					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																					onClick={(ev) => {
																						var layersX = [...layers];
																						layersX[
																							layerIndex
																						].collections.splice(colIndex, 1);
																						setAttributes({
																							layers: layersX,
																						});
																					}}>
																					<Icon icon={close} />
																				</span>
																				<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																					<Icon icon={menu} />
																				</span>

																				<span className="mx-2" title={""}>
																					- #{colIndex}
																				</span>
																			</>
																		}
																		initialOpen={false}>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Title", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.title}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].title = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Description", "combo-blocks")}
																			</label>
																			<div>
																				<RichText
																					className="components-textarea-control__input"
																					tagName={"div"}
																					value={collection.description}
																					allowedFormats={[
																						"core/bold",
																						"core/italic",
																						"core/link",
																					]}
																					onChange={(content) => {
																						var layersX = [...layers];
																						layersX[layerIndex].collections[
																							colIndex
																						].description = content;
																						setAttributes({
																							layers: layersX,
																						});
																					}}
																					placeholder={__("Start Writing...")}
																				/>
																			</div>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeColor}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeColor = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Stroke Weight", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeWeight}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeWeight = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Color", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.strokeWeight}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].strokeWeight = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Fill Opacity", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.fillOpacity}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].fillOpacity = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		{/* ///////////////////// */}
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("North", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.bounds.north}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].bounds.north = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("South", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.bounds.south}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].bounds.south = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("East", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.bounds.east}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].bounds.east = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																		<div className="my-3">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("West", "combo-blocks")}
																			</label>
																			<InputControl
																				value={collection.bounds.west}
																				onChange={(newVal) => {
																					var layersX = [...layers];
																					layersX[layerIndex].collections[
																						colIndex
																					].bounds.west = newVal;
																					setAttributes({
																						layers: layersX,
																					});
																				}}
																			/>
																		</div>
																	</PGtoggle>
																</div>
															))}
														</ReactSortable>
													</>
												)}
											</PGtoggle>
										</div>
									);
								})}
							</ReactSortable>
						</PGtoggle>

						<PGtoggle title="Options" initialOpen={false}>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Map Id", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.mapId}
									onChange={(newVal) => {
										var options = { ...mapSettings, mapId: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<span className="mb-3 mt-1 bg-amber-400 text-white text-sm px-2 inline-flex">
								Map ID is need for advanced marker
							</span>
							<a
								target="_blank"
								href="https://console.cloud.google.com/google/maps-apis/studio/maps">
								Maps Management page
							</a>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Zoom", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.zoom}
									type="number"
									onChange={(newVal) => {
										var options = { ...mapSettings, zoom: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3">
								<ToggleControl
									label={__("Zoom Control?", "combo-blocks")}
									help={
										mapSettings.zoomControl
											? "Zoom Control Enable."
											: "Zoom Control disable"
									}
									checked={mapSettings.zoomControl ? true : false}
									onChange={(e) => {
										var options = {
											...mapSettings,
											zoomControl: mapSettings.zoomControl ? false : true,
										};
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Min Zoom", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.minZoom}
									type="number"
									onChange={(newVal) => {
										var options = { ...mapSettings, minZoom: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Max Zoom", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.maxZoom}
									type="number"
									onChange={(newVal) => {
										var options = { ...mapSettings, maxZoom: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Latitude", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.lat}
									onChange={(newVal) => {
										var options = { ...mapSettings, lat: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Longitude", "combo-blocks")}
								</label>
								<InputControl
									value={mapSettings.lng}
									onChange={(newVal) => {
										var options = { ...mapSettings, lng: newVal };
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Map Type", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={mapSettings.mapTypeId}
									options={[
										{ label: __("Choose", "combo-blocks"), value: "" },
										{ label: "Roadmap", value: "roadmap" },
										{ label: "Satellite", value: "satellite" },
										{ label: "Hybrid", value: "hybrid" },
										{ label: "Terrain", value: "terrain" },
									]}
									onChange={(newVal) => {
										var options = { ...mapSettings, mapTypeId: newVal };
										setAttributes({
											mapSettings: options,
										});
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Color Scheme", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={mapSettings.colorScheme}
									options={[
										{ label: __("Choose", "combo-blocks"), value: "" },
										{ label: "LIGHT", value: "LIGHT" },
										{ label: "DARK", value: "DARK" },
										{ label: "FOLLOW SYSTEM", value: "FOLLOW_SYSTEM" },
									]}
									onChange={(newVal) => {
										var options = { ...mapSettings, colorScheme: newVal };
										setAttributes({
											mapSettings: options,
										});
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<ToggleControl
									label={__("Street View Control", "combo-blocks")}
									help={
										mapSettings.streetViewControl
											? "Street View Enable."
											: "Street View disable"
									}
									checked={mapSettings.streetViewControl ? true : false}
									onChange={(e) => {
										var options = {
											...mapSettings,
											streetViewControl: mapSettings.streetViewControl
												? false
												: true,
										};
										setAttributes({ mapSettings: options });
									}}
								/>
							</div>

							<div className="my-3">
								<ToggleControl
									label={__("Bicycle Layer?", "combo-blocks")}
									help={
										mapSettings.layers.bikeLayer
											? "Bicycle Layer Enable."
											: "Bicycle Layer disable"
									}
									checked={mapSettings.layers.bikeLayer ? true : false}
									onChange={(e) => {
										var mapSettingsX = { ...mapSettings };
										mapSettingsX.layers.bikeLayer = mapSettingsX.layers
											.bikeLayer
											? false
											: true;
										setAttributes({
											mapSettings: mapSettingsX,
										});
									}}
								/>
							</div>
							<div className="my-3">
								<ToggleControl
									label={__("Transit Layer?", "combo-blocks")}
									help={
										mapSettings.layers.transitLayer
											? "Transit Layer Enable."
											: "Transit Layer disable"
									}
									checked={mapSettings.layers.transitLayer ? true : false}
									onChange={(e) => {
										var mapSettingsX = { ...mapSettings };
										mapSettingsX.layers.transitLayer = mapSettingsX.layers
											.transitLayer
											? false
											: true;
										setAttributes({
											mapSettings: mapSettingsX,
										});
									}}
								/>
							</div>
							<div className="my-3">
								<ToggleControl
									label={__("Traffic Layer?", "combo-blocks")}
									help={
										mapSettings.layers.trafficLayer
											? "Traffic Layer Enable."
											: "Traffic Layer disable"
									}
									checked={mapSettings.layers.trafficLayer ? true : false}
									onChange={(e) => {
										var mapSettingsX = { ...mapSettings };
										mapSettingsX.layers.trafficLayer = mapSettingsX.layers
											.trafficLayer
											? false
											: true;
										setAttributes({
											mapSettings: mapSettingsX,
										});
									}}
								/>
							</div>
							<div className="my-3 flex items-center justify-between">
								<label className="font-medium text-slate-900 w-1/2">
									{__("Marker Type", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={mapSettings.markerType}
									options={[
										{ label: __("Default", "combo-blocks"), value: "default" },
										{ label: "pin", value: "pin" },
										{ label: "Image", value: "image" },
									]}
									onChange={(newVal) => {
										var options = { ...mapSettings, markerType: newVal };
										setAttributes({
											mapSettings: options,
										});
									}}
								/>
							</div>
							{mapSettings.markerType == "image" && (
								<>
									<MediaUploadCheck>
										<MediaUpload
											className="bg-gray-700 hover:bg-gray-600"
											onSelect={(media) => {
												var mapSettingsX = { ...mapSettings };
												mapSettingsX.marker.image.id = media.id;
												mapSettingsX.marker.image.src = media.url;
												setAttributes({
													mapSettings: mapSettingsX,
												});
											}}
											onClose={() => { }}
											allowedTypes={ALLOWED_MEDIA_TYPES}
											value={mapSettings.marker.image.id}
											render={({ open }) => (
												<>
													<div className="p-3">
														<img
															src={mapSettings.marker.image.src}
															alt=""
															className="cursor-pointer"
															onClick={open}
														/>
													</div>
													<Button
														className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
														onClick={open}>
														{__("Open Media Library", "combo-blocks")}
													</Button>
												</>
											)}
										/>
									</MediaUploadCheck>
									<div className="flex gap-4">
										<div className="my-3">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Width", "combo-blocks")}
											</label>
											<InputControl
												type="number"
												value={mapSettings.marker.image.width}
												onChange={(newVal) => {
													var mapSettingsX = { ...mapSettings };
													mapSettingsX.marker.image.width = newVal;
													setAttributes({
														mapSettings: mapSettingsX,
													});
												}}
											/>
										</div>
										<div className="my-3">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Height", "combo-blocks")}
											</label>
											<InputControl
												type="number"
												value={mapSettings.marker.image.height}
												onChange={(newVal) => {
													var mapSettingsX = { ...mapSettings };
													mapSettingsX.marker.image.height = newVal;
													setAttributes({
														mapSettings: mapSettingsX,
													});
												}}
											/>
										</div>
									</div>
								</>
							)}
							{mapSettings.markerType == "pin" && (
								<div className="my-4">
									<div>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Background", "combo-blocks")}
										</label>
										<PGColorPicker
											// colors={colors}
											value={mapSettings.marker.pin.background}
											onChange={(newVal) => {
												var mapSettingsX = { ...mapSettings };
												mapSettingsX.marker.pin.background = newVal;
												setAttributes({
													mapSettings: mapSettingsX,
												});
											}}
										/>
									</div>
									<div>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Border Color", "combo-blocks")}
										</label>
										<PGColorPicker
											// colors={colors}
											value={mapSettings.marker.pin.borderColor}
											onChange={(newVal) => {
												var mapSettingsX = { ...mapSettings };
												mapSettingsX.marker.pin.borderColor = newVal;
												setAttributes({
													mapSettings: mapSettingsX,
												});
											}}
										/>
									</div>
									<div>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Glyph Color", "combo-blocks")}
										</label>
										<PGColorPicker
											// colors={colors}
											value={mapSettings.marker.pin.glyphColor}
											onChange={(newVal) => {
												var mapSettingsX = { ...mapSettings };
												mapSettingsX.marker.pin.glyphColor = newVal;
												setAttributes({
													mapSettings: mapSettingsX,
												});
											}}
										/>
									</div>
								</div>
							)}
							<div className="my-4">
								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										{__("Title Tag", "combo-blocks")}
									</label>
									<SelectControl
										label=""
										value={mapSettings.infoWindow.titleTag}
										options={[
											{ label: __("Choose", "combo-blocks"), value: "" },
											// { label: "a", value: "a" },
											{ label: "H1", value: "h1" },
											{ label: "H2", value: "h2" },
											{ label: "H3", value: "h3" },
											{ label: "H4", value: "h4" },
											{ label: "H5", value: "h5" },
											{ label: "H6", value: "h6" },
											// { label: "SPAN", value: "span" },
											{ label: "DIV", value: "div" },
											// { label: "P", value: "p" },
										]}
										onChange={(newVal) => {
											var mapSettingsX = { ...mapSettings };
											mapSettingsX.infoWindow.titleTag = newVal;
											setAttributes({
												mapSettings: mapSettingsX,
											});
										}}
									/>
								</PanelRow>
								<PanelRow>
									<label for="" className="font-medium text-slate-900 ">
										{__("Description Tag", "combo-blocks")}
									</label>
									<SelectControl
										label=""
										value={mapSettings.infoWindow.descriptionTag}
										options={[
											{ label: __("Choose", "combo-blocks"), value: "" },
											{ label: "SPAN", value: "span" },
											{ label: "DIV", value: "div" },
											{ label: "P", value: "p" },
										]}
										onChange={(newVal) => {
											var mapSettingsX = { ...mapSettings };
											mapSettingsX.infoWindow.descriptionTag = newVal;
											setAttributes({
												mapSettings: mapSettingsX,
											});
										}}
									/>
								</PanelRow>
							</div>
						</PGtoggle>
					</div>
				</InspectorControls>
				<>
					<div {...innerBlocksProps}>
						{comboBlocksEditor?.apiKeys?.googleMap == undefined && (
							<>add google map api key on dashboard.</>
						)}
						{comboBlocksEditor?.apiKeys?.googleMap != undefined && (
							<GoogleMapApiLoader
								apiKey={comboBlocksEditor?.apiKeys.googleMap.args.accessToken}
								suspense>
								<GoogleMap
									className="h-[400px] w-full"
									// mapId={mapSettings.mapId}
									// mapTypeId={mapSettings.mapTypeId}
									// streetViewControl={mapSettings.streetViewControl}
									// colorScheme={mapSettings.colorScheme}
									mapOptions={{
										...(mapSettings.colorScheme && {
											colorScheme: mapSettings.colorScheme,
										}),
										...(mapSettings.streetViewControl && {
											streetViewControl: mapSettings.streetViewControl,
										}),
										...(mapSettings.mapId && {
											mapId: mapSettings.mapId,
										}),
										...(mapSettings.mapId && { mapId: mapSettings.mapId }),
										...(mapSettings.mapId && {
											mapTypeId: mapSettings.mapTypeId,
										}),
										...(mapSettings.mapId && { mapId: mapSettings.mapId }),
										...(mapSettings.zoomControl && {
											zoomControl: mapSettings.zoomControl,
										}),
										...(mapSettings.minZoom && {
											minZoom: mapSettings.minZoom,
										}),
										...(mapSettings.maxZoom && {
											maxZoom: mapSettings.maxZoom,
										}),
										...(mapSettings.tilt && { tilt: mapSettings.tilt }),
									}}
									zoom={
										mapSettings.zoom.length == 0
											? 10
											: parseInt(mapSettings.zoom)
									}
									center={{
										lat: parseFloat(mapSettings.lat),
										lng: parseFloat(mapSettings.lng),
									}}>
									{markers.map((item, index) => {
										console.log(item);
										return (
											<>
												{/* <InfoWindow
													ariaLabel="Uluru"
													content={<Content item={item} />}
													onCloseClick={() => setOpen(false)}
													open={isOpen}> */}
												<Marker
													lat={parseFloat(item.lat)}
													lng={parseFloat(item.lng)}
												// onClick={() => setOpen(true)}
												/>
												{/* </InfoWindow> */}
											</>
										);
									})}
									{polygonSets.map((polygonSet) => {
										return (
											<>
												<Polygon
													paths={polygonSet}
													strokeColor="#FF0000"
													strokeOpacity={0.8}
													strokeWeight={2}
													fillColor="#FF0000"
													fillOpacity={0.35}
												/>
											</>
										);
									})}
									{polylineSets.map((polylineSet, index) => {
										return (
											<>
												<Polyline
													path={polylineSets[index]}
													strokeColor="#FF0000"
													strokeOpacity={1.0}
													strokeWeight={2}
													geodesic
												/>
											</>
										);
									})}
									{circles.map((circle) => {
										return (
											<>
												<Circle
													strokeColor="#FF0000"
													strokeOpacity={0.8}
													strokeWeight={2}
													fillColor="#FF0000"
													fillOpacity={0.35}
													center={circle.center}
													radius={circle.radius}
												/>
											</>
										);
									})}
									{rectangles.map((rectangle) => {
										return (
											<>
												<Rectangle
													strokeColor="#FF0000"
													strokeOpacity={0.8}
													strokeWeight={2}
													fillColor="#FF0000"
													fillOpacity={0.35}
													bounds={{
														north: parseFloat(rectangle.north),
														south: parseFloat(rectangle.south),
														east: parseFloat(rectangle.east),
														west: parseFloat(rectangle.west),
													}}
												/>
											</>
										);
									})}
									{infoWindows.map((infoWindow, index) => {
										return (
											<React.Fragment key={index}>
												<InfoWindow
													content={<Content item={infoWindow} />}
													onCloseClick={() => setOpen(-1)}
													open={open == index ? true : false}>
													<Marker
														lat={infoWindow.lat}
														lng={infoWindow.lng}
														onClick={() => setOpen(index)}
													/>
												</InfoWindow>
											</React.Fragment>
										);
									})}
								</GoogleMap>
							</GoogleMapApiLoader>
						)}
					</div>
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
