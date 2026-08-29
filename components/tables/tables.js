// ================================
// Table Settings
// ================================

const tableSettings = {

    // ================================
    // Cell Padding
    // ================================

    cellPadding: {
        vertical: "sm",
        horizontal: "sm"
    },


    // ================================
    // Borders
    // ================================

    borders: {
        top: true,
        bottom: true,
        left: false,
        right: false
    },


    // ================================
    // Header
    // ================================

    header: {
        color: "secondary",
        weight: 700
    },


    // ================================
    // Rows
    // ================================

    rows: {
        style: "plain",
        color: "surface",
        alternateColor: "surface",
        weight: 400
    },


    // ================================
    // Hover
    // ================================

    hover: {
        enabled: true,
        color: "secondary"
    },


    // ================================
    // Pagination
    // ================================

    pagination: {
        pageSize: 10,
        position: "bottom",
        alignment: "right",
        maxPagesShown: 5,
        controls: {
            previous: true,
            next: true,
            pages: true,
            first: false,
            last: false
        }
    }

};


// ================================
// Table Preview Data
// ================================

const tablePreviewData = [

    {
        name: "Whimsy",
        status: "Active",
        type: "Project"
    },

    {
        name: "Mimi",
        status: "Ready",
        type: "Cat"
    },

    {
        name: "Workshop",
        status: "Building",
        type: "App"
    },

    {
        name: "Mimikyu",
        status: "Important",
        type: "Friend"
    },

    {
        name: "Palette",
        status: "Ready",
        type: "Theme"
    },

    {
        name: "Buttons",
        status: "Active",
        type: "Component"
    },

    {
        name: "Cards",
        status: "Building",
        type: "Component"
    },

    {
        name: "Tabs",
        status: "Ready",
        type: "Component"
    },

    {
        name: "Notices",
        status: "Active",
        type: "Component"
    },

    {
        name: "Layouts",
        status: "Building",
        type: "Component"
    },

    {
        name: "Inputs",
        status: "Ready",
        type: "Component"
    },

    {
        name: "Tables",
        status: "Active",
        type: "Component"
    },

    {
        name: "Toast",
        status: "Ready",
        type: "Notice"
    },

    {
        name: "Pagination",
        status: "Building",
        type: "Component"
    },

    {
        name: "Starter App",
        status: "Planned",
        type: "Website"
    }

];


// ================================
// Table Preview
// ================================

function renderTablePreview(
    page = 1
) {

    const container =
        document.querySelector(
            "[data-table-preview]"
        );

    if (!container) {
        return;
    }


    const settings =
        tableSettings.pagination;


    const pageSize =
        settings.pageSize;


    const totalPages =
        Math.ceil(
            tablePreviewData.length /
            pageSize
        );


    const currentPage =
        Math.min(
            Math.max(page, 1),
            totalPages
        );


    const startIndex =
        (currentPage - 1) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const visibleRows =
        tablePreviewData.slice(
            startIndex,
            endIndex
        );


    const pagination =
        totalPages > 1
            ? `
                <div
                    class="table-pagination  table-pagination-${settings.alignment}"
                    data-table-pagination>
                </div>
            `
            : "";


    // ================================
    // Pagination Position
    // ================================

    let topPagination = "";
    let bottomPagination = "";


    if (
        totalPages > 1 &&
        (
            settings.position === "top" ||
            settings.position === "both"
        )
    ) {

        topPagination =
            pagination;

    }


    if (
        totalPages > 1 &&
        (
            settings.position === "bottom" ||
            settings.position === "both"
        )
    ) {

        bottomPagination =
            pagination;

    }


    container.innerHTML = `

        ${topPagination}


        <table class="table">

            <thead>

                <tr>

                    <th>
                        Name
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Type
                    </th>

                </tr>

            </thead>


            <tbody>

                ${visibleRows
            .map(
                row => `

                            <tr>

                                <td>
                                    ${row.name}
                                </td>

                                <td>
                                    ${row.status}
                                </td>

                                <td>
                                    ${row.type}
                                </td>

                            </tr>

                        `
            )
            .join("")}

            </tbody>

        </table>


        ${bottomPagination}

    `;


    // ================================
    // Render Pagination
    // ================================

    const paginationContainers =
        container.querySelectorAll(
            "[data-table-pagination]"
        );


    paginationContainers.forEach(
        paginationContainer => {

            renderTablePagination(
                paginationContainer,
                currentPage,
                totalPages
            );

        }
    );

}


// ================================
// Table Pagination
// ================================

