// ================================
// Notice Settings
// ================================

const noticeSettings = {

    paddingVertical: "md",
    paddingHorizontal: "md",

    radius: "md",

    borderSides: [
        "top",
        "right",
        "bottom",
        "left"
    ],

    opacity: 0.5,

    toast: {

        position: "bottom-right",
        defaultColor: "surface",
        opacity: 0.95,
        defaultTimeout: 3000

    }

};


// ================================
// Notice Configuration UI
// ================================

function generateNoticeConfig() {

    const container =
        document.querySelector(
            '[data-config="notices"]'
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="builder-section">

            <!-- ========================= -->
            <!-- Notice -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Notice
                </h5>

                <div class="global-fields">

                    <!-- Padding Vertical -->

                    <div class="global-field">

                        <label
                            for="notice-padding-vertical">
                            Padding vertical
                        </label>

                        <select
                            id="notice-padding-vertical"
                            data-notice-property="paddingVertical">

                            ${generateNoticeSpacingOptions(
        noticeSettings.paddingVertical
    )}

                        </select>

                    </div>


                    <!-- Padding Horizontal -->

                    <div class="global-field">

                        <label
                            for="notice-padding-horizontal">
                            Padding horizontal
                        </label>

                        <select
                            id="notice-padding-horizontal"
                            data-notice-property="paddingHorizontal">

                            ${generateNoticeSpacingOptions(
        noticeSettings.paddingHorizontal
    )}

                        </select>

                    </div>


                    <!-- Radius -->

                    <div class="global-field">

                        <label
                            for="notice-radius">
                            Radius
                        </label>

                        <select
                            id="notice-radius"
                            data-notice-property="radius">

                            ${generateNoticeRadiusOptions(
        noticeSettings.radius
    )}

                        </select>

                    </div>


                    <!-- Border Sides -->

                    <div class="global-field">

                        <label>
                            Border sides
                        </label>

                        <div class="global-checkboxes">

                            ${generateNoticeBorderSideOptions(
        noticeSettings.borderSides
    )}

                        </div>

                    </div>


                    <!-- Opacity -->

                    <div class="global-field">

                        <label
                            for="notice-opacity">
                            Opacity
                        </label>

                        <div class="global-range">

                            <input
                                id="notice-opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value="${noticeSettings.opacity}"
                                data-notice-property="opacity">

                            <span
                                id="notice-opacity-value">
                                ${Math.round(
        noticeSettings.opacity * 100
    )}%
                            </span>

                        </div>

                    </div>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Toast -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Toast
                </h5>

                <div class="global-fields">

                    <!-- Position -->

                    <div class="global-field">

                        <label
                            for="notice-toast-position">
                            Position
                        </label>

                        <select
                            id="notice-toast-position"
                            data-notice-toast-property="position">

                            ${generateNoticeToastPositionOptions(
        noticeSettings.toast.position
    )}

                        </select>

                    </div>


                    <!-- Default Color -->

                    <div class="global-field">

                        <label
                            for="notice-toast-default-color">
                            Default color
                        </label>

                        <select
                            id="notice-toast-default-color"
                            data-notice-toast-property="defaultColor">

                            ${generateNoticeToastColorOptions(
        noticeSettings.toast.defaultColor
    )}

                        </select>

                    </div>


                    <!-- Opacity -->

                    <div class="global-field">

                        <label
                            for="notice-toast-opacity">
                            Opacity
                        </label>

                        <div class="global-range">

                            <input
                                id="notice-toast-opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value="${noticeSettings.toast.opacity}"
                                data-notice-toast-property="opacity">

                            <span
                                id="notice-toast-opacity-value">
                                ${Math.round(
        noticeSettings.toast.opacity * 100
    )}%
                            </span>

                        </div>

                    </div>

                    <!-- Default Timeout -->

                    <div class="global-field">

                        <label
                            for="notice-toast-default-timeout">
                            Default timeout
                        </label>

                        <div class="global-input-with-suffix">

                            <input
                                id="notice-toast-default-timeout"
                                type="number"
                                min="0"
                                step="500"
                                value="${noticeSettings.toast.defaultTimeout}"
                                data-notice-toast-property="defaultTimeout">

                            <span>
                                ms
                            </span>

                        </div>

                </div>

            </div>


            <button
                id="apply-notices"
                class="button button-primary button-medium">
                Apply Notices
            </button>

        </section>

    `;


    bindNoticeEvents();

}


// ================================
// Spacing Options
// ================================

function generateNoticeSpacingOptions(
    selected
) {

    return Object.keys(globalSettings.spacing)
        .map(
            size => `

                <option
                    value="${size}"
                    ${size === selected
                    ? "selected"
                    : ""}>
                    ${sizeLabels[size] || size}
                </option>

            `
        )
        .join("");

}


// ================================
// Radius Options
// ================================

function generateNoticeRadiusOptions(
    selected
) {

    return Object.keys(globalSettings.radius)
        .map(
            size => `

                <option
                    value="${size}"
                    ${size === selected
                    ? "selected"
                    : ""}>
                    ${sizeLabels[size] || size}
                </option>

            `
        )
        .join("");

}


// ================================
// Border Side Options
// ================================

function generateNoticeBorderSideOptions(
    selected
) {

    const sides = [

        ["top", "Top"],
        ["right", "Right"],
        ["bottom", "Bottom"],
        ["left", "Left"]

    ];


    return sides
        .map(
            ([value, label]) => `

                <label
                    class="global-checkbox">

                    <input
                        type="checkbox"
                        data-notice-border-side="${value}"
                        ${selected.includes(value)
                    ? "checked"
                    : ""}>

                    ${label}

                </label>

            `
        )
        .join("");

}


// ================================
// Toast Position Options
// ================================

function generateNoticeToastPositionOptions(
    selected
) {

    const options = [

        ["top-left", "Top left"],
        ["top-right", "Top right"],
        ["bottom-left", "Bottom left"],
        ["bottom-right", "Bottom right"]

    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""}>
                    ${label}
                </option>

            `
        )
        .join("");

}


