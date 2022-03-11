function editAfterLogin() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let loginBtn = document.querySelector("#login_drop");
    let registerBtn = document.querySelector("#register_drop");

    if(user) {
        console.log("Name defined...");

        loginBtn.innerHTML = user.username;

        registerBtn.innerHTML = "Sign out";
        registerBtn.signOut = true;
        registerBtn.setAttribute("href", "");
        registerBtn.setAttribute("onclick", `
            window.localStorage.clear();
            window.location.replace("/");
        `);
    }
}