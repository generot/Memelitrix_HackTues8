function Open_Close_Description(obj,text){
    console.log(obj);
    if(obj.classList.contains("container-text")){
        obj.classList.remove("container-text")
        obj.classList.add("container-text-break")
    }else{
        obj.classList.remove("container-text-break")
        obj.classList.add("container-text")
    }
}

function adCreate(title, desc) {
    const template = `
    <div class = "adds-small-container">
        <title>${title}</title>
        <button class="hidden-button"  onclick="Open_Close_Description(document.getElementById('text2'))">${title}</button>
        <div class="container-text" id="text2" name="deaznam">
                <span>${desc}</span>
        </div>
    </div>
    `

    let tmp = document.createElement("template");
    let container = document.querySelector("#bigCont");

    tmp.innerHTML = template;
    container.appendChild(tmp.content.firstElementChild);
}

async function adPublish(title_, desc_) {
    const route = "/ads/add";
    const KURdinati = await pishka();
    const user = JSON.parse(window.localStorage.getItem("user"));

    adCreate(title, desc);

    sendToRoute({
        title: title_,
        description: desc_,
        id: user.id,
        location: [KURdinati.longitute, KURdinati.latitude]
    }, route);
}