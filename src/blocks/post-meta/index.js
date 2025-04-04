import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	TextareaControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
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
					d="M61.1765 52H4.70588C3.4578 52 2.26085 52.4958 1.37832 53.3783C0.495798 54.2608 0 55.4578 0 56.7059V103.765C0 105.013 0.495798 106.21 1.37832 107.092C2.26085 107.975 3.4578 108.471 4.70588 108.471H61.1765C62.4246 108.471 63.6215 107.975 64.504 107.092C65.3866 106.21 65.8824 105.013 65.8824 103.765V56.7059C65.8824 55.4578 65.3866 54.2608 64.504 53.3783C63.6215 52.4958 62.4246 52 61.1765 52ZM56.4706 99.0588H9.41177V61.4118H56.4706V99.0588Z"
					fill="url(#paint0_linear_61_442)"
				/>
				<path
					d="M160 56.9998H84.7061V66.4115H160V56.9998Z"
					fill="url(#paint1_linear_61_442)"
				/>
				<path
					d="M131 94.8818H85V103.882H131V94.8818Z"
					fill="url(#paint2_linear_61_442)"
				/>
				<path d="M106.561 76H85V85.41H106.561V76Z" fill="#C15940" />
				<path d="M133.281 76H111.72V85.41H133.281V76Z" fill="#C15940" />
				<path d="M160 76H138.439V85.41H160V76Z" fill="#C15940" />
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="url(#paint3_linear_61_442)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_442"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_442"
						x1="84.7061"
						y1="61.7056"
						x2="160"
						y2="61.7056"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_442"
						x1="85"
						y1="99.3818"
						x2="131"
						y2="99.3818"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_442"
						x1="13"
						y1="82"
						x2="53"
						y2="82"
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
		var meta = attributes.meta;
		var template = attributes.template;
		var templateLoop = attributes.templateLoop;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var items = attributes.items;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [metaValue, setMetaValue] = useState(null);
		const [metaHtml, setMetaHtml] = useState("");
		const [metaArgs, setMetaArgs] = useState(null);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const metaValueSelector = blockClass + " .metaValue";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ postTitle: postTitle });
			// setAttributes({ wrapper: wrapper });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[metaValueSelector] = meta;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		var metaKeyTypeArgsBasic = {
			string: { label: "String", value: "string" },
			object: { label: "Object", value: "object", isPro: true },
			array: { label: "Array", value: "array", isPro: true },
			// acfText: { label: "ACF Text", value: "acfText", isPro: true },
			// acfTextarea: { label: "ACF Textarea", value: "acfTextarea", isPro: true },
			// acfNumber: { label: "ACF Number", value: "acfNumber", isPro: true },
			// acfRange: { label: "ACF Range", value: "acfRange", isPro: true },
			// acfEmail: { label: "ACF Email", value: "acfEmail", isPro: true },
			// acfUrl: { label: "ACF URL", value: "acfUrl", isPro: true },
			// acfPassword: { label: "ACF Password", value: "acfPassword", isPro: true },
			//acfWysiwyg: { label: 'ACF WYSIWYG', value: 'acfWysiwyg', isPro: true },
			acfSelect: { label: "ACF Select", value: "acfSelect", isPro: true },
			acfCheckbox: { label: "ACF Checkbox", value: "acfCheckbox", isPro: true },
			acfRadio: { label: "ACF Radio", value: "acfRadio", isPro: true },
			acfImage: { label: "ACF Image", value: "acfImage", isPro: true },
			acfFile: { label: "ACF File", value: "acfFile", isPro: true },
			acfTaxonomy: { label: "ACF Taxonomy", value: "acfTaxonomy", isPro: true },
			acfPostObject: {
				label: "ACF Post Object",
				value: "acfPostObject",
				isPro: true,
			},
			acfPageLink: {
				label: "ACF Page Link",
				value: "acfPageLink",
				isPro: true,
			},
			acfLink: { label: "ACF Link", value: "acfLink", isPro: true },
			acfUser: { label: "ACF User", value: "acfUser", isPro: true },
			acfButtonGroup: {
				label: "ACF Button Group",
				value: "acfButtonGroup",
				isPro: true,
			},
			acfDateTime: {
				label: "ACF Date Time",
				value: "acfDateTime",
				isPro: true,
			},
			// acfBoolen: { label: 'ACF Boolen', value: 'acfBoolen', isPro: true },
			// acfTimePicker: { label: 'ACF TimePicker', value: 'acfTimePicker', isPro: true },
			// acfDatePicker: { label: 'ACF DatePicker', value: 'acfDatePicker', isPro: true },
			// acfDateTimePicker: { label: 'ACF DateTimePicker', value: 'acfDateTimePicker', isPro: true },
			// acfColorPicker: { label: 'ACF ColorPicker', value: 'acfColorPicker', isPro: true },
			// acfGoogleMap: { label: 'ACF Google Map', value: 'acfGoogleMap', isPro: true },
			// podsText: {
			// 	label: "Pods Text",
			// 	value: "podsText",
			// 	isPro: true,
			// },
			podsFile: {
				label: "Pods File",
				value: "podsFile",
				isPro: true,
			},
			podsImage: {
				label: "Pods Image",
				value: "podsImage",
				isPro: true,
			},
			podsSelect: {
				label: "Pods Select",
				value: "podsSelect",
				isPro: true,
			},
			podsCheckbox: {
				label: "Pods Checkbox",
				value: "podsCheckbox",
				isPro: true,
			},
			podsRadio: {
				label: "Pods Radio",
				value: "podsRadio",
				isPro: true,
			},
			podsButtonGroup: {
				label: "Pods Button Group",
				value: "podsButtonGroup",
				isPro: true,
			},
			podsLink: {
				label: "Pods Link",
				value: "podsLink",
				isPro: true,
			},
			podsTaxonomy: {
				label: "Pods Taxonomy",
				value: "podsTaxonomy",
				isPro: true,
			},
			podsUser: {
				label: "Pods User",
				value: "podsUser",
				isPro: true,
			},
			podsDatePicker: {
				label: "Pods DatePicker",
				value: "podsDatePicker",
				isPro: true,
			},
			podsTimePicker: {
				label: "Pods TimePicker",
				value: "podsTimePicker",
				isPro: true,
			},
			podsDateTimePicker: {
				label: "Pods DateTimePicker",
				value: "podsDateTimePicker",
				isPro: true,
			},
			// podsGoogleMap: {
			// 	label: "Pods GoogleMap",
			// 	value: "podsGoogleMap",
			// 	isPro: true,
			// },
			// podsColorPicker: {
			// 	label: "Pods ColorPicker",
			// 	value: "podsColorPicker",
			// 	isPro: true,
			// },
			podsPostObject: {
				label: "Pods Post Object",
				value: "podsPostObject",
				isPro: true,
			},
			// podsOEmbed: {
			// 	label: "Pods OEmbed",
			// 	value: "podsOEmbed",
			// 	isPro: true,
			// },
			// podsPassword: {
			// 	label: "Pods Password",
			// 	value: "podsPassword",
			// 	isPro: true,
			// },
			podsRelationship: {
				label: "Pods Relationship",
				value: "podsRelationship",
				isPro: true,
			},
			podsTrueFalse: {
				label: "Pods True False",
				value: "podsTrueFalse",
				isPro: true,
			},
			mbTaxonomy: {
				label: "MB Taxonomy",
				value: "mbTaxonomy",
				isPro: true,
			},
			mbButton: {
				label: "MB Button",
				value: "mbButton",
				isPro: true,
			},
			mbSelect: {
				label: "MB Select",
				value: "mbSelect",
				isPro: true,
			},
			mbSelectAdvanced: {
				label: "MB Select Advanced",
				value: "mbSelectAdvanced",
				isPro: true,
			},
			mbCheckbox: {
				label: "MB Checkbox",
				value: "mbCheckbox",
				isPro: true,
			},
			mbCheckboxList: {
				label: "MB Checkbox List",
				value: "mbCheckboxList",
				isPro: true,
			},
			mbRadio: {
				label: "MB Radio",
				value: "mbRadio",
				isPro: true,
			},
			mbDate: {
				label: "MB Date",
				value: "mbDate",
				isPro: true,
			},
			mbDateTime: {
				label: "MB Date Time",
				value: "mbDateTime",
				isPro: true,
			},
			mbTime: {
				label: "MB Time",
				value: "mbTime",
				isPro: true,
			},
			mbPost: {
				label: "MB Post",
				value: "mbPost",
				isPro: true,
			},
			mbWPTaxonomy: {
				label: "MB WPTaxonomy",
				value: "mbWPTaxonomy",
				isPro: true,
			},
			mbWPTaxonomyAdvanced: {
				label: "MB WPTaxonomy Advanced",
				value: "mbWPTaxonomyAdvanced",
				isPro: true,
			},
			mbUser: {
				label: "MB User",
				value: "mbUser",
				isPro: true,
			},
			cfsTaxonomy: {
				label: "CFS Taxonomy",
				value: "cfsTaxonomy",
				isPro: true,
			},
			cfsSelect: {
				label: "CFS Select",
				value: "cfsSelect",
				isPro: true,
			},
			cfsFileUpload: {
				label: "CFS File Upload",
				value: "cfsFileUpload",
				isPro: true,
			},
			cfsRelationship: {
				label: "CFS Relationship",
				value: "cfsRelationship",
				isPro: true,
			},
			cfsTerm: {
				label: "CFS Term",
				value: "cfsTerm",
				isPro: true,
			},
			cfsUser: {
				label: "CFS User",
				value: "cfsUser",
				isPro: true,
			},
			jetDate: {
				label: "Jet Date",
				value: "jetDate",
				isPro: true,
			},
			jetTime: {
				label: "Jet Time",
				value: "jetTime",
				isPro: true,
			},
			jetDateTime: {
				label: "Jet Date Time",
				value: "jetDateTime",
				isPro: true,
			},
			jetWYSIWYG: {
				label: "Jet WYSIWYG",
				value: "jetWYSIWYG",
				isPro: true,
			},
			jetSwitcher: {
				label: "Jet Switcher",
				value: "jetSwitcher",
				isPro: true,
			},
			jetCheckbox: {
				label: "Jet Checkbox",
				value: "jetCheckbox",
				isPro: true,
			},
			jetIconPicker: {
				label: "Jet Icon Picker",
				value: "jetIconPicker",
				isPro: true,
			},
			jetMedia: {
				label: "Jet Media",
				value: "jetMedia",
				isPro: true,
			},
			jetGallery: {
				label: "Jet Gallery",
				value: "jetGallery",
				isPro: true,
			},
			jetRadio: {
				label: "Jet Radio",
				value: "jetRadio",
				isPro: true,
			},
			jetSelect: {
				label: "Jet Select",
				value: "jetSelect",
				isPro: true,
			},
			jetNumber: {
				label: "Jet Number",
				value: "jetNumber",
				isPro: true,
			},
			jetColorPicker: {
				label: "Jet Color Picker",
				value: "jetColorPicker",
				isPro: true,
			},
			jetPosts: {
				label: "Jet Posts",
				value: "jetPosts",
				isPro: true,
			},
			jetHtml: {
				label: "Jet Html",
				value: "jetHtml",
				isPro: true,
			},
		};
		let metaKeyTypeArgs = applyFilters(
			"metaKeyTypeArgsFilter",
			metaKeyTypeArgsBasic
		);
		//let metaKeyTypeArgs = metaKeyTypeArgsBasic;
		useEffect(() => {
			apiFetch({
				path: "/combo-blocks/v2/get_post_meta",
				method: "POST",
				data: {
					postId: postId,
					meta_key: meta.options.key,
					type: meta.options.type,
					template: template,
				},
			}).then((res) => {
				if (res.args == undefined) {
				} else {
					setMetaArgs(res.args);
				}
				if (res.html == undefined) {
				} else {
					setMetaHtml(res.html);
				}
				// if (meta.options.type == 'acfImage') {
				//   setMetaHtml(res.html);
				//   setMetaArgs(res.args);
				// }
				// else if (meta.options.type == 'acfFile') {
				//   setMetaHtml(res.html);
				//   setMetaArgs(res.args);
				// }
				// else {
				//   setMetaHtml(res.html);
				//   setMetaArgs(res.args);
				// }
			});
		}, [meta, template]);
		// useEffect(() => {
		//   if (metaValue != null) {
		//     if (meta.options.type == 'string') {
		//       setMetaValue(res.meta_value)
		//     } else if (meta.options.type == 'acfImage') {
		//       setMetaHtml(res.html);
		//     }
		//   }
		// }, [template]);
		// var breakPointList = [];
		const WrapperTag =
			wrapper.options.tag != undefined && wrapper.options.tag.length != 0
				? `${wrapper.options.tag}`
				: "div";
		const CustomTag =
			wrapper.options.tag != undefined && wrapper.options.tag.length != 0
				? `${wrapper.options.tag}`
				: "div";
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var metaX = attributes.meta;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var templateX = attributes.template;
				var templateLoopX = attributes.templateLoop;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (templateLoopX != undefined) {
					var templateLoopY = {
						...templateLoopX,
						options: templateLoop.options,
					};
					setAttributes({ templateLoop: templateLoopY });
					blockCssObj[templateLoopSelector] = templateLoopY;
				}
				if (templateX != undefined) {
					var templateY = { ...templateX, options: template.options };
					setAttributes({ template: templateY });
					blockCssObj[templateSelector] = templateY;
				}
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}
				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (metaX != undefined) {
					var metaY = { ...metaX, options: meta.options };
					setAttributes({ meta: metaY });
					blockCssObj[metaSelector] = metaY;
				}
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
		function onPickCssLibraryWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				wrapper[sudoScource] = sudoScourceArgs;
			});
			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });
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
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
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
					metaValueSelector
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
			// var path = sudoScource + '.' + attr + '.' + breakPointX
			// let obj = Object.assign({}, wrapper);
			// const updatedObj = myStore.setPropertyDeep(obj, path, newVal)
			// setAttributes({ wrapper: updatedObj });
			// var sudoScourceX = { ...updatedObj[sudoScource] }
			// var elementSelector = myStore.getElementSelector(sudoScource, wrapperSelector);
			// sudoScourceX[attr][breakPointX] = newVal;
			// if (blockCssY.items[elementSelector] == undefined) {
			//   blockCssY.items[elementSelector] = {};
			// }
			// Object.entries(sudoScourceX).map(args => {
			//   var argAttr = myStore.cssAttrParse(args[0]);
			//   var argAttrVal = args[1];
			//   blockCssY.items[elementSelector][argAttr] = argAttrVal;
			// })
			// setAttributes({ blockCssY: { items: blockCssY.items } });
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
				metaValueSelector
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

		function onAddStyleWrapper(sudoScource, key) {
			// var sudoScourceX = { ...wrapper[sudoScource] }
			// sudoScourceX[key] = {};
			// wrapper[sudoScource] = sudoScourceX;
			// setAttributes({ wrapper: { ...wrapper } });
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStyleMeta(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, meta);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ meta: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				metaValueSelector
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
		function onResetMeta(sudoSources) {
			let obj = Object.assign({}, meta);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						metaValueSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ meta: obj });
		}

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [items]);
		const post = useSelect((select) =>
			select("core").getEntityRecord(
				"postType",
				context["postType"],
				context["postId"]
			)
		);
		const termstaxonomy = useSelect((select) =>
			select("core").getEntityRecords("taxonomy", "category", [4, 5])
		);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
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
													wrapper: { styles: wrapper.styles, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											Wrapper Class
										</label>
										<InputControl
											value={wrapper.options.class}
											onChange={(newVal) => {
												var options = { ...wrapper.options, class: newVal };
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
										onChange={onPickCssLibraryWrapper}
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
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Meta Key", "combo-blocks")}
										</label>
										<InputControl
											placeholder="Meta key"
											value={meta.options.key}
											onChange={(newVal) => {
												var options = { ...meta.options, key: newVal };
												setAttributes({ meta: { ...meta, options: options } });
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label>{__("Meta Key Type", "combo-blocks")} </label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={metaKeyTypeArgs}
											buttonTitle="Choose"
											onChange={(option, index) => {
												var options = { ...meta.options, type: option.value };
												setAttributes({ meta: { ...meta, options: options } });
											}}
											values=""
											value={meta.options.type}></PGDropdown>
									</PanelRow>
									<label className="my-3" for="">
										{__("Template", "combo-blocks")}
									</label>
									<TextareaControl
										value={template}
										onChange={(newVal) => {
											setAttributes({ template: newVal });
										}}
									/>
									<p>
										You can use following <code>&#123;metaValue&#125;</code> to
										display output
									</p>
									{meta.options.type != "string" && (
										<>
											<div className="hidden">
												<label className="mt-5 block" for="">
													{__("Loop Template", "combo-blocks")}{" "}
												</label>
												<TextareaControl
													placeholder="<div>{title}</div><div>{details}</div>"
													value={templateLoop}
													onChange={(newVal) => {
														setAttributes({ templateLoop: newVal });
													}}
												/>
												<p>
													{__(
														"You can use following for loop template to iterate array elements",
														"combo-blocks"
													)}{" "}
													<code>
														&#60;div&#62;
														&#123;itemIndex1&#125;&#60;/div&#62;&#60;div&#62;&#123;itemIndex2&#125;&#60;/div&#62;
													</code>
												</p>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Parameters", "combo-blocks")}
												</label>
												<div className="">
													{metaArgs != undefined &&
														Object.entries(metaArgs).map((arg, i) => {
															var key = arg[0];
															var val = arg[1];
															return (
																<div className="my-2 bg-gray-300">
																	<div
																		onClick={(ev) => {
																			var target = ev.target;
																		}}
																		className="bg-gray-500 px-3 py-2 text-white">
																		{key}
																	</div>
																	<div className="px-3 py-2">{val}</div>
																</div>
															);
														})}
												</div>
											</div>
										</>
									)}
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
												metaValueSelector,
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
												metaValueSelector,
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
												metaValueSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												meta,
												"meta",
												metaValueSelector,
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

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle> */}
					</div>
				</InspectorControls>
				<>
					{meta.options.key.length == 0 && (
						<div {...blockProps}>
							<div className="bg-slate-300 p-10 ">
								<div className="w-[400px] mx-auto my-0">
									<label
										for=""
										className="font-medium text-slate-900 my-4 block">
										{__("Meta Field Key", "combo-blocks")}
									</label>
									<InputControl
										placeholder="Write Meta key"
										value={meta.options.key}
										onChange={(newVal) => {
											var options = { ...meta.options, key: newVal };
											setAttributes({ meta: { ...meta, options: options } });
										}}
									/>
								</div>
							</div>
						</div>
					)}
					{meta.options.key.length != 0 && (
						<WrapperTag
							{...blockProps}
							dangerouslySetInnerHTML={{ __html: metaHtml }}
						/>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
