import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "@/components/blocks/BlogList";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, blogLd, breadcrumbLd } from "@/lib/seo";
import { FEATURED_POST, REST_POSTS, POSTS } from "@/data/posts";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Kitchen notes — recipes, health & Gujarati food",
  description:
    "Recipes, health notes and Gujarati food culture from Tejal's kitchen — whole-wheat cooking, Jain & vegan tips, and the stories behind our dishes.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const f = FEATURED_POST;
  return (
    <>
      <JsonLd data={[blogLd(POSTS), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])]} />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 36 }}>
          <div className="seglabel">From the kitchen</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "10px 0 12px" }}>
            Kitchen notes
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 640, margin: 0 }}>
            Recipes, health notes and Gujarati food culture — the thinking and the stories behind everything we cook.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 40, paddingBottom: 8 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center" style={{ gap: 0, background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <div style={{ minHeight: 320, height: "100%" }}>
              <PhotoSlot subject={f.subject} alt={f.alt} src={img(`blog:${f.slug}`)} style={{ height: "100%", minHeight: 320, width: "100%" }} />
            </div>
            <div style={{ padding: "32px 36px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", padding: "5px 12px", borderRadius: "999px", background: "var(--maroon-100)", color: "var(--maroon-700)", marginBottom: 14 }}>
                Featured · {f.category}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "2rem", lineHeight: 1.15, margin: "0 0 12px" }}>{f.title}</h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.6, margin: "0 0 18px" }}>{f.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9rem", marginBottom: 18 }}>
                <span>By Tejal Shah</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }} />
                <span>{f.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }} />
                <span>{f.read}</span>
              </div>
              <Link href={`/blog/${f.slug}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 48, padding: "13px 24px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                Read article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 24, paddingBottom: 56 }}>
          <BlogList posts={REST_POSTS} />
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Hungry now?"
            title="Order the food you just read about"
            body="Fresh, home-style and a few taps away — Swiggy, Zomato or WhatsApp."
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
