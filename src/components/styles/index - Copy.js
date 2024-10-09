const { Component, RawHTML } = wp.element;
import {
	Panel,
	PanelBody,
	PanelRow,
	PanelItem,
	Button,
	Dropdown,
	SelectControl,
	Spinner,
	Popover,
} from "@wordpress/components";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";

import { __experimentalInputControl as InputControl } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import apiFetch from "@wordpress/api-fetch";
import {
	Icon,
	close,
	arrowRight,
	settings,
	copy,
	check,
} from "@wordpress/icons";

import PGDropdown from "../../components/dropdown";
import PGDropdownSudoSelector from "../../components/dropdown-sudo-selector";

import PGcssAlignContent from "../../components/css-align-content";
import PGcssAlignItems from "../../components/css-align-items";
import PGcssAlignSelf from "../../components/css-align-self";
import PGcssAspectRatio from "../../components/css-aspect-ratio";

import PGcssBackfaceVisibility from "../../components/css-backface-visibility";
import PGcssBackgroundAttachment from "../../components/css-background-attachment";
import PGcssBackgroundBlendMode from "../../components/css-background-blend-mode";
import PGcssBackgroundClip from "../../components/css-background-clip";
import PGcssBackgroundColor from "../../components/css-background-color";
import PGcssBgColor from "../../components/css-bg-color";

import PGcssBackgroundImage from "../../components/css-background-image";
import PGcssBackgroundOrigin from "../../components/css-background-origin";
import PGcssBackgroundPosition from "../../components/css-background-position";
import PGcssBackgroundRepeat from "../../components/css-background-repeat";
import PGcssBackgroundSize from "../../components/css-background-size";
import PGcssBorder from "../../components/css-border";
import PGcssBorderTop from "../../components/css-border-top";
import PGcssBorderRight from "../../components/css-border-right";
import PGcssBorderBottom from "../../components/css-border-bottom";
import PGcssBorderLeft from "../../components/css-border-left";
import PGcssBorderRadius from "../../components/css-border-radius";
import PGcssBorderImage from "../../components/css-border-image";

import PGcssBottom from "../../components/css-bottom";
import PGcssBorderCollapse from "../../components/css-border-collapse";
import PGcssBorderSpacing from "../../components/css-border-spacing";

import PGcssBackdropFilter from "../../components/css-backdrop-filter";

import PGcssBoxShadow from "../../components/css-box-shadow";
import PGcssBoxSizing from "../../components/css-box-sizing";
import PGcssClear from "../../components/css-clear";
// import PGcssClip from '../../components/css-clip'
// import PGcssClipPath from '../../components/css-clipPath'
import PGcssColor from "../../components/css-color";
import PGcssCursor from "../../components/css-cursor";
import PGcssContent from "../../components/css-content";
import PGcssCounterIncrement from "../../components/css-counter-increment";
import PGcssCounterReset from "../../components/css-counter-reset";
import PGcssCounterSet from "../../components/css-counter-set";
import PGcssColumnCount from "../../components/css-column-count";
import PGcssColumnRule from "../../components/css-column-rule";
import PGcssClip from "../../components/css-clip";

import PGcssDisplay from "../../components/css-display";
import PGcssDirection from "../../components/css-direction";

import PGcssFilter from "../../components/css-filter";
import PGcssFloat from "../../components/css-float";
import PGcssFontFamily from "../../components/css-font-family";
import PGcssFontSize from "../../components/css-font-size";
import PGcssFontStretch from "../../components/css-font-stretch";
import PGcssFontStyle from "../../components/css-font-style";
import PGcssFontWeight from "../../components/css-font-weight";
import PGcssFontVariantCaps from "../../components/css-font-variant-caps";
import PGcssFlexWrap from "../../components/css-flex-wrap";
import PGcssFlexDirection from "../../components/css-flex-direction";
import PGcssFlexShrink from "../../components/css-flex-shrink";
import PGcssFlexBasis from "../../components/css-flex-basis";

import PGcssUserSelect from "../../components/css-user-select";

import PGcssFlexGrow from "../../components/css-flex-grow";
import PGcssFlexFlow from "../../components/css-flex-flow";

import PGcssGridAutoFlow from "../../components/css-grid-auto-flow";
import PGcssGridColumnEnd from "../../components/css-grid-column-end";
import PGcssGridColumnStart from "../../components/css-grid-column-start";
import PGcssGridRowEnd from "../../components/css-grid-row-end";
import PGcssGridRowStart from "../../components/css-grid-row-start";
import PGcssGridTemplateColumns from "../../components/css-grid-template-columns";
import PGcssGridTemplateRows from "../../components/css-grid-template-rows";
import PGcssGridAutoColumns from "../../components/css-grid-auto-columns";

import PGcssHeight from "../../components/css-height";

import PGcssJustifyContent from "../../components/css-justify-content";

import PGcssLeft from "../../components/css-left";
import PGcssLetterSpacing from "../../components/css-letter-spacing";
import PGcssLineHeight from "../../components/css-line-height";
import PGcssListStyle from "../../components/css-list-style";
import PGcssMargin from "../../components/css-margin";
import PGcssMarginTop from "../../components/css-margin-top";
import PGcssMarginRight from "../../components/css-margin-right";
import PGcssMarginBottom from "../../components/css-margin-bottom";
import PGcssMarginLeft from "../../components/css-margin-left";

