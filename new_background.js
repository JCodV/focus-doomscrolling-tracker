// core ideas
// check current website
// if its a doomscrolling website --> start timer
// when timer runs out, close tab!

let currentWebsite = undefined;
let doomscrollingWebsites = undefined;

async function loadSavedData() {
  doomscrollingWebsites = await chrome.storage.local.get("doomscrollingWebsites", (result) => {
    doomscrollingWebsites = result.doomscrollingWebsites;
  });

  currentWebsite = await chrome.storage.local.get("currentWebsite", (result) => {
    currentWebsite = result.currentWebsite;
  });
}

function saveCurrentData() {
  chrome.storage.local.set({ doomscrollingWebsites: doomscrollingWebsites }, () => {
    console.log("The doomscrolling websites list was saved");
  });

  chrome.storage.local.set({ currentWebsite: currentWebsite }, () => {
    console.log("The current website list was saved");
  });

}

function addDoomscrollingWebsite(website) {
  doomscrollingWebsites.push(website);
  saveCurrentData();
}

function clearDoomscrollingWebsites() {
  doomscrollingWebsites = [];
  saveCurrentData();
}

function removeDoomscrollingWebsite(website) {
  const index = currentWebsite.indexOf(website);
  if (index != -1) {
    currentWebsite.splice(index, 1);
  }
  saveCurrentData();
}

function isCurrentTabDoomscrolling() {
  return doomscrollingWebsites.includes(currentWebsite);
}

function convertMinutesToMilliseconds(minutes) {
  return minutes * 60000;
}

function startTimer(minutes) {
  milliseconds = convertMinutesToMilliseconds(minutes);
  setTimeout(closeCurrentWebsite, milliseconds);
}

function closeCurrentWebsite() {
  chrome.tabs.query({ active: true, currentWebsite: true }, (tabs) => {
    chrome.tabs.remove(tabs[0].id);
  })
}

// update the url for the current tab using both listeners (1)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab) {
      currentWebsite = tab.url;
    }
  })
});

// (2)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  currentWebsite = tab.url;
});
