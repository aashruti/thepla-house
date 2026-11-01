import type { Metadata } from "next";
import { externalLinkProps } from "@/lib/links";
import { ORDER_NOW_LINK } from "@/data/site";
import Link from "next/link";
import { PromiseStrip } from "@/components/blocks/PromiseStrip";
import { MenuItemCard } from "@/components/blocks/MenuItemCard";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { OrderChannels } from "@/components/blocks/OrderChannels";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { MENU_CATEGORIES, HOMELY_HEALTHY, tagsFor, type Dish } from "@/data/menu";
import { KITCHENS } from "@/data/kitchens";

const PATH = "/gujarati-thali-mumbai";

// Search Console shows "gujarati thali near me", "gujarati restaurants near me"
// and "gujarati thali in <area>" with hundreds of impressions but no page that
// targets them — the site ranked 9–30 with the homepage. This page is that target.
export const metadata: Metadata = pageMetadata({
  title: "Gujarati thali in Mumbai — veg thali near you",
  description:
    "Looking for a Gujarati thali near you? Thepla House by Tejal's Kitchen serves home-style veg thalis — Gujarati, Punjabi, paneer, pulao and dal bati — from 7 kitchens across Mumbai & Thane. Whole wheat, no maida, Jain & vegan options. Order on Swiggy, Zomato or WhatsApp.",
  path: PATH,
});

const THALI_TITLES = [
  "Gujarati Mini Thali",
  "Regular Thali",
  "Regular Paneer Thali",
  "Special Pulao Thali",
  "Punjabi Mini Thali",
  "Rajasthani Dal Bati Churma",
  "Rajasthani Dal Bati Meal",
  "Dal Dhokli",
];

const ALL_DISHES = [...MENU_CATEGORIES.flatMap((c) => c.dishes), ...HOMELY_HEALTHY];

/** Look dishes up by title so a renamed menu item fails the build instead of vanishing. */
const THALIS: Dish[] = THALI_TITLES.map((title) => {
  const dish = ALL_DISHES.find((d) => d.title === title);
  if (!dish) throw new Error(`gujarati-thali-mumbai: no menu dish titled "${title}"`);
  return dish;
});

const FAQS = [
  {
    q: "Where can I get a Gujarati thali near me in Mumbai?",
    a: "Thepla House by Tejal's Kitchen cooks home-style Gujarati thalis at seven kitchens across Mumbai and Thane — Chandivali (Andheri East), Kalina (Santacruz East), Lower Parel, Mulund, Thane (Manpada), Thane Stadium (Naupada) and a dine-in outlet in Kandivali West. Order for delivery on Swiggy, Zomato or WhatsApp from whichever is closest.",
  },
  {
    q: "What comes in a Gujarati thali?",
    a: "A home-style Gujarati thali balances sweet, salty, spicy and tangy: typically dal or kadhi, a shaak (vegetable), soft rotli or thepla, rice, and something on the side. Exact items vary by thali and by day — see our menu for what's on today.",
  },
  {
    q: "Which thalis do you serve?",
    a: "Our menu includes a Gujarati Mini Thali, Regular Thali, Regular Paneer Thali, Special Pulao Thali, Punjabi Mini Thali and Rajasthani dal bati, plus an Upwas Thali for fasting days.",
  },
  {
    q: "Is the thali healthy and home-style?",
    a: "Yes. Everything is 100% vegetarian and cooked like it would be at home — whole-wheat atta (never maida), sunflower oil (never palm oil), and no preservatives or artificial colours.",
  },
  {
    q: "Do you have Jain or vegan thalis?",
    a: "Jain (no onion, garlic or root vegetables) and vegan options are available — just ask when you order.",
  },
  {
    q: "Can I get a thali for a fasting day?",
    a: "Yes — our Upwas Thali, sabudana khichdi, sabudana vada and rajgira puri are made for fasting days. See our upvas food page for details.",
  },
];

