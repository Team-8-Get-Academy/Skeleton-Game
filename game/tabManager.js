import RenderHome from './home.js'
import RenderWork from './work.js'
import RenderMarket from './market.js'

const tabContent = document.getElementById("tabContent")

const tabs = {
    "#home": RenderHome,
    "#work": RenderWork,
    "#market": RenderMarket
}

let currentTab = null;

function runRender() {
    const tabFunction = tabs[currentTab];

    if (!tabFunction) {
        window.location.hash = "#home"
        return
    }

    tabContent.innerHTML = tabFunction()
}

export function renderTab(expectedTab) {
    if (expectedTab && currentTab !== expectedTab) return;
    if (currentTab === null) {
        updateCurrentTab()
        return;
    }

    runRender()
}

function updateCurrentTab() {
    if (window.location.hash === currentTab) return;

    currentTab = window.location.hash;
    
    runRender()
}

window.addEventListener("hashchange", updateCurrentTab);
