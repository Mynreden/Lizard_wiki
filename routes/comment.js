import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getCommentsByLizard, createComment, likeComment } from "../controllers/comment.js"
import multer from "multer"
const router = Router()

router.get('/:lizardId', getCommentsByLizard)
router.post('/:lizardId', verifyToken,  multer().none(), createComment)
router.patch('/like/:commentId',verifyToken, likeComment)
//router.delete('/:postId', )


export default router;
