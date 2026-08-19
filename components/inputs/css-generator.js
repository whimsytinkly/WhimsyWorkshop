// ================================
// Input CSS
// ================================

// Generates shared input CSS
function generateInputBaseCSS() {

    return `
.input,
.textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  background: var(--color-surface);
}
`;

}


// ================================
// Input Size CSS
// ================================

// Generates CSS for input sizes
function generateInputSizeCSS() {

    return Object.entries(inputSettings)
        .map(([size, settings]) => {

            const typography =
                getInputTypographyCSS(
                    settings
                );


            return `
.input-${size},
.textarea-${size} {

  padding:
    var(--space-${settings.paddingVertical})
    var(--space-${settings.paddingHorizontal});

  ${typography}

}
`;

        })
        .join("\n");

}


// ================================
// Input Typography CSS
// ================================

function getInputTypographyCSS(settings) {

    if (
        settings.typography ===
        "custom"
    ) {

        return `
  font-size: ${settings.custom.size};
  font-weight: ${settings.weight};
  line-height: ${settings.custom.lineHeight};
`;

    }


    return `
  font-size: var(--font-size-${settings.typography});
  font-weight: ${settings.weight};
  line-height: var(--line-height-${settings.typography});
`;

}


// ================================
// Main Input CSS
// ================================

function generateInputCSS() {

    return `
${generateInputBaseCSS()}

${generateInputSizeCSS()}
`;

}