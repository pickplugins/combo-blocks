import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";
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
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M18.6278 32.4219V63.2791H9.80766V38.6144H9.56322L0.00976562 43.0441V37.2584L10.3373 32.4219H18.6278Z"
					fill="url(#paint0_linear_61_780)"
				/>
				<path
					d="M41.8188 63.2791V58.5782L56.6685 48.408C57.9314 47.5039 58.9906 46.6903 59.8461 45.9671C60.7153 45.2439 61.3739 44.5357 61.822 43.8427C62.2702 43.1395 62.4942 42.3812 62.4942 41.5675C62.4942 40.6635 62.2158 39.8851 61.6591 39.2322C61.1023 38.5692 60.3418 38.062 59.3776 37.7104C58.4135 37.3488 57.3203 37.168 56.0981 37.168C54.8216 37.168 53.708 37.3588 52.7574 37.7405C51.8069 38.1222 51.0735 38.6697 50.5575 39.3828C50.0415 40.096 49.7835 40.9448 49.7835 41.9291H41.4115C41.4115 39.9102 42.0293 38.1574 43.2651 36.6708C44.5009 35.1842 46.2323 34.034 48.4594 33.2204C50.6865 32.4068 53.2531 32 56.1592 32C59.1468 32 61.7473 32.3917 63.9609 33.1752C66.188 33.9487 67.9194 35.0234 69.1552 36.3996C70.3909 37.7757 71.0088 39.3527 71.0088 41.1306C71.0088 42.2958 70.6965 43.4459 70.0718 44.5809C69.4607 45.716 68.3675 46.9766 66.7923 48.3628C65.217 49.7389 62.9967 51.3912 60.1313 53.3198L54.0407 57.7344V57.9454H71.5588V63.2791H41.8188Z"
					fill="url(#paint1_linear_61_780)"
				/>
				<path
					d="M91.2259 63.2791V58.5782L106.075 48.408C107.338 47.5039 108.398 46.6903 109.253 45.9671C110.122 45.2439 110.781 44.5357 111.229 43.8427C111.677 43.1395 111.901 42.3812 111.901 41.5675C111.901 40.6635 111.623 39.8851 111.066 39.2322C110.509 38.5692 109.749 38.062 108.785 37.7104C107.82 37.3488 106.727 37.168 105.505 37.168C104.229 37.168 103.115 37.3588 102.164 37.7405C101.214 38.1222 100.481 38.6697 99.9645 39.3828C99.4485 40.096 99.1905 40.9448 99.1905 41.9291H90.8185C90.8185 39.9102 91.4364 38.1574 92.6721 36.6708C93.9079 35.1842 95.6393 34.034 97.8664 33.2204C100.094 32.4068 102.66 32 105.566 32C108.554 32 111.154 32.3917 113.368 33.1752C115.595 33.9487 117.326 35.0234 118.562 36.3996C119.798 37.7757 120.416 39.3527 120.416 41.1306C120.416 42.2958 120.104 43.4459 119.479 44.5809C118.868 45.716 117.775 46.9766 116.199 48.3628C114.624 49.7389 112.404 51.3912 109.538 53.3198L103.448 57.7344V57.9454H120.966V63.2791H91.2259Z"
					fill="url(#paint2_linear_61_780)"
				/>
				<path
					d="M18.6138 60.0787V101.799H9.79313V68.4512H9.54868L-0.00537109 74.4403V66.6178L10.3228 60.0787H18.6138Z"
					fill="#C15940"
				/>
				<path
					d="M41.8063 101.799V95.4429L56.6569 81.6924C57.9199 80.4702 58.9792 79.3701 59.8348 78.3923C60.7039 77.4145 61.3626 76.4571 61.8108 75.52C62.2589 74.5693 62.483 73.544 62.483 72.444C62.483 71.2217 62.2046 70.1692 61.6478 69.2864C61.091 68.3901 60.3305 67.7043 59.3662 67.229C58.402 66.74 57.3087 66.4956 56.0865 66.4956C54.8099 66.4956 53.6963 66.7536 52.7456 67.2697C51.795 67.7858 51.0616 68.5259 50.5455 69.4901C50.0295 70.4544 49.7714 71.6019 49.7714 72.9329H41.3989C41.3989 70.2031 42.0168 67.8333 43.2527 65.8233C44.4885 63.8134 46.2201 62.2584 48.4473 61.1584C50.6746 60.0583 53.2413 59.5083 56.1476 59.5083C59.1354 59.5083 61.7361 60.0379 63.9497 61.0972C66.177 62.143 67.9085 63.5961 69.1444 65.4567C70.3802 67.3172 70.9981 69.4494 70.9981 71.8532C70.9981 73.4286 70.6858 74.9836 70.0611 76.5182C69.4499 78.0528 68.3567 79.7572 66.7813 81.6313C65.2059 83.4919 62.9855 85.7259 60.12 88.3334L54.029 94.3022V94.5873H71.5482V101.799H41.8063Z"
					fill="#C15940"
				/>
				<path
					d="M106.637 102.369C103.595 102.369 100.886 101.846 98.5093 100.801C96.1463 99.7412 94.2789 98.2881 92.9072 96.4411C91.5492 94.5806 90.8498 92.4348 90.809 90.0038H99.6908C99.7452 91.0224 100.078 91.9187 100.689 92.6928C101.314 93.4534 102.142 94.0441 103.174 94.4651C104.206 94.8861 105.368 95.0966 106.658 95.0966C108.002 95.0966 109.191 94.859 110.223 94.3836C111.255 93.9083 112.063 93.2496 112.647 92.4076C113.231 91.5656 113.523 90.5946 113.523 89.4946C113.523 88.381 113.21 87.3963 112.586 86.5408C111.975 85.6716 111.092 84.9926 109.938 84.5036C108.797 84.0147 107.439 83.7703 105.863 83.7703H101.972V77.2923H105.863C107.194 77.2923 108.369 77.0614 109.387 76.5997C110.42 76.1379 111.221 75.4996 111.791 74.6848C112.362 73.8564 112.647 72.8921 112.647 71.7921C112.647 70.7464 112.396 69.8297 111.893 69.042C111.404 68.2407 110.712 67.616 109.815 67.1678C108.933 66.7197 107.9 66.4956 106.719 66.4956C105.524 66.4956 104.431 66.7129 103.439 67.1475C102.448 67.5685 101.653 68.1728 101.056 68.9605C100.458 69.7482 100.139 70.6717 100.098 71.731H91.6442C91.685 69.3272 92.3708 67.2086 93.7017 65.3752C95.0326 63.5418 96.8253 62.109 99.0797 61.0769C101.348 60.0312 103.908 59.5083 106.76 59.5083C109.639 59.5083 112.158 60.0312 114.317 61.0769C116.477 62.1226 118.154 63.535 119.349 65.3141C120.558 67.0796 121.155 69.0624 121.142 71.2624C121.155 73.5983 120.429 75.5472 118.962 77.1089C117.509 78.6707 115.614 79.6621 113.278 80.0831V80.4091C116.348 80.8029 118.684 81.869 120.286 83.6073C121.902 85.3321 122.703 87.4914 122.69 90.0853C122.703 92.462 122.018 94.5738 120.632 96.4207C119.261 98.2677 117.366 99.7209 114.949 100.78C112.531 101.839 109.761 102.369 106.637 102.369Z"
					fill="#C15940"
				/>
				<path
					d="M18.6243 97.1372V127.994H9.80581V103.33H9.56142L0.00976562 107.759V101.974L10.3353 97.1372H18.6243Z"
					fill="url(#paint3_linear_61_780)"
				/>
				<path
					d="M41.811 127.994V123.294L56.6578 113.123C57.9205 112.219 58.9795 111.406 59.8349 110.682C60.7038 109.959 61.3623 109.251 61.8104 108.558C62.2584 107.855 62.4825 107.096 62.4825 106.283C62.4825 105.379 62.2041 104.6 61.6474 103.947C61.0908 103.285 60.3304 102.777 59.3665 102.426C58.4025 102.064 57.3095 101.883 56.0875 101.883C54.8113 101.883 53.6979 102.074 52.7475 102.456C51.7971 102.838 51.0639 103.385 50.548 104.098C50.032 104.811 49.7741 105.66 49.7741 106.644H41.4037C41.4037 104.626 42.0214 102.873 43.257 101.386C44.4925 99.8995 46.2236 98.7494 48.4503 97.9358C50.677 97.1221 53.2431 96.7153 56.1486 96.7153C59.1356 96.7153 61.7357 97.1071 63.9488 97.8906C66.1755 98.664 67.9066 99.7388 69.1421 101.115C70.3777 102.491 70.9954 104.068 70.9954 105.846C70.9954 107.011 70.6832 108.161 70.0586 109.296C69.4476 110.431 68.3547 111.692 66.7797 113.078C65.2047 114.454 62.9848 116.107 60.12 118.035L54.0306 122.45V122.661H71.5453V127.994H41.811Z"
					fill="url(#paint4_linear_61_780)"
				/>
				<path
					d="M90.5773 122.57V117.432L107.99 97.1372H113.978V104.249H110.434L99.4569 117.101V117.342H124.202V122.57H90.5773ZM110.597 127.994V121.003L110.76 118.728V97.1372H119.029V127.994H110.597Z"
					fill="url(#paint5_linear_61_780)"
				/>
				<path
					d="M136.835 74.7634C137.417 75.2246 138.264 75.1268 138.725 74.5427L141.984 70.4177L146.818 64.9989L146.818 98.8374C146.818 99.5811 147.421 100.183 148.164 100.183C148.907 100.183 149.509 99.5811 149.509 98.8374L149.509 65.3371L157.631 74.7383C158.116 75.2999 158.966 75.3636 159.529 74.8774C160.091 74.3911 160.153 73.5415 159.667 72.979L149.071 60.7141C148.818 60.4208 148.451 60.2512 148.063 60.2476C148.06 60.2476 148.056 60.2476 148.052 60.2476C147.668 60.2476 147.303 60.4109 147.049 60.6971L139.924 68.6871L136.614 72.8731C136.153 73.4563 136.251 74.3023 136.835 74.7634Z"
					fill="url(#paint6_linear_61_780)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_780"
						x1="-2.90313"
						y1="47.8369"
						x2="124.054"
						y2="47.8369"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_780"
						x1="-2.90313"
						y1="47.8369"
						x2="124.054"
						y2="47.8369"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_780"
						x1="-2.90313"
						y1="47.8369"
						x2="124.054"
						y2="47.8369"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_780"
						x1="-2.90258"
						y1="112.552"
						x2="126.804"
						y2="112.552"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_780"
						x1="-2.90258"
						y1="112.552"
						x2="126.804"
						y2="112.552"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_780"
						x1="-2.90258"
						y1="112.552"
						x2="126.804"
						y2="112.552"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" stop-opacity="0.15" />
						<stop offset="1" stopColor="#FF9D42" stop-opacity="0.62" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_780"
						x1="159.995"
						y1="80.2154"
						x2="136.323"
						y2="80.2154"
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
		let numberCount = attributes.numberCount;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		var [commentCountEdited, setcommentCountEdited] = useState(
			numberCount.options.start
		);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const commentCountSelector = blockClass + " .number-count";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .number-count-icon";
		var numberCounterIconPositionBasic = {
			none: { label: __("Choose Position", "combo-blocks"), value: "" },
			beforePrefix: {
				label: __("Before Prefix", "combo-blocks"),
				value: "beforePrefix",
			},
			afterPrefix: {
				label: __("After Prefix", "combo-blocks"),
				value: "afterPrefix",
				isPro: true,
			},
			beforePostfix: {
				label: __("Before Postfix", "combo-blocks"),
				value: "beforePostfix",
				isPro: true,
			},
			afterPostfix: {
				label: __("After Postfix", "combo-blocks"),
				value: "afterPostfix",
				isPro: true,
			},
		};
		let iconPositionArgs = applyFilters(
			"comboBlocksNumberCounterIconPosition",
			numberCounterIconPositionBasic
		);
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		function setIconPosition(option, index) {
			var options = { ...icon.options, position: option.value };
			setAttributes({ icon: { ...icon, options: options } });
		}
		const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
			const target = document.querySelector(qSelector);
			let startTimestamp = null;
			const step = (timestamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / duration, 1);
				var numberX = progress * (end - start) + start;
				if (Number.isInteger(end)) {
					if (target != null) {
						target.innerText = Math.floor(numberX);
					}
				} else {
					target.innerText = Number(numberX).toFixed(2);
				}
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};
			window.requestAnimationFrame(step);
		};
		var numberCounterSourceBasic = {
			none: { label: __("Choose", "combo-blocks"), value: "" },
			wooTotalSale: {
				label: __("WooCommerce Total Sale", "combo-blocks"),
				value: "wooTotalSale",
				isPro: true,
			},
			tutorTotalInstructors: {
				label: __("Tutor Total Instructors", "combo-blocks"),
				value: "tutorTotalInstructors",
				isPro: true,
			},
			tutorTotalStudents: {
				label: __("Tutor Total Students", "combo-blocks"),
				value: "tutorTotalStudents",
				isPro: true,
			},
			tutorTotalAssignments: {
				label: __("Tutor Total Assignments", "combo-blocks"),
				value: "tutorTotalAssignments",
				isPro: true,
			},
			tutorTotalEnrolments: {
				label: __("Tutor Total Enrolments", "combo-blocks"),
				value: "tutorTotalEnrolments",
				isPro: true,
			},
			tutorTotalCourse: {
				label: __("Tutor Total Course", "combo-blocks"),
				value: "tutorTotalCourse",
				isPro: true,
			},
			tutorTotalEnrolledCourse: {
				label: __("Tutor Total Enrolled Course", "combo-blocks"),
				value: "tutorTotalEnrolledCourse",
				isPro: true,
			},
			tutorTotalQuestion: {
				label: __("Tutor Total Question", "combo-blocks"),
				value: "tutorTotalQuestion",
				isPro: true,
			},
			tutorTotalReview: {
				label: __("Tutor Total Review", "combo-blocks"),
				value: "tutorTotalReview",
				isPro: true,
			},

			post_meta: {
				label: __("Post Meta", "combo-blocks"),
				value: "post_meta",
				isPro: true,
			},
		};
		let numberCounterSource = applyFilters(
			"comboBlocksNumberCounterSource",
			numberCounterSourceBasic
		);
		function setNumberCounterSrc(option, index) {
			var options = {
				...numberCount.options,
				source: option.value,
			};
			setAttributes({
				numberCount: { ...numberCount, options: options },
			});
		}
		useEffect(() => {
			var start = parseInt(numberCount.options.start);
			var end = Number.isInteger(numberCount.options.end)
				? parseInt(numberCount.options.end)
				: parseFloat(numberCount.options.end);
			var duration = parseInt(numberCount.options.duration);
			counterAnim(commentCountSelector, start, end, duration);
		}, [numberCount]);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => { }, [numberCount]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[commentCountSelector] = numberCount;
			blockCssObj[iconSelector] = icon;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
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
				var numberCountX = attributes.numberCount;
				var iconX = attributes.icon;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
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
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (numberCountX != undefined) {
					var numberCountY = { ...numberCountX, options: numberCount.options };
					setAttributes({ numberCount: numberCountY });
					blockCssObj[commentCountSelector] = numberCountY;
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
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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
		function onPickCssLibraryCommentCount(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				numberCount[sudoScource] = sudoScourceArgs;
			});
			var commentCountX = Object.assign({}, numberCount);
			setAttributes({ numberCount: commentCountX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					commentCountSelector
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
		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});
			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
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
		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				prefix[sudoScource] = sudoScourceArgs;
			});
			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					prefixSelector
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
		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				postfix[sudoScource] = sudoScourceArgs;
			});
			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					postfixSelector
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
		function onRemoveStyleCommentCount(sudoScource, key) {
			let obj = { ...numberCount };
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
			setAttributes({ frontText: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
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
		function onRemoveStylePrefix(sudoScource, key) {
			let obj = { ...prefix };
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
			setAttributes({ prefix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
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
		function onRemoveStylePostfix(sudoScource, key) {
			let obj = { ...postfix };
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
			setAttributes({ postfix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
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
		function onResetCommentCount(sudoSources) {
			let obj = Object.assign({}, numberCount);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						commentCountSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ numberCount: obj });
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
		function onResetPrefix(sudoSources) {
			let obj = Object.assign({}, prefix);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						prefixSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ prefix: obj });
		}
		function onResetPostfix(sudoSources) {
			let obj = Object.assign({}, postfix);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postfixSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ postfix: obj });
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
		function onChangeStyleCommentCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, numberCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ numberCount: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
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
		function onAddStyleCommentCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, numberCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ numberCount: object });
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
		function onChangeStylePrefix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ prefix: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				prefixSelector
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
		function onAddStylePrefix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}
		function onChangeStylePostfix(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postfix: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postfixSelector
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
		function onAddStylePostfix(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
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
		function onBulkAddNumberCount(sudoScource, cssObj) {
			let obj = Object.assign({}, numberCount);
			obj[sudoScource] = cssObj;
			setAttributes({ numberCount: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				commentCountSelector
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
		function onBulkAddPrefix(sudoScource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoScource] = cssObj;
			setAttributes({ prefix: obj });
			var selector = myStore.getElementSelector(sudoScource, prefixSelector);
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
		function onBulkAddPostfix(sudoScource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoScource] = cssObj;
			setAttributes({ postfix: obj });
			var selector = myStore.getElementSelector(sudoScource, postfixSelector);
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
		String.prototype.strtr = function (dic) {
			const str = this.toString(),
				makeToken = (inx) => `{{###~${inx}~###}}`,
				tokens = Object.keys(dic).map((key, inx) => ({
					key,
					val: dic[key],
					token: makeToken(inx),
				})),
				tokenizedStr = tokens.reduce(
					(carry, entry) =>
						carry.replace(new RegExp(entry.key, "g"), entry.token),
					str
				);
			return tokens.reduce(
				(carry, entry) =>
					carry.replace(new RegExp(entry.token, "g"), entry.val),
				tokenizedStr
			);
		};
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		const CustomTag = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${numberCount.options.tag}`;
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
							title={__("Number Count", "combo-blocks")}
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
											{__("Number Counter Source", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={numberCounterSource}
											buttonTitle={
												numberCount.options.source == undefined ||
													numberCount.options.source.length == 0
													? __("Choose", "combo-blocks")
													: numberCounterSource[numberCount.options.source] ==
														undefined
														? __("Choose", "combo-blocks")
														: numberCounterSource[numberCount.options.source]
															.label
											}
											onChange={setNumberCounterSrc}
											values={[]}></PGDropdown>
									</PanelRow>
									{numberCount.options?.source == "post_meta" && (
										<PanelRow className="mb-2">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Meta Key", "combo-blocks")}
											</label>
											<InputControl
												placeholder="Meta key"
												value={numberCount.options?.key}
												onChange={(newVal) => {
													var options = { ...numberCount.options, key: newVal };
													setAttributes({
														numberCount: { ...numberCount, options: options },
													});
												}}
											/>
										</PanelRow>
									)}
									{(numberCount.options.source == undefined ||
										numberCount.options?.source?.length == 0) && (
											<>
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900 mb-2">
														{__("Start?", "combo-blocks")}
													</label>
													<InputControl
														type="number"
														step="0.01"
														className="mr-2"
														value={numberCount.options.start}
														onChange={(newVal) => {
															var options = {
																...numberCount.options,
																start: newVal,
															};
															setAttributes({
																numberCount: { ...numberCount, options: options },
															});
														}}
													/>
												</PanelRow>
												<PanelRow>
													<label
														for=""
														className="font-medium text-slate-900 mb-2">
														{__("End?", "combo-blocks")}
													</label>
													<InputControl
														type="number"
														step="0.01"
														className="mr-2"
														value={numberCount.options.end}
														onChange={(newVal) => {
															var options = {
																...numberCount.options,
																end: newVal,
															};
															setAttributes({
																numberCount: { ...numberCount, options: options },
															});
														}}
													/>
												</PanelRow>
											</>
										)}
									<PanelRow className="mb-4">
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Duration?", "combo-blocks")}
										</label>
										<InputControl
											type="number"
											className="mr-2"
											value={numberCount.options.duration}
											onChange={(newVal) => {
												var options = {
													...numberCount.options,
													duration: newVal,
												};
												setAttributes({
													numberCount: { ...numberCount, options: options },
												});
											}}
										/>
									</PanelRow>
									<ToggleControl
										label={__("onScroll?", "combo-blocks")}
										help={
											numberCount.options.onScroll
												? __("Play on scroll", "combo-blocks")
												: __("Play on page load", "combo-blocks")
										}
										checked={numberCount.options.onScroll ? true : false}
										onChange={(e) => {
											var options = {
												...numberCount.options,
												onScroll: numberCount.options.onScroll ? false : true,
											};
											setAttributes({
												numberCount: { ...numberCount, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={numberCount}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												numberCount,
												"numberCount",
												commentCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												numberCount,
												"numberCount",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												numberCount,
												"numberCount",
												commentCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												numberCount,
												"numberCount",
												commentCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												numberCount,
												"numberCount",
												commentCountSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={numberCount}
										onChange={onPickCssLibraryCommentCount}
									/>
								</PGtab>
							</PGtabs>
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
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={iconPositionArgs}
											buttonTitle={
												icon.options.position.length == 0
													? __("Choose", "combo-blocks")
													: iconPositionArgs[icon.options.position] == undefined
														? __("Choose", "combo-blocks")
														: iconPositionArgs[icon.options.position].label
											}
											onChange={setIconPosition}
											values={[]}></PGDropdown>
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
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Prefix"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Prefix", "combo-blocks")}</span>
									{isProFeature ? (
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
									) : (
										""
									)}{" "}
								</span>
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
										label="Prefix"
										placeholder="Add Prefix"
										value={prefix.options.text}
										onChange={(newVal) => {
											var options = { ...prefix.options, text: newVal };
											setAttributes({
												prefix: { styles: prefix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={prefix}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												prefix,
												"prefix",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												prefix,
												"prefix",
												prefixSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={prefix}
										onChange={onPickCssLibraryPrefix}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Postfix"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Postfix", "combo-blocks")}</span>
									{isProFeature ? (
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
									) : (
										""
									)}{" "}
								</span>
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
										label="Postfix"
										placeholder="Add Postfix"
										value={postfix.options.text}
										onChange={(newVal) => {
											var options = { ...postfix.options, text: newVal };
											setAttributes({
												postfix: { styles: postfix.styles, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={postfix}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												postfix,
												"postfix",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												postfix,
												"postfix",
												postfixSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={postfix}
										onChange={onPickCssLibraryPostfix}
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
				{numberCount.options.end == 0 && (
					<>
						<div className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										{__("Click to pick a variation", "combo-blocks")}
									</div>
									<div
										className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											var content =
												'<!-- wp:combo-blocks/number-counter {"numberCount":{"options":{"tag":"div","start":0,"end":"500","duration":1000,"class":"number-count"},"styles":{"color":{"Desktop":"#000000"},"fontSize":{"Desktop":"18px"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"}}},"blockId":"pgbc1387e12e53","blockCssY":{"items":{".pgbc1387e12e53":{"display":{"Desktop":"block"}},".pgbc1387e12e53 .number-count":{"color":{"Desktop":"#000000"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"}},".pgbc1387e12e53 .number-count-icon":{"color":{"Desktop":"#000000"},"margin":{"Desktop":"0px 10px 0px 0px"},"font-size":{"Desktop":"18px"}},".pgbc1387e12e53 .prefix":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"margin":{"Desktop":"0px 10px 0px 0px"}},".pgbc1387e12e53 .postfix":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"margin":{"Desktop":"0px 0px 0px 10px"}}}}} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"number-counter"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{numberCount.options.end > 0 && (
					<>
						{wrapper.options.tag && (
							<CustomTag {...blockProps}>
								{icon.options.position == "beforePrefix" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{prefix.options.text && (
									<span className={prefix.options.class}>
										{prefix.options.text}
									</span>
								)}
								{icon.options.position == "afterPrefix" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{icon.options.position == "beforeCommentCount" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								<span className={numberCount.options.class}>
									{commentCountEdited}
								</span>
								{icon.options.position == "afterCommentCount" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{icon.options.position == "beforePostfix" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
								{postfix.options.text && (
									<span className={postfix.options.class}>
										{postfix.options.text}
									</span>
								)}
								{icon.options.position == "afterPostfix" && (
									<span
										className={icon.options.class}
										dangerouslySetInnerHTML={{ __html: iconHtml }}
									/>
								)}
							</CustomTag>
						)}
					</>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
