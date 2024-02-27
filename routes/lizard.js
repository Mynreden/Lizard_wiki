import { Router } from "express";
import multer from "multer";
import path from "path";
import {addLizard} from "../controllers/lizard.js"
const router = Router()
const name = process.cwd();
// upload files
const storage = multer.diskStorage({ // in this line we define Strorage for multer
    destination: (req, file, callback) => {
        callback(null, "public/lizards") // callback(err: Error, destination: String)
    },
    filename: (req, file, callback) => {
        const filename = Date.now() + '-' + file.originalname; // создаем новое имя файла, добавляя к оригинальному имени дату создания
        callback(null, filename); // передаем новое имя файла в callback
    }

})

const upload = multer({storage}) // multer middlware uses form data files and transform it into req.file(upload.sindle()) 
                                 // or req.files(upload.array())



router.post("/", upload.array('images', 5) ,addLizard)


export default router;
