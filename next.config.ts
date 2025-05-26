import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    TEMP_EMAIL: process.env.NEXT_PUBLIC_TEMP_EMAIL,
    TEMP_PASSWORD: process.env.NEXT_PUBLIC_TEMP_PASSWORD,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
