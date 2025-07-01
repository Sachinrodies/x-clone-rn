import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getNotifications,deleteNotification } from "../controllers/notification.controller.js";
const router=express.Router();

//public
router.get("/",protectRoute,getNotifications)

//protected
router.delete("/:notificationId",protectRoute,deleteNotification)

export default router;