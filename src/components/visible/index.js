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

	var [rules, setrules] = useState(
		visible?.rules == null || visible?.rules == undefined ? [] : visible.rules
	);

	var [enableDatePicker, setenableDatePicker] = useState(false);
	const [userRoles, setuserRoles] = useState({});
	const [taxonomies, settaxonomies] = useState({});

	useEffect(() => {
		var visibleX = { ...visible };
		visibleX.rules = rules;
		setVisible(visibleX);
		props.onChange(visibleX);

	}, [rules]);


	useEffect(() => {
		apiFetch({
			path: "/combo-blocks/v2/post_types",
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
			path: "/combo-blocks/v2/pmpro_membership_levels",
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
			path: "/combo-blocks/v2/mepr_memberships",
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
			path: "/combo-blocks/v2/get_site_data",
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
			label: __("Front page", "combo-blocks"),
			value: "isFrontPage",
		},
		isBlog: {
			label: __("Posts Page", "combo-blocks"),
			value: "isBlog",
		},
		is404: { label: __("Date Page", "combo-blocks"), value: "is404" },
		wcisAccountPage: {
			label: __("WooCommerce Account", "combo-blocks"),
			value: "wcisAccountPage",
		},
		wcShop: {
			label: __("WooCommerce Shop", "combo-blocks"),
			value: "wcShop",
		},
		searchPage: {
			label: __("Search page", "combo-blocks"),
			value: "searchPage",
		},
	};
	var monthsNum = {
		1: { label: __("January", "combo-blocks"), value: 1 },
		2: { label: __("February", "combo-blocks"), value: 2 },
		3: { label: __("March", "combo-blocks"), value: 3 },
		4: { label: __("April", "combo-blocks"), value: 4 },
		5: { label: __("May", "combo-blocks"), value: 5 },
		6: { label: __("June", "combo-blocks"), value: 6 },
		7: { label: __("July", "combo-blocks"), value: 7 },
		8: { label: __("August", "combo-blocks"), value: 8 },
		9: { label: __("September", "combo-blocks"), value: 9 },
		10: { label: __("October", "combo-blocks"), value: 10 },
		11: { label: __("November", "combo-blocks"), value: 11 },
		12: { label: __("December", "combo-blocks"), value: 12 },
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
		0: { label: __("12AM", "combo-blocks"), value: 0 },
		1: { label: __("1AM", "combo-blocks"), value: 1 },
		2: { label: __("2AM", "combo-blocks"), value: 2 },
		3: { label: __("3AM", "combo-blocks"), value: 3 },
		4: { label: __("4AM", "combo-blocks"), value: 4 },
		5: { label: __("5AM", "combo-blocks"), value: 5 },
		6: { label: __("6AM", "combo-blocks"), value: 6 },
		7: { label: __("7AM", "combo-blocks"), value: 7 },
		8: { label: __("8AM", "combo-blocks"), value: 8 },
		9: { label: __("9AM", "combo-blocks"), value: 9 },
		10: { label: __("10AM", "combo-blocks"), value: 10 },
		11: { label: __("11AM", "combo-blocks"), value: 11 },
		12: { label: __("12PM", "combo-blocks"), value: 12 },
		13: { label: __("1PM", "combo-blocks"), value: 13 },
		14: { label: __("2PM", "combo-blocks"), value: 14 },
		15: { label: __("3PM", "combo-blocks"), value: 15 },
		16: { label: __("4PM", "combo-blocks"), value: 16 },
		17: { label: __("5PM", "combo-blocks"), value: 17 },
		18: { label: __("6PM", "combo-blocks"), value: 18 },
		19: { label: __("7PM", "combo-blocks"), value: 19 },
		20: { label: __("8PM", "combo-blocks"), value: 20 },
		21: { label: __("9PM", "combo-blocks"), value: 21 },
		22: { label: __("10PM", "combo-blocks"), value: 22 },
		23: { label: __("11PM", "combo-blocks"), value: 23 },
	};
	var countryName = [
		{ label: __("Afghanistan", "combo-blocks"), value: "afghanistan" },
		{ label: __("Albania", "combo-blocks"), value: "albania" },
		{ label: __("Algeria", "combo-blocks"), value: "algeria" },
		{ label: __("Andorra", "combo-blocks"), value: "andorra" },
		{ label: __("Angola", "combo-blocks"), value: "angola" },
		{ label: __("Antigua and Barbuda", "combo-blocks"), value: "antiguaAndBarbuda" },
		{ label: __("Argentina", "combo-blocks"), value: "argentina" },
		{ label: __("Armenia", "combo-blocks"), value: "armenia" },
		{ label: __("Australia", "combo-blocks"), value: "australia" },
		{ label: __("Austria", "combo-blocks"), value: "austria" },
		{ label: __("Azerbaijan", "combo-blocks"), value: "azerbaijan" },
		{ label: __("Bahamas", "combo-blocks"), value: "bahamas" },
		{ label: __("Bahrain", "combo-blocks"), value: "bahrain" },
		{ label: __("Bangladesh", "combo-blocks"), value: "bangladesh" },
		{ label: __("Barbados", "combo-blocks"), value: "barbados" },
		{ label: __("Belarus", "combo-blocks"), value: "belarus" },
		{ label: __("Belgium", "combo-blocks"), value: "belgium" },
		{ label: __("Belize", "combo-blocks"), value: "belize" },
		{ label: __("Benin", "combo-blocks"), value: "benin" },
		{ label: __("Bhutan", "combo-blocks"), value: "bhutan" },
		{ label: __("Bolivia", "combo-blocks"), value: "bolivia" },
		{ label: __("Bosnia and Herzegovina", "combo-blocks"), value: "bosniaAndHerzegovina" },
		{ label: __("Botswana", "combo-blocks"), value: "botswana" },
		{ label: __("Brazil", "combo-blocks"), value: "brazil" },
		{ label: __("Brunei", "combo-blocks"), value: "brunei" },
		{ label: __("Bulgaria", "combo-blocks"), value: "bulgaria" },
		{ label: __("Burkina Faso", "combo-blocks"), value: "burkinaFaso" },
		{ label: __("Burundi", "combo-blocks"), value: "burundi" },
		{ label: __("Cabo Verde", "combo-blocks"), value: "caboVerde" },
		{ label: __("Cambodia", "combo-blocks"), value: "cambodia" },
		{ label: __("Cameroon", "combo-blocks"), value: "cameroon" },
		{ label: __("Canada", "combo-blocks"), value: "canada" },
		{ label: __("Central African Republic", "combo-blocks"), value: "centralAfricanRepublic" },
		{ label: __("Chad", "combo-blocks"), value: "chad" },
		{ label: __("Chile", "combo-blocks"), value: "chile" },
		{ label: __("China", "combo-blocks"), value: "china" },
		{ label: __("Colombia", "combo-blocks"), value: "colombia" },
		{ label: __("Comoros", "combo-blocks"), value: "comoros" },
		{ label: __("Congo", "combo-blocks"), value: "congo" },
		{ label: __("Costa Rica", "combo-blocks"), value: "costaRica" },
		{ label: __("Croatia", "combo-blocks"), value: "croatia" },
		{ label: __("Cuba", "combo-blocks"), value: "cuba" },
		{ label: __("Cyprus", "combo-blocks"), value: "cyprus" },
		{ label: __("Czechia", "combo-blocks"), value: "czechia" },
		{ label: __("Denmark", "combo-blocks"), value: "denmark" },
		{ label: __("Djibouti", "combo-blocks"), value: "djibouti" },
		{ label: __("Dominica", "combo-blocks"), value: "dominica" },
		{ label: __("Dominican Republic", "combo-blocks"), value: "dominicanRepublic" },
		{ label: __("Ecuador", "combo-blocks"), value: "ecuador" },
		{ label: __("Egypt", "combo-blocks"), value: "egypt" },
		{ label: __("El Salvador", "combo-blocks"), value: "elSalvador" },
		{ label: __("Equatorial Guinea", "combo-blocks"), value: "equatorialGuinea" },
		{ label: __("Eritrea", "combo-blocks"), value: "eritrea" },
		{ label: __("Estonia", "combo-blocks"), value: "estonia" },
		{ label: __("Eswatini", "combo-blocks"), value: "eswatini" },
		{ label: __("Ethiopia", "combo-blocks"), value: "ethiopia" },
		{ label: __("Fiji", "combo-blocks"), value: "fiji" },
		{ label: __("Finland", "combo-blocks"), value: "finland" },
		{ label: __("France", "combo-blocks"), value: "france" },
		{ label: __("Gabon", "combo-blocks"), value: "gabon" },
		{ label: __("Gambia", "combo-blocks"), value: "gambia" },
		{ label: __("Georgia", "combo-blocks"), value: "georgia" },
		{ label: __("Germany", "combo-blocks"), value: "germany" },
		{ label: __("Ghana", "combo-blocks"), value: "ghana" },
		{ label: __("Greece", "combo-blocks"), value: "greece" },
		{ label: __("Grenada", "combo-blocks"), value: "grenada" },
		{ label: __("Guatemala", "combo-blocks"), value: "guatemala" },
		{ label: __("Guinea", "combo-blocks"), value: "guinea" },
		{ label: __("Guinea-Bissau", "combo-blocks"), value: "guineaBissau" },
		{ label: __("Guyana", "combo-blocks"), value: "guyana" },
		{ label: __("Haiti", "combo-blocks"), value: "haiti" },
		{ label: __("Honduras", "combo-blocks"), value: "honduras" },
		{ label: __("Hungary", "combo-blocks"), value: "hungary" },
		{ label: __("Iceland", "combo-blocks"), value: "iceland" },
		{ label: __("India", "combo-blocks"), value: "india" },
		{ label: __("Indonesia", "combo-blocks"), value: "indonesia" },
		{ label: __("Iran", "combo-blocks"), value: "iran" },
		{ label: __("Iraq", "combo-blocks"), value: "iraq" },
		{ label: __("Ireland", "combo-blocks"), value: "ireland" },
		{ label: __("Israel", "combo-blocks"), value: "israel" },
		{ label: __("Italy", "combo-blocks"), value: "italy" },
		{ label: __("Jamaica", "combo-blocks"), value: "jamaica" },
		{ label: __("Japan", "combo-blocks"), value: "japan" },
		{ label: __("Jordan", "combo-blocks"), value: "jordan" },
		{ label: __("Kazakhstan", "combo-blocks"), value: "kazakhstan" },
		{ label: __("Kenya", "combo-blocks"), value: "kenya" },
		{ label: __("Kiribati", "combo-blocks"), value: "kiribati" },
		{ label: __("Korea, North", "combo-blocks"), value: "koreaNorth" },
		{ label: __("Korea, South", "combo-blocks"), value: "koreaSouth" },
		{ label: __("Kosovo", "combo-blocks"), value: "kosovo" },
		{ label: __("Kuwait", "combo-blocks"), value: "kuwait" },
		{ label: __("Kyrgyzstan", "combo-blocks"), value: "kyrgyzstan" },
		{ label: __("Laos", "combo-blocks"), value: "laos" },
		{ label: __("Latvia", "combo-blocks"), value: "latvia" },
		{ label: __("Lebanon", "combo-blocks"), value: "lebanon" },
		{ label: __("Lesotho", "combo-blocks"), value: "lesotho" },
		{ label: __("Liberia", "combo-blocks"), value: "liberia" },
		{ label: __("Libya", "combo-blocks"), value: "libya" },
		{ label: __("Liechtenstein", "combo-blocks"), value: "liechtenstein" },
		{ label: __("Lithuania", "combo-blocks"), value: "lithuania" },
		{ label: __("Luxembourg", "combo-blocks"), value: "luxembourg" },
		{ label: __("Madagascar", "combo-blocks"), value: "madagascar" },
		{ label: __("Malawi", "combo-blocks"), value: "malawi" },
		{ label: __("Malaysia", "combo-blocks"), value: "malaysia" },
		{ label: __("Maldives", "combo-blocks"), value: "maldives" },
		{ label: __("Mali", "combo-blocks"), value: "mali" },
		{ label: __("Malta", "combo-blocks"), value: "malta" },
		{ label: __("Marshall Islands", "combo-blocks"), value: "marshallIslands" },
		{ label: __("Mauritania", "combo-blocks"), value: "mauritania" },
		{ label: __("Mauritius", "combo-blocks"), value: "mauritius" },
		{ label: __("Mexico", "combo-blocks"), value: "mexico" },
		{ label: __("Micronesia", "combo-blocks"), value: "micronesia" },
		{ label: __("Moldova", "combo-blocks"), value: "moldova" },
		{ label: __("Monaco", "combo-blocks"), value: "monaco" },
		{ label: __("Mongolia", "combo-blocks"), value: "mongolia" },
		{ label: __("Montenegro", "combo-blocks"), value: "montenegro" },
		{ label: __("Morocco", "combo-blocks"), value: "morocco" },
		{ label: __("Mozambique", "combo-blocks"), value: "mozambique" },
		{ label: __("Myanmar", "combo-blocks"), value: "myanmar" },
		{ label: __("Namibia", "combo-blocks"), value: "namibia" },
		{ label: __("Nauru", "combo-blocks"), value: "nauru" },
		{ label: __("Nepal", "combo-blocks"), value: "nepal" },
		{ label: __("Netherlands", "combo-blocks"), value: "netherlands" },
		{ label: __("New Zealand", "combo-blocks"), value: "newZealand" },
		{ label: __("Nicaragua", "combo-blocks"), value: "nicaragua" },
		{ label: __("Niger", "combo-blocks"), value: "niger" },
		{ label: __("Nigeria", "combo-blocks"), value: "nigeria" },
		{ label: __("North Macedonia", "combo-blocks"), value: "northMacedonia" },
		{ label: __("Norway", "combo-blocks"), value: "norway" },
		{ label: __("Oman", "combo-blocks"), value: "oman" },
		{ label: __("Pakistan", "combo-blocks"), value: "pakistan" },
		{ label: __("Palau", "combo-blocks"), value: "palau" },
		{ label: __("Palestine", "combo-blocks"), value: "palestine" },
		{ label: __("Panama", "combo-blocks"), value: "panama" },
		{ label: __("Papua New Guinea", "combo-blocks"), value: "papuaNewGuinea" },
		{ label: __("Paraguay", "combo-blocks"), value: "paraguay" },
		{ label: __("Peru", "combo-blocks"), value: "peru" },
		{ label: __("Philippines", "combo-blocks"), value: "philippines" },
		{ label: __("Poland", "combo-blocks"), value: "poland" },
		{ label: __("Portugal", "combo-blocks"), value: "portugal" },
		{ label: __("Qatar", "combo-blocks"), value: "qatar" },
		{ label: __("Romania", "combo-blocks"), value: "romania" },
		{ label: __("Russia", "combo-blocks"), value: "russia" },
		{ label: __("Rwanda", "combo-blocks"), value: "rwanda" },
		{ label: __("Saint Kitts and Nevis", "combo-blocks"), value: "saintKittsAndNevis" },
		{ label: __("Saint Lucia", "combo-blocks"), value: "saintLucia" },
		{
			label: __("Saint Vincent and the Grenadines", "combo-blocks"),
			value: "saintVincentAndTheGrenadines",
		},
		{ label: __("Samoa", "combo-blocks"), value: "samoa" },
		{ label: __("San Marino", "combo-blocks"), value: "sanMarino" },
		{ label: __("Sao Tome and Principe", "combo-blocks"), value: "saoTomeAndPrincipe" },
		{ label: __("Saudi Arabia", "combo-blocks"), value: "saudiArabia" },
		{ label: __("Senegal", "combo-blocks"), value: "senegal" },
		{ label: __("Serbia", "combo-blocks"), value: "serbia" },
		{ label: __("Seychelles", "combo-blocks"), value: "seychelles" },
		{ label: __("Sierra Leone", "combo-blocks"), value: "sierraLeone" },
		{ label: __("Singapore", "combo-blocks"), value: "singapore" },
		{ label: __("Slovakia", "combo-blocks"), value: "slovakia" },
		{ label: __("Slovenia", "combo-blocks"), value: "slovenia" },
		{ label: __("Solomon Islands", "combo-blocks"), value: "solomonIslands" },
		{ label: __("Somalia", "combo-blocks"), value: "somalia" },
		{ label: __("South Africa", "combo-blocks"), value: "southAfrica" },
		{ label: __("South Sudan", "combo-blocks"), value: "southSudan" },
		{ label: __("Spain", "combo-blocks"), value: "spain" },
		{ label: __("Sri Lanka", "combo-blocks"), value: "sriLanka" },
		{ label: __("Sudan", "combo-blocks"), value: "sudan" },
		{ label: __("Suriname", "combo-blocks"), value: "suriname" },
		{ label: __("Sweden", "combo-blocks"), value: "sweden" },
		{ label: __("Switzerland", "combo-blocks"), value: "switzerland" },
		{ label: __("Syria", "combo-blocks"), value: "syria" },
		{ label: __("Taiwan", "combo-blocks"), value: "taiwan" },
		{ label: __("Tajikistan", "combo-blocks"), value: "tajikistan" },
		{ label: __("Tanzania", "combo-blocks"), value: "tanzania" },
		{ label: __("Thailand", "combo-blocks"), value: "thailand" },
		{ label: __("Timor-Leste", "combo-blocks"), value: "timorLeste" },
		{ label: __("Togo", "combo-blocks"), value: "togo" },
		{ label: __("Tonga", "combo-blocks"), value: "tonga" },
		{ label: __("Trinidad and Tobago", "combo-blocks"), value: "trinidadAndTobago" },
		{ label: __("Tunisia", "combo-blocks"), value: "tunisia" },
		{ label: __("Turkey", "combo-blocks"), value: "turkey" },
		{ label: __("Turkmenistan", "combo-blocks"), value: "turkmenistan" },
		{ label: __("Tuvalu", "combo-blocks"), value: "tuvalu" },
		{ label: __("Uganda", "combo-blocks"), value: "uganda" },
		{ label: __("Ukraine", "combo-blocks"), value: "ukraine" },
		{ label: __("United Arab Emirates", "combo-blocks"), value: "unitedArabEmirates" },
		{ label: __("United Kingdom", "combo-blocks"), value: "unitedKingdom" },
		{ label: __("United States", "combo-blocks"), value: "unitedStates" },
		{ label: __("Uruguay", "combo-blocks"), value: "uruguay" },
		{ label: __("Uzbekistan", "combo-blocks"), value: "uzbekistan" },
		{ label: __("Vanuatu", "combo-blocks"), value: "vanuatu" },
		{ label: __("Vatican City", "combo-blocks"), value: "vaticanCity" },
		{ label: __("Venezuela", "combo-blocks"), value: "venezuela" },
		{ label: __("Vietnam", "combo-blocks"), value: "vietnam" },
		{ label: __("Yemen", "combo-blocks"), value: "yemen" },
		{ label: __("Zambia", "combo-blocks"), value: "zambia" },
		{ label: __("Zimbabwe", "combo-blocks"), value: "zimbabwe" },
	];
	var capabilities = {
		manage_links: { label: __("Manage Links", "combo-blocks"), value: "manage_links" },
		manage_options: { label: __("Manage Options", "combo-blocks"), value: "manage_options" },
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
			label: __("User Logged", "combo-blocks"),
			description: __("Show when user logged-in(any user)", "combo-blocks"),
			args: { id: "userLogged", value: "" },
		},
		userNotLogged: {
			label: __("User Not Logged", "combo-blocks"),
			description: __("Show when user Not logged-in.", "combo-blocks"),
			args: { id: "userNotLogged", value: "" },
		},
		userRoles: {
			label: __("User Roles", "combo-blocks"),
			description: __("Show when user has specific roles.", "combo-blocks"),
			args: { id: "userRoles", roles: [], compare: "include" },
			isPro: false,
		},
		userIds: {
			label: __("User Ids", "combo-blocks"),
			description: __("Show when user has specific ids.", "combo-blocks"),
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
			label: __("isCategory", "combo-blocks"),
			description: "",
			args: { id: "isCategory", value: "" },
			isPro: false,
		},
		isTag: {
			label: __("isTag", "combo-blocks"),
			description: "",
			args: { id: "isTag", value: "" },
			isPro: false,
		},
		isPage: {
			label: __("isPage", "combo-blocks"),
			description: "",
			args: { id: "isPage", value: "" },
			isPro: false,
		},
		isSingle: {
			label: __("isSingle", "combo-blocks"),
			description: "",
			args: { id: "isSingle", value: "" },
			isPro: false,
		},
		isHome: {
			label: __("Is Home", "combo-blocks"),
			description: "",
			args: { id: "isHome", value: "" },
			isPro: false,
		},
		isFrontPage: {
			label: __("Is Front page", "combo-blocks"),
			description: "",
			args: { id: "isFrontPage", value: "" },
			isPro: false,
		},
		isBlog: {
			label: __("Is Posts Page", "combo-blocks"),
			description: "",
			args: { id: "isBlog", value: "" },
			isPro: false,
		},
		isCommentsOpen: {
			label: __("Is Comments Open", "combo-blocks"),
			description: "",
			args: { id: "isCommentsOpen", value: "" },
			isPro: false,
		},
		isPostArchive: {
			label: __("Is Post Archive", "combo-blocks"),
			description: "",
			args: { id: "isPostArchive", value: "", values: [], compare: "" },
			isPro: false,
		},
		isArchive: {
			label: __("Is Archive", "combo-blocks"),
			description: "",
			args: { id: "isArchive", value: "" },
			isPro: false,
		},
		isYears: {
			label: __("is Years", "combo-blocks"),
			description: __("Show when specific Years", "combo-blocks"),
			args: { id: "isYears", value: "", values: "", compare: "=" },
			isPro: true,
		},
		isMonths: {
			label: __("is Months", "combo-blocks"),
			description: __("Show when specific months", "combo-blocks"),
			args: { id: "isMonths", value: "", values: [], compare: "=" },
			isPro: true,
		},
		weekDays: {
			label: __("is Week day", "combo-blocks"),
			description: __("Show when specific week days", "combo-blocks"),
			args: { id: "weekDays", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isHours: {
			label: __("is Hours", "combo-blocks"),
			description: __("Show when specific hours", "combo-blocks"),
			args: { id: "isHours", value: "", values: [], compare: "=" },
			isPro: true,
		},
		//isMinutes: { label: 'is Minutes', description: 'Show when specific Minutes', args: { id: 'isMinutes', value: '', values: [], compare: '=' }, isPro:true },
		isDates: {
			label: __("is Dates", "combo-blocks"),
			description: __("Show when specific date", "combo-blocks"),
			args: { id: "isDates", value: "", values: [], compare: "=" },
			isPro: true,
		},
		urlString: {
			label: __("URL String", "combo-blocks"),
			description: __("If URL contain certain string.", "combo-blocks"),
			args: { id: "urlString", value: "" },
			isPro: true,
		},
		urlPrams: {
			label: __("URL Prams", "combo-blocks"),
			description:
				__("If URL contain certain parameter(ex: domain.com/some-page?key=pramVal)", "combo-blocks"),
			args: { id: "urlPrams", value: "" },
			isPro: true,
		},
		urlPramsVal: {
			label: __("URL Prams Value", "combo-blocks"),
			description:
				__("If URL contain certain parameter(ex: domain.com/some-page?key=pramVal)", "combo-blocks"),
			args: { id: "urlPramsVal", key: "", value: "" },
			isPro: true,
		},


		referrerExist: {
			label: __("Referrer Exist", "combo-blocks"),
			description: "",
			args: { id: "referrerExist", value: "" },
			isPro: true,
		},
		isUserMeta: {
			label: "User Meta",
			description: "",
			args: { id: "isUserMeta", metaKey: "", value: "", values: [], compare: "=" },
			isPro: true,
		},
		isPostMeta: {
			label: "Post Meta",
			description: "",
			args: { id: "isPostMeta", metaKey: "", value: "", values: [], compare: "=" },
			isPro: true,
		},
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
			label: __("User Capability", "combo-blocks"),
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
			label: __("Post Ids", "combo-blocks"),
			description: "",
			args: { id: "postsIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		termIds: {
			label: __("Term Ids", "combo-blocks"),
			description: "",
			args: { id: "termIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		authorIds: {
			label: __("Author Ids", "combo-blocks"),
			description: "",
			args: { id: "authorIds", value: "", values: [], compare: "include" },
			isPro: true,
		},
		isSticky: {
			label: __("Is Sticky", "combo-blocks"),
			description: "",
			args: { id: "isSticky", value: "" },
			isPro: true,
		},
		isPostHierarchical: {
			label: __("Is Post Hierarchical", "combo-blocks"),
			description: "",
			args: { id: "isPostHierarchical", value: "" },
			isPro: true,
		},
		isPageTemplate: {
			label: __("Is Page Template", "combo-blocks"),
			description: "",
			args: { id: "isPageTemplate", value: "", values: [], compare: "" },
			isPro: true,
		},
		isTax: {
			label: __("Is Tax", "combo-blocks"),
			description: "",
			args: { id: "isTax", value: "", values: [], compare: "" },
			isPro: true,
		},
		isAuthor: {
			label: __("Is Author", "combo-blocks"),
			description: "",
			args: { id: "isAuthor", value: "", values: [], compare: "" },
			isPro: true,
		},
		isMultiAuthor: {
			label: __("Is Multi Author", "combo-blocks"),
			description: "",
			args: { id: "isMultiAuthor", value: "" },
			isPro: true,
		},
		isDate: {
			label: __("Is Date", "combo-blocks"),
			description: "",
			args: { id: "isDate", value: "" },
			isPro: true,
		},
		isYear: {
			label: __("Is Year", "combo-blocks"),
			description: "",
			args: { id: "isYear", value: "" },
			isPro: true,
		},
		isMonth: {
			label: __("Is Month", "combo-blocks"),
			description: "",
			args: { id: "isMonth", value: "" },
			isPro: true,
		},
		isDay: {
			label: __("Is Day", "combo-blocks"),
			description: "",
			args: { id: "isDay", value: "" },
			isPro: true,
		},
		isTime: {
			label: __("Is Time", "combo-blocks"),
			description: "",
			args: { id: "isTime", value: "" },
			isPro: true,
		},
		isNewDay: {
			label: __("Is NewDay", "combo-blocks"),
			description: "",
			args: { id: "isNewDay", value: "" },
			isPro: true,
		},
		isSearch: {
			label: __("Is Search", "combo-blocks"),
			description: "",
			args: { id: "isSearch", value: "", compare: "contain" }, // start with, end with, contain, not contain, =, !=
			isPro: true,
		},
		is404: {
			label: __("Is 404", "combo-blocks"),
			description: "",
			args: { id: "is404", value: "" },
			isPro: true,
		},
		isAttachment: {
			label: __("Is Attachment", "combo-blocks"),
			description: "",
			args: { id: "isAttachment", value: "" },
			isPro: true,
		},
		isSingular: {
			label: __("Is Singular", "combo-blocks"),
			description: "",
			args: { id: "isSingular", value: "" },
			isPro: true,
		},
		isMainQuery: {
			label: __("Is MainQuery", "combo-blocks"),
			description: "",
			args: { id: "isMainQuery", value: "", values: [], compare: "" },
			isPro: true,
		},
		isFeed: {
			label: __("Is Feed", "combo-blocks"),
			description: "",
			args: { id: "isFeed", value: "" },
			isPro: true,
		},
		isTrackback: {
			label: __("Is Trackback", "combo-blocks"),
			description: "",
			args: { id: "isTrackback", value: "" },
			isPro: true,
		},
		isPreview: {
			label: __("Is Preview", "combo-blocks"),
			description: "",
			args: { id: "isPreview", value: "" },
			isPro: true,
		},
		hasExcerpt: {
			label: __("Has Excerpt", "combo-blocks"),
			description: "",
			args: { id: "hasExcerpt", value: "" },
			isPro: true,
		},
		hasNavMenu: {
			label: __("Has NavMenu", "combo-blocks"),
			description: "",
			args: { id: "hasNavMenu", value: "" },
			isPro: true,
		},
		isRtl: {
			label: __("Is Rtl", "combo-blocks"),
			description: "",
			args: { id: "isRtl", value: "" },
			isPro: true,
		},
		hasPostThumbnail: {
			label: __("Has Post Thumbnail", "combo-blocks"),
			description: "",
			args: { id: "hasPostThumbnail", value: "" },
			isPro: true,
		},
		isUserLoggedIn: {
			label: __("Is UserLoggedIn", "combo-blocks"),
			description: "",
			args: { id: "isUserLoggedIn", value: "" },
			isPro: true,
		},
		isMainSite: {
			label: __("Is Main Site", "combo-blocks"),
			description: "",
			args: { id: "isMainSite", siteId: "", networkId: "" },
			isPro: true,
		},
		hasTerm: {
			label: __("Has Term", "combo-blocks"),
			description: "",
			args: { id: "hasTerm", value: "" },
			isPro: true,
		},
		isTaxonomyHierarchical: {
			label: __("Is Taxonomy Hierarchical", "combo-blocks"),
			description: "",
			args: { id: "isTaxonomyHierarchical", value: "" },
			isPro: true,
		},
		taxonomyExists: {
			label: __("Taxonomy Exists", "combo-blocks"),
			description: "",
			args: { id: "taxonomyExists", value: "" },
			isPro: true,
		},
		hasPostParent: {
			label: __("Has Post Parent", "combo-blocks"),
			description: "",
			args: { id: "hasPostParent", value: "" },
			isPro: true,
		},
		wcisAccountPage: {
			label: __("Is WooCommerce Account", "combo-blocks"),
			description: "",
			args: { id: "wcisAccountPage", value: "" },
			isPro: true,
		},
		wcShop: {
			label: __("Is WooCommerce Shop", "combo-blocks"),
			description: "",
			args: { id: "wcShop", value: "" },
			isPro: true,
		},
		wchasUpSells: {
			label: __("WooCommerce - Has Up-sells", "combo-blocks"),
			description: "",
			args: { id: "wchasUpSells", value: "", compare: "exist" },
			isPro: true,
		},
		wchasCrossSells: {
			label: __("WooCommerce - Has Cross-sells", "combo-blocks"),
			description: "",
			args: { id: "wchasCrossSells", value: "", compare: "exist" },
			isPro: true,
		},
		wcisCart: {
			label: __("WooCommerce - is Cart Page", "combo-blocks"),
			description: "",
			args: { id: "wcisCart", value: "" },
			isPro: true,
		},
		wcisCheckout: {
			label: __("WooCommerce - is checkout page", "combo-blocks"),
			description: "",
			args: { id: "wcisCheckout", value: "" },
			isPro: true,
		},
		wcisOnSale: {
			label: __("WooCommerce - is on sale", "combo-blocks"),
			description: "",
			args: { id: "wcisOnSale", value: "" },
			isPro: true,
		},
		wcisInStock: {
			label: __("WooCommerce - is in stock", "combo-blocks"),
			description: "",
			args: { id: "wcisInStock", value: "", compare: "inStock" },
			isPro: true,
		},
		wcproductType: {
			label: __("WooCommerce - product Type", "combo-blocks"),
			description: "",
			args: { id: "wcproductType", value: "" },
			isPro: true,
		},
		hasCookie: {
			label: __("Has Cookie", "combo-blocks"),
			description: __("If certain cookie exist", "combo-blocks"),
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
			label: __("Has Post Comments", "combo-blocks"),
			description: "",
			args: { id: "hasPostComments", value: "", count: 0, compare: "=" },
			isPro: true,
		},
		hasUserComments: {
			label: __("Has User Comments", "combo-blocks"),
			description: "",
			args: { id: "hasUserComments", value: "", count: 0, compare: "=" },
			isPro: true,
		},
		hasUserCommentsOnPost: {
			label: __("Has User Comments On Post", "combo-blocks"),
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
			label: __("Post Types", "combo-blocks"),
			description: "",
			args: { id: "postTypes", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		pageTypes: {
			label: __("Page Types", "combo-blocks"),
			description: "",
			args: { id: "pageTypes", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasPostTerms: {
			label: __("Post has terms", "combo-blocks"),
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
			label: __("Has Post Categories", "combo-blocks"),
			description: "",
			args: { id: "postCategories", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasPostTags: {
			label: __("Has Post Tags", "combo-blocks"),
			description: "",
			args: { id: "hasPostTags", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasPostFormat: {
			label: __("Has Post Format", "combo-blocks"),
			description: "",
			args: { id: "hasPostFormat", format: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasMeta: {
			label: __("Has Meta", "combo-blocks"),
			description: "",
			args: { id: "hasMeta", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasBlock: {
			label: __("Has Block", "combo-blocks"),
			description: "",
			args: { id: "hasBlock", blockName: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasAction: {
			label: __("Has Action", "combo-blocks"),
			description: "",
			args: { id: "hasAction", hookName: "", callback: "", compare: "exist" },
			isPro: true,
		},
		hasBlocks: {
			label: __("Has Blocks", "combo-blocks"),
			description: "",
			args: { id: "hasBlocks", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasFilter: {
			label: __("Has Filter", "combo-blocks"),
			description: "",
			args: { id: "hasFilter", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasShortcode: {
			label: __("Has Shortcode", "combo-blocks"),
			description: "",
			args: { id: "hasShortcode", tag: "", compare: "exist" },
			isPro: true,
		},
		hasSiteIcon: {
			label: __("Has SiteIcon", "combo-blocks"),
			description: "",
			args: { id: "hasSiteIcon", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasTermMeta: {
			label: __("Has TermMeta", "combo-blocks"),
			description: "",
			args: { id: "hasTermMeta", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasCustomLogo: {
			label: __("Has CustomLogo", "combo-blocks"),
			description: "",
			args: { id: "hasCustomLogo", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasHeaderImage: {
			label: __("Has HeaderImage", "combo-blocks"),
			description: "",
			args: { id: "hasHeaderImage", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasHeaderVideo: {
			label: __("Has Header Video", "combo-blocks"),
			description: "",
			args: { id: "hasHeaderVideo", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		hasCustomHeader: {
			label: __("Has Custom Header", "combo-blocks"),
			description: "",
			args: { id: "hasCustomHeader", value: "", values: [], compare: "exist" },
			isPro: true,
		},
		userCan: {
			label: __("User Can", "combo-blocks"),
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
			label: __("Author Can", "combo-blocks"),
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
			label: __("has PMPro Levels", "combo-blocks"),
			description: "",
			args: { id: "hasPMproLevels", args: "", values: [], compare: "include" },
			isPro: true,
		},
		tutorLmsIsErolled: {
			label: __("Tutor LMS - Is Enrolled", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsInErolled", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsIsPublicCourse: {
			label: __("Tutor LMS - Is Public Course", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsIsPublicCourse", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsIsPrivileged: {
			label: __("Tutor LMS - Is Privileged", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsIsPrivileged", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsIsPurchasable: {
			label: __("Tutor LMS - Is Purchasable", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsIsPurchasable", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsIsCompletedCourse: {
			label: __("Tutor LMS - Is Completed ourse", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsIsCompletedCourse", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsCanRetakeCourse: {
			label: __("Tutor LMS - Can user retake course", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsCanRetakeCourse", value: "", compare: "=" },
			isPro: true,
		},
		tutorLmsIsCourseFullyBooked: {
			label: __("Tutor LMS - Is Course Fully Booked", "combo-blocks"),
			description: "",
			args: { id: "tutorLmsIsCourseFullyBooked", value: "", compare: "=" },
			isPro: true,
		},


		hasMeprMemberships: {
			label: __("has Memberpress Memberships", "combo-blocks"),
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
	let visibleArgs = applyFilters("comboBlocksVisibleArgs", visibleArgsBasic);
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
					// className="bg-gray-700 hover:bg-gray-600 p-2 px-4 text-white inline-block cursor-pointer rounded-sm"
					className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize  bg-gray-700	 text-white font-medium rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	"
					onClick={(ev) => {
						var rulesX = [...rules];
						rulesX.push({ relation: "OR", title: "", args: [] });
						setrules(rulesX);
					}}>
					{__("Add Group", "combo-blocks")}
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
									<label>{__("Relation?", "combo-blocks")}</label>
									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											group["relation"] == undefined
												? __("Choose", "combo-blocks")
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
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "userRoles" && (
													<div>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Compare", "combo-blocks")}
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
													</>
												)}
												{id == "userIds" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Compare", "combo-blocks")}</label>
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
																{__("User IDs", "combo-blocks")}
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Term IDs", "combo-blocks")}
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Author IDs", "combo-blocks")}
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Post IDs", "combo-blocks")}
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																		{__("Values", "combo-blocks")}
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																					? __("Choose", "combo-blocks")
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
																{__("Compare", "combo-blocks")}</label>
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
																			className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700	 !text-white font-medium !rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	 ${enableDatePicker ? "!bg-gray-400" : ""
																				}`}
																			onClick={(ev) => {
																				setenableDatePicker((prev) => !prev);
																			}}>
																			{item.value.length == 0
																				? __("Choose", "combo-blocks")
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
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700	 !text-white font-medium !rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	 ${enableDatePicker ? "!bg-gray-400" : ""
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
																		className={`pg-font flex gap-2 justify-center  cursor-pointer py-2 px-4 capitalize  !bg-gray-700	 !text-white font-medium !rounded hover:bg-gray-600	 hover:text-white focus:outline-none focus:bg-gray-600	 ${enableDatePicker ? "!bg-gray-400" : ""
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
																{__("Compare", "combo-blocks")}</label>
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
																					? __("Choose", "combo-blocks")
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
																{__("Compare", "combo-blocks")}</label>
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
																					? __("Choose", "combo-blocks")
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
												{id == "urlPramsVal" && (
													<>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL Parameter Key
															</label>
															<InputControl
																className="mr-2"
																value={item.key}
																placeholder="key"
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].key =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</div>
														<div className="mb-4">
															<label
																for=""
																className="font-medium text-slate-900 ">
																URL Parameter Value
															</label>
															<InputControl
																className="mr-2"
																value={item.value}
																placeholder="value"
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																	{__("Compare", "combo-blocks")}</label>
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
													)}
												{id == "urlPath" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "isBrowsers" && (
													<>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																		? __("Choose", "combo-blocks")
																		: MeprMemberships[item.value] == undefined
																			? __("Choose", "combo-blocks")
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																				? __("Choose", "combo-blocks")
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
															<SelectControl
																label=""
																value={item.compare}
																options={[
																	{ label: "=", value: "=" },
																	{ label: "!=", value: "!=" },
																	{ label: "Contain", value: "contain" },
																	{ label: "Not Contain", value: "notContain", },
																	{ label: ">=", value: ">=" },
																	{ label: "<=", value: "<=" },
																	{ label: "empty", value: "empty" },
																	{ label: "notEmpty", value: "notEmpty" },
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
																Meta Key
															</label>
															<InputControl
																className="mr-2"
																value={item.metaKey}
																onChange={(newVal) => {
																	var rulesX = [...rules];
																	rulesX[groupIndex]["args"][index].metaKey =
																		newVal;
																	setrules(rulesX);
																}}
															/>
														</PanelRow>
														<PanelRow>
															<label
																for=""
																className="font-medium text-slate-900 ">
																Value
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
																{__("Compare", "combo-blocks")}</label>
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
													)}
												{id == "srcSize" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "postMeta" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "postType" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "pageType" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "taxonomy" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{id == "archive" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
												)}
												{/* //*done */}
												{id == "initial" && (
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
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
														<div>{__("No Option available for this condition.", "combo-blocks")}</div>
													</>
												)}
												{id == "clickElement" && (
													<>
														<PanelRow className="mb-4 flex-col items-start gap-2">
															<label
																for=""
																className="font-medium text-slate-900 ">
																{__("Element ID/Class", "combo-blocks")}
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
                                <label htmlFor=""  className="font-medium text-slate-900 " >{__('Element ID/Class', 'combo-blocks')}</label>
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
													<div>{__("No Option available for this condition.", "combo-blocks")}</div>
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