function renderTablePagination(
    container,
    currentPage,
    totalPages
) {

    if (!container) {
        return;
    }


    const settings =
        tableSettings.pagination;


    const controls =
        settings.controls;


    // ================================
    // No Pagination Needed
    // ================================

    if (totalPages <= 1) {

        container.innerHTML = "";

        return;

    }


    // ================================
    // Page Range
    // ================================

    const maxPages =
        Math.max(
            1,
            Math.min(
                settings.maxPagesShown,
                totalPages
            )
        );


    let startPage =
        Math.max(
            1,
            currentPage -
            Math.floor(maxPages / 2)
        );


    let endPage =
        startPage +
        maxPages -
        1;


    if (endPage > totalPages) {

        endPage =
            totalPages;

        startPage =
            Math.max(
                1,
                endPage -
                maxPages +
                1
            );

    }


    // ================================
    // Ellipsis Jump
    // ================================

    const jumpSize =
        maxPages;


    const previousJumpPage =
        Math.max(
            1,
            startPage -
            jumpSize
        );


    const nextJumpPage =
        Math.min(
            totalPages,
            endPage +
            jumpSize
        );


    // ================================
    // Left Ellipsis
    // ================================

    const leftEllipsis =
        controls.pages &&
            startPage > 1
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="${previousJumpPage}"
                    aria-label="Jump backward ${jumpSize} pages">

                    ...

                </button>

            `
            : "";


    // ================================
    // Page Buttons
    // ================================

    let pageButtons = "";


    if (controls.pages) {

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {

            const buttonClass =
                page === currentPage
                    ? "button-primary"
                    : "button-secondary";


            pageButtons += `

                <button
                    class="button ${buttonClass} button-small"
                    type="button"
                    data-table-page="${page}">

                    ${page}

                </button>

            `;

        }

    }


    // ================================
    // Right Ellipsis
    // ================================

    const rightEllipsis =
        controls.pages &&
            endPage < totalPages
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="${nextJumpPage}"
                    aria-label="Jump forward ${jumpSize} pages">

                    ...

                </button>

            `
            : "";


    // ================================
    // First
    // ================================

    const firstButton =
        controls.first
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="1"
                    ${currentPage === 1 ? "disabled" : ""}>

                    First

                </button>

            `
            : "";


    // ================================
    // Previous
    // ================================

    const previousButton =
        controls.previous
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="${currentPage - 1}"
                    ${currentPage === 1 ? "disabled" : ""}>

                    Previous

                </button>

            `
            : "";


    // ================================
    // Next
    // ================================

    const nextButton =
        controls.next
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="${currentPage + 1}"
                    ${currentPage === totalPages ? "disabled" : ""}>

                    Next

                </button>

            `
            : "";


    // ================================
    // Last
    // ================================

    const lastButton =
        controls.last
            ? `

                <button
                    class="button button-secondary button-small"
                    type="button"
                    data-table-page="${totalPages}"
                    ${currentPage === totalPages ? "disabled" : ""}>

                    Last

                </button>

            `
            : "";


    // ================================
    // Render
    // ================================

    container.innerHTML = `

        <div class="table-pagination-controls">

            ${firstButton}

            ${previousButton}

            ${leftEllipsis}

            ${pageButtons}

            ${rightEllipsis}

            ${nextButton}

            ${lastButton}

        </div>

    `;


    bindTablePaginationEvents();

}


// ================================
// Pagination Events
// ================================

function bindTablePaginationEvents() {

    document
        .querySelectorAll(
            "[data-table-page]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const page =
                            Number(
                                button.dataset.tablePage
                            );


                        if (
                            Number.isFinite(page)
                        ) {

                            renderTablePreview(
                                page
                            );

                        }

                    }
                );

            }
        );

}


// ================================
// Table Configuration UI
// ================================

function generateTableConfig() {

    const container =
        document.querySelector(
            '[data-config="tables"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            <!-- ========================= -->
            <!-- Cell Padding -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Cell Padding
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="table-padding-vertical">
                            Vertical
                        </label>


                        <select
                            id="table-padding-vertical"
                            data-table-section="cellPadding"
                            data-table-property="vertical">

                            ${generateTableSpacingOptions(
        tableSettings.cellPadding.vertical
    )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-padding-horizontal">
                            Horizontal
                        </label>


                        <select
                            id="table-padding-horizontal"
                            data-table-section="cellPadding"
                            data-table-property="horizontal">

                            ${generateTableSpacingOptions(
        tableSettings.cellPadding.horizontal
    )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Borders -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Borders
                </h5>


                <div class="global-fields">

                    ${[
            ["top", "Top"],
            ["bottom", "Bottom"],
            ["left", "Left"],
            ["right", "Right"]
        ]
            .map(
                ([property, label]) => `

                                <div class="global-field">

                                    <label
                                        for="table-border-${property}">
                                        ${label}
                                    </label>


                                    <input
                                        id="table-border-${property}"
                                        type="checkbox"
                                        data-table-section="borders"
                                        data-table-property="${property}"
                                        ${tableSettings.borders[property]
                        ? "checked"
                        : ""
                    }>

                                </div>

                            `
            )
            .join("")}

                </div>

            </div>


            <!-- ========================= -->
            <!-- Header -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Header
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="table-header-color">
                            Color
                        </label>


                        <select
                            id="table-header-color"
                            data-table-section="header"
                            data-table-property="color">

                            ${generateTableColorOptions(
                tableSettings.header.color
            )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-header-weight">
                            Font weight
                        </label>


                        <select
                            id="table-header-weight"
                            data-table-section="header"
                            data-table-property="weight">

                            ${generateTableWeightOptions(
                tableSettings.header.weight
            )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Rows -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Rows
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="table-row-style">
                            Style
                        </label>


                        <select
                            id="table-row-style"
                            data-table-section="rows"
                            data-table-property="style">

                            <option
                                value="plain"
                                ${tableSettings.rows.style === "plain"
            ? "selected"
            : ""
        }>

                                Plain

                            </option>

                            <option
                                value="striped"
                                ${tableSettings.rows.style === "striped"
            ? "selected"
            : ""
        }>

                                Striped

                            </option>

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-row-color">
                            Color
                        </label>


                        <select
                            id="table-row-color"
                            data-table-section="rows"
                            data-table-property="color">

                            ${generateTableColorOptions(
            tableSettings.rows.color
        )}

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-row-weight">
                            Font weight
                        </label>


                        <select
                            id="table-row-weight"
                            data-table-section="rows"
                            data-table-property="weight">

                            ${generateTableWeightOptions(
            tableSettings.rows.weight
        )}

                        </select>

                    </div>


                    <div
                        id="table-alternate-color-field"
                        class="global-field"
                        ${tableSettings.rows.style !== "striped"
            ? "hidden"
            : ""
        }>

                        <label
                            for="table-alternate-color">
                            Alternate color
                        </label>


                        <select
                            id="table-alternate-color"
                            data-table-section="rows"
                            data-table-property="alternateColor">

                            ${generateTableColorOptions(
            tableSettings.rows.alternateColor
        )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Hover -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Hover
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="table-hover-enabled">
                            Enabled
                        </label>


                        <input
                            id="table-hover-enabled"
                            type="checkbox"
                            data-table-section="hover"
                            data-table-property="enabled"
                            ${tableSettings.hover.enabled
            ? "checked"
            : ""
        }>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-hover-color">
                            Color
                        </label>


                        <select
                            id="table-hover-color"
                            data-table-section="hover"
                            data-table-property="color">

                            ${generateTableColorOptions(
            tableSettings.hover.color
        )}

                        </select>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Pagination -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Pagination
                </h5>


                <div class="global-fields">

                    <div class="global-field">

                        <label
                            for="table-page-size">
                            Page size
                        </label>


                        <input
                            id="table-page-size"
                            type="number"
                            min="1"
                            step="1"
                            value="${tableSettings.pagination.pageSize}"
                            data-table-section="pagination"
                            data-table-property="pageSize">

                    </div>


                    <div class="global-field">

                        <label
                            for="table-pagination-position">
                            Position
                        </label>


                        <select
                            id="table-pagination-position"
                            data-table-section="pagination"
                            data-table-property="position">

                            <option
                                value="top"
                                ${tableSettings.pagination.position === "top"
            ? "selected"
            : ""
        }>

                                Top

                            </option>

                            <option
                                value="bottom"
                                ${tableSettings.pagination.position === "bottom"
            ? "selected"
            : ""
        }>

                                Bottom

                            </option>

                            <option
                                value="both"
                                ${tableSettings.pagination.position === "both"
            ? "selected"
            : ""
        }>

                                Both

                            </option>

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-pagination-alignment">
                            Alignment
                        </label>


                        <select
                            id="table-pagination-alignment"
                            data-table-section="pagination"
                            data-table-property="alignment">

                            <option
                                value="left"
                                ${tableSettings.pagination.alignment === "left"
            ? "selected"
            : ""
        }>

                                Left

                            </option>

                            <option
                                value="center"
                                ${tableSettings.pagination.alignment === "center"
            ? "selected"
            : ""
        }>

                                Center

                            </option>

                            <option
                                value="right"
                                ${tableSettings.pagination.alignment === "right"
            ? "selected"
            : ""
        }>

                                Right

                            </option>

                        </select>

                    </div>


                    <div class="global-field">

                        <label
                            for="table-max-pages-shown">
                            Max pages shown
                        </label>


                        <input
                            id="table-max-pages-shown"
                            type="number"
                            min="3"
                            step="1"
                            value="${tableSettings.pagination.maxPagesShown}"
                            data-table-section="pagination"
                            data-table-property="maxPagesShown">

                    </div>

                </div>


                <!-- ========================= -->
                <!-- Controls -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Controls
                    </h5>


                    <div class="global-fields">

                        ${[
            ["previous", "Previous"],
            ["next", "Next"],
            ["pages", "Page numbers"],
            ["first", "First"],
            ["last", "Last"]
        ]
            .map(
                ([property, label]) => `

                                    <div class="global-field">

                                        <label
                                            for="table-pagination-${property}">
                                            ${label}
                                        </label>


                                        <input
                                            id="table-pagination-${property}"
                                            type="checkbox"
                                            data-table-section="pagination.controls"
                                            data-table-property="${property}"
                                            ${tableSettings.pagination.controls[property]
                        ? "checked"
                        : ""
                    }>

                                    </div>

                                `
            )
            .join("")}

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Apply -->
            <!-- ========================= -->

            <button
                id="apply-tables"
                class="button button-primary button-medium">

                Apply Tables

            </button>

        </section>

    `;


    bindTableEvents();

}


