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
		const itemsWrapSelector = blockClass + " .item";
		var [isBusy, setIsBusy] = useState(false); // Using the hook.
		const [posts, setPosts] = useState([]); // Using the hook.
		const [activeBlockContextId, setActiveBlockContextId] = useState();
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		const parentBlock = select("core/block-editor").getBlock(parentClientId);
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} items-loop`,
		});
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
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
				var itemsWrapX = attributes.itemsWrap;
				var blockCssY = attributes.blockCssY;
				var blockCssObj = {};
				if (itemsWrapX != undefined) {
					var itemsWrapY = { ...itemsWrapX, options: itemsWrap.options };
					setAttributes({ itemsWrap: itemsWrapY });
					blockCssObj[itemsWrapSelector] = itemsWrapY;
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
		const termsQueryPramsBasic = {
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
			include: {
				value: "",
				multiple: false,
				id: "include",
				isPro: true,
				label: "Include",
				description: "An array of user IDs to include.",
				longDescription: "An array of user IDs to include.",
			},
			exclude: {
				value: "",
				multiple: false,
				id: "exclude",
				isPro: true,
				label: "Exclude",
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
			paged: {
				value: "",
				multiple: false,
				id: "paged",
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
			blog_id: {
				value: "",
				multiple: false,
				id: "blog_id",
				label: "Blog ID",
				description: "The site ID. Default is the current site.",
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
			// meta_query: {
			// 	value: "",
			// 	multiple: false,
			// 	id: "meta_query",
			// 	isPro: true,
			// 	label: "Meta Query",
			// 	description:
			// 		"MySQL data type that the meta_key column will be CAST to for comparisons.",
			// 	longDescription:
			// 		"MySQL data type that the meta_key column will be CAST to for comparisons.",
			// },
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
				description: "The user nicename.",
				longDescription: "The user nicename.",
			},
			nicename__in: {
				value: "",
				multiple: false,
				id: "nicename__in",
				isPro: true,
				label: "Nicename In",
				placeholder: "Comma separated value",
				description: "An array of nicenames to include.",
				longDescription:
					"An array of nicenames to include. Users matching one of these nicenames will be included in results.",
			},
			nicename__not_in: {
				value: "",
				multiple: false,
				id: "nicename__not_in",
				isPro: true,
				label: "Nicename Not In",
				placeholder: "Comma separated value",
				description: "An array of nicenames to exclude.",
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
				placeholder: "Comma separated value",
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
				placeholder: "Comma separated value",
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
		let termsQueryPrams = applyFilters(
			"comboBlocksUsersQueryPrams",
			termsQueryPramsBasic
		);
		// let termsQueryPrams = applyFilters("termsQueryPrams", termsQueryPramsBasic);
		const ALLOWED_BLOCKS = [
			"combo-blocks/flex-wrap",
			"combo-blocks/layers",
			"combo-blocks/user-fields",
			"combo-blocks/layer",
			"combo-blocks/grid-wrap",
		];
		const MY_TEMPLATE = [["combo-blocks/user-fields", {}]];
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			//renderAppender: InnerBlocks.ButtonBlockAppender
		});
		const TEMPLATE = [["combo-blocks/user-fields", {}]];
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
				// var itemsWrapOptions = {
				// 	...itemsWrap.options,
				// 	excludedWrapper: true,
				// };
				// setAttributes({
				// 	itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
				// });

				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: false,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				} else {
					var itemsWrapOptions = {
						...itemsWrap.options,
						excludedWrapper: true,
					};
					setAttributes({
						itemsWrap: { ...itemsWrap, options: itemsWrapOptions },
					});
				}




				if (parentBlock.name == "combo-blocks/content-slider") {
					className = " pg-content-slider-item splide__slide ";
				}
				if (parentBlock.name == "combo-blocks/grid-wrap") {
					className = " pg-grid-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/user-showcase") {
					className = " pg-user-showcase-item ";
				}
				if (parentBlock.name == "combo-blocks/masonry-wrap") {
					className = " pg-masonry-wrap-item ";
				}
				if (parentBlock.name == "combo-blocks/image-gallery") {
					className = " pg-image-gallery-item ";
				}
				if (parentBlock.name == "combo-blocks/filterable-grid") {
					className = " item ";
				}

				if (parentBlock.name == "combo-blocks/filterable-grid") {
					var options = {
						...itemWrap.options,
						class: className,
						roleClass: true,
					};
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				} else {
					var options = { ...itemWrap.options, class: className };
					setAttributes({
						itemWrap: { ...itemWrap, options: options },
					});
				}



				// var options = { ...itemWrap.options, class: className };
				// setAttributes({
				// 	itemWrap: { ...itemWrap, options: options },
				// });
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
		const [categories, setUsers] = useState([]); // Using the hook.
		function fetchTerms() {
			// setIsBusy(true);
			var arg = queryArgs.items.map((item) => {
				return { id: item.id, val: item.val };
			});
			apiFetch({
				path: "/combo-blocks/v2/get_users",
				method: "POST",
				data: { queryArgs: arg },
			}).then((res) => {
				// setIsBusy(false);
				if (res.posts !== undefined) {
					setUsers(res.posts);
				}
			});
		}
		useEffect(() => {
			fetchTerms();
		}, [queryArgs]);
		var linkToArgsBasic = {
			noUrl: { label: __("No URL", "combo-blocks"), value: "" },
			termUrl: { label: __("No URL", "combo-blocks"), value: "termUrl" },
		};
		let linkToArgs = linkToArgsBasic;
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
						{(item.id == "role" ||
							item.id == "role__in" ||
							item.id == "role__not_in" ||
							item.id == "capability" ||
							item.id == "capability__in" ||
							item.id == "capability__not_in") && (
								<>
									<PanelRow>
										<label
											for=""
											className="font-medium text-slate-900 underline decoration-dotted underline-offset-2 "
											data-pgTooltip={termsQueryPrams[itemId].longDescription}
											data-pgTooltip-location="bottom">
											{termsQueryPrams[itemId].label}
										</label>
										<InputControl
											// value={termsQueryPrams[itemId].value}
											value={queryArgs.items[index].val}
											type="text"
											placeholder={
												termsQueryPrams[itemId].placeholder != undefined
													? termsQueryPrams[itemId].placeholder
													: ""
											}
											onChange={(newVal) => {
												updateQueryPram(newVal, index);
											}}
										/>
									</PanelRow>
								</>
							)}
						{(item.id == "blog_id" ||
							item.id == "meta_key" ||
							item.id == "meta_value" ||
							item.id == "meta_compare" ||
							item.id == "meta_compare_key" ||
							item.id == "meta_type" ||
							item.id == "meta_type_key" ||
							item.id == "include" ||
							item.id == "exclude" ||
							item.id == "search" ||
							item.id == "search_columns" ||
							item.id == "offset" ||
							item.id == "number" ||
							item.id == "paged" ||
							item.id == "who" ||
							item.id == "nicename" ||
							item.id == "nicename__in" ||
							item.id == "nicename__not_in" ||
							item.id == "login" ||
							item.id == "login__in" ||
							item.id == "login__not_in") && (
								<div>
									<PanelRow>
										<label
											for=""
											className="font-medium text-slate-900 underline decoration-dotted underline-offset-2 "
											data-pgTooltip={termsQueryPrams[itemId].longDescription}
											data-pgTooltip-location="bottom">
											{termsQueryPrams[itemId].label}
										</label>
										<InputControl
											// value={termsQueryPrams[itemId].value}
											value={queryArgs.items[index].val}
											type={
												item.id == "paged" ||
													item.id == "number" ||
													item.id == "blog_id" ||
													item.id == "offset"
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
												updateQueryPram(newVal, index);
											}}
										/>
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
						{(item.id == "count_total" || item.id == "cache_results") && (
							<div>
								<ToggleControl
									label={termsQueryPrams[itemId].label}
									help={queryArgs.items[index].val ? "True" : "False"}
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
							<div className="">
								<SelectControl
									value={item.value}
									options={[
										{ label: __("None", "combo-blocks"), value: "none" },
										{ label: "ID", value: "ID" },
										{ label: "Display Name", value: "display_name" },
										{ label: "User Login", value: "user_login" },
										{ label: "Login", value: "login" },
										{ label: "Login In", value: "login__in" },
										{ label: "Name", value: "name" },
										{ label: "User Nicename", value: "user_nicename" },
										{ label: "Nicename", value: "nicename" },
										{ label: "Nicename In", value: "nicename__in" },
										{ label: "User Email", value: "user_email" },
										{ label: "Email", value: "email" },
										{ label: "User URL", value: "user_url" },
										{ label: "URL", value: "url" },
										{ label: "User Registered", value: "user_registered" },
										{ label: "Registered", value: "registered" },
										{ label: "Post Count", value: "post_count" },
										{ label: "Meta Value", value: "meta_value" },
										{ label: "Meta Value Num", value: "meta_value_num" },
										// { label: "Type", value: "type" },
										// { label: "Date", value: "date" },
										// { label: "Modified", value: "modified" },
										// { label: "Parent", value: "parent" },
										// { label: "Random", value: "rand" },
										// { label: "Comment Count", value: "comment_count" },
										// { label: "Relevance", value: "relevance" },
										// { label: "Menu Order", value: "menu_order" },
										// { label: "Meta Value(String)", value: "meta_value" },
										// { label: "Meta Value(Number)", value: "meta_value_num" },
										// { label: "post__in", value: "post__in" },
										// { label: "post_name__in", value: "post_name__in" },
										// { label: "post_parent__in", value: "post_parent__in" },
									]}
									multiple={true}
									onChange={(newVal) => {
										updateQueryPram(newVal, index);
									}}
								/>
							</div>
						)}
						{item.id == "fields" && (
							<div className="">
								<SelectControl
									value={item.value}
									options={[
										{ label: __("None", "combo-blocks"), value: "none" },
										{ label: "ID", value: "ID" },
										{ label: "Display Name", value: "display_name" },
										{ label: "User Login", value: "user_login" },
										{ label: "User Nicename", value: "user_nicename" },
										{ label: "User Email", value: "user_email" },
										{ label: "User URL", value: "user_url" },
										{ label: "User Registered", value: "user_registered" },
										{ label: "User Pass", value: "user_pass" },
										{
											label: "User Activation Key",
											value: "user_activation_key",
										},
										{ label: "User Status", value: "user_status" },
										{ label: "Spam", value: "spam" },
										{ label: "Deleted", value: "deleted" },
										{ label: "All", value: "all" },
										// { label: "Type", value: "type" },
										// { label: "Date", value: "date" },
										// { label: "Modified", value: "modified" },
										// { label: "Parent", value: "parent" },
										// { label: "Random", value: "rand" },
										// { label: "Comment Count", value: "comment_count" },
										// { label: "Relevance", value: "relevance" },
										// { label: "Menu Order", value: "menu_order" },
										// { label: "Meta Value(String)", value: "meta_value" },
										// { label: "Meta Value(Number)", value: "meta_value_num" },
										// { label: "post__in", value: "post__in" },
										// { label: "post_name__in", value: "post_name__in" },
										// { label: "post_parent__in", value: "post_parent__in" },
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
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<PGtoggle title={__("Query Users", "combo-blocks")} initialOpen={true}>
							<PanelRow className="my-3 flex gap-2">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									options={termsQueryPrams}
									buttonTitle="User Query"
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
								<ToggleControl
									label={__("User Role Class?", "combo-blocks")}
									help={
										itemWrap.options.roleClass
											? __("Role Class Added.", "combo-blocks")
											: __("Role Class Removed", "combo-blocks")
									}
									checked={itemWrap.options.roleClass ? true : false}
									onChange={(e) => {
										var options = {
											...itemWrap.options,
											roleClass: itemWrap.options.roleClass ? false : true,
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
									{categories.map((post, j) => {
										return (
											<>
												<BlockContextProvider
													key={post.ID}
													value={{
														userId: post.ID,
														queryId: blockId,
														loopIndex: j,
														userData: post,
													}}>
													{post.ID ===
														(activeBlockContextId || categories[0]?.ID) ? (
														<>
															<PostTemplateInnerBlocks attsx={TEMPLATE} />
														</>
													) : null}
													<MemoizedPostTemplateBlockPreview
														blocks={childBlocks}
														blockContextId={post.ID}
														setActiveBlockContextId={setActiveBlockContextId}
														isHidden={
															post.ID ===
															(activeBlockContextId || categories[0]?.ID)
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
										{categories.map((post, j) => {
											return (
												<>
													<BlockContextProvider
														key={post.ID}
														value={{
															userId: post.ID,
															queryId: blockId,
															loopIndex: j,
															userData: post,
														}}>
														{post.ID ===
															(activeBlockContextId || categories[0]?.ID) ? (
															<>
																<PostTemplateInnerBlocks attsx={TEMPLATE} />
															</>
														) : null}
														<MemoizedPostTemplateBlockPreview
															blocks={childBlocks}
															blockContextId={post.ID}
															setActiveBlockContextId={setActiveBlockContextId}
															isHidden={
																post.ID ===
																(activeBlockContextId || categories[0]?.ID)
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
