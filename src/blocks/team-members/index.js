import {
	BlockContextProvider,
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	MediaUpload, MediaUploadCheck,
	RichText,
	__experimentalUseBlockPreview as useBlockPreview,
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
	ToggleControl
} from "@wordpress/components";
import {
	select,
	useDispatch,
	useSelect
} from "@wordpress/data";
import {
	memo,
	useEffect,
	useState
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	addTemplate,
	close,
	copy,
	Icon,
	menu,
	pages,
	replace,
	rotateLeft,
	settings,
	styles
} from "@wordpress/icons";

import { ReactSortable } from "react-sortablejs";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGcssOpenaiPrompts from "../../components/openai-prompts";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import metadata from "./block.json";

import PGtoggle from "../../components/toggle";
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
					d="M69.3335 61H0V78.3334H69.3335V61Z"
					fill="url(#paint0_linear_61_610)"
				/>
				<path
					d="M9.33389 71.6666L5.77832 68.1111C5.77832 68.1111 5.77832 67.6666 5.77832 67.2222C5.77832 67.2222 6.22277 67.2222 6.66721 67.2222L9.33389 70.3333L12.0006 67.2222C12.0006 67.2222 12.445 66.7777 12.8895 67.2222C12.8895 67.2222 13.3339 67.6666 12.8895 68.1111L9.33389 71.6666Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 67.2224H18.2227V71.6669H61.3339V67.2224Z"
					fill="#C15940"
				/>
				<path
					d="M160 61H90.6665V78.3334H160V61Z"
					fill="url(#paint1_linear_61_610)"
				/>
				<path
					d="M99.9999 71.6666L96.4443 68.1111C96.4443 68.1111 96.4443 67.6666 96.4443 67.2222C96.4443 67.2222 96.8888 67.2222 97.3332 67.2222L99.9999 70.3333L102.667 67.2222C102.667 67.2222 103.111 66.7777 103.555 67.2222C103.555 67.2222 104 67.6666 103.555 68.1111L99.9999 71.6666Z"
					fill="#C15940"
				/>
				<path d="M152 67.2224H108.889V71.6669H152V67.2224Z" fill="#C15940" />
				<path
					d="M69.3335 92.5554H0V109.889H69.3335V92.5554Z"
					fill="url(#paint2_linear_61_610)"
				/>
				<path
					d="M9.33389 103.667L5.77832 100.111C5.77832 100.111 5.77832 99.6666 5.77832 99.2222C5.77832 99.2222 6.22277 99.2222 6.66721 99.2222L9.33389 102.333L12.0006 99.2222C12.0006 99.2222 12.445 98.7777 12.8895 99.2222C12.8895 99.2222 13.3339 99.6666 12.8895 100.111L9.33389 103.667Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 98.7778H18.2227V103.222H61.3339V98.7778Z"
					fill="#C15940"
				/>
				<path
					d="M160 92.5554H90.6665V109.889H160V92.5554Z"
					fill="url(#paint3_linear_61_610)"
				/>
				<path
					d="M99.9999 103.667L96.4443 100.111C96.4443 100.111 96.4443 99.6666 96.4443 99.2222C96.4443 99.2222 96.8888 99.2222 97.3332 99.2222L99.9999 102.333L102.667 99.2222C102.667 99.2222 103.111 98.7777 103.555 99.2222C103.555 99.2222 104 99.6666 103.555 100.111L99.9999 103.667Z"
					fill="#C15940"
				/>
				<path d="M152 98.7778H108.889V103.222H152V98.7778Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_610"
						x1="0"
						y1="69.6667"
						x2="69.3335"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_610"
						x1="90.6665"
						y1="69.6667"
						x2="160"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_610"
						x1="0"
						y1="101.222"
						x2="69.3335"
						y2="101.222"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_610"
						x1="90.6665"
						y1="101.222"
						x2="160"
						y2="101.222"
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
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);
		var filterable = context["combo-blocks/filterable"];
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var socialLinks = attributes.socialLinks;
		var blockCssY = attributes.blockCssY;
		if (itemsWrap.options.excludedWrapper) {
			var prentClientId = parentBlock.clientId;
			var prentBlockId = parentBlock.attributes.blockId;
			var parentBlockIdX = parentBlock.attributes.blockId
				? parentBlock.attributes.blockId
				: "pg" + prentClientId.split("-").pop();
			blockClass = "." + parentBlockIdX;
			//blockClass = parentBlock.
		}
		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		var formattedPrompt = "Respond only with json array useing following format {id: '',title: 'person name',url: 'Profile image url',role: 'person role',description: 'description',website: 'website url',phone: '',socialLinks: [],skills: [],categories: [],} and no other text. Do not include any explanations, introductions, or concluding remarks.";
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		var teamMembers = attributes.teamMembers;
		var lightbox = attributes.lightbox;
		let isProFeature = applyFilters("isProFeature", true);
		const CustomTagItemWrapper =
			itemWrap.options.tag.length != 0 ? `${itemWrap.options.tag}` : "div";
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemsSelector = blockClass + " .item";
		var itemSelector = blockClass + " .fieldVal .item ";
		const [activeBlockContextId, setActiveBlockContextId] = useState();
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} items-loop`,
		});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		const ALLOWED_BLOCKS = [
			"combo-blocks/flex-wrap",
			"combo-blocks/flip-box",
			"combo-blocks/layers",
			"combo-blocks/team-members-field",
		];
		const MY_TEMPLATE = [["combo-blocks/team-members-field", {}]];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});
		const TEMPLATE = [["combo-blocks/team-members-field", {}]];
		function PostTemplateInnerBlocks({ attsx }) {
			var className = itemWrap.options.class;
			const innerBlocksProps = useInnerBlocksProps(
				{ className: className },
				{ template: attsx }
			);
			return (
				<CustomTagItemWrapper {...innerBlocksProps}></CustomTagItemWrapper>
			);
		}
		function PostTemplateBlockPreview({
			blocks,
			blockContextId,
			isHidden,
			setActiveBlockContextId,
		}) {
			var className = itemWrap.options.class;
			const blockPreviewProps = useBlockPreview({
				blocks,
				props: {
					className: className,
				},
			});
			const handleOnClick = () => {
				setActiveBlockContextId(blockContextId);
			};
			const style = {
				display: isHidden ? "none" : undefined,
			};
			return (
				<div
					{...blockPreviewProps}
					tabIndex={0}
					role="button"
					onClick={handleOnClick}
					style={style}
				/>
			);
		}
		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
			var className = itemWrap.options.class;
			if (parentBlock != null) {
				// var itemsWrapOptions = {
				// 	...itemsWrap.options,
				// 	excludedWrapper: true,
				// };
				// setAttributes({
				// 	itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
				// });
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: false,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				} else {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: true,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				}
				if (parentBlock.name == "combo-blocks/content-slider") {
					className = " pg-content-slider-item splide__slide ";
				}
				if (parentBlock.name == "combo-blocks/grid-wrap") {
					className = " pg-grid-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/masonry-wrap") {
					className = " pg-masonry-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					className = " item ";
				}
				if (parentBlock.name == "combo-blocks/team-showcase") {
					className = " pg-team-showcase-item ";
				}
				if (parentBlock.name == "combo-blocks/image-gallery") {
					className = " pg-image-gallery-item ";
				}
				if (parentBlock.name == "combo-blocks/image-accordion") {
					className = " pg-image-accordion-item ";
				}
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var options = {
						...itemWrap.options,
						class: className,
						termsClass: true,
					};
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				} else {
					var options = { ...itemWrap.options, class: className };
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				}
			}
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			//blockCssObj[itemSelector] = socialLinks;
			socialLinks.map((x, i) => {
				var selector = `${blockClass} .social-links .item-${i}`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		useEffect(() => {
			var iSelector = `css-block-${blockClass}`;
			var elemX = document.querySelector(iSelector);
			if (elemX != null) {
				elemX.remove();
			}
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			//blockCssObj[itemSelector] = socialLinks;
			// blockCssObj[iconSelector] = icon;
			// blockCssObj[labelSelector] = label;
			// blockCssObj[countSelector] = count;
			socialLinks.map((x, i) => {
				var selector = `${blockClass} .social-links .item-${i}`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
			setTimeout((x) => { }, 2000);
		}, [socialLinks]);
		function addMedia(option, index) {
			var socialLinksX = [...socialLinks];
			socialLinksX.push(option);
			setAttributes({ socialLinks: socialLinksX });
		}
		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var socialLinksX = [...socialLinks];
			socialLinksX[index] = object;
			setAttributes({ socialLinks: socialLinksX });
			var selector = `${blockClass} .item-${index}`;
			//setAttributes({ obj: object });
			var elementSelector = myStore.getElementSelector(sudoScource, selector);
			var cssPropty = myStore.cssAttrParse(attr);
			let itemsCssX = Object.assign({}, blockCssY.items);
			if (itemsCssX[elementSelector] == undefined) {
				itemsCssX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsCssX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onRemoveStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
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
			var socialLinksX = [...socialLinks];
			socialLinksX[index] = object;
			setAttributes({ socialLinks: socialLinksX });
			var selector = `${blockClass} .item-${index}`;
			var elementSelector = myStore.getElementSelector(sudoScource, selector);
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
		function onAddStyleItem(sudoScource, key, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, key, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.addPropertyDeep(objX, path, "");
			var socialLinksX = [...socialLinks];
			socialLinksX[index] = object;
			setAttributes({ socialLinks: socialLinksX });
			//setAttributes({ items: object });
			// setAttributes({ items: itemsX });
		}
		function onBulkAddItem(sudoScource, cssObj, extra) {
			var index = extra.index;
			var socialLinksX = [...socialLinks];
			var itemssX = socialLinksX[index];
			let obj = Object.assign({}, itemssX);
			obj[sudoScource] = cssObj;
			socialLinksX[index] = obj;
			setAttributes({ socialLinks: socialLinksX });
			var selectorX = `${blockClass} .item-${index}`;
			var selector = myStore.getElementSelector(sudoScource, selectorX);
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
		function onResetNthItem(sudoSources, extra) {
			const index = extra.index;
			var socialLinksX = [...socialLinks];
			var itemssX = socialLinksX[index];
			if (itemssX) {
				const obj = { ...itemssX };
				Object.entries(sudoSources).forEach(([sudoSource]) => {
					if (obj[sudoSource]) {
						obj[sudoSource] = {};
						const selector = `${blockClass} .item-${index}`;
						const elementSelector = myStore.getElementSelector(
							sudoSource,
							selector
						);
						const cssObject = myStore.deletePropertyDeep(blockCssY.items, [
							elementSelector,
						]);
						setAttributes({ blockCssY: { items: cssObject } });
					}
				});
				socialLinksX[index] = obj;
				setAttributes({ socialLinks: socialLinksX });
			}
		}
		var mediaSites = [
			{
				id: "email",
				label: "Mail",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-envelope",
				},
				styles: {},
			},
			{
				id: "skype",
				label: "Skype",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-skype",
				},
				styles: {},
			},
			{
				id: "whatsapp",
				label: "WhatsApp",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-whatsapp-square",
				},
				styles: {},
			},
			{
				id: "tumblr",
				label: "Tumblr",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-tumblr-square",
				},
				styles: {},
			},
			{
				id: "viber",
				label: "Viber",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-viber",
				},
				styles: {},
			},
			{
				id: "reddit",
				label: "Reddit",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-reddit-square",
				},
				styles: {},
			},
			{
				id: "facebook",
				label: "Facebook",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-facebook-square",
				},
				styles: {},
			},
			{
				id: "twitter",
				label: "Twitter",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-twitter-square",
				},
				styles: {},
			},
			{
				id: "linkedin",
				label: "Linkedin",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-linkedin",
				},
				styles: {},
			},
			{
				id: "pinterest",
				label: "Pinterest",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-pinterest-square",
				},
				styles: {},
			},
			{
				id: "digg",
				label: "Digg",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-digg",
				},
				styles: {},
			},
			{
				id: "flipboard",
				label: "Flipboard",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-flipboard",
				},
				styles: {},
			},
			{
				id: "meneame",
				label: "Meneame",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-share-alt",
				},
				styles: {},
			},
			{
				id: "messenger",
				label: "Messenger",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-facebook-messenger",
				},
				styles: {},
			},
			{
				id: "wechat",
				label: "Wechat",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-weixin",
				},
				styles: {},
			},
			{
				id: "xing",
				label: "Xing",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-xing",
				},
				styles: {},
			},
			{
				id: "yummly",
				label: "Yummly",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-y-combinator",
				},
				styles: {},
			},
			{
				id: "diaspora",
				label: "Diaspora",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-diaspora",
				},
				styles: {},
			},
			{
				id: "surfingbird",
				label: "Surfingbird",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-share-alt",
				},
				styles: {},
			},
			{
				id: "refind",
				label: "Refind",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-share-alt",
				},
				styles: {},
			},
			{
				id: "renren",
				label: "Renren",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-renren",
				},
				styles: {},
			},
			{
				id: "telegram",
				label: "Telegram",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-telegram",
				},
				styles: {},
			},
			{
				id: "yahoo",
				label: "Yahoo",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-yahoo",
				},
				styles: {},
			},
			{
				id: "wordpress",
				label: "WordPress",
				count: 0,
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-wordpress",
				},
				styles: {},
			},
		];
		const findLabelById = (socialLinks, id) => {
			const item = socialLinks.find((item) => item.id === id);
			return item ? item.label : "";
		};
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		var linkToArgsBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
		};
		let linkToArgs = linkToArgsBasic;
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const ALLOWED_MEDIA_TYPES = ["image"];
		const copyData = (data) => {
			const dataString = JSON.stringify(data, null, 2);
			navigator.clipboard
				.writeText(dataString)
				.then(() => {
					// alert("Data copied to clipboard!");
				})
				.catch((err) => {

				});
		};
		const pasteData = () => {
			navigator.clipboard
				.readText()
				.then((text) => {
					const parsedData = JSON.parse(text);
					setAttributes({ layers: parsedData });
				})
				.catch((err) => {

				});
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle title="Team members" initialOpen={true}>
							<div className="flex items-center justify-center my-3 gap-2 flex-wrap">
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											var items = [];
											media.map((item) => {
												items.push({
													id: item.id,
													title: item.title,
													url: item.url,
													role: "",
													description: "",
													website: "",
													phone: "",
													socialLinks: [],
													skills: [],
													categories: [],
												});
											});
											setAttributes({ teamMembers: items });
										}}
										onClose={() => { }}
										allowedTypes={["image"]}
										value={teamMembers?.map((item) => {
											return item.id;
										})}
										multiple="add"
										render={({ open }) => (
											<div
												className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
												onClick={open}>
												<Icon
													icon={addTemplate}
													className="fill-white "
													size={14}
												/>
												{__("Add", "combo-blocks")}
											</div>
										)}
									/>
								</MediaUploadCheck>
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											var items = [];
											media.map((item) => {
												items.push({
													id: item.id,
													title: item.title,
													url: item.url,
													role: "",
													description: "",
													website: "",
													phone: "",
													socialLinks: [],
													skills: [],
													categories: [],
												});
											});
											setAttributes({ teamMembers: items });
										}}
										onClose={() => { }}
										allowedTypes={["image"]}
										value={[]}
										multiple="add"
										render={({ open }) => (
											<div
												className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
												onClick={open}>
												<Icon
													icon={replace}
													className="fill-white "
													size={14}
												/>
												{__("Replace", "combo-blocks")}
											</div>
										)}
									/>
								</MediaUploadCheck>


								<div className="relative 	"

								>
									<div className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 focus:outline-none focus:bg-gray-600" onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();
										setAIWriter(!AIWriter)
									}}>AI</div>
									{AIWriter && (
										<Popover position="bottom right">
											<div className="w-[800px] p-3">



												<PGcssOpenaiPrompts value={""} formattedPrompt={formattedPrompt} promptsAgs={{ action: 'write', aiModel: 'gpt-4-turbo', objective: "generateTeamMembers" }} autoUpdate={AIautoUpdate}
													onResponseLoaded={(value, autoUpdate) => {



														// if (autoUpdate) {
														// 	var options = { ...text.options, content: value };
														// 	setAttributes({ text: { ...text, options: options } });
														// }


													}}
													clickHandle={(value, action) => {



														var items = [];
														var teamMembersArr = JSON.parse(value);


														teamMembersArr.map(item => {

															items.push({
																id: item.id,
																title: item.title,
																url: item.url, //image url
																role: item.role,
																description: item.description,
																website: item.website,
																phone: item.phone,
																socialLinks: [],
																skills: [],
																categories: [],
															});
														})




														//setAttributes({ teamMembers: items });


														if (action == 'replace') {

															setAttributes({ teamMembers: items });

														}

														if (action == 'prepend') {

															setAttributes({ teamMembers: [...items, ...teamMembers] });

														}

														if (action == 'append') {

															setAttributes({ teamMembers: [...teamMembers, ...items] });

														}







													}}

												/>
											</div>
										</Popover>
									)}

								</div>



								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										open;
										copyData(teamMembers);
									}}>
									<Icon icon={copy} className="fill-white " size={14} />
									{__("Copy", "combo-blocks")}
								</div>
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										open;
										pasteData();
									}}>
									<Icon icon={pages} className="fill-white " size={14} />
									{__("Paste", "combo-blocks")}
								</div>
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										setAttributes({ teamMembers: [] });
									}}>
									<Icon icon={rotateLeft} className="fill-white " size={14} />
									{__("Reset", "combo-blocks")}
								</div>
							</div>
							<ReactSortable
								list={teamMembers}
								handle={".handle"}
								setList={(item) => {
									setAttributes({
										teamMembers: item,
									});
								}}>
								{teamMembers?.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var teamMembersX = [...teamMembers];
															teamMembersX.splice(index, 1);
															setAttributes({
																teamMembers: teamMembersX,
															});
														}}>
														<Icon icon={close} className="fill-white" />
													</span>
													<span className="handle cursor-pointer group bg-gray-600 hover:bg-gray-300 hover:text-white px-1 py-1">
														<Icon icon={menu} className="fill-white group-hover:fill-gray-700" />
													</span>
													<span
														onClick={() => {
															var teamMembersX = [...teamMembers];
															var objToDup = { ...teamMembersX[index] };
															objToDup.id = Date.now();
															teamMembersX.splice(index + 1, 0, objToDup);
															setAttributes({
																teamMembers: teamMembersX,
															});
														}}
														className="handle cursor-pointer group bg-gray-600 hover:bg-gray-300 hover:text-white px-1 py-1">
														<Icon icon={copy} className="fill-white group-hover:fill-gray-700" />
													</span>
													<span className="mx-2" title={item.title}>
														- #{index}
													</span>
												</>
											}
											initialOpen={false}>
											<MediaUploadCheck>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														var teamMembersX = [...teamMembers];
														teamMembersX[index].id = media.id;
														teamMembersX[index].url = media.url;
														setAttributes({
															teamMembers: teamMembersX,
														});
													}}
													onClose={() => { }}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={item.id}
													render={({ open }) => (
														<>
															<div className="p-3">
																<img
																	src={item.url}
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
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Title", "combo-blocks")}
												</label>
												<InputControl
													value={item.title}
													onChange={(newVal) => {
														var teamMembersX = [...teamMembers];
														teamMembersX[index].title = newVal;
														setAttributes({
															teamMembers: teamMembersX,
														});
													}}
												/>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Description", "combo-blocks")}
												</label>
												<div>
													<RichText
														className="components-textarea-control__input"
														tagName={"div"}
														value={item.description}
														allowedFormats={[
															"core/bold",
															"core/italic",
															"core/link",
														]}
														onChange={(content) => {
															var teamMembersX = [...teamMembers];
															teamMembersX[index].description = content;
															setAttributes({
																teamMembers: teamMembersX,
															});
														}}
														placeholder={__("Start Writing...")}
													/>
												</div>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Website", "combo-blocks")}
												</label>
												<InputControl
													value={item.website}
													onChange={(newVal) => {
														var teamMembersX = [...teamMembers];
														teamMembersX[index].website = newVal;
														setAttributes({
															teamMembers: teamMembersX,
														});
													}}
												/>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Phone", "combo-blocks")}
												</label>
												<InputControl
													value={item.phone}
													onChange={(newVal) => {
														var teamMembersX = [...teamMembers];
														teamMembersX[index].phone = newVal;
														setAttributes({
															teamMembers: teamMembersX,
														});
													}}
												/>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Role", "combo-blocks")}
												</label>
												<InputControl
													value={item.role}
													onChange={(newVal) => {
														var teamMembersX = [...teamMembers];
														teamMembersX[index].role = newVal;
														setAttributes({
															teamMembers: teamMembersX,
														});
													}}
												/>
											</div>
											<div className="my-3">
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Categories", "combo-blocks")}
												</label>
												<div>
													<InputControl
														isPressEnterToChange={true}
														onChange={(newVal) => {
															var teamMembersX = [...teamMembers];
															teamMembersX[index].categories.push(newVal);
															setAttributes({
																teamMembers: teamMembersX,
															});
														}}
													/>
												</div>
											</div>
											<p>Press ENTER to add.</p>
											<div className="flex flex-wrap gap-2 items-center">
												{teamMembers[index].categories.map((item, j) => {
													return (
														<div className="flex  gap-2 items-center border border-solid pr-2">
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var teamMembersX = [...teamMembers];
																	teamMembersX[index].categories.splice(j, 1);
																	setAttributes({
																		teamMembers: teamMembersX,
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span>{item}</span>
														</div>
													);
												})}
											</div>
											<div className="my-3">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Social Links", "combo-blocks")}
													</label>
													<div
														onClick={(ev) => {
															var teamMembersX = [...teamMembers];
															teamMembersX[index].socialLinks.push({
																id: "",
																value: "",
																icon: {
																	iconSrc: "",
																	library: "fontAwesome",
																	srcType: "class",
																},
															});
															setAttributes({
																teamMembers: teamMembersX,
															});
														}}>
														Add
													</div>
												</PanelRow>
												<div className="">
													{teamMembers[index].socialLinks.map((item, j) => {
														return (
															<PGtoggle
																className="font-medium text-slate-900 "
																title={
																	<>
																		<span
																			className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																			onClick={(ev) => {
																				var teamMembersX = [...teamMembers];
																				teamMembersX[index].socialLinks.splice(
																					j,
																					1
																				);
																				setAttributes({
																					teamMembers: teamMembersX,
																				});
																			}}>
																			<Icon icon={close} />
																		</span>
																		{findLabelById(socialLinks, item.id)}
																	</>
																}
																initialOpen={false}>
																<PanelRow>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		{__("Site", "combo-blocks")}
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		options={socialLinks}
																		buttonTitle={
																			teamMembers[index].socialLinks[j].id
																				.length > 0
																				? teamMembers[index].socialLinks[j].id
																				: "Choose"
																		}
																		onChange={(newVal) => {
																			var teamMembersX = [...teamMembers];
																			teamMembersX[index].socialLinks[j].id =
																				newVal.id;
																			setAttributes({
																				teamMembers: teamMembersX,
																			});
																		}}
																		values=""></PGDropdown>
																</PanelRow>
																<PanelRow>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		{__("Link", "combo-blocks")}
																	</label>
																	<InputControl
																		value={item.value}
																		onChange={(newVal) => {
																			var teamMembersX = [...teamMembers];
																			teamMembersX[index].socialLinks[j].value =
																				newVal;
																			setAttributes({
																				teamMembers: teamMembersX,
																			});
																		}}
																	/>
																</PanelRow>
															</PGtoggle>
														);
													})}
												</div>
											</div>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Social Links", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-4">
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Add Media", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={mediaSites}
									buttonTitle="Choose"
									onChange={addMedia}
									values=""></PGDropdown>
							</PanelRow>
							{socialLinks.length == 0 && (
								<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
									{__("No media added", "combo-blocks")}
								</div>
							)}
							<ReactSortable
								list={socialLinks}
								handle={".handle"}
								setList={(item) => {
									setAttributes({ socialLinks: item });
								}}>
								{socialLinks.map((item, index) => (
									<div key={item.id} className="">
										<PGtoggle
											title={
												<>
													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															var socialLinksX = [...socialLinks];
															socialLinksX.splice(index, 1);
															setAttributes({ socialLinks: socialLinksX });
														}}>
														<Icon icon={close} />
													</span>
													<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
														<Icon icon={menu} />
													</span>
													<span className="mx-2">{item.label}</span>
												</>
											}
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
														icon: styles,
														className: "tab-style",
													},
												]}>
												<PGtab name="options">
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Label", "combo-blocks")}
														</label>
														<InputControl
															value={item.label}
															onChange={(newVal) => {
																var socialLinksX = [...socialLinks];
																socialLinksX[index].label = newVal;
																setAttributes({ socialLinks: socialLinksX });
															}}
														/>
													</PanelRow>
													{wrapper.options.type == "share" && (
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL
															</label>
															<InputControl
																value={item.url}
																onChange={(newVal) => {
																	var socialLinksX = [...socialLinks];
																	socialLinksX[index].url = newVal;
																	setAttributes({ socialLinks: socialLinksX });
																}}
															/>
														</PanelRow>
													)}
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Choose Icon", "combo-blocks")}
														</label>
														<PGIconPicker
															library={item?.siteIcon?.library}
															srcType={item?.siteIcon?.srcType}
															iconSrc={item?.siteIcon?.iconSrc}
															onChange={(arg) => {
																var socialLinksX = [...socialLinks];
																socialLinksX[index].siteIcon = {
																	srcType: arg.srcType,
																	library: arg.library,
																	iconSrc: arg.iconSrc,
																};
																setAttributes({ socialLinks: socialLinksX });
															}}
														/>
													</PanelRow>
												</PGtab>
												<PGtab name="styles">
													<PGStyles
														obj={item}
														extra={{ index: index }}
														onChange={onChangeStyleItem}
														onAdd={onAddStyleItem}
														onRemove={onRemoveStyleItem}
														onBulkAdd={onBulkAddItem}
														onReset={onResetNthItem}
													/>
												</PGtab>
											</PGtabs>
										</PGtoggle>
									</div>
								))}
							</ReactSortable>
						</PGtoggle>
						<PGtoggle title={__("Wrapper", "combo-blocks")} initialOpen={false}>
							<ToggleControl
								label="Wrapper Exclude?"
								help={
									itemsWrap.options.excludedWrapper
										? "Wrapper Excluded."
										: "Wrapper Included"
								}
								checked={itemsWrap.options.excludedWrapper ? true : false}
								onChange={(e) => {
									var options = {
										...itemsWrap.options,
										excludedWrapper: itemsWrap.options.excludedWrapper
											? false
											: true,
									};
									setAttributes({
										itemsWrap: { ...itemsWrap, options: options },
									});
								}}
							/>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Item", "combo-blocks")}
							initialOpen={false}>
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Tag", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={itemWrap.options.tag}
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
										{ label: "li", value: "li" },
									]}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, tag: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>
							<div className="my-3">
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Class", "combo-blocks")}
								</label>
								<InputControl
									value={itemWrap.options.class}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, class: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</div>
							<div className=" flex flex-col gap-4 ">
								<ToggleControl
									label={__("Counter Class?", "combo-blocks")}
									help={
										itemWrap.options.counterClass
											? __("Counter Class Added.", "combo-blocks")
											: __("Counter Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.counterClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											counterClass: itemWrap.options.counterClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Odd/Even Class?", "combo-blocks")}
									help={
										itemWrap.options.oddEvenClass
											? __("Odd/Even Class Added.", "combo-blocks")
											: __("Odd/Even Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.oddEvenClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											oddEvenClass: itemWrap.options.oddEvenClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Categories Class?", "combo-blocks")}
									help={
										itemWrap.options.termsClass
											? __("Terms Class Added.", "combo-blocks")
											: __("Terms Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.termsClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											termsClass: itemWrap.options.termsClass ? false : true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</div>
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
					{itemsWrap.options.excludedWrapper && (
						<>
							{teamMembers.length > 0 && (
								<>
									{teamMembers.map((post, j) => {
										return (
											<>
												<BlockContextProvider
													key={post.id}
													value={{
														teamMemberData: post,
														socialLinks: socialLinks,
														loopIndex: j,
													}}>
													{post.id ===
														(activeBlockContextId || teamMembers[0]?.id) ? (
														<>
															<PostTemplateInnerBlocks attsx={TEMPLATE} />
														</>
													) : null}
													<MemoizedPostTemplateBlockPreview
														blocks={childBlocks}
														blockContextId={post.id}
														setActiveBlockContextId={setActiveBlockContextId}
														isHidden={
															post.id ===
															(activeBlockContextId || teamMembers[0]?.id)
														}
													/>
												</BlockContextProvider>
											</>
										);
									})}
								</>
							)}
						</>
					)}
					{!itemsWrap.options.excludedWrapper && (
						<>
							<div {...blockProps}>
								{teamMembers.length > 0 && (
									<>
										{teamMembers.map((post, j) => {
											return (
												<>
													<BlockContextProvider
														key={post.id}
														value={{
															teamMemberData: post,
															socialLinks: socialLinks,
															loopIndex: j,
														}}>
														{post.id ===
															(activeBlockContextId || teamMembers[0]?.id) ? (
															<>
																<PostTemplateInnerBlocks attsx={TEMPLATE} />
															</>
														) : null}
														<MemoizedPostTemplateBlockPreview
															blocks={childBlocks}
															blockContextId={post.id}
															setActiveBlockContextId={setActiveBlockContextId}
															isHidden={
																post.id ===
																(activeBlockContextId || teamMembers[0]?.id)
															}
														/>
													</BlockContextProvider>
												</>
											);
										})}
									</>
								)}
							</div>
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return <InnerBlocks.Content />;
	},
});
