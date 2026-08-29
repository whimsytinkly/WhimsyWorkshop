// ================================
// Navigation Settings
// ================================
let currentNavigationSection = "theme";

const navigationItems = [
    {
        id: "theme",
        label: "Theme",
        icon: "🎨"
    },
    {
        id: "global",
        label: "Global",
        icon: "🌐"
    },
    {
        id: "buttons",
        label: "Buttons",
        icon: "🔘"
    },
    {
        id: "inputs",
        label: "Inputs",
        icon: "📝"
    },
    {
        id: "cards",
        label: "Cards",
        icon: "📦"
    },
    {
        id: "tabs",
        label: "Tabs",
        icon: "🗂️"
    },
    {
        id: "notices",
        label: "Notices",
        icon: "⚠️"
    },
    {
        id: "layouts",
        label: "Layouts",
        icon: "📏"
    }
];


// ================================
// Render Navigation
// ================================

function renderNavigation() {

    const sidebar =
        document.querySelector(
            "#workshop-nav"
        );

    const header =
        document.querySelector(
            "#workshop-header-nav"
        );

    const preview =
        document.querySelector(
            "#preview-navigation"
        );


    // ================================
    // Clear all navigation locations
    // ================================

    if (sidebar) {
        sidebar.innerHTML = "";
        sidebar.hidden = true;
    }

    if (header) {
        header.innerHTML = "";
        header.hidden = true;
    }

    if (preview) {
        preview.innerHTML = "";
        preview.hidden = true;
    }


    // ================================
    // Determine navigation location
    // ================================

    const hasHeader =
        layoutSettings.siteLayout.header;

    const hasSidebar =
        layoutSettings.siteLayout.sidebar;


    let container = null;


    // Sidebar navigation
    // Used when sidebar exists

    if (hasSidebar) {

        container = sidebar;

    }


    // Header navigation
    // Used when there is no sidebar
    // but the header exists

    else if (hasHeader) {

        container = header;

    }


    // Preview dropdown
    // Used when neither exists

    else {

        container = preview;

    }


    if (!container) {
        return;
    }


    // ================================
    // Generate navigation
    // ================================

    if (container === preview) {

        container.innerHTML = `

            <label for="preview-navigation-select">
                Navigation
            </label>

            <select id="preview-navigation-select">

                ${navigationItems
                .map(item => `

                        <option value="${item.id}"
                        ${item.id === currentNavigationSection ? "selected" : ""}>
                            ${item.icon} ${item.label}
                        </option>

                    `)
                .join("")}

            </select>

        `;


        const select =
            container.querySelector(
                "#preview-navigation-select"
            );


        select?.addEventListener(
            "change",
            event => {

                switchWorkshopSection(
                    event.target.value
                );

            }
        );


        container.hidden = false;


        return;

    }


    // ================================
    // Sidebar / Header Navigation
    // ================================

    container.innerHTML =
        navigationItems
            .map(
                item => `

                    <button
                        class="workshop-nav-button"
                        data-section="${item.id}"
                        type="button"
                    >

                        <span class="workshop-nav-icon">
                            ${item.icon}
                        </span>

                        <span class="workshop-nav-label">
                            ${item.label}
                        </span>

                    </button>

                `
            )
            .join("");


    container.hidden = false;


    bindNavigationEvents();


    // ================================
    // Default Section
    // ================================

    switchWorkshopSection(currentNavigationSection);

}


// ================================
// Navigation Events
// ================================

function bindNavigationEvents() {

    const buttons =
        document.querySelectorAll(
            ".workshop-nav-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const section =
                        button.dataset.section;


                    switchWorkshopSection(
                        section
                    );

                }
            );

        }
    );

}


// ================================
// Switch Workshop Section
// ================================
function switchWorkshopSection(
    section
) {

    currentNavigationSection =
        section;


    const configs =
        document.querySelectorAll(
            ".workshop-config"
        );


    configs.forEach(
        config => {

            config.hidden =
                config.dataset.config !== section;

        }
    );


    // Update active navigation item

    document
        .querySelectorAll(
            ".workshop-nav-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.section === section
                );

            }
        );


    // Update preview navigation dropdown

    const previewSelect =
        document.querySelector(
            "#preview-navigation-select"
        );


    if (previewSelect) {

        previewSelect.value =
            section;

    }

}



// ================================
// Initialise
// ================================

renderNavigation(currentNavigationSection);