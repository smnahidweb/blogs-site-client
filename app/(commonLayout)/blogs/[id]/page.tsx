import { BlogData } from "@/src";
import { blogsServices } from "@/src/services/blogs.services";


interface PageProps {
  params: Promise<{ id: string }>;
}


export async function generateStaticParams(){


    const { data } = await blogsServices.getBlogPosts(
      {
        isFeatured: false,
        search: "",
      },
      { cache: "no-store" }
    );

    return data?.data?.map((blog: BlogData) => ({ id: blog.id })).splice(0, 3);
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;
  
  // getBlogPostById may return data or null when not found
  const { data: blog } = await blogsServices.getBlogPostById(id);
  console.log(blog)
 console.log(id)
  if (!blog) {
    return <div className="p-10 text-center">Blog post not found.</div>;
  }

  return (
    <article className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span>By Author: {blog.authorId}</span>
          <span>•</span>
          <time>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{blog.views} views</span>
        </div>
      </header>

      {/* Featured Image */}
      {blog.thumbnail && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img 
            src={blog.thumbnail} 
            alt={blog.title} 
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Tags */}
      <div className="flex gap-2 mb-6">
        {blog.tags.map((tag: string) => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        {/* If content is HTML, use dangerouslySetInnerHTML. If it's plain text, just render it */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Stats Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex gap-6 text-sm text-gray-600">
          <span>Likes: {blog._count.likes || 0}</span>
          <span>Comments: {blog._count.comments || 0}</span>
        </div>
      </footer>
    </article>
  );
}