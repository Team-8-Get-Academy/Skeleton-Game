const infobarElement = document.getElementById("infoBar")
const tabButtons = infobarElement.querySelector(".tabButtons")

export const stats = {
    money: 0,
    potatos: 0,
    hapiness: 100,
    isDead: false
}

function loadButtonListeners() {
    for (const child of tabButtons.children) {
        const page = child.getAttribute("page");

        child.addEventListener("click", () => {
            window.location.hash = `#${page}`
        })
    }
}

loadButtonListeners()

export function renderAll() {

}