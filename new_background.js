// core ideas
// [X] check current website
// [X] if its a doomscrolling website --> start timer
// [X] when timer runs out, close tab!

let currentWebsite = undefined;
let doomscrollingWebsites = undefined;
let minutesAllotedToDoomscroll = undefined;

async function loadAllSavedData() {
  await chrome.storage.local.get("doomscrollingWebsites", (result) => {
    doomscrollingWebsites = result.doomscrollingWebsites;
  });

  //await chrome.storage.local.get("currentWebsite", (result) => {
  //  currentWebsite = result.currentWebsite;
  //});

  await chrome.storage.local.get("minutesAllotedToDoomscroll", (result) => {
    minutesAllotedToDoomscroll = result.minutesAllotedToDoomscroll;
  })
}

function saveDoomscrollingList() {
  chrome.storage.local.set({ doomscrollingWebsites: doomscrollingWebsites }, () => {
    console.log("The doomscrolling websites list was saved");
  });

  chrome.runtime.sendMessage()
}

//function saveCurrentWebsite() {
//  chrome.storage.local.set({ currentWebsite: currentWebsite }, () => {
//    console.log("The current website list was saved");
//  });
//}

function saveMinutesAllotedToDoomscroll() {
  chrome.storage.local.set({ minutesAllotedToDoomscroll: minutesAllotedToDoomscroll }, () => {
    console.log("The time (in minutes) alloted to doomscrolling was saved");
  });
}
function saveAllData() {
  saveDoomscrollingList();
  //saveCurrentWebsite();
  saveMinutesAllotedToDoomscroll();
}

function addDoomscrollingWebsite(websiteList, website) {
  websiteList.push(website);
  saveDoomscrollingList();
}

function clearDoomscrollingWebsites() {
  doomscrollingWebsites = [];
  saveDoomscrollingList();
}

function removeDoomscrollingWebsite(website) {
  const index = currentWebsite.indexOf(website);
  if (index != -1) {
    currentWebsite.splice(index, 1);
  }
  saveDoomscrollingList();
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

function currentTabUpdateEvent(tab) {
  if (tab) {
    currentWebsite = tab.url;
    if (isCurrentTabDoomscrolling()) {
      startTimer(minutesAllotedToDoomscroll);
    }
  }
  else {
    console.log("currentTabUpdateEvent: current tab is undefined");
  }
}

// update the url for the current tab & check if user is doomscrolling using both listeners (1)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab) {
      currentTabUpdateEvent(tab);
    }
  })
});

// (2)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  currentTabUpdateEvent(tab);
});

chrome.runtime.OnMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "add_doomscrolling_website":
      addDoomscrollingWebsite();
      break;
    case "clear_doomscrolling_website":
      clearDoomscrollingWebsites();
      break;
  }
})
