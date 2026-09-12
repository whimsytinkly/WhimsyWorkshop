// ================================
// Layout Settings
// ================================

const layoutSettings = {

    defaultSpacing: "md",

    // ================================
    // Site Layout
    // ================================

    siteLayout: {

        header: true,

        sidebar: true

    },


    // ================================
    // Content Layouts
    // ================================

    layouts: [

        {
            id: "layout-default",
            name: "Default",
            type: "columns",
            columns: [100],
            spacingHorizontal: "default",
            spacingVertical: "default",
            builtIn: true
        },

        {
            id: "layout-inline",
            name: "Inline",
            type: "inline",
            columns: [],
            spacingHorizontal: "default",
            spacingVertical: "default",
            builtIn: true
        },

        {
            id: "layout-50-50",
            name: "50 / 50",
            type: "columns",
            columns: [50, 50],
            spacingHorizontal: "default",
            spacingVertical: "default",
            builtIn: true
        },

        {
            id: "layout-70-30",
            name: "70 / 30",
            type: "columns",
            columns: [70, 30],
            spacingHorizontal: "default",
            spacingVertical: "default",
            builtIn: true
        },

        {
            id: "layout-30-70",
            name: "30 / 70",
            type: "columns",
            columns: [30, 70],
            spacingHorizontal: "default",
            spacingVertical: "default",
            builtIn: true
        }

    ]

};


// ================================
// Layout Configuration UI
// ================================

