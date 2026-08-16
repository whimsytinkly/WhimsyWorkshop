// Global configuration


// ================================
// Font Dropdown
// ================================

function generateFontOptions() {

    return `
        <option value="${fontList.system.value}">
            ${fontList.system.label}
        </option>


        <optgroup label="Sans-serif">

            ${fontList.sansSerif
            .map(font => `
                    <option value="${font.value}">
                        ${font.label}
                    </option>
                `)
            .join("")}

        </optgroup>


        <optgroup label="Serif">

            ${fontList.serif
            .map(font => `
                    <option value="${font.value}">
                        ${font.label}
                    </option>
                `)
            .join("")}

        </optgroup>


        <optgroup label="Monospace">

            ${fontList.monospace
            .map(font => `
                    <option value="${font.value}">
                        ${font.label}
                    </option>
                `)
            .join("")}

        </optgroup>
    `;
}


// ================================
// Global Configuration UI
// ================================

function generateGlobalConfig() {

    const container = document.querySelector(
        '[data-config="global"]'
    );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            ${globalSections
            .map(section =>
                generateGlobalSection(section)
            )
            .join("")}

            <button
                id="apply-global"
                class="button button-primary">
                Apply Global
            </button>
        </section>

    `;


    bindGlobalEvents();
}


// ================================
// Global Section Generator
// ================================

function generateGlobalSection(section) {

    if (section.type === "typography") {

        return `

            <details
                class="global-section"
                open
            >

                <summary>
                    ${section.label}
                </summary>


                ${generateTypographyConfig()}

            </details>

        `;
    }


    if (section.type === "fields") {

        return `

            <details class="global-section">

                <summary>
                    ${section.label}
                </summary>


                <div class="global-group">

                    ${generateGlobalFields(section.id)}

                </div>

            </details>

        `;
    }


    return "";
}


// ================================
// Generic Global Fields
// ================================

function generateGlobalFields(name) {

    const settings = globalSettings[name];

    if (!settings) {
        return "";
    }


    return `
        <div class="global-fields">

            ${Object.entries(settings)
            .map(([key, value]) => `

                    <div class="global-field">

                        <label for="${name}-${key}">
                            ${sizeLabels[key] || key}
                        </label>


                        <input
                            id="${name}-${key}"
                            type="text"
                            data-global="${name}"
                            data-property="${key}"
                            value="${value}"
                        >

                    </div>

                `)
            .join("")}

        </div>
    `;
}


// ================================
// Typography Configuration
// ================================

function generateTypographyConfig() {

    return `

        <!-- Font -->

        <div class="global-group">

            <h3>
                Font
            </h3>


            <div class="global-field">

                <label for="global-font-family">
                    Font family
                </label>


                <select id="global-font-family">

                    ${generateFontOptions()}

                </select>

            </div>

        </div>


        <!-- Base -->

        <div class="global-group">

            <h3>
                Base
            </h3>


            ${generateTypographyFields(
        "base",
        globalSettings.typography.base
    )}

        </div>


        <!-- Subtext -->

        <div class="global-group">

            <h3>
                Subtext
            </h3>


            ${generateTypographyFields(
        "subtext",
        globalSettings.typography.subtext
    )}

        </div>


        <!-- Headings -->

        <div class="global-group">

            <h3>
                Headings
            </h3>


            ${Object.entries(
        globalSettings.typography.headings
    )
            .map(([heading, settings]) => `

                    <details class="typography-heading">

                        <summary>
                            ${heading.toUpperCase()}
                        </summary>


                        ${generateTypographyFields(
                heading,
                settings
            )}

                    </details>

                `)
            .join("")}

        </div>

    `;
}


// ================================
// Typography Fields
// ================================

function generateTypographyFields(
    name,
    settings
) {

    return `

        <div class="global-fields">


            <div class="global-field">

                <label for="typography-${name}-size">
                    Size
                </label>


                <input
                    id="typography-${name}-size"
                    type="text"
                    data-typography="${name}"
                    data-property="size"
                    value="${settings.size}"
                >

            </div>


            <div class="global-field">

                <label for="typography-${name}-weight">
                    Weight
                </label>


                <input
                    id="typography-${name}-weight"
                    type="number"
                    min="100"
                    max="900"
                    step="100"
                    data-typography="${name}"
                    data-property="weight"
                    value="${settings.weight}"
                >

            </div>


            <div class="global-field">

                <label for="typography-${name}-line-height">
                    Line height
                </label>


                <input
                    id="typography-${name}-line-height"
                    type="text"
                    data-typography="${name}"
                    data-property="lineHeight"
                    value="${settings.lineHeight}"
                >

            </div>


        </div>

    `;
}


// ================================
// Event Binding
// ================================

function bindGlobalEvents() {

    // Font

    const fontFamily = document.querySelector(
        "#global-font-family"
    );


    fontFamily?.addEventListener(
        "change",
        event => {

            globalSettings.typography.fontFamily =
                event.target.value;

        }
    );


    // Typography

    document
        .querySelectorAll("[data-typography]")
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const name =
                        event.target.dataset.typography;

                    const property =
                        event.target.dataset.property;


                    updateTypographySetting(
                        name,
                        property,
                        event.target.value
                    );

                }
            );

        });


    // Generic Global Fields

    document
        .querySelectorAll("[data-global]")
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const section =
                        event.target.dataset.global;

                    const property =
                        event.target.dataset.property;


                    if (
                        globalSettings[section] &&
                        property in globalSettings[section]
                    ) {

                        globalSettings[section][property] =
                            event.target.value;

                    }

                }
            );

        });

    const applyGlobal =
        document.querySelector(
            "#apply-global"
        );


    applyGlobal?.addEventListener(
        "click",
        () => {

            applyGlobalConfig();

        }
    );

}


// ================================
// Update Typography
// ================================

function updateTypographySetting(
    name,
    property,
    value
) {

    if (name === "base") {

        globalSettings.typography.base[property] =
            value;

        return;
    }


    if (name === "subtext") {

        globalSettings.typography.subtext[property] =
            value;

        return;
    }


    if (
        globalSettings.typography.headings[name]
    ) {

        globalSettings.typography.headings[name][property] =
            value;

    }

}

// ================================
// Generate Preview CSS
// ================================

// ================================
// Generate Global CSS
// ================================

function generateGlobalCSS() {

    return `

        /* Typography */

        --font-family:
            ${globalSettings.typography.fontFamily};


        --font-size-base:
            ${globalSettings.typography.base.size};

        --font-weight-base:
            ${globalSettings.typography.base.weight};

        --line-height-base:
            ${globalSettings.typography.base.lineHeight};


        --font-size-subtext:
            ${globalSettings.typography.subtext.size};

        --font-weight-subtext:
            ${globalSettings.typography.subtext.weight};

        --line-height-subtext:
            ${globalSettings.typography.subtext.lineHeight};


        --font-size-h1:
            ${globalSettings.typography.headings.h1.size};

        --font-weight-h1:
            ${globalSettings.typography.headings.h1.weight};

        --line-height-h1:
            ${globalSettings.typography.headings.h1.lineHeight};


        --font-size-h2:
            ${globalSettings.typography.headings.h2.size};

        --font-weight-h2:
            ${globalSettings.typography.headings.h2.weight};

        --line-height-h2:
            ${globalSettings.typography.headings.h2.lineHeight};


        --font-size-h3:
            ${globalSettings.typography.headings.h3.size};

        --font-weight-h3:
            ${globalSettings.typography.headings.h3.weight};

        --line-height-h3:
            ${globalSettings.typography.headings.h3.lineHeight};


        --font-size-h4:
            ${globalSettings.typography.headings.h4.size};

        --font-weight-h4:
            ${globalSettings.typography.headings.h4.weight};

        --line-height-h4:
            ${globalSettings.typography.headings.h4.lineHeight};


        --font-size-h5:
            ${globalSettings.typography.headings.h5.size};

        --font-weight-h5:
            ${globalSettings.typography.headings.h5.weight};

        --line-height-h5:
            ${globalSettings.typography.headings.h5.lineHeight};


        /* Radius */

        --radius-sm:
            ${globalSettings.radius.sm};

        --radius-md:
            ${globalSettings.radius.md};

        --radius-lg:
            ${globalSettings.radius.lg};


        /* Spacing */

        --space-xs:
            ${globalSettings.spacing.xs};

        --space-sm:
            ${globalSettings.spacing.sm};

        --space-md:
            ${globalSettings.spacing.md};

        --space-lg:
            ${globalSettings.spacing.lg};

        --space-xl:
            ${globalSettings.spacing.xl};

        --space-xxl:
            ${globalSettings.spacing.xxl};

    `;
}

function applyGlobalConfig() {
    applyPreview();
}

// ================================
// Initialise
// ================================

function initGlobalBuilder() {

    generateGlobalConfig();

}

initGlobalBuilder();