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
                layout.columns
                    .map(
                        value => `${value}%`
                    )
                    .join(" ");


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