// Generates the complete root variables
function generateRootCSS() {
    return `:root {
${generateThemeCSS()}
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  --shadow-sm: 0 2px 8px rgb(0 0 0 / .08);
  --shadow-md: 0 8px 24px rgb(0 0 0 / .10);

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;

  --font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
  `;
}

