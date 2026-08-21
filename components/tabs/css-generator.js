// ================================
// Tabs CSS Generator
// ================================

function generateTabsCSS() {

    const settings =
        tabsSettings;


    const preset =
        settings.preset;


    // ================================
    // Resolve Colours
    // ================================

    const activeColor =
        resolveTabColor(
            settings.activeColor,
            preset
        );


    const inactiveColor =
        resolveTabColor(
            settings.inactiveColor,
            preset
        );


    // ================================
    // Border
    // ================================

    const borderTop =
        settings.borderSides.includes("top")
            ? "1px solid var(--color-border)"
            : "none";


    const borderRight =
        settings.borderSides.includes("right")
            ? "1px solid var(--color-border)"
            : "none";


    const borderBottom =
        settings.borderSides.includes("bottom")
            ? "1px solid var(--color-border)"
            : "none";


    const borderLeft =
        settings.borderSides.includes("left")
            ? "1px solid var(--color-border)"
            : "none";


    // ================================
    // Radius
    // ================================

    const radius =
        settings.borderRadius;


    const radiusTopLeft =
        `var(--radius-${radius.topLeft})`;


    const radiusTopRight =
        `var(--radius-${radius.topRight})`;


    const radiusBottomRight =
        `var(--radius-${radius.bottomRight})`;


    const radiusBottomLeft =
        `var(--radius-${radius.bottomLeft})`;


    // ================================
    // Base Tab
    // ================================

    let css = `
.tabs {
    display: flex;
    gap: 0;
}
.tab {
    padding: var(--space-sm) var(--space-md);
    border-top: ${borderTop};
    border-right: ${borderRight};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    border-top-left-radius: ${radiusTopLeft};
    border-top-right-radius: ${radiusTopRight};
    border-bottom-right-radius: ${radiusBottomRight};
    border-bottom-left-radius: ${radiusBottomLeft};
    font: inherit;
    cursor: pointer;
}
`;


    // ================================
    // Normal/File/Custom
    // ================================

    if (preset !== "underline") {

        css += `

.tab {
    background: ${inactiveColor.background};
    color: ${inactiveColor.text};
}

.tab.active {
    background: ${activeColor.background};
    color: ${activeColor.text};
}
`;

    }


    // ================================
    // Underline
    // ================================

    if (preset === "underline") {

        css += `

.tab {
    background: transparent;
    color: ${inactiveColor.text};
    border-bottom: 2px solid transparent;
}

.tab.active {
    background: transparent;
    color: ${activeColor.text};
    border-bottom-color: ${activeColor.text};
}
`;

    }


    return css.trim();

}


// ================================
// Resolve Tab Colour
// ================================

function resolveTabColor(
    color,
    preset
) {

    // --------------------------------
    // Transparent
    // --------------------------------

    if (color === "transparent") {

        return {

            background: "transparent",

            text: "var(--color-text)"

        };

    }


    // --------------------------------
    // Get the actual theme colour
    // --------------------------------

    const hex =
        getTabThemeColor(color);


    // --------------------------------
    // Underline
    //
    // The selected colour is the
    // font / underline colour.
    // --------------------------------

    if (preset === "underline") {

        return {

            background: "transparent",

            text:
                hex

        };

    }


    // --------------------------------
    // Normal / File
    //
    // The selected colour is the
    // background.
    // --------------------------------

    return {

        background:
            `var(--color-${color})`,

        text:
            getReadableText(hex)

    };

}


// ================================
// Get Actual Theme Colour
// ================================

function getTabThemeColor(color) {

    const input =
        [...document.querySelectorAll(".hex-input")]
            .find(
                element =>
                    element.getAttribute("aria-label") ===
                    `${labels[color]} hex value`
            );


    if (!input) {

        return "#FFFFFF";

    }


    return input.value.trim();

}

