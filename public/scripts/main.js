if (localStorage.getItem("lang") == "rus" && new URLSearchParams(window.location.search).get("lang") != "rus"){
    window.location.href = window.location.href + "?lang=rus"
}
const isAuth = !!localStorage.getItem("user")

let user = null;
if (isAuth){
    user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("navbarDropdown").innerHTML = JSON.parse(localStorage.getItem("user")).username
    document.getElementById("forLogined").classList.remove('hidden')
    document.getElementById("forNotLogined").classList.add('hidden')

}

const logout = () => {
    localStorage.clear();
    window.location.replace("/login")
} 

const toogleDropdown = () => {
    if (!isAuth){
        window.location.href = '/login';
        return;
    }
    const drop = document.getElementById('accountDropdown');
    if (drop.classList.contains('hidden')){
        drop.classList.remove("hidden")
    } else {
        drop.classList.add('hidden');
    }
} 
const toggleLanguageDropdown = () => {
    const drop = document.getElementById('languageDropdown');
    if (drop.classList.contains('hidden')){
        drop.classList.remove("hidden")
    } else {
        drop.classList.add('hidden');
    }
}

const changeLanguage = (lang) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (lang == urlParams.get('lang') || (!urlParams.get('lang') && lang != 'rus')){
        console.log("skip")
        return;
    } else {
        localStorage.setItem("lang", lang)
        if (lang == "rus"){            
            window.location.href = window.location.href + "?lang=rus"
            
        } else{           
            window.location.href = window.location.href.split('?')[0]
        }
    }
}


function openLizardGallery() {
    // Выполнение запроса к API Unsplash
    fetch('https://api.unsplash.com/photos/random?query=lizard&count=10&client_id=aePA3xftlHDFjLyBEctOA4XGSAbY45_1Z3Oh-OozF1Y')
        .then(response => response.json())
        .then(data => {
            // Обработка полученных данных
            const galleryContainer = document.getElementById('galleryContainer');
            galleryContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых изображений
            data.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.regular;
                img.alt = 'Lizard Image';
                img.classList.add('gallery-img');
                galleryContainer.appendChild(img);
            });
            // Открытие модального окна
            $('#galleryModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching lizard images:', error);
        });
}
