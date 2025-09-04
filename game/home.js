import { stats, updateHapiness } from "./infobar.js";
import { showNotification } from "./notifications.js";
import { MOODS, REQUEST_NAMES } from "./constants.js"
import { renderTab } from "./tabManager.js";

const prices = {chiropractor: 100, toothbrush: 200, petOnHead: 0}
const requestOptions = Object.keys(prices)

let hpBleedInterval = null;

function clearBleed() {
    if (!hpBleedInterval) return;

    clearInterval(hpBleedInterval);
    hpBleedInterval = null;
}

function newRequest() {
    const randomTime = Math.floor(Math.random() * 15000) + 15000;

    setTimeout(() => {
        const randomRequest = requestOptions[
            Math.floor(Math.random() * requestOptions.length)
        ];
        
        stats.request = randomRequest;
        showNotification("Skeleton Request", `Hey I want ${REQUEST_NAMES[randomRequest]}`)
        updateHapiness(0, MOODS.SAD)
        renderTab("#home")

        if (!hpBleedInterval) {
            hpBleedInterval = setInterval(() => {
                updateHapiness(-10)
            }, 4000)
        }

        newRequest()
    }, randomTime)
}

newRequest()

function sendchiropractor() {
    const { data, success } = requestTerms("chiropractor")
    if (!success){
        showNotification("Cant do action", data)
        updateHapiness(-25, MOODS.ANGRY);
    } else{
        showNotification("The skeleton went to the chiropractor", "the Skeleton no longer has back issues, his mood increased")
        stats.money -= prices.chiropractor
        stats.request = null
        clearBleed()
        updateHapiness(25, MOODS.HAPPY)
    }

    renderTab("#home")
}

window.home = {
    sendchiropractor,
    petOnHead,
    brushteeth
}
function brushteeth(){
      const { data, success } = requestTerms("toothbrush")
    if (!success){
        showNotification("Cant do action", data)
        updateHapiness(-25, MOODS.ANGRY);
    } else {
        showNotification("The skeleton got his theet brushed", "The Skeleton smiled happily")
        stats.money -= prices.toothbrush
        stats.request = null
        clearBleed()
        updateHapiness(50, MOODS.HAPPY)
    }

    renderTab("#home")
}

function petOnHead() {
    const { data, success } = requestTerms("petOnHead")
    if (!success){
        showNotification("Cant do action", data)
        updateHapiness(-25, MOODS.ANGRY);
    } else {
        showNotification("The skeleton got head pats", "The Skeleton barked happily")
        stats.request = null
        clearBleed()
        updateHapiness(10, MOODS.HAPPY)
    }

    renderTab("#home")
}

export default function renderView() {
    return /*HTML*/`<div>chiropractor costs: ${prices.chiropractor} V-bucks</div>
    <div>Pet on head is free. <(^_^)></div>
    <div>toothbrush costs ${prices.toothbrush} V-bucks</div>
    <button onclick="home.sendchiropractor()">Send skelly to chiropractor</button>
    <button onclick="home.petOnHead()">Pet Skeleton on head</button>
    <button onclick="home.brushteeth()">Brush Skeleton's teeth</button>
    <button onclick="saveGame()">Save Game</button>
    <img style="height: 500px" src="${stats.mood}">`
}


function requestTerms(action){
    if (stats.request !== action && action === "chiropractor") {
        return {
            data: `The Skeleton didn't wanna go to the ${action}`,
            success: false
        } }else if (stats.request !== action && action === "petOnHead") {
        return {
            data: `The Skeleton didn't want pets on the head`,
            success: false
        }
    }
    else if (stats.request !== action && action === "toothbrush") {
        return {
            data: `Skelly don't wanna brush his teeth`,
            success: false
        }
       
        // -100 < 0 = true
    
       
        // -100 < 0 = true
        // hvis pris er 0, og penger < pris return false
    } else if (prices[stats.request] !== 0 && stats.money < prices[stats.request]){
        return {
            data: `You dont have enough money, price is: ${prices[stats.request]} v-bucks, sell some damn potatoes.`,
            success: false
        }
    } else {
        return {
            data: `you did the request`,
            success: true
        }
    }
}