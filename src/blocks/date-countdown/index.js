import apiFetch from "@wordpress/api-fetch";
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
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	brush,
	close,
	Icon,
	mediaAndText,
	menu,
	settings,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDatePicker from "../../components/date-picker";
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
					d="M36.6894 56.4907H3.24769C1.4508 56.4907 -0.00585938 57.9474 -0.00585938 59.7443V101.179C-0.00585938 102.976 1.4508 104.432 3.24769 104.432H36.6894C38.4862 104.432 39.9429 102.976 39.9429 101.179V59.7443C39.9429 57.9474 38.4862 56.4907 36.6894 56.4907Z"
					fill="url(#paint0_linear_61_611)"
				/>
				<path
					d="M9.34427 96.5078V91.6577L20.7895 81.1646C21.7629 80.2319 22.5793 79.3925 23.2387 78.6463C23.9085 77.9001 24.4162 77.1695 24.7616 76.4544C25.107 75.729 25.2797 74.9465 25.2797 74.1071C25.2797 73.1744 25.0651 72.3712 24.636 71.6976C24.2068 71.0136 23.6207 70.4902 22.8776 70.1275C22.1344 69.7544 21.2919 69.5679 20.3499 69.5679C19.366 69.5679 18.5078 69.7648 17.7751 70.1586C17.0424 70.5524 16.4773 71.1172 16.0795 71.853C15.6818 72.5888 15.4829 73.4646 15.4829 74.4802H9.03027C9.03027 72.3971 9.5065 70.5887 10.459 69.0549C11.4114 67.5211 12.7459 66.3345 14.4624 65.495C16.179 64.6556 18.1571 64.2358 20.397 64.2358C22.6996 64.2358 24.704 64.64 26.41 65.4484C28.1266 66.2464 29.4611 67.3553 30.4135 68.7751C31.366 70.1949 31.8422 71.8219 31.8422 73.6563C31.8422 74.8584 31.6015 76.0451 31.12 77.2161C30.649 78.3872 29.8065 79.6878 28.5923 81.118C27.3782 82.5378 25.6669 84.2426 23.4585 86.2324L18.7642 90.7872V91.0048H32.2661V96.5078H9.34427Z"
					fill="white"
				/>
				<path
					d="M85.7426 56.4907H52.3009C50.504 56.4907 49.0474 57.9474 49.0474 59.7443V101.179C49.0474 102.976 50.504 104.432 52.3009 104.432H85.7426C87.5395 104.432 88.9961 102.976 88.9961 101.179V59.7443C88.9961 57.9474 87.5395 56.4907 85.7426 56.4907Z"
					fill="url(#paint1_linear_61_611)"
				/>
				<path
					d="M68.312 96.5078C66.115 96.5078 64.1562 96.1037 62.4359 95.2953C60.7259 94.4869 59.3683 93.3729 58.363 91.9531C57.3578 90.5333 56.8344 88.9062 56.793 87.0718H63.322C63.3945 88.3051 63.9127 89.3052 64.8765 90.0721C65.8403 90.839 66.9855 91.2224 68.312 91.2224C69.3691 91.2224 70.3018 90.9893 71.1102 90.5229C71.9289 90.0462 72.5662 89.3881 73.0222 88.5487C73.4886 87.6988 73.7218 86.7247 73.7218 85.6261C73.7218 84.5069 73.4834 83.5223 73.0067 82.6725C72.5403 81.8227 71.8926 81.1595 71.0635 80.6827C70.2345 80.206 69.2862 79.9625 68.2187 79.9521C67.286 79.9521 66.3792 80.1438 65.4983 80.5273C64.6278 80.9107 63.949 81.4341 63.4619 82.0974L57.477 81.0247L58.9849 64.2358H78.4475V69.7389H64.5345L63.7106 77.7136H63.8972C64.4568 76.926 65.3014 76.2731 66.431 75.7549C67.5607 75.2367 68.825 74.9776 70.2241 74.9776C72.1413 74.9776 73.8513 75.4284 75.354 76.3301C76.8567 77.2317 78.0434 78.4701 78.9139 80.0454C79.7844 81.6103 80.2145 83.4135 80.2042 85.4551C80.2145 87.6004 79.7171 89.5073 78.7118 91.1758C77.7169 92.834 76.323 94.1398 74.5301 95.0932C72.7476 96.0363 70.6749 96.5078 68.312 96.5078Z"
					fill="white"
				/>
				<path
					d="M156.741 56.4907H123.299C121.502 56.4907 120.045 57.9474 120.045 59.7443V101.179C120.045 102.976 121.502 104.432 123.299 104.432H156.741C158.538 104.432 159.994 102.976 159.994 101.179V59.7443C159.994 57.9474 158.538 56.4907 156.741 56.4907Z"
					fill="url(#paint2_linear_61_611)"
				/>
				<path
					d="M139.31 96.5078C137.113 96.5078 135.154 96.1037 133.434 95.2953C131.724 94.4869 130.366 93.3729 129.361 91.9531C128.356 90.5333 127.832 88.9062 127.791 87.0718H134.32C134.393 88.3051 134.911 89.3052 135.875 90.0721C136.838 90.839 137.984 91.2224 139.31 91.2224C140.367 91.2224 141.3 90.9893 142.108 90.5229C142.927 90.0462 143.564 89.3881 144.02 88.5487C144.487 87.6988 144.72 86.7247 144.72 85.6261C144.72 84.5069 144.481 83.5223 144.005 82.6725C143.538 81.8227 142.891 81.1595 142.062 80.6827C141.232 80.206 140.284 79.9625 139.217 79.9521C138.284 79.9521 137.377 80.1438 136.496 80.5273C135.626 80.9107 134.947 81.4341 134.46 82.0974L128.475 81.0247L129.983 64.2358H149.446V69.7389H135.533L134.709 77.7136H134.895C135.455 76.926 136.299 76.2731 137.429 75.7549C138.559 75.2367 139.823 74.9776 141.222 74.9776C143.139 74.9776 144.849 75.4284 146.352 76.3301C147.855 77.2317 149.041 78.4701 149.912 80.0454C150.782 81.6103 151.213 83.4135 151.202 85.4551C151.213 87.6004 150.715 89.5073 149.71 91.1758C148.715 92.834 147.321 94.1398 145.528 95.0932C143.746 96.0363 141.673 96.5078 139.31 96.5078Z"
					fill="white"
				/>
				<path
					d="M139.324 41C139.777 41 140.229 41 140.681 41.4176L150.632 50.606C151.084 51.0236 151.084 51.859 150.632 52.2766C149.727 52.6943 148.822 52.6943 148.37 52.2766L139.777 44.3412L130.731 52.2766C130.279 52.6943 128.922 52.6943 128.469 52.2766C127.565 51.859 127.565 51.0236 128.469 50.606L138.42 41.4176C138.42 41 138.872 41 139.324 41Z"
					fill="url(#paint3_linear_61_611)"
				/>
				<path
					d="M139.324 119.716C139.777 119.716 140.229 119.716 140.681 119.299L150.632 110.11C151.084 109.693 151.084 108.857 150.632 108.44C149.727 108.022 148.822 108.022 148.37 108.44L139.777 116.375L130.731 108.44C130.279 108.022 128.922 108.022 128.469 108.44C127.565 108.857 127.565 109.693 128.469 110.11L138.42 119.299C138.42 119.716 138.872 119.716 139.324 119.716Z"
					fill="url(#paint4_linear_61_611)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_611"
						x1="-0.00585938"
						y1="80.4614"
						x2="39.9429"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_611"
						x1="49.0474"
						y1="80.4614"
						x2="88.9961"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_611"
						x1="120.045"
						y1="80.4614"
						x2="159.994"
						y2="80.4614"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_611"
						x1="139.381"
						y1="52.5898"
						x2="139.381"
						y2="41"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_611"
						x1="139.381"
						y1="108.126"
						x2="139.381"
						y2="119.716"
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
		var postId = context["postId"];
		var postType = context["postType"];
		var inner = attributes.inner;
		var editMode = attributes.editMode;
		let items = attributes.items;
		let dayWrap = attributes.dayWrap;
		let day = attributes.day;
		let hourWrap = attributes.hourWrap;
		let hour = attributes.hour;
		let minuteWrap = attributes.minuteWrap;
		let minute = attributes.minute;
		let secondWrap = attributes.secondWrap;
		let second = attributes.second;
		var countdownWrapper = attributes.countdownWrapper;
		var expiredArg = attributes.expiredArg;
		var dateCountdown = attributes.dateCountdown;
		var scheduleTime = attributes.scheduleTime;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var icon = attributes.icon;
		var separator = attributes.separator;
		var label = attributes.label;
		var count = attributes.count;
		var prefix = attributes.prefix;
		var postfix = attributes.postfix;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const countdownWrapperSelector = blockClass + " .countdown-wrapper";
		const labelSelector = blockClass + " .label";
		const countSelector = blockClass + " .count";
		const prefixSelector = blockClass + " .prefix";
		const postfixSelector = blockClass + " .postfix";
		const iconSelector = blockClass + " .date-countdown-icon";
		var innerSelector = blockClass + " .inner";
		// day hours minutes seconds
		var separatorSelector = blockClass + " .separator";
		var itemsSelector = blockClass + " .items";
		var secondWrapSelector = blockClass + " .second-wrapper";
		var secondSelector = blockClass + " .second-countdown";
		var minuteWrapSelector = blockClass + " .minute-wrapper";
		var minuteSelector = blockClass + " .minute-countdown";
		var hourWrapSelector = blockClass + " .hour-wrapper";
		var hourSelector = blockClass + " .hour-countdown";
		var dayWrapSelector = blockClass + " .day-wrapper";
		var daySelector = blockClass + " .day-countdown";
		const innerEnable =
			inner.options.enable == undefined ? true : inner.options.enable;
		const secondEnable =
			second.options.enable == undefined ? true : second.options.enable;
		const minuteEnable =
			minute.options.enable == undefined ? true : minute.options.enable;
		const hourEnable =
			hour.options.enable == undefined ? true : hour.options.enable;
		const dayEnable =
			day.options.enable == undefined ? true : day.options.enable;
		const iconEnable =
			icon.options.enable == undefined ? true : icon.options.enable;
		const separatorEnable =
			separator.options.enable == undefined ? true : separator.options.enable;
		const labelEnable =
			label.options.enable == undefined ? true : label.options.enable;
		const prefixEnable =
			prefix.options.enable == undefined ? true : prefix.options.enable;
		const postfixEnable =
			postfix.options.enable == undefined ? true : postfix.options.enable;
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		var scheduleTimeSet = [
			{
				id: "startTime",
				value: "",
			},
			{
				id: "endTime",
				value: "",
			},
		];
		var dateCountdownStartDateSourceBasic = {
			none: { label: __("Choose", "combo-blocks"), value: "" },
			wc_sale_price_date_from: {
				label: __("Sale Start Date", "combo-blocks"),
				value: "wc_sale_price_date_from",
				isPro: true,
			},
		};
		let startDateSource = applyFilters(
			"comboBlocksDateCountdownStartDate",
			dateCountdownStartDateSourceBasic
		);
		var dateCountdownEndDateSourceBasic = {
			none: { label: __("Choose", "combo-blocks"), value: "" },
			wc_sale_price_date_to: {
				label: __("Sale End Date", "combo-blocks"),
				value: "wc_sale_price_date_to",
				isPro: true,
			},
		};
		function setStartDateSrc(option, index) {
			var options = {
				...dateCountdown.options,
				startDateSrc: option.value,
			};
			setAttributes({
				dateCountdown: { ...dateCountdown, options: options },
			});
		}
		function setEndDateSrc(option, index) {
			var options = {
				...dateCountdown.options,
				endDateSrc: option.value,
			};
			setAttributes({
				dateCountdown: { ...dateCountdown, options: options },
			});
		}
		let endDateSource = applyFilters(
			"comboBlocksDateCountdownEndDate",
			dateCountdownEndDateSourceBasic
		);
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
				var dateCountdownX = attributes.dateCountdown;
				var scheduleTimeX = attributes.scheduleTime;
				var countdownWrapperX = attributes.countdownWrapper;
				var innerX = attributes.inner;
				var itemsX = attributes.items;
				var secondWrapX = attributes.secondWrap;
				var secondX = attributes.second;
				var minuteWrapX = attributes.minuteWrap;
				var minuteX = attributes.minute;
				var hourWrapX = attributes.hourWrap;
				var hourX = attributes.hour;
				var dayWrapX = attributes.dayWrap;
				var dayX = attributes.day;
				var iconX = attributes.icon;
				var separatorX = attributes.separator;
				var labelX = attributes.label;
				var countX = attributes.count;
				var prefixX = attributes.prefix;
				var postfixX = attributes.postfix;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (countdownWrapperX != undefined) {
					var countdownWrapperY = {
						...countdownWrapperX,
						options: countdownWrapper.options,
					};
					setAttributes({ countdownWrapper: countdownWrapperY });
					blockCssObj[countdownWrapperSelector] = countdownWrapperY;
				}
				if (innerX != undefined) {
					var innerY = { ...innerX, options: inner.options };
					setAttributes({ inner: innerY });
					blockCssObj[innerSelector] = innerY;
				}
				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
				}
				if (secondWrapX != undefined) {
					var secondWrapY = { ...secondWrapX, options: secondWrap.options };
					setAttributes({ secondWrap: secondWrapY });
					blockCssObj[secondWrapSelector] = secondWrapY;
				}
				if (secondX != undefined) {
					var secondY = { ...secondX, options: second.options };
					setAttributes({ second: secondY });
					blockCssObj[secondSelector] = secondY;
				}
				if (minuteWrapX != undefined) {
					var minuteWrapY = { ...minuteWrapX, options: minuteWrap.options };
					setAttributes({ minuteWrap: minuteWrapY });
					blockCssObj[minuteWrapSelector] = minuteWrapY;
				}
				if (minuteX != undefined) {
					var minuteY = { ...minuteX, options: minute.options };
					setAttributes({ minute: minuteY });
					blockCssObj[minuteSelector] = minuteY;
				}
				if (hourWrapX != undefined) {
					var hourWrapY = { ...hourWrapX, options: hourWrap.options };
					setAttributes({ hourWrap: hourWrapY });
					blockCssObj[hourWrapSelector] = hourWrapY;
				}
				if (hourX != undefined) {
					var hourY = { ...hourX, options: hour.options };
					setAttributes({ hour: hourY });
					blockCssObj[hourSelector] = hourY;
				}
				if (dayWrapX != undefined) {
					var dayWrapY = { ...dayWrapX, options: dayWrap.options };
					setAttributes({ dayWrap: dayWrapY });
					blockCssObj[dayWrapSelector] = dayWrapY;
				}
				if (dayX != undefined) {
					var dayY = { ...dayX, options: day.options };
					setAttributes({ day: dayY });
					blockCssObj[daySelector] = dayY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}
				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
				}
				if (countX != undefined) {
					var countY = { ...countX, options: count.options };
					setAttributes({ count: countY });
					blockCssObj[countSelector] = countY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (prefixX != undefined) {
					var prefixY = { ...prefixX, options: prefix.options };
					setAttributes({ prefix: prefixY });
					blockCssObj[prefixSelector] = prefixY;
				}
				if (postfixX != undefined) {
					var postfixY = { ...postfixX, options: postfix.options };
					setAttributes({ postfix: postfixY });
					blockCssObj[postfixSelector] = postfixY;
				}
				var blockCssRules = myStore.getBlockCssRules(blockCssObj);
				var cssStyle = blockCssRules;
				setAttributes({ blockCssY: { items: cssStyle } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}
		function addScheduleTime(option, index) {
			var scheduleTimeX = dateCountdown.scheduleTime.push(option);
			setAttributes({
				dateCountdown: {
					...dateCountdown,
					scheduleTime: dateCountdown.scheduleTime,
				},
			});
		}
		var scheduleArgsBasic = {
			startTime: {
				label: __("Start Time", "combo-blocks"),
				description: "Visible as soon as possible",
				args: { id: "startTime", value: "" },
			},
			EndTime: {
				label: __("End Time", "combo-blocks"),
				description: "Visible as soon as possible",
				args: { id: "EndTime", value: "" },
			},
		};
		let scheduleArgs = applyFilters("scheduleArgs", scheduleArgsBasic);
		var dateCountdownExpiredArgsBasic = {
			redirectURL: {
				label: __("Redirect URL", "combo-blocks"),
				description: "Redirect to a URL as soon as possible.",
				args: { id: "redirectURL", value: "", url: "", delay: "" },
			},
			showExpiredMsg: {
				label: __("Show Expired Message", "combo-blocks"),
				description: "Visible as soon as possible",
				args: { id: "showExpiredMsg" },
			},
			hideCountdown: {
				label: __("Hide Countdown", "combo-blocks"),
				description: "Countdown will be hide.",
				args: { id: "hideCountdown" },
			},
			wcHideCartButton: {
				label: __("Hide Cart Button", "combo-blocks"),
				description: "On Expired Cart Button will be hide.",
				args: { id: "wcHideCartButton" },
				isPro: true,
			},
			showElement: {
				label: __("Show Element", "combo-blocks"),
				description: "Visible as soon as possible.",
				args: { id: "showElement", value: "" },
				isPro: true,
			},
			showPopup: {
				label: __("Show Popup", "combo-blocks"),
				description: "Popup will be visible.",
				args: { id: "showPopup" },
				isPro: true,
			},
		};
		let expiredArgs = applyFilters(
			"comboBlocksDateCountdownExpiredArgs",
			dateCountdownExpiredArgsBasic
		);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var visibleArgsBasic = {
			weekDays: {
				label: __("is Week day", "combo-blocks"),
				description: "Show when specific week days",
				args: { id: "weekDays", value: "", values: [], compare: "=" },
				isPro: true,
			},
		};
		let visibleArgs = applyFilters("pgFormvisibleArgs", visibleArgsBasic);
		var typeArgsBasic = {
			fixed: { label: __("Fixed", "combo-blocks"), value: "fixed" },
			everGreen: {
				label: __("Ever Green", "combo-blocks"),
				value: "everGreen",
				isPro: true,
			},
			scheduled: {
				label: __("Scheduled", "combo-blocks"),
				value: "scheduled",
				isPro: true,
			},
		};
		let typeArgs = applyFilters("pgDateCountdownTypes", typeArgsBasic);
		function setType(option, index) {
			var options = { ...dateCountdown.options, type: option.value };
			setAttributes({ dateCountdown: { ...dateCountdown, options: options } });
		}
		var weekDayNumn = {
			0: { label: __("Sunday", "combo-blocks"), value: 0 },
			1: { label: __("Monday", "combo-blocks"), value: 1 },
			2: { label: __("Tuesday", "combo-blocks"), value: 2 },
			3: { label: __("Wednesday", "combo-blocks"), value: 3 },
			4: { label: __("Thursday", "combo-blocks"), value: 4 },
			5: { label: __("Friday", "combo-blocks"), value: 5 },
			6: { label: __("Saturday", "combo-blocks"), value: 6 },
		};
		const [productData, setProductData] = useState(null);
		useEffect(() => {
			apiFetch({
				path: "/combo-blocks/v2/get_post_data",
				method: "POST",
				data: { postId: postId },
			}).then((res) => {
				setProductData(res);
			});
		}, []);
		const [remindTime, setRemindTime] = useState(0);
		const [remindDay, setRemindDay] = useState(0);
		const [remindHour, setRemindHour] = useState(0);
		const [remindMinute, setRemindMinute] = useState(0);
		const [remindSecond, setRemindSecond] = useState(0);
		useEffect(() => {
			const dateInput1 = dateCountdown.options.startDate;
			const dateInput2 = dateCountdown.options.endDate;
			const currentDate = new Date();
			if (dateInput1.length == 0 || dateInput2.length == 0) {
				return;
			}
			var date1 = "";
			var date2 = "";
			var startDate = "";
			if (dateCountdown.options.startDateSrc?.length == 0) {
				date1 = new Date(dateInput1);
			} else {
				date1 =
					productData?.date_on_sale_from != null
						? new Date(productData.date_on_sale_from.date)
						: new Date(dateInput1);
			}
			if (dateCountdown.options.endDateSrc.length == 0) {
				date2 = new Date(dateInput2);
			} else {
				date2 =
					productData?.date_on_sale_to != null
						? new Date(productData.date_on_sale_to.date)
						: new Date(dateInput2);
			}
			if (currentDate > date1) {
				startDate = currentDate;
			} else if (currentDate < date1) {
				startDate = currentDate;
			} else {
				startDate = date1;
			}
			const timeDifference = date2 - startDate;
			setRemindTime(timeDifference);
			if (currentDate < date1) {
				setRemindTime(0);
			}
		}, [
			clientId,
			dateCountdown.options.startDate,
			dateCountdown.options.startDateSrc,
			dateCountdown.options.endDateSrc,
			dateCountdown.options.endDate,
		]);
		useEffect(() => {
			if (remindTime > 0) {
				const intervalId = setInterval(() => {
					const remindTimeX = remindTime - 1000;
					setRemindTime(remindTimeX);
					const days = Math.floor(remindTimeX / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(remindTimeX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(remindTimeX % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((remindTimeX % (1000 * 60)) / 1000);
					const formattedDays = String(days).padStart(2, "0");
					const formattedHours = String(hours).padStart(2, "0");
					const formattedMinutes = String(minutes).padStart(2, "0");
					const formattedSeconds = String(seconds).padStart(2, "0");
					setRemindDay(formattedDays);
					setRemindHour(formattedHours);
					setRemindMinute(formattedMinutes);
					setRemindSecond(formattedSeconds);
					if (remindTimeX <= 0) {
						clearInterval(intervalId);
					}
				}, 1000);
				return () => clearInterval(intervalId);
			}
		}, [
			remindTime,
			dateCountdown.options.startDate,
			dateCountdown.options.endDate,
		]);
		// day hours minutes seconds
		// Ever Green Start
		const [remindTimes, setRemindTimes] = useState(0);
		const [remindDays, setRemindDays] = useState(0);
		const [remindHours, setRemindHours] = useState(0);
		const [remindMinutes, setRemindMinutes] = useState(0);
		const [remindSeconds, setRemindSeconds] = useState(0);
		useEffect(() => {
			const days = dateCountdown.options.everGreenTime.day;
			const hours = dateCountdown.options.everGreenTime.hour;
			const minutes = dateCountdown.options.everGreenTime.minute;
			const currentTime = new Date().getTime();
			const endTime =
				currentTime +
				days * 24 * 60 * 60 * 1000 +
				hours * 60 * 60 * 1000 +
				minutes * 60 * 1000;
			const duration = endTime - currentTime;
			setRemindTimes(duration);
		}, [dateCountdown.options.everGreenTime]);
		useEffect(() => {
			if (remindTimes > 0) {
				const intervalId = setInterval(() => {
					const remindTimesX = remindTimes - 1000;
					setRemindTimes(remindTimesX);
					const days = Math.floor(remindTimesX / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(remindTimesX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(remindTimesX % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((remindTimesX % (1000 * 60)) / 1000);
					const formattedDays = String(days).padStart(2, "0");
					const formattedHours = String(hours).padStart(2, "0");
					const formattedMinutes = String(minutes).padStart(2, "0");
					const formattedSeconds = String(seconds).padStart(2, "0");
					setRemindDays(formattedDays);
					setRemindHours(formattedHours);
					setRemindMinutes(formattedMinutes);
					setRemindSeconds(formattedSeconds);
				}, 1000);
				return () => clearInterval(intervalId);
			}
		}, [remindTimes]);
		// Ever Green End
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
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				wrapper[sudoSource] = sudoSourceArgs;
			});
			var wrapperX = Object.assign({}, wrapper);
			setAttributes({ wrapper: wrapperX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					wrapperSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryCountdownWrapper(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				countdownWrapper[sudoSource] = sudoSourceArgs;
			});
			var countdownWrapperX = Object.assign({}, countdownWrapper);
			setAttributes({ countdownWrapper: countdownWrapperX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					countdownWrapperSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryInner(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				inner[sudoSource] = sudoSourceArgs;
			});
			var innerX = Object.assign({}, inner);
			setAttributes({ inner: innerX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					innerSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		// css library date countdown
		function onPickCssLibraryItems(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				items[sudoSource] = sudoSourceArgs;
			});
			var itemsX = Object.assign({}, items);
			setAttributes({ items: itemsX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					itemsSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibrarySecondWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				secondWrap[sudoSource] = sudoSourceArgs;
			});
			var secondWrapX = Object.assign({}, secondWrap);
			setAttributes({ secondWrap: secondWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					secondWrapSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibrarySecondCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				second[sudoSource] = sudoSourceArgs;
			});
			var secondX = Object.assign({}, second);
			setAttributes({ second: secondX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					secondSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryMinuteWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				minuteWrap[sudoSource] = sudoSourceArgs;
			});
			var minuteWrapX = Object.assign({}, minuteWrap);
			setAttributes({ minuteWrap: minuteWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					minuteWrapSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryMinuteCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				minute[sudoSource] = sudoSourceArgs;
			});
			var minuteX = Object.assign({}, minute);
			setAttributes({ minute: minuteX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					minuteSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryHourWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				hourWrap[sudoSource] = sudoSourceArgs;
			});
			var hourWrapX = Object.assign({}, hourWrap);
			setAttributes({ hourWrap: hourWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					hourWrapSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryHourCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				hour[sudoSource] = sudoSourceArgs;
			});
			var hourX = Object.assign({}, hour);
			setAttributes({ hour: hourX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					hourSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryDayWrap(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				dayWrap[sudoSource] = sudoSourceArgs;
			});
			var dayWrapX = Object.assign({}, dayWrap);
			setAttributes({ dayWrap: dayWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					dayWrapSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryDayCountdown(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				day[sudoSource] = sudoSourceArgs;
			});
			var dayX = Object.assign({}, day);
			setAttributes({ day: dayX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					daySelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibrarySeparator(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				separator[sudoSource] = sudoSourceArgs;
			});
			var separatorX = Object.assign({}, separator);
			setAttributes({ separator: separatorX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					separatorSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		// css library date countdown  end
		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				icon[sudoSource] = sudoSourceArgs;
			});
			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					iconSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryLabel(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				label[sudoSource] = sudoSourceArgs;
			});
			var labelX = Object.assign({}, label);
			setAttributes({ label: labelX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					labelSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryCount(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				count[sudoSource] = sudoSourceArgs;
			});
			var countX = Object.assign({}, count);
			setAttributes({ count: countX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					countSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryPrefix(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				prefix[sudoSource] = sudoSourceArgs;
			});
			var prefixX = Object.assign({}, prefix);
			setAttributes({ prefix: prefixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					prefixSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onPickCssLibraryPostfix(args) {
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				postfix[sudoSource] = sudoSourceArgs;
			});
			var postfixX = Object.assign({}, postfix);
			setAttributes({ postfix: postfixX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoSource = x[0];
				var sudoSourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoSource,
					postfixSelector
				);
				var sudoObj = {};
				Object.entries(sudoSourceArgs).map((y) => {
					var cssProperty = y[0];
					var cssPropertyVal = y[1];
					var cssPropertyKey = myStore.cssAttrParse(cssProperty);
					sudoObj[cssPropertyKey] = cssPropertyVal;
				});
				styleObj[elementSelector] = sudoObj;
			});
			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		var RemoveScheduleArgGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var scheduleX = { ...scheduleArg };
							delete scheduleX[index];
							setAttributes({ scheduleArg: scheduleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveScheduleArgArgs = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var scheduleArgX = { ...scheduleArg };
							scheduleArgX[groupId].args.splice(index, 1);
							setAttributes({ scheduleArg: scheduleArgX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveExpiredArgGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var expiredArgX = { ...expiredArg };
							delete expiredArgX[index];
							setAttributes({ expiredArg: expiredArgX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveExpiredArgArgs = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var expiredArgX = { ...expiredArg };
							expiredArgX[groupId].args.splice(index, 1);
							setAttributes({ expiredArg: expiredArgX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		function onChangeStyleWrapper(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ wrapper: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				wrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleWrapper(sudoSource, key) {
			let obj = { ...wrapper };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ wrapper: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				wrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleCountdownWrapper(sudoSource, key) {
			let obj = { ...countdownWrapper };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ countdownWrapper: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countdownWrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleInner(sudoSource, key) {
			let obj = { ...inner };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ inner: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				innerSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleItems(sudoSource, key) {
			let obj = { ...items };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ items: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				itemsSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleSecondWrap(sudoSource, key) {
			let obj = { ...secondWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ secondWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleSecondCountdown(sudoSource, key) {
			let obj = { ...second };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ second: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleMinuteWrap(sudoSource, key) {
			let obj = { ...minuteWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ minuteWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleMinuteCountdown(sudoSource, key) {
			let obj = { ...minute };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ minute: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleHourWrap(sudoSource, key) {
			let obj = { ...hourWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ hourWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleHourCountdown(sudoSource, key) {
			let obj = { ...hour };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ hour: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleDayWrap(sudoSource, key) {
			let obj = { ...dayWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ dayWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				dayWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleDayCountdown(sudoSource, key) {
			let obj = { ...day };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ day: objectX });
			var elementSelector = myStore.getElementSelector(sudoSource, daySelector);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleSeparator(sudoSource, key) {
			let obj = { ...separator };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ separator: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				separatorSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleIcon(sudoSource, key) {
			let obj = { ...icon };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ icon: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				iconSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleLabel(sudoSource, key) {
			let obj = { ...label };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ label: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				labelSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleCount(sudoSource, key) {
			let obj = { ...count };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ count: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStylePrefix(sudoSource, key) {
			let obj = { ...prefix };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ prefix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				prefixSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStylePostfix(sudoSource, key) {
			let obj = { ...postfix };
			var object = myStore.deletePropertyDeep(obj, [
				sudoSource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoSource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoSource, key])
				: object;
			setAttributes({ postfix: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				postfixSelector
			);
			var cssProperty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssProperty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssProperty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssProperty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}

		function onAddStyleWrapper(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}
		function onChangeStyleCountdownWrapper(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, countdownWrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ countdownWrapper: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countdownWrapperSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleCountdownWrapper(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, countdownWrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ countdownWrapper: object });
		}
		function onChangeStyleInner(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ inner: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				innerSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleInner(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, inner);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ inner: object });
		}
		// Css edit
		// items style functions
		// items style functions end
		function onChangeStyleItems(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ items: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				itemsSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleItems(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
		}
		// items style functions end
		// second style function
		// second wrap
		function onChangeStyleSecondWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, secondWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ secondWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleSecondWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, secondWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ secondWrap: object });
		}
		// second count
		function onChangeStyleSecondCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, second);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ second: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				secondSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleSecondCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, second);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ second: object });
		}
		// second style function end
		// minute style function
		// minute count wrap
		function onChangeStyleMinuteWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, minuteWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ minuteWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleMinuteWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, minuteWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ minuteWrap: object });
		}
		// minute count
		function onChangeStyleMinuteCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, minute);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ minute: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				minuteSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleMinuteCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, minute);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ minute: object });
		}
		// minute style function end
		// hour style function
		// hour wrap
		function onChangeStyleHourWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, hourWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ hourWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleHourWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, hourWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ hourWrap: object });
		}
		// hour count
		function onChangeStyleHourCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, hour);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ hour: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				hourSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleHourCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, hour);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ hour: object });
		}
		// hour style function end
		// day style function
		// day wrap
		function onChangeStyleDayWrap(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, dayWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ dayWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				dayWrapSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleDayWrap(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, dayWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ dayWrap: object });
		}
		// day count
		function onChangeStyleDayCountdown(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, day);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ day: object });
			var elementSelector = myStore.getElementSelector(sudoSource, daySelector);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleDayCountdown(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, day);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ day: object });
		}
		// day style function end
		// Separator style functions
		function onChangeStyleSeparator(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ separator: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				separatorSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleSeparator(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ separator: object });
		}
		// Css edit
		function onChangeStyleIcon(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ icon: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				iconSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleIcon(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}
		function onChangeStyleLabel(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ label: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				labelSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleLabel(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}
		// count
		function onChangeStyleCount(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ count: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				countSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStyleCount(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ count: object });
		}
		// count
		function onChangeStylePrefix(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ prefix: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				prefixSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStylePrefix(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, prefix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ prefix: object });
		}
		function onChangeStylePostfix(sudoSource, newVal, attr) {
			var path = [sudoSource, attr, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postfix: object });
			var elementSelector = myStore.getElementSelector(
				sudoSource,
				postfixSelector
			);
			var cssProperty = myStore.cssAttrParse(attr);
			let itemsX = Object.assign({}, blockCssY.items);
			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}
			var cssPath = [elementSelector, cssProperty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);
			setAttributes({ blockCssY: { items: cssItems } });
		}
		function onAddStylePostfix(sudoSource, key) {
			var path = [sudoSource, key, breakPointX];
			let obj = Object.assign({}, postfix);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postfix: object });
		}
		// add bulk style start
		function onBulkAddWrapper(sudoSource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoSource] = cssObj;
			setAttributes({ wrapper: obj });
			var selector = myStore.getElementSelector(sudoSource, wrapperSelector);
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
		function onBulkAddCountdownWrapper(sudoSource, cssObj) {
			let obj = Object.assign({}, countdownWrapper);
			obj[sudoSource] = cssObj;
			setAttributes({ countdownWrapper: obj });
			var selector = myStore.getElementSelector(
				sudoSource,
				countdownWrapperSelector
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
		function onBulkAddInner(sudoSource, cssObj) {
			let obj = Object.assign({}, inner);
			obj[sudoSource] = cssObj;
			setAttributes({ inner: obj });
			var selector = myStore.getElementSelector(sudoSource, innerSelector);
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
		function onBulkAddItems(sudoSource, cssObj) {
			let obj = Object.assign({}, items);
			obj[sudoSource] = cssObj;
			setAttributes({ items: obj });
			var selector = myStore.getElementSelector(sudoSource, itemsSelector);
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
		function onBulkAddSecondWrap(sudoSource, cssObj) {
			let obj = Object.assign({}, secondWrap);
			obj[sudoSource] = cssObj;
			setAttributes({ secondWrap: obj });
			var selector = myStore.getElementSelector(sudoSource, secondWrapSelector);
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
		function onBulkAddSecond(sudoSource, cssObj) {
			let obj = Object.assign({}, second);
			obj[sudoSource] = cssObj;
			setAttributes({ second: obj });
			var selector = myStore.getElementSelector(sudoSource, secondSelector);
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
		function onBulkAddMinuteWrap(sudoSource, cssObj) {
			let obj = Object.assign({}, minuteWrap);
			obj[sudoSource] = cssObj;
			setAttributes({ minuteWrap: obj });
			var selector = myStore.getElementSelector(sudoSource, minuteWrapSelector);
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
		function onBulkAddMinute(sudoSource, cssObj) {
			let obj = Object.assign({}, minute);
			obj[sudoSource] = cssObj;
			setAttributes({ minute: obj });
			var selector = myStore.getElementSelector(sudoSource, minuteSelector);
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
		function onBulkAddHourWrap(sudoSource, cssObj) {
			let obj = Object.assign({}, hourWrap);
			obj[sudoSource] = cssObj;
			setAttributes({ hourWrap: obj });
			var selector = myStore.getElementSelector(sudoSource, hourWrapSelector);
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
		function onBulkAddHour(sudoSource, cssObj) {
			let obj = Object.assign({}, hour);
			obj[sudoSource] = cssObj;
			setAttributes({ hour: obj });
			var selector = myStore.getElementSelector(sudoSource, hourSelector);
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
		function onBulkAddDayWrap(sudoSource, cssObj) {
			let obj = Object.assign({}, dayWrap);
			obj[sudoSource] = cssObj;
			setAttributes({ dayWrap: obj });
			var selector = myStore.getElementSelector(sudoSource, dayWrapSelector);
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
		function onBulkAddDay(sudoSource, cssObj) {
			let obj = Object.assign({}, day);
			obj[sudoSource] = cssObj;
			setAttributes({ day: obj });
			var selector = myStore.getElementSelector(sudoSource, daySelector);
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
		function onBulkAddIcon(sudoSource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoSource] = cssObj;
			setAttributes({ icon: obj });
			var selector = myStore.getElementSelector(sudoSource, iconSelector);
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
		function onBulkAddSeparator(sudoSource, cssObj) {
			let obj = Object.assign({}, separator);
			obj[sudoSource] = cssObj;
			setAttributes({ separator: obj });
			var selector = myStore.getElementSelector(sudoSource, separatorSelector);
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
		function onBulkAddLabel(sudoSource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoSource] = cssObj;
			setAttributes({ label: obj });
			var selector = myStore.getElementSelector(sudoSource, labelSelector);
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
		function onBulkAddCount(sudoSource, cssObj) {
			let obj = Object.assign({}, count);
			obj[sudoSource] = cssObj;
			setAttributes({ count: obj });
			var selector = myStore.getElementSelector(sudoSource, countSelector);
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
		function onBulkAddPrefix(sudoSource, cssObj) {
			let obj = Object.assign({}, prefix);
			obj[sudoSource] = cssObj;
			setAttributes({ prefix: obj });
			var selector = myStore.getElementSelector(sudoSource, prefixSelector);
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
		function onBulkAddPostfix(sudoSource, cssObj) {
			let obj = Object.assign({}, postfix);
			obj[sudoSource] = cssObj;
			setAttributes({ postfix: obj });
			var selector = myStore.getElementSelector(sudoSource, postfixSelector);
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
		// add bulk style end
		// reset style start
		function onResetWrapper(sudoSources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
		function onResetCountdownWrapper(sudoSources) {
			let obj = Object.assign({}, countdownWrapper);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						countdownWrapperSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ countdownWrapper: obj });
		}
		function onResetInner(sudoSources) {
			let obj = Object.assign({}, inner);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
		function onResetItems(sudoSources) {
			let obj = Object.assign({}, items);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						itemsSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ items: obj });
		}
		function onResetSecondWrap(sudoSources) {
			let obj = Object.assign({}, secondWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						secondWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ secondWrap: obj });
		}
		function onResetSecond(sudoSources) {
			let obj = Object.assign({}, second);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						secondSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ second: obj });
		}
		function onResetMinuteWrap(sudoSources) {
			let obj = Object.assign({}, minuteWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						minuteWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ minuteWrap: obj });
		}
		function onResetMinute(sudoSources) {
			let obj = Object.assign({}, minute);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						minuteSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ minute: obj });
		}
		function onResetHourWrap(sudoSources) {
			let obj = Object.assign({}, hourWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						hourWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ hourWrap: obj });
		}
		function onResetHour(sudoSources) {
			let obj = Object.assign({}, hour);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						hourSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ hour: obj });
		}
		function onResetDayWrap(sudoSources) {
			let obj = Object.assign({}, dayWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						dayWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ dayWrap: obj });
		}
		function onResetDay(sudoSources) {
			let obj = Object.assign({}, day);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						daySelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ day: obj });
		}
		function onResetIcon(sudoSources) {
			let obj = Object.assign({}, icon);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
		function onResetSeparator(sudoSources) {
			let obj = Object.assign({}, separator);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						separatorSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ separator: obj });
		}
		function onResetLabel(sudoSources) {
			let obj = Object.assign({}, label);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
		function onResetCount(sudoSources) {
			let obj = Object.assign({}, count);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
						countSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ count: obj });
		}
		function onResetPrefix(sudoSources) {
			let obj = Object.assign({}, prefix);
			Object.entries(sudoSources).map((args) => {
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
				var sudoSource = args[0];
				if (obj[sudoSource] == undefined) {
				} else {
					obj[sudoSource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoSource,
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
		// reset style end
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
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[countdownWrapperSelector] = countdownWrapper;
			blockCssObj[labelSelector] = label;
			blockCssObj[iconSelector] = icon;
			blockCssObj[innerSelector] = inner;
			blockCssObj[prefixSelector] = prefix;
			blockCssObj[postfixSelector] = postfix;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[itemsSelector] = items;
			blockCssObj[secondWrapSelector] = secondWrap;
			blockCssObj[secondSelector] = second;
			blockCssObj[minuteWrapSelector] = minuteWrap;
			blockCssObj[minuteSelector] = minute;
			blockCssObj[hourWrapSelector] = hourWrap;
			blockCssObj[hourSelector] = hour;
			blockCssObj[dayWrapSelector] = dayWrap;
			blockCssObj[daySelector] = day;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => { }, [second]);
		const CustomTagWrapper = `${wrapper.options.tag}`;
		const CustomTagPostTitle = `${second.options.tag}`;
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
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
						<div className="pb-3 px-3 mb-4">
							<PanelRow className="my-4">
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Date Countdown Type", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									// variant="secondary"
									buttonTitle={
										typeArgs[
											dateCountdown.options == undefined
												? dateCountdown.type
												: dateCountdown.options.type
										] == undefined
											? __("Choose", "combo-blocks")
											: typeArgs[
												dateCountdown.options == undefined
													? dateCountdown.type
													: dateCountdown.options.type
											].label
									}
									options={typeArgs}
									onChange={setType}
									value={[]}
								/>
							</PanelRow>
							{dateCountdown.options.type == "fixed" && (
								<>
									{dateCountdown.options.startDateSrc?.length == 0 && (
										<PanelRow className="block mb-4">
											<label
												for=""
												className="font-medium text-slate-900 mb-2 ">
												{__("Start Date?", "combo-blocks")}
											</label>
											<br />
											<PGDatePicker
												label={__("Select Date", "combo-blocks")}
												date={dateCountdown.options?.startDate}
												onChange={(newVal) => {
													let length = newVal.length;
													let result = newVal.substr(0, length - 3);
													var options = {
														...dateCountdown.options,
														startDate: result,
													};
													setAttributes({
														dateCountdown: {
															...dateCountdown,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Start Date Source", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={startDateSource}
											buttonTitle={
												dateCountdown.options.startDateSrc == undefined ||
													dateCountdown.options.startDateSrc.length == 0
													? __("Choose", "combo-blocks")
													: startDateSource[
														dateCountdown.options.startDateSrc
													] == undefined
														? __("Choose", "combo-blocks")
														: startDateSource[dateCountdown.options.startDateSrc]
															.label
											}
											onChange={setStartDateSrc}
											values={[]}></PGDropdown>
									</PanelRow>
									{dateCountdown.options.endDateSrc.length == 0 && (
										<PanelRow className="block mb-2">
											<label
												for=""
												className="font-medium text-slate-900 mb-2 ">
												{__("End Date?", "combo-blocks")}
											</label>
											<PGDatePicker
												label="Select Date"
												date={dateCountdown.options?.endDate}
												onChange={(newVal) => {
													let length = newVal.length;
													let result = newVal.substr(0, length - 3);
													var options = {
														...dateCountdown.options,
														endDate: result,
													};
													setAttributes({
														dateCountdown: {
															...dateCountdown,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
									)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("End Date Source", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={endDateSource}
											buttonTitle={
												dateCountdown.options.endDateSrc == undefined ||
													dateCountdown.options.endDateSrc.length == 0
													? __("Choose", "combo-blocks")
													: endDateSource[dateCountdown.options.endDateSrc] ==
														undefined
														? __("Choose", "combo-blocks")
														: endDateSource[dateCountdown.options.endDateSrc]
															.label
											}
											onChange={setEndDateSrc}
											values={[]}></PGDropdown>
									</PanelRow>
								</>
							)}
							{dateCountdown.options.type == "everGreen" && (
								<>
									<PanelRow className="mb-4">
										<InputControl
											label="Day"
											type="number"
											className="mr-2"
											placeholder="Enter Day"
											value={dateCountdown.options.everGreenTime.day}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													day: newVal,
												};
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>
										<InputControl
											label="Hour"
											type="number"
											className="mr-2"
											placeholder="Enter Hour"
											value={dateCountdown.options.everGreenTime.hour}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													hour: newVal,
												};
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>
										<InputControl
											label="Minute"
											type="number"
											className="mr-2"
											placeholder="Enter Minute"
											value={dateCountdown.options.everGreenTime.minute}
											onChange={(newVal) => {
												var options = {
													...dateCountdown.options,
													durationMinute: newVal,
												};
												var everGreenTimeX = {
													...options.everGreenTime,
													minute: newVal,
												};
												var optionX = {
													...options,
													everGreenTime: everGreenTimeX,
												};
												setAttributes({
													dateCountdown: { ...dateCountdown, options: optionX },
												});
											}}
										/>
									</PanelRow>
								</>
							)}
							{dateCountdown.options.type == "scheduled" && (
								<>
									<PanelRow className="my-4">
										<div
											className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												var scheduleTimeX = scheduleTime.concat({
													startTime: "",
													endTime: "",
													weekdays: {
														value: "0",
														values: [],
														compare: "=",
													},
												});
												setAttributes({ scheduleTime: scheduleTimeX });
											}}>
											{__("Add Schedule Time", "combo-blocks")}
										</div>
									</PanelRow>
									{scheduleTime.length == 0 && (
										<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
											{__("No Schedule added", "combo-blocks")}
										</div>
									)}
									<ReactSortable
										list={scheduleTime}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ scheduleTime: scheduleTime });
										}}>
										{scheduleTime.map((item, index) => (
											<div key={item.id} className="">
												<PGtoggle
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var scheduleTimeX = [...scheduleTime];
																	scheduleTimeX.splice(index, 1);
																	setAttributes({
																		scheduleTime: scheduleTimeX,
																	});
																}}>
																<Icon icon={close} />
															</span>
															<span className="handle cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon icon={menu} />
															</span>
															{index}
														</>
													}
													initialOpen={false}>
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Start Time", "combo-blocks")}
														</label>
														<InputControl
															type="time"
															value={item.startTime}
															onChange={(newVal) => {
																var scheduleTimeX = [...scheduleTime];
																scheduleTimeX[index].startTime = newVal;
																setAttributes({
																	scheduleTime: scheduleTimeX,
																});
															}}
														/>
													</PanelRow>
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("End Time", "combo-blocks")}
														</label>
														<InputControl
															type="time"
															value={item.endTime}
															onChange={(newVal) => {
																var scheduleTimeX = [...scheduleTime];
																scheduleTimeX[index].endTime = newVal;
																setAttributes({
																	scheduleTime: scheduleTimeX,
																});
															}}
														/>
													</PanelRow>
													<>
														<>
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Compare", "combo-blocks")}
																</label>
																<SelectControl
																	label=""
																	value={item.weekdays?.compare}
																	options={[
																		{ label: "=", value: "=" },
																		{ label: "!=", value: "!=" },
																		{ label: ">", value: ">" },
																		{ label: "<", value: "<" },
																		{ label: ">=", value: ">=" },
																		{ label: "<=", value: "<=" },
																		{ label: "between", value: "between" },
																		{ label: "exist", value: "exist" },
																	]}
																	onChange={(newVal) => {
																		var scheduleTimeX = [...scheduleTime];
																		scheduleTimeX[index].weekdays.compare =
																			newVal;
																		setAttributes({
																			scheduleTime: scheduleTimeX,
																		});
																	}}
																/>
															</PanelRow>
															{(item.weekdays?.compare == "=" ||
																item.weekdays?.compare == "!=" ||
																item.weekdays?.compare == ">" ||
																item.weekdays?.compare == "<" ||
																item.weekdays?.compare == ">=" ||
																item.weekdays?.compare == "<=") && (
																	<>
																		<PanelRow className="mb-4">
																			<label
																				htmlFor=""
																				className="font-medium text-slate-900 ">
																				{__("Values", "combo-blocks")}
																			</label>
																			<PGDropdown
																				position="bottom right"
																				variant="secondary"
																				buttonTitle={
																					item.weekdays?.value?.length == 0
																						? __("Choose Day", "combo-blocks")
																						: weekDayNumn[item.weekdays?.value]
																							?.label
																				}
																				options={[
																					{
																						label: __("Sunday", "combo-blocks"),
																						value: 0,
																					},
																					{
																						label: __("Monday", "combo-blocks"),
																						value: 1,
																					},
																					{
																						label: __("Tuesday", "combo-blocks"),
																						value: 2,
																					},
																					{
																						label: __("Wednesday", "combo-blocks"),
																						value: 3,
																					},
																					{
																						label: __("Thursday", "combo-blocks"),
																						value: 4,
																					},
																					{
																						label: __("Friday", "combo-blocks"),
																						value: 5,
																					},
																					{
																						label: __("Saturday", "combo-blocks"),
																						value: 6,
																					},
																				]}
																				onChange={(newVal) => {
																					var scheduleTimeX = [...scheduleTime];
																					scheduleTimeX[index].weekdays.value =
																						newVal.value;
																					setAttributes({
																						scheduleTime: scheduleTimeX,
																					});
																				}}
																				value={item.weekdays.value}></PGDropdown>
																		</PanelRow>
																	</>
																)}
															{(item.weekdays?.compare == "between" ||
																item.weekdays?.compare == "exist") && (
																	<>
																		<PanelRow className="mb-4">
																			<label htmlFor="">
																				{__("Values", "combo-blocks")}
																			</label>
																			<PGDropdown
																				position="bottom right"
																				variant="secondary"
																				buttonTitle={"Choose Days"}
																				options={[
																					{
																						label: __("Sunday", "combo-blocks"),
																						value: 0,
																					},
																					{
																						label: __("Monday", "combo-blocks"),
																						value: 1,
																					},
																					{
																						label: __("Tuesday", "combo-blocks"),
																						value: 2,
																					},
																					{
																						label: __("Wednesday", "combo-blocks"),
																						value: 3,
																					},
																					{
																						label: __("Thursday", "combo-blocks"),
																						value: 4,
																					},
																					{
																						label: __("Friday", "combo-blocks"),
																						value: 5,
																					},
																					{
																						label: __("Saturday", "combo-blocks"),
																						value: 6,
																					},
																				]}
																				onChange={(newVal) => {
																					var scheduleTimeX = [...scheduleTime];
																					if (
																						scheduleTimeX[
																							index
																						].weekdays.values.includes(
																							newVal.value
																						)
																					) {
																						// Remove the value if already selected
																						scheduleTimeX[index].weekdays.values =
																							scheduleTimeX[
																								index
																							].weekdays.values.filter(
																								(value) => value !== newVal.value
																							);
																					} else {
																						// Add the value if not already selected
																						scheduleTimeX[
																							index
																						].weekdays.values.push(newVal.value);
																					}
																					setAttributes({
																						scheduleTime: scheduleTimeX,
																					});
																				}}
																				value={item.weekdays.values}></PGDropdown>
																		</PanelRow>
																		<br />
																		<div>
																			{item.weekdays.values.map((x, i) => {
																				return (
																					<div
																						className="flex justify-between my-1"
																						key={i}>
																						<span>{weekDayNumn[x].label}</span>
																						<span
																							className="bg-red-500 text-white p-1 cursor-pointer hover:"
																							onClick={(ev) => {
																								var scheduleTimeX = [
																									...scheduleTime,
																								];
																								// Remove the value when the "X" is clicked
																								scheduleTimeX[
																									index
																								].weekdays.values = scheduleTimeX[
																									index
																								].weekdays.values.filter(
																									(value) => value !== x
																								);
																								setAttributes({
																									scheduleTime: scheduleTimeX,
																								});
																							}}>
																							<Icon fill="#fff" icon={close} />
																						</span>
																					</div>
																				);
																			})}
																		</div>
																	</>
																)}
														</>
													</>
												</PGtoggle>
											</div>
										))}
									</ReactSortable>
								</>
							)}
						</div>
						{/* // // visibility start */}
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Expired Arguments"
							initialOpen={true}>
							<div
								// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
								className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var expiredArgX = { ...expiredArg };
									var index = Object.entries(expiredArgX).length;
									expiredArgX[index] = { relation: "OR", title: "", args: [] };
									setAttributes({ expiredArg: expiredArgX });
								}}>
								{__("Add Group", "combo-blocks")}
							</div>
							<div className="my-4">
								{Object.entries(expiredArg).map((group, groupIndex) => {
									var groupId = group[0];
									var groupData = group[1];
									return (
										<PGtoggle
											title={
												<RemoveExpiredArgGroup
													title={groupIndex}
													index={groupId}
												/>
											}
											key={groupIndex}
											initialOpen={false}>
											<PanelRow className="my-3">
												<PGDropdown
													position="bottom right"
													variant="secondary"
													buttonTitle={"Add Condition"}
													options={expiredArgs}
													onChange={(option, index) => {
														var expiredArgX = { ...expiredArg };
														expiredArgX[groupId]["args"].push(option.args);
														setAttributes({ expiredArg: expiredArgX });
													}}
													values=""></PGDropdown>
											</PanelRow>
											{expiredArg[groupId]["args"] != undefined &&
												expiredArg[groupId]["args"].map((item, index) => {
													var id = item.id;
													return (
														<div key={index}>
															{id == "redirectURL" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Write URL", "combo-blocks")}
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder="Enter URL"
																				value={item.url}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].url = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																		{/* </div>
                                  <div> */}
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Delay", "combo-blocks")}
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder="Add delay in millisecond"
																				value={item.delay}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].delay = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																	</div>
																</PGtoggle>
															)}
															{id == "wcHideCartButton" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		{__(
																			"No Option available for this condition.",
																			"combo-blocks"
																		)}
																	</div>
																</PGtoggle>
															)}
															{id == "showExpiredMsg" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		{__(
																			"No Option available for this condition.",
																			"combo-blocks"
																		)}
																	</div>
																</PGtoggle>
															)}
															{id == "hideCountdown" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		{__(
																			"No Option available for this condition.",
																			"combo-blocks"
																		)}
																	</div>
																</PGtoggle>
															)}
															{id == "showElement" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		<PanelRow className="mb-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				ID/Class
																			</label>
																			<InputControl
																				className="mr-2"
																				placeholder=".element or #element"
																				value={item.value}
																				onChange={(newVal) => {
																					var expiredArgX = { ...expiredArg };
																					expiredArgX[groupId]["args"][
																						index
																					].value = newVal;
																					setAttributes({
																						expiredArg: expiredArgX,
																					});
																				}}
																			/>
																		</PanelRow>
																	</div>
																</PGtoggle>
															)}
															{id == "showPopup" && (
																<PGtoggle
																	title={
																		<RemoveExpiredArgArgs
																			title={
																				expiredArgs[id] == undefined
																					? id
																					: expiredArgs[id].label
																			}
																			index={index}
																			groupId={groupIndex}
																		/>
																	}
																	initialOpen={false}>
																	<div>
																		{__(
																			"No Option available for this condition.",
																			"combo-blocks"
																		)}
																	</div>
																</PGtoggle>
															)}
														</div>
													);
												})}
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>
						{/* visibility end */}
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
							title={__("Countdown Wrapper", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={countdownWrapper}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												countdownWrapper,
												"countdownWrapper",
												countdownWrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												countdownWrapper,
												"countdownWrapper",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												countdownWrapper,
												"countdownWrapper",
												countdownWrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												countdownWrapper,
												"countdownWrapper",
												countdownWrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												countdownWrapper,
												"countdownWrapper",
												countdownWrapperSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={countdownWrapper}
										onChange={onPickCssLibraryCountdownWrapper}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Message Area", "combo-blocks")}
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
									<ToggleControl
										label="Enable on Expired?"
										className="my-4"
										style={{
											color: "#1f2937",
										}}
										help={
											innerEnable
												? "Message area enabled"
												: "Message area disabled."
										}
										checked={innerEnable ? true : false}
										onChange={(e) => {
											var options = {
												...inner.options,
												enable: inner.options.enable ? false : true,
											};
											setAttributes({
												inner: { ...inner, options: options },
											});
										}}
									/>
								</PGtab>
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
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={inner}
										onChange={onPickCssLibraryInner}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Items", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="options"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
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
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												items,
												"items",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={items}
										onChange={onPickCssLibraryItems}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Extra", "combo-blocks")}
							initialOpen={false}>
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
										{
											name: "css",
											title: "CSS Library",
											icon: mediaAndText,
											className: "tab-css",
										},
									]}>
									<PGtab name="options">
										<PanelRow className="my-4">
											<ToggleControl
												label="Enable Label?"
												className="my-4"
												help={
													labelEnable
														? __("Label Enabled", "combo-blocks")
														: __("Label Disabled.", "combo-blocks")
												}
												checked={labelEnable ? true : false}
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
										</PanelRow>
										<PanelRow className="my-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Label position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={label.options.position}
												options={[
													{
														label: __("Choose Position", "combo-blocks"),
														value: "",
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
												]}
												onChange={(newVal) => {
													var options = { ...label.options, position: newVal };
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
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={label}
											onChange={onPickCssLibraryLabel}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Second", "combo-blocks")}
								initialOpen={false}>
								<PanelRow className="mb-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Label", "combo-blocks")}
									</label>
									<InputControl
										value={second.options.label}
										onChange={(newVal) => {
											var options = { ...second.options, label: newVal };
											setAttributes({
												second: { styles: second.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="mb-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Prefix:", "combo-blocks")}{" "}
									</label>
									<InputControl
										value={second.options.prefix}
										onChange={(newVal) => {
											var options = { ...second.options, prefix: newVal };
											setAttributes({
												second: { styles: second.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="mb-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Postfix:", "combo-blocks")}{" "}
									</label>
									<InputControl
										value={second.options.postfix}
										onChange={(newVal) => {
											var options = { ...second.options, postfix: newVal };
											setAttributes({
												second: { styles: second.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Second Wrap", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
											// {
											//   name: "options",
											//   title: "Options",
											//   icon: settings,
											//   className: "tab-settings",
											// },
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
										<PGtab name="styles">
											<PGStyles
												obj={secondWrap}
												onChange={onChangeStyleSecondWrap}
												onAdd={onAddStyleSecondWrap}
												onRemove={onRemoveStyleSecondWrap}
												onBulkAdd={onBulkAddSecondWrap}
												onReset={onResetSecondWrap}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={secondWrap}
												onChange={onPickCssLibrarySecondWrap}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Second Count", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
											// {
											//   name: "options",
											//   title: "Options",
											//   icon: settings,
											//   className: "tab-settings",
											// },
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
										<PGtab name="styles">
											<PGStyles
												obj={second}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														second,
														"second",
														secondSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														second,
														"second",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														second,
														"second",
														secondSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														second,
														"second",
														secondSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														second,
														"second",
														secondSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={second}
												onChange={onPickCssLibrarySecondCountdown}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Minute", "combo-blocks")}
								initialOpen={false}>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Label:", "combo-blocks")}{" "}
									</label>
									<InputControl
										value={minute.options.label}
										onChange={(newVal) => {
											var options = { ...minute.options, label: newVal };
											setAttributes({
												minute: { styles: minute.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Prefix", "combo-blocks")}
									</label>
									<InputControl
										value={minute.options.prefix}
										onChange={(newVal) => {
											var options = { ...minute.options, prefix: newVal };
											setAttributes({
												minute: { styles: minute.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Postfix", "combo-blocks")}
									</label>
									<InputControl
										value={minute.options.postfix}
										onChange={(newVal) => {
											var options = { ...minute.options, postfix: newVal };
											setAttributes({
												minute: { styles: minute.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Minute Wrap", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={minuteWrap}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														minuteWrap,
														"minuteWrap",
														minuteWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														minuteWrap,
														"minuteWrap",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														minuteWrap,
														"minuteWrap",
														minuteWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														minuteWrap,
														"minuteWrap",
														minuteWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														minuteWrap,
														"minuteWrap",
														minuteWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={minuteWrap}
												onChange={onPickCssLibraryMinuteWrap}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Minute Count", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={minute}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														minute,
														"minute",
														minuteSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														minute,
														"minute",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														minute,
														"minute",
														minuteSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														minute,
														"minute",
														minuteSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														minute,
														"minute",
														minuteSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={minute}
												onChange={onPickCssLibraryMinuteCountdown}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title="Hour"
								initialOpen={false}>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Label", "combo-blocks")}
									</label>
									<InputControl
										value={hour.options.label}
										onChange={(newVal) => {
											var options = { ...hour.options, label: newVal };
											setAttributes({
												hour: { styles: hour.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Prefix", "combo-blocks")}
									</label>
									<InputControl
										value={hour.options.prefix}
										onChange={(newVal) => {
											var options = { ...hour.options, prefix: newVal };
											setAttributes({
												hour: { styles: hour.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Postfix", "combo-blocks")}
									</label>
									<InputControl
										value={hour.options.postfix}
										onChange={(newVal) => {
											var options = { ...hour.options, postfix: newVal };
											setAttributes({
												hour: { styles: hour.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Hour Wrap", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={hourWrap}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														hourWrap,
														"hourWrap",
														hourWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														hourWrap,
														"hourWrap",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														hourWrap,
														"hourWrap",
														hourWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														hourWrap,
														"hourWrap",
														hourWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														hourWrap,
														"hourWrap",
														hourWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={hourWrap}
												onChange={onPickCssLibraryHourWrap}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Hour Count", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={hour}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														hour,
														"hour",
														hourSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														hour,
														"hour",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														hour,
														"hour",
														hourSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														hour,
														"hour",
														hourSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														hour,
														"hour",
														hourSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={hour}
												onChange={onPickCssLibraryHourCountdown}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
							</PGtoggle>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Day", "combo-blocks")}
								initialOpen={false}>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Label", "combo-blocks")}
									</label>
									<InputControl
										value={day.options.label}
										onChange={(newVal) => {
											var options = { ...day.options, label: newVal };
											setAttributes({
												day: { styles: day.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Prefix", "combo-blocks")}
									</label>
									<InputControl
										value={day.options.prefix}
										onChange={(newVal) => {
											var options = { ...day.options, prefix: newVal };
											setAttributes({
												day: { styles: day.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PanelRow className="my-4">
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Postfix", "combo-blocks")}
									</label>
									<InputControl
										value={day.options.postfix}
										onChange={(newVal) => {
											var options = { ...day.options, postfix: newVal };
											setAttributes({
												day: { styles: day.styles, options: options },
											});
										}}
									/>
								</PanelRow>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Day Wrap", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={dayWrap}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														dayWrap,
														"dayWrap",
														dayWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														dayWrap,
														"dayWrap",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														dayWrap,
														"dayWrap",
														dayWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														dayWrap,
														"dayWrap",
														dayWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														dayWrap,
														"dayWrap",
														dayWrapSelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={dayWrap}
												onChange={onPickCssLibraryDayWrap}
											/>
										</PGtab>
									</PGtabs>
								</PGtoggle>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("Day Count", "combo-blocks")}
									initialOpen={false}>
									<PGtabs
										activeTab="options"
										orientation="horizontal"
										activeClass="active-tab"
										onSelect={(tabName) => { }}
										tabs={[
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
										<PGtab name="styles">
											<PGStyles
												obj={day}
												onChange={(sudoScource, newVal, attr) => {
													myStore.onChangeStyleElement(
														sudoScource,
														newVal,
														attr,
														day,
														"day",
														daySelector,
														blockCssY,
														setAttributes
													);
												}}
												onAdd={(sudoScource, key) => {
													myStore.onAddStyleElement(
														sudoScource,
														key,
														day,
														"day",
														setAttributes
													);
												}}
												onRemove={(sudoScource, key) => {
													myStore.onRemoveStyleElement(
														sudoScource,
														key,
														day,
														"day",
														daySelector,
														blockCssY,
														setAttributes
													);
												}}
												onBulkAdd={(sudoScource, cssObj) => {
													myStore.onBulkAddStyleElement(
														sudoScource,
														cssObj,
														day,
														"day",
														daySelector,
														blockCssY,
														setAttributes
													);
												}}
												onReset={(sudoSources) => {
													myStore.onResetElement(
														sudoSources,
														day,
														"day",
														daySelector,
														blockCssY,
														setAttributes
													);
												}}
											/>
										</PGtab>
										<PGtab name="css">
											<PGCssLibrary
												blockId={blockId}
												obj={day}
												onChange={onPickCssLibraryDayCountdown}
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
										<PanelRow className="my-4">
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
										<PanelRow className="my-4">
											<ToggleControl
												label={__("Enable Icon?", "combo-blocks")}
												className="my-4"
												help={iconEnable ? "Icon enabled" : "Icon disabled."}
												checked={iconEnable ? true : false}
												onChange={(e) => {
													var options = {
														...icon.options,
														enable: icon.options.enable ? false : true,
													};
													setAttributes({
														icon: { ...icon, options: options },
													});
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
								title={__("Separator", "combo-blocks")}
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
										<PanelRow className="my-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Separator", "combo-blocks")}
											</label>
											<InputControl
												value={separator.options.text}
												onChange={(newVal) => {
													var options = { ...separator.options, text: newVal };
													setAttributes({
														separator: {
															styles: separator.styles,
															options: options,
														},
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="my-4">
											<ToggleControl
												label={__("Enable Separator?", "combo-blocks")}
												className="my-4"
												help={
													separatorEnable
														? __("Separator enabled", "combo-blocks")
														: __("Separator disabled.", "combo-blocks")
												}
												checked={separatorEnable ? true : false}
												onChange={(e) => {
													var options = {
														...separator.options,
														enable: separator.options.enable ? false : true,
													};
													setAttributes({
														separator: { ...separator, options: options },
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="my-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Separator position", "combo-blocks")}
											</label>
											<SelectControl
												label=""
												value={separator.options.position}
												options={[
													{
														label: __("Choose Position", "combo-blocks"),
														value: "",
													},
													{
														label: __("After Postfix", "combo-blocks"),
														value: "afterPostfix",
													},
													{
														label: __("After Each Items", "combo-blocks"),
														value: "afterEachItems",
													},
												]}
												onChange={(newVal) => {
													var options = {
														...separator.options,
														position: newVal,
													};
													setAttributes({
														separator: { ...separator, options: options },
													});
												}}
											/>
										</PanelRow>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={separator}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													separator,
													"separator",
													separatorSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													separator,
													"separator",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													separator,
													"separator",
													separatorSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													separator,
													"separator",
													separatorSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													separator,
													"separator",
													separatorSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={separator}
											onChange={onPickCssLibrarySeparator}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
							{/* count */}
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Counter", "combo-blocks")}
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
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Counter CSS Class:", "combo-blocks")}
										</label>
										<InputControl
											value={count.options.class}
											onChange={(newVal) => {
												var options = { ...count.options, class: newVal };
												setAttributes({
													count: { styles: count.styles, options: options },
												});
											}}
										/>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={count}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													count,
													"count",
													countSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													count,
													"count",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													count,
													"count",
													countSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													count,
													"count",
													countSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													count,
													"count",
													countSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
									<PGtab name="css">
										<PGCssLibrary
											blockId={blockId}
											obj={count}
											onChange={onPickCssLibraryCount}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
							{/* count */}
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
										<PanelRow className="my-4">
											<ToggleControl
												label={__("Enable Prefix?", "combo-blocks")}
												className="my-4"
												help={
													prefixEnable
														? __("Prefix enabled", "combo-blocks")
														: __("Prefix disabled.", "combo-blocks")
												}
												checked={prefixEnable ? true : false}
												onChange={(e) => {
													var options = {
														...prefix.options,
														enable: prefix.options.enable ? false : true,
													};
													setAttributes({
														prefix: { ...prefix, options: options },
													});
												}}
											/>
										</PanelRow>
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
										<PanelRow className="my-4">
											<ToggleControl
												label="Enable Postfix?"
												className="my-4"
												help={
													postfixEnable
														? __("Postfix enabled", "combo-blocks")
														: __("Postfix disabled.", "combo-blocks")
												}
												checked={postfixEnable ? true : false}
												onChange={(e) => {
													var options = {
														...postfix.options,
														enable: postfix.options.enable ? false : true,
													};
													setAttributes({
														postfix: { ...postfix, options: options },
													});
												}}
											/>
										</PanelRow>
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
										blockName={"date-countdown"}
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
									Enable Edit Mode
								</div>
							)}
							{editMode && (
								<>
									{wrapper.options.tag && (
										<div className="countdown-wrapper">
											{iconEnable && (
												<span
													className={icon.options.class}
													dangerouslySetInnerHTML={{ __html: iconHtml }}
												/>
											)}
											{dayEnable && (
												<div
													className={`${items.options.class} ${dayWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{day.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													<span
														className={`${day.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindDay}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindDays}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
														{/* {remindDay} */}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{day.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{day.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}
											{dayEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}
											{hourEnable && (
												<div
													className={`${items.options.class} ${hourWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{hour.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													<span
														className={`${hour.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindHour}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindHours}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{hour.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{hour.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}
											{hourEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}
											{minuteEnable && (
												<div
													className={`${items.options.class} ${minuteWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{minute.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													<span
														className={`${minute.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindMinute}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindMinutes}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{minute.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{minute.options.label}
															</span>
														)}
													{separatorEnable &&
														separator.options.position == "afterPostfix" && (
															<span className={separator.options.class}>
																{separator.options.text}
															</span>
														)}
												</div>
											)}
											{minuteEnable &&
												separatorEnable &&
												separator.options.position == "afterEachItems" && (
													<span className={separator.options.class}>
														{separator.options.text}
													</span>
												)}
											{secondEnable && (
												<div
													className={`${items.options.class} ${secondWrap.options.class}`}>
													{labelEnable &&
														label.options.position == "beforePrefix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													{prefixEnable && (
														<span className={prefix.options.class}>
															{second.options.prefix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPrefix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													<span
														className={`${second.options.class} ${count.options.class} `}>
														{dateCountdown.options.type == "fixed" && (
															<>{remindSecond}</>
														)}
														{dateCountdown.options.type == "everGreen" && (
															<>{remindSeconds}</>
														)}
														{dateCountdown.options.type == "scheduled" && (
															<>00</>
														)}
													</span>
													{labelEnable &&
														label.options.position == "beforePostfix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
													{postfixEnable && (
														<span className={postfix.options.class}>
															{second.options.postfix}
														</span>
													)}
													{labelEnable &&
														label.options.position == "afterPostfix" && (
															<span className={label.options.class}>
																{second.options.label}
															</span>
														)}
												</div>
											)}
										</div>
									)}
									{innerEnable && (
										<div className="inner">{innerBlocksProps.children}</div>
									)}
								</>
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
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
