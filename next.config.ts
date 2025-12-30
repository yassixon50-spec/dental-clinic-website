import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow remote images from common hosts used in the project
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/1200x/**",
      },
    ],
  },
};

export default nextConfig;
