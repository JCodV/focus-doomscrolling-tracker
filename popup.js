//const phrasesToTrim = ["http://", "https://", ".com", ".net"];

async function clearDoomscrollingWebsites() {
    const message = {
        action: "clear_doomscrolling_websites",
    };

    console.log("Attempting to clear doomscrolling websites list");
    console.log("Sending message from popup.js to background.js");

    try {
        const response = await chrome.runtime.sendMessage(message);
        console.log("Successfully cleared the doomscrolling websites list");
    }
    catch (error) {
        console.log("Error sending message to background.js, " + error);
    }

    return true;
}

async function addDoomscrollingWebsite() {
    const websiteToAdd = document.getElementById("new-website-input-box").value;
    const message = {
        action: "add_doomscrolling_website",
        websiteToAdd,
    };

    try {
        const response = await chrome.runtime.sendMessage(message);
        console.log("Successfully cleared the doomscrolling websites list" + response);
    }
    catch (error) {
        console.log("Error sending message to background.js, " + error);
    }

    return true;
}

function clearTrackedWebsites() {
    const websitesList = document.getElementById("tracked-websites-list");
    while (websitesList.firstChild) {
        websitesList.removeChild(websitesList.firstChild);
    }
}

function addWebsiteToList(websiteURL) {
    let ulTrackedWebsites = document.getElementById("tracked-websites-list");

    let li = document.createElement("li");
    li.textContent = website;
    ulTrackedWebsites.appendChild(li);
}

document.getElementById("add-website-button").addEventListener('click', addDoomscrollingWebsite);
document.getElementById("clear-website-list").addEventListener('click', clearDoomscrollingWebsites);

// updates from service worker

chrome.runtime.OnMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "update_list":
            console.log("working");
            break;
    }
})

//function addTrackedWebsite() {
//    const website = document.getElementById("website-to-track").value;
//
//    if (!trackedWebsites.includes(website) && website.trim() != "") {
//        trackedWebsites.push(website);
//        trimmedTrackedWebsites.push(trimWebsiteUrl(website));
//
//        addWebsiteToList(website);
//        chrome.runtime.sendMessage({ trackedWebsites: trackedWebsites });
//    }
//}
//
//
//function trimWebsiteUrl(url) {
//    let trimmedUrl = url;
//
//    // remove https www .com .net etc.
//    for (phrase of phrasesToTrim) {
//        let idx = trimmedUrl.search(phrase);
//        if (idx !== -1) {
//            let beforePhrase = trimmedUrl.slice(0, idx);
//            let afterPhrase = trimmedUrl.slice(idx + phrase.length);
//
//            trimmedUrl = beforePhrase + afterPhrase;
//        }
//    }
//
//    return trimmedUrl;
//}
//
//function isDoomscrollingWebsite(tab) {
//    let currentTabTrimmed = trimWebsiteUrl(tab.url);
//    console.log(trimmedTrackedWebsites.includes(currentTabTrimmed));
//    return trimmedTrackedWebsites.includes(currentTabTrimmed);
//}
//
//
//chrome.storage.local.get(["trackedWebsites"], (item) => {
//    trackedWebsites = item.trackedWebsites || [];
//    trackedWebsites.forEach(addWebsiteToList);
//
//    // console.log("tracked: " + trackedWebsites);
//
//    trimmedTrackedWebsites = trackedWebsites.map(trimWebsiteUrl);
//    // console.log("trimmed: " + trimmedTrackedWebsites);
//})
//
////chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
////    currentWebsiteUrl = message.currentWebsite;
////    console.log("curr website url recieved in popup.js" + currentWebsiteUrl);
////})
