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
const PGPostTypes = (props) => {
	const [postTypes, setpostTypes] = useState(props.args);
	useEffect(() => {
		props.onChange(postTypes);
	}, [postTypes]);
	const handleCheckboxChange = (e, index, option) => {
		const isChecked = e.target.checked;
		let updatedSupports = [...postTypes[index].supports];
		if (isChecked) {
			// If checkbox is checked and the option is not already in supports, add it
			if (!updatedSupports.includes(option)) {
				updatedSupports.push(option);
			}
		} else {
			// If checkbox is unchecked, remove the option from supports
			updatedSupports = updatedSupports.filter((item) => item !== option);
		}
		// Update the state with the new supports array
		postTypes[index].supports = updatedSupports;
		props.onChange([...postTypes]); // Ensure to pass a new array reference to trigger re-render
	};
	function duplicate(index) {
		let duplicatedArray = postTypes.concat();
		let duplicateObject = JSON.parse(JSON.stringify(duplicatedArray[index]));
		duplicatedArray.push(duplicateObject);
		setpostTypes(duplicatedArray);
	}
	return (
		<div className="">
			<div
				// className="bg-gray-700 hover:bg-gray-600 my-3 cursor-pointer rounded-sm inline-block text-white px-3 py-1"
				className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
				onClick={(ev) => {
					var sdsd = postTypes.concat({
						labels: {
							name: "",
							singular_name: "",
							menu_name: "",
							all_items: "",
							add_new: "",
							add_new_item: "",
							edit: "",
							edit_item: "",
							new_item: "",
							view: "",
							view_item: "",
							search_items: "",
							not_found: "",
							not_found_in_trash: "",
							parent: "",
						},
						description: "This is where you can create and manage %s.",
						public: true,
						slug: "",
						show_ui: true,
						show_in_rest: true,
						capability_type: "post",
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
						query_var: true,
						supports: ["title"],
						show_in_nav_menus: true,
						rewrite: true,
						menu_icon: "dashicons-edit",
						show_in_menu: "",
					});
					setpostTypes(sdsd);
				}}>
				{__("Add", "combo-blocks")}
			</div>
			{postTypes != undefined &&
				postTypes.map((item, index) => {
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
											var postTypesX = [...postTypes];
											var sdsd = postTypesX.splice(index, 1);
											setpostTypes(postTypesX);
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
									postTypes[index].options.name = value;
									props.onChange(postTypes);
								}}
							/> */}
							<div className="mt-8 grid grid-cols-4 gap-5 gap-y-2  p-3 border border-solid border-gray-900/50 relative after:absolute after:content-['Labels'] after:-top-3 after:left-4 after:h-6 after:w-max after:flex after:items-center after:bg-white after:px-2 rounded-md after:z-10 ">
								<div className="flex flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Slug", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="post"
										value={options.slug}
										onChange={(value) => {
											postTypes[index].slug = value;
											postTypes[index].labels.name = value;
											postTypes[index].labels.singular_name = value;
											postTypes[index].labels.menu_name = value;
											postTypes[index].labels.all_items = "All " + value;
											postTypes[index].labels.add_new = "Add " + value;
											postTypes[index].labels.add_new_item = "Add " + value;
											postTypes[index].labels.edit = "Edit " + value;
											postTypes[index].labels.edit_item = "Edit " + value;
											postTypes[index].labels.new_item = "New " + value;
											postTypes[index].labels.view = "View " + value;
											postTypes[index].labels.view_item = "View " + value;
											postTypes[index].labels.search_items = "Search " + value;
											postTypes[index].labels.not_found = value + " Not found";
											postTypes[index].labels.not_found_in_trash =
												value + " Not found in trash";
											postTypes[index].labels.parent = "Parent " + value;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Name", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="Name in plural"
										value={options.labels.name}
										onChange={(value) => {
											// postTypes[index].labels.name = value;
											// props.onChange(postTypes);



											postTypes[index].labels.name = value;
											postTypes[index].labels.singular_name = value;
											postTypes[index].labels.menu_name = value;
											postTypes[index].labels.all_items = "All " + value;
											postTypes[index].labels.add_new = "Add " + value;
											postTypes[index].labels.add_new_item = "Add " + value;
											postTypes[index].labels.edit = "Edit " + value;
											postTypes[index].labels.edit_item = "Edit " + value;
											postTypes[index].labels.new_item = "New " + value;
											postTypes[index].labels.view = "View " + value;
											postTypes[index].labels.view_item = "View " + value;
											postTypes[index].labels.search_items = "Search " + value;
											postTypes[index].labels.not_found = value + " Not found";
											postTypes[index].labels.not_found_in_trash =
												value + " Not found in trash";
											postTypes[index].labels.parent = "Parent " + value;
											props.onChange(postTypes);





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
											postTypes[index].labels.singular_name = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.menu_name = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.all_items = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.add_new = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.add_new_item = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.edit = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.edit_item = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.new_item = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.view = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.view_item = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.search_items = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.not_found = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.not_found_in_trash = value;
											props.onChange(postTypes);
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
											postTypes[index].labels.parent = value;
											props.onChange(postTypes);
										}}
									/>
								</div>
							</div>

							<div className="grid grid-cols-4 gap-6 gap-y-2 p-3 mt-2">
								<div className="flex flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Capability Type", "combo-blocks")}</label>
									<InputControl
										className="my-3"
										label=""
										help=""
										placeholder="post"
										value={options.capability_type}
										onChange={(value) => {
											postTypes[index].capability_type = value;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="col-start-2 col-end-5 flex justify-between flex-col bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Description", "combo-blocks")}</label>
									<textarea
										className="my-3"
										label=""
										help=""
										placeholder="This is where you can create and manage %s."
										value={options.description}
										onChange={(event) => {
											const { value } = event.target;
											const updatedPostTypes = [...postTypes];
											updatedPostTypes[index].description = value;
											props.onChange(updatedPostTypes);
										}}
									/>
								</div>
								{/* </div> */}
								{/* <div className="mt-8 grid grid-cols-4 gap-5 gap-y-2  p-3 border border-solid border-gray-900/50 relative after:absolute after:content-['Capabilities'] after:-top-3 after:left-4 after:h-6 after:w-max after:flex after:items-center after:bg-white after:px-2 rounded-md after:z-10 "> */}
								{/* <div className="grid grid-cols-4 gap-6 p-3 mt-2"> */}
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Public", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].public ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												public: postTypes[index].public ? false : true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show UI", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].show_ui ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												show_ui: postTypes[index].show_ui ? false : true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show in rest", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].show_in_rest ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												show_in_rest: postTypes[index].show_in_rest
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Map Meta Cap", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].map_meta_cap ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												map_meta_cap: postTypes[index].map_meta_cap
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Publicly Queryable", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].publicly_queryable ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												publicly_queryable: postTypes[index].publicly_queryable
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Exclude From Search", "combo-blocks")}</label>
									<ToggleControl
										checked={
											postTypes[index].exclude_from_search ? true : false
										}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												exclude_from_search: postTypes[index]
													.exclude_from_search
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Hierarchical", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].hierarchical ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												hierarchical: postTypes[index].hierarchical
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Query Var", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].query_var ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												query_var: postTypes[index].query_var ? false : true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Show In Nav Menus", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].show_in_nav_menus ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												show_in_nav_menus: postTypes[index].show_in_nav_menus
													? false
													: true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
										}}
									/>
								</div>
								<div className="flex justify-between items-center pg-post-type bg-gray-500/10 p-3 ">
									<label htmlFor="">{__("Rewrite", "combo-blocks")}</label>
									<ToggleControl
										checked={postTypes[index].rewrite ? true : false}
										onChange={(e) => {
											var optionsX = {
												...postTypes[index],
												rewrite: postTypes[index].rewrite ? false : true,
											};
											postTypes[index] = optionsX;
											props.onChange(postTypes);
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
											postTypes[index].show_in_menu = value;
											props.onChange(postTypes);
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
											const updatedPostTypes = [...postTypes];
											updatedPostTypes[index].menu_icon = value;
											props.onChange(updatedPostTypes);
										}}
									/>
								</div>
								<div className="grid col-span-2  gap-6">
									<div className=" flex  justify-between flex-col bg-gray-500/10 p-3  ">
										<label htmlFor="">{__("Supports", "combo-blocks")}</label>
										<div className="grid grid-cols-3 gap-3 pt-2">
											<div>
												<input
													type="checkbox"
													id="title"
													value="title"
													checked={options.supports.includes("title")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "title")
													}
												/>
												<label htmlFor="title">{__("Title", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="editor"
													value="editor"
													checked={options.supports.includes("editor")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "editor")
													}
												/>
												<label htmlFor="editor">{__("Editor", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="comments"
													value="comments"
													checked={options.supports.includes("comments")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "comments")
													}
												/>
												<label htmlFor="comments">{__("Comments", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="revisions"
													value="revisions"
													checked={options.supports.includes("revisions")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "revisions")
													}
												/>
												<label htmlFor="revisions">{__("Revisions", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="trackbacks"
													value="trackbacks"
													checked={options.supports.includes("trackbacks")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "trackbacks")
													}
												/>
												<label htmlFor="trackbacks">{__("Trackbacks", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="author"
													value="author"
													checked={options.supports.includes("author")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "author")
													}
												/>
												<label htmlFor="author">{__("Author", "combo-blocks")}</label>
											</div>
											<div id="pg-excerpt">
												<input
													type="checkbox"
													id="excerpt"
													value="excerpt"
													checked={options.supports.includes("excerpt")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "excerpt")
													}
												/>
												<label htmlFor="excerpt">{__("Excerpt", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="page-attributes"
													value="page-attributes"
													checked={options.supports.includes("page-attributes")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "page-attributes")
													}
												/>
												<label htmlFor="page-attributes">{__("Page Attributes", "combo-blocks")}</label>
											</div>
											{/* <div>
												<input
													type="checkbox"
													id="thumbnail"
													value="thumbnail"
													checked={options.supports.includes("thumbnail")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "thumbnail")
													}
												/>
												<label htmlFor="thumbnail">Thumbnail</label>
											</div> */}
											<div>
												<input
													type="checkbox"
													id="thumbnail"
													value="thumbnail"
													checked={options.supports.includes("thumbnail")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "thumbnail")
													}
												/>
												<label htmlFor="thumbnail">{__("Thumbnail", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="custom-fields"
													value="custom-fields"
													checked={options.supports.includes("custom-fields")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "custom-fields")
													}
												/>
												<label htmlFor="custom-fields">{__("Custom Fields", "combo-blocks")}</label>
											</div>
											<div>
												<input
													type="checkbox"
													id="post-formats"
													value="post-formats"
													checked={options.supports.includes("post-formats")}
													onChange={(e) =>
														handleCheckboxChange(e, index, "post-formats")
													}
												/>
												<label htmlFor="post-formats">{__("Post Formats", "combo-blocks")}</label>
											</div>
										</div>
										{/* break */}
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
export default PGPostTypes;
