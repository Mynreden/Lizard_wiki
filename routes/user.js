import { Router } from "express";
import { getUser, getAllUsers, changeUser, updateUser, userToAdmin, deleteUser} from "../controllers/user.js"
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "./auth.js";

const router = Router()

router.get("/:id", getUser)
router.get("/", getAllUsers)
router.put("/:id", verifyToken, upload.single('avatar'), changeUser)
router.post("/update", updateUser)
router.post("/userToAdmin", userToAdmin)
router.delete("/delete/:userId", deleteUser)


export default router;
