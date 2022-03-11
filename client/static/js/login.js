const route = "/user/login";

async function login(form) {
    let user = {
        username: form.querySelector("#usernm").value,
        password: form.querySelector("#pass").value
    }

    if(user.username.length < 4 || user.username.length > 25) {
        //Njakuv pop up mozhe tuka
        return;
    }

    let query = queryStringParams(route, [["username", user.username], ["password", user.password]]);

    let response = await getFromRoute(query);
    response = await response.json();

    let code = response["code"];
    let message = response["message"];

    if(code == 200){
        window.location.replace("/");
    }else{
        if(message == "Wrong password"){
            //kod za greshna parola
            window.location.replace("/login");
        }else if(message == "User not found"){
            //kod za greshen username
            window.location.replace("/login");
        }
    }
    
}