import { renderTab } from "./tabManager.js";
import { stats } from "./infobar.js";

const prices = {chiropractor: 100, toothbrush: 200, petOnHead: 0}
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