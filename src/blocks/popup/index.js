import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	ToggleControl,
} from "@wordpress/components";
import { select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, settings } from "@wordpress/icons";
import "animate.css";
import "../../../node_modules/animate.css/animate.css";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGConditionalGroups from "../../components/conditional-groups";
import PGcssClassPicker from "../../components/css-class-picker";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGPopupVisible from "../../components/popup-visible";
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
				width="161"
				height="160"
				viewBox="0 0 161 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M140.818 145.024H3.46346C1.56434 145.024 -0.00244141 143.458 -0.00244141 141.558V36.252C-0.00244141 34.3529 1.56434 32.7861 3.46346 32.7861H140.818C142.717 32.7861 144.283 34.3529 144.283 36.252V141.558C144.283 143.458 142.717 145.024 140.818 145.024Z"
					fill="url(#paint0_linear_61_152)"
				/>
				<path
					d="M142.532 50.0687C152.216 50.0687 160.066 42.2183 160.066 32.5343C160.066 22.8504 152.216 15 142.532 15C132.848 15 124.998 22.8504 124.998 32.5343C124.998 42.2183 132.848 50.0687 142.532 50.0687Z"
					fill="#C15940"
				/>
				<path
					d="M143.612 32.534L150.205 25.9404C150.497 25.6486 150.497 25.1527 150.205 24.8609C149.913 24.5692 149.417 24.5692 149.126 24.8609L142.532 31.4545L135.938 24.8609C135.647 24.5692 135.151 24.5692 134.859 24.8609C134.567 25.1527 134.567 25.6486 134.859 25.9404L141.453 32.534L134.859 39.1276C134.567 39.4194 134.567 39.9153 134.859 40.2071C135.005 40.353 135.209 40.4405 135.384 40.4405C135.559 40.4405 135.763 40.353 135.909 40.2071L142.503 33.6135L149.096 40.2071C149.242 40.353 149.447 40.4405 149.622 40.4405C149.826 40.4405 150.001 40.353 150.147 40.2071C150.439 39.9153 150.439 39.4194 150.147 39.1276L143.612 32.534Z"
					fill="white"
					stroke="white"
					strokeWidth="4"
				/>
				<path
					d="M58.5562 66.9326H13.7328C12.7422 66.9326 11.7921 67.3262 11.0916 68.0267C10.3911 68.7272 9.99756 69.6772 9.99756 70.6679V108.021C9.99756 109.011 10.3911 109.961 11.0916 110.662C11.7921 111.362 12.7422 111.756 13.7328 111.756H58.5562C59.5469 111.756 60.497 111.362 61.1975 110.662C61.898 109.961 62.2915 109.011 62.2915 108.021V70.6679C62.2915 69.6772 61.898 68.7272 61.1975 68.0267C60.497 67.3262 59.5469 66.9326 58.5562 66.9326ZM54.8209 104.285H17.4681V74.4032H54.8209V104.285Z"
					fill="white"
				/>
				<path
					d="M136.998 78.1382H77.2334V85.6087H136.998V78.1382Z"
					fill="white"
				/>
				<path
					d="M122.057 93.0791H77.2334V100.55H122.057V93.0791Z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_152"
						x1="-0.00244141"
						y1="88.9052"
						x2="144.283"
						y2="88.9052"
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
		var closeWrap = attributes.closeWrap;
		var entranceWrap = attributes.entranceWrap;
		var inner = attributes.inner;
		var trigger = attributes.trigger;
		var closeTrigger = attributes.closeTrigger;
		var editMode = attributes.editMode;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var closeWrapSelector = blockClass + " .close";
		var innerSelector = blockClass + " .inner";
		var popupCloseAnimateBasic = {
			backOutDown: { label: "backOutDown", value: "backOutDown" },
			backOutLeft: { label: "backOutLeft", value: "backOutLeft" },
			backOutRight: {
				label: "backOutRight",
				value: "backOutRight",
				isPro: true,
			},
			backOutUp: { label: "backOutUp", value: "backOutUp", isPro: true },
			bounceOut: { label: "bounceOut", value: "bounceOut" },
			bounceOutDown: {
				label: "bounceOutDown",
				value: "bounceOutDown",
				isPro: true,
			},
			bounceOutLeft: {
				label: "bounceOutLeft",
				value: "bounceOutLeft",
				isPro: true,
			},
			bounceOutRight: {
				label: "bounceOutRight",
				value: "bounceOutRight",
				isPro: true,
			},
			bounceOutUp: { label: "bounceOutUp", value: "bounceOutUp", isPro: true },
			fadeOut: { label: "fadeOut", value: "fadeOut" },
			fadeOutDown: { label: "fadeOutDown", value: "fadeOutDown", isPro: true },
			fadeOutDownBig: {
				label: "fadeOutDownBig",
				value: "fadeOutDownBig",
				isPro: true,
			},
			fadeOutLeft: { label: "fadeOutLeft", value: "fadeOutLeft", isPro: true },
			fadeOutLeftBig: {
				label: "fadeOutLeftBig",
				value: "fadeOutLeftBig",
				isPro: true,
			},
			fadeOutRight: {
				label: "fadeOutRight",
				value: "fadeOutRight",
				isPro: true,
			},
			fadeOutRightBig: {
				label: "fadeOutRightBig",
				value: "fadeOutRightBig",
				isPro: true,
			},
			fadeOutUp: { label: "fadeOutUp", value: "fadeOutUp", isPro: true },
			fadeOutUpBig: {
				label: "fadeOutUpBig",
				value: "fadeOutUpBig",
				isPro: true,
			},
			fadeOutTopLeft: {
				label: "fadeOutTopLeft",
				value: "fadeOutTopLeft",
				isPro: true,
			},
			fadeOutTopRight: {
				label: "fadeOutTopRight",
				value: "fadeOutTopRight",
				isPro: true,
			},
			fadeOutBottomRight: {
				label: "fadeOutBottomRight",
				value: "fadeOutBottomRight",
				isPro: true,
			},
			fadeOutBottomLeft: {
				label: "fadeOutBottomLeft",
				value: "fadeOutBottomLeft",
				isPro: true,
			},
			rotateOut: { label: "rotateOut", value: "rotateOut" },
			rotateOutDownLeft: {
				label: "rotateOutDownLeft",
				value: "rotateOutDownLeft",
				isPro: true,
			},
			rotateOutDownRight: {
				label: "rotateOutDownRight",
				value: "rotateOutDownRight",
				isPro: true,
			},
			rotateOutUpLeft: {
				label: "rotateOutUpLeft",
				value: "rotateOutUpLeft",
				isPro: true,
			},
			rotateOutUpRight: {
				label: "rotateOutUpRight",
				value: "rotateOutUpRight",
				isPro: true,
			},
			zoomOut: { label: "zoomOut", value: "zoomOut", isPro: true },
			zoomOutDown: { label: "zoomOutDown", value: "zoomOutDown", isPro: true },
			zoomOutLeft: { label: "zoomOutLeft", value: "zoomOutLeft", isPro: true },
			zoomOutRight: {
				label: "zoomOutRight",
				value: "zoomOutRight",
				isPro: true,
			},
			zoomOutUp: { label: "zoomOutUp", value: "zoomOutUp", isPro: true },
			slideOutDown: {
				label: "slideOutDown",
				value: "slideOutDown",
				isPro: true,
			},
			slideOutLeft: {
				label: "slideOutLeft",
				value: "slideOutLeft",
				isPro: true,
			},
			slideOutRight: {
				label: "slideOutRight",
				value: "slideOutRight",
				isPro: true,
			},
			slideOutUp: { label: "slideOutUp", value: "slideOutUp", isPro: true },
		};
		let closeAnimateArgs = applyFilters(
			"comboBlocksPopupCloseAnimation",
			popupCloseAnimateBasic
		);
		var popupEntranceAnimateBasic = {
			backInDown: { label: "backInDown", value: "backInDown" },
			backInLeft: { label: "backInLeft", value: "backInLeft" },
			backInRight: { label: "backInRight", value: "backInRight", isPro: true },
			backInUp: { label: "backInUp", value: "backInUp", isPro: true },
			bounceIn: { label: "bounceIn", value: "bounceIn" },
			bounceInDown: {
				label: "bounceInDown",
				value: "bounceInDown",
				isPro: true,
			},
			bounceInLeft: {
				label: "bounceInLeft",
				value: "bounceInLeft",
				isPro: true,
			},
			bounceInRight: {
				label: "bounceInRight",
				value: "bounceInRight",
				isPro: true,
			},
			bounceInUp: { label: "bounceInUp", value: "bounceInUp", isPro: true },
			fadeIn: { label: "fadeIn", value: "fadeIn" },
			fadeInDown: { label: "fadeInDown", value: "fadeInDown", isPro: true },
			fadeInDownBig: {
				label: "fadeInDownBig",
				value: "fadeInDownBig",
				isPro: true,
			},
			fadeInLeft: { label: "fadeInLeft", value: "fadeInLeft", isPro: true },
			fadeInLeftBig: {
				label: "fadeInLeftBig",
				value: "fadeInLeftBig",
				isPro: true,
			},
			fadeInRight: { label: "fadeInRight", value: "fadeInRight", isPro: true },
			fadeInRightBig: {
				label: "fadeInRightBig",
				value: "fadeInRightBig",
				isPro: true,
			},
			fadeInUp: { label: "fadeInUp", value: "fadeInUp", isPro: true },
			fadeInUpBig: { label: "fadeInUpBig", value: "fadeInUpBig", isPro: true },
			fadeInTopLeft: {
				label: "fadeInTopLeft",
				value: "fadeInTopLeft",
				isPro: true,
			},
			fadeInTopRight: {
				label: "fadeInTopRight",
				value: "fadeInTopRight",
				isPro: true,
			},
			fadeInBottomRight: {
				label: "fadeInBottomRight",
				value: "fadeInBottomRight",
				isPro: true,
			},
			fadeInBottomLeft: {
				label: "fadeInBottomLeft",
				value: "fadeInBottomLeft",
				isPro: true,
			},
			rotateIn: { label: "rotateIn", value: "rotateIn" },
			rotateInDownLeft: {
				label: "rotateInDownLeft",
				value: "rotateInDownLeft",
				isPro: true,
			},
			rotateInDownRight: {
				label: "rotateInDownRight",
				value: "rotateInDownRight",
				isPro: true,
			},
			rotateInUpLeft: {
				label: "rotateInUpLeft",
				value: "rotateInUpLeft",
				isPro: true,
			},
			rotateInUpRight: {
				label: "rotateInUpRight",
				value: "rotateInUpRight",
				isPro: true,
			},
			zoomIn: { label: "zoomIn", value: "zoomIn", isPro: true },
			zoomInDown: { label: "zoomInDown", value: "zoomInDown", isPro: true },
			zoomInLeft: { label: "zoomInLeft", value: "zoomInLeft", isPro: true },
			zoomInRight: { label: "zoomInRight", value: "zoomInRight", isPro: true },
			zoomInUp: { label: "zoomInUp", value: "zoomInUp", isPro: true },
			slideInDown: { label: "slideInDown", value: "slideInDown", isPro: true },
			slideInLeft: { label: "slideInLeft", value: "slideInLeft", isPro: true },
			slideInRight: {
				label: "slideInRight",
				value: "slideInRight",
				isPro: true,
			},
			slideInUp: { label: "slideInUp", value: "slideInUp", isPro: true },
		};
		let entranceAnimateArgs = applyFilters(
			"comboBlocksPopupEntranceAnimation",
			popupEntranceAnimateBasic
		);
		var closeTriggerPramsBasic = {
			delay: {
				label: __("Delay", "combo-blocks"),
				description: __(
					"Delay certain amount of time after page load.",
					"combo-blocks"
				),
				args: { id: "delay", value: 1000 },
			},
			scrollPercent: {
				label: __("Scroll Percent", "combo-blocks"),
				description: __("After certain amount(%) of scroll", "combo-blocks"),
				args: { id: "scrollPercent", min: "30", max: 50 },
			},
			scrollFixed: {
				label: __("Scroll Fixed", "combo-blocks"),
				description: __("After fixed amount of scroll", "combo-blocks"),
				args: { id: "scrollFixed", min: "30", max: 50 },
				isPro: true,
			},
			scrollEnd: {
				label: __("Scroll End", "combo-blocks"),
				description: __("Scroll to end of page", "combo-blocks"),
				args: { id: "scrollEnd", min: "30", max: 50 },
				isPro: true,
			},
			scrollElement: {
				label: __("Scroll Element", "combo-blocks"),
				description: __(
					"Scroll to certain element by class or id",
					"combo-blocks"
				),
				args: { id: "scrollElement", value: "" },
				isPro: true,
			},
			clickFirst: {
				label: __("Click First", "combo-blocks"),
				description: __("After first click on page", "combo-blocks"),
				args: { id: "clickFirst", value: 1 },
				isPro: true,
			},
			clickCount: {
				label: __("Click Count", "combo-blocks"),
				description: __("After certain amount of clicks on page", "combo-blocks"),
				args: { id: "clickCount", value: 5 },
				isPro: true,
			},
			clickRight: {
				label: __("Click Right", "combo-blocks"),
				description: __("On right click", "combo-blocks"),
				args: { id: "clickRight", value: 0 },
				isPro: true,
			},
			onExit: {
				label: __("On Exit", "combo-blocks"),
				description: __("Before closing browser tab.", "combo-blocks"),
				args: { id: "onExit", value: 1 },
				isPro: true,
			},
			clickElement: {
				label: __("Click Element", "combo-blocks"),
				description: __(
					"After clicking an element by id or class",
					"combo-blocks"
				),
				args: { id: "clickElement", value: "" },
				isPro: true,
			},
			dateCountdownExpired: {
				label: __("Date Countdown Expired", "combo-blocks"),
				description: __(
					"After expiration from date countdown block",
					"combo-blocks"
				),
				args: { id: "dateCountdownExpired", value: "", once: false },
				isPro: true,
			},
			keyPress: {
				label: __("Key Press", "combo-blocks"),
				description: __("Key press to close.", "combo-blocks"),
				args: { id: "keyPress", values: [] },
				isPro: true,
			},
			mouseOutElement: {
				label: __("Mouse Out Element", "combo-blocks"),
				description: __(
					"If visitor comes from an external website.",
					"combo-blocks"
				),
				args: { id: "mouseOutElement", value: "" },
				isPro: true,
			},
			mouseOverElement: {
				label: __("Mouse Over Element", "combo-blocks"),
				description: __(
					"If visitor comes from an external website.",
					"combo-blocks"
				),
				args: { id: "mouseOverElement", value: "" },
				isPro: true,
			},
			fluentformSubmission: {
				label: __("Fluentform Submission", "combo-blocks"),
				description: __(
					"If visitor comes from an external website.",
					"combo-blocks"
				),
				args: { id: "fluentformSubmission", value: "" },
			},
			formidableformsSubmission: {
				label: __("Formidable Forms Submission", "combo-blocks"),
				description: __(
					"If visitor comes from an external website.",
					"combo-blocks"
				),
				args: { id: "formidableformsSubmission", value: "" },
			},
		};
		var closeTriggerPrams = applyFilters(
			"comboBlocksPopupCloseTriggerPrams",
			closeTriggerPramsBasic
		);
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		const [closeIconHtml, setcloseIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = closeWrap.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setcloseIconHtml(iconHtml);
		}, [closeWrap.options]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[closeWrapSelector] = closeWrap;
			blockCssObj[innerSelector] = inner;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
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
				var innerX = attributes.inner;
				var closeWrapX = attributes.closeWrap;
				var visibleX = attributes.visible;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (visibleX != undefined) {
					var visibleY = { ...visibleX, options: visible.options };
					setAttributes({ visible: visibleY });
					blockCssObj[visibleSelector] = visibleY;
				}
				if (closeWrapX != undefined) {
					var closeWrapY = { ...closeWrapX, options: closeWrap.options };
					setAttributes({ closeWrap: closeWrapY });
					blockCssObj[closeWrapSelector] = closeWrapY;
				}
				if (innerX != undefined) {
					var innerY = { ...innerX, options: inner.options };
					setAttributes({ inner: innerY });
					blockCssObj[innerSelector] = innerY;
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
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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
		function onRemoveStyleInner(sudoScource, key) {
			let obj = { ...inner };
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
			setAttributes({ inner: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				innerSelector
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
		function onRemoveStyleCloseWrap(sudoScource, key) {
			let obj = { ...closeWrap };
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
			setAttributes({ closeWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closeWrapSelector
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
		function onChangeStyleInner(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ inner: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				innerSelector
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
		function onAddStyleInner(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inner: object });
		}
		function onBulkAddInner(sudoScource, cssObj) {
			let obj = Object.assign({}, inner);
			obj[sudoScource] = cssObj;
			setAttributes({ inner: obj });
			var selector = myStore.getElementSelector(sudoScource, innerSelector);
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
		function onChangeStyleCloseWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, closeWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ closeWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				closeWrapSelector
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
		function onAddStyleCloseWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, closeWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ closeWrap: object });
		}
		function onBulkAddCloseWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, closeWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ closeWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, closeWrapSelector);
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
		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoScources).map((args) => {
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
		function onResetCloseWrap(sudoScources) {
			let obj = Object.assign({}, closeWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						closeWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ closeWrap: obj });
		}
		function onResetInner(sudoScources) {
			let obj = Object.assign({}, inner);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						innerSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ inner: obj });
		}
		var RemoveVisibleGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var visibleX = { ...visible };
							delete visibleX[index];
							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveVisibleArg = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var visibleX = { ...visible };
							visibleX[groupId].args.splice(index, 1);
							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		const ALLOWED_BLOCKS = ["combo-blocks/text"];
		const MY_TEMPLATE = [["combo-blocks/text", {}]];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			//orientation: 'horizontal',
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<ToggleControl
								label={__("Edit Mode?", "combo-blocks")}
								help={editMode ? "Edit Mode Enabled" : "Edit Mode Disabled."}
								checked={editMode ? true : false}
								onChange={(e) => {
									setAttributes({ editMode: editMode ? false : true });
								}}
							/>
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Triggers", "combo-blocks")}
							initialOpen={false}>
							<PGPopupVisible
								visible={trigger}
								onChange={(prams) => {
									setAttributes({ trigger: prams });
								}}
							/>
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
							title={__("Content", "combo-blocks")}
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
										obj={inner}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												inner,
												"inner",
												innerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												inner,
												"inner",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												inner,
												"inner",
												innerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												inner,
												"inner",
												innerSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												inner,
												"inner",
												innerSelector,
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
							title={__("Close", "combo-blocks")}
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Choose Close Icon", "combo-blocks")}
										</label>
										<PGIconPicker
											library={closeWrap.options.library}
											srcType={closeWrap.options.srcType}
											iconSrc={closeWrap.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...closeWrap.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({
													closeWrap: { ...closeWrap, options: options },
												});
											}}
										/>
									</PanelRow>
									<div className="flex flex-col gap-2 mt-3 ">
										<label htmlFor="">
											{__("Trigger Name", "combo-blocks")}{" "}
											{isProFeature && (
												<span
													className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white"
													onClick={(ev) => {
														window.open(
															"https://comboblocks.com/pricing/",
															"_blank"
														);
													}}>
													{__("Pro", "combo-blocks")}
												</span>
											)}
										</label>
										<InputControl
											className="mr-2"
											disabled={isProFeature}
											value={closeWrap.options.triggerName}
											onChange={(newVal) => {
												var options = {
													...closeWrap.options,
													triggerName: newVal,
												};
												setAttributes({
													closeWrap: { ...closeWrap, options: options },
												});
											}}
										/>
									</div>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("In animation", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												entranceAnimateArgs[entranceWrap.options.animation] ==
													undefined
													? __("Choose", "combo-blocks")
													: entranceAnimateArgs[entranceWrap.options.animation]
														.label
											}
											options={entranceAnimateArgs}
											onChange={(option, index) => {
												var options = {
													...entranceWrap.options,
													animation: option.value,
												};
												setAttributes({
													entranceWrap: { ...entranceWrap, options: options },
												});
												const element = document.querySelector(
													wrapperSelector + " .inner"
												);
												element.classList.add(
													"animate__animated",
													"animate__" + option.value
												);
												setTimeout(() => {
													element.classList.remove(
														"animate__animated",
														"animate__" + option.value
													);
												}, 2000);
											}}
											values=""></PGDropdown>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Out animation", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												closeAnimateArgs[closeWrap.options.animation] ==
													undefined
													? __("Choose", "combo-blocks")
													: closeAnimateArgs[closeWrap.options.animation].label
											}
											options={closeAnimateArgs}
											onChange={(option, index) => {
												var options = {
													...closeWrap.options,
													animation: option.value,
												};
												setAttributes({
													closeWrap: { ...closeWrap, options: options },
												});
												const element = document.querySelector(
													wrapperSelector + " .inner"
												);
												element.classList.add(
													"animate__animated",
													"animate__" + option.value
												);
												setTimeout(() => {
													element.classList.remove(
														"animate__animated",
														"animate__" + option.value
													);
												}, 2000);
											}}
											values=""></PGDropdown>
									</PanelRow>
									<PGtoggle
										className="font-medium text-slate-900 mt-4"
										title={
											<span className="flex justify-between w-full gap-2 ">
												<span>{__("Close Triggers", "combo-blocks")}</span>
												{isProFeature ? (
													<span
														className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white"
														onClick={(ev) => {
															window.open(
																"https://comboblocks.com/pricing/",
																"_blank"
															);
														}}>
														Pro
													</span>
												) : (
													""
												)}{" "}
											</span>
										}
										opened={isProFeature ? false : null}
										initialOpen={false}>
										<PGConditionalGroups
											visible={closeTrigger}
											prams={closeTriggerPrams}
											onChange={(prams) => {
												setAttributes({ closeTrigger: prams });
											}}
										/>
									</PGtoggle>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={closeWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												closeWrap,
												"closeWrap",
												closeWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												closeWrap,
												"closeWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												closeWrap,
												"closeWrap",
												closeWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												closeWrap,
												"closeWrap",
												closeWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												closeWrap,
												"closeWrap",
												closeWrapSelector,
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
													["combo-blocks/text", {}],
												]),
												true
											);
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...innerBlocksProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"popup"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							{!editMode && (
								<div
									className="text-center inline-block mx-auto"
									onClick={(e) => {
										setAttributes({ editMode: editMode ? false : true });
									}}>
									{__("Enable Edit Mode", "combo-blocks")}
								</div>
							)}
							{editMode && (
								<div className="inner">
									<span className="close">
										<span
											className="icon"
											dangerouslySetInnerHTML={{ __html: closeIconHtml }}
										/>
									</span>
									{innerBlocksProps.children}
								</div>
							)}
						</div>
					)}
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
			className: ` ${blockId} pg-popup`,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
