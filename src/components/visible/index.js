import {
	Button,
	PanelRow,
	PanelBody,
	ToggleControl,
	Dropdown,
	Popover,
	SelectControl,
	RangeControl,
	Panel,
	DropdownMenu,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Spinner,
	Tooltip,
	DateTimePicker,
	DatePicker,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

import { __experimentalInputControl as InputControl } from "@wordpress/components";

import {
	useState,
	useEffect,
	Component,
	RawHTML,

	////
	useRef,

	////
} from "@wordpress/element";
import { Icon, close } from "@wordpress/icons";
import PGDropdown from "../../components/dropdown";
import PGtoggle from "../toggle";

function Html(props) {
	if (!props.warn) {
		return null;
	}



	const [visible, setVisible] = useState(props.visible);
	const [postTypes, setpostTypes] = useState({});
	const [PMProLevels, setPMProLevels] = useState(null);
	const [MeprMemberships, setMeprMemberships] = useState({});

	console.log(visible);


	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);

	console.log(visible);


	var [enableDatePicker, setenableDatePicker] = useState(false);
	const [userRoles, setuserRoles] = useState({});
	const [taxonomies, settaxonomies] = useState({});

	// useEffect(() => {
	// 	props.onChange(visible);
	// }, [visible]);

	useEffect(() => {
		var visibleX = { ...visible };
		visibleX.rules = rules;

		setVisible(visibleX);
		props.onChange(visibleX);
		console.log(rules);

	}, [rules]);

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/post_types",
			method: "POST",
			data: {},
		}).then((res) => {
			var types = Object.fromEntries(
				Object.entries(res).map(([key, value]) => [
					key,
					{ label: value, value: key },
				])
			);
			// Object.entries(res).map((x) => {
			// 	var postTypeId = x[0];
			// 	var postTypeLabel = x[1];
			// 	types.push({ label: postTypeLabel, value: postTypeId });
			// });

			setpostTypes(types);
		});

		apiFetch({
			path: "/post-grid/v2/pmpro_membership_levels",
			method: "POST",
			data: {},
		}).then((res) => {
			var levels = Object.fromEntries(
				Object.entries(res).map(([key, args]) => [
					key,
					{ label: args.name, value: args.id },
				])
			);
			setPMProLevels(levels);
		});
		apiFetch({
			path: "/post-grid/v2/mepr_memberships",
			method: "POST",
			data: {},
		}).then((res) => {
			var levels = Object.fromEntries(
				Object.entries(res).map(([key, args]) => [
					args.value,
					{ label: args.label, value: args.value },
				])
			);
			setMeprMemberships(levels);
		});
	}, []);

	useEffect(() => {
		apiFetch({
			path: "/post-grid/v2/get_site_data",
			method: "POST",
			data: {},
		}).then((res) => {
			var userRolesList = [];

			Object.entries(res.roles).map((args) => {
				var id = args[0];
				var label = args[1];
				userRolesList.push({ label: label, value: id });
			});
			var taxonomiesList = {};

			// Object.entries(res.taxonomies).map((args) => {
			// 	var id = args[0];
			// 	var label = args[1];
			// 	taxonomiesList.push({ label: label, value: id });
			// });

			res?.taxonomies.forEach((tax, index) => {
				taxonomiesList[tax.id] = { label: tax.label, value: tax.id };
			});

			setuserRoles(userRolesList);
			settaxonomies(taxonomiesList);
		});
	}, []);

	var pageTypes = {
		isHome: { label: "Home", value: "isHome" },
		isFrontPage: {
			label: "Front page",
			value: "isFrontPage",
		},
		isBlog: {
			label: "Posts Page",
			value: "isBlog",
		},
		is404: { label: "Date Page", value: "is404" },
		wcisAccountPage: {
			label: "WooCommerce Account",
			value: "wcisAccountPage",
		},
		wcShop: {
			label: "WooCommerce Shop",
			value: "wcShop",
		},
		searchPage: {
			label: "Search page",
			value: "searchPage",
		},
	};

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
		0: { label: "Sunday", value: 0 },
		1: { label: "Monday", value: 1 },
		2: { label: "Tuesday", value: 2 },
		3: { label: "Wednesday", value: 3 },
		4: { label: "Thursday", value: 4 },
		5: { label: "Friday", value: 5 },
		6: { label: "Saturday", value: 6 },
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

	var countryName = [
		{ label: "Afghanistan", value: "afghanistan" },
		{ label: "Albania", value: "albania" },
		{ label: "Algeria", value: "algeria" },
		{ label: "Andorra", value: "andorra" },
		{ label: "Angola", value: "angola" },
		{ label: "Antigua and Barbuda", value: "antiguaAndBarbuda" },
		{ label: "Argentina", value: "argentina" },
		{ label: "Armenia", value: "armenia" },
		{ label: "Australia", value: "australia" },
		{ label: "Austria", value: "austria" },
		{ label: "Azerbaijan", value: "azerbaijan" },
		{ label: "Bahamas", value: "bahamas" },
		{ label: "Bahrain", value: "bahrain" },
		{ label: "Bangladesh", value: "bangladesh" },
		{ label: "Barbados", value: "barbados" },
		{ label: "Belarus", value: "belarus" },
		{ label: "Belgium", value: "belgium" },
		{ label: "Belize", value: "belize" },
		{ label: "Benin", value: "benin" },
		{ label: "Bhutan", value: "bhutan" },
		{ label: "Bolivia", value: "bolivia" },
		{ label: "Bosnia and Herzegovina", value: "bosniaAndHerzegovina" },
		{ label: "Botswana", value: "botswana" },
		{ label: "Brazil", value: "brazil" },
		{ label: "Brunei", value: "brunei" },
		{ label: "Bulgaria", value: "bulgaria" },
		{ label: "Burkina Faso", value: "burkinaFaso" },
		{ label: "Burundi", value: "burundi" },
		{ label: "Cabo Verde", value: "caboVerde" },
		{ label: "Cambodia", value: "cambodia" },
		{ label: "Cameroon", value: "cameroon" },
		{ label: "Canada", value: "canada" },
		{ label: "Central African Republic", value: "centralAfricanRepublic" },
		{ label: "Chad", value: "chad" },
		{ label: "Chile", value: "chile" },
		{ label: "China", value: "china" },
		{ label: "Colombia", value: "colombia" },
		{ label: "Comoros", value: "comoros" },
		{ label: "Congo", value: "congo" },
		{ label: "Costa Rica", value: "costaRica" },
		{ label: "Croatia", value: "croatia" },
		{ label: "Cuba", value: "cuba" },
		{ label: "Cyprus", value: "cyprus" },
		{ label: "Czechia", value: "czechia" },
		{ label: "Denmark", value: "denmark" },
		{ label: "Djibouti", value: "djibouti" },
		{ label: "Dominica", value: "dominica" },
		{ label: "Dominican Republic", value: "dominicanRepublic" },
		{ label: "Ecuador", value: "ecuador" },
		{ label: "Egypt", value: "egypt" },
		{ label: "El Salvador", value: "elSalvador" },
		{ label: "Equatorial Guinea", value: "equatorialGuinea" },
		{ label: "Eritrea", value: "eritrea" },
		{ label: "Estonia", value: "estonia" },
		{ label: "Eswatini", value: "eswatini" },
		{ label: "Ethiopia", value: "ethiopia" },
		{ label: "Fiji", value: "fiji" },
		{ label: "Finland", value: "finland" },
		{ label: "France", value: "france" },
		{ label: "Gabon", value: "gabon" },
		{ label: "Gambia", value: "gambia" },
		{ label: "Georgia", value: "georgia" },
		{ label: "Germany", value: "germany" },
		{ label: "Ghana", value: "ghana" },
		{ label: "Greece", value: "greece" },
		{ label: "Grenada", value: "grenada" },
		{ label: "Guatemala", value: "guatemala" },
		{ label: "Guinea", value: "guinea" },
		{ label: "Guinea-Bissau", value: "guineaBissau" },
		{ label: "Guyana", value: "guyana" },
		{ label: "Haiti", value: "haiti" },
		{ label: "Honduras", value: "honduras" },
		{ label: "Hungary", value: "hungary" },
		{ label: "Iceland", value: "iceland" },
		{ label: "India", value: "india" },
		{ label: "Indonesia", value: "indonesia" },
		{ label: "Iran", value: "iran" },
		{ label: "Iraq", value: "iraq" },
		{ label: "Ireland", value: "ireland" },
		{ label: "Israel", value: "israel" },
		{ label: "Italy", value: "italy" },
		{ label: "Jamaica", value: "jamaica" },
		{ label: "Japan", value: "japan" },
		{ label: "Jordan", value: "jordan" },
		{ label: "Kazakhstan", value: "kazakhstan" },
		{ label: "Kenya", value: "kenya" },
		{ label: "Kiribati", value: "kiribati" },
		{ label: "Korea, North", value: "koreaNorth" },
		{ label: "Korea, South", value: "koreaSouth" },
		{ label: "Kosovo", value: "kosovo" },
		{ label: "Kuwait", value: "kuwait" },
		{ label: "Kyrgyzstan", value: "kyrgyzstan" },
		{ label: "Laos", value: "laos" },
		{ label: "Latvia", value: "latvia" },
		{ label: "Lebanon", value: "lebanon" },
		{ label: "Lesotho", value: "lesotho" },
		{ label: "Liberia", value: "liberia" },
		{ label: "Libya", value: "libya" },
		{ label: "Liechtenstein", value: "liechtenstein" },
		{ label: "Lithuania", value: "lithuania" },
		{ label: "Luxembourg", value: "luxembourg" },
		{ label: "Madagascar", value: "madagascar" },
		{ label: "Malawi", value: "malawi" },
		{ label: "Malaysia", value: "malaysia" },
		{ label: "Maldives", value: "maldives" },
		{ label: "Mali", value: "mali" },
		{ label: "Malta", value: "malta" },
		{ label: "Marshall Islands", value: "marshallIslands" },
		{ label: "Mauritania", value: "mauritania" },
		{ label: "Mauritius", value: "mauritius" },
		{ label: "Mexico", value: "mexico" },
		{ label: "Micronesia", value: "micronesia" },
		{ label: "Moldova", value: "moldova" },
		{ label: "Monaco", value: "monaco" },
		{ label: "Mongolia", value: "mongolia" },
		{ label: "Montenegro", value: "montenegro" },
		{ label: "Morocco", value: "morocco" },
		{ label: "Mozambique", value: "mozambique" },
		{ label: "Myanmar", value: "myanmar" },
		{ label: "Namibia", value: "namibia" },
		{ label: "Nauru", value: "nauru" },
		{ label: "Nepal", value: "nepal" },
		{ label: "Netherlands", value: "netherlands" },
		{ label: "New Zealand", value: "newZealand" },
		{ label: "Nicaragua", value: "nicaragua" },
		{ label: "Niger", value: "niger" },
		{ label: "Nigeria", value: "nigeria" },
		{ label: "North Macedonia", value: "northMacedonia" },
		{ label: "Norway", value: "norway" },
		{ label: "Oman", value: "oman" },
		{ label: "Pakistan", value: "pakistan" },
		{ label: "Palau", value: "palau" },
		{ label: "Palestine", value: "palestine" },
		{ label: "Panama", value: "panama" },
		{ label: "Papua New Guinea", value: "papuaNewGuinea" },
		{ label: "Paraguay", value: "paraguay" },
		{ label: "Peru", value: "peru" },
		{ label: "Philippines", value: "philippines" },
		{ label: "Poland", value: "poland" },
		{ label: "Portugal", value: "portugal" },
		{ label: "Qatar", value: "qatar" },
		{ label: "Romania", value: "romania" },
		{ label: "Russia", value: "russia" },
		{ label: "Rwanda", value: "rwanda" },
		{ label: "Saint Kitts and Nevis", value: "saintKittsAndNevis" },
		{ label: "Saint Lucia", value: "saintLucia" },
		{
			label: "Saint Vincent and the Grenadines",
			value: "saintVincentAndTheGrenadines",
		},
		{ label: "Samoa", value: "samoa" },
		{ label: "San Marino", value: "sanMarino" },
		{ label: "Sao Tome and Principe", value: "saoTomeAndPrincipe" },
		{ label: "Saudi Arabia", value: "saudiArabia" },
		{ label: "Senegal", value: "senegal" },
		{ label: "Serbia", value: "serbia" },
		{ label: "Seychelles", value: "seychelles" },
		{ label: "Sierra Leone", value: "sierraLeone" },
		{ label: "Singapore", value: "singapore" },
		{ label: "Slovakia", value: "slovakia" },
		{ label: "Slovenia", value: "slovenia" },
		{ label: "Solomon Islands", value: "solomonIslands" },
		{ label: "Somalia", value: "somalia" },
		{ label: "South Africa", value: "southAfrica" },
		{ label: "South Sudan", value: "southSudan" },
		{ label: "Spain", value: "spain" },
		{ label: "Sri Lanka", value: "sriLanka" },
		{ label: "Sudan", value: "sudan" },
		{ label: "Suriname", value: "suriname" },
		{ label: "Sweden", value: "sweden" },
		{ label: "Switzerland", value: "switzerland" },
		{ label: "Syria", value: "syria" },
		{ label: "Taiwan", value: "taiwan" },
		{ label: "Tajikistan", value: "tajikistan" },
		{ label: "Tanzania", value: "tanzania" },
		{ label: "Thailand", value: "thailand" },
		{ label: "Timor-Leste", value: "timorLeste" },
		{ label: "Togo", value: "togo" },
		{ label: "Tonga", value: "tonga" },
		{ label: "Trinidad and Tobago", value: "trinidadAndTobago" },
		{ label: "Tunisia", value: "tunisia" },
		{ label: "Turkey", value: "turkey" },
		{ label: "Turkmenistan", value: "turkmenistan" },
		{ label: "Tuvalu", value: "tuvalu" },
		{ label: "Uganda", value: "uganda" },
		{ label: "Ukraine", value: "ukraine" },
		{ label: "United Arab Emirates", value: "unitedArabEmirates" },
		{ label: "United Kingdom", value: "unitedKingdom" },
		{ label: "United States", value: "unitedStates" },
		{ label: "Uruguay", value: "uruguay" },
		{ label: "Uzbekistan", value: "uzbekistan" },
		{ label: "Vanuatu", value: "vanuatu" },
		{ label: "Vatican City", value: "vaticanCity" },
		{ label: "Venezuela", value: "venezuela" },
		{ label: "Vietnam", value: "vietnam" },
		{ label: "Yemen", value: "yemen" },
		{ label: "Zambia", value: "zambia" },
		{ label: "Zimbabwe", value: "zimbabwe" },
	];

	var capabilities = {
		manage_links: { label: "Manage Links", value: "manage_links" },
		manage_options: { label: "Manage Options", value: "manage_options" },
	};

	function getCountryByValue(value) {
		const foundSize = countryName.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var capabilities = {
		read: { label: "read", value: "read" },
		edit_post: { label: "edit_post", value: "edit_post" },
		edit_posts: { label: "edit_posts", value: "edit_posts" },
		delete_posts: { label: "delete_posts", value: "delete_posts" },
		publish_posts: { label: "publish_posts", value: "publish_posts" },
	};

	var displaySize = [
		{ label: "Desktop", value: "desktop" },
		{ label: "Tablet", value: "tablet" },
		{ label: "Mobile", value: "mobile" },
	];

	function getDeviceByValue(value) {
		// for (const key in displaySize) {
		// 	if (displaySize[key].value === value) {
		// 		return displaySize[key].label;
		// 	}
		// }
		// return null; // Return null if the value is not found
		const foundSize = displaySize.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var browserList = [
		{
			label: "Google Chrome",
			value: "googleChrome",
		},
		{
			label: "Mozilla Firefox",
			value: "mozillaFirefox",
		},
		{ label: "Safari", value: "safari" },
		{
			label: "Microsoft Edge",
			value: "microsoftEdge",
		},
		{ label: "Opera", value: "opera" },
		{ label: "Brave", value: "brave" },
		{ label: "Vivaldi", value: "vivaldi" },
		{ label: "Tor Browser", value: "torBrowser" },
		{ label: "UC Browser", value: "ucBrowser" },
		{ label: "Chromium", value: "chromium" },
		{ label: "Maxthon", value: "maxthon" },
		{ label: "Pale Moon", value: "paleMoon" },
		{
			label: "Avant Browser",
			value: "avantBrowser",
		},
		{
			label: "Epic Privacy Browser",
			value: "epicPrivacyBrowser",
		},
		{ label: "Waterfox", value: "waterfox" },
	];

	function getBrowserByValue(value) {
		const foundSize = browserList.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}
	var platformList = [
		{
			label: "Google Chrome",
			value: "googleChrome",
		},
		{
			label: "Mozilla Firefox",
			value: "mozillaFirefox",
		},
		{ label: "Safari", value: "safari" },
		{
			label: "Microsoft Edge",
			value: "microsoftEdge",
		},
		{ label: "Opera", value: "opera" },
		{ label: "Brave", value: "brave" },
		{ label: "Vivaldi", value: "vivaldi" },
		{ label: "Tor Browser", value: "torBrowser" },
		{ label: "UC Browser", value: "ucBrowser" },
		{ label: "Chromium", value: "chromium" },
		{ label: "Maxthon", value: "maxthon" },
		{ label: "Pale Moon", value: "paleMoon" },
		{
			label: "Avant Browser",
			value: "avantBrowser",
		},
		{
			label: "Epic Privacy Browser",
			value: "epicPrivacyBrowser",
		},
		{ label: "Waterfox", value: "waterfox" },
	];

	function getPlatformByValue(value) {
		const foundSize = platformList.find((X) => X.value === value);
		return foundSize ? foundSize.label : null;
	}

	var visibleArgsBasic = {
		userLogged: {
			label: "User Logged",
			description: "Show when user logged-in(any user)",
			args: { id: "userLogged", value: "" },
		},
		userNotLogged: {
			label: "User Not Logged",
			description: "Show when user Not logged-in.",
			args: { id: "userNotLogged", value: "" },
		},
		userRoles: {
			label: "User Roles",
			description: "Show when user has specific roles.",
			args: { id: "userRoles", roles: [], compare: "include" },
			isPro: false,
		},
		userIds: {
			label: "User Ids",
			description: "Show when user has specific ids.",
			args: { id: "userIds", value: "", values: [], compare: "=" },
			//isPro: true,
		},
		// isDevice: {
		// 	label: "Device",
		// 	description: "",
		// 	args: { id: "isDevice", value: "", values: [], compare: "include" },
		// 	isPro: false,
		// },
		// isBrowsers: {
		// 	label: "Is Browsers",
		// 	description: "",
		// 	args: { id: "isBrowsers", value: "", values: [], compare: "include" },
		// 	isPro: false,
		// },
		isCategory: {
			label: "isCategory",
			description: "",
			args: { id: "isCategory", value: "" },
			isPro: false,
		},
		isTag: {
			label: "isTag",
			description: "",
			args: { id: "isTag", value: "" },
			isPro: false,
		},
		isPage: {
			label: "isPage",
			description: "",
			args: { id: "isPage", value: "" },
			isPro: false,
		},
		isSingle: {
			label: "isSingle",
			description: "",
			args: { id: "isSingle", value: "" },
			isPro: false,
		},
		isHome: {
			label: "Is Home",
			description: "",
			args: { id: "isHome", value: "" },
			isPro: false,
		},

		isFrontPage: {
			label: "Is Front page",
			description: "",
			args: { id: "isFrontPage", value: "" },
			isPro: false,
		},
		isBlog: {
			label: "Is Posts Page",
			description: "",
			args: { id: "isBlog", value: "" },
			isPro: false,
		},
		isCommentsOpen: {
			label: "Is Comments Open",
			description: "",
			args: { id: "isCommentsOpen", value: "" },
			isPro: false,
		},
		isPostArchive: {
			label: "Is Post Archive",
			description: "",
			args: { id: "isPostArchive", value: "", values: [], compare: "" },
			isPro: false,
		},
		isArchive: {
			label: "Is Archive",
			description: "",
			args: { id: "isArchive", value: "" },
			isPro: false,
		},
		isYears: {
			label: "is Years",
			description: "Show when specific Years",
			args: { id: "isYears", value: "", values: "", compare: "=" },
			isPro: true,
		},
		isMonths: {
			label: "is Months",
			description: "Show when specific months",
			args: { id: "isMonths", value: "", values: [], compare: "=" },
			isPro: true,
		},
		weekDays: {
			label: "is Week day",
			description: "Show when specific week days",
			args: { id: "weekDays", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isHours: {
			label: "is Hours",
			description: "Show when specific hours",
			args: { id: "isHours", value: "", values: [], compare: "=" },
			isPro: true,
		},
		//isMinutes: { label: 'is Minutes', description: 'Show when specific Minutes', args: { id: 'isMinutes', value: '', values: [], compare: '=' }, isPro:true },
		isDates: {
			label: "is Dates",
			description: "Show when specific date",
			args: { id: "isDates", value: "", values: [], compare: "=" },
			isPro: true,
		},

		urlString: {
			label: "URL String",
			description: "If URL contain certain string.",
			args: { id: "urlString", value: "" },
			isPro: true,
		},
		urlPrams: {
			label: "URL Prams",
			description:
				"If URL contain certain parameter(ex: domain.com/some-page?urlPram=pramVal)",
			args: { id: "urlPrams", value: "" },
			isPro: true,
		},
		referrerExist: {
			label: "Referrer Exist",
			description: "",
			args: { id: "referrerExist", value: "" },
			isPro: true,
		},

		// isUserMeta: {
		// 	label: "User Meta",
		// 	description: "",
		// 	args: { id: "isUserMeta", value: "", values: [], compare: "=" },
		// 	isPro: true,
		// },
		// isPostMeta: {
		// 	label: "Post Meta",
		// 	description: "",
		// 	args: { id: "isPostMeta", value: "", values: [], compare: "=" },
		// 	isPro: true,
		// },
		// isPlatforms: {
		// 	label: "Is Platform",
		// 	description: "",
		// 	args: { id: "isPlatforms", value: "", values: [], compare: "=" },
		// 	isPro: true,
		// },

		// isCountries: {
		// 	label: "Is Country",
		// 	description: "",
		// 	args: { id: "isCountries", value: "", values: [], compare: "include" },
		// 	isPro: true,
		// },

		userCapabilities: {
			label: "User Capability",
			description: "",
			args: {
				id: "userCapabilities",
				value: "",
				values: [],
				compare: "exist",
			},
			isPro: true,
		},

		postsIds: {
			label: "Post Ids",
			description: "",
			args: { id: "postsIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		termIds: {
			label: "Term Ids",
			description: "",
			args: { id: "termIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		authorIds: {
			label: "Author Ids",
			description: "",
			args: { id: "authorIds", value: "", values: [], compare: "include" },
			isPro: true,
		},

		isSticky: {
			label: "Is Sticky",
			description: "",
			args: { id: "isSticky", value: "" },
			isPro: true,
		},
		isPostHierarchical: {
			label: "Is Post Hierarchical",
			description: "",
			args: { id: "isPostHierarchical", value: "" },
			isPro: true,
		},

		isPageTemplate: {
			label: "Is Page Template",
			description: "",
			args: { id: "isPageTemplate", value: "", values: [], compare: "" },
			isPro: true,
		},

		isTax: {
			label: "Is Tax",
			description: "",
			args: { id: "isTax", value: "", values: [], compare: "" },
			isPro: true,
		},
		isAuthor: {
			label: "Is Author",
			description: "",
			args: { id: "isAuthor", value: "", values: [], compare: "" },
			isPro: true,
		},
		isMultiAuthor: {
			label: "Is Multi Author",
			description: "",
			args: { id: "isMultiAuthor", value: "" },
			isPro: true,
		},
		isDate: {
			label: "Is Date",
			description: "",
			args: { id: "isDate", value: "" },
			isPro: true,
		},
		isYear: {
			label: "Is Year",
			description: "",
			args: { id: "isYear", value: "" },
			isPro: true,
		},
		isMonth: {
			label: "Is Month",
			description: "",
			args: { id: "isMonth", value: "" },
			isPro: true,
		},
		isDay: {
			label: "Is Day",
			description: "",
			args: { id: "isDay", value: "" },
			isPro: true,
		},
		isTime: {
			label: "Is Time",
			description: "",
			args: { id: "isTime", value: "" },
			isPro: true,
		},
		isNewDay: {
			label: "Is NewDay",
			description: "",
			args: { id: "isNewDay", value: "" },
			isPro: true,
		},

		isSearch: {
			label: "Is Search",
			description: "",
			args: { id: "isSearch", value: "", compare: "contain" }, // start with, end with, contain, not contain, =, !=
			isPro: true,
		},
		is404: {
			label: "Is 404",
			description: "",
			args: { id: "is404", value: "" },
			isPro: true,
		},
		isAttachment: {
			label: "Is Attachment",
			description: "",
			args: { id: "isAttachment", value: "" },
			isPro: true,
		},
		isSingular: {
			label: "Is Singular",
			description: "",
			args: { id: "isSingular", value: "" },
			isPro: true,
		},
		isMainQuery: {
			label: "Is MainQuery",
			description: "",
			args: { id: "isMainQuery", value: "", values: [], compare: "" },
			isPro: true,
		},
		isFeed: {
			label: "Is Feed",
			description: "",
			args: { id: "isFeed", value: "" },
			isPro: true,
		},
		isTrackback: {
			label: "Is Trackback",
			description: "",
			args: { id: "isTrackback", value: "" },
			isPro: true,
		},
		isPreview: {
			label: "Is Preview",
			description: "",
			args: { id: "isPreview", value: "" },
			isPro: true,
		},
		hasExcerpt: {
			label: "Has Excerpt",
			description: "",
			args: { id: "hasExcerpt", value: "" },
			isPro: true,
		},
		hasNavMenu: {
			label: "Has NavMenu",
			description: "",
			args: { id: "hasNavMenu", value: "" },
			isPro: true,
		},
		isRtl: {
			label: "Is Rtl",
			description: "",
			args: { id: "isRtl", value: "" },
			isPro: true,
		},
		hasPostThumbnail: {
			label: "Has Post Thumbnail",
			description: "",
			args: { id: "hasPostThumbnail", value: "" },
			isPro: true,
		},
		isUserLoggedIn: {
			label: "Is UserLoggedIn",
			description: "",
			args: { id: "isUserLoggedIn", value: "" },
			isPro: true,
		},
		isMainSite: {
			label: "Is Main Site",
			description: "",
			args: { id: "isMainSite", siteId: "", networkId: "" },
			isPro: true,
		},

		hasTerm: {
			label: "Has Term",
			description: "",
			args: { id: "hasTerm", value: "" },
			isPro: true,
		},
		isTaxonomyHierarchical: {
			label: "Is Taxonomy Hierarchical",
			description: "",
			args: { id: "isTaxonomyHierarchical", value: "" },
			isPro: true,
		},
		taxonomyExists: {
			label: "Taxonomy Exists",
			description: "",
			args: { id: "taxonomyExists", value: "" },
			isPro: true,
		},

		hasPostParent: {
			label: "Has Post Parent",
			description: "",
			args: { id: "hasPostParent", value: "" },
			isPro: true,
		},

		wcisAccountPage: {
			label: "Is WooCommerce Account",
			description: "",
			args: { id: "wcisAccountPage", value: "" },
			isPro: true,
		},
		wcShop: {
			label: "Is WooCommerce Shop",
			description: "",
			args: { id: "wcShop", value: "" },
			isPro: true,
		},
		wchasUpSells: {
			label: "WooCommerce - Has Up-sells",
			description: "",
			args: { id: "wchasUpSells", value: "", compare: "exist" },
			isPro: true,
		},
		wchasCrossSells: {
			label: "WooCommerce - Has Cross-sells",
			description: "",
			args: { id: "wchasCrossSells", value: "", compare: "exist" },
			isPro: true,
		},
		wcisCart: {
			label: "WooCommerce - is Cart Page",
			description: "",
			args: { id: "wcisCart", value: "" },
			isPro: true,
		},
		wcisCheckout: {
			label: "WooCommerce - is checkout page",
			description: "",
			args: { id: "wcisCheckout", value: "" },
			isPro: true,
		},
		wcisOnSale: {
			label: "WooCommerce - is on sale",
			description: "",
			args: { id: "wcisOnSale", value: "" },
			isPro: true,
		},
		wcisInStock: {
			label: "WooCommerce - is in stock",
			description: "",
			args: { id: "wcisInStock", value: "", compare: "inStock" },
			isPro: true,
		},
		wcproductType: {
			label: "WooCommerce - product Type",
			description: "",
			args: { id: "wcproductType", value: "" },
			isPro: true,
		},

		hasCookie: {
			label: "Has Cookie",
			description: "If certain cookie exist",
			args: { id: "hasCookie", cookieName: "", value: "", compare: "exist" },
			isPro: true,
		},

		// queryArgsExist: {
		// 	label: "Query Arg Exist",
		// 	description: "",
		// 	args: { id: "queryArgsExist", value: "" },
		// 	isPro: false,

		// },
		// userVisitXPages: {
		// 	label: "User has viewed X Page",
		// 	description: "",
		// 	args: { id: "userVisitXPages", value: "" },
		// 	isPro: false,
		// },

		hasPostComments: {
			label: "Has Post Comments",
			description: "",
			args: { id: "hasPostComments", value: "", count: 0, compare: "=" },
			isPro: true,
		},
		hasUserComments: {
			label: "Has User Comments",
			description: "",
			args: { id: "hasUserComments", value: "", count: 0, compare: "=" },
			isPro: true,
		},
		hasUserCommentsOnPost: {
			label: "Has User Comments On Post",
			description: "",
			args: { id: "hasUserCommentsOnPost", value: "", compare: "=" },
			isPro: true,
		},

		// queryArgEqualX: {
		// 	label: "Query arg equals X",
		// 	description: "",
		// 	args: { id: "queryArgEqualX", value: "" },
		// 	isPro: false,
		// },
		postTypes: {
			label: "Post Types",
			description: "",
			args: { id: "postTypes", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		pageTypes: {
			label: "Page Types",
			description: "",
			args: { id: "pageTypes", value: "", values: [], compare: "exist" },
			isPro: true,
		},

		hasPostTerms: {
			label: "Post has terms",
			description: "",
			args: {
				id: "hasPostTerms",
				value: "",
				taxonomy: "",
				values: [],
				compare: "exist",
			},
			isPro: true,
		},

		hasPostCategories: {
			label: "Has Post Categories",
			description: "",
			args: { id: "postCategories", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasPostTags: {
			label: "Has Post Tags",
			description: "",
			args: { id: "hasPostTags", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasPostFormat: {
			label: "Has Post Format",
			description: "",
			args: { id: "hasPostFormat", format: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasMeta: {
			label: "Has Meta",
			description: "",
			args: { id: "hasMeta", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasBlock: {
			label: "Has Block",
			description: "",
			args: { id: "hasBlock", blockName: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasAction: {
			label: "Has Action",
			description: "",
			args: { id: "hasAction", hookName: "", callback: "", compare: "exist" },
			isPro: true,
		},
		hasBlocks: {
			label: "Has Blocks",
			description: "",
			args: { id: "hasBlocks", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasFilter: {
			label: "Has Filter",
			description: "",
			args: { id: "hasFilter", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasShortcode: {
			label: "Has Shortcode",
			description: "",
			args: { id: "hasShortcode", tag: "", compare: "exist" },
			isPro: true,
		},
		hasSiteIcon: {
			label: "Has SiteIcon",
			description: "",
			args: { id: "hasSiteIcon", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasTermMeta: {
			label: "Has TermMeta",
			description: "",
			args: { id: "hasTermMeta", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasCustomLogo: {
			label: "Has CustomLogo",
			description: "",
			args: { id: "hasCustomLogo", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasHeaderImage: {
			label: "Has HeaderImage",
			description: "",
			args: { id: "hasHeaderImage", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasHeaderVideo: {
			label: "Has Header Video",
			description: "",
			args: { id: "hasHeaderVideo", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasCustomHeader: {
			label: "Has Custom Header",
			description: "",
			args: { id: "hasCustomHeader", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		userCan: {
			label: "User Can",
			description: "",
			args: {
				id: "userCan",
				capability: "",
				args: "",
				values: [],
				compare: "include",
			},
			isPro: true,
		},
		authorCan: {
			label: "Author Can",
			description: "",
			args: {
				id: "authorCan",
				capability: "",
				args: "",
				values: [],
				compare: "include",
			},
			isPro: true,
		},
		hasPMproLevels: {
			label: "has PMPro Levels",
			description: "",
			args: { id: "hasPMproLevels", args: "", values: [], compare: "include" },
			isPro: true,
		},
		hasMeprMemberships: {
			label: "has Memberpress Memberships ",
			description: "",
			args: {
				id: "hasMeprMemberships",
				args: "",
				value: "",
				compare: "include",
			},
			isPro: true,
		},

		// visitCount: { label: 'Visit Count', description: 'Display popup based on date', args: { id: 'visitCount', value: '', compair: '' }, isPro: true },
	};

	let visibleArgs = applyFilters("postGridVisibleArgs", visibleArgsBasic);

	var RemoveVisibleGroup = function ({ title, index }) {
		return (
			<>
				<Icon
					icon={close}
					onClick={(ev) => {
						var rulesX = [...rules];

						rulesX.splice(index, 1);
						setrules(rulesX);
					}}
				/>

				<span>{title}</span>
			</>
		);
	};

	var RemoveVisibleArg = function ({ title, index, groupIndex }) {
		return (
			<>
				<span
					className="cursor-pointer hover:bg-red-500 hover:text-white "
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX[groupIndex].args.splice(index, 1);

						setrules(rulesX);
					}}>
					<Icon icon={close} />
				</span>

				<span>{title}</span>
			</>
		);
	};

	return (
		<div className="relative">
			<PanelRow className="my-3">
				<div
					// className="bg-indigo-300 hover:bg-indigo-500 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-indigo-400	 text-white font-medium rounded hover:bg-indigo-500	 hover:text-white focus:outline-none focus:bg-indigo-500	"
					onClick={(ev) => {
						var rulesX = [...rules];

						rulesX.push({ relation: "OR", title: "", args: [] });

						setrules(rulesX);
					}}>
					Add Group
				</div>

				<PGDropdown
					position="bottom right"
					variant="secondary"
					buttonTitle={
						visible?.relation == undefined ? "Relation?" : visible.relation
					}
					options={[
						{ label: "OR", value: "OR" },
						{ label: "AND", value: "AND" },
					]}
					onChange={(option, index) => {
						var visibleX = { ...visible };
						visibleX.relation = option.value;
						setVisible(visibleX);
					}}
					values=""></PGDropdown>
			</PanelRow>

			<div className="my-4">
				{rules.map((group, groupIndex) => {
					return (
						<PGtoggle
							title={
								<RemoveVisibleGroup title={groupIndex} index={groupIndex} />
							}
							initialOpen={false}>
							<PanelRow className="my-3">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Add"}
									options={visibleArgs}
									onChange={(option, index) => {
										var rulesX = [...rules];

										rulesX[groupIndex]["args"].push(option.args);
										setrules(rulesX);
									}}
									values=""></PGDropdown>

								<PanelRow>
									<label>Relation?</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											group["relation"] == undefined
												? "Choose"
												: group["relation"]
										}
										options={[
											{ label: "OR", value: "OR" },
											{ label: "AND", value: "AND" },
										]}
										onChange={(option, index) => {
											var rulesX = [...rules];
											rulesX[groupIndex]["relation"] = option.value;
											setrules(rulesX);
										}}
										values=""></PGDropdown>
								</PanelRow>
							</PanelRow>

							{rules[groupIndex]["args"] != undefined &&
								rules[groupIndex]["args"].map((item, index) => {
									var id = item.id;

									return (
										<>
											<PGtoggle
												title={
													<RemoveVisibleArg
														title={
															visibleArgs[id] == undefined
																? id
																: visibleArgs[id].label
														}
														index={index}
														groupIndex={groupIndex}
													/>
												}
												initialOpen={false}>
												{/* //*done */}
												{id == "userNotLogged" && (
													<div>No Option available for this condition.</div>
												)}

												{id == "userRoles" && (
													<div>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Add Role"}
															options={userRoles}
															onChange={(option, i) => {
																var rulesX = [...rules];

																var roles = item.roles;
																roles.push(option.value);
																rulesX[groupIndex]["args"][index].roles = roles;
																setrules(rulesX);
															}}
															value={item.roles}></PGDropdown>

														<div>
															{Object.entries(item.roles).map((x, k) => {
																var roleId = x[1];

																return (
																	<PanelRow className="mb-4">
																		<div>{roleId}</div>

																		<span
																			className="bg-red-500 p-1 cursor-pointer"
																			onClick={(ev) => {
																				var rulesX = [...rules];

																				//var roles = item.roles;
																				//roles.push(option.value);
																				rulesX[groupIndex]["args"][
																					index
																				].roles.splice(k, 1);
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</PanelRow>
																);
															})}
														</div>
													</div>
												)}

												{id == "userLogged" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}
												{id == "userIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																User IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "termIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Term IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "authorIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Author IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "postsIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Post IDs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "postTypes" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Choose"}
															options={postTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];

																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{postTypes != null && (
																			<span>{postTypes[x]?.label}</span>
																		)}

																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				item.values.splice(i, 1);
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "isPostArchive" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Choose"}
															options={postTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];

																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{postTypes != null && (
																			<span>{postTypes[x]?.label}</span>
																		)}

																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				item.values.splice(i, 1);
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "isAuthor" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Choose"}
															options={postTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];

																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{postTypes != null && (
																			<span>{postTypes[x]?.label}</span>
																		)}

																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				item.values.splice(i, 1);
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}

												{id == "isSingular" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={"Choose"}
															options={postTypes}
															onChange={(option, optionIndex) => {
																var rulesX = [...rules];

																rulesX[groupIndex]["args"][index][
																	"values"
																].push(option.value);
																setrules(rulesX);
															}}
															value={item.values}></PGDropdown>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex justify-between my-2">
																		{postTypes != null && (
																			<span>{postTypes[x]?.label}</span>
																		)}

																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				item.values.splice(i, 1);
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}

												{id == "pageTypes" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },

																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" || item.compare == "!=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		htmlFor=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose "
																				: pageTypes[item.value].label
																		}
																		options={pageTypes}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose "}
																		options={pageTypes}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{monthsNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}

														{/* </>
														)} */}
													</>
												)}

												{id == "hasPostTerms" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Term IDs/Slugs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Taxonomy
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.taxonomy}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].taxonomy =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "hasPostCategories" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Term IDs/Slugs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "hasPostTags" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Tag IDs/Slugs
															</label>
															<InputControl
																className="mr-2"
																placeholder="1,2,3"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{(id == "isYears" || id == "isMinutes") && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Year
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["value"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{item.compare == "between" && (
															<>
																<p> Please use comma separate values </p>
																<code>Ex: 2022,2023</code>
															</>
														)}

														{item.compare == "exist" && (
															<>
																<p> Please use comma separate values </p>
																<code>Ex: 2022,2023,2025</code>
															</>
														)}

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "isMonths" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={
																				item.value.length == 0
																					? "Choose"
																					: monthsNum[item.value].label
																			}
																			options={monthsNum}
																			onChange={(option, optionIndex) => {
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = option.value;
																				setrules(rulesX);
																			}}
																			value={item.value}></PGDropdown>
																	</PanelRow>
																</>
															)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																 */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={monthsNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{monthsNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={monthsNum}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];
																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																				"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{monthsNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{/* </>
														)} */}
													</>
												)}

												{id == "isDates" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>

																		<Button
																			className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-indigo-400	 !text-white font-medium !rounded hover:!bg-indigo-500	 hover:text-white focus:outline-none focus:bg-indigo-500	 ${enableDatePicker ? "!bg-gray-400" : ""
																				}`}
																			onClick={(ev) => {
																				setenableDatePicker((prev) => !prev);
																			}}>
																			{item.value.length == 0
																				? "Choose"
																				: item.value}
																		</Button>
																	</PanelRow>

																	{enableDatePicker && (
																		<Popover position="bottom left ">
																			<div className="p-4">
																				<DatePicker
																					onChange={(newDate) => {
																						const dateFull = new Date(newDate);

																						let day = dateFull.getDate();
																						day = day < 10 ? "0" + day : day;

																						let month = dateFull.getMonth() + 1;

																						month =
																							month.length > 1
																								? month
																								: "0" + month;

																						let year = dateFull.getFullYear();

																						var dateStr =
																							year + "-" + month + "-" + day;
																						var rulesX = [...rules];
																						rulesX[groupIndex]["args"][index][
																							"value"
																						] = dateStr;
																						setrules(rulesX);
																					}}
																					is12Hour={true}
																				/>
																			</div>
																		</Popover>
																	)}
																</>
															)}

														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>

																	<Button
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-indigo-400	 !text-white font-medium !rounded hover:!bg-indigo-500	 hover:text-white focus:outline-none focus:bg-indigo-500	 ${enableDatePicker ? "!bg-gray-400" : ""
																			}`}
																		onClick={(ev) => {
																			setenableDatePicker((prev) => !prev);
																		}}>
																		Choose
																	</Button>
																</PanelRow>

																{enableDatePicker && (
																	<Popover position="bottom left ">
																		<div className="p-4">
																			<DatePicker
																				onChange={(newDate) => {
																					const dateFull = new Date(newDate);
																					let day = dateFull.getDate();
																					day = day < 10 ? "0" + day : day;

																					let month = dateFull.getMonth() + 1;
																					month =
																						month.length > 1
																							? month
																							: "0" + month;
																					let year = dateFull.getFullYear();

																					var dateStr =
																						year + "-" + month + "-" + day;

																					var rulesX = [...rules];

																					var valuesArray =
																						rulesX[groupIndex]["args"][index][
																						"values"
																						];

																					if (valuesArray.length < 2) {
																						valuesArray.push(dateStr);
																						setrules(rulesX);
																					} else {
																					}

																					// rulesX[groupIndex]["args"][index][
																					// 	"values"
																					// ].push(dateStr);
																					// setrules(rulesX);
																				}}
																				is12Hour={true}
																			/>
																		</div>
																	</Popover>
																)}

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{x}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>

																	<Button
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-indigo-400	 !text-white font-medium !rounded hover:!bg-indigo-500	 hover:text-white focus:outline-none focus:bg-indigo-500	 ${enableDatePicker ? "!bg-gray-400" : ""
																			}`}
																		onClick={(ev) => {
																			setenableDatePicker((prev) => !prev);
																		}}>
																		Choose Date
																	</Button>
																</PanelRow>

																{enableDatePicker && (
																	<Popover position="bottom left ">
																		<div className="p-4">
																			<DatePicker
																				onChange={(newDate) => {
																					const dateFull = new Date(newDate);
																					let day = dateFull.getDate();
																					day = day < 10 ? "0" + day : day;

																					let month = dateFull.getMonth() + 1;
																					month =
																						month.length > 1
																							? month
																							: "0" + month;
																					let year = dateFull.getFullYear();

																					var dateStr =
																						year + "-" + month + "-" + day;

																					var rulesX = [...rules];

																					rulesX[groupIndex]["args"][index][
																						"values"
																					].push(dateStr);
																					setrules(rulesX);
																				}}
																				is12Hour={true}
																			/>
																		</div>
																	</Popover>
																)}

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{x}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}

												{id == "weekDays" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={
																				item.value.length == 0
																					? "Choose"
																					: weekDayNumn[item.value].label
																			}
																			options={weekDayNumn}
																			onChange={(option, optionIndex) => {
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = option.value;
																				setrules(rulesX);
																			}}
																			value={item.value}></PGDropdown>
																	</PanelRow>
																</>
															)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Days"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)} */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={weekDayNumn}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];

																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																				"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{weekDayNumn[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}
												{id == "isHours" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{
																		label: "between",
																		value: "between",
																	},
																	{ label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={
																				item.value.length == 0
																					? "Choose"
																					: hoursNum[item.value].label
																			}
																			options={hoursNum}
																			onChange={(option, optionIndex) => {
																				var rulesX = [...rules];
																				rulesX[groupIndex]["args"][index][
																					"value"
																				] = option.value;
																				setrules(rulesX);
																			}}
																			value={item.value}></PGDropdown>
																	</PanelRow>
																</>
															)}

														{/* {(item.compare == "between" ||
															item.compare == "exist") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose Month"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>

																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						
																						item.values.splice(i, 1);

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)} */}
														{item.compare == "exist" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];

																			rulesX[groupIndex]["args"][index][
																				"values"
																			].push(option.value);
																			setrules(rulesX);
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
														{item.compare == "between" && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={"Choose"}
																		options={hoursNum}
																		onChange={(option, optionIndex) => {
																			// var rulesX = [...rules];

																			// rulesX[groupIndex]["args"][index][
																			// 	"values"
																			// ].push(option.value);
																			// setrules(rulesX);
																			var rulesX = [...rules];
																			var valuesArray =
																				rulesX[groupIndex]["args"][index][
																				"values"
																				];

																			if (valuesArray.length < 2) {
																				valuesArray.push(option.value);

																				setrules(rulesX);
																			} else {
																			}
																		}}
																		value={item.values}></PGDropdown>
																</PanelRow>
																<div>
																	{item.values.slice(0, 2).map((x, i) => {
																		return (
																			<div className="flex justify-between my-1">
																				<span>{hoursNum[x].label}</span>
																				<span
																					className="bg-red-500 text-white p-1 cursor-pointer hover:"
																					onClick={(ev) => {
																						item.values.splice(i, 1);
																						var rulesX = [...rules];

																						rulesX[groupIndex]["args"][index][
																							"values"
																						] = item.values;
																						setrules(rulesX);
																					}}>
																					<Icon fill="#fff" icon={close} />
																				</span>
																			</div>
																		);
																	})}
																</div>
															</>
														)}
													</>
												)}

												{id == "urlPrams" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL Parameter
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{id == "referrerExist" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Referrer Domain
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{id == "hasCookie" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Cookie Name
															</label>
															<InputControl
																className="mr-2"
																value={item.cookieName}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].cookieName =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>

														{(item.compare == "=" ||
															item.compare == "!=" ||
															item.compare == ">" ||
															item.compare == "<" ||
															item.compare == ">=" ||
															item.compare == "<=") && (
																<div className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Cookie Value
																	</label>
																	<InputControl
																		className="mr-2"
																		value={item.value}
																		onChange={(newVal) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index].value =
																				newVal;
																			setrules(rulesX);
																		}}
																	/>
																</div>
															)}

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: ">", value: ">" },
																	{ label: "<", value: "<" },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{ label: "Exist", value: "exist" },
																	{ label: "Not exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{id == "wchasUpSells" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "No Upsells", value: "noUpsells" },
																	{ label: "Has Upsells", value: "hasUpsells" },
																	{ label: "Exist", value: "exist" },
																	{ label: "Not exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														{(item.compare == "exist" ||
															item.compare == "notExist") && (
																<div className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		IDs
																	</label>
																	<InputControl
																		className="mr-2"
																		value={item.value}
																		placeholder="Comma Separated"
																		onChange={(newVal) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index].value =
																				newVal;
																			setrules(rulesX);
																		}}
																	/>
																</div>
															)}
													</>
												)}
												{id == "wcisInStock" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "In Stock", value: "inStock" },
																	{
																		label: "Out of stock",
																		value: "outOfStock",
																	},
																	{
																		label: "On backorder",
																		value: "onBackorder",
																	},
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "wchasCrossSells" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{
																		label: "No CrossSells",
																		value: "noCrossSells",
																	},
																	{
																		label: "Has CrossSells",
																		value: "hasCrossSells",
																	},
																	{ label: "Exist", value: "exist" },
																	{ label: "Not exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														{(item.compare == "exist" ||
															item.compare == "notExist") && (
																<div className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		IDs
																	</label>
																	<InputControl
																		className="mr-2"
																		value={item.value}
																		placeholder="Comma Separated"
																		onChange={(newVal) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index].value =
																				newVal;
																			setrules(rulesX);
																		}}
																	/>
																</div>
															)}
													</>
												)}

												{id == "queryArgsExist" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Argument Name
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{id == "userVisitXPages" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Page Ids
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{(id == "hasPostComments" ||
													id == "hasUserComments" ||
													id == "hasUserCommentsOnPost") && (
														<>
															<PanelRow>
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Compare
																</label>
																<SelectControl
																	label=""
																	value={item.compare}
																	options={[
																		{ label: "=", value: "=" },
																		{ label: "!=", value: "!=" },
																		{ label: ">", value: ">" },
																		{ label: "<", value: "<" },
																		{ label: ">=", value: ">=" },
																		{ label: "<=", value: "<=" },
																		// {
																		// 	label: "between",
																		// 	value: "between",
																		// },
																		//{ label: "exist", value: "exist" },
																	]}
																	onChange={(newVal) => {
																		var rulesX = [...rules];
																		rulesX[groupIndex]["args"][index]["compare"] =
																			newVal;
																		setrules(rulesX);
																	}}
																/>
															</PanelRow>

															<div className="mb-4">
																<label
																	for=""
																	className="font-medium text-slate-900 ">
																	Number of Comments
																</label>
																<InputControl
																	className="mr-2"
																	value={item.value}
																	onChange={(newVal) => {
																		var rulesX = [...rules];
																		rulesX[groupIndex]["args"][index].value =
																			newVal;
																		setrules(rulesX);
																	}}
																/>
															</div>
														</>
													)}

												{id == "queryArgEqualX" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Argument Value
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}
												{id == "isPageTemplate" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Page Template
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}

												{id == "isSingle" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Page Template
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}

												{id == "hasPostCommentsByUser" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Number of Comments
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Post Ids
															</label>
															<InputControl
																className="mr-2"
																value={item.postIds}
																placeholder="Use comma(,) to add multiple"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].postIds =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
													</>
												)}

												{/* //*need to work */}
												{(id == "dateTime" ||
													id == "isUserLoggedIn" ||
													id == "hasPostThumbnail" ||
													id == "isRtl" ||
													id == "hasNavMenu" ||
													id == "hasExcerpt" ||
													id == "isPreview" ||
													id == "isTrackback" ||
													id == "isFeed" ||
													id == "isMainQuery" ||
													id == "isAttachment" ||
													id == "isArchive" ||
													id == "isNewDay" ||
													id == "isTime" ||
													id == "isDay" ||
													id == "isMonth" ||
													id == "isYear" ||
													id == "isDate" ||
													id == "isMultiAuthor" ||
													id == "isTag" ||
													id == "isCategory" ||
													id == "isPage" ||
													id == "isCommentsOpen" ||
													id == "isPostHierarchical" ||
													id == "isSticky" ||
													id == "isCommentsOpen") && (
														<div>No Option available for this condition.</div>
													)}
												{id == "urlPath" && (
													<div>No Option available for this condition.</div>
												)}

												{id == "isBrowsers" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Browser
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={browserList}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getBrowserByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "hasPMproLevels" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Levels
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={PMProLevels}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = PMProLevels[i]?.label;
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "hasMeprMemberships" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Levels
															</label>

															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={
																	item.value.length == 0
																		? "Choose"
																		: MeprMemberships[item.value] == undefined
																			? "Choose"
																			: MeprMemberships[item.value]?.label
																}
																options={MeprMemberships}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["value"] =
																		option.value;
																	setrules(rulesX);
																}}
																value={item.value}></PGDropdown>
														</PanelRow>
													</>
												)}

												{id == "isPlatforms" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">", value: ">" },
																	// { label: "<", value: "<" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Platforms
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={platformList}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getPlatformByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];
																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}

												{id == "userCapabilities" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	// { label: "=", value: "=" },
																	// { label: "!=", value: "!=" },
																	// { label: "Contain", value: "contain" },
																	// {
																	// 	label: "Not Contain",
																	// 	value: "notContain",
																	// },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																	{ label: "Not Exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "notExist" ||
															item.compare == "exist") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={"Choose"}
																			options={capabilities}
																			onChange={(option, optionIndex) => {
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"values"
																				].push(option.value);
																				setrules(rulesX);
																			}}
																			value={item.values}></PGDropdown>
																	</PanelRow>

																	<div>
																		{item.values.map((x, i) => {
																			return (
																				<div className="flex justify-between my-1">
																					<span>{capabilities[x].label}</span>
																					<span
																						className="bg-red-500 text-white p-1 cursor-pointer hover:"
																						onClick={(ev) => {
																							var rulesX = [...rules];

																							item.values.splice(i, 1);

																							rulesX[groupIndex]["args"][index][
																								"values"
																							] = item.values;
																							setrules(rulesX);
																						}}>
																						<Icon fill="#fff" icon={close} />
																					</span>
																				</div>
																			);
																		})}
																	</div>
																</>
															)}
													</>
												)}

												{id == "isTax" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// { label: "Contain", value: "contain" },
																	// {
																	// 	label: "Not Contain",
																	// 	value: "notContain",
																	// },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	{ label: "exist", value: "exist" },
																	{ label: "Not Exist", value: "notExist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														{(item.compare == "=" || item.compare == "!=") && (
															<>
																<PanelRow className="mb-4">
																	<label
																		for=""
																		className="font-medium text-slate-900 ">
																		Values
																	</label>
																	<PGDropdown
																		position="bottom right"
																		variant="secondary"
																		buttonTitle={
																			item.value.length == 0
																				? "Choose"
																				: taxonomies[item.value].label
																		}
																		options={taxonomies}
																		onChange={(option, optionIndex) => {
																			var rulesX = [...rules];
																			rulesX[groupIndex]["args"][index][
																				"value"
																			] = option.value;
																			setrules(rulesX);
																		}}
																		value={item.value}></PGDropdown>
																</PanelRow>
															</>
														)}

														{(item.compare == "notExist" ||
															item.compare == "exist") && (
																<>
																	<PanelRow className="mb-4">
																		<label
																			htmlFor=""
																			className="font-medium text-slate-900 ">
																			Values
																		</label>
																		<PGDropdown
																			position="bottom right"
																			variant="secondary"
																			buttonTitle={"Choose"}
																			options={taxonomies}
																			onChange={(option, optionIndex) => {
																				var rulesX = [...rules];

																				rulesX[groupIndex]["args"][index][
																					"values"
																				].push(option.value);
																				setrules(rulesX);
																			}}
																			value={item.values}></PGDropdown>
																	</PanelRow>

																	<div>
																		{item.values.map((x, i) => {
																			return (
																				<div className="flex justify-between my-1">
																					<span>{taxonomies[x]?.label}</span>
																					<span
																						className="bg-red-500 text-white p-1 cursor-pointer hover:"
																						onClick={(ev) => {
																							var rulesX = [...rules];

																							item.values.splice(i, 1);

																							rulesX[groupIndex]["args"][index][
																								"values"
																							] = item.values;
																							setrules(rulesX);
																						}}>
																						<Icon fill="#fff" icon={close} />
																					</span>
																				</div>
																			);
																		})}
																	</div>
																</>
															)}
													</>
												)}
												{/* //*URL String */}

												{id == "urlString" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	// { label: "=", value: "=" },
																	// { label: "!=", value: "!=" },
																	{ label: "Contain", value: "contain" },
																	{
																		label: "Not Contain",
																		value: "notContain",
																	},
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] = newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																String
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{(id == "isPostMeta" || id == "isUserMeta") && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "Contain", value: "contain" },
																	{
																		label: "Not Contain",
																		value: "notContain",
																	},
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Name
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{/* //*post meta */}
												{id == "isDevice" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Device
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={displaySize}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getDeviceByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];

																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "userCan" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Capabilities
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={capabilities}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{capabilities[x].label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];

																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}
												{id == "isCountries" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Include", value: "include" },
																	{ label: "Exclude", value: "exclude" },
																	// { label: ">=", value: ">=" },
																	// { label: "<=", value: "<=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Country
															</label>
															<PGDropdown
																position="bottom right"
																variant="secondary"
																buttonTitle={"Choose"}
																options={countryName}
																onChange={(option, optionIndex) => {
																	var rulesX = [...rules];

																	rulesX[groupIndex]["args"][index][
																		"values"
																	].push(option.value);
																	setrules(rulesX);
																}}
																value={item.values}></PGDropdown>
														</PanelRow>
														<div>
															{item.values.map((x, i) => {
																var label = getCountryByValue(x);
																return (
																	<div className="flex items-center justify-between my-1 mt-2">
																		<span>{label}</span>
																		<span
																			className="bg-red-500 text-white p-1 cursor-pointer hover:"
																			onClick={(ev) => {
																				var rulesX = [...rules];

																				item.values.splice(i, 1);

																				rulesX[groupIndex]["args"][index][
																					"values"
																				] = item.values;
																				setrules(rulesX);
																			}}>
																			<Icon fill="#fff" icon={close} />
																		</span>
																	</div>
																);
															})}
														</div>
													</>
												)}

												{(id == "isHome" ||
													id == "isBlog" ||
													id == "isFrontPage") && (
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	// { label: "Include", value: "include" },
																	// { label: "Exclude", value: "exclude" },
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	// {
																	// 	label: "between",
																	// 	value: "between",
																	// },
																	// { label: "exist", value: "exist" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													)}

												{id == "isSearch" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Search Word
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Compare
															</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "Start With", value: "startWith" },
																	{ label: "End With", value: "endWith" },
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },

																	{ label: "Contain", value: "contain" },
																	{ label: "Not Contain", value: "notContain" },
																]}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index]["compare"] =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}
												{(id == "wcisAccountPage" ||
													id == "wcShop" ||
													id == "isTaxonomyHierarchical" ||
													id == "hasPostParent" ||
													id == "queryObj" ||
													id == "is404") && (
														<div>No Option available for this condition.</div>
													)}

												{id == "srcSize" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "postMeta" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "postType" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "pageType" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "taxonomy" && (
													<div>No Option available for this condition.</div>
												)}
												{id == "archive" && (
													<div>No Option available for this condition.</div>
												)}
												{/* //*done */}
												{id == "initial" && (
													<div>No Option available for this condition.</div>
												)}

												{(id == "taxonomyExists" || id == "hasTerm") && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Taxonomy
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "isMainSite" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																siteId
															</label>
															<InputControl
																className="mr-2"
																value={item.siteId}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].siteId =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																networkId
															</label>
															<InputControl
																className="mr-2"
																value={item.networkId}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].networkId =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "scrollPercent" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Minimum
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Max
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "scrollFixed" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Minimum
															</label>
															<InputControl
																className="mr-2"
																value={item.min}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].min =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>

														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Scroll Max
															</label>
															<InputControl
																className="mr-2"
																value={item.max}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].max =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "scrollEnd" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "scrollElement" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Element Class/ID
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "clickFirst" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "clickCount" && (
													<>
														<PanelRow className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																Click Count
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "clickRight" && (
													<>
														<ToggleControl
															label="Disabled right menu?"
															help={
																item.value
																	? "Right Menu Disabled "
																	: "Right Menu Enabled."
															}
															checked={item.value ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].value =
																	item.value ? 0 : 1;
																setrules(rulesX);
															}}
														/>
													</>
												)}

												{id == "onExit" && (
													<>
														<div>No Option available for this condition.</div>
													</>
												)}

												{id == "clickElement" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element ID/Class", "post-grid")}
															</label>
															<InputControl
																className="mr-2"
																placeholder=".element or #elementId"
																value={item.value}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].value =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
													</>
												)}

												{id == "dateCountdownExpired" && (
													<>
														<ToggleControl
															label="Is Once?"
															className="my-4"
															help={
																item.once
																	? "IsOnce is Enable"
																	: "IsOnce is disabled."
															}
															checked={item.once ? true : false}
															onChange={(e) => {
																var rulesX = [...rules];
																rulesX[groupIndex]["args"][index].once =
																	item.once ? 0 : 1;
																setrules(rulesX);
															}}
														/>
														{/* <PanelRow className='mb-4'>
                                <label htmlFor=""  className="font-medium text-slate-900 " >{__('Element ID/Class', 'post-grid')}</label>
                                <InputControl
                                  className='mr-2'
                                  placeholder=".element or #elementId"
                                  once={item.value}
                                  onChange={(newVal) => {
                                    var visibleX = { ...visible, }
                                    rulesX[groupIndex]['args'][index].value = newVal
                                    setrules( visibleX );
                                  }}
                                />
                              </PanelRow> */}
													</>
												)}

												{/* //*form  */}

												{id == "submitCount" && (
													<div>No Option available for this condition.</div>
												)}
											</PGtoggle>
										</>
									);
								})}
						</PGtoggle>
					);
				})}
			</div>
		</div>
	);
}

class PGVisible extends Component {
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
		const {
			position,
			variant,
			btnClass,
			searchPlaceholder,
			options, //[{"label":"Select..","icon":"","value":""}]
			buttonTitle,
			onChange,
			visible,
			values,
			value,
		} = this.props;

		return (
			<div>
				<Html
					value={value}
					position={position}
					searchPlaceholder={searchPlaceholder}
					btnClass={btnClass}
					variant={variant}
					options={options}
					buttonTitle={buttonTitle}
					onChange={onChange}
					visible={visible}
					warn={this.state.showWarning}
				/>
			</div>
		);
	}
}

export default PGVisible;
