const phrasesToTrim = ["http://", "https://", ".com", ".net"];
let trackedWebsites = [];
let trimmedWebsites = trackedWebsites.map(trimWebsiteUrl);

function addTrackedWebsite() {
    const website = document.getElementById("website-to-track").value;

    if (!trackedWebsites.includes(website) && website.trim() != "") {
        trackedWebsites.push(website);
        trimmedWebsites.push(trimWebsiteUrl(website));
        addWebsiteToList(website);

        console.log("Url: " + trackedWebsites);
        console.log("Trimmed: " + trimmedWebsites);
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
    let currUrlTrimmed = trimWebsiteUrl(tab.url);

    for (website in trimmedWebsites) {
        for (phrase in phrasesToTrim) {
            let idx = website.search(phrase);
            if (idx != -1) {
                website.slice(idx, phrase.length);
            }
        }
    }

    return trimmedWebsites.includes(currUrlTrimmed);
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


document.getElementById("add-website-button").addEventListener('click', addTrackedWebsite);