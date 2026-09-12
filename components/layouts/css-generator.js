// ================================
// Layout CSS Generator
// ================================

function generateLayoutCSS() {

    const defaultSpacing =
        resolveLayoutSpacing("default");

    return `
.app-navigation {
    display: flex;
    gap: var(--space-md);
    align-items: center;
}

.app-navigation a {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding:
        var(--space-sm)
        var(--space-md);
    border-radius:
        var(--radius-md);
    color:
        var(--color-text);
    text-decoration:
        none;
}

.app-navigation-icon {
    flex-shrink: 0;
}

.app-navigation a:hover {
    background:
        var(--color-secondary);
    color:
        var(--color-secondary-text);
}

.app-header {
    padding:
        var(--space-sm)
        var(--space-md);
    width: 100%;
    min-height: var(--space-xxl);
    position: relative;
    z-index: 2;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
}

.app-sidebar .app-navigation {
    flex-direction: column;
    align-items: stretch;
}

.app-sidebar .app-navigation a {
    white-space: nowrap;
}

.app-sidebar .app-navigation-label {
    display: none;
}

.app-sidebar:hover .app-navigation-label {
    display: inline;
}

.app-sidebar {
    position: fixed;
    left: 0;
    top: var(--space-xxl);
    height: 100vh;
    width: 64px;
    padding: var(--space-sm);
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
    overflow: hidden;
    transition: width 0.2s ease;
}

.app-sidebar:hover {
    width: 200px;
}

.app-main-with-sidebar {
    margin-left: 64px;
}

.app-main {
    padding:
        var(--space-lg)
        var(--space-md);
}

` + layoutSettings.layouts
            .map(layout => {

                const className =
                    generateLayoutClassName(
                        layout
                    );


                const horizontalSpacing =
                    resolveLayoutSpacing(
                        layout.spacingHorizontal
                    );


                const verticalSpacing =
                    resolveLayoutSpacing(
                        layout.spacingVertical
                    );


                // =========================
                // Inline
                // =========================

                if (
                    layout.type === "inline"
                ) {

                    return `

.${className} {
    display: flex;
    flex-wrap: wrap;
    column-gap: ${horizontalSpacing};
    row-gap: ${verticalSpacing};
}

`;

                }


                // =========================
                // Columns
                // =========================

                const columns =
                    calculateLayoutColumns(
                        layout.columns
                    );


                return `

.${className} {
    display: grid;
    grid-template-columns: ${columns};
    column-gap: ${horizontalSpacing};
    row-gap: ${verticalSpacing};
}

`;

            })
            .join("");

}


// ================================
// Calculate Layout Columns
// ================================

function calculateLayoutColumns(
    columns
) {

    if (
        !columns ||
        !columns.length
    ) {

        return "1fr";

    }


    // ================================
    // Identify Auto Columns
    // ================================

    const isAuto =
        value =>
            value === "" ||
            value === null ||
            value === undefined ||
            value === "auto" ||
            value === "Auto" ||
            value === 0 ||
            value === "0";


    // ================================
    // Calculate Explicit Total
    // ================================

    const explicitTotal =
        columns.reduce(
            (
                total,
                value
            ) => {

                if (
                    isAuto(value)
                ) {
                    return total;
                }


                const number =
                    Number(value);


                if (
                    Number.isFinite(number) &&
                    number > 0
                ) {

                    return total + number;

                }


                return total;

            },
            0
        );


    // ================================
    // Count Auto Columns
    // ================================

    const autoCount =
        columns.filter(
            isAuto
        ).length;


    // ================================
    // Calculate Remaining Percentage
    // ================================

    const remaining =
        Math.max(
            0,
            100 - explicitTotal
        );


    const autoPercentage =
        autoCount > 0
            ? remaining / autoCount
            : 0;


    // ================================
    // Generate CSS Values
    // ================================

    return columns
        .map(value => {

            if (
                isAuto(value)
            ) {

                return `${autoPercentage}%`;

            }


            const number =
                Number(value);


            if (
                Number.isFinite(number)
            ) {

                return `${number}%`;

            }


            return "0%";

        })
        .join(" ");

}


// ================================
// Resolve Layout Spacing
// ================================

function resolveLayoutSpacing(
    spacing
) {

    const value =
        spacing === "default"
            ? layoutSettings.defaultSpacing
            : spacing;


    if (
        value === "none"
    ) {

        return "0";

    }


    return `var(--space-${value})`;

}