const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	close,
	edit,
	copy,
	pen,
} from "@wordpress/icons";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { useSelect } from "@wordpress/data";
import {
	__experimentalInputControl as InputControl,
	Popover,
	Spinner,
	PanelBody,
	ToggleControl,
	PanelRow,
	ColorPalette,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";
import PGStyles from "../styles";
var myStore = wp.data.select("ComboBlocksStore");
const PGTaxonomies = (props) => {
	const [taxonomies, setTaxonomies] = useState(props.args);
	useEffect(() => {
		props.onChange(taxonomies);
	}, [taxonomies]);

	function duplicate(index) {
		let duplicatedArray = taxonomies.concat();
		let duplicateObject = JSON.parse(JSON.stringify(duplicatedArray[index]));
		duplicatedArray.push(duplicateObject);
		setTaxonomies(duplicatedArray);
	}
	return (
		<div className="">
			<div
				// className="bg-gray-700 hover:bg-gray-600 my-3 cursor-pointer rounded-sm inline-block text-white px-3 py-1"
				className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
				onClick={(ev) => {
					var sdsd = taxonomies.concat({
						labels: {
							name: "",
							singular_name: "",
							menu_name: "",
							search_items: "",
							all_items: "",
							parent_item: "",
							parent_item_colon: "",
							edit_item: "",
							update_item: "",
							add_new_item: "",
							new_item_name: "",


						},
						description: "This is where you can create and manage %s.",
						public: false,
						slug: "product-category",
						rest_base: "",
						rest_namespace: "",
						rest_controller_class: "",
						show_in_quick_edit: true,
						show_tagcloud: true,
						show_ui: true,
						show_in_rest: true,
						// capabilities: {
						// 	publish_posts: "",
						// 	edit_posts: "",
						// 	edit_others_posts: "",
						// 	read_private_posts: "",
						// 	edit_post: "",
						// 	delete_post: "",
						// 	read_post: "",
						// },
						map_meta_cap: true,
						publicly_queryable: true,
						exclude_from_search: false,
						hierarchical: false,
						show_admin_column: false,
						update_count_callback: "",
						default_term: "",
						sort: true,
						object_types: "",
						query_var: true,
						show_in_nav_menus: true,
						rewrite: true,
						menu_icon: "dashicons-edit",
						show_in_menu: "",
					});
					setTaxonomies(sdsd);
				}}>
				{__("Add", "combo-blocks")}
			</div>
			{taxonomies != undefined &&
				taxonomies.map((item, index) => {
					//var itemIndex = item[0];
					//var itemArgs = item[1];
					var options = item;
					return (
						<PanelBody
							title={
								<>
									<span
										className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
										onClick={() => {
											var postTypesX = [...taxonomies];
											var sdsd = postTypesX.splice(index, 1);
											setTaxonomies(postTypesX);
										}}>
										<span className="text-[20px] text-white ">&times;</span>
									</span>
									<span
										className="w-[30] h-[30px]  text-lime-500 flex justify-center items-center cursor-pointer "
										onClick={(ev) => {
											ev.preventDefault();
											ev.stopPropagation();
											duplicate(index);
										}}>
										<Icon fill={"#fff"} icon={copy} />
									</span>
									<span className="px-3">{options.labels.name}</span>
								</>
							}
							initialOpen={false}>
							{/* <InputControl
								className="my-3"
								label=""
								help=""
								placeholder=".element-class or #element-id"
								value={options.name}
								onChange={(value) => {
									// setopenAi({ ...openAi, promt: value })
									//item.options.selector = value
									// globalStyles[index].options.selector = value
									taxonomies[index].options.name = value;
									props.onChange(taxonomies);
								}}
							/> */}

							<div className="grid grid-cols-4 gap-5">
								<div className="flex flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Slug", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="post"
										value={options.slug}
										onChange={(value) => {
											taxonomies[index].slug = value;
											taxonomies[index].labels.name = value;
											taxonomies[index].labels.singular_name = value;
											taxonomies[index].labels.menu_name = value;
											taxonomies[index].labels.all_items = "All " + value;
											taxonomies[index].labels.add_new = "Add " + value;
											taxonomies[index].labels.add_new_item = "Add " + value;
											taxonomies[index].labels.edit = "Edit " + value;
											taxonomies[index].labels.edit_item = "Edit " + value;
											taxonomies[index].labels.new_item = "New " + value;
											taxonomies[index].labels.view = "View " + value;
											taxonomies[index].labels.view_item = "View " + value;
											taxonomies[index].labels.search_items = "Search " + value;
											taxonomies[index].labels.not_found = value + " Not found";
											taxonomies[index].labels.not_found_in_trash =
												value + " Not found in trash";
											taxonomies[index].labels.parent = "Parent " + value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Post Types", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="post_type1,post_type2"
										value={options.object_types}
										onChange={(value) => {
											taxonomies[index].object_types = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Description", "combo-blocks")}</label>
									<textarea
										className="my-3 w-full"
										label=""
										help=""
										placeholder="This is where you can create and manage %s."
										value={options.description}
										onChange={(event) => {
											const { value } = event.target;
											const updatedPostTypes = [...taxonomies];
											updatedPostTypes[index].description = value;
											props.onChange(updatedPostTypes);
										}}
									/>
								</div>
							</div>


							<div className="mt-8 grid grid-cols-4 gap-5 gap-y-2  p-3 border border-solid border-gray-900/50 relative after:absolute after:content-['Labels'] after:-top-3 after:left-4 after:h-6 after:w-max after:flex after:items-center after:bg-white after:px-2 rounded-md after:z-10 ">

								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Name", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Name in plural"
										value={options.labels.name}
										onChange={(value) => {
											// taxonomies[index].labels.name = value;
											// props.onChange(taxonomies);





											taxonomies[index].labels.name = value;
											taxonomies[index].labels.singular_name = value;
											taxonomies[index].labels.menu_name = value;
											taxonomies[index].labels.all_items = "All " + value;
											taxonomies[index].labels.add_new = "Add " + value;
											taxonomies[index].labels.add_new_item = "Add " + value;
											taxonomies[index].labels.edit = "Edit " + value;
											taxonomies[index].labels.edit_item = "Edit " + value;
											taxonomies[index].labels.new_item = "New " + value;
											taxonomies[index].labels.view = "View " + value;
											taxonomies[index].labels.view_item = "View " + value;
											taxonomies[index].labels.search_items = "Search " + value;
											taxonomies[index].labels.not_found = value + " Not found";
											taxonomies[index].labels.not_found_in_trash =
												value + " Not found in trash";
											taxonomies[index].labels.parent = "Parent " + value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">
										{__("Singular Name", "combo-blocks")}
									</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Name in singular"
										value={options.labels.singular_name}
										onChange={(value) => {
											taxonomies[index].labels.singular_name = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Menu Name", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Menu Name"
										value={options.labels.menu_name}
										onChange={(value) => {
											taxonomies[index].labels.menu_name = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("All Items", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="All Items"
										value={options.labels.all_items}
										onChange={(value) => {
											taxonomies[index].labels.all_items = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Add New", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Add new"
										value={options.labels.add_new}
										onChange={(value) => {
											taxonomies[index].labels.add_new = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Add New Item", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Add New Item"
										value={options.labels.add_new_item}
										onChange={(value) => {
											taxonomies[index].labels.add_new_item = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Edit", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Edit"
										value={options.labels.edit}
										onChange={(value) => {
											taxonomies[index].labels.edit = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Edit Item", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Edit %s"
										value={options.labels.edit_item}
										onChange={(value) => {
											taxonomies[index].labels.edit_item = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("New Item", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="New Item %s"
										value={options.labels.new_item}
										onChange={(value) => {
											taxonomies[index].labels.new_item = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("View", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="View Item %s"
										value={options.labels.view}
										onChange={(value) => {
											taxonomies[index].labels.view = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("View Item", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="View Items %s"
										value={options.labels.view_item}
										onChange={(value) => {
											taxonomies[index].labels.view_item = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Search Item", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Search Item %s"
										value={options.labels.search_items}
										onChange={(value) => {
											taxonomies[index].labels.search_items = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Not Found", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="No %s Found"
										value={options.labels.not_found}
										onChange={(value) => {
											taxonomies[index].labels.not_found = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col  bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Not Found in Trash", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="No %s found in trash"
										value={options.labels.not_found_in_trash}
										onChange={(value) => {
											taxonomies[index].labels.not_found_in_trash = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3  ">
									<label htmlFor="">{__("Parent", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Parent %s"
										value={options.labels.parent}
										onChange={(value) => {
											taxonomies[index].labels.parent = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
							</div>

							<div className="grid grid-cols-4 gap-6 gap-y-2 p-3 mt-2">


								{/* </div> */}
								{/* <div className="mt-8 grid grid-cols-4 gap-5 gap-y-2  p-3 border border-solid border-gray-900/50 relative after:absolute after:content-['Capabilities'] after:-top-3 after:left-4 after:h-6 after:w-max after:flex after:items-center after:bg-white after:px-2 rounded-md after:z-10 "> */}
								{/* <div className="grid grid-cols-4 gap-6 p-3 mt-2"> */}
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Public", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].public ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												public: taxonomies[index].public ? false : true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show UI", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].show_ui ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												show_ui: taxonomies[index].show_ui ? false : true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show in rest", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].show_in_rest ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												show_in_rest: taxonomies[index].show_in_rest
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Map Meta Cap", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].map_meta_cap ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												map_meta_cap: taxonomies[index].map_meta_cap
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Publicly Queryable", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].publicly_queryable ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												publicly_queryable: taxonomies[index].publicly_queryable
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Exclude From Search", "combo-blocks")}</label>
									<ToggleControl
										checked={
											taxonomies[index].exclude_from_search ? true : false
										}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												exclude_from_search: taxonomies[index]
													.exclude_from_search
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Hierarchical", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].hierarchical ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												hierarchical: taxonomies[index].hierarchical
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show admin column", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].show_admin_column ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												show_admin_column: taxonomies[index].show_admin_column
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>



								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Query Var", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].query_var ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												query_var: taxonomies[index].query_var ? false : true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show In Nav Menus", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].show_in_nav_menus ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												show_in_nav_menus: taxonomies[index].show_in_nav_menus
													? false
													: true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Rewrite", "combo-blocks")}</label>
									<ToggleControl
										checked={taxonomies[index].rewrite ? true : false}
										onChange={(e) => {
											var optionsX = {
												...taxonomies[index],
												rewrite: taxonomies[index].rewrite ? false : true,
											};
											taxonomies[index] = optionsX;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex justify-start flex-col pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show In Menu", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="combo-blocks"
										value={options.show_in_menu}
										onChange={(value) => {
											taxonomies[index].show_in_menu = value;
											props.onChange(taxonomies);
										}}
									/>
								</div>
								<div className="flex  justify-start flex-col pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Menu Icon", "combo-blocks")}</label>
									<textarea
										className="my-3"
										label=""
										help=""
										placeholder="Set Menu Icon "
										value={options.menu_icon}
										onChange={(event) => {
											const { value } = event.target;
											const updatedPostTypes = [...taxonomies];
											updatedPostTypes[index].menu_icon = value;
											props.onChange(updatedPostTypes);
										}}
									/>
								</div>
								<div className="grid col-span-2  gap-6">
									<div className=" flex  justify-between flex-col bg-gray-500/10 p-3  ">
										<label htmlFor="">{__("Supports", "combo-blocks")}</label>
										<div className="grid grid-cols-3 gap-3 pt-2">


										</div>
									</div>
								</div>
							</div>
							{/* </div> */}
						</PanelBody>
					);
				})}
		</div>
	);
};
export default PGTaxonomies;
