"use strict";

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

require("./store");

require("./templates");

require("./dashboard");

require("./sidebars");

require("./blocks/post-title");

require("./blocks/post-excerpt");

require("./blocks/read-more");

require("./blocks/post-featured-image");

require("./blocks/post-author");

require("./blocks/post-author-fields");

require("./blocks/post-categories");

require("./blocks/post-tags");

require("./blocks/post-taxonomies");

require("./blocks/post-date");

require("./blocks/post-meta");

require("./blocks/post-comment-count");

require("./blocks/post-comments");

require("./blocks/archive-title");

require("./blocks/archive-description");

require("./blocks/table-of-contents");

require("./blocks/image");

require("./blocks/post-grid");

require("./blocks/filterable-grid");

require("./blocks/");

require("./blocks/post-query");

require("./blocks/post-query-pagination");

require("./blocks/content-slider");

require("./blocks/content-slider-item");

require("./blocks/popup");

require("./blocks/user-query");

require("./blocks/user-fields");

require("./blocks/user-query-pagination");

require("./blocks/form-wrap");

require("./blocks/form-steps");

require("./blocks/form-field-simple-math");

require("./blocks/form-field-input");

require("./blocks/form-field-submit");

require("./blocks/form-field-select");

require("./blocks/form-field-checkbox");

require("./blocks/form-field-radio");

require("./blocks/form-field-textarea");

require("./blocks/form-field-file");

require("./blocks/form-field-recaptcha");

require("./blocks/number-counter");

require("./blocks/date-countdown");

require("./blocks/list");

require("./blocks/list-nested");

require("./blocks/list-nested-item");

require("./blocks/progress-bar");

require("./blocks/menu-wrap");

require("./blocks/menu-wrap-item");

require("./blocks/icon");

require("./blocks/text");

require("./blocks/star-rate");

require("./blocks/breadcrumb");

require("./blocks/shortcode");

require("./blocks/social-share");

require("./blocks/terms-list");

require("./blocks/terms-query");

require("./blocks/terms-query-item");

require("./blocks/back-to-top");

require("./blocks/flip-box");

require("./blocks/flip-box-front");

require("./blocks/flip-box-back");

require("./blocks/layers");

require("./blocks/layer");

require("./blocks/grid-wrap");

require("./blocks/grid-wrap-item");

require("./blocks/flex-wrap");

require("./blocks/flex-wrap-item");

require("./blocks/masonry-wrap");

require("./blocks/masonry-wrap-item");

require("./blocks/team-showcase");

require("./blocks/team-members");

require("./blocks/team-members-field");

require("./blocks/testimonial-showcase");

require("./blocks/testimonials");

require("./blocks/testimonials-field");

require("./blocks/business-hours");

require("./blocks/info-box");

require("./blocks/info-box-item");

require("./blocks/table");

require("./blocks/table-td");

require("./blocks/table-tr");

require("./blocks/google-map");

require("./blocks/image-gallery");

require("./blocks/image-gallery-item");

require("./blocks/images");

require("./blocks/images-field");

require("./blocks/accordion-nested");

require("./blocks/accordion-nested-item");

require("./blocks/image-accordion");

require("./blocks/tabs-nested");

require("./blocks/tabs-nested-item");

require("./blocks/wordpress-org");

require("./blocks/wordpress-org-item");

require("./blocks/woo-sku");

require("./blocks/woo-total-sales");

require("./blocks/woo-stock-quantity");

require("./blocks/woo-product-info");

require("./blocks/woo-product-info-item");

require("./blocks/woo-price");

require("./blocks/woo-sale");

require("./blocks/woo-stock");

require("./blocks/woo-star-rate");

require("./blocks/woo-add-to-cart");


require("./blocks/videos");

require("./blocks/videos-field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _select = (0, _data.select)('core/editor'),
  isSavingPost = _select.isSavingPost,
  getCurrentPostId = _select.getCurrentPostId;

var comboBlocksDisabledBlocks;
window.ComboBlocksPluginData = {
  freeUrl: "https://wordpress.org/plugins/combo-blocks/",
  proUrl: "https://pickplugins.com/combo-blocks/",
  websiteUrl: "https://pickplugins.com/",
  demoUrl: "http://comboblocks.com/",
  wpReviewUrl: "https://wordpress.org/support/plugin/combo-blocks/reviews/#new-post",
  reviewUrl: "http://comboblocks.com/submit-review",
  renewLicense: "https://pickplugins.com/renew-license/?licenseKey=",
  hasSubscribed: false,
  utm: {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    utm_id: ""
  }
};
window.comboBlocksEditor = null;
window.blocksStylesArr = [];
(0, _apiFetch["default"])({
  path: "/combo-blocks/v2/get_plugin_data",
  method: "POST",
  data: {}
}).then(function (res) {
  window.ComboBlocksPluginData = res;
});
(0, _apiFetch["default"])({
  path: "/combo-blocks/v2/get_options",
  method: "POST",
  data: {
    option: "combo_blocks_settings"
  }
}).then(function (res) {
  //localStorage.setItem("comboBlocksEditor", res);
  window.comboBlocksEditor = res;
  comboBlocksDisabledBlocks = res.blocks.disabled;
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
var checked = true; // Start in a checked state.

(0, _data.subscribe)(function () {
  if (isSavingPost()) {
    checked = false;
  } else {
    if (!checked) {
      checkPostAfterSave(); // Perform your custom handling here.

      checked = true;
    }
  }
});

function checkPostAfterSave() {
  var postId = getCurrentPostId();

  var CSS = '';
  Object.entries(window.blocksStylesArr).map(function (item) {
    var itemContent = item[1];
    CSS += itemContent;
  });

  (0, _apiFetch["default"])({
    path: "/combo-blocks/v2/generate_css_file",
    method: "POST",
    data: {
      name: "block-styles",
      view: {
        type: 'post',
        id: postId
      },
      css: CSS
    }
  }).then(function (res) {
    //setoptionData(res)
  });
} 
