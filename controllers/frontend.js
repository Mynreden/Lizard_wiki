import Lizard from "../models/LizardModel.js";
import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";
import translate from "google-translate-api";


const translateObject = async (obj) => {
    // Translate each field that needs translation
    console.log(obj._id)
    const translatedObj = {
        _id: obj._id,
        speciesName: await translateField(obj.speciesName),
        description: await translateField(obj.description),
        distribution: await translateField(obj.distribution),
        sizeAndWeight: await translateField(obj.sizeAndWeight),
        diet: await translateField(obj.diet),
        characteristics: await translateField(obj.characteristics),
        conservationStatus: await translateField(obj.conservationStatus),
        habitatType: await translateField(obj.habitatType),
        intrestingFacts: await translateArray(obj.intrestingFacts),
        taxonomy: {
            genus: await translateField(obj.taxonomy.genus),
            family: await translateField(obj.taxonomy.family),
        },
        externalLinks: obj.externalLinks,
        images: obj.images,
    };
    return translatedObj;
};

// Function to translate an array of strings
const translateArray = async (arr) => {
    if (!arr){
        return;
    }
    return Promise.all(arr.map((text => translateField(text))))
};


// Function to translate a single field
const translateField = async (field) => {
    try {
        const url = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyA9aXTkvlGGuCLsvihiGBK-AXYVsjHUg3U';
        const message = {
            q: field,
            source: 'en',
            target: 'ru'
        };
        const trans_res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let trans = await trans_res.json()
        return trans.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating field:', field);
        return field; // Return the original field if translation fails
    }
};


export const mainPage = async (req, res) => {
    try {
        let text = {
            welcome: "Welcome to Lizard Hub",
            more: "Read More",
            gallery: "Open Photo Gallery"
        }

        const posts = await Lizard.find();
        if (req.query.lang){
            if (req.query.lang == 'rus'){
                text = {
                    welcome: "Добро пожаловать в библиотеку Ящерок",
                    more: "Читать больше",
                    gallery: "Открыть фото галерею"
                }
                const translatedPosts = await Promise.all(posts.map(async (post) => translateObject(post)))
                return res.render("main.ejs", {posts: translatedPosts, text});
            }

        }
        res.render("main.ejs", {posts, text});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const loginPage = async (req, res) => {
    try {
        console.log(req);
        res.render("login.ejs");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
function formatDate(date) {
    // Парсим дату
    const parsedDate = new Date(date);
    
    // Получаем день, месяц и год
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1; // Прибавляем 1, так как месяцы в JavaScript начинаются с 0
    const year = parsedDate.getFullYear();
    
    // Возвращаем строку в формате "день.месяц.год"
    return `${day}.${month}.${year}`;
}

export const postPage = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Lizard.findById(id);
        post.intrestingFacts = post._doc.intrestingFacts;
        post.originalName = post.speciesName;
        console.log(post.intrestingFacts)
        const comments = await Comment.find({lizardId: id})
        const formattedComments = comments.map(comment => ({
            ...comment._doc,
            formattedDate: formatDate(comment.createdAt) // Форматирование даты с использованием moment.js
        }));
        let text = {
            distribution: "Distribution:",
            size: "Size and Weight:",
            diet:"Diet:",
            characteristics:"Characteristics:",
            conservation:"Conservation Status:",
            habitat:"Habitat Type:",
            facts:"Interesting Facts:",
            links:"External Links:",
            gallery: "Open Photo Gallery",
            sightings: "Last Observations"
        }

        if (req.query.lang){
            if (req.query.lang == 'rus'){
                text = {
                    distribution: "Место Обитания:",
                    size: "Размер и Вес:",
                    diet:"Питание:",
                    characteristics:"Характеристики:",
                    conservation:"Природоохранный статус:",
                    habitat:"Тип среды обитания:",
                    facts:"Интересные Факты:",
                    links:"Внешние ссылки:",
                    gallery: "Посмотреть больше фото",
                    sightings: "Последние наблюдения"
                }
                const translatedPost = await translateObject(post);
                translatedPost.originalName = post.originalName;
                res.render("post.ejs", {post: translatedPost, comments: formattedComments, text});
            }

        }
        res.render("post.ejs", {post, comments: formattedComments, text});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const profilePage = async (req, res) => {
    try {
        res.render("profile.ejs");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const adminLoginPage = (req, res) => {
    try {
        res.render("adminLogin.ejs");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const adminPage = async (req, res) => {
    try {
        const users = await User.find();
        res.render("admin.ejs", {usersList: users});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}