const route = "/user/login";

async function login(user) {
    if(user.username.length < 4 || user.username.length > 25) {
        //Njakuv pop up mozhe tuka
        return;
    }

    console.log("asdf")

    let query = queryStringParams(route, [["username", user.username.innerHTML], ["password", user.password.innerHTML]])

    let response = await getFromRoute(query);

    console.log(response);
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