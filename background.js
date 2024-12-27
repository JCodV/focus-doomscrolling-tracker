// ex: https://www.youtube.com/blah-blah-blah ----> youtube

//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//  alert(changeInfo.url);
//});

//chrome.tabs.onActivated.addListener((activeInfo) => {
//  chrome.tabs.get(activeInfo.tabId, (tab) => {
//    console.log(tab.url);
//  });
//
//  chrome.storage.local.set({ currentWebsite: currentWebsite }, (item) => {
//    console.log("Current website was saved.");
//  });
//});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message from " + sender + ": " + message.trackedWebsites);

  chrome.storage.local.set({ trackedWebsites: message.trackedWebsites }, (item) => {
    console.log("Tracked websites were saved");
  });
});

