import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.igdb.com"
      }
    ]
  }
};

export default nextConfig;
