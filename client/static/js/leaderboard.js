function adCreate(taskJson, deletable = false) {
    let match = taskJson["taken_by"] == "";

    let contClass = match ? "adds-small-container" : "adds-small-container-taken";
    let btnClass = match ? "hidden-button" : "hidden-button-taken";
    let txtClass = match ? "container-text" : "container-text-taken";

    const template = `
    <div class = "${contClass}">
        <!--<title id="ad-title">${taskJson.title}</title>-->
        <button class="${btnClass} task-open-button" onclick="openTaskMenu(this.parentElement);" id="title" tl="${taskJson.title}">${taskJson.title}(${taskJson.reward} €)</button>\n`
        +
        (deletable ? `<button class="${btnClass}" style="float:right;vertical-align:text-top;font-size: 1.2em;top:-100px;text-decoration:none !important;color:#F83939 !important;" onclick="adRemove(this)">X</button>
        <button class="${btnClass}" style="float:right;vertical-align:text-top;font-size: 1.2em;top:-100px;text-decoration:none !important;color:#F83939 !important;" onclick="adRemove(this)">✓</button>\n`
                  : `\n`)
        +
        `<div class="${txtClass}" id="text2" name="deaznam" locationlong="${taskJson.location[0]}" locationlat=${taskJson.location[1]} takenby=${taskJson.taken_by}>
            <span>${taskJson.description}</span>        
        </div>
    </div>
    `

    let tmp = document.createElement("template");
    let container = document.querySelector("#bigCont");

    tmp.innerHTML = template;
    tmp.content.firstElementChild.setAttribute("task-id", taskJson.id);

    if(deletable) {
        let button = tmp.content.firstElementChild.querySelector("#title");
        button.setAttribute("onclick", "");
    }
    
    container.appendChild(tmp.content.firstElementChild);
}
async function usersFetch() {
    const route = "/users/fetch";

    let user = JSON.parse(window.localStorage.getItem("user"));
    let jsonObj = await getFromRoute(route);
    
    let ads = jsonObj.ads;
    let startloc = await getCoords();
    let startlocation = [startloc.longitude, startloc.latitude];

    ads = ads.sort((loc1, loc2)=>{
        let location1 = loc1.location;
        let location2 = loc2.location;

        let distance1 = getDistance(startlocation[0], startlocation[1], location1[0], location1[1]);
        let distance2 = getDistance(startlocation[0], startlocation[1], location2[0], location2[1]);

        return distance1 - distance2;
    });

    for(let i of ads) {
        adCreate(i, i.uid == user.id, user.id);
    }
}