import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	addCard,
	blockMeta,
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
import PGVisible from "../../components/visible";

import PGcssClassPicker from "../../components/css-class-picker";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import customTags from "../../custom-tags";
import {
	inputValueSourcesPrams,
	objectMapOptionsPrams,
} from "../../input-value-sources";
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
		var select = attributes.select;
		var icon = attributes.icon;
		var inputWrap = attributes.inputWrap;
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
		var inputSelector = blockClass + " select";
		var labelWrapSelector = blockClass + " .label-wrap";
		var inputWrapSelector = blockClass + " .input-wrap";
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
		var formFieldSelectParamSourceBasic = {
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
			"comboBlocksFormFieldSelectParamSource",
			formFieldSelectParamSourceBasic
		);
		function setParamsSource(option, index) {
			var newVal = option.value;
			var optionsX = { ...select.options };
			var argsSrc = optionsX.argsSrc;
			//argsSrc.src = newVal;
			if (newVal == "taxonomy") {
				optionsX = {
					...optionsX,
					argsSrc: {
						src: newVal,
						srcPrams: { taxonomy: "", field: "id" },
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
							field: "id",
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
				select: { ...select, options: optionsX },
			});
		}
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[labelSelector] = label;
			blockCssObj[inputSelector] = select;
			blockCssObj[iconSelector] = icon;
			blockCssObj[labelWrapSelector] = labelWrap;
			blockCssObj[inputWrapSelector] = inputWrap;
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
		const parentClientId = wp.data
			.select("core/block-editor")
			.getBlockRootClientId(clientId);
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
				var inputX = attributes.select;
				var labelWrapX = attributes.labelWrap;
				var inputWrapX = attributes.inputWrap;
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
				if (inputX != undefined) {
					var inputY = { ...inputX, options: select.options };
					setAttributes({ select: inputY });
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
		function RemoveArgs({ index, title }) {
			return (
				<>
					<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 rounded-sm">
						<Icon
							fill="#fff"
							icon={close}
							onClick={(ev) => {
								var optionsX = { ...select.options };
								optionsX.args.splice(index, 1);
								setAttributes({ select: { ...select, options: optionsX } });
							}}
						/>
					</span>
					<span className="ml-2">{title}</span>
				</>
			);
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
			let obj = { ...select };
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
			setAttributes({ select: objectX });
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
			let obj = Object.assign({}, select);
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
			setAttributes({ select: obj });
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
			let obj = Object.assign({}, select);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ select: object });
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
			let obj = Object.assign({}, select);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ select: object });
		}
		function onBulkAddInput(sudoScource, cssObj) {
			let obj = Object.assign({}, select);
			obj[sudoScource] = cssObj;
			setAttributes({ select: obj });
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
					var optionsX = { ...select.options };
					var argsX = parsedData;
					optionsX.args = argsX;
					setAttributes({
						select: { ...select, options: optionsX },
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
								title={__("Select", "combo-blocks")}
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
										<div className="flex justify-around items-center">
											{/* add */}

											<div
												// className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-3 py-2 rounded-sm text-white inline-block my-3 mr-2"
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												data-pgTooltip="Add Option"
												onClick={(ev) => {
													var optionsX = { ...select.options };
													var argsX = [...select.options.args];
													argsX.push({ label: "Label", value: "" });
													optionsX.args = argsX;
													setAttributes({
														select: { ...select, options: optionsX },
													});
												}}>
												<Icon
													icon={addCard}
													className="fill-white "
													size={18}
												/>
												{__("Add", "combo-blocks")}
											</div>
											{/* add */}
											{/* add group */}
											<div
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												data-pgTooltip="Add Option Group"
												onClick={(ev) => {
													var optionsX = { ...select.options };
													optionsX.args.push({
														label: "Group Label",
														args: [],
													});
													setAttributes({
														select: { ...select, options: optionsX },
													});
												}}>
												<Icon
													icon={blockMeta}
													className="fill-white "
													size={18}
												/>
												{__("Add Group", "combo-blocks")}
											</div>

											{/* add group */}
											{/* pram */}
											<div className=" inline-block  relative">
												<div
													// className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2 cursor-pointer "
													className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
													onClick={(ev) => {
														setpramSrcEnable(!pramSrcEnable);
													}}>
													{__("Source", "combo-blocks")}
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
																	options={paramSourceArgs}
																	buttonTitle={
																		select.options.argsSrc.src == undefined ||
																			select.options.argsSrc.src.length == 0
																			? __("Choose", "combo-blocks")
																			: paramSourceArgs[
																				select.options.argsSrc?.src
																			]?.label
																	}
																	onChange={setParamsSource}
																	values={[]}></PGDropdown>
															</PanelRow>
															{select.options.argsSrc.src == "posts" && (
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
																				select.options.argsSrc.srcPrams.postType
																			}
																			options={postTypes}
																			onChange={(newVal) => {
																				var options = { ...select.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.postType = newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>
																	</div>
																</>
															)}
															{select.options.argsSrc.src == "taxonomy" && (
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
																				select.options.argsSrc.srcPrams
																					?.taxonomy
																			}
																			options={taxonomies}
																			onChange={(newVal) => {
																				var options = { ...select.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.taxonomy = newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>
																	</div>
																	<div className="flex items-center justify-between gap-2 whitespace-nowrap pg-setting-input-text  ">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 pg-font ">
																			{__("Return Field?", "combo-blocks")}
																		</label>
																		<SelectControl
																			label=""
																			value={
																				select.options.argsSrc.srcPrams?.field
																			}
																			options={[
																				{ label: "ID", value: "id" },
																				{ label: "Slug", value: "slug" },
																			]}
																			onChange={(newVal) => {
																				var options = { ...select.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.field = newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>
																	</div>
																</>
															)}
															{select.options.argsSrc.src == "users" && (
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
																				select.options.argsSrc.srcPrams.role
																			}
																			options={userRoles}
																			onChange={(newVal) => {
																				var options = { ...select.options };
																				var argsSrc = options.argsSrc;
																				var srcPrams = argsSrc.srcPrams;
																				srcPrams.role = newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
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
											{/* pram */}
										</div>
										<div className="flex items-center justify-around">
											<div
												className="pg-font flex gap-1 justify-center my-2 cursor-pointer py-1 px-2 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												data-pgTooltip="Copy"
												onClick={(ev) => {
													copyData(select.options.args);
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

										<div>{__("Data Sets", "combo-blocks")}</div>
										<div>
											{select.options.argsSrc?.src?.length == 0 && (
												<>
													{select.options.args.map((arg, index) => {
														var args = arg.args;
														if (args != undefined) {
															return (
																<PGtoggle
																	key={index}
																	title={
																		<RemoveArgs
																			index={index}
																			title={arg.label}
																		/>
																	}
																	initialOpen={false}>
																	<div
																		className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-sm text-white inline-block my-3 mr-2"
																		onClick={(ev) => {
																			var optionsX = { ...select.options };
																			optionsX.args[index].args.push({
																				label: "label",
																				value: "",
																			});
																			setAttributes({
																				select: {
																					...select,
																					options: optionsX,
																				},
																			});
																		}}>
																		{__("Add Option", "combo-blocks")}
																	</div>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			{__("Group Label", "combo-blocks")}
																		</label>
																		<InputControl
																			className="mr-2"
																			value={arg.label}
																			onChange={(newVal) => {
																				var options = { ...select.options };
																				var args = options.args;
																				args[index]["label"] = newVal;
																				setAttributes({
																					select: {
																						...select,
																						options: options,
																					},
																				});
																			}}
																		/>
																	</PanelRow>
																	{args.map((optionData, optionIndex) => {
																		return (
																			<div
																				className="flex justify-between items-center my-3"
																				key={optionIndex}>
																				<InputControl
																					className="mr-2"
																					value={optionData.label}
																					placeholder="Option Label"
																					onChange={(newVal) => {
																						// var selectOptionsX = { ...selectOptions };
																						// selectOptionsX[index]['args'][optionIndex]['label'] = newVal
																						// setAttributes({ selectOptions: selectOptionsX });
																						var options = { ...select.options };
																						var args = options.args;
																						args[index]["args"][
																							optionIndex
																						].label = newVal;
																						setAttributes({
																							select: {
																								...select,
																								options: options,
																							},
																						});
																					}}
																				/>
																				<InputControl
																					className="mr-2"
																					value={optionData.value}
																					placeholder="Option Value"
																					onChange={(newVal) => {
																						var options = { ...select.options };
																						var args = options.args;
																						args[index]["args"][
																							optionIndex
																						].value = newVal;
																						setAttributes({
																							select: {
																								...select,
																								options: options,
																							},
																						});
																					}}
																				/>
																				<span className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded-sm">
																					<Icon
																						fill="#fff"
																						icon={close}
																						onClick={(ev) => {
																							// var selectOptionsX = { ...selectOptions };
																							// delete selectOptionsX[index];
																							// setAttributes({ selectOptions: selectOptionsX });
																							var options = {
																								...select.options,
																							};
																							var args = options.args;
																							delete args[index]["args"][
																								optionIndex
																							];
																							setAttributes({
																								select: {
																									...select,
																									options: options,
																								},
																							});
																						}}
																					/>
																				</span>
																			</div>
																		);
																	})}
																</PGtoggle>
															);
														}
														return (
															<div className="flex justify-between items-center my-3">
																<RemoveArgs index={index} />
																<InputControl
																	className="mr-2"
																	value={arg.label}
																	placeholder="Option Label"
																	onChange={(newVal) => {
																		var options = { ...select.options };
																		var args = options.args;
																		args[index].label = newVal;
																		setAttributes({
																			select: { ...select, options: options },
																		});
																	}}
																/>
																<InputControl
																	className="mr-2"
																	placeholder="Option Value"
																	value={arg.value}
																	onChange={(newVal) => {
																		// var selectOptionsX = { ...selectOptions };
																		// selectOptionsX[index]['value'] = newVal
																		// setAttributes({ selectOptions: selectOptionsX });
																		var options = { ...select.options };
																		var args = options.args;
																		args[index].value = newVal;
																		setAttributes({
																			select: { ...select, options: options },
																		});
																	}}
																/>
															</div>
														);
													})}
												</>
											)}
											{select.options.argsSrc?.src?.length > 0 && (
												<>
													<div className="bg-orange-300 p-2">
														{__(
															"Options will automatically generated from",
															"combo-blocks"
														)}
														<span className="text-bold">
															{select.options.argsSrc.src}
														</span>
													</div>
												</>
											)}
										</div>
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
												value={select.options.name}
												onChange={(newVal) => {
													var options = { ...select.options, name: newVal };
													setAttributes({
														select: { ...select, options: options },
													});
												}}
											/>
										</PanelRow>
										{typeof select.options.value == "object" && (
											<PanelRow className="mb-4">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Field Value", "combo-blocks")}
												</label>
												<ul>
													{select.options.value != null &&
														Object.entries(select.options.value).map((x, i) => {
															var val = x[1];
															return <li key={i}>{val}</li>;
														})}
												</ul>
											</PanelRow>
										)}
										{typeof select.options.value == "string" && (
											<div>
												<PanelRow className="mb-4">
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Field Value", "combo-blocks")}
													</label>
													<InputControl
														className="mr-2"
														value={select.options.value}
														onChange={(newVal) => {
															var options = {
																...select.options,
																value: newVal,
															};
															setAttributes({
																select: { ...select, options: options },
															});
														}}
													/>
												</PanelRow>
											</div>
										)}
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Default Value Source", "combo-blocks")}
											</label>

											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={inputValueSources}
												buttonTitle={
													select.options.valueSource == undefined ||
														select.options.valueSource.length == 0
														? __("Choose...", "combo-blocks")
														: inputValueSources[select.options.valueSource] ==
															undefined
															? __("Choose...", "combo-blocks")
															: inputValueSources[select.options.valueSource]
																.label
												}
												onChange={(newVal) => {
													const options = {
														...select.options,
														valueSource: newVal.value,
													};
													setAttributes({
														select: { ...select, options: options },
													});
												}}
												value={select.options.valueSource}
											/>
										</PanelRow>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Placeholder", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={select.options.placeholder}
												onChange={(newVal) => {
													var options = {
														...select.options,
														placeholder: newVal,
													};
													setAttributes({
														select: { ...select, options: options },
													});
												}}
											/>
										</PanelRow>
										<ToggleControl
											className="my-3"
											label={__("Multiple?", "combo-blocks")}
											help={
												select.options.multiple
													? __("Multiple Enabled", "combo-blocks")
													: __("Multiple Disabled.", "combo-blocks")
											}
											checked={select.options.multiple ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													multiple: select.options.multiple ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>
										<ToggleControl
											className="my-3"
											label={__("Readonly?", "combo-blocks")}
											help={
												select.options.readonly
													? __("Readonly Enabled", "combo-blocks")
													: __("Readonly Disabled.", "combo-blocks")
											}
											checked={select.options.readonly ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													readonly: select.options.readonly ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>
										<ToggleControl
											className="my-3"
											label={__("Required?", "combo-blocks")}
											help={
												select.options.required
													? __("Required Enabled", "combo-blocks")
													: __("Required Disabled.", "combo-blocks")
											}
											checked={select.options.required ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													required: select.options.required ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
												});
											}}
										/>
										<ToggleControl
											className="my-3"
											label={__("Disabled?", "combo-blocks")}
											help={
												select.options.disabled
													? __("Disabled Enabled", "combo-blocks")
													: __("Disabled Disabled.", "combo-blocks")
											}
											checked={select.options.disabled ? true : false}
											onChange={(e) => {
												var options = {
													...select.options,
													disabled: select.options.disabled ? false : true,
												};
												setAttributes({
													select: { ...select, options: options },
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
													select.options.objMap == undefined ||
														select.options.objMap.length == 0
														? __("Choose...", "combo-blocks")
														: objectMapOptions[select.options.objMap] ==
															undefined
															? __("Choose...", "combo-blocks")
															: objectMapOptions[select.options.objMap].label
												}
												onChange={(newVal) => {
													var options = {
														...select.options,
														objMap: newVal.value,
													};
													setAttributes({
														select: { ...select, options: options },
													});
												}}
												value={select.options.objMap}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={select}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													select,
													"select",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													select,
													"select",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													select,
													"select",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													select,
													"select",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													select,
													"select",
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
													value: "afterLabel",
												},
												{ label: "After Input", value: "afterInput" },
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
				<div {...blockProps}>
					<div className="label-wrap">
						{label.options.enable && (
							<label htmlFor="" className="font-medium text-slate-900 ">
								{label.options.text}
							</label>
						)}
						{errorWrap.options.position == "afterLabel" && (
							<div className="error-wrap">{errorWrap.options.text}</div>
						)}
					</div>
					<div className="input-wrap">
						<select
							name={select.options.name}
							multiple={select.options.multiple}
							required={select.options.required}
							disabled={select.options.disabled}
							readonly={select.options.readonly}
							onChange={(ev) => {
								var newVal = ev.target.value;
								var multiple = select.options.multiple;
								if (multiple) {
									var oldVal = select.options.value;
									if (typeof select.options.value == "object") {
										var count = select.options.value.length;
										var valueX = select.options.value;
										valueX[count] = newVal;
									} else {
										valueX = [oldVal];
									}
									var options = { ...select.options, value: valueX };
								} else {
									var options = { ...select.options, value: newVal };
								}
								setAttributes({ select: { ...select, options: options } });
							}}>
							{select.options.args.map((arg, index) => {
								var args = arg.args;
								if (args != undefined) {
									return (
										<optgroup label={arg.label} key={index}>
											{args.map((optionData, i) => {
												return (
													<option value={optionData.value} key={i}>
														{optionData.label}
													</option>
												);
											})}
										</optgroup>
									);
								}
								if (args == undefined) {
									return <option value={arg.value}>{arg.label}</option>;
								}
							})}
						</select>
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
