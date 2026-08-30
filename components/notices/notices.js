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


    // ================================
    // Toast
    // ================================

    toast: {

        position: "bottom-right",
        defaultColor: "surface",
        opacity: 0.95,
        defaultTimeout: 3000

    },


    // ================================
    // Modal
    // ================================

    modal: {

        sizes: {

            sm: {
                minWidth: "20vw",
                minHeight: "20vh",
                paddingVertical: "md",
                paddingHorizontal: "md"
            },

            md: {
                minWidth: "40vw",
                minHeight: "30vh",
                paddingVertical: "md",
                paddingHorizontal: "lg"
            },

            lg: {
                minWidth: "70vw",
                minHeight: "70vh",
                paddingVertical: "lg",
                paddingHorizontal: "lg"
            }

        },


        radius: "md",


        header: {
            color: "surface",
            weight: 700
        },


        content: {
            color: "background",
            weight: 400
        },


        footer: {
            alignment: "right",
            color: "surface"
        },


        overlay: {
            color: "background",
            opacity: 0.6
        }

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


            <!-- ========================= -->
            <!-- Toast -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Toast
                </h5>

                <div class="global-fields">

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

            </div>


            <!-- ========================= -->
            <!-- Modal -->
            <!-- ========================= -->

            <div class="global-group">

                <h5>
                    Modal
                </h5>


                <!-- ========================= -->
                <!-- Sizes -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Sizes
                    </h5>


                    <div class="global-fields">

                        ${generateNoticeModalSizeFields()}

                    </div>

                </div>


                <!-- ========================= -->
                <!-- Generic -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Generic
                    </h5>


                    <div class="global-fields">

                        <div class="global-field">

                            <label
                                for="notice-modal-radius">
                                Border radius
                            </label>

                            <select
                                id="notice-modal-radius"
                                data-notice-modal-property="radius">

                                ${generateNoticeRadiusOptions(
        noticeSettings.modal.radius
    )}

                            </select>

                        </div>

                    </div>

                </div>


                <!-- ========================= -->
                <!-- Header -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Header
                    </h5>


                    <div class="global-fields">

                        <div class="global-field">

                            <label
                                for="notice-modal-header-color">
                                Background color
                            </label>

                            <select
                                id="notice-modal-header-color"
                                data-notice-modal-section="header"
                                data-notice-modal-property="color">

                                ${generateNoticeToastColorOptions(
        noticeSettings.modal.header.color
    )}

                            </select>

                        </div>


                        <div class="global-field">

                            <label
                                for="notice-modal-header-weight">
                                Font weight
                            </label>

                            <select
                                id="notice-modal-header-weight"
                                data-notice-modal-section="header"
                                data-notice-modal-property="weight">

                                ${generateNoticeModalWeightOptions(
        noticeSettings.modal.header.weight
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

                        <div class="global-field">

                            <label
                                for="notice-modal-content-color">
                                Background color
                            </label>

                            <select
                                id="notice-modal-content-color"
                                data-notice-modal-section="content"
                                data-notice-modal-property="color">

                                ${generateNoticeToastColorOptions(
        noticeSettings.modal.content.color
    )}

                            </select>

                        </div>


                        <div class="global-field">

                            <label
                                for="notice-modal-content-weight">
                                Font weight
                            </label>

                            <select
                                id="notice-modal-content-weight"
                                data-notice-modal-section="content"
                                data-notice-modal-property="weight">

                                ${generateNoticeModalWeightOptions(
        noticeSettings.modal.content.weight
    )}

                            </select>

                        </div>

                    </div>

                </div>


                <!-- ========================= -->
                <!-- Footer -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Footer
                    </h5>


                    <div class="global-fields">

                        <div class="global-field">

                            <label
                                for="notice-modal-footer-alignment">
                                Alignment
                            </label>

                            <select
                                id="notice-modal-footer-alignment"
                                data-notice-modal-section="footer"
                                data-notice-modal-property="alignment">

                                ${generateNoticeModalAlignmentOptions(
        noticeSettings.modal.footer.alignment
    )}

                            </select>

                        </div>


                        <div class="global-field">

                            <label
                                for="notice-modal-footer-color">
                                Background color
                            </label>

                            <select
                                id="notice-modal-footer-color"
                                data-notice-modal-section="footer"
                                data-notice-modal-property="color">

                                ${generateNoticeToastColorOptions(
        noticeSettings.modal.footer.color
    )}

                            </select>

                        </div>

                    </div>

                </div>


                <!-- ========================= -->
                <!-- Overlay -->
                <!-- ========================= -->

                <div class="global-group">

                    <h5>
                        Overlay
                    </h5>


                    <div class="global-fields">

                        <div class="global-field">

                            <label
                                for="notice-modal-overlay-color">
                                Color
                            </label>

                            <select
                                id="notice-modal-overlay-color"
                                data-notice-modal-section="overlay"
                                data-notice-modal-property="color">

                                ${generateNoticeToastColorOptions(
        noticeSettings.modal.overlay.color
    )}

                            </select>

                        </div>


                        <div class="global-field">

                            <label
                                for="notice-modal-overlay-opacity">
                                Opacity
                            </label>

                            <div class="global-range">

                                <input
                                    id="notice-modal-overlay-opacity"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value="${noticeSettings.modal.overlay.opacity}"
                                    data-notice-modal-section="overlay"
                                    data-notice-modal-property="opacity">

                                <span
                                    id="notice-modal-overlay-opacity-value">
                                    ${Math.round(
        noticeSettings.modal.overlay.opacity * 100
    )}%
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <!-- ========================= -->
            <!-- Apply -->
            <!-- ========================= -->

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
// Modal Size Fields
// ================================

function generateNoticeModalSizeFields() {

    const sizes = [

        ["sm", "S"],
        ["md", "M"],
        ["lg", "L"]

    ];


    return sizes
        .map(
            ([size, label]) => {

                const settings =
                    noticeSettings.modal.sizes[size];


                return `

                    <div class="global-group">

                        <h5>
                            ${label}
                        </h5>


                        <div class="global-fields">

                            <div class="global-field">

                                <label
                                    for="notice-modal-${size}-min-width">
                                    Min width
                                </label>

                                <input
                                    id="notice-modal-${size}-min-width"
                                    type="text"
                                    value="${settings.minWidth}"
                                    data-notice-modal-size="${size}"
                                    data-notice-modal-property="minWidth">

                            </div>


                            <div class="global-field">

                                <label
                                    for="notice-modal-${size}-min-height">
                                    Min height
                                </label>

                                <input
                                    id="notice-modal-${size}-min-height"
                                    type="text"
                                    value="${settings.minHeight}"
                                    data-notice-modal-size="${size}"
                                    data-notice-modal-property="minHeight">

                            </div>


                            <div class="global-field">

                                <label
                                    for="notice-modal-${size}-padding-vertical">
                                    Padding vertical
                                </label>

                                <select
                                    id="notice-modal-${size}-padding-vertical"
                                    data-notice-modal-size="${size}"
                                    data-notice-modal-property="paddingVertical">

                                    ${generateNoticeSpacingOptions(
                    settings.paddingVertical
                )}

                                </select>

                            </div>


                            <div class="global-field">

                                <label
                                    for="notice-modal-${size}-padding-horizontal">
                                    Padding horizontal
                                </label>

                                <select
                                    id="notice-modal-${size}-padding-horizontal"
                                    data-notice-modal-size="${size}"
                                    data-notice-modal-property="paddingHorizontal">

                                    ${generateNoticeSpacingOptions(
                    settings.paddingHorizontal
                )}

                                </select>

                            </div>

                        </div>

                    </div>

                `;

            }
        )
        .join("");

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
        ["warning", "Warning"],
        ["text", "Text"],
        ["subtext", "Subtext"]

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
// Modal Font Weight Options
// ================================

function generateNoticeModalWeightOptions(
    selected
) {

    const options = [

        [400, "400"],
        [500, "500"],
        [600, "600"],
        [700, "700"],
        [800, "800"]

    ];


    return options
        .map(
            ([value, label]) => `

                <option
                    value="${value}"
                    ${Number(value) === Number(selected)
                    ? "selected"
                    : ""}>

                    ${label}

                </option>

            `
        )
        .join("");

}


// ================================
// Modal Alignment Options
// ================================

function generateNoticeModalAlignmentOptions(
    selected
) {

    const options = [

        ["left", "Left"],
        ["center", "Center"],
        ["right", "Right"]

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
            // Modal Size Settings
            // =========================

            const modalSize =
                target.dataset.noticeModalSize;


            if (modalSize) {

                const property =
                    target.dataset.noticeModalProperty;


                if (!property) {
                    return;
                }


                noticeSettings.modal.sizes[
                    modalSize
                ][property] =
                    target.value;


                return;

            }


            // =========================
            // Modal Generic / Section Settings
            // =========================

            const modalSection =
                target.dataset.noticeModalSection;


            const modalProperty =
                target.dataset.noticeModalProperty;


            // Direct modal property

            if (
                !modalSection &&
                modalProperty
            ) {

                noticeSettings.modal[
                    modalProperty
                ] =
                    target.type === "range"
                        ? parseFloat(
                            target.value
                        )
                        : target.value;


                return;

            }


            // Nested modal section

            if (
                modalSection &&
                modalProperty
            ) {

                noticeSettings.modal[
                    modalSection
                ][modalProperty] =
                    target.type === "range"
                        ? parseFloat(
                            target.value
                        )
                        : target.value;


                if (
                    modalSection === "overlay" &&
                    modalProperty === "opacity"
                ) {

                    const value =
                        document.querySelector(
                            "#notice-modal-overlay-opacity-value"
                        );


                    if (value) {

                        value.textContent =
                            `${Math.round(
                                noticeSettings.modal.overlay.opacity * 100
                            )}%`;

                    }

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


// ================================
// Modal Preview
// ================================

function showModalPreview(
    size
) {

    const container =
        document.querySelector(
            "[data-modal-container]"
        );

    if (!container) {
        return;
    }


    const settings =
        noticeSettings.modal.sizes[size];


    if (!settings) {
        return;
    }


    container.innerHTML = `

        <div
            class="modal-overlay"
            data-modal-preview-instance>

            <div
                class="modal modal-${size}"
                style="
                    min-width: ${settings.minWidth};
                    min-height: ${settings.minHeight};
                    padding: var(--space-${settings.paddingVertical})
                        var(--space-${settings.paddingHorizontal});
                    border-radius: var(--radius-${noticeSettings.modal.radius});
                ">

                <div
                    class="modal-header"
                    style="
                        background: var(--color-${noticeSettings.modal.header.color});
                        font-weight: ${noticeSettings.modal.header.weight};
                    ">

                    Modal ${size.toUpperCase()}

                </div>


                <div
                    class="modal-content"
                    style="
                        background: var(--color-${noticeSettings.modal.content.color});
                        font-weight: ${noticeSettings.modal.content.weight};
                    ">

                    This is a ${size.toUpperCase()} modal preview.

                </div>


                <div
                    class="modal-footer"
                    style="
                        background: var(--color-${noticeSettings.modal.footer.color});
                        justify-content: ${noticeSettings.modal.footer.alignment};
                    ">

                    <button
                        class="button button-secondary button-small"
                        type="button"
                        data-modal-close>

                        Cancel

                    </button>


                    <button
                        class="button button-primary button-small"
                        type="button"
                        data-modal-close>

                        Confirm

                    </button>

                </div>

            </div>

        </div>

    `;


    bindModalClose();

}


// ================================
// Modal Close
// ================================

function bindModalClose() {

    document
        .querySelectorAll(
            "[data-modal-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const modal =
                            document.querySelector(
                                "[data-modal-preview-instance]"
                            );


                        if (modal) {

                            modal.remove();

                        }

                    }
                );

            }
        );

}


// ================================
// Bind Modal Preview
// ================================

function bindModalPreview() {

    const triggers =
        document.querySelectorAll(
            "[data-modal-trigger]"
        );


    if (!triggers.length) {
        return;
    }


    triggers.forEach(
        trigger => {

            trigger.addEventListener(
                "click",
                () => {

                    const size =
                        trigger.dataset.modalTrigger;


                    showModalPreview(
                        size
                    );

                }
            );

        }
    );

}

bindModalPreview();

// ================================
// Bind Modal Escape
// ================================

function bindModalEscape() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const modal =
                document.querySelector(
                    "[data-modal-preview-instance]"
                );


            if (modal) {

                modal.remove();

            }

        }
    );

}

bindModalEscape();
