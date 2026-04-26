import { blogsServices } from "../services/blogs.services"


export const getBlog = async()=>{

    return blogsServices.getBlogPosts(
      {
        isFeatured: false,
        search: "",
      },
      { cache: "no-store" }
    );
    

}
