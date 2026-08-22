// ================================
// Tab Settings
// ================================

const tabPresetLabels = {
    normal: "Normal",
    underline: "Underline",
    file: "File",
    custom: "Custom"
};


const tabsSettings = {

    preset: "file",

    activeColor: "primary",
    inactiveColor: "surface",

    borderSides: [
        "top",
        "right",
        "bottom",
        "left"
    ],

    borderRadius: {
        topLeft: "sm",
        topRight: "sm",
        bottomRight: "none",
        bottomLeft: "none"
    }

};


// ================================
// Tabs Configuration UI
// ================================

function generateTabsConfig() {

    const container =
        document.querySelector(
            '[data-config="tabs"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            <!-- ========================= -->
            <!-- Preset -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Style
                </h5>

                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="tabs-preset">
                            Preset
                        </label>

                        <select
                            id="tabs-preset"
                            data-tabs-property="preset">

                            ${generateTabPresetOptions(
        tabsSettings.preset
    )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Colours -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Colours
                </h5>

                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="tabs-active-color">
                            Active color
                        </label>

                        <select
                            id="tabs-active-color"
                            data-tabs-property="activeColor">

                            ${generateTabColorOptions(
        tabsSettings.activeColor
    )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="tabs-inactive-color">
                            Inactive color
                        </label>

                        <select
                            id="tabs-inactive-color"
                            data-tabs-property="inactiveColor">

                            ${generateTabColorOptions(
        tabsSettings.inactiveColor
    )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Border -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Border
                </h5>

                <div class="global-fields">

                    <div class="global-field">

                        <label>
                            Border sides
                        </label>

                        <div class="global-checkboxes">

                            ${generateTabsBorderSideOptions(
        tabsSettings.borderSides
    )}

                        </div>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Border Radius -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Border radius
                </h5>

                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="tabs-radius-top-left">
                            Top left
                        </label>

                        <select
                            id="tabs-radius-top-left"
                            data-tabs-radius="topLeft">

                            ${generateTabsRadiusOptions(
        tabsSettings.borderRadius.topLeft
    )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="tabs-radius-top-right">
                            Top right
                        </label>

                        <select
                            id="tabs-radius-top-right"
                            data-tabs-radius="topRight">

                            ${generateTabsRadiusOptions(
        tabsSettings.borderRadius.topRight
    )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="tabs-radius-bottom-right">
                            Bottom right
                        </label>

                        <select
                            id="tabs-radius-bottom-right"
                            data-tabs-radius="bottomRight">

                            ${generateTabsRadiusOptions(
        tabsSettings.borderRadius.bottomRight
    )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="tabs-radius-bottom-left">
                            Bottom left
                        </label>

                        <select
                            id="tabs-radius-bottom-left"
                            data-tabs-radius="bottomLeft">

                            ${generateTabsRadiusOptions(
        tabsSettings.borderRadius.bottomLeft
    )}

                        </select>

                    </div>

                </div>

            </div>


            <button
                id="apply-tabs"
                class="button button-primary button-medium">
                Apply Tabs
            </button>

        </section>

    `;


    bindTabsEvents();

}


// ================================
// Preset Options
// ================================

function generateTabPresetOptions(selected) {

    return Object.entries(tabPresetLabels)
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""}>
                    ${label}
                </option>

            `
        )
        .join("");

}


// ================================
// Colour Options
// ================================

function generateTabColorOptions(selected) {

    const options = [

        ["transparent", "Transparent"],
        ["background", "Background"],
        ["surface", "Surface"],
        ["primary", "Primary"],
        ["secondary", "Secondary"],
        ["accent", "Accent"],
        ["danger", "Danger"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["text", "Text"],
        ["subtext", "Subtext"],
        ["border", "Border"]

    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""}>
                    ${label}
                </option>

            `
        )
        .join("");

}


// ================================
// Border Side Options
// ================================

function generateTabsBorderSideOptions(selected) {

    const sides = [

        ["top", "Top"],
        ["right", "Right"],
        ["bottom", "Bottom"],
        ["left", "Left"]

    ];


    return sides
        .map(
            ([value, label]) => `

                <label class="global-checkbox">

                    <input
                        type="checkbox"
                        data-tabs-border-side="${value}"
                        ${selected.includes(value)
                    ? "checked"
                    : ""}>

                    ${label}

                </label>

            `
        )
        .join("");

}


// ================================
// Radius Options
// ================================

function generateTabsRadiusOptions(selected) {

    return Object.keys(globalSettings.radius)
        .map(
            size => `

                <option
                    value="${size}"
                    ${size === selected
                    ? "selected"
                    : ""}>
                    ${sizeLabels[size] || size}
                </option>

            `
        )
        .join("");

}


// ================================
// Event Binding
// ================================

function bindTabsEvents() {

    const container =
        document.querySelector(
            '[data-config="tabs"]'
        );

    if (!container) {
        return;
    }


    container.addEventListener(
        "change",
        event => {

            const target =
                event.target;


            // =========================
            // Normal properties
            // =========================

            const property =
                target.dataset.tabsProperty;


            if (property) {

                tabsSettings[property] =
                    target.value;


                if (property === "preset") {

                    if (target.value === "file") {

                        tabsSettings.borderRadius.topLeft =
                            "sm";

                        tabsSettings.borderRadius.topRight =
                            "sm";
                        tabsSettings.borderRadius.bottomLeft =
                            "none";

                        tabsSettings.borderRadius.bottomRight =
                            "none";

                    }
                    
                    if (target.value === "normal") {

                        tabsSettings.borderRadius.topLeft =
                            "md";

                        tabsSettings.borderRadius.topRight =
                            "md";
                        tabsSettings.borderRadius.bottomLeft =
                            "md";

                        tabsSettings.borderRadius.bottomRight =
                            "md";

                    }

                }


                applyPreview();

                return;
            }


            // =========================
            // Border sides
            // =========================

            const borderSide =
                target.dataset.tabsBorderSide;


            if (borderSide) {

                if (target.checked) {

                    if (
                        !tabsSettings.borderSides.includes(
                            borderSide
                        )
                    ) {

                        tabsSettings.borderSides.push(
                            borderSide
                        );

                    }

                } else {

                    tabsSettings.borderSides =
                        tabsSettings.borderSides.filter(
                            side =>
                                side !== borderSide
                        );

                }

                applyPreview();

                return;

            }


            // =========================
            // Border radius
            // =========================

            const radius =
                target.dataset.tabsRadius;


            if (radius) {

                tabsSettings.borderRadius[radius] =
                    target.value;


                tabsSettings.preset =
                    "custom";


                const presetSelect =
                    document.querySelector(
                        "#tabs-preset"
                    );


                if (presetSelect) {

                    presetSelect.value =
                        "custom";

                }


                applyPreview();

            }

        }
    );


    document
        .querySelector("#apply-tabs")
        ?.addEventListener(
            "click",
            () => {

                applyPreview();

            }
        );

}


// ================================
// Initialise
// ================================

function initTabsBuilder() {

    generateTabsConfig();

}

// ================================
// Preview Tab Switching
// ================================
function initTabs(container) {

    if (!container) {
        return;
    }


    const tabs =
        container.querySelectorAll(
            ".tabs .tab"
        );


    const panels =
        container.querySelectorAll(
            "[data-tab-content]"
        );


    if (!tabs.length) {
        return;
    }


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const selectedTab =
                    tab.dataset.tab;


                // =========================
                // Update active tab
                // =========================

                tabs.forEach(otherTab => {

                    otherTab.classList.toggle(
                        "active",
                        otherTab === tab
                    );

                });


                // =========================
                // Update active panel
                // =========================

                panels.forEach(panel => {

                    const isActive =
                        panel.dataset.tabContent ===
                        selectedTab;


                    panel.classList.toggle(
                        "active",
                        isActive
                    );


                    if (isActive) {

                        panel.removeAttribute(
                            "hidden"
                        );

                    } else {

                        panel.setAttribute(
                            "hidden",
                            ""
                        );

                    }

                });

            }
        );

    });

}


// ================================
// Initialise
// ================================

initTabsBuilder();

document
    .querySelectorAll("[data-tabs]")
    .forEach(container => {

        initTabs(container);

    });