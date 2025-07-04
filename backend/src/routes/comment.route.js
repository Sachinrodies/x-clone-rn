import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment, deleteComment, getComments } from "../controllers/comment.controller.js";
const router=express.Router();
//public
router.get("/post/:postId",getComments)

//protected
router.post("/post/:postId",protectRoute,createComment)
router.delete("/:commentId",protectRoute,deleteComment)

export default router;