function generateLayoutConfig() {

    const container =
        document.querySelector(
            '[data-config="layouts"]'
        );

    if (!container) {
        return;
    }


    const customLayouts =
        layoutSettings.layouts.filter(
            layout => !layout.builtIn
        );


    container.innerHTML = `

        <section class="builder-section">


            <!-- ========================= -->
            <!-- Default Spacing -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Default Spacing
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="layout-default-spacing">
                            Spacing
                        </label>


                        <select
                            id="layout-default-spacing"
                            data-layout-property="defaultSpacing">

                            ${generateLayoutSpacingOptions(
        layoutSettings.defaultSpacing
    )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Site Layout -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Site Layout
                </h5>


                <div class="global-fields">


                    <!-- Header -->

                    <div class="global-field">

                        <label
                            for="site-layout-header">
                            Header
                        </label>


                        <input
                            id="site-layout-header"
                            type="checkbox"
                            data-site-layout-property="header"
                            ${layoutSettings.siteLayout.header
            ? "checked"
            : ""}>

                    </div>


                    <!-- Sidebar -->

                    <div class="global-field">

                        <label
                            for="site-layout-sidebar">
                            Sidebar
                        </label>


                        <input
                            id="site-layout-sidebar"
                            type="checkbox"
                            data-site-layout-property="sidebar"
                            ${layoutSettings.siteLayout.sidebar
            ? "checked"
            : ""}>

                    </div>


                </div>

            </div>


            <!-- ========================= -->
            <!-- Built-in Layouts -->
            <!-- ========================= -->

            <div class="global-group">

                <details>

                    <summary>
                        Built-in Layouts
                    </summary>


                    ${layoutSettings.layouts
            .map(
                (layout, index) => {

                    if (!layout.builtIn) {
                        return "";
                    }


                    return `

                        <div class="layout-item">

                            <details>

                                <summary>
                                    ${layout.name}
                                </summary>


                                <div class="global-fields">


                                    <!-- Type -->

                                    <div class="global-field">

                                        <label>
                                            Type
                                        </label>


                                        <span>
                                            ${getLayoutTypeLabel(
                        layout
                    )}
                                        </span>

                                    </div>


                                    <!-- Horizontal -->

                                    <div class="global-field">

                                        <label
                                            for="layout-${index}-spacing-horizontal">
                                            Horizontal
                                        </label>


                                        <select
                                            id="layout-${index}-spacing-horizontal"
                                            data-layout-index="${index}"
                                            data-layout-property="spacingHorizontal">

                                            ${generateLayoutSpacingOptions(
                        layout.spacingHorizontal
                    )}

                                        </select>

                                    </div>


                                    <!-- Vertical -->

                                    <div class="global-field">

                                        <label
                                            for="layout-${index}-spacing-vertical">
                                            Vertical
                                        </label>


                                        <select
                                            id="layout-${index}-spacing-vertical"
                                            data-layout-index="${index}"
                                            data-layout-property="spacingVertical">

                                            ${generateLayoutSpacingOptions(
                        layout.spacingVertical
                    )}

                                        </select>

                                    </div>


                                </div>

                            </details>

                        </div>

                    `;

                }
            )
            .join("")}

                </details>

            </div>


            <!-- ========================= -->
            <!-- Custom Layouts -->
            <!-- ========================= -->

            ${customLayouts.length
            ? `

                <div class="global-group">

                    <details open>

                        <summary>
                            Custom Layouts
                        </summary>


                        ${layoutSettings.layouts
                .map(
                    (layout, index) => {

                        if (layout.builtIn) {
                            return "";
                        }


                        return `

                            <div class="layout-item">

                                <details open>

                                    <summary>

                                        <span>
                                            ${layout.name}
                                        </span>


                                        <button
                                            type="button"
                                            class="button button-danger button-small"
                                            data-delete-layout="${index}"
                                            title="Delete layout"
                                            aria-label="Delete layout">
                                            🗑
                                        </button>

                                    </summary>


                                    <div class="global-fields">


                                        <!-- ========================= -->
                                        <!-- Name -->
                                        <!-- ========================= -->

                                        <div class="global-field">

                                            <label
                                                for="layout-${index}-name">
                                                Name
                                            </label>


                                            <input
                                                id="layout-${index}-name"
                                                type="text"
                                                value="${layout.name}"
                                                data-layout-index="${index}"
                                                data-layout-property="name">

                                        </div>


                                        <!-- ========================= -->
                                        <!-- Type -->
                                        <!-- ========================= -->

                                        <div class="global-field">

                                            <label>
                                                Type
                                            </label>


                                            <span>
                                                ${getLayoutTypeLabel(
                            layout
                        )}
                                            </span>

                                        </div>


                                        <!-- ========================= -->
                                        <!-- Horizontal -->
                                        <!-- ========================= -->

                                        <div class="global-field">

                                            <label
                                                for="layout-${index}-spacing-horizontal">
                                                Horizontal
                                            </label>


                                            <select
                                                id="layout-${index}-spacing-horizontal"
                                                data-layout-index="${index}"
                                                data-layout-property="spacingHorizontal">

                                                ${generateLayoutSpacingOptions(
                            layout.spacingHorizontal
                        )}

                                            </select>

                                        </div>


                                        <!-- ========================= -->
                                        <!-- Vertical -->
                                        <!-- ========================= -->

                                        <div class="global-field">

                                            <label
                                                for="layout-${index}-spacing-vertical">
                                                Vertical
                                            </label>


                                            <select
                                                id="layout-${index}-spacing-vertical"
                                                data-layout-index="${index}"
                                                data-layout-property="spacingVertical">

                                                ${generateLayoutSpacingOptions(
                            layout.spacingVertical
                        )}

                                            </select>

                                        </div>


                                        <!-- ========================= -->
                                        <!-- Columns -->
                                        <!-- ========================= -->

                                        ${layout.type === "columns"
                                ? `

                                            <div class="global-group">

                                                <h5>
                                                    Columns
                                                </h5>


                                                <div class="global-fields">

                                                    ${layout.columns
                                    .map(
                                        (
                                            column,
                                            columnIndex
                                        ) => `

                                                        <div class="global-field">

                                                            <label
                                                                for="layout-${index}-column-${columnIndex}">
                                                                Column ${columnIndex + 1}
                                                            </label>


                                                            <div class="global-input-with-suffix">

                                                                <input
                                                                    id="layout-${index}-column-${columnIndex}"
                                                                    type="number"
                                                                    min="1"
                                                                    max="100"
                                                                    step="1"
                                                                    value="${column}"
                                                                    placeholder="Auto"
                                                                    data-layout-index="${index}"
                                                                    data-column-index="${columnIndex}"
                                                                    data-layout-property="column">


                                                                <span>
                                                                    %
                                                                </span>


                                                                ${layout.columns.length > 1
                                                ? `

                                                                    <button
                                                                        type="button"
                                                                        class="button button-danger button-small"
                                                                        data-delete-column="${index}"
                                                                        data-column-index="${columnIndex}"
                                                                        title="Delete column"
                                                                        aria-label="Delete column">
                                                                        🗑
                                                                    </button>

                                                                `
                                                : ""
                                            }

                                                            </div>

                                                        </div>

                                                    `
                                    )
                                    .join("")}

                                                </div>


                                                <button
                                                    type="button"
                                                    class="button button-secondary button-small"
                                                    data-add-column="${index}">
                                                    Add Column
                                                </button>

                                            </div>

                                        `
                                : ""
                            }


                                    </div>

                                </details>

                            </div>

                        `;

                    }
                )
                .join("")}

                    </details>

                </div>

            `
            : ""
        }


            <!-- ========================= -->
            <!-- Actions -->
            <!-- ========================= -->

            <button
                id="add-layout"
                class="button button-secondary button-medium">
                Add Layout
            </button>


            <button
                id="apply-layouts"
                class="button button-primary button-medium">
                Apply Layouts
            </button>


        </section>

    `;


    bindLayoutEvents();

}


