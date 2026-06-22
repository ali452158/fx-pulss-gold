import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: Do NOT use output: "standalone" on Vercel — Vercel has its own
  // optimized build process. Standalone is only for self-hosting (Docker).
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Allow unoptimized images as fallback (useful when Vercel image optimizer
    // cannot process a file, e.g. format mismatch). This ensures images always
    // display even if optimization fails.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
