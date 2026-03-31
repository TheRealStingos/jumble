import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.igdb.com",
      },
      {
        hostname: "ypxbjlmqgaznjimmawxp.supabase.co",
      },
    ],
  },
}

export default nextConfig
