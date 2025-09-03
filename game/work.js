import { renderTab } from "./tabManager.js"
import { stats, renderAll as renderStats } from "./infobar.js"

function pickPotato() {
    stats.potatos++;
    renderStats()
}

window.work = {
    pickPotato
}

export default function renderView() {
    return /*HTML*/`<div>This is work</div><button onclick="work.pickPotato()">Pick Potato</button>`
}