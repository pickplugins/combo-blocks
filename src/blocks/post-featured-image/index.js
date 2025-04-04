import apiFetch from "@wordpress/api-fetch";
import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { createBlock, registerBlockType } from "@wordpress/blocks";
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
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	Icon,
	link,
	linkOff,
	mediaAndText,
	settings,
} from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGLazyLoad from "../../components/lazy-load";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGLightbox from "../../components/lightbox";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import customTags from "../../custom-tags";
import MyLazy from "../../loading.gif";
import MyImage from "../../placeholder.jpg";
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
					fill="url(#paint0_linear_61_208)"
				/>
				<path
					d="M160 66.1177H84.7061V75.5294H160V66.1177Z"
					fill="url(#paint1_linear_61_208)"
				/>
				<path
					d="M141.177 84.9412H84.7061V94.3529H141.177V84.9412Z"
					fill="url(#paint2_linear_61_208)"
				/>
				<path
					d="M36.8446 69L27.097 84.7233L23.2135 78.5059L13 95H20.7281H33.4661H53L36.8446 69Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_208"
						x1="0"
						y1="80.2353"
						x2="65.8824"
						y2="80.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_208"
						x1="84.7061"
						y1="70.8236"
						x2="160"
						y2="70.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_208"
						x1="84.7061"
						y1="89.647"
						x2="141.177"
						y2="89.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/post-featured-image"],
				transform: (attributes) => {
					return createBlock("combo-blocks/post-featured-image", {
						wrapper: {
							options: {
								tag: "div",
								class: "pg-post-featured-image",
							},
							styles: {
								width: {
									Desktop: "100%",
								},
								overflow: {
									Desktop: "hidden",
								},
							},
						},
						featuredImage: {
							options: {
								tag: "",
								linkTo: attributes.isLink ? "postUrl" : "",
								customUrl: "",
								linkToMetaKey: "",
								altTextSrc: "imgAltText",
								altTextCustom: "",
								altTextMetaKey: "",
								titleTextSrc: "imgTitle",
								titleTextCustom: "",
								titleTextMetaKey: "",
								linkTarget: attributes.linkTarget,
								linkAttr: attributes.rel
									? [{ id: "rel", val: attributes.rel }]
									: [],
								class: "",
								size: {
									Desktop: "full",
									Tablet: "full",
									Mobile: "full",
								},
							},
							styles: {
								display: {
									Desktop: "block",
								},
								maxWidth: {
									Desktop: "100%",
								},
								height: {
									Desktop: "auto",
								},
							},
						},
					});
				},
			},
			{
				type: "block",
				blocks: ["core/site-logo"],
				transform: (attributes) => {
					return createBlock("combo-blocks/post-featured-image", {
						wrapper: {
							options: {
								tag: "div",
								class: "pg-post-featured-image",
							},
							styles: {
								width: {
									Desktop: "100%",
								},
								overflow: {
									Desktop: "hidden",
								},
							},
						},
						featuredImage: {
							options: {
								tag: "",
								linkTo: attributes.isLink ? "postUrl" : "",
								customUrl: "",
								linkToMetaKey: "",
								altTextSrc: "imgAltText",
								altTextCustom: "",
								altTextMetaKey: "",
								titleTextSrc: "imgTitle",
								titleTextCustom: "",
								titleTextMetaKey: "",
								linkTarget: attributes.linkTarget,
								linkAttr: [],
								class: "",
								size: {
									Desktop: "full",
									Tablet: "full",
									Mobile: "full",
								},
							},
							styles: {
								display: {
									Desktop: "block",
								},
								maxWidth: {
									Desktop: "100%",
								},
								height: {
									Desktop: "auto",
								},
							},
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/post-featured-image"],
				transform: (attributes) => {
					var content = attributes.featuredImage.options;
					function checkIDExists(idToCheck) {
						return content.linkAttr.some((item) => item.id === idToCheck);
					}
					const relExists = checkIDExists("rel");
					var value = "";
					if (relExists) {
						value = content.linkAttr.find((obj) => obj.id === "rel");
					}
					return createBlock("core/post-featured-image", {
						isLink: content.linkTo ? true : false,
						linkTarget: content.linkTarget,
						rel: relExists ? value.val : null,
					});
				},
			},
		],
	},
	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		let featuredImage = attributes.featuredImage;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var lazyLoad = attributes.lazyLoad;
		var lightbox = attributes.lightbox;
		var utmTracking = attributes.utmTracking;
		let isProFeature = applyFilters("isProFeature", true);
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var liveMode =
			context["combo-blocks/liveMode"] == undefined
				? null
				: context["combo-blocks/liveMode"];

		var breakPointX = myStore.getBreakPoint();
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [linkPickerSrcUrl, setlinkPickerSrcUrl] = useState(false);
		const [linkPickerLazySrcUrl, setlinkPickerLazySrcUrl] = useState(false);
		const [currentPostLazyImageId, setCurrentPostLazyImageId] = useState();
		const [postLazyImage, setPostLazyImage] = useState(null);
		const [postImage, setPostImage] = useState(null);
		const [globalImageSizes, setGlobalImageSizes] = useState({
			full: {
				label: "Full",
				value: "full",
				height: "",
				width: "",
				crop: false,
			},
			thumbnail: {
				label: "thumbnail(150*150)",
				value: "thumbnail",
				height: 150,
				width: 150,
			},
			medium: {
				label: "medium(300*300)",
				value: "medium",
				height: 300,
				width: 300,
			},
			medium_large: {
				label: "medium large(768*0)",
				value: "medium_large",
				height: 0,
				width: 768,
			},
			large: {
				label: "large(1024*1024)",
				value: "large",
				height: 1024,
				width: 1024,
			},
			"1536x1536": {
				label: "1536x1536(1536*1536)",
				value: "1536x1536",
				height: 1536,
				width: 1536,
			},
			"2048x2048": {
				label: "2048x2048(2048*2048)",
				value: "2048x2048",
				height: 2048,
				width: 2048,
			},
			woocommerce_archive_thumbnail: {
				label: "woocommerce archive thumbnail(500*500)",
				value: "woocommerce_archive_thumbnail",
				height: 500,
				width: 500,
			},
			woocommerce_thumbnail: {
				label: "woocommerce thumbnail(300*300)",
				value: "woocommerce_thumbnail",
				height: 300,
				width: 300,
			},
			woocommerce_single: {
				label: "woocommerce single(600*0)",
				value: "woocommerce_single",
				height: 0,
				width: 600,
			},
			woocommerce_gallery_thumbnail: {
				label: "woocommerce gallery thumbnail(100*100)",
				value: "woocommerce_gallery_thumbnail",
				height: 100,
				width: 100,
			},
		});
		const [filterArgs, setfilterArgs] = useState([
			{ label: "Blur", isPro: false, value: "blur", val: "", unit: "px" },
			{
				label: "Brightness",
				isPro: false,
				value: "brightness",
				val: "10",
				unit: "%",
			},
			{
				label: "Contrast",
				isPro: true,
				value: "contrast",
				val: "10",
				unit: "%",
			},
			{
				label: "Grayscale",
				isPro: true,
				value: "grayscale",
				val: "10",
				unit: "%",
			},
			{
				label: "Hue-rotate",
				isPro: true,
				value: "hue-rotate",
				val: "10",
				unit: "deg",
			},
			{ label: "Invert", isPro: true, value: "invert", val: "10", unit: "%" },
			{ label: "Opacity", isPro: true, value: "opacity", val: "10", unit: "%" },
			{
				label: "Saturate",
				isPro: true,
				value: "saturate",
				val: "10",
				unit: "%",
			},
			{ label: "Sepia", value: "sepia", val: "10", unit: "%" },
		]);
		var FeaturedImageLinkToBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			postUrl: { label: __("Post URL", "combo-blocks"), value: "postUrl" },
			homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			authorUrl: {
				label: __("Author URL", "combo-blocks"),
				value: "authorUrl",
				isPro: true,
			},
			authorLink: {
				label: __("Author Link", "combo-blocks"),
				value: "authorLink",
				isPro: true,
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
		let linkToArgs = applyFilters(
			"comboBlocksFeaturedImageLinkTo",
			FeaturedImageLinkToBasic
		);
		var featuredImageAltTextSrcBasic = {
			none: { label: __("No Alt Text", "combo-blocks"), value: "" },
			imgAltText: {
				label: __("Image Alt Text", "combo-blocks"),
				value: "imgAltText",
			},
			postTitle: { label: __("Post Title", "combo-blocks"), value: "postTitle" },
			imgTitle: {
				label: __("Image Title", "combo-blocks"),
				value: "imgTitle",
				isPro: true,
			},
			imgCaption: {
				label: __("Image Caption", "combo-blocks"),
				value: "imgCaption",
				isPro: true,
			},
			imgDescription: {
				label: __("Image Description", "combo-blocks"),
				value: "imgDescription",
				isPro: true,
			},
			imgSlug: {
				label: __("Image Slug", "combo-blocks"),
				value: "imgSlug",
				isPro: true,
			},
			postSlug: {
				label: __("Post Slug", "combo-blocks"),
				value: "postSlug",
				isPro: true,
			},
			excerpt: {
				label: __("Post Excerpt", "combo-blocks"),
				value: "excerpt",
				isPro: true,
			},
			customField: {
				label: __("Post Custom Field", "combo-blocks"),
				value: "customField",
				isPro: true,
			},
			custom: {
				label: __("Custom", "combo-blocks"),
				value: "custom",
				isPro: true,
			},
		};
		let altTextSrcArgs = applyFilters(
			"comboBlocksFeaturedImageAltText",
			featuredImageAltTextSrcBasic
		);
		var featuredImageTitleTextSrcBasic = {
			none: { label: __("No Title Text", "combo-blocks"), value: "" },
			imgTitle: { label: __("Image Title", "combo-blocks"), value: "imgTitle" },
			postTitle: { label: __("Post Title", "combo-blocks"), value: "postTitle" },
			imgAltText: {
				label: __("Image Alt Text", "combo-blocks"),
				value: "imgAltText",
				isPro: true,
			},
			imgCaption: {
				label: __("Image Caption", "combo-blocks"),
				value: "imgCaption",
				isPro: true,
			},
			imgDescription: {
				label: __("Image Description", "combo-blocks"),
				value: "imgDescription",
				isPro: true,
			},
			imgSlug: {
				label: __("Image Slug", "combo-blocks"),
				value: "imgSlug",
				isPro: true,
			},
			postSlug: {
				label: __("Post Slug", "combo-blocks"),
				value: "postSlug",
				isPro: true,
			},
			excerpt: {
				label: __("Post Excerpt", "combo-blocks"),
				value: "excerpt",
				isPro: true,
			},
			customField: {
				label: __("Post Custom Field", "combo-blocks"),
				value: "customField",
				isPro: true,
			},
			custom: {
				label: __("Custom", "combo-blocks"),
				value: "custom",
				isPro: true,
			},
		};
		let titleTextSrcArgs = applyFilters(
			"comboBlocksFeaturedImageTitleText",
			featuredImageTitleTextSrcBasic
		);
		var customTagArgsBasic = {
			"": { label: __("Choose", "combo-blocks"), value: "" },
			h1: { label: "H1", value: "h1" },
			h2: { label: "H2", value: "h2" },
			h3: { label: "H3", value: "h3" },
			h4: { label: "H4", value: "h4" },
			h5: { label: "H5", value: "h5" },
			h6: { label: "H6", value: "h6" },
			span: { label: "SPAN", value: "span" },
			div: { label: "DIV", value: "div" },
			p: { label: "P", value: "p" },
		};
		let customTagArgs = applyFilters("customTagArgs", customTagArgsBasic);
		const ALLOWED_MEDIA_TYPES = ["image"];
		const [currentPostImageId, setCurrentPostImageId] = liveMode
			? useEntityProp("postType", postType, "featured_media", postId)
			: useState("");
		const [currentPostUrl, setCurrentPostUrl] = liveMode
			? useEntityProp("postType", postType, "link", postId)
			: useState("");
		useEffect(() => {
			if (!currentPostImageId) return;
			apiFetch({
				path: "/wp/v2/media/" + currentPostImageId,
				method: "POST",
				data: { id: currentPostImageId },
			}).then((res) => {
				setPostImage(res);
			});
		}, [currentPostImageId]);
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
				var featuredImageX = attributes.featuredImage;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (featuredImageX != undefined) {
					var featuredImageY = {
						...featuredImageX,
						options: featuredImage.options,
					};
					setAttributes({ featuredImage: featuredImageY });
					blockCssObj[imgSelector] = featuredImageY;
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

		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		var linkSelector = "";
		if (wrapper.options.tag.length != 0) {
			if (featuredImage.options.linkTo.length > 0) {
				linkSelector = blockClass + " a";
			} else {
				linkSelector = blockClass;
			}
		} else {
			linkSelector = blockClass;
		}
		var imgSelector = blockClass + " img";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ featuredImage: featuredImage });
			// setAttributes({ wrapper: wrapper });
			myStore.generateBlockCss(blockCssY.items, blockId);
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': { "Desktop": "100%" } };
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': { "Desktop": "auto" } };
			//setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[imgSelector] = featuredImage;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			setTimeout(() => {
				if (window.comboBlocksImgSizes != null) {
					setGlobalImageSizes(window.comboBlocksImgSizes);
				}
			}, 3000);
		}, []);

		var BefroeTitle = function ({ title, args }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							featuredImage.styles.filter[breakPointX].splice(args.index, 1);
							var styles = featuredImage.styles;
							setAttributes({
								featuredImage: { ...featuredImage, styles: styles },
							});
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
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
		function onPickCssLibraryImage(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				featuredImage[sudoScource] = sudoScourceArgs;
			});
			var featuredImageX = Object.assign({}, featuredImage);
			setAttributes({ featuredImage: featuredImageX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					imgSelector
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
		}

		function onRemoveStyleImage(sudoScource, key) {
			let obj = { ...featuredImage };
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
			setAttributes({ featuredImage: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
		}
		function onChangeStyleImage(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, featuredImage);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ featuredImage: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				imgSelector
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
		function onAddStyleImage(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, featuredImage);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ featuredImage: object });
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
		function onBulkAddFeaturedImage(sudoScource, cssObj) {
			let obj = Object.assign({}, featuredImage);
			obj[sudoScource] = cssObj;
			setAttributes({ featuredImage: obj });
			var selector = myStore.getElementSelector(sudoScource, imgSelector);
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
		function onResetFeaturedImage(sudoScources) {
			let obj = Object.assign({}, featuredImage);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						imgSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ featuredImage: obj });
		}
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			linkAttrObj();
		}, [featuredImage]);
		var linkAttrObj = () => {
			var sdsd = {};
			featuredImage.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		var postUrl =
			featuredImage.options.customUrl != undefined &&
				featuredImage.options.customUrl.length > 0
				? featuredImage.options.customUrl
				: currentPostUrl;
		const CustomTag = `${wrapper.options.tag}`;
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
												{ label: "span", value: "span" },
												{ label: "div", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: {
														styles: wrapper.styles,
														options: options,
													},
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
							title={__("Featured Image", "combo-blocks")}
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
									<div className="mb-4">
										<label
											for=""
											className="font-medium text-slate-900 block pb-2 ">
											{__("Thumbnail Size", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											// btnClass="w-full block text-center "
											btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											// variant="secondary"
											options={globalImageSizes}
											// buttonTitle="Choose"
											buttonTitle={
												featuredImage.options.size == undefined
													? __("Choose", "combo-blocks")
													: globalImageSizes[
														featuredImage.options.size[breakPointX]
													] == undefined
														? __("Choose", "combo-blocks")
														: globalImageSizes[
															featuredImage.options.size[breakPointX]
														].label
											}
											onChange={(option, index) => {
												var newValuesObj = {};
												if (
													Object.keys(featuredImage.options.size).length == 0
												) {
													newValuesObj[breakPointX] = option.value;
												} else {
													newValuesObj = featuredImage.options.size;
													newValuesObj[breakPointX] = option.value;
												}
												var options = {
													...featuredImage.options,
													size: newValuesObj,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});
											}}
											values={
												featuredImage.options.size[breakPointX]
											}></PGDropdown>
									</div>
									{/* {featuredImage.options.size[breakPointX] != undefined && (
									<div className="bg-gray-400 text-white px-3 py-2 my-3">
										{" "}
										{featuredImage.options.size[breakPointX]}
									</div>
								)} */}
									<PanelRow className="my-3">
										<label>{__("Link To", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.linkTo.length == 0
													? __("Choose", "combo-blocks")
													: linkToArgs[featuredImage.options.linkTo].label
											}
											options={linkToArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													linkTo: option.value,
												};
												setAttributes({
													featuredImage: {
														...featuredImage,
														options: options,
													},
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{featuredImage.options.linkTo == "customField" ||
										(featuredImage.options.linkTo == "authorMeta" && (
											<PanelRow>
												{featuredImage.options.linkTo == "customField" && (
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Custom Field Key", "combo-blocks")}
													</label>
												)}
												{featuredImage.options.linkTo == "authorMeta" && (
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Author Meta Key", "combo-blocks")}
													</label>
												)}
												<InputControl
													className="mr-2"
													value={featuredImage.options.linkToMetaKey}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															linkToMetaKey: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										))}
									{featuredImage.options.linkTo == "customUrl" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom URL", "combo-blocks")}
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
													{featuredImage.options.customUrl.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...featuredImage.options,
																	customUrl: "",
																};
																setAttributes({
																	featuredImage: {
																		...featuredImage,
																		options: options,
																	},
																});
																setLinkPickerPosttitle(false);
															}}></Button>
													)}
													{linkPickerPosttitle && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={featuredImage.options.customUrl}
																onChange={(newVal) => {
																	var options = {
																		...featuredImage.options,
																		customUrl: newVal.url,
																	};
																	setAttributes({
																		featuredImage: {
																			...featuredImage,
																			options: options,
																		},
																	});
																}}
															/>
															<div className="p-2">
																<span className="font-bold">Linked to:</span>{" "}
																{featuredImage.options.customUrl.length != 0
																	? featuredImage.options.customUrl
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
											{featuredImage.options.customUrl.length > 0 && (
												<div className="p-2 pl-0 truncate ">
													<span className="font-bold">
														{__("Linked to:", "combo-blocks")}
													</span>{" "}
													{featuredImage.options.customUrl}
												</div>
											)}
										</>
									)}
									{featuredImage.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link Target", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={featuredImage.options.linkTarget}
													options={[
														{ label: __("Choose...", "combo-blocks"), value: "" },
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															linkTarget: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Attributes", "combo-blocks")}
										</label>
										<div
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												var sdsd = featuredImage.options.linkAttr.concat({
													id: "",
													val: "",
												});
												var options = {
													...featuredImage.options,
													linkAttr: sdsd,
												};
												setAttributes({
													featuredImage: {
														...featuredImage,
														options: options,
													},
												});
												linkAttrObj();
											}}>
											{__("Add", "combo-blocks")}
										</div>
									</PanelRow>
									{featuredImage.options.linkAttr.map((x, i) => {
										return (
											<div className="my-2">
												<PanelRow>
													<InputControl
														placeholder="Name"
														className="mr-2"
														value={featuredImage.options.linkAttr[i].id}
														onChange={(newVal) => {
															featuredImage.options.linkAttr[i].id = newVal;
															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);
															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
																	options: options,
																},
															});
														}}
													/>
													<InputControl
														className="mr-2"
														placeholder="Value"
														value={x.val}
														onChange={(newVal) => {
															featuredImage.options.linkAttr[i].val = newVal;
															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);
															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
																	options: options,
																},
															});
														}}
													/>
													<span
														// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															featuredImage.options.linkAttr.splice(i, 1);
															var ssdsd = featuredImage.options.linkAttr.concat(
																[]
															);
															var options = {
																...featuredImage.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																featuredImage: {
																	...featuredImage,
																	options: options,
																},
															});
														}}>
														<Icon icon={close} />
													</span>
												</PanelRow>
											</div>
										);
									})}
									<PanelRow className="my-3">
										<label>{__("Alt Text Source", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.altTextSrc.length == 0
													? __("Choose", "combo-blocks")
													: altTextSrcArgs[featuredImage.options.altTextSrc]
														.label
											}
											options={altTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													altTextSrc: option.value,
												};
												setAttributes({
													featuredImage: {
														...featuredImage,
														options: options,
													},
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{featuredImage.options.altTextSrc == "customField" && (
										<div>
											<PanelRow className="my-3">
												<label>{__("Custom Field", "combo-blocks")}</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Choose"}
													options={[
														{ label: __("Custom", "combo-blocks"), value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(option, index) => {
														var options = {
															...featuredImage.options,
															altTextMetaKey: option.value,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													values=""></PGDropdown>
											</PanelRow>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Field Key", "combo-blocks")}
												</label>
												<InputControl
													className="mr-2"
													value={featuredImage.options.altTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															altTextMetaKey: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									{featuredImage.options.altTextSrc == "custom" && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Alt Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={featuredImage.options.altTextCustom}
												onChange={(newVal) => {
													var options = {
														...featuredImage.options,
														altTextCustom: newVal,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}
									<PanelRow className="my-3">
										<label>{__("Title Text Source", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												featuredImage.options.titleTextSrc == undefined ||
													featuredImage.options.titleTextSrc.length == 0
													? __("Choose", "combo-blocks")
													: titleTextSrcArgs[featuredImage.options.titleTextSrc]
														.label
											}
											options={titleTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...featuredImage.options,
													titleTextSrc: option.value,
												};
												setAttributes({
													featuredImage: {
														...featuredImage,
														options: options,
													},
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{featuredImage.options.titleTextSrc == "customField" && (
										<div>
											<PanelRow className="my-3">
												<label>{__("Custom Field", "combo-blocks")}</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Choose"}
													options={[
														{ label: __("Custom", "combo-blocks"), value: "" },
														{
															label: "Yoast meta",
															value: "_yoast_wpseo_metadesc",
														},
														{
															label: "Rank Math meta",
															value: "rank_math_description",
														},
														{
															label: "AIO SEO meta",
															value: "_aioseo_og_description",
														},
														{
															label: "SEOPress meta",
															value: "_seopress_titles_desc",
														},
														{
															label: "WP Meta SEO meta",
															value: "_metaseo_metadesc",
														},
														{
															label: "The SEO Framework meta",
															value: "_genesis_description",
														},
														{
															label: "SEO SIMPLE PACK meta",
															value: "ssp_meta_description",
														},
													]}
													onChange={(option, index) => {
														var options = {
															...featuredImage.options,
															titleTextMetaKey: option.value,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													values=""></PGDropdown>
											</PanelRow>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Field Key", "combo-blocks")}
												</label>
												<InputControl
													className="mr-2"
													value={featuredImage.options.titleTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...featuredImage.options,
															titleTextMetaKey: newVal,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									{featuredImage.options.titleTextSrc == "custom" && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Title Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={featuredImage.options.titleTextCustom}
												onChange={(newVal) => {
													var options = {
														...featuredImage.options,
														titleTextCustom: newVal,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={featuredImage}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												image,
												"image",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												image,
												"image",
												imgSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={featuredImage}
										onChange={onPickCssLibraryImage}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							title={__("Lazy Load", "combo-blocks")}
							initialOpen={false}
						// className={galleryId != null ? "hidden" : ""}
						>
							<PanelRow>
								<ToggleControl
									label={__("Lazy Load Enable?", "combo-blocks")}
									help={
										featuredImage.options.lazy
											? __("Lazy Load Enabled", "combo-blocks")
											: __("Lazy Load Disabled.", "combo-blocks")
									}
									checked={featuredImage.options.lazy ? true : false}
									onChange={(e) => {
										var options = {
											...featuredImage.options,
											lazy: featuredImage.options.lazy ? false : true,
											lazySrc: featuredImage?.options?.lazySrc
												? featuredImage?.options?.lazySrc
												: "",
											lazySrcId: featuredImage?.options?.lazySrcId
												? featuredImage?.options?.lazySrcId
												: "",
											lazySrcType: featuredImage?.options?.lazySrcType
												? featuredImage?.options?.lazySrcType
												: "",
										};
										setAttributes({
											featuredImage: { ...featuredImage, options: options },
										});
									}}
								/>
							</PanelRow>
							{featuredImage.options.lazy && (
								<div className="pt-3">
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Placeholder Image", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={featuredImage.options.lazySrcType}
											options={[
												{ label: __("Media", "combo-blocks"), value: "media" },
												// { label: __("Custom Field","combo-blocks"), value: "customField" },
												{
													label: __("Image Source URL", "combo-blocks"),
													value: "customUrl",
												},
												// { label: 'Image ID', value: 'imgId' },
											]}
											onChange={(newVal) => {
												var options = {
													...featuredImage.options,
													lazySrcType: newVal,
												};
												setAttributes({
													featuredImage: { ...featuredImage, options: options },
												});
											}}
										/>
									</PanelRow>
									{featuredImage?.options?.lazySrc?.length !== undefined &&
										featuredImage.options.lazySrc.length > 0 && (
											<MediaUploadCheck>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														// media.id
														setCurrentPostLazyImageId(media.id);
														var options = {
															...featuredImage.options,
															lazySrc: media.url,
															lazySrcId: media.id,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													onClose={() => { }}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={featuredImage.options.srcId}
													render={({ open }) => (
														<div
															className="flex w-full justify-center items-center bg-gray-300/30 min-h-[200px] rounded-md border border-solid border-slate-400 hover:border-black transition-all duration-300 ease-in-out cursor-pointer mt-2 "
															onClick={open}>
															<img
																// src={MyLazy}
																src={featuredImage.options.lazySrc}
																alt=""
																className=" "
															/>
														</div>
													)}
												/>
											</MediaUploadCheck>
										)}
									{featuredImage?.options?.lazySrc?.length == 0 && (
										<MediaUploadCheck>
											<MediaUpload
												className="bg-gray-700 hover:bg-gray-600"
												onSelect={(media) => {
													// media.id
													setCurrentPostLazyImageId(media.id);
													var options = {
														...featuredImage.options,
														lazySrc: media.url,
														lazySrcId: media.id,
													};
													setAttributes({
														featuredImage: {
															...featuredImage,
															options: options,
														},
													});
												}}
												onClose={() => { }}
												allowedTypes={ALLOWED_MEDIA_TYPES}
												value={featuredImage.options.lazySrcId}
												render={({ open }) => (
													<div
														className="flex w-full justify-center items-center bg-gray-300/30 min-h-[200px] rounded-md border border-solid border-slate-400 hover:border-black transition-all duration-300 ease-in-out cursor-pointer mt-2 "
														onClick={open}>
														<img src={MyLazy} alt="" className=" " />
													</div>
												)}
											/>
										</MediaUploadCheck>
									)}
									{featuredImage.options.lazySrcType == "media" && (
										<>
											<div className="mt-5" for="">
												{__("Choose Image", "combo-blocks")}
											</div>
											<MediaUploadCheck>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														// media.id
														setCurrentPostLazyImageId(media.id);
														var options = {
															...featuredImage.options,
															lazySrc: media.url,
															lazySrcId: media.id,
														};
														setAttributes({
															featuredImage: {
																...featuredImage,
																options: options,
															},
														});
													}}
													onClose={() => { }}
													allowedTypes={ALLOWED_MEDIA_TYPES}
													value={featuredImage.options.lazySrcId}
													render={({ open }) => (
														<Button
															className="my-3 bg-gray-700 hover:bg-gray-600 text-white border border-solid border-gray-300 text-center w-full hover:text-white "
															onClick={open}>
															{__("Open Media Library", "combo-blocks")}
														</Button>
													)}
												/>
											</MediaUploadCheck>
										</>
									)}
									{featuredImage.options.lazySrcType == "customUrl" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Image URL", "combo-blocks")}
												</label>
												<div className="relative">
													<Button
														className={
															linkPickerLazySrcUrl ? "!bg-gray-400" : ""
														}
														icon={link}
														onClick={(ev) => {
															setlinkPickerLazySrcUrl((prev) => !prev);
														}}></Button>
													{featuredImage.options.lazySrc.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...featuredImage.options,
																	lazySrc: "",
																};
																setAttributes({
																	featuredImage: {
																		...featuredImage,
																		options: options,
																	},
																});
																setlinkPickerLazySrcUrl(false);
															}}></Button>
													)}
													{linkPickerLazySrcUrl && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={featuredImage.options.lazySrc}
																onChange={(newVal) => {
																	var options = {
																		...featuredImage.options,
																		lazySrc: newVal.url,
																	};
																	setAttributes({
																		featuredImage: {
																			...featuredImage,
																			options: options,
																		},
																	});
																	setPostLazyImage({
																		...postLazyImage,
																		lazySrc: newVal.url,
																		media_details: { sizes: {} },
																		guid: { rendered: newVal.url },
																	});
																}}
															/>
															<div className="p-2">
																<span className="font-bold">
																	{__("Image Source URL:", "combo-blocks")}
																</span>{" "}
																{featuredImage.options.lazySrc.length != 0
																	? featuredImage.options.lazySrc
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
										</>
									)}
								</div>
							)}
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Lightbox", "combo-blocks")}
							initialOpen={false}>
							<PGLightbox
								lightbox={lightbox}
								onChange={(prams) => {
									setAttributes({ lightbox: prams });
								}}
							/>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Lazy Load", "combo-blocks")}
							initialOpen={true}>
							<PGLazyLoad
								lazyLoad={lazyLoad}
								onChange={(prams) => {
									setAttributes({ lazyLoad: prams });
								}}
							/>
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
					{postImage == null && (
						<>
							{wrapper.options.tag.length > 0 && (
								<>
									<CustomTag {...blockProps}>
										{featuredImage.options.linkTo.length > 0 && (
											<a
												onClick={handleLinkClick}
												href={postUrl}
												target={featuredImage.options.linkTarget}>
												<img
													src={MyImage}
													{...linkAttrItems}
													alt="Default Featured Image"
												/>
											</a>
										)}
										{featuredImage.options.linkTo.length == 0 && (
											<img
												src={MyImage}
												{...linkAttrItems}
												alt="Default Featured Image"
											/>
										)}
									</CustomTag>
								</>
							)}
							{wrapper.options.tag.length == 0 && (
								<>
									{featuredImage.options.linkTo.length > 0 && (
										<a
											{...blockProps}
											onClick={handleLinkClick}
											href={postUrl}
											target={featuredImage.options.linkTarget}>
											<img
												src={MyImage}
												{...linkAttrItems}
												alt="Default Featured Image"
											/>
										</a>
									)}
									{featuredImage.options.linkTo.length == 0 && (
										<img
											{...blockProps}
											{...linkAttrItems}
											src={MyImage}
											alt="Default Featured Image"
										/>
									)}
								</>
							)}
						</>
					)}
					{postImage != null && (
						<>
							{wrapper.options.tag.length > 0 && (
								<>
									<CustomTag {...blockProps}>
										{featuredImage.options.linkTo.length > 0 && (
											<a
												onClick={handleLinkClick}
												href={postUrl}
												target={featuredImage.options.linkTarget}>
												{postImage != null &&
													postImage.media_details.sizes[
													featuredImage.options.size[breakPointX]
													] != undefined && (
														<img
															src={
																postImage != null &&
																	postImage.guid.rendered != undefined
																	? postImage.guid.rendered
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}
											</a>
										)}
										{featuredImage.options.linkTo.length == 0 && (
											<>
												{postImage.media_details.sizes[
													featuredImage.options.size[breakPointX]
												] != undefined && (
														<img
															{...linkAttrItems}
															src={
																postImage != null &&
																	postImage.guid.rendered != undefined
																	? postImage.guid.rendered
																	: ""
															}
															alt={postImage.alt_text}
														/>
													)}
											</>
										)}
									</CustomTag>
								</>
							)}
							{wrapper.options.tag.length == 0 && (
								<>
									{featuredImage.options.linkTo.length > 0 && (
										<a
											{...blockProps}
											onClick={handleLinkClick}
											href={postUrl}
											target={featuredImage.options.linkTarget}>
											{postImage != null &&
												postImage.media_details.sizes[
												featuredImage.options.size[breakPointX]
												] != undefined && (
													<img
														src={
															postImage != null &&
																postImage.guid.rendered != undefined
																? postImage.guid.rendered
																: ""
														}
														alt={postImage.alt_text}
													/>
												)}
										</a>
									)}
									{featuredImage.options.linkTo.length == 0 && (
										<>
											{postImage.media_details.sizes[
												featuredImage.options.size[breakPointX]
											] != undefined && (
													<img
														{...blockProps}
														src={
															postImage != null &&
																postImage.guid.rendered != undefined
																? postImage.guid.rendered
																: ""
														}
														alt={postImage.alt_text}
													/>
												)}
										</>
									)}
								</>
							)}
						</>
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
