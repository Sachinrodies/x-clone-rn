import {aj} from "../config/arcjet.js";
import {getAuth} from "@clerk/express";


//Arcjet middleware for rate limiting,bot protection and security

export const arcjetMiddleware=async(req,res,next)=>{
    try{
        await aj.protect(req,{
            requested:1,// each request consumes 1 token
        });
        //handled denied requests
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    error:"Too many requests,please try again later",
                    message:"You have exceeded the rate limit. Please try again later."
                });
            }else if(decision.reason.isBot()){
                return res.status(403).json({
                    error:"Access denied. Bots are not allowed.",
                    message:"Access denied. Bots are not allowed."
                });
            }else{
                return res.status(403).json({
                    error:"Forbidden",
                    message:"Access denied. Please contact support if you believe this is an error."
                });
            }
        }
       if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
        return res.status(403).json({
            error:"Access denied. Bots are not allowed.",
            message:"Access denied. Bots are not allowed."
        });
       }
       next();
    }catch(error){
        console.error("Arcjet protection error:",error);
        next();
    }

}
