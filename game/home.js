import { renderTab } from "./tabManager.js";

var count = 0;

function buttonClick() {
    count++
    renderTab("#home")
}

window.home = {
    buttonClick
}

export default function renderView() {
    return /*HTML*/`<button onclick="home.buttonClick()">Count: ${count}</button>`
}