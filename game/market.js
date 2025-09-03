import { stats, renderAll as renderStats } from "./infobar.js";
import { showNotification } from "./notifications.js";

function getApprovedPrice() {
    const approvedPrice = Math.floor(Math.random() * 500) + 1;
    const feeThreshold = Math.floor(approvedPrice * 1.6);

    return {
        approvedPrice,
        feeThreshold
    }
}

function sellPotatos() {
    const { approvedPrice, feeThreshold } = getApprovedPrice();

    const valuePer = document.getElementById("marketValue").valueAsNumber;
    const amount = document.getElementById("marketAmount").valueAsNumber;

    if (Number.isNaN(valuePer) || Number.isNaN(amount)) {
        showNotification("Market", "You have to enter a Value and Amount.")
        return;
    }

    if (amount > stats.potatos) {
        showNotification("Market", `Du har ikke ${amount} poteter, du har bare ${stats.potatos}.`);
        return;
    }

    if (valuePer >= feeThreshold) {
        const feeAmount = 50 * amount;

        showNotification("Market",
            `Du prøve å selge poteter for ${valuePer} men Politiet gjorde det ulovlig å selge over ${feeThreshold}.\n` +
            `Du blir bøtelagt ${feeAmount}kr for Prisfiksing. Dine poteter ble beslagt.`
        )

        stats.money -= feeAmount;
        stats.potatos = 0;

        renderStats();
    } else if (valuePer > approvedPrice) {
        showNotification("Market",
            `Du prøve å selge poteter for ${valuePer} men kundene vil bare kjøpre for høyest ${approvedPrice}.`
        )
    } else {
        stats.money += (amount * valuePer);
        stats.potatos -= amount;

        renderStats();
    }

    console.log(valuePer, amount, { approvedPrice, feeThreshold })
}

window.market = {
    sellPotatos
}

export default function renderView() {
    return /*HTML*/`
    <div>This is the market</div>
    <input id="marketValue" type="number" min="1" max="500" placeholder="kr per Potato" />
    <input id="marketAmount" type="number" min="1" placeholder="Amount of Potatos" />
    <button onclick="market.sellPotatos()">Sell Potato(s)</button>
    `
}