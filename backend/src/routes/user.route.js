import express from "express";
import { getCurrentUser, getUserProfile, syncUser, updateUserProfile, followUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";



const router=express.Router();
//public route
router.get("/profile/:username",getUserProfile)

//protected routes
router.post("/sync",protectRoute,syncUser)
router.post("/me",protectRoute,getCurrentUser)

router.put("/profile",protectRoute,updateUserProfile)
router.post("/follow/:targetUserId",protectRoute,followUser)




export default router;

