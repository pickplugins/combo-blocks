/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
let isProFeature = applyFilters('isProFeature', true);
/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
    {
        name: '1-column',
        title: __('1 Col'),
        description: __('1 Col'),
        isDefault: true,
        isPro: false,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } }, }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="152.29" height="82.57" /></svg>
        ),
    },
    {
        name: '2-columns',
        title: __('2-columns'),
        description: __('2-columns'),
        isPro: false,
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" x="119.78" width="32.5" height="82.57" /><rect fill="#1d4ed8" x="79.58" width="72.71" height="82.57" /><rect fill="#1d4ed8" width="72.71" height="82.57" /></svg>
        ),
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } }, }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
    },
    {
        name: '3-columns',
        title: __('3-columns'),
        description: __('3-columns'),
        isPro: false,
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="46.18" height="82.57" /><rect fill="#1d4ed8" x="53.05" width="99.24" height="82.57" /></svg>
        ),
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="46.18" height="82.57" /><rect fill="#1d4ed8" x="53.05" width="46.18" height="82.57" /><rect fill="#1d4ed8" x="106.1" width="46.18" height="82.57" /></svg>
        )
    },
    {
        name: '4-columns',
        title: __('4-columns'),
        description: __('4-columns'),
        isPro: false,
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="39.15" height="82.57" /><rect fill="#1d4ed8" x="46.02" width="60.25" height="82.57" /><rect fill="#1d4ed8" x="113.14" width="39.15" height="82.57" /></svg>
        ),
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="32.5" height="82.57" /><rect fill="#1d4ed8" x="40.21" width="31.66" height="82.57" /><rect fill="#1d4ed8" x="80.41" width="31.66" height="82.57" /><rect fill="#1d4ed8" x="120.62" width="31.66" height="82.57" /></svg>
        )
    },
    {
        name: '5-columns',
        title: __('5-columns'),
        description: __('5-columns'),
        isPro: false,
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="39.15" height="82.57" /><rect fill="#1d4ed8" x="46.02" width="60.25" height="82.57" /><rect fill="#1d4ed8" x="113.14" width="39.15" height="82.57" /></svg>
        ),
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexBasis": { "Desktop": "0" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="25.5" height="82.57" /><rect fill="#1d4ed8" x="31.7" width="25.5" height="82.57" /><rect fill="#1d4ed8" x="63.4" width="25.5" height="82.57" /><rect fill="#1d4ed8" x="95.09" width="25.5" height="82.57" /><rect fill="#1d4ed8" x="126.79" width="25.5" height="82.57" /></svg>
        )
    },
    {
        name: '33-66',
        title: __('33-66'),
        description: __('33-66'),
        isDefault: true,
        isPro: !isProFeature ? false : true,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "33%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "66%" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="46.18" height="82.57" /><rect fill="#1d4ed8" x="53.05" width="99.24" height="82.57" /></svg>
        ),
    },
    {
        name: '66-33',
        title: __('66-33'),
        description: __('66-33'),
        isDefault: true,
        isPro: !isProFeature ? false : true,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "66%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "33%" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="99.24" height="82.57" /><rect fill="#1d4ed8" x="106.1" width="46.18" height="82.57" /></svg>
        ),
    },
    {
        name: '25-50-25',
        title: __('25-50-25'),
        description: __('25-50-25'),
        isDefault: true,
        isPro: !isProFeature ? false : true,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "50%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="39.15" height="82.57" /><rect fill="#1d4ed8" x="46.02" width="60.25" height="82.57" /><rect fill="#1d4ed8" x="113.14" width="39.15" height="82.57" /></svg>
        ),
    },
    {
        name: '25-25-50',
        title: __('25-25-50'),
        description: __('25-25-50'),
        isDefault: true,
        isPro: !isProFeature ? false : true,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "50%" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" width="31.29" height="82.57" /><rect fill="#1d4ed8" x="38.16" width="31.29" height="82.57" /><rect fill="#1d4ed8" x="76.33" width="75.96" height="82.57" /></svg>
        ),
    },
    {
        name: '50-25-25',
        title: __('50-25-25'),
        description: __('50-25-25'),
        isDefault: true,
        isPro: !isProFeature ? false : true,
        atts: { "wrapper": { "options": { "tag": "div", "class": "flex-wrap" }, "styles": { "display": { "Desktop": "flex" }, "gap": { "Desktop": "1em" } } }, },
        innerBlocks: [
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "50%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
            ['combo-blocks/flex-wrap-item', { "wrapper": { "options": { "tag": "div", "class": "flex-item-wrap" }, "styles": { "width": { "Desktop": "25%" }, "flexGrow": { "Desktop": "1" } } } }],
        ],
        scope: ['block'],
        icon: (
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.29 82.57"><rect fill="#1d4ed8" x="120.99" width="31.29" height="82.57" transform="translate(273.28 82.57) rotate(180)" /><rect fill="#1d4ed8" x="82.83" width="31.29" height="82.57" transform="translate(196.95 82.57) rotate(180)" /><rect fill="#1d4ed8" width="75.96" height="82.57" transform="translate(75.96 82.57) rotate(180)" /></svg>
        ),
    },
];
export default variations;