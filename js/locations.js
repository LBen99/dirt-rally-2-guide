const forwardList = document.querySelectorAll(".stages-forward-list");
const reverseList = document.querySelectorAll(".stages-reverse-list");

function toggleForward() {
    forwardList.forEach((list) => {
        if (list.classList.value.includes("hide")) {
            list.classList.toggle("hide");
        }
    });
    reverseList.forEach((list) => {
        if (!list.classList.value.includes("hide")) {
            list.classList.toggle("hide")
        }
    });
}

function toggleReverse() {
    reverseList.forEach((list) => {
        if (list.classList.value.includes("hide")) {
            list.classList.toggle("hide")
        }
    });
    forwardList.forEach((list) => {
        if (!list.classList.value.includes("hide")) {
            list.classList.toggle("hide");
        }
    });
}

export {
    toggleForward,
    toggleReverse
}