// ================================
// Toast Colour Options
// ================================

function generateNoticeToastColorOptions(
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
        ["warning", "Warning"]

    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${value === selected
                    ? "selected"
                    : ""}>
                    ${label}
                </option>

            `
        )
        .join("");

}


// ================================
// Event Binding
// ================================

function bindNoticeEvents() {

    const container =
        document.querySelector(
            '[data-config="notices"]'
        );


    if (!container) {
        return;
    }


    container.addEventListener(
        "change",
        event => {

            const target =
                event.target;


            // =========================
            // Border Side
            // =========================

            const borderSide =
                target.dataset.noticeBorderSide;


            if (borderSide) {

                const sides =
                    noticeSettings.borderSides;


                if (target.checked) {

                    if (
                        !sides.includes(
                            borderSide
                        )
                    ) {

                        sides.push(
                            borderSide
                        );

                    }

                } else {

                    noticeSettings.borderSides =
                        sides.filter(
                            side =>
                                side !== borderSide
                        );

                }

                return;

            }


            // =========================
            // Toast Settings
            // =========================

            const toastProperty =
                target.dataset.noticeToastProperty;


            if (toastProperty) {

                noticeSettings.toast[
                    toastProperty
                ] =
                    target.type === "range" ||
                        target.type === "number"
                        ? parseFloat(
                            target.value
                        )
                        : target.value;


                if (
                    toastProperty === "opacity"
                ) {

                    const value =
                        document.querySelector(
                            "#notice-toast-opacity-value"
                        );


                    if (value) {

                        value.textContent =
                            `${Math.round(
                                noticeSettings.toast.opacity * 100
                            )}%`;

                    }

                }

                return;

            }


            // =========================
            // Notice Settings
            // =========================

            const property =
                target.dataset.noticeProperty;


            if (property) {

                noticeSettings[property] =
                    target.type === "range"
                        ? parseFloat(
                            target.value
                        )
                        : target.value;


                if (
                    property === "opacity"
                ) {

                    const value =
                        document.querySelector(
                            "#notice-opacity-value"
                        );


                    if (value) {

                        value.textContent =
                            `${Math.round(
                                noticeSettings.opacity * 100
                            )}%`;

                    }

                }

            }

        }
    );


    // =========================
    // Apply Notices
    // =========================

    document
        .querySelector(
            "#apply-notices"
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

function initNoticeBuilder() {

    generateNoticeConfig();

}

initNoticeBuilder();


// ================================
// Toast Preview
// ================================

function showToastPreview() {

    const container =
        document.querySelector(
            "[data-toast-container]"
        );

    if (!container) {
        return;
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        "This is a toast notification.";


    container.innerHTML = "";


    container.appendChild(
        toast
    );

    setTimeout(
        () => {

            toast.remove();

        },
        noticeSettings.toast.defaultTimeout
    );

}


// ================================
// Bind Toast Preview
// ================================

function bindToastPreview() {

    const trigger =
        document.querySelector(
            "[data-toast-trigger]"
        );


    if (!trigger) {
        return;
    }


    trigger.addEventListener(
        "click",
        () => {

            showToastPreview();

        }
    );

}

bindToastPreview();