// ================================
// Notice JS Generator
// ================================

function generateNoticeJS() {

    const timeout =
        noticeSettings.toast.defaultTimeout;


    return `

function showToast(container) {

    if (!container) {
        return;
    }


    const toast =
        document.createElement("div");


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
        ${timeout}
    );

}


document
    .querySelectorAll("[data-toast-trigger]")
    .forEach(trigger => {

        trigger.addEventListener(
            "click",
            () => {

                const container =
                    document.querySelector(
                        "[data-toast-container]"
                    );


                showToast(container);

            }
        );

    });

`;
}
