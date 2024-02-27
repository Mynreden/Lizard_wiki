import Lizard from "../models/LizardModel.js";

export const addLizard = async (req, res) => {
    if (!req.files){
        req.files = []
    }
    try {
        const newLizard = new Lizard({
        speciesName: req.body.speciesName,
        description: req.body.description,
        images: req.files.map(file => file.filename), // Получаем имена загруженных файлов
        distribution: req.body.distribution,
        sizeAndWeight: req.body.sizeAndWeight,
        diet: req.body.diet,
        characteristics: req.body.characteristics,
        conservationStatus: req.body.conservationStatus,
        habitatType: req.body.habitatType,
        intrestingFacts: req.body.intrestingFacts, // Разбиваем строку на массив интересных фактов
        taxonomy: {
            genus: req.body.taxonomy.genus,
            family: req.body.taxonomy.family
        },
        externalLinks: req.body.externalLinks // Разбиваем строку на массив внешних ссылок
    });

    // Сохраняем объект ящерицы в базе данных
    newLizard.save()
        .then(savedLizard => {
            res.status(201).json({lizard: savedLizard}); // Отправляем ответ с сохраненным объектом ящерицы
        })
        .catch(err => {
            res.status(400).json({ message: err.message }); // Если произошла ошибка, отправляем сообщение об ошибке
        });

    } catch(err){
        console.log(err);
        res.status(500).json({error: err.message})

    }
}


export const getGallery = async (req, res) =>{
    try {
        const name = req.query.name;
        const data = await fetch(`https://api.unsplash.com/photos/random?query=${name}&count=10&client_id=aePA3xftlHDFjLyBEctOA4XGSAbY45_1Z3Oh-OozF1Y`)
        .then(response => response.json())
        res.status(200).json({data})
    } catch(err){
        console.log(err);
        res.status(500).json({error: err.message})

    }
}

export const getSightings = async (req, res) =>{
    try {
        const name = req.query.name;
        const data = await fetch(`https://api.inaturalist.org/v1/observations?taxon_name=${name}&order_by=desc&per_page=10`)
        .then(res => res.json());
        res.status(200).json({data})
    } catch(err){
        console.log(err);
        res.status(500).json({error: err.message})

    }
}