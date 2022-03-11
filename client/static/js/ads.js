function Open_Close_Description(obj,text){
    if(prevMarker) {
        prevMarker.remove();
        prevMarker = null;
    }

    obj = obj.querySelector("#text2");

    if(obj.classList.contains("container-text")){
        let marker = {
            lon: obj.getAttribute("locationlong"),
            lat: obj.getAttribute("locationlat")
        };

        prevMarker = placeMarker(map, marker);

        obj.classList.remove("container-text")
        obj.classList.add("container-text-break")
    }else{
        obj.classList.remove("container-text-break")
        obj.classList.add("container-text")
    }
}

function adCreate(title, desc, location, deletable = false) {
    const template = `
    <div class = "adds-small-container">
        <title id="ad-title">${title}</title>
        <button class="hidden-button"  onclick="Open_Close_Description(this.parentElement)" id="title">${title}</button>\n`
        +
        (deletable ? `<button class="hidden-button" style="float:right;vertical-align:text-top;font-size: 20px;top:-100px " onclick="adRemove(this)">X</button>\n`
                  : `\n`)
        +
        `<div class="container-text" id="text2" name="deaznam" locationlong="${location[0]}" locationlat=${location[1]}>
            <span>${desc}</span>                   
        </div>
    </div>
    `

    let tmp = document.createElement("template");
    let container = document.querySelector("#bigCont");

    tmp.innerHTML = template;
    
    container.appendChild(tmp.content.firstElementChild);
}

async function adRemove(ad) {
    const route = "/tasks/remove";
    let user = JSON.parse(window.localStorage.getItem("user"));

    console.log(ad.parentElement);

    let parent = ad.parentElement;
    let title_ = parent.querySelector("#ad-title").innerHTML;

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
        adCreate(i.title, i.description, [... i.location], i.id == user.id);
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

    adCreate(title_, desc_, coords, true);

    await sendToRoute({
        title: title_,
        description: desc_,
        id: user.id,
        location: coords
    }, route);
}