import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Eye, User } from 'lucide-react';
import { BlogData } from '@/src';


interface BlogsCardProps {
  blog: BlogData;
}

const BlogsCard = ({ blog }: BlogsCardProps) => {
  // তারিখটি সুন্দরভাবে দেখানোর জন্য ফরম্যাট করে নিচ্ছি
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={blog.thumbnail || 'https://via.placeholder.com/400x200'} 
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {blog.isFeatured && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3">
          {blog.tags?.map((tag: string, index: number) => (
            <span key={index} className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/blogs/${blog.id}`}>
          <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
            {blog.title}
          </h3>
        </Link>

        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
          {blog.content}
        </p>

        {/* Footer Info */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{blog.views} views</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={12} className="text-slate-500" />
            </div>
            <span className="text-xs font-medium text-slate-700">Author ID: {blog.authorId.substring(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;