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
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
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
	link,
	linkOff,
	mediaAndText,
	page,
	settings,
} from "@wordpress/icons";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGcssOpenaiPrompts from "../../components/openai-prompts";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import MyImage from "../../placeholder.jpg";
import metadata from "./block.json";

import PGcssClassPicker from "../../components/css-class-picker";
import PGLazyLoad from "../../components/lazy-load";
import PGLightbox from "../../components/lightbox";
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
					d="M6 12.7987C6 9.04446 9.0439 6 12.8 6H147.2C150.956 6 154 9.04446 154 12.7987V147.185C154 150.94 150.956 153.984 147.2 153.984H12.8C9.0439 153.984 6 150.94 6 147.185V12.7987Z"
					stroke="url(#paint0_linear_164_2)"
					strokeWidth="12"
				/>
				<path
					d="M90.458 52.4749L63.9445 95.0445L53.3814 78.2114L25.6006 122.868H46.6211H81.2684H134.401L90.458 52.4749Z"
					fill="#C15940"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_164_2"
						x1="-3.2"
						y1="79.3521"
						x2="160"
						y2="79.3521"
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
				blocks: ["core/image"],
				transform: (attributes) => {
					return createBlock("combo-blocks/image", {
						wrapper: {
							options: {
								tag: "div",
								class: "pg-image",
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
						image: {
							options: {
								imgSrcType: attributes.id == undefined ? "customUrl" : "media",
								imgSrcMetaKey: "",
								imgSrcMetaKeyType: "",
								imgSrcImgId: attributes.id == undefined ? "" : attributes.id,
								srcUrl: attributes?.url,
								lazy: false,
								lazySrc: "",
								lazySrcId: "",
								lazySrcType: "media",
								srcId: "",
								linkTo: attributes.href == undefined ? "" : "customUrl",
								linkToMetaKey: "",
								linkTocustomUrl: attributes?.href,
								altTextSrc: "imgAltText",
								altTextCustom: attributes?.alt,
								altTextMetaKey: "",
								titleTextSrc: "imgCaption",
								titleTextCustom: attributes?.caption,
								titleTextMetaKey: "",
								linkTarget: "_blank",
								linkAttr: [],
								class: "",
								size: {
									Desktop: "full",
									Tablet: "full",
									Mobile: "full",
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
						},
					});
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/image"],
				transform: (attributes) => {
					var image = attributes.image.options;
					return createBlock("core/image", {
						alt: image.altTextCustom,
						caption: image.titleTextCustom,
						id: image.imgSrcType == "media" ? image.srcId : null,
						href: image.linkTo == "customUrl" ? image.linkTocustomUrl : null,
						url: image.srcUrl,
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
		var galleryId =
			context["combo-blocks/galleryId"] == undefined
				? null
				: context["combo-blocks/galleryId"];
		let image = attributes.image;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var lazyLoad = attributes.lazyLoad;
		var lightbox = attributes.lightbox;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var blockCssY = attributes.blockCssY;
		var utmTracking = attributes.utmTracking;
		let isProFeature = applyFilters("isProFeature", true);
		var postId = context["postId"];
		var postType = context["postType"];
		const wrapperSelector = blockClass;
		var linkSelector = "";
		var imgSelector = "";
		var breakPointX = myStore.getBreakPoint();
		const [loading, setLoading] = useState(false);
		const [isLoading, setisLoading] = useState(false);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [linkPickerSrcUrl, setlinkPickerSrcUrl] = useState(false);
		const [linkPickerLazySrcUrl, setlinkPickerLazySrcUrl] = useState(false);
		const [postImage, setPostImage] = useState(null);
		const [postLazyImage, setPostLazyImage] = useState(null);
		var [AIWriter, setAIWriter] = useState(false); // Using the hook.
		const [AIautoUpdate, setAIautoUpdate] = useState(false);
		var formattedPrompt =
			"Respond only with image and no other text. Do not include any explanations, introductions, or concluding remarks.";

		var imgSrcTypeArgs = {
			media: { label: __("Media", "combo-blocks"), value: "media" },
			customField: {
				label: __("Custom Field", "combo-blocks"),
				value: "customField",
			},
			customUrl: {
				label: __("Image Source URL", "combo-blocks"),
				value: "customUrl",
			},
		};

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
		const getImageDimensions = (url) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					resolve({ width: img.width, height: img.height });
				};
				img.onerror = (err) => {
					reject(err);
				};
				img.src = url;
			});
		};

		var imageLinkToBasic = {
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
			// authorMeta: { label: __("Author Meta", "combo-blocks"), value: "authorMeta", isPro: true },
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
		let linkToArgs = applyFilters("comboBlocksImageLinkTo", imageLinkToBasic);

		var altTextSrcBasic = {
			none: { label: __("No Alt Text", "combo-blocks"), value: "" },
			imgTitle: { label: __("Image Title", "combo-blocks"), value: "imgTitle" },
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
			postTitle: {
				label: __("Post Title", "combo-blocks"),
				value: "postTitle",
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
		let altTextSrcArgs = applyFilters("comboBlocksImageAltText", altTextSrcBasic);
		var titleTextSrcBasic = {
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
			"comboBlocksImageTitleText",
			titleTextSrcBasic
		);
		const ALLOWED_MEDIA_TYPES = ["image"];
		const [currentPostImageId, setCurrentPostImageId] = useState(
			image.options.srcId
		);
		const [currentPostLazyImageId, setCurrentPostLazyImageId] = useState(
			image.options.lazySrcId
		);
		const [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);

		useEffect(() => {
			if (image.options.imgSrcMetaKey.length != 0) {
				setLoading(true);
				apiFetch({
					path: "/combo-blocks/v2/get_post_meta",
					method: "POST",
					data: {
						postId: postId,
						meta_key: image.options.imgSrcMetaKey,
						type: "string",
						template: "",
					},
				}).then((res) => {
					var metaKeyType =
						image.options.imgSrcMetaKeyType != undefined
							? image.options.imgSrcMetaKeyType
							: "ID";
					if (metaKeyType == "ID") {
						setCurrentPostImageId(res.meta_value);
					} else {
						//setPostImage(res)
						setPostImage({
							media_details: { sizes: {} },
							guid: { rendered: res.meta_value },
						});
					}
					setLoading(false);
				});
			}
		}, [
			image.options.imgSrcMetaKey,
			image.options.imgSrcMetaKeyType,
			image.options.imgSrcType,
		]);
		// useEffect(() => {
		// 	var blockCssObj = {};
		// 	blockCssObj[wrapperSelector] = wrapper;
		// 	blockCssObj[imgSelector] = image;
		// 	//setAttributes({ wrapper: wrapper, image: image, });
		// 	var blockCssRules = myStore.getBlockCssRules(blockCssObj);
		// 	var items = blockCssRules;
		// 	setAttributes({ blockCssY: { items: items } });
		// }, [wrapper]);
		function setFeaturedImageSize(option, index) {
			var newValuesObj = {};
			if (Object.keys(image.options.size).length == 0) {
				newValuesObj[breakPointX] = option.value;
			} else {
				newValuesObj = image.options.size;
				newValuesObj[breakPointX] = option.value;
			}
			var options = { ...image.options, size: newValuesObj };
			setAttributes({ image: { ...image, options: options } });
		}
		useEffect(() => { }, [image]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ image: image });
			// setAttributes({ wrapper: wrapper });
			myStore.generateBlockCss(blockCssY.items, blockId);
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'width': { "Desktop": "100%" } };
			//blockCssY.items[imgSelector] = { ...blockCssY.items[imgSelector], 'height': { "Desktop": "auto" } };
			//setAttributes({ blockCssY: { items: blockCssY.items } });
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[imgSelector] = image;
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
				let imageX = attributes.image;
				var wrapperX = attributes.wrapper;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (imageX != undefined) {
					var imageY = { ...imageX, options: image.options };
					setAttributes({ image: imageY });
					blockCssObj[imgSelector] = imageY;
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
		if (wrapper.options.tag.length != 0) {
			var imgSelector = blockClass + " img";
			if (image.options.linkTo.length > 0) {
				linkSelector = blockClass + " a";
			} else {
				linkSelector = blockClass;
			}
		} else {
			linkSelector = blockClass;
			var imgSelector = "img" + blockClass;
		}
		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}
		function handleLinkClickX(ev, src) {
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
				image[sudoScource] = sudoScourceArgs;
			});
			var imageX = Object.assign({}, image);
			setAttributes({ image: imageX });
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
			let obj = Object.assign({}, image);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ image: object });
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
		function onRemoveStyleImage(sudoScource, key) {
			let obj = { ...image };
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
			setAttributes({ image: objectX });
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
		function onAddStyleImage(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, image);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ image: object });
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
		function onBulkAddImage(sudoScource, cssObj) {
			let obj = Object.assign({}, image);
			obj[sudoScource] = cssObj;
			setAttributes({ image: obj });
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
		function onResetImage(sudoScources) {
			let obj = Object.assign({}, image);
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
			setAttributes({ image: obj });
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			linkAttrObj();
		}, [image]);
		var linkAttrObj = () => {
			var sdsd = {};
			image.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		var postUrl =
			image.options.linkTocustomUrl != undefined &&
				image.options.linkTocustomUrl.length > 0
				? image.options.linkTocustomUrl
				: currentPostUrl;
		const CustomTag = `${wrapper.options.tag}`;
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="px-3">
							<div className="flex items-center gap-2 justify-between my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										image.options.size == undefined
											? __("Choose", "combo-blocks")
											: imgSrcTypeArgs[image.options.imgSrcType] == undefined
												? __("Choose", "combo-blocks")
												: imgSrcTypeArgs[image.options.imgSrcType].label
									}
									options={[
										{ label: __("Media", "combo-blocks"), value: "media" },
										{
											label: __("Custom Field", "combo-blocks"),
											value: "customField",
										},
										{
											label: __("Image Source URL", "combo-blocks"),
											value: "customUrl",
										},
										// { label: 'Image ID', value: 'imgId' },
									]}
									onChange={(option, index) => {
										var options = {
											...image.options,
											imgSrcType: option.value,
										};
										setAttributes({ image: { ...image, options: options } });
									}}
									values=""></PGDropdown>

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
													promptsAgs={{
														action: "generateImage",
														aiModel: "dall-e-3",
														objective: "generateImage",
													}}
													formattedPrompt={formattedPrompt}
													autoUpdate={AIautoUpdate}
													onResponseLoaded={(value, autoUpdate) => {
														if (autoUpdate) {
															// var options = { ...text.options, content: value };
															// setAttributes({ text: { ...text, options: options } });
														}
													}}
													clickHandle={(value, action) => {
														if (action == "setAsUrl") {
															var options = {
																...image.options,
																srcUrl: value,
																imgSrcType: "customUrl",
															};
															setAttributes({
																image: { ...image, options: options },
															});
														}

														// var options = { ...text.options, content: value };
														// setAttributes({ text: { ...text, options: options } });
													}}
												/>
											</div>
										</Popover>
									)}
								</div>
							</div>
							{image.options.srcUrl.length > 0 && (
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											// media.id
											setCurrentPostImageId(media.id);
											var options = {
												...image.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
										onClose={() => { }}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={image.options.srcId}
										render={({ open }) => (
											<img
												src={image.options.srcUrl}
												alt=""
												className="cursor-pointer"
												onClick={open}
											/>
										)}
									/>
								</MediaUploadCheck>
							)}
							{image.options.srcUrl.length == 0 && (
								<MediaUploadCheck>
									<MediaUpload
										className="bg-gray-700 hover:bg-gray-600"
										onSelect={(media) => {
											// media.id
											setCurrentPostImageId(media.id);
											var options = {
												...image.options,
												srcUrl: media.url,
												srcId: media.id,
											};
											setAttributes({ image: { ...image, options: options } });
										}}
										onClose={() => { }}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={image.options.srcId}
										render={({ open }) => (
											<img
												src={MyImage}
												alt=""
												className="cursor-pointer"
												onClick={open}
											/>
										)}
									/>
								</MediaUploadCheck>
							)}
							{image.options.imgSrcType == "media" && (
								<>
									<div className="mt-5" for="">
										{__("Choose Image", "combo-blocks")}
									</div>
									<MediaUploadCheck>
										<MediaUpload
											className="bg-gray-700 hover:bg-gray-600"
											onSelect={(media) => {
												// media.id
												setCurrentPostImageId(media.id);
												var options = {
													...image.options,
													srcUrl: media.url,
													srcId: media.id,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
											onClose={() => { }}
											allowedTypes={ALLOWED_MEDIA_TYPES}
											value={image.options.srcId}
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
							{image.options.imgSrcType == "customField" && (
								<>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Field Key", "combo-blocks")}
										</label>
										<InputControl
											className="mr-2"
											value={image.options.imgSrcMetaKey}
											onChange={(newVal) => {
												var options = {
													...image.options,
													imgSrcMetaKey: newVal,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Metakey Type", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={image.options.imgSrcMetaKeyType}
											options={[
												{ label: "ID", value: "ID" },
												{ label: "URL", value: "URL" },
											]}
											onChange={(newVal) => {
												var options = {
													...image.options,
													imgSrcMetaKeyType: newVal,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
										/>
									</PanelRow>
								</>
							)}
							{image.options.imgSrcType == "customUrl" && (
								<>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Image URL", "combo-blocks")}
										</label>
										<div className="relative">
											<Button
												className={linkPickerSrcUrl ? "!bg-gray-400" : ""}
												icon={link}
												onClick={(ev) => {
													setlinkPickerSrcUrl((prev) => !prev);
												}}></Button>
											{image.options.srcUrl.length > 0 && (
												<Button
													className="!text-red-500 ml-2"
													icon={linkOff}
													onClick={(ev) => {
														var options = { ...image.options, srcUrl: "" };
														setAttributes({
															image: { ...image, options: options },
														});
														setlinkPickerSrcUrl(false);
													}}></Button>
											)}
											{linkPickerSrcUrl && (
												<Popover position="bottom right">
													<LinkControl
														settings={[]}
														value={image.options.srcUrl}
														onChange={(newVal) => {
															// var options = {
															// 	...image.options,
															// 	srcUrl: newVal.url,
															// };
															// setAttributes({
															// 	image: { ...image, options: options },
															// });
															setPostImage({
																...postImage,
																srcUrl: newVal.url,
																media_details: { sizes: {} },
																guid: { rendered: newVal.url },
															});
															getImageDimensions(newVal.url)
																.then((dimension) => {
																	console.log(dimension);

																	// Find indexes for width and height
																	const widthIndex =
																		image.options.linkAttr.findIndex(
																			(attr) => attr.id === "width"
																		);
																	const heightIndex =
																		image.options.linkAttr.findIndex(
																			(attr) => attr.id === "height"
																		);

																	// Create a copy of the linkAttr array
																	let updatedLinkAttr = [
																		...image.options.linkAttr,
																	];

																	// Update or add width
																	if (widthIndex !== -1) {
																		updatedLinkAttr[widthIndex] = {
																			...updatedLinkAttr[widthIndex],
																			val: dimension.width,
																		};
																	} else {
																		updatedLinkAttr.push({
																			id: "width",
																			val: dimension.width,
																		});
																	}

																	// Update or add height
																	if (heightIndex !== -1) {
																		updatedLinkAttr[heightIndex] = {
																			...updatedLinkAttr[heightIndex],
																			val: dimension.height,
																		};
																	} else {
																		updatedLinkAttr.push({
																			id: "height",
																			val: dimension.height,
																		});
																	}

																	// Update options
																	const options = {
																		...image.options,
																		srcUrl: newVal.url,
																		linkAttr: updatedLinkAttr,
																	};

																	// Update attributes
																	setAttributes({
																		image: { ...image, options: options },
																	});
																})
																.catch((err) =>
																	console.error("Error Loading Image: ", err)
																);
														}}
													/>
													<div className="p-2">
														<span className="font-bold">
															{__("Image Source URL:", "combo-blocks")}
														</span>{" "}
														{image.options.srcUrl.length != 0
															? image.options.srcUrl
															: __("No link", "combo-blocks")}{" "}
													</div>
												</Popover>
											)}
										</div>
									</PanelRow>
								</>
							)}
							{image.options.imgSrcType == "imgId" && (
								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Image ID", "combo-blocks")}
									</label>
									<InputControl
										className="mr-2"
										value={image.options.imgSrcImgId}
										onChange={(newVal) => {
											var options = { ...image.options, imgSrcImgId: newVal };
											setAttributes({ image: { ...image, options: options } });
										}}
									/>
								</PanelRow>
							)}
						</div>
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
							title={__("Image", "combo-blocks")}
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
									{(image.options.imgSrcType == "media" ||
										image.options.imgSrcType == "customField") && (
											<>
												<div className="mb-4">
													<label
														for=""
														className="font-medium text-slate-900 block pb-2 ">
														{__("Thumbnail Size", "combo-blocks")}
													</label>
													<PGDropdown
														position="bottom right"
														btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
														options={globalImageSizes}
														buttonTitle={
															image.options.size == undefined
																? __("Choose", "combo-blocks")
																: globalImageSizes[
																	image.options.size[breakPointX]
																] == undefined
																	? __("Choose", "combo-blocks")
																	: globalImageSizes[
																		image.options.size[breakPointX]
																	].label
														}
														onChange={setFeaturedImageSize}
														values={image.options.size[breakPointX]}></PGDropdown>
												</div>
											</>
										)}
									<PanelRow className="my-3">
										<label>{__("Link To", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												linkToArgs[image.options.linkTo] == undefined ||
													image.options.linkTo.length == 0
													? __("Choose", "combo-blocks")
													: linkToArgs[image.options.linkTo].label
											}
											options={linkToArgs}
											onChange={(option, index) => {
												var options = {
													...image.options,
													linkTo: option.value,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{image.options.linkTo == "customField" && (
										// || image.options.linkTo =="authorMeta"
										<PanelRow>
											{image.options.linkTo == "customField" && (
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Custom Field Key", "combo-blocks")}
												</label>
											)}
											<InputControl
												className="mr-2"
												value={image.options.linkToMetaKey}
												onChange={(newVal) => {
													var options = {
														...image.options,
														linkToMetaKey: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									{image.options.linkTo == "customUrl" && (
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
													{image.options.linkTocustomUrl.length > 0 && (
														<Button
															className="!text-red-500 ml-2"
															icon={linkOff}
															onClick={(ev) => {
																var options = {
																	...image.options,
																	linkTocustomUrl: "",
																};
																setAttributes({
																	image: { ...image, options: options },
																});
																setLinkPickerPosttitle(false);
															}}></Button>
													)}
													{linkPickerPosttitle && (
														<Popover position="bottom right">
															<LinkControl
																settings={[]}
																value={image.options.linkTocustomUrl}
																onChange={(newVal) => {
																	var options = {
																		...image.options,
																		linkTocustomUrl: newVal.url,
																	};
																	setAttributes({
																		image: { ...image, options: options },
																	});
																}}
															/>
															<div className="p-2">
																<span className="font-bold">Linked to:</span>{" "}
																{image.options.linkTocustomUrl.length != 0
																	? image.options.linkTocustomUrl
																	: __("No link", "combo-blocks")}{" "}
															</div>
														</Popover>
													)}
												</div>
											</PanelRow>
											{image.options.linkTocustomUrl.length > 0 && (
												<div className="p-2 pl-0 truncate ">
													<span className="font-bold">
														{__("Linked to:", "combo-blocks")}
													</span>{" "}
													{image.options.linkTocustomUrl}
												</div>
											)}
										</>
									)}
									{image.options.linkTo.length > 0 && (
										<div>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Link Target", "combo-blocks")}
												</label>
												<SelectControl
													label=""
													value={image.options.linkTarget}
													options={[
														{ label: __("Choose...", "combo-blocks"), value: "" },
														{ label: "_self", value: "_self" },
														{ label: "_blank", value: "_blank" },
														{ label: "_parent", value: "_parent" },
														{ label: "_top", value: "_top" },
													]}
													onChange={(newVal) => {
														var options = {
															...image.options,
															linkTarget: newVal,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									<PanelRow className="my-3">
										<label>{__("Alt Text Source", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												image.options.altTextSrc.length == 0
													? __("Choose", "combo-blocks")
													: altTextSrcArgs[image.options.altTextSrc].label
											}
											options={altTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...image.options,
													altTextSrc: option.value,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{image.options.altTextSrc == "customField" && (
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
															...image.options,
															altTextMetaKey: option.value,
														};
														setAttributes({
															image: { ...image, options: options },
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
													value={image.options.altTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...image.options,
															altTextMetaKey: newVal,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									{image.options.altTextSrc == "custom" && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Alt Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={image.options.altTextCustom}
												onChange={(newVal) => {
													var options = {
														...image.options,
														altTextCustom: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
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
												image.options.titleTextSrc == undefined ||
													image.options.titleTextSrc.length == 0
													? __("Choose", "combo-blocks")
													: titleTextSrcArgs[image.options.titleTextSrc].label
											}
											options={titleTextSrcArgs}
											onChange={(option, index) => {
												var options = {
													...image.options,
													titleTextSrc: option.value,
												};
												setAttributes({
													image: { ...image, options: options },
												});
											}}
											values=""></PGDropdown>
									</PanelRow>
									{image.options.titleTextSrc == "customField" && (
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
															...image.options,
															titleTextMetaKey: option.value,
														};
														setAttributes({
															image: { ...image, options: options },
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
													value={image.options.titleTextMetaKey}
													onChange={(newVal) => {
														var options = {
															...image.options,
															titleTextMetaKey: newVal,
														};
														setAttributes({
															image: { ...image, options: options },
														});
													}}
												/>
											</PanelRow>
										</div>
									)}
									{image.options.titleTextSrc == "custom" && (
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Title Text", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={image.options.titleTextCustom}
												onChange={(newVal) => {
													var options = {
														...image.options,
														titleTextCustom: newVal,
													};
													setAttributes({
														image: { ...image, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Attributes", "combo-blocks")}
										</label>
										<div
											className="flex gap-2 justify-center my-2 cursor-pointer p-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												navigator.clipboard.writeText(
													JSON.stringify(image.options.linkAttr)
												);
											}}>
											<Icon icon={copy} className="fill-white" />
										</div>
										<div
											className="flex gap-2 justify-center my-2 cursor-pointer p-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={async (ev) => {
												var text = await navigator.clipboard.readText();
												var sdsd = JSON.parse(text);
												var options = { ...image.options, linkAttr: sdsd };
												setAttributes({
													image: { ...image, options: options },
												});
											}}>
											<Icon icon={page} className="fill-white" />
										</div>
										<div
											// className=" cursor-pointer px-3 text-white py-1 bg-gray-700 hover:bg-gray-600"
											className="flex gap-2 justify-center my-2 cursor-pointer p-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												var sdsd = image.options.linkAttr.concat({
													id: "",
													val: "",
												});
												var options = { ...image.options, linkAttr: sdsd };
												setAttributes({
													image: { ...image, options: options },
												});
												linkAttrObj();
											}}>
											<Icon icon={addCard} className="fill-white" />
										</div>
									</PanelRow>
									{image.options.linkAttr.map((x, i) => {
										return (
											<div className="my-2" key={i}>
												<PanelRow>
													<InputControl
														placeholder="Name"
														className="mr-2"
														value={image.options.linkAttr[i].id}
														onChange={(newVal) => {
															image.options.linkAttr[i].id = newVal;
															var ssdsd = image.options.linkAttr.concat([]);
															var options = {
																...image.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																image: { ...image, options: options },
															});
														}}
													/>
													<InputControl
														className="mr-2"
														placeholder="Value"
														value={x.val}
														onChange={(newVal) => {
															image.options.linkAttr[i].val = newVal;
															var ssdsd = image.options.linkAttr.concat([]);
															var options = {
																...image.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																image: { ...image, options: options },
															});
														}}
													/>
													<span
														// className="text-lg cursor-pointer px-3 text-white py-1 bg-red-400 icon-close"
														className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
														onClick={(ev) => {
															image.options.linkAttr.splice(i, 1);
															var ssdsd = image.options.linkAttr.concat([]);
															var options = {
																...image.options,
																linkAttr: ssdsd,
															};
															setAttributes({
																image: { ...image, options: options },
															});
														}}>
														<Icon icon={close} />
													</span>
												</PanelRow>
											</div>
										);
									})}
									<ToggleControl
										label="Srcset Enable?"
										help={
											image.options.srcsetEnable
												? "Srcset Enabled"
												: "Srcset Disabled."
										}
										checked={image.options.srcsetEnable ? true : false}
										onChange={(e) => {
											var options = {
												...image.options,
												srcsetEnable: image.options.srcsetEnable ? false : true,
											};
											setAttributes({
												image: { ...image, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={image}
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
										obj={image}
										onChange={onPickCssLibraryImage}
									/>
								</PGtab>
							</PGtabs>
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
						{/* UTM  */}

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
					{loading && (
						<div {...blockProps}>
							<Spinner />
						</div>
					)}

					{!loading && (
						<>
							{(image.options.imgSrcType == "media" ||
								image.options.imgSrcType == "customField") && (
									<>
										{postImage == null && (
											<div {...blockProps}>
												<img src={MyImage} alt="" />
											</div>
										)}
									</>
								)}
							{postImage != null && (
								<>
									{(image.options.imgSrcType == "media" ||
										image.options.imgSrcType == "customField") && (
											<>
												{wrapper.options.tag.length == 0 && (
													<>
														{image.options.linkTo.length > 0 && (
															<a
																onClick={handleLinkClick}
																{...blockProps}
																href={postUrl}
																target={image.options.linkTarget}>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																		<img
																			{...linkAttrItems}
																			src={
																				postImage.guid.rendered != undefined
																					? postImage.guid.rendered
																					: ""
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																		<img
																			{...linkAttrItems}
																			src={
																				postImage.media_details.sizes[
																					image.options.size[breakPointX]
																				].source_url
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
															</a>
														)}
														{image.options.linkTo.length == 0 && (
															<>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																		<img
																			{...blockProps}
																			{...linkAttrItems}
																			src={
																				postImage.guid.rendered != undefined
																					? postImage.guid.rendered
																					: ""
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																		<img
																			{...blockProps}
																			{...linkAttrItems}
																			src={
																				postImage.media_details.sizes[
																					image.options.size[breakPointX]
																				].source_url
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
															</>
														)}
													</>
												)}
												{wrapper.options.tag && (
													<CustomTag {...blockProps}>
														{image.options.linkTo.length > 0 && (
															<a
																onClick={(e) => {
																	handleLinkClickX(
																		e,
																		postImage.media_details.sizes[
																			image.options.size[breakPointX]
																		].source_url
																	);
																}}
																href={postUrl}
																target={image.options.linkTarget}>
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] != undefined && (
																		<img
																			{...linkAttrItems}
																			src={
																				postImage.media_details.sizes[
																					image.options.size[breakPointX]
																				].source_url
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
																{postImage.media_details.sizes[
																	image.options.size[breakPointX]
																] == undefined && (
																		<img
																			{...linkAttrItems}
																			src={
																				postImage.guid.rendered != undefined
																					? postImage.guid.rendered
																					: ""
																			}
																			alt={postImage.alt_text}
																		/>
																	)}
															</a>
														)}
														{image.options.linkTo.length == 0 && (
															<>
																{(image.options.imgSrcType == "media" ||
																	image.options.imgSrcType == "customField") && (
																		<>
																			{postImage.media_details.sizes[
																				image.options.size[breakPointX]
																			] != undefined && (
																					<img
																						{...linkAttrItems}
																						onClick={(e) => {
																							handleLinkClickX(
																								e,
																								postImage.media_details.sizes[
																									image.options.size[breakPointX]
																								].source_url
																							);
																						}}
																						src={
																							postImage.media_details.sizes[
																								image.options.size[breakPointX]
																							] != undefined
																								? postImage.media_details.sizes[
																									image.options.size[breakPointX]
																								].source_url
																								: ""
																						}
																						alt={postImage.alt_text}
																					/>
																				)}
																			{postImage.media_details.sizes[
																				image.options.size[breakPointX]
																			] == undefined && (
																					<img
																						{...linkAttrItems}
																						onClick={(e) => {
																							handleLinkClickX(
																								e,
																								postImage.media_details.sizes[
																									image.options.size[breakPointX]
																								].source_url
																							);
																						}}
																						src={
																							postImage.guid.rendered != undefined
																								? postImage.guid.rendered
																								: ""
																						}
																						alt={postImage.alt_text}
																					/>
																				)}
																		</>
																	)}
																{/* {image.options.imgSrcType == 'customUrl' && (
                                <img {...linkAttrItems} src={image.options.srcUrl} alt={image.options.altTextCustom} />
                              )} */}
															</>
														)}
													</CustomTag>
												)}
											</>
										)}
								</>
							)}
							{image.options.imgSrcType == "customUrl" &&
								image.options.srcUrl.length == 0 && (
									<div {...blockProps}>
										<img src={MyImage} alt="" />
									</div>
								)}
							{image.options.imgSrcType == "customUrl" &&
								image.options.srcUrl.length != 0 && (
									<>
										{wrapper.options.tag.length == 0 && (
											<>
												{image.options.linkTo.length > 0 && (
													<a
														onClick={handleLinkClick}
														{...blockProps}
														href={postUrl}
														target={image.options.linkTarget}>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</a>
												)}
												{image.options.linkTo.length == 0 && (
													<>
														<img
															{...blockProps}
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</>
												)}
											</>
										)}
										{wrapper.options.tag && (
											<CustomTag {...blockProps}>
												{image.options.linkTo.length > 0 && (
													<a
														onClick={(e) => {
															handleLinkClickX(e, image.options.srcUrl);
														}}
														href={postUrl}
														target={image.options.linkTarget}>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</a>
												)}
												{image.options.linkTo.length == 0 && (
													<>
														<img
															{...linkAttrItems}
															src={image.options.srcUrl}
															alt={image.options.altTextCustom}
														/>
													</>
												)}
											</CustomTag>
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
