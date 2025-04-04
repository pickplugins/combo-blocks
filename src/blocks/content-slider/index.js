import { Splide, SplideTrack } from "@splidejs/react-splide";
import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { dispatch, select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	copy,
	Icon,
	pages,
	settings,
	styles,
} from "@wordpress/icons";
import breakPoints from "../../breakpoints";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import IconToggle from "../../components/icon-toggle";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";

//import Splide from '@splidejs/splide';
import "@splidejs/splide/dist/css/splide-core.min.css";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import customTags from "../../custom-tags";
import metadata from "./block.json";
//import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
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
					d="M59.1729 13H8.08542C6.95631 13 5.87346 13.4485 5.07506 14.2469C4.27666 15.0453 3.82812 16.1282 3.82812 17.2573V59.8302C3.82812 60.9593 4.27666 62.0422 5.07506 62.8406C5.87346 63.639 6.95631 64.0875 8.08542 64.0875H59.1729C60.302 64.0875 61.3849 63.639 62.1833 62.8406C62.9817 62.0422 63.4302 60.9593 63.4302 59.8302V17.2573C63.4302 16.1282 62.9817 15.0453 62.1833 14.2469C61.3849 13.4485 60.302 13 59.1729 13ZM54.9156 55.5729H12.3427V21.5146H54.9156V55.5729Z"
					fill="url(#paint0_linear_165_89)"
				/>
				<path
					d="M68.1167 73.6274H0V82.142H68.1167V73.6274Z"
					fill="url(#paint1_linear_165_89)"
				/>
				<path
					d="M58.7438 90.6565H7.65625V99.1711H58.7438V90.6565Z"
					fill="url(#paint2_linear_165_89)"
				/>
				<path
					d="M151.057 12.9998H99.9692C98.8401 12.9998 97.7572 13.4483 96.9588 14.2467C96.1604 15.0451 95.7119 16.1279 95.7119 17.257V59.83C95.7119 60.9591 96.1604 62.0419 96.9588 62.8403C97.7572 63.6387 98.8401 64.0873 99.9692 64.0873H151.057C152.186 64.0873 153.269 63.6387 154.067 62.8403C154.865 62.0419 155.314 60.9591 155.314 59.83V17.257C155.314 16.1279 154.865 15.0451 154.067 14.2467C153.269 13.4483 152.186 12.9998 151.057 12.9998ZM146.799 55.5727H104.226V21.5143H146.799V55.5727Z"
					fill="url(#paint3_linear_165_89)"
				/>
				<path
					d="M160 73.6274H91.8838V82.142H160V73.6274Z"
					fill="url(#paint4_linear_165_89)"
				/>
				<path
					d="M150.628 90.6565H99.54V99.1711H150.628V90.6565Z"
					fill="url(#paint5_linear_165_89)"
				/>
				<circle cx="80.3982" cy="138.743" r="7.65694" fill="#C15940" />
				<circle
					cx="114.853"
					cy="138.743"
					r="7.65694"
					fill="url(#paint6_linear_165_89)"
				/>
				<circle
					cx="45.9421"
					cy="138.743"
					r="7.65694"
					fill="url(#paint7_linear_165_89)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_165_89"
						x1="3.82812"
						y1="38.5437"
						x2="63.4302"
						y2="38.5437"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_165_89"
						x1="0"
						y1="77.8847"
						x2="68.1167"
						y2="77.8847"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_165_89"
						x1="7.65625"
						y1="94.9138"
						x2="58.7438"
						y2="94.9138"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_165_89"
						x1="95.7119"
						y1="38.5435"
						x2="155.314"
						y2="38.5435"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_165_89"
						x1="91.8838"
						y1="77.8847"
						x2="160"
						y2="77.8847"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_165_89"
						x1="99.54"
						y1="94.9138"
						x2="150.628"
						y2="94.9138"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_165_89"
						x1="107.196"
						y1="138.743"
						x2="122.51"
						y2="138.743"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_165_89"
						x1="38.2852"
						y1="138.743"
						x2="53.599"
						y2="138.743"
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
		var itemsWrap = attributes.itemsWrap;
		var item = attributes.item;
		var prev = attributes.prev;
		var next = attributes.next;
		var pagination = attributes.pagination;
		var paginationActive = attributes.paginationActive;
		var prevIcon = attributes.prevIcon;
		var nextIcon = attributes.nextIcon;
		var navsWrap = attributes.navsWrap;
		var paginationWrap = attributes.paginationWrap;
		var sliderOptions = attributes.sliderOptions;
		var sliderOptionsRes = attributes.sliderOptionsRes;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		// var breakPointX = myStore.getBreakPoint();
		const [breakPointX, setBreakPointX] = useState(
			myStore != null ? myStore.getBreakPoint() : "Desktop"
		);
		// Wrapper CSS Class Selectors
		//var wrapperSelector = blockClass;
		var wrapperSelector = blockClass + " .splide";
		var itemsWrapSelector = blockClass + " .splide__track";
		var itemSelector = blockClass + " .pg-content-slider-item";
		var nextSelector = blockClass + " .splide__arrow--next";
		var prevSelector = blockClass + " .splide__arrow--prev";
		var nextIconSelector = blockClass + " .splide__arrow--next .icon";
		var prevIconSelector = blockClass + " .splide__arrow--prev .icon";
		var navsWrapSelector = blockClass + " .splide__arrows";
		var paginationWrapSelector = blockClass + " .splide__pagination";
		var paginationSelector = blockClass + " .splide__pagination__page";
		var paginationActiveSelector =
			blockClass + " .splide__pagination__page.is-active";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemSelector] = item;
			blockCssObj[nextSelector] = next;
			blockCssObj[prevSelector] = prev;
			blockCssObj[nextIconSelector] = nextIcon;
			blockCssObj[prevIconSelector] = prevIcon;
			blockCssObj[navsWrapSelector] = navsWrap;
			blockCssObj[paginationWrapSelector] = paginationWrap;
			blockCssObj[paginationSelector] = pagination;
			blockCssObj[paginationActiveSelector] = paginationActive;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		var sliderOptionsArgs = {
			autoplay: { label: "Auto play", value: 1 },
			interval: { label: "Interval", value: "500" },
			pauseOnHover: { label: "Pause On Hover", value: 1 },
			pauseOnFocus: { label: "Pause On Focus", value: 1 },
			lazyLoad: { label: "Lazy Load", value: 1 },
			preloadPages: { label: "Preload Pages", value: 1 },
			keyboard: { label: "Keyboard", value: 1 },
			wheel: { label: "Wheel", value: 1 },
			releaseWheel: { label: "Release Wheel", value: 1 },
			direction: { label: "Direction", value: "ltr" },
			cover: { label: "Cover", value: 0 },
			rewind: { label: "Rewind", value: 0 },
			speed: { label: "Speed", value: 400 },
			rewindSpeed: { label: "Rewind Speed", value: 400 },
			rewindByDrag: { label: "Rewind By Drag", value: 0 },
			type: { label: "Slider Type", value: "slide" },
			width: { label: "Width", value: "" },
			height: { label: "Height", value: "" },
			fixedWidth: { label: "Fixed Width", value: "" },
			fixedHeight: { label: "Fixed Height", value: "" },
			heightRatio: { label: "Height Ratio", value: "" },
			autoWidth: { label: "Auto Width", value: 0 },
			autoHeight: { label: "Auto Height", value: 0 },
			start: { label: "Start", value: 0 },
			perPage: { label: "Per Page", value: 3 },
			perMove: { label: "Per Move", value: 3 },
			focus: { label: "Focus", value: "center" },
			gap: { label: "Gap", value: "1em", unit: "em", number: "1" },
			padding: { label: "Padding", value: "" },
			arrows: { label: "Arrows", value: 1 },
			pagination: { label: "Pagination", value: 1 },
			//easing: { label: 'Easing', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },
			paginationKeyboard: { label: "Pagination Keyboard", value: 1 },
			paginationDirection: {
				label: "Pagination Direction",
				value: "paginationDirectltrion",
			},
			drag: { label: "Drag", value: 1 },
			noDrag: { label: "No Drag", value: "input, textarea, .rich-text" },
			snap: { label: "Snap", value: 1 },
			mediaQuery: { label: "Media Query", value: "max" },
		};
		var sliderOptionsArgsRes = {
			rewind: { label: "Rewind", value: 0 },
			speed: { label: "Speed", value: 400 },
			rewindSpeed: { label: "Rewind Speed", value: 400 },
			rewindByDrag: { label: "Rewind By Drag", value: 0 },
			width: { label: "Width", value: "" },
			height: { label: "Height", value: "" },
			fixedWidth: { label: "Fixed Width", value: "" },
			fixedHeight: { label: "Fixed Height", value: "" },
			heightRatio: { label: "Height Ratio", value: "" },
			perPage: { label: "Per Page", value: 3 },
			perMove: { label: "Per Move", value: 3 },
			focus: { label: "Focus", value: "center" },
			gap: { label: "Gap", value: "1em", unit: "em", number: "1" },
			padding: { label: "Padding", value: "" },
			arrows: { label: "Arrows", value: 1 },
			pagination: { label: "Pagination", value: 1 },
			paginationKeyboard: { label: "Pagination Keyboard", value: 1 },
			paginationDirection: {
				label: "Pagination Direction",
				value: "paginationDirectltrion",
			},
			drag: { label: "Drag", value: 1 },
			snap: { label: "Snap", value: 1 },
			keyboard: { label: "Keyboard", value: 1 },
			direction: { label: "Direction", value: "ltr" },
			easing: { label: "Easing", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
		};
		var navsLibrary = [
			{
				title: "Title 1",
				preview: "https://i.ibb.co.com/2Sg2h05/image.png",
				content: {
					navsWrap: {
						options: {
							class: "nav-wrap",
						},
						styles: {
							display: {
								Desktop: "flex",
							},
							width: {
								Desktop: "100%",
							},
							alignItems: {
								Desktop: "center",
							},
							position: {
								Desktop: "absolute !important",
							},
							top: {
								Desktop: "10px",
							},
							left: {
								Desktop: "20px",
							},
							gap: {
								Desktop: "20px",
							},
						},
					},
					prev: {
						options: {
							text: "Prev",
							class: "",
						},
						styles: {
							fontSize: {
								Desktop: "18px",
							},

							fontStyle: {
								Desktop: "normal",
							},
							fontWeight: {
								Desktop: "400",
							},
							textAlign: {
								Desktop: "left",
							},
							color: {
								Desktop: "#ffffff",
							},
							backgroundColor: {
								Desktop: "#1F2E45",
							},
							borderRadius: {
								Desktop: "50px",
							},
							padding: {
								Desktop: "5px 20px 5px 20px",
							},
						},
					},
					prevIcon: {
						options: {
							position: "before",
							class: "",
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-chevron-left",
						},
						styles: {
							padding: {
								Desktop: "0px 10px 0px 0px",
							},
							fontSize: {
								Desktop: "16px",
							},
						},
					},
					next: {
						options: {
							text: "Next",
							class: "",
						},
						styles: {
							fontSize: {
								Desktop: "18px",
							},

							fontStyle: {
								Desktop: "normal",
							},
							fontWeight: {
								Desktop: "400",
							},
							textAlign: {
								Desktop: "right",
							},
							color: {
								Desktop: "#ffffff",
							},
							backgroundColor: {
								Desktop: "#1F2E45",
							},
							borderRadius: {
								Desktop: "50px",
							},
							padding: {
								Desktop: "5px 20px 5px 20px",
							},
						},
					},
					nextIcon: {
						options: {
							position: "after",
							class: "",
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-chevron-right",
						},
						styles: {
							padding: {
								Desktop: "0px 0px 0px 10px",
							},
							fontSize: {
								Desktop: "16px",
							},
						},
					},
				},
			},
			{
				title: "Title 2",
				preview: "https://i.ibb.co.com/7WmZkcT/image.png",
				content: {
					navsWrap: {
						options: {
							class: "nav-wrap",
						},
						styles: {
							display: {
								Desktop: "flex",
							},
							width: {
								Desktop: "100%",
							},
							alignItems: {
								Desktop: "center",
							},
							position: {
								Desktop: "absolute !important",
							},
							top: {
								Desktop: "10px",
							},
							left: {
								Desktop: "20px",
							},
							gap: {
								Desktop: "20px",
							},
						},
					},
					prev: {
						options: {
							text: "Prev",
							class: "",
						},
						styles: {
							fontSize: {
								Desktop: "18px",
							},

							fontStyle: {
								Desktop: "normal",
							},
							fontWeight: {
								Desktop: "400",
							},
							textAlign: {
								Desktop: "left",
							},
							color: {
								Desktop: "#ffffff",
							},
							backgroundColor: {
								Desktop: "#1F2E45",
							},
							borderRadius: {
								Desktop: "50px",
							},
							padding: {
								Desktop: "5px 20px 5px 20px",
							},
						},
					},
					prevIcon: {
						options: {
							position: "before",
							class: "",
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-chevron-left",
						},
						styles: {
							padding: {
								Desktop: "0px 10px 0px 0px",
							},
							fontSize: {
								Desktop: "16px",
							},
						},
					},
					next: {
						options: {
							text: "Next",
							class: "",
						},
						styles: {
							fontSize: {
								Desktop: "18px",
							},

							fontStyle: {
								Desktop: "normal",
							},
							fontWeight: {
								Desktop: "400",
							},
							textAlign: {
								Desktop: "right",
							},
							color: {
								Desktop: "#ffffff",
							},
							backgroundColor: {
								Desktop: "#1F2E45",
							},
							borderRadius: {
								Desktop: "50px",
							},
							padding: {
								Desktop: "5px 20px 5px 20px",
							},
						},
					},
					nextIcon: {
						options: {
							position: "after",
							class: "",
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-chevron-right",
						},
						styles: {
							padding: {
								Desktop: "0px 0px 0px 10px",
							},
							fontSize: {
								Desktop: "16px",
							},
						},
					},
				},
			},
		];

		var paginationLibrary = [
			{
				title: "title-1",
				preview: "https://i.ibb.co.com/vXgtsw6/image.png",
				content: {
					paginationWrap: {
						options: {
							tag: "ul",
							class: "",
						},
						styles: {},
					},
					pagination: {
						options: {
							tag: "span",
							class: "",
						},
						styles: {
							border: {
								Desktop: "1px solid #1f2e45",
							},
							backgroundColor: {
								Desktop: "#f1f7f9",
							},
							height: {
								Desktop: "15px",
							},
							width: {
								Desktop: "15px",
							},
							borderRadius: {
								Desktop: "50%",
							},
						},
					},
					paginationActive: {
						options: {
							class: "",
						},
						styles: {
							backgroundColor: {
								Desktop: "#1f2e45",
							},
						},
					},
				},
			},
			{
				title: "title-2",
				preview: "https://i.ibb.co.com/4dhzLFr/image.png",
				content: {
					paginationWrap: {
						options: {
							tag: "ul",
							class: "",
						},
						styles: {},
					},
					pagination: {
						options: {
							tag: "span",
							class: "",
						},
						styles: {
							border: {
								Desktop: "1px solid #1f2e45",
							},
							backgroundColor: {
								Desktop: "#f1f7f9",
							},
							height: {
								Desktop: "15px",
							},
							width: {
								Desktop: "15px",
							},
							borderRadius: {
								Desktop: "50%",
							},
						},
					},
					paginationActive: {
						options: {
							class: "",
						},
						styles: {
							backgroundColor: {
								Desktop: "#1f2e45",
							},
						},
					},
				},
			},
		];
		var breakPointList = [{ label: "Select..", icon: "", value: "" }];
		for (var x in breakPoints) {
			var breakPointItem = breakPoints[x];
			breakPointList.push({
				label: breakPointItem.name,
				icon: breakPointItem.icon,
				value: breakPointItem.id,
			});
		}
		function onChangeBreakPoint(x, _index) {
			var asdsdsd = wp.data.dispatch("ComboBlocksStore").setBreakPoint(x.value);
			asdsdsd.then((res) => {
				setBreakPointX(res.breakpoint);
				myStore.generateBlockCss(blockCssY.items, blockId);
			});
			const { getPreviewDeviceType } = select("core/editor");
			const gutenbergDeviceType = getPreviewDeviceType;
		}
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		useEffect(() => {
			var args = {};
			Object.entries(sliderOptionsRes).map((item) => {
				var id = item[0];
				var vals = item[1];
				Object.entries(vals).map((arg) => {
					var view = arg[0];
					var viewVal = arg[1];
					var viewPoint = "";
					if (view == "Mobile") {
						viewPoint = "360";
					} else if (view == "Tablet") {
						viewPoint = "780";
					} else if (view == "Desktop") {
						viewPoint = "1024";
					}
					if (args[viewPoint] == undefined) {
						args[viewPoint] = {};
					}
					if (args[viewPoint][id] == undefined) {
						args[viewPoint][id] = "";
					}
					args[viewPoint][id] = viewVal;
				});
			});
			if (Object.entries(args).length > 0) {
				var sliderOptionsX = { ...sliderOptions };
				sliderOptionsX["breakpoints"] = args;
				setAttributes({ sliderOptions: sliderOptionsX });
			}
		}, [sliderOptionsRes]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const addSlide = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
			const slide = createBlock("combo-blocks/content-slider-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);
			//setActiveTab(slide.clientId);
		};
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
				var navsWrapX = attributes.navsWrap;
				var prevX = attributes.prev;
				var prevIconX = attributes.prevIcon;
				var nextX = attributes.next;
				var nextIconX = attributes.nextIcon;
				var paginationWrapX = attributes.paginationWrap;
				var paginationX = attributes.pagination;
				var paginationActiveX = attributes.paginationActive;
				var sliderOptionsX = attributes.sliderOptions;
				var sliderOptionsResX = attributes.sliderOptionsRes;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				// if (sliderOptionsResX != undefined) {
				// 	var sliderOptionsResY = {
				// 		...sliderOptionsResX,
				// 		options: sliderOptionsRes.options,
				// 	};
				// 	setAttributes({ sliderOptionsRes: sliderOptionsResY });
				// 	blockCssObj[sliderOptionsResSelector] = sliderOptionsResY;
				// }
				// if (sliderOptionsX != undefined) {
				// 	var sliderOptionsY = {
				// 		...sliderOptionsX,
				// 		options: sliderOptions.options,
				// 	};
				// 	setAttributes({ sliderOptions: sliderOptionsY });
				// 	blockCssObj[sliderOptionsSelector] = sliderOptionsY;
				// }
				if (paginationActiveX != undefined) {
					var paginationActiveY = {
						...paginationActiveX,
						options: paginationActive.options,
					};
					setAttributes({ paginationActive: paginationActiveY });
					blockCssObj[paginationActiveSelector] = paginationActiveY;
				}
				if (paginationX != undefined) {
					var paginationY = { ...paginationX, options: pagination.options };
					setAttributes({ pagination: paginationY });
					blockCssObj[paginationSelector] = paginationY;
				}
				if (paginationWrapX != undefined) {
					var paginationWrapY = {
						...paginationWrapX,
						options: paginationWrap.options,
					};
					setAttributes({ paginationWrap: paginationWrapY });
					blockCssObj[paginationWrapSelector] = paginationWrapY;
				}
				if (nextIconX != undefined) {
					var nextIconY = { ...nextIconX, options: nextIcon.options };
					setAttributes({ nextIcon: nextIconY });
					blockCssObj[nextIconSelector] = nextIconY;
				}
				if (nextX != undefined) {
					var nextY = { ...nextX, options: next.options };
					setAttributes({ next: nextY });
					blockCssObj[nextSelector] = nextY;
				}
				if (prevIconX != undefined) {
					var prevIconY = { ...prevIconX, options: prevIcon.options };
					setAttributes({ prevIcon: prevIconY });
					blockCssObj[prevIconSelector] = prevIconY;
				}
				if (prevX != undefined) {
					var prevY = { ...prevX, options: prev.options };
					setAttributes({ prev: prevY });
					blockCssObj[prevSelector] = prevY;
				}
				if (navsWrapX != undefined) {
					var navsWrapY = { ...navsWrapX, options: navsWrap.options };
					setAttributes({ navsWrap: navsWrapY });
					blockCssObj[navsWrapSelector] = navsWrapY;
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
		function onRemoveStyleItem(sudoScource, key) {
			let obj = { ...item };
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
			setAttributes({ item: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
		function onRemoveStyleNext(sudoScource, key) {
			let obj = { ...next };
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
			setAttributes({ next: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nextSelector
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
		function onRemoveStylePrev(sudoScource, key) {
			let obj = { ...prev };
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
			setAttributes({ prev: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prevSelector
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
		function onRemoveStylePagination(sudoScource, key) {
			let obj = { ...pagination };
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
			setAttributes({ pagination: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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
		function onRemoveStylePaginationActive(sudoScource, key) {
			let obj = { ...paginationActive };
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
			setAttributes({ paginationActive: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationActiveSelector
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
		function onRemoveStylePaginationWrap(sudoScource, key) {
			let obj = { ...paginationWrap };
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
			setAttributes({ paginationWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationWrapSelector
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
		function onRemoveStyleNextIcon(sudoScource, key) {
			let obj = { ...nextIcon };
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
			setAttributes({ nextIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nextIconSelector
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
		function onRemoveStylePrevIcon(sudoScource, key) {
			let obj = { ...prevIcon };
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
			setAttributes({ prevIcon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prevIconSelector
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
		function onRemoveStyleNavsWrap(sudoScource, key) {
			let obj = { ...navsWrap };
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
			setAttributes({ navsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
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
		function onResetItem(sudoSources) {
			let obj = Object.assign({}, item);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ item: obj });
		}
		function onResetNext(sudoSources) {
			let obj = Object.assign({}, next);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						nextSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ next: obj });
		}
		function onResetPrev(sudoSources) {
			let obj = Object.assign({}, prev);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prevSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ prev: obj });
		}
		function onResetPagination(sudoSources) {
			let obj = Object.assign({}, pagination);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ pagination: obj });
		}
		function onResetPaginationActive(sudoSources) {
			let obj = Object.assign({}, paginationActive);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationActiveSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ paginationActive: obj });
		}
		function onResetPaginationWrap(sudoSources) {
			let obj = Object.assign({}, paginationWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						paginationWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ paginationWrap: obj });
		}
		function onResetNextIcon(sudoSources) {
			let obj = Object.assign({}, nextIcon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						nextIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ nextIcon: obj });
		}
		function onResetPrevIcon(sudoSources) {
			let obj = Object.assign({}, prevIcon);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prevIconSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ prevIcon: obj });
		}
		function onResetNavsWrap(sudoSources) {
			let obj = Object.assign({}, navsWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						navsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ navsWrap: obj });
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
		function onChangeStyleItem(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ item: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemSelector
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
		function onAddStyleItem(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, item);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}
		function onBulkAddItem(sudoScource, cssObj) {
			let obj = Object.assign({}, item);
			obj[sudoScource] = cssObj;
			setAttributes({ item: obj });
			var selector = myStore.getElementSelector(sudoScource, itemSelector);
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
		function onChangeStyleNext(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, next);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ next: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nextSelector
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
		function onAddStyleNext(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, next);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ next: object });
		}
		function onBulkAddNext(sudoScource, cssObj) {
			let obj = Object.assign({}, next);
			obj[sudoScource] = cssObj;
			setAttributes({ next: obj });
			var selector = myStore.getElementSelector(sudoScource, nextSelector);
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
		function onChangeStylePrev(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prev);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ prev: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prevSelector
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
		function onAddStylePrev(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prev);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prev: object });
		}
		function onBulkAddPrev(sudoScource, cssObj) {
			let obj = Object.assign({}, prev);
			obj[sudoScource] = cssObj;
			setAttributes({ prev: obj });
			var selector = myStore.getElementSelector(sudoScource, prevSelector);
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
		function onChangeStylePagination(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ pagination: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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
		function onAddStylePagination(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, pagination);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ pagination: object });
		}
		function onBulkAddPagination(sudoScource, cssObj) {
			let obj = Object.assign({}, pagination);
			obj[sudoScource] = cssObj;
			setAttributes({ pagination: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationSelector
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
		function onChangeStylePaginationActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ paginationActive: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationActiveSelector
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
		function onAddStylePaginationActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationActive: object });
		}
		function onBulkAddPaginationActive(sudoScource, cssObj) {
			let obj = Object.assign({}, paginationActive);
			obj[sudoScource] = cssObj;
			setAttributes({ paginationActive: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationActiveSelector
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
		function onChangeStylePaginationWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, paginationWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ paginationWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				paginationWrapSelector
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
		function onAddStylePaginationWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, paginationWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ paginationWrap: object });
		}
		function onBulkAddPaginationWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, paginationWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ paginationWrap: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				paginationWrapSelector
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
		function onChangeStyleNextIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, nextIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ nextIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				nextIconSelector
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
		function onAddStyleNextIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, nextIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ nextIcon: object });
		}
		function onBulkAddNextIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, nextIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ nextIcon: obj });
			var selector = myStore.getElementSelector(sudoScource, nextIconSelector);
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
		function onChangeStylePrevIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prevIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ prevIcon: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prevIconSelector
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
		function onAddStylePrevIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prevIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prevIcon: object });
		}
		function onBulkAddPrevIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, prevIcon);
			obj[sudoScource] = cssObj;
			setAttributes({ prevIcon: obj });
			var selector = myStore.getElementSelector(sudoScource, prevIconSelector);
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
		function onChangeStyleNavsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ navsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				navsWrapSelector
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
		function onAddStyleNavsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, navsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ navsWrap: object });
		}
		function onBulkAddNavsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, navsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ navsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, navsWrapSelector);
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

		function onChangeStyleitemsWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemsWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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
		function onRemoveStyleitemsWrap(sudoScource, key) {
			let obj = { ...itemsWrap };
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
			setAttributes({ itemsWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsWrapSelector
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
		function onResetitemsWrap(sudoSources) {
			let obj = Object.assign({}, itemsWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemsWrap: obj });
		}
		function onAddStyleitemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
		}
		function onBulkAdditemsWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, itemsWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ itemsWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, itemsWrapSelector);
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

		const [nextIconHtml, setNextIconHtml] = useState("");
		const [prevIconHtml, setPrevIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = nextIcon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setNextIconHtml(iconHtml);
		}, [nextIcon.options]);
		useEffect(() => {
			var iconSrc = prevIcon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setPrevIconHtml(iconHtml);
		}, [prevIcon.options]);
		const ALLOWED_BLOCKS = [
			"combo-blocks/content-slider-item",
			"combo-blocks/post-query",
			"combo-blocks/terms-query",
			"combo-blocks/user-query",
			"combo-blocks/images",
			"combo-blocks/testimonials",
			"combo-blocks/info-box",
			"combo-blocks/team-members",
		];
		const MY_TEMPLATE = [["combo-blocks/content-slider-item", {}]];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}  `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			//templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		var RemoveSliderArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var sliderOptionsX = { ...sliderOptions };
						delete sliderOptionsX[index];
						setAttributes({ sliderOptions: sliderOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};
		var RemoveSliderArgRes = function ({ index }) {
			return (
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var sliderOptionsResX = { ...sliderOptionsRes };
						delete sliderOptionsResX[index];
						setAttributes({ sliderOptionsRes: sliderOptionsResX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};
		const gapValue = sliderOptions?.gap || "0px"; // default value if gap is not set
		const [number, setNumber] = useState(parseInt(gapValue));
		const [unit, setUnit] = useState(gapValue.replace(number, ""));
		useEffect(() => {
			const gapValue = sliderOptions?.gap || "0px"; // default value if gap is not set
			setNumber(parseInt(gapValue));
			setUnit(gapValue.replace(parseInt(gapValue), ""));
		}, [sliderOptions?.gap]);
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
					setAttributes({ sliderOptions: parsedData });
				})
				.catch((err) => { });
		};
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-gray-700 hover:bg-gray-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addSlide();
							}}>
							{__("Add Slide Item", "combo-blocks")}
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Slider Options", "combo-blocks")}
							initialOpen={true}>
							<PGtabs
								activeTab="normal"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "normal",
										title: "Normal",
										icon: settings,
										className: "tab-normal",
									},
									{
										name: "responsive",
										title: "Responsive",
										icon: styles,
										className: "tab-responsive",
									},
								]}>
								<PGtab name="normal">
									<PanelRow className="my-3">
										<label>{__("Slider Options", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Choose"}
											options={sliderOptionsArgs}
											onChange={(option, index) => {
												var sliderOptionsX = { ...sliderOptions };
												sliderOptionsX[index] = option.value;
												setAttributes({ sliderOptions: sliderOptionsX });
											}}
											values=""></PGDropdown>
									</PanelRow>
									<PanelRow className="justify-start gap-4 mb-3">
										<button
											onClick={() => {
												copyData(sliderOptions);
											}}
											className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
											<Icon icon={copy} className="fill-white " size={14} />
											{__("Copy", "combo-blocks")}
										</button>
										<button
											onClick={() => {
												pasteData();
											}}
											className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600">
											<Icon icon={pages} className="fill-white " size={14} />
											{__("Paste", "combo-blocks")}
										</button>
									</PanelRow>
									{Object.entries(sliderOptions).map((item, index) => {
										var id = item[0];
										var value = item[1];
										return (
											<div key={index}>
												{id == "autoplay" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Autoplay?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewind" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Rewind?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "type" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Slider Type?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: "Slide", value: "slide" },
																{ label: "Loop", value: "loop" },
																{ label: "Fade", value: "fade" },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "interval" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Interval?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "speed" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Speed?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewindSpeed" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Rewind Speed?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "start" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Start?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "perPage" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Per Page?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "perMove" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Per Move?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "gap" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Gap?", "combo-blocks")}</span>
														</div>
														<div className="flex items-center gap-1 ">
															<input
																type="number"
																value={number}
																className="w-[100px]"
																onChange={(e) => {
																	const newNumber = e.target.value;
																	setNumber(newNumber);
																	var sliderOptionsX = { ...sliderOptions };
																	sliderOptionsX[id] = `${newNumber}${unit}`;
																	setAttributes({
																		sliderOptions: sliderOptionsX,
																	});
																}}
															/>
															<select
																value={unit}
																onChange={(e) => {
																	const newUnit = e.target.value;
																	setUnit(newUnit);
																	var sliderOptionsX = { ...sliderOptions };
																	sliderOptionsX[id] = `${number}${newUnit}`;
																	setAttributes({
																		sliderOptions: sliderOptionsX,
																	});
																}}>
																<option value="px">px</option>
																<option value="em">em</option>
																<option value="rem">rem</option>
																<option value="%">%</option>
															</select>
														</div>
													</PanelRow>
												)}
												{id == "padding" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Padding?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "focus" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Focus?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "width" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Width?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "height" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Height?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "fixedWidth" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Fixed Width?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "fixedHeight" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Fixed Height?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "heightRatio" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Height Ratio?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "easing" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Easing?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pauseOnHover" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Pause On Hover?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pauseOnFocus" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Pause On Focus?", "combo-blocks")}</span>
														</div>
														<label
															for=""
															className="font-medium text-slate-900 ">
															?
														</label>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewindByDrag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Rewind By Drag?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "autoWidth" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Auto Width?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "autoHeight" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Auto Height?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "arrows" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Navigation?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pagination" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Pagination?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "paginationKeyboard" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>
																{__("Pagination Keyboard?", "combo-blocks")}
															</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "drag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Drag?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "snap" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Snap?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "noDrag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("noDrag?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={value}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "paginationDirection" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>
																{__("Pagination Direction?", "combo-blocks")}
															</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: "ltr", value: "ltr" },
																{ label: "rtl", value: "rtl" },
																{ label: "ttb", value: "ttb" },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "direction" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Direction?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: "ltr", value: "ltr" },
																{ label: "rtl", value: "rtl" },
																{ label: "ttb", value: "ttb" },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "lazyLoad" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("LazyLoad?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
																{
																	label: __("Nearby", "combo-blocks"),
																	value: "nearby",
																},
																{
																	label: __("Sequential", "combo-blocks"),
																	value: "sequential",
																},
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "keyboard" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Keyboard?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
																{
																	label: __("Global", "combo-blocks"),
																	value: "global",
																},
																{
																	label: __("Focused", "combo-blocks"),
																	value: "focused",
																},
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "mediaQuery" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Media Query?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: "min", value: "min" },
																{ label: "max", value: "max" },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "wheel" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Wheel?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "cover" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArg index={id} />
															<span>{__("Cover?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={value}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsX = { ...sliderOptions };
																sliderOptionsX[id] = newVal;
																setAttributes({
																	sliderOptions: sliderOptionsX,
																});
															}}
														/>
													</PanelRow>
												)}
											</div>
										);
									})}
								</PGtab>
								<PGtab name="responsive">
									<PanelRow className="my-3">
										<label>{__("Slider Options", "combo-blocks")}</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Choose"}
											options={sliderOptionsArgsRes}
											onChange={(option, index) => {
												var sliderOptionsResX = { ...sliderOptionsRes };
												if (sliderOptionsResX[index] == undefined) {
													sliderOptionsResX[index] = {};
												}
												if (
													sliderOptionsResX[index][breakPointX] == undefined
												) {
													sliderOptionsResX[index][breakPointX] = option.value;
												}
												setAttributes({ sliderOptionsRes: sliderOptionsResX });
											}}
											values=""></PGDropdown>
										<IconToggle
											position="bottom"
											variant="secondary"
											iconList={breakPointList}
											buttonTitle="Break Point Switch"
											onChange={onChangeBreakPoint}
											activeIcon={breakPoints[breakPointX].icon}
											value={breakPointX}
										/>
									</PanelRow>
									{Object.entries(sliderOptionsRes).map((item, index) => {
										var id = item[0];
										var value = item[1];
										return (
											<div key={index}>
												{id == "autoplay" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Autoplay?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewind" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Rewind?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "interval" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Interval?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "speed" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Speed?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewindSpeed" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Rewind Speed?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "start" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Start?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "perPage" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{"Per Page?"}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "perMove" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Per Move?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															type="number"
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "gap" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Gap?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "padding" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Padding?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "focus" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Focus?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "width" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Width?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "height" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Height?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "fixedWidth" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Fixed Width?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "fixedHeight" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Fixed Height?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "heightRatio" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Height Ratio?", "combo-blocks")}</span>
														</div>
														<InputControl
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pauseOnHover" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Pause On Hover?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pauseOnFocus" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Pause On Focus?", "combo-blocks")}</span>
														</div>
														<label
															for=""
															className="font-medium text-slate-900 ">
															?
														</label>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "rewindByDrag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Rewind By Drag?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "autoWidth" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Auto Width?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "autoHeight" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Auto Height?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "arrows" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Navigation?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "pagination" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Pagination?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "paginationKeyboard" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>
																{__("Pagination Keyboard?", "combo-blocks")}
															</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "drag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Drag?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "snap" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Snap?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "noDrag" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("No Drag?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "paginationDirection" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>
																{__("Pagination Direction?", "combo-blocks")}
															</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: "ltr", value: "ltr" },
																{ label: "rtl", value: "rtl" },
																{ label: "ttb", value: "ttb" },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "direction" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Direction?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: "ltr", value: "ltr" },
																{ label: "rtl", value: "rtl" },
																{ label: "ttb", value: "ttb" },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "lazyLoad" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("LazyLoad?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
																{
																	label: __("Nearby", "combo-blocks"),
																	value: "nearby",
																},
																{
																	label: __("Sequential", "combo-blocks"),
																	value: "sequential",
																},
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "keyboard" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Keyboard?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
																{
																	label: __("Global", "combo-blocks"),
																	value: "global",
																},
																{
																	label: __("Focused", "combo-blocks"),
																	value: "focused",
																},
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "mediaQuery" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Media Query?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: "min", value: "min" },
																{ label: "max", value: "max" },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "wheel" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Wheel?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
												{id == "cover" && (
													<PanelRow>
														<div className="flex items-center">
															<RemoveSliderArgRes index={id} />
															<span>{__("Cover?", "combo-blocks")}</span>
														</div>
														<SelectControl
															label=""
															value={
																value[breakPointX] == undefined
																	? ""
																	: value[breakPointX]
															}
															options={[
																{ label: __("True", "combo-blocks"), value: 1 },
																{ label: __("False", "combo-blocks"), value: 0 },
															]}
															onChange={(newVal) => {
																var sliderOptionsResX = { ...sliderOptionsRes };
																if (
																	sliderOptionsResX[id][breakPointX] ==
																	undefined
																) {
																	sliderOptionsResX[id][breakPointX] = "";
																}
																sliderOptionsResX[id][breakPointX] = newVal;
																setAttributes({
																	sliderOptionsRes: sliderOptionsResX,
																});
															}}
														/>
													</PanelRow>
												)}
											</div>
										);
									})}
								</PGtab>
							</PGtabs>
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
							title={__("Items Wrap", "combo-blocks")}
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
										obj={itemsWrap}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												itemsWrap,
												"itemsWrap",
												itemsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												itemsWrap,
												"itemsWrap",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												itemsWrap,
												"itemsWrap",
												itemsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												itemsWrap,
												"itemsWrap",
												itemsWrapSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												itemsWrap,
												"itemsWrap",
												itemsWrapSelector,
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
							title={__("Item", "combo-blocks")}
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
										obj={item}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												item,
												"item",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												item,
												"item",
												itemSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												item,
												"item",
												itemSelector,
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
							title={__("Navigation", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900  "
								title="Navigation Style Library"
								initialOpen={false}>
								<div className="space-y-2">
									{navsLibrary.map((item, index) => {
										return (
											<div
												key={index}
												className="flex flex-col items-center border border-gray-700 border-solid p-3 rounded-md cursor-pointer  "
												onClick={() => {
													setAttributes({
														navsWrap: item.content.navsWrap,
														prev: item.content.prev,
														prevIcon: item.content.prevIcon,
														next: item.content.next,
														nextIcon: item.content.nextIcon,
													});
													var blockCssObj = {};
													blockCssObj[wrapperSelector] = wrapper;
													blockCssObj[itemsWrapSelector] = itemsWrap;
													blockCssObj[itemSelector] = item;
													blockCssObj[nextSelector] = next;
													blockCssObj[prevSelector] = prev;
													blockCssObj[nextIconSelector] = nextIcon;
													blockCssObj[prevIconSelector] = prevIcon;
													blockCssObj[navsWrapSelector] = navsWrap;
													blockCssObj[paginationWrapSelector] = paginationWrap;
													blockCssObj[paginationSelector] = pagination;
													blockCssObj[paginationActiveSelector] =
														paginationActive;
													var blockCssRules =
														myStore.getBlockCssRules(blockCssObj);
													var items = blockCssRules;
													setAttributes({ blockCssY: { items: items } });
												}}>
												<img
													src={item.preview}
													alt={item.title}
													className=" h-[200px] object-contain"
												/>
												<span className="pg-font">{item.title}</span>
											</div>
										);
									})}
								</div>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title="Nav Wrap"
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
											obj={navsWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													navsWrap,
													"navsWrap",
													navsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													navsWrap,
													"navsWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													navsWrap,
													"navsWrap",
													navsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													navsWrap,
													"navsWrap",
													navsWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													navsWrap,
													"navsWrap",
													navsWrapSelector,
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
								title={__("Prev", "combo-blocks")}
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
												{__("Previous Text", "combo-blocks")}
											</label>
											<InputControl
												value={prev.options.text}
												onChange={(newVal) => {
													var options = { ...prev.options, text: newVal };
													setAttributes({
														prev: { ...prev, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={prev}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													prev,
													"prev",
													prevSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													prev,
													"prev",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													prev,
													"prev",
													prevSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													prev,
													"prev",
													prevSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													prev,
													"prev",
													prevSelector,
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
								title={__("Prev Icon", "combo-blocks")}
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
												{__("Choose Icon", "combo-blocks")}
											</label>
											<PGIconPicker
												library={prevIcon.options.library}
												srcType={prevIcon.options.srcType}
												iconSrc={prevIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...prevIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														prevIcon: { ...prevIcon, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Icon Position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={prevIcon.options.position}
												options={[
													{ label: __("None", "combo-blocks"), value: "" },
													{ label: __("After", "combo-blocks"), value: "after" },
													{ label: __("Before", "combo-blocks"), value: "before" },
												]}
												onChange={(newVal) => {
													var options = {
														...prevIcon.options,
														position: newVal,
													};
													setAttributes({
														prevIcon: { ...prevIcon, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={prevIcon}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													prevIcon,
													"prevIcon",
													prevIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													prevIcon,
													"prevIcon",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													prevIcon,
													"prevIcon",
													prevIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													prevIcon,
													"prevIcon",
													prevIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													prevIcon,
													"prevIcon",
													prevIconSelector,
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
								title={__("Next", "combo-blocks")}
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
												{__("Next Text", "combo-blocks")}
											</label>
											<InputControl
												value={next.options.text}
												onChange={(newVal) => {
													var options = { ...next.options, text: newVal };
													setAttributes({
														next: { ...next, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={next}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													next,
													"next",
													nextSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													next,
													"next",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													next,
													"next",
													nextSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													next,
													"next",
													nextSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													next,
													"next",
													nextSelector,
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
								title={__("Next Icon", "combo-blocks")}
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
												{__("Choose Icon", "combo-blocks")}
											</label>
											<PGIconPicker
												library={nextIcon.options.library}
												srcType={nextIcon.options.srcType}
												iconSrc={nextIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...nextIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														nextIcon: { ...nextIcon, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Icon Position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={nextIcon.options.position}
												options={[
													{ label: __("None", "combo-blocks"), value: "" },
													{ label: __("After", "combo-blocks"), value: "after" },
													{ label: __("Before", "combo-blocks"), value: "before" },
												]}
												onChange={(newVal) => {
													var options = {
														...nextIcon.options,
														position: newVal,
													};
													setAttributes({
														nextIcon: { ...nextIcon, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={nextIcon}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													nextIcon,
													"nextIcon",
													nextIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													nextIcon,
													"nextIcon",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													nextIcon,
													"nextIcon",
													nextIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													nextIcon,
													"nextIcon",
													nextIconSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													nextIcon,
													"nextIcon",
													nextIconSelector,
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
							title={__("Pagination", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900"
								title="Pagination Style Library"
								initialOpen={false}>
								<div className="space-y-2">
									{paginationLibrary.map((item, index) => {
										return (
											<div
												key={index}
												className="flex flex-col items-center border border-gray-700 border-solid p-3 rounded-md cursor-pointer  "
												onClick={() => {
													setAttributes({
														paginationWrap: item.content.paginationWrap,
														pagination: item.content.pagination,
														paginationActive: item.content.paginationActive,
													});
													var blockCssObj = {};
													blockCssObj[wrapperSelector] = wrapper;
													blockCssObj[itemsWrapSelector] = itemsWrap;
													blockCssObj[itemSelector] = item;
													blockCssObj[nextSelector] = next;
													blockCssObj[prevSelector] = prev;
													blockCssObj[nextIconSelector] = nextIcon;
													blockCssObj[prevIconSelector] = prevIcon;
													blockCssObj[navsWrapSelector] = navsWrap;
													blockCssObj[paginationWrapSelector] = paginationWrap;
													blockCssObj[paginationSelector] = pagination;
													blockCssObj[paginationActiveSelector] =
														paginationActive;
													var blockCssRules =
														myStore.getBlockCssRules(blockCssObj);
													var items = blockCssRules;
													setAttributes({ blockCssY: { items: items } });
												}}>
												<img
													src={item.preview}
													alt={item.title}
													className=" h-[200px] object-contain"
												/>
												<span className="pg-font">{item.title}</span>
											</div>
										);
									})}
								</div>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Pagination Wrap", "combo-blocks")}
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
											obj={paginationWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													paginationWrap,
													"paginationWrap",
													paginationWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													paginationWrap,
													"paginationWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													paginationWrap,
													"paginationWrap",
													paginationWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													paginationWrap,
													"paginationWrap",
													paginationWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													paginationWrap,
													"paginationWrap",
													paginationWrapSelector,
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
								title={__("Pagination Idle", "combo-blocks")}
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
											obj={pagination}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													pagination,
													"pagination",
													paginationSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													pagination,
													"pagination",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													pagination,
													"pagination",
													paginationSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													pagination,
													"pagination",
													paginationSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													pagination,
													"pagination",
													paginationSelector,
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
								title={__("Pagination Active", "combo-blocks")}
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
											obj={paginationActive}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													paginationActive,
													"paginationActive",
													paginationActiveSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													paginationActive,
													"paginationActive",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													paginationActive,
													"paginationActive",
													paginationActiveSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													paginationActive,
													"paginationActive",
													paginationActiveSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													paginationActive,
													"paginationActive",
													paginationActiveSelector,
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
													["combo-blocks/content-slider-item", {}],
												]),
												true
											);
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...innerBlocksProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"content-slider"}
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
							<Splide hasTrack={false} options={sliderOptions}>
								<SplideTrack>{innerBlocksProps.children}</SplideTrack>
								<div className="splide__arrows">
									<div className="prev splide__arrow splide__arrow--prev">
										{prevIcon.options.position == "before" && (
											<span
												className="icon"
												dangerouslySetInnerHTML={{ __html: prevIconHtml }}
											/>
										)}
										{prev.options.text.length > 0 && (
											<span> {prev.options.text} </span>
										)}
										{prevIcon.options.position == "after" && (
											<span
												className="icon"
												dangerouslySetInnerHTML={{ __html: prevIconHtml }}
											/>
										)}
									</div>
									<div className="next splide__arrow splide__arrow--next">
										{nextIcon.options.position == "before" && (
											<span
												className="icon"
												dangerouslySetInnerHTML={{ __html: nextIconHtml }}
											/>
										)}
										{next.options.text.length > 0 && (
											<span> {next.options.text} </span>
										)}
										{nextIcon.options.position == "after" && (
											<span
												className="icon"
												dangerouslySetInnerHTML={{ __html: nextIconHtml }}
											/>
										)}
									</div>
								</div>
								<ul className="splide__pagination "></ul>
							</Splide>
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		var blockId = attributes.blockId;
		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-content-slider`,
		});
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);
		return <>{children}</>;
		//return null;
	},
});
