import PGTemplates from './components/templates'
import {
    PanelBody,
    RangeControl,
    Button,
    Panel,
    PanelRow,
    Dropdown,
    DropdownMenu,
    SelectControl,
    ColorPicker,
    ColorPalette,
    ToolsPanelItem,
    ComboboxControl,
    ToggleControl,
    MenuGroup,
    MenuItem,
    TextareaControl,
    Popover,
    __experimentalInputControl as InputControl,
    Spinner,
} from "@wordpress/components";

import PGAiLayoutGenerator from './components/openai-layout-generator'
import { memo, useMemo, useState, useEffect } from '@wordpress/element'
function AiBtn(props) {
    // if (!props.warn) {
    //     return null;
    // }
    const [enable, setEnable] = useState(false);



    var aiLayoutGeneratorWrap = document.querySelector('#pg-ai-layout-generator');

    if (enable) {
        wp.element.render(<PGAiLayoutGenerator args={''} onChange={(args) => {
        }} />, aiLayoutGeneratorWrap)
    }

    return (
        <>
            <div id="pgTemplatesEnable"
                className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-700"
                // className="bg-blue-700 px-5 py-2 cursor-pointer rounded-sm text-white font-bold hover:text-white"
                onClick={(ev) => {
                    setEnable(!enable);
                }}
            >
                {enable && (
                    <span className="dashicons dashicons-no-alt"></span>
                )}
                {!enable && (
                    <span className="dashicons dashicons-buddicons-groups"></span>
                )}
                <span className='inline-block mx-2'>AI</span>
            </div>
            {/* <Popover position="bottom right">Hello</Popover> */}
            {/* {enable && <PGAiLayoutGenerator args={''} onChange={(args) => {
            }} />} */}
        </>
    )
}
document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);
function DOMContentLoadedImport() {
    setTimeout(() => {
        var headerSettings = document.querySelector('.editor-header__settings');
        var wpcontent = document.querySelector('#wpcontent');
        //var wpfooter = document.querySelector('#wpfooter');
        var wpbody = document.querySelector('#wpbody');
        var templatesWrap = document.querySelector('#editor .interface-interface-skeleton__content');
        var importEl = document.createElement('div');
        var html = '<div class="pgAi" id="pgAiBtn"></div>';
        importEl.innerHTML = html;
        //headerSettings.appendChild(importEl);
        if (headerSettings != null) {
            headerSettings.prepend(importEl);
        }
        var pgAiBtn = document.querySelector('#pgAiBtn');
        if (pgAiBtn != null) {
            wp.element.render(<AiBtn />, pgAiBtn)
        }

        var wpfooter = document.getElementById("wpfooter");
        var divWrap = '<div id="pg-ai-layout-generator"></div>';
        wpfooter.insertAdjacentHTML("beforeend", divWrap);

    }, 2000)
}
