import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "archive.bethelrc.org",
      },
      {
        protocol: "http",
        hostname: "bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "bethelrc.org",
      },
      {
        protocol: "http",
        hostname: "www.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "www.bethelrc.org",
      },
      {
        protocol: "http",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },

    ],
  },
};





export default nextConfig;
