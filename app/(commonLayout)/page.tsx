import BlogsCard from "@/components/modules/homePage/blogsCard";
import { BlogData } from "@/src";
import { blogsServices } from "@/src/services/blogs.services";

export default async function Home() {
  const result = await blogsServices.getBlogPosts({
    isFeatured: true,
    search:""
  });
  
  // কনসোলের অবজেক্ট থেকে আসল অ্যারেটি বের করে নিচ্ছি
  const blogList = result?.data?.data; 

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* এখানে blogList ব্যবহার করুন */}
        {blogList && blogList.length > 0 ? (
          blogList.map((post: BlogData) => (
            <BlogsCard key={post.id} blog={post} />
          ))
        ) : (
          <p className="text-slate-500">No blogs found.</p>
        )}
      </div>
    </main>
  );
}