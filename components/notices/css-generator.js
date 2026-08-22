function generateNoticeBorder(
    sides,
    color
) {

    const borderTop =
        sides.includes("top")
            ? `1px solid ${color}`
            : "none";


    const borderRight =
        sides.includes("right")
            ? `1px solid ${color}`
            : "none";


    const borderBottom =
        sides.includes("bottom")
            ? `1px solid ${color}`
            : "none";


    const borderLeft =
        sides.includes("left")
            ? `1px solid ${color}`
            : "none";


    return `
    border-top: ${borderTop};
    border-right: ${borderRight};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    `;

}

// ================================
// Notice CSS Generator
// ================================

function generateNoticeCSS() {

    const settings =
        noticeSettings;


    // ================================
    // Radius
    // ================================

    const radius =
        `var(--radius-${settings.radius})`;


    // ================================
    // Padding
    // ================================

    const paddingVertical =
        `var(--space-${settings.paddingVertical})`;


    const paddingHorizontal =
        `var(--space-${settings.paddingHorizontal})`;


    // ================================
    // Notice Colours
    // ================================

    const infoColor =
        "surface";


    const successColor =
        "success";


    const warningColor =
        "warning";


    const errorColor =
        "danger";


    // ================================
    // Notice Backgrounds
    // ================================

    const infoHex =
        getNoticeThemeColor(
            infoColor
        );


    const successHex =
        getNoticeThemeColor(
            successColor
        );


    const warningHex =
        getNoticeThemeColor(
            warningColor
        );


    const errorHex =
        getNoticeThemeColor(
            errorColor
        );


    // ================================
    // Notice Text Colours
    // ================================

    const infoText =
        getNoticeReadableText(
            infoHex,
            settings.opacity
        );


    const successText =
        getNoticeReadableText(
            successHex,
            settings.opacity
        );


    const warningText =
        getNoticeReadableText(
            warningHex,
            settings.opacity
        );


    const errorText =
        getNoticeReadableText(
            errorHex,
            settings.opacity
        );


    // ================================
    // Toast Colour
    // ================================

    const toastColor =
        settings.toast.defaultColor;


    const toastHex =
        getNoticeThemeColor(
            toastColor
        );


    const toastTextColor =
        getNoticeReadableText(
            toastHex,
            settings.toast.opacity
        );


    // ================================
    // Base Notice
    // ================================

    let css = `

.notice {
    padding: ${paddingVertical} ${paddingHorizontal};
    border-radius: ${radius};
}
`;


    // ================================
    // Semantic Notices
    // ================================

    css += `

.notice-info {
    background: ${hexToNoticeRgba(
        infoHex,
        settings.opacity
    )};
    color: ${infoText};
    ${generateNoticeBorder(
        settings.borderSides,
        infoHex
    )};
}

.notice-success {
    background: ${hexToNoticeRgba(
        successHex,
        settings.opacity
    )};
    color: ${successText};
    ${generateNoticeBorder(
        settings.borderSides,
        successHex
    )};
}

.notice-warning {
    background: ${hexToNoticeRgba(
        warningHex,
        settings.opacity
    )};
    color: ${warningText};
    ${generateNoticeBorder(
        settings.borderSides,
        warningHex
    )};
}

.notice-error {
    background: ${hexToNoticeRgba(
        errorHex,
        settings.opacity
    )};
    color: ${errorText};
    ${generateNoticeBorder(
        settings.borderSides,
        errorHex
    )};
}
`;


    // ================================
    // Toast
    // ================================

    css += `

.toast {
    position: fixed;
    z-index: 1000;
    padding: ${paddingVertical} ${paddingHorizontal};
    background: ${hexToNoticeRgba(
        toastHex,
        settings.toast.opacity
    )};
    color: ${toastTextColor};
    ${generateNoticeBorder(
        settings.borderSides,
        "var(--color-border)"
    )}
}
`;


    // ================================
    // Toast Position
    // ================================

    css += generateToastPositionCSS(
        settings.toast.position
    );


    return css.trim();

}


// ================================
// Notice Text Colour
// ================================

function getNoticeReadableText(
    hex,
    opacity
) {

    const backgroundHex =
        getNoticeThemeColor(
            "background"
        );


    const blendedHex =
        blendNoticeColours(
            hex,
            backgroundHex,
            opacity
        );


    return getReadableText(
        blendedHex
    );

}


// ================================
// Hex → RGBA
// ================================

function hexToNoticeRgba(
    hex,
    opacity
) {

    const clean =
        hex.replace(
            "#",
            ""
        );


    const r =
        parseInt(
            clean.substring(0, 2),
            16
        );


    const g =
        parseInt(
            clean.substring(2, 4),
            16
        );


    const b =
        parseInt(
            clean.substring(4, 6),
            16
        );


    return `rgba(${r}, ${g}, ${b}, ${opacity})`;

}


// ================================
// Blend Colours
// ================================

function blendNoticeColours(
    foreground,
    background,
    opacity
) {

    const fg =
        foreground.replace(
            "#",
            ""
        );


    const bg =
        background.replace(
            "#",
            ""
        );


    const fr =
        parseInt(
            fg.substring(0, 2),
            16
        );


    const fgGreen =
        parseInt(
            fg.substring(2, 4),
            16
        );


    const fb =
        parseInt(
            fg.substring(4, 6),
            16
        );


    const br =
        parseInt(
            bg.substring(0, 2),
            16
        );


    const bgGreen =
        parseInt(
            bg.substring(2, 4),
            16
        );


    const bb =
        parseInt(
            bg.substring(4, 6),
            16
        );


    const r =
        Math.round(
            fr * opacity +
            br * (1 - opacity)
        );


    const g =
        Math.round(
            fgGreen * opacity +
            bgGreen * (1 - opacity)
        );


    const b =
        Math.round(
            fb * opacity +
            bb * (1 - opacity)
        );


    return `#${[
        r,
        g,
        b
    ]
        .map(
            value =>
                value
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("")}`;

}


// ================================
// Get Actual Theme Colour
// ================================

function getNoticeThemeColor(
    color
) {

    const input =
        [...document.querySelectorAll(".hex-input")]
            .find(
                element =>
                    element.getAttribute(
                        "aria-label"
                    ) ===
                    `${labels[color]} hex value`
            );


    if (!input) {

        return "#FFFFFF";

    }


    return input.value.trim();

}


// ================================
// Toast Position
// ================================

function generateToastPositionCSS(
    position
) {

    const positions = {

        "top-left": `
.toast {
    top: var(--space-md);
    left: var(--space-md);
}
`,

        "top-right": `
.toast {
    top: var(--space-md);
    right: var(--space-md);
}
`,

        "bottom-left": `
.toast {
    bottom: var(--space-md);
    left: var(--space-md);
}
`,

        "bottom-right": `
.toast {
    bottom: var(--space-md);
    right: var(--space-md);
}
`

    };


    return positions[position]
        || positions["bottom-right"];

}
