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