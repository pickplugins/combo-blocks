import apiFetch from "@wordpress/api-fetch";
import { select, subscribe } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

import "./store";
import "./templates";
const { isSavingPost, getCurrentPostId } = select("core/editor");
var comboBlocksDisabledBlocks;
window.ComboBlocksPluginData = {
	freeUrl: "https://wordpress.org/plugins/combo-blocks/",
	proUrl: "https://pickplugins.com/combo-blocks/",
	websiteUrl: "https://pickplugins.com/",
	demoUrl: "http://comboblocks.com/",
	wpReviewUrl:
		"https://wordpress.org/support/plugin/combo-blocks/reviews/#new-post",
	reviewUrl: "http://comboblocks.com/submit-review",
	renewLicense: "https://pickplugins.com/renew-license/?licenseKey=",
	hasSubscribed: false,
	utm: {
		utm_source: "",
		utm_medium: "",
		utm_campaign: "",
		utm_content: "",
		utm_term: "",
		utm_id: "",
	},
};
window.comboBlocksEditor = null;
window.comboBlocksImgSizes = null;
window.blocksStylesArr = [];
window.blocksCssArr = [];



apiFetch({
	path: "/combo-blocks/v2/get_plugin_data",
	method: "POST",
	data: {},
}).then((res) => {
	window.ComboBlocksPluginData = res;
});



apiFetch({
	path: "/combo-blocks/v2/get_options",
	method: "POST",
	data: { option: "combo_blocks_settings" },
}).then((res) => {
	window.comboBlocksEditor = res;
	comboBlocksDisabledBlocks = res.blocks?.disabled == null ? [] : res.blocks.disabled;
	wp.domReady(function () {
		if (comboBlocksDisabledBlocks != undefined) {
			comboBlocksDisabledBlocks.forEach(function (blockName) {
				if (blockName && wp.blocks.getBlockType(blockName) !== undefined) {
					wp.blocks.unregisterBlockType(blockName);
				}
			});
		}
	});
});












apiFetch({
	path: "/combo-blocks/v2/get_image_sizes",
	method: "POST",
	data: {},
}).then((res) => {
	var globalImgSizes = {};

	globalImgSizes["full"] = {
		label: "Full",
		value: "full",
		height: "",
		width: "",
		crop: false,
	};

	Object.keys(res).map((x) => {
		var height = res[x].height;
		var width = res[x].width;

		var label = x.replaceAll("_", " ");
		globalImgSizes[x] = {
			label: label + "(" + width + "*" + height + ")",
			value: x,
			height: height,
			width: width,
		};
	});
	window.comboBlocksImgSizes = globalImgSizes;
});

















var checked = true; // Start in a checked state.
subscribe(() => {
	if (isSavingPost()) {
		checked = false;
	} else {
		if (!checked) {

			setTimeout(() => {
				//checkPostAfterSave(); // Perform your custom handling here.
			}, 3000)
			checked = true;
		}
	}
});
function checkPostAfterSave() {
	console.log("checkPostAfterSave");


	var postId = getCurrentPostId();


	var CSS = "";
	Object.entries(window.blocksStylesArr).map((item) => {
		var itemContent = item[1];
		CSS += itemContent;
	});

	apiFetch({
		path: "/combo-blocks/v2/generate_css_file",
		method: "POST",
		data: {
			name: "block-styles",
			view: { type: "post", id: postId },
			css: CSS,
		},
	}).then((res) => {

		//setoptionData(res)
	});
}
// import "./top-nav-ai";
import "./dashboard";
import "./sidebars";
// import "./custom-actions";


