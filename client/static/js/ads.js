function adCreate(taskJson, deletable = false) {
    const template = `
    <div class = "adds-small-container">
        <!--<title id="ad-title">${taskJson.title}</title>-->
        <button class="hidden-button task-open-button" onclick="openTaskMenu(this.parentElement);" id="title">${taskJson.title}</button>\n`
        +
        (deletable ? `<button class="hidden-button" style="float:right;vertical-align:text-top;font-size: 1.2em;top:-100px;text-decoration:none !important;color:#F83939 !important;" onclick="adRemove(this)">X</button>\n`
                  : `\n`)
        +
        `<div class="container-text" id="text2" name="deaznam" locationlong="${taskJson.location[0]}" locationlat=${taskJson.location[1]}>
            <span>${taskJson.description}</span>        
        </div>
    </div>
    `

    let tmp = document.createElement("template");
    let container = document.querySelector("#bigCont");

    tmp.innerHTML = template;
    tmp.content.firstElementChild.setAttribute("task-id", taskJson.id);
    
    container.appendChild(tmp.content.firstElementChild);
}

async function adRemove(ad) {
    const route = "/tasks/remove";
    let user = JSON.parse(window.localStorage.getItem("user"));

    console.log(ad.parentElement);

    let parent = ad.parentElement;
    let title_ = parent.querySelector("#title").innerHTML;
    console.log(title_);

    if(!user) {
        return null;
    }

    parent.remove();

    let resp = await sendToRoute({
        title: title_,
        uid: user["id"]
    }, route);
}

async function adFetch() {
    const route = "/tasks/get";

    let user = JSON.parse(window.localStorage.getItem("user"));
    let jsonObj = await getFromRoute(route);

    if(!user) {
        alert("You're not logged in.");
        return null;
    }

    if(jsonObj.code != 200) {
        alert("Internal server error.");
        return null;
    }

    let ads = jsonObj.ads;

    for(let i of ads) {
        //adCreate(i.title, i.description, [... i.location], i.id == user.id);
        adCreate(i, i.uid == user.id);
    }
}

async function adPublish(title_, desc_) {
    const route = "/tasks/add";
    const geocoords = await getCoords();
    const user = JSON.parse(window.localStorage.getItem("user"));

    if(!user) {
        return null;
    }

    let coords = [geocoords.longitude, geocoords.latitude];

    let response = await sendToRoute({
        title: title_,
        description: desc_,
        uid: user.id,
        location: coords
    }, route);

    let jsonBody = await response.json();
    adCreate(jsonBody["adObject"], true);
}