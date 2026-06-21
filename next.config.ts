import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project (a stray lockfile lives higher up).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // PhotoSlot/MapSlot render CSS placeholders today; when real photography is
    // supplied (local /public or a CDN), add its host here.
    remotePatterns: [],
  },
};

export default nextConfig;