// ================================
// Layout Type Label
// ================================

function getLayoutTypeLabel(
    layout
) {

    if (
        layout.type === "inline"
    ) {

        return "Inline";

    }


    const columnCount =
        layout.columns.length;


    return `${columnCount} ${columnCount === 1
        ? "Column"
        : "Columns"
        }`;

}


// ================================
// Spacing Options
// ================================

function generateLayoutSpacingOptions(
    selected
) {

    const options = [
        ["default", "Default"],
        ["none", "None"],
        ["xs", "XS"],
        ["sm", "S"],
        ["md", "M"],
        ["lg", "L"]
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
// Preview Layout Options
// ================================

function generateLayoutPreviewOptions() {

    const select =
        document.querySelector(
            "#preview-layout"
        );

    if (!select) {
        return;
    }


    select.innerHTML =
        layoutSettings.layouts
            .map(
                (layout, index) => `

                    <option
                        value="${index}">
                        ${layout.name}
                    </option>

                `
            )
            .join("");


    select.addEventListener(
        "change",
        renderLayoutPreview
    );

}


// ================================
// Render Layout Preview
// ================================

function renderLayoutPreview() {

    const select =
        document.querySelector(
            "#preview-layout"
        );


    const container =
        document.querySelector(
            "[data-layout-preview]"
        );


    if (
        !select ||
        !container
    ) {
        return;
    }


    const layout =
        layoutSettings.layouts[
        Number(select.value)
        ];


    if (!layout) {
        return;
    }


    const className =
        generateLayoutClassName(
            layout
        );


    container.className =
        `layout-preview ${className}`;


    const itemCount =
        layout.type === "inline"
            ? 5
            : Math.max(
                5,
                layout.columns.length + 1
            );


    container.innerHTML =
        Array.from(
            {
                length: itemCount
            },
            (_, index) => `

                <div
                    class="layout-preview-item">

                    Item ${index + 1}

                </div>

            `
        )
            .join("");

}


// ================================
// Layout Class Name
// ================================

function generateLayoutClassName(
    layout
) {

    return layout.id;

}


// ================================
// Event Binding
// ================================

function bindLayoutEvents() {

    const container =
        document.querySelector(
            '[data-config="layouts"]'
        );

    if (!container) {
        return;
    }


    // ================================
    // Layout / Site Layout Changes
    // ================================

    container.addEventListener(
        "input",
        event => {

            const target =
                event.target;


            const property =
                target.dataset.layoutProperty;


            const index =
                target.dataset.layoutIndex;


            // =========================
            // Site Layout
            // =========================

            const siteProperty =
                target.dataset.siteLayoutProperty;


            if (
                siteProperty
            ) {

                layoutSettings.siteLayout[
                    siteProperty
                ] =
                    target.checked;

                return;

            }


            // =========================
            // Default Spacing
            // =========================

            if (
                property === "defaultSpacing"
            ) {

                layoutSettings.defaultSpacing =
                    target.value;

                return;

            }


            // =========================
            // Individual Layout
            // =========================

            if (
                index === undefined ||
                !property
            ) {
                return;
            }


            const layoutIndex =
                Number(index);


            const layout =
                layoutSettings.layouts[
                layoutIndex
                ];


            if (!layout) {
                return;
            }


            // =========================
            // Layout Name
            // =========================

            if (
                property === "name"
            ) {

                layout.name =
                    target.value;

                generateLayoutPreviewOptions();

                return;

            }


            // =========================
            // Column Percentage
            // =========================

            if (
                property === "column"
            ) {

                const columnIndex =
                    Number(
                        target.dataset.columnIndex
                    );


                const rawValue =
                    target.value;


                // Blank = Auto

                if (
                    rawValue === ""
                ) {

                    layout.columns[
                        columnIndex
                    ] = "";

                    return;

                }


                const value =
                    Number(rawValue);


                if (
                    Number.isFinite(value)
                ) {

                    layout.columns[
                        columnIndex
                    ] =
                        Math.min(
                            100,
                            Math.max(
                                1,
                                value
                            )
                        );

                }

                return;

            }


            // =========================
            // Other Layout Properties
            // =========================

            layout[property] =
                target.value;

        }
    );


    // ================================
    // Delete Layout
    // ================================

    container
        .querySelectorAll(
            "[data-delete-layout]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();


                        const index =
                            Number(
                                button.dataset.deleteLayout
                            );


                        const layout =
                            layoutSettings.layouts[
                            index
                            ];


                        if (
                            !layout ||
                            layout.builtIn
                        ) {
                            return;
                        }


                        layoutSettings.layouts.splice(
                            index,
                            1
                        );


                        generateLayoutConfig();

                        generateLayoutPreviewOptions();

                        renderLayoutPreview();

                    }
                );

            }
        );


    // ================================
    // Add Column
    // ================================

    container
        .querySelectorAll(
            "[data-add-column]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        const index =
                            Number(
                                button.dataset.addColumn
                            );


                        const layout =
                            layoutSettings.layouts[
                            index
                            ];


                        if (
                            !layout ||
                            layout.type !== "columns"
                        ) {
                            return;
                        }


                        // New column = Auto

                        layout.columns.push(
                            ""
                        );


                        generateLayoutConfig();

                    }
                );

            }
        );


    // ================================
    // Add Layout
    // ================================

    document
        .querySelector(
            "#add-layout"
        )
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const layoutNumber =
                    layoutSettings.layouts.length + 1;


                layoutSettings.layouts.push({

                    id:
                        `layout-${layoutNumber}`,

                    name:
                        `Layout ${layoutNumber}`,

                    type:
                        "columns",

                    // New layout starts as Auto

                    columns:
                        [""],

                    spacingHorizontal:
                        "default",

                    spacingVertical:
                        "default",

                    builtIn:
                        false

                });


                generateLayoutConfig();

                generateLayoutPreviewOptions();


                const select =
                    document.querySelector(
                        "#preview-layout"
                    );


                if (select) {

                    select.value =
                        layoutSettings.layouts.length - 1;

                }


                renderLayoutPreview();

            }
        );


    // ================================
    // Delete Column
    // ================================

    container
        .querySelectorAll(
            "[data-delete-column]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        const layoutIndex =
                            Number(
                                button.dataset.deleteColumn
                            );


                        const columnIndex =
                            Number(
                                button.dataset.columnIndex
                            );


                        const layout =
                            layoutSettings.layouts[
                            layoutIndex
                            ];


                        if (
                            !layout ||
                            layout.type !== "columns" ||
                            layout.columns.length <= 1
                        ) {
                            return;
                        }


                        layout.columns.splice(
                            columnIndex,
                            1
                        );


                        generateLayoutConfig();

                    }
                );

            }
        );


    // ================================
    // Apply Layouts
    // ================================

    document
        .querySelector(
            "#apply-layouts"
        )
        ?.addEventListener(
            "click",
            () => {

                applyPreview();

            }
        );

}

