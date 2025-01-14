function updateCurrentWebsite(tab) {
  console.log("current website url: " + tab);
  chrome.storage.local.set({ currentWebsite: tab.url }, (item) => {
    console.log("current website url was saved");
  });

  let currentWebsite = tab.tabId;
  chrome.tabs.sendMessage(tab.tabId, { currentWebsite: currentWebsite });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message from " + sender + ": " + message.trackedWebsites);

  chrome.storage.local.set({ trackedWebsites: message.trackedWebsites }, (item) => {
    console.log("Tracked websites were saved");
  });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab) {
      updateCurrentWebsite(tab);
    }
  })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateCurrentWebsite(tab);
});
