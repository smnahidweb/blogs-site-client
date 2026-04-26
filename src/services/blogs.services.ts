
import { env } from "../env"


interface serviceOption {
    cache?:RequestCache
    revalidate?: number
}


interface getBlogsParams {
    isFeatured?: boolean;
    search?:string
}

export const blogsServices = {
    
    getBlogPosts: async function (params?:getBlogsParams,option:serviceOption) {

        const API_URL = env.API_URL
        
        const url = new URL(`${API_URL}/posts`)
       
        
        if(params){
            Object.entries(params).forEach( ([key,value])=>{
                if(value !== undefined && value !== null && value !==""){

                    url.searchParams.append(key,value)
                }
            } )
        }
        console.log(url.toString())

        const config : RequestInit = {}
        if(option?.cache){
            config.cache = option.cache
        }
        
        if(option?.revalidate){
           config.next = {revalidate : option.revalidate}
        }

        try {

            const result = await fetch( url.toString(),config )
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



},

getBlogPostById : async function(id:string){
const API_URL = env.API_URL;
    try{

        const result = await fetch(`${API_URL}/posts/${id}`)
        const data = await result.json()
        console.log(data)

        return {
            data:data , error:{
                err:null
            }
        }

    }

    catch(err){
        return{
            data:null,error:{
                err:"Somethinks is wrong"
            }
        }
    }

}

}