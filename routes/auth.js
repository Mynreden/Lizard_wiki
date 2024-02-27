import { Router } from "express";
import { login, register } from "../controllers/auth.js"
import multer from "multer";
import path from "path";

const router = Router()
const name = process.cwd();
// upload files
const storage = multer.diskStorage({ // in this line we define Strorage for multer
    destination: (req, file, callback) => {
        callback(null, "public/avatars") // callback(err: Error, destination: String)
    },
    filename: (req, file, callback) => {
        const filename = Date.now() + '-' + file.originalname; // создаем новое имя файла, добавляя к оригинальному имени дату создания
        callback(null, filename); // передаем новое имя файла в callback
    }

})

export const upload = multer({storage}) // multer middlware uses form data files and transform it into req.file(upload.sindle()) 
                                 // or req.files(upload.array())


// Routes
router.post('/register', upload.single('avatar'),  register) // route for registration
router.post("/login", login) // that controller will work in localhost:3001/auth/login

export default router;
