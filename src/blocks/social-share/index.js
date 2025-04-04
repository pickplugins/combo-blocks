import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	RadioControl,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, menu, settings, styles } from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
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
					d="M64.8979 116.493C45.7458 116.493 26.4845 116.493 7.33245 116.493C7.22301 116.493 7.11341 116.383 6.89452 116.383C2.95467 115.723 0 112.203 0 108.133C0 89.5419 0 70.9511 0 52.3603C0 47.7401 3.83025 44 8.3173 44C26.8127 44 45.3081 44 63.8035 44C66.8678 44 69.2755 45.43 70.9171 48.0701C71.5737 49.0602 71.9023 50.2702 72.2306 51.3702C72.2306 70.621 72.2306 89.9819 72.2306 109.233C72.2306 109.343 72.121 109.453 72.121 109.673C71.6833 112.203 70.2605 114.183 67.9623 115.503C67.0867 115.943 65.9923 116.163 64.8979 116.493ZM47.7158 110.883C48.0441 110.883 48.263 110.883 48.4818 110.883C53.2972 110.883 58.2221 110.883 63.0374 110.883C65.4451 110.883 66.5395 109.783 66.5395 107.473C66.5395 89.3218 66.5395 71.1711 66.5395 53.1304C66.5395 50.8203 65.4452 49.7202 63.147 49.7202C45.0893 49.7202 27.0317 49.7202 8.97405 49.7202C6.6758 49.7202 5.58129 50.8203 5.58129 53.1304C5.58129 71.2811 5.58129 89.4318 5.58129 107.693C5.58129 109.893 6.6757 111.103 8.8645 111.103C18.6047 111.103 28.3448 111.103 38.085 111.103C38.3039 111.103 38.6324 111.213 38.8513 110.993C38.8513 103.292 38.8513 95.7021 38.8513 88.0018C36.0059 88.0018 33.2696 88.0018 30.4242 88.0018C30.4242 85.0317 30.4242 82.1716 30.4242 79.2014C33.2696 79.2014 36.0059 79.2014 38.8513 79.2014C38.8513 78.8714 38.8513 78.5414 38.8513 78.2114C38.9607 75.9013 38.7417 73.5912 38.9606 71.2811C39.7267 65.0108 45.1988 60.1706 51.4369 60.0606C53.2974 60.0606 55.1577 60.0606 57.0182 60.0606C57.2371 60.0606 57.3466 59.9506 57.5654 60.1706C57.5654 63.0307 57.5654 65.8909 57.5654 68.861C57.3466 68.861 57.1277 68.861 56.7994 68.861C55.2672 68.861 53.6256 68.861 52.0934 68.861C49.3574 68.861 47.6065 70.6211 47.6065 73.4812C47.6065 74.3612 47.6065 75.3513 47.6065 76.2313C47.6065 77.2213 47.6065 78.2114 47.6065 79.2014C50.9992 79.2014 54.3916 79.2014 57.7843 79.2014C57.3465 82.1716 56.7995 85.0317 56.3618 88.0018C53.4069 88.0018 50.5613 88.0018 47.7158 88.0018C47.7158 95.4821 47.7158 103.072 47.7158 110.883Z"
					fill="url(#paint0_linear_164_26)"
				/>
				<path
					d="M120.901 71.1571C121.777 62.1367 132.064 57.6265 139.287 63.4567C141.039 63.2367 142.789 63.1267 144.54 62.3567C145.306 62.0267 146.182 62.1367 146.839 62.6867C147.605 63.3467 147.824 64.1168 147.605 65.1068C147.167 67.1969 146.51 69.1769 145.197 70.827C143.884 72.4771 143.227 74.4572 142.899 76.6573C141.914 84.3576 138.084 90.6278 131.845 95.248C128.125 97.9981 123.856 99.5382 119.15 99.9782C114.225 100.528 109.41 99.8682 104.814 97.8881C103.61 97.3381 102.406 96.6781 101.202 96.018C100.217 95.358 99.7795 94.258 100.108 93.158C100.436 92.2779 101.312 91.5079 102.515 91.5079C104.923 91.6179 107.331 91.5078 109.739 90.6278C110.067 90.5178 110.395 90.4078 110.833 90.0778C109.41 88.9777 108.097 87.8777 106.893 86.6677C104.595 84.2476 102.734 81.4974 102.078 78.1973C101.64 75.9972 101.749 73.6872 101.859 71.4871C101.968 69.287 102.187 67.1969 102.844 65.1068C102.953 64.6668 103.063 64.2268 103.281 63.7867C104.048 62.3567 105.799 62.0267 107.003 63.2367C107.769 64.0068 108.535 64.8868 109.41 65.6568C112.584 68.627 116.414 70.387 120.573 71.267C120.683 71.267 120.792 71.1571 120.901 71.1571ZM141.367 68.0769C140.929 68.0769 140.601 68.0769 140.163 68.1869C138.74 68.5169 137.427 68.517 136.332 67.3069C135.676 66.5369 134.8 66.2068 133.815 65.9868C129.219 64.6668 124.841 68.7369 125.826 73.4671C126.155 74.8972 125.388 75.9972 124.075 76.3272C123.528 76.4372 122.981 76.3272 122.434 76.3272C117.071 75.8872 112.256 74.0171 107.987 70.717C107.659 70.497 107.331 70.057 106.783 69.947C106.565 71.487 106.565 73.0271 106.455 74.5672C106.237 77.9773 107.659 80.7274 109.848 83.1475C111.818 85.2376 114.007 86.8877 116.524 88.3177C118.165 89.3078 118.275 91.2879 116.633 92.3879C115.32 93.378 113.897 94.148 112.365 94.808C112.256 94.918 111.927 94.808 111.927 95.138C113.241 95.358 114.445 95.468 115.758 95.468C117.071 95.468 118.275 95.358 119.588 95.138C124.294 94.478 128.343 92.4979 131.627 89.1978C135.785 84.9076 138.084 79.7374 138.412 73.6872C138.412 72.6971 138.74 71.817 139.287 71.047C140.054 70.057 140.601 69.0669 141.367 68.0769Z"
					fill="url(#paint1_linear_164_26)"
				/>
				<path
					d="M89.8682 49.8105C89.8682 47.9822 91.3503 46.5 93.1787 46.5H154.189C156.018 46.5 157.5 47.9822 157.5 49.8105V110.821C157.5 112.649 156.018 114.132 154.189 114.132H93.1787C91.3503 114.132 89.8682 112.649 89.8682 110.821V49.8105Z"
					stroke="url(#paint2_linear_164_26)"
					strokeWidth="5"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_164_26"
						x1="0"
						y1="80.2464"
						x2="72.2306"
						y2="80.2464"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_164_26"
						x1="100"
						y1="80.5032"
						x2="147.685"
						y2="80.5032"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_164_26"
						x1="85.9155"
						y1="80.0253"
						x2="160"
						y2="80.0253"
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
		var elements = attributes.elements;
		var icon = attributes.icon;
		var label = attributes.label;
		var count = attributes.count;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .media-item";
		var iconSelector = blockClass + " .media-item .icon";
		var labelSelector = blockClass + " .media-item .media-label";
		var countSelector = blockClass + " .media-item .media-count";
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
		let isProFeature = applyFilters("isProFeature", true);
		var [loading, setLoading] = useState(false);
		var [currentPostUrl, setCurrentPostUrl] = useEntityProp(
			"postType",
			postType,
			"link",
			postId
		);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = elements;
			blockCssObj[iconSelector] = icon;
			blockCssObj[labelSelector] = label;
			blockCssObj[countSelector] = count;
			elements.items.map((x, i) => {
				var selector = `${blockClass}  .media-item.item-${i}`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			var iSelector = `css-block-${blockClass}`;
			var elemX = document.querySelector(iSelector);
			if (elemX != null) {
				elemX.remove();
			}
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = elements;
			blockCssObj[iconSelector] = icon;
			blockCssObj[labelSelector] = label;
			blockCssObj[countSelector] = count;
			elements.items.map((x, i) => {
				var selector = `${blockClass}  .media-item.item-${i}`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
			setTimeout((x) => { }, 2000);
		}, [elements]);
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var iconX = attributes.icon;
				var labelX = attributes.label;
				var countX = attributes.count;
				var elementsX = attributes.elements;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[itemSelector] = elementsY;
				}
				if (countX != undefined) {
					var countY = { ...countX, options: count.options };
					setAttributes({ count: countY });
					blockCssObj[countSelector] = countY;
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
		//* new
		var mediaSites = [
			{
				id: "email",
				label: "Mail",
				count: 125,
				url: "mailto:?subject={TITLE}&body={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-envelope",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "skype",
				label: "Skype",
				count: 125,
				url: "https://web.skype.com/share?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-skype",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "whatsapp",
				label: "WhatsApp",
				count: 125,
				url: "https://api.whatsapp.com/send?text={URL} - {TITLE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-whatsapp-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "tumblr",
				label: "Tumblr",
				count: 125,
				url: "https://www.tumblr.com/share/link?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-tumblr-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "viber",
				label: "Viber",
				count: 125,
				url: "viber://chat?number=12345678",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-viber",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "reddit",
				label: "Reddit",
				count: 125,
				url: "http://www.reddit.com/submit?title={TITLE}&url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-reddit-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "facebook",
				label: "Facebook",
				count: 125,
				url: "https://www.facebook.com/sharer.php?u={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-facebook-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "twitter",
				label: "Twitter",
				count: 125,
				url: "https://twitter.com/intent/tweet?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-twitter-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "linkedin",
				label: "Linkedin",
				count: 125,
				url: "https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-linkedin",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "pinterest",
				label: "Pinterest",
				count: 125,
				url: "https://www.pinterest.com/pin/create/button/?url={URL}&media={IMAGE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-pinterest-square",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "digg",
				label: "Digg",
				count: 0,
				url: "https://digg.com/submit?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-digg",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "flipboard",
				label: "Flipboard",
				count: 0,
				url: "https://share.flipboard.com/bookmarklet/popout?title={TITLE}&url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-flipboard",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "meneame",
				label: "Meneame",
				count: 0,
				url: "https://meneame.net/submit.php?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-share-alt",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "messenger",
				label: "Messenger",
				count: 0,
				url: "https://www.facebook.com/dialog/send?link=https%3A%2F%2Fwww.sharethis.com%2F&app_id=291494419107518&redirect_uri=https%3A%2F%2Fwww.sharethis.com",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-facebook-messenger",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wechat",
				label: "Wechat",
				count: 0,
				url: "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl={URL}&choe=UTF-8",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-weixin",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "xing",
				label: "Xing",
				count: 0,
				url: "https://www.xing.com/app/user?op=share&url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-xing",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "yummly",
				label: "Yummly",
				count: 0,
				url: "http://www.yummly.com/urb/verify?url={URL}&title={TITLE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-y-combinator",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "diaspora",
				label: "Diaspora",
				count: 0,
				url: "https://share.diasporafoundation.org/?title={TITLE}&url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-diaspora",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "surfingbird",
				label: "Surfingbird",
				count: 0,
				url: "http://surfingbird.ru/share?url={URL}&description={TITLE}&title={TITLE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-share-alt",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "refind",
				label: "Refind",
				count: 0,
				url: "https://refind.com/?url={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-share-alt",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "renren",
				label: "Renren",
				count: 0,
				url: "http://widget.renren.com/dialog/share?resourceUrl={URL}&srcUrl={URL}&title={TITLE}&description={TITLE}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-renren",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "telegram",
				label: "Telegram",
				count: 0,
				url: "https://t.me/share/url?url={URL}&text={TITLE}&to=",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-telegram",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "yahoo",
				label: "Yahoo",
				count: 0,
				url: "http://compose.mail.yahoo.com/?to=&subject={TITLE}&body={URL}",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-yahoo",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wordpress",
				label: "WordPress",
				count: 0,
				url: "http://wordpress.com/wp-admin/press-this.php?u={URL}&t={TITLE}&s={TITLE}&i=",
				profileLink: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fab fa-wordpress",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		];
		function addMedia(option, index) {
			//var isExist = elements.items.find(x => x.label === option.label);
			var elementsX = elements.items.push(option);

			setAttributes({ elements: { ...elements, items: elements.items } });
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
		function onRemoveStyleCount(sudoScource, key) {
			let obj = { ...count };
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
			setAttributes({ count: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				countSelector
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
		function onResetCount(sudoSources) {
			let obj = Object.assign({}, count);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
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
		function onChangeStyleCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ count: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				countSelector
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
		function onAddStyleCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, count);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ count: object });
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
		function onRemoveStyleElements(sudoScource, key) {
			let obj = { ...elements };
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
			setAttributes({ elements: objectX });
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
		function onResetElements(sudoSources) {
			let obj = Object.assign({}, elements);
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
			setAttributes({ elements: obj });
		}
		function onChangeStyleElements(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, elements);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ elements: object });
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
		function onAddStyleElements(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, elements);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ elements: object });
		}
		function onBulkAddItems(sudoScource, cssObj) {
			let obj = Object.assign({}, elements);
			obj[sudoScource] = cssObj;
			setAttributes({ elements: obj });
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
		function onBulkAddCount(sudoScource, cssObj) {
			let obj = Object.assign({}, count);
			obj[sudoScource] = cssObj;
			setAttributes({ count: obj });
			var selector = myStore.getElementSelector(sudoScource, countSelector);
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
		function onChangeStyleItem(sudoScource, newVal, attr, obj, extra) {
			var index = extra.index;
			var path = [sudoScource, attr, breakPointX];
			let objX = Object.assign({}, obj);
			const object = myStore.updatePropertyDeep(objX, path, newVal);
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
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
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
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
			var elementsX = { ...elements };
			elementsX.items[index] = object;
			setAttributes({ elements: elementsX });
			//setAttributes({ items: object });
			// setAttributes({ items: itemsX });
		}
		function onBulkAddItem(sudoScource, cssObj, extra) {
			var index = extra.index;
			var elementsX = { ...elements };
			var itemssX = elementsX.items[index];
			let obj = Object.assign({}, itemssX);
			obj[sudoScource] = cssObj;
			elementsX.items[index] = obj;
			setAttributes({ elements: elementsX });
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
			var elementsX = { ...elements };
			var itemssX = elementsX.items[index];
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
				elementsX.items[index] = obj;
				setAttributes({ elements: elementsX });
			}
		}
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="px-3">
							<RadioControl
								label={__("Type?", "combo-blocks")}
								help={__("Choose the type of the block", "combo-blocks")}
								selected={wrapper.options.type}
								options={[
									{ label: __("Share", "combo-blocks"), value: "share" },
									{ label: __("Link", "combo-blocks"), value: "link" },
								]}
								onChange={(e) => {
									var options = { ...wrapper.options, type: e };
									setAttributes({
										wrapper: { styles: wrapper.styles, options: options },
									});
								}}
							/>
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
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Items", "combo-blocks")}
							initialOpen={true}>
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
									{elements.items.length == 0 && (
										<div className="bg-red-400 text-white my-3  px-3 py-2 text-center">
											{__("No media added", "combo-blocks")}
										</div>
									)}
									<ReactSortable
										list={elements.items}
										handle={".handle"}
										setList={(item) => {
											setAttributes({ elements: { ...elements, items: item } });
										}}>
										{elements.items.map((item, index) => (
											<div key={item.id} className="">
												<PGtoggle
													title={
														<>
															<span
																className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	var elementsX = elements.items.splice(
																		index,
																		1
																	);
																	setAttributes({
																		elements: {
																			...elements,
																			items: elements.items,
																		},
																	});
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
																		elements.items[index].label = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
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
																			elements.items[index].url = newVal;
																			setAttributes({
																				elements: {
																					...elements,
																					items: elements.items,
																				},
																			});
																		}}
																	/>
																</PanelRow>
															)}
															{wrapper.options.type == "link" && (
																<PanelRow>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		{__("Profile Link", "combo-blocks")}
																	</label>
																	<InputControl
																		value={item.profileLink}
																		onChange={(newVal) => {
																			elements.items[index].profileLink =
																				newVal;
																			setAttributes({
																				elements: {
																					...elements,
																					items: elements.items,
																				},
																			});
																		}}
																	/>
																</PanelRow>
															)}
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Count", "combo-blocks")}
																</label>
																<InputControl
																	value={item.count}
																	onChange={(newVal) => {
																		elements.items[index].count = newVal;
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
																	}}
																/>
															</PanelRow>
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
																		//var options = { ...icon.options, srcType: arg.srcType, library: arg.library, iconSrc: arg.iconSrc };
																		//setAttributes({ icon: { ...icon, options: options } });
																		elements.items[index].siteIcon = {
																			srcType: arg.srcType,
																			library: arg.library,
																			iconSrc: arg.iconSrc,
																		};
																		setAttributes({
																			elements: {
																				...elements,
																				items: elements.items,
																			},
																		});
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
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={elements}
										onChange={onChangeStyleElements}
										onAdd={onAddStyleElements}
										onBulkAdd={onBulkAddItems}
										onReset={onResetElements}
										onRemove={onRemoveStyleElements}
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
								]}>
								<PGtab name="options">
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
													label: __("Before Label", "combo-blocks"),
													value: "beforeLabel",
												},
												{
													label: __("After Label", "combo-blocks"),
													value: "afterLabel",
												},
												// { label: 'Before Count', value: 'beforeCount' },
												// { label: 'After Count', value: 'afterCount' },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
									<ToggleControl
										className="my-3"
										label={__("Display icon?", "combo-blocks")}
										help={
											elements?.options?.showIcon
												? __("Icon is displaying", "combo-blocks")
												: __("Icon is hidden", "combo-blocks")
										}
										checked={elements?.options?.showIcon ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showIcon: elements.options.showIcon ? false : true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>
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
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title={__("Label","combo-blocks")}
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label", "combo-blocks")}</span>
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
								]}>
								<PGtab name="options">
									<ToggleControl
										className="my-3"
										label={__("Display label?", "combo-blocks")}
										help={
											elements?.options?.showLabel
												? __("Label is displaying", "combo-blocks")
												: __("Label is hidden", "combo-blocks")
										}
										checked={elements?.options?.showLabel ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showLabel: elements.options.showLabel ? false : true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>
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
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Count"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Count", "combo-blocks")}</span>
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
								]}>
								<PGtab name="options">
									<ToggleControl
										className="my-3"
										label={__("Display count?", "combo-blocks")}
										help={
											elements?.options?.showCount
												? __("Count is displaying", "combo-blocks")
												: __("Count is hidden", "combo-blocks")
										}
										checked={elements?.options?.showCount ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showCount: elements.options.showCount ? false : true,
											};
											setAttributes({
												elements: { ...elements, options: options },
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
				{elements.items.length == 0 && (
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
												'<!-- wp:combo-blocks/social-share {"blockCssY":{"items":{".pgc564abe52a9b .media-item":{"margin":{"Desktop":"10px 10px 10px 10px"},"font-size":{"Desktop":"30px"}},".pgc564abe52a9b .media-item:items":{"0":{"id":"facebook","label":"Facebook","count":125,"url":"https://www.facebook.com/sharer.php?u={URL}","profileLink":"","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-facebook-square"},"styles":{"color":{"Desktop":""},"backgroundColor":[],"padding":{"Desktop":""},"margin":{"Desktop":""},"display":[]},"chosen":false,"selected":false},"1":{"id":"twitter","label":"Twitter","count":125,"url":"https://twitter.com/intent/tweet?url={URL}","profileLink":"","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-twitter-square"},"styles":{"color":{"Desktop":""},"backgroundColor":[],"padding":{"Desktop":""},"margin":{"Desktop":""},"display":[]},"chosen":false,"selected":false},"2":{"id":"linkedin","label":"Linkedin","count":125,"url":"https://www.linkedin.com/shareArticle?mini=true\u0026url={URL}\u0026title={TITLE}","profileLink":"","siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-linkedin"},"styles":{"color":{"Desktop":""},"backgroundColor":[],"padding":{"Desktop":""},"margin":{"Desktop":""},"display":[]},"chosen":false,"selected":false}},".pgc564abe52a9b  .media-item.item-0:id":{"0":"f","1":"a","2":"c","3":"e","4":"b","5":"o","6":"o","7":"k"},".pgc564abe52a9b  .media-item.item-0:label":{"0":"F","1":"a","2":"c","3":"e","4":"b","5":"o","6":"o","7":"k"},".pgc564abe52a9b  .media-item.item-0:url":{"0":"h","1":"t","2":"t","3":"p","4":"s","5":":","6":"/","7":"/","8":"w","9":"w","10":"w","11":".","12":"f","13":"a","14":"c","15":"e","16":"b","17":"o","18":"o","19":"k","20":".","21":"c","22":"o","23":"m","24":"/","25":"s","26":"h","27":"a","28":"r","29":"e","30":"r","31":".","32":"p","33":"h","34":"p","35":"?","36":"u","37":"=","38":"{","39":"U","40":"R","41":"L","42":"}"},".pgc564abe52a9b  .media-item.item-0:siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-facebook-square"},".pgc564abe52a9b  .media-item.item-1:id":{"0":"t","1":"w","2":"i","3":"t","4":"t","5":"e","6":"r"},".pgc564abe52a9b  .media-item.item-1:label":{"0":"T","1":"w","2":"i","3":"t","4":"t","5":"e","6":"r"},".pgc564abe52a9b  .media-item.item-1:url":{"0":"h","1":"t","2":"t","3":"p","4":"s","5":":","6":"/","7":"/","8":"t","9":"w","10":"i","11":"t","12":"t","13":"e","14":"r","15":".","16":"c","17":"o","18":"m","19":"/","20":"i","21":"n","22":"t","23":"e","24":"n","25":"t","26":"/","27":"t","28":"w","29":"e","30":"e","31":"t","32":"?","33":"u","34":"r","35":"l","36":"=","37":"{","38":"U","39":"R","40":"L","41":"}"},".pgc564abe52a9b  .media-item.item-1:siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-twitter-square"},".pgc564abe52a9b  .media-item.item-2:id":{"0":"l","1":"i","2":"n","3":"k","4":"e","5":"d","6":"i","7":"n"},".pgc564abe52a9b  .media-item.item-2:label":{"0":"L","1":"i","2":"n","3":"k","4":"e","5":"d","6":"i","7":"n"},".pgc564abe52a9b  .media-item.item-2:url":{"0":"h","1":"t","2":"t","3":"p","4":"s","5":":","6":"/","7":"/","8":"w","9":"w","10":"w","11":".","12":"l","13":"i","14":"n","15":"k","16":"e","17":"d","18":"i","19":"n","20":".","21":"c","22":"o","23":"m","24":"/","25":"s","26":"h","27":"a","28":"r","29":"e","30":"A","31":"r","32":"t","33":"i","34":"c","35":"l","36":"e","37":"?","38":"m","39":"i","40":"n","41":"i","42":"=","43":"t","44":"r","45":"u","46":"e","47":"\u0026","48":"u","49":"r","50":"l","51":"=","52":"{","53":"U","54":"R","55":"L","56":"}","57":"\u0026","58":"t","59":"i","60":"t","61":"l","62":"e","63":"=","64":"{","65":"T","66":"I","67":"T","68":"L","69":"E","70":"}"},".pgc564abe52a9b  .media-item.item-2:siteIcon":{"library":"fontAwesome","srcType":"class","iconSrc":"fab fa-linkedin"}}},"blockId":"pgc564abe52a9b"} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"social-share"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{elements.items.length > 0 && (
					<div {...blockProps}>
						{elements.items.map((x, index) => {
							return (
								<a
									onClick={handleLinkClick}
									className={"media-item item-" + index}
									href={x.url}>
									{elements?.options?.showIcon &&
										icon.options.position == "beforeLabel" && (
											<span className={`icon ${x.siteIcon.iconSrc}`}></span>
										)}
									{elements?.options?.showLabel && (
										<span className="media-label">{x.label}</span>
									)}
									{elements?.options?.showIcon &&
										icon.options.position == "afterLabel" && (
											<span className={`icon ${x.siteIcon.iconSrc}`}></span>
										)}
									{elements?.options?.showCount && (
										<span className="media-count">({x.count})</span>
									)}
								</a>
							);
						})}
					</div>
				)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
