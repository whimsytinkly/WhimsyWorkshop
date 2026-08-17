// ================================
// Generate Button CSS
// ================================

function generateButtonCSS() {

    let css = "";


    // ================================
    // Button Typography Variables
    // ================================

    for (
        const [size, settings]
        of Object.entries(buttonSettings)
    ) {

        let fontSize;
        let fontWeight;
        let lineHeight;


        // ================================
        // Base Typography
        // ================================

        if (
            settings.typography ===
            "base"
        ) {

            fontSize =
                `var(--font-size-base)`;

            lineHeight =
                `var(--line-height-base)`;

        }


        // ================================
        // Subtext Typography
        // ================================

        if (
            settings.typography ===
            "subtext"
        ) {

            fontSize =
                `var(--font-size-subtext)`;

            lineHeight =
                `var(--line-height-subtext)`;

        }


        // ================================
        // Custom Typography
        // ================================

        if (
            settings.typography ===
            "custom"
        ) {

            fontSize =
                `var(--button-${size}-size)`;

            lineHeight =
                `var(--button-${size}-line-height)`;

        }


        // ================================
        // Weight Variable
        // ================================

        fontWeight =
            `var(--button-${size}-weight)`;


        // ================================
        // Generate Variables
        // ================================

        css += `

    --button-${size}-weight:
        ${settings.typography === "custom"
            ? settings.custom.weight
            : settings.weight};
`;


        if (
            settings.typography ===
            "custom"
        ) {

            css += `

    --button-${size}-size:
        ${settings.custom.size};

    --button-${size}-line-height:
        ${settings.custom.lineHeight};
`;

        }


        // ================================
        // Store Generated Typography
        // ================================

        buttonSettings[size]._generated = {
            fontSize,
            fontWeight,
            lineHeight
        };

    }


    // ================================
    // Base Button
    // ================================

    css += `

.button {
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
}

    `;


    // ================================
    // Button Sizes
    // ================================

    for (
        const [size, settings]
        of Object.entries(buttonSettings)
    ) {

        const typography =
            settings._generated;


        css += `

.button-${size} {

    padding:
        var(--space-${settings.paddingVertical})
        var(--space-${settings.paddingHorizontal});

    font-size:
        ${typography.fontSize};

    font-weight:
        ${typography.fontWeight};

    line-height:
        ${typography.lineHeight};

}

        `;

    }


    // ================================
    // Button Variants
    // ================================

    css += `

.button-primary {
    color: var(--color-primary-text);
    background: var(--color-primary);
}


.button-secondary {
    color: var(--color-secondary-text);
    background: var(--color-secondary);
}


.button-danger {
    color: var(--color-danger-text);
    background: var(--color-danger);
}

    `;


    // ================================
    // Button States
    // ================================

    css += generateButtonStateCSS();


    return css;

}


// Generates CSS for button states
function generateButtonStateCSS() {
    return `
.button {
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.button:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 12px color-mix(
    in srgb,
    var(--color-accent) 85%,
    transparent
  );
}

.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.button:active {
  transform: translateY(1px);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;
}
