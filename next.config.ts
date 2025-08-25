import type { NextConfig } from "next";

// API routes (like /api/contact) require a server runtime,
// so we remove static export to avoid build errors.
const nextConfig: NextConfig = {

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
