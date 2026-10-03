import type { NextConfig } from "next";

/**
 * The site ships as a static export so it can be hosted on GitHub Pages or
 * Cloudflare Pages today. When a real backend (auth, payments, AI APIs) is
 * connected, remove `output: "export"` and deploy to a Node-capable host.
 *
 * NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow when the site is
 * served from a sub-path (https://<user>.github.io/<repo>/).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
