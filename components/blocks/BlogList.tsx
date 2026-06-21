"use client";

import { useState } from "react";
import { Tabs } from "@/components/ds/Tabs";
import { BlogPostCard } from "./BlogPostCard";
import { BLOG_CATEGORIES, type Post } from "@/data/posts";
import { img } from "@/data/images";

/**
 * BlogList — category tabs + responsive post grid, client-side filtered.
 */
export function BlogList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("all");
  const visible = posts.filter((p) => cat === "all" || p.cat === cat);

  return (
    <>
      <div style={{ borderBottom: "1px solid var(--color-outline-variant)", marginBottom: 28 }}>
        <Tabs tabs={BLOG_CATEGORIES} value={cat} onChange={setCat} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((p) => (
          <BlogPostCard
            key={p.slug}
            title={p.title}
            excerpt={p.excerpt}
            category={p.category}
            date={p.date}
            read={p.read}
            subject={p.subject}
            alt={p.alt}
            src={img(`blog:${p.slug}`)}
            href={`/blog/${p.slug}`}
          />
        ))}
      </div>
    </>
  );
}

export default BlogList;
