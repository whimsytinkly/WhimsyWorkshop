// ================================
// Table CSS Generator
// ================================

function generateTablesCSS() {

    const settings =
        tableSettings;


    // ================================
    // Cell Padding
    // ================================

    const verticalPadding =
        `var(--space-${settings.cellPadding.vertical})`;

    const horizontalPadding =
        `var(--space-${settings.cellPadding.horizontal})`;


    // ================================
    // Table
    // ================================

    let css = `

.table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-surface);
}
`;



    // ================================
    // Cell Padding
    // ================================

    css += `

.table th,
.table td {
    padding: ${verticalPadding} ${horizontalPadding};
}
`;



    // ================================
    // Cell Borders
    // ================================

    const borderRules = [];


    if (settings.borders.top) {

        borderRules.push(
            "border-top: 1px solid var(--color-border);"
        );

    }


    if (settings.borders.bottom) {

        borderRules.push(
            "border-bottom: 1px solid var(--color-border);"
        );

    }


    if (settings.borders.left) {

        borderRules.push(
            "border-left: 1px solid var(--color-border);"
        );

    }


    if (settings.borders.right) {

        borderRules.push(
            "border-right: 1px solid var(--color-border);"
        );

    }


    if (borderRules.length) {

        css += `

.table th,
.table td {
${borderRules
                .map(
                    rule => `    ${rule}`
                )
                .join("\n")}
}
`;

    }



    // ================================
    // Header
    // ================================

    css += `

.table thead {
    background: var(--color-${settings.header.color});
}

.table th {
    font-weight: ${settings.header.weight};
}
`;



    // ================================
    // Rows
    // ================================

    css += `

.table tbody tr {
    background: var(--color-${settings.rows.color});
    font-weight: ${settings.rows.weight};
}
`;



    // ================================
    // Striped Rows
    // ================================

    if (
        settings.rows.style === "striped"
    ) {

        css += `

.table tbody tr:nth-child(even) {
    background: var(--color-${settings.rows.alternateColor});
}
`;

    }



    // ================================
    // Hover
    // ================================

    if (
        settings.hover.enabled
    ) {

        css += `

.table tbody tr:hover {
    background: var(--color-${settings.hover.color});
}
`;

    }



    // ================================
    // Pagination
    // ================================

    css += `

.table-pagination {
    display: flex;
    justify-content: center;
    margin-top: var(--space-md);
}

.table-pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-xs);
}
`;

    // ================================
    // Pagination Alignment
    // ================================

    css += `

.table-pagination {
    display: flex;
    width: 100%;
}

.table-pagination-left {
    justify-content: flex-start;
}

.table-pagination-center {
    justify-content: center;
}

.table-pagination-right {
    justify-content: flex-end;
}
`;



    return css;

}