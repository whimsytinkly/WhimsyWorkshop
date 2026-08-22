// ================================
// Layout CSS Generator
// ================================

function generateLayoutCSS() {

    return layoutSettings.layouts
        .map(layout => {

            const className =
                generateLayoutClassName(
                    layout.name
                );


            const spacing =
                layoutSettings.defaultSpacing === "none"
                    ? "0"
                    : `var(--space-${layoutSettings.defaultSpacing})`;


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
    gap: ${spacing};
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
    gap: ${spacing};
}

`;

        })
        .join("");

}