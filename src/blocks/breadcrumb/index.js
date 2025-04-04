import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select } from "@wordpress/data";
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
					d="M159.996 80.3332C159.996 80.7777 159.551 81.2221 159.551 81.6666L148.44 91.4443C147.551 91.8888 146.662 91.8888 146.218 91.4443C145.773 90.5554 145.773 89.6666 146.218 89.2221L155.996 80.7777L146.218 72.3332C145.329 71.8888 145.329 70.5554 146.218 70.111C146.662 69.2221 147.996 69.2221 148.44 70.111L159.551 79.8888C159.996 79.4443 159.996 79.8888 159.996 80.3332Z"
					fill="#C15940"
				/>
				<path
					d="M75.107 80.3333C75.107 80.7778 74.6626 81.2222 74.6626 81.6667L63.5515 91C62.6626 91.4444 61.7737 91.4444 61.3293 91C60.8848 90.1111 60.8848 89.2222 61.3293 88.7778L71.107 80.3333L61.3293 71.8889C60.4404 71.4444 60.4404 70.1111 61.3293 69.6667C61.7737 68.7778 63.107 68.7778 63.5515 69.6667L74.6626 79.4444C75.107 79.4444 75.107 79.8889 75.107 80.3333Z"
					fill="#C15940"
				/>
				<path
					d="M47.5517 69.2222H-0.00390625V91.4444H47.5517V69.2222Z"
					fill="url(#paint0_linear_61_603)"
				/>
				<path
					d="M36.4403 77.2222H11.1069V82.9999H36.4403V77.2222Z"
					fill="white"
				/>
				<path
					d="M131.996 69.2222H84.8853V91.4444H132.441V69.2222H131.996Z"
					fill="url(#paint1_linear_61_603)"
				/>
				<path
					d="M120.885 77.2222H95.5518V82.9999H120.885V77.2222Z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_603"
						x1="-0.00390625"
						y1="80.3333"
						x2="47.5517"
						y2="80.3333"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_603"
						x1="84.8853"
						y1="80.3333"
						x2="132.441"
						y2="80.3333"
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
		var separator = attributes.separator;
		var schema = attributes.schema;
		var link = attributes.link;
		var blockCssY = attributes.blockCssY;
		var postId = context["postId"];
		var postType = context["postType"];
		var utmTracking = attributes.utmTracking;
		var wrapperSelector = blockClass;
		// Wrapper CSS Class Selectors
		var itemSelector = blockClass + " .item";
		var linkSelector = blockClass + " .item a";
		var iconSelector = blockClass + " .item .icon";
		var labelSelector = blockClass + " .item .label";
		var separatorSelector = blockClass + " .item .separator";
		var [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
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
			blockCssObj[linkSelector] = link;
			blockCssObj[separatorSelector] = separator;
			elements.items.map((x, i) => {
				var selector = `${blockClass}  .item:nth-child(${i + 1})`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		function regenerateElementStyle() {
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
			blockCssObj[linkSelector] = link;
			blockCssObj[separatorSelector] = separator;
			elements.items.map((x, i) => {
				var selector = `${blockClass}  .item:nth-child(${i + 1})`;
				blockCssObj[selector] = x;
			});
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}
		useEffect(() => {
			regenerateElementStyle();
			setTimeout((x) => {
				//setAttributes({ blockCssY: { items: newValuesObjX } });
			}, 2000);
		}, [elements]);
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
				// var blockId = attributes.blockId
				var wrapperX = attributes.wrapper;
				var iconX = attributes.icon;
				var labelX = attributes.label;
				var separatorX = attributes.separator;
				var elementsX = attributes.elements;
				// var schemaX = attributes.schema;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
				}
				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}
				if (elementsX != undefined) {
					var elementsY = { ...elementsX, options: elements.options };
					setAttributes({ elements: elementsY });
					blockCssObj[itemSelector] = elementsY;
				}
				// if (schemaX != undefined) {
				// 	var schemaY = { ...schemaX, options: schema.options };
				// 	setAttributes({ schema: schemaY });
				// 	blockCssObj[schemaSelector] = schemaY;
				// }
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
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		var breadcrumbElementsSourceBasic = [
			{
				id: "text",
				label: __("Text", "combo-blocks"),
				customText: "You are here: ",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					text: "You are here: ",
					showSeparator: true,
					isLink: false,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "homePage",
				label: __("Home Page Link", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					isLink: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "frontPage",
				label: __("Front Page Link", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postsPage",
				label: __("Posts Page Link", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTitle",
				label: __("Post Title", "combo-blocks"),
				customText: "",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					isLink: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postAuthor",
				label: __("Post Author", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postDate",
				label: __("Post Date", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "Y-m-d",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postDay",
				label: __("Post Day", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postMonth",
				label: __("Post Month", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postYear",
				label: __("Post Year", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					format: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postId",
				label: __("Post Id", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postCategory",
				label: __("Post Category", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTag",
				label: __("Post Tag", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "termTitle",
				label: __("Term Title", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcShop",
				label: __("WooCommerce Shop", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcAccount",
				label: __("WooCommerce Account", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "searchText",
				label: __("Search Text", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "archiveTitle",
				label: __("Archive Title", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "404Text",
				label: __("404 Text", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "dateText",
				label: __("Date Text", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y-m-d",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "monthText",
				label: __("Month Text", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y-m",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "yearText",
				label: __("Year Text", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					format: "Y",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "authorName",
				label: __("Author Name", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postAncestors",
				isPro: true,
				label: __("Post Ancestors", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					count: "",
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postCategories",
				isPro: true,
				label: __("Post Categories", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					maxCount: 3,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTags",
				isPro: true,
				label: __("Post Tags", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					maxCount: 3,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTerm",
				isPro: true,
				label: __("Post Term", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "postTerms",
				isPro: true,
				label: __("Post Terms", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "termParents",
				isPro: true,
				label: __("Term Parents", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
					count: 0,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "termAncestors",
				isPro: true,
				label: __("Term Ancestors", "combo-blocks"),
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					taxonomy: "",
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcCart",
				label: __("WooCommerce Cart", "combo-blocks"),
				isPro: true,
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
			{
				id: "wcCheckout",
				label: __("WooCommerce Checkout", "combo-blocks"),
				isPro: true,
				customText: "%s",
				url: "",
				siteIcon: {
					library: "fontAwesome",
					srcType: "class",
					/*class, html, img, svg */ iconSrc: "",
				},
				options: {
					showSeparator: true,
				},
				styles: {
					color: { Desktop: "" },
					backgroundColor: { Desktop: "" },
					padding: { Desktop: "" },
					margin: { Desktop: "" },
				},
			},
		];
		let linkElementsArgs = applyFilters(
			"comboBlocksBreadcrumbElementsSource",
			breadcrumbElementsSourceBasic
		);
		// let linkElementsArgs = linkElementsArgsBasic;
		let isProFeature = applyFilters("isProFeature", true);
		var elementSources = {
			none: { label: "Manual", value: "" },
			dynamic: { label: "Dynamic", value: "dynamic" },
		};
		function addMedia(option, index) {
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
		function onRemoveStyleLink(sudoScource, key) {
			let obj = { ...link };
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
			setAttributes({ link: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				linkSelector
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
		function onRemoveStyleSeparator(sudoScource, key) {
			let obj = { ...separator };
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
			setAttributes({ separator: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
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
		function onResetLink(sudoSources) {
			let obj = Object.assign({}, link);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						linkSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ link: obj });
		}
		function onResetSeparator(sudoSources) {
			let obj = Object.assign({}, separator);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
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

		function onAddStyleWrapper(sudoScource, key) {
			myStore.onAddStyleElement(
				sudoScource,
				key,
				wrapper,
				"wrapper",
				setAttributes
			);
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
		function onChangeStyleLink(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, link);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ link: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				linkSelector
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
		function onAddStyleLink(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, link);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ link: object });
		}
		function onChangeStyleSeparator(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ separator: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				separatorSelector
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
		function onAddStyleSeparator(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, separator);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ separator: object });
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
		function onBulkAddLink(sudoScource, cssObj) {
			let obj = Object.assign({}, link);
			obj[sudoScource] = cssObj;
			setAttributes({ link: obj });
			var selector = myStore.getElementSelector(sudoScource, linkSelector);
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
		function onBulkAddSeperator(sudoScource, cssObj) {
			let obj = Object.assign({}, separator);
			obj[sudoScource] = cssObj;
			setAttributes({ separator: obj });
			var selector = myStore.getElementSelector(sudoScource, separatorSelector);
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
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		let counts = 0;
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
									<div className="my-3">
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Element Sources", "combo-blocks")}
											</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												options={elementSources}
												buttonTitle={
													elements.options?.elementSource == undefined ||
														elements.options?.elementSource.length == 0
														? __("Choose...", "combo-blocks")
														: elementSources[elements.options?.elementSource] ==
															undefined
															? __("Choose...", "combo-blocks")
															: elementSources[elements.options?.elementSource]
																.label
												}
												onChange={(newVal) => {
													var options = {
														...elements.options,
														elementSource: newVal.value,
													};
													setAttributes({
														elements: { ...elements, options: options },
													});
												}}
												value={elements.options?.elementSource}
											/>
										</PanelRow>
									</div>
									{elements.options?.elementSource == "dynamic" && (
										<div className="my-3 p-3 bg-green-200 inline-block">
											{__(
												"Elements will automatically generated based on page types.",
												"combo-blocks"
											)}
										</div>
									)}
									{elements.options?.elementSource != "dynamic" && (
										<>
											<div className="my-3">
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Add Element", "combo-blocks")}
													</label>
													<PGDropdown
														position="bottom right"
														variant="secondary"
														options={linkElementsArgs}
														buttonTitle="Choose"
														onChange={addMedia}
														values=""></PGDropdown>
												</PanelRow>
											</div>
											<ReactSortable
												list={elements.items}
												handle={".handle"}
												setList={(item) => {
													setAttributes({
														elements: { ...elements, items: item },
													});
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
																	<div>
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			{__("Custom Label", "combo-blocks")}
																		</label>
																		<InputControl
																			value={item.customText}
																			placeholder="You Text: %s"
																			onChange={(newVal) => {
																				var elementX = { ...elements };
																				var items = elementX.items;
																				items[index].customText = newVal;
																				setAttributes({
																					elements: {
																						...elements,
																						items: items,
																					},
																				});
																			}}
																		/>
																		<p>
																			Please use <code>%s</code> for output
																		</p>
																	</div>
																	<ToggleControl
																		label="Is Linked?"
																		help={
																			item.options?.isLink
																				? "Linked to URL"
																				: "Not linked to URL."
																		}
																		checked={
																			item.options?.isLink ? true : false
																		}
																		onChange={(e) => {
																			var options = {
																				...item.options,
																				isLink: item.options.isLink
																					? false
																					: true,
																			};
																			elements.items[index].options = options;
																			// var items = {
																			// 	...items,
																			// 	options: options,
																			// }
																			setAttributes({
																				elements: {
																					...elements,
																					items: elements.items,
																				},
																			});
																		}}
																	/>
																	<div className="my-3">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			{__("Custom URL", "combo-blocks")}
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
																	</div>
																	{(item.id == "postTerms" ||
																		item.id == "postTerm") && (
																			<div className="my-3">
																				<label
																					for=""
																					className="font-medium text-slate-900 ">
																					{__("Taxonomy", "combo-blocks")}
																				</label>
																				<InputControl
																					value={item.options.taxonomy}
																					onChange={(newVal) => {
																						elements.items[
																							index
																						].options.taxonomy = newVal;
																						setAttributes({
																							elements: {
																								...elements,
																								items: elements.items,
																							},
																						});
																					}}
																				/>
																			</div>
																		)}
																	{(item.id == "termParents" ||
																		item.id == "postAncestors") && (
																			<>
																				<div className="my-3">
																					<label
																						for=""
																						className="font-medium text-slate-900 ">
																						{__("Max Count", "combo-blocks")}
																					</label>
																					<InputControl
																						value={item.options.count}
																						onChange={(newVal) => {
																							elements.items[
																								index
																							].options.count = newVal;
																							setAttributes({
																								elements: {
																									...elements,
																									items: elements.items,
																								},
																							});
																						}}
																					/>
																					<p>
																						Use <code>-</code> (negetive sign) to
																						count from end.
																					</p>
																				</div>
																			</>
																		)}
																	{(item.id == "dateText" ||
																		item.id == "monthText" ||
																		item.id == "yearText" ||
																		item.id == "postDate" ||
																		item.id == "postDay" ||
																		item.id == "postMonth" ||
																		item.id == "postYear") && (
																			<div className="my-3">
																				<label
																					for=""
																					className="font-medium text-slate-900 ">
																					{__("Date Format", "combo-blocks")}
																				</label>
																				<InputControl
																					value={item.options.format}
																					onChange={(newVal) => {
																						elements.items[index].options.format =
																							newVal;
																						setAttributes({
																							elements: {
																								...elements,
																								items: elements.items,
																							},
																						});
																					}}
																				/>
																			</div>
																		)}
																	<PanelRow>
																		<label
																			htmlFor=""
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
										</>
									)}
									<ToggleControl
										className="my-3"
										label={__("Display Label?", "combo-blocks")}
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
									<PanelRow className="my-3">
										<div className="flex w-full justify-between items-center">
											<ToggleControl
												className="my-3"
												disabled={isProFeature}
												label={__("Display Icon?", "combo-blocks")}
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
											<div>
												{isProFeature && (
													<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white">
														<a
															target="_blank"
															href={
																"https://pickplugins.com/combo-blocks/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginComboBlocks&utm_medium="
																// x.label
															}>
															{__("Pro", "combo-blocks")}
														</a>
													</span>
												)}
											</div>
										</div>
									</PanelRow>
									<ToggleControl
										className="my-3"
										label={__("Display Separator?", "combo-blocks")}
										help={
											elements?.options?.showSeparator
												? __("Separator is displaying", "combo-blocks")
												: __("Separator is hidden", "combo-blocks")
										}
										checked={elements?.options?.showSeparator ? true : false}
										onChange={(e) => {
											var options = {
												...elements.options,
												showSeparator: elements.options.showSeparator
													? false
													: true,
											};
											setAttributes({
												elements: { ...elements, options: options },
											});
										}}
									/>
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
												{
													label: __("Before Separator", "combo-blocks"),
													value: "beforeSeparator",
												},
												{
													label: __("After Separator", "combo-blocks"),
													value: "afterSeparator",
												},
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
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
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Label", "combo-blocks")}
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
								]}>
								<PGtab name="options"></PGtab>
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
							title={__("Link", "combo-blocks")}
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
								]}>
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={link}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												link,
												"link",
												linkSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={onAddStyleLink}
										onBulkAdd={onBulkAddLink}
										onReset={onResetLink}
										onRemove={onRemoveStyleLink}
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Separator Text", "combo-blocks")}
										</label>
										<InputControl
											value={separator.options.text}
											onChange={(newVal) => {
												var options = { ...separator.options, text: newVal };
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
										onChange={onChangeStyleSeparator}
										onAdd={onAddStyleSeparator}
										onBulkAdd={onBulkAddSeperator}
										onReset={onResetSeparator}
										onRemove={onRemoveStyleSeparator}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="Schema"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Schema", "combo-blocks")}</span>
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
							<ToggleControl
								label={__("Enable Schema?", "combo-blocks")}
								help={
									schema.options.enable
										? __("Schema Enabled", "combo-blocks")
										: __("Schema Disabled.", "combo-blocks")
								}
								checked={schema.options.enable ? true : false}
								onChange={(e) => {
									var options = {
										...schema.options,
										enable: schema.options.enable ? false : true,
									};
									setAttributes({ schema: { ...schema, options: options } });
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
				{elements.items.length == 0 && (
					<>
						<div className="flex justify-center  my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										{__("Click to pick a variation", "combo-blocks")}
									</div>
									<div
										className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											var content =
												'<!-- wp:combo-blocks/breadcrumb {"wrapper":{"options":{"tag":"div","class":"pg-breadcrumb"},"styles":{"display":{"Desktop":"flex"},"margin":{"Desktop":"0px 0px 0px 0px"},"padding":{"Desktop":"0px 0px 0px 0px"},"backgroundColor":{"Desktop":"#dedddd"},"border":{"Desktop":"1px solid #a6a0fb"},"lineHeight":[],"maxWidth":[],"width":[],"height":[],"borderRadius":{"Desktop":"5px 5px 5px 5px"},"gap":[],"flexDirection":[],"flexWrap":{"Tablet":"wrap !important"},"overflow":{"Mobile":"hidden"}}},"label":{"options":{"class":""},"styles":{"color":[],"fontSize":[],"fontStyle":[],"fontWeight":[],"listStyle":[]}},"link":{"options":[],"styles":{"color":{"Desktop":"#5196e4 !important"},"fontSize":[],"fontStyle":[],"fontWeight":[],"margin":{"Desktop":"0px 10px 0px 10px"},"padding":{"Desktop":"5px 0px 5px 0px"},"textDecoration":{"Desktop":"none #000000 wavy 1px !important"}}},"elements":{"options":{"linkTarget":"_blank","showLabel":true,"showSeparator":true,"showIcon":false,"iconPositon":"beforeLabel"},"styles":{"color":{"Desktop":"#5196e4 !important"},"fontSize":{"Desktop":"16px"},"fontStyle":[],"fontWeight":[],"display":[],"padding":{"Tablet":"10px 10px 10px 20px","Desktop":"0px 10px 0px 10px"},"backgroundColor":{"Tablet":"#dedddd"},"borderRadius":{"Tablet":"5px 5px 5px 5px"},"border":{"Tablet":"1px solid #a6a0fb"},"listStyle":{"Desktop":"none"},"lineHeight":{"Desktop":"40px"}},"items":[{"id":"text","label":"Text","customText":"You are here:","url":"","siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"},"options":{"text":"You are here: ","showSeparator":true,"isLink":false},"styles":[],"chosen":false,"selected":false},{"id":"homePage","label":"Home Page Link","customText":"","url":"","siteIcon":{"srcType":"class","library":"iconFont","iconSrc":"fas fa-caret-right"},"options":{"showSeparator":true,"isLink":true},"styles":[],"chosen":false,"selected":false},{"id":"postTitle","label":"Post Title","customText":"","url":"","siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"},"options":{"showSeparator":true,"isLink":true},"styles":[],"chosen":false,"selected":false}]},"blockCssY":{"items":{".pg07261194bc7a":{"display":{"Desktop":"flex"},"margin":{"Desktop":"0px 0px 0px 0px"},"padding":{"Desktop":"0px 0px 0px 0px"},"background-color":{"Desktop":"#dedddd"},"border":{"Desktop":"1px solid #a6a0fb"},"border-radius":{"Desktop":"5px 5px 5px 5px"},"flex-wrap":{"Tablet":"wrap !important"},"overflow":{"Mobile":"hidden"}},".pg07261194bc7a .item":{"color":{"Desktop":"#5196e4 !important"},"font-size":{"Desktop":"16px"},"padding":{"Tablet":"10px 10px 10px 20px","Desktop":"0px 10px 0px 10px"},"background-color":{"Tablet":"#dedddd"},"border-radius":{"Tablet":"5px 5px 5px 5px"},"border":{"Tablet":"1px solid #a6a0fb"},"list-style":{"Desktop":"none"},"line-height":{"Desktop":"40px"}},".pg07261194bc7a .item:items":{"0":{"id":"text","label":"Text","customText":"You are here:","url":"","siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"},"options":{"text":"You are here: ","showSeparator":true,"isLink":false},"styles":[],"chosen":false,"selected":false},"1":{"id":"homePage","label":"Home Page Link","customText":"","url":"","siteIcon":{"srcType":"class","library":"iconFont","iconSrc":"fas fa-caret-right"},"options":{"showSeparator":true,"isLink":true},"styles":[],"chosen":false,"selected":false},"2":{"id":"postTitle","label":"Post Title","customText":"","url":"","siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"},"options":{"showSeparator":true,"isLink":true},"styles":[],"chosen":false,"selected":false}},".pg07261194bc7a .item .icon":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"margin":{"Desktop":"0px 10px 0px 0px"}},".pg07261194bc7a .item a":{"color":{"Desktop":"#5196e4 !important"},"margin":{"Desktop":"0px 10px 0px 10px"},"padding":{"Desktop":"5px 0px 5px 0px"},"text-decoration":{"Desktop":"none #000000 wavy 1px !important"}},".pg07261194bc7a .item .separator":{"color":{"Desktop":"#000000 !important"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"margin":{"Desktop":"0px 10px 0px 10px"}},".pg07261194bc7a  .item:nth-child(1):id":{"0":"t","1":"e","2":"x","3":"t"},".pg07261194bc7a  .item:nth-child(1):label":{"0":"T","1":"e","2":"x","3":"t"},".pg07261194bc7a  .item:nth-child(1):customText":{"0":"Y","1":"o","2":"u","3":" ","4":"a","5":"r","6":"e","7":" ","8":"h","9":"e","10":"r","11":"e","12":":"},".pg07261194bc7a  .item:nth-child(1):siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"},".pg07261194bc7a  .item:nth-child(2):id":{"0":"h","1":"o","2":"m","3":"e","4":"P","5":"a","6":"g","7":"e"},".pg07261194bc7a  .item:nth-child(2):label":{"0":"H","1":"o","2":"m","3":"e","4":" ","5":"P","6":"a","7":"g","8":"e","9":" ","10":"L","11":"i","12":"n","13":"k"},".pg07261194bc7a  .item:nth-child(2):siteIcon":{"srcType":"class","library":"iconFont","iconSrc":"fas fa-caret-right"},".pg07261194bc7a  .item:nth-child(3):id":{"0":"p","1":"o","2":"s","3":"t","4":"T","5":"i","6":"t","7":"l","8":"e"},".pg07261194bc7a  .item:nth-child(3):label":{"0":"P","1":"o","2":"s","3":"t","4":" ","5":"T","6":"i","7":"t","8":"l","9":"e"},".pg07261194bc7a  .item:nth-child(3):siteIcon":{"srcType":"class","library":"fontAwesome","iconSrc":"fas fa-caret-right"}}},"blockId":"pg07261194bc7a"} /-->';
											wp.data
												.dispatch("core/block-editor")
												.replaceBlock(clientId, wp.blocks.parse(content));
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...blockProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"breadcrumb"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					</>
				)}
				{elements.options?.elementSource == "dynamic" && (
					<>
						<div className="my-3 p-3 bg-green-200">
							Elements will automatically generated based on page types.
						</div>
						<ol {...blockProps}>
							<li className="item item-0">
								<a href="#home">
									{elements.options.showIcon &&
										icon.options.position === "beforeLabel" && (
											<span className="icon fas fa-home"></span>
										)}
									{/* {"Home"} */}
									{elements.options.showLabel && (
										<span className="label">Home</span>
									)}
									{elements.options.showIcon &&
										icon.options.position === "afterLabel" && (
											<span className="icon fas fa-home"></span>
										)}
								</a>
							</li>
							{elements.options.showSeparator && (
								<>
									{elements.options.showIcon &&
										icon.options.position === "beforeSeparator" && (
											<span className="icon fas fa-home"></span>
										)}
									<span className="separator">{separator.options.text}</span>
									{elements.options.showIcon &&
										icon.options.position === "afterSeparator" && (
											<span className="icon fas fa-home"></span>
										)}
								</>
							)}
							<li className="item item-1">
								<a href="#new-page">
									{elements.options.showIcon &&
										icon.options.position === "beforeLabel" && (
											<span className="icon fas fa-file-alt"></span>
										)}
									{/* {"New Page"} */}
									{elements.options.showLabel && (
										<span className="label">New Page</span>
									)}
									{elements.options.showIcon &&
										icon.options.position === "afterLabel" && (
											<span className="icon fas fa-file-alt"></span>
										)}
								</a>
							</li>
						</ol>
					</>
				)}
				{elements.options?.elementSource != "dynamic" && (
					<>
						{elements.items.length > 0 && (
							<ol {...blockProps}>
								{elements.items.map((x, index) => {
									counts++;
									const showSeparator = counts < elements.items.length;
									return (
										<li className={"item item-" + index} key={index}>
											{x.options?.isLink == true && (
												<a href={x.url}>
													{elements.options.showIcon &&
														icon.options.position == "beforeLabel" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
													{x.customText}
													{elements.options.showLabel && (
														<span className="label">
															{x.customText.length > 0 ? x.customText : x.label}
														</span>
													)}
													{elements.options.showIcon &&
														icon.options.position == "afterLabel" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
												</a>
											)}
											{x.options?.isLink == false && (
												<>
													{elements?.options?.showIcon &&
														icon.options.position == "beforeLabel" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
													{elements?.options?.showLabel && (
														<span className="label">
															{x.customText.length > 0 ? x.customText : x.label}
														</span>
													)}
													{elements?.options?.showIcon &&
														icon.options.position == "afterLabel" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
												</>
											)}
											{elements.options?.showSeparator && showSeparator && (
												<>
													{elements?.options?.showIcon &&
														icon.options.position == "beforeSeparator" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
													{showSeparator && (
														<span className="separator">
															{separator.options.text}
														</span>
													)}
													{elements?.options?.showIcon &&
														icon.options.position == "afterSeparator" && (
															<span
																className={`icon ${x.siteIcon.iconSrc}`}></span>
														)}
												</>
											)}
										</li>
									);
								})}
							</ol>
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
