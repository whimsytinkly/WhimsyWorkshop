// Formats CSS
function formatCSS(css) {

    css = css
        .trim()

        // Normalize line endings
        .replace(/\r\n/g, "\n")

        // Remove tabs
        .replace(/\t+/g, " ")

        // Collapse repeated spaces
        .replace(/ {2,}/g, " ")

        // Put opening braces on their own structure
        .replace(/\s*{\s*/g, " {\n")

        // Put closing braces on their own structure
        .replace(/\s*}\s*/g, "\n}\n")

        // Put comments on a new line
        .replace(/\s*\/\*/g, "\n/*")

        // Remove excessive blank lines
        .replace(/\n{2,}/g, "\n");


    const lines =
        css.split("\n");


    let depth = 0;


    const formatted =
        lines
            .map(line => {

                const trimmed =
                    line.trim();


                if (!trimmed) {
                    return "";
                }


                // Closing brace
                if (
                    trimmed === "}"
                ) {

                    depth =
                        Math.max(
                            0,
                            depth - 1
                        );

                    return (
                        "  ".repeat(depth) +
                        "}"
                    );

                }


                // Opening brace
                if (
                    trimmed.endsWith("{")
                ) {

                    const result =
                        "  ".repeat(depth) +
                        trimmed;

                    depth++;

                    return result;

                }


                // Inside a block
                return (
                    "  ".repeat(depth) +
                    trimmed
                );

            })
            .join("\n");


    return formatted

        // Join wrapped CSS property values
        .replace(
            /(:\s*[^;\n]+)\n\s+(var\(--[^;]+;)/g,
            "$1 $2"
        )

        // property:\n value → property: value
        .replace(
            /:\s*\n\s*/g,
            ": "
        )

        // Remove excessive blank lines
        .replace(
            /\n{2,}/g,
            "\n"
        )

        // Add additional line after closing brace
        .replace(/\s*}\s*/g, "\n}\n\n")

        // Add additional line above comments
        .replace(/\s*\/\*/g, "\n\n/*")

        .trim();
}


// Generates the complete root variables
function generateRootCSS() {

    return `
:root {
    ${generateThemeCSS()}
    ${generateGlobalCSS()}
    ${generateButtonRootCSS()}

}
`;

}

function generateBaseCSS() {
    return `
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-base);
    line-height: var(--line-height-base);
}

h1 {
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-h1);
    line-height: var(--line-height-h1);
}

h2 {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-h2);
    line-height: var(--line-height-h2);
}

h3 {
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-h3);
    line-height: var(--line-height-h3);
}

h4 {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-h4);
    line-height: var(--line-height-h4);
}

h5 {
    font-size: var(--font-size-h5);
    font-weight: var(--font-weight-h5);
    line-height: var(--line-height-h5);
}

p {
    margin-top: 0;
}

a {
    color: var(--color-accent);
}
`;
}


// Generates the complete CSS for the theme
function generateCSS() {
    css = `${generateRootCSS()}
    ${generateBaseCSS()}
    ${generateButtonCSS()}
    ${generateLinkCSS()}
    ${generateInputCSS()}
    ${generateCardCSS()}
    ${generateTabsCSS()}
    ${generateTablesCSS()}
    ${generateNoticeCSS()}
    ${generateLayoutCSS()}
  `;
    const formattedCSS =
        formatCSS(css);

    document
        .querySelector("#generated-css")
        .textContent = formattedCSS;

    return formattedCSS;
}