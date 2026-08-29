// Preview
// ================================
// Layout Preview
// ================================
function applySiteLayoutPreview() {

    const header =
        document.querySelector(
            "#workshop-header"
        );

    const sidebar =
        document.querySelector(
            "#workshop-nav"
        );

    const layout =
        document.querySelector(
            ".workshop-layout"
        );


    if (!layout) {
        return;
    }


    // ================================
    // Header
    // ================================

    if (header) {

        header.hidden =
            !layoutSettings.siteLayout.header;

    }


    // ================================
    // Sidebar
    // ================================

    if (sidebar) {

        sidebar.hidden =
            !layoutSettings.siteLayout.sidebar;

    }


    // ================================
    // Layout State
    // ================================

    layout.classList.toggle(
        "site-header-hidden",
        !layoutSettings.siteLayout.header
    );

    layout.classList.toggle(
        "site-sidebar-hidden",
        !layoutSettings.siteLayout.sidebar
    );

}

// ================================
// Generate Preview CSS
// ================================

function generatePreview() {

    const globalCSS = generateGlobalCSS();

    const themeCSS = generateThemeCSS();

    const buttonCSS = generateButtonCSS();

    const inputCSS = generateInputCSS();

    const cardsCSS = generateCardCSS();

    const tabsCSS = generateTabsCSS();

    const noticesCSS = generateNoticeCSS();

    const layoutsCSS = generateLayoutCSS();

    return `
        ${globalCSS}
        ${themeCSS}
        ${buttonCSS}
        ${inputCSS}
        ${cardsCSS}
        ${tabsCSS}
        ${noticesCSS}
        ${layoutsCSS}
    `;
}


// ================================
// Apply Preview
// ================================

function applyPreview() {

    const css =
        generatePreview();


    let style =
        document.querySelector(
            "#generated-theme"
        );


    if (!style) {

        style =
            document.createElement("style");

        style.id =
            "generated-theme";

        document.head.appendChild(style);

    }


    style.textContent = `
        :root {
            ${css}
        }
    `;
    applySiteLayoutPreview();
    renderNavigation();
    generateCSS();
    generateJS();

}

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === "Shift"
        ) {

            event.preventDefault();

            applyPreview();

        }

    }
);


applyPreview();