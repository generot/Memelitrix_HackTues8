function Open_Close_Description(obj,text){
    if(prevMarker) {
        prevMarker.remove();
        prevMarker = null;
    }

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

function adCreate(title, desc, location) {
    const template = `
    <div class = "adds-small-container">
        <title>${title}</title>
        <button class="hidden-button"  onclick="Open_Close_Description(document.getElementById('text2'))">${title}</button>
        <div class="container-text" id="text2" name="deaznam" locationlong="${location[0]}" locationlat=${location[1]}>
                <span>${desc}</span>
        </div>
    </div>
    `

    let tmp = document.createElement("template");
    let container = document.querySelector("#bigCont");

    tmp.innerHTML = template;
    container.appendChild(tmp.content.firstElementChild);
}

async function adFetch() {
    const route = "/tasks/get";
    let jsonObj = await getFromRoute(route);

    if(jsonObj.code != 200) {
        alert("Internal server error.");
        return null;
    }

    let ads = jsonObj.ads;

    for(let i of ads) {
        adCreate(i.title, i.description, [... i.location]);
    }
}

async function adPublish(title_, desc_) {
    const route = "/tasks/add";
    const KURdinati = await pishka();
    const user = JSON.parse(window.localStorage.getItem("user"));

    if(!user) {
        return null;
    }

    let coords = [KURdinati.longitude, KURdinati.latitude];

    adCreate(title_, desc_, coords);

    sendToRoute({
        title: title_,
        description: desc_,
        id: user.id,
        location: coords
    }, route);
}