import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newbethelrc.org",
      },
      {
        protocol: "https",
        hostname: "www.newbethelrc.org",
      },
      {
        protocol: "https",
        hostname: "bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "www.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
    ],
  },
};

export default nextConfig;
