import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build (out/) — deploys to Vercel, Netlify or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
