import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import { select } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, mediaAndText, settings } from "@wordpress/icons";
import PGcssClassPicker from "../../components/css-class-picker";
import PGCssLibrary from "../../components/css-library";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
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
					d="M61.1765 15H4.70588C3.4578 15 2.26085 15.4958 1.37832 16.3783C0.495798 17.2608 0 18.4578 0 19.7059V66.7647C0 68.0128 0.495798 69.2097 1.37832 70.0923C2.26085 70.9748 3.4578 71.4706 4.70588 71.4706H61.1765C62.4246 71.4706 63.6215 70.9748 64.504 70.0923C65.3866 69.2097 65.8824 68.0128 65.8824 66.7647V19.7059C65.8824 18.4578 65.3866 17.2608 64.504 16.3783C63.6215 15.4958 62.4246 15 61.1765 15ZM56.4706 62.0588H9.41177V24.4118H56.4706V62.0588Z"
					fill="url(#paint0_linear_61_762)"
				/>
				<path
					d="M160 29.1177H84.7061V38.5294H160V29.1177Z"
					fill="url(#paint1_linear_61_762)"
				/>
				<path
					d="M141.177 47.9414H84.7061V57.3532H141.177V47.9414Z"
					fill="url(#paint2_linear_61_762)"
				/>
				<path
					d="M61.1765 89H4.70588C3.4578 89 2.26085 89.4958 1.37832 90.3783C0.495798 91.2608 0 92.4578 0 93.7059V140.765C0 142.013 0.495798 143.21 1.37832 144.092C2.26085 144.975 3.4578 145.471 4.70588 145.471H61.1765C62.4246 145.471 63.6215 144.975 64.504 144.092C65.3866 143.21 65.8824 142.013 65.8824 140.765V93.7059C65.8824 92.4578 65.3866 91.2608 64.504 90.3783C63.6215 89.4958 62.4246 89 61.1765 89ZM56.4706 136.059H9.41177V98.4118H56.4706V136.059Z"
					fill="url(#paint3_linear_61_762)"
				/>
				<path
					d="M160 103.118H84.7061V112.529H160V103.118Z"
					fill="url(#paint4_linear_61_762)"
				/>
				<path
					d="M141.177 121.941H84.7061V131.353H141.177V121.941Z"
					fill="url(#paint5_linear_61_762)"
				/>
				<path
					d="M32.9806 60C23.4868 59.8176 16.0664 52.0352 16 42.9806C16.1846 33.4939 23.9257 26.0664 32.9806 26C42.4678 26.1897 49.9335 33.9134 50 42.9806C49.8125 52.4748 42.0473 59.9335 32.9806 60ZM32.9806 27.2046C24.1656 27.3781 17.227 34.5632 17.1657 42.9806C17.3372 51.8026 24.5636 58.7341 32.9806 58.7954C41.8026 58.6239 48.7341 51.3975 48.7954 42.9806C48.629 34.1591 41.3854 27.2658 32.9806 27.2046ZM28.9006 56.8914L33.2526 44.3794L37.7988 56.6194C34.736 57.6448 31.8403 57.7069 28.9006 56.8914ZM25.5588 34.7817C23.9657 34.9983 22.4162 35.0755 20.896 35.0149C23.7825 30.8881 28.4042 28.5664 32.9806 28.5257C36.7237 28.5966 40.2132 30.0115 42.7726 32.3337C41.5856 32.246 40.8749 32.7665 40.3634 33.6548C39.6201 35.9481 41.1908 37.6457 42.0732 39.3669C42.9074 40.9395 42.8412 42.7277 42.384 44.2629L40.208 51.6846L34.9623 36.1028C35.5089 36.052 36.059 36.0356 36.5555 35.9474C37.143 35.8166 37.2719 35.2698 36.8663 34.9371C36.7368 34.8335 36.5943 34.7817 36.4389 34.7817L33.2915 35.0149H30.9017C30.227 35.0547 28.3219 34.403 28.1623 35.2869C28.0798 35.6274 28.334 35.8943 28.6285 35.9475C29.1483 36.0148 29.7439 36.0913 30.2217 36.1417L32.5143 42.2812L29.328 51.6846L24.0434 36.1028C24.6026 36.0543 25.1692 36.0373 25.6754 35.9474C26.09 35.8955 26.2712 35.6883 26.2194 35.3257C26.146 35.0033 25.8586 34.7855 25.5588 34.7817ZM19.7303 37.1909L26.6857 55.9977C24.176 54.7607 22.1919 52.9416 20.7794 50.7714C18.1956 46.648 17.9237 41.4168 19.7303 37.1909ZM46.9109 46.8468C45.769 50.5757 43.4368 53.6642 40.2081 55.5314C40.3634 55.1169 40.6096 54.4175 40.9463 53.4331L44.9875 41.6983C45.3761 40.5584 45.6481 39.2891 45.8035 37.8903C45.856 37.318 45.8577 36.741 45.7646 36.2194C47.4204 39.7906 47.8901 43.328 46.9109 46.8468Z"
					fill="url(#paint6_linear_61_762)"
				/>
				<path
					d="M32.9806 134C23.4868 133.818 16.0664 126.035 16 116.981C16.1846 107.494 23.9257 100.066 32.9806 100C42.4678 100.19 49.9335 107.913 50 116.981C49.8125 126.475 42.0473 133.934 32.9806 134ZM32.9806 101.205C24.1656 101.378 17.227 108.563 17.1657 116.981C17.3372 125.803 24.5636 132.734 32.9806 132.795C41.8026 132.624 48.7341 125.397 48.7954 116.981C48.629 108.159 41.3854 101.266 32.9806 101.205ZM28.9006 130.891L33.2526 118.379L37.7988 130.619C34.736 131.645 31.8403 131.707 28.9006 130.891ZM25.5588 108.782C23.9657 108.998 22.4162 109.076 20.896 109.015C23.7825 104.888 28.4042 102.566 32.9806 102.526C36.7237 102.597 40.2132 104.011 42.7726 106.334C41.5856 106.246 40.8749 106.767 40.3634 107.655C39.6201 109.948 41.1908 111.646 42.0732 113.367C42.9074 114.94 42.8412 116.728 42.384 118.263L40.208 125.685L34.9623 110.103C35.5089 110.052 36.059 110.036 36.5555 109.947C37.143 109.817 37.2719 109.27 36.8663 108.937C36.7368 108.834 36.5943 108.782 36.4389 108.782L33.2915 109.015H30.9017C30.227 109.055 28.3219 108.403 28.1623 109.287C28.0798 109.627 28.334 109.894 28.6285 109.947C29.1483 110.015 29.7439 110.091 30.2217 110.142L32.5143 116.281L29.328 125.685L24.0434 110.103C24.6026 110.054 25.1692 110.037 25.6754 109.947C26.09 109.895 26.2712 109.688 26.2194 109.326C26.146 109.003 25.8586 108.786 25.5588 108.782ZM19.7303 111.191L26.6857 129.998C24.176 128.761 22.1919 126.942 20.7794 124.771C18.1956 120.648 17.9237 115.417 19.7303 111.191ZM46.9109 120.847C45.769 124.576 43.4368 127.664 40.2081 129.531C40.3634 129.117 40.6096 128.418 40.9463 127.433L44.9875 115.698C45.3761 114.558 45.6481 113.289 45.8035 111.89C45.856 111.318 45.8577 110.741 45.7646 110.219C47.4204 113.791 47.8901 117.328 46.9109 120.847Z"
					fill="url(#paint7_linear_61_762)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_762"
						x1="0"
						y1="43.2353"
						x2="65.8824"
						y2="43.2353"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_762"
						x1="84.7061"
						y1="33.8236"
						x2="160"
						y2="33.8236"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_762"
						x1="84.7061"
						y1="52.6473"
						x2="141.177"
						y2="52.6473"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_762"
						x1="0"
						y1="117.235"
						x2="65.8824"
						y2="117.235"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_61_762"
						x1="84.7061"
						y1="107.824"
						x2="160"
						y2="107.824"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_61_762"
						x1="84.7061"
						y1="126.647"
						x2="141.177"
						y2="126.647"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_61_762"
						x1="16"
						y1="43"
						x2="50"
						y2="43"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_61_762"
						x1="16"
						y1="117"
						x2="50"
						y2="117"
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
		var clientId = props.clientId;
		var blockName = props.name;
		var blockNameLast = blockName.split("/")[1];
		var context = props.context;
		var blockId = attributes.blockId;
		var blockCssY = attributes.blockCssY;
		var object = attributes.object;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var item = attributes.item;
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var thumb = attributes.thumb;
		var icon = attributes.icon;
		var elements = attributes.elements;
		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;
		var parentIcon =
			context["combo-blocks/WPIcon"] == undefined
				? null
				: context["combo-blocks/WPIcon"];
		useEffect(() => {
			if (parentIcon?.options?.overrideChild == true) {
				var options = { ...parentIcon.options };
				setAttributes({ icon: { ...icon, options: options } });
			}
		}, [parentIcon]);
		var parentObject =
			context["combo-blocks/WPObject"] == undefined
				? null
				: context["combo-blocks/WPObject"];
		var [objectData, setobjectData] = useState(null); // Using the hook.
		useEffect(() => {
			if (parentObject != null) {
				setAttributes({ object: parentObject });
				setobjectData(parentObject.options.data);
			}
		}, [parentObject]);
		const wrapperSelector = blockClass;
		const itemSelector = blockClass + " .item";
		const thumbSelector = blockClass + " .thumb";
		const itemsWrapSelector = blockClass + " ul";
		const itemWrapSelector = blockClass + " li";
		const iconSelector = blockClass + " icon";
		const CustomTagWrapper =
			wrapper.options.tag == undefined ? "li" : `${wrapper.options.tag}`;
		const CustomTagItem =
			item.options.tag.length == undefined ? "li" : `${item.options.tag}`;
		var [loading, seloading] = useState(false); // Using the hook.
		var [debounce, setDebounce] = useState(null); // Using the hook.
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemSelector] = item;
			blockCssObj[itemsWrapSelector] = itemsWrap;
			blockCssObj[itemWrapSelector] = itemWrap;
			blockCssObj[thumbSelector] = thumb;
			blockCssObj[iconSelector] = icon;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} item`,
		});
		var pluginFieldList = {
			name: { id: "name", label: "Plugin Name", prefix: "Plugin Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			author: { id: "author", label: "Author", prefix: "Author" },
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},
			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			tested: {
				id: "tested",
				label: "Tested WP Version",
				prefix: "WP Tested Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			author_profile: {
				id: "author_profile",
				label: "Author Profile",
				prefix: "Author Profile",
			},
			contributors: {
				id: "contributors",
				label: "Contributors",
				prefix: "Contributors",
				isLinked: true,
				isPro: true,
			},
			requires_plugins: {
				id: "requires_plugins",
				label: "Require Plugins",
				prefix: "Require Plugins: ",
				isPro: true,
			},
			ratings: {
				id: "ratings",
				label: "Ratings",
				prefix: "Ratings",
				type: "star",
				isPro: true,
			},
			num_ratings: {
				id: "num_ratings",
				label: "Num Ratings",
				prefix: "Num Ratings",
				type: "star",
				isPro: true,
			},
			support_threads: {
				id: "support_threads",
				label: "Support Threads",
				prefix: "Support Threads",
				isPro: true,
			},
			support_threads_resolved: {
				id: "support_threads_resolved",
				label: "Support Threads Resolved",
				prefix: "Support Threads Resolved",
				isPro: true,
			},
			active_installs: {
				id: "active_installs",
				label: "Active Install",
				prefix: "Active Install: ",
				isPro: true,
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
				isPro: true,
			},
			added: {
				id: "added",
				label: "Creation Time",
				prefix: "Creation Time: ",
				isPro: true,
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags:", isPro: true },
			banners: {
				id: "banners",
				label: "Thumbnail",
				prefix: "Thumbnail",
				size: "high",
				isLinked: false,
				isPro: true,
			},
		};
		let pluginFields = applyFilters(
			"wordpressOrgPluginFieldList",
			pluginFieldList
		);
		var themeFieldList = {
			name: { id: "name", label: "Name", prefix: "Theme Name: " },
			version: { id: "version", label: "Version", prefix: "Version:" },
			author: { id: "author", label: "Author", prefix: "Author" },
			screenshot_url: { id: "screenshot_url", label: "Screenshot" },
			ratings: { id: "ratings", label: "Ratings", prefix: "Ratings" },
			rating: { id: "rating", label: "Rating", prefix: "Rating", type: "star" },
			homepage: {
				id: "homepage",
				label: "Homepage",
				prefix: "Homepage:",
				isLinked: true,
				linkText: "Homepage",
			},
			download_link: {
				id: "download_link",
				label: "Download Link",
				prefix: "Download Link",
				isLinked: true,
				linkText: "Download",
			},
			requires: {
				id: "requires",
				label: "Require WP Version",
				prefix: "WP Version: ",
			},
			requires_php: {
				id: "requires_php",
				label: "Require PHP Version",
				prefix: "PHP Version: ",
			},
			preview_url: {
				id: "preview_url",
				label: "Preview URL",
				prefix: "Preview URL",
				isLinked: true,
				linkText: "Preview",
				isPro: true,
			},
			num_ratings: {
				id: "num_ratings",
				label: "Number of Ratings",
				isPro: true,
			},
			reviews_url: {
				id: "reviews_url",
				label: "Reviews URL",
				isLinked: true,
				linkText: "Reviews",
				isPro: true,
			},
			last_updated: {
				id: "last_updated",
				label: "Last Update",
				prefix: "Last Update: ",
				isPro: true,
			},
			creation_time: {
				id: "creation_time",
				label: "Creation Time",
				prefix: "Creation Time: ",
				isPro: true,
			},
			tags: { id: "tags", label: "Tags", prefix: "Tags: ", isPro: true },
			is_commercial: {
				id: "is_commercial",
				label: "Is Commercial",
				prefix: "Is Commercial",
				isPro: true,
			},
			external_support_url: {
				id: "external_support_url",
				label: "External Support URL",
				prefix: "External Support URL",
				isLinked: true,
				linkText: "Support URL",
				isPro: true,
			},
			external_repository_url: {
				id: "external_repository_url",
				label: "External Sepository URL",
				prefix: "External Sepository URL",
				isLinked: true,
				linkText: "Repository",
				isPro: true,
			},
		};
		let themeFields = applyFilters(
			"wordpressOrgThemeFieldList",
			themeFieldList
		);
		var allFields = { ...pluginFields, ...themeFields };
		var objectTypes = {
			plugin: { label: "Plugins", value: "plugin" },
			theme: { label: "Themes", value: "theme" },
		};
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
				var elementsX = attributes.elements;
				var itemX = attributes.item;
				var itemsWrapX = attributes.itemsWrap;
				var itemWrapX = attributes.itemWrap;
				var thumbX = attributes.thumb;
				var iconX = attributes.icon;
				var objectX = attributes.object;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (objectX != undefined) {
					var objectY = { ...objectX, options: object.options };
					setAttributes({ object: objectY });
					blockCssObj[objectSelector] = objectY;
				}
				if (thumbX != undefined) {
					var thumbY = { ...thumbX, options: thumb.options };
					setAttributes({ thumb: thumbY });
					blockCssObj[thumbSelector] = thumbY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (itemX != undefined) {
					var itemY = { ...itemX, options: item.options };
					setAttributes({ item: itemY });
					blockCssObj[itemSelector] = itemY;
				}
				if (itemsWrapX != undefined) {
					var itemsWrapY = { ...itemsWrapX, options: itemsWrap.options };
					setAttributes({ itemsWrap: itemsWrapY });
					blockCssObj[itemsWrapSelector] = itemsWrapY;
				}
				if (itemWrapX != undefined) {
					var itemWrapY = { ...itemWrapX, options: itemWrap.options };
					setAttributes({ itemWrap: itemWrapY });
					blockCssObj[itemWrapSelector] = itemWrapY;
				}
				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[elementsSelector] = elementsY;
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
		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span className="cursor-move">{title}</span>
				</>
			);
		};
		function setUserField(option, index) {
			var optionsX = { ...wrapper.options, field: option.id };
			setAttributes({ wrapper: { ...wrapper, options: optionsX } });
		}

		function onRemoveStyleThumb(sudoScource, key) {
			let obj = { ...thumb };
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
			setAttributes({ thumb: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
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

		function onChangeStyleThumb(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, thumb);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ thumb: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				thumbSelector
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
		function onAddStyleThumb(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, thumb);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ thumb: object });
		}
		function onResetThumb(sudoScources) {
			let obj = Object.assign({}, thumb);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						thumbSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ thumb: obj });
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
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
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
		function onAddStyleitemsWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemsWrap);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemsWrap: object });
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
		function onResetitemsWrap(sudoScources) {
			let obj = Object.assign({}, itemsWrap);
			Object.entries(sudoScources).map((args) => {
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
		function onPickCssLibraryitemsWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemsWrap[sudoScource] = sudoScourceArgs;
			});
			var itemsWrapX = Object.assign({}, itemsWrap);
			setAttributes({ itemsWrap: itemsWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemsWrapSelector
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

		function onRemoveStyleitemWrap(sudoScource, key) {
			let obj = { ...itemWrap };
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
			setAttributes({ itemWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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
		function onAddStyleitemWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, itemWrap);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ itemWrap: object });
		}
		function onChangeStyleitemWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, itemWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ itemWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemWrapSelector
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
		function onResetitemWrap(sudoScources) {
			let obj = Object.assign({}, itemWrap);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ itemWrap: obj });
		}
		function onBulkAdditemWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, itemWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ itemWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, itemWrapSelector);
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
		function onPickCssLibraryitemWrap(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				itemWrap[sudoScource] = sudoScourceArgs;
			});
			var itemWrapX = Object.assign({}, itemWrap);
			setAttributes({ itemWrap: itemWrapX });
			var styleObj = {};
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					itemWrapSelector
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

		function onBulkAddThumb(sudoScource, cssObj) {
			let obj = Object.assign({}, thumb);
			obj[sudoScource] = cssObj;
			setAttributes({ thumb: obj });
			var selector = myStore.getElementSelector(sudoScource, thumbSelector);
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
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ item: object });
		}
		function onResetItem(sudoScources) {
			let obj = Object.assign({}, item);
			Object.entries(sudoScources).map((args) => {
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
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
		}
		var iconPositionArgs = {
			none: { label: __("Choose Position", "combo-blocks"), value: "" },
			beforePrefix: {
				label: __("Before Prefix", "combo-blocks"),
				value: "beforePrefix",
			},
			afterPrefix: {
				label: __("After Prefix", "combo-blocks"),
				value: "afterPrefix",
			},
		};
		function setIconPosition(option, index) {
			var options = { ...icon.options, position: option.value };
			setAttributes({ icon: { ...icon, options: options } });
		}
		var dateFormats = {
			"Y-M-d": { label: "2022-Feb-25", value: "Y-M-d" },
			"Y-m-d": { label: "2022-05-25", value: "Y-m-d" },
			"d-m-y": { label: "25-05-2022", value: "d-m-y" },
			"d/m/y": { label: "25/05/2022", value: "d/m/y" },
			"y-m-d": { label: "2022-05-25", value: "y-m-d" },
			"y/m/d": { label: "2022/05/25", value: "y/m/d" },
			"D M y": { label: "Sun Feb 2022", value: "D M y" },
			"D M d, y": { label: "Sun Feb 11, 2022", value: "D M d, y" },
			"M D d, y": { label: "Feb Sun 11, 2022", value: "M D d, y" },
			"M d, y": { label: "Feb 11, 2022", value: "M d, y" },
			"F d, y": { label: "February 11, 2022", value: "F d, y" },
			"d M y": { label: "25 Feb 2022", value: "d M y" },
		};
		function formatDate(date = "2024-05-10", format = "Y-M-d") {
			const datePart = date.split(" ")[0];
			const dateFull = new Date(datePart);
			const day = dateFull.getDate();
			const month = dateFull.getMonth() + 1;
			const year = dateFull.getFullYear();
			const dayOfWeek = dateFull.toLocaleString("default", {
				weekday: "short",
			});
			const monthNameShort = dateFull.toLocaleString("default", {
				month: "short",
			});
			const monthNameFull = dateFull.toLocaleString("default", {
				month: "long",
			});
			const formatMap = {
				Y: year,
				y: year.toString().slice(-2),
				m: month < 10 ? `0${month}` : month,
				d: day < 10 ? `0${day}` : day,
				M: monthNameShort,
				F: monthNameFull,
				D: dayOfWeek,
			};
			return format.replace(/Y|y|m|d|M|F|D/g, (match) => formatMap[match]);
		}
		// const dateString = "2024-05-10 11:39am GMT";
		// const format = "D M d, y";
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="">
							<div className="px-3">
								<div className="my-3">
									{object.options.type == "plugin" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Choose Field", "combo-blocks")}
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={pluginFields}
													buttonTitle={
														wrapper.options.field == undefined ||
															wrapper.options.field.length == 0
															? __("Choose", "combo-blocks")
															: pluginFields[wrapper.options.field] == undefined
																? __("Choose", "combo-blocks")
																: pluginFields[wrapper.options.field].label
													}
													onChange={setUserField}
													values=""></PGDropdown>
											</PanelRow>
										</>
									)}
									{object.options.type == "theme" && (
										<>
											<PanelRow>
												<label
													htmlFor=""
													className="font-medium text-slate-900 ">
													{__("Choose Field", "combo-blocks")}
												</label>
												<PGDropdown
													position="bottom right"
													variant="secondary"
													options={themeFields}
													buttonTitle={
														wrapper.options.field == undefined ||
															wrapper.options.field.length == 0
															? __("Choose", "combo-blocks")
															: themeFields[wrapper.options.field] == undefined
																? __("Choose", "combo-blocks")
																: themeFields[wrapper.options.field].label
													}
													onChange={setUserField}
													values=""></PGDropdown>
											</PanelRow>
										</>
									)}
								</div>
							</div>
						</div>
						<PGtoggle
							className="font-medium text-slate-900 "
							title="Field"
							initialOpen={false}>
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									Prefix
								</label>
								<InputControl
									value={wrapper.options.prefix}
									onChange={(newVal) => {
										var optionsX = { ...wrapper.options, prefix: newVal };
										setAttributes({
											wrapper: { ...wrapper, options: optionsX },
										});
									}}
								/>
							</PanelRow>
							{(wrapper.options.field == "name" ||
								wrapper.options.field == "banners" ||
								wrapper.options.field == "screenshot_url") && (
									<>
										<ToggleControl
											className="my-3"
											label={`Linked to ${object.options?.type}`}
											help={
												wrapper.options?.linkToPlug
													? __("Link Enabled", "combo-blocks")
													: __("Link Disabled", "combo-blocks")
											}
											checked={wrapper.options?.linkToPlug ? true : false}
											onChange={(e) => {
												var options = {
													...wrapper.options,
													linkToPlug: wrapper.options.linkToPlug ? false : true,
												};
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</>
								)}
							{(wrapper.options.field == "last_updated" ||
								wrapper.options.field == "creation_time") && (
									<>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Date Format", "combo-blocks")}
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={dateFormats}
												// buttonTitle="Choose"
												buttonTitle={
													dateFormats[wrapper.options.dateFormat] != undefined
														? dateFormats[wrapper.options.dateFormat].label
														: __("Choose", "combo-blocks")
												}
												onChange={(option, index) => {
													var options = {
														...wrapper.options,
														dateFormat: option.value,
													};
													setAttributes({
														wrapper: { ...wrapper, options: options },
													});
												}}
												values={""}></PGDropdown>
										</PanelRow>
										<PanelRow className="mb-4">
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Custom Format", "combo-blocks")}
											</label>
											<InputControl
												className="mr-2"
												value={wrapper.options.dateFormat}
												onChange={(newVal) => {
													var options = {
														...wrapper.options,
														dateFormat: newVal,
													};
													setAttributes({
														wrapper: { ...wrapper, options: options },
													});
												}}
											/>
										</PanelRow>
									</>
								)}
							{wrapper.options.field == "banners" && (
								<PanelRow>
									<label htmlFor="">{__("Thumbnail Size", "combo-blocks")}</label>
									<SelectControl
										// label="Thumbnail Size"
										options={[
											{ label: "High", value: "high" },
											{ label: "Low", value: "low" },
										]}
										value={wrapper.options?.thumbSize}
										onChange={(newVal) => {
											var optionsX = {
												...wrapper.options,
												thumbSize: newVal,
											};
											setAttributes({
												wrapper: { ...wrapper, options: optionsX },
											});
										}}
									/>
								</PanelRow>
							)}
							{(wrapper.options.field == "homepage" ||
								wrapper.options.field == "download_link" ||
								wrapper.options.field == "preview_url" ||
								wrapper.options.field == "contributors") && (
									<>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												linkText
											</label>
											<InputControl
												value={wrapper.options.linkText}
												onChange={(newVal) => {
													var optionsX = {
														...wrapper.options,
														linkText: newVal,
													};
													setAttributes({
														wrapper: { ...wrapper, options: optionsX },
													});
												}}
											/>
										</PanelRow>
										<ToggleControl
											className="my-3"
											label={__("Is Linked?", "combo-blocks")}
											help={
												wrapper.options.isLink
													? __("Link Enabled", "combo-blocks")
													: __("Link Disabled", "combo-blocks")
											}
											checked={wrapper.options.isLink ? true : false}
											onChange={(e) => {
												var optionsX = {
													...wrapper.options,
													isLink: wrapper.options.isLink ? false : true,
												};
												setAttributes({
													wrapper: { ...wrapper, options: optionsX },
												});
											}}
										/>
										<div className="flex flex-col gap-2 mt-2 ">
											<label htmlFor="">
												{__("UTM or URL Prefix", "combo-blocks")}
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
												value={wrapper.options.urlPrefix}
												disabled={isProFeature}
												onChange={(newVal) => {
													var optionsX = {
														...wrapper.options,
														urlPrefix: newVal,
													};
													setAttributes({
														wrapper: { ...wrapper, options: optionsX },
													});
												}}
											/>
										</div>
									</>
								)}
							{wrapper.options.field == "contributors" && (
								<>
									<div className="flex gap-2 mt-2 ">
										<label htmlFor="">{__("Limit", "combo-blocks")}</label>
										<InputControl
											type="number"
											value={wrapper.options.limit}
											onChange={(newVal) => {
												var optionsX = {
													...wrapper.options,
													limit: newVal,
												};
												setAttributes({
													wrapper: { ...wrapper, options: optionsX },
												});
											}}
										/>
									</div>
									<ToggleControl
										className="my-3"
										label={__("Enable Avatar", "combo-blocks")}
										help={
											wrapper.options.enableAvatar
												? __("Avatar Enabled", "combo-blocks")
												: __("Avatar Disabled", "combo-blocks")
										}
										checked={wrapper.options?.enableAvatar ? true : false}
										onChange={(e) => {
											var optionsX = {
												...wrapper.options,
												enableAvatar: wrapper.options.enableAvatar
													? false
													: true,
											};
											setAttributes({
												wrapper: { ...wrapper, options: optionsX },
											});
										}}
									/>
									<ToggleControl
										className="my-3"
										label={__("Enable Name?", "combo-blocks")}
										help={
											wrapper.options.enableName
												? __("Name Enabled", "combo-blocks")
												: __("Name Disabled", "combo-blocks")
										}
										checked={wrapper.options.enableName ? true : false}
										onChange={(e) => {
											var optionsX = {
												...wrapper.options,
												enableName: wrapper.options.enableName ? false : true,
											};
											setAttributes({
												wrapper: { ...wrapper, options: optionsX },
											});
										}}
									/>
								</>
							)}
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Wrapper", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
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
												// { label: __("Choose","combo-blocks"), value: "" },
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
												// { label: "ol", value: "ol" },
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
										blockId={blockId}
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
							// title= {__("Icon","combo-blocks")}
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Icon", "combo-blocks")}</span>
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
									)}
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
													: iconPositionArgs[icon.options?.position]?.label
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
						{(wrapper.options.field == "tags" ||
							wrapper.options.field == "contributors" ||
							wrapper.options.field == "ratings") && (
								<>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Items Wrapper", "combo-blocks")}
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
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={itemsWrap}
													onChange={onPickCssLibraryitemsWrap}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
									<PGtoggle
										className="font-medium text-slate-900 "
										title={__("Item Wrapper", "combo-blocks")}
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
											<PGtab name="options"></PGtab>
											<PGtab name="styles">
												<PGStyles
													obj={itemWrap}
													onChange={(sudoScource, newVal, attr) => {
														myStore.onChangeStyleElement(
															sudoScource,
															newVal,
															attr,
															itemWrap,
															"itemWrap",
															itemWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onAdd={(sudoScource, key) => {
														myStore.onAddStyleElement(
															sudoScource,
															key,
															itemWrap,
															"itemWrap",
															setAttributes
														);
													}}
													onRemove={(sudoScource, key) => {
														myStore.onRemoveStyleElement(
															sudoScource,
															key,
															itemWrap,
															"itemWrap",
															itemWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onBulkAdd={(sudoScource, cssObj) => {
														myStore.onBulkAddStyleElement(
															sudoScource,
															cssObj,
															itemWrap,
															"itemWrap",
															itemWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
													onReset={(sudoSources) => {
														myStore.onResetElement(
															sudoSources,
															itemWrap,
															"itemWrap",
															itemWrapSelector,
															blockCssY,
															setAttributes
														);
													}}
												/>
											</PGtab>
											<PGtab name="css">
												<PGCssLibrary
													blockId={blockId}
													obj={itemWrap}
													onChange={onPickCssLibraryitemWrap}
												/>
											</PGtab>
										</PGtabs>
									</PGtoggle>
								</>
							)}

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
				{loading && (
					<div {...blockProps}>
						<Spinner />
					</div>
				)}
				{loading == false &&
					objectData != null &&
					object.options.type == "plugin" && (
						<CustomTagWrapper {...blockProps}>
							{icon.options?.position == "beforePrefix" && (
								<span
									className={icon.options?.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							<span>{wrapper.options.prefix}</span>
							{icon.options?.position == "afterPrefix" && (
								<span
									className={icon.options?.class}
									dangerouslySetInnerHTML={{ __html: iconHtml }}
								/>
							)}
							<span>
								{wrapper.options.field == "name" ? (
									<>
										{wrapper.options?.linkToPlug ? (
											<>
												<a href={object.options.data?.homepage}>
													{objectData.name}
												</a>
											</>
										) : (
											<>{objectData.name}</>
										)}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "version" ? objectData.version : ""}
								{wrapper.options.field == "author" && (
									<span
										dangerouslySetInnerHTML={{
											__html: objectData.author,
										}}></span>
								)}
								{wrapper.options.field == "author_profile"
									? objectData.author_profile
									: ""}
								{wrapper.options.field == "contributors" ? (
									<ul>
										{objectData.contributors != null &&
											Object.entries(objectData.contributors).map((x, i) => {
												var data = x[1];
												return (
													<li>
														<a href={data.profile}>{data.display_name}</a>
													</li>
												);
											})}
									</ul>
								) : (
									""
								)}
								{wrapper.options.field == "tested" ? objectData.tested : ""}
								{wrapper.options.field == "requires" ? objectData.requires : ""}
								{wrapper.options.field == "requires_php"
									? objectData.requires_php
									: ""}
								{wrapper.options.field == "requires_plugins"
									? objectData.requires_plugins
									: ""}
								{wrapper.options.field == "rating" ? objectData.rating : ""}
								{wrapper.options.field == "ratings" ? (
									<>
										{Object.entries(objectData.ratings).map((x, i) => {
											return (
												<li>
													{x[0]}: {x[1]}
												</li>
											);
										})}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "num_ratings"
									? objectData.num_ratings
									: ""}
								{wrapper.options.field == "support_threads"
									? objectData.support_threads
									: ""}
								{wrapper.options.field == "support_threads_resolved"
									? objectData.support_threads_resolved
									: ""}
								{wrapper.options.field == "active_installs"
									? objectData.active_installs
									: ""}
								{wrapper.options.field == "last_updated"
									? formatDate(
										objectData.last_updated,
										wrapper.options.dateFormat
									)
									: ""}
								{wrapper.options.field == "added" ? objectData.added : ""}
								{wrapper.options.field == "homepage" ? (
									<>
										{wrapper.options.isLink && (
											<a
												href={
													objectData.homepage + "?" + wrapper.options.urlPrefix
												}>
												{wrapper.options.linkText
													? wrapper.options.linkText
													: objectData.homepage}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.homepage}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "download_link" ? (
									<>
										{wrapper.options.isLink && (
											<a
												href={
													objectData.download_link +
													"?" +
													wrapper.options.urlPrefix
												}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.download_link}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "banners" ? (
									<>
										{wrapper.options?.linkToPlug ? (
											<>
												<a href={object.options.data?.homepage}>
													<img
														src={objectData?.banners[wrapper.options.thumbSize]}
														alt={objectData.name}
													/>
												</a>
											</>
										) : (
											<>
												<img
													src={objectData?.banners[wrapper.options.thumbSize]}
													alt={objectData.name}
												/>
											</>
										)}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "tags" ? (
									<ul>
										{Object.entries(objectData.tags).map((x, i) => {
											return <li> {x[1]}</li>;
										})}
									</ul>
								) : (
									""
								)}
							</span>
						</CustomTagWrapper>
					)}
				{loading == false &&
					objectData != null &&
					object.options.type == "theme" && (
						<CustomTagWrapper {...blockProps}>
							<span>{wrapper.options.prefix}</span>
							<span>
								{wrapper.options.field == "name" ? (
									<>
										{wrapper.options?.linkToPlug ? (
											<>
												<a href={object.options.data?.theme_url}>
													{objectData.name}
												</a>
											</>
										) : (
											<>{objectData.name}</>
										)}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "version" ? objectData.version : ""}
								{wrapper.options.field == "is_commercial" ? (
									<>
										{objectData.is_commercial && "Yes"}
										{!objectData.is_commercial && "No"}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "preview_url" ? (
									<>
										{wrapper.options.isLink && (
											<a
												href={
													objectData.preview_url +
													"?" +
													wrapper.options.urlPrefix
												}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.preview_url}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "author" && (
									<span
										dangerouslySetInnerHTML={{
											__html: objectData.author,
										}}></span>
								)}
								{wrapper.options.field == "screenshot_url" ? (
									<>
										{wrapper.options.linkToPlug && (
											<a href={objectData.theme_url}>
												<img
													src={
														objectData.screenshot_url == undefined
															? ""
															: objectData.screenshot_url
													}
													alt={objectData.name}
												/>
											</a>
										)}
										{!wrapper.options.linkToPlug && (
											<img
												src={
													objectData.screenshot_url == undefined
														? ""
														: objectData.screenshot_url
												}
												alt={objectData.name}
											/>
										)}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "rating" ? objectData.rating : ""}
								{wrapper.options.field == "ratings" ? (
									<>
										{Object.entries(objectData.ratings).map((x, i) => {
											return (
												<li>
													{x[0]}: {x[1]}
												</li>
											);
										})}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "num_ratings"
									? objectData.num_ratings
									: ""}
								{wrapper.options.field == "reviews_url" ? (
									<>
										{wrapper.options.isLink && (
											<a href={objectData.reviews_url}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.reviews_url}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "last_updated"
									? formatDate(
										objectData.last_updated,
										wrapper.options.dateFormat
									)
									: ""}
								{wrapper.options.field == "creation_time"
									? formatDate(
										objectData.creation_time,
										wrapper.options.dateFormat
									)
									: ""}
								{wrapper.options.field == "homepage" ? (
									<>
										{wrapper.options.isLink && (
											<a
												href={
													objectData.homepage + "?" + wrapper.options.urlPrefix
												}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.homepage}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "tags" ? (
									<>
										{Object.entries(objectData.tags).map((x, i) => {
											return <li> {x[1]}</li>;
										})}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "download_link" ? (
									<>
										{wrapper.options.isLink && (
											<a
												href={
													objectData.download_link +
													"?" +
													wrapper.options.urlPrefix
												}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && <>{objectData.download_link}</>}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "requires" ? objectData.requires : ""}
								{wrapper.options.field == "requires_php"
									? objectData.requires_php
									: ""}
								{wrapper.options.field == "external_support_url" ? (
									<>
										{wrapper.options.isLink && (
											<a href={objectData.external_support_url}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && (
											<>{objectData.external_support_url}</>
										)}
									</>
								) : (
									""
								)}
								{wrapper.options.field == "external_repository_url" ? (
									<>
										{wrapper.options.isLink && (
											<a href={objectData.external_repository_url}>
												{wrapper.options.linkText}
											</a>
										)}
										{!wrapper.options.isLink && (
											<>{objectData.external_repository_url}</>
										)}
									</>
								) : (
									""
								)}
							</span>
						</CustomTagWrapper>
					)}
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
