import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
const app = express();
// Connect to database
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())



app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

//error handling middleware
app.use((err,req,res)=>{
    console.error("unhandled error",err);
    res.status(500).json({error:err.message||"Internal server error"});
})



async function startServer() {
    try {
        await connectDB();
        
        app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }
    
    startServer();