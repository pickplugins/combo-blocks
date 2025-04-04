import apiFetch from "@wordpress/api-fetch";
import {
	store as blockEditorStore,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	createBlocksFromInnerBlocksTemplate,
	registerBlockType,
} from "@wordpress/blocks";
import {
	__experimentalInputControl as InputControl,
	PanelRow,
	SelectControl,
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import { select, useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { brush, close, Icon, settings } from "@wordpress/icons";
import ComboBlocksVariationsPicker from "../../components/block-variations-picker";
import PGcssClassPicker from "../../components/css-class-picker";
import PGDropdown from "../../components/dropdown";
import PGLibraryBlockVariations from "../../components/library-block-variations";
import PGStyles from "../../components/styles";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import PGtoggle from "../../components/toggle";
import PGVisible from "../../components/visible";
import customTags from "../../custom-tags";
import metadata from "./block.json";
import onProcessArgs from "./on-process-args";

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
				<rect
					x="1"
					y="57.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint0_linear_61_856)"
					stroke="#86402F"
					strokeWidth="2"
				/>
				<rect
					x="1"
					y="87.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint1_linear_61_856)"
					stroke="#86402F"
					strokeWidth="2"
				/>
				<rect
					x="1"
					y="27.0454"
					width="158"
					height="18.9091"
					rx="1"
					fill="url(#paint2_linear_61_856)"
					stroke="#86402F"
					strokeWidth="2"
				/>
				<path
					d="M108.718 90.6724C108.555 90.587 108.362 90.5651 108.174 90.6236L95.9704 94.2712C95.4243 94.4164 95.2685 95.1821 95.7142 95.5301L98.4785 97.8235L108.718 90.6724Z"
					fill="#F5F5F5"
				/>
				<path
					d="M109.052 91.0337C107.933 91.8185 98.8662 98.1457 98.8662 98.1457L102.799 101.408C103.139 101.702 103.707 101.592 103.907 101.193C103.907 101.193 109.026 91.6656 109.026 91.6656C109.133 91.4631 109.143 91.2337 109.052 91.0337Z"
					fill="#F5F5F5"
				/>
				<path
					d="M98.1806 98.2114C98.1586 98.2456 98.1489 98.2871 98.1489 98.3285V100.729C98.127 101.33 98.9101 101.696 99.3517 101.278C99.3517 101.278 100.594 100.21 100.594 100.21C100.35 100.013 98.1806 98.2114 98.1806 98.2114Z"
					fill="#F5F5F5"
				/>
				<rect
					x="50"
					y="94.2271"
					width="40.9091"
					height="4.54545"
					fill="#F5F5F5"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_61_856"
						x1="0"
						y1="66.4999"
						x2="160"
						y2="66.4999"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_856"
						x1="0"
						y1="96.4999"
						x2="160"
						y2="96.4999"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#FC7F64" />
						<stop offset="1" stopColor="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_61_856"
						x1="0"
						y1="36.4999"
						x2="160"
						y2="36.4999"
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
		var form = attributes.form;
		var onSubmit = attributes.onSubmit;
		var onProcess = attributes.onProcess;
		var afterSubmit = attributes.afterSubmit;
		var submitTriggers = attributes.submitTriggers;
		var errorWrap = attributes.errorWrap;
		var responsesMsgWrap = attributes.responsesMsgWrap;
		var input = attributes.input;
		var textarea = attributes.textarea;
		var selectInput = attributes.selectInput;
		var label = attributes.label;
		var blockCssY = attributes.blockCssY;
		var breakPointX = myStore.getBreakPoint();
		let isProFeature = applyFilters("isProFeature", true);
		var [blockTypes, setblockTypes] = useState(
			wp.data.select("core/block-editor").getBlocks()
		);
		var [inputFieldsBlocks, setinputFieldsBlocks] = useState([]);
		var [blockTypesPostGrid, setblockTypesPostGrid] = useState({});
		var [userRoles, setuserRoles] = useState({});
		var [postTypes, setpostTypes] = useState({});
		var [postStatuses, setpostStatuses] = useState({});
		var [enableDatePicker, setenableDatePicker] = useState(false);
		var [mailpickerLists, setmailpickerLists] = useState(null);
		var [fluentcrmLists, setfluentcrmLists] = useState(null);
		var [fluentcrmTags, setfluentcrmTags] = useState(null);
		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		var formSelector = blockClass + " form";
		var errorWrapSelector = blockClass + " .error-wrap";
		var responsesMsgWrapSelector = blockClass + " .pg-form-responses";
		var inputSelector = blockClass + " input";
		var textareaSelector = blockClass + " textarea";
		var selectInputSelector = blockClass + " select";
		var labelSelector = blockClass + " label";
		var onProcessArgsX = applyFilters(
			"comboBlocksFormWrapOnProcess",
			onProcessArgs
		);

		var [onProcessArgsFiltered, setonProcessArgsFiltered] = useState(null);
		const { replaceInnerBlocks } = useDispatch(blockEditorStore);
		const allInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId),
			[clientId]
		);
		var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);
		function formInputFieldsBlocks(allInnerBlocks, lists = []) {
			allInnerBlocks.map((blockData) => {
				var innerBlocks = blockData.innerBlocks;
				var attr = blockData.attributes;
				var name = blockData.name;
				var blockId = attr.blockId;
				if (
					name == "combo-blocks/form-field-input" ||
					name == "combo-blocks/form-field-textarea" ||
					name == "combo-blocks/form-field-checkbox"
				) {
					lists.push({
						label: attr.label.options.text,
						value: attr.input.options.name,
					});
				}
				if (name == "combo-blocks/form-field-radio") {
					lists.push({
						label: attr.label.options.text,
						value: attr.radio.options.name,
					});
				}
				if (name == "combo-blocks/form-field-select") {
					lists.push({
						label: attr.label.options.text,
						value: attr.select.options.name,
					});
				}
				if (innerBlocks.length > 0) {
					formInputFieldsBlocks(innerBlocks);
				}
			});
			setinputFieldsBlocks(lists);
		}
		useEffect(() => {
			var onProcessArgsNew = {};
			Object.entries(onProcessArgsX).map((args) => {
				var index = args[0];
				var item = args[1];
				var formTypeScope = item.formTypeScope;
				formTypeScope.map((type) => {
					if (onProcessArgsNew[type] == undefined) {
						onProcessArgsNew[type] = {};
					}
					if (onProcessArgsNew[type][index] == undefined) {
						onProcessArgsNew[type][index] = {};
					}
					onProcessArgsNew[type][index] = item;
				});
			});
			setonProcessArgsFiltered(onProcessArgsNew);
		}, []);
		useEffect(() => {
			formInputFieldsBlocks(allInnerBlocks);
		}, [allInnerBlocks]);
		useEffect(() => {
			var grids = [];
			formInputFieldsBlocks(allInnerBlocks);
			blockTypes.map((item) => {
				var attr = item.attributes;
				var blockId = attr.blockId;
				grids.push({ label: blockId, value: blockId });
			});
			setblockTypesPostGrid(grids);
		}, [blockTypes]);
		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);
		var [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
		useEffect(() => {
			var onProcessArgsNew = {};
			Object.entries(onProcessArgsX).map((args) => {
				var index = args[0];
				var item = args[1];
				var formTypeScope = item.formTypeScope;
				formTypeScope.map((type) => {
					if (onProcessArgsNew[type] == undefined) {
						onProcessArgsNew[type] = {};
					}
					if (onProcessArgsNew[type][index] == undefined) {
						onProcessArgsNew[type][index] = {};
					}
					onProcessArgsNew[type][index] = item;
				});
			});
			setonProcessArgsFiltered(onProcessArgsNew);
			var blockIdX = "pg" + clientId.split("-").pop();
			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
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
			apiFetch({
				path: "/combo-blocks/v2/user_roles_list",
				method: "POST",
				data: {},
			}).then((res) => {
				var roles = res.roles == undefined ? [] : res.roles;
				var rolesX = {};
				Object.entries(roles).map((role) => {
					var index = role[0];
					var val = role[1];
					rolesX[index] = { label: val, value: index };
				});
				setuserRoles(rolesX);
			});
			apiFetch({
				path: "/combo-blocks/v2/post_types",
				method: "POST",
				data: {},
			}).then((res) => {
				var types = [];
				Object.entries(res).map((x) => {
					var postTypeId = x[0];
					var postTypeLabel = x[1];
					types.push({ label: postTypeLabel, value: postTypeId });
				});
				setpostTypes(types);
			});
			apiFetch({
				path: "/combo-blocks/v2/get_post_statuses",
				method: "POST",
				data: {},
			}).then((res) => {
				var types = [];
				Object.entries(res).map((x) => {
					var postTypeId = x[0];
					var postTypeLabel = x[1];
					types.push({ label: postTypeLabel, value: postTypeId });
				});
				setpostStatuses(types);
			});
			apiFetch({
				path: "/combo-blocks/v2/fluentcrm_lists",
				method: "POST",
				data: {},
			}).then((res) => {
				var lists = {};
				Object.entries(res).map((x) => {
					var id = x[0];
					var listData = x[1];
					lists[listData.slug] = {
						label: listData.title,
						slug: listData.slug,
						id: id,
					};
				});
				setfluentcrmLists(lists);
			});
			apiFetch({
				path: "/combo-blocks/v2/fluentcrm_tags",
				method: "POST",
				data: {},
			}).then((res) => {
				var tags = {};
				Object.entries(res).map((x) => {
					var id = x[0];
					var listData = x[1];
					tags[listData.slug] = {
						label: listData.title,
						slug: listData.slug,
						id: id,
					};
				});
				setfluentcrmTags(tags);
			});
			apiFetch({
				path: "/combo-blocks/v2/mailpicker_lists",
				method: "POST",
				data: {},
			}).then((res) => {
				var lists = {};
				Object.entries(res).map((x) => {
					var id = x[0];
					var listData = x[1];
					lists[listData.slug] = {
						label: listData.title,
						slug: listData.slug,
						id: id,
					};
				});
				setmailpickerLists(lists);
			});
		}, [clientId]);
		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[formSelector] = form;
			blockCssObj[errorWrapSelector] = errorWrap;
			blockCssObj[responsesMsgWrapSelector] = responsesMsgWrap;
			blockCssObj[inputSelector] = input;
			blockCssObj[textareaSelector] = textarea;
			blockCssObj[selectInputSelector] = selectInput;
			blockCssObj[labelSelector] = label;
			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);
		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);
		var onSubmitArgsBasic = {
			submitConfirm: {
				label: __("Submit Confirm", "combo-blocks"),
				description: "confirm form submit",
				args: { id: "submitConfirm", messages: [] },
			},
			recaptchaValidation: {
				label: __("Recaptcha Validation", "combo-blocks"),
				description: "Validate reCaptcha responses.",
				args: { id: "recaptchaValidation" },
				//isPro: true
			},
			simpleMath: {
				label: __("Simple Math", "combo-blocks"),
				description: "Simple Math",
				args: { id: "simpleMath", type: "", conditions: [] },
				isPro: true,
			},
		};
		let onSubmitArgs = applyFilters(
			"comboBlocksFormWrapOnSubmitArgs",
			onSubmitArgsBasic
		);

		var submitTriggersPrams = {
			onChangeForm: {
				label: __("On Change Form", "combo-blocks"),
				description: "On change form.",
				args: { id: "onChangeForm" },
				// isPro: true
			},
			onChangeFields: {
				label: __("On Change Form Fields", "combo-blocks"),
				description: "On change form fields.",
				args: { id: "onChangeFields", value: "" },
				// isPro: true
			},

			clickElement: {
				label: __("Click Element", "combo-blocks"),
				description: __(
					"After clicking an element by id or class",
					"combo-blocks"
				),
				args: { id: "clickElement", value: "" },
				// isPro: true,
			},
			dateCountdownExpired: {
				label: __("Date Countdown Expired", "combo-blocks"),
				description: __(
					"After expiration from date countdown block",
					"combo-blocks"
				),
				args: { id: "dateCountdownExpired", value: "", once: false },
				// isPro: true,
			},
			onExit: {
				label: __("On Exit", "combo-blocks"),
				description: __("Before exit browser tab.", "combo-blocks"),
				args: { id: "onExit", value: 1 },
				// isPro: true,
			},
		};
		// submitTriggersPrams = applyFilters('PGFormWrapSubmitTriggersArgs', submitTriggersPrams);

		var formWrapAfterSubmitBasic = {
			showResponse: {
				label: __("Show Response", "combo-blocks"),
				description: "Show Response Message",
				args: { id: "showResponse", message: "" },
			},
			// delay: {
			// 	label: "Delay",
			// 	description: "Delay",
			// 	args: { id: "delay", time: 1000 },
			// },
			showText: {
				label: __("Show Text", "combo-blocks"),
				description: "Show Text",
				args: { id: "showText", successMessage: "", failedMessage: "" },
			},
			refreshPage: {
				label: __("Refresh Page", "combo-blocks"),
				description: "Refresh Page",
				args: { id: "refreshPage", delay: "" },
			},
			//loggedOut: { label: 'Logged Out', description: 'Logged out current user', args: { id: 'loggedOut', message: '' } },
			//loggedIn: { label: 'Logged In', description: 'Logged in user', args: { id: 'loggedIn', message: '' } },
			loggedOut: {
				label: __("Logged Out", "combo-blocks"),
				description: "Logged out current user",
				args: { id: "loggedOut", redirect: "" },
			},
			hideForm: {
				label: __("Hide Form", "combo-blocks"),
				description: "Hide Form",
				args: { id: "hideForm", message: "" },
			},
			// showQuizResult: {
			// 	label: __("Show Quiz Result", "combo-blocks"),
			// 	description: "Show Quiz Result",
			// 	args: { id: "showQuizResult", message: "" },
			// },
			clearForm: {
				label: __("Clear Form", "combo-blocks"),
				description: "Clear Form",
				args: { id: "clearForm", message: "" },
			},
			redirectToURL: {
				label: __("Redirect To URL", "combo-blocks"),
				description: "Redirect To URL",
				args: { id: "redirectToURL", value: "" },
				isPro: true,
			},
			buildGETRequest: {
				label: __("build GET Request", "combo-blocks"),
				description: "Build URL for GET request",
				args: { id: "buildGETRequest", value: "" },
				isPro: true,
			},
			hidePopup: {
				label: __("Hide Popup", "combo-blocks"),
				description: "Hide Popup",
				args: { id: "hidePopup", delay: 0, message: "" },
				isPro: true,
			},
			//delay: { label: 'Delay', description: 'Delay', args: { id: 'delay', delay: 1000 } },
		};
		let afterSubmitArgs = applyFilters(
			"comboBlocksFormWrapAfterSubmit",
			formWrapAfterSubmitBasic
		);
		var formWrapFormTypeBasic = {
			contactForm: {
				label: __("Contact Form", "combo-blocks"),
				// description: "Contact Form",
				args: { id: "contactForm" },
			},
			loginForm: {
				label: __("Login Form", "combo-blocks"),
				// description: "Login Form",
				args: { id: "loginForm" },
			},
			registerForm: {
				label: __("Register Form", "combo-blocks"),
				// description: "Register Form",
				args: { id: "registerForm" },
			},
			passwordResetFrom: {
				label: __("Password Reset From", "combo-blocks"),
				// description: "Password Reset From",
				args: { id: "passwordResetFrom", updateUrl: "" },
			},
			// passwordUpdateFrom: {
			// 	label: "Update Password From",
			// 	description: "Update Password From",
			// 	args: { id: "passwordUpdateFrom", resetUrl: '' },
			// },
			userProfileUpdate: {
				label: __("User Profile Update Form", "combo-blocks"),
				// description: "User Profile Update Form",
				args: { id: "userProfileUpdate" },
				isPro: true,
			},
			// wpSearchForm: {
			// 	label: "WordPress Search Form",
			// 	description: "WordPress Search Form",
			// 	args: { id: "wpSearchForm" },
			// },
			postSubmitForm: {
				label: __("Post Submit Form", "combo-blocks"),
				// description: "Post Submit Form",
				args: { id: "postSubmitForm" },
				isPro: true,
			},
			termSubmitForm: {
				label: __("Term Submit Form", "combo-blocks"),
				// description: "Term Submit Form",
				args: { id: "termSubmitForm" },
				isPro: true,
			},
			commentSubmit: {
				label: __("Comment Submit Form", "combo-blocks"),
				// description: "Post Comment Submit Form",
				args: { id: "commentSubmit" },
				isPro: true,
			},
			// fileUploadForm: { label: 'File Upload Form', description: 'File Upload Form', args: { id: 'fileUploadForm', } },
			optInForm: {
				label: __("Opt-In Form", "combo-blocks"),
				// description: "Opt-In Form",
				args: { id: "optInForm" },
				isPro: true,
			},
			// quizForm: {
			// 	label: "quizForm",
			// 	description: "quizForm",
			// 	args: { id: "quizForm" },
			// 	isPro: true,
			// },
			customForm: {
				label: __("Custom Form", "combo-blocks"),
				// description: "Custom Form",
				args: { id: "customForm" },
				isPro: true,
			},
			// postsFilter: {
			// 	label: "Post Filter",
			// 	description: "Post Filter",
			// 	args: { id: "postsFilter" },
			// 	isPro: true,
			// },
			// appointmentForm: {
			// 	label: "Appointment Form",
			// 	description: "Appointment Form",
			// 	args: { id: "appointmentForm" },
			// 	isPro: true,
			// },
		};
		let formTypeArgs = applyFilters(
			"comboBlocksFormWrapFormType",
			formWrapFormTypeBasic
		);
		//let formTypeArgs = formWrapFormTypeBasic;
		var monthsNum = {
			1: { label: "January", value: 1 },
			2: { label: "February", value: 2 },
			3: { label: "March", value: 3 },
			4: { label: "April", value: 4 },
			5: { label: "May", value: 5 },
			6: { label: "June", value: 6 },
			7: { label: "July", value: 7 },
			8: { label: "August", value: 8 },
			9: { label: "September", value: 9 },
			10: { label: "October", value: 10 },
			11: { label: "November", value: 11 },
			12: { label: "December", value: 12 },
		};
		var weekDayNumn = {
			0: { label: __("Sunday", "combo-blocks"), value: 0 },
			1: { label: __("Monday", "combo-blocks"), value: 1 },
			2: { label: __("Tuesday", "combo-blocks"), value: 2 },
			3: { label: __("Wednesday", "combo-blocks"), value: 3 },
			4: { label: __("Thursday", "combo-blocks"), value: 4 },
			5: { label: __("Friday", "combo-blocks"), value: 5 },
			6: { label: __("Saturday", "combo-blocks"), value: 6 },
		};
		var hoursNum = {
			0: { label: "12AM", value: 0 },
			1: { label: "1AM", value: 1 },
			2: { label: "2AM", value: 2 },
			3: { label: "3AM", value: 3 },
			4: { label: "4AM", value: 4 },
			5: { label: "5AM", value: 5 },
			6: { label: "6AM", value: 6 },
			7: { label: "7AM", value: 7 },
			8: { label: "8AM", value: 8 },
			9: { label: "9AM", value: 9 },
			10: { label: "10AM", value: 10 },
			11: { label: "11AM", value: 11 },
			12: { label: "12PM", value: 12 },
			13: { label: "1PM", value: 13 },
			14: { label: "2PM", value: 14 },
			15: { label: "3PM", value: 15 },
			16: { label: "4PM", value: 16 },
			17: { label: "5PM", value: 17 },
			18: { label: "6PM", value: 18 },
			19: { label: "7PM", value: 19 },
			20: { label: "8PM", value: 20 },
			21: { label: "9PM", value: 21 },
			22: { label: "10PM", value: 22 },
			23: { label: "11PM", value: 23 },
		};
		function onFormSubmit(ev) {
			ev.preventDefault();
			return false;
		}
		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}
		const parentClientId =
			select("core/block-editor").getBlockRootClientId(clientId);
		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;
			var blocks = content.length > 0 ? parse(content) : "";
			const attributes = blocks[0].attrs;
			if (action == "insert") {
				const position =
					select("core/editor").getBlockInsertionPoint(parentClientId);
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(
						wp.blocks.parse(content),
						position.index,
						position.rootClientId
					);
			}
			if (action == "applyStyle") {
				var wrapperX = attributes.wrapper;
				var formX = attributes.form;
				var errorWrapX = attributes.errorWrap;
				var responsesMsgWrapX = attributes.responsesMsgWrap;
				var inputX = attributes.input;
				var textareaX = attributes.textarea;
				var selectInputX = attributes.selectInput;
				var labelX = attributes.label;
				var visibleX = attributes.visible;
				var onSubmitX = attributes.onSubmit;
				var onProcessX = attributes.onProcess;
				var afterSubmitX = attributes.afterSubmit;
				var blockCssYX = attributes.blockCssY;
				var blockCssObj = {};
				if (labelX != undefined) {
					var labelY = { ...labelX, options: label.options };
					setAttributes({ label: labelY });
					blockCssObj[labelSelector] = labelY;
				}
				if (selectInputX != undefined) {
					var selectInputY = { ...selectInputX, options: selectInput.options };
					setAttributes({ selectInput: selectInputY });
					blockCssObj[selectInputSelector] = selectInputY;
				}
				if (textareaX != undefined) {
					var textareaY = { ...textareaX, options: textarea.options };
					setAttributes({ textarea: textareaY });
					blockCssObj[textareaSelector] = textareaY;
				}
				if (inputX != undefined) {
					var inputY = { ...inputX, options: input.options };
					setAttributes({ input: inputY });
					blockCssObj[inputSelector] = inputY;
				}
				if (responsesMsgWrapX != undefined) {
					var responsesMsgWrapY = {
						...responsesMsgWrapX,
						options: responsesMsgWrap.options,
					};
					setAttributes({ responsesMsgWrap: responsesMsgWrapY });
					blockCssObj[responsesMsgWrapSelector] = responsesMsgWrapY;
				}
				if (errorWrapX != undefined) {
					var errorWrapY = { ...errorWrapX, options: errorWrap.options };
					setAttributes({ errorWrap: errorWrapY });
					blockCssObj[errorWrapSelector] = errorWrapY;
				}
				if (afterSubmitX != undefined) {
					var afterSubmitY = { ...afterSubmitX, options: afterSubmit.options };
					setAttributes({ afterSubmit: afterSubmitY });
					blockCssObj[afterSubmitSelector] = afterSubmitY;
				}
				if (onProcessX != undefined) {
					var onProcessY = { ...onProcessX, options: onProcess.options };
					setAttributes({ onProcess: onProcessY });
					blockCssObj[onProcessSelector] = onProcessY;
				}
				if (onSubmitX != undefined) {
					var onSubmitY = { ...onSubmitX, options: onSubmit.options };
					setAttributes({ onSubmit: onSubmitY });
					blockCssObj[onSubmitSelector] = onSubmitY;
				}
				if (visibleX != undefined) {
					var visibleY = { ...visibleX, options: visible.options };
					setAttributes({ visible: visibleY });
					blockCssObj[visibleSelector] = visibleY;
				}
				if (formX != undefined) {
					var formY = { ...formX, options: form.options };
					setAttributes({ form: formY });
					blockCssObj[formSelector] = formY;
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
		var RemoveVisibleGroup = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var visibleX = { ...visible };
							delete visibleX[index];
							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveVisibleArg = function ({ title, index, groupId }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var visibleX = { ...visible };
							visibleX[groupId].args.splice(index, 1);
							setAttributes({ visible: visibleX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveOnSubmitArg = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var onSubmitX = { ...onSubmit };
							delete onSubmitX[index];
							setAttributes({ onSubmit: onSubmitX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveSubmitTriggers = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var submitTriggersX = { ...submitTriggers };
							delete submitTriggersX[index];
							setAttributes({ submitTriggers: submitTriggersX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};

		var RemoveonProcessArg = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var onProcessX = { ...onProcess };
							delete onProcessX[index];
							setAttributes({ onProcess: onProcessX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
		var RemoveAfterSubmitArg = function ({ title, index }) {
			return (
				<>
					<span
						className="cursor-pointer hover:bg-red-500 hover:text-white "
						onClick={(ev) => {
							var afterSubmitX = { ...afterSubmit };
							delete afterSubmitX[index];
							setAttributes({ afterSubmit: afterSubmitX });
						}}>
						<Icon icon={close} />
					</span>
					<span>{title}</span>
				</>
			);
		};
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
			let obj = { ...wrapper };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ wrapper: objectX });
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
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onRemoveStyleForm(sudoScource, key) {
			let obj = { ...form };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ form: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				formSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}

		function onResetWrapper(sudoSources) {
			let obj = Object.assign({}, wrapper);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						wrapperSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ wrapper: obj });
		}
		function onResetForm(sudoSources) {
			let obj = Object.assign({}, form);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						formSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ form: obj });
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
		function onChangeStyleForm(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, form);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ form: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				formSelector
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
		function onAddStyleForm(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, form);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ form: object });
		}
		function onBulkAddForm(sudoScource, cssObj) {
			let obj = Object.assign({}, form);
			obj[sudoScource] = cssObj;
			setAttributes({ form: obj });
			var selector = myStore.getElementSelector(sudoScource, formSelector);
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
		function onChangeStyleErrorWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ errorWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
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
		function onAddStyleErrorWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, errorWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ errorWrap: object });
		}
		function onBulkAddErrorWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, errorWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ errorWrap: obj });
			var selector = myStore.getElementSelector(sudoScource, errorWrapSelector);
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
		function onRemoveStyleErrorWrap(sudoScource, key) {
			let obj = { ...errorWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ errorWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				errorWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResetErrorWrap(sudoSources) {
			let obj = Object.assign({}, errorWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						errorWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ errorWrap: obj });
		}

		function onChangeStyleresponsesMsgWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, responsesMsgWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ responsesMsgWrap: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				responsesMsgWrapSelector
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
		function onAddStyleresponsesMsgWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, responsesMsgWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ responsesMsgWrap: object });
		}
		function onBulkAddresponsesMsgWrap(sudoScource, cssObj) {
			let obj = Object.assign({}, responsesMsgWrap);
			obj[sudoScource] = cssObj;
			setAttributes({ responsesMsgWrap: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				responsesMsgWrapSelector
			);
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
		function onRemoveStyleresponsesMsgWrap(sudoScource, key) {
			let obj = { ...responsesMsgWrap };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ responsesMsgWrap: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				responsesMsgWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResetresponsesMsgWrap(sudoSources) {
			let obj = Object.assign({}, responsesMsgWrap);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						responsesMsgWrapSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ responsesMsgWrap: obj });
		}
		function onChangeStyleinput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, input);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ input: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputSelector
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
		function onRemoveStyleinput(sudoScource, key) {
			let obj = { ...input };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ input: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				inputSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResetinput(sudoSources) {
			let obj = Object.assign({}, input);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						inputSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ input: obj });
		}
		function onAddStyleinput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, input);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ input: object });
		}
		function onBulkAddinput(sudoScource, cssObj) {
			let obj = Object.assign({}, input);
			obj[sudoScource] = cssObj;
			setAttributes({ input: obj });
			var selector = myStore.getElementSelector(sudoScource, inputSelector);
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
		function onChangeStyletextarea(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, textarea);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ textarea: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textareaSelector
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
		function onRemoveStyletextarea(sudoScource, key) {
			let obj = { ...textarea };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ textarea: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				textareaSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResettextarea(sudoSources) {
			let obj = Object.assign({}, textarea);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						textareaSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ textarea: obj });
		}
		function onAddStyletextarea(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, textarea);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ textarea: object });
		}
		function onBulkAddtextarea(sudoScource, cssObj) {
			let obj = Object.assign({}, textarea);
			obj[sudoScource] = cssObj;
			setAttributes({ textarea: obj });
			var selector = myStore.getElementSelector(sudoScource, textareaSelector);
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
		function onChangeStyleselectInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, selectInput);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ selectInput: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				selectInputSelector
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
		function onRemoveStyleselectInput(sudoScource, key) {
			let obj = { ...selectInput };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ selectInput: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				selectInputSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResetselectInput(sudoSources) {
			let obj = Object.assign({}, selectInput);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						selectInputSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ selectInput: obj });
		}
		function onAddStyleselectInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, selectInput);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ selectInput: object });
		}
		function onBulkAddselectInput(sudoScource, cssObj) {
			let obj = Object.assign({}, selectInput);
			obj[sudoScource] = cssObj;
			setAttributes({ selectInput: obj });
			var selector = myStore.getElementSelector(
				sudoScource,
				selectInputSelector
			);
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
		function onChangeStylelabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.updatePropertyDeep(obj, path, newVal);
			setAttributes({ label: object });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
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
		function onRemoveStylelabel(sudoScource, key) {
			let obj = { ...label };
			var object = myStore.deletePropertyDeep(obj, [
				sudoScource,
				key,
				breakPointX,
			]);
			var isEmpty =
				Object.entries(object[sudoScource][key]).length == 0 ? true : false;
			var objectX = isEmpty
				? myStore.deletePropertyDeep(object, [sudoScource, key])
				: object;
			setAttributes({ label: objectX });
			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			var isEmptyX = cssObject[cssPropty] == undefined ? false : true;
			var cssObjectX = isEmptyX
				? myStore.deletePropertyDeep(cssObject, [cssPropty])
				: cssObject;
			setAttributes({ blockCssY: { items: cssObjectX } });
		}
		function onResetlabel(sudoSources) {
			let obj = Object.assign({}, label);
			Object.entries(sudoSources).map((args) => {
				var sudoScource = args[0];
				if (obj[sudoScource] == undefined) {
				} else {
					obj[sudoScource] = {};
					var elementSelector = myStore.getElementSelector(
						sudoScource,
						labelSelector
					);
					var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
						elementSelector,
					]);
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});
			setAttributes({ label: obj });
		}
		function onAddStylelabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, label);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ label: object });
		}
		function onBulkAddlabel(sudoScource, cssObj) {
			let obj = Object.assign({}, label);
			obj[sudoScource] = cssObj;
			setAttributes({ label: obj });
			var selector = myStore.getElementSelector(sudoScource, labelSelector);
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
		const ALLOWED_BLOCKS = [];
		const MY_TEMPLATE = [["form-field-input", {}]];
		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options.class} `,
		});
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			//allowedBlocks: ALLOWED_BLOCKS,
			//template: MY_TEMPLATE,
			orientation: "horizontal",
			templateInsertUpdatesSelection: true,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		});
		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div className="p-3">
							<PanelRow>
								<label htmlFor="" className="font-medium text-slate-900 ">
									{__("Choose Form Type", "combo-blocks")}
								</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										formTypeArgs[
											form.options == undefined ? form.type : form.options?.type
										] == undefined
											? "Form Type"
											: formTypeArgs[
												form.options == undefined
													? form.type
													: form.options?.type
											].label
									}
									options={formTypeArgs}
									onChange={(option, index) => {
										//setAttributes({ form: { ...form, type: index } });
										var options = { ...form.options, type: index };
										setAttributes({ form: { ...form, options: options } });
									}}
									values=""></PGDropdown>
							</PanelRow>
						</div>
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
									<PanelRow>
										<label htmlFor="" className="font-medium text-slate-900 ">
											{__("Wrapper Tag", "combo-blocks")}
										</label>
										<SelectControl
											label=""
											value={wrapper.options.tag}
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
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
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
							title={__("Before Submit", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add Action"}
									options={onSubmitArgs}
									onChange={(option, index) => {
										var onSubmitX = { ...onSubmit };
										var index = Object.entries(onSubmitX).length;
										onSubmitX[index] = option.args;
										setAttributes({ onSubmit: onSubmitX });
									}}
									values=""></PGDropdown>
							</PanelRow>
							<div className="my-4">
								{Object.entries(onSubmit).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveOnSubmitArg
													title={
														onSubmitArgs[id] == undefined
															? id
															: onSubmitArgs[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "validation" && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}
												{id == "submitConfirm" && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}
												{id == "recaptchaValidation" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onSubmitX = { ...onSubmit };
																onSubmitX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onSubmit: onSubmitX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onSubmitX = { ...onSubmit };
																		onSubmitX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onSubmit: onSubmitX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onSubmitX = { ...onSubmit };
																		onSubmitX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onSubmit: onSubmitX });
																	}}
																/>
															</>
														)}
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>

						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("On Process", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add Action"}
									options={
										onProcessArgsFiltered != null
											? onProcessArgsFiltered[form.options?.type]
											: {}
									}
									onChange={(option, index) => {
										var onProcessX = { ...onProcess };
										var index = Object.entries(onProcessX).length;
										onProcessX[index] = option.args;
										setAttributes({ onProcess: onProcessX });
									}}
									values=""></PGDropdown>
							</PanelRow>
							<div className="my-4">
								{Object.entries(onProcess).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;

									var formType =
										form.options == undefined ? form.type : form.options.type;

									formType =
										formType == "newsletterForm" ? "optInForm" : formType;

									var idLabel =
										onProcessArgsFiltered == null
											? id
											: onProcessArgsFiltered[formType][id]?.label;

									return (
										<PGtoggle
											key={i}
											title={
												<RemoveonProcessArg
													title={idLabel}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "sendMail" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Subject", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.subject}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["subject"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Mail To", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.mailTo}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["mailTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("BCC", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.bcc}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["bcc"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Email Footer", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.footer}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["footer"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "doAction" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Action Name", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.actionName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["actionName"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "droboxUpload" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Path", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.path}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["path"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<p>
															<code>/gallery</code>
														</p>
														<p>
															<code>/gallery/images</code>
														</p>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "googleDriveUpload" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Path", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.path}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["path"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<p>
															<code>/gallery</code>
														</p>
														<p>
															<code>/gallery/images</code>
														</p>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "createWCOrder" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Order Status", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.orderStatus}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["orderStatus"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Order Note", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.orderNote}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["orderNote"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Payment Method", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.paymentMethod}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["paymentMethod"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Payment Method Title", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.paymentMethodTitle}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["paymentMethodTitle"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "createZendeskTicket" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("priority", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.priority}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["priority"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "sendSlackWebhook" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Webhook URL", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.webhookUrl}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["webhookUrl"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Text", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.text}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["text"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Channel", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.channel}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["channel"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Username", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.username}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["username"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Icon Emoji", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.iconEmoji}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["iconEmoji"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "twilioSendMessage" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Phone Number", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.phoneNumber}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["phoneNumber"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Text", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.text}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["text"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}

												{id == "applyFilters" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Filter Name", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.filterName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["filterName"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Success Message", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.successMessage}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["successMessage"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Failed Message", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.failedMessage}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["failedMessage"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
													</>
												)}
												{id == "validatedField" && (
													<>
														<label
															for=""
															className="font-medium text-slate-900 ">
															{__("Field Name", "combo-blocks")}
														</label>
														<PanelRow className="gap-3 my-3">
															<InputControl
																value={groupData.field}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["field"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={inputFieldsBlocks}
																onChange={(option, index) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["field"] =
																		option.value;
																	setAttributes({ onProcess: onProcessX });
																}}
																values=""></PGDropdown>
														</PanelRow>
														<div
															className="pg-font inline-block cursor-pointer mb-3 py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600"
															onClick={(ev) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["conditions"].push({
																	value: "",
																	values: [],
																	relation: "",
																	compare: "",
																	message: "",
																});
																setAttributes({ onProcess: onProcessX });
															}}>
															{__("Add", "combo-blocks")}
														</div>
														{Object.entries(
															onProcess[groupIndex]["conditions"]
														).map((x, i) => {
															var listIndex = x[0];
															var listData = x[1];
															var slug = x[1].slug;
															return (
																<PGtoggle
																	className="font-medium text-slate-900 "
																	title={
																		<>
																			<span
																				className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer"
																				onClick={() => {
																					var onProcessX = { ...onProcess };
																					delete onProcessX[groupIndex][
																						"conditions"
																					].splice(i, 1);
																					setAttributes({
																						onProcess: onProcessX,
																					});
																				}}>
																				<span className="text-[20px] text-white">
																					&times;
																				</span>
																			</span>
																			<span className="px-3">
																				{groupData.conditions[i].compare
																					.length > 0 && (
																						<>
																							{groupData.conditions[i].compare}
																							{(groupData.conditions[i].compare ==
																								"equal" ||
																								groupData.conditions[i].compare ==
																								"notEqual" ||
																								groupData.conditions[i].compare ==
																								"greaterThan" ||
																								groupData.conditions[i].compare ==
																								"lessThan" ||
																								groupData.conditions[i].compare ==
																								"GreaterThanEqual" ||
																								groupData.conditions[i].compare ==
																								"lessThanEqual") && (
																									<>
																										{" "}
																										-{" "}
																										{groupData.conditions[i].value}
																									</>
																								)}
																							{(groupData.conditions[i].compare ==
																								"between" ||
																								groupData.conditions[i].compare ==
																								"contains" ||
																								groupData.conditions[i].compare ==
																								"notContains" ||
																								groupData.conditions[i].compare ==
																								"startsWith" ||
																								groupData.conditions[i].compare ==
																								"endsWith" ||
																								groupData.conditions[i].compare ==
																								"regex" ||
																								groupData.conditions[i].compare ==
																								"exist") && (
																									<>
																										-{" "}
																										{groupData.conditions[
																											i
																										].values.join(",")}
																									</>
																								)}
																						</>
																					)}
																				{groupData.conditions[i].compare
																					.length == 0 && <>#{i}</>}
																			</span>
																		</>
																	}
																	initialOpen={false}>
																	<div className="my-3  ">
																		<PanelRow>
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Compare", "combo-blocks")}
																			</label>
																			<SelectControl
																				label=""
																				options={[
																					{
																						label: __("Choose", "combo-blocks"),
																						value: "",
																					},
																					{
																						label: __("Equal", "combo-blocks"),
																						value: "equal",
																					},
																					{
																						label: __("Not Equal", "combo-blocks"),
																						value: "notEqual",
																					},
																					{
																						label: __("Empty", "combo-blocks"),
																						value: "empty",
																					},
																					{
																						label: __("Not empty", "combo-blocks"),
																						value: "notEmpty",
																					},
																					{
																						label: __(
																							"Greater than",
																							"combo-blocks"
																						),
																						value: "greaterThan",
																					},
																					{
																						label: __("Less than", "combo-blocks"),
																						value: "lessThan",
																					},
																					{
																						label: __(
																							"Greater than or equal",
																							"combo-blocks"
																						),
																						value: "GreaterThanEqual",
																					},
																					{
																						label: __(
																							"Less than or equal",
																							"combo-blocks"
																						),
																						value: "lessThanEqual",
																					},
																					{
																						label: __("Contains", "combo-blocks"),
																						value: "contains",
																					},
																					{
																						label: __(
																							"Does Not Contains",
																							"combo-blocks"
																						),
																						value: "notContains",
																					},
																					{
																						label: __(
																							"Starts With",
																							"combo-blocks"
																						),
																						value: "startsWith",
																					},
																					{
																						label: __("Ends With", "combo-blocks"),
																						value: "endsWith",
																					},
																					{ label: "REGEX", value: "regex" },
																					{
																						label: __("Between", "combo-blocks"),
																						value: "between",
																					},
																					{
																						label: __("Exist", "combo-blocks"),
																						value: "exist",
																					},
																				]}
																				value={groupData.conditions[i].compare}
																				onChange={(newVal) => {
																					var onProcessX = { ...onProcess };
																					onProcessX[groupIndex]["conditions"][
																						i
																					].compare = newVal;
																					setAttributes({
																						onProcess: onProcessX,
																					});
																				}}
																			/>
																		</PanelRow>
																		{groupData.conditions[i].compare ==
																			"regex" && (
																				<div>
																					<ul>
																						<li>
																							{" "}
																							<code>^something</code>: Start with{" "}
																						</li>
																						<li>
																							{" "}
																							<code>something$</code>: End with{" "}
																						</li>
																						<li>
																							{" "}
																							<code>something</code>: Contain{" "}
																						</li>
																					</ul>
																				</div>
																			)}
																		{(groupData.conditions[i].compare ==
																			"equal" ||
																			groupData.conditions[i].compare ==
																			"notEqual" ||
																			groupData.conditions[i].compare ==
																			"greaterThan" ||
																			groupData.conditions[i].compare ==
																			"lessThan" ||
																			groupData.conditions[i].compare ==
																			"GreaterThanEqual" ||
																			groupData.conditions[i].compare ==
																			"lessThanEqual") && (
																				<>
																					<PanelRow>
																						<label
																							for=""
																							className="font-medium text-slate-900 ">
																							{__("Value", "combo-blocks")}
																						</label>
																						<InputControl
																							className="mr-2"
																							value={
																								groupData.conditions[i].value
																							}
																							onChange={(newVal) => {
																								var onProcessX = { ...onProcess };
																								onProcessX[groupIndex][
																									"conditions"
																								][i].value = newVal;
																								setAttributes({
																									onProcess: onProcessX,
																								});
																							}}
																						/>
																					</PanelRow>
																				</>
																			)}
																		{(groupData.conditions[i].compare ==
																			"between" ||
																			groupData.conditions[i].compare ==
																			"contains" ||
																			groupData.conditions[i].compare ==
																			"notContains" ||
																			groupData.conditions[i].compare ==
																			"startsWith" ||
																			groupData.conditions[i].compare ==
																			"endsWith" ||
																			groupData.conditions[i].compare ==
																			"regex" ||
																			groupData.conditions[i].compare ==
																			"exist") && (
																				<>
																					<PanelRow>
																						<div
																							className="pg-font  cursor-pointer py-2 px-4 capitalize  !bg-gray-700 !text-white font-medium !rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600"
																							onClick={(ev) => {
																								var onProcessX = { ...onProcess };
																								onProcessX[groupIndex][
																									"conditions"
																								][i].values.push("");
																								setAttributes({
																									onProcess: onProcessX,
																								});
																							}}>
																							{__("Add", "combo-blocks")}
																						</div>
																						{groupData.conditions[i].compare ==
																							"regex" && (
																								<>
																									<PGDropdown
																										position="bottom right"
																										variant="secondary"
																										buttonTitle={
																											onProcess[groupIndex][
																												"conditions"
																											][i]?.relation == undefined
																												? "Relation?"
																												: onProcess[groupIndex][
																													"conditions"
																												][i].relation
																										}
																										options={[
																											{ label: "OR", value: "OR" },
																											{
																												label: "AND",
																												value: "AND",
																											},
																										]}
																										onChange={(option, index) => {
																											var onProcessX = {
																												...onProcess,
																											};
																											onProcessX[groupIndex][
																												"conditions"
																											][i].relation = option.value;
																											setAttributes({
																												onProcess: onProcessX,
																											});
																										}}
																										values=""></PGDropdown>
																								</>
																							)}
																					</PanelRow>
																					{groupData.conditions[i].values.map(
																						(x, j) => {
																							var listIndex = x[0];
																							var listData = x[1];
																							return (
																								<div
																									className="border my-3 flex items-center"
																									key={j}>
																									<span
																										className="cursor-pointer hover:bg-red-500 hover:text-white "
																										onClick={(ev) => {
																											var onProcessX = {
																												...onProcess,
																											};
																											delete onProcessX[
																												groupIndex
																											]["conditions"][
																												i
																											].values.splice(j, 1);
																											setAttributes({
																												onProcess: onProcessX,
																											});
																										}}>
																										<Icon icon={close} />
																									</span>
																									<InputControl
																										className="mr-2"
																										value={
																											onProcess[groupIndex][
																												"conditions"
																											][i].values[j]
																										}
																										onChange={(newVal) => {
																											var onProcessX = {
																												...onProcess,
																											};
																											onProcessX[groupIndex][
																												"conditions"
																											][i].values[j] = newVal;
																											setAttributes({
																												onProcess: onProcessX,
																											});
																										}}
																									/>
																								</div>
																							);
																						}
																					)}
																				</>
																			)}
																		<div className="my-4">
																			<label
																				for=""
																				className="font-medium text-slate-900 ">
																				{__("Error Message", "combo-blocks")}
																			</label>
																			<TextareaControl
																				value={
																					onProcess[groupIndex]["conditions"][i]
																						.message
																				}
																				onChange={(newVal) => {
																					var onProcessX = { ...onProcess };
																					onProcessX[groupIndex]["conditions"][
																						i
																					].message = newVal;
																					setAttributes({
																						onProcess: onProcessX,
																					});
																				}}
																			/>
																		</div>
																	</div>
																</PGtoggle>
															);
														})}
													</>
												)}
												{id == "webhookRequest" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Webhook Name", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																value={groupData.name}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["name"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL
															</label>
															<InputControl
																className="mr-2"
																value={groupData.url}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["url"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Method
															</label>
															<SelectControl
																label=""
																value={groupData.method}
																options={[
																	{ label: "POST", value: "POST" },
																	{ label: "GET", value: "GET" },
																	{ label: "PUT", value: "PUT" },
																	{ label: "PATCH", value: "PATCH" },
																	{ label: "DELETE", value: "DELETE" },
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["method"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Format
															</label>
															<SelectControl
																label=""
																value={groupData.format}
																options={[{ label: "JSON", value: "JSON" }]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["format"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "emailBcc" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail To
															</label>
															<InputControl
																className="mr-2"
																value={groupData.mailTo}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["mailTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail from
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromEmail}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromEmail"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail From Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromName"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Email
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyTo}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyToName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyToName"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Email Footer
															</label>
															<TextareaControl
																value={groupData.footer}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["footer"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "emailCopyUser" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail from
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromEmail}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromEmail"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail From Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromName"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Email
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyTo}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyToName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyToName"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Email Footer
															</label>
															<TextareaControl
																value={groupData.footer}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["footer"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "createEntry" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Save To
															</label>
															<SelectControl
																label=""
																value={groupData.saveTo}
																options={[
																	{ label: "Choose", value: "" },
																	{ label: "Post", value: "post" },
																	{ label: "Ninja Table", value: "ninjaTable" },
																	{ label: "Airtable", value: "airtable" },
																	{
																		label: "WP Custom Table",
																		value: "wpCustomTable",
																	},
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["saveTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>

														{groupData.saveTo == "post" && (
															<>
																<PanelRow>
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Post Type
																	</label>
																	<SelectControl
																		label=""
																		value={groupData?.saveToPrams?.postType}
																		options={postTypes}
																		onChange={(newVal) => {
																			var onProcessX = { ...onProcess };
																			onProcessX[groupIndex]["saveToPrams"][
																				"postType"
																			] = newVal;
																			setAttributes({ onProcess: onProcessX });
																		}}
																	/>
																</PanelRow>
															</>
														)}
														{groupData.saveTo == "ninjaTable" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Table ID
																	</label>
																	<InputControl
																		className="mr-2"
																		value={groupData?.saveToPrams?.id}
																		onChange={(newVal) => {
																			var onProcessX = { ...onProcess };
																			onProcessX[groupIndex]["saveToPrams"][
																				"id"
																			] = newVal;
																			setAttributes({ onProcess: onProcessX });
																		}}
																	/>
																</PanelRow>
															</>
														)}
														{groupData.saveTo == "airtable" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Base Id
																	</label>
																	<InputControl
																		className="mr-2"
																		value={groupData?.saveToPrams?.baseId}
																		onChange={(newVal) => {
																			var onProcessX = { ...onProcess };
																			onProcessX[groupIndex]["saveToPrams"][
																				"baseId"
																			] = newVal;
																			setAttributes({ onProcess: onProcessX });
																		}}
																	/>
																</PanelRow>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Table Id Or Name
																	</label>
																	<InputControl
																		className="mr-2"
																		value={
																			groupData?.saveToPrams?.tableIdOrName
																		}
																		onChange={(newVal) => {
																			var onProcessX = { ...onProcess };
																			onProcessX[groupIndex]["saveToPrams"][
																				"tableIdOrName"
																			] = newVal;
																			setAttributes({ onProcess: onProcessX });
																		}}
																	/>
																</PanelRow>
															</>
														)}

														{groupData.saveTo == "wpCustomTable" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Table Name
																	</label>
																	<InputControl
																		className="mr-2"
																		value={groupData?.saveToPrams?.tableName}
																		onChange={(newVal) => {
																			var onProcessX = { ...onProcess };
																			onProcessX[groupIndex]["saveToPrams"][
																				"tableName"
																			] = newVal;
																			setAttributes({ onProcess: onProcessX });
																		}}
																	/>
																</PanelRow>
																<p>Do not include table prefix "{"wp_"}"</p>
															</>
														)}

														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "autoReply" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail from
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromEmail}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromEmail"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Mail From Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.fromName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["fromName"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Email
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyTo}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyTo"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Reply To Name
															</label>
															<InputControl
																className="mr-2"
																value={groupData.replyToName}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["replyToName"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Message
															</label>
															<TextareaControl
																value={groupData.message}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["message"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Email Footer
															</label>
															<TextareaControl
																value={groupData.footer}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["footer"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "recaptchaValidation" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "loggedInUser" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "registerUser" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "postSubmit" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Post Type
															</label>
															<SelectControl
																label=""
																value={groupData.postType}
																options={postTypes}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["postType"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Post Status
															</label>
															<SelectControl
																label=""
																value={groupData.postStatus}
																options={postStatuses}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["postStatus"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Comment Status
															</label>
															<SelectControl
																label=""
																value={groupData.commentStatus}
																options={[
																	{ label: "Open", value: "open" },
																	{ label: "Closed", value: "closed" },
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["commentStatus"] =
																		newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Ping Status
															</label>
															<SelectControl
																label=""
																value={groupData.pingStatus}
																options={[
																	{ label: "Open", value: "open" },
																	{ label: "Closed", value: "closed" },
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["pingStatus"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Create Author by Email?", "combo-blocks")}
															help={
																groupData.authorByEmail
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.authorByEmail ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["authorByEmail"] =
																	groupData.authorByEmail ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "commentSubmit" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Status", "combo-blocks")}
															</label>
															<SelectControl
																label=""
																value={groupData.status}
																options={[
																	{ label: "Approve", value: "1" },
																	{ label: "Hold", value: "0" },
																	{ label: "Spam", value: "spam" },
																	{ label: "Trash", value: "trash" },
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["status"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Type
															</label>
															<InputControl
																className="mr-2"
																value={
																	groupData.type == undefined ||
																		groupData.type.length == 0
																		? "comment"
																		: groupData.type
																}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["type"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label="Login Required?"
															help={
																groupData.loginRequired
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.loginRequired ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["loginRequired"] =
																	groupData.loginRequired ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "termSubmit" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Taxonomy", "combo-blocks")}
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																options={taxonomiesObjects}
																buttonTitle={
																	taxonomiesObjects[groupData.taxonomy] !=
																		undefined
																		? taxonomiesObjects[groupData.taxonomy]
																			.label
																		: __("Choose", "combo-blocks")
																}
																// onChange={setTaxonomy}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["taxonomy"] =
																		newVal.id;
																	setAttributes({ onProcess: onProcessX });
																	// updateQueryPram(newVal.id, index)
																}}
																values={groupData.taxonomy}></PGDropdown>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "fluentcrmAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Fluent-CRM Lists
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={fluentcrmLists}
																onChange={(option, index) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"].push({
																		slug: option.slug,
																		id: option.id,
																	});
																	setAttributes({ onProcess: onProcessX });
																}}
																values=""></PGDropdown>
														</PanelRow>
														{Object.entries(onProcess[groupIndex]["lists"]).map(
															(x, i) => {
																var listIndex = x[0];
																var listData = x[1];
																var slug = x[1].slug;
																return (
																	<div
																		className="border my-3 flex items-center"
																		key={i}>
																		<span
																			className="cursor-pointer hover:bg-red-500 hover:text-white "
																			onClick={(ev) => {
																				var onProcessX = { ...onProcess };
																				delete onProcessX[groupIndex][
																					"lists"
																				].splice(i, 1);
																				setAttributes({
																					onProcess: onProcessX,
																				});
																			}}>
																			<Icon icon={close} />
																		</span>
																		<span>
																			{fluentcrmLists != null &&
																				fluentcrmLists[slug] != undefined
																				? fluentcrmLists[slug].label
																				: ""}
																		</span>
																	</div>
																);
															}
														)}
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Fluent-CRM Tags
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={fluentcrmTags}
																onChange={(option, index) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"].push({
																		slug: option.slug,
																		id: option.id,
																	});
																	setAttributes({ onProcess: onProcessX });
																}}
																values=""></PGDropdown>
														</PanelRow>
														{Object.entries(onProcess[groupIndex]["tags"]).map(
															(x, i) => {
																var listIndex = x[0];
																var listData = x[1];
																var slug = x[1].slug;
																return (
																	<div
																		className="border my-3 flex items-center"
																		key={i}>
																		<span
																			className="cursor-pointer hover:bg-red-500 hover:text-white "
																			onClick={(ev) => {
																				var onProcessX = { ...onProcess };
																				delete onProcessX[groupIndex][
																					"tags"
																				].splice(i, 1);
																				setAttributes({
																					onProcess: onProcessX,
																				});
																			}}>
																			<Icon icon={close} />
																		</span>
																		<span>
																			{fluentcrmTags == null
																				? ""
																				: fluentcrmTags[slug].label}
																		</span>
																	</div>
																);
															}
														)}
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailpickerAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																MailPicker Lists
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={mailpickerLists}
																onChange={(option, index) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"].push({
																		slug: option.slug,
																		id: option.id,
																	});
																	setAttributes({ onProcess: onProcessX });
																}}
																values=""></PGDropdown>
														</PanelRow>
														{Object.entries(onProcess[groupIndex]["lists"]).map(
															(x, i) => {
																var listIndex = x[0];
																var listData = x[1];
																var slug = x[1].slug;
																return (
																	<div
																		className="border my-3 flex items-center"
																		key={i}>
																		<span
																			className="cursor-pointer hover:bg-red-500 hover:text-white "
																			onClick={(ev) => {
																				var onProcessX = { ...onProcess };
																				delete onProcessX[groupIndex][
																					"lists"
																				].splice(i, 1);
																				setAttributes({
																					onProcess: onProcessX,
																				});
																			}}>
																			<Icon icon={close} />
																		</span>
																		<span>
																			{mailpickerLists != null &&
																				mailpickerLists[slug] != undefined
																				? mailpickerLists[slug].label
																				: ""}
																		</span>
																	</div>
																);
															}
														)}
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}

												{id == "acumbamailAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																placeholder="List ID"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "brevoAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}

												{id == "convertkitAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "omnisendAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}

												{id == "klaviyoAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List ID", "combo-blocks")}
															</label>
															<InputControl
																value={groupData.lists}
																placeholder="List ID"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "aweberAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List ID", "combo-blocks")}
															</label>
															<InputControl
																value={groupData.lists}
																placeholder="List ID"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailerliteAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Group IDs", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "dripAddContact" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailmodoAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List name", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailjetAddContact" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailgunAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List Address", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "emailoctopusAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List Address", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "senderAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("groups", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.groups}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["groups"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "moosendAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "activecampaignAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "mailchimpAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																placeholder="5db8112a0c"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Status", "combo-blocks")}
															</label>
															<SelectControl
																label=""
																value={groupData.status}
																options={[
																	{ label: "Subscribed", value: "subscribed" },
																	{
																		label: "Unsubscribed",
																		value: "unsubscribed",
																	},
																	{ label: "Cleaned", value: "cleaned" },
																	{ label: "Pending", value: "pending" },
																	{
																		label: "Transactional",
																		value: "transactional",
																	},
																]}
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["status"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "getresponseAddContact" && (
													<>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Lists", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<div>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Tags", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.tags}
																placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["tags"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</div>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "sendgridAddContact" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("List Address", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.lists}
																// placeholder="Comma separate"
																onChange={(newVal) => {
																	var onProcessX = { ...onProcess };
																	onProcessX[groupIndex]["lists"] = newVal;
																	setAttributes({ onProcess: onProcessX });
																}}
															/>
														</PanelRow>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Exist Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.existMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["existMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
												{id == "newsletterSubmit" && (
													<>
														<ToggleControl
															label={__("Show On Response?", "combo-blocks")}
															help={
																groupData.showOnResponse
																	? __("Enabled", "combo-blocks")
																	: __("Disabled.", "combo-blocks")
															}
															checked={groupData.showOnResponse ? true : false}
															onChange={(e) => {
																var onProcessX = { ...onProcess };
																onProcessX[groupIndex]["showOnResponse"] =
																	groupData.showOnResponse ? false : true;
																setAttributes({ onProcess: onProcessX });
															}}
														/>
														{groupData.showOnResponse && (
															<>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Success Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.successMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["successMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	{__("Error Message", "combo-blocks")}
																</label>
																<TextareaControl
																	value={groupData.errorMessage}
																	onChange={(newVal) => {
																		var onProcessX = { ...onProcess };
																		onProcessX[groupIndex]["errorMessage"] =
																			newVal;
																		setAttributes({ onProcess: onProcessX });
																	}}
																/>
															</>
														)}
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("After Submit", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add Action"}
									options={afterSubmitArgs}
									onChange={(option, index) => {
										var afterSubmitX = { ...afterSubmit };
										var index = Object.entries(afterSubmitX).length;
										afterSubmitX[index] = option.args;
										setAttributes({ afterSubmit: afterSubmitX });
									}}
									values=""></PGDropdown>
							</PanelRow>
							<div className="my-4">
								{Object.entries(afterSubmit).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveAfterSubmitArg
													title={
														afterSubmitArgs[id] == undefined
															? id
															: afterSubmitArgs[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "showResponse" && <>Show response messages.</>}
												{id == "loggedOut" && (
													<>
														<div className="mb-4">Logged out current user</div>
													</>
												)}
												{id == "redirectToURL" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Redirect URL", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.url}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["url"] = newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</div>
													</>
												)}
												{id == "showText" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Success Message", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.successMessage}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["successMessage"] =
																		newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</div>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Failed Message", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.failedMessage}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["failedMessage"] =
																		newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</div>
													</>
												)}
												{id == "hidePopup" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Delay", "combo-blocks")}
															</label>
															<InputControl
																value={groupData.delay}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["delay"] = newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</div>
													</>
												)}
												{id == "filterPostsGET" && <></>}
												{id == "refreshPage" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Delay", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																type="number"
																value={groupData.delay}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["delay"] = newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</div>
													</>
												)}
												{id == "delay" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Delay", "combo-blocks")}
															</label>
															<InputControl
																className="mr-2"
																type="number"
																value={groupData.time}
																onChange={(newVal) => {
																	var afterSubmitX = { ...afterSubmit };
																	afterSubmitX[groupIndex]["time"] = newVal;
																	setAttributes({ afterSubmit: afterSubmitX });
																}}
															/>
														</PanelRow>
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>

						<PGtoggle
							className="font-medium hidden text-slate-900 "
							title={__("Submit Triggers", "combo-blocks")}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add Action"}
									options={submitTriggersPrams}
									onChange={(option, index) => {
										var submitTriggersX = { ...submitTriggers };
										var index = Object.entries(submitTriggersX).length;
										submitTriggersX[index] = option.args;
										setAttributes({ submitTriggers: submitTriggersX });
									}}
									values=""></PGDropdown>
							</PanelRow>
							<div className="my-4">
								{Object.entries(submitTriggers).map((group, i) => {
									var groupIndex = group[0];
									var groupData = group[1];
									var id = groupData.id;
									return (
										<PGtoggle
											key={i}
											title={
												<RemoveSubmitTriggers
													title={
														submitTriggersPrams[id] == undefined
															? id
															: submitTriggersPrams[id].label
													}
													index={groupIndex}
												/>
											}
											initialOpen={false}>
											<>
												{id == "onChangeForm" && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}
												{id == "onExit" && (
													<div>
														{__(
															"No Option available for this condition.",
															"combo-blocks"
														)}
													</div>
												)}

												{id == "onChangeFields" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Field Name", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.value}
																onChange={(newVal) => {
																	var submitTriggersX = { ...submitTriggers };
																	submitTriggersX[groupIndex]["value"] = newVal;
																	setAttributes({
																		submitTriggers: submitTriggersX,
																	});
																}}
															/>
														</div>
													</>
												)}
												{id == "dateCountdownExpired" && (
													<>
														<ToggleControl
															label={__("Is Once?", "combo-blocks")}
															className="my-4"
															help={
																groupData.once
																	? __("IsOnce is Enable", "combo-blocks")
																	: __("IsOnce is disabled.", "combo-blocks")
															}
															checked={groupData.once ? true : false}
															onChange={(newVal) => {
																var submitTriggersX = { ...submitTriggers };
																submitTriggersX[groupIndex]["once"] =
																	groupData.once ? 0 : 1;
																setAttributes({
																	submitTriggers: submitTriggersX,
																});
															}}
														/>
													</>
												)}

												{id == "clickElement" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element #ID or .Class", "combo-blocks")}
															</label>
															<TextareaControl
																value={groupData.url}
																onChange={(newVal) => {
																	var submitTriggersX = { ...submitTriggers };
																	submitTriggersX[groupIndex]["value"] = newVal;
																	setAttributes({
																		submitTriggers: submitTriggersX,
																	});
																}}
															/>
														</div>
													</>
												)}
											</>
										</PGtoggle>
									);
								})}
							</div>
						</PGtoggle>
						<PGtoggle
							className="font-medium text-slate-900 "
							title={__("Extra", "combo-blocks")}
							initialOpen={false}>
							<PGtoggle
								className="font-medium text-slate-900 "
								title="Form Wrap"
								initialOpen={false}>
								<PGtabs
									activeTab="styles"
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
											value={form.options?.class}
											onChange={(newVal) => {
												var options = { ...form.options, class: newVal };
												setAttributes({
													form: { styles: form.styles, options: options },
												});
											}}
										/>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={form}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													form,
													"form",
													formSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													form,
													"form",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													form,
													"form",
													formSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													form,
													"form",
													formSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													form,
													"form",
													formSelector,
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
								title={__("Input", "combo-blocks")}
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={input}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													input,
													"input",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													input,
													"input",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													input,
													"input",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													input,
													"input",
													inputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													input,
													"input",
													inputSelector,
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
								title="Textarea"
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={textarea}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													textarea,
													"textarea",
													textareaSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													textarea,
													"textarea",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													textarea,
													"textarea",
													textareaSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													textarea,
													"textarea",
													textareaSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													textarea,
													"textarea",
													textareaSelector,
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
								title="Select"
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={selectInput}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													selectInput,
													"selectInput",
													selectInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													selectInput,
													"selectInput",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													selectInput,
													"selectInput",
													selectInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													selectInput,
													"selectInput",
													selectInputSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													selectInput,
													"selectInput",
													selectInputSelector,
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
								title={__("Label", "combo-blocks")}
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={label}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													label,
													"label",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													label,
													"label",
													labelSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													label,
													"label",
													labelSelector,
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
								title={__("Error Wrap", "combo-blocks")}
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={errorWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													errorWrap,
													"errorWrap",
													errorWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													errorWrap,
													"errorWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													errorWrap,
													"errorWrap",
													errorWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													errorWrap,
													"errorWrap",
													errorWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													errorWrap,
													"errorWrap",
													errorWrapSelector,
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
								title={__("Responses Message Wrap", "combo-blocks")}
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
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={responsesMsgWrap}
											onChange={(sudoScource, newVal, attr) => {
												myStore.onChangeStyleElement(
													sudoScource,
													newVal,
													attr,
													responsesMsgWrap,
													"responsesMsgWrap",
													responsesMsgWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onAdd={(sudoScource, key) => {
												myStore.onAddStyleElement(
													sudoScource,
													key,
													responsesMsgWrap,
													"responsesMsgWrap",
													setAttributes
												);
											}}
											onRemove={(sudoScource, key) => {
												myStore.onRemoveStyleElement(
													sudoScource,
													key,
													responsesMsgWrap,
													"responsesMsgWrap",
													responsesMsgWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onBulkAdd={(sudoScource, cssObj) => {
												myStore.onBulkAddStyleElement(
													sudoScource,
													cssObj,
													responsesMsgWrap,
													"responsesMsgWrap",
													responsesMsgWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
											onReset={(sudoSources) => {
												myStore.onResetElement(
													sudoSources,
													responsesMsgWrap,
													"responsesMsgWrap",
													responsesMsgWrapSelector,
													blockCssY,
													setAttributes
												);
											}}
										/>
									</PGtab>
								</PGtabs>
							</PGtoggle>
						</PGtoggle>

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
					{!hasInnerBlocks && (
						<div {...innerBlocksProps} className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										{__("Click to pick a variation", "combo-blocks")}
									</div>
									<div
										className="bg-gray-700 rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													["combo-blocks/text", {}],
												]),
												true
											);
										}}>
										{__("Skip", "combo-blocks")}
									</div>
								</div>
								<div {...innerBlocksProps} className="">
									<ComboBlocksVariationsPicker
										blockName={"form-wrap"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							<form onSubmit={onFormSubmit}>{innerBlocksProps.children}</form>
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file
		var attributes = props.attributes;
		var wrapper = attributes.wrapper;
		var visible = attributes.visible;
		var blockId = attributes.blockId;
		const blockProps = useBlockProps.save({
			className: ` ${blockId} ${wrapper.options.class}`,
		});
		return <InnerBlocks.Content />;
		//return null;
	},
});
