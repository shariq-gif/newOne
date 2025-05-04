import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com','plus.unsplash.com','w0.peakpx.com'],
  },

};

export default nextConfig;
