import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, _context) => {
    config.resolve.alias[""] = path.join(__dirname, "src");
    return config;
  },
};

export default nextConfig;
