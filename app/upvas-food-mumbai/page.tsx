import type { Metadata } from "next";
import { externalLinkProps } from "@/lib/links";
import { ORDER_NOW_LINK } from "@/data/site";
import Link from "next/link";
import { MenuItemCard } from "@/components/blocks/MenuItemCard";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { OrderChannels } from "@/components/blocks/OrderChannels";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { MENU_CATEGORIES, HOMELY_HEALTHY, tagsFor } from "@/data/menu";
import { KITCHENS } from "@/data/kitchens";

const PATH = "/upvas-food-mumbai";

// Search Console shows "upwas thali near me", "upwas/upvas food near me",
// "navratri thali near me" and "sabudana khichdi near me" with ~900 impressions
// a quarter and almost no clicks — only a section on /menu covered them.
export const metadata: Metadata = pageMetadata({
  title: "Upvas food & upwas thali near you in Mumbai — Navratri fasting",
  description:
    "Upwas thali, sabudana khichdi, sabudana vada and rajgira puri for Navratri, Ekadashi and every fasting day. Fresh, 100% vegetarian upvas food from Thepla House by Tejal's Kitchen across Mumbai & Thane — order on Swiggy, Zomato or WhatsApp.",
  path: PATH,
});

// Every fasting dish on the menu, from the menu's own upvas tag.
const UPVAS_DISHES = [...MENU_CATEGORIES.flatMap((c) => c.dishes), ...HOMELY_HEALTHY].filter((d) => d.keys.includes("upvas"));

const FAQS = [
  {
    q: "Where can I get upvas food near me in Mumbai?",
    a: "Thepla House by Tejal's Kitchen serves upvas food from kitchens across Mumbai and Thane — Chandivali (Andheri East), Kalina (Santacruz East), Lower Parel, Mulund, Thane and Kandivali West. Order on Swiggy, Zomato or WhatsApp from your nearest one. Availability can vary by kitchen and fasting day, so check when you order.",
  },
  {
    q: "What upvas dishes do you serve?",
    a: "Our menu includes Tejal's Kitchen Special Upwas Thali, a Fasting Thali, sabudana khichdi, sabudana vada, and aloo sabji with rajgira puri.",
  },
  {
    q: "Do you have a Navratri thali?",
    a: "Our Upwas Thali is a complete fasting-day meal and is what most people order during Navratri. Availability can vary by kitchen, so check with your nearest outlet when you order.",
  },
  {
    q: "Is your upvas food made fresh?",
    a: "Yes. Everything is cooked fresh to order in a 100% vegetarian kitchen, with no preservatives.",
  },
  {
    q: "Can I order upvas food for Ekadashi or Shravan fasts?",
    a: "Yes — our fasting dishes are on the menu year-round, not just during Navratri. Order whenever you're keeping a fast.",
  },
];

/** Kitchens that deliver — the airport counter is airside and takes no orders. */
const deliveryKitchens = KITCHENS.filter((k) => !k.airside);

export default function UpvasFoodPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Upvas (fasting) food delivery, Mumbai",
            serviceType: "Vegetarian fasting food delivery",
            description:
              "Upwas thali, sabudana khichdi, sabudana vada and rajgira puri — fresh, 100% vegetarian fasting food for Navratri, Ekadashi and every upvas day, delivered across Mumbai and Thane.",
            path: PATH,
            areaServed: ["Mumbai", "Thane", "Andheri", "Powai", "Chandivali", "Kalina", "Santacruz", "Lower Parel", "Mulund", "Kandivali"],
          }),
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Upvas food, Mumbai", path: PATH },
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
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>Upvas food</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center">
            <div>
              <div className="seglabel">Upvas · Navratri · Ekadashi</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Upvas food &amp; upwas thali, delivered across Mumbai
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 560 }}>
                Keeping a fast doesn&apos;t mean settling for less. Thepla House by Tejal&apos;s Kitchen cooks a
                complete Upwas Thali, sabudana khichdi, crisp sabudana vada and rajgira puri — fresh, 100%
                vegetarian and ready for Navratri, Ekadashi or any upvas day.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <Link href={ORDER_NOW_LINK} {...externalLinkProps(ORDER_NOW_LINK)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order upvas food
                </Link>
                <Link href="/locations" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Find a kitchen near you
                </Link>
              </div>
              <OrderChannels label="Order on" />
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 340 }}>
              <PhotoSlot subject={UPVAS_DISHES[0].subject} alt="Upwas thali for fasting days in Mumbai" src={UPVAS_DISHES[0].image} priority sizes="(max-width: 1024px) 100vw, 45vw" style={{ height: 340, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Fasting dishes */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="seglabel">Fasting favourites</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
                Our upvas menu
              </h2>
            </div>
            <Link href="/menu" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Full menu &amp; prices →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPVAS_DISHES.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", lineHeight: 1.6, margin: "22px 0 0" }}>
            Availability can vary by kitchen and fasting day — check with your nearest outlet when you order.
          </p>
        </div>
      </section>

      {/* Near me — kitchens */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720, marginBottom: 26 }}>
            <div className="seglabel">Upvas food near you</div>
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
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.0625rem" }}>Upvas food in {k.title}</span>
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
            Upvas food FAQs
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
            eyebrow="Fasting today?"
            title="Order fresh upvas food"
            body="Upwas thali, sabudana and rajgira favourites — delivered hot on Swiggy, Zomato or WhatsApp."
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
