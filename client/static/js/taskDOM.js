function openTask(){
    document.getElementById("task-create").style.display = "inline";
    document.getElementById("task-create").style.display = "inline";
}

function closeTask() {
    document.getElementById("task-create").style.display = "none";
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-reward").value = "";
}

function createTask(){
    let title = document.querySelector("#task-title");
    let desc = document.querySelector("#task-desc");

    adPublish(title.value, desc.value);
    document.getElementById("task-create").style.display = "none";
    document.getElementById("task-title").value = "";
    document.getElementById("task-reward").value = "";
}

async function openTaskMenu(thisTask) {
    
    if (map.getLayer("route")) {
        map.removeLayer("route");
        map.removeSource("route")
    }

    taskOnFocus = thisTask;

    let obj = taskOnFocus.querySelector("#text2");

    let marker = {
        lon: obj.getAttribute("locationlong"),
        lat: obj.getAttribute("locationlat")
    };

    obj.classList.remove("container-text");
    obj.classList.add("container-text-break");

    prevMarker = placeMarker(map, marker);

    coords = await getCoords()

    var long = coords.longitute;
    var lat = coords.latitude;

    currPos = new tt.Marker({
        dragable : false
    })
    .setLngLat([coords.longitude, lat])

    makeRoute(map, currPos, prevMarker)
    document.getElementById("task-accept").style.display = "inline";
}

function closeTaskMenu() {
    let obj = taskOnFocus.querySelector("#text2");
    taskOnFocus = null;

    obj.classList.remove("container-text-break");
    obj.classList.add("container-text");

    if(prevMarker) prevMarker.remove();
    document.getElementById("task-accept").style.display = "none";
}

function acceptTask() {
    let obj = taskOnFocus.querySelector("#text2");

    if(prevMarker) prevMarker.remove();
    document.getElementById("task-accept").style.display = "none";

    obj.classList.remove("container-text-break");
    obj.classList.add("container-text");

    let taskId = taskOnFocus.getAttribute("task-id");
    taskOnFocus = null;

    //Send request to server
}