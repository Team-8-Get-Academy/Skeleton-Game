import { MOODS, REQUEST_NAMES } from "./constants.js"
import { renderTab } from "./tabManager.js"

const infobarElement = document.getElementById("infoBar")
const tabButtons = infobarElement.querySelector(".tabButtons")

const skeletonWant = document.getElementById("skeletonWant")
const potatoCount = document.getElementById("potatoCount")
const moneyCount = document.getElementById("moneyCount")
const hapinessProgress = infobarElement.querySelector(".hapinessBar .progressBar")

let moodTimeout = null;

export const stats = {
    money: 0,
    potatos: 0,
    hapiness: 100,
    mood: MOODS.NEUTRAL,
    request: null
}

function loadGame() {
    try {
        const data = JSON.parse(localStorage.getItem("save-data"))

        stats.money = data.money;
        stats.potatos = data.potatos;
        stats.hapiness = data.hapiness;
        stats.mood = data.mood;
        stats.request = data.request;

    } catch {}
}

loadGame()

window.saveGame = function () {
    localStorage.setItem("save-data", JSON.stringify(stats))
}

const gameoverAudio = new Audio('./assets/gameover.mp3');

function gameOver() {
    document.body.innerHTML = /*HTML*/`
    <div class="gameOverContainer">
        <h1>Game Over!</h1>
        <h2>Skeleton got too angry that you didn't give him what he wanted, and ate you alive.</h2>
    </div>
    `

    gameoverAudio.play()
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
            }, 3000)
        } else if (newMood === MOODS.HAPPY) {
            moodTimeout = setTimeout(() => {
                updateHapiness(0, MOODS.NEUTRAL)
                renderTab("#home")
            }, 5000)
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
    skeletonWant.innerText = `Skeleton wants: ${stats.request ? REQUEST_NAMES[stats.request] : "Nothing"}`
}