import PGcssMaxHeight from "../../components/css-max-height";
import PGcssMaxWidth from "../../components/css-max-width";

import PGcssMinHeight from "../../components/css-min-height";
import PGcssMinWidth from "../../components/css-min-width";

import PGcssPerspective from "../../components/css-perspective";

import PGcssObjectFit from "../../components/css-object-fit";
import PGcssOpacity from "../../components/css-opacity";
import PGcssOutline from "../../components/css-outline";
import PGcssOutlineOffset from "../../components/css-outline-offset";
import PGcssOrder from "../../components/css-order";

import PGcssOverflow from "../../components/css-overflow";
import PGcssOverflowX from "../../components/css-overflow-x";
import PGcssOverflowY from "../../components/css-overflow-y";
import PGcssPadding from "../../components/css-padding";

import PGcssPaddingTop from "../../components/css-padding-top";
import PGcssPaddingRight from "../../components/css-padding-right";
import PGcssPaddingBottom from "../../components/css-padding-bottom";
import PGcssPaddingLeft from "../../components/css-padding-left";
import PGcssPlaceItems from "../../components/css-place-items";

import PGcssPosition from "../../components/css-position";
import PGcssRight from "../../components/css-right";
import PGcssGap from "../../components/css-gap";
import PGcssColumnGap from "../../components/css-column-gap";
import PGcssRowGap from "../../components/css-row-gap";

import PGcssTextAlign from "../../components/css-text-align";

import PGcssTransformOrigin from "../../components/css-transform-origin";
import PGcssTextDecoration from "../../components/css-text-decoration";
import PGcssTextIndent from "../../components/css-text-indent";
import PGcssTextJustify from "../../components/css-text-justify";
import PGcssTextOverflow from "../../components/css-text-overflow";
import PGcssTextShadow from "../../components/css-text-shadow";
import PGcssTextTransform from "../../components/css-text-transform";
import PGcssTop from "../../components/css-top";
import PGcssTextAlignLast from "../../components/css-text-align-last";
import PGcssTableLayout from "../../components/css-table-layout";
import PGcssEmptyCells from "../../components/css-empty-cells";

import PGcssTransform from "../../components/css-transform";
import PGcssTransition from "../../components/css-transition";
import PGcssVerticalAlign from "../../components/css-vertical-align";
import PGcssVisibility from "../../components/css-visibility";
import PGcssWidth from "../../components/css-width";
import PGcssWhiteSpace from "../../components/css-white-space";

import PGcssWordBreak from "../../components/css-word-break";
import PGcssWordSpacing from "../../components/css-word-spacing";
import PGcssWritingMode from "../../components/css-writing-mode";
import PGcssWordWrap from "../../components/css-word-wrap";

import PGcssZIndex from "../../components/css-z-index";

