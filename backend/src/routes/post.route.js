import express from "express";
import { getPosts, getPost, getUserPosts ,createPost,likePost,deletePost} from "../controllers/post.controller.js";
const router=express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
//Public routes
router.get("/",getPosts)
router.get("/:postId",getPost)
router.get("/user/:username",getUserPosts)


//Protected routes
router.post("/",protectRoute,upload.single("image"),createPost)
router.post("/:postId/like",protectRoute,likePost)
router.delete("/:postId",protectRoute,deletePost)





export default router;
