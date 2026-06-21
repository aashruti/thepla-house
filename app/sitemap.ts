import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { KITCHENS } from "@/data/kitchens";
import { POSTS } from "@/data/posts";
import { AREAS } from "@/data/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPaths = [
    "/",
    "/menu",
    "/locations",
    "/about",
    "/catering",
    "/travel-packs",
    "/franchise",
    "/blog",
    "/gallery",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p === "/" ? "" : p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));

  for (const k of KITCHENS) {
    entries.push({ url: `${base}/locations/${k.slug}`, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const p of POSTS) {
    entries.push({ url: `${base}/blog/${p.slug}`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const a of AREAS) {
    entries.push({ url: `${base}/gujarati-food-delivery-${a.slug}`, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
