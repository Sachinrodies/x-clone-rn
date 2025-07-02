import { useState } from "react"
import { useSSO } from "@clerk/clerk-expo"
import { Alert } from "react-native";

export const useSocialAuth = () => {
    const [isLoading,setIsLoading] = useState(false)
    const {startSSOFlow} =useSSO();
    const handleSocialAuth=async(startegy:"oauth_google" | "oauth_apple")=>{
        setIsLoading(true)
        try{
            const {createdSessionId,setActive} = await startSSOFlow({strategy:startegy});
            if(createdSessionId && setActive){
                await setActive({session:createdSessionId})
            }

        }catch(error){
            console.log("Error in social auth",error)
            const provider=startegy==="oauth_google" ? "google" : "apple"
            Alert.alert("Error",`Failed to sign in with ${provider}`)
           

        }
        finally{
            setIsLoading(false)

        }

    }


    return {isLoading,handleSocialAuth}

}