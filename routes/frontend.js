import { Router } from "express";
import { loginPage, mainPage, postPage, profilePage, adminLoginPage, adminPage} from "../controllers/frontend.js"

const router = Router();

router.get("/", mainPage);
router.get("/login", loginPage);
router.get("/posts/:id", postPage)
router.get('/profile', profilePage)
router.get("/admin/login", adminLoginPage);
router.get("/admin", adminPage);

// router.get("/user/:id", findChat);
// router.get("/country/", findChat);
// router.get("/lizard/:id", findChat);
// router.get("/category/:id", findChat);
// router.get("/category/", findChat);

export default router;