/** Kitchens that deliver — the airport counter is airside and takes no orders. */
const deliveryKitchens = KITCHENS.filter((k) => !k.airside);

export default function GujaratiThaliPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Home-style Gujarati thali delivery, Mumbai",
            serviceType: "Vegetarian thali delivery",
            description:
              "Home-style vegetarian thalis — Gujarati, Punjabi, paneer, pulao and Rajasthani dal bati — cooked fresh with whole-wheat atta and sunflower oil at seven kitchens across Mumbai and Thane.",
            path: PATH,
            areaServed: [
              "Mumbai",
              "Thane",
              "Andheri",
              "Powai",
              "Chandivali",
              "Kalina",
              "Santacruz",
              "Lower Parel",
              "Mulund",
              "Kandivali",
            ],
          }),
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Gujarati thali, Mumbai", path: PATH },
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
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>Gujarati thali</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center">
            <div>
              <div className="seglabel">Veg thali · Home-style · Mumbai</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Gujarati thali in Mumbai, cooked like home
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 560 }}>
                Dal, shaak, soft rotli and rice on one plate — the sweet-savoury balance of a real Gujarati
                ghar ka thali. Thepla House by Tejal&apos;s Kitchen cooks home-style vegetarian thalis fresh to
                order at {deliveryKitchens.length} kitchens across Mumbai &amp; Thane, with whole-wheat atta,
                sunflower oil and no preservatives. Jain and vegan on request.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <Link href={ORDER_NOW_LINK} {...externalLinkProps(ORDER_NOW_LINK)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order a thali
                </Link>
                <Link href="/locations" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Find a kitchen near you
                </Link>
              </div>
              <OrderChannels label="Order on" />
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 340 }}>
              <PhotoSlot subject="Gujarati mini thali in a tray" alt="Home-style Gujarati thali in Mumbai" src={THALIS[0].image} priority sizes="(max-width: 1024px) 100vw, 45vw" style={{ height: 340, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      <PromiseStrip />

      {/* Thalis on the menu */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="seglabel">On the menu</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
                Our thalis &amp; full meals
              </h2>
            </div>
            <Link href="/menu" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Full menu &amp; prices →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THALIS.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
            ))}
          </div>
        </div>
      </section>

      {/* What's in a Gujarati thali */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 760, marginBottom: 32 }}>
            <div className="seglabel">The Gujarati plate</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              What makes a Gujarati thali
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62 }}>
              A Gujarati thali is a whole meal in miniature — a gentle sweetness in the dal, tang from the
              kadhi, heat from the shaak, all brought together with soft whole-wheat rotli. New to it? Read
              our <Link href="/blog/beginners-guide-gujarati-thali" style={{ color: "var(--color-primary)", fontWeight: 600 }}>beginner&apos;s guide to the Gujarati thali</Link>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Dal & kadhi", s: "The comforting centre — lightly sweet-and-sour dal or a silky yoghurt kadhi." },
              { t: "Shaak & rotli", s: "Seasonal vegetables with soft rotli made from whole-wheat atta, never maida." },
              { t: "Rice & something extra", s: "Rice to round off the meal, with a little something on the side." },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "0 0 8px" }}>{c.t}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Near me — kitchens */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720, marginBottom: 26 }}>
            <div className="seglabel">Gujarati thali near you</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              Thalis from {deliveryKitchens.length} kitchens across Mumbai &amp; Thane
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62 }}>
              Pick your nearest kitchen for timings, directions and delivery links.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
            {deliveryKitchens.map((k) => (
              <Link key={k.slug} href={`/locations/${k.slug}`} style={{ display: "inline-flex", flexDirection: "column", gap: 2, padding: "12px 18px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.0625rem" }}>Gujarati thali in {k.title}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.8125rem" }}>{k.area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>
            Gujarati thali FAQs
          </h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Hungry for a proper thali?"
            title="Order a home-style thali today"
            body="100% vegetarian, cooked fresh to order — delivered hot on Swiggy, Zomato or WhatsApp."
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
