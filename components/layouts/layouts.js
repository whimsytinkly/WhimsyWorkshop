// ================================
// Layout Settings
// ================================

const layoutSettings = {

    defaultSpacing: "md",

    layouts: [

        {
            name: "Default",
            type: "columns",
            columns: [100],
            builtIn: true
        },

        {
            name: "Inline",
            type: "inline",
            columns: [],
            builtIn: true
        },

        {
            name: "50 / 50",
            type: "columns",
            columns: [50, 50],
            builtIn: true
        },

        {
            name: "70 / 30",
            type: "columns",
            columns: [70, 30],
            builtIn: true
        },

        {
            name: "30 / 70",
            type: "columns",
            columns: [30, 70],
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
            <!-- Layouts -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Layouts
                </h5>

                <div class="global-fields">

                    ${layoutSettings.layouts
            .map((layout, index) => `

                            <div
                                class="global-group">

                                <div class="global-field">

                                    <label>
                                        ${layout.name}
                                    </label>

                                    <span>
                                        ${layout.type === "inline"
                    ? "Inline"
                    : `${layout.columns.length} ${layout.columns.length === 1
                        ? "column"
                        : "columns"
                    }`}
                                    </span>

                                </div>


                                ${layout.builtIn
                    ? ""
                    : `
                                        <button
                                            type="button"
                                            class="button button-danger button-medium"
                                            data-delete-layout="${index}">
                                            Delete
                                        </button>
                                    `}

                            </div>

                        `)
            .join("")}

                </div>

            </div>


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
// Spacing Options
// ================================

function generateLayoutSpacingOptions(
    selected
) {

    const options = [

        ["none", "None"],
        ["xs", "XS"],
        ["sm", "S"],
        ["md", "M"],
        ["lg", "L"]

    ];


    return options
        .map(([value, label]) => `

            <option
                value="${value}"
                ${value === selected
                ? "selected"
                : ""}>
                ${label}
            </option>

        `)
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
            .map((layout, index) => `

                <option
                    value="${index}">
                    ${layout.name}
                </option>

            `)
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
            layout.name
        );


    container.className =
        `layout-preview ${className}`;


    if (layout.type === "inline") {

        container.innerHTML = `

            <div class="layout-preview-item">
                Item 1
            </div>

            <div class="layout-preview-item">
                Item 2
            </div>

            <div class="layout-preview-item">
                Item 3
            </div>

        `;

        return;

    }


    // ================================
    // Preview Items
    // ================================

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
    name
) {

    return `layout-${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;

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


    container.addEventListener(
        "change",
        event => {

            const target =
                event.target;


            const property =
                target.dataset.layoutProperty;


            if (property) {

                layoutSettings[property] =
                    target.value;

            }

        }
    );


    container
        .querySelectorAll(
            "[data-delete-layout]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.deleteLayout
                        );


                    layoutSettings.layouts.splice(
                        index,
                        1
                    );


                    generateLayoutConfig();


                    generateLayoutPreviewOptions();


                    renderLayoutPreview();

                }
            );

        });


    document
        .querySelector(
            "#add-layout"
        )
        ?.addEventListener(
            "click",
            () => {

                const layoutNumber =
                    layoutSettings.layouts.length + 1;


                layoutSettings.layouts.push({

                    name:
                        `Layout ${layoutNumber}`,

                    type:
                        "columns",

                    columns:
                        [100],

                    builtIn:
                        false

                });


                generateLayoutConfig();


                generateLayoutPreviewOptions();

            }
        );


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