const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  assetPrefix: isProd ? "https://itchi.2024.13373333.one" : undefined,

  poweredByHeader: false,

  transpilePackages: ['@tabler/icons-react'],

  experimental: {
    optimizePackageImports: ["@tabler/icons-react"]
  },

  images: {
    loader: isProd ? "custom" : "default",
    domains: isProd ? ["itchi.2024.13373333.one"] : undefined,
    unoptimized: isProd ? undefined : true
  },
};

export default nextConfig;
