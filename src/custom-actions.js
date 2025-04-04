import apiFetch from "@wordpress/api-fetch";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { subscribe, select } from "@wordpress/data";
import { addAction } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import React from "react";
import ReactDOM from "react-dom";
import { hooks } from "@wordpress/hooks";
import { memo, useMemo, useState, useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	close,
	mediaAndText,
} from "@wordpress/icons";
import PGtabs from "./components/tabs";
import PGtab from "./components/tab";
import PGStyles from "./components/styles";
import PGCssLibrary from "./components/css-library";
import PGtoggle from "./components/toggle";
import PGVisible from "./components/visible";
import PGMailSubsctibe from "./components/mail-subscribe";
import PGContactSupport from "./components/contact-support";
import PGTutorials from "./components/tutorials";
import PGAnimateOn from "./components/animate-on";
import PGTilt from "./components/tilt";
import PGTooltip from "./components/tooltip";
import PGLightbox from "./components/lightbox";
import PGLazyLoad from "./components/lazy-load";
import PGUtmTracking from "./components/utm-tracking";
var myStore = wp.data.select("ComboBlocksStore");
const CustomActions = ({ props }) => {
	var clientId = props.clientId;
	var blockName = props.name;
	var blockNameLast = blockName.split("/")[1];
	var attributes = props.attributes;
	var blockId = attributes.blockId;
	var prefix = attributes.prefix;
	var postfix = attributes.postfix;
	var animateOn = attributes.animateOn;
	var tilt = attributes.tilt;
	var tooltip = attributes.tooltip;
	var lightbox = attributes.lightbox;
	var utmTracking = { ...attributes.utmTracking };
	var visible = attributes.visible;
	var lazyLoad = attributes.lazyLoad;

	var blockIdX = attributes.blockId
		? attributes.blockId
		: "pg" + clientId.split("-").pop();
	var blockClass = "." + blockIdX;
	var setAttributes = props.setAttributes;
	var [optionData, setoptionData] = useState({ addons: { enabled: ["visibility", "animateOn", "tilt", "tooltip", "lightbox", "utmTracking", "lazyLoad"] } }); // Using the hook.
	var [blockVariations, setblockVariations] = useState(null); // Using the hook.
	let isProFeature = applyFilters("isProFeature", true);
	const prefixSelector = blockClass + " .prefix";
	const postfixSelector = blockClass + " .postfix";
	useEffect(() => {
		apiFetch({
			path: "/combo-blocks/v2/get_options",
			method: "POST",
			data: { option: "combo_blocks_settings" },
		}).then((res) => {
			if (res.length != 0) {
				setoptionData({ ...res });
			}
		});
	}, []);
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
			var textX = attributes.text;
			var blockCssY = attributes.blockCssY;
			var blockCssObj = {};
			if (textX != undefined) {
				var textY = { ...textX, options: text.options };
				setAttributes({ text: textY });
				blockCssObj[textSelector] = textY;
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
	return (
		<div className="">
			{optionData?.addons?.enabled?.includes("visibility") && (
				<>
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
				</>
			)}
			{blockNameLast == "text" && (
				<>
					{optionData?.addons?.enabled?.includes("animateOn") && (
						<>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Animate On", "combo-blocks")}
								initialOpen={false}>
								<PGAnimateOn
									animateOn={animateOn}
									onChange={(prams) => {
										setAttributes({ animateOn: prams });
									}}
								/>
							</PGtoggle>
						</>
					)}
				</>
			)}
			{blockNameLast == "image" && (
				<>
					{optionData?.addons?.enabled?.includes("tilt") && (
						<>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Tilt", "combo-blocks")}
								initialOpen={false}>
								<PGTilt
									tilt={tilt}
									onChange={(prams) => {
										setAttributes({ tilt: prams });
									}}
								/>
							</PGtoggle>
						</>
					)}
				</>
			)}
			{blockNameLast == "image" && (
				<>
					{optionData?.addons?.enabled?.includes("tooltip") && (
						<>
							<PGtoggle
								className="font-medium text-slate-900 "
								title={__("Tooltip", "combo-blocks")}
								initialOpen={false}>
								<PGTooltip
									tooltip={tooltip}
									onChange={(prams) => {
										setAttributes({ tooltip: prams });
									}}
								/>
							</PGtoggle>
						</>
					)}
				</>
			)}
			{(blockNameLast == "icon"
				|| blockNameLast == "image"
				|| blockNameLast == "post-title"
			) && (
					<>
						{optionData?.addons?.enabled?.includes("utmTracking") && (
							<>
								<PGtoggle
									className="font-medium text-slate-900 "
									title={__("UTM Tracking On", "combo-blocks")}
									initialOpen={false}>
									<PGUtmTracking
										utmTracking={utmTracking}
										onChange={(prams) => {
											setAttributes({ utmTracking: prams });
										}}
									/>
								</PGtoggle>
							</>
						)}
					</>
				)}
			{blockNameLast == "image" && (
				<>
					{optionData?.addons?.enabled?.includes("lightbox") && (
						<>
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
						</>
					)}
					{optionData?.addons?.enabled?.includes("lazyLoad") && (
						<>{blockId}
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
						</>
					)}
				</>
			)}
		</div>
	);
};
const myFunction = (arg1, arg2) => {
	console.log(arg1, arg2); // Should output 'Hello' 'Hola'
};
wp.domReady(() => {
	wp.hooks.addAction(
		"PGEndOfPanels",
		"combo-blocks/custom-actions",
		function (props) {

			setTimeout(() => {
				const container = document.getElementById("PGEndOfPanels");
				if (container != null) {
					ReactDOM.render(<CustomActions props={props} />, container);
				}
			}, 200);
		}
	);
	wp.hooks.addAction('PGEndOfPanelsB', 'function_name', myFunction);
})
