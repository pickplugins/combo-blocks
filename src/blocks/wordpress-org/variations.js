/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { doAction } from '@wordpress/hooks';
/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: "preset-1",
		title: __("preset-1"),
		description: __("preset-1"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "start" },
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {},
			},
			labelCounter: {
				options: {
					enable: false,
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: {},
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "start" },
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {},
					},
					labelCounter: {
						options: {
							enable: false,
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: {},
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" width="360" height="42.15" />
				<path
					fill="#ffffff"
					d="M27.66,26.62a1.22,1.22,0,0,1-.93-.43l-7.39-8.63A1.23,1.23,0,0,1,21.21,16l6.45,7.54L34.12,16A1.23,1.23,0,0,1,36,17.56L28.6,26.19A1.24,1.24,0,0,1,27.66,26.62Z"
				/>
				<rect fill="#ffffff" x="48.66" y="15.53" width="174.4" height="11.09" />
				<rect fill="#ffffff" y="99.56" width="360" height="86.66" />
				<rect fill="#ffffff" y="49.78" width="360" height="42.15" />
				<path
					fill="#3c3c3b"
					d="M27.66,65.31a1.26,1.26,0,0,1,.94.43L36,74.37A1.23,1.23,0,1,1,34.12,76l-6.46-7.53L21.21,76a1.23,1.23,0,1,1-1.87-1.6l7.39-8.63A1.22,1.22,0,0,1,27.66,65.31Z"
				/>
				<rect fill="#3c3c3b" x="48.66" y="65.31" width="174.4" height="11.09" />
				<rect fill="#3c3c3b" y="193.85" width="360" height="42.15" />
				<path
					fill="#ffffff"
					d="M27.66,220.47a1.22,1.22,0,0,1-.93-.43l-7.39-8.63a1.23,1.23,0,1,1,1.87-1.6l6.45,7.53,6.46-7.53a1.23,1.23,0,1,1,1.87,1.6L28.6,220A1.24,1.24,0,0,1,27.66,220.47Z"
				/>
				<rect
					fill="#ffffff"
					x="48.66"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
			</svg>
		),
	},
	{
		name: "preset-2",
		title: __("preset-2"),
		description: __("preset-2"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "center" },
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {},
			},
			labelCounter: {
				options: {
					enable: false,
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: {},
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "center" },
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {},
					},
					labelCounter: {
						options: {
							enable: false,
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: {},
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" width="360" height="42.15" />
				<path
					fill="#ffffff"
					d="M86.61,26.62a1.22,1.22,0,0,1-.93-.43l-7.4-8.63A1.23,1.23,0,0,1,80.15,16l6.46,7.54L93.07,16a1.23,1.23,0,0,1,1.87,1.6l-7.39,8.63A1.26,1.26,0,0,1,86.61,26.62Z"
				/>
				<rect
					fill="#ffffff"
					x="107.61"
					y="15.53"
					width="174.4"
					height="11.09"
				/>
				<rect fill="#ffffff" y="99.56" width="360" height="86.66" />
				<rect fill="#ffffff" y="49.78" width="360" height="42.15" />
				<path
					fill="#3c3c3b"
					d="M86.61,65.31a1.26,1.26,0,0,1,.94.43l7.39,8.63A1.23,1.23,0,1,1,93.07,76l-6.46-7.53L80.15,76a1.22,1.22,0,0,1-1.73.14,1.24,1.24,0,0,1-.14-1.74l7.4-8.63A1.22,1.22,0,0,1,86.61,65.31Z"
				/>
				<rect
					fill="#3c3c3b"
					x="107.61"
					y="65.31"
					width="174.4"
					height="11.09"
				/>
				<rect fill="#3c3c3b" y="193.85" width="360" height="42.15" />
				<path
					fill="#ffffff"
					d="M86.61,220.47a1.22,1.22,0,0,1-.93-.43l-7.4-8.63a1.24,1.24,0,0,1,.14-1.74,1.22,1.22,0,0,1,1.73.14l6.46,7.53,6.46-7.53a1.23,1.23,0,1,1,1.87,1.6L87.55,220A1.26,1.26,0,0,1,86.61,220.47Z"
				/>
				<rect
					fill="#ffffff"
					x="107.61"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
			</svg>
		),
	},
	{
		name: "preset-3",
		title: __("preset-3"),
		description: __("preset-3"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "end" },
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {},
			},
			labelCounter: {
				options: {
					enable: false,
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: {},
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "end" },
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {},
					},
					labelCounter: {
						options: {
							enable: false,
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: {},
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect
					fill="#3c3c3b"
					width="360"
					height="42.15"
					transform="translate(360 42.15) rotate(-180)"
				/>
				<path
					fill="#ffffff"
					d="M332.34,26.62a1.22,1.22,0,0,0,.93-.43l7.39-8.63a1.23,1.23,0,0,0-1.87-1.6l-6.45,7.54L325.88,16a1.23,1.23,0,0,0-1.87,1.6l7.39,8.63A1.24,1.24,0,0,0,332.34,26.62Z"
				/>
				<rect
					fill="#ffffff"
					x="136.94"
					y="15.53"
					width="174.4"
					height="11.09"
					transform="translate(448.27 42.15) rotate(-180)"
				/>
				<rect
					fill="#ffffff"
					y="99.56"
					width="360"
					height="86.66"
					transform="translate(360 285.78) rotate(-180)"
				/>
				<rect
					fill="#ffffff"
					y="49.78"
					width="360"
					height="42.15"
					transform="translate(360 141.71) rotate(-180)"
				/>
				<path
					fill="#3c3c3b"
					d="M332.34,65.31a1.26,1.26,0,0,0-.94.43L324,74.37a1.23,1.23,0,1,0,1.87,1.6l6.46-7.53L338.79,76a1.23,1.23,0,1,0,1.87-1.6l-7.39-8.63A1.22,1.22,0,0,0,332.34,65.31Z"
				/>
				<rect
					fill="#3c3c3b"
					x="136.94"
					y="65.31"
					width="174.4"
					height="11.09"
					transform="translate(448.27 141.71) rotate(-180)"
				/>
				<rect
					fill="#3c3c3b"
					y="193.85"
					width="360"
					height="42.15"
					transform="translate(360 429.85) rotate(-180)"
				/>
				<path
					fill="#ffffff"
					d="M332.34,220.47a1.22,1.22,0,0,0,.93-.43l7.39-8.63a1.23,1.23,0,1,0-1.87-1.6l-6.45,7.53-6.46-7.53a1.23,1.23,0,1,0-1.87,1.6L331.4,220A1.24,1.24,0,0,0,332.34,220.47Z"
				/>
				<rect
					fill="#ffffff"
					x="136.94"
					y="209.38"
					width="174.4"
					height="11.09"
					transform="translate(448.27 429.85) rotate(-180)"
				/>
			</svg>
		),
	},
	{
		name: "preset-4",
		title: __("preset-4"),
		description: __("preset-4"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "start" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					width: { Desktop: "100%" },
					padding: { Desktop: "10px 10px 10px 10px" },
				},
			},
			labelCounter: {
				options: {
					enable: false,
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: {},
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					class: "accordion-icon",
				},
				styles: {
					fontSize: { Desktop: "25px" },
					display: { Desktop: "inline-block" },
					margin: { Desktop: "0px 10px 0px 10px" },
				},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "start" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							width: { Desktop: "100%" },
							padding: { Desktop: "10px 10px 10px 10px" },
						},
					},
					labelCounter: {
						options: {
							enable: false,
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: {},
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							class: "accordion-icon",
						},
						styles: {
							fontSize: { Desktop: "25px" },
							display: { Desktop: "inline-block" },
							margin: { Desktop: "0px 10px 0px 10px" },
						},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" x="29.73" width="330.38" height="42.15" />
				<rect
					fill="#ffffff"
					x="29.73"
					y="99.56"
					width="330.38"
					height="86.66"
				/>
				<rect
					fill="#ffffff"
					x="29.73"
					y="49.78"
					width="330.38"
					height="42.15"
				/>
				<rect
					fill="#3c3c3b"
					x="29.73"
					y="193.85"
					width="330.38"
					height="42.15"
				/>
				<path
					fill="#3c3c3b"
					d="M8.74,26.62a1.24,1.24,0,0,1-.94-.43L.41,17.56a1.21,1.21,0,0,1,.13-1.73A1.23,1.23,0,0,1,2.28,16L8.74,23.5,15.19,16a1.23,1.23,0,0,1,1.87,1.6L9.67,26.19A1.22,1.22,0,0,1,8.74,26.62Z"
				/>
				<path
					fill="#ffffff"
					d="M8.74,65.31a1.24,1.24,0,0,1,.93.43l7.39,8.63A1.23,1.23,0,1,1,15.19,76L8.74,68.44,2.28,76a1.23,1.23,0,1,1-1.87-1.6L7.8,65.74A1.24,1.24,0,0,1,8.74,65.31Z"
				/>
				<path
					fill="#3c3c3b"
					d="M8.74,220.47A1.24,1.24,0,0,1,7.8,220L.41,211.41a1.23,1.23,0,1,1,1.87-1.6l6.46,7.53,6.45-7.53a1.23,1.23,0,1,1,1.87,1.6L9.67,220A1.22,1.22,0,0,1,8.74,220.47Z"
				/>
				<rect fill="#ffffff" x="52.54" y="15.53" width="174.4" height="11.09" />
				<rect fill="#3c3c3b" x="52.54" y="65.31" width="174.4" height="11.09" />
				<rect
					fill="#ffffff"
					x="52.54"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
			</svg>
		),
	},
	{
		name: "preset-5",
		title: __("preset-5"),
		description: __("preset-5"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "start" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					width: { Desktop: "100%" },
					padding: { Desktop: "10px 10px 10px 10px" },
				},
			},
			labelCounter: {
				options: {
					enable: false,
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: {},
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "right",
					class: "accordion-icon",
				},
				styles: {
					fontSize: { Desktop: "25px" },
					display: { Desktop: "inline-block" },
					margin: { Desktop: "0px 10px 0px 10px" },
				},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "start" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							width: { Desktop: "100%" },
							padding: { Desktop: "10px 10px 10px 10px" },
						},
					},
					labelCounter: {
						options: {
							enable: false,
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: {},
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "right",
							class: "accordion-icon",
						},
						styles: {
							fontSize: { Desktop: "25px" },
							display: { Desktop: "inline-block" },
							margin: { Desktop: "0px 10px 0px 10px" },
						},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" width="330.38" height="42.15" />
				<rect fill="#ffffff" y="99.56" width="330.38" height="86.66" />
				<rect fill="#ffffff" y="49.78" width="330.38" height="42.15" />
				<rect fill="#3c3c3b" y="193.85" width="330.38" height="42.15" />
				<path
					fill="#3c3c3b"
					d="M351.38,26.62a1.24,1.24,0,0,1-.94-.43l-7.39-8.63a1.23,1.23,0,0,1,1.87-1.6l6.46,7.54L357.83,16a1.23,1.23,0,0,1,1.87,1.6l-7.39,8.63A1.22,1.22,0,0,1,351.38,26.62Z"
				/>
				<path
					fill="#ffffff"
					d="M351.38,65.31a1.24,1.24,0,0,1,.93.43l7.39,8.63a1.23,1.23,0,1,1-1.87,1.6l-6.45-7.53L344.92,76a1.23,1.23,0,1,1-1.87-1.6l7.39-8.63A1.24,1.24,0,0,1,351.38,65.31Z"
				/>
				<path
					fill="#3c3c3b"
					d="M351.38,220.47a1.24,1.24,0,0,1-.94-.43l-7.39-8.63a1.23,1.23,0,1,1,1.87-1.6l6.46,7.53,6.45-7.53a1.23,1.23,0,1,1,1.87,1.6L352.31,220A1.22,1.22,0,0,1,351.38,220.47Z"
				/>
				<rect
					fill="#ffffff"
					x="129.16"
					y="15.53"
					width="174.4"
					height="11.09"
				/>
				<rect
					fill="#3c3c3b"
					x="129.16"
					y="65.31"
					width="174.4"
					height="11.09"
				/>
				<rect
					fill="#ffffff"
					x="129.16"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
			</svg>
		),
	},
	{
		name: "preset-6",
		title: __("preset-6"),
		description: __("preset-6"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "start" },
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {},
			},
			labelCounter: {
				options: {
					position: "left",
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: { margin: { Desktop: "0px 10px 0px 0px" } },
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "start" },
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {},
					},
					labelCounter: {
						options: {
							position: "left",
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: { margin: { Desktop: "0px 10px 0px 0px" } },
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" x="0.11" width="360" height="42.15" />
				<rect fill="#ffffff" x="0.11" y="99.56" width="360" height="86.66" />
				<rect fill="#ffffff" x="0.11" y="49.78" width="360" height="42.15" />
				<rect fill="#3c3c3b" x="0.11" y="193.85" width="360" height="42.15" />
				<rect fill="#ffffff" x="46.54" y="15.53" width="174.4" height="11.09" />
				<rect fill="#3c3c3b" x="46.54" y="65.31" width="174.4" height="11.09" />
				<rect
					fill="#ffffff"
					x="46.54"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
				<path fill="#ffffff" d="M17,18.65v-3l4.21-2.48h2.57V29H20.86V16.29Z" />
				<path
					fill="#3c3c3b"
					d="M19.21,76.4h6.34v2.5H15.18V76.57a29.76,29.76,0,0,0,4.9-4.32q2.07-2.3,2.07-4.14a2.5,2.5,0,0,0-.71-1.89,2.8,2.8,0,0,0-2-.68A6.05,6.05,0,0,0,15.54,67V64.2a6.74,6.74,0,0,1,2-1,7.65,7.65,0,0,1,2.38-.39,5.58,5.58,0,0,1,3.8,1.28,4.48,4.48,0,0,1,1.47,3.58C25.18,70.56,23.19,73.46,19.21,76.4Z"
				/>
				<path
					fill="#ffffff"
					d="M16.06,210.47v-2.75a7.16,7.16,0,0,1,3.48-.9A5.86,5.86,0,0,1,23.46,208a3.89,3.89,0,0,1,1.42,3.11,3.7,3.7,0,0,1-2.5,3.74,3.78,3.78,0,0,1,2.11,1.27,3.69,3.69,0,0,1,.75,2.37,4.08,4.08,0,0,1-1.47,3.25A6.17,6.17,0,0,1,19.66,223a9.93,9.93,0,0,1-4.18-.8v-2.85a8.27,8.27,0,0,0,4,1,3.09,3.09,0,0,0,2.06-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.43-2.11h-.92v-2.46h.92a3.94,3.94,0,0,0,2.16-.55,1.77,1.77,0,0,0,.88-1.58c0-1.36-.84-2-2.5-2A6.24,6.24,0,0,0,16.06,210.47Z"
				/>
			</svg>
		),
	},
	{
		name: "preset-7",
		title: __("preset-7"),
		description: __("preset-7"),
		isPro: false,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "end" },
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					padding: { Desktop: "10px 10px 10px 10px" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {},
			},
			labelCounter: {
				options: {
					position: "right",
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: { margin: { Desktop: "0px 0px 0px 10px" } },
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "end" },
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							padding: { Desktop: "10px 10px 10px 10px" },
							margin: { Desktop: "0px 0px 0px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {},
					},
					labelCounter: {
						options: {
							position: "right",
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: { margin: { Desktop: "0px 0px 0px 10px" } },
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect fill="#3c3c3b" width="360" height="42.15" />
				<rect fill="#ffffff" y="99.56" width="360" height="86.66" />
				<rect fill="#ffffff" y="49.78" width="360" height="42.15" />
				<rect fill="#3c3c3b" y="193.85" width="360" height="42.15" />
				<rect
					fill="#ffffff"
					x="139.17"
					y="15.53"
					width="174.4"
					height="11.09"
				/>
				<rect
					fill="#3c3c3b"
					x="139.17"
					y="65.31"
					width="174.4"
					height="11.09"
				/>
				<rect
					fill="#ffffff"
					x="139.17"
					y="209.38"
					width="174.4"
					height="11.09"
				/>
				<path
					fill="#ffffff"
					d="M336.36,18.65v-3l4.2-2.48h2.58V29h-2.89V16.29Z"
				/>
				<path
					fill="#3c3c3b"
					d="M338.59,76.4h6.34v2.5H334.56V76.57a29.85,29.85,0,0,0,4.91-4.32,6.55,6.55,0,0,0,2.06-4.14,2.49,2.49,0,0,0-.7-1.89,2.8,2.8,0,0,0-2-.68,6,6,0,0,0-3.86,1.5V64.2a6.62,6.62,0,0,1,2-1,7.6,7.6,0,0,1,2.38-.39,5.6,5.6,0,0,1,3.8,1.28,4.48,4.48,0,0,1,1.47,3.58C344.57,70.56,342.58,73.46,338.59,76.4Z"
				/>
				<path
					fill="#ffffff"
					d="M335.45,210.47v-2.75a7.15,7.15,0,0,1,3.47-.9,5.82,5.82,0,0,1,3.92,1.22,3.9,3.9,0,0,1,1.43,3.11,3.71,3.71,0,0,1-2.51,3.74,3.77,3.77,0,0,1,2.12,1.27,3.69,3.69,0,0,1,.75,2.37,4.08,4.08,0,0,1-1.47,3.25A6.18,6.18,0,0,1,339,223a9.91,9.91,0,0,1-4.17-.8v-2.85a8.27,8.27,0,0,0,4,1,3.06,3.06,0,0,0,2-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.42-2.11h-.92v-2.46h.92a3.94,3.94,0,0,0,2.16-.55,1.78,1.78,0,0,0,.87-1.58c0-1.36-.83-2-2.5-2A6.23,6.23,0,0,0,335.45,210.47Z"
				/>
			</svg>
		),
	},
	{
		name: "preset-8",
		title: __("preset-8"),
		description: __("preset-8"),
		isPro: true,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "start" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					width: { Desktop: "100%" },
					padding: { Desktop: "10px 10px 10px 10px" },
				},
			},
			labelCounter: {
				options: {
					position: "left",
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: { margin: { Desktop: "0px 10px 0px 0px" } },
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "start" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							width: { Desktop: "100%" },
							padding: { Desktop: "10px 10px 10px 10px" },
						},
					},
					labelCounter: {
						options: {
							position: "left",
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: { margin: { Desktop: "0px 10px 0px 0px" } },
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<rect class="cls-1" x="30.65" width="329.35" height="42.15" />
				<rect
					fill="#ffffff"
					x="56.55"
					y="15.53"
					width="172.07"
					height="11.09"
				/>
				<rect
					fill="#ffffff"
					x="30.65"
					y="99.56"
					width="329.35"
					height="86.66"
				/>
				<rect
					fill="#ffffff"
					x="30.65"
					y="49.78"
					width="329.35"
					height="42.15"
				/>
				<rect class="cls-1" x="56.55" y="65.31" width="172.07" height="11.09" />
				<rect
					class="cls-1"
					x="30.65"
					y="193.85"
					width="329.35"
					height="42.15"
				/>
				<rect
					fill="#ffffff"
					x="56.55"
					y="209.38"
					width="172.07"
					height="11.09"
				/>
				<path class="cls-1" d="M1.77,18.65v-3l4.15-2.48H8.46V29H5.61V16.29Z" />
				<path
					fill="#ffffff"
					d="M4,76.32h6.25v2.5H0V76.49a29.67,29.67,0,0,0,4.84-4.32,6.61,6.61,0,0,0,2-4.14,2.49,2.49,0,0,0-.7-1.89,2.72,2.72,0,0,0-2-.68A5.91,5.91,0,0,0,.36,67V64.12a6.8,6.8,0,0,1,2-1,7.47,7.47,0,0,1,2.35-.39A5.45,5.45,0,0,1,8.42,64a4.51,4.51,0,0,1,1.45,3.58Q9.87,71.93,4,76.32Z"
				/>
				<path
					class="cls-1"
					d="M.87,210.39v-2.75a7,7,0,0,1,3.43-.9A5.7,5.7,0,0,1,8.17,208a3.9,3.9,0,0,1,1.4,3.11,3.69,3.69,0,0,1-2.47,3.74,3.78,3.78,0,0,1,2.09,1.27,3.75,3.75,0,0,1,.74,2.37,4.09,4.09,0,0,1-1.45,3.25A6,6,0,0,1,4.42,223a9.67,9.67,0,0,1-4.12-.8V219.3a8.11,8.11,0,0,0,3.93,1,3,3,0,0,0,2-.62A2,2,0,0,0,7,218.11C7,216.7,5.86,216,3.61,216H2.7v-2.45h.91A3.88,3.88,0,0,0,5.74,213a1.8,1.8,0,0,0,.86-1.58c0-1.36-.82-2-2.47-2A6.13,6.13,0,0,0,.87,210.39Z"
				/>
			</svg>
		),
	},
	{
		name: "preset-9",
		title: __("preset-9"),
		description: __("preset-9"),
		isPro: true,
		atts: {
			wrapper: { options: { tag: "div", class: "" }, styles: {} },
			searchWrap: {
				options: {
					enable: false,
					contentSrc: ["content", "label"],
					tag: "div",
					class: "accordion-search-wrap",
				},
				styles: {},
			},
			searchInput: {
				options: {
					tag: "input",
					type: "text",
					value: "",
					placeholder: "Search here...",
					class: "accordion-search-input",
				},
				styles: {},
			},
			content: {
				options: { tag: "div", class: "accordion-content" },
				styles: {},
			},
			header: {
				options: { tag: "div", class: "accordion-header" },
				styles: {
					justifyContent: { Desktop: "end" },
					margin: { Desktop: "0px 0px 1px 0px" },
					display: { Desktop: "flex" },
					alignItems: { Desktop: "center" },
				},
			},
			headerLabel: {
				options: {
					text: "Accordion Header Text",
					tag: "div",
					class: "accordion-header-label",
				},
				styles: {
					backgroundColor: { Desktop: "#18978F" },
					color: { Desktop: "#ffffff" },
					width: { Desktop: "100%" },
					textAlign: { Desktop: "right" },
					padding: { Desktop: "10px 10px 10px 10px" },
				},
			},
			labelCounter: {
				options: {
					position: "right",
					tag: "div",
					class: "accordion-header-counter",
				},
				styles: { margin: { Desktop: "0px 0px 0px 10px" } },
			},
			labelIcon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "left",
					enable: false,
					class: "accordion-icon",
				},
				styles: {},
			},
			icon: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-down",
					position: "",
					class: "accordion-icon",
				},
				styles: {},
			},
			iconToggle: {
				options: {
					library: "fontAwesome",
					srcType: "class",
					iconSrc: "fas fa-angle-up",
					class: "accordion-icon-toggle",
				},
				styles: {},
			},
			blockId: "",
			blockCssY: { items: {} },
		},
		innerBlocks: [
			[
				"combo-blocks/accordion-nested-item",
				{
					wrapper: { options: { tag: "div", class: "" }, styles: {} },
					content: {
						options: { tag: "div", class: "accordion-content" },
						styles: {},
					},
					header: {
						options: { tag: "div", class: "accordion-header" },
						styles: {
							justifyContent: { Desktop: "end" },
							margin: { Desktop: "0px 0px 1px 0px" },
							display: { Desktop: "flex" },
							alignItems: { Desktop: "center" },
						},
					},
					headerLabel: {
						options: {
							text: "Accordion Header Text",
							tag: "div",
							class: "accordion-header-label",
						},
						styles: {
							backgroundColor: { Desktop: "#18978F" },
							color: { Desktop: "#ffffff" },
							width: { Desktop: "100%" },
							textAlign: { Desktop: "right" },
							padding: { Desktop: "10px 10px 10px 10px" },
						},
					},
					labelCounter: {
						options: {
							position: "right",
							tag: "div",
							class: "accordion-header-counter",
						},
						styles: { margin: { Desktop: "0px 0px 0px 10px" } },
					},
					labelIcon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "left",
							enable: false,
							class: "accordion-icon",
						},
						styles: {},
					},
					icon: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-down",
							position: "",
							class: "accordion-icon",
						},
						styles: {},
					},
					iconToggle: {
						options: {
							library: "fontAwesome",
							srcType: "class",
							iconSrc: "fas fa-angle-up",
							class: "accordion-icon-toggle",
						},
						styles: {},
					},
					blockId: {},
					blockCssY: { items: {} },
				},
			],
		],
		scope: ["block"],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 236">
				<path
					fill="#3c3c3b"
					d="M351.43,18.57v-3l4.2-2.48h2.57V28.94h-2.89V16.21Z"
				/>
				<path
					fill="#ffffff"
					d="M353.66,76.32H360v2.5H349.63V76.49a30.26,30.26,0,0,0,4.91-4.32A6.6,6.6,0,0,0,356.6,68a2.53,2.53,0,0,0-.7-1.89,2.8,2.8,0,0,0-2-.68A6.06,6.06,0,0,0,350,67V64.12a6.92,6.92,0,0,1,2-1,7.56,7.56,0,0,1,2.38-.39,5.6,5.6,0,0,1,3.8,1.28,4.49,4.49,0,0,1,1.47,3.58Q359.64,71.93,353.66,76.32Z"
				/>
				<path
					fill="#3c3c3b"
					d="M350.52,210.39v-2.75a7.13,7.13,0,0,1,3.47-.9,5.84,5.84,0,0,1,3.92,1.22,3.89,3.89,0,0,1,1.42,3.11,3.69,3.69,0,0,1-2.5,3.74,3.8,3.8,0,0,1,2.11,1.27,3.64,3.64,0,0,1,.76,2.37,4.08,4.08,0,0,1-1.47,3.25,6.2,6.2,0,0,1-4.12,1.25,9.93,9.93,0,0,1-4.18-.8V219.3a8.31,8.31,0,0,0,4,1,3.08,3.08,0,0,0,2.05-.62,2,2,0,0,0,.74-1.59c0-1.41-1.14-2.11-3.43-2.11h-.92v-2.45h.92a4,4,0,0,0,2.17-.56,1.78,1.78,0,0,0,.87-1.58c0-1.36-.83-2-2.5-2A6.23,6.23,0,0,0,350.52,210.39Z"
				/>
				<rect fill="#3c3c3b" width="333.82" height="42.15" />
				<rect fill="#ffffff" y="99.56" width="333.82" height="86.66" />
				<rect fill="#ffffff" y="49.78" width="333.82" height="42.15" />
				<rect fill="#3c3c3b" y="193.85" width="333.82" height="42.15" />
				<rect fill="#ffffff" x="124.2" y="15.45" width="174.4" height="11.09" />
				<rect fill="#3c3c3b" x="124.2" y="65.23" width="174.4" height="11.09" />
				<rect fill="#ffffff" x="124.2" y="209.3" width="174.4" height="11.09" />
			</svg>
		),
	},
];
export default variations;
