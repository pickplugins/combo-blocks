import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

var inputValueSourcesBasic = {
	none: { label: "Choose...", value: "", isPro: true },
	// postFields: { label: "### Post Fields ###", value: "", disabled: true },
	postID: { label: "Post ID", value: "postID", isPro: true },
	postSlug: { label: "Post Slug", value: "postSlug", isPro: true },
	postTitle: {
		label: __("Post title", "post-grid"),
		value: "postTitle",
		isPro: true,
	},
	postContent: { label: "Post Content", value: "postContent", isPro: true },
	postExcerpt: { label: "Post Excerpt", value: "postExcerpt", isPro: true },
	postModified: { label: "Post Modified", value: "postModified", isPro: true },
	postModifiedGmt: {
		label: "Post Modified GMT",
		value: "postModifiedGmt",
		isPro: true,
	},
	postDate: { label: "Post Date", value: "postDate", isPro: true },
	postDateGmt: { label: "Post Date GMT", value: "postDateGmt", isPro: true },
	postParent: { label: "Post Parent", value: "postParent", isPro: true },
	postStatus: { label: "Post Status", value: "postStatus", isPro: true },
	postPassword: { label: "Post Password", value: "postPassword", isPro: true },
	postCommentStatus: {
		label: "Post Comment Status",
		value: "postCommentStatus",
		isPro: true,
	},
	postMenuOrder: {
		label: "Post Menu Order",
		value: "postMenuOrder",
		isPro: true,
	},
	postCommentCount: {
		label: "Post Comment Count",
		value: "postCommentCount",
		isPro: true,
	},
	postAuthorID: { label: "Post Author ID", value: "postAuthorID", isPro: true },
	postTags: { label: "Post Tags", value: "postTags", isPro: true },
	postTagsIds: {
		label: "Post Tags Ids (Array)",
		value: "postTagsIds",
		isPro: true,
	},
	postCategoryIds: {
		label: "Post Category Ids (Array)",
		value: "postCategoryIds",
		isPro: true,
	},
	// userFields: { label: "### User Fields ###", value: "", disabled: true },
	userId: { label: "User Id", value: "userId", isPro: true },
	userEmail: { label: "User Email", value: "userEmail", isPro: true },
	userDisplayName: {
		label: "User Display Name",
		value: "userDisplayName",
		isPro: true,
	},
	userFirstName: {
		label: "User First Name",
		value: "userFirstName",
		isPro: true,
	},
	userLastName: { label: "User Last Name", value: "userLastName", isPro: true },
	userDescription: {
		label: "User Description",
		value: "userDescription",
		isPro: true,
	},
	userUrl: { label: "User URL", value: "userUrl", isPro: true },
	userLogin: { label: "User Login", value: "userLogin", isPro: true },
	userNicename: { label: "User Nicename", value: "userNicename", isPro: true },
	// termFields: { label: "### Term Fields ###", value: "", disabled: true },
	termName: { label: "Term Name", value: "termName", isPro: true },
	termDescription: {
		label: "Term Description",
		value: "termDescription",
		isPro: true,
	},
	termCount: { label: "Term Count", value: "termCount", isPro: true },
	termSlug: { label: "Term Slug", value: "termSlug", isPro: true },
	// metaFields: { label: "### Meta Fields ###", value: "", disabled: true },
	postMeta: {
		label: __("Post meta", "post-grid"),
		value: "postMeta",
		isPro: true,
	},
	termMeta: { label: "Term Meta", value: "termMeta", isPro: true },
	userMeta: { label: "User Meta", value: "userMeta", isPro: true },
	// global: { label: "### Global ###", value: "", disabled: true },
	GET: { label: "GET", value: "GET", isPro: true },
};

let inputValueSources = applyFilters(
	"postGridInputValueSources",
	inputValueSourcesBasic
);

var objectMapOptionsBasic = {
	none: { label: "None", value: "", isPro: true },
	postTerm: { label: "Post Term", value: "postTerm", isPro: true },
	postMeta: {
		label: __("Post meta", "post-grid"),
		value: "postMeta",
		isPro: true,
	},
	commentMeta: { label: "Comment Meta", value: "commentMeta", isPro: true },
	termMeta: { label: "Term Meta", value: "termMeta", isPro: true },
	userMeta: { label: "User Meta", value: "userMeta", isPro: true },
};

export let objectMapOptions = applyFilters(
	"postGridObjectMapOptions",
	objectMapOptionsBasic
);

export default inputValueSources;
