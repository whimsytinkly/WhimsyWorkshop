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

}
`;

}


// Generates the complete CSS for the theme
function generateCSS() {
    css = `${generateRootCSS()}
    ${generateButtonCSS()}
    ${generateLinkCSS()}
    ${generateInputCSS()}
    ${generateCardCSS()}
    ${generateNoticeCSS()}
  `;
    document.querySelector("#generated-css").textContent = formatCSS(css);
}