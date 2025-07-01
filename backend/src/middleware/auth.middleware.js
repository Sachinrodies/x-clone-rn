import { getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
        const { userId } = getAuth(req);
      if (!userId) {
           return res.status(401).json({ error: "Unauthorized" });
       }
       next();
    }