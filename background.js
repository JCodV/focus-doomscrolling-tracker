function updateCurrentWebsite(tabUrl) {
  console.log("current website url: " + tab.url);
  chrome.storage.local.set({ currentWebsite: tabUrl }, (item) => {
    console.log("current website url was saved");
  });

  chrome.tabs.sendMessage({ currentWebsite: tabUrl });
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
      updateCurrentWebsite(tab.url);
    }
  })
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateCurrentWebsite(tab.url);
});
