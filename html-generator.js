// ================================
// Starter HTML Generator
// ================================

function generateStarterHTML() {

    const hasHeader =
        layoutSettings.siteLayout.header;

    const hasSidebar =
        layoutSettings.siteLayout.sidebar;

    return `<!doctype html>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Whimsy App</title>

    <link rel="stylesheet" href="base.css">

</head>

<body>


    <!-- ================================ -->
    <!-- Navigation -->
    <!-- ================================ -->

    ${generateAppNavigation()}


    <!-- ================================ -->
    <!-- Main -->
    <!-- ================================ -->

    <main class="${[
            "app-main",
            hasHeader ? "app-main-with-header" : "",
            hasSidebar ? "app-main-with-sidebar" : ""
        ].filter(Boolean).join(" ")}">

        <b>
            Hello World
        </b>

        <p>
            Start building something with WhimsyWorkshop.
        </p>

    </main>


    <!-- ================================ -->
    <!-- Whimsy -->
    <!-- ================================ -->

    <script src="base.js"></script>

</body>

</html>`;
}

// ================================
// Demo HTML Generator
// ================================

function generateDemoHTML() {

    const hasHeader =
        layoutSettings.siteLayout.header;

    const hasSidebar =
        layoutSettings.siteLayout.sidebar;

    return `<!doctype html>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title>Whimsy Demo</title>

    <link
        rel="stylesheet"
        href="base.css"
    >

</head>

<body>


    ${generateAppNavigation()}


    <!-- ================================ -->
    <!-- Demo -->
    <!-- ================================ -->

    <main class="${[
    "app-main",
    hasHeader ? "app-main-with-header" : "",
    hasSidebar ? "app-main-with-sidebar" : ""
].filter(Boolean).join(" ")}">

                <h1>
            Whimsy Demo
        </h1>

        <p>
            This page showcases the components included in WhimsyWorkshop.
        </p>


        <section>

            <h2>
                Buttons
            </h2>

            <button class="button button-primary button-medium">
                Primary
            </button>

            <button class="button button-secondary button-medium">
                Secondary
            </button>

            <button class="button button-danger button-medium">
                Danger
            </button>

        </section>
                <section>

            <h2>
                Inputs
            </h2>

            <div class="global-fields">

                <div class="global-field">

                    <label for="demo-text">
                        Text
                    </label>

                    <input
                        id="demo-text"
                        type="text"
                        placeholder="Type something..."
                    >

                </div>

                <div class="global-field">

                    <label for="demo-select">
                        Select
                    </label>

                    <select id="demo-select">

                        <option>
                            Option one
                        </option>

                        <option>
                            Option two
                        </option>

                    </select>

                </div>

            </div>

        </section>

    </main>


    <!-- ================================ -->
    <!-- Whimsy -->
    <!-- ================================ -->
    <script src="base.js"></script>

</body>

</html>`;
}

function downloadFile(content, filename, type) {

    const blob =
        new Blob(
            [content],
            { type }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);
}

function downloadHTMLFile() {

    const html =
        generateDemoHTML();

    const css =
        generateCSS();

    const js =
        generateJS();


    downloadFile(
        html,
        "index.html",
        "text/html"
    );

    downloadFile(
        css,
        "base.css",
        "text/css"
    );

    downloadFile(
        js,
        "base.js",
        "text/javascript"
    );

}

function downloadHTMLZipFile() {

    const html =
        generateStarterHTML();
    
    const demohtml =
        generateDemoHTML();

    const css =
        generateCSS();

    const js =
        generateJS();


    const zip =
        new JSZip();


    zip.file(
        "index.html",
        html
    );

    zip.file(
        "demo.html",
        demohtml
    );

    zip.file(
        "base.css",
        css
    );

    zip.file(
        "base.js",
        js
    );


    zip
        .generateAsync({
            type: "blob"
        })
        .then(
            blob => {

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                link.href = url;
                link.download = "whimsy-app.zip";

                link.click();

                URL.revokeObjectURL(url);

            }
        );

}

// ================================
// Event Binding
// ================================

document
    .querySelector("#generate-code")
    ?.addEventListener(
        "click",
        () => {

            downloadHTMLZipFile();

        }
    );