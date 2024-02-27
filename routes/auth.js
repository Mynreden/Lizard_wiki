import { Router } from "express";
import { login, register } from "../controllers/auth.js"
import multer from "multer";
import path from "path";

const router = Router()
const name = process.cwd();


// Routes
router.post('/register', register) // route for registration
router.post("/login", login) // that controller will work in localhost:3001/auth/login

export default router;
