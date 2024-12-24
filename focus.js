let tracked_websites = [];

function add_tracked_website() {
    const website = document.getElementById("website_to_track");
    tracked_websites.push(website.value);
    
    console.log(tracked_websites);
}

function display_tracked_websites() {
    let list = document.getElementById("Tracked Websites");

    tracked_websites.forEach((website_name) => {
        let li = document.createElement("li");
        li.innerText = website_name;
        list.appendChild(li);
    })
}