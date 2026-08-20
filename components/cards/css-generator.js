// ================================
// Generates CSS for Cards
// ================================

function generateCardCSS() {

    return `

.card {
    overflow: hidden;
    box-sizing: border-box;
}


.card-main {
    background:
        ${getCardColorValue(
        cardSettings.main.background
    )};

    border-radius:
        ${getCardRadiusValue(
        cardSettings.main.radius
    )};

    ${generateCardBorders(
        cardSettings.main
    )}

    ${generateCardShadow(
        cardSettings.main.shadow
    )}
}


.card-sub {
    background:
        ${getCardColorValue(
        cardSettings.sub.background
    )};

    border-radius:
        ${getCardRadiusValue(
        cardSettings.sub.radius
    )};

    ${generateCardBorders(
        cardSettings.sub
    )}

    ${generateCardShadow(
        cardSettings.sub.shadow
    )}
}


.card-header {
    border-bottom:
        1px solid
        var(--color-border);
}


.card-main .card-header {
    background:
        ${getCardColorValue(
        cardSettings.main.header
    )};
    padding: ${getCardSpacingValue(
        cardSettings.main.headerPaddingVertical
    )} ${getCardSpacingValue(
        cardSettings.main.headerPaddingHorizontal
    )};
}

.card-main .card-content {
    padding: ${getCardSpacingValue(
        cardSettings.main.contentPaddingVertical
    )} ${getCardSpacingValue(
        cardSettings.main.contentPaddingHorizontal
    )};
}


.card-sub .card-header {
    background:
        ${getCardColorValue(
        cardSettings.sub.header
    )};
    padding: ${getCardSpacingValue(
        cardSettings.sub.headerPaddingVertical
    )} ${getCardSpacingValue(
        cardSettings.sub.headerPaddingHorizontal
    )};
}

.card-sub .card-content {
    padding: ${getCardSpacingValue(
        cardSettings.sub.contentPaddingVertical
    )} ${getCardSpacingValue(
        cardSettings.sub.contentPaddingHorizontal
    )};
}

.card-header h3,
.card-header p {
    margin: 0;
}


.card-header p {
    margin-top:
        var(--space-xs);
}


.card-content {
    display: grid;
    gap:
        var(--space-sm);
}

`;
}


// ================================
// Spacing
// ================================

function getCardSpacingValue(
    value
) {

    return `var(--space-${value})`;

}


// ================================
// Radius
// ================================

function getCardRadiusValue(
    value
) {

    return `var(--radius-${value})`;

}


// ================================
// Colour
// ================================

function getCardColorValue(
    value
) {

    const map = {

        background:
            "var(--color-background)",

        surface:
            "var(--color-surface)",

        primary:
            "var(--color-primary)",

        secondary:
            "var(--color-secondary)",

        accent:
            "var(--color-accent)",

        danger:
            "var(--color-danger)",

        success:
            "var(--color-success)",

        warning:
            "var(--color-warning)",

        text:
            "var(--color-text)",

        subtext:
            "var(--color-subtext)",

        border:
            "var(--color-border)"

    };


    return map[value] ||
        "var(--color-surface)";

}


// ================================
// Borders
// ================================

function generateCardBorders(
    settings
) {

    const sides =
        settings.borderSides;


    if (!sides.length) {
        return "border: none;";
    }


    return sides
        .map(side => `

    border-${side}:
        1px solid
        var(--color-border);

        `)
        .join("\n");

}


// ================================
// Shadows
// ================================

function generateCardShadow(
    shadow
) {

    if (
        shadow === "none"
    ) {
        return "box-shadow: none;";
    }


    return `
    box-shadow:
        var(--shadow-${shadow});
    `;

}