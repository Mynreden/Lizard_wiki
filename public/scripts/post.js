if (localStorage.getItem("lang") == "rus" && new URLSearchParams(window.location.search).get("lang") != "rus"){
    window.location.href = window.location.href + "?lang=rus"
}
const isAuth = !!localStorage.getItem("user")

let user = null;
let token = null;

if (isAuth){
    user = JSON.parse(localStorage.getItem("user"));
    token = localStorage.getItem("token");
    
    document.getElementById("forLogined").classList.remove('hidden')
    document.getElementById("forNotLogined").classList.add('hidden')

    document.getElementById("navbarDropdown").innerHTML = JSON.parse(localStorage.getItem("user")).username
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



const likePost = async (id) => {
    if (!isAuth){
        alert("You need to log in!")
        return;
    }
    const data = await fetch(`/comments/like/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
    }).then(a => a.json());
    if (data.error){
        console.log(data.error);
        alert('error occured');
    }
    if (data.comment){
        console.log(data)
        document.getElementById(`comment_${id}`).innerHTML = Object.keys(data.comment.likes).length;
    }
}

const commentForm = document.getElementById('commentForm');

commentForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    if (!isAuth){
        alert("You need to log in to add comments!");
        return;
    }
    const formData = new FormData(); // Создаем объект FormData из формы
    formData.append("user", JSON.stringify(user));
    formData.append("description", document.getElementById("commentDescription").value)
    
    const url = window.location.href;
    const parts = url.split('/'); // Разбиваем URL по символу '/'
    const lastPart = parts[parts.length - 1]; // Получаем последний элемент массива
    try {
        const response = await fetch(`/comments/${lastPart.split('?')[0]}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        if (data.error){
            console.log(data.error);
            alert('error occured');
        }
        console.log('Created comment:', data.comment);
        // Здесь вы можете выполнить дополнительные действия, например, обновить интерфейс с новым комментарием
    } catch (error) {
        console.error('Error creating comment:', error.message);
        // Обработка ошибки создания комментария
    }
});

function openLizardGallery(name) {
    // Выполнение запроса к API Unsplash
    name = name.replace(/ /g, '%20');

    fetch(`https://api.unsplash.com/photos/random?query=${name}&count=10&client_id=aePA3xftlHDFjLyBEctOA4XGSAbY45_1Z3Oh-OozF1Y`)
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

const getLizardSightings = async (speciesName) => {
    try {
        // Clear the container before loading new data
        const sightingsContainer = document.getElementById('sightingsContainer');
        sightingsContainer.innerHTML = '';

        // Fetch lizard sightings data from iNaturalist API
        const response = await fetch(`https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(speciesName)}&order_by=desc&per_page=10`);
        const data = await response.json();

        // Display lizard sightings in the modal
        data.results.forEach(observation => {
            const sighting = document.createElement('div');
            sighting.classList.add('card', 'mb-3', 'w-75');
            sighting.innerHTML = `
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${observation.photos[0].url}" class="card-img" alt="Lizard Photo">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${observation.taxon.preferred_common_name || observation.taxon.name}</h5>
                            <p class="card-text">Location: ${observation.place_guess || 'Unknown'}</p>
                            <p class="card-text">Date: ${new Date(observation.observed_on).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            `;
            sightingsContainer.appendChild(sighting);
        });

        // Open the modal
        $('#sightingsModal').modal('show');
    } catch (error) {
        console.error('Error fetching lizard sightings:', error);
    }
};

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