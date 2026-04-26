import { error } from "console"
import { env } from "../env"
import { url } from "inspector";

interface getBlogsParams {
    isFeatured?: boolean;
    search?:string
}

export const blogsServices = {
    
    getBlogPosts: async function (params?:getBlogsParams) {

        const API_URL = env.API_URL
        
        const url = new URL(`${API_URL}/posts`)
        url.searchParams.append("key", "value")
        
        console.log("url Link ", url.toString())
        

        try {

            const result = await fetch( url.toString() )
            const data = await result.json()

            return {
                data: data,
                error:null
            }

        }
        catch (err) {
            return {
                data: null, error: {
                    err : "Somethinks is wrong"
                }
            }
        }



}





}