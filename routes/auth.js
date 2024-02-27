import { Router } from "express";
import { login, register } from "../controllers/auth.js"
import multer from "multer";
import MulterGoogleStorage from "multer-google-storage"
import path from "path";    

const router = Router()
const name = process.cwd();
// upload files

export const upload = multer({
    storage: MulterGoogleStorage.storageEngine({
        autoRetry: true,
        projectId: 'x-cycling-385905',
        keyFilename: './x-cycling-385905-9584923dc92c.json', // Укажите путь к вашему файлу ключа службы
        bucket: 'lizard_app',
        filename: (req, file, callback) => {
            const filename = Date.now() + '-' + file.originalname; // создаем новое имя файла, добавляя к оригинальному имени дату создания
            console.log('Filename:', filename); // добавляем логирование имени файла

            callback(null, filename); // передаем новое имя файла в callback
        }
    })
});
                                  
// Routes
router.post('/register',upload.single('avatar'), register) // route for registration
router.post("/login", login) // that controller will work in localhost:3001/auth/login

export default router;
