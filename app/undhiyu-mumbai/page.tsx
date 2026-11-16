import type { Metadata } from "next";
import { externalLinkProps } from "@/lib/links";
import { ORDER_NOW_LINK } from "@/data/site";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { OrderChannels } from "@/components/blocks/OrderChannels";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { KITCHENS } from "@/data/kitchens";
import { dishImage } from "@/data/images";
import menuExtracted from "@/data/menu-extracted.json";

const PATH = "/undhiyu-mumbai";

// Search Console: "undhiyu near me" and "best undhiyu near me" started showing
// in November as the season opened, with no page targeting them — only a blog post.
export const metadata: Metadata = pageMetadata({
  title: "Undhiyu in Mumbai — seasonal Gujarati undhiyu near you",
  description:
    "Fresh Gujarati undhiyu, in season now: order it on its own or as an Undhiyu Thali from Thepla House by Tejal's Kitchen, across Mumbai & Thane. 100% veg.",
  path: PATH,
});

/** Undhiyu items and prices straight from the menu PDF, so they move with it. */
const UNDHIYU_ITEMS = menuExtracted.pages
  .flatMap((p) => p.entries)
  .filter((e) => /undhiyu/i.test(e.name))
  .map((e) => ({ name: e.name.replace(/\s*-\s*Seasonal$/i, ""), price: e.price.replace(/\s+/g, "") }));

const FAQS = [
  {
    q: "Where can I get undhiyu near me in Mumbai?",
    a: "Thepla House by Tejal's Kitchen serves undhiyu in season from kitchens across Mumbai and Thane — Chandivali (Andheri East), Kalina (Santacruz East), Lower Parel, Mulund, Thane and Kandivali West. It's seasonal, so availability can vary by kitchen and day — check when you order.",
  },
  {
    q: "When is undhiyu available?",
    a: "Undhiyu is a winter dish, made while its vegetables are in season. It traditionally appears around Uttarayan (the kite festival in January) and disappears with the cold.",
  },
  {
    q: "What is undhiyu made of?",
    a: "Traditionally surti papdi, purple yam, sweet potato, baby potatoes and small brinjals, with soft fenugreek muthiya, slow-cooked in a green masala of coriander, coconut and green chilli. Read our undhiyu guide for the full story.",
  },
  {
    q: "What do you eat undhiyu with?",
    a: "Undhiyu is best with hot puris. Our Undhiyu Thali brings it together as one complete meal.",
  },
  {
    q: "Is undhiyu vegetarian?",
    a: "Yes. Everything we cook is 100% vegetarian, with whole-wheat atta, sunflower oil and no preservatives.",
  },
];

/** Kitchens that deliver — the airport counter is airside and takes no orders. */
const deliveryKitchens = KITCHENS.filter((k) => !k.airside);

export default function UndhiyuPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Seasonal undhiyu delivery, Mumbai",
            serviceType: "Vegetarian food delivery",
            description:
              "Seasonal Gujarati undhiyu, on its own or as an Undhiyu Thali, cooked fresh at kitchens across Mumbai and Thane.",
            path: PATH,
            areaServed: ["Mumbai", "Thane", "Andheri", "Powai", "Chandivali", "Kalina", "Santacruz", "Lower Parel", "Mulund", "Kandivali"],
          }),
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Undhiyu, Mumbai", path: PATH },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 28, paddingBottom: 44 }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 16, flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>Undhiyu</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center">
            <div>
              <div className="seglabel">Seasonal · Winter special</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Undhiyu in Mumbai, while the season lasts
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 560 }}>
                Undhiyu is what a Gujarati winter tastes like — winter beans, yam, baby potatoes and soft
                muthiya, slow-cooked until everything melts together. It only comes once a year. Order it
                on its own, or as a complete Undhiyu Thali.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <Link href={ORDER_NOW_LINK} {...externalLinkProps(ORDER_NOW_LINK)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order undhiyu
                </Link>
                <Link href="/locations" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Find a kitchen near you
                </Link>
              </div>
              <OrderChannels label="Order on" />
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 340 }}>
              <PhotoSlot subject="Earthen pot of undhiyu with winter vegetables" alt="Gujarati undhiyu in Mumbai" src={dishImage("Undhiyu")} priority sizes="(max-width: 1024px) 100vw, 45vw" style={{ height: 340, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* On the menu */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56, maxWidth: 820 }}>
          <div className="seglabel">On the menu this season</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 22px" }}>
            Undhiyu, two ways
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {UNDHIYU_ITEMS.map((item) => (
              <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "16px 20px" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.1875rem" }}>{item.name}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)", fontWeight: 700, fontSize: "1.0625rem", whiteSpace: "nowrap" }}>{item.price}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", lineHeight: 1.6, margin: "18px 0 0" }}>
            Seasonal — availability can vary by kitchen and day. Prices from our current{" "}
            <Link href="/menu" style={{ color: "var(--color-primary)", fontWeight: 600 }}>menu</Link>. New to undhiyu? Read{" "}
            <Link href="/blog/undhiyu-winter-on-a-plate" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Undhiyu: winter on a plate</Link>.
          </p>
        </div>
      </section>

      {/* Near me — kitchens */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720, marginBottom: 26 }}>
            <div className="seglabel">Undhiyu near you</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              Order from your nearest kitchen
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62 }}>
              Pick your area for timings, directions and delivery links.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
            {deliveryKitchens.map((k) => (
              <Link key={k.slug} href={`/locations/${k.slug}`} style={{ display: "inline-flex", flexDirection: "column", gap: 2, padding: "12px 18px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.0625rem" }}>Undhiyu in {k.thaliArea || k.title}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.8125rem" }}>{k.area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>
            Undhiyu FAQs
          </h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Only in winter"
            title="Order undhiyu while it lasts"
            body="Fresh, 100% vegetarian and seasonal — on its own or as an Undhiyu Thali."
            primaryLabel="Order now"
            primaryHref={ORDER_NOW_LINK}
            secondaryLabel="Find a kitchen near you"
            secondaryHref="/locations"
          />
        </div>
      </section>
    </>
  );
}
