// Generates the complete CSS for the theme
function generateCSS() {
    css = `${generateRootCSS()}
    ${generateButtonCSS()}
    ${generateButtonStateCSS()}
    ${generateLinkCSS()}
    ${generateInputCSS()}
    ${generateCardCSS()}
    ${generateNoticeCSS()}
  `;
    document.querySelector("#generated-css").textContent = css;
}