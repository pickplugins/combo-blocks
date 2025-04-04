const { Component } = wp.element;
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";
import {
	ColorPalette,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	Popover,
	Spinner,
	ToggleControl
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import {
	brush,
	check,
	close,
	color,
	Icon,
	key,
	link,
	lockSmall,
	plusCircle,
	seen,
	settings,
	shortcode,
	typography,
	upload
} from "@wordpress/icons";
import PGcssKeyframes from "../../components/css-keyframes";
import PGDropdown from "../../components/dropdown";
import PGGlobalStyles from "../../components/global-styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGAPIKeys from "../api-keys";
import PGDashboardBlockSettings from "../dashboard-block-settings";
import { GFonts } from "../google-fonts";
import PGPostTypes from "../post-types";
import PGroleMaker from "../role-maker";
import PGTaxonomies from "../taxonomies";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var [dataLoaded, setdataLoaded] = useState(false); // Using the hook.
	var [debounce, setDebounce] = useState(null); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [colorPopup, setcolorPopup] = useState(null); // Using the hook.
	var [license, setlicense] = useState(null); // Using the hook.
	var [needSave, setneedSave] = useState(false); // Using the hook.
	var [licenseError, setlicenseError] = useState(null); // Using the hook.
	var [licenseCheckedData, setlicenseCheckedData] = useState(null); // Using the hook.

	var isProFeature = applyFilters("isProFeature", true);
	var optionDataDefault = {
		customFonts: [],
		googleFonts: [],
		preloads: [],
		blockSettings: {
			formWrap: {
				allowedUserMetaKeys: [],
				allowedPostMetaKeys: [],
				allowedTermMetaKeys: [],
				allowedCommentMetaKeys: [],
			},
		},
		container: { width: "1150px" },
		templates: { pickerOnEditor: true },
		breakpoints: [],
		colors: [],
		editor: { width: "1150px" },
		blocks: { disabled: [] },
		addons: { enabled: [] },
		blockInserter: { comboBlocksPositon: "" }, // Category positon
		recaptcha: { version: "" },
		keyframes: {},
		license: { license_key: { key: "" } },
		globalStyles: [],
		customScript: [],
		postTypes: [
			{
				labels: {
					name: "post types",
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
				description: "",
				public: false,
				show_ui: true,
				show_in_rest: false,
				capability_type: "post",
				capabilities: {
					publish_posts: "",
					edit_posts: "",
					edit_others_posts: "",
					read_private_posts: "",
					edit_post: "",
					delete_post: "",
					read_post: "",
				},
				map_meta_cap: true,
				publicly_queryable: true,
				exclude_from_search: false,
				hierarchical: false,
				query_var: true,
				supports: ["title"],
				show_in_nav_menus: true,
				menu_icon: "",
				show_in_menu: "",
			},
		],
		taxonomies: [
			{
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
				slug: "postType",
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
			},
		],
		roles: [],


		apiKeys: {},
		pageStyles: [],
	};
	var [optionData, setoptionData] = useState({}); // Using the hook.
	var [optionDataSaved, setoptionDataSaved] = useState({}); // Using the hook.
	var [dashboardTabs, setdashboardTabs] = useState([
		// {
		// 	name: "overview",
		// 	title: "Overview",
		// 	icon: category,
		// 	className: "tab-overview",
		// },
		{
			name: "disableBlocks",
			title: "Disable Blocks",
			icon: lockSmall,
			className: "tab-disable-blocks",
			hidden: false,
			isPro: false,
		},
		{
			name: "blockSettings",
			title: "Block Settings",
			icon: settings,
			className: "tab-block-settings",
			hidden: false,
			isPro: false,
		},
		{
			name: "general",
			title: "General",
			icon: settings,
			className: "tab-general",
			hidden: false,
			isPro: false,
		},
		{
			name: "customFonts",
			title: "Custom Fonts",
			icon: typography,
			className: "tab-style",
			hidden: false,
			isPro: isProFeature ? true : false,
		},
		// {
		// 	name: "preloads",
		// 	title: "Preloads",
		// 	icon: typography,
		// 	className: "tab-style",
		// 	hidden: false,
		// 	isPro: isProFeature ? true : false,
		// },

		{
			name: "globalStyles",
			title: "Global Styles",
			icon: brush,
			className: "tab-global-styles",
			hidden: false,
			isPro: isProFeature ? true : false,
		},
		// {
		// 	name: "keyframes",
		// 	title: "Keyframes",
		// 	icon: atSymbol,
		// 	className: "tab-keyframes",
		// 	isPro: isProFeature ? true : false,
		// },
		{
			name: "colors",
			title: "Colors",
			icon: color,
			className: "tab-colors",
			hidden: false,
		},
		{
			name: "postType",
			title: "Post Types",
			icon: upload,
			hidden: false,
			className: "tab-post-types",
		},
		{
			name: "taxonomiesBuilder",
			title: "Taxonomy Builder",
			icon: upload,
			hidden: false,
			className: "tab-taxonomiesBuilder",
		},
		// {
		// 	name: "roleMaker",
		// 	title: "Role Maker",
		// 	icon: upload,
		// 	hidden: false,
		// 	className: "tab-roleMaker",
		// },


		{
			name: "addons",
			title: "Addons",
			icon: plusCircle,
			className: "tab-addons",
			hidden: false,
		},
		{
			name: "apiKeys",
			title: "API Keys",
			icon: key,
			className: "tab-api-keys",
			hidden: false,
		},
		// {
		// 	name: "customScript",
		// 	title: "Custom Script",
		// 	icon: code,
		// 	className: "tab-custom-script",
		// 	isPro: false,
		// },
		{
			name: "license",
			title: "License",
			icon: key,
			className: "tab-license",
		},
		{
			name: "export/import",
			title: "Export/Import",
			icon: upload,
			className: "tab-export-import",
			hidden: false,
			isPro: false,
		},
	]);

	var typeOption = {
		// noUrl: { label: __("No URL", "combo-blocks"), value: "" },
		"text/css": { label: __("CSS", "combo-blocks"), value: "text/css" },
		"image/png": { label: __("PNG", "combo-blocks"), value: "image/png" },
		"image/svg+xml": {
			label: __("SVG+XML", "combo-blocks"),
			value: "image/svg+xml",
		},
		"image/x-icon": { label: __("X-Icon", "combo-blocks"), value: "image/x-icon" },
		"image/webp": { label: __("WEBP", "combo-blocks"), value: "image/webp" },
		"font/woff": { label: __("woff", "combo-blocks"), value: "font/woff" },
		"font/woff2": { label: __("woff2", "combo-blocks"), value: "font/woff2" },
		"font/ttf": { label: __("ttf", "combo-blocks"), value: "font/ttf" },
		"font/otf": { label: __("otf", "combo-blocks"), value: "font/otf" },
	};

	// var [isProFeature, setisProFeature] = useState(
	// 	optionData?.license?.activated ? false : true
	// );
	function handleAlertConfirmation() {
		if (confirm("Are you sure you want to reset the option data?")) {
			resetOptionData();
		}
	}
	function resetOptionData() {
		setoptionData(optionDataDefault);
	}
	useEffect(() => {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/get_options",
			method: "POST",
			data: { option: "combo_blocks_settings" },
		}).then((res) => {
			setisLoading(false);
			setdataLoaded(true);
			if (res.length != 0) {
				var resX = { ...res };
				if (resX.addons.enabled == undefined) {
					resX.addons.enabled = resX.addons.disabled;
				}
				setoptionDataSaved(resX);
				setoptionData(resX);
			}
		});
	}, []);
	useEffect(() => {
		if (JSON.stringify(optionData) === JSON.stringify(optionDataSaved)) {
			setneedSave(false);
		} else {
			setneedSave(true);
		}
		//setisProFeature(optionData?.license?.activated ? false : true);
	}, [optionData]);
	function updateOption() {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/update_options",
			method: "POST",
			data: { name: "combo_blocks_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			if (res.status) {
				setoptionDataSaved(optionData);
				setneedSave(false);
			}
		});
	}
	function activateLicense() {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/activate_license",
			method: "POST",
			data: { license_key: optionData.license.license_key.key },
		}).then((res) => {




			setisLoading(false);
			var licenseobj = res
			licenseobj.license_key = {}
			licenseobj.license_key.key = optionData.license.license_key.key

			setoptionData({ ...optionData, license: licenseobj });
		});
	}
	function deactivateLicense() {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/deactivate_license",
			method: "POST",
			data: {
				license_key: optionData.license.license_key.key,
				instance_id: optionData.license.instance.id,
			},
		}).then((res) => {
			setisLoading(false);
			var body = JSON.parse(res.body);
			if (!body.error) {
				setoptionData({ ...optionData, license: body });
			} else {
				setlicenseError(body.error);
				setTimeout(() => {
					setlicenseError(null);
				}, 10000);
			}
		});
	}
	function resetLicense() {
		setoptionData({ ...optionData, license: null });
	}
	function checkLicense() {
		setisLoading(true);
		apiFetch({
			path: "/combo-blocks/v2/check_icense",
			method: "POST",
			data: { license_key: optionData.license.license_key.key },
		}).then((res) => {
			setisLoading(false);

			setlicenseCheckedData(JSON.stringify(res))
			//setoptionData({ ...optionData, license: res })
		});
	}
	//////////////////////////import setting
	const [fileContent, setFileContent] = useState(null);
	const [importStatus, setimportStatus] = useState("wait");
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (!file) return; // No file selected
		if (!file.name.endsWith(".json")) {
			alert("Please select a JSON file.");
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target.result;
			try {
				const jsonObject = JSON.parse(content);
				setFileContent(jsonObject);
			} catch (error) {
				alert("Error parsing JSON file.");
			}
		};
		reader.readAsText(file);
	};
	function handleImport() {
		if (!fileContent) {
			alert("Please select a file to import.");
			return;
		}
		delete fileContent.exportReady;
		setoptionData(fileContent);
		setimportStatus("run");
		setTimeout(() => {
			setimportStatus("stop");
		}, 2000);
		setTimeout(() => {
			setimportStatus("wait");
		}, 4000);
	}
	///////////////////////export setting
	function download(filename, text) {
		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/json;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", filename);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	function ExportButton() {
		var optionDataX = { ...optionData };
		optionDataX.exportReady = true;
		const handleExport = () => {
			const currentDate = new Date();
			const formattedDate = `${currentDate.getFullYear()}-${(
				currentDate.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${currentDate
					.getDate()
					.toString()
					.padStart(2, "0")}`;
			const formattedTime = `${currentDate
				.getHours()
				.toString()
				.padStart(2, "0")}${currentDate
					.getMinutes()
					.toString()
					.padStart(2, "0")}${currentDate
						.getSeconds()
						.toString()
						.padStart(2, "0")}`;
			const filename = `combo-blocks-setting-${formattedDate}-${formattedTime}.json`;
			download(filename, JSON.stringify(optionDataX, null, 2));
		};
		return (
			<button
				className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
				onClick={handleExport}>
				{__("Export", "combo-blocks")}
			</button>
		);
	}
	var RemovePreloadsGroup = function ({ title, index }) {
		return (
			<>
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						const updatedPreloads = [...optionData.preloads];
						updatedPreloads.splice(index, 1);
						setoptionData({ ...optionData, preloads: updatedPreloads });
					}}>
					<Icon icon={close} />
				</span>
				<span>
					{optionData.preloads[index].title.length > 0 ? (
						<>{optionData.preloads[index].title}</>
					) : (
						<>{index}</>
					)}
				</span>
			</>
		);
	};

	// function deactivateLicense() {
	// 	setisLoading(true)
	// 	var postData = {
	// 		license_key: optionData.license.license_key,
	// 	};
	// 	postData = JSON.stringify(postData);
	// 	fetch("https://api.lemonsqueezy.com/v1/licenses/deactivate", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json;charset=utf-8",
	// 		},
	// 		mode: 'no-cors',
	// 		body: postData,
	// 	})
	// 		.then((response) => {
	// 			if (response.ok && response.status < 400) {
	// 				response.json().then((data) => {
	// 					setlicense({
	// 						...license, valid: data.valid,
	// 						activation_limit: data.license_key.activation_limit,
	// 						activation_usage: data.license_key.activation_usage,
	// 						expires_at: data.license_key.expires_at,
	// 						status: data.license_key.status,
	// 					})
	// 					var licenseX = {
	// 						...optionData.license,
	// 						license_key: data.license_key.key,
	// 						activation_limit: data.license_key.activation_limit,
	// 						activation_usage: data.license_key.activation_usage,
	// 						expires_at: data.license_key.expires_at,
	// 						status: data.license_key.status,
	// 					}
	// 					setoptionData({ ...optionData, license: licenseX })
	// 				});
	// 			}
	// 		})
	// 		.catch((_error) => {
	// 			//this.saveAsStatus = 'error';
	// 			// handle the error
	// 		});
	// }
	var pgAddons = {
		elementor: {
			label: __("Elementor", "combo-blocks"),
			value: "elementor",
			link: "",
			demo: "",
		},
		// woocommerce: {
		// 	label: "WooCommerce",
		// 	value: "woocommerce",
		// 	link: "",
		// 	demo: "",
		// },
		// rankmath: {
		// 	label: "Rank Math",
		// 	value: "rankmath",
		// 	link: "",
		// 	demo: "",
		// },
		// aioseo: {
		// 	label: "All in One SEO",
		// 	value: "aioseo",
		// 	link: "",
		// 	demo: "",
		// },
		// seopress: {
		// 	label: "SEOPress",
		// 	value: "seopress",
		// 	link: "",
		// 	demo: "",
		// },
		// squirrly: {
		// 	label: "Squirrly",
		// 	value: "squirrly",
		// 	link: "",
		// 	demo: "",
		// },
		// yoast: {
		// 	label: "Yoast",
		// 	value: "yoast",
		// 	link: "",
		// 	demo: "",
		// },
		globalStyle: {
			label: __("Global Style", "combo-blocks"),
			value: "globalStyle",
			link: "",
			demo: "",
		},
		pageStyles: {
			label: __("Page Styles", "combo-blocks"),
			value: "pageStyles",
			isPro: true,
			link: "",
			demo: "",
		},
		// beaverBuilder: {
		// 	label: "Beaver Builder",
		// 	value: "beaverBuilder",
		// 	link: "",
		// 	demo: "",
		// },
		// bricksBuilder: {
		// 	label: "Bricks Builder",
		// 	value: "bricksBuilder",
		// 	link: "",
		// 	demo: "",
		// },
		visibility: {
			label: __("Visibility", "combo-blocks"),
			value: "visibility",
			isPro: true,
			link: "",
			demo: "",
		},
		animateOn: {
			label: __("Animate On", "combo-blocks"),
			value: "animateOn",
			link: "",
			demo: "",
			isPro: true,
		},
		tilt: {
			label: __("Tilt", "combo-blocks"),
			value: "tilt",
			isPro: true,
			link: "",
			demo: "",
		},
		tooltip: {
			label: __("Tooltip", "combo-blocks"),
			value: "tooltip",
			isPro: true,
			link: "",
			demo: "",
		},
		typingText: {
			label: __("Typing Text", "combo-blocks"),
			value: "typingText",
			isPro: true,
			link: "",
			demo: "",
		},
		lightbox: {
			label: __("Lightbox", "combo-blocks"),
			value: "lightbox",
			link: "",
			demo: "",
		},
		utmTracking: {
			label: __("UTM Tracking", "combo-blocks"),
			value: "utmTracking",
			isPro: true,
			link: "",
			demo: "",
		},
		lazyLoad: {
			label: __("Lazy Load", "combo-blocks"),
			value: "lazyLoad",
			link: "",
			demo: "",
		},
		conditions: {
			label: __("Form Field Conditions", "combo-blocks"),
			value: "conditions",
			link: "",
			demo: "",
			isPro: true,
		},
		calculations: {
			label: __("Form Fields Calculation", "combo-blocks"),
			value: "calculations",
			link: "",
			demo: "",
			isPro: true,
		},
		blockVariations: {
			label: __("Block Variations", "combo-blocks"),
			value: "blockVariations",
			link: "",
			demo: "",
		},
		tutorials: {
			label: __("Tutorials", "combo-blocks"),
			value: "tutorials",
			link: "",
			demo: "",
		},
		googleFonts: {
			label: __("Google Fonts", "combo-blocks"),
			value: "googleFonts",
			link: "",
			demo: "",
		},
		customFont: {
			label: __("Custom Font", "combo-blocks"),
			value: "customFont",
			isPro: true,
			link: "",
			demo: "",
		},
		// preloads: {
		// 	label: __("Preloads", "combo-blocks"),
		// 	value: "preloads",
		// 	isPro: true,
		// 	link: "",
		// 	demo: "",
		// },
		fontAwesome: {
			label: __("Font Awesome", "combo-blocks"),
			value: "fontAwesome",
			link: "",
			demo: "",
		},
		icofont: {
			label: __("icoFont", "combo-blocks"),
			value: "icofont",
			link: "",
			demo: "",
		},
		bootstrapIcons: {
			label: __("Bootstrap Icons", "combo-blocks"),
			value: "bootstrapIcons",
			link: "",
			demo: "",
		},
		// divi: {
		// 	label: "Divi",
		// 	value: "divi",
		// 	link: "",
		// 	demo: "",
		// },
		// oxygen: {
		// 	label: "Oxygen",
		// 	value: "oxygen",
		// 	link: "",
		// 	demo: "",
		// },
		// wpbakery: {
		// 	label: "WPBakery",
		// 	value: "wpbakery",
		// 	link: "",
		// 	demo: "",
		// },
		savedTemplates: {
			label: __("Saved Templates", "combo-blocks"),
			value: "savedTemplates",
			link: "",
			demo: "",
		},
		colors: {
			label: __("Colors", "combo-blocks"),
			value: "colors",
			link: "",
			demo: "",
		},
		postTypes: {
			label: __("Post Types", "combo-blocks"),
			value: "postTypes",
			link: "",
			demo: "",
		},
		taxonomies: {
			label: __("Taxonomies", "combo-blocks"),
			value: "taxonomies",
			link: "",
			demo: "",
		},


		formCreateEntries: {
			label: __("Form Create Entries", "combo-blocks"),
			value: "formCreateEntries",
			link: "",
			demo: "",
			isPro: true,
			comingSoon: true,
		},
		unsplash: {
			label: __("Unsplash", "combo-blocks"),
			value: "Unsplash",
			link: "",
			demo: "",
			comingSoon: true,
		},
		pixabay: {
			label: __("Pixabay", "combo-blocks"),
			value: "Pixabay",
			link: "",
			demo: "",
			comingSoon: true,
		},
	};
	var pgBlocks = {
		"combo-blocks/accordion-nested": {
			label: "Accordion Nested",
			value: "combo-blocks/accordion-nested",
			page: "https://comboblocks.com/blocks/accordion/",
			preview: "https://comboblocks.com/demo/accordion/",
			docs: "https://comboblocks.com/docs-category/blocks/accordion/",
			category: ["tools"],
		},
		"combo-blocks/accordion-nested-item": {
			label: "Accordion Nested Item",
			value: "combo-blocks/accordion-nested-item",
			page: "https://comboblocks.com/blocks/accordion/",
			preview: "https://comboblocks.com/demo/accordion/",
			docs: "https://comboblocks.com/docs-category/blocks/accordion/",
			category: ["tools"],
		},
		"combo-blocks/archive-description": {
			label: "Archive Description",
			value: "combo-blocks/archive-description",
			page: "https://comboblocks.com/blocks/archive-description/",
			preview: "https://comboblocks.com/demo/archive-description/",
			docs: "https://comboblocks.com/docs-category/blocks/archive-description/",
		},
		"combo-blocks/archive-title": {
			label: "Archive Title",
			value: "combo-blocks/archive-title",
			page: "https://comboblocks.com/blocks/archive-title/",
			preview: "https://comboblocks.com/demo/archive-title/",
			docs: "https://comboblocks.com/docs-category/blocks/archive-title/",
			category: ["archive"],
		},
		"combo-blocks/back-to-top": {
			label: "Back To Top",
			value: "combo-blocks/back-to-top",
			page: "https://comboblocks.com/blocks/back-to-top/",
			preview: "https://comboblocks.com/demo/back-to-top/",
			docs: "https://comboblocks.com/docs-category/blocks/back-to-top/",
			category: ["tools"],
		},


		"combo-blocks/breadcrumb": {
			label: "Breadcrumb",
			value: "combo-blocks/breadcrumb",
			page: "https://comboblocks.com/blocks/breadcrumb/",
			preview: "https://comboblocks.com/demo/breadcrumb/",
			docs: "https://comboblocks.com/docs-category/blocks/breadcrumb/",
			category: ["content"],
		},
		"combo-blocks/business-hours": {
			label: "Business Hours",
			value: "combo-blocks/business-hours",
			page: "https://comboblocks.com/blocks/business-hours/",
			preview: "https://comboblocks.com/demo/business-hours/",
			docs: "https://comboblocks.com/docs-category/blocks/business-hours/",
			category: ["content"],
		},

		"combo-blocks/content-slider": {
			label: "Content Slider",
			value: "combo-blocks/content-slider",
			page: "https://comboblocks.com/blocks/content-slider/",
			preview: "https://comboblocks.com/demo/content-slider/",
			docs: "https://comboblocks.com/docs-category/blocks/content-slider/",
			category: ["tools"],
		},
		"combo-blocks/content-slider-item": {
			label: "Content Slider Item",
			value: "combo-blocks/content-slider-item",
			page: "https://comboblocks.com/blocks/content-slider/",
			preview: "https://comboblocks.com/demo/content-slider/",
			docs: "https://comboblocks.com/docs-category/blocks/content-slider/",
			category: ["tools"],
		},

		"combo-blocks/date-countdown": {
			label: "Date Countdown",
			value: "combo-blocks/date-countdown",
			page: "https://comboblocks.com/blocks/date-countdown/",
			preview: "https://comboblocks.com/demo/date-countdown/",
			docs: "https://comboblocks.com/docs-category/blocks/date-countdown/",
			category: ["tools"],
		},
		"combo-blocks/flex-wrap": {
			label: "Flex Maker",
			value: "combo-blocks/flex-wrap",
			page: "https://comboblocks.com/blocks/flex-maker/",
			preview: "https://comboblocks.com/demo/flex-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/flex-wrap/",
			category: ["layouts"],
		},
		"combo-blocks/flex-wrap-item": {
			label: "Flex Maker Item",
			value: "combo-blocks/flex-wrap-item",
			page: "https://comboblocks.com/blocks/flex-maker/",
			preview: "https://comboblocks.com/demo/flex-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/flex-wrap/",
			category: ["layouts"],
		},
		"combo-blocks/flip-box": {
			label: "Flip Box",
			value: "combo-blocks/flip-box",
			page: "https://comboblocks.com/blocks/flip-box/",
			preview: "https://comboblocks.com/demo/flip-box/",
			docs: "https://comboblocks.com/docs-category/blocks/flip-box/",
			category: ["tools"],
		},
		"combo-blocks/flip-box-back": {
			label: "Flip Box Back",
			value: "combo-blocks/flip-box-back",
			page: "https://comboblocks.com/blocks/flip-box/",
			preview: "https://comboblocks.com/demo/flip-box/",
			docs: "https://comboblocks.com/docs-category/blocks/flip-box/",
			category: ["tools"],
		},
		"combo-blocks/flip-box-front": {
			label: "Flip Box Front",
			value: "combo-blocks/flip-box-front",
			page: "https://comboblocks.com/blocks/flip-box/",
			preview: "https://comboblocks.com/demo/flip-box/",
			docs: "https://comboblocks.com/docs-category/blocks/flip-box/",
			category: ["tools"],
		},
		"combo-blocks/form-field-checkbox": {
			label: "Form Field Checkbox",
			value: "combo-blocks/form-field-checkbox",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-checkbox/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-checkbox/",
			category: ["form"],
		},
		"combo-blocks/form-field-file": {
			label: "Form Field File",
			value: "combo-blocks/form-field-file",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-file/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-file/",
			category: ["form"],
		},
		"combo-blocks/form-field-file-multi": {
			label: "Form Field File Multi",
			value: "combo-blocks/form-field-file-multi",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-file-multi/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-file-multi/",
			category: ["form"],
		},
		"combo-blocks/form-field-hcaptcha": {
			label: "Form Field hCAPTCHA",
			value: "combo-blocks/form-field-hcaptcha",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-input/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-input/",
			category: ["form"],
		},
		"combo-blocks/form-field-input": {
			label: "Form Field Input",
			value: "combo-blocks/form-field-input",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-input/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-input/",
			category: ["form"],
		},
		"combo-blocks/form-field-radio": {
			label: "Form Field Radio",
			value: "combo-blocks/form-field-radio",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-radio/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-radio/",
			category: ["form"],
		},
		"combo-blocks/form-field-recaptcha": {
			label: "Form Field reCAPTCHA",
			value: "combo-blocks/form-field-recaptcha",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-radio/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-radio/",
			category: ["form"],
		},
		"combo-blocks/form-field-select": {
			label: "Form Field Select",
			value: "combo-blocks/form-field-select",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-select/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-select/",
			category: ["form"],
		},
		"combo-blocks/form-field-simple-math": {
			label: "Form Field Simple Math",
			value: "combo-blocks/form-field-simple-math",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-select/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-select/",
			category: ["form"],
		},
		"combo-blocks/form-field-submit": {
			label: "Form Field Submit",
			value: "combo-blocks/form-field-submit",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-submit/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-submit/",
			category: ["form"],
		},
		"combo-blocks/form-field-textarea": {
			label: "Form Field Textarea",
			value: "combo-blocks/form-field-textarea",
			page: "https://comboblocks.com/blocks/form-wrap/",
			preview: "https://comboblocks.com/demo/form-field-textarea/",
			docs: "https://comboblocks.com/docs-category/blocks/form-field-textarea/",
			category: ["form"],
		},
		// "combo-blocks/form-steps": {
		// 	label: "Form Steps",
		// 	value: "combo-blocks/form-steps",
		// 	page: "https://comboblocks.com/blocks/form-wrap/",
		// 	preview: "https://comboblocks.com/demo/form-field-textarea/",
		// 	docs: "https://comboblocks.com/docs-category/blocks/form-field-textarea/",
		// 	category: ["form"],
		// },
		"combo-blocks/form-wrap": {
			label: "Form Maker",
			value: "combo-blocks/form-wrap",
			page: "https://comboblocks.com/blocks/form-maker/",
			preview: "https://comboblocks.com/demo/form-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/form-wrap/",
			category: ["form"],
		},
		"combo-blocks/grid-wrap": {
			label: "Grid Maker",
			value: "combo-blocks/grid-wrap",
			page: "https://comboblocks.com/blocks/grid-maker/",
			preview: "https://comboblocks.com/demo/grid-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/grid-wrap/",
			category: ["layout"],
		},
		"combo-blocks/grid-wrap-item": {
			label: "Grid Maker Item",
			value: "combo-blocks/grid-wrap-item",
			page: "https://comboblocks.com/blocks/grid-maker/",
			preview: "https://comboblocks.com/demo/grid-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/grid-wrap/",
			category: ["layout"],
		},
		"combo-blocks/icon": {
			label: "Icon",
			value: "combo-blocks/icon",
			page: "https://comboblocks.com/blocks/icon/",
			preview: "https://comboblocks.com/demo/icon/",
			docs: "https://comboblocks.com/docs-category/blocks/icon/",
			category: ["content"],
		},
		"combo-blocks/image": {
			label: "Image",
			value: "combo-blocks/image",
			page: "https://comboblocks.com/blocks/image/",
			preview: "https://comboblocks.com/demo/image/",
			docs: "https://comboblocks.com/docs-category/blocks/image/",
			category: ["content"],
		},
		"combo-blocks/image-accordion": {
			label: "Image Accordion",
			value: "combo-blocks/image-accordion",
			page: "https://comboblocks.com/blocks/image-accordion/",
			preview: "https://comboblocks.com/demo/image-accordion/",
			docs: "https://comboblocks.com/docs-category/blocks/image-accordion/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/image-gallery": {
			label: "Image Gallery",
			value: "combo-blocks/image-gallery",
			page: "https://comboblocks.com/blocks/image-gallery/",
			preview: "https://comboblocks.com/demo/image-gallery/",
			docs: "https://comboblocks.com/docs-category/blocks/image-gallery/",
			category: ["tools"],
		},
		"combo-blocks/image-gallery-item": {
			label: "Image Gallery Item",
			value: "combo-blocks/image-gallery-item",
			page: "https://comboblocks.com/blocks/image-gallery/",
			preview: "https://comboblocks.com/demo/image-gallery/",
			docs: "https://comboblocks.com/docs-category/blocks/image-gallery/",
			category: ["tools"],
		},
		"combo-blocks/images": {
			label: "Images",
			value: "combo-blocks/images",
			page: "https://comboblocks.com/blocks/images/",
			preview: "https://comboblocks.com/demo/images/",
			docs: "https://comboblocks.com/docs-category/blocks/images/",
			category: ["tools"],
		},
		"combo-blocks/info-box": {
			label: "Info Box",
			value: "combo-blocks/info-box",
			page: "https://comboblocks.com/blocks/info-box/",
			preview: "https://comboblocks.com/demo/info-box/",
			docs: "https://comboblocks.com/docs-category/blocks/info-box/",
			category: ["content"],
		},
		"combo-blocks/info-box-item": {
			label: "Info Box Item",
			value: "combo-blocks/info-box-item",
			page: "https://comboblocks.com/blocks/info-box/",
			preview: "https://comboblocks.com/demo/info-box/",
			docs: "https://comboblocks.com/docs-category/blocks/info-box/",
			category: ["content"],
		},
		// "combo-blocks/instagram-feed": {
		// 	label: "Instagram Feed",
		// 	value: "combo-blocks/instagram-feed",
		// 	page: "https://comboblocks.com/blocks/instagram-feed/",
		// 	preview: "https://comboblocks.com/demo/instagram-feed/",
		// 	docs: "https://comboblocks.com/docs-category/blocks/instagram-feed/",
		// 	category: ["content"],
		// 	comingSoon: true,
		// },
		"combo-blocks/layer": {
			label: "Layer",
			value: "combo-blocks/layer",
			page: "https://comboblocks.com/blocks/layer/",
			preview: "https://comboblocks.com/demo/layer/",
			docs: "https://comboblocks.com/docs-category/blocks/layer/",
			category: ["layout"],
		},
		"combo-blocks/layers": {
			label: "Layers",
			value: "combo-blocks/layers",
			page: "https://comboblocks.com/blocks/layers/",
			preview: "https://comboblocks.com/demo/layers/",
			docs: "https://comboblocks.com/docs-category/blocks/layers/",
			category: ["layout"],
		},
		"combo-blocks/list": {
			label: "List",
			value: "combo-blocks/list",
			page: "https://comboblocks.com/blocks/list/",
			preview: "https://comboblocks.com/demo/list/",
			docs: "https://comboblocks.com/docs-category/blocks/list/",
			category: ["content"],
		},
		"combo-blocks/list-nested": {
			label: "List Nested",
			value: "combo-blocks/list-nested",
			page: "https://comboblocks.com/blocks/list-nested/",
			preview: "https://comboblocks.com/demo/list-nested/",
			docs: "https://comboblocks.com/docs-category/blocks/list-nested/",
			category: ["content"],
		},
		"combo-blocks/list-nested-item": {
			label: "List Nested Item",
			value: "combo-blocks/list-nested-item",
			page: "https://comboblocks.com/blocks/list-nested/",
			preview: "https://comboblocks.com/demo/list-nested/",
			docs: "https://comboblocks.com/docs-category/blocks/list-nested/",
			category: ["content"],
		},

		"combo-blocks/masonry-wrap": {
			label: "masonry maker",
			value: "combo-blocks/masonry-wrap",
			page: "https://comboblocks.com/blocks/masonry-grid/",
			preview: "https://comboblocks.com/demo/masonry-grid/",
			docs: "https://comboblocks.com/docs-category/blocks/masonry-wrap/",
			category: ["layout"],
		},
		"combo-blocks/masonry-wrap-item": {
			label: "masonry maker Item",
			value: "combo-blocks/masonry-wrap-item",
			page: "https://comboblocks.com/blocks/masonry-wrap/",
			preview: "https://comboblocks.com/demo/masonry-wrap/",
			docs: "https://comboblocks.com/docs-category/blocks/masonry-wrap/",
			category: ["layout"],
		},

		"combo-blocks/number-counter": {
			label: "Number Counter",
			value: "combo-blocks/number-counter",
			page: "https://comboblocks.com/blocks/number-counter/",
			preview: "https://comboblocks.com/demo/number-counter/",
			docs: "https://comboblocks.com/docs-category/blocks/number-counter/",
			category: ["tools"],
		},
		"combo-blocks/popup": {
			label: "Popup Maker",
			value: "combo-blocks/popup",
			page: "https://comboblocks.com/blocks/popup-maker/",
			preview: "https://comboblocks.com/demo/popup-maker/",
			docs: "https://comboblocks.com/docs-category/blocks/popup/",
			category: ["tools"],
		},
		"combo-blocks/post-author": {
			label: "Post Author",
			value: "combo-blocks/post-author",
			page: "https://comboblocks.com/blocks/post-author/",
			preview: "https://comboblocks.com/demo/post-author/",
			docs: "https://comboblocks.com/docs-category/blocks/post-author/",
			category: ["post"],
		},
		"combo-blocks/post-author-fields": {
			label: "Post Author Fields",
			value: "combo-blocks/post-author-fields",
			page: "https://comboblocks.com/blocks/author-fields/",
			preview: "https://comboblocks.com/demo/author-fields/",
			docs: "https://comboblocks.com/docs-category/blocks/author-fields/",
			category: ["post"],
		},
		"combo-blocks/post-categories": {
			label: "Post Categories",
			value: "combo-blocks/post-categories",
			page: "https://comboblocks.com/blocks/post-categories/",
			preview: "https://comboblocks.com/demo/post-categories/",
			docs: "https://comboblocks.com/docs-category/blocks/post-categories/",
			category: ["post"],
		},
		"combo-blocks/post-comment-count": {
			label: "Post Comment Count",
			value: "combo-blocks/post-comment-count",
			page: "https://comboblocks.com/blocks/post-comment-count/",
			preview: "https://comboblocks.com/demo/post-comment-count/",
			docs: "https://comboblocks.com/docs-category/blocks/post-comment-count/",
			category: ["post"],
		},

		"combo-blocks/post-date": {
			label: "Post Date",
			value: "combo-blocks/post-date",
			page: "https://comboblocks.com/blocks/post-date/",
			preview: "https://comboblocks.com/demo/post-date/",
			docs: "https://comboblocks.com/docs-category/blocks/post-date/",
			category: ["post"],
		},
		"combo-blocks/post-excerpt": {
			label: "Post Excerpt",
			value: "combo-blocks/post-excerpt",
			page: "https://comboblocks.com/blocks/post-excerpt/",
			preview: "https://comboblocks.com/demo/post-excerpt/",
			docs: "https://comboblocks.com/docs-category/blocks/post-excerpt/",
			category: ["post"],
		},
		"combo-blocks/post-featured-image": {
			label: "Post Featured Image",
			value: "combo-blocks/post-featured-image",
			page: "https://comboblocks.com/blocks/featured-image/",
			preview: "https://comboblocks.com/demo/featured-image/",
			docs: "https://comboblocks.com/docs-category/blocks/featured-image/",
			category: ["post"],
		},
		"combo-blocks/post-grid": {
			label: "Post Grid",
			value: "combo-blocks/post-grid",
			page: "https://comboblocks.com/blocks/post-grid/",
			preview: "https://comboblocks.com/demo/combo-blocks/",
			docs: "https://comboblocks.com/docs-category/blocks/post-grid/",
			category: ["tools"],
		},
		"combo-blocks/filterable-grid": {
			label: "Filterable Grid ",
			value: "combo-blocks/filterable-grid",
			page: "https://comboblocks.com/blocks/filterable-grid/",
			preview: "https://comboblocks.com/demo/filterable-grid/",
			docs: "https://comboblocks.com/docs-category/blocks/filterable-grid/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/": {
			label: "Filterable Grid - Nav",
			value: "combo-blocks/",
			page: "https://comboblocks.com/blocks/filterable-grid/",
			preview: "https://comboblocks.com/demo/filterable-grid/",
			docs: "https://comboblocks.com/docs-category/blocks/filterable-grid/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/post-meta": {
			label: "Post Meta",
			value: "combo-blocks/post-meta",
			page: "https://comboblocks.com/blocks/custom-fields/",
			preview: "https://comboblocks.com/demo/custom-fields/",
			docs: "https://comboblocks.com/docs-category/blocks/custom-fields/",
			category: ["post"],
		},
		"combo-blocks/post-query": {
			label: "Post query",
			value: "combo-blocks/post-query",
			page: "https://comboblocks.com/blocks/custom-fields/",
			preview: "https://comboblocks.com/demo/custom-fields/",
			docs: "https://comboblocks.com/docs-category/blocks/custom-fields/",
			category: ["tools"],
		},
		"combo-blocks/post-query-pagination": {
			label: "Post query pagination",
			value: "combo-blocks/post-query-pagination",
			page: "https://comboblocks.com/blocks/custom-fields/",
			preview: "https://comboblocks.com/demo/custom-fields/",
			docs: "https://comboblocks.com/docs-category/blocks/custom-fields/",
			category: ["tools"],
		},

		"combo-blocks/post-tags": {
			label: "Post Tags",
			value: "combo-blocks/post-tags",
			page: "https://comboblocks.com/blocks/post-tags/",
			preview: "https://comboblocks.com/demo/post-tags/",
			docs: "https://comboblocks.com/docs-category/blocks/post-tags/",
			category: ["post"],
		},
		"combo-blocks/post-taxonomies": {
			label: "Post Terms",
			value: "combo-blocks/post-taxonomies",
			page: "https://comboblocks.com/blocks/post-terms/",
			preview: "https://comboblocks.com/demo/post-terms/",
			docs: "https://comboblocks.com/docs-category/blocks/post-terms/",
			isPro: true,
			category: ["post"],
		},
		"combo-blocks/post-title": {
			label: "Post title",
			value: "combo-blocks/post-title",
			page: "https://comboblocks.com/blocks/post-title/",
			preview: "https://comboblocks.com/demo/post-title/",
			docs: "https://comboblocks.com/docs-category/blocks/post-title/",
			category: ["post"],
		},

		"combo-blocks/progress-bar": {
			label: "Progress Bar",
			value: "combo-blocks/progress-bar",
			page: "https://comboblocks.com/blocks/progressbar/",
			preview: "https://comboblocks.com/demo/progressbar/",
			docs: "https://comboblocks.com/docs-category/blocks/progressbar/",
			category: ["tools"],
		},
		"combo-blocks/read-more": {
			label: "Read More",
			value: "combo-blocks/read-more",
			page: "https://comboblocks.com/blocks/read-more/",
			preview: "https://comboblocks.com/demo/read-more/",
			docs: "https://comboblocks.com/docs-category/blocks/read-more/",
			category: ["post"],
		},

		"combo-blocks/shortcode": {
			label: "Shortcode",
			value: "combo-blocks/shortcode",
			page: "https://comboblocks.com/blocks/shortcode/",
			preview: "https://comboblocks.com/demo/shortcode/",
			docs: "https://comboblocks.com/docs-category/blocks/shortcode/",
			category: ["tools"],
		},

		"combo-blocks/social-share": {
			label: "Social Share",
			value: "combo-blocks/social-share",
			page: "https://comboblocks.com/blocks/social-share/",
			preview: "https://comboblocks.com/demo/social-share/",
			docs: "https://comboblocks.com/docs-category/blocks/social-share/",
			category: ["tools"],
		},
		"combo-blocks/star-rate": {
			label: "Star Rate",
			value: "combo-blocks/star-rate",
			page: "https://comboblocks.com/blocks/star-rate/",
			preview: "https://comboblocks.com/demo/star-rate/",
			docs: "https://comboblocks.com/docs-category/blocks/star-rate/",
			category: ["tools"],
		},
		"combo-blocks/table": {
			label: "Table",
			value: "combo-blocks/table",
			page: "https://comboblocks.com/blocks/table/",
			preview: "https://comboblocks.com/demo/table/",
			docs: "https://comboblocks.com/docs-category/blocks/table/",
			category: ["tools"],
		},
		"combo-blocks/table-td": {
			label: "Table Cell",
			value: "combo-blocks/table-td",
			page: "https://comboblocks.com/blocks/table/",
			preview: "https://comboblocks.com/demo/table/",
			docs: "https://comboblocks.com/docs-category/blocks/table/",
			category: ["tools"],
		},
		"combo-blocks/table-tr": {
			label: "Table Row",
			value: "combo-blocks/table-tr",
			page: "https://comboblocks.com/blocks/table/",
			preview: "https://comboblocks.com/demo/table/",
			docs: "https://comboblocks.com/docs-category/blocks/table/",
			category: ["tools"],
		},
		"combo-blocks/tabs-nested": {
			label: "Tabs Nested",
			value: "combo-blocks/tabs-nested",
			page: "https://comboblocks.com/blocks/tabs/",
			preview: "https://comboblocks.com/demo/tabs/",
			docs: "https://comboblocks.com/docs-category/blocks/tabs/",
			category: ["layout"],
		},
		"combo-blocks/tabs-nested-item": {
			label: "Tabs Nested Item",
			value: "combo-blocks/tabs-nested-item",
			page: "https://comboblocks.com/blocks/tabs/",
			preview: "https://comboblocks.com/demo/tabs/",
			docs: "https://comboblocks.com/docs-category/blocks/tabs/",
			category: ["layout"],
		},
		"combo-blocks/team-members": {
			label: "Team Members",
			value: "combo-blocks/team-members",
			page: "https://comboblocks.com/blocks/team-members/",
			preview: "https://comboblocks.com/demo/team-members/",
			docs: "https://comboblocks.com/docs-category/blocks/team-members/",
			category: ["tools"],
		},
		"combo-blocks/team-members-field": {
			label: "Team Members Field",
			value: "combo-blocks/team-members-field",
			page: "https://comboblocks.com/blocks/team-members-field/",
			preview: "https://comboblocks.com/demo/team-members-field/",
			docs: "https://comboblocks.com/docs-category/blocks/team-members-field/",
			category: ["tools"],
		},
		"combo-blocks/team-showcase": {
			label: "Team Showcase",
			value: "combo-blocks/team-showcase",
			page: "https://comboblocks.com/blocks/team-showcase/",
			preview: "https://comboblocks.com/demo/team-showcase/",
			docs: "https://comboblocks.com/docs-category/blocks/team-showcase/",
			category: ["tools"],
		},
		"combo-blocks/terms-list": {
			label: "Terms List",
			value: "combo-blocks/terms-list",
			page: "https://comboblocks.com/blocks/terms-list/",
			preview: "https://comboblocks.com/demo/terms-list/",
			docs: "https://comboblocks.com/docs-category/blocks/terms-list/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/terms-query": {
			label: "terms query",
			value: "combo-blocks/terms-query",
			page: "https://comboblocks.com/blocks/terms-query/",
			preview: "https://comboblocks.com/demo/terms-query/",
			docs: "https://comboblocks.com/docs-category/blocks/terms-query/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/terms-query-item": {
			label: "terms query Item",
			value: "combo-blocks/terms-query-item",
			page: "https://comboblocks.com/blocks/terms-query/",
			preview: "https://comboblocks.com/demo/terms-query/",
			docs: "https://comboblocks.com/docs-category/blocks/terms-query/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/testimonials": {
			label: "Testimonial",
			value: "combo-blocks/testimonials",
			page: "https://comboblocks.com/blocks/testimonials/",
			preview: "https://comboblocks.com/demo/testimonials/",
			docs: "https://comboblocks.com/docs-category/blocks/testimonials/",
			category: ["tools"],
		},
		"combo-blocks/testimonials-field": {
			label: "Testimonials Field",
			value: "combo-blocks/testimonial-field",
			page: "https://comboblocks.com/blocks/testimonials/",
			preview: "https://comboblocks.com/demo/testimonials/",
			docs: "https://comboblocks.com/docs-category/blocks/testimonials/",
			category: ["tools"],
		},
		"combo-blocks/text": {
			label: "Text",
			value: "combo-blocks/text",
			page: "https://comboblocks.com/blocks/text/",
			preview: "https://comboblocks.com/demo/text/",
			docs: "https://comboblocks.com/docs-category/blocks/text/",
			category: ["content"],
		},



		"combo-blocks/user-fields": {
			label: "User Fields",
			value: "combo-blocks/user-fields",
			page: "https://comboblocks.com/blocks/user-fields/",
			preview: "https://comboblocks.com/demo/user-fields/",
			docs: "https://comboblocks.com/docs-category/blocks/user-fields/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/user-query": {
			label: "User Query",
			value: "combo-blocks/user-query",
			page: "https://comboblocks.com/blocks/user-query/",
			preview: "https://comboblocks.com/demo/user-query/",
			docs: "https://comboblocks.com/docs-category/blocks/user-query/",
			isPro: true,
			category: ["tools"],
		},
		"combo-blocks/user-query-pagination": {
			label: "User Query Pagination",
			value: "combo-blocks/user-query-pagination",
			page: "https://comboblocks.com/blocks/user-query-pagination/",
			preview: "https://comboblocks.com/demo/user-query-pagination/",
			docs: "https://comboblocks.com/docs-category/blocks/user-query-pagination/",
			isPro: true,
			category: ["tools"],
		},

		"combo-blocks/woo-price": {
			label: "product price",
			value: "combo-blocks/woo-price",
			page: "https://comboblocks.com/blocks/woo-product-price/",
			preview: "https://comboblocks.com/demo/woo-product-price/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-product-price/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-add-to-cart": {
			label: "Add To Cart",
			value: "combo-blocks/woo-add-to-cart",
			page: "https://comboblocks.com/blocks/woo-add-to-cart/",
			preview: "https://comboblocks.com/demo/woo-add-to-cart/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-add-to-cart/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-sale": {
			label: "on sale",
			value: "combo-blocks/woo-sale",
			page: "https://comboblocks.com/blocks/woo-on-sale/",
			preview: "https://comboblocks.com/demo/woo-on-sale/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-on-sale/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-sku": {
			label: "product sku",
			value: "combo-blocks/woo-sku",
			page: "https://comboblocks.com/blocks/woo-product-sku/",
			preview: "https://comboblocks.com/demo/woo-product-sku/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-product-sku/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-star-rate": {
			label: "product ratings",
			value: "combo-blocks/woo-star-rate",
			page: "https://comboblocks.com/blocks/woo-star-rate/",
			preview: "https://comboblocks.com/demo/woo-star-rate/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-star-rate/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-stock": {
			label: "in stock",
			value: "combo-blocks/woo-stock",
			page: "https://comboblocks.com/blocks/woo-stock/",
			preview: "https://comboblocks.com/demo/woo-stock/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-stock/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/woo-stock-quantity": {
			label: "stock quantity",
			value: "combo-blocks/woo-stock-quantity",
			page: "https://comboblocks.com/blocks/woo-stock-quantity/",
			preview: "https://comboblocks.com/demo/woo-stock-quantity/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-stock-quantity/",
			isPro: true,
			category: ["woo-product"],
		},
		"combo-blocks/wordpress-org": {
			label: "wordpress-org",
			value: "combo-blocks/wordpress-org",
			page: "https://comboblocks.com/blocks/wordpress-org/",
			preview: "https://comboblocks.com/demo/wordpress-org/",
			docs: "https://comboblocks.com/docs-category/blocks/wordpress-org/",
			category: ["tools"],
		},
		"combo-blocks/wordpress-org-item": {
			label: "wordpress-org-item",
			value: "combo-blocks/wordpress-org-item",
			page: "https://comboblocks.com/blocks/wordpress-org-item/",
			preview: "https://comboblocks.com/demo/wordpress-org-item/",
			docs: "https://comboblocks.com/docs-category/blocks/wordpress-org-item/",
			category: ["tools"],
		},
		"combo-blocks/blockquote": {
			label: "Blockquote",
			value: "combo-blocks/blockquote",
			page: "https://comboblocks.com/blocks/blockquote/",
			preview: "https://comboblocks.com/demo/blockquote/",
			docs: "https://comboblocks.com/docs-category/blocks/blockquote/",
			category: ["tools"],
			comingSoon: true,
		},
		"combo-blocks/chart": {
			label: "Chart",
			value: "combo-blocks/chart",
			page: "https://comboblocks.com/blocks/chart/",
			preview: "https://comboblocks.com/demo/chart/",
			docs: "https://comboblocks.com/docs-category/blocks/chart/",
			category: ["tools"],
			comingSoon: true,
		},
		"combo-blocks/content-ticker": {
			label: "Content Ticker",
			value: "combo-blocks/content-ticker",
			page: "https://comboblocks.com/blocks/content-ticker/",
			preview: "https://comboblocks.com/demo/content-ticker/",
			docs: "https://comboblocks.com/docs-category/blocks/content-ticker/",
			category: ["content"],
			comingSoon: true,
		},

		"combo-blocks/lottie": {
			label: "Lottie",
			value: "combo-blocks/lottie",
			page: "https://comboblocks.com/blocks/lottie/",
			preview: "https://comboblocks.com/demo/lottie/",
			docs: "https://comboblocks.com/docs-category/blocks/lottie/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/menu-wrap": {
			label: "menu maker",
			value: "combo-blocks/menu-wrap",
			page: "https://comboblocks.com/blocks/menu-wrap/",
			preview: "https://comboblocks.com/demo/menu-wrap/",
			docs: "https://comboblocks.com/docs-category/blocks/menu-wrap/",
			category: ["layout"],
			isBeta: true,
		},
		"combo-blocks/menu-wrap-item": {
			label: "menu maker Item",
			value: "combo-blocks/menu-wrap-item",
			page: "https://comboblocks.com/blocks/menu-wrap/",
			preview: "https://comboblocks.com/demo/menu-wrap/",
			docs: "https://comboblocks.com/docs-category/blocks/menu-wrap/",
			category: ["layout"],
			isBeta: true,
		},
		"combo-blocks/post-comments": {
			label: "Post Comments",
			value: "combo-blocks/post-comments",
			page: "https://comboblocks.com/blocks/post-comments/",
			preview: "https://comboblocks.com/demo/post-comments/",
			docs: "https://comboblocks.com/docs-category/blocks/post-comments/",
			category: ["post"],
			comingSoon: true,
		},
		"combo-blocks/post-reactions": {
			label: "Post Reactions",
			value: "combo-blocks/post-reactions",
			page: "https://comboblocks.com/blocks/post-reactions/",
			preview: "https://comboblocks.com/demo/post-reactions/",
			docs: "https://comboblocks.com/docs-category/blocks/post-reactions/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/pricing-table": {
			label: "Pricing Table",
			value: "combo-blocks/pricing-table",
			page: "https://comboblocks.com/blocks/pricing-table/",
			preview: "https://comboblocks.com/demo/pricing-table/",
			docs: "https://comboblocks.com/docs-category/blocks/pricing-table/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/related-posts": {
			label: "Related Posts",
			value: "combo-blocks/related-posts",
			page: "https://comboblocks.com/blocks/related-posts/",
			preview: "https://comboblocks.com/demo/related-posts/",
			docs: "https://comboblocks.com/docs-category/blocks/related-posts/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/google-map": {
			label: "Google Map",
			value: "combo-blocks/google-map",
			page: "https://comboblocks.com/blocks/google-map/",
			preview: "https://comboblocks.com/demo/google-map/",
			docs: "https://comboblocks.com/docs-category/blocks/google-map/",
			category: ["tools"],
			comingSoon: true,
		},

		"combo-blocks/timeline": {
			label: "Timeline",
			value: "combo-blocks/timeline",
			page: "https://comboblocks.com/blocks/timeline/",
			preview: "https://comboblocks.com/demo/timeline/",
			docs: "https://comboblocks.com/docs-category/blocks/timeline/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/whatsapp": {
			label: "Whatsapp",
			value: "combo-blocks/whatsapp",
			page: "https://comboblocks.com/blocks/whatsapp/",
			preview: "https://comboblocks.com/demo/whatsapp/",
			docs: "https://comboblocks.com/docs-category/blocks/whatsapp/",
			category: ["content"],
			comingSoon: true,
		},
		"combo-blocks/woo-quick-view": {
			label: "Woo Quick View",
			value: "combo-blocks/woo-quick-view",
			page: "https://comboblocks.com/blocks/woo-quick-view/",
			preview: "https://comboblocks.com/demo/woo-quick-view/",
			docs: "https://comboblocks.com/docs-category/blocks/woo-quick-view/",
			category: ["content"],
			comingSoon: true,
		},
	};
	// 	const sortObjectByLabel = (obj) => {
	//   // Convert the object to an array of its values and keys
	//   const entries = Object.entries(obj);
	//   // Sort the array based on the label property
	//   const sortedEntries = entries.sort((a, b) => {
	//     const labelA = a[1].value.toLowerCase();
	//     const labelB = b[1].value.toLowerCase();
	//     return labelA.localeCompare(labelB);
	//   });
	//   // Convert the sorted array back to an object
	//   const sortedObj = Object.fromEntries(sortedEntries);
	//   return sortedObj;
	// };
	// 	const sortedData = sortObjectByLabel(pgBlocks);
	// 	
	const [filteredBlocks, setfilteredBlocks] = useState([]);
	const [categorisedBlocks, setcategorisedBlocks] = useState([]);
	const [filteredAddons, setfilteredAddons] = useState([]);
	var unitArgs = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		auto: { label: "AUTO", value: "auto" },
		"%": { label: "%", value: "%" },
		cm: { label: "CM", value: "cm" },
		mm: { label: "MM", value: "mm" },
		in: { label: "IN", value: "in" },
		pt: { label: "PT", value: "pt" },
		pc: { label: "PC", value: "pc" },
		ex: { label: "EX", value: "ex" },
		ch: { label: "CH", value: "ch" },
		vw: { label: "VW", value: "vw" },
		vh: { label: "VH", value: "vh" },
		vmin: { label: "VMIN", value: "vmin" },
		vmax: { label: "VMAX", value: "vmax" },
	};
	var fontWeightArgs = {
		normal: { label: "normal", value: "normal" },
		bold: { label: "bold", value: "bold" },
		bolder: { label: "bolder", value: "bolder" },
		lighter: { label: "lighter", value: "lighter" },
		100: { label: "100", value: "100" },
		200: { label: "200", value: "200" },
		300: { label: "300", value: "300" },
		400: { label: "400", value: "400" },
		500: { label: "500", value: "500" },
		600: { label: "600", value: "600" },
		700: { label: "700", value: "700" },
		800: { label: "800", value: "800" },
		900: { label: "900", value: "900" },
	};
	var fontStyleArgs = {
		normal: { label: "normal", value: "normal" },
		italic: { label: "italic", value: "italic" },
		oblique: { label: "oblique", value: "oblique" },
	};
	var fontStretchArgs = {
		"ultra-condensed": { label: "ultra-condensed", value: "ultra-condensed" },
		"extra-condensed": { label: "extra-condensed", value: "extra-condensed" },
		condensed: { label: "condensed", value: "condensed" },
		"semi-condensed": { label: "semi-condensed", value: "semi-condensed" },
		normal: { label: "normal", value: "normal" },
		"semi-expanded": { label: "semi-expanded", value: "semi-expanded" },
		expanded: { label: "expanded", value: "expanded" },
		"extra-expanded": { label: "extra-expanded", value: "extra-expanded" },
		"ultra-expanded": { label: "ultra-expanded", value: "ultra-expanded" },
	};
	var asOptions = {
		font: { label: "Font", value: "font" },
		image: { label: "Image", value: "image" },
		script: { label: "Script", value: "script" },
		style: { label: "Style", value: "style" },
		fetch: { label: "Fetch", value: "fetch" },
		track: { label: "Track", value: "track" },
	};
	const copyObjectToClipboard = (obj) => {
		navigator.clipboard
			.writeText(obj)
			.then(() => { })
			.catch((err) => {
				// Handle errors here
			});
	};
	// ! hello
	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="bg-gray-300 text-white py-5 p-3">
				<div className="flex gap-3 justify-center items-center flex-wrap lg:justify-between">
					<div className="flex justify-center flex-wrap  md:justify-between  ">
						<div className=" flex  items-center flex-wrap gap-4 md:flex-nowrap md:justify-between md:gap-6 ">
							<div className=" flex gap-4 w-full items-center md:w-auto ">
								<span className="flex flex-col w-max">
									<span className="text-[32px] md:text-[36px] lg:text-[40px] leading-[32px] md:leading-[36px] lg:leading-[40px] font-extrabold text-white whitespace-nowrap ">
										{__("Combo Blocks", "combo-blocks")}
									</span>
								</span>
							</div>
							<div className="flex items-center flex-wrap gap-5 md:gap-4 ">
								{isProFeature && (
									<>
										<a
											href="https://comboblocks.com/pricing/?utm_source=CBDashboard&utm_medium=topNav&utm_campaign=CBPro"
											target="_blank"
											className="bg-amber-500 text-[16px] font-bold no-underline rounded-sm p-2 px-4 whitespace-nowrap cursor-pointer text-white lg:text-lg ">
											{__("Buy Pro", "combo-blocks")}
										</a>
									</>
								)}
								{isLoading && (
									<span className="">
										<Spinner />
									</span>
								)}
							</div>
						</div>
					</div>
					<div className=" flex w-full lg:w-auto">
						<div className="flex gap-2 items-center flex-wrap ">
							<a
								href="https://pickplugins.com/create-support-ticket/"
								target="_blank"
								className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white ">
								{__("Create Support", "combo-blocks")}
							</a>
							<a
								href="https://comboblocks.com/documentations/"
								target="_blank"
								className=" no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white   hover:text-white ">
								{__("Documentation", "combo-blocks")}
							</a>
							<button
								className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
								onClick={(ev) => {
									// resetOptionData();
									handleAlertConfirmation();
								}}>
								{__("Reset", "combo-blocks")}
							</button>
							<div
								className="bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center"
								onClick={(ev) => {
									updateOption();
								}}>
								{isLoading && (
									<span className="">
										<Spinner />
									</span>
								)}

								<span>{__("Save", "combo-blocks")}</span>
								{needSave && (
									<span className="w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500">
										!
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* {JSON.stringify(optionData)} */}
			<div
				id=""
				className="pg-setting-input-text  ">
				<PGtabs
					activeTab="disableBlocks"
					orientation="vertical"
					contentClass=" p-5 bg-white w-full"
					navItemClass="bg-gray-500 px-5 py-3 gap-2 border-0 border-b border-solid border-gray-500"
					navItemSelectedClass="bg-gray-700"
					activeClass="active-tab"
					onSelect={(tabName) => { }}
					tabs={dashboardTabs}>
					<PGtab name="overview">
						<div className="flex w-full h-full justify-center items-center font-bold text-3xl text-gray-800 pg-font ">
							{__("Combo Blocks", "combo-blocks")}
						</div>
					</PGtab>
					<PGtab name="general">
						<div className="text-2xl font-bold mb-7">
							{__("Genral Settings", "combo-blocks")}
						</div>
						<div className="flex mb-5  justify-start gap-2 items-center ">
							<label className=" text-lg w-[300px]">
								{__("Container Width", "combo-blocks")}
							</label>
							<InputControl
								type="number"
								value={
									optionData.container == null ||
										optionData.container.width == undefined
										? ""
										: optionData.container.width.match(/-?\d+/g)[0]
								}
								onChange={(newVal) => {
									var container = { ...optionData.container };
									var widthValX =
										container.width == undefined ||
											container.width.match(/-?\d+/g) == null
											? 0
											: container.width.match(/-?\d+/g)[0];
									var widthUnitX =
										container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: container.width.match(/[a-zA-Z%]+/g)[0];
									var containerX = {
										...optionData.container,
										width: newVal + widthUnitX,
									};
									setoptionData({ ...optionData, container: containerX });
								}}
							/>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={unitArgs}
								buttonTitle={
									optionData?.container?.width.match(/[a-zA-Z%]+/g) == null
										? __("Choose", "combo-blocks")
										: optionData.container.width.match(/[a-zA-Z%]+/g)[0]
								}
								onChange={(option, index) => {
									var container = { ...optionData.container };
									var widthValX =
										container.width == undefined ||
											container.width.match(/-?\d+/g) == null
											? 0
											: container.width.match(/-?\d+/g)[0];
									var widthUnitX =
										container.width == undefined ||
											container.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: container.width.match(/[a-zA-Z%]+/g)[0];
									var containerX = {
										...optionData.container,
										width: widthValX + option.value,
									};
									setoptionData({ ...optionData, container: containerX });
								}}
								values={""}></PGDropdown>
						</div>
						<div className="flex mb-5 justify-start gap-2 items-center ">
							<label className=" text-lg w-[300px]">
								{__("Editor Width", "combo-blocks")}
							</label>
							<InputControl
								type="number"
								value={
									optionData.editor == null ||
										optionData.editor.width == undefined
										? ""
										: optionData.editor.width.match(/-?\d+/g)[0]
								}
								onChange={(newVal) => {
									var editor = { ...optionData.editor };
									var widthValX =
										editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
											? 0
											: editor.width.match(/-?\d+/g)[0];
									var widthUnitX =
										editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: editor.width.match(/[a-zA-Z%]+/g)[0];
									var editorX = {
										...optionData.editor,
										width: newVal + widthUnitX,
									};
									setoptionData({ ...optionData, editor: editorX });
								}}
							/>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								options={unitArgs}
								buttonTitle={
									optionData?.editor?.width.match(/[a-zA-Z%]+/g) == null
										? __("Choose", "combo-blocks")
										: optionData.editor.width.match(/[a-zA-Z%]+/g)[0]
								}
								onChange={(option, index) => {
									var editor = { ...optionData.editor };
									var widthValX =
										editor.width == undefined ||
											editor.width.match(/-?\d+/g) == null
											? 0
											: editor.width.match(/-?\d+/g)[0];
									var widthUnitX =
										editor.width == undefined ||
											editor.width.match(/[a-zA-Z%]+/g) == null
											? "px"
											: editor.width.match(/[a-zA-Z%]+/g)[0];
									var editorX = {
										...optionData.editor,
										width: widthValX + option.value,
									};
									setoptionData({ ...optionData, editor: editorX });
								}}
								values={""}></PGDropdown>
						</div>
					</PGtab>
					<PGtab name="customFonts">
						<div className="text-2xl font-bold mb-7">
							{__("Google/Custom Fonts", "combo-blocks")}
						</div>
						<div
							// disabled={isProFeature ? "true" : "false"}
							className={`my-3 pg-setting-input-text  pg-dashboard ${isProFeature ? " pg-blur	pointer-events-none" : ""
								}`}>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<div className="text-xl font-semibold mb-4">
										{__("Custom Fonts", "combo-blocks")}
									</div>
									<div
										// className="inline-block px-4 py-1 my-3 bg-gray-400 text-white rounded-sm cursor-pointer"
										className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
										onClick={(ev) => {
											var customFonts = optionData.customFonts;
											customFonts.push({
												family: "Font Family",
												weight: "",
												style: "",
												stretch: "",
												src: [],
											});
											setoptionData({
												...optionData,
												customFonts: customFonts,
											});
										}}>
										{__("Add", "combo-blocks")}
									</div>
									<div className="">
										{optionData?.customFonts?.map((x, i) => {
											return (
												<div
													key={i}
													className="pg-setting-input-text overflow-hidden  ">
													<PanelBody
														title={
															<>
																<span
																	// className="bg-red-500 p-1 cursor-pointer"
																	className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
																	onClick={(ev) => {
																		var customFonts = optionData.customFonts;
																		customFonts.splice(i, 1);
																		setoptionData({
																			...optionData,
																			customFonts: customFonts,
																		});
																	}}>
																	{/* <Icon fill={"#fff"} icon={close} /> */}
																	<span className="text-[20px] text-white ">
																		&times;
																	</span>
																</span>
																<span className="mx-2">{x.family}</span>
															</>
														}
														initialOpen={false}>
														<div className="my-2 w-full ">
															<div className="px-3 mt-3">
																<div className="flex gap-3 items-center ">
																	<label>
																		{__("Family Name", "combo-blocks")}
																	</label>
																	<InputControl
																		value={x.family}
																		onChange={(newVal) => {
																			var customFonts = optionData.customFonts;
																			customFonts[i].family = newVal;
																			clearTimeout(debounce);
																			debounce = setTimeout(() => {
																				setoptionData({
																					...optionData,
																					customFonts: customFonts,
																				});
																			}, 1000);
																		}}
																	/>
																</div>
																<div className="flex gap-3 items-center  justify-between my-2 ">
																	<label>{__("Font URL's", "combo-blocks")}</label>
																	<div
																		// className="inline-block px-4 my-3 py-1 bg-gray-400 text-white rounded-sm cursor-pointer"
																		className="pg-font flex gap-2 justify-center my-4 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
																		onClick={(ev) => {
																			var customFonts = optionData.customFonts;
																			customFonts[i].src.push({
																				url: "",
																				format: "",
																			});
																			setoptionData({
																				...optionData,
																				customFonts: customFonts,
																			});
																		}}>
																		{__("Add", "combo-blocks")}
																	</div>
																</div>
																{x.src.map((srcArg, j) => {
																	var url = srcArg.url;
																	var format = srcArg.format;
																	return (
																		<div className="flex gap-3  my-2 items-center justify-between">
																			<InputControl
																				value={url}
																				onChange={(newVal) => {
																					var customFonts =
																						optionData.customFonts;
																					customFonts[i].src[j].url = newVal;
																					clearTimeout(debounce);
																					debounce = setTimeout(() => {
																						setoptionData({
																							...optionData,
																							customFonts: customFonts,
																						});
																					}, 1000);
																				}}
																			/>
																			<span
																				className="bg-red-500 p-1 cursor-pointer"
																				onClick={(ev) => {
																					var customFonts =
																						optionData.customFonts;
																					customFonts[i].src.splice(1, j);
																					setoptionData({
																						...optionData,
																						customFonts: customFonts,
																					});
																				}}>
																				<Icon fill={"#fff"} icon={close} />
																			</span>
																		</div>
																	);
																})}
																<div className="flex gap-3 items-center justify-between my-2 ">
																	<label>
																		{__("Font Wieght", "combo-blocks")}
																	</label>
																	<PGDropdown
																		position="bottom right"
																		// variant="secondary"
																		options={fontWeightArgs}
																		buttonTitle={
																			fontWeightArgs[x.weight] == undefined
																				? __("Choose", "combo-blocks")
																				: x.weight
																		}
																		onChange={(option, index) => {
																			var customFonts = optionData.customFonts;
																			customFonts[i].weight = option.value;
																			setoptionData({
																				...optionData,
																				customFonts: customFonts,
																			});
																		}}
																		values={""}></PGDropdown>
																</div>
																<div className="flex gap-3 items-center justify-between my-2 ">
																	<label>{__("Font Style", "combo-blocks")}</label>
																	<PGDropdown
																		position="bottom right"
																		// variant="secondary"
																		options={fontStyleArgs}
																		buttonTitle={
																			fontStyleArgs[x.style] == undefined
																				? __("Choose", "combo-blocks")
																				: x.style
																		}
																		onChange={(option, index) => {
																			var customFonts = optionData.customFonts;
																			customFonts[i].style = option.value;
																			setoptionData({
																				...optionData,
																				customFonts: customFonts,
																			});
																		}}
																		values={""}></PGDropdown>
																</div>
																<div className="flex gap-3 items-center justify-between my-2 ">
																	<label>
																		{__("Font Stretch", "combo-blocks")}
																	</label>
																	<PGDropdown
																		position="bottom right"
																		// variant="secondary"
																		options={fontStretchArgs}
																		buttonTitle={
																			fontStretchArgs[x.stretch] == undefined
																				? __("Choose", "combo-blocks")
																				: x.stretch
																		}
																		onChange={(option, index) => {
																			var customFonts = optionData.customFonts;
																			customFonts[i].stretch = option.value;
																			setoptionData({
																				...optionData,
																				customFonts: customFonts,
																			});
																		}}
																		values={""}></PGDropdown>
																</div>
															</div>
														</div>
													</PanelBody>
												</div>
											);
										})}
									</div>
								</div>
								<div>
									<div className="text-xl font-semibold mb-4">
										{__("Google Fonts", "combo-blocks")}
									</div>
									<div className="mb-4">
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Choose Google Fonts"}
											options={GFonts}
											onChange={(option, index) => {
												var googleFonts = optionData.googleFonts;
												googleFonts.push(option);
												setoptionData({
													...optionData,
													googleFonts: googleFonts,
												});
											}}
											values=""></PGDropdown>
									</div>
									{/* {JSON.stringify(optionData)} */}
									{optionData.googleFonts != undefined &&
										optionData.googleFonts.map((font, index) => {
											return (
												<div className="flex items-center gap-4 h-8 border-0 border-solid border-b border-b-gray-800/20 hover:border-b-gray-800 hover:bg-slate-200">
													<i
														className="flex text-white !items-center !justify-center !w-6 !h-full !text-[20px] !leading-none bg-red-400 hover:bg-red-500"
														onClick={(ev) => {
															var googleFonts = optionData.googleFonts;
															googleFonts.splice(index, 1);
															setoptionData({
																...optionData,
																googleFonts: googleFonts,
															});
														}}>
														&times;
													</i>
													<span className="text-[13px] leading-none py-1">
														{font.label}
													</span>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</PGtab>
					<PGtab name="preloads">
						<div className="text-2xl font-bold mb-7">
							{__("Preloads", "combo-blocks")}
						</div>
						<div
							// disabled={isProFeature ? "true" : "false"}
							className={`my-3 pg-setting-input-text  pg-dashboard ${isProFeature ? " pg-blur	pointer-events-none" : ""
								}`}>
							<div
								className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var data =
										optionData.preloads == undefined
											? optionDataDefault.preloads
											: optionData.preloads;
									var visibleX = [...data];
									var index = Object.entries(visibleX).length;
									visibleX[index] = {
										relation: "OR",
										title: "",
										args: [],
										preloads: {
											href: "",
											as: "",
											type: "",
											crossorigin: "",
											media: "",
										},
									};
									setoptionData({
										...optionData,
										preloads: visibleX,
									});
								}}>
								{__("Add Group", "combo-blocks")}
							</div>
							<div className="my-4">
								{optionData.preloads != undefined &&
									Object.entries(optionData?.preloads).map(
										(group, groupIndex) => {
											var groupId = group[0];
											var groupData = group[1];
											return (
												<PanelBody
													title={
														<RemovePreloadsGroup
															title={groupIndex}
															index={groupId}
														/>
													}
													initialOpen={false}>
													<PanelRow className="my-3 justify-start gap-5">
														<div>
															<label htmlFor="">
																{__("Group Title", "combo-blocks")}
															</label>
															<input
																type="text"
																value={optionData.preloads[groupIndex].title}
																onChange={(ev) => {
																	var visibleX = [...optionData.preloads];
																	visibleX[groupIndex].title = ev.target.value;
																	setoptionData({
																		...optionData,
																		preloads: visibleX,
																	});
																}}
															/>
														</div>
														<div
															className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
															onClick={(option, index) => {
																var visibleX = [...optionData.preloads];
																visibleX[groupId]["args"].push([
																	{
																		param: "post_type",
																		operator: "==",
																		value: "post",
																	},
																]);
																setoptionData({
																	...optionData,
																	preloads: visibleX,
																});
															}}>
															{__("Add Condition", "combo-blocks")}
														</div>
													</PanelRow>
													{/* ****new */}
													{optionData.preloads[groupId]["args"] != undefined &&
														optionData.preloads[groupId]["args"].length ==
														0 && (
															<p>
																{__(
																	"Add Condition to show script.",
																	"combo-blocks"
																)}
															</p>
														)}
													{optionData.preloads[groupId]["args"] != undefined &&
														optionData.preloads[groupId]["args"].map(
															(item, index) => {
																return (
																	<>
																		<div className="flex flex-col gap-3 mb-4 p-3 px-5 border border-[#e0e0e0] border-solid  rounded ">
																			<div className="flex gap-4 items-start ">
																				<div
																					className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
																					onClick={(ev) => {
																						var visibleX = [
																							...optionData.preloads,
																						];
																						visibleX[groupId].args.splice(
																							index,
																							1
																						);
																						setoptionData({
																							...optionData,
																							preloads: visibleX,
																						});
																					}}>
																					<span className="text-[20px] text-white ">
																						&times;
																					</span>
																				</div>
																				<div
																					className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
																					onClick={(ev) => {
																						var visibleX = [
																							...optionData.preloads,
																						];
																						visibleX[groupId].args[index].push({
																							param: "post_type",
																							operator: "==",
																							value: "post",
																						});
																						setoptionData({
																							...optionData,
																							preloads: visibleX,
																						});
																					}}>
																					{__("Add new", "combo-blocks")}
																				</div>
																				<div className="flex-1">
																					{optionData.preloads[groupId].args[
																						index
																					] != undefined &&
																						optionData.preloads[groupId].args[
																							index
																						].map((item, i) => {
																							return (
																								<div className="mb-5 flex gap-4 items-center">
																									<select
																										name="param"
																										value={
																											optionData.preloads[
																												groupId
																											].args[index][i].param
																										}
																										onChange={(event) => {
																											const value =
																												event.target.value;
																											var visibleX = [
																												...optionData.preloads,
																											];
																											visibleX[groupId].args[
																												index
																											][i].param = value;
																											setoptionData({
																												...optionData,
																												preloads: visibleX,
																											});
																										}}>
																										<option
																											value="post_type"
																											selected="selected"
																											data-i="0">
																											{__(
																												"Post Type",
																												"combo-blocks"
																											)}
																										</option>


																										<option value="post_template">
																											{__(
																												"Post Template",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="post_id">
																											{__(
																												"Post ID",
																												"combo-blocks"
																											)}
																										</option>


																										<option value="taxonomy">
																											{__(
																												"Taxonomy",
																												"combo-blocks"
																											)}
																										</option>
																									</select>
																									<select
																										name="operator"
																										value={
																											optionData.preloads[
																												groupId
																											].args[index][i].operator
																										}
																										onChange={(event) => {
																											const value =
																												event.target.value;
																											const updatedCustomScript =
																												[
																													...optionData.preloads,
																												];
																											updatedCustomScript[
																												groupId
																											].args[index][
																												i
																											].operator = value;
																											setoptionData({
																												...optionData,
																												preloads:
																													updatedCustomScript,
																											});
																										}}>
																										<option value="==">
																											{__(
																												"is equal to",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="!=">
																											{__(
																												"is not equal to",
																												"combo-blocks"
																											)}
																										</option>
																									</select>
																									<select
																										name="value"
																										value={
																											optionData.preloads[
																												groupId
																											].args[index][i].value
																										}
																										onChange={(event) => {
																											const value =
																												event.target.value;
																											const updatedCustomScript =
																												[
																													...optionData.preloads,
																												];
																											updatedCustomScript[
																												groupId
																											].args[index][i].value =
																												value;
																											setoptionData({
																												...optionData,
																												preloads:
																													updatedCustomScript,
																											});
																										}}>
																										<option
																											value="post"
																											selected="selected"
																											data-i="0">
																											{__("Post", "combo-blocks")}
																										</option>
																										<option value="page">
																											Page
																										</option>
																										<option value="e-landing-page">
																											{__(
																												"Landing Page",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="elementor_library">
																											{__(
																												"Template",
																												"combo-blocks"
																											)}
																										</option>

																										<option value="wfacp_checkout">
																											{__(
																												"Checkout",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="product">
																											{__(
																												"Product",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="shop_order">
																											{__("Order", "combo-blocks")}
																										</option>
																										<option value="shop_coupon">
																											{__(
																												"Coupon",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="wffn_landing">
																											{__(
																												"Sales Page",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="wffn_ty">
																											{__(
																												"Thank You Page",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="wffn_optin">
																											{__(
																												"Optin Page",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="wffn_oty">
																											{__(
																												"Optin Confirmation Page",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="review">
																											{__(
																												"Review",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="combo_blocks_template">
																											{__(
																												"Saved Template",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="combo_blocks_layout">
																											{__(
																												"Saved Layout",
																												"combo-blocks"
																											)}
																										</option>
																										<option value="stackable_temp_post">
																											{__(
																												"Default Block",
																												"combo-blocks"
																											)}
																										</option>
																									</select>
																									<div
																										className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
																										onClick={(ev) => {
																											const updatedCustomScript =
																												[
																													...optionData.preloads,
																												];
																											updatedCustomScript[
																												groupId
																											].args[index].splice(
																												i,
																												1
																											);
																											setoptionData({
																												...optionData,
																												preloads:
																													updatedCustomScript,
																											});
																										}}>
																										<span className="text-[20px] text-white ">
																											{/* &times; */}
																											&minus;
																										</span>
																									</div>
																								</div>
																							);
																						})}
																				</div>
																			</div>
																		</div>
																	</>
																);
															}
														)}
													{/* ****new */}
													<PanelRow>
														{/* working */}
														<div className="pg-setting-input-text overflow-hidden  ">
															<div className="my-2 w-full ">
																<div className="px-3 mt-3 flex flex-col gap-3">
																	<div className="flex gap-3 items-center ">
																		<label>href</label>
																		<InputControl
																			value={
																				optionData.preloads[groupId].preloads
																					.href
																			}
																			onChange={(newVal) => {
																				// var preloads = optionData.preloads;
																				var visibleX = [...optionData.preloads];
																				visibleX[groupId].preloads.href =
																					newVal;
																				setoptionData({
																					...optionData,
																					preloads: visibleX,
																				});
																			}}
																		/>
																	</div>
																	<div className="flex gap-3 items-center my-2 ">
																		<label>As</label>
																		<PGDropdown
																			position="bottom right"
																			options={asOptions}
																			buttonTitle={
																				asOptions[
																					optionData.preloads[groupId].preloads
																						.as
																				] == undefined
																					? __("Choose", "combo-blocks")
																					: optionData.preloads[groupId]
																						.preloads.as
																			}
																			onChange={(option, index) => {
																				var visibleX = [...optionData.preloads];
																				visibleX[groupId].preloads.as =
																					option.value;
																				setoptionData({
																					...optionData,
																					preloads: visibleX,
																				});
																			}}
																			values={""}></PGDropdown>
																	</div>
																	<div className="flex gap-3 items-center ">
																		<label>Type</label>

																		<PGDropdown
																			position="bottom right"
																			btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
																			// variant="secondary"
																			options={typeOption}
																			// buttonTitle="Choose"
																			buttonTitle={
																				typeOption[
																					optionData.preloads[groupId].preloads
																						.type
																				] != undefined
																					? typeOption[
																						optionData.preloads[groupId]
																							.preloads.type
																					].label
																					: __("Choose", "combo-blocks")
																			}
																			onChange={(newVal) => {
																				var visibleX = [...optionData.preloads];
																				visibleX[groupId].preloads.type =
																					newVal.value;
																				setoptionData({
																					...optionData,
																					preloads: visibleX,
																				});
																			}}></PGDropdown>
																	</div>
																	<div className="flex gap-3 items-center ">
																		<label>Cross Origin</label>
																		<ToggleControl
																			className="!mb-0"
																			checked={
																				optionData.preloads[groupId].preloads
																					.crossorigin
																					? true
																					: false
																			}
																			onChange={(newVal) => {
																				var visibleX = [...optionData.preloads];
																				visibleX[groupId].preloads.crossorigin =
																					optionData?.preloads[groupId].preloads
																						.crossorigin
																						? false
																						: true;
																				setoptionData({
																					...optionData,
																					preloads: visibleX,
																				});
																			}}
																		/>
																	</div>
																	<div className="flex gap-3 items-center ">
																		<label>Media</label>
																		<InputControl
																			value={
																				optionData.preloads[groupId].preloads
																					.media
																			}
																			onChange={(newVal) => {
																				var visibleX = [...optionData.preloads];
																				visibleX[groupId].preloads.media =
																					newVal;
																				setoptionData({
																					...optionData,
																					preloads: visibleX,
																				});
																			}}
																		/>
																	</div>
																</div>
															</div>
														</div>

														{/* working */}
													</PanelRow>
												</PanelBody>
											);
										}
									)}
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									{/* <div
										// className="inline-block px-4 py-1 my-3 bg-gray-400 text-white rounded-sm cursor-pointer"
										className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
										onClick={(ev) => {
											var preloads = optionData.preloads ?? [];
											preloads.push({
												href: "",
												as: "",
												type: "",
												crossorigin: "",
												media: "",
											});
											setoptionData({
												...optionData,
												preloads: preloads,
											});
										}}>
										{__("Add", "combo-blocks")}
									</div> */}
									<div className="">
										{/* {optionData?.preloads?.map((x, i) => {
											return (
												<div
													key={i}
													className="pg-setting-input-text overflow-hidden  ">
													<PanelBody
														title={
															<>
																<span
																	
																	className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
																	onClick={(ev) => {
																		var preloads = optionData.preloads;
																		preloads.splice(i, 1);
																		setoptionData({
																			...optionData,
																			preloads: preloads,
																		});
																	}}>
																	<span className="text-[20px] text-white ">
																		&times;
																	</span>
																</span>
																<span className="mx-2">
																	{__("Preload", "combo-blocks")} {i + 1}
																</span>
															</>
														}
														initialOpen={false}>
														<div className="my-2 w-full ">
															<div className="px-3 mt-3 flex flex-col gap-3">
																<div className="flex gap-3 items-center ">
																	<label>href</label>
																	<InputControl
																		value={x.href}
																		onChange={(newVal) => {
																			var preloads = optionData.preloads;
																			preloads[i].href = newVal;
																			setoptionData({
																				...optionData,
																				preloads: preloads,
																			});
																		}}
																	/>
																</div>
																<div className="flex gap-3 items-center my-2 ">
																	<label>As</label>
																	<PGDropdown
																		position="bottom right"
																		options={asOptions}
																		buttonTitle={
																			asOptions[x.as] == undefined
																				? __("Choose", "combo-blocks")
																				: x.as
																		}
																		onChange={(option, index) => {
																			var preloads = optionData.preloads;
																			preloads[i].as = option.value;
																			setoptionData({
																				...optionData,
																				preloads: preloads,
																			});
																		}}
																		values={""}></PGDropdown>
																</div>
																<div className="flex gap-3 items-center ">
																	<label>Type</label>
																	
																	<PGDropdown
																		position="bottom right"
																		btnClass="flex w-full gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:!bg-gray-700 hover:text-white  focus:outline-none focus:bg-gray-700"
																		// variant="secondary"
																		options={typeOption}
																		// buttonTitle="Choose"
																		buttonTitle={
																			typeOption[x.type] != undefined
																				? typeOption[x.type].label
																				: __("Choose", "combo-blocks")
																		}
																		onChange={(newVal) => {
																			
																			var preloads = optionData.preloads;
																			preloads[i].type = newVal.value;
																			setoptionData({
																				...optionData,
																				preloads: preloads,
																			});
																		}}></PGDropdown>
																</div>
																<div className="flex gap-3 items-center ">
																	<label>Cross Origin</label>
																	<ToggleControl
																		className="!mb-0"
																		checked={
																			optionData?.preloads[i].crossorigin
																				? true
																				: false
																		}
																		onChange={(newVal) => {
																			var preloads = optionData.preloads;
																			preloads[i].crossorigin = optionData
																				?.preloads[i].crossorigin
																				? false
																				: true;
																			setoptionData({
																				...optionData,
																				preloads: preloads,
																			});
																		}}
																	/>
																</div>
																<div className="flex gap-3 items-center ">
																	<label>Media</label>
																	<InputControl
																		value={x.media}
																		onChange={(newVal) => {
																			var preloads = optionData.preloads;
																			preloads[i].media = newVal;
																			setoptionData({
																				...optionData,
																				preloads: preloads,
																			});
																		}}
																	/>
																</div>
															</div>
														</div>
													</PanelBody>
												</div>
											);
										})} */}
									</div>
								</div>
							</div>
						</div>
					</PGtab>
					<PGtab name="disableBlocks">
						<div className="text-2xl font-bold mb-7">
							{__("Enable/Disable Blocks", "combo-blocks")}
						</div>
						<div className="flex gap-2  items-center">
							<div
								className="    cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 whitespace-nowrap "
								onClick={(ev) => {
									var arr = [];
									Object.entries(pgBlocks).map((x) => {
										var index = x[0];
										var item = x[1];
										arr.push(item.value);
									});
									var blocks = { ...optionData.blocks, disabled: arr };
									setoptionData({ ...optionData, blocks: blocks });
								}}>
								{__("Disable All", "combo-blocks")}
							</div>
							<div
								className="    cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 whitespace-nowrap"
								onClick={(ev) => {
									var arr = [];
									Object.entries(pgBlocks).map((x) => {
										var index = x[0];
										var item = x[1];
										if (item.isPro) {
											if (isProFeature) {
												arr.push(item.value);
											}
										}
										//arr.push(item.value);
									});
									var blocks = { ...optionData.blocks, disabled: arr };
									setoptionData({ ...optionData, blocks: blocks });
									if (isProFeature) {
										setTimeout(() => {
											alert("Some blocks only avilable in pro");
										}, 500);
									}
								}}>
								{__("Enable All", "combo-blocks")}
							</div>
							<InputControl
								placeholder="Search Blocks"
								className="w-[400px] p-2"
								type="text"
								onChange={(newVal) => {
									setfilteredBlocks([]);
									var newOptions = [];
									Object.entries(pgBlocks).map((args) => {
										var index = args[0];
										var x = args[1];
										let position = x.label
											.toLowerCase()
											.search(newVal.toLowerCase());
										if (position < 0) {
											x.exclude = true;
										} else {
											x.exclude = false;
											newOptions.push(x);
										}
									});
									setfilteredBlocks(newOptions);
								}}
							/>
						</div>
						<div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">




							{filteredBlocks?.length == 0 && (
								<>
									{Object.entries(pgBlocks).map((x) => {
										var index = x[0];
										var item = x[1];
										return (
											<div
												className={[
													optionData?.blocks?.disabled?.includes(item.value)
														? " bg-red-400 text-white  rounded-sm   "
														: "    rounded-sm   bg-green-700 text-white",
												]}>
												<div className="flex items-center justify-between gap-2 flex-grow px-3 py-3 cursor-pointer ">
													<div className="text-white flex flex-1 items-center gap-1">
														<span className="flex-1 flex items-center">
															{optionData?.blocks?.disabled.includes(
																item.value
															) && <Icon icon={close} fill="white" />}
															{!optionData?.blocks?.disabled.includes(
																item.value
															) && <Icon icon={check} fill="white" />}
															<span className="text-[16px] capitalize">
																{item.label}
															</span>
														</span>
														{item.comingSoon && (
															<span className="bg-blue-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Coming Soon", "combo-blocks")}
															</span>
														)}
														{item.isBeta && (
															<span className="bg-blue-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Beta", "combo-blocks")}
															</span>
														)}


														{item.isPro && (
															<>
																{isProFeature && (
																	<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																		{__("Pro", "combo-blocks")}
																	</span>
																)}
															</>
														)}
													</div>
													{!item.comingSoon && (
														<div className="text-sm leading-normal flex items-center gap-2">
															{item.page.length > 0 && (
																<a
																	className="transition-all duration-300"
																	href={
																		item.page +
																		"?utm_source=blockList&utm_medium=blockLink&utm_campaign=CBPro"
																	}
																	data-pgTooltip="See Details"
																	data-pgTooltip-location="bottom">
																	<Icon icon={seen} fill="white" />
																</a>
															)}
															{item.preview.length > 0 && (
																<a
																	className="transition-all duration-300"
																	href={
																		item.preview +
																		"?utm_source=blockList&utm_medium=blockDemo&utm_campaign=CBPro"
																	}
																	data-pgTooltip="See Demo"
																	data-pgTooltip-location="bottom">
																	<Icon icon={link} fill="white" />
																</a>
															)}
															{item.docs.length > 0 && (
																<a
																	className="transition-all duration-300"
																	href={
																		item.docs +
																		"?utm_source=blockList&utm_medium=blockDocs&utm_campaign=CBPro"
																	}
																	data-pgTooltip="Documentation"
																	data-pgTooltip-location="bottom">
																	<Icon icon={shortcode} fill="white" />
																</a>
															)}
															<ToggleControl
																className="!mb-0"
																checked={
																	optionData?.blocks?.disabled?.includes(
																		item.value
																	)
																		? true
																		: false
																}
																onChange={(e) => {
																	if (item.isPro == true) {
																		if (isProFeature) {
																			alert("Only Available in pro");
																			return;
																		}
																	}
																	if (
																		optionData.blocks.disabled.includes(
																			item.value
																		)
																	) {
																		var arr = optionData.blocks.disabled.filter(
																			(val) => val !== item.value
																		);
																		var blocks = {
																			...optionData.blocks,
																			disabled: arr,
																		};
																		setoptionData({
																			...optionData,
																			blocks: blocks,
																		});
																	} else {
																		optionData.blocks.disabled.push(item.value);
																		setoptionData({
																			...optionData,
																			blocks: optionData.blocks,
																		});
																	}
																}}
															/>
														</div>
													)}
												</div>
											</div>
										);
									})}
								</>
							)}
							{filteredBlocks.length > 0 && (
								<>
									{filteredBlocks.map((item) => {
										//var index = x[0];
										//var item = x[1];
										return (
											<div
												className={[
													optionData?.blocks?.disabled?.includes(item.value)
														? " bg-red-400 text-white  rounded-sm   "
														: "    rounded-sm   bg-green-700 text-white",
												]}>
												<div className="flex items-center justify-between gap-2 flex-grow px-3 py-3 cursor-pointer ">
													<div className="text-white flex items-center gap-1">
														{optionData?.blocks?.disabled.includes(
															item.value
														) && <Icon icon={close} fill="white" />}
														{!optionData?.blocks?.disabled.includes(
															item.value
														) && <Icon icon={check} fill="white" />}
														<span className="text-[16px]">{item.label}</span>
														{item.comingSoon && (
															<span className="bg-blue-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Coming Soon", "combo-blocks")}
															</span>
														)}
														{item.isPro && (
															<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Pro", "combo-blocks")}
															</span>
														)}
													</div>
													<div className="text-sm leading-normal flex items-center gap-2">
														{item.page.length > 0 && (
															<a
																className="transition-all duration-300"
																href={
																	item.page +
																	"?utm_source=blockList&utm_medium=blockLink&utm_campaign=CBPro"
																}
																data-pgTooltip="See Details"
																data-pgTooltip-location="bottom">
																<Icon icon={seen} fill="white" />
															</a>
														)}
														{item.preview.length > 0 && (
															<a
																className="transition-all duration-300"
																href={
																	item.preview +
																	"?utm_source=blockList&utm_medium=blockDemo&utm_campaign=CBPro"
																}
																data-pgTooltip="See Demo"
																data-pgTooltip-location="bottom">
																<Icon icon={link} fill="white" />
															</a>
														)}
														{item.docs.length > 0 && (
															<a
																className="transition-all duration-300"
																href={
																	item.docs +
																	"?utm_source=blockList&utm_medium=blockDocs&utm_campaign=CBPro"
																}
																data-pgTooltip="Documentation"
																data-pgTooltip-location="bottom">
																<Icon icon={shortcode} fill="white" />
															</a>
														)}
														<ToggleControl
															className="!mb-0"
															checked={
																optionData?.blocks?.disabled?.includes(
																	item.value
																)
																	? true
																	: false
															}
															onChange={(e) => {
																if (item.isPro == true) {
																	if (isProFeature) {
																		alert("Only Available in pro");
																		return;
																	}
																}
																if (
																	optionData.blocks.disabled.includes(
																		item.value
																	)
																) {
																	var arr = optionData.blocks.disabled.filter(
																		(val) => val !== item.value
																	);
																	var blocks = {
																		...optionData.blocks,
																		disabled: arr,
																	};
																	setoptionData({
																		...optionData,
																		blocks: blocks,
																	});
																} else {
																	optionData.blocks.disabled.push(item.value);
																	setoptionData({
																		...optionData,
																		blocks: optionData.blocks,
																	});
																}
															}}
														/>
													</div>
												</div>
											</div>
										);
									})}
								</>
							)}
						</div>
					</PGtab>
					<PGtab name="license">
						<div className="text-2xl font-bold mb-7">
							{__("License", "combo-blocks")}
						</div>



						<div className="flex items-start gap-3">
							<label className=" text-lg  w-[300px]">
								{__("License key", "combo-blocks")}
							</label>
							<div>
								<div className="flex items-center gap-3">
									<InputControl
										className="w-[400px] p-2"
										type="text"
										value={
											optionData.license?.license_key?.key == undefined
												? ""
												: optionData.license.license_key.key
										}
										onChange={(newVal) => {
											var licenseX = {
												...optionData.license,
												license_key: { key: newVal },
											};
											setoptionData({ ...optionData, license: licenseX });
										}}
									/>
								</div>
								<div className="flex gap-3 ">
									<div
										className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
										onClick={(ev) => {
											activateLicense();
										}}>
										{__("Activate", "combo-blocks")}
									</div>
									{/* {optionData.license?.activated && (
										<div
											className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  bg-amber-500 !text-white font-medium !rounded hover:!bg-amber-600 hover:text-white focus:outline-none focus:bg-gray-700"
											onClick={(ev) => {
												deactivateLicense();
											}}>
											{__("Deactivate", "combo-blocks")}
										</div>
									)} */}
									<div
										className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-red-400 !text-white font-medium !rounded hover:!bg-red-600 hover:text-white focus:outline-none focus:bg-gray-700"
										onClick={(ev) => {
											resetLicense();
										}}>
										Reset
									</div>
									<div
										className="pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700"
										onClick={(ev) => {
											checkLicense();
										}}>
										Check
									</div>
								</div>

								{licenseCheckedData != null && (
									<div className="bg-gray-400 p-2 w-[500px] my-3">
										<code className="break-all	break-words	 ">{licenseCheckedData}</code>
									</div>
								)}






								<div className="my-5">

									{optionData.license?.license_status == "active" && (
										<div className="flex gap-3">
											<span>{__("Status", "combo-blocks")}:</span>
											{optionData.license?.license_status == "active" && (
												<span className="text-green-700 mx-3  font-bold">
													{__("Activated", "combo-blocks")}
												</span>
											)}
										</div>
									)}


									{/* {optionData.license?.deactivated && (
											<span className="text-red-700 font-bold">
												{__("Deactivated", "combo-blocks")}
											</span>
										)} */}

									{optionData.license?.date_expiry && (
										<div className="flex gap-3">
											<span>{__("Date expiry", "combo-blocks")}:</span>
											{optionData.license?.date_expiry == "active" && (
												<span className="text-green-700 mx-3 font-bold">
													{optionData.license?.date_expiry}
												</span>
											)}
										</div>

									)}



									{/* <div>
										{__("Activation Limit", "combo-blocks")}:
										{optionData.license?.license_key?.activation_limit}
									</div> */}
									{/* <div>
										{__("Activation Usage", "combo-blocks")}:
										{optionData.license?.license_key?.activation_usage}
									</div>
									{optionData.license?.error != undefined &&
										optionData.license?.error.length != 0 && (
											<div className="text-red-500">
												{__("Error", "combo-blocks")}: {optionData.license?.error}
											</div>
										)}
									{licenseError != null && (
										<div className="text-red-500">
											{__("Error", "combo-blocks")}: {licenseError}
										</div>
									)} */}
								</div>
								<div>
									<ul className="list-disc list-inside ">
										<li><a href="#" className="text-gray-800 text-base marker:text-gray-800 hover:text-red-400 ">
											{__("How to activate license?", "combo-blocks")}
										</a>
										</li>
										<li><a href="https://pickplugins.com/my-account/license-keys/" className="text-gray-800 text-base marker:text-gray-800 hover:text-red-400 ">
											{__("See License Keys", "combo-blocks")}
										</a>
										</li>


									</ul>
								</div>
							</div>
						</div>
					</PGtab>
					<PGtab name="globalStyles">
						<div className="text-2xl font-bold mb-7">
							{__("Global Styles", "combo-blocks")}
						</div>
						<p className="my-3">
							{__("Global styles will used to all pages.", "combo-blocks")}
						</p>
						<div
							className={`${isProFeature ? "pg-blur	pointer-events-none" : ""}`}>
							<PGGlobalStyles
								args={
									optionData.globalStyles == undefined
										? optionDataDefault.globalStyles
										: optionData.globalStyles
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, globalStyles: prams });
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="keyframes">
						<div className="text-2xl font-bold mb-7">
							{__("Keyframes", "combo-blocks")}
						</div>
						<div
						// className={`${isProFeature ? "pg-blur	pointer-events-none" : ""}`}
						>
							{optionData.keyframes != null && (
								<PGcssKeyframes
									keyframes={optionData.keyframes}
									onChange={(args) => {
										setoptionData({ ...optionData, keyframes: args });
									}}
								/>
							)}
						</div>
					</PGtab>
					<PGtab name="colors">
						<div className="text-2xl font-bold mb-7">
							{__("Add/Remove Colors", "combo-blocks")}
						</div>
						<div className="my-3">
							<div
								// className="inline-block px-4 py-1 bg-gray-400 text-white rounded-sm cursor-pointer"
								className="bg-gray-700 inline-block gap-2 justify-center my-4 cursor-pointer py-2 px-8 capitalize  text-base font-semibold text-white rounded  focus:outline-none focus:bg-gray-700"
								onClick={(ev) => {
									var colors = optionData.colors;
									colors.push("#ffffff");
									setoptionData({ ...optionData, colors: colors });
								}}>
								{__("Add", "combo-blocks")}
							</div>
							{optionData?.colors?.map((x, i) => {
								var placeholderStyle = {
									backgroundImage:
										"repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0),repeating-linear-gradient(45deg,#e0e0e0 25%,transparent 0,transparent 75%,#e0e0e0 0,#e0e0e0)",
									backgroundPosition: "0 0,10px 10px",
									backgroundSize: "20px 20px",
									boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
									cursor: "pointer",
								};
								var btnStyle = {
									backgroundColor: x,
									boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 20%)",
									cursor: "pointer",
								};
								return (
									<div className="flex gap-3 items-center border my-2">
										<div>
											<span
												// className="bg-red-500 p-0 px-1 rounded-sm cursor-pointer"
												className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer "
												onClick={(ev) => {
													var colors = optionData.colors;
													colors.splice(i, 1);
													setoptionData({ ...optionData, colors: colors });
												}}>
												{/* <Icon fill={"#fff"} icon={close} /> */}
												<span className="text-[20px] text-white font-medium ">
													&times;
												</span>
											</span>
										</div>
										<div
											className="px-3 py-1 cursor-pointer min-w-[80px] flex justify-center bg-gray-400 text-white rounded-sm"
											title="Click to copy."
											onClick={(ev) => {
												copyObjectToClipboard(x);
											}}>
											{x}
										</div>
										<div style={placeholderStyle}>
											<span
												className="w-[120px] h-[30px] inline-block border"
												style={btnStyle}
												onClick={(ev) => {
													ev.preventDefault();
													ev.stopPropagation();
													setcolorPopup(colorPopup == null ? i : null);
												}}></span>
											{colorPopup != null && colorPopup == i && (
												<Popover position="bottom right">
													<div className="p-2">
														<ColorPalette
															value={x}
															enableAlpha
															onChange={(newVal) => {
																var colors = optionData.colors;
																colors[i] = newVal;
																setoptionData({
																	...optionData,
																	colors: colors,
																});
															}}
														/>
													</div>
												</Popover>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</PGtab>
					<PGtab name="postType">
						<div className="text-2xl font-bold mb-7">Post Type</div>
						<p className="my-3">
							{__(
								"Create your own post type. You can read official documentations here",
								"combo-blocks"
							)}{" "}
							https://developer.wordpress.org/reference/hooks/register_post_type_args/
						</p>
						<div className={``}>
							<PGPostTypes
								args={
									optionData.postTypes == undefined
										? optionDataDefault.postTypes
										: optionData.postTypes
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, postTypes: prams });
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="taxonomiesBuilder">
						<div className="text-2xl font-bold mb-7">Taxonomy Builder</div>
						<p className="my-3">
							{__(
								"Create your own taxonomy. You can read official documentations here",
								"combo-blocks"
							)}{" "}
							https://developer.wordpress.org/reference/functions/register_taxonomy/
						</p>
						<div className={``}>
							<PGTaxonomies
								args={
									optionData.taxonomies == undefined
										? optionDataDefault.taxonomies
										: optionData.taxonomies
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, taxonomies: prams });
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="roleMaker">
						<div className="text-2xl font-bold mb-7">Role Maker</div>
						<p className="my-3">
							{__(
								"Create roles. You can read official documentations here",
								"combo-blocks"
							)}{" "}
							https://developer.wordpress.org/reference/functions/add_role/
						</p>
						<div className={``}>
							<PGroleMaker
								args={
									optionData.roles == undefined
										? optionDataDefault.roles
										: optionData.roles
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, roles: prams });
								}}
							/>
						</div>
					</PGtab>







					<PGtab name="addons">
						<div className="text-2xl font-bold mb-7">
							{__("Addons", "combo-blocks")}
						</div>
						<div className="flex gap-2  items-center">
							<div
								className="    cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 whitespace-nowrap "
								onClick={(ev) => {
									var arr = [];
									Object.entries(pgAddons).map((x) => {
										var index = x[0];
										var item = x[1];
										if (item.isPro) {
											if (!isProFeature) {
												arr.push(item.value);
											}
										} else {
											arr.push(item.value);
										}
									});
									var addons = { ...optionData.addons, enabled: arr };
									setoptionData({ ...optionData, addons: addons });
									if (isProFeature) {
										setTimeout(() => {
											alert("Some features only avilable in pro");
										}, 500);
									}
								}}>
								{__("Enable All", "combo-blocks")}
							</div>
							<div
								className="    cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:!bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 whitespace-nowrap"
								onClick={(ev) => {
									var arr = [];
									var addons = { ...optionData.addons, enabled: arr };
									setoptionData({ ...optionData, addons: addons });
								}}>
								{__("Disable All", "combo-blocks")}
							</div>
							<InputControl
								placeholder="Search Addons"
								className="w-[400px] p-2"
								type="text"
								onChange={(newVal) => {
									setfilteredAddons([]);
									var newOptions = [];
									Object.entries(pgAddons).map((args) => {
										var index = args[0];
										var x = args[1];
										let position = x.label
											.toLowerCase()
											.search(newVal.toLowerCase());
										if (position < 0) {
											x.exclude = true;
										} else {
											x.exclude = false;
											newOptions.push(x);
										}
									});
									setfilteredAddons(newOptions);
								}}
							/>
						</div>
						<div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
							{filteredAddons?.length == 0 && (
								<>
									{Object.entries(pgAddons).map((x, i) => {
										var index = x[0];
										var item = x[1];
										return (
											<div
												key={i}
												className={[
													optionData?.addons?.enabled?.includes(item.value)
														? "  rounded-sm   bg-green-700 text-white  "
														: "   bg-red-400 text-white  rounded-sm",
												]}>
												<div className="flex items-center justify-between gap-2 flex-grow px-3 py-3 cursor-pointer ">
													<div className="text-white flex flex-1 items-center gap-1">
														<span className="flex-1 flex items-center">
															{optionData?.addons?.enabled.includes(
																item.value
															) && <Icon icon={check} fill="white" />}
															{!optionData?.addons?.enabled.includes(
																item.value
															) && <Icon icon={close} fill="white" />}
															<span className="text-[16px]">{item.label}</span>
														</span>
														{item.comingSoon && (
															<span className="bg-blue-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Coming Soon", "combo-blocks")}
															</span>
														)}
														{item.isPro && (
															<>
																{isProFeature && (
																	<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																		{__("Pro", "combo-blocks")}
																	</span>
																)}
															</>
														)}
													</div>
													{!item.comingSoon && (
														<div className="text-sm leading-normal flex items-center gap-2">
															{item.link.length > 0 && (
																<a
																	href={
																		item.link +
																		"?utm_source=adonsList&utm_medium=adonsDetails&utm_campaign=CBPro"
																	}>
																	<Icon icon={link} fill="white" />
																</a>
															)}
															<ToggleControl
																className="!mb-0"
																checked={
																	optionData?.addons?.enabled?.includes(
																		item.value
																	)
																		? true
																		: false
																}
																onChange={(e) => {
																	if (item.isPro == true) {
																		if (isProFeature) {
																			alert("Only Available in pro");
																			return;
																		}
																	}
																	if (
																		optionData?.addons?.enabled.includes(
																			item.value
																		)
																	) {
																		var arr =
																			optionData?.addons?.enabled.filter(
																				(val) => val !== item.value
																			);
																		var addons = {
																			...optionData.addons,
																			enabled: arr,
																		};
																		setoptionData({
																			...optionData,
																			addons: addons,
																		});
																	} else {
																		optionData?.addons?.enabled.push(
																			item.value
																		);
																		setoptionData({
																			...optionData,
																			addons: optionData.addons,
																		});
																	}
																}}
															/>
														</div>
													)}
												</div>
											</div>
										);
									})}
								</>
							)}
							{filteredAddons.length > 0 && (
								<>
									{filteredAddons.map((item) => {
										//var index = x[0];
										//var item = x[1];
										return (
											<div
												className={[
													optionData?.addons?.enabled?.includes(item.value)
														? "  rounded-sm   bg-green-700 text-white  "
														: "   bg-red-400 text-white  rounded-sm",
												]}>
												<div className="flex items-center justify-between gap-2 flex-grow px-3 py-3 cursor-pointer ">
													<div className="text-white flex items-center gap-1">
														{optionData?.addons?.enabled.includes(
															item.value
														) && <Icon icon={check} fill="white" />}
														{!optionData?.addons?.enabled.includes(
															item.value
														) && <Icon icon={close} fill="white" />}
														<span className="text-[16px]">{item.label}</span>
														{item.comingSoon && (
															<span className="bg-blue-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																{__("Coming Soon", "combo-blocks")}
															</span>
														)}
														{item.isPro && (
															<>
																{isProFeature && (
																	<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
																		{__("Pro", "combo-blocks")}
																	</span>
																)}
															</>
														)}
													</div>
													<div className="text-sm leading-normal flex items-center gap-2">
														{item.link.length > 0 && (
															<a
																className="transition-all duration-300"
																href={
																	item.link +
																	"?utm_source=adonsList&utm_medium=adonsDetails&utm_campaign=CBPro"
																}
																data-pgTooltip="See Details"
																data-pgTooltip-location="bottom">
																<Icon icon={link} fill="white" />
															</a>
														)}
														<ToggleControl
															className="!mb-0"
															checked={
																optionData?.addons?.enabled?.includes(
																	item.value
																)
																	? true
																	: false
															}
															onChange={(e) => {
																if (item.isPro == true) {
																	if (isProFeature) {
																		alert("Only Available in pro");
																		return;
																	}
																}
																if (
																	optionData?.addons?.enabled.includes(
																		item.value
																	)
																) {
																	var arr = optionData?.addons?.enabled.filter(
																		(val) => val !== item.value
																	);
																	var addons = {
																		...optionData.addons,
																		enabled: arr,
																	};
																	setoptionData({
																		...optionData,
																		addons: addons,
																	});
																} else {
																	optionData?.addons?.enabled.push(item.value);
																	setoptionData({
																		...optionData,
																		addons: optionData.addons,
																	});
																}
															}}
														/>
													</div>
												</div>
											</div>
										);
									})}
								</>
							)}
						</div>
					</PGtab>
					<PGtab name="apiKeys">
						<div className="text-2xl font-bold mb-7">
							{__("API Keys", "combo-blocks")}
						</div>
						<p className="my-3">
							{__(
								"Create your own post type. You can read official documentations here",
								"combo-blocks"
							)}
						</p>
						<div className={``}>
							<PGAPIKeys
								args={
									optionData.apiKeys == undefined
										? optionDataDefault.apiKeys
										: optionData.apiKeys
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, apiKeys: prams });
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="blockSettings">
						<div className="text-2xl font-bold mb-7">
							{__("Block Settings", "combo-blocks")}
						</div>
						<p className="my-3"></p>
						<div className={``}>
							<PGDashboardBlockSettings
								args={
									optionData.blockSettings == undefined
										? optionDataDefault.blockSettings
										: optionData.blockSettings
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, blockSettings: prams });
								}}
							/>
						</div>
					</PGtab>
					{/* <PGtab name="customScript">
						<div className="text-2xl font-bold mb-7">
							{__("Custom Scripts", "combo-blocks")}
						</div>
						<div className={``}>
							<PGCustomScript
								args={
									optionData.customScript == undefined
										? optionDataDefault.customScript
										: optionData.customScript
								}
								onChange={(prams) => {
									setoptionData({ ...optionData, customScript: prams });
								}}
							/>
						</div>
					</PGtab> */}
					<PGtab name="export/import">
						<div>
							<div className="text-2xl font-bold mb-7">
								{__("Export/Import Settings", "combo-blocks")}
							</div>
							<div className="flex gap-4">
								<h3 className="text-lg w-[300px] m-0">
									{__("Import", "combo-blocks")}
								</h3>
								<div className="flex flex-col gap-4 items-start ">
									<p className="!m-0 ">
										{__("Please select the data file to import", "combo-blocks")}:{" "}
									</p>
									<div className="flex items-start">
										<div className="flex flex-col">
											<input
												type="file"
												name=""
												id=""
												accept=".json"
												onChange={handleFileChange}
											/>
											<p className="text-[#ec942c] text-xs ">
												{__("Supported file type", "combo-blocks")}: .json
											</p>
										</div>
										<div>
											<button
												className="pg-font flex gap-2 justify-center cursor-pointer py-2 px-4 capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
												onClick={handleImport}>
												{importStatus === "run" ? "Importing..." : "Import"}
											</button>
											{importStatus === "stop" && (
												<p className="text-emerald-500 m-0 ">
													{__("Imported", "combo-blocks")}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex gap-4">
								<h3 className="text-lg w-[300px] m-0 ">
									{__("Export", "combo-blocks")}
								</h3>
								<div className="flex gap-4 items-center ">
									<p className="!m-0 ">
										{__("Export settings", "combo-blocks")}:{" "}
									</p>
									<ExportButton />
								</div>
							</div>
						</div>
					</PGtab>
				</PGtabs>
			</div>
		</div>
	);
}
class PGDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		var { onChange, setEnable } = this.props;
		return <Html setEnable={setEnable} warn={this.state.showWarning} />;
	}
}
export default PGDashboard;
