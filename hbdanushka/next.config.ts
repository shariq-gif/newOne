import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      'plus.unsplash.com',
      'w0.peakpx.com',
      'res.cloudinary.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
