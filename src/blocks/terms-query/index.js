import apiFetch from "@wordpress/api-fetch";
import {
	BlockContextProvider,
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	Spinner,
	ToggleControl
} from "@wordpress/components";
import {
	select,
	useDispatch,
	useSelect
} from "@wordpress/data";
import {
	memo,
	useEffect,
	useState
} from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	close,
	copy,
	Icon,
	pages
} from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";

// import termsQueryPrams from "./queryprams";
import PGtoggle from "../../components/toggle";
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
		var itemsWrap = attributes.itemsWrap;
		var itemWrap = attributes.itemWrap;
		var blockCssY = attributes.blockCssY;
		var queryArgs = attributes.queryArgs;
		var taxonomies = attributes.taxonomies;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
		const CustomTagItemWrapper =
			itemWrap.options.tag.length != 0 ? `${itemWrap.options.tag}` : "div";
		// Wrapper CSS Class Selectors
		const wrapperSelector = blockClass;
		const itemsSelector = blockClass + " .item";
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		const [posts, setPosts] = useState([]); // Using the hook.
		const [activeBlockContextId, setActiveBlockContextId] = useState();
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);
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
		const ALLOWED_BLOCKS = [
			"combo-blocks/flex-wrap",
			"combo-blocks/layers",
			"combo-blocks/terms-query-item",
			"combo-blocks/layer",
			"combo-blocks/grid-wrap",
		];
		const MY_TEMPLATE = [["combo-blocks/terms-query-item", {}]];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});
		const TEMPLATE = [["combo-blocks/terms-query-item", {}]];
		function PostTemplateInnerBlocks({ attsx }) {
			const innerBlocksProps = useInnerBlocksProps(
				{ className: itemWrap.options.class },
				{ template: attsx }
			);
			return (
				<CustomTagItemWrapper {...innerBlocksProps}></CustomTagItemWrapper>
			);
		}
		function PostTemplateBlockPreview({
			blocks,
			blockContextId,
			isHidden,
			setActiveBlockContextId,
		}) {
			const blockPreviewProps = useBlockPreview({
				blocks,
				props: {
					className: itemWrap.options.class,
				},
			});
			const handleOnClick = () => {
				setActiveBlockContextId(blockContextId);
			};
			const style = {
				display: isHidden ? "none" : undefined,
			};
			return (
				<div
					{...blockPreviewProps}
					tabIndex={0}
					role="button"
					onClick={handleOnClick}
					style={style}
				/>
			);
		}
		const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);
		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			// setAttributes({ postTitle: postTitle });
			// setAttributes({ wrapper: wrapper });
			var className = itemWrap.options.class;
			if (parentBlock != null) {
				var itemsWrapOptions = {
					...itemsWrap.options,
					excludedWrapper: true,
				};
				setAttributes({
					itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
				});
				if (parentBlock.name == "combo-blocks/content-slider") {
					className = " pg-content-slider-item splide__slide ";
				}
				if (parentBlock.name == "combo-blocks/grid-wrap") {
					className = " pg-grid-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/terms-showcase") {
					className = " pg-terms-showcase-item ";
				}


				if (parentBlock.name == "combo-blocks/masonry-wrap") {
					className = " pg-masonry-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/image-gallery") {
					className = " pg-image-gallery-item ";
				}
				var options = { ...itemWrap.options, class: className };
				setAttributes({
					itemWrap: { ...itemWrap, options: options },
				});
			}
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
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var itemX = blockCssRules;
			setAttributes({ blockCssY: { items: itemX } });
		}, [blockId]);
		//var select = wp.data.select("core/block-editor");
		//var blocks = select.getBlocks(clientId);
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		const [categories, setCategories] = useState([]); // Using the hook.
		const [taxonomy, setTaxonomy] = useState(false);
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
		var linkToArgsBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
		};
		let linkToArgs = linkToArgsBasic;
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
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
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
										// value={termsQueryPrams[itemId].value}
										value={queryArgs.items[index].val}
										type={
											item.id == "offset" ||
												item.id == "number" ||
												item.id == "child_of"
												? // ||
												// item.id == "parent"
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
												? "Hide Empty Enabled"
												: "Hide Empty Disabled"
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
				var taxonomiesX = attributes.taxonomies;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (taxonomiesX != undefined) {
					var taxonomiesY = { ...taxonomiesX, options: taxonomies.options };
					setAttributes({ taxonomies: taxonomiesY });
					blockCssObj[taxonomiesSelector] = taxonomiesY;
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
			myStore.onAddStyleElement(sudoScource, key, wrapper, "wrapper", setAttributes);
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
		const copyData = (data) => {
			const dataString = JSON.stringify(data, null, 2);
			navigator.clipboard
				.writeText(dataString)
				.then(() => {
					// alert("Data copied to clipboard!");
				})
				.catch((err) => {

				});
		};
		const pasteData = () => {
			navigator.clipboard
				.readText()
				.then((text) => {
					const parsedData = JSON.parse(text);
					setAttributes({
						queryArgs: { ...queryArgs, items: parsedData },
					});
				})
				.catch((err) => {

				});
		};
		var [linkAttrItems, setlinkAttrItems] = useState({}); // Using the hook.
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		const termstaxonomy = useSelect((select) =>
			select("core").getEntityRecords("taxonomy", "category", [4, 5])
		);
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
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										open;
										copyData(queryArgs.items);
									}}>
									<Icon icon={copy} className="fill-white " size={14} />
									{__("Copy", "combo-blocks")}
								</div>
								<div
									className="pg-font cursor-pointer py-1 px-2 flex items-center gap-1 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700 "
									onClick={() => {
										open;
										pasteData();
									}}>
									<Icon icon={pages} className="fill-white " size={14} />
									{__("Paste", "combo-blocks")}
								</div>
							</PanelRow>
							{queryArgs.items.map((item, index) => {
								return generateQueryArgOptions(item, index);
							})}
						</PGtoggle>
						<PGtoggle title={__("Wrapper", "combo-blocks")} initialOpen={false}>
							<ToggleControl
								label={__("Wrapper Exclude?", "combo-blocks")}
								help={
									itemsWrap.options.excludedWrapper
										? __("Wrapper Excluded.", "combo-blocks")
										: __("Wrapper Included", "combo-blocks")
								}
								checked={itemsWrap.options.excludedWrapper ? true : false}
								onChange={(e) => {
									var options = {
										...itemsWrap.options,
										excludedWrapper: itemsWrap.options.excludedWrapper
											? false
											: true,
									};
									setAttributes({
										itemsWrap: { ...itemsWrap, options: options },
									});
								}}
							/>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Item", "combo-blocks")}
							initialOpen={false}>
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Tag", "combo-blocks")}
								</label>
								<SelectControl
									label=""
									value={itemWrap.options.tag}
									options={[
										{ label: __("Choose", "combo-blocks"), value: "" },
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
									]}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, tag: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Item Wrapper Class", "combo-blocks")}
								</label>
								<InputControl
									value={itemWrap.options.class}
									onChange={(newVal) => {
										var options = { ...itemWrap.options, class: newVal };
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</PanelRow>
							<div className=" flex flex-col gap-4 ">
								<ToggleControl
									label={__("Counter Class?", "combo-blocks")}
									help={
										itemWrap.options.counterClass
											? __("Counter Class Added.", "combo-blocks")
											: __("Counter Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.counterClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											counterClass: itemWrap.options.counterClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Terms Class?", "combo-blocks")}
									help={
										itemWrap.options.termsClass
											? __("Terms Class Added.", "combo-blocks")
											: __("Terms Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.termsClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											termsClass: itemWrap.options.termsClass ? false : true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
								<ToggleControl
									label={__("Odd/Even Class?", "combo-blocks")}
									help={
										itemWrap.options.oddEvenClass
											? __("Odd/Even Class Added.", "combo-blocks")
											: __("Odd/Even Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.oddEvenClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											oddEvenClass: itemWrap.options.oddEvenClass
												? false
												: true,
										};
										setAttributes({
											itemWrap: { ...itemWrap, options: options },
										});
									}}
								/>
							</div>
						</PGtoggle>

						{/* <PGtoggle
							className="font-medium text-slate-900 "
							title={__("Block Variations", "combo-blocks")}
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={blockNameLast}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PGtoggle> */}

					</div>
				</InspectorControls>
				<>
					{isBusy && (
						<div {...blockProps}>
							<div className={spinnerWrap.options.class}>
								<Spinner />
							</div>{" "}
						</div>
					)}
					{isBusy == false && categories != null && categories.length > 0 && (
						<>
							{itemsWrap.options.excludedWrapper && (
								<>
									{categories.map((post) => {
										return (
											<>
												<BlockContextProvider
													key={post.term_id}
													value={{
														term_id: post.term_id,
														taxonomy: post.taxonomy,
													}}>
													{post.term_id ===
														(activeBlockContextId || categories[0]?.term_id) ? (
														<>
															<PostTemplateInnerBlocks attsx={TEMPLATE} />
														</>
													) : null}
													<MemoizedPostTemplateBlockPreview
														blocks={childBlocks}
														blockContextId={post.term_id}
														setActiveBlockContextId={setActiveBlockContextId}
														isHidden={
															post.term_id ===
															(activeBlockContextId || categories[0]?.term_id)
														}
													/>
												</BlockContextProvider>
											</>
										);
									})}
								</>
							)}
							{!itemsWrap.options.excludedWrapper && (
								<>
									<div {...blockProps}>
										{categories.map((post) => {
											return (
												<>
													<BlockContextProvider
														key={post.term_id}
														value={{
															term_id: post.term_id,
															taxonomy: post.taxonomy,
														}}>
														{post.term_id ===
															(activeBlockContextId || categories[0]?.term_id) ? (
															<>
																<PostTemplateInnerBlocks attsx={TEMPLATE} />
															</>
														) : null}
														<MemoizedPostTemplateBlockPreview
															blocks={childBlocks}
															blockContextId={post.term_id}
															setActiveBlockContextId={setActiveBlockContextId}
															isHidden={
																post.term_id ===
																(activeBlockContextId || categories[0]?.term_id)
															}
														/>
													</BlockContextProvider>
												</>
											);
										})}
									</div>
								</>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		return <InnerBlocks.Content />;
	},
});
