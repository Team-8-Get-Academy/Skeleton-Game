import { stats, updateHapiness } from "./infobar.js";
import { showNotification } from "./notifications.js";
import { MOODS } from "./constants.js"
import { renderTab } from "./tabManager.js";

const prices = {chiropractor: 100, toothbrush: 200, petOnHead: 0}
const requestOptions = Object.keys(prices)
let request = null;

let hpBleedInterval = null;

function newRequest() {
    const randomTime = Math.floor(Math.random() * 45000) + 15000;

    console.log("request", randomTime)

    setTimeout(() => {
        const randomRequest = requestOptions[
            Math.floor(Math.random() * requestOptions.length)
        ];
        
        request = randomRequest;
        showNotification("Skeleton Request", `Hey I want ${randomRequest}`)
        updateHapiness(0, MOODS.SAD)
        renderTab("#home")

        if (!hpBleedInterval) {
            hpBleedInterval = setInterval(() => {
                updateHapiness(-10)
            }, 10000)
        }

        newRequest()
    }, randomTime)
}

newRequest()

function sendchiropractor() {
    const { data, success } = requestTerms("chiropractor")
    if (!success){
        showNotification("Cant do action", data)
        updateHapiness(-5, MOODS.ANGRY);
    } else{
        showNotification("The skeleton went to the chiropractor", "the Skeleton no longer has back issues, his mood increased")
        stats.money -= prices.chiropractor
        if (hpBleedInterval) clearInterval(hpBleedInterval)
        updateHapiness(20, MOODS.HAPPY)
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
        updateHapiness(-5, MOODS.ANGRY);
    } else {
        showNotification("The skeleton got his theet brushed", "the Skeleton smiled happily")
        if (hpBleedInterval) clearInterval(hpBleedInterval)
        updateHapiness(10, MOODS.HAPPY)
    }

    renderTab("#home")
}

function petOnHead() {
    const { data, success } = requestTerms("petOnHead")
    if (!success){
        showNotification("Cant do action", data)
        updateHapiness(-5, MOODS.ANGRY);
    } else {
        showNotification("The skeleton got head pats", "the Skeleton barked happily")
        if (hpBleedInterval) clearInterval(hpBleedInterval)
        updateHapiness(10, MOODS.HAPPY)
    }

    renderTab("#home")
}

export default function renderView() {
    return /*HTML*/`<button onclick="home.sendchiropractor()">Send skelly to chiropractor</button>
    <button onclick="home.petOnHead()">Pet Skeleton on head</button>
    <button onclick="home.brushteeth()">Brush Skeleton's teeth</button>
    <img style="height: 100px" src="${stats.mood}">`
}


function requestTerms(action){
    if (request !== action && action === "chiropractor") {
        return {
            data: `The Skeleton didn't wanna go to the ${action}`,
            success: false
        } }else if (request !== action && action === "petOnHead") {
        return {
            data: `The Skeleton didn't want pets on the head`,
            success: false
        }
    }
    else if (request !== action && action === "toothbrush") {
        return {
            data: `scelly dont wanna brush his teeth`,
            success: false
        }
       
        // -100 < 0 = true
    
       
        // -100 < 0 = true
        // hvis pris er 0, og penger < pris return false
    } else if (prices[request] !== 0 && stats.money < prices[request]){
        return {
            data: `you can not afford: ${prices[request]}, sell some damn potatoes.`,
            success: false
        }
    } else {
        return {
            data: `you did the request`,
            success: true
        }
    }
}