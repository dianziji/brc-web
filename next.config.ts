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

  async redirects() {
    return [
      {
        source: "/zh/index.php/:path*",
        destination: "https://archive.bethelrc.org/zh/index.php/:path*",
        permanent: true,
      },
      {
        source: "/index.php/:path*",
        destination: "https://archive.bethelrc.org/index.php/:path*",
        permanent: true,
      },
      {
        source: "/images/:path*",
        destination: "https://archive.bethelrc.org/images/:path*",
        permanent: true,
      },
      {
        source: "/music/:path*",
        destination: "https://archive.bethelrc.org/music/:path*",
        permanent: true,
      },
    ];
  },
};





export default nextConfig;
