// ================================
// Card Settings
// ================================

const cardTypeLabels = {
    main: "Main Card",
    sub: "Sub Card"
};


const cardSettings = {

    main: {

        headerPaddingVertical: "md",
        headerPaddingHorizontal: "md",
        header: "surface",

        contentPaddingVertical: "lg",
        contentPaddingHorizontal: "lg",

        background: "background",
        radius: "md",

        borderSides: [
            "top",
            "right",
            "bottom",
            "left"
        ],

        shadow: "sm"

    },


    sub: {

        headerPaddingVertical: "sm",
        headerPaddingHorizontal: "md",
        header: "background",

        contentPaddingVertical: "md",
        contentPaddingHorizontal: "md",

        background: "surface",
        radius: "sm",

        borderSides: [
            "top",
            "right",
            "bottom",
            "left"
        ],

        shadow: "none"

    }

};


// ================================
// Card Configuration UI
// ================================

function generateCardConfig() {

    const container =
        document.querySelector(
            '[data-config="cards"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            ${Object.entries(cardSettings)
                .map(([type, settings], index) => `

                    <details
                        class="global-section"
                        ${index === 0 ? "open" : ""}
                    >

                        <summary>
                            ${cardTypeLabels[type]}
                        </summary>

                        <!-- ========================= -->
                        <!-- Header -->
                        <!-- ========================= -->

                            <div class="global-group">
                            <h5>
                                Header
                            </h5>

                                <div class="global-fields">

                                    <!-- Padding Vertical -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-header-padding-vertical">
                                            Padding vertical
                                        </label>

                                        <select
                                            id="card-${type}-header-padding-vertical"
                                            data-card-type="${type}"
                                            data-property="headerPaddingVertical">

                                            ${generateCardSpacingOptions(
                                                settings.headerPaddingVertical
                                            )}

                                        </select>

                                    </div>


                                    <!-- Padding Horizontal -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-header-padding-horizontal">
                                            Padding horizontal
                                        </label>

                                        <select
                                            id="card-${type}-header-padding-horizontal"
                                            data-card-type="${type}"
                                            data-property="headerPaddingHorizontal">

                                            ${generateCardSpacingOptions(
                                                settings.headerPaddingHorizontal
                                            )}

                                        </select>

                                    </div>


                                    <!-- Background -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-header">
                                            Background
                                        </label>

                                        <select
                                            id="card-${type}-header"
                                            data-card-type="${type}"
                                            data-property="header">

                                            ${generateCardColorOptions(
                                                settings.header
                                            )}

                                        </select>

                                    </div>

                                </div>
                            </div>

                        <!-- ========================= -->
                        <!-- Content -->
                        <!-- ========================= -->

                            <div class="global-group">
                            <h5>
                                Content
                            </h5>

                                <div class="global-fields">

                                    <!-- Padding Vertical -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-content-padding-vertical">
                                            Padding vertical
                                        </label>

                                        <select
                                            id="card-${type}-content-padding-vertical"
                                            data-card-type="${type}"
                                            data-property="contentPaddingVertical">

                                            ${generateCardSpacingOptions(
                                                settings.contentPaddingVertical
                                            )}

                                        </select>

                                    </div>


                                    <!-- Padding Horizontal -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-content-padding-horizontal">
                                            Padding horizontal
                                        </label>

                                        <select
                                            id="card-${type}-content-padding-horizontal"
                                            data-card-type="${type}"
                                            data-property="contentPaddingHorizontal">

                                            ${generateCardSpacingOptions(
                                                settings.contentPaddingHorizontal
                                            )}

                                        </select>

                                    </div>

                                </div>

                            </div>
                        <!-- ========================= -->
                        <!-- Card -->
                        <!-- ========================= -->

                            <div class="global-group">
                            <h5>
                                Card
                            </h5>


                                <div class="global-fields">

                                    <!-- Background -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-background">
                                            Background
                                        </label>

                                        <select
                                            id="card-${type}-background"
                                            data-card-type="${type}"
                                            data-property="background">

                                            ${generateCardColorOptions(
                                                settings.background
                                            )}

                                        </select>

                                    </div>


                                    <!-- Radius -->

                                    <div class="global-field">

                                        <label
                                            for="card-${type}-radius">
                                            Radius
                                        </label>

                                        <select
                                            id="card-${type}-radius"
                                            data-card-type="${type}"
                                            data-property="radius">

                                            ${generateCardRadiusOptions(
                                                settings.radius
                                            )}

                                        </select>

                                    </div>


                                    <!-- Border Sides -->

                                    <div class="global-field">

                                        <label>
                                            Border sides
                                        </label>

                                        <div class="global-checkboxes">

                                            ${generateCardBorderSideOptions(
                                                type,
                                                settings.borderSides
                                            )}

                                        </div>

                                    </div>


                                    <!-- Shadow -->
                                        <div class="global-field">

                                            <label
                                                for="card-${type}-shadow">
                                                Shadow
                                            </label>

                                            <select
                                                id="card-${type}-shadow"
                                                data-card-type="${type}"
                                                data-property="shadow">

                                                ${generateCardShadowOptions(
                                                    settings.shadow
                                                )}

                                            </select>

                                        </div>
                                    </div>
                                </div>

                    </details>

                `)
                .join("")}


            <button
                id="apply-cards"
                class="button button-primary button-medium">
                Apply Cards
            </button>

        </section>

    `;


    bindCardEvents();

}


// ================================
// Spacing Options
// ================================

function generateCardSpacingOptions(
    selected
) {

    return Object.keys(globalSettings.spacing)
        .map(size => `

            <option
                value="${size}"
                ${size === selected
                    ? "selected"
                    : ""}>
                ${sizeLabels[size] || size}
            </option>

        `)
        .join("");

}


// ================================
// Colour Options
// ================================

function generateCardColorOptions(
    selected
) {

    const options = [

        ["background", "Background"],
        ["surface", "Surface"],
        ["primary", "Primary"],
        ["secondary", "Secondary"],
        ["accent", "Accent"],
        ["danger", "Danger"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["text", "Text"],
        ["subtext", "Subtext"],
        ["border", "Border"]

    ];


    return options
        .map(([value, label]) => `

            <option
                value="${value}"
                ${value === selected
                    ? "selected"
                    : ""}>
                ${label}
            </option>

        `)
        .join("");

}


// ================================
// Radius Options
// ================================

function generateCardRadiusOptions(
    selected
) {

    return Object.keys(globalSettings.radius)
        .map(size => `

            <option
                value="${size}"
                ${size === selected
                    ? "selected"
                    : ""}>
                ${sizeLabels[size] || size}
            </option>

        `)
        .join("");

}


// ================================
// Border Side Options
// ================================

function generateCardBorderSideOptions(
    type,
    selected
) {

    const sides = [

        ["top", "Top"],
        ["right", "Right"],
        ["bottom", "Bottom"],
        ["left", "Left"]

    ];


    return sides
        .map(([value, label]) => `

            <label
                class="global-checkbox">

                <input
                    type="checkbox"
                    data-card-type="${type}"
                    data-border-side="${value}"
                    ${selected.includes(value)
                        ? "checked"
                        : ""}>

                ${label}

            </label>

        `)
        .join("");

}


// ================================
// Shadow Options
// ================================

function generateCardShadowOptions(
    selected
) {

    const options = [

        ["none", "None"],
        ["sm", "Small"],
        ["md", "Medium"],
        ["lg", "Large"]

    ];


    return options
        .map(([value, label]) => `

            <option
                value="${value}"
                ${value === selected
                    ? "selected"
                    : ""}>
                ${label}
            </option>

        `)
        .join("");

}


// ================================
// Event Binding
// ================================

function bindCardEvents() {

    const container =
        document.querySelector(
            '[data-config="cards"]'
        );


    if (!container) {
        return;
    }


    container.addEventListener(
        "change",
        event => {

            const target =
                event.target;


            const type =
                target.dataset.cardType;


            if (!type) {
                return;
            }


            // Border side

            if (
                target.matches(
                    "[data-border-side]"
                )
            ) {

                const side =
                    target.dataset.borderSide;


                const sides =
                    cardSettings[type].borderSides;


                if (target.checked) {

                    if (
                        !sides.includes(side)
                    ) {
                        sides.push(side);
                    }

                } else {

                    cardSettings[type].borderSides =
                        sides.filter(
                            value =>
                                value !== side
                        );

                }


                return;

            }


            // Normal settings

            const property =
                target.dataset.property;


            if (property) {

                cardSettings[type][property] =
                    target.value;

            }

        }
    );


    // Apply Cards

    document
        .querySelector(
            "#apply-cards"
        )
        ?.addEventListener(
            "click",
            () => {

                applyPreview();

            }
        );

}


// ================================
// Initialise
// ================================

function initCardBuilder() {

    generateCardConfig();

}

initCardBuilder();
