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
        icon: "🗂️"
    },
    {
        id: "notices",
        label: "Notices",
        icon: "⚠️"
    }
];

const navigationConfig = {
    position: "sidebar",
    showBrand: true
};

function renderNavigation() {
    const navigation = document.querySelector("#workshop-nav");

    if (!navigation) {
        return;
    }

    navigation.innerHTML = `
        <div class="workshop-nav-items">
            ${navigationItems
            .map(item => `
                    <button
                        class="workshop-nav-button${item.id === "theme" ? " active" : ""}"
                        data-section="${item.id}"
                        type="button"
                    >
                        <span class="workshop-nav-icon">${item.icon}</span>
                        <span class="workshop-nav-label">${item.label}</span>
                    </button>
                `)
            .join("")}
        </div>
    `;

    bindNavigationEvents();

    switchWorkshopSection("theme");
}

function bindNavigationEvents() {
    const buttons = document.querySelectorAll(
        ".workshop-nav-button"
    );

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const section = button.dataset.section;

            switchWorkshopSection(section);
        });
    });
}

function switchWorkshopSection(section) {
    const configs = document.querySelectorAll(".workshop-config");
    configs.forEach(config => {
        config.hidden = config.dataset.config !== section;
    });
}

renderNavigation();