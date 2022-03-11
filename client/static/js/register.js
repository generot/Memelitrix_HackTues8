const route = "/user/register"

async function register(form) {
	let user = {
		username: form.querySelector("#usernm").value,
		password: form.querySelector("#pass").value
	};

	let response = null;

	try {
		response = await sendToRoute(user, route);
	} catch(err) {
		console.log(err);
		return;
	}

	let obj = await response.json();

	if(obj["code"] == 200) {
		//Redirect to profile
		alert("Sign up successful.");
	} else {
		alert("User already exists.");
		window.location.replace("/register");
	}
}