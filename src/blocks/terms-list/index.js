import apiFetch from "@wordpress/api-fetch";
import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	Button,
	__experimentalInputControl as InputControl,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, link, linkOff, settings } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";

// import termsQueryPrams from "./queryprams";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
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
					d="M69.3335 61H0V78.3334H69.3335V61Z"
					fill="url(#paint0_linear_61_610)"
				/>
				<path
					d="M9.33389 71.6666L5.77832 68.1111C5.77832 68.1111 5.77832 67.6666 5.77832 67.2222C5.77832 67.2222 6.22277 67.2222 6.66721 67.2222L9.33389 70.3333L12.0006 67.2222C12.0006 67.2222 12.445 66.7777 12.8895 67.2222C12.8895 67.2222 13.3339 67.6666 12.8895 68.1111L9.33389 71.6666Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 67.2224H18.2227V71.6669H61.3339V67.2224Z"
					fill="#C15940"
				/>
				<path
					d="M160 61H90.6665V78.3334H160V61Z"
					fill="url(#paint1_linear_61_610)"
				/>
				<path
					d="M99.9999 71.6666L96.4443 68.1111C96.4443 68.1111 96.4443 67.6666 96.4443 67.2222C96.4443 67.2222 96.8888 67.2222 97.3332 67.2222L99.9999 70.3333L102.667 67.2222C102.667 67.2222 103.111 66.7777 103.555 67.2222C103.555 67.2222 104 67.6666 103.555 68.1111L99.9999 71.6666Z"
					fill="#C15940"
				/>
				<path d="M152 67.2224H108.889V71.6669H152V67.2224Z" fill="#C15940" />
				<path
					d="M69.3335 92.5554H0V109.889H69.3335V92.5554Z"
					fill="url(#paint2_linear_61_610)"
				/>
				<path
					d="M9.33389 103.667L5.77832 100.111C5.77832 100.111 5.77832 99.6666 5.77832 99.2222C5.77832 99.2222 6.22277 99.2222 6.66721 99.2222L9.33389 102.333L12.0006 99.2222C12.0006 99.2222 12.445 98.7777 12.8895 99.2222C12.8895 99.2222 13.3339 99.6666 12.8895 100.111L9.33389 103.667Z"
					fill="#C15940"
				/>
				<path
					d="M61.3339 98.7778H18.2227V103.222H61.3339V98.7778Z"
					fill="#C15940"
				/>
				<path
					d="M160 92.5554H90.6665V109.889H160V92.5554Z"
					fill="url(#paint3_linear_61_610)"
				/>
				<path
					d="M99.9999 103.667L96.4443 100.111C96.4443 100.111 96.4443 99.6666 96.4443 99.2222C96.4443 99.2222 96.8888 99.2222 97.3332 99.2222L99.9999 102.333L102.667 99.2222C102.667 99.2222 103.111 98.7777 103.555 99.2222C103.555 99.2222 104 99.6666 103.555 100.111L99.9999 103.667Z"
					fill="#C15940"
				/>
				<path d="M152 98.7778H108.889V103.222H152V98.7778Z" fill="#C15940" />
				<defs>
					<linearGradient
						id="paint0_linear_61_610"
						x1="0"
						y1="69.6667"
						x2="69.3335"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_610"
						x1="90.6665"
						y1="69.6667"
						x2="160"
						y2="69.6667"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_610"
						x1="0"
						y1="101.222"
						x2="69.3335"
						y2="101.222"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_61_610"
						x1="90.6665"
						y1="101.222"
						x2="160"
						y2="101.222"
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
		var items = attributes.items;
		var separator = attributes.separator;
		var frontText = attributes.frontText;
		var icon = attributes.icon;
		var blockCssY = attributes.blockCssY;
		var queryArgs = attributes.queryArgs;
		var utmTracking = attributes.utmTracking;
		var termTitle = attributes.termTitle;
		var postCount = attributes.postCount;
		var taxonomies = attributes.taxonomies;
		var postId = context["postId"];
		var postType = context["postType"];
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [taxonomiesObjects, setTaxonomiesObjects] = useState({});
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemsSelector = blockClass + " .item";
		const termTitleSelector = blockClass + " .termTitle";
		const separatorSelector = blockClass + " .separator";
		const frontTextSelector = blockClass + " .frontText";
		const postCountSelector = blockClass + " .postCount";
		const iconSelector = blockClass + " .icon";
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			apiFetch({
				path: "/combo-blocks/v2/post_type_objects",
				method: "POST",
				data: { postTypes: [] },
			}).then((res) => {
				var taxonomies = {};
				res.map((item) => {
					taxonomies[item.id] = { label: item.label, id: item.id };
				});
				setTaxonomiesObjects(taxonomies);
			});
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[itemsSelector] = items;
			blockCssObj[termTitleSelector] = termTitle;
			blockCssObj[separatorSelector] = separator;
			blockCssObj[frontTextSelector] = frontText;
			blockCssObj[postCountSelector] = postCount;
			blockCssObj[iconSelector] = icon;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		const [categories, setCategories] = useState([]); // Using the hook.
		const [taxonomy, setTaxonomy] = useState(false);
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
				description:
					"Whether to include terms that have non-empty descendants.",
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
		function fetchTerms() {
			// setIsBusy(true);
			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});
			apiFetch({
				path: "/combo-blocks/v2/get_terms",
				method: "POST",
				data: { queryArgs: arg },
			}).then((res) => {
				// setIsBusy(false);
				if (res.posts !== undefined) {
					setCategories(res.posts);
				}
			});
		}
		useEffect(() => {
			fetchTerms();
			function hasId(id) {
				return queryArgs.items.some((item) => item.id === id);
			}
			// Check if 'taxonomy' ID exists in the 'items' array
			const hasTaxonomy = hasId("taxonomy");
			if (hasTaxonomy) {
				setTaxonomy(true);
			} else {
				setTaxonomy(false);
			}
		}, [queryArgs]);
		const [categoryCount, setcategoryCount] = useState(0); // Using the hook.
		const [postCategoriesData, setPostCategoriesData] = useState([]); // Using the hook.
		const [linkPickerPosttitle, setLinkPickerPosttitle] = useState(false);
		const [postCategoriesX, setPostCategoriesX] = useEntityProp(
			"postType",
			postType,
			taxonomies.options.taxName,
			postId
		);
		var linkToArgsBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
			// postUrl: { label: __("Post URL", "combo-blocks"), value: "postUrl" },
			// homeUrl: { label: __("Home URL", "combo-blocks"), value: "homeUrl" },
			// authorUrl: { label: __("Author URL","combo-blocks"), value: "authorUrl" },
			// authorLink: { label: __("Author Link", "combo-blocks"), value: "authorLink" },
			// authorMail: { label: __("Author Mail", "combo-blocks"), value: "authorMail", isPro: true },
			// authorMeta: { label: __("Author Meta", "combo-blocks"), value: "authorMeta", isPro: true },
			// customField: { label: __("Custom Field","combo-blocks"), value: "customField", isPro: true },
			// customUrl: { label: __("Custom URL", "combo-blocks"), value: "customUrl", isPro: true },
		};
		// let linkToArgs = applyFilters("linkToArgs", linkToArgsBasic);
		// let linkToArgs = applyFilters("linkToArgTerms", linkToArgsBasic);
		let linkToArgs = linkToArgsBasic;
		function setFieldLinkTo(option, index) {
			var options = { ...items.options, linkTo: option.value };
			setAttributes({ items: { ...items, options: options } });
		}
		var dummyCats = [
			{
				id: 1,
				count: 1,
				description: "",
				link: "#",
				name: "Category 1",
				slug: "category-1",
				taxonomy: "category_tax",
			},
			{
				id: 2,
				count: 1,
				description: "",
				link: "#",
				name: "Category 2",
				slug: "category-2",
				taxonomy: "category_tax",
				children: [
					{
						id: 21,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 1",
						slug: "category-3",
						taxonomy: "category_tax",
					},
					{
						id: 22,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 2",
						slug: "category-3",
						taxonomy: "category_tax",
					},
					{
						id: 23,
						count: 1,
						description: "",
						link: "#",
						name: "Child Category 3",
						slug: "category-3",
						taxonomy: "category_tax",
					},
				],
				posts: [
					{ link: "#", name: "Post Title 1" },
					{ link: "#", name: "Post Title 2" },
					{ link: "#", name: "Post Title 3" },
				],
			},
			{
				id: 3,
				count: 1,
				description: "",
				link: "#",
				name: "Category 3",
				slug: "category-3",
				taxonomy: "category_tax",
			},
			{
				id: 4,
				count: 1,
				description: "",
				link: "#",
				name: "Category 4",
				slug: "category-4",
				taxonomy: "category_tax",
			},
			{
				id: 5,
				count: 1,
				description: "",
				link: "#",
				name: "Category 5",
				slug: "category-5",
				taxonomy: "category_tax",
			},
			{
				id: 6,
				count: 1,
				description: "",
				link: "#",
				name: "Category 6",
				slug: "category-6",
				taxonomy: "category_tax",
			},
		];
		const [iconHtml, setIconHtml] = useState("");
		useEffect(() => {
			var iconSrc = icon.options.iconSrc;
			var iconHtml = `<span class="${iconSrc}"></span>`;
			setIconHtml(iconHtml);
		}, [icon]);
		var RemoveQueryPram = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
						onClick={(ev) => {
							var items = [...queryArgs.items];
							var item = { ...queryArgs.items[index] };
							items.splice(index, 1);
							//setAttributes({ queryArgs: { items: queryArgsX.items } });
							setAttributes({
								queryArgs: { ...queryArgs, items: items },
							});
						}}>
						<Icon icon={close} />
					</span>
					<span className="mx-2">{title}</span>
				</>
			);
		};
		function updateQueryPram(newVal, index) {
			var items = [...queryArgs.items];
			var item = { ...queryArgs.items[index] };
			item.val = newVal;
			items[index] = item;
			setAttributes({
				queryArgs: { ...queryArgs, items: items },
			});
			// fetchPosts();
		}
		function generateQueryArgOptions(item, index) {
			var itemId = item.id;
			return (
				<div className="">
					<PGtoggle
						title={
							<RemoveQueryPram
								title={
									termsQueryPrams[itemId] == undefined
										? itemId
										: termsQueryPrams[itemId].label
								}
								index={index}
							/>
						}
						initialOpen={false}>
						{item.id == "taxonomy" && (
							<div>
								<PanelRow>
									<label
										for=""
										className="font-medium text-slate-900 underline decoration-dotted underline-offset-2 "
										data-pgTooltip={termsQueryPrams[itemId].longDescription}
										data-pgTooltip-location="bottom">
										{__("Select Taxonomy", "combo-blocks")}
									</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										options={taxonomiesObjects}
										buttonTitle={
											taxonomiesObjects[queryArgs.items[index].val] != undefined
												? taxonomiesObjects[queryArgs.items[index].val].label
												: __("Choose", "combo-blocks")
										}
										// onChange={setTaxonomy}
										onChange={(newVal) => updateQueryPram(newVal.id, index)}
										values={queryArgs.items[index].val}></PGDropdown>
								</PanelRow>
							</div>
						)}
						{item.id == "order" && (
							<div className={item.id == "order" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={queryArgs.items[index].val}
									options={[
										{ label: "Ascending", value: "ASC" },
										{ label: "Descending", value: "DESC" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{item.id == "get" && (
							<div className={item.id == "get" ? "" : "hidden"}>
								<SelectControl
									style={{ margin: 0 }}
									label=""
									value={queryArgs.items[index].val}
									options={[
										{ label: "All", value: "all" },
										{ label: "Disable", value: "" },
									]}
									onChange={(newVal) => updateQueryPram(newVal, index)}
								/>
							</div>
						)}
						{(item.id == "include" ||
							item.id == "exclude" ||
							item.id == "exclude_tree" ||
							item.id == "offset" ||
							item.id == "name" ||
							item.id == "number" ||
							item.id == "slug" ||
							item.id == "search" ||
							item.id == "name__like" ||
							item.id == "description__like" ||
							item.id == "child_of" ||
							item.id == "parent" ||
							item.id == "cache_domain" ||
							item.id == "meta_value" ||
							item.id == "meta_key") && (
								<div>
									<InputControl
										value={queryArgs.items[index].val}
										type={
											item.id == "offset" ||
												item.id == "number" ||
												item.id == "child_of"
												? //  || item.id == "parent"
												"number"
												: "text"
										}
										placeholder={
											termsQueryPrams[itemId].placeholder != undefined
												? termsQueryPrams[itemId].placeholder
												: ""
										}
										onChange={(newVal) => {
											//clearTimeout(debounce);
											//debounce = setTimeout(() => {
											updateQueryPram(newVal, index);
											//}, 1000);
										}}
									/>
									<p className="text-[10px] pt-2 text-gray-500 flex gap-2 justify-between items-center">
										<span>{termsQueryPrams[itemId].description}</span>
										<span
											className="w-6 h-6 border rounded-full border-solid flex items-center justify-center border-amber-500"
											data-pgTooltip={termsQueryPrams[itemId].longDescription}
											data-pgTooltip-location="left">
											{" "}
											?
										</span>{" "}
									</p>
								</div>
							)}
						{(item.id == "hide_empty" ||
							// item.id == "number" ||
							item.id == "count" ||
							item.id == "hierarchical" ||
							item.id == "pad_counts" ||
							item.id == "childless" ||
							item.id == "update_term_meta_cache") && (
								<div>
									<ToggleControl
										label={termsQueryPrams[itemId].label}
										help={
											queryArgs.items[index].val
												? __("Hide Empty Enabled", "combo-blocks")
												: __("Hide Empty Disabled", "combo-blocks")
										}
										checked={queryArgs.items[index].val ? true : false}
										onChange={(e) => {
											if (queryArgs.items[index]?.val == true) {
												updateQueryPram(false, index);
											}
											if (queryArgs.items[index]?.val == false) {
												updateQueryPram(true, index);
											}
										}}
									/>
								</div>
							)}
						{item.id == "orderby" && (
							<div className={item.id == "orderby" ? "" : "hidden"}>
								<SelectControl
									value={item.value}
									options={[
										{ label: __("None", "combo-blocks"), value: "none" },
										{ label: "ID", value: "ID" },
										{ label: "Author", value: "author" },
										{ label: "Title", value: "title" },
										{ label: "Name", value: "name" },
										{ label: "Type", value: "type" },
										{ label: "Date", value: "date" },
										{ label: "Modified", value: "modified" },
										{ label: "Parent", value: "parent" },
										{ label: "Random", value: "rand" },
										{ label: "Comment Count", value: "comment_count" },
										{ label: "Relevance", value: "relevance" },
										{ label: "Menu Order", value: "menu_order" },
										{ label: "Meta Value(String)", value: "meta_value" },
										{ label: "Meta Value(Number)", value: "meta_value_num" },
										{ label: "post__in", value: "post__in" },
										{ label: "post_name__in", value: "post_name__in" },
										{ label: "post_parent__in", value: "post_parent__in" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
					</PGtoggle>
				</div>
			);
		}
		function addQueryPram(option, index) {
			var id = option.id;
			var items = [...queryArgs.items];
			var itemX = { ...queryArgs.items[index] };
			var data = { val: termsQueryPrams[id].value, id: id };
			var multiple = data.multiple;
			var isExist = items.map((item) => {
				if (item.id == id) {
					return true;
				}
			});
			var itemsX = items.concat([data]);
			//setAttributes({ queryArgs: { items: items } });
			setAttributes({
				queryArgs: { ...queryArgs, items: itemsX },
			});
		}
		function addQueryPreset(option, index) {
			var items = [...queryArgs.items];
			var item = { ...queryArgs.items[index] };
			items = option.value.items;
			//setAttributes({ queryArgs: { items: queryArgsX.items } });
			setAttributes({
				queryArgs: { ...queryArgs, items: items },
			});
			fetchPosts();
		}
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
				var itemsX = attributes.items;
				var iconX = attributes.icon;
				var termTitleX = attributes.termTitle;
				var postCountX = attributes.postCount;
				var separatorX = attributes.separator;
				var frontTextX = attributes.frontText;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (postCountX != undefined) {
					var postCountY = { ...postCountX, options: postCount.options };
					setAttributes({ postCount: postCountY });
					blockCssObj[postCountSelector] = postCountY;
				}
				if (frontTextX != undefined) {
					var frontTextY = { ...frontTextX, options: frontText.options };
					setAttributes({ frontText: frontTextY });
					blockCssObj[frontTextSelector] = frontTextY;
				}
				if (separatorX != undefined) {
					var separatorY = { ...separatorX, options: separator.options };
					setAttributes({ separator: separatorY });
					blockCssObj[separatorSelector] = separatorY;
				}
				if (iconX != undefined) {
					var iconY = { ...iconX, options: icon.options };
					setAttributes({ icon: iconY });
					blockCssObj[iconSelector] = iconY;
				}
				if (termTitleX != undefined) {
					var termTitleY = { ...termTitleX, options: termTitle.options };
					setAttributes({ termTitle: termTitleY });
					blockCssObj[termTitleSelector] = termTitleY;
				}
				if (itemsX != undefined) {
					var itemsY = { ...itemsX, options: items.options };
					setAttributes({ items: itemsY });
					blockCssObj[itemsSelector] = itemsY;
				}
				if (wrapperX != undefined) {
					var wrapperY = { ...wrapperX, options: wrapper.options };
					setAttributes({ wrapper: wrapperY });
					blockCssObj[wrapperSelector] = wrapperY;
				}
				var blockCssRules = myStore.getBlockCssRules(blockCssObj);
				var itemsXYZ = blockCssRules;
				setAttributes({ blockCssY: { items: itemsXYZ } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}
		function onChangeIcon(arg) {
			var options = {
				...icon.options,
				srcType: arg.srcType,
				library: arg.library,
				iconSrc: arg.iconSrc,
			};
			setAttributes({ icon: { ...icon, options: options } });
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
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
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
		function onChangeStyleItems(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, items);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ items: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsSelector
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
		function onRemoveStyleItems(sudoScource, key) {
			var object = myStore.deletePropertyDeep(items, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ items: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				itemsSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleItems(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, items);
			var object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ items: object });
		}
		function onResetItems(sudoScources) {
			let obj = Object.assign({}, items);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						itemsSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ items: obj });
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
		function onRemoveStyleIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}
		function onChangeStyleTermTitle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, termTitle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ termTitle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				termTitleSelector
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
		function onRemoveStyleTermTitle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(termTitle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ termTitle: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				termTitleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleTermTitle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, termTitle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ termTitle: object });
		}
		function onBulkAddTermTitle(sudoScource, cssObj) {
			let obj = Object.assign({}, termTitle);
			obj[sudoScource] = cssObj;
			setAttributes({ termTitle: obj });
			var selector = myStore.getElementSelector(sudoScource, termTitleSelector);
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
		function onResetTermTitle(sudoScources) {
			let obj = Object.assign({}, termTitle);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						termTitleSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ termTitle: obj });
		}
		function onChangeStylePostCount(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, postCount);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ postCount: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postCountSelector
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
		function onRemoveStylePostCount(sudoScource, key) {
			var object = myStore.deletePropertyDeep(postCount, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ postCount: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				postCountSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStylePostCount(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, postCount);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ postCount: object });
		}
		function onBulkAddPostCount(sudoScource, cssObj) {
			let obj = Object.assign({}, postCount);
			obj[sudoScource] = cssObj;
			setAttributes({ postCount: obj });
			var selector = myStore.getElementSelector(sudoScource, postCountSelector);
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
		function onResetPostCount(sudoScources) {
			let obj = Object.assign({}, postCount);
			Object.entries(sudoScources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						postCountSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ postCount: obj });
		}
		function onChangeStyleFrontText(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ frontText: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
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
		function onRemoveStyleFrontText(sudoScource, key) {
			var object = myStore.deletePropertyDeep(frontText, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ frontText: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				frontTextSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}
		function onAddStyleFrontText(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, frontText);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ frontText: object });
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
		function onRemoveStyleSeparator(sudoScource, key) {
			var object = myStore.deletePropertyDeep(separator, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ separator: object });
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
			setAttributes({ blockCssY: { items: cssObject } });
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
			let obj = Object.assign({}, items);
			obj[sudoScource] = cssObj;
			setAttributes({ items: obj });
			var selector = myStore.getElementSelector(sudoScource, itemsSelector);
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
		function onBulkAddFrontText(sudoScource, cssObj) {
			let obj = Object.assign({}, frontText);
			obj[sudoScource] = cssObj;
			setAttributes({ frontText: obj });
			var selector = myStore.getElementSelector(sudoScource, frontTextSelector);
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
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		useEffect(() => {
			linkAttrObj();
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [items]);
		var linkAttrObj = () => {
			var sdsd = {};
			items.options.linkAttr.map((x) => {
				if (x.val) sdsd[x.id] = x.val;
			});
			setlinkAttrItems(sdsd);
		};
		const post = useSelect((select) =>
			select("core").getEntityRecord(
				"postType",
				context["postType"],
				context["postId"]
			)
		);
		const termstaxonomy = useSelect((select) =>
			select("core").getEntityRecords("taxonomy", "category", [4, 5])
		);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
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
						<PGtoggle title={__("Query Terms", "combo-blocks")} initialOpen={true}>
							<PanelRow className="my-3 flex gap-2">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={termsQueryPrams}
									buttonTitle="Query Terms"
									onChange={addQueryPram}
									values=""></PGDropdown>
							</PanelRow>
							{queryArgs.items.map((item, index) => {
								return generateQueryArgOptions(item, index);
							})}
						</PGtoggle>
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
											{__("Item Class", "combo-blocks")}
										</label>
										<InputControl
											value={items.options.class}
											onChange={(newVal) => {
												var options = { ...items.options, class: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Link To", "combo-blocks")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											options={linkToArgs}
											buttonTitle={
												items.options.linkTo == undefined ||
													items.options.linkTo.length == 0
													? __("Choose", "combo-blocks")
													: linkToArgs[items.options.linkTo] == undefined
														? __("Choose", "combo-blocks")
														: linkToArgs[items.options.linkTo].label
											}
											onChange={setFieldLinkTo}
											values={[]}></PGDropdown>
									</PanelRow>
									{items.options.linkTo != undefined &&
										items.options.linkTo.length > 0 && (
											<>
												{items.options.linkTo == "authorMeta" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Author Meta Key", "combo-blocks")}
														</label>
														<InputControl
															value={items.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...items.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
													</PanelRow>
												)}
												{items.options.linkTo == "customField" && (
													<PanelRow>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Custom Meta Key", "combo-blocks")}
														</label>
														<InputControl
															value={items.options.linkToAuthorMeta}
															onChange={(newVal) => {
																var options = {
																	...items.options,
																	linkToAuthorMeta: newVal,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
													</PanelRow>
												)}
												{items.options.linkTo == "customUrl" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900  pg-font  ">
																{__("Custom Url", "combo-blocks")}
															</label>
															<div className="relative">
																<Button
																	className={
																		linkPickerPosttitle ? "!bg-gray-400" : ""
																	}
																	icon={link}
																	onClick={(ev) => {
																		setLinkPickerPosttitle((prev) => !prev);
																	}}></Button>
																{items.options.customUrl.length > 0 && (
																	<Button
																		className="!text-red-500 ml-2"
																		icon={linkOff}
																		onClick={(ev) => {
																			var options = {
																				...items.options,
																				customUrl: "",
																			};
																			setAttributes({
																				items: {
																					...items,
																					options: options,
																				},
																			});
																			setLinkPickerPosttitle(false);
																		}}></Button>
																)}
																{linkPickerPosttitle && (
																	<Popover position="bottom right">
																		<LinkControl
																			settings={[]}
																			value={items.options.customUrl}
																			onChange={(newVal) => {
																				var options = {
																					...items.options,
																					customUrl: newVal.url,
																				};
																				setAttributes({
																					items: {
																						...items,
																						options: options,
																					},
																				});
																			}}
																		/>
																		<div className="p-2">
																			<span>
																				{__("Linked to:", "combo-blocks")}
																			</span>{" "}
																			{items.options.customUrl.length != 0
																				? items.options.customUrl
																				: __("No link", "combo-blocks")}{" "}
																		</div>
																	</Popover>
																)}
															</div>
														</PanelRow>
														{items.options.customUrl.length > 0 && (
															<div className="p-2 pl-0 truncate ">
																<span className="font-bold">
																	{__("Linked to:", "combo-blocks")}
																</span>{" "}
																{items.options.customUrl}
															</div>
														)}
													</>
												)}
												<PanelRow>
													<label
														htmlFor=""
														className="font-medium text-slate-900 ">
														{__("Link Target", "combo-blocks")}
													</label>
													<SelectControl
														label=""
														value={items.options.linkTarget}
														options={[
															{ label: "_self", value: "_self" },
															{ label: "_blank", value: "_blank" },
															{ label: "_parent", value: "_parent" },
															{ label: "_top", value: "_top" },
														]}
														onChange={(newVal) => {
															var options = {
																...items.options,
																linkTarget: newVal,
															};
															setAttributes({
																items: { ...items, options: options },
															});
														}}
													/>
												</PanelRow>
											</>
										)}
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Prefix", "combo-blocks")}
										</label>
										<InputControl
											value={items.options.prefix}
											onChange={(newVal) => {
												var options = { ...items.options, prefix: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Postfix", "combo-blocks")}
										</label>
										<InputControl
											value={items.options.postfix}
											onChange={(newVal) => {
												var options = { ...items.options, postfix: newVal };
												setAttributes({
													items: { ...items, options: options },
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Custom Attributes", "combo-blocks")}
										</label>
										<div
											className="flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												var sdsd = items.options.linkAttr.concat({
													id: "",
													val: "",
												});
												var options = { ...items.options, linkAttr: sdsd };
												setAttributes({
													items: { ...items, options: options },
												});
												linkAttrObj();
											}}>
											{__("Add", "combo-blocks")}
										</div>
									</PanelRow>
									{items.options.linkAttr.length > 0 &&
										items.options.linkAttr.map((x, i) => {
											return (
												<div className="my-2">
													<PanelRow>
														<InputControl
															className="mr-2"
															placeholder="Name"
															value={items.options.linkAttr[i].id}
															onChange={(newVal) => {
																items.options.linkAttr[i].id = newVal;
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
														<InputControl
															className="mr-2"
															placeholder="Value"
															value={x.val}
															onChange={(newVal) => {
																items.options.linkAttr[i].val = newVal;
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}
														/>
														<span
															className="cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1"
															onClick={(ev) => {
																items.options.linkAttr.splice(i, 1);
																var ssdsd = items.options.linkAttr.concat([]);
																var options = {
																	...items.options,
																	linkAttr: ssdsd,
																};
																setAttributes({
																	items: { ...items, options: options },
																});
															}}>
															<Icon icon={close} />
														</span>
													</PanelRow>
												</div>
											);
										})}
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={items}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												items,
												"items",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												items,
												"items",
												itemsSelector,
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
										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("Before Front text", "combo-blocks"),
													value: "beforeFronttext",
												},
												{
													label: __("After Front text", "combo-blocks"),
													value: "afterFronttext",
												},
												{
													label: __("Before Items", "combo-blocks"),
													value: "beforeItems",
												},
												{
													label: __("After Items", "combo-blocks"),
													value: "afterItems",
												},
												{
													label: __("Before Term Title", "combo-blocks"),
													value: "beforeLabel",
												},
												{
													label: __("After Term Title", "combo-blocks"),
													value: "afterLabel",
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
												items,
												"items",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												items,
												"items",
												itemsSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												items,
												"items",
												itemsSelector,
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
							title={__("Term Title", "combo-blocks")}
							initialOpen={false}>
							<PGtabs
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={termTitle}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												termTitle,
												"termTitle",
												termTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												termTitle,
												"termTitle",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												termTitle,
												"termTitle",
												termTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												termTitle,
												"termTitle",
												termTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												termTitle,
												"termTitle",
												termTitleSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="options"></PGtab>
							</PGtabs>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Front Text", "combo-blocks")}
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
											{__("Front Text", "combo-blocks")}
										</label>
										<InputControl
											value={frontText.options.text}
											onChange={(newVal) => {
												var options = { ...frontText.options, text: newVal };
												setAttributes({
													frontText: { ...frontText, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={frontText}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												frontText,
												"frontText",
												frontTextSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												frontText,
												"frontText",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												frontText,
												"frontText",
												frontTextSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												frontText,
												"frontText",
												frontTextSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												frontText,
												"frontText",
												frontTextSelector,
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
							// title="Post Count"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Post Count", "combo-blocks")}</span>
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
								activeTab="styles"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "styles",
										title: "Styles",
										icon: brush,
										className: "tab-style",
									},
									{
										name: "options",
										title: "Options",
										icon: settings,
										className: "tab-settings",
									},
								]}>
								<PGtab name="styles">
									<PGStyles
										obj={postCount}
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												postCount,
												"postCount",
												postCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												postCount,
												"postCount",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												postCount,
												"postCount",
												postCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												postCount,
												"postCount",
												postCountSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												postCount,
												"postCount",
												postCountSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
								<PGtab name="options">
									<ToggleControl
										label={__("Display Post Count", "combo-blocks")}
										help={
											items.options.postCount
												? __("Post Count Enabled", "combo-blocks")
												: __("Post Count Disabled", "combo-blocks")
										}
										checked={items.options.postCount ? true : false}
										onChange={(e) => {
											var options = {
												...items.options,
												postCount: items.options.postCount ? false : true,
											};
											setAttributes({ items: { ...items, options: options } });
										}}
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
											{__("Separator", "combo-blocks")}
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Separator position", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={separator.options?.position}
											options={[
												{
													label: __("Choose Position", "combo-blocks"),
													value: "",
												},
												{
													label: __("After Item", "combo-blocks"),
													value: "afterItem",
												},
												{
													label: __("After Term Title", "combo-blocks"),
													value: "afterTermTitle",
												},
											]}
											onChange={(newVal) => {
												var options = {
													...separator.options,
													position: newVal,
												};
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
										onChange={(sudoScource, newVal, attr) => {
											myStore.onChangeStyleElement(
												sudoScource,
												newVal,
												attr,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onAdd={(sudoScource, key) => {
											myStore.onAddStyleElement(
												sudoScource,
												key,
												separator,
												"separator",
												setAttributes
											);
										}}
										onRemove={(sudoScource, key) => {
											myStore.onRemoveStyleElement(
												sudoScource,
												key,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onBulkAdd={(sudoScource, cssObj) => {
											myStore.onBulkAddStyleElement(
												sudoScource,
												cssObj,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
										onReset={(sudoSources) => {
											myStore.onResetElement(
												sudoSources,
												separator,
												"separator",
												separatorSelector,
												blockCssY,
												setAttributes
											);
										}}
									/>
								</PGtab>
							</PGtabs>
						</PGtoggle>
						{/* UTM  */}
						<PGtoggle
							className="font-medium text-slate-900 "
							// title="UTM tracking"
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("UTM Tracking", "combo-blocks")}</span>
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
							<div>
								<ToggleControl
									label={__("Enable?", "combo-blocks")}
									help={
										utmTracking.enable
											? __("Tracking Enabled.", "combo-blocks")
											: __("Tracking Disabled.", "combo-blocks")
									}
									checked={utmTracking.enable ? true : false}
									onChange={(e) => {
										var options = {
											...utmTracking,
											enable: utmTracking.enable ? false : true,
										};
										if (isProFeature) {
											alert("This feature is only available in Pro Version.");
											return;
										}
										setAttributes({
											utmTracking: options,
										});
									}}
								/>
								{utmTracking.enable ? (
									<>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												ID
											</label>
											<InputControl
												value={utmTracking.id}
												onChange={(newVal) => {
													var update = { ...utmTracking, id: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Source
											</label>
											<InputControl
												value={utmTracking.source}
												onChange={(newVal) => {
													var update = { ...utmTracking, source: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Medium
											</label>
											<InputControl
												value={utmTracking.medium}
												onChange={(newVal) => {
													var update = { ...utmTracking, medium: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Campaign
											</label>
											<InputControl
												value={utmTracking.campaign}
												onChange={(newVal) => {
													var update = { ...utmTracking, campaign: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Term
											</label>
											<InputControl
												value={utmTracking.term}
												onChange={(newVal) => {
													var update = { ...utmTracking, term: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
										<PanelRow className="">
											<label
												for=""
												className="font-medium text-slate-900 pg-font ">
												Content
											</label>
											<InputControl
												value={utmTracking.content}
												onChange={(newVal) => {
													var update = { ...utmTracking, content: newVal };
													setAttributes({
														utmTracking: update,
													});
												}}
											/>
										</PanelRow>
									</>
								) : (
									""
								)}
							</div>
						</PGtoggle>
						{/* UTM  */}

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
				<>
					{queryArgs.items.length == 0 && (
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
													'<!-- wp:combo-blocks/terms-list {"items":{"options":{"prefix":"","postfix":"","viewType":"list","hierarchicaly":false,"queryPosts":false,"accordionOpen":false,"linkToTerm":false,"linkTo":"termUrl","linkToCustomMeta":"","linkToAuthorMeta":"","customUrl":"","postCountPosition":"beforeTitle","postCountText":"Total Posts %s","gridColNumber":[],"gridColGap":"15px","gridRowGap":"15px","hideEmpty":false,"maxCount":99,"postCount":true,"class":"item","linkTarget":"","linkAttr":[]},"styles":{"color":{"Desktop":"#000000"},"fontSize":{"Desktop":"18px"},"fontStyle":{"Desktop":"normal"},"fontWeight":{"Desktop":"400"},"padding":{"Desktop":"0px 0px 0px 10px"},"backgroundColor":[],"boxShadow":{"Desktop":"0px 0px 2px 1px #50547d4d"},"backgroundImage":{"Desktop":"linear-gradient(180deg,rgb(255,255,255) 0%,rgb(251,248,248) 100%)"},"display":{"Desktop":"inline-block"},"borderRadius":{"Desktop":"4px 4px 4px 4px"},"overflow":{"Desktop":"hidden"},"margin":{"Desktop":"5px 5px 5px 5px"},"textDecoration":{"Desktop":"none #000000 wavy 1px !important"}}},"queryArgs":{"items":[{"val":"category","id":"taxonomy"},{"val":"2","id":"number"}]},"termTitle":{"options":{"class":"","text":", "},"styles":{"color":{"Desktop":"#000000"},"fontSize":[],"fontStyle":[],"fontWeight":[],"margin":[],"backgroundColor":[],"padding":{"Desktop":"5px 15px 5px 15px"},"display":{"Desktop":"inline-block"}}},"icon":{"options":{"library":"fontAwesome","srcType":"class","iconSrc":"","position":"","class":"icon"},"styles":{"color":{"Desktop":"#000000"},"margin":{"Desktop":"0px 10px 0px 10px"},"fontSize":{"Desktop":"18px"}}},"postCount":{"options":{"class":"","text":", "},"styles":{"color":{"Desktop":"#ffffff"},"fontSize":[],"fontStyle":[],"fontWeight":[],"margin":[],"backgroundColor":{"Desktop":"#e36b26"},"padding":{"Desktop":"5px 15px 5px 15px"},"display":{"Desktop":"inline-block"},"position":{"Desktop":"relative"}},"after":{"position":{"Desktop":"absolute"},"content":{"Desktop":"u0022  u0022"},"height":{"Desktop":"15px"},"width":{"Desktop":"15px"},"top":{"Desktop":"50%"},"left":{"Desktop":"-7px"},"backgroundColor":{"Desktop":"#e36b26"},"borderRadius":{"Desktop":"50px 50px 50px 50px"},"transform":{"Desktop":"translateY(-50%) "}}},"separator":{"options":{"class":"inline-block","text":""},"styles":{"color":[],"fontSize":[],"fontStyle":[],"fontWeight":[],"margin":[]}},"frontText":{"options":{"text":"","class":"inline-block"},"styles":{"color":[],"fontSize":[],"fontStyle":[],"fontWeight":[]}},"blockCssY":{"items":{".pg234414ff526d":{"display":[]},".pg234414ff526d .item":{"color":{"Desktop":"#000000"},"font-size":{"Desktop":"18px"},"font-style":{"Desktop":"normal"},"font-weight":{"Desktop":"400"},"padding":{"Desktop":"0px 0px 0px 10px"},"background-color":[],"box-shadow":{"Desktop":"0px 0px 2px 1px #50547d4d"},"background-image":{"Desktop":"linear-gradient(180deg,rgb(255,255,255) 0%,rgb(251,248,248) 100%)"},"display":{"Desktop":"inline-block"},"border-radius":{"Desktop":"4px 4px 4px 4px"},"overflow":{"Desktop":"hidden"},"margin":{"Desktop":"5px 5px 5px 5px"},"text-decoration":{"Desktop":"none #000000 wavy 1px !important"}},".pg234414ff526d .icon":{"color":{"Desktop":"#000000"},"margin":{"Desktop":"0px 10px 0px 10px"},"font-size":{"Desktop":"18px"}},".pg234414ff526d .termTitle":{"color":{"Desktop":"#000000"},"font-size":[],"font-family":[],"font-style":[],"font-weight":[],"margin":[],"background-color":[],"padding":{"Desktop":"5px 15px 5px 15px"},"display":{"Desktop":"inline-block"}},".pg234414ff526d .postCount":{"color":{"Desktop":"#ffffff"},"font-size":[],"font-family":[],"font-style":[],"font-weight":[],"margin":[],"background-color":{"Desktop":"#e36b26"},"padding":{"Desktop":"5px 15px 5px 15px"},"display":{"Desktop":"inline-block"},"position":{"Desktop":"relative"}},".pg234414ff526d .postCount::after":{"position":{"Desktop":"absolute"},"content":{"Desktop":"u0022  u0022"},"height":{"Desktop":"15px"},"width":{"Desktop":"15px"},"top":{"Desktop":"50%"},"left":{"Desktop":"-7px"},"background-color":{"Desktop":"#e36b26"},"border-radius":{"Desktop":"50px 50px 50px 50px"},"transform":{"Desktop":"translateY(-50%) "}}}},"blockId":"pg234414ff526d"} /-->';
												wp.data
													.dispatch("core/block-editor")
													.replaceBlock(clientId, wp.blocks.parse(content));
											}}>
											{__("Skip", "combo-blocks")}
										</div>
									</div>
									<div {...blockProps} className="">
										<ComboBlocksVariationsPicker
											blockName={"terms-list"}
											blockId={blockId}
											clientId={clientId}
											onChange={onPickBlockVariation}
										/>
									</div>
								</div>
							</div>
						</>
					)}
					{queryArgs.items.length > 0 && (
						<>
							{taxonomy == false && (
								<div {...blockProps}>
									{__("Add Query Terms to show the term list.", "combo-blocks")}
								</div>
							)}
							{taxonomy && categories.length == 0 && (
								<div {...blockProps}>{__("No Terms Found", "combo-blocks")}</div>
							)}
							{taxonomy && categories.length > 0 && (
								<div {...blockProps}>
									{icon.options.position == "beforeFronttext" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									<span className="frontText">
										<div
											dangerouslySetInnerHTML={{
												__html: frontText.options.text,
											}}></div>
									</span>
									{icon.options.position == "afterFronttext" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{icon.options.position == "beforeItems" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
									{categories.map((x, index) => {
										return (
											<>
												{items.options.linkTo != undefined &&
													items.options.linkTo.length == 0 && (
														<span
															// onClick={(ev) => ev.preventDefault()}
															// target={items.options.linkTarget}
															title={x.name}
															{...linkAttrItems}
															className={items.options.class}
														// href={x.link}
														>
															{icon.options.position == "beforeLabel" && (
																<span
																	className={icon.options.class}
																	dangerouslySetInnerHTML={{ __html: iconHtml }}
																/>
															)}
															<span className="termTitle">
																{items.options.prefix}
																{x.name}
																{items.options.postfix}
															</span>
															{items.options.postCount == true && (
																<span className="postCount">{x.count}</span>
															)}
															{icon.options.position == "afterLabel" && (
																<span
																	className={icon.options.class}
																	dangerouslySetInnerHTML={{ __html: iconHtml }}
																/>
															)}
															{categories.length > index + 1 &&
																separator.options?.position ==
																"afterTermTitle" && (
																	<span className="separator">
																		{separator.options.text}{" "}
																	</span>
																)}
														</span>
													)}
												{items.options.linkTo != undefined &&
													items.options.linkTo.length > 0 && (
														<a
															onClick={(ev) => ev.preventDefault()}
															target={items.options.linkTarget}
															title={x.name}
															{...linkAttrItems}
															className={items.options.class}
															href={x.link}>
															{icon.options.position == "beforeLabel" && (
																<span
																	className={icon.options.class}
																	dangerouslySetInnerHTML={{ __html: iconHtml }}
																/>
															)}
															<span className="termTitle">
																{items.options.prefix}
																{x.name}
																{items.options.postfix}
															</span>
															{items.options.postCount == true && (
																<span className="postCount">{x.count}</span>
															)}
															{icon.options.position == "afterLabel" && (
																<span
																	className={icon.options.class}
																	dangerouslySetInnerHTML={{ __html: iconHtml }}
																/>
															)}
															{categories.length > index + 1 &&
																separator.options?.position ==
																"afterTermTitle" && (
																	<span className="separator">
																		{separator.options.text}{" "}
																	</span>
																)}
														</a>
													)}
												{categories.length > index + 1 &&
													separator.options?.position == "afterItem" && (
														<span className="separator">
															{separator.options.text}{" "}
														</span>
													)}
											</>
										);
									})}
									{icon.options.position == "afterItems" && (
										<span
											className={icon.options.class}
											dangerouslySetInnerHTML={{ __html: iconHtml }}
										/>
									)}
								</div>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return null;
	},
});
