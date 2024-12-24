let trackedWebsites = [];

function addTrackedWebsite() {
    const website = document.getElementById("website-to-track").value;

    if (!trackedWebsites.includes(website) && website.trim() != "") {
        trackedWebsites.push(website);
        addWebsiteToList(website);

        console.log(trackedWebsites);
    }
}

function addWebsiteToList(website) {
    let ulTrackedWebsites = document.getElementById("tracked-websites-list");

    let li = document.createElement("li");
    li.textContent = website;
    ulTrackedWebsites.appendChild(li);
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
}

function isDoomscrollingWebsite(tab) {
    let isDoomscroller = false;
    let currUrlTrimmed = trimWebsiteUrl(tab.url);
    
}

// use for tracked website and current tab url
function trimWebsiteUrl(url) {
    // remove https www .com .net etc.
    // ex: https://www.reddit.com/ ----> reddit
    // return string
}