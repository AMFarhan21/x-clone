import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,

  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "1gb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ozfkyxpriggquchkynzo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: ['lh3.googleusercontent.com']
  },
};

export default nextConfig;
