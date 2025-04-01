import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },
};

export default nextConfig;
