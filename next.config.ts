import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Static site for GitHub Pages: no proxy, server actions or request-time data.
  output: "export",
  trailingSlash: true,
  // No image server on GitHub Pages: logos ship as the files in src/assets.
  images: { unoptimized: true },
  // Set by the deploy workflow. Empty on a custom domain and in local development.
  basePath: process.env.BASE_PATH || undefined,
  experimental: {
    // The app has several root layouts, so the 404 page can't reuse one of them.
    globalNotFound: true,
  },
  // Off on purpose: pages use next-intl's static rendering, and partner-only
  // prices must never pass through a shared component cache.
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
