import type { NextConfig } from "next";
import "./src/env"
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // আপনার দেওয়া ইমেজের হোস্টনেম
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // অনেক সময় আনস্প্ল্যাশ এই সাবডোমেইন ব্যবহার করে
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
