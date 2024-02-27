const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
document.getElementById("navbarDropdown").innerHTML = user.username;

const getUserInfo = async (id) => {
    const data = await fetch(`users/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`,
         "Content-Type": "application/json" },
    }).then(res => res.json())
    if (!data.user) {
        alert("incorrect data")
        console.log(data)
        return
    }
    renderUserInfo(data.user);
}

const renderUserInfo = (user) => {
    document.getElementById('imageContainer').innerHTML = `<img src="/public/avatars/${user.picturePath}" class="w-40 h-40 rounded-full border-4 border-blue-500" alt="User Avatar">`;
    document.getElementById('usernameContainer').innerHTML = user.username;
    document.getElementById('emailContainer').innerHTML = user.email;
    document.getElementById('locationContainer').innerHTML = user.location;

}

renderUserInfo(user);



document.getElementById('formEdit').addEventListener('submit', async function(event) {
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
    if (avatar){
        formData.append('avatar', avatar);
    }
    // Send AJAX request to server
    const data = await fetch(`/users/${user._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`},
        body: formData,
    })
    .then(response => response.json())
    if (!data.user){
        alert("Error occured")
        console.log(data.error);
        return;
    }
    console.log(data)
    localStorage.setItem("user", JSON.stringify(data.user))
    window.location.replace("/profile")
});

const renderFormUser = () =>{
    document.getElementById('email').value = user.email;
    document.getElementById('username').value = user.username;
    document.getElementById('location').value = user.location;
}

const logout = () => {
    localStorage.clear();
    window.location.replace("/login")
} 


const toogleDropdown = () => {
    console.log("dsfsdf");
    const drop = document.getElementById('accountDropdown');
    if (drop.classList.contains('hidden')){
        drop.classList.remove("hidden")
    } else {
        drop.classList.add('hidden');
    }
} 