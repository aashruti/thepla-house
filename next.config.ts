import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A verification build would otherwise overwrite .next underneath a running
  // `next dev`, leaving the dev server serving a half-deleted build (the page
  // loads without CSS, or 500s on a missing manifest). Set NEXT_DIST_DIR to
  // build into a scratch directory instead:
  //   NEXT_DIST_DIR=.next-verify npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Pin the file-tracing root to this project (a stray lockfile lives higher up).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // PhotoSlot/MapSlot render CSS placeholders today; when real photography is
    // supplied (local /public or a CDN), add its host here.
    remotePatterns: [],
  },
  // 301/308 legacy URLs from the previous site that Google still has indexed as
  // "Not found (404)" in Search Console — send their link equity to the live page
  // instead of dying on a 404.
  async redirects() {
    return [
      // Legacy static homepage.
      { source: "/index.html", destination: "/", permanent: true },
      // Old menu sub-category pages (/menu is a single page now).
      // Use :path+ (one-or-more) so the live /menu page itself is NOT redirected.
      { source: "/menu/:path+", destination: "/menu", permanent: true },
      // Removed blog post.
      { source: "/blog/tips-for-planning-a-menu", destination: "/blog", permanent: true },
      // Consolidate delivery landings that duplicate an established location
      // page. The location URL is the stronger destination for menu, hours,
      // directions and local-business signals.
      { source: "/gujarati-food-delivery-mulund", destination: "/locations/mulund", permanent: true },
      { source: "/gujarati-food-delivery-thane", destination: "/locations/thane", permanent: true },
      { source: "/gujarati-food-delivery-lower-parel", destination: "/locations/lower-parel", permanent: true },
      { source: "/gujarati-food-delivery-kandivali", destination: "/locations/kandivali", permanent: true },
    ];
  },
};

export default nextConfig;
