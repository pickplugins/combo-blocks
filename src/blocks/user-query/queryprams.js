import { applyFilters } from "@wordpress/hooks";
const termsQueryPramsBasic = {
	blog_id: {
		value: "",
		multiple: false,
		id: "blog_id",
		label: "Blog ID",
		description: "The site ID. Default is the current site.",
	},
	role: {
		value: "",
		multiple: false,
		id: "role",
		label: "Role",
		description:
			"An array or a comma-separated list of role names that users must match to be included in results.",
		longDescription:
			"An array or a comma-separated list of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role.",
	},
	role__in: {
		value: "",
		multiple: false,
		id: "role__in",
		label: "Role In",
		description:
			"An array of role names. Matched users must have at least one of these roles.",
	},
	role__not_in: {
		value: "",
		multiple: false,
		id: "role__not_in",
		label: "Role Not In",
		description:
			"An array of role names to exclude. Users matching one or more of these roles will not be included in results.",
	},
	meta_key: {
		value: "",
		multiple: false,
		id: "meta_key",
		isPro: true,
		label: "Meta key",
		placeholder: "Comma separated value",
		description: "Meta key or keys to filter by.",
		longDescription: "Meta key or keys to filter by.",
	},
	meta_value: {
		value: "",
		multiple: false,
		id: "meta_value",
		isPro: true,
		label: "Meta Value",
		placeholder: "Comma separated value",
		description: "Meta value or values to filter by.",
		longDescription: "Meta value or values to filter by.",
	},
	meta_type: {
		value: "",
		multiple: false,
		id: "meta_type",
		isPro: true,
		label: "Meta Type",
		description:
			"MySQL data type that the meta_value column will be CAST to for comparisons.",
		longDescription:
			"MySQL data type that the meta_value column will be CAST to for comparisons.",
	},
	meta_type_key: {
		value: "",
		multiple: false,
		id: "meta_type_key",
		isPro: true,
		label: "Meta Type Key",
		description:
			"MySQL data type that the meta_key column will be CAST to for comparisons.",
		longDescription:
			"MySQL data type that the meta_key column will be CAST to for comparisons.",
	},
	meta_query: {
		value: "",
		multiple: false,
		id: "meta_query",
		isPro: true,
		label: "Meta Type Key",
		description:
			"MySQL data type that the meta_key column will be CAST to for comparisons.",
		longDescription:
			"MySQL data type that the meta_key column will be CAST to for comparisons.",
	},
	capability: {
		value: "",
		multiple: false,
		id: "capability",
		isPro: true,
		label: "Capability",
		description: "An array or a comma-separated list of capability names.",
		longDescription:
			"An array or a comma-separated list of capability names that users must match to be included in results. Note that this is an inclusive list: users must match *each* capability.",
	},
	capability__in: {
		value: "",
		multiple: false,
		id: "capability__in",
		isPro: true,
		label: "Capability In",
		description:
			"An array of capability names. Matched users must have at least one of these capabilities.",
		longDescription:
			"An array of capability names. Matched users must have at least one of these capabilities. Does NOT work for capabilities not in the database or filtered via 'map_meta_cap'.",
	},
	capability__not_in: {
		value: "",
		multiple: false,
		id: "capability__not_in",
		isPro: true,
		label: "Capability Not In",
		description:
			"An array of capability names to exclude. Users matching one or more of these capabilities will not be included in results.",
		longDescription:
			"An array of capability names to exclude. Users matching one or more of these capabilities will not be included in results. Does NOT work for capabilities not in the database or filtered via 'map_meta_cap'.",
	},
	include: {
		value: "",
		multiple: false,
		id: "include",
		isPro: true,
		label: "Include",
		placeholder: "Comma separated value",
		description: "An array of user IDs to include.",
		longDescription: "An array of user IDs to include.",
	},
	exclude: {
		value: "",
		multiple: false,
		id: "exclude",
		isPro: true,
		label: "Exclude",
		placeholder: "Comma separated value",
		description: "An array of user IDs to exclude.",
		longDescription: "An array of user IDs to exclude.",
	},
	search: {
		value: "",
		multiple: false,
		id: "search",
		label: "Search",
		description:
			"Search keyword. Searches for possible string matches on columns.",
		longDescription:
			"Search keyword. Searches for possible string matches on columns.",
	},
	search_columns: {
		value: "",
		multiple: false,
		id: "search_columns",
		label: "Search Columns",
		description: "Field(s) to sort the retrieved users by.",
		longDescription:
			"Array of column names to be searched. Accepts 'ID', 'user_login', 'user_email', 'user_url', 'user_nicename', 'display_name'.",
	},
	orderby: {
		value: "",
		multiple: false,
		id: "orderby",
		label: "Order By",
		description: "Field(s) to sort the retrieved users by.",
		longDescription:
			"Field(s) to sort the retrieved users by. May be a single value, an array of values, or a multi-dimensional array with fields as keys and orders ('ASC' or 'DESC') as values.",
	},
	order: {
		value: "ASC",
		multiple: false,
		id: "order",
		label: "Order",
		description:
			"Designates ascending or descending order of users. Order values passed as part of an $orderby array take precedence over this parameter. Accepts 'ASC', 'DESC'. Default 'ASC'.",
		longDescription:
			"Designates ascending or descending order of users. Order values passed as part of an $orderby array take precedence over this parameter. Accepts 'ASC', 'DESC'. Default 'ASC'.",
	},
	offset: {
		value: "",
		multiple: false,
		id: "offset",
		isPro: true,
		label: "Offset",
		description: "Number of users to offset in retrieved results.",
		longDescription:
			"Number of users to offset in retrieved results. Can be used in conjunction with pagination. Default 0.",
	},
	number: {
		value: "",
		multiple: false,
		id: "number",
		isPro: true,
		label: "Number",
		description: "Number of users to limit the query for.",
		longDescription:
			"Number of users to limit the query for. Can be used in conjunction with pagination. Value -1 (all) is supported, but should be used with caution on larger sites. Default -1 (all users).",
	},
	paged: {
		value: "",
		multiple: false,
		id: "paged",
		isPro: true,
		label: "Paged",
		description:
			"When used with number, defines the page of results to return.",
		longDescription:
			"When used with number, defines the page of results to return. Default 1.",
	},
	count_total: {
		value: "",
		multiple: false,
		id: "count_total",
		isPro: true,
		label: "Count Total",
		description:
			"Which fields to return. Single or all fields (string), or array of fields.",
		longDescription:
			"Which fields to return. Single or all fields (string), or array of fields.",
	},
	fields: {
		value: "",
		multiple: false,
		id: "fields",
		isPro: true,
		label: "Fields",
		description: "Whether to count the total number of users found.",
		longDescription:
			"Whether to count the total number of users found. If pagination is not needed, setting this to false can improve performance. Default true.",
	},
	who: {
		value: "",
		multiple: false,
		id: "who",
		isPro: true,
		label: "Who",
		description: "Deprecated, use $capability instead.",
		longDescription:
			"Deprecated, use $capability instead. Type of users to query. Accepts 'authors'. Default empty (all users).",
	},
	has_published_posts: {
		value: "",
		multiple: false,
		id: "has_published_posts",
		isPro: true,
		label: "Has Published Posts",
		description:
			"Pass an array of post types to filter results to users who have published posts in those post types.",
		longDescription:
			"Pass an array of post types to filter results to users who have published posts in those post types. true is an alias for all public post types.",
	},
	nicename: {
		value: "",
		multiple: false,
		id: "nicename",
		isPro: true,
		label: "Nicename",
		description:
			"An array of nicenames to exclude. Users matching one of these nicenames will not be included in results.",
		longDescription:
			"An array of nicenames to exclude. Users matching one of these nicenames will not be included in results.",
	},
	login: {
		value: "",
		multiple: false,
		id: "login",
		isPro: true,
		label: "Login",
		description: "The user login.",
		longDescription: "The user login.",
	},
	login__in: {
		value: "",
		multiple: false,
		id: "login__in",
		isPro: true,
		label: "Login In",
		description:
			"An array of logins to include. Users matching one of these logins will be included in results.",
		longDescription:
			"An array of logins to include. Users matching one of these logins will be included in results.",
	},
	login__not_in: {
		value: "",
		multiple: false,
		id: "login__not_in",
		isPro: true,
		label: "Login Not In",
		description:
			"An array of logins to exclude. Users matching one of these logins will not be included in results.",
		longDescription:
			"An array of logins to exclude. Users matching one of these logins will not be included in results.",
	},
	cache_results: {
		value: "",
		multiple: false,
		id: "cache_results",
		isPro: true,
		label: "Cache Results",
		description: "Whether to cache user information.",
		longDescription: "Whether to cache user information. Default true.",
	},
};
let termsQueryPrams = applyFilters("termsQueryPrams", termsQueryPramsBasic);
export default termsQueryPrams;