// ================================
// Generate App Navigation
// ================================

function generateAppNavigation() {

    const hasHeader =
        layoutSettings.siteLayout.header;

    const hasSidebar =
        layoutSettings.siteLayout.sidebar;


    // ================================
    // Header + Sidebar
    // ================================

    if (hasHeader && hasSidebar) {

        return `
<header class="app-header">
    <b>
            Hello World
        </b>
</header>

<aside class="app-sidebar">

    <nav class="app-navigation">

        <a href="index.html">
            <span class="app-navigation-icon">🏠</span>
            <span class="app-navigation-label">Home</span>
        </a>

        <a href="demo.html">
            <span class="app-navigation-icon">📦</span>
            <span class="app-navigation-label">Demo</span>
        </a>

    </nav>

</aside>
`;

    }


    // ================================
    // Sidebar Only
    // ================================

    if (hasSidebar) {

        return `
<aside class="app-sidebar">

    <nav class="app-navigation">

        <a href="index.html">
            <span class="app-navigation-icon">🏠</span>
            <span class="app-navigation-label">Home</span>
        </a>

        <a href="demo.html">
            <span class="app-navigation-icon">📦</span>
            <span class="app-navigation-label">Demo</span>
        </a>

    </nav>

</aside>
`;

    }


    // ================================
    // Header Only
    // ================================

    if (hasHeader) {

        return `
<header class="app-header">

    <nav class="app-navigation">
 <b>
            Hello World
        </b>
        <a href="index.html">
            <span class="app-navigation-icon">🏠</span>
            <span class="app-navigation-label">Home</span>
        </a>

        <a href="demo.html">
            <span class="app-navigation-icon">📦</span>
            <span class="app-navigation-label">Demo</span>
        </a>

    </nav>

</header>
`;

    }


    // ================================
    // No Header / No Sidebar
    // ================================

    return `
<nav class="app-navigation app-navigation-compact">

    <label for="app-navigation-select">
        Navigation
    </label>

    <select id="app-navigation-select">

        <option value="index.html">
            Home
        </option>

        <option value="demo.html">
            Demo
        </option>

    </select>

</nav>
`;

}

// ================================
// Initialise
// ================================

function initLayoutBuilder() {

    generateLayoutConfig();

    generateLayoutPreviewOptions();

    renderLayoutPreview();

}


initLayoutBuilder();