// ================================
// Layout CSS Generator
// ================================

function generateLayoutCSS() {

    return layoutSettings.layouts
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