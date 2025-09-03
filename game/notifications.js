const notifContainer = document.getElementById("notifications");
const modalTitle = notifContainer.querySelector(".modalTitle");
const modalContent = notifContainer.querySelector(".modalContent");

let notifOpen = false;
let notifQueue = [];

function closeNotification() {
    const next = notifQueue.shift()

    if (next) {
        _showNotification(next.title, next.content)
    } else {
        notifContainer.style.display = "none";
        notifOpen = false;
    }
}

function _showNotification(title, content) {
    notifContainer.style.display = "";
    modalTitle.innerText = title;
    modalContent.innerText = content;
}

export function showNotification(title, content) {
    if (notifOpen) {
        notifQueue.push({title, content})
        return;
    }

    notifOpen = true;

    _showNotification(title, content)
}