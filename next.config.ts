import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.igdb.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        hostname: "ypxbjlmqgaznjimmawxp.supabase.co",
      },
    ],
  },
}

export default nextConfig
