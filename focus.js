const phrasesToTrim = ["http://", "https://", ".com", ".net"];

let trackedWebsites = [];
let trimmedTrackedWebsites = [];

chrome.storage.local.get(["trackedWebsites"], (item) => {
    trackedWebsites = item.trackedWebsites || [];
    trackedWebsites.forEach(addWebsiteToList);

    console.log("tracked: " + trackedWebsites);

    trimmedTrackedWebsites = trackedWebsites.map(trimWebsiteUrl);
    console.log("trimmed: " + trimmedTrackedWebsites);
})

function addTrackedWebsite() {
    const website = document.getElementById("website-to-track").value;

    if (!trackedWebsites.includes(website) && website.trim() != "") {
        trackedWebsites.push(website);
        trimmedTrackedWebsites.push(trimWebsiteUrl(website));
        addWebsiteToList(website);

        console.log("Url: " + trackedWebsites);
        console.log("Trimmed: " + trimmedTrackedWebsites);

        // save the trackedWebsites
        chrome.storage.local.set({trackedWebsites: trackedWebsites}, (item) => {
            console.log("Tracked websites were saved");
        });
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

// use for tracked website and current tab url
// ex: https://www.youtube.com/blah-blah-blah ----> youtube
function trimWebsiteUrl(url) {
    let trimmedUrl = url;

    // remove https www .com .net etc.
    for (phrase of phrasesToTrim) {
        let idx = trimmedUrl.search(phrase);
        if (idx !== -1) {
            let beforePhrase = trimmedUrl.slice(0, idx);
            let afterPhrase = trimmedUrl.slice(idx + phrase.length);

            trimmedUrl = beforePhrase + afterPhrase;
        }
    }

    return trimmedUrl;
}

function isDoomscrollingWebsite(tab) {
    let currentTabTrimmed = trimWebsiteUrl(tab.url);

    // for (website of trimmedTrackedWebsites) {
    //     if (website === trimmed) {
    //         trimmed = true;
    //     }
    // }

    console.log(trimmedTrackedWebsites.includes(currentTabTrimmed));
    return trimmedTrackedWebsites.includes(currentTabTrimmed);
}

document.getElementById("add-website-button").addEventListener('click', addTrackedWebsite);

// let test = chrome.tabs.onUpdated.addListener(isDoomscrollingWebsite);