// ================================
// Spacing Options
// ================================

function generateTableSpacingOptions(
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
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""
                }>

                    ${label}

                </option>

            `
        )
        .join("");

}


// ================================
// Color Options
// ================================

function generateTableColorOptions(
    selected
) {

    const options = [
        ["background", "Background"],
        ["surface", "Surface"],
        ["primary", "Primary"],
        ["secondary", "Secondary"],
        ["accent", "Accent"],
        ["subtext", "Subtext"]
    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""
                }>

                    ${label}

                </option>

            `
        )
        .join("");

}


// ================================
// Font Weight Options
// ================================

function generateTableWeightOptions(
    selected
) {

    const options = [
        [400, "400"],
        [500, "500"],
        [600, "600"],
        [700, "700"],
        [800, "800"]
    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${Number(value) === Number(selected)
                    ? "selected"
                    : ""
                }>

                    ${label}

                </option>

            `
        )
        .join("");

}


// ================================
// Event Binding
// ================================

function bindTableEvents() {

    const container =
        document.querySelector(
            '[data-config="tables"]'
        );

    if (!container) {
        return;
    }


    container.addEventListener(
        "input",
        event => {

            const target =
                event.target;


            const section =
                target.dataset.tableSection;


            const property =
                target.dataset.tableProperty;


            if (
                !section ||
                !property
            ) {
                return;
            }


            // =========================
            // Pagination Controls
            // =========================

            if (
                section === "pagination.controls"
            ) {

                tableSettings.pagination.controls[
                    property
                ] =
                    target.checked;

                return;

            }


            // =========================
            // Other Settings
            // =========================

            const settings =
                tableSettings[
                section
                ];


            if (!settings) {
                return;
            }


            if (
                target.type === "checkbox"
            ) {

                settings[property] =
                    target.checked;

            }

            else if (
                target.type === "number"
            ) {

                const value =
                    Number(target.value);


                if (
                    Number.isFinite(value) &&
                    value >= 1
                ) {

                    settings[property] =
                        value;

                }

            }

            else {

                settings[property] =
                    target.value;

            }


            // =========================
            // Striped Rows
            // =========================

            if (
                section === "rows" &&
                property === "style"
            ) {

                const alternateColorField =
                    document.querySelector(
                        "#table-alternate-color-field"
                    );


                if (alternateColorField) {

                    alternateColorField.hidden =
                        target.value !== "striped";

                }

            }

        }
    );


    document
        .querySelector(
            "#apply-tables"
        )
        ?.addEventListener(
            "click",
            () => {

                renderTablePreview();

                applyPreview();

            }
        );

}


// ================================
// Initialise
// ================================

function initTableBuilder() {

    generateTableConfig();

    renderTablePreview();

}


initTableBuilder();