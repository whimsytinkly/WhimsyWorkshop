// ================================
// Layout Settings
// ================================

const layoutSettings = {

    defaultSpacing: "md",

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
                                                <!-- Horizontal Spacing -->
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
                                                <!-- Vertical Spacing -->
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
                                                        <!-- Horizontal Spacing -->
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
                                                        <!-- Vertical Spacing -->
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
                                                                                            Column ${columnIndex + 1
                                            }
                                                                                        </label>


                                                                                        <div class="global-input-with-suffix">

                                                                                            <input
                                                                                                id="layout-${index}-column-${columnIndex}"
                                                                                                type="number"
                                                                                                min="1"
                                                                                                max="100"
                                                                                                step="1"
                                                                                                value="${column}"
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
                                                                                                        data-column-index="${columnIndex}">
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

    if (layout.type === "inline") {
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
    // Global / Layout Changes
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


            if (
                property === "defaultSpacing"
            ) {

                layoutSettings.defaultSpacing =
                    target.value;

                return;

            }


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


            // Layout name

            if (
                property === "name"
            ) {

                layout.name =
                    target.value;

                generateLayoutPreviewOptions();

                return;

            }


            // Column percentage

            if (
                property === "column"
            ) {

                const columnIndex =
                    Number(
                        target.dataset.columnIndex
                    );


                const value =
                    Number(
                        target.value
                    );


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
                    () => {

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
                    () => {

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


                        layout.columns.push(
                            0
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
            () => {

                const customLayoutCount =
                    layoutSettings.layouts.filter(
                        layout =>
                            !layout.builtIn
                    ).length;


                const layoutNumber =
                    layoutSettings.layouts.length + 1;


                layoutSettings.layouts.push({

                    id:
                        `layout-${layoutNumber}`,

                    name:
                        `Layout ${layoutNumber}`,

                    type:
                        "columns",

                    columns:
                        [100],

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
    // Delete column
    // ================================
    container
        .querySelectorAll(
            "[data-delete-column]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

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
// Initialise
// ================================

function initLayoutBuilder() {

    generateLayoutConfig();

    generateLayoutPreviewOptions();

    renderLayoutPreview();

}


initLayoutBuilder();