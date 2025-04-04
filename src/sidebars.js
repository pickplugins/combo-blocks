import apiFetch from '@wordpress/api-fetch';
import {
    createElement,
    useCallback,
    memo,
    useMemo,
    useState,
    useEffect,
} from "@wordpress/element";
import { registerPlugin } from '@wordpress/plugins';
//import { PluginSidebar } from '@wordpress/post-edit';
import PGsidebars from './components/sidebars'

function PGcompareVersions(version1, version2) {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    const maxLength = Math.max(v1Parts.length, v2Parts.length);

    for (let i = 0; i < maxLength; i++) {
        const v1 = v1Parts[i] || 0;
        const v2 = v2Parts[i] || 0;

        if (v1 > v2) return 1;  // version1 is greater
        if (v1 < v2) return -1; // version2 is greater
    }
    return 0; // versions are equal
}

apiFetch({
    path: "/combo-blocks/v2/get_plugin_data",
    method: "POST",
    data: {},
}).then((res) => {
    //window.ComboBlocksPluginData = res;

    var wpVersion = res.wpVersion;
    if (PGcompareVersions(wpVersion, '6.6') > 0) {
        var PluginSidebar = wp.editor.PluginSidebar;


    } else {
        const { PluginSidebar } = wp.editPost;

    }


    var iconPostGrid = <svg width="50" height="50" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M267.846 117.688C267.846 114.926 270.085 112.688 272.846 112.688H450C452.761 112.688 455 114.926 455 117.688V144.205C455 146.967 452.761 149.205 450 149.205H272.846C270.085 149.205 267.846 146.967 267.846 144.205V117.688Z" fill="#4f46e5" />
        <path d="M267.846 194.375C267.846 191.614 270.085 189.375 272.846 189.375H450C452.761 189.375 455 191.614 455 194.375V220.893C455 223.654 452.761 225.893 450 225.893H272.846C270.085 225.893 267.846 223.654 267.846 220.893V194.375Z" fill="#4f46e5" />
        <path d="M267.846 41C267.846 38.2386 270.085 36 272.846 36H450C452.761 36 455 38.2386 455 41V67.5179C455 70.2793 452.761 72.5179 450 72.5179H272.846C270.085 72.5179 267.846 70.2793 267.846 67.5179V41Z" fill="#4f46e5" />
        <rect x="66" y="56" width="149.893" height="149.893" stroke="#4f46e5" stroke-width="40" />
        <path d="M233.154 383.355C233.154 386.116 230.915 388.355 228.154 388.355L51 388.355C48.2386 388.355 46 386.116 46 383.355L46 356.837C46 354.076 48.2386 351.837 51 351.837L228.154 351.837C230.915 351.837 233.154 354.076 233.154 356.837L233.154 383.355Z" fill="#4f46e5" />
        <path d="M233.154 306.667C233.154 309.429 230.915 311.667 228.154 311.667L51 311.667C48.2386 311.667 46 309.429 46 306.667L46 280.15C46 277.388 48.2386 275.15 51 275.15L228.154 275.15C230.915 275.15 233.154 277.388 233.154 280.15L233.154 306.667Z" fill="#4f46e5" />
        <path d="M233.154 460.042C233.154 462.804 230.915 465.042 228.154 465.042L51 465.042C48.2386 465.042 46 462.804 46 460.042L46 433.525C46 430.763 48.2386 428.525 51 428.525L228.154 428.525C230.915 428.525 233.154 430.763 233.154 433.525L233.154 460.042Z" fill="#4f46e5" />
        <rect x="435" y="445.042" width="149.893" height="149.893" transform="rotate(-180 435 445.042)" stroke="#4f46e5" stroke-width="40" />
    </svg>
    const ComboBlocksSidebar = () => (
        <PluginSidebar name="combo-blocks-sidebar" title="Combo Blocks" icon={iconPostGrid}>
            <PGsidebars />
        </PluginSidebar>
    );
    registerPlugin('combo-blocks-sidebar', { render: ComboBlocksSidebar });


});




