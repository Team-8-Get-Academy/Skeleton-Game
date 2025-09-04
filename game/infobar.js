import { MOODS } from "./constants.js"
import { renderTab } from "./tabManager.js"

const infobarElement = document.getElementById("infoBar")
const tabButtons = infobarElement.querySelector(".tabButtons")

const potatoCount = document.getElementById("potatoCount")
const moneyCount = document.getElementById("moneyCount")
const hapinessProgress = infobarElement.querySelector(".hapinessBar .progressBar")

let moodTimeout = null;

export const stats = {
    money: 0,
    potatos: 0,
    hapiness: 100,
    isDead: false,
    mood: MOODS.NEUTRAL
}

function gameOver() {

}

export function updateHapiness(value, newMood = null) {
    let newValue = stats.hapiness + value;

    if (newMood) {
        if (moodTimeout) clearTimeout(moodTimeout);
        stats.mood = newMood

        if (newMood === MOODS.SAD) {
            moodTimeout = setTimeout(() => {
                updateHapiness(0, MOODS.ANGRY)
                renderTab("#home")
            }, 20000)
        } else if (newMood === MOODS.HAPPY) {
            moodTimeout = setTimeout(() => {
                updateHapiness(0, MOODS.NEUTRAL)
                renderTab("#home")
            }, 20000)
        }
    }

    if (newValue >= 100) newValue = 100;
    if (newValue <= 0) {
        gameOver()

        return;
    }

    stats.hapiness = newValue;

    renderAll()
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
    if (stats.hapiness <= 0) {
        gameOver()

        return;
    }

    potatoCount.innerText = `${stats.potatos}`
    moneyCount.innerText = `${stats.money}`
    hapinessProgress.style.width = `${stats.hapiness}%`
}