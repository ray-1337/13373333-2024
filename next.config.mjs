import { stripIndents } from 'common-tags';

const isProd = process.env.NODE_ENV === "production";

const cdnEndpoint = "itchi.2024.13373333.one";

const cspHeader = stripIndents(`
  default-src 'self';
  script-src 'self' https://static.cloudflareinsights.com/beacon.min.js https://${cdnEndpoint} ${!isProd ? "'unsafe-eval'" : ""};
  style-src 'self' https://fonts.googleapis.com/css2 https://${cdnEndpoint} 'unsafe-inline' ${!isProd ? "'unsafe-eval'" : ""};
  img-src 'self' https://${cdnEndpoint} https://cdn.simpleicons.org https://i.ytimg.com/vi/;
  font-src 'self' https://fonts.gstatic.com/s/ https://${cdnEndpoint};
  media-src 'self' https://${cdnEndpoint};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src https://www.youtube-nocookie.com/;
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`);

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
    unoptimized: true // isProd ? undefined : true
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
