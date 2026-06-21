import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/components/blocks/BlogPostCard";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, blogPostingLd, breadcrumbLd } from "@/lib/seo";
import { POSTS, getPost, type Block } from "@/data/posts";
import { img } from "@/data/images";

// Only the posts listed in data/posts.ts get a path; everything else 404s.
// To add a new blog: add one entry to POSTS (and a cover in data/images.ts),
// and a fresh static path is generated for it at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const meta = pageMetadata({
    title: p.seoTitle || p.title,
    description: p.seoDescription || p.excerpt,
    path: `/blog/${p.slug}`,
    ogType: "article",
  });
  if (p.keywords) meta.keywords = p.keywords;
  return meta;
}

function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return <p style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", color: "var(--ink-600)", lineHeight: 1.7, margin: "0 0 1.1em" }}>{block.text}</p>;
    case "p":
      return <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", lineHeight: 1.8, margin: "0 0 1.1em" }}>{block.text}</p>;
    case "h2":
      return <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.625rem", margin: "1.3em 0 0.5em" }}>{block.text}</h2>;
    case "quote":
      return (
        <blockquote style={{ margin: "1.4em 0", padding: "20px 26px", borderLeft: "4px solid var(--maroon-600)", background: "var(--maroon-50)", borderRadius: "0 var(--radius-lg) var(--radius-lg) 0" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", color: "var(--maroon-700)", fontSize: "1.5rem", lineHeight: 1.35 }}>{block.text}</p>
        </blockquote>
      );
    case "ul":
      return (
        <ul style={{ margin: "0 0 1.1em", paddingLeft: 22, fontFamily: "var(--font-body)", color: "var(--ink-700)", lineHeight: 1.8 }}>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostingLd(post),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        {/* Header */}
        <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 80%)" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 28px", textAlign: "center" }}>
            <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 7, alignItems: "center", justifyContent: "center", marginBottom: 18, flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
              <Link href="/" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Home</Link>
              <span style={{ color: "var(--ink-300)" }}>›</span>
              <Link href="/blog" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Blog</Link>
              <span style={{ color: "var(--ink-300)" }}>›</span>
              <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>{post.title}</span>
            </nav>
            <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", padding: "5px 12px", borderRadius: "999px", background: "var(--green-100)", color: "var(--green-700)", marginBottom: 16 }}>
              {post.category}
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.1, margin: "0 0 14px" }}>{post.title}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem" }}>
              <span>By Tejal Shah</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }} />
              <span>{post.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }} />
              <span>{post.read}</span>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section style={{ background: "var(--cream-50)" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px 0" }}>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 420 }}>
              <PhotoSlot subject={post.subject} alt={post.alt} src={img(`blog:${post.slug}`)} priority sizes="(max-width: 980px) 100vw, 980px" style={{ height: 420, width: "100%" }} />
            </div>
          </div>
        </section>

        {/* Body */}
        <section style={{ background: "var(--cream-50)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 16px" }}>
            {post.body.map((b, i) => (
              <ArticleBlock key={i} block={b} />
            ))}
          </div>
        </section>

        {/* Author */}
        <section style={{ background: "var(--cream-50)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "8px 24px 48px" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "center", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-sm)", padding: "22px 24px" }}>
              <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: "50%", overflow: "hidden" }}>
                <PhotoSlot subject="Portrait of founder Tejal" alt="Tejal, founder" src={img("founder-tejal")} position="top" sizes="72px" style={{ height: 72, width: 72 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.25rem" }}>Tejal Shah</div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: 2 }}>
                  Founder, Thepla House by Tejal&apos;s Kitchen. Cooking ghar ka khana for Mumbai since 2018 — whole wheat, no shortcuts.
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Related */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="seglabel">Keep reading</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "2rem", margin: "6px 0 0" }}>Related notes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogPostCard key={p.slug} title={p.title} excerpt={p.excerpt} category={p.category} date={p.date} read={p.read} subject={p.subject} alt={p.alt} src={img(`blog:${p.slug}`)} href={`/blog/${p.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 44, paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Convinced?"
            title="Taste the whole-wheat difference"
            body="Order fresh, home-style food today on Swiggy, Zomato or WhatsApp."
            primaryLabel="Order now"
            primaryHref="/menu"
            secondaryLabel="See the menu"
            secondaryHref="/menu"
          />
        </div>
      </section>
    </>
  );
}
