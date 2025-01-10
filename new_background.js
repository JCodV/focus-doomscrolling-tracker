// core ideas
// check current website
// if its a doomscrolling website --> start timer
// when timer runs out, close tab!

let currentWebsite = undefined;
let doomscrollingWebsites = undefined;

function loadSavedDoomscrollingWebsites() {

}

function saveCurrentDoomscrollingWebsites() {
  chrome.storage.local.set({ doomscrollingWebsites: doomscrollingWebsites }, () => {
    console.log("The doomscrolling websites list was saved");
  });
}

function addDoomscrollingWebsite(website) {
  doomscrollingWebsites.push(website);
  saveCurrentDoomscrollingWebsites();
}

function clearDoomscrollingWebsites() {
  doomscrollingWebsites = [];
  saveCurrentDoomscrollingWebsites();
}

function removeDoomscrollingWebsite(website) {
  const index = currentWebsite.indexOf(website);
  if (index != -1) {
    currentWebsite.splice(index, 1);
  }
  saveCurrentDoomscrollingWebsites();
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
