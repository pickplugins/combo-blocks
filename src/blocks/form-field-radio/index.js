import apiFetch from "@wordpress/api-fetch";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
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
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	addCard,
	brush,
	close,
	copy,
	Icon,
	mediaAndText,
	pages,
	settings,
} from "@wordpress/icons";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";

import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import {
	inputValueSourcesPrams,
	objectMapOptionsPrams,
} from "../../input-value-sources";

import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
var myStore = wp.data.select("ComboBlocksStore");
registerBlockType("combo-blocks/form-field-radio", {
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
				<rect
					x="1"
					y="56"
					width="158"
					height="21"
					fill="#C15940"
					stroke="#8E240B"
					strokeWidth="2"
					strokeDasharray="6 6"
				/>
				<rect
					x="1"
					y="87.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint0_linear_61_882)"
					stroke="#86402F"
					strokeWidth="2"
				/>
				<rect
					x="1"
					y="27.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint1_linear_61_882)"
					stroke="#86402F"
					strokeWidth="2"
				/>
				<path
					d="M108.718 90.6724C108.555 90.587 108.362 90.5651 108.174 90.6236L95.9704 94.2712C95.4243 94.4164 95.2685 95.1821 95.7142 95.5301L98.4785 97.8235L108.718 90.6724Z"
					fill="#F5F5F5"
				/>
				<path
					d="M109.052 91.0337C107.933 91.8185 98.8662 98.1457 98.8662 98.1457L102.799 101.408C103.139 101.702 103.707 101.592 103.907 101.193C103.907 101.193 109.026 91.6656 109.026 91.6656C109.133 91.4631 109.143 91.2337 109.052 91.0337Z"
					fill="#F5F5F5"
				/>
				<path
					d="M98.1806 98.2114C98.1586 98.2456 98.1489 98.2871 98.1489 98.3285V100.729C98.127 101.33 98.9101 101.696 99.3517 101.278C99.3517 101.278 100.594 100.21 100.594 100.21C100.35 100.013 98.1806 98.2114 98.1806 98.2114Z"
					fill="#F5F5F5"
				/>
				<rect
					x="50"
					y="94.2271"
					width="40.9091"
					height="4.54545"
					fill="#F5F5F5"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_882"
						x1="0"
						y1="96.4999"
						x2="160"
						y2="96.4999"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_882"
						x1="0"
						y1="36.4999"
						x2="160"
						y2="36.4999"
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
		var conditions = attributes.conditions;

		var label = attributes.label;
		var radio = attributes.radio;
		var item = attributes.item;
		var icon = attributes.icon;
		var itemLabel = attributes.itemLabel;
		var inputWrap = attributes.inputWrap;
		var inputItemWrap = attributes.inputItemWrap;
		var errorWrap = attributes.errorWrap;
		var labelWrap = attributes.labelWrap;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		const [isLoading, setisLoading] = useState(false);
		const [pramSrcEnable, setpramSrcEnable] = useState(false);
		var [postTypes, setpostTypes] = useState({}); // Using the hook.
		var [userRoles, setuserRoles] = useState({}); // Using the hook.
		var [taxonomies, settaxonomies] = useState({}); // Using the hook.
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var labelSelector = blockClass + " label";
		var inputSelector = blockClass + ' input[type="radio"]';
		var labelWrapSelector = blockClass + " .label-wrap";
		var inputWrapSelector = blockClass + " .input-wrap";
		var inputItemWrapSelector = blockClass + " .input-wrap .item";
		var errorWrapSelector = blockClass + " .error-wrap";
		var iconSelector = blockClass + " .icon";

		var inputValueSources = applyFilters(
			"comboBlocksInputValueSources",
			inputValueSourcesPrams
		);
		var objectMapOptions = applyFilters(
			"comboBlocksObjectMapOptions",
			objectMapOptionsPrams
		);

		var formFieldRadioParamSourceBasic = {
			none: { label: __("None", "combo-blocks"), value: "" },
			countryNames: {
				label: __("Country Names", "combo-blocks"),
				value: "countryNames",
			},
			countryCodes: {
				label: __("Country Codes", "combo-blocks"),
				value: "countryCodes",
			},
			gender: { label: __("Gender", "combo-blocks"), value: "gender" },
			ageGroupsNum: {
				label: __("Age Groups - Age", "combo-blocks"),
				value: "ageGroupsNum",
			},
			ageGroupsKids: {
				label: __("Age Groups - Kids", "combo-blocks"),
				value: "ageGroupsKids",
			},
			taxonomy: {
				label: __("Taxonomy", "combo-blocks"),
				value: "taxonomy",
				isPro: true,
			},
			posts: { label: __("Posts", "combo-blocks"), value: "posts", isPro: true },
			users: { label: __("Users", "combo-blocks"), value: "users", isPro: true },
		};
		let paramSourceArgs = applyFilters(
			"comboBlocksFormFieldRadioParamSource",
			formFieldRadioParamSourceBasic
		);
		function setParamsSource(option, index) {
			var newVal = option.value;
			var optionsX = { ...radio.options };
			var argsSrc = optionsX.argsSrc;
			//argsSrc.src = newVal;
			if (newVal == "taxonomy") {
				optionsX = {
					...optionsX,
					argsSrc: {
						src: newVal,
						srcPrams: { taxonomy: "" },
					},
				};
			} else if (newVal == "posts") {
				optionsX = {
					...optionsX,
					argsSrc: {
						src: newVal,
						srcPrams: {
							postType: "",
							orderBy: "",
							order: "",
						},
					},
				};
			} else if (newVal == "users") {
				optionsX = {
					...optionsX,
					argsSrc: {
						src: newVal,
						srcPrams: { role: "" },
					},
				};
			} else {
				optionsX = {
					...optionsX,
					argsSrc: { src: newVal, srcPrams: {} },
				};
			}
			setAttributes({
				radio: { ...radio, options: optionsX },
			});
		}
		const ALLOWED_MEDIA_TYPES = ["image"];
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			apiFetch({
				path: "/combo-blocks/v2/post_types",
				method: "POST",
				data: {},
			}).then((res) => {
				var types = [];
				Object.entries(res).map((x) => {
					var postTypeId = x[0];
					var postTypeLabel = x[1];
					types.push({ label: postTypeLabel, value: postTypeId });
				});
				setpostTypes(types);
			});
			apiFetch({
				path: "/combo-blocks/v2/user_roles_list",
				method: "POST",
				data: {},
			}).then((res) => {
				var roles = res.roles == undefined ? [] : res.roles;
				var rolesX = [];
				Object.entries(roles).map((role) => {
					var index = role[0];
					var val = role[1];
					rolesX.push({ label: val, value: index });
				});
				setuserRoles(rolesX);
			});
			apiFetch({
				path: "/combo-blocks/v2/post_type_objects",
				method: "POST",
				data: {},
			}).then((res) => {
				var taxItems = [];
				Object.entries(res).map((arg) => {
					var index = arg[0];
					var tax = arg[1];
					taxItems.push({ label: tax.label, value: tax.id });
				});
				settaxonomies(taxItems);
			});
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[labelSelector] = label;
			blockCssObj[inputSelector] = radio;
			blockCssObj[iconSelector] = icon;
			blockCssObj[labelWrapSelector] = labelWrap;
			blockCssObj[inputWrapSelector] = inputWrap;
			blockCssObj[inputItemWrapSelector] = inputItemWrap;
			blockCssObj[errorWrapSelector] = errorWrap;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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
				var labelX = attributes.label;
				var inputX = attributes.input;
				var iconX = attributes.icon;
				var labelWrapX = attributes.labelWrap;
				var inputWrapX = attributes.inputWrap;
				var inputItemWrapX = attributes.inputItemWrap;
				var errorWrapX = attributes.errorWrap;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (inputX != undefined) {
					var inputY = { ...inputX, options: input.options };
					setAttributes({ input: inputY });
					blockCssObj[inputSelector] = inputY;
				}
				if (labelWrapX != undefined) {
					var labelWrapY = { ...labelWrapX, options: labelWrap.options };
					setAttributes({ labelWrap: labelWrapY });
					blockCssObj[labelWrapSelector] = labelWrapY;
				}
				if (inputWrapX != undefined) {
					var inputWrapY = { ...inputWrapX, options: inputWrap.options };
					setAttributes({ inputWrap: inputWrapY });
					blockCssObj[inputWrapSelector] = inputWrapY;
				}
				if (inputItemWrapX != undefined) {
					var inputItemWrapY = {
						...inputItemWrapX,
						options: inputItemWrap.options,
					};
					setAttributes({ inputItemWrap: inputItemWrapY });
					blockCssObj[inputItemWrapSelector] = inputItemWrapY;
				}

				if (errorWrapX != undefined) {
					var errorWrapY = { ...errorWrapX, options: errorWrap.options };
					setAttributes({ errorWrap: errorWrapY });
					blockCssObj[errorWrapSelector] = errorWrapY;
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
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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
		function onRemoveStyleLabel(sudoScource, key) {
			let obj = { ...label };
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
			setAttributes({ label: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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
		function onRemoveStyleInput(sudoScource, key) {
			let obj = { ...radio };
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
			setAttributes({ radio: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputSelector
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
		function onRemoveStyleLabelWrap(sudoScource, key) {
			let obj = { ...labelWrap };
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
			setAttributes({ labelWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelWrapSelector
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
		function onRemoveStyleInputWrap(sudoScource, key) {
			let obj = { ...inputWrap };
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
			setAttributes({ inputWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputWrapSelector
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
		function onRemoveStyleInputItemWrap(sudoScource, key) {
			let obj = { ...inputItemWrap };
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
			setAttributes({ inputItemWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputItemWrapSelector
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

		function onRemoveStyleErrorWrap(sudoScource, key) {
			let obj = { ...errorWrap };
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
			setAttributes({ errorWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
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
		function onResetLabel(sudoSources) {
			let obj = Object.assign({}, label);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ label: obj });
		}
		function onResetInput(sudoSources) {
			let obj = Object.assign({}, radio);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						inputSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ radio: obj });
		}
		function onResetLabelWrap(sudoSources) {
			let obj = Object.assign({}, labelWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ labelWrap: obj });
		}
		function onResetInputWrap(sudoSources) {
			let obj = Object.assign({}, inputWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						inputWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ inputWrap: obj });
		}
		function onResetInputItemWrap(sudoSources) {
			let obj = Object.assign({}, inputItemWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						inputItemWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ inputItemWrap: obj });
		}

		function onResetErrorWrap(sudoSources) {
			let obj = Object.assign({}, errorWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						errorWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ errorWrap: obj });
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
		function onChangeStyleLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ label: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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
		function onAddStyleLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}
		function onBulkAddLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;
			setAttributes({ label: obj });
			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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
		function onChangeStyleInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, radio);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ radio: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputSelector
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
		function onAddStyleInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, radio);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ radio: object });
		}
		function onBulkAddInput(sudoScource, cssObj) {
			let obj = Object.assign({}, radio);
			obj[sudoScource] = cssObj;
			setAttributes({ radio: obj });
			var selector = myStore.getElementSelector(sudoScource, inputSelector);
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
		function onChangeStyleLabelWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ labelWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelWrapSelector
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
		function onAddStyleLabelWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelWrap: object });
		}
		function onBulkAddLabelWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, labelWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ labelWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, labelWrapSelector);
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
		function onChangeStyleInputWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, inputWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ inputWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputWrapSelector
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
		function onAddStyleInputWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, inputWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inputWrap: object });
		}
		function onBulkAddInputWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, inputWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ inputWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, inputWrapSelector);
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

		//######
		function onChangeStyleInputItemWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, inputItemWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ inputItemWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputItemWrapSelector
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
		function onAddStyleInputItemWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, inputItemWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inputItemWrap: object });
		}
		function onBulkAddInputItemWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, inputItemWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ inputItemWrap: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				inputItemWrapSelector
			);
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

		function onChangeStyleErrorWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ errorWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
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
		function onAddStyleErrorWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ errorWrap: object });
		}
		function onBulkAddErrorWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, errorWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ errorWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, errorWrapSelector);
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

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ icon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
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
		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}
		function onRemoveStyleIcon(sudoScource, key) {
			let obj = { ...icon };
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
			setAttributes({ icon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
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
		function onResetIcon(sudoSources) {
			let obj = Object.assign({}, icon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						iconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ icon: obj });
		}
		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;
			setAttributes({ icon: obj });
			var selector = myStore.getElementSelector(sudoScource, iconSelector);
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
					var optionsX = { ...radio.options };
					var argsX = parsedData;
					optionsX.args = argsX;
					setAttributes({
						radio: { ...radio, options: optionsX },
					});
				})
				.catch((err) => { });
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text" initialOpen={false}>
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
							title={__("Label", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Label Wrap", "combo-blocks")}
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
											obj={labelWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													labelWrap,
													"labelWrap",
													labelWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													labelWrap,
													"labelWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													labelWrap,
													"labelWrap",
													labelWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													labelWrap,
													"labelWrap",
													labelWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													labelWrap,
													"labelWrap",
													labelWrapSelector,
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
								title={__("Label", "combo-blocks")}
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
										<ToggleControl
											className="my-3"
											label={__("Enable?", "combo-blocks")}
											help={
												label.options.enable
													? __("Label Enabled", "combo-blocks")
													: __("Label Disabled.", "combo-blocks")
											}
											checked={label.options.enable ? true : false}
											onChange={(e) => {
												var options = {
													...label.options,
													enable: label.options.enable ? false : true,
												};
												setAttributes({
													label: { ...label, options: options },
												});
											}}
										/>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Label Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={label.options.text}
												onChange={(newVal) => {
													var options = { ...label.options, text: newVal };
													setAttributes({
														label: { ...label, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={label}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													label,
													"label",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Input", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Input Wrap", "combo-blocks")}
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
											obj={inputWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													inputWrap,
													"inputWrap",
													inputWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													inputWrap,
													"inputWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													inputWrap,
													"inputWrap",
													inputWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													inputWrap,
													"inputWrap",
													inputWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													inputWrap,
													"inputWrap",
													inputWrapSelector,
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
								title={__("Input Item Wrap", "combo-blocks")}
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
											obj={inputItemWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													inputItemWrap,
													"inputItemWrap",
													inputItemWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													inputItemWrap,
													"inputItemWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													inputItemWrap,
													"inputItemWrap",
													inputItemWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													inputItemWrap,
													"inputItemWrap",
													inputItemWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													inputItemWrap,
													"inputItemWrap",
													inputItemWrapSelector,
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
								title={__("Radio", "combo-blocks")}
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
										<div className="flex justify-around ">
											<div
												// className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2"
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												onClick={(ev) => {
													var optionsX = { ...radio.options };
													var argsX = [...radio.options.args];
													argsX.push({ label: "Label", value: "" });
													optionsX.args = argsX;
													setAttributes({
														radio: { ...radio, options: optionsX },
													});
												}}>
												<Icon
													icon={addCard}
													className="fill-white "
													size={18}
												/>
												{__("Add", "combo-blocks")}
											</div>
											{/* param source start */}
											<div className=" inline-block  relative">
												<div
													// className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2 cursor-pointer "
													className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														setpramSrcEnable(!pramSrcEnable);
													}}>
													{__("Pram Source", "combo-blocks")}
												</div>
												{pramSrcEnable && (
													<Popover position="bottom left">
														{/* posts, users, countryNames, countryCodes, Gender, ageGroups */}
														<div className="p-3 w-[300px] rounded-md  ">
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 pg-font ">
																	{__("Choose Source Type", "combo-blocks")}
																</label>
																<PGDropdown
																	position="bottom right"
																	// variant="secondary"
																	options={paramSourceArgs}
																	// buttonTitle={
																	// 	paramSourceValue == undefined ||
																	// 	paramSourceValue?.length == 0
																	// 		? __("Choose","combo-blocks")
																	// 		: paramSourceValue.label
																	// }
																	buttonTitle={
																		radio.options.argsSrc.src == undefined ||
																			radio.options.argsSrc.src.length == 0
																			? __("Choose", "combo-blocks")
																			: paramSourceArgs[
																				radio.options.argsSrc?.src
																			]?.label
																	}
																	onChange={setParamsSource}
																	values={[]}></PGDropdown>
															</PanelRow>
															{radio.options.argsSrc.src == "posts" && (
																<>
																	<div className=".pg-setting-input-text ">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 pg-font ">
																			{__("Choose Post Type", "combo-blocks")}
																		</label>
																		<SelectControl
																			label=""
																			multiple={true}
																			value={
																				radio.options.argsSrc.srcPrams.postType
																			}
																			options={postTypes}
																			onChange={(newVal) => {
																				var options = { ...radio.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.postType = newVal;
																				setAttributes({
																					radio: { ...radio, options: options },
																				});
																			}}
																		/>
																	</div>
																</>
															)}
															{radio.options.argsSrc.src == "taxonomy" && (
																<>
																	<div className="flex items-center justify-between gap-2 whitespace-nowrap pg-setting-input-text  ">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 pg-font ">
																			{__("Choose Taxonomy", "combo-blocks")}
																		</label>
																		<SelectControl
																			label=""
																			value={
																				radio.options.argsSrc.srcPrams?.taxonomy
																			}
																			options={taxonomies}
																			onChange={(newVal) => {
																				var options = { ...radio.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.taxonomy = newVal;
																				setAttributes({
																					radio: { ...radio, options: options },
																				});
																			}}
																		/>
																	</div>
																</>
															)}
															{radio.options.argsSrc.src == "users" && (
																<>
																	<div>
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 pg-font ">
																			{__("User Role", "combo-blocks")}
																		</label>
																		<SelectControl
																			label=""
																			multiple={true}
																			value={
																				radio.options.argsSrc.srcPrams.role
																			}
																			options={userRoles}
																			onChange={(newVal) => {
																				var options = { ...radio.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.role = newVal;
																				setAttributes({
																					radio: { ...radio, options: options },
																				});
																			}}
																		/>
																	</div>
																</>
															)}
														</div>
													</Popover>
												)}
											</div>
										</div>
										<div className="flex items-center justify-around">
											<div
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												data-pgTooltip="Copy"
												onClick={(ev) => {
													copyData(radio.options.args);
												}}>
												<Icon icon={copy} className="fill-white " size={18} />
												{__("Copy", "combo-blocks")}
											</div>
											<div
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												data-pgTooltip="Paste"
												onClick={(ev) => {
													pasteData();
												}}>
												<Icon icon={pages} className="fill-white " size={18} />
												{__("Paste", "combo-blocks")}
											</div>
										</div>

										{radio.options.labelSrc && (
											<>
												{radio.options.argsSrc.src?.length == 0 && (
													<>
														{radio.options.args.map((arg, index) => {
															return (
																<>
																	<PGtoggle
																		className="font-medium text-slate-900 "
																		title={arg.label}
																		initialOpen={false}>
																		<div
																			className="flex justify-between items-center my-3"
																			key={index}>
																			<InputControl
																				className="mr-2"
																				value={arg.label}
																				placeholder="Option Label"
																				onChange={(newVal) => {
																					var options = { ...radio.options };
																					var args = options.args;
																					args[index].label = newVal;
																					setAttributes({
																						radio: {
																							...radio,
																							options: options,
																						},
																					});
																				}}
																			/>
																			<InputControl
																				className="mr-2"
																				placeholder="Option Value"
																				value={arg.value}
																				onChange={(newVal) => {
																					var options = { ...radio.options };
																					var args = options.args;
																					args[index].value = newVal;
																					setAttributes({
																						radio: {
																							...radio,
																							options: options,
																						},
																					});
																				}}
																			/>
																			<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 rounded-sm">
																				<Icon
																					fill="#fff"
																					icon={close}
																					onClick={(ev) => {
																						var optionsX = { ...radio.options };
																						optionsX.args.splice(index, 1);
																						setAttributes({
																							radio: {
																								...radio,
																								options: optionsX,
																							},
																						});
																					}}
																				/>
																			</span>
																		</div>
																		<div>
																			{arg?.img?.src.length > 0 && (
																				<img src={arg.img.src} alt="" />
																			)}
																			<MediaUploadCheck>
																				<MediaUpload
																					className="bg-gray-700 hover:bg-gray-600"
																					onSelect={(media) => {
																						// media.id
																						// setCurrentPostImageId(media.id);
																						// var options = {
																						// 	...image.options,
																						// 	srcUrl: media.url,
																						// 	srcId: media.id,
																						// };
																						var options = { ...radio.options };
																						var args = options.args;
																						args[index].img.src = media.url;
																						setAttributes({
																							radio: {
																								...radio,
																								options: options,
																							},
																						});
																						// setAttributes({
																						// 	image: {
																						// 		...image,
																						// 		options: options,
																						// 	},
																						// });
																					}}
																					onClose={() => { }}
																					allowedTypes={ALLOWED_MEDIA_TYPES}
																					value={arg?.img?.src}
																					render={({ open }) => (
																						<Button
																							className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
																							onClick={open}>
																							{__(
																								"Open Media Library",
																								"combo-blocks"
																							)}
																						</Button>
																					)}
																				/>
																			</MediaUploadCheck>
																			<InputControl
																				className="mr-2"
																				placeholder="Alt"
																				value={arg?.img?.alt}
																				onChange={(newVal) => {
																					var options = { ...radio.options };
																					var args = options.args;
																					args[index].img.alt = newVal;
																					setAttributes({
																						radio: {
																							...radio,
																							options: options,
																						},
																					});
																				}}
																			/>
																		</div>
																	</PGtoggle>
																</>
															);
														})}
													</>
												)}
											</>
										)}
										{!radio.options.labelSrc && (
											<>
												<div>
													{radio.options.argsSrc.src?.length == 0 && (
														<>
															{radio.options.args.map((arg, index) => {
																return (
																	<div
																		className="flex justify-between items-center my-3"
																		key={index}>
																		<InputControl
																			className="mr-2"
																			value={arg.label}
																			placeholder="Option Label"
																			onChange={(newVal) => {
																				var options = { ...radio.options };
																				var args = options.args;
																				args[index].label = newVal;
																				setAttributes({
																					radio: { ...radio, options: options },
																				});
																			}}
																		/>
																		<InputControl
																			className="mr-2"
																			placeholder="Option Value"
																			value={arg.value}
																			onChange={(newVal) => {
																				var options = { ...radio.options };
																				var args = options.args;
																				args[index].value = newVal;
																				setAttributes({
																					radio: { ...radio, options: options },
																				});
																			}}
																		/>
																		<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 rounded-sm">
																			<Icon
																				fill="#fff"
																				icon={close}
																				onClick={(ev) => {
																					var optionsX = { ...radio.options };
																					optionsX.args.splice(index, 1);
																					setAttributes({
																						radio: {
																							...radio,
																							options: optionsX,
																						},
																					});
																				}}
																			/>
																		</span>
																	</div>
																);
															})}
														</>
													)}
													{radio.options.argsSrc.src?.length > 0 && (
														<>
															{__(
																"Options will automatically generated from",
																"combo-blocks"
															)}{" "}
															<span className="text-bold">
																{radio.options.argsSrc.src}
															</span>
														</>
													)}
												</div>
											</>
										)}

										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Label Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={label.options.text}
												onChange={(newVal) => {
													var options = { ...label.options, text: newVal };
													setAttributes({
														label: { ...label, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Field Name", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={radio.options.name}
												onChange={(newVal) => {
													var options = { ...radio.options, name: newVal };
													setAttributes({
														radio: { ...radio, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Default Value", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={radio.options.value}
												onChange={(newVal) => {
													var options = { ...radio.options, value: newVal };
													setAttributes({
														radio: { ...radio, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Default Value Source", "combo-blocks")}
											</label>
											{/* <SelectControl
												label=""
												value={radio.options.valueSource}
												options={inputValueSources}
												onChange={(newVal) => {
													var options = {
														...radio.options,
														valueSource: newVal,
													};
													setAttributes({
														radio: { ...radio, options: options },
													});
												}}
											/> */}
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={inputValueSources}
												buttonTitle={
													radio.options.valueSource == undefined ||
														radio.options.valueSource.length == 0
														? __("Choose...", "combo-blocks")
														: inputValueSources[radio.options.valueSource] ==
															undefined
															? __("Choose...", "combo-blocks")
															: inputValueSources[radio.options.valueSource].label
												}
												onChange={(newVal) => {
													const options = {
														...radio.options,
														valueSource: newVal.value,
													};
													setAttributes({
														radio: { ...radio, options: options },
													});
												}}
												value={radio.options.valueSource}
											/>
										</PanelRow>
										<ToggleControl
											className="my-3"
											label={__("Readonly?", "combo-blocks")}
											help={
												radio.options.readonly
													? __("Readonly Enabled", "combo-blocks")
													: __("Readonly Disabled.", "combo-blocks")
											}
											checked={radio.options.readonly ? true : false}
											onChange={(e) => {
												var options = {
													...radio.options,
													readonly: radio.options.readonly ? false : true,
												};
												setAttributes({
													radio: { ...radio, options: options },
												});
											}}
										/>
										<ToggleControl
											className="my-3"
											label={__("Required?", "combo-blocks")}
											help={
												radio.options.required
													? __("Required Enabled", "combo-blocks")
													: __("Required Disabled.", "combo-blocks")
											}
											checked={radio.options.required ? true : false}
											onChange={(e) => {
												var options = {
													...radio.options,
													required: radio.options.required ? false : true,
												};
												setAttributes({
													radio: { ...radio, options: options },
												});
											}}
										/>
										<ToggleControl
											className="my-3"
											label={__("Disabled?", "combo-blocks")}
											help={
												radio.options.disabled
													? __("Disabled Enabled", "combo-blocks")
													: __("Disabled Disabled.", "combo-blocks")
											}
											checked={radio.options.disabled ? true : false}
											onChange={(e) => {
												var options = {
													...radio.options,
													disabled: radio.options.disabled ? false : true,
												};
												setAttributes({
													radio: { ...radio, options: options },
												});
											}}
										/>

										<SelectControl
											label={__("Label Source?", "combo-blocks")}
											value={radio.options.labelSrc}
											options={[
												{ label: "Default", value: "" },
												{ label: "Image", value: "img" },
												{ label: "Icon", value: "icon" },
											]}
											onChange={(newVal) => {
												var options = {
													...radio.options,
													labelSrc: newVal,
												};
												setAttributes({
													radio: { ...radio, options: options },
												});
											}}
										/>

										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Object Type?", "combo-blocks")}
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={objectMapOptions}
												buttonTitle={
													radio.options.objMap == undefined ||
														radio.options.objMap.length == 0
														? __("Choose...", "combo-blocks")
														: objectMapOptions[radio.options.objMap] ==
															undefined
															? __("Choose...", "combo-blocks")
															: objectMapOptions[radio.options.objMap].label
												}
												onChange={(newVal) => {
													var options = {
														...radio.options,
														objMap: newVal.value,
													};
													setAttributes({
														radio: { ...radio, options: options },
													});
												}}
												value={radio.options.objMap}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={radio}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													radio,
													"radio",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													radio,
													"radio",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													radio,
													"radio",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													radio,
													"radio",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													radio,
													"radio",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Icon", "combo-blocks")}
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={onChangeIcon}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Icon position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Text", "combo-blocks"),
													value: "beforeText",
												},
												{
													label: __("After Text", "combo-blocks"),
													value: "afterText",
												},
												{
													label: __("Before Prefix", "combo-blocks"),
													value: "beforePrefix",
												},
												{
													label: __("After Prefix", "combo-blocks"),
													value: "afterPrefix",
												},
												{
													label: __("Before Postfix", "combo-blocks"),
													value: "beforePostfix",
												},
												{
													label: __("After Postfix", "combo-blocks"),
													value: "afterPostfix",
												},
												{
													label: __("Before Link", "combo-blocks"),
													value: "beforeLink",
												},
												{
													label: __("After Link", "combo-blocks"),
													value: "afterLink",
												},
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												icon,
												"icon",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												icon,
												"icon",
												iconSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css"></PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Error Wrap", "combo-blocks")}
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
									<PanelRow className="mb-4">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Error Text", "combo-blocks")}
										</label>
										<InputControl
											className="mr-2"
											value={errorWrap.options.text}
											onChange={(newVal) => {
												var options = { ...errorWrap.options, text: newVal };
												setAttributes({
													errorWrap: { ...errorWrap, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={errorWrap.options.position}
											options={[
												{ label: __("None", "combo-blocks"), value: "" },
												{
													label: __("After Label", "combo-blocks"),
													value: "afterlabel",
												},
												{
													label: __("After Input", "combo-blocks"),
													value: "afterInput",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...errorWrap.options,
													position: newVal,
												};
												setAttributes({
													errorWrap: { ...errorWrap, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={errorWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												errorWrap,
												"errorWrap",
												errorWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												errorWrap,
												"errorWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												errorWrap,
												"errorWrap",
												errorWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												errorWrap,
												"errorWrap",
												errorWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												errorWrap,
												"errorWrap",
												errorWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
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
					</div>
				</InspectorControls>
				<div {...blockProps}>
					<div className="label-wrap">
						{label.options.enable && (
							<label htmlFor="" className="font-medium text-slate-900 ">
								{label.options.text}
							</label>
						)}
						{errorWrap.options.position == "afterlabel" && (
							<div className="error-wrap">{errorWrap.options.text}</div>
						)}
					</div>
					<div className="input-wrap">
						{radio.options.args.map((arg, index) => {
							return (
								<div className="item " key={index}>
									<input
										className={[
											radio.options.labelSrc.length > 0 ? "!hidden" : "",
										]}
										type="radio"
										value={arg.value}
										name={radio.options.name}
										multiple={radio.options.multiple}
										required={radio.options.required}
										disabled={radio.options.disabled}
										readonly={radio.options.readonly}
										id={blockId + "-" + index}
										onChange={(ev) => {
											var newVal = ev.target.value;
											var options = { ...radio.options, value: newVal };
											setAttributes({ radio: { ...radio, options: options } });
										}}
									/>
									<label for={blockId + "-" + index}>
										{radio.options.labelSrc == "img" && (
											<>
												<img src={arg.img.src} alt={arg.img.alt} />
											</>
										)}
										{radio.options.labelSrc == "icon" && <>Iocn</>}
										{radio.options.labelSrc.length == 0 && <>{arg.label}</>}
									</label>
								</div>
							);
						})}
						{errorWrap.options.position == "afterInput" && (
							<div className="error-wrap">{errorWrap.options.text}</div>
						)}
					</div>
				</div>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