import "./blocks/archive-description";
import "./blocks/archive-title";
import "./blocks/post-author";
import "./blocks/post-author-fields";
import "./blocks/post-categories";
import "./blocks/post-comment-count";
import "./blocks/post-date";
import "./blocks/post-excerpt";
import "./blocks/post-featured-image";
import "./blocks/post-meta";
import "./blocks/post-tags";
import "./blocks/post-taxonomies";
import "./blocks/post-title";
import "./blocks/read-more";
import "./blocks/google-map";
import "./blocks/content-slider";
import "./blocks/content-slider-item";
import "./blocks/image";
import "./blocks/popup";
import "./blocks/post-grid";
import "./blocks/filterable-grid";
import "./blocks/filterable-grid-nav";
import "./blocks/post-query";
import "./blocks/post-query-pagination";
import "./blocks/user-fields";
import "./blocks/user-query";
import "./blocks/user-query-pagination";
import "./blocks/user-showcase";
import "./blocks/terms-list";
import "./blocks/terms-query";
import "./blocks/terms-query-item";
import "./blocks/terms-showcase";
import "./blocks/custom-fields";
import "./blocks/form-wrap";
import "./blocks/breadcrumb";
import "./blocks/date-countdown";
import "./blocks/form-field-checkbox";
import "./blocks/form-field-file";
import "./blocks/form-field-input";
import "./blocks/form-field-radio";
import "./blocks/form-field-recaptcha";
import "./blocks/form-field-select";
import "./blocks/form-field-simple-math";
import "./blocks/form-field-submit";
import "./blocks/form-field-textarea";
import "./blocks/icon";
import "./blocks/list";
import "./blocks/list-nested";
import "./blocks/list-nested-item";
import "./blocks/menu-wrap";
import "./blocks/menu-wrap-item";
import "./blocks/number-counter";
import "./blocks/progress-bar";
import "./blocks/shortcode";
import "./blocks/social-share";
import "./blocks/star-rate";
import "./blocks/text";
import "./blocks/accordion-nested";
import "./blocks/accordion-nested-item";
import "./blocks/back-to-top";
import "./blocks/business-hours";
import "./blocks/flex-wrap";
import "./blocks/flex-wrap-item";
import "./blocks/flip-box";
import "./blocks/flip-box-back";
import "./blocks/flip-box-front";
import "./blocks/grid-wrap";
import "./blocks/grid-wrap-item";
import "./blocks/image-accordion";
import "./blocks/image-gallery";
import "./blocks/image-gallery-item";
import "./blocks/images";
import "./blocks/images-field";
import "./blocks/info-box";
import "./blocks/info-box-item";
import "./blocks/layer";
import "./blocks/layers";
import "./blocks/masonry-wrap";
import "./blocks/masonry-wrap-item";
import "./blocks/table";
import "./blocks/table-td";
import "./blocks/table-tr";
import "./blocks/tabs-nested";
import "./blocks/tabs-nested-item";
import "./blocks/team-members";
import "./blocks/team-members-field";
import "./blocks/team-showcase";
import "./blocks/testimonial-showcase";
import "./blocks/testimonials";
import "./blocks/testimonials-field";
import "./blocks/woo-add-to-cart";
import "./blocks/woo-price";
import "./blocks/woo-product-info";
import "./blocks/woo-product-info-item";
import "./blocks/woo-sale";
import "./blocks/woo-sku";
import "./blocks/woo-star-rate";
import "./blocks/woo-stock";
import "./blocks/woo-stock-quantity";
import "./blocks/woo-total-sales";
import "./blocks/wordpress-org";
import "./blocks/wordpress-org-item";


// import "./blocks/table-of-contents";
// import "./blocks/related-posts";
// import "./blocks/embeds";
// import "./blocks/reactions";
// import "./blocks/post-comments";
// import "./blocks/videos";
// import "./blocks/videos-field";
// import "./blocks/do-actions";
// import "./blocks/form-steps";
// import "./blocks/form-step";
// import "./blocks/audio-player";
// import "./blocks/chart";
// import "./blocks/do-actions";


// const addBlockEditAttributes = createHigherOrderComponent((BlockEdit) => {
//     return (props) => {
//         const { attributes, setAttributes, clientId } = props;
//         const {
//             blockId,
//         } = attributes;
//         //props.attributes.blockId = 'pg' + clientId.split('-').pop();
//         return <BlockEdit {...props} />;
//     };
// }, 'addBlockEditAttributes');
// addFilter(
//     'editor.BlockEdit',
//     'combo-blocks/text',
//     addBlockEditAttributes
// );
// addFilter(
//     'editor.BlockEdit',
//     'combo-blocks/layers',
//     addBlockEditAttributes
// );
