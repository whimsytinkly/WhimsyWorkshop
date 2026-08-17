// ================================
// Button Settings
// ================================

const buttonSizeLabels = {
    small: "Small",
    medium: "Medium",
    large: "Large"
};


const buttonSettings = {

    small: {
        paddingVertical: "xs",
        paddingHorizontal: "sm",
        typography: "base",
        weight: "600",

        custom: {
            size: "14px",
            weight: "600",
            lineHeight: "1.2"
        }
    },

    medium: {
        paddingVertical: "sm",
        paddingHorizontal: "md",
        typography: "base",
        weight: "600",

        custom: {
            size: "16px",
            weight: "600",
            lineHeight: "1.5"
        }
    },

    large: {
        paddingVertical: "md",
        paddingHorizontal: "lg",
        typography: "base",
        weight: "600",

        custom: {
            size: "18px",
            weight: "600",
            lineHeight: "1.4"
        }
    }

};


// ================================
// Button Configuration UI
// ================================

function generateButtonConfig() {

    const container =
        document.querySelector(
            '[data-config="buttons"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            <div class="global-fields">

                ${Object.entries(buttonSettings)
                    .map(([size, settings]) => `

                        <div class="global-group">

                            <h5>
                                ${buttonSizeLabels[size]}
                            </h5>


                            <div class="global-fields">

                                <!-- Padding Vertical -->

                                <div class="global-field">

                                    <label
                                        for="button-${size}-padding-vertical">
                                        Padding vertical
                                    </label>

                                    <select
                                        id="button-${size}-padding-vertical"
                                        data-button-size="${size}"
                                        data-property="paddingVertical">

                                        ${generateButtonSpacingOptions(
                                            settings.paddingVertical
                                        )}

                                    </select>

                                </div>


                                <!-- Padding Horizontal -->

                                <div class="global-field">

                                    <label
                                        for="button-${size}-padding-horizontal">
                                        Padding horizontal
                                    </label>

                                    <select
                                        id="button-${size}-padding-horizontal"
                                        data-button-size="${size}"
                                        data-property="paddingHorizontal">

                                        ${generateButtonSpacingOptions(
                                            settings.paddingHorizontal
                                        )}

                                    </select>

                                </div>


                                <!-- Typography -->

                                <div
                                    id="button-${size}-typography-config"
                                    class="global-fields">

                                    ${generateButtonTypographyConfig(
                                        size,
                                        settings
                                    )}

                                </div>

                            </div>

                        </div>

                    `)
                    .join("")}

            </div>


            <button
                id="apply-buttons"
                class="button button-primary button-medium">
                Apply Buttons
            </button>

        </section>

    `;


    bindButtonEvents();

}


// ================================
// Button Typography Configuration
// ================================

function generateButtonTypographyConfig(
    size,
    settings
) {

    const isCustom =
        settings.typography === "custom";


    const selectedWeight =
        isCustom
            ? settings.custom.weight
            : settings.weight;


    return `

        <div class="global-field">

            <label
                for="button-${size}-typography">
                Typography
            </label>

            <select
                id="button-${size}-typography"
                data-button-size="${size}"
                data-property="typography">

                ${generateButtonTypographyOptions(
                    settings.typography
                )}

            </select>

        </div>


        ${generateButtonCustomTypographyFields(
            size,
            settings
        )}


        <div class="global-field">

            <label
                for="button-${size}-weight">
                Weight
            </label>

            <select
                id="button-${size}-weight"
                data-button-size="${size}"
                data-property="weight">

                ${generateButtonWeightOptions(
                    selectedWeight
                )}

            </select>

        </div>

    `;

}


// ================================
// Custom Typography Fields
// ================================

function generateButtonCustomTypographyFields(
    size,
    settings
) {

    if (
        settings.typography !==
        "custom"
    ) {
        return "";
    }


    return `

        <div class="global-field">

            <label
                for="button-${size}-custom-size">
                Size
            </label>

            <input
                id="button-${size}-custom-size"
                type="text"
                data-button-size="${size}"
                data-custom-property="size"
                value="${settings.custom.size}"
            >

        </div>


        <div class="global-field">

            <label
                for="button-${size}-custom-line-height">
                Line height
            </label>

            <input
                id="button-${size}-custom-line-height"
                type="text"
                data-button-size="${size}"
                data-custom-property="lineHeight"
                value="${settings.custom.lineHeight}"
            >

        </div>

    `;

}


// ================================
// Spacing Options
// ================================

function generateButtonSpacingOptions(
    selected
) {

    return Object.keys(
        globalSettings.spacing
    )
        .map(size => `

            <option
                value="${size}"
                ${size === selected ? "selected" : ""}>
                ${sizeLabels[size] || size}
            </option>

        `)
        .join("");

}


// ================================
// Typography Options
// ================================

function generateButtonTypographyOptions(
    selected
) {

    const options = [
        ["base", "Base"],
        ["subtext", "Subtext"],
        ["custom", "Custom"]
    ];


    return options
        .map(([value, label]) => `

            <option
                value="${value}"
                ${value === selected ? "selected" : ""}>
                ${label}
            </option>

        `)
        .join("");

}


// ================================
// Weight Options
// ================================

function generateButtonWeightOptions(
    selected
) {

    const weights = [
        "400",
        "500",
        "600",
        "700",
        "800"
    ];


    return weights
        .map(weight => `

            <option
                value="${weight}"
                ${weight === selected ? "selected" : ""}>
                ${weight}
            </option>

        `)
        .join("");

}


// ================================
// Event Binding
// ================================
function bindButtonEvents() {

    const container =
        document.querySelector(
            '[data-config="buttons"]'
        );


    if (!container) {
        return;
    }


    // ================================
    // Padding + Weight
    // ================================

    container.addEventListener(
        "change",
        event => {

            const control =
                event.target;


            if (
                !control.matches(
                    "[data-button-size][data-property]"
                )
            ) {
                return;
            }


            const size =
                control.dataset.buttonSize;

            const property =
                control.dataset.property;


            // Typography is handled separately below

            if (
                property ===
                "typography"
            ) {
                return;
            }


            // Weight

            if (
                property ===
                "weight"
            ) {

                if (
                    buttonSettings[size].typography ===
                    "custom"
                ) {

                    buttonSettings[size]
                        .custom.weight =
                        control.value;

                } else {

                    buttonSettings[size]
                        .weight =
                        control.value;

                }

                return;
            }


            // Padding

            buttonSettings[size][property] =
                control.value;

        }
    );


    // ================================
    // Typography
    // ================================

    container.addEventListener(
        "change",
        event => {

            const control =
                event.target;


            if (
                !control.matches(
                    '[data-button-size][data-property="typography"]'
                )
            ) {
                return;
            }


            const size =
                control.dataset.buttonSize;


            buttonSettings[size].typography =
                control.value;


            const config =
                document.querySelector(
                    `#button-${size}-typography-config`
                );


            if (!config) {
                return;
            }


            config.innerHTML =
                generateButtonTypographyConfig(
                    size,
                    buttonSettings[size]
                );

        }
    );


    // ================================
    // Custom Typography
    // ================================

    container.addEventListener(
        "input",
        event => {

            const control =
                event.target;


            if (
                !control.matches(
                    "[data-button-size][data-custom-property]"
                )
            ) {
                return;
            }


            const size =
                control.dataset.buttonSize;

            const property =
                control.dataset.customProperty;


            buttonSettings[size]
                .custom[property] =
                control.value;

        }
    );


    // ================================
    // Apply Buttons
    // ================================

    document
        .querySelector(
            "#apply-buttons"
        )
        ?.addEventListener(
            "click",
            () => {

                applyPreview();

            }
        );

}


// ================================
// Button Weight Events
// ================================

function bindButtonWeightEvent(
    size
) {

    const weight =
        document.querySelector(
            `#button-${size}-weight`
        );


    if (!weight) {
        return;
    }


    weight.addEventListener(
        "change",
        event => {

            if (
                buttonSettings[size].typography ===
                "custom"
            ) {

                buttonSettings[size]
                    .custom.weight =
                    event.target.value;

            } else {

                buttonSettings[size]
                    .weight =
                    event.target.value;

            }

        }
    );

}


// ================================
// Custom Typography Events
// ================================

function bindButtonCustomTypographyEvents(
    size
) {

    const selector =
        size
            ? `[data-button-size="${size}"][data-custom-property]`
            : "[data-button-size][data-custom-property]";


    document
        .querySelectorAll(selector)
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const buttonSize =
                        event.target.dataset.buttonSize;

                    const property =
                        event.target.dataset.customProperty;


                    buttonSettings[buttonSize]
                        .custom[property] =
                        event.target.value;

                }
            );

        });

}


// ================================
// Initialise
// ================================

function initButtonBuilder() {

    generateButtonConfig();

}

initButtonBuilder();