var myStore = wp.data.select("postgrid-shop");
import breakPoints from "../../breakpoints";
import IconToggle from "../../components/icon-toggle";
import PGcssAnimationName from "../css-animation-name";
import PGcssWebkitTextFillColor from "../css-webkit-text-fill-color";
import PGcssCaptionSide from "../css-caption-side";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var sudoScourceArgsBasic = {
		styles: { label: "Idle", value: "styles" },
		hover: { label: "Hover", value: "hover" },
		after: { label: "After", value: "after" },
		before: { label: "Before", value: "before", isPro: true },
		active: { label: "Active", value: "active", isPro: true },
		focus: { label: "Focus", value: "focus", isPro: true },
		"focus-within": {
			label: "Focus-within",
			value: "focus-within",
			isPro: true,
		},
		target: { label: "target", value: "target", isPro: true },
		visited: { label: "Visited", value: "visited", isPro: true },
		selection: { label: "Selection", value: "selection", isPro: true },
		":marker": { label: "Marker", value: ":marker", isPro: true },
		"nth-child(even)": {
			label: "nth-child(even)",
			value: "nth-child(even)",
			isPro: true,
		},
		"nth-child(odd)": {
			label: "nth-child(odd)",
			value: "nth-child(odd)",
			isPro: true,
		},
		"nth-child(2)": {
			label: "nth-child(2)",
			value: "nth-child(2)",
			isPro: true,
		},
		"nth-child(3)": {
			label: "nth-child(3)",
			value: "nth-child(3)",
			isPro: true,
		},
		"nth-child(4)": {
			label: "nth-child(4)",
			value: "nth-child(4)",
			isPro: true,
		},
		"nth-child(5)": {
			label: "nth-child(5)",
			value: "nth-child(5)",
			isPro: true,
		},

		"first-child": { label: "First-child", value: "first-child", isPro: true },
		"last-child": { label: "Last-child", value: "last-child", isPro: true },
		"first-letter": {
			label: "First-letter",
			value: "first-letter",
			isPro: true,
		},
		"first-line": { label: "First-line", value: "first-line", isPro: true },
		"hover::before": {
			label: "hover::before",
			value: "hover::before",
			isPro: true,
		},
		"hover::after": {
			label: "hover::after",
			value: "hover::after",
			isPro: true,
		},
		"hover::marker": {
			label: "hover::marker",
			value: "hover::marker",
			isPro: true,
		},
		"hover::first-letter": {
			label: "hover::first-letter",
			value: "hover::first-letter",
			isPro: true,
		},
		"hover:first-child": {
			label: "hover:first-child",
			value: "hover:first-child",
			isPro: true,
		},
		"hover:last-child": {
			label: "hover:last-child",
			value: "hover:last-child",
			isPro: true,
		},
		"hover:first-line": {
			label: "hover:first-line",
			value: "hover:first-line",
			isPro: true,
		},
		"hover:first-line": {
			label: "hover:first-line",
			value: "hover:first-line",
			isPro: true,
		},
		"hover:nth-child(odd)": {
			label: "hover:nth-child(odd)",
			value: "hover:nth-child(odd)",
			isPro: true,
		},
		"hover:nth-child(even)": {
			label: "hover:nth-child(even)",
			value: "hover:nth-child(even)",
			isPro: true,
		},
		"-webkit-slider-thumb": {
			label: "-webkit-slider-thumb",
			value: "-webkit-slider-thumb",
			isPro: true,
		},
		"-moz-range-thumb": {
			label: "-moz-range-thumb",
			value: "-moz-range-thumb",
			isPro: true,
		},
		checked: { label: "checked", value: "checked", isPro: true },
		"checked:after": {
			label: "checked:after",
			value: "checked:after",
			isPro: true,
		},
		"checked:before": {
			label: "checked:before",
			value: "checked:before",
			isPro: true,
		},
		//custom: { label: 'Custom', value: '', isPro: true },
	};

	let sudoScourceArgs = applyFilters("sudoScourceArgs", sudoScourceArgsBasic);
	// let sudoScourceArgs = sudoScourceArgsBasic;

	const [sudoScources, setSudoScources] = useState(sudoScourceArgs);

	const [sudoScource, setSudoScource] = useState("styles");
	const [styles, setStyles] = useState({});

	const [cssAtts, setcssAtts] = useState({});
	const [breakPointLocal, setbreakPointLocal] = useState(
		myStore.getBreakPoint()
	);
	var breakPointX = myStore.getBreakPoint();

	let isProFeature = applyFilters("isProFeature", true);

	//breakPointX = (breakPointLocal != breakPointX) ? breakPointLocal : breakPointX;

	// useEffect(() => {
	// 	var sudoSourceX = { ...sudoScources };
	// 	Object.entries(props.obj).map((arg) => {
	// 		var sudoIndex = arg[0];
	// 		var sudoValues = arg[1];

	// 		if (sudoIndex != "options") {
	// 			sudoSourceX[sudoIndex].label = sudoScources[sudoIndex].label + " ^";
	// 		}
	// 	});

	// 	setSudoScources(sudoSourceX);
	// }, [props.obj]);

	const [extraOpt, setextraOpt] = useState(false);

	const [copyArgs, setCopyArgs] = useState({
		isCopied: false,
		isPasted: false,
		pasteError: false,
		copyError: false,
		errorMessage: "",
	});
	const [copyRawArgs, setcopyRawArgs] = useState({
		isCopied: false,
		isPasted: false,
		pasteError: false,
		copyError: false,
		errorMessage: "",
	});

	const [resetArgs, setResetArgs] = useState({
		isReset: false,
		resetError: false,
		errorMessage: "",
	});

	var cssPropsBasic = {
		alignContent: { id: "alignContent", label: "Align Content" },
		alignItems: { id: "alignItems", label: "Align Items" },
		alignSelf: { id: "alignSelf", label: "Align Self" },
		animationName: { id: "animationName", label: "Animation Name" },
		aspectRatio: { id: "aspectRatio", label: "Aspect Ratio" },
		backdropFilter: {
			id: "backdropFilter",
			label: "Backdrop Filter",
			isPro: true,
		},
		backfaceVisibility: {
			id: "backfaceVisibility",
			label: "Backface Visibility",
		},
		backgroundAttachment: {
			id: "backgroundAttachment",
			label: "Background Attachment",
			isPro: true,
		},
		backgroundBlendMode: {
			id: "backgroundBlendMode",
			label: "Background Blend Mode",
			isPro: true,
		},
		backgroundClip: {
			id: "backgroundClip",
			label: "Background Clip",
			isPro: true,
		},
		backgroundColor: { id: "backgroundColor", label: "Background Color" },
		backgroundImage: {
			id: "backgroundImage",
			label: "Background Image",
			isPro: true,
		},
		backgroundOrigin: { id: "backgroundOrigin", label: "Background Origin" },
		backgroundPosition: {
			id: "backgroundPosition",
			label: "Background Position",
		},
		backgroundRepeat: { id: "backgroundRepeat", label: "Background Repeat" },
		backgroundSize: { id: "backgroundSize", label: "Background Size" },
		border: { id: "border", label: "Border" },
		borderBottom: { id: "borderBottom", label: "Border Bottom" },
		borderCollapse: {
			id: "borderCollapse",
			label: "Border Collapse",
			isPro: true,
		},
		borderImage: { id: "borderImage", label: "Border Image", isPro: true },
		borderLeft: { id: "borderLeft", label: "Border Left" },
		borderRadius: { id: "borderRadius", label: "Border Radius" },
		borderRight: { id: "borderRight", label: "Border Right" },
		borderSpacing: {
			id: "borderSpacing",
			label: "Border Spacing",
			isPro: true,
		},
		borderTop: { id: "borderTop", label: "Border Top" },
		bottom: { id: "bottom", label: "Bottom" },
		boxShadow: { id: "boxShadow", label: "Box Shadow" },
		boxSizing: { id: "boxSizing", label: "Box Sizing", isPro: true },
		captionSide: { id: "captionSide", label: "Caption Side" },
		clear: { id: "clear", label: "Clear" },
		clip: { id: "clip", label: "Clip", isPro: true },
		color: { id: "color", label: "Color" },
		columnCount: { id: "columnCount", label: "Column Count", isPro: true },
		columnGap: { id: "columnGap", label: "Column gap" },
		columnRule: { id: "columnRule", label: "Column Rule", isPro: true },
		content: { id: "content", label: "Content", isPro: true },
		counterIncrement: {
			id: "counterIncrement",
			label: "Counter Increment",
			isPro: true,
		},
		counterReset: { id: "counterReset", label: "Counter Reset", isPro: true },
		counterSet: { id: "counterSet", label: "Counter Set", isPro: true },
		cursor: { id: "cursor", label: "Cursor", isPro: true },
		direction: { id: "direction", label: "Direction" },
		display: { id: "display", label: "Display" },
		emptyCells: { id: "emptyCells", label: "Empty Cells" },
		filter: { id: "filter", label: "Filter", isPro: true },
		flexBasis: { id: "flexBasis", label: "Flex Basis" },
		flexDirection: { id: "flexDirection", label: "Flex Direction" },
		flexFlow: { id: "flexFlow", label: "Flex Flow" },
		flexGrow: { id: "flexGrow", label: "Flex Grow" },
		flexShrink: { id: "flexShrink", label: "Flex Shrink" },
		flexWrap: { id: "flexWrap", label: "Flex Wrap" },
		float: { id: "float", label: "Float" },
		fontFamily: { id: "fontFamily", label: "Font Family" },
		fontSize: { id: "fontSize", label: "Font Size" },
		fontStretch: { id: "fontStretch", label: "Font Stretch", isPro: true },
		fontStyle: { id: "fontStyle", label: "Font Style" },
		fontVariantCaps: {
			id: "fontVariantCaps",
			label: "Font VariantCaps",
			isPro: true,
		},
		fontWeight: { id: "fontWeight", label: "Font Weight" },
		gap: { id: "gap", label: "Gap" },
		gridAutoColumns: { id: "gridAutoColumns", label: "Grid Auto Columns" },
		gridAutoFlow: { id: "gridAutoFlow", label: "Grid Auto Flow" },
		gridColumnEnd: { id: "gridColumnEnd", label: "Grid Column End" },
		gridColumnStart: { id: "gridColumnStart", label: "Grid Column Start" },
		gridRowEnd: { id: "gridRowEnd", label: "Grid Row End" },
		gridRowStart: { id: "gridRowStart", label: "Grid Row Start" },
		gridTemplateColumns: {
			id: "gridTemplateColumns",
			label: "Grid Template Columns",
		},
		gridTemplateRows: { id: "gridTemplateRows", label: "Grid Template Rows" },
		height: { id: "height", label: "Height" },
		justifyContent: { id: "justifyContent", label: "Justify Content" },
		left: { id: "left", label: "Left" },
		letterSpacing: {
			id: "letterSpacing",
			label: "Letter Spacing",
			isPro: true,
		},
		lineHeight: { id: "lineHeight", label: "Line Height" },
		listStyle: { id: "listStyle", label: "List Style" },
		margin: { id: "margin", label: "Margin" },
		marginBottom: { id: "marginBottom", label: "Margin Bottom" },
		marginLeft: { id: "marginLeft", label: "Margin Left" },
		marginRight: { id: "marginRight", label: "Margin Right" },
		marginTop: { id: "marginTop", label: "Margin Top" },
		maxHeight: { id: "maxHeight", label: "Max Height" },
		maxWidth: { id: "maxWidth", label: "Max Width" },
		minHeight: { id: "minHeight", label: "Min Height" },
		minWidth: { id: "minWidth", label: "Min Width" },
		objectFit: { id: "objectFit", label: "Object Fit" },
		opacity: { id: "opacity", label: "Opacity" },
		order: { id: "order", label: "Order" },
		outline: { id: "outline", label: "Outline", isPro: true },
		overflow: { id: "overflow", label: "Overflow" },
		overflowX: { id: "overflowX", label: "OverflowX", isPro: true },
		overflowY: { id: "overflowY", label: "OverflowY", isPro: true },
		padding: { id: "padding", label: "Padding" },
		paddingBottom: { id: "paddingBottom", label: "Padding Bottom" },
		paddingLeft: { id: "paddingLeft", label: "Padding Left" },
		paddingRight: { id: "paddingRight", label: "Padding Right" },
		paddingTop: { id: "paddingTop", label: "Padding Top" },
		perspective: { id: "perspective", label: "Perspective", isPro: true },
		position: { id: "position", label: "Position" },
		right: { id: "right", label: "Right" },
		rowGap: { id: "rowGap", label: "Row Gap" },
		tableLayout: { id: "tableLayout", label: "Table Layout" },
		textAlign: { id: "textAlign", label: "Text Align" },
		textDecoration: {
			id: "textDecoration",
			label: "Text Decoration",
			isPro: true,
		},
		textIndent: { id: "textIndent", label: "Text Indent", isPro: true },
		textJustify: { id: "textJustify", label: "Text Justify", isPro: true },
		textOverflow: { id: "textOverflow", label: "Text Overflow" },
		textShadow: { id: "textShadow", label: "Text Shadow", isPro: true },
		textTransform: {
			id: "textTransform",
			label: "Text Transform",
			isPro: true,
		},
		top: { id: "top", label: "Top" },
		transform: { id: "transform", label: "Transform", isPro: true },
		transformOrigin: {
			id: "transformOrigin",
			label: "Transform Origin",
			isPro: true,
		},
		transition: { id: "transition", label: "Transition", isPro: true },
		verticalAlign: { id: "verticalAlign", label: "Vertical Align" },
		visibility: { id: "visibility", label: "Visibility" },
		width: { id: "width", label: "Width" },
		wordBreak: { id: "wordBreak", label: "Word Break", isPro: true },
		wordSpacing: { id: "wordSpacing", label: "Word Spacing", isPro: true },
		wordWrap: { id: "wordWrap", label: "Word Wrap", isPro: true },
		writingMode: { id: "writingMode", label: "Writing Mode", isPro: true },
		zIndex: { id: "zIndex", label: "Z-Index" },
		"-webkit-text-fill-color": {
			id: "-webkit-text-fill-color",
			label: "Webkit Text Fill Color",
			isPro: true,
		},
	};

	let cssProps = applyFilters("cssProps", cssPropsBasic);

	useEffect(() => {}, [props.obj]);

	useEffect(() => {
		if (props.obj[sudoScource] == undefined) {
			props.obj[sudoScource] = {};
		}
	}, [sudoScource]);

	function sudoScourceUpdate(args) {
		setSudoScources(args);
	}
	function parseRawCSS(str) {
		var obj = {};

		const myArray = str.split(";");

		myArray.map((item) => {
			item = item.replaceAll(": ", ":");

			var prop = item.split(":");
			var propId = prop[0];
			var propVal = prop[1];

			propId =
				propId != undefined || propId != null
					? propId.replaceAll("\r\n", "")
					: "";
			propId =
				propId != undefined || propId != null ? propId.replaceAll(" ", "") : "";

			propVal =
				propVal != undefined || propVal != null
					? propVal.replaceAll("\r\n", "")
					: "";
			//propVal = (propVal != undefined || propVal != null) ? propVal.replaceAll(" ", "") : "";

			if (propId != undefined || propId != null) {
				propId = propId.replace(/-([a-z])/g, function (g) {
					return g[1].toUpperCase();
				});

				if (propVal.length > 0) {
					obj[propId] = { Desktop: propVal };
				}
			}
		});

		return obj;
	}

	var RemoveQueryPram = function ({ title, sudoScource, keyX }) {
		return (
			<>
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						props.onRemove(sudoScource, keyX, props.obj, props.extra);
					}}>
					<Icon icon={close} />
				</span>
				<span className="mx-2">{title}</span>
			</>
		);
	};

	function setCssAttr(option, index) {
		//var objX = { ...props.obj }
		let objX = Object.assign({}, props.obj);

		if (objX[sudoScource][option.id] == undefined) {
			var path = [sudoScource, option.id];
			const object = myStore.addPropertyDeep(objX, path, {});
			props.onAdd(sudoScource, option.id, object, props.extra);

			//props.obj[sudoScource][option.id] = {};
		} else {
			//alert('Property already added');

			if (objX[sudoScource][option.id][breakPointX] == undefined) {
				var path = [sudoScource, option.id, breakPointX];
				const object = myStore.addPropertyDeep(objX, path, "");
				props.onAdd(sudoScource, option.id, object, props.extra);
			} else {
				alert("Property already added");
			}
		}
	}

	function onChangeCssVal(newVal, attr) {
		props.onChange(sudoScource, newVal, attr, props.obj, props.extra);
	}

	var breakPointList = [];

	for (var x in breakPoints) {
		var item = breakPoints[x];
		breakPointList.push({ label: item.name, icon: item.icon, value: item.id });
	}

	// copy to clipboard start

	const copyObjectToClipboard = (obj) => {
		var objZ = JSON.parse(obj);
		var objX = { ...objZ };
		objX.pgStyle = true;

		var objStr = JSON.stringify(objX);
		// const jsonString = JSON.stringify(obj);
		navigator.clipboard
			.writeText(objStr)
			.then(() => {})
			.catch((err) => {
				// Handle errors here
			});
	};

	// copy to clipboard end

	//paste from clipboard start

	const pasteFromClipboard = () => {
		return new Promise((resolve, reject) => {
			navigator.clipboard
				.readText()
				.then((text) => {
					resolve(text);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const handlePasteFromClipboard = async () => {
		try {
			const clipboardData = await navigator.clipboard.readText();

			var stylesClipboard = myStore.getStylesClipboard();

			if (stylesClipboard == null && !clipboardData) {
				setCopyArgs({
					...copyArgs,
					pasteError: true,
					errorMessage: "Paste is empty",
				});

				setTimeout(() => {
					setCopyArgs({
						...copyArgs,
						pasteError: false,
						errorMessage: "",
					});
				}, 2000);

				return;
			} else {
				const styleObj = JSON.parse(clipboardData);

				if (typeof styleObj == "object" && styleObj.pgStyle) {
					delete styleObj.pgStyle;

					try {
						if (props.onBulkAdd) {
							props.onBulkAdd(sudoScource, styleObj, props.extra);
						}
					} catch (error) {
						setCopyArgs({
							...copyArgs,
							pasteError: true,
							errorMessage: "Invalid data format in clipboard",
						});

						setTimeout(() => {
							setCopyArgs({
								...copyArgs,
								pasteError: false,
								errorMessage: "",
							});
						}, 2000);
					}
				}
			}

			setCopyArgs({ ...copyArgs, isPasted: true });

			setTimeout(() => {
				setCopyArgs({ ...copyArgs, isPasted: false });
			}, 2000);
		} catch (error) {
			setCopyArgs({
				...copyArgs,
				pasteError: true,
				errorMessage: "Invalid data format in clipboard",
			});
			setTimeout(() => {
				setCopyArgs({
					...copyArgs,
					pasteError: false,
					errorMessage: "",
				});
			}, 2000);
		}
	};

	const handlePasteRawClipboard = async () => {
		const clipboardData = await navigator.clipboard.readText();

		var styleObj = parseRawCSS(clipboardData);

		//return;

		if (typeof styleObj == "object") {
			if (props.onBulkAdd) {
				props.onBulkAdd(sudoScource, styleObj, props.extra);
			}
		}

		setcopyRawArgs({ ...copyRawArgs, isPasted: true });

		setTimeout(() => {
			setcopyRawArgs({ ...copyRawArgs, isPasted: false });
		}, 2000);
	};

	//paste from clipboard end

	return (
		<div>
			<PanelRow className="bg-gray-200 p-2">
				<div className="flex items-center">
					<PGDropdownSudoSelector
						position="bottom right"
						variant="secondary"
						options={sudoScources}
						sudoScourceUpdate={sudoScourceUpdate}
						obj={props.obj}
						buttonTitle={
							sudoScources[sudoScource] != undefined
								? sudoScources[sudoScource].label
								: "Choose"
						}
						onChange={(option, index) => {
							setSudoScource(option.value);
						}}
						values=""></PGDropdownSudoSelector>

					<div>
						<Icon icon={arrowRight} />
					</div>

					<PGDropdown
						position="bottom right"
						variant="secondary"
						options={cssProps}
						buttonTitle="Add Style"
						onChange={setCssAttr}
						values=""></PGDropdown>
				</div>
				<div className="relative">
					{props.onBulkAdd && (
						<div
							className={
								extraOpt
									? "bg-gray-400 hover:bg-gray-400 cursor-pointer p-2 "
									: "cursor-pointer p-2 "
							}
							onClick={(ev) => {
								setextraOpt(!extraOpt);
							}}>
							<svg
								aria-hidden="true"
								focusable="false"
								role="img"
								className="octicon octicon-ellipsis"
								viewBox="0 0 16 16"
								width="16"
								height="16"
								fill="currentColor">
								<path d="M0 5.75C0 4.784.784 4 1.75 4h12.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0 1 14.25 12H1.75A1.75 1.75 0 0 1 0 10.25ZM12 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM7 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM4 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"></path>
							</svg>
						</div>
					)}

					{extraOpt && (
						<Popover position="bottom left">
							<div className="p-3 w-80">
								<div className="flex flex-wrap gap-3 justify-center">
									<div
										className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-indigo-400 text-white text-sm rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
										// className="px-4 inline-block m-2 py-2 bg-sky-600 text-white cursor-pointer"
										onClick={(ev) => {
											var styleStr = JSON.stringify(props.obj[sudoScource]);

											//var asdsdsd = wp.data.dispatch('postgrid-shop').setStylesClipboard(styleStr)

											if (props.onReset) {
												props.onReset(sudoScources, props.extra);
											}

											// asdsdsd.then((res) => {

											// });
											setResetArgs({ ...resetArgs, isReset: true });

											setTimeout(() => {
												setResetArgs({ ...resetArgs, isReset: false });
											}, 2000);
										}}>
										{resetArgs.isReset && <>Reset Done!</>}

										{!resetArgs.isReset && <> Reset Styles!</>}
									</div>

									<div
										className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-indigo-400 text-white rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
										// className="px-4 inline-block m-2 py-2 bg-sky-600 text-white cursor-pointer"
										onClick={(ev) => {
											var styleStr = JSON.stringify(props.obj[sudoScource]);

											copyObjectToClipboard(styleStr);

											var asdsdsd = wp.data
												.dispatch("postgrid-shop")
												.setStylesClipboard(styleStr);

											asdsdsd.then((res) => {});
											setCopyArgs({ ...copyArgs, isCopied: true });

											setTimeout(() => {
												setCopyArgs({ ...copyArgs, isCopied: false });
											}, 2000);
										}}>
										{copyArgs.isCopied && <> Copied!</>}

										{!copyArgs.isCopied && <> Copy Styles!</>}
									</div>

									<div
										className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-indigo-400 text-white font-medium rounded hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
										// className="px-4 inline-block m-2 py-2 bg-sky-600  text-white cursor-pointer"
										onClick={handlePasteFromClipboard}>
										{copyArgs.isPasted && <>Paste Done</>}

										{!copyArgs.isPasted && <>Paste Styles</>}
									</div>

									<div
										className={`pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide ${
											isProFeature
												? "bg-gray-200"
												: "bg-indigo-400 hover:bg-indigo-500 hover:text-white focus:outline-none focus:bg-gray-700"
										}  text-white font-medium rounded `}
										// className="px-4 inline-block m-2 py-2 bg-sky-600  text-white cursor-pointer"
										data-pgTooltip={isProFeature ? "Subscribe to use." : null}
										data-pgTooltip-location={isProFeature ? "top" : ""}
										onClick={(ev) => {
											if (isProFeature) {
												alert(
													"This feature is only available in Pro Version. Want to buy the subscription?"
												);

												var confirmButton = confirm(
													"Click OK to proceed to the Combo Blocks."
												);

												if (confirmButton) {
													window.open(
														"https://comboblocks.com/pricing/",

														"_blank"
													);
												}
												return;
											}

											handlePasteRawClipboard();
										}}>
										{copyRawArgs.isPasted && <>Paste Done</>}

										{!copyRawArgs.isPasted && <>Paste Raw CSS</>}
									</div>
								</div>

								{copyArgs.pasteError && copyArgs.errorMessage && (
									<div className="text-red-800 my-3">
										{copyArgs.errorMessage}
									</div>
								)}
								{copyRawArgs.pasteError && copyRawArgs.errorMessage && (
									<div className="text-red-800 my-3">
										{copyRawArgs.errorMessage}
									</div>
								)}
							</div>
						</Popover>
					)}
				</div>

				<div>
					<div className="inline-block">
						<IconToggle
							position="bottom"
							variant="secondary"
							iconList={breakPointList}
							buttonTitle="Break Point Switch"
							onChange={(x, index) => {
								var asdsdsd = wp.data
									.dispatch("postgrid-shop")
									.setBreakPoint(x.value);
								asdsdsd.then((res) => {
									setbreakPointLocal(x.value);
								});
							}}
							activeIcon={breakPoints[breakPointX].icon}
							value={breakPointX}
						/>
					</div>
				</div>
			</PanelRow>

			<div className="my-5 pg-setting-input-text ">
				{
					//Object.entries(cssAtts).map(([key, value]) => (
					props.obj[sudoScource] != undefined &&
						Object.entries(props.obj[sudoScource])
							.reverse()
							.map(([key, value]) => (
								<>
									{value[breakPointX] != undefined && (
										<PanelBody
											title={
												<RemoveQueryPram
													title={
														cssProps[key] != undefined
															? cssProps[key].label
															: key
													}
													sudoScource={sudoScource}
													keyX={key}
												/>
											}
											initialOpen={false}
											key={key}>
											{key == "alignContent" && (
												<PGcssAlignContent
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "alignItems" && (
												<PGcssAlignItems
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "animationName" && (
												<PGcssAnimationName
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "alignSelf" && (
												<PGcssAlignSelf
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "aspectRatio" && (
												<PGcssAspectRatio
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backfaceVisibility" && (
												<PGcssBackfaceVisibility
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "backgroundAttachment" && (
												<PGcssBackgroundAttachment
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "backgroundBlendMode" && (
												<PGcssBackgroundBlendMode
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backgroundImage" && (
												<PGcssBackgroundImage
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backgroundClip" && (
												<PGcssBackgroundClip
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "bgColor" && (
												<PGcssBackgroundColor
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "backgroundColor" && (
												<PGcssBackgroundColor
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backgroundOrigin" && (
												<PGcssBackgroundOrigin
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backgroundRepeat" && (
												<PGcssBackgroundRepeat
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backgroundSize" && (
												<PGcssBackgroundSize
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "backgroundPosition" && (
												<PGcssBackgroundPosition
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "boxShadow" && (
												<PGcssBoxShadow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "border" && (
												<PGcssBorder
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderTop" && (
												<PGcssBorderTop
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderRight" && (
												<PGcssBorderRight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderBottom" && (
												<PGcssBorderBottom
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderLeft" && (
												<PGcssBorderLeft
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderRadius" && (
												<PGcssBorderRadius
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderCollapse" && (
												<PGcssBorderCollapse
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderSpacing" && (
												<PGcssBorderSpacing
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "borderImage" && (
												<PGcssBorderImage
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "backdropFilter" && (
												<PGcssBackdropFilter
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "bottom" && (
												<PGcssBottom
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "cursor" && (
												<PGcssCursor
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "content" && (
												<PGcssContent
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "counterIncrement" && (
												<PGcssCounterIncrement
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "counterReset" && (
												<PGcssCounterReset
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "counterSet" && (
												<PGcssCounterSet
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "columnCount" && (
												<PGcssColumnCount
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "columnRule" && (
												<PGcssColumnRule
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "clip" && (
												<PGcssClip
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "top" && (
												<PGcssTop
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "left" && (
												<PGcssLeft
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "right" && (
												<PGcssRight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "boxSizing" && (
												<PGcssBoxSizing
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "clear" && (
												<PGcssClear
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "direction" && (
												<PGcssDirection
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "color" && (
												<PGcssColor
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "filter" && (
												<PGcssFilter
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "float" && (
												<PGcssFloat
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontFamily" && (
												<PGcssFontFamily
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontSize" && (
												<PGcssFontSize
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontStyle" && (
												<PGcssFontStyle
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "userSelect" && (
												<PGcssUserSelect
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontStretch" && (
												<PGcssFontStretch
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontWeight" && (
												<PGcssFontWeight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "fontVariantCaps" && (
												<PGcssFontVariantCaps
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "flexWrap" && (
												<PGcssFlexWrap
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "flexDirection" && (
												<PGcssFlexDirection
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "flexShrink" && (
												<PGcssFlexShrink
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "flexBasis" && (
												<PGcssFlexBasis
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "flexFlow" && (
												<PGcssFlexFlow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "flexGrow" && (
												<PGcssFlexGrow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "gridAutoFlow" && (
												<PGcssGridAutoFlow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "gridColumnEnd" && (
												<PGcssGridColumnEnd
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "gridColumnStart" && (
												<PGcssGridColumnStart
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "gridRowEnd" && (
												<PGcssGridRowEnd
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "gridRowStart" && (
												<PGcssGridRowStart
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "gridTemplateColumns" && (
												<PGcssGridTemplateColumns
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "gridTemplateRows" && (
												<PGcssGridTemplateRows
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "letterSpacing" && (
												<PGcssLetterSpacing
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "lineHeight" && (
												<PGcssLineHeight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "listStyle" && (
												<PGcssListStyle
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "justifyContent" && (
												<PGcssJustifyContent
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "objectFit" && (
												<PGcssObjectFit
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "opacity" && (
												<PGcssOpacity
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "outline" && (
												<PGcssOutline
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "outlineOffset" && (
												<PGcssOutlineOffset
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "position" && (
												<PGcssPosition
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "tableLayout" && (
												<PGcssTableLayout
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "emptyCells" && (
												<PGcssEmptyCells
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "captionSide" && (
												<PGcssCaptionSide
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "gap" && (
												<PGcssGap
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "columnGap" && (
												<PGcssColumnGap
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "rowGap" && (
												<PGcssRowGap
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "transition" && (
												<PGcssTransition
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "transform" && (
												<PGcssTransform
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "transformOrigin" && (
												<PGcssTransformOrigin
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textIndent" && (
												<PGcssTextIndent
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textJustify" && (
												<PGcssTextJustify
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textOverflow" && (
												<PGcssTextOverflow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textTransform" && (
												<PGcssTextTransform
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textDecoration" && (
												<PGcssTextDecoration
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textShadow" && (
												<PGcssTextShadow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textAlign" && (
												<PGcssTextAlign
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "textAlignLast" && (
												<PGcssTextAlignLast
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "visibility" && (
												<PGcssVisibility
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "wordBreak" && (
												<PGcssWordBreak
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "wordSpacing" && (
												<PGcssWordSpacing
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "zIndex" && (
												<PGcssZIndex
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "padding" && (
												<PGcssPadding
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "paddingTop" && (
												<PGcssPaddingTop
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "paddingRight" && (
												<PGcssPaddingRight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "paddingBottom" && (
												<PGcssPaddingBottom
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "paddingLeft" && (
												<PGcssPaddingLeft
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "placeItems" && (
												<PGcssPlaceItems
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "marginTop" && (
												<PGcssMarginTop
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "marginRight" && (
												<PGcssMarginRight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "marginBottom" && (
												<PGcssMarginBottom
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "marginLeft" && (
												<PGcssMarginLeft
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "margin" && (
												<PGcssMargin
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "maxHeight" && (
												<PGcssMaxHeight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "maxWidth" && (
												<PGcssMaxWidth
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "minHeight" && (
												<PGcssMinHeight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "minWidth" && (
												<PGcssMinWidth
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "display" && (
												<PGcssDisplay
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "width" && (
												<PGcssWidth
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "height" && (
												<PGcssHeight
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "verticalAlign" && (
												<PGcssVerticalAlign
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "overflow" && (
												<PGcssOverflow
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "order" && (
												<PGcssOrder
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "overflowX" && (
												<PGcssOverflowX
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "overflowY" && (
												<PGcssOverflowY
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "writingMode" && (
												<PGcssWritingMode
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "wordWrap" && (
												<PGcssWordWrap
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}

											{key == "perspective" && (
												<PGcssPerspective
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "whiteSpace" && (
												<PGcssWhiteSpace
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
											{key == "-webkit-text-fill-color" && (
												<PGcssWebkitTextFillColor
													val={value[breakPointX]}
													onChange={onChangeCssVal}
												/>
											)}
										</PanelBody>
									)}
								</>
							))
				}
			</div>
		</div>
	);
}

class PGStyles extends Component {
	constructor(props) {
		super(props);

		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	componentDidMount(props) {}

	render() {
		var { extra, obj, onChange, onAdd, onRemove, onBulkAdd, onReset } =
			this.props;

		return (
			<>
				{onBulkAdd == null && (
					<Html
						obj={obj}
						extra={extra}
						onAdd={onAdd}
						onRemove={onRemove}
						onChange={onChange}
						warn={this.state.showWarning}
						onReset={onReset}
					/>
				)}

				{onBulkAdd != null && (
					<Html
						obj={obj}
						extra={extra}
						onAdd={onAdd}
						onRemove={onRemove}
						onChange={onChange}
						onBulkAdd={onBulkAdd}
						onReset={onReset}
						warn={this.state.showWarning}
					/>
				)}
			</>
		);
	}
}

export default PGStyles;

