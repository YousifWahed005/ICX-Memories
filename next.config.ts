import type { NextConfig } from "next";

// Allow next/image to load from Supabase Storage (your project's own
// storage domain) and from picsum.photos (used by the sample seed data —
// safe to remove once you replace the placeholders with real photos).
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
