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


// Generates CSS for input fields
function generateInputCSS() {
    return `
.input {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  background: var(--color-surface);
}
`;
}

// Generates CSS for Cards
function generateCardCSS() {
    return `
.card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.card-header,
.card-content {
  padding: var(--space-lg);
}

.card-header {
  border-bottom: 1px solid var(--color-border);
}

.card-header h3,
.card-header p {
  margin: 0;
}

.card-header p {
  margin-top: var(--space-xs);
}

.card-content {
  display: grid;
  gap: var(--space-sm);
}
`;
}

// Generates CSS for Notices
function generateNoticeCSS() {
    return `
.notice {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-md);
  border: 1px solid color-mix(in srgb, var(--color-warning) 45%, var(--color-border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-warning) 12%, var(--color-surface));
}
`;
}

