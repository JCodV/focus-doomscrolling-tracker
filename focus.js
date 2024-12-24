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