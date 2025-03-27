import type { NextConfig } from "next";

const nextConfig = {
    experimental: {
        //appDir: true,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
            },
          ],
    }
};

export default nextConfig;
