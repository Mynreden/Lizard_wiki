const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
if (user){
    if (user.isAdmin){
        window.location.replace("/admin");
    }
}

let loginForm = document.getElementById("loginForm")
let canLogin1 = false
let canLogin2 = false

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let username = document.getElementById("usernameIn").value
    let password = document.getElementById("passwordIn").value

    const data = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {
                    "Content-Type": "application/json",
                },

            })
            .then(response => response.json())
    if (!data.user){
        alert("incorrect password or username")
        console.log(data.error);
        return;
    }
    console.log(data)
    if (!data.user.isAdmin){
        alert("You have not admins rights")
        return
    }
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
    window.location.replace("/admin/")
})


function toogle() {
    console.log("fsdfds")
    sign_in = document.getElementById("sign_in")
    sign_up = document.getElementById("sign_up")

    if (sign_in.style.display === "none") {
        sign_in.style.display = "flex";
        sign_up.style.display = "none";
    } else {
        sign_in.style.display = "none";
        sign_up.style.display = "flex";
    }
    
}

function checkUsername() {
    username = document.getElementById("username").value
    checker = document.getElementById("usernameChecker")
    if (username.length < 5) {
        checker.innerHTML = "Username must be at least 5 characters long"
        return
    }
    else {
        checker.innerHTML = ""
        canLogin1 = true
    }
}

function checkPassword() {
    password = document.getElementById("password").value
    checker = document.getElementById("passwordChecker")
    if (password.length < 8) {
        checker.innerHTML = "Password must be at least 8 characters long"
        return
    }
    else if (!containInt(password)) {
        checker.innerHTML = "Password must contain at least one number"
        return
    }
    else {
        checker.innerHTML = ""
        canLogin2 = true
    }
}

let containInt = (str) => {
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            return true
        }
    }
    return false
}
