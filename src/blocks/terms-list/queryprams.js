import { applyFilters } from "@wordpress/hooks";
const termsQueryPramsBasic = {
	taxonomy: {
		value: "category",
		multiple: false,
		id: "taxonomy",
		label: __("Taxonomy", "combo-blocks"),
		description: "Select Taxonomy to Query",
		longDescription:
			"Taxonomy name, or array of taxonomy names, to which results should be limited.",
	},
	orderby: {
		value: "name",
		multiple: false,
		id: "orderby",
		label: "Order By",
		description: "Search keyword, ex: hello",
	},
	order: {
		value: "ASC",
		multiple: false,
		id: "order",
		label: "Order",
		description: "Whether to order terms in ascending or descending order.",
	},
	hide_empty: {
		value: true,
		multiple: false,
		id: "hide_empty",
		label: "Hide Empty",
		description: "Accepts true or false value.",
		longDescription:
			"Whether to hide terms not assigned to any posts. Accepts 1|true or 0|false.",
	},
	number: {
		value: false,
		multiple: false,
		id: "number",
		label: "Number",
		description: "Accepts 0 (all) or any positive number.",
		longDescription:
			"Maximum number of terms to return. Accepts ''|0 (all) or any positive number. Default ''|0 (all). Note that $number may not return accurate results when coupled with $object_ids.",
	},
	include: {
		value: "category",
		multiple: false,
		id: "include",
		isPro: true,
		label: "Include",
		description: "Comma-separated string of term IDs to include.",
		longDescription:
			"Array or comma/space-separated string of term IDs to include. Default empty array.",
		placeholder: "Comma-separated string of term IDs to include.",
	},
	exclude: {
		value: "",
		multiple: false,
		id: "exclude",
		isPro: true,
		label: "Exclude",
		description: "Comma-separated string of term IDs to exclude.",
		longDescription:
			"Array or comma/space-separated string of term IDs to exclude. If $include is non-empty, $exclude is ignored. Default empty array.",
		placeholder: "Comma-separated string of term IDs to exclude.",
	},
	// Category Parameters
	exclude_tree: {
		value: "",
		multiple: false,
		id: "exclude_tree",
		isPro: true,
		label: "Exclude Tree",
		description: "Comma-separated string of term IDs to exclude.",
		longDescription:
			"Array or comma/space-separated string of term IDs to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array.",
		placeholder: "Comma-separated string of term IDs to exclude.",
	},
	count: {
		value: false,
		multiple: false,
		id: "count",
		isPro: true,
		label: "count",
		description:
			"Whether to return a term count. If true, will take precedence over $fields.",
	},
	offset: {
		value: "",
		multiple: false,
		id: "offset",
		isPro: true,
		label: "Offset",
		description: "The number by which to offset the terms query.",
		longDescription: "The number by which to offset the terms query.",
	},
	// fields: {
	// 	value: "all",
	// 	multiple: false,
	// 	id: "fields",
	// 	label: "Fields",
	// 	description: "Post query by Category IDs" /*isPro: true*/,
	// },
	name: {
		value: "",
		multiple: false,
		id: "name",
		isPro: true,
		label: "Name",
		description: "Name or array of names to return term(s) for.",
		longDescription: "Comma-separated names to return term(s) for.",
	},
	// Tag Parameters
	slug: {
		value: "",
		multiple: false,
		id: "slug",
		isPro: true,
		label: "Slug",
		description: "Slug or array of slugs to return term(s) for.",
		longDescription: "Comma-separated slugs to return term(s) for.",
	},
	hierarchical: {
		value: true,
		multiple: false,
		id: "hierarchical",
		isPro: true,
		label: "Hierarchical",
		description: "Whether to include terms that have non-empty descendants.",
		longDescription:
			"Whether to include terms that have non-empty descendants (even if $hide_empty is set to true).",
	},
	search: {
		value: "",
		multiple: false,
		id: "search",
		isPro: true,
		label: "Search",
		description: "Search criteria to match terms.",
		longDescription:
			"Search criteria to match terms. Will be SQL-formatted with wildcards before and after.",
	},
	name__like: {
		value: "",
		multiple: false,
		id: "name__like",
		isPro: true,
		label: "Name like",
		description:
			"Retrieve terms with criteria by which a term is LIKE $name__like.",
		longDescription:
			"Retrieve terms with criteria by which a term is LIKE $name__like.",
	},
	description__like: {
		value: "",
		multiple: false,
		id: "description__like",
		isPro: true,
		label: "Description like",
		description:
			"Retrieve terms where the description is LIKE $description__like.",
		longDescription:
			"Retrieve terms where the description is LIKE $description__like.",
	},
	pad_counts: {
		value: false,
		multiple: false,
		id: "pad_counts",
		isPro: true,
		label: "Pad counts",
		description:
			'Whether to pad the quantity of a term’s children in the quantity of each term’s "count" object variable.',
		longDescription:
			'Whether to pad the quantity of a term’s children in the quantity of each term’s "count" object variable. Default false.',
	},
	get: {
		value: "",
		multiple: false,
		id: "get",
		isPro: true,
		label: "Get",
		description:
			"Whether to return terms regardless of ancestry or whether the terms are empty.",
		longDescription:
			"Whether to return terms regardless of ancestry or whether the terms are empty. Accepts 'all' or '' (disabled). Default ''.",
	},
	child_of: {
		value: "",
		multiple: false,
		id: "child_of",
		isPro: true,
		label: "Child of",
		description: "Term ID to retrieve child terms of.",
		longDescription:
			"Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0.",
	},
	parent: {
		value: "",
		multiple: false,
		id: "parent",
		isPro: true,
		label: "Parent",
		description:
			"Add {ID} to add Parent term ID to retrieve direct-child terms of.",
		longDescription: "Parent term ID to retrieve direct-child terms of.",
	},
	childless: {
		value: false,
		multiple: false,
		id: "childless",
		isPro: true,
		label: "Childless",
		description: "True to limit results to terms that have no children.",
		longDescription:
			"True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false.",
	},
	// // Date Parameters
	cache_domain: {
		value: "core",
		multiple: false,
		id: "cache_domain",
		isPro: true,
		label: "Cache domain",
		description:
			"Unique cache key to be produced when this query is stored in an object cache.",
		longDescription:
			"Unique cache key to be produced when this query is stored in an object cache. Default 'core'.",
	},
	update_term_meta_cache: {
		value: true,
		multiple: false,
		id: "update_term_meta_cache",
		isPro: true,
		label: "Update term meta Cache",
		description:
			"Whether to prime meta caches for matched terms. Default true.",
	},
	// meta_query: {
	// 	value: [],
	// 	multiple: false,
	// 	id: "meta_query",
	// 	label: "Meta query",
	// 	description: "Post query by month",
	// },
	meta_key: {
		value: "",
		multiple: false,
		id: "meta_key",
		isPro: true,
		label: "Meta key",
		description: "Comma-separated keys to return term(s) for.",
		longDescription: "Meta key or keys to filter by.",
	},
	meta_value: {
		value: "",
		multiple: false,
		id: "meta_value",
		isPro: true,
		label: "Meta value",
		description: "Comma-separated keys to return term(s) for.",
		longDescription: "Meta value or values to filter by.",
	},
};
let termsQueryPrams = applyFilters("termsQueryPrams", termsQueryPramsBasic);
export default termsQueryPrams;
