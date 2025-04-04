import PGDashboard from './components/dashboard'
import { memo, useMemo, useState, useEffect } from '@wordpress/element'
function TemplatesBtn(props) {
    // if (!props.warn) {
    //     return null;
    // }
    const [enable, setEnable] = useState(false);
    return (
        <PGDashboard setEnable={setEnable} />
    )
}
document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);
function DOMContentLoadedImport() {
    setTimeout(() => {
        var headerSettings = document.querySelector('#cb-dashboard');
        var importEl = document.createElement('div');
        var html = '<div class="pgTemplates" id="pgDashboardBtn"></div>';
        importEl.innerHTML = html;
        if (headerSettings != null) {
            headerSettings.prepend(importEl);
        }
        var pgDashboardBtn = document.querySelector('#pgDashboardBtn');
        if (pgDashboardBtn != null) {
            wp.element.render(<TemplatesBtn />, pgDashboardBtn)
        }
    }, 2000)
}
