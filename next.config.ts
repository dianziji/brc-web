import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "newbethelrc.org",
      },
      {
        protocol: "https",
        hostname: "newbethelrc.org",
      },
      {
        protocol: "http",
        hostname: "www.newbethelrc.org",
      },
      {
        protocol: "https",
        hostname: "www.newbethelrc.org",
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
