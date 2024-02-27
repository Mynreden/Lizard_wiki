import { Router } from "express";
import multer from "multer";
import path from "path";
import {addLizard} from "../controllers/lizard.js"
import { upload } from "./auth.js";

const router = Router()
const name = process.cwd();

router.post("/", upload.array('images', 5) ,addLizard)


export default router;
