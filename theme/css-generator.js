// CSS Generator

// Generates CSS based on the current theme settings
function generateThemeCSS() {
    let css = ``;

    for (const key of Object.keys(themeSettings)) {
        const input = document.querySelector(
            `[aria-label="${labels[key]} hex value"]`
        );

        const value = input ? input.value.trim() : themeSettings[key];

        css += `  --color-${key}: ${value};
`;
    }

    css += `  --color-focus: var(--color-primary);
`;

    for (const key of ["primary", "secondary", "danger"]) {
        const input = document.querySelector(
            `[aria-label="${labels[key]} hex value"]`
        );

        const value = input.value.trim();
        const textColor = getReadableText(value);

        css += `  --color-${key}-text: ${textColor};
`;
    }
    css += `
        /* Shadows */
        --shadow-sm: 0 2px 8px rgb(0 0 0 / .08);
        --shadow-md: 0 8px 24px rgb(0 0 0 / .10);
        --shadow-lg: 0 16px 48px rgb(0 0 0 / .12);
        `;

    return css;
}



// Generates CSS for links
function generateLinkCSS() {
    return `
a {
  color: var(--color-accent);
  text-decoration: underline;
}
`;
}
