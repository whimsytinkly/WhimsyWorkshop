// Preview


// ================================
// Generate Preview CSS
// ================================

function generatePreview() {

    const globalCSS = generateGlobalCSS();

    const themeCSS = generateThemeCSS();

    const buttonCSS = generateButtonCSS();


    return `
        ${globalCSS}
        ${themeCSS}
        ${buttonCSS}
    `;
}


// ================================
// Apply Preview
// ================================

function applyPreview() {

    const css =
        generatePreview();


    let style =
        document.querySelector(
            "#generated-theme"
        );


    if (!style) {

        style =
            document.createElement("style");

        style.id =
            "generated-theme";

        document.head.appendChild(style);

    }


    style.textContent = `
        :root {
            ${css}
        }
    `;

    generateCSS();

}

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === "Shift"
        ) {

            event.preventDefault();

            applyPreview();

        }

    }
);


applyPreview();