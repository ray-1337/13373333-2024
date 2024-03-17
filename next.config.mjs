const isProd = process.env.NODE_ENV === "production";

const cdnEndpoint = "itchi.2024.13373333.one";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  assetPrefix: isProd ? "https://" + cdnEndpoint : undefined,

  poweredByHeader: false,

  transpilePackages: ['@tabler/icons-react'],

  experimental: {
    optimizePackageImports: ["@tabler/icons-react"]
  },

  images: {
    loader: isProd ? "custom" : "default",
    domains: isProd ? [cdnEndpoint] : undefined,
    unoptimized: isProd ? undefined : true
  },
};

export default nextConfig;
