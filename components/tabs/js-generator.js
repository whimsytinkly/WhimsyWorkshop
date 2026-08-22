// ================================
// Tabs JS Generator
// ================================

function generateTabsJS() {

    return `

function initTabs(container) {

    if (!container) {
        return;
    }


    const tabs =
        container.querySelectorAll(
            ".tabs .tab"
        );


    const panels =
        container.querySelectorAll(
            "[data-tab-content]"
        );


    if (!tabs.length) {
        return;
    }


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const selectedTab =
                    tab.dataset.tab;


                tabs.forEach(otherTab => {

                    otherTab.classList.toggle(
                        "active",
                        otherTab === tab
                    );

                });


                panels.forEach(panel => {

                    const isActive =
                        panel.dataset.tabContent ===
                        selectedTab;


                    panel.classList.toggle(
                        "active",
                        isActive
                    );


                    panel.hidden =
                        !isActive;

                });

            }
        );

    });

}


document
    .querySelectorAll("[data-tabs]")
    .forEach(container => {

        initTabs(container);

    });

`.trim();

}