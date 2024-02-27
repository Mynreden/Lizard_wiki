document.getElementById("navbarDropdown").innerHTML = JSON.parse(localStorage.getItem("user")).username

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
