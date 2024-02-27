const user = localStorage.getItem("user");
if (user){
    window.location.replace("/");
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
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
    localStorage.setItem("lang", "eng")

    window.location.replace("/")
})

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const location = document.getElementById('location').value;
    const avatar = document.getElementById('formFile').files[0]; // Assuming only one file is selected

    // Construct FormData object to send form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('location', location);
    formData.append('avatar', avatar);

    // Send AJAX request to server
    const data = await fetch('/auth/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    if (!data.user){
        alert("Error occured")
        console.log(data.error);
        return;
    }
    console.log(data)
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
    localStorage.setItem("lang", "eng")

    window.location.replace("/")
});



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
