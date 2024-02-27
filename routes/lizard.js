import { Router } from "express";
import multer from "multer";
import path from "path";
import {addLizard} from "../controllers/lizard.js"
const router = Router()
const name = process.cwd();


router.post("/",addLizard)


export default router;
