import {
	store as blockEditorStore,
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
import { select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { brush, close, copy, Icon, menu, settings } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
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
		var meta = attributes.meta;
		var outputPrams = attributes.outputPrams;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var visible = attributes.visible;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var metaSelector = blockClass + " meta";
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var icons = { bed: "", layout: "", smiley: "", columns: "", globe: "" };
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);

			setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		var objectTypes = [
			{ label: __("Post", "combo-blocks"), value: "post" },
			{ label: __("User", "combo-blocks"), value: "user" },
			{ label: __("Term", "combo-blocks"), value: "tiktok" },
			{ label: __("Comment", "combo-blocks"), value: "comment" },
		];
		var outputPramsArgs = {
			postFieldById: {
				label: __("Post Field By Id", "combo-blocks"),
				value: "postFieldById",
				args: { field: "" },
			},
			userFieldById: {
				label: __("User Field By Id", "combo-blocks"),
				value: "userFieldById",
				args: { field: "" },
			},
			newLineToList: {
				label: __("New Line To List", "combo-blocks"),
				value: "newLineToList",
				args: { max: "", orderBy: "DESC" },
				//isPro: true,
			},
			commaSeparateToList: {
				label: __("Comma Separate To List", "combo-blocks"),
				value: "commaSeparateToList",
				args: { max: "", orderBy: "DESC" },
				//isPro: true,
			},

			termFieldById: {
				label: __("Term Field By Id", "combo-blocks"),
				value: "termFieldById",
				args: { field: "" },
				//isPro: true,
			},
			commentFieldById: {
				label: __("Comment Field By Id", "combo-blocks"),
				value: "commentFieldById",
				args: { field: "" },
				//isPro: true,
			},
			// timeDifference: {
			// 	label: __("Time Difference", "combo-blocks"),
			// 	value: "timeDifference",
			// 	args: { secondTime: "" },
			// },
			arrayElement: {
				label: __("Array Element", "combo-blocks"),
				value: "arrayElement",
				args: { index: "", default: "" },
				//isPro: true,
			},
			// arrayMap: {
			// 	label: __("Array Map", "combo-blocks"),
			// 	value: "arrayMap",
			// 	args: {},
			// },
			arrayItemCount: {
				label: __("Array Item Count", "combo-blocks"),
				value: "arrayItemCount",
				args: {},
				//isPro: true,
			},
			formatNumber: {
				label: __("Format Number", "combo-blocks"),
				value: "formatNumber",
				args: { decimals: "", decimalpoint: "", separator: "" },
				//isPro: true,
			},
			addToUrl: {
				label: __("Add To Url", "combo-blocks"),
				value: "addToUrl",
				args: { linkText: "", linkTextSrc: "", target: "", scheme: "" },
				//isPro: true,
			},
			iframeUrl: {
				label: __("iframeUrl", "combo-blocks"),
				value: "iframeUrl",
				args: { title: "", name: "", height: "", width: "" },
				//isPro: true,
			},
			doShortcode: {
				label: __("Do Shortcode", "combo-blocks"),
				value: "doShortcode",
				args: {},
				//isPro: true,
			},
			// applyFilters: {
			// 	label: __("applyFilters", "combo-blocks"),
			// 	value: "applyFilters",
			// 	args: {hookName:""},
			// 	//isPro: true,
			// },
			// doAction: {
			// 	label: __("doAction", "combo-blocks"),
			// 	value: "doAction",
			// 	args: {hookName:""},
			// 	//isPro: true,
			// },
			applyWpautop: {
				label: __("applyWpautop", "combo-blocks"),
				value: "applyWpautop",
				args: {},
				//isPro: true,
			},
			acfToWPGallery: {
				label: __("acfToWPGallery", "combo-blocks"),
				value: "acfToWPGallery",
				args: {},
				//isPro: true,
			},

			// wrapperTag: {
			// 	label: __("Wrapper Tag", "combo-blocks"),
			// 	value: "wrapperTag",
			// 	args: { tag: "div" },
			// },
		};
		var postFieldsArgs = {
			post_type: {
				label: __("post_type", "combo-blocks"),
				value: "post_type",
			},
		};
		var userFieldsArgs = {
			user_login: {
				label: __("user_login", "combo-blocks"),
				value: "user_login",
			},
		};
		var commentFieldsArgs = {
			comment_ID: {
				label: __("comment_ID", "combo-blocks"),
				value: "comment_ID",
			},
			comment_post_ID: {
				label: __("comment_post_ID", "combo-blocks"),
				value: "comment_post_ID",
			},
			comment_author_url: {
				label: __("comment_author_url", "combo-blocks"),
				value: "comment_author_url",
			},
			comment_author_email: {
				label: __("comment_author_email", "combo-blocks"),
				value: "comment_author_email",
			},
		};

		var termFieldsArgs = {
			slug: {
				label: __("slug", "combo-blocks"),
				value: "slug",
			},
			name: {
				label: __("name", "combo-blocks"),
				value: "name",
			},
			description: {
				label: __("description", "combo-blocks"),
				value: "description",
			},
			term_taxonomy_id: {
				label: __("term_taxonomy_id", "combo-blocks"),
				value: "term_taxonomy_id",
			},
			taxonomy: {
				label: __("taxonomy", "combo-blocks"),
				value: "taxonomy",
			},
			parent: {
				label: __("parent", "combo-blocks"),
				value: "parent",
			},
			count: {
				label: __("count", "combo-blocks"),
				value: "count",
			},
			term_id: {
				label: __("term_id", "combo-blocks"),
				value: "term_id",
			},
		};

		function addLayer(option, index) {
			var outputPramsX = [...outputPrams];
			outputPramsX.push({ id: option.value, args: option.args });

			setAttributes({ outputPrams: outputPramsX });
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

		function onChangeStyleMeta(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, meta);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ meta: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				metaSelector
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
		function onAddStyleMeta(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, meta);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ meta: object });
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
		function onBulkAddMeta(sudoScource, cssObj) {
			let obj = Object.assign({}, meta);
			obj[sudoScource] = cssObj;
			setAttributes({ meta: obj });
			var selector = myStore.getElementSelector(sudoScource, metaSelector);
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
		function onRemoveStyleMeta(sudoScource, key) {
			let obj = { ...meta };
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
			setAttributes({ meta: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				metaSelector
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
		function onResetMeta(sudoSources) {
			let obj = Object.assign({}, meta);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						metaSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ meta: obj });
		}
		function onPickCssLibraryMeta(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				meta[sudoScource] = sudoScourceArgs;
			});
			var metaX = Object.assign({}, meta);
			setAttributes({ meta: metaX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					metaSelector
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
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		const ALLOWED_BLOCKS = [
			"combo-blocks/list",
			"combo-blocks/icon",
			"combo-blocks/text",
		];
		const MY_TEMPLATE = [["combo-blocks/text", {}]];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
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
							title={__("Meta Key", "combo-blocks")}
							initialOpen={true}>
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
									// {
									//   name: 'css',
									//   title: 'CSS Library',
									//   icon: styles,
									//   className: 'tab-css',
									// },
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											{__("Object Type?", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={meta.options.objectType}
											options={objectTypes}
											onChange={(newVal) => {
												var options = { ...meta.options, objectType: newVal };
												setAttributes({ meta: { ...meta, options: options } });
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Meta Key", "combo-blocks")}
										</label>
										<InputControl
											placeholder="Meta key"
											value={meta.options.meta_key}
											onChange={(newVal) => {
												var options = { ...meta.options, meta_key: newVal };
												setAttributes({ meta: { ...meta, options: options } });
											}}
										/>
									</PanelRow>

									<div className="my-3">
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Filter Output", "combo-blocks")}
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={outputPramsArgs}
												buttonTitle="Add Filter"
												onChange={addLayer}
												values=""></PGDropdown>
										</PanelRow>
									</div>
									<ReactSortable
										list={outputPrams}
										handle={".handle"}
										setList={(outputPramsSorted) => {
											setAttributes({
												outputPrams: outputPramsSorted,
											});
										}}>
										{outputPrams.map((item, index) => (
											<div key={index}>
												<PGtoggle
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var outputPramsX = [...outputPrams];
																	outputPramsX.splice(index, 1);
																	setAttributes({
																		outputPrams: outputPramsX,
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon icon={menu} />
															</span>
															<span
																onClick={() => {
																	var outputPramsX = [...outputPrams];
																	var objToDup = { ...outputPramsX[index] };
																	objToDup.id = Date.now();
																	outputPramsX.splice(index + 1, 0, objToDup);
																	setAttributes({
																		outputPrams: outputPramsX,
																	});
																}}
																className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon icon={copy} />
															</span>
															<span className="mx-2" title={item.id}>
																{outputPramsArgs[item.id]?.label}
															</span>
														</>
													}
													initialOpen={false}>
													{JSON.stringify(item)}

													{(item.id == "newLineToList" ||
														item.id == "commaSeparateToList") && (
															<>
																<div className="my-3">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		{__("Max Number", "combo-blocks")}
																	</label>
																	<InputControl
																		value={item.args.max}
																		onChange={(newVal) => {
																			var outputPramsX = [...outputPrams];

																			outputPramsX[index].args.max = newVal;
																			setAttributes({
																				outputPrams: outputPramsX,
																			});
																		}}
																	/>
																</div>
															</>
														)}
													{item.id == "timeDifference" && (
														<>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Second Time", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.secondTime}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.secondTime =
																			newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
														</>
													)}
													{item.id == "postFieldById" && (
														<>
															<div className="my-3">
																<PGDropdown
																	position="bottom right"
																	variant="secondary"
																	buttonTitle={
																		postFieldsArgs[
																			outputPrams[index].args.field
																		] !== undefined
																			? postFieldsArgs[
																				outputPrams[index].args.field
																			].label
																			: "Choose"
																	}
																	options={postFieldsArgs}
																	onChange={(option) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.field =
																			option.value;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																	values=""></PGDropdown>
															</div>
														</>
													)}
													{item.id == "userFieldById" && (
														<>
															<div className="my-3">
																<PGDropdown
																	position="bottom right"
																	variant="secondary"
																	buttonTitle={
																		userFieldsArgs[
																			outputPrams[index].args.field
																		] !== undefined
																			? userFieldsArgs[
																				outputPrams[index].args.field
																			].label
																			: "Choose"
																	}
																	options={userFieldsArgs}
																	onChange={(option) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.field =
																			option.value;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																	values=""></PGDropdown>
															</div>
														</>
													)}
													{item.id == "termFieldById" && (
														<>
															<div className="my-3">
																<PGDropdown
																	position="bottom right"
																	variant="secondary"
																	buttonTitle={
																		termFieldsArgs[
																			outputPrams[index].args.field
																		] !== undefined
																			? termFieldsArgs[
																				outputPrams[index].args.field
																			].label
																			: "Choose"
																	}
																	options={termFieldsArgs}
																	onChange={(option) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.field =
																			option.value;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																	values=""></PGDropdown>
															</div>
														</>
													)}
													{item.id == "commentFieldById" && (
														<>
															<div className="my-3">
																<PGDropdown
																	position="bottom right"
																	variant="secondary"
																	buttonTitle={
																		commentFieldsArgs[
																			outputPrams[index].args.field
																		] !== undefined
																			? commentFieldsArgs[
																				outputPrams[index].args.field
																			].label
																			: "Choose"
																	}
																	options={commentFieldsArgs}
																	onChange={(option) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.field =
																			option.value;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																	values=""></PGDropdown>
															</div>
														</>
													)}

													{item.id == "formatNumber" && (
														<>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Decimals", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.decimals}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.decimals = newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Decimalpoint", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.decimalpoint}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.decimalpoint =
																			newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Separator", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.separator}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.separator = newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
														</>
													)}

													{item.id == "arrayElement" && (
														<>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Index", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.index}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.index = newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
															<div className="my-3">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Default", "combo-blocks")}
																</label>
																<InputControl
																	value={item.args.default}
																	onChange={(newVal) => {
																		var outputPramsX = [...outputPrams];

																		outputPramsX[index].args.default = newVal;
																		setAttributes({
																			outputPrams: outputPramsX,
																		});
																	}}
																/>
															</div>
														</>
													)}
													{item.id === "wrapperTag" &&
														(() => {
															var options = {};

															if (item.id === "wrapperTag") {
																options = [
																	{
																		label: __("Choose", "combo-blocks"),
																		value: "",
																	},
																	{ label: "H1", value: "h1" },
																	{ label: "H2", value: "h2" },
																	{ label: "H3", value: "h3" },
																	{ label: "H4", value: "h4" },
																	{ label: "H5", value: "h5" },
																	{ label: "H6", value: "h6" },
																	{ label: "Span", value: "span" },
																	{ label: "DIV", value: "div" },
																	{ label: "UL", value: "ul" },
																	{ label: "P", value: "p" },
																];
															}
															return (
																<>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			options[outputPrams[index].args.field] !==
																				undefined
																				? options[outputPrams[index].args.field]
																					.label
																				: "Choose"
																		}
																		options={options}
																		onChange={(option) => {
																			var outputPramsX = [...outputPrams];

																			outputPramsX[index].args.field =
																				option.value;
																			setAttributes({
																				outputPrams: outputPramsX,
																			});
																		}}
																		values=""></PGDropdown>
																</>
															);
														})()}
												</PGtoggle>
											</div>
										))}
									</ReactSortable>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={meta}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												meta,
												"meta",
												metaSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												meta,
												"meta",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												meta,
												"meta",
												metaSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												meta,
												"meta",
												metaSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												meta,
												"meta",
												metaSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={meta}
										onChange={onPickCssLibraryMeta}
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
				<>
					<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
				</>
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
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
