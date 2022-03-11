const route = "/user/login";

async function login(user) {
    if(user.text.length < 4 || user.text.length > 25) {
        //Njakuv pop up mozhe tuka
        return;
    }

    let query = queryStringParams(route, [["username", user.uname], ["password", user.pswrd]])

    await getFromRoute(query);
}