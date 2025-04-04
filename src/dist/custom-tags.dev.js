"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = require("@wordpress/i18n");

var customTags = {
  separator: {
    label: (0, _i18n.__)("Separator", "combo-blocks"),
    id: '{separator[" - "]}',
    value: "-"
  },
  currentYear: {
    label: (0, _i18n.__)("Current Year", "combo-blocks"),
    id: '{currentYear["y"]}',
    value: "2023"
  },
  currentMonth: {
    label: (0, _i18n.__)("Current Month", "combo-blocks"),
    id: '{currentMonth["m"]}',
    value: "07"
  },
  currentDay: {
    label: (0, _i18n.__)("Current Day", "combo-blocks"),
    id: '{currentDay["d"]}',
    value: "01"
  },
  currentTime: {
    label: (0, _i18n.__)("Current Time", "combo-blocks"),
    id: '{currentTime["h: i:sa"]}',
    value: "06:00:00:am"
  },
  postPublishDate: {
    label: (0, _i18n.__)("Post Publish Date", "combo-blocks"),
    id: '{postPublishDate["d-m-Y"]}',
    value: "01-01-2023"
  },
  siteTitle: {
    label: (0, _i18n.__)("Site Title", "combo-blocks"),
    id: "{siteTitle}",
    value: "WordPress"
  },
  siteDescription: {
    label: (0, _i18n.__)("Site Description", "combo-blocks"),
    id: "{siteDescription}",
    value: "Hello site description"
  },
  postTagsTitle: {
    label: (0, _i18n.__)("Post Tags Title", "combo-blocks"),
    id: '{postTagsTitle["3, -"]}',
    value: "football , cricket"
  },
  postCategoriesTitle: {
    label: (0, _i18n.__)("Post Categories Title", "combo-blocks"),
    id: '{postCategoriesTitle["3, -"]}',
    value: "football , cricket"
  },
  termDescription: {
    label: (0, _i18n.__)("Term Description", "combo-blocks"),
    id: "{termDescription}",
    value: "Hello term description"
  },
  termId: {
    label: (0, _i18n.__)("Term Id", "combo-blocks"),
    id: "{termId}",
    value: "123"
  },
  authorDescription: {
    label: (0, _i18n.__)("Author Description", "combo-blocks"),
    id: "{authorDescription}",
    value: "Hello author description"
  },
  authorId: {
    label: (0, _i18n.__)("Author Id", "combo-blocks"),
    id: "{authorId}",
    value: "123"
  },
  postId: {
    label: (0, _i18n.__)("Post ID", "combo-blocks"),
    id: "{postID}",
    value: "123"
  },
  excerpt: {
    label: (0, _i18n.__)("Post Excerpt", "combo-blocks"),
    id: "{excerpt}",
    value: "hello excerpt"
  },
  termTitle: {
    label: (0, _i18n.__)("Term Title", "combo-blocks"),
    id: "{termTitle}",
    value: "Hello Term Title",
    isPro: true
  },
  currentDate: {
    label: (0, _i18n.__)("Current Date", "combo-blocks"),
    id: '{currentDate["d- m - Y"]}',
    value: "01-01-2023",
    isPro: true
  },
  postModifiedDate: {
    label: (0, _i18n.__)("Post Modified Date", "combo-blocks"),
    id: '{postModifiedDate["d - m - Y"]}',
    value: "01-01-2023",
    isPro: true
  },
  termPostCount: {
    label: (0, _i18n.__)("Term Post Count", "combo-blocks"),
    id: "{termPostCount}",
    value: "123",
    isPro: true
  },
  postTagTitle: {
    label: (0, _i18n.__)("Post Tag Title", "combo-blocks"),
    id: "{postTagTitle}",
    value: "sports",
    isPro: true
  },
  postCategoryTitle: {
    label: (0, _i18n.__)("Post Category Title", "combo-blocks"),
    id: "{postCategoryTitle}",
    value: "sports",
    isPro: true
  },
  postTermTitle: {
    label: (0, _i18n.__)("Post Term Title", "combo-blocks"),
    id: '{postTermTitle["taxonomy"]}',
    value: "sports",
    isPro: true
  },
  postTermsTitle: {
    label: (0, _i18n.__)("Post Terms Title", "combo-blocks"),
    id: '{postTermsTitle["taxonomy, 3"]}',
    value: "football , cricket",
    isPro: true
  },
  postSlug: {
    label: (0, _i18n.__)("Post Slug", "combo-blocks"),
    id: "{postSlug}",
    value: "post-slug",
    isPro: true
  },
  postStatus: {
    label: (0, _i18n.__)("Post Status", "combo-blocks"),
    id: "{postStatus}",
    value: "published",
    isPro: true
  },
  authorName: {
    label: (0, _i18n.__)("Author Name", "combo-blocks"),
    id: "{authorName}",
    value: "hello author",
    isPro: true
  },
  authorFirstName: {
    label: (0, _i18n.__)("Author FirstName", "combo-blocks"),
    id: "{authorFirstName}",
    value: "first name",
    isPro: true
  },
  authorLastName: {
    label: (0, _i18n.__)("Author Last Name", "combo-blocks"),
    id: "{authorLastName}",
    value: "last name",
    isPro: true
  },
  rankmathTitle: {
    label: (0, _i18n.__)("Rankmath Title", "combo-blocks"),
    id: "{rankmathTitle}",
    value: "Rank Math Title",
    isPro: true
  },
  rankmathDescription: {
    label: (0, _i18n.__)("Rankmath Description", "combo-blocks"),
    id: "{rankmathDescription}",
    value: "Rank Math Description",
    isPro: true
  },
  rankmathFocusKeyword: {
    label: (0, _i18n.__)("Rankmath Focus Keyword", "combo-blocks"),
    id: "{rankmathFocusKeyword}",
    value: "Rank Math Focus Keyword",
    isPro: true
  },
  rankmathOrgname: {
    label: (0, _i18n.__)("Rankmath Org name", "combo-blocks"),
    id: "{rankmathOrgname}",
    value: "Rank Math Org Name",
    isPro: true
  },
  rankmathOrgurl: {
    label: (0, _i18n.__)("Rankmath Org URL", "combo-blocks"),
    id: "{rankmathOrgurl}",
    value: "https://hello.world",
    isPro: true
  },
  rankmathOrglogo: {
    label: (0, _i18n.__)("Rankmath Org logo", "combo-blocks"),
    id: "{rankmathOrglogo}",
    value: "",
    isPro: true
  },
  postMeta: {
    label: (0, _i18n.__)("Post Meta", "combo-blocks"),
    id: '{postMeta["metaKey"]}',
    value: "meta value",
    isPro: true
  },
  searchTerms: {
    label: (0, _i18n.__)("Search Terms", "combo-blocks"),
    id: "{searchTerms}",
    value: "hello search terms",
    isPro: true
  } // rankmathPermalink: {
  // 	label: "Rankmath Permalink",
  // 	id: '{rankmathPermalink}',
  // 	value: "",
  // },
  // rankmathFocusKeywords: {
  // 	label: "Rankmath Focus Keywords",
  // 	id: '{rankmathFocusKeywords[", "]}',
  // 	value: "",
  // },
  // siteTagline: { label: "Site Tagline", id: '{siteTagline}', value: "" },
  // counter: { label: "Counter", id: '{counter}', value: "" },

};
var _default = customTags;
exports["default"] = _default;