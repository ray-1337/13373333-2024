/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  assetPrefix: process.env.NODE_ENV === "production" ? "https://itchi.2024.13373333.one" : undefined,

  poweredByHeader: false,

  transpilePackages: ['@tabler/icons-react'],

  experimental: {
    optimizePackageImports: ["@tabler/icons-react"]
  }
};

export default nextConfig;
