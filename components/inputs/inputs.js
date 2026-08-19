// ================================
// Input Settings
// ================================

const inputSizeLabels = {
    small: "Small",
    medium: "Medium",
    large: "Large"
};


const inputSettings = {

    small: {
        paddingVertical: "xs",
        paddingHorizontal: "sm",
        typography: "base",
        weight: "400",
        custom: {
            size: "14px",
            lineHeight: "1.2"
        }
    },

    medium: {
        paddingVertical: "sm",
        paddingHorizontal: "md",
        typography: "base",
        weight: "400",
        custom: {
            size: "16px",
            lineHeight: "1.5"
        }
    },

    large: {
        paddingVertical: "md",
        paddingHorizontal: "lg",
        typography: "base",
        weight: "400",
        custom: {
            size: "18px",
            lineHeight: "1.4"
        }
    }

};


// ================================
// Input Configuration UI
// ================================

function generateInputConfig() {

    const container =
        document.querySelector(
            '[data-config="inputs"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            <div class="global-fields">

                ${Object.entries(inputSettings)
                    .map(([size, settings]) => `

                        <div class="global-group">

                            <h5>
                                ${inputSizeLabels[size]}
                            </h5>


                            <div class="global-fields">

                                <!-- Padding Vertical -->

                                <div class="global-field">

                                    <label
                                        for="input-${size}-padding-vertical">
                                        Padding vertical
                                    </label>

                                    <select
                                        id="input-${size}-padding-vertical"
                                        data-input-size="${size}"
                                        data-property="paddingVertical">

                                        ${generateInputSpacingOptions(
                                            settings.paddingVertical
                                        )}

                                    </select>

                                </div>


                                <!-- Padding Horizontal -->

                                <div class="global-field">

                                    <label
                                        for="input-${size}-padding-horizontal">
                                        Padding horizontal
                                    </label>

                                    <select
                                        id="input-${size}-padding-horizontal"
                                        data-input-size="${size}"
                                        data-property="paddingHorizontal">

                                        ${generateInputSpacingOptions(
                                            settings.paddingHorizontal
                                        )}

                                    </select>

                                </div>


                                <!-- Typography -->

                                <div
                                    id="input-${size}-typography-config"
                                    class="global-fields">

                                    ${generateInputTypographyConfig(
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
                id="apply-inputs"
                class="button button-primary button-medium">
                Apply Inputs
            </button>

        </section>

    `;


    bindInputEvents();

}


// ================================
// Typography Configuration
// ================================

function generateInputTypographyConfig(
    size,
    settings
) {

    return `

        <div class="global-field">

            <label
                for="input-${size}-typography">
                Typography
            </label>

            <select
                id="input-${size}-typography"
                data-input-size="${size}"
                data-property="typography">

                ${generateInputTypographyOptions(
                    settings.typography
                )}

            </select>

        </div>


        <div class="global-field">

            <label
                for="input-${size}-weight">
                Weight
            </label>

            <select
                id="input-${size}-weight"
                data-input-size="${size}"
                data-property="weight">

                ${generateInputWeightOptions(
                    settings.weight
                )}

            </select>

        </div>


        ${generateInputCustomTypographyFields(
            size,
            settings
        )}

    `;

}


// ================================
// Custom Typography Fields
// ================================

function generateInputCustomTypographyFields(
    size,
    settings
) {

    if (
        settings.typography !== "custom"
    ) {
        return "";
    }


    return `

        <div class="global-field">

            <label
                for="input-${size}-custom-size">
                Size
            </label>

            <input
                id="input-${size}-custom-size"
                type="text"
                data-input-size="${size}"
                data-custom-property="size"
                class="input input-medium"
                value="${settings.custom.size}"
            >

        </div>


        <div class="global-field">

            <label
                for="input-${size}-custom-line-height">
                Line height
            </label>

            <input
                id="input-${size}-custom-line-height"
                type="text"
                data-input-size="${size}"
                data-custom-property="lineHeight"
                class="input input-medium"
                value="${settings.custom.lineHeight}"
            >

        </div>

    `;

}


// ================================
// Spacing Options
// ================================

function generateInputSpacingOptions(selected) {

    return Object.keys(globalSettings.spacing)
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

function generateInputTypographyOptions(selected) {

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

function generateInputWeightOptions(selected) {

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

function bindInputEvents() {

    const container =
        document.querySelector(
            '[data-config="inputs"]'
        );


    if (!container) {
        return;
    }


    // Padding + Weight

    container.addEventListener(
        "change",
        event => {

            const target =
                event.target;


            if (
                !target.matches(
                    "[data-input-size][data-property]"
                )
            ) {
                return;
            }


            const size =
                target.dataset.inputSize;

            const property =
                target.dataset.property;


            // Typography gets handled separately

            if (
                property ===
                "typography"
            ) {

                inputSettings[size].typography =
                    target.value;


                refreshInputTypography(
                    size
                );

                return;
            }


            inputSettings[size][property] =
                target.value;

        }
    );


    // Custom Typography

    container.addEventListener(
        "input",
        event => {

            const target =
                event.target;


            if (
                !target.matches(
                    "[data-input-size][data-custom-property]"
                )
            ) {
                return;
            }


            const size =
                target.dataset.inputSize;

            const property =
                target.dataset.customProperty;


            inputSettings[size].custom[property] =
                target.value;

        }
    );


    // Apply Inputs

    document
        .querySelector(
            "#apply-inputs"
        )
        ?.addEventListener(
            "click",
            () => {

                applyPreview();

            }
        );

}


// ================================
// Refresh Typography UI
// ================================

function refreshInputTypography(size) {

    const config =
        document.querySelector(
            `#input-${size}-typography-config`
        );


    if (!config) {
        return;
    }


    config.innerHTML =
        generateInputTypographyConfig(
            size,
            inputSettings[size]
        );

}



// ================================
// Custom Typography Events
// ================================

function bindInputCustomTypographyEvents() {

    document
        .querySelectorAll(
            "[data-input-size][data-custom-property]"
        )
        .forEach(input => {

            input.oninput =
                event => {

                    const size =
                        event.target.dataset.inputSize;

                    const property =
                        event.target.dataset.customProperty;


                    inputSettings[size].custom[property] =
                        event.target.value;

                };

        });

}


// ================================
// Initialise
// ================================

function initInputBuilder() {

    generateInputConfig();

}

initInputBuilder();