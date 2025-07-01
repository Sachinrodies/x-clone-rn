import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();
// Connect to database


app.get("/",(req,res)=>{
    res.send("Hello World");